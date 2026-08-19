/**
 * POST /api/generate-result — the single result endpoint.
 *
 * Deterministic by default: the engine maps answers to archetype and
 * section variants with no keys and no network. Kept as an API route
 * on purpose so AI enhancement can be layered in later without any
 * frontend change.
 *
 * If the member configures a server-side ANTHROPIC_API_KEY, only
 * sections marked aiEnhance in results.ts get rewritten for this
 * visitor. Brand method, proof, and CTA framing stay static. Any
 * enhancement failure falls back to the deterministic result.
 * Provider keys are never required and never exposed client-side.
 */
import { NextRequest, NextResponse } from 'next/server';
import { computeResult } from '@/lib/engine';
import { SECTIONS } from '@/funnel/results';
import { FUNNEL_NAME } from '@/funnel/config';
import type { Answers, QuizResult } from '@/lib/types';

export async function POST(request: NextRequest) {
  let body: { answers?: Answers };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.answers || typeof body.answers !== 'object') {
    return NextResponse.json({ error: 'answers required' }, { status: 400 });
  }

  const result = computeResult(body.answers);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    try {
      return NextResponse.json(await enhance(result, body.answers, apiKey));
    } catch {
      // Enhancement is best-effort; the deterministic result ships.
    }
  }
  return NextResponse.json(result);
}

/** Rewrite only visitor-specific sections; everything else stays as computed. */
async function enhance(result: QuizResult, answers: Answers, apiKey: string): Promise<QuizResult> {
  const enhanceable = new Set(SECTIONS.filter((s) => s.aiEnhance).map((s) => s.id));
  const targets = result.sections.filter((s) => enhanceable.has(s.id));
  if (targets.length === 0) return result;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: [
            `You personalize quiz result copy for "${FUNNEL_NAME}".`,
            `The visitor's archetype: ${result.archetype.name} (${result.archetype.headline}).`,
            `Their answers: ${JSON.stringify(answers)}`,
            `Rewrite ONLY the body text of these sections to feel specific to their answers. Keep each body under 90 words, keep the same direct tone, keep every factual claim from the original, and never use em dashes.`,
            `Sections: ${JSON.stringify(targets.map((s) => ({ id: s.id, title: s.title, body: s.body })))}`,
            `Reply with JSON only: [{"id": "...", "body": "..."}]`,
          ].join('\n'),
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}`);
  const data = await res.json();
  const text: string = data.content?.[0]?.text ?? '';
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('no JSON in response');
  const rewrites: { id: string; body: string }[] = JSON.parse(match[0]);

  const byId = new Map(rewrites.map((r) => [r.id, r.body]));
  return {
    ...result,
    sections: result.sections.map((s) =>
      enhanceable.has(s.id) && byId.get(s.id) ? { ...s, body: byId.get(s.id)! } : s
    ),
  };
}
