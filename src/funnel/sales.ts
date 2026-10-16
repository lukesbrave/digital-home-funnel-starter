/**
 * SALES PAGE COPY — every word on the sales page, in order.
 *
 * Only read when FUNNEL_TYPE is 'sales-page' (config.ts). The page
 * renders these sections top to bottom; remove a section to drop it,
 * reorder freely. hero and final-cta should always exist. The copy
 * desk (copy coach) writes these words from the brand playbook; this
 * file is where they land as data.
 *
 * Proof rule: quotes must be REAL. No real proof yet = delete the
 * proof section. Never ship invented testimonials.
 */
import type { CtaConfig, SalesPageConfig } from '@/lib/types';
import { SALES_BRAND_MOMENTUM } from './samples/brand-momentum';

/**
 * Example two-step checkout CTA for a sales page: the visitor enters
 * an email (captured to the CRM, tagged checkout-started), then a
 * hidden form POSTs email, ref and these fields to the site's own
 * checkout route, which answers with a 303 to the payment page. For a
 * Stripe Payment Link use method 'get' with the link as url. To use
 * it, set `CTA` in config.ts to this value.
 */
export const SALES_CHECKOUT_CTA: CtaConfig = {
  kind: 'two-step-checkout',
  label: 'Claim your seat',
  note: 'Secure checkout. Your receipt goes to this email.',
  checkout: {
    url: 'https://www.yourdomain.com/api/checkout',
    method: 'post',
    fields: { slug: 'brand-momentum', tier: 'full' },
  },
};

/**
 * The page this funnel ships. Point it at your own data; the samples under
 * ./samples are complete, working pages in each layout.
 */
export const SALES: SalesPageConfig = SALES_BRAND_MOMENTUM;
