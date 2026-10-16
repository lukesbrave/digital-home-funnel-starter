/**
 * FALLBACK DRAFT: The Bali Chapter Recordings, in the editorial layout.
 *
 * A complete first draft of the twelve-step page so a live build always
 * has a floor under it. The copy desk's live words replace it section by
 * section; nothing here is final. Rules it already obeys: the $1,500 seat
 * price is the only comparison, no worth figures, no partner terms, proof
 * only from the event page, no em dashes.
 *
 * Sessions and their one-line descriptions are from the printed itinerary
 * (14 to 18 October 2026). Delivery timing and the Q&A line are to be
 * confirmed by Luke.
 */
import type { SalesPageConfig } from '@/lib/types';

const IMG = '/images/bali';

export const SALES_BALI_RECORDINGS: SalesPageConfig = {
  layout: 'editorial',
  sections: [
    {
      kind: 'hero',
      eyebrow: 'The Bali Chapter · October 2026',
      headline: 'The room, recorded.',
      emphasis: 'recorded.',
      subheadline:
        "Paul Counsel's seven sessions from Sanur, filmed in the room and yours to come back to. The material the room paid $1,500 to sit in, at your own pace, for $500.",
      buttonLabel: 'Get the recordings',
      secondaryLabel: "See what's inside",
      microcopy: 'One payment · $500 USD',
      media: { image: `${IMG}/bali-hero-poster.jpg`, video: `${IMG}/bali-hero-loop.mp4`, alt: 'Bali coastline at dusk' },
    },
    {
      kind: 'problem',
      kicker: 'The problem',
      headline: 'You were taught to sit still, then blamed for standing still.',
      emphasis: 'standing still.',
      body: [
        'Most people never create wealth, and it is not for lack of effort. They were handed a value system before they were old enough to question it, and a reward circuit that consumer systems are built to pull on. Every financial decision since has been made inside that conditioning.',
        'Paul has spent twenty-eight years on why that happens and how it reverses. In Bali he taught the deepest version of it he has ever taught, to a room that flew across the world to sit in it.',
        'You could not be in the room. The recordings are the next best thing, and in one way better: you can stop, go back, and sit with the part that lands.',
      ],
      image: { src: `${IMG}/paul-counsel-room.jpg`, alt: 'Paul Counsel teaching in the room at Andaz Bali', caption: 'Andaz Bali, Sanur · October 2026' },
    },
    {
      kind: 'story',
      kicker: 'How it works',
      headline: 'Three days in the room. One way of seeing.',
      emphasis: 'One way of seeing.',
      body: 'Paul does not teach tactics. He takes the room down through the layers that decide what happens to money before any strategy is chosen, and back up with the capacity to choose differently.',
      image: { src: `${IMG}/andaz-studio-longtable.jpg`, alt: 'The studio at Andaz Bali set for a session' },
      steps: [
        { title: 'See the conditioning', body: 'The value system you were handed before you could question it, and the inherited rules still making your financial decisions today. You cannot rewrite a rule you have never noticed you are following.' },
        { title: 'Name the trade', body: 'The reward circuit consumer systems are built to pull on, and what you reflexively accept in exchange for sovereignty over your own experience. No strategy survives a mechanism you cannot see.' },
        { title: 'Change the person holding it', body: 'Why money arrives and then leaves again, and what has to change in the person holding it before a gain becomes permanent rather than temporary.' },
      ],
    },
    {
      kind: 'offer',
      kicker: 'What you get',
      headline: 'Every session from the room, nothing held back.',
      emphasis: 'nothing held back.',
      body: 'The full recordings of all seven sessions, plus the final-day Q&A where Paul answered the room directly. Watch on any device, in any order, as often as you need.',
      buttonLabel: 'Get the recordings',
      items: [
        { label: "Paul Counsel's seven sessions, in full", tag: 'recorded' },
        { label: 'The final-day Q&A with the room', tag: 'recorded' },
        { label: 'Watch at your own pace, on any device', tag: 'included' },
        { label: 'Come back to any session as often as you need', tag: 'included' },
      ],
    },
    {
      kind: 'value-stack',
      kicker: 'Included',
      headline: 'What the room paid to sit in.',
      emphasis: 'sit in.',
      body: 'Seven sessions, each one a full recording from the studio at Andaz Bali.',
      buttonLabel: 'Get the recordings',
      items: [
        { label: 'A Radical New Discovery', detail: 'How your money brain is wired.' },
        { label: 'Predictive Models', detail: 'Consciousness and the predictive nature of the forecasting brain.' },
        { label: 'The Feel Good Hormone', detail: 'Why reward prevents wealth.' },
        { label: 'The Conditioning of Capitalism', detail: 'The trade for predictability, conformity and servitude.' },
        { label: "The Hook You Don't Know You're Hooked By", detail: 'The chemical addiction keeping you poor.' },
        { label: 'Index Neurons', detail: 'How they are trained to support dopamine-driven consumption.' },
        { label: 'The Illusionary Self', detail: 'Why it is a controlled hallucination.' },
      ],
      total: { label: 'What the room paid to sit in these', value: '$1,500' },
    },
    {
      kind: 'proof',
      kicker: 'Stories',
      headline: 'Stories from the room.',
      emphasis: 'the room.',
      quotes: [
        {
          quote: "Paul is the person behind everything I've built. He told me about Bitcoin in 2017, years before the crowd arrived. He's not a guru. He's my mentor. And he's the reason I'm standing where I'm standing today.",
          who: 'Bryan Susilo',
          role: 'Crypto Trader & Wealth Builder',
        },
        {
          quote: "I came to Paul with zero: no business, no wealth strategy, no clear path forward. What he taught me wasn't a tactic or a trick. It was a complete rewiring of how I understood money and income. I went from yearly income to monthly income.",
          who: 'Luke Carter',
          role: 'Digital Marketing & Brand Strategist',
        },
      ],
    },
    {
      kind: 'pricing',
      kicker: 'Get access',
      headline: 'One room. Yours to keep.',
      emphasis: 'Yours to keep.',
      body: 'The seat was $1,500 and the room is gone. The recordings are $500, one payment, and they do not leave.',
      cardLabel: 'The Recordings',
      price: '$500',
      currencyLabel: 'USD',
      priceNote: 'One time',
      buttonLabel: 'Get the recordings',
      guarantee: 'Secure checkout by Stripe. Your access link goes to the email you check out with.',
    },
    {
      kind: 'faq',
      kicker: 'Questions',
      headline: "Everything else you're wondering.",
      items: [
        { q: 'When do I get access?', a: 'Your access link is sent to the email you check out with as soon as the sessions are ready after the event.' },
        { q: 'What exactly is included?', a: "Paul Counsel's seven sessions from the three teaching days, recorded in full, and the final-day Q&A with the room." },
        { q: 'Is this the same as attending?', a: 'No. The room, the island day and the conversations between sessions stay in Bali. What you get is the teaching itself, as the room heard it, with the ability to go back.' },
        { q: 'Can I share it with someone?', a: 'Access is for one person. If a friend wants it, send them here.' },
        { q: 'I have a question that is not here.', a: 'Message us and a person answers.' },
      ],
    },
    {
      kind: 'final-cta',
      body: 'The Bali Chapter · Recorded October 2026',
      headline: "You had to be there. Now you don't.",
      emphasis: "Now you don't.",
      buttonLabel: 'Get the recordings',
      image: { src: `${IMG}/bali-scenery.jpg`, alt: 'Bali at golden hour' },
    },
  ],
  stickyBar: { text: 'The Bali Chapter Recordings · $500', buttonLabel: 'Get the recordings' },
  footer: 'BraveBrand Events',
};
