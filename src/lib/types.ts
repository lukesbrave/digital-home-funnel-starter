/**
 * Core types for the funnel template.
 *
 * Template internals import from here. The agent-editable data layer in
 * src/funnel/ conforms to these types; the components and engine never
 * need to change when a new funnel is injected.
 */

/** The seven question categories every flow balances across. */
export type QuestionCategory =
  | 'situation'
  | 'pain'
  | 'goals'
  | 'urgency'
  | 'readiness'
  | 'identity'
  | 'qualifier';

export interface QuizOption {
  value: string;
  label: string;
  /** Signal tags this answer emits into the result engine. */
  signals?: string[];
}

/** Answers are fully data-driven: question id -> selected value(s). */
export type Answers = Record<string, string | string[]>;

export interface QuizQuestion {
  id: string;
  category: QuestionCategory;
  title: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  options: QuizOption[];
  /** Branching lives in data, not components. */
  showIf?: (answers: Answers) => boolean;
}

/** The opt-in gate shown after the last question, before results. */
export interface OptInConfig {
  enabled: boolean;
  headline: string;
  subline?: string;
  /** Which contact fields to ask for. Email is always included. */
  fields: { name?: boolean; phone?: boolean };
  buttonLabel: string;
  /** Small print under the button. */
  disclaimer?: string;
}

export type CtaConfig =
  | { kind: 'book-call'; url: string; label: string; note?: string }
  /** A Stripe payment link. A visitor's `?ref=` code is appended as
   *  client_reference_id (src/lib/referral.ts). */
  | { kind: 'checkout'; url: string; label: string; note?: string }
  | { kind: 'external-link'; url: string; label: string; note?: string }
  | { kind: 'lead-capture'; label: string; note?: string }
  /**
   * Two steps: a small modal takes the email (captured to the CRM,
   * tagged checkout-started), then the visitor is sent to checkout.
   * 'get' navigates to checkout.url with prefilled_email,
   * client_reference_id (when a ref code is in the session) and every
   * entry of fields as query params (the Stripe Payment Link shape).
   * 'post' submits a hidden HTML form to checkout.url with email, ref
   * (when present) and fields; the server answers with a 303 to the
   * payment page. See src/lib/checkout.ts.
   */
  | { kind: 'two-step-checkout'; label: string; note?: string;
      checkout: TwoStepCheckout;
      /** Copy for the email modal. Sensible defaults when omitted. */
      modal?: { headline?: string; body?: string; buttonLabel?: string } };

export interface TwoStepCheckout {
  url: string;
  method: 'get' | 'post';
  /** Extra values sent with every checkout, e.g. { slug, tier }. */
  fields?: Record<string, string>;
}

export interface Archetype {
  id: string;
  name: string;
  headline: string;
  description: string;
  /** Signals that vote for this archetype. Highest tally wins. */
  signals: string[];
}

export interface ResultVariant {
  /**
   * Signals that select this variant; the variant with the highest
   * overlap against the visitor's tally wins. Omit for the fallback.
   */
  when?: string[];
  title: string;
  body: string;
  bullets?: string[];
}

export interface ResultSection {
  id: string;
  /**
   * Visitor-specific sections may be rewritten by a server-side model
   * when the member configures a provider key. Brand method, proof,
   * and CTA sections stay static: never mark those.
   */
  aiEnhance?: boolean;
  variants: ResultVariant[];
}

/** What /api/generate-result returns. Deterministic by default. */
export interface QuizResult {
  archetype: Archetype;
  sections: { id: string; title: string; body: string; bullets?: string[] }[];
  /** Tally kept for debugging and for the CRM custom payload. */
  signals: Record<string, number>;
}

export type AppStep = 'landing' | 'quiz' | 'optin' | 'loading' | 'results';

/** Which page composition this funnel ships. Types share themes,
 *  events, capture, and deploy; only the composition differs. */
export type FunnelType = 'quiz' | 'sales-page';

/**
 * Sales-page sections — the 12-step sales spine collapsed to
 * buildable blocks. The page renders whatever sections exist, in
 * order; every block is optional except hero and final-cta. Copy
 * comes from the copy desk; this schema maps 1:1 to its output so
 * words flow in as data with no rewriting.
 */
export type SalesSection =
  | { kind: 'hero'; eyebrow?: string; headline: string; subheadline: string;
      buttonLabel: string; microcopy?: string;
      /** Optional stat card beside the hero (desktop). */
      stats?: { label: string; value: string }[] }
  | { kind: 'problem'; kicker?: string; headline: string; body: string[] }
  | { kind: 'story'; kicker?: string; headline: string; body?: string;
      steps: { title: string; body: string }[] }
  | { kind: 'offer'; kicker?: string; headline: string; body?: string;
      buttonLabel?: string; items: { label: string; tag?: string }[] }
  | { kind: 'proof'; kicker?: string; headline: string;
      quotes: { quote: string; who: string }[] }
  | { kind: 'pricing'; kicker?: string; headline: string; price: string;
      priceNote?: string; buttonLabel: string; guarantee?: string }
  | { kind: 'faq'; kicker?: string; headline: string;
      items: { q: string; a: string }[] }
  | { kind: 'final-cta'; headline: string; body?: string; buttonLabel: string };

export interface SalesPageConfig {
  sections: SalesSection[];
  /** Small persistent CTA bar once the visitor scrolls past the hero. */
  stickyBar?: { text: string; buttonLabel: string };
  footer?: string;
}
