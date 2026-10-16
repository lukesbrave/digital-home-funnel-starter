/**
 * POST /api/capture — relay the opt-in to the Digital Home CRM.
 *
 * Forwards the visitor's contact details plus their quiz profile to
 * the backend's universal capture endpoint, which upserts the lead
 * and fires workflow triggers.
 *
 * Auth note: capture uses the x-capture-key header. By default we
 * send the funnel secret there too, which works when the member's
 * crm_capture_key and crm_funnel_secret settings hold the same
 * value (the recommended setup). If they differ, set
 * FUNNEL_CAPTURE_KEY to the capture key.
 *
 * Referral: a `ref` on the body lands on the lead as
 * custom.referred_by, so the CRM can attribute the lead to the
 * attendee whose link brought them.
 */
import { NextRequest, NextResponse } from 'next/server';
import { FUNNEL_NAME, FUNNEL_SLUG } from '@/funnel/config';
import { normalizeRefCode } from '@/lib/referral';

interface CaptureBody {
  email?: string;
  name?: string;
  phone?: string;
  archetype?: string;
  answers?: Record<string, unknown>;
  session_id?: string;
  /** Affiliate referral code from the visitor's `?ref=` link. */
  ref?: string;
}

export async function POST(request: NextRequest) {
  const backendUrl = process.env.FUNNEL_BACKEND_URL;
  const captureKey = process.env.FUNNEL_CAPTURE_KEY || process.env.FUNNEL_SECRET;

  let body: CaptureBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.email || typeof body.email !== 'string') {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }

  if (!backendUrl || !captureKey) {
    // Local development without a wired backend: accept and move on.
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/crm/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-capture-key': captureKey,
      },
      body: JSON.stringify({
        email: body.email,
        name: body.name || undefined,
        phone: body.phone || undefined,
        source: `funnel:${FUNNEL_SLUG}`,
        form: FUNNEL_NAME,
        page: request.headers.get('referer') || undefined,
        tags: ['funnel', FUNNEL_SLUG],
        custom: {
          funnel: FUNNEL_SLUG,
          archetype: body.archetype || null,
          quiz_answers: body.answers || {},
          funnel_session_id: body.session_id || null,
          referred_by: normalizeRefCode(body.ref) ?? null,
        },
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, forwarded: true }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json({ ok: true, forwarded: true, lead_id: data.lead_id });
  } catch {
    return NextResponse.json({ ok: false, forwarded: false }, { status: 502 });
  }
}
