/**
 * Client-side funnel event beacons.
 *
 * Fires start / view / complete / cta_click to our own /api/events
 * route, which forwards server-to-server to the member's Digital Home
 * backend with the funnel secret. The secret never reaches the browser.
 *
 * Dedupe: the backend dashboard counts rows per step as distinct
 * sessions, so each (event, screen) fires at most once per session.
 * Session id, the fired-set and the referral code live in
 * sessionStorage.
 *
 * Referral: a visitor who lands with `?ref=<code>` (an attendee's
 * affiliate link) has the code remembered for the session and sent
 * on every beacon as `ref`, next to `referrer`. It also rides inside
 * event_data so backends that store event_data as JSON record it
 * today, before any `ref` column exists.
 */
'use client';

import { normalizeRefCode, readRefFromUrl } from './referral';

const SESSION_KEY = 'funnel_session_id';
const FIRED_KEY = 'funnel_fired';
const REF_KEY = 'funnel_ref';

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function alreadyFired(key: string): boolean {
  if (typeof window === 'undefined') return true;
  const fired: string[] = JSON.parse(sessionStorage.getItem(FIRED_KEY) ?? '[]');
  if (fired.includes(key)) return true;
  fired.push(key);
  sessionStorage.setItem(FIRED_KEY, JSON.stringify(fired));
  return false;
}

/**
 * Remember the referral code for this session. A code in the current
 * URL wins over a stored one (a visitor who opens a second attendee's
 * link in the same tab is attributed to that attendee); otherwise the
 * stored code stays. Returns the code in force, if any.
 */
export function rememberReferralCode(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const fromUrl = readRefFromUrl(window.location.href);
  if (fromUrl) {
    sessionStorage.setItem(REF_KEY, fromUrl);
    return fromUrl;
  }
  return normalizeRefCode(sessionStorage.getItem(REF_KEY)) ?? undefined;
}

/** The referral code in force for this session, if any. */
export function getReferralCode(): string | undefined {
  return rememberReferralCode();
}

export type FunnelEventType = 'start' | 'view' | 'complete' | 'cta_click';

export function trackEvent(
  eventType: FunnelEventType,
  options: { screenIndex?: number; screenId?: string; data?: Record<string, unknown> } = {}
) {
  const dedupeKey = `${eventType}:${options.screenId ?? ''}`;
  if (alreadyFired(dedupeKey)) return;

  const ref = getReferralCode();
  const body = JSON.stringify({
    events: [
      {
        session_id: getSessionId(),
        event_type: eventType,
        event_data: {
          ...(options.screenIndex !== undefined ? { screen_index: options.screenIndex } : {}),
          ...(options.screenId ? { screen_id: options.screenId } : {}),
          ...(ref ? { ref } : {}),
          ...options.data,
        },
        page_url: window.location.href,
        referrer: document.referrer || undefined,
        ref,
      },
    ],
  });

  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function getFunnelSessionId(): string {
  return getSessionId();
}
