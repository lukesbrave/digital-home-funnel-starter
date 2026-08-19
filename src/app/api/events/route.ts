/**
 * POST /api/events — server-to-server relay to the Digital Home.
 *
 * The browser fires beacons here; this route forwards them to the
 * member's backend funnel ingest with the funnel secret attached.
 * The secret lives only in server env, never in the client bundle.
 *
 * Unconfigured backends are a soft no-op so the funnel still works
 * during local development and before wiring.
 */
import { NextRequest, NextResponse } from 'next/server';
import { FUNNEL_SLUG } from '@/funnel/config';

export async function POST(request: NextRequest) {
  const backendUrl = process.env.FUNNEL_BACKEND_URL;
  const funnelSecret = process.env.FUNNEL_SECRET;
  if (!backendUrl || !funnelSecret) {
    return NextResponse.json({ ok: true, forwarded: false });
  }

  let body: { events?: unknown[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!Array.isArray(body.events) || body.events.length === 0) {
    return NextResponse.json({ error: 'events array required' }, { status: 400 });
  }

  try {
    const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/crm/funnel/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-funnel-secret': funnelSecret,
      },
      body: JSON.stringify({ funnel: FUNNEL_SLUG, events: body.events.slice(0, 20) }),
    });
    return NextResponse.json({ ok: res.ok, forwarded: true });
  } catch {
    // Tracking must never break the funnel for the visitor.
    return NextResponse.json({ ok: false, forwarded: false });
  }
}
