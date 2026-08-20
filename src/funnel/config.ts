/**
 * FUNNEL CONFIG — the identity of this funnel.
 *
 * This folder (src/funnel/) is the entire customization surface. A
 * complete funnel is produced by editing the four data files here:
 *
 *   config.ts    -> type, name, slug, palette, opt-in gate, CTA
 *   landing.ts   -> landing page copy          (quiz type)
 *   questions.ts -> the question flow          (quiz type)
 *   results.ts   -> archetypes, result mapping (quiz type)
 *   sales.ts     -> sales page sections        (sales-page type)
 *
 * Components and lib code never need to change.
 */
import type { CtaConfig, FunnelType, OptInConfig } from '@/lib/types';
import type { ThemeTokens } from '@/themes';

/**
 * Which page composition this funnel ships. 'quiz' walks visitors
 * through questions to a personalized result; 'sales-page' is a
 * long-form conversion page (sections in sales.ts). Both share the
 * same themes, events, capture, and deploy.
 */
export const FUNNEL_TYPE: FunnelType = 'quiz';

/** Shown in the browser tab and used as the CRM source tag. */
export const FUNNEL_NAME = 'The Brand Momentum Quiz';

/**
 * Machine name for this funnel. Rows in the backend funnel dashboard
 * and leads in the CRM are tagged with this slug.
 */
export const FUNNEL_SLUG = 'brand-momentum';

/**
 * The theme: one value. Ships with 'clean' (default, quiet sans,
 * fits most brands), 'manuscript' (warm editorial serif), and
 * 'signal' (dark, bold, one loud accent). Screenshots of each live
 * in previews/. Themes are defined in src/themes/.
 */
export const THEME: 'clean' | 'manuscript' | 'signal' = 'clean';

/**
 * Optional per-funnel token overrides on top of the theme, for
 * brand tinting (e.g. swap the accent). Usually left empty.
 */
export const PALETTE_OVERRIDES: Partial<ThemeTokens> = {};

/** The opt-in gate between the last question and the results. */
export const OPT_IN: OptInConfig = {
  enabled: true,
  headline: 'Your results are ready',
  subline: 'Tell us where to send your full breakdown and see it on screen right now.',
  fields: { name: true, phone: false },
  buttonLabel: 'Show my results',
  disclaimer: 'No spam. One useful email, then you decide.',
};

/** The single action the results page asks for. */
export const CTA: CtaConfig = {
  kind: 'book-call',
  url: 'https://cal.com/your-name/intro',
  label: 'Book your free strategy call',
  note: '20 minutes, no pitch. We walk through your result together.',
};
