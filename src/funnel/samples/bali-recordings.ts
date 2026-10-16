/**
 * THE BALI CHAPTER RECORDINGS, sales page copy. 12-step direct response,
 * draft V2 (copy coach pass, 2026-10-16), in the editorial layout.
 *
 * Source material: the event page at bravebrand.com/events/bali-october-2026
 * (its pain language, its proof, its voice) and the printed itinerary (the
 * seven sessions and their one-line descriptions). Rules it obeys: the
 * $1,500 seat price is the only comparison, no worth figures, no partner
 * terms, proof only from the event page, no em dashes, no invented numbers.
 *
 * Step map: hero = 1 (attention) · problem = 2 (pain stack) · story = 3 and
 * 4 (solution, stranger questions, credentials) · offer = 5 (benefits) ·
 * value-stack = 7 (the offer, anchored) · proof = 6 · pricing = 8, 9, 10
 * and 11 (real scarcity, guarantee line, the CTA spelled out, the warning)
 * · faq = hidden objections · final-cta = 12 (the reminder).
 *
 * Open for Luke: the guarantee (none decided; the pricing line says what
 * checkout does and nothing more) and the delivery timing in the FAQ.
 */
import type { SalesPageConfig } from '@/lib/types';

const IMG = '/images/bali';

export const SALES_BALI_RECORDINGS: SalesPageConfig = {
  layout: 'editorial',
  sections: [
    {
      kind: 'hero',
      eyebrow: 'The Bali Chapter · Paul Counsel · Recorded October 2026',
      headline: 'Your brain is working against your money.',
      emphasis: 'against your money.',
      subheadline:
        'Not as a figure of speech. Seven sessions, recorded in a room in Bali, where Paul Counsel takes apart the machinery underneath every financial decision you have ever made, and shows what has to change before money stays. Yours to keep for $500.',
      buttonLabel: 'Get the recordings',
      secondaryLabel: 'Start with the hook',
      microcopy: 'One payment · $500 USD · Lifetime access',
      media: { image: `${IMG}/bali-hero-poster.jpg`, video: `${IMG}/bali-hero-loop.mp4`, alt: 'Bali coastline at dusk' },
    },
    {
      kind: 'problem',
      kicker: 'The hook',
      headline: "The hook you don't know you're hooked by.",
      emphasis: "hooked by.",
      body: [
        'You know the shape of it. Money arrives and then it leaves again. A good month is followed by a flat one. You sell at the worst moment because a chart went red for a fortnight, and you buy the thing at eleven at night because something in you needed the small lift of buying it.',
        'The part you would not say out loud is that you read all of this as a character flaw. Not disciplined enough. Not smart enough with money. Should be further along by now. You have read the books. You still do the thing.',
        'It is not a flaw. It is a mechanism. The reward circuit that kept your ancestors alive is the same circuit now being pressed, hundreds of times a day, by an industry that understands it far better than you do. Anticipation produces far more dopamine than reward. That is the hook. What you hand over in exchange is not money. It is independence over your own experience.',
        'Here is what happens if nothing changes. The model of you gets sharper every week. The nudges get more precise. And the pattern you are living inside now is the pattern you are living inside in ten years, with less time left to do anything about it. You can feel it, under the ribs, every time the month starts at zero again.',
      ],
      image: { src: `${IMG}/paul-counsel-room.jpg`, alt: 'Paul Counsel teaching in the room at Andaz Bali', caption: 'Andaz Bali, Sanur · October 2026' },
    },
    {
      kind: 'story',
      kicker: 'The sessions',
      headline: 'You cannot out-strategise a mechanism you cannot see.',
      emphasis: 'cannot see.',
      body:
        'Paul Counsel has taught this for twenty-eight years, built four businesses and written five books, including the ones that warned of the 2008 crash. In October he spent three teaching days in a room in Sanur taking the mechanism apart in front of people who flew across the world to sit there. Every session was recorded. Seven of them, plus the final-day Q&A, in the order the room heard them. Watch them in a weekend or over a month. They do not expire.',
      image: { src: `${IMG}/andaz-studio-longtable.jpg`, alt: 'The studio at Andaz Bali set for a session' },
      steps: [
        { title: 'First, see the conditioning', body: 'The value system you were handed before you could question it, and the inherited rules still making your financial decisions today. You cannot rewrite a rule you have never noticed you are following.' },
        { title: 'Then, name the trade', body: 'The three things you reflexively accept in exchange for sovereignty over your own experience, and the chemical that makes the trade feel like a choice. Once you can see it, it stops holding.' },
        { title: 'Then, change the person holding it', body: 'Why money arrives and leaves again, and what has to change in the person holding it before a gain becomes permanent. This is the part almost nobody teaches, and it is where the week ends up.' },
      ],
    },
    {
      kind: 'offer',
      kicker: 'What you get',
      headline: 'Everything the room got, and one thing it did not.',
      emphasis: 'one thing it did not.',
      body:
        'The room heard each session once, live, with no way back. You get the full recordings, which means you can stop on the sentence that lands, go back to it the next morning, and sit with it until it changes something. That is the one advantage the recordings have over the seat.',
      buttonLabel: 'Get the recordings',
      items: [
        { label: "All seven of Paul's sessions, in full, in the order the room heard them", tag: 'recorded' },
        { label: 'The final-day Q&A, where the room put its own situations to Paul', tag: 'recorded' },
        { label: 'Stop, rewind and return to any session as often as you need', tag: 'yours to keep' },
        { label: 'Watch on any device, alone or with the person who shares your accounts', tag: 'included' },
      ],
    },
    {
      kind: 'value-stack',
      kicker: 'Inside',
      headline: 'Seven sessions. The room paid $1,500 to sit in them.',
      emphasis: 'to sit in them.',
      body: 'Each one a full recording from the studio at Andaz Bali, with the one-line brief Paul gave the room before he began.',
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
          role: 'Founder, BraveBrand · Host of The Bali Chapter',
        },
      ],
    },
    {
      kind: 'pricing',
      kicker: 'Get access',
      headline: 'The room is gone. The teaching is not.',
      emphasis: 'The teaching is not.',
      body:
        'There is no countdown on this page. The cost of waiting is the one you already know: another month inside the pattern, with the model of you getting sharper while you decide. Press the button, enter your email, and pay $500 once on a secure Stripe page. Your access link goes to that email the moment the sessions are ready. Most people who read this far will bookmark it and come back to the same month they are in now. The ones who do not are the ones who see the mechanism first.',
      cardLabel: 'The Recordings',
      price: '$500',
      currencyLabel: 'USD',
      priceNote: 'One time',
      buttonLabel: 'Get the recordings',
      guarantee: 'Secure checkout by Stripe. One payment, no subscription. Your access link goes to the email you check out with.',
    },
    {
      kind: 'faq',
      kicker: 'Questions',
      headline: "Everything else you're wondering.",
      items: [
        { q: "I wasn't in Bali. Is this still for me?", a: 'It was made for you. The room had the advantage of being there. You have the advantage of being able to go back. The teaching is the same.' },
        { q: "I've read the books on money psychology.", a: 'So had most of the room. Reading about the mechanism and watching it taken apart in front of you, with your own reactions to notice while it happens, are not the same experience. Paul teaches the second one.' },
        { q: 'Will I actually watch seven sessions?', a: 'Start with the hook. It is the one most people cannot stop thinking about afterwards, and it decides whether you want the rest. The sessions are long because the material is, and you are not timed.' },
        { q: 'When do I get access?', a: 'Your access link is sent to the email you check out with as soon as the sessions are edited after the event.' },
        { q: 'Is this the whole event?', a: "No. The island day, the dinners and the conversations between sessions stay in Bali. What you get is Paul's seven sessions and the final-day Q&A, in full." },
        { q: 'Can I share it?', a: 'Access is for one person, and the person who shares your accounts. If a friend wants it, send them here.' },
        { q: 'Something else?', a: 'Message us and a person answers.' },
      ],
    },
    {
      kind: 'final-cta',
      body: 'P.S. Seven sessions · The final-day Q&A · $500 once · Yours to keep',
      headline: "You had to be there. Now you don't.",
      emphasis: "Now you don't.",
      buttonLabel: 'Get the recordings',
      image: { src: `${IMG}/bali-scenery.jpg`, alt: 'Bali at golden hour' },
    },
  ],
  stickyBar: { text: 'The Bali Chapter Recordings · $500 once', buttonLabel: 'Get the recordings' },
  footer: 'BraveBrand Events',
};
