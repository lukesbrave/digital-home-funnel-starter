/**
 * THE BALI CHAPTER RECORDINGS, sales page copy. 12-step direct response,
 * draft V3 (copy coach pass, 2026-10-16), in the editorial layout, one
 * block per step.
 *
 * Source material: the event page at bravebrand.com/events/bali-october-2026
 * (its pain language, its proof, its voice) and the printed itinerary (the
 * seven sessions and their one-line descriptions). Rules it obeys: the
 * $1,500 seat price is the only comparison, no worth figures, no partner
 * terms, proof only from the event page, no em dashes, no invented numbers,
 * no price before step 7.
 *
 * Step map, in page order:
 *   1 hero · 2 problem · 3 story · 4 credentials · 5 offer · 6 proof ·
 *   7 value-stack · 8 scarcity · 9 guarantee · 10 pricing · 11 warning ·
 *   faq (hidden objections) · 12 final-cta (the P.S.)
 *
 * Open for Luke: the refund decision (the guarantee block promises only
 * what is true today and names no refund) and the delivery timing.
 */
import type { SalesPageConfig } from '@/lib/types';

const IMG = '/images/bali';

export const SALES_BALI_RECORDINGS: SalesPageConfig = {
  layout: 'editorial',
  sections: [
    {
      kind: 'hero',
      eyebrow: 'The Bali Chapter · Paul Counsel · Recorded October 2026',
      headline:
        'Five Days That Will Collapse Years of Financial Anxiety and Uncertainty About Your Future Into Peace of Mind, at the Exact Moment in History When That Matters Most.',
      emphasis: 'Peace of Mind',
      subheadline:
        'Seven sessions recorded in the room at The Bali Chapter, where Paul Counsel, the mentor who warned of the 2008 crash in his books, takes apart the conditioning that keeps money leaving and shows what has to change in the person holding it. Everything the room learned, in the order it learned it, at your own pace.',
      buttonLabel: 'Get the recordings',
      secondaryLabel: 'Start with the hook',
      microcopy: 'Seven sessions · The final-day Q&A · Recorded in the room',
      media: { image: `${IMG}/bali-hero-poster.jpg`, video: `${IMG}/bali-hero-loop.mp4`, alt: 'Bali coastline at dusk' },
    },
    {
      kind: 'problem',
      kicker: 'The hook',
      headline: "The hook you don't know you're hooked by.",
      emphasis: 'hooked by.',
      body: [
        'You know the shape of it. Money arrives and then it leaves again. A good month is followed by a flat one. You sell at the worst moment because a chart went red for a fortnight, and you buy the thing at eleven at night because something in you needed the small lift of buying it.',
        'The part you would not say out loud is that you read all of this as a character flaw. Not disciplined enough. Not smart enough with money. Should be further along by now. You have read the books. You have the spreadsheet. You still do the thing.',
        'It is not a flaw. It is a mechanism. The reward circuit that kept your ancestors alive when food was scarce and status was survival is the same circuit now being pressed, hundreds of times a day, by an industry that understands it far better than you do. Anticipation produces far more dopamine than reward. That is the hook. And what you hand over in exchange is not money. It is independence over your own experience, handed over reflexively, with your attention, your time and your next decision.',
        'Here is what happens if nothing changes. The model of you gets sharper every week. The nudges get more precise. The pattern you are living inside now is the pattern you are living inside in ten years, with less time left to do anything about it. You can feel it under the ribs every time the month starts at zero again. That feeling is not stress. It is the mechanism, noticed for a second, before the next thing pulls your eyes back down.',
      ],
      image: { src: `${IMG}/paul-counsel-room.jpg`, alt: 'Paul Counsel teaching in the room at Andaz Bali', caption: 'Andaz Bali, Sanur · October 2026' },
    },
    {
      kind: 'story',
      kicker: 'The sessions',
      headline: 'You cannot out-strategise a mechanism you cannot see.',
      emphasis: 'cannot see.',
      body:
        'So the week did not open with a spreadsheet or a portfolio. It opened with the machinery. Over three teaching days in a studio in Sanur, Paul Counsel took the room down through the layers that decide what happens to money before any strategy is chosen, and back up with the capacity to choose differently. Every session was recorded. Seven of them, plus the final-day Q&A, in the order the room heard them. Watch them in a weekend or over a month. They do not expire.',
      image: { src: `${IMG}/andaz-studio-longtable.jpg`, alt: 'The studio at Andaz Bali set for a session' },
      steps: [
        { title: 'First, see the conditioning', body: 'The value system you were handed before you could question it, and the inherited rules still making your financial decisions today. Education was designed and delivered before you had an opinion of your own. You cannot rewrite a rule you have never noticed you are following, so the first job is noticing.' },
        { title: 'Then, name the trade', body: 'The three things you reflexively accept in exchange for sovereignty over your own experience: a frictionless life, the need to fit in, the spike of reward. And the chemical that makes the trade feel like a choice. Once you can see it running, it stops holding the way it did.' },
        { title: 'Then, change the person holding it', body: 'Why money arrives and leaves again, and what has to change in the person holding it before a gain becomes permanent rather than temporary. This is the part almost nobody teaches. It is where the week ends up, and it is why the room came.' },
      ],
    },
    {
      kind: 'credentials',
      kicker: 'Paul Counsel',
      headline: 'The man who warned of 2008 in his books.',
      emphasis: 'in his books.',
      body: [
        'Paul Counsel has taught wealth psychology for twenty-eight years. He has built four businesses and written five books, including the ones that warned of the 2008 crash before it arrived. He was in crypto in 2015, and he told the people close to him about Bitcoin in 2017, years before the crowd.',
        'He is not a guru and he does not sell a system. The people who have worked with him longest describe the same thing: being near someone who sees the world differently, for long enough that the way of seeing becomes yours. The Bali Chapter was the deepest material of his twenty-eight years, taught to a room that flew across the world for it.',
      ],
      facts: [
        { label: 'Teaching', value: '28 years' },
        { label: 'Businesses built', value: 'Four' },
        { label: 'Books', value: 'Five' },
        { label: 'Called the crash', value: '2008' },
      ],
      image: { src: `${IMG}/paul-counsel-interview-solo.jpg`, alt: 'Paul Counsel' },
    },
    {
      kind: 'offer',
      kicker: 'What you get',
      headline: 'Everything the room got, and one thing it did not.',
      emphasis: 'one thing it did not.',
      body:
        'The room heard each session once, live, with no way back. You get the full recordings, which means you can stop on the sentence that lands, go back to it the next morning, and sit with it until it changes something. The people in the room would have paid for that. You get it by default.',
      buttonLabel: 'Get the recordings',
      items: [
        { label: "All seven of Paul's sessions, in full, in the order the room heard them", tag: 'recorded' },
        { label: 'The final-day Q&A, where the room put its own situations to Paul', tag: 'recorded' },
        { label: 'Stop, rewind and return to any session as often as you need', tag: 'yours to keep' },
        { label: 'Watch on any device, alone or with the person who shares your accounts', tag: 'included' },
      ],
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
      kind: 'scarcity',
      kicker: 'Why now',
      headline: 'There is no countdown on this page.',
      emphasis: 'on this page.',
      body: [
        'The recordings will be here next month at the same price. We are not going to pretend otherwise, because the one thing this page is about is seeing through the pull, and a fake timer would be the pull.',
        'The scarcity is yours, not ours. Paul spent one of the seven sessions on reading the cycle you are standing in: where it sits, what it is saying underneath the headlines, and how to position before it turns rather than after everyone agrees it has. Cycles do not wait for a decision. Every month inside the old pattern is a month the model of you gets sharper and the window gets narrower.',
        'And the mechanism does not pause while you think about it. It is running now, on this page, in the small voice saying you will come back to this later. That voice is the subject of session five.',
      ],
    },
    {
      kind: 'guarantee',
      kicker: 'The only promises we make',
      headline: 'Three things you can be sure of.',
      emphasis: 'sure of.',
      body: [
        'The sessions are the sessions. Full recordings of what the room heard, not a highlights cut, not a course built afterwards from notes. If a sentence landed in Bali, it is in here.',
        'The access does not expire and nothing recurs. One payment, no subscription, no upsell waiting behind the door. The link goes to the email you check out with, and it stays yours.',
        'A person answers. If something is wrong, or the recordings are not what you expected, message us and a human replies. We would rather fix it than be right about it.',
      ],
      buttonLabel: 'Get the recordings',
    },
    {
      kind: 'pricing',
      kicker: 'Get access',
      headline: 'The room is gone. The teaching is not.',
      emphasis: 'The teaching is not.',
      body:
        'Here is exactly what happens next. Press the button. Enter your email, so the receipt and the access link have somewhere to go. Pay $500 once on a secure Stripe page. Your access link is sent to that email the moment the sessions are ready. There is nothing else to do, and nothing else to pay.',
      cardLabel: 'The Recordings',
      price: '$500',
      currencyLabel: 'USD',
      priceNote: 'One time',
      buttonLabel: 'Get the recordings',
      guarantee: 'Secure checkout by Stripe. One payment, no subscription. Your access link goes to the email you check out with.',
    },
    {
      kind: 'warning',
      kicker: 'If you do nothing',
      headline: 'Most people who read this far will bookmark it.',
      emphasis: 'bookmark it.',
      body: [
        'They will mean to come back. They will think about it on the drive home, and again the next time a month starts at zero. Then the feed will show them something, and the small lift of the next thing will do what it was built to do.',
        'A year from now they will be exactly where they are today, with the same chart, the same resolve, and one more year of evidence that the problem is them. It is not them. It never was. But knowing that and having seen it taken apart are two different things, and only one of them changes what you do next.',
        'The people who do not bookmark it are not braver or richer. They are the ones who noticed the pull while they were reading, and decided to look at it instead of away from it. That is the whole of what Paul teaches, in one decision, and you can make it now.',
      ],
      buttonLabel: 'Get the recordings',
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
      body: 'P.S. Seven sessions · The final-day Q&A · One payment · Yours to keep',
      headline: "You had to be there. Now you don't.",
      emphasis: "Now you don't.",
      buttonLabel: 'Get the recordings',
      image: { src: `${IMG}/bali-scenery.jpg`, alt: 'Bali at golden hour' },
    },
  ],
  stickyBar: { text: 'The Bali Chapter Recordings', buttonLabel: 'Get the recordings' },
  footer: 'BraveBrand Events',
};
