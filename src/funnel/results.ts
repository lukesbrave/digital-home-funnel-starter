/**
 * RESULTS — archetypes and result sections, mapped from signals.
 *
 * The engine tallies every signal the visitor's answers emit, picks
 * the archetype with the highest tally, then picks the best matching
 * variant for each section. Deterministic: same answers, same result.
 *
 * aiEnhance: true marks a section as visitor-specific. If the member
 * later configures a server-side provider key, only those sections
 * get rewritten. Brand method, proof, and CTA framing stay static.
 */
import type { Archetype, ResultSection } from '@/lib/types';

export const ARCHETYPES: Archetype[] = [
  {
    id: 'foundation',
    name: 'The Hidden Gem',
    headline: 'Your work is better than your brand says it is',
    description:
      'The craft is real, but the story around it is fuzzy. People cannot repeat what makes you different, so they default to comparing you on price. Your leverage is clarity: one sharp promise, said everywhere the same way.',
    signals: ['foundation'],
  },
  {
    id: 'visibility',
    name: 'The Best Kept Secret',
    headline: 'Your problem is not quality, it is reach',
    description:
      'The people who find you love you. The problem is how few people find you. You do not need a rebrand, you need a repeatable way to get in front of the right audience every single week.',
    signals: ['visibility'],
  },
  {
    id: 'conversion',
    name: 'The Leaky Bucket',
    headline: 'Attention is arriving, then slipping away',
    description:
      'You are getting looks, clicks, and conversations, but too few turn into paying clients. Small fixes at the decision moment compound fast: clearer offers, stronger proof, and follow-up that does not go quiet.',
    signals: ['conversion'],
  },
  {
    id: 'systems',
    name: 'The Manual Machine',
    headline: 'It works because you push it, every day',
    description:
      'Growth depends on your personal effort, so it stalls the moment you get busy. The next win is not more hustle, it is a pipeline that keeps moving when you look away: capture, nurture, and booking on rails.',
    signals: ['systems'],
  },
];

export const SECTIONS: ResultSection[] = [
  {
    id: 'diagnosis',
    aiEnhance: true,
    variants: [
      {
        when: ['foundation'],
        title: 'What your answers reveal',
        body: 'Your answers point at positioning. When the promise is fuzzy, marketing gets expensive: every post and page has to work twice as hard. Sharpen the promise first and everything downstream gets cheaper.',
        bullets: [
          'Prospects hesitate because they cannot tell what makes you the obvious choice',
          'Word of mouth works, but it spreads a vague story',
          'A clearer promise would lift every channel you already use',
        ],
      },
      {
        when: ['visibility'],
        title: 'What your answers reveal',
        body: 'Your answers point at reach. The offer converts when the right people see it, but the right people see it rarely and irregularly. Consistency in one channel beats bursts across five.',
        bullets: [
          'Your best clients found you by luck, not by system',
          'Activity spikes when you push, then goes quiet',
          'One owned channel, run weekly, changes the whole picture',
        ],
      },
      {
        when: ['conversion'],
        title: 'What your answers reveal',
        body: 'Your answers point at the decision moment. Interest is arriving, then leaking out between the first look and the yes. That leak is usually one or two fixable steps, not a mystery.',
        bullets: [
          'People engage but stall before buying',
          'Follow-up is manual, so it happens sometimes',
          'Proof and pricing clarity would close the gap fastest',
        ],
      },
      {
        when: ['systems'],
        title: 'What your answers reveal',
        body: 'Your answers point at infrastructure. The engine runs on your personal energy, which makes growth fragile. The fix is boring and powerful: capture every lead, follow up automatically, book without back and forth.',
        bullets: [
          'Pipeline health depends on how busy you are that week',
          'Leads slip through because nothing catches them',
          'A simple automated spine would free real hours every week',
        ],
      },
    ],
  },
  {
    id: 'first-move',
    aiEnhance: true,
    variants: [
      {
        when: ['foundation'],
        title: 'Your first move',
        body: 'Write the one sentence a happy client would say about you, then make your homepage headline say it. Do not touch anything else until that sentence is everywhere.',
      },
      {
        when: ['visibility'],
        title: 'Your first move',
        body: 'Pick the one channel where your buyers already spend time. Commit to showing up there twice a week for six weeks before judging results.',
      },
      {
        when: ['conversion'],
        title: 'Your first move',
        body: 'Find the last five people who showed interest but did not buy. Ask each one what held them back. The pattern in those answers is your roadmap.',
      },
      {
        when: ['systems'],
        title: 'Your first move',
        body: 'Set up one automatic catch: a form, a booking link, or a follow-up email that fires without you. One reliable rail beats ten good intentions.',
      },
    ],
  },
  {
    id: 'method',
    variants: [
      {
        title: 'How we approach this',
        body: 'Every engagement starts with the same spine: sharpen the promise, build the digital home around it, then put lead capture and follow-up on rails. Strategy first, tools second, and nothing shipped that you cannot see working.',
        bullets: [
          'One clear promise, tested against real audience language',
          'A website that sells while you sleep',
          'A CRM that catches and nurtures every lead automatically',
        ],
      },
    ],
  },
];
