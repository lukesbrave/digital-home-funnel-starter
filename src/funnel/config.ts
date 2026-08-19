/**
 * FUNNEL CONFIG — the identity of this funnel.
 *
 * This folder (src/funnel/) is the entire customization surface. A
 * complete funnel is produced by editing the four data files here:
 *
 *   config.ts    -> name, slug, palette, opt-in gate, CTA
 *   landing.ts   -> landing page copy
 *   questions.ts -> the question flow and its branching
 *   results.ts   -> archetypes, result sections, signal mapping
 *
 * Components and lib code never need to change.
 */
import type { CtaConfig, OptInConfig } from '@/lib/types';

/** Shown in the browser tab and used as the CRM source tag. */
export const FUNNEL_NAME = 'The Brand Momentum Quiz';

/**
 * Machine name for this funnel. Rows in the backend funnel dashboard
 * and leads in the CRM are tagged with this slug.
 */
export const FUNNEL_SLUG = 'brand-momentum';

/**
 * Palette tokens, injected as CSS variables in layout.tsx.
 * The template design consumes only these tokens, so a palette swap
 * restyles the whole funnel coherently.
 */
export const PALETTE = {
  background: '#faf9f7',
  surface: '#ffffff',
  border: '#e4e1db',
  ink: '#1a1916',
  muted: '#6f6a61',
  accent: '#1d4ed8',
  accentInk: '#ffffff',
};

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
