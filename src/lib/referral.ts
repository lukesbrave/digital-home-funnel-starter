/**
 * Affiliate referral codes: pure helpers, no DOM, no React.
 *
 * An owner hands every event attendee a personal link: the page URL
 * plus `?ref=<code>`. The code is read on page load, remembered for
 * the session (see events.ts), sent on every funnel event beacon as
 * `ref`, forwarded with lead capture as `custom.referred_by`, and
 * appended to a checkout CTA URL as Stripe's `client_reference_id`
 * so the Stripe dashboard shows which attendee referred each sale.
 *
 * Kept free of browser APIs so it can be unit tested with node:test
 * (tests/referral.test.mjs).
 */

/** The query parameter owners put on shared links. */
export const REF_PARAM = 'ref';

/**
 * The query parameter Stripe Payment Links read into the resulting
 * Checkout Session's client_reference_id. Stripe accepts letters,
 * digits, hyphens and underscores, up to 200 characters.
 */
export const STRIPE_REF_PARAM = 'client_reference_id';

/** Longest code we keep. Well under Stripe's 200-character cap. */
export const MAX_REF_LENGTH = 64;

const REF_PATTERN = /^[A-Za-z0-9_-]+$/;

/**
 * Normalize a raw code from a URL or storage. Returns undefined for
 * anything empty, too long, or outside [A-Za-z0-9_-], so a hostile or
 * mangled value never reaches a beacon, the CRM, or Stripe.
 */
export function normalizeRefCode(raw: string | null | undefined): string | undefined {
  if (typeof raw !== 'string') return undefined;
  const code = raw.trim();
  if (code === '' || code.length > MAX_REF_LENGTH) return undefined;
  return REF_PATTERN.test(code) ? code : undefined;
}

/** Read and normalize `?ref=` from a full URL. Undefined when absent. */
export function readRefFromUrl(href: string): string | undefined {
  try {
    return normalizeRefCode(new URL(href).searchParams.get(REF_PARAM));
  } catch {
    return undefined;
  }
}

/**
 * Append the referral code to a checkout URL as client_reference_id.
 * Without a code the URL is returned exactly as given. An existing
 * client_reference_id on the URL is left alone: the owner set it on
 * purpose. The hash fragment and existing query string survive.
 */
export function withClientReferenceId(url: string, ref: string | undefined): string {
  const code = normalizeRefCode(ref);
  if (!code) return url;
  try {
    const parsed = new URL(url);
    if (parsed.searchParams.has(STRIPE_REF_PARAM)) return url;
    parsed.searchParams.set(STRIPE_REF_PARAM, code);
    return parsed.toString();
  } catch {
    // Not an absolute URL (unexpected for a payment link): fall back to
    // a plain string append so the code is never silently dropped.
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}${STRIPE_REF_PARAM}=${encodeURIComponent(code)}`;
  }
}

/** The shape of a CTA this module needs to know about. */
export type CtaLike = { kind: string; url?: string };

/**
 * The href a CTA button should navigate to. Only the checkout kind
 * carries the referral code (Stripe reads it); book-call and
 * external-link URLs stay untouched; lead-capture has no URL.
 */
export function ctaHref(cta: CtaLike, ref: string | undefined): string | undefined {
  if (!cta.url) return undefined;
  return cta.kind === 'checkout' ? withClientReferenceId(cta.url, ref) : cta.url;
}
