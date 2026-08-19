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
  | { kind: 'checkout'; url: string; label: string; note?: string }
  | { kind: 'external-link'; url: string; label: string; note?: string }
  | { kind: 'lead-capture'; label: string; note?: string };

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
