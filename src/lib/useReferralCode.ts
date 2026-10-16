'use client';

import { useSyncExternalStore } from 'react';
import { rememberReferralCode } from './events';

/** sessionStorage never notifies; the code is fixed once read. */
const subscribe = () => () => {};
const serverSnapshot = () => undefined;

/**
 * The session's referral code. The server snapshot is undefined, so
 * server HTML and the hydration render agree (no mismatch on CTA
 * hrefs); the client snapshot then supplies the code. Reading it
 * also remembers a `?ref=` from the URL for the session.
 */
export function useReferralCode(): string | undefined {
  return useSyncExternalStore(subscribe, rememberReferralCode, serverSnapshot);
}
