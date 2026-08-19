/**
 * Deterministic results engine.
 *
 * Answers -> signal tally -> archetype + section variants. No network,
 * no keys, no randomness: the same answers always produce the same
 * result. Runs on the server inside /api/generate-result so an AI
 * enhancement layer can be added later without any frontend change.
 */
import { QUESTIONS } from '@/funnel/questions';
import { ARCHETYPES, SECTIONS } from '@/funnel/results';
import type { Answers, Archetype, QuizResult, ResultVariant } from './types';

/** Tally every signal emitted by the visitor's selected options. */
export function tallySignals(answers: Answers): Record<string, number> {
  const tally: Record<string, number> = {};
  for (const question of QUESTIONS) {
    const answer = answers[question.id];
    if (answer === undefined) continue;
    const values = Array.isArray(answer) ? answer : [answer];
    for (const option of question.options) {
      if (!values.includes(option.value)) continue;
      for (const signal of option.signals ?? []) {
        tally[signal] = (tally[signal] ?? 0) + 1;
      }
    }
  }
  return tally;
}

function scoreAgainst(tally: Record<string, number>, signals: string[]): number {
  return signals.reduce((sum, s) => sum + (tally[s] ?? 0), 0);
}

export function pickArchetype(tally: Record<string, number>): Archetype {
  let best: Archetype = ARCHETYPES[0];
  let bestScore = -1;
  for (const archetype of ARCHETYPES) {
    const score = scoreAgainst(tally, archetype.signals);
    if (score > bestScore) {
      best = archetype;
      bestScore = score;
    }
  }
  return best;
}

function pickVariant(tally: Record<string, number>, variants: ResultVariant[]): ResultVariant {
  let fallback = variants[0];
  let best: ResultVariant | null = null;
  let bestScore = 0;
  for (const variant of variants) {
    if (!variant.when) {
      fallback = variant;
      continue;
    }
    const score = scoreAgainst(tally, variant.when);
    if (score > bestScore) {
      best = variant;
      bestScore = score;
    }
  }
  return best ?? fallback;
}

export function computeResult(answers: Answers): QuizResult {
  const tally = tallySignals(answers);
  const archetype = pickArchetype(tally);
  const sections = SECTIONS.map((section) => {
    const variant = pickVariant(tally, section.variants);
    return {
      id: section.id,
      title: variant.title,
      body: variant.body,
      bullets: variant.bullets,
    };
  });
  return { archetype, sections, signals: tally };
}
