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
/** A picture a section may carry (the editorial layout renders it; the stack ignores it). */
export interface SalesImage { src: string; alt: string; caption?: string }

export type SalesSection =
  | { kind: 'hero'; eyebrow?: string; headline: string; subheadline: string;
      buttonLabel: string; microcopy?: string;
      /** Optional stat card beside the hero (stack layout, desktop). */
      stats?: { label: string; value: string }[];
      /** Full-bleed hero media (editorial layout): a still, or a silent loop over it. */
      media?: { image: string; video?: string; alt?: string };
      /** The words of the headline set in italic (editorial layout), e.g. "recorded." */
      emphasis?: string;
      /** A quiet second link under the CTA that scrolls to the next section (editorial). */
      secondaryLabel?: string;
      /**
       * Editorial hero shape. 'full' (default) is the full-bleed photograph or
       * loop with the headline over it. 'split' is a cream column with the
       * eyebrow, headline and a small inset picture beside a full-height
       * photograph, with a dark square overlapping its corner that carries a
       * looping clip (a person speaking) or a label.
       */
      variant?: 'full' | 'split';
      /** Small picture under the headline (split only). */
      inset?: SalesImage;
      /**
       * The black square on the corner of the loop (split only). It is a
       * button: pressing it opens `preview`, a short clip with sound, in an
       * overlay. The big picture itself is `media`: a silent loop over a
       * poster, or a still.
       */
      panel?: { label?: string; caption?: string; preview?: { video: string; poster?: string } } }
  | { kind: 'problem'; kicker?: string; headline: string; emphasis?: string; body: string[];
      image?: SalesImage }
  | { kind: 'story'; kicker?: string; headline: string; emphasis?: string; body?: string;
      steps: { title: string; body: string }[]; image?: SalesImage }
  /** Step 4: who is behind this and why believe them. Facts are real or absent. */
  | { kind: 'credentials'; kicker?: string; headline: string; emphasis?: string; body: string[];
      facts?: { label: string; value: string }[]; image?: SalesImage }
  | { kind: 'offer'; kicker?: string; headline: string; emphasis?: string; body?: string;
      buttonLabel?: string; items: { label: string; tag?: string }[]; image?: SalesImage }
  /** The value stack: every piece inside the offer, numbered, each
   *  with an optional worth, and a total line the price then undercuts. */
  | { kind: 'value-stack'; kicker?: string; headline: string; emphasis?: string; body?: string;
      /** `group` starts a new labelled run of rows (a day, a module). */
      items: { label: string; detail?: string; value?: string; group?: string }[];
      total?: { label: string; value: string }; buttonLabel?: string }
  | { kind: 'proof'; kicker?: string; headline: string; emphasis?: string;
      quotes: { quote: string; who: string; role?: string }[] }
  | { kind: 'pricing'; kicker?: string; headline: string; emphasis?: string; body?: string;
      price: string; priceNote?: string; buttonLabel: string; guarantee?: string;
      /** Small label on the price card (editorial), e.g. "Option 01". */
      cardLabel?: string;
      /** Currency mark beside the price (editorial), e.g. "USD". */
      currencyLabel?: string }
  /** Step 8: why now. Real reasons only; never a deadline that is not real. */
  | { kind: 'scarcity'; kicker?: string; headline: string; emphasis?: string; body: string[];
      /** A photograph behind the words (editorial renders it as a full-bleed band). */
      image?: SalesImage }
  /** Step 9: the risk reversal, in the seller's own words. */
  | { kind: 'guarantee'; kicker?: string; headline: string; emphasis?: string; body: string[];
      buttonLabel?: string }
  /** Step 11: what happens if they do nothing. Sits after the CTA. */
  | { kind: 'warning'; kicker?: string; headline: string; emphasis?: string; body: string[];
      buttonLabel?: string }
  | { kind: 'faq'; kicker?: string; headline: string; emphasis?: string;
      items: { q: string; a: string }[] }
  | { kind: 'final-cta'; headline: string; emphasis?: string; body?: string; buttonLabel: string;
      image?: SalesImage };

export interface SalesPageConfig {
  /**
   * Which composition renders the sections. 'stack' (default) is the
   * conversion stack: alternating bands, cards, boxed pricing. 'editorial'
   * is the long-form event-page grammar: full-bleed media, serif display
   * with one italic word, slash eyebrows, numbered hairline rows, claret
   * bands. Same sections, same events, same CTA either way.
   */
  layout?: 'stack' | 'editorial';
  sections: SalesSection[];
  /** Small persistent CTA bar once the visitor scrolls past the hero. */
  stickyBar?: { text: string; buttonLabel: string };
  footer?: string;
}
