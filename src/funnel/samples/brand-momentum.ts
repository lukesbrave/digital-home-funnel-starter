/**
 * SAMPLE: Brand Momentum, the generic sales page the template ships
 * with, in the stack layout. Replace by pointing SALES in ../sales.ts
 * at your own data, or edit in place.
 */
import type { SalesPageConfig } from '@/lib/types';

export const SALES_BRAND_MOMENTUM: SalesPageConfig = {
  sections: [
    {
      kind: 'hero',
      eyebrow: 'For founders doing everything and growing nothing',
      headline: 'Momentum is not a mood. It is a system you can install.',
      subheadline:
        'Brand Momentum is a 6 week working sprint that finds where your growth is leaking and installs the one system that stops it.',
      buttonLabel: 'Start your sprint',
      microcopy: 'Next cohort opens 1 September. 12 seats.',
      stats: [
        { label: 'Diagnosis mapped', value: 'Week 1' },
        { label: 'System installed', value: 'Week 3' },
        { label: 'Running without you', value: 'Week 6' },
        { label: 'Seats this cohort', value: '12' },
      ],
    },
    {
      kind: 'problem',
      kicker: 'The problem',
      headline: 'You are not short on effort. You are short on compounding.',
      body: [
        'You post, you ship, you tweak the website at midnight. Every week starts from zero because nothing builds on the last thing.',
        'That is a brand running on activity instead of architecture. More effort just burns fuel in the same leak.',
      ],
    },
    {
      kind: 'story',
      kicker: 'The shift',
      headline: 'Stop chasing reach. Seal the leak.',
      body: 'After 40 client brands, the pattern was embarrassing in its simplicity: growth never came from adding channels.',
      steps: [
        { title: 'Diagnose', body: 'Find the single point where attention already arrives and dies.' },
        { title: 'Install', body: 'One system at that exact point. Nothing else that month.' },
        { title: 'Compound', body: 'Stack it weekly until it runs without you.' },
      ],
    },
    {
      kind: 'offer',
      kicker: 'What you get',
      headline: 'The whole sprint, nothing held back.',
      body: 'Six weeks, one leak, and every asset we use with private clients.',
      buttonLabel: 'Claim your seat',
      items: [
        { label: '6 weekly working sessions, live', tag: 'core' },
        { label: 'Your leak diagnosis, week one', tag: 'included' },
        { label: 'The system library, every template', tag: 'included' },
        { label: 'Async reviews on all you ship', tag: 'included' },
        { label: 'Lifetime access to future versions', tag: 'bonus' },
      ],
    },
    {
      kind: 'value-stack',
      kicker: 'Everything inside',
      headline: 'What the sprint hands you, piece by piece.',
      body: 'Each piece stands on its own. Together they are the system.',
      items: [
        { label: 'The leak diagnosis', detail: 'A 90 minute working session that maps where growth escapes.', value: '$1,200' },
        { label: 'The system build', detail: 'Two weeks of installation with a named owner for every step.', value: '$2,400' },
        { label: 'The handover', detail: 'Documentation your team can run without you in the room.', value: '$900' },
        { label: 'Six weeks of review calls', detail: 'Weekly, so the system is corrected while it is still cheap to.', value: '$1,800' },
      ],
      total: { label: 'Total value', value: '$6,300' },
      buttonLabel: 'Start your sprint',
    },
    {
      kind: 'proof',
      kicker: 'Proof',
      headline: 'Founders who sealed the leak.',
      quotes: [
        {
          quote:
            'I deleted half my marketing and doubled replies in three weeks. The diagnosis alone was worth the fee.',
          who: 'Sample Name, studio founder',
        },
        { quote: 'First time in two years a week did not start from zero.', who: 'Sample Name, coach' },
      ],
    },
    {
      kind: 'pricing',
      kicker: 'The decision',
      headline: 'One seat. One leak. Six weeks.',
      price: '$1,500',
      priceNote: 'or 3 payments of $550',
      buttonLabel: 'Claim your seat',
      guarantee: 'Week one guarantee: not useful, full refund, one email',
    },
    {
      kind: 'faq',
      kicker: 'Questions',
      headline: 'Asked every cohort.',
      items: [
        {
          q: 'How much time does it take each week?',
          a: 'One 90 minute session plus about two hours of implementation.',
        },
        {
          q: 'Is this for new businesses?',
          a: 'You need something live that attention can leak from. Pre-launch is too early.',
        },
        {
          q: 'What if I cannot make a session live?',
          a: 'Everything is recorded and every review is async anyway.',
        },
      ],
    },
    {
      kind: 'final-cta',
      headline: 'Your next week can start from something.',
      body: '12 seats. Doors close when they are gone.',
      buttonLabel: 'Start your sprint',
    },
  ],
  stickyBar: { text: 'Brand Momentum · 12 seats · opens 1 Sep', buttonLabel: 'Start your sprint' },
  footer: 'Built on the Digital Home',
};
