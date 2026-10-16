/**
 * Two-step checkout: pure helpers, no DOM, no React.
 *
 * Step one (the email modal) lives in components/CheckoutModal.tsx.
 * Step two is built here so it can be unit tested:
 *
 *   'get'  -> a URL: checkout.url + prefilled_email, client_reference_id
 *             (when a ref code exists) and every entry of fields.
 *             This is the Stripe Payment Link shape.
 *   'post' -> the field set for a hidden HTML form POSTed to
 *             checkout.url: email, ref (when present) and fields. The
 *             server is expected to answer with a 303 redirect to the
 *             payment page.
 *
 * Reserved keys (prefilled_email, client_reference_id, email, ref) are
 * owned by the visitor's session; an entry in fields with the same
 * name never overrides them.
 */
// Explicit extensions: node --test imports this module directly.
import { normalizeRefCode, STRIPE_REF_PARAM } from './referral.ts';
import type { TwoStepCheckout } from './types.ts';

/** Stripe Payment Links read this into the Checkout Session email. */
export const STRIPE_EMAIL_PARAM = 'prefilled_email';

/** Step one's event: screen_id and event_data.step on the cta_click. */
export const CHECKOUT_EMAIL_STEP = 'checkout-email';

/** Tag added to the lead when the visitor starts checkout. */
export const CHECKOUT_STARTED_TAG = 'checkout-started';

/** The URL step two navigates to for method 'get'. */
export function buildGetCheckoutUrl(
  checkout: TwoStepCheckout,
  email: string,
  ref: string | undefined
): string {
  const code = normalizeRefCode(ref);
  const url = new URL(checkout.url);
  for (const [key, value] of Object.entries(checkout.fields ?? {})) {
    if (key === STRIPE_EMAIL_PARAM || key === STRIPE_REF_PARAM) continue;
    url.searchParams.set(key, value);
  }
  url.searchParams.set(STRIPE_EMAIL_PARAM, email.trim());
  if (code) url.searchParams.set(STRIPE_REF_PARAM, code);
  return url.toString();
}

/** The hidden-form field set step two submits for method 'post'. */
export function buildPostCheckoutFields(
  checkout: TwoStepCheckout,
  email: string,
  ref: string | undefined
): Record<string, string> {
  const code = normalizeRefCode(ref);
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(checkout.fields ?? {})) {
    if (key === 'email' || key === 'ref') continue;
    fields[key] = value;
  }
  fields.email = email.trim();
  if (code) fields.ref = code;
  return fields;
}
