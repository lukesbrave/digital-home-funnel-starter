/**
 * Client-side funnel event beacons.
 *
 * Fires start / view / complete / cta_click to our own /api/events
 * route, which forwards server-to-server to the member's Digital Home
 * backend with the funnel secret. The secret never reaches the browser.
 *
 * Dedupe: the backend dashboard counts rows per step as distinct
 * sessions, so each (event, screen) fires at most once per session.
 * Session id and the fired-set live in sessionStorage.
 */
'use client';

const SESSION_KEY = 'funnel_session_id';
const FIRED_KEY = 'funnel_fired';

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

export type FunnelEventType = 'start' | 'view' | 'complete' | 'cta_click';

export function trackEvent(
  eventType: FunnelEventType,
  options: { screenIndex?: number; screenId?: string; data?: Record<string, unknown> } = {}
) {
  const dedupeKey = `${eventType}:${options.screenId ?? ''}`;
  if (alreadyFired(dedupeKey)) return;

  const body = JSON.stringify({
    events: [
      {
        session_id: getSessionId(),
        event_type: eventType,
        event_data: {
          ...(options.screenIndex !== undefined ? { screen_index: options.screenIndex } : {}),
          ...(options.screenId ? { screen_id: options.screenId } : {}),
          ...options.data,
        },
        page_url: window.location.href,
        referrer: document.referrer || undefined,
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
