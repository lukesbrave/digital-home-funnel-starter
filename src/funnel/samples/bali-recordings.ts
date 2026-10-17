/**
 * THE BALI CHAPTER RECORDINGS, sales page copy. 12-step direct response,
 * draft V5 (copy coach pass, 2026-10-16), in the editorial layout, one
 * block per step.
 *
 * Source material: the event page at bravebrand.com/events/bali-october-2026
 * (its pain language, its proof, its voice) and the printed itinerary (the
 * seven sessions and their one-line descriptions). Rules it obeys: the
 * $1,500 seat price is the only comparison, no worth figures, no partner
 * terms, proof only from the event page, no em dashes, no invented numbers,
 * no price before step 7. One voice: second person, inside the reader's
 * head, every paragraph handing to the next. No narrator, no "we", no
 * lines about the page itself. The event is provenance, never the pitch:
 * no "the room", no dates, no venue; every block sells what the seminars
 * do for the reader. No section eyebrows that only label the section.
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
      headline:
        'Seven Seminars That Will Collapse Years of Financial Anxiety and Uncertainty About Your Future Into Peace of Mind, at the Exact Moment in History When That Matters Most.',
      emphasis: 'Peace of Mind',
      subheadline:
        'Paul Counsel, the mentor who warned of the 2008 crash in his books, takes apart the conditioning that keeps money leaving you and shows you what has to change in the person holding it before it stays. At your own pace, as many times as it takes.',
      buttonLabel: 'Yes, I want peace of mind about my future',
      microcopy: 'Live Q&A included. One payment. Yours to keep.',
      variant: 'split',
      // The big picture is a silent loop of Paul speaking; until that clip is
      // supplied as images/bali/paul-loop.mp4, a loop stands in over a still.
      // The black square opens a short snippet with sound.
      media: { image: `${IMG}/paul-counsel-room.jpg`, video: `${IMG}/bali-hero-loop.mp4`, alt: 'Paul Counsel teaching' },
      panel: {
        label: 'Watch a minute of Paul',
        caption: 'A short preview of what you are about to learn.',
        preview: { video: `${IMG}/bali-chapter.mp4`, poster: `${IMG}/bali-chapter-poster.jpg` },
      },
    },
    {
      kind: 'problem',
      headline: "The hook you don't know you're hooked by.",
      emphasis: 'hooked by.',
      body: [
        'Think about the last time money came in. Not the number. The feeling. The small lift, the plan you made for it, and the week it took to go somewhere you never quite decided. Then the flat stretch after, and the quiet promise that next time would be different.',
        'You have made that promise before. You have read the books that told you what to do with the next one. Somewhere there is a spreadsheet with a version of you in it who does the right thing. And you still sold when the chart went red for a fortnight, and you still bought the thing at eleven at night because something in you needed the lift.',
        'So you have drawn the only conclusion the evidence seemed to allow. The problem is you. Not disciplined enough. Not sharp enough with money. Should be further along by now.',
        'Sit with that for a second, because it is the wrong conclusion, and the right one is harder to hear. The pull you feel at the checkout is not a weakness. It is a circuit. The one that kept your ancestors alive when food was scarce and status was survival is the same one now being pressed, hundreds of times a day, by systems built by people who understand it far better than you do. Anticipation releases more dopamine than reward ever does. That is the hook. And what you hand over each time it lands is not money. It is independence over your own experience.',
        'Keep going as you are and nothing dramatic happens. That is the point. The model of you gets a little sharper every week, the nudges a little better timed, and ten years from now you are inside the same pattern with less time to do anything about it. You can feel it under the ribs every time the month starts at zero. That feeling is the mechanism, noticed for one second, before something pulls your eyes back down.',
      ],
      image: { src: `${IMG}/paul-counsel-room.jpg`, alt: 'Paul Counsel teaching' },
    },
    {
      kind: 'story',
      headline: 'You cannot out-strategise a mechanism you cannot see.',
      emphasis: 'cannot see.',
      body:
        'Which is why no budget, no portfolio and no plan has ever held for you longer than the feeling that made it. Paul Counsel takes you down through the layers that decide what happens to your money before you have chosen anything, and back up with the capacity to choose. In order, at your own pace, and then a live Q&A where people in exactly your position put their own situations to him.',
      image: { src: `${IMG}/andaz-studio-longtable.jpg`, alt: 'Where the seminars were taught' },
      steps: [
        { title: 'First, you see the conditioning', body: 'The value system you were handed before you were old enough to question it, and the inherited rules still quietly making your financial decisions today. You were taught to sit still and then blamed for standing still. You cannot rewrite a rule you have never noticed you are following, so the first thing that happens is noticing.' },
        { title: 'Then you name the trade', body: 'The three things you accept without noticing in exchange for sovereignty over your own experience: a frictionless life, a place to belong, the spike of reward. And the chemical that makes each one feel like your own idea. Once you can watch it running, it stops holding you the way it did.' },
        { title: 'Then you change the person holding the money', body: 'Why it has arrived and left again your whole life, and what has to be different in you before a gain stays. Almost nobody teaches this part. It is where the teaching ends up, and it is where everything else you have ever tried finally starts to hold.' },
      ],
    },
    {
      kind: 'credentials',
      headline: 'The man who warned of 2008 in his books.',
      emphasis: 'in his books.',
      body: [
        'You are not being taught by someone who read about this. Paul Counsel has taught wealth psychology for twenty-eight years, built four businesses and written five books, including the ones that saw 2008 coming before it arrived. He was in crypto in 2015 and telling the people close to him about Bitcoin in 2017, years before you heard about it from a stranger.',
        'He does not sell a system and he will not hand you a script. What the people who have been near him longest describe is simpler and harder to buy: being close, for long enough, to someone who sees the world differently, until the way of seeing becomes your own. Here, you are that close.',
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
      headline: 'Everything, in full, and the one thing a live seat never gives you.',
      emphasis: 'never gives you.',
      body:
        'Live, you hear a seminar once and it is gone. Here you can stop on the sentence that lands, return to it the next morning, and sit with it until it changes something in you. That is the one advantage recorded teaching has over any seat in any room, and it is yours by default.',
      buttonLabel: 'Yes, I want every word of it',
      items: [
        { label: 'Every seminar in full, in the order it is meant to be heard', tag: 'recorded' },
        { label: 'The live Q&A, where people in your position put their own situations to Paul', tag: 'recorded' },
        { label: 'Stop, rewind and return to any seminar as often as you need', tag: 'yours to keep' },
        { label: 'Watch on any device, alone or with the person who shares your accounts', tag: 'included' },
      ],
    },
    {
      kind: 'proof',
      headline: 'What it has done for people like you.',
      emphasis: 'like you.',
      quotes: [
        {
          quote: "Paul is the person behind everything I've built. He told me about Bitcoin in 2017, years before the crowd arrived. He's not a guru. He's my mentor. And he's the reason I'm standing where I'm standing today.",
          who: 'Bryan Susilo',
          role: 'Crypto Trader & Wealth Builder',
        },
        {
          quote: "I came to Paul with zero: no business, no wealth strategy, no clear path forward. What he taught me wasn't a tactic or a trick. It was a complete rewiring of how I understood money and income. I went from yearly income to monthly income.",
          who: 'Luke Carter',
          role: 'Founder, BraveBrand',
        },
      ],
    },
    {
      kind: 'value-stack',
      headline: 'Each one takes away a reason money leaves you.',
      emphasis: 'money leaves you.',
      body: 'Each one in full, with the one line Paul uses to open it. Move through them.',
      image: { src: `${IMG}/andaz-studio-rounds.jpg`, alt: 'Where the seminars were taught' },
      buttonLabel: 'Yes, I want every one of them',
      items: [
        { label: 'A Radical New Discovery', detail: 'How your money brain is wired.', group: 'The wiring' },
        { label: 'Predictive Models', detail: 'Consciousness and the predictive nature of the forecasting brain.' },
        { label: 'The Feel Good Hormone', detail: 'Why reward prevents wealth.' },
        { label: 'The Conditioning of Capitalism', detail: 'The trade for predictability, conformity and servitude.', group: 'The trade' },
        { label: "The Hook You Don't Know You're Hooked By", detail: 'The chemical addiction keeping you poor.' },
        { label: 'Index Neurons', detail: 'How they are trained to support dopamine-driven consumption.' },
        { label: 'The Illusionary Self', detail: 'Why it is a controlled hallucination.', group: 'The self' },
      ],
    },
    {
      kind: 'scarcity',
      headline: 'The cycle does not wait for you to be ready.',
      emphasis: 'to be ready.',
      image: { src: `${IMG}/bali-coast-dusk.jpg`, alt: 'A coastline at dusk' },
      body: [
        'You are standing somewhere in an economic cycle right now, whether or not you have looked up to check. One of the seminars is about exactly where that is, what it is saying underneath the headlines, and how to position before it turns rather than after everyone agrees it has.',
        'Every month you spend inside the old pattern is a month the model of you gets sharper, the nudges get better timed, and the window to move before the turn gets narrower. The seminars will still be here next month. You will be a month further in.',
        'And the mechanism does not pause while you think about it. It is running now, in the small voice telling you that you will come back to this later. Notice that voice. You are about to find out what it is made of.',
      ],
    },
    {
      kind: 'guarantee',
      headline: 'Three things that will not move.',
      emphasis: 'will not move.',
      body: [
        'You get the seminars in full. Not a highlights cut, not a course rebuilt from notes afterwards. Every sentence Paul taught is in here for you.',
        'You pay once and nothing follows. No subscription, no second door, no upsell waiting behind the first. Your link arrives at the email you check out with, and it stays yours.',
        'You are dealt with by a person. If something is wrong, or the seminars are not what you expected, your message is read and answered by a human who would rather fix it than be right about it.',
      ],
      buttonLabel: 'Yes, I want peace of mind about my future',
    },
    {
      kind: 'pricing',
      headline: 'Everything is ready. The only thing left is your decision.',
      emphasis: 'your decision.',
      body:
        'Here is exactly what happens next. You press the button. You enter your email, so your receipt and your access link have somewhere to go. You pay $500 once on a secure Stripe page. Your link arrives at that email as soon as the seminars are ready. There is nothing else to do and nothing else to pay.',
      cardLabel: 'Full access',
      price: '$500',
      currencyLabel: 'USD',
      priceNote: 'One time',
      buttonLabel: 'Yes, give me access now',
      guarantee: 'Secure checkout by Stripe. One payment, no subscription. Your access link goes to the email you check out with.',
    },
    {
      kind: 'warning',
      headline: 'You will mean to come back to this.',
      emphasis: 'come back to this.',
      body: [
        'You will think about it on the drive home, and again the next time a month starts at zero. Then the feed will show you something, and the small lift of the next thing will do what it was built to do.',
        'A year from now you will be where you are today, with the same chart, the same resolve, and one more year of evidence that the problem is you. It is not you. It never was. But knowing that and having watched it taken apart are two different things, and only one of them changes what you do next.',
        'The people who do not come back to this later are not braver or richer than you. They noticed the pull while they were reading, and looked at it instead of away from it. That is the whole of what Paul teaches, in one decision. You can make it now.',
      ],
      buttonLabel: "Yes, I'm done with the pattern",
    },
    {
      kind: 'faq',
      headline: "Everything else you're wondering.",
      items: [
        { q: 'What exactly is in it?', a: "Paul Counsel's seven seminars, in full and in order, and the live Q&A where people in your position put their own situations to him." },
        { q: "I've read the books on money psychology.", a: 'Reading about the mechanism and watching it taken apart in front of you, with your own reactions to notice while it happens, are not the same experience. The second one is what you are buying.' },
        { q: 'Will I actually watch them all?', a: 'Start with the hook. It is the one you will not be able to stop thinking about afterwards, and it decides whether you want the rest. The seminars are long because the material is, and you are not timed.' },
        { q: 'When do I get access?', a: 'Your access link is sent to the email you check out with as soon as the seminars are ready.' },
        { q: 'How long do I have it for?', a: 'For as long as you want it. Nothing expires and nothing renews.' },
        { q: 'Can I share it?', a: 'Access is yours, and the person who shares your accounts. A friend who wants it needs their own.' },
        { q: 'Something else?', a: 'Reply to your receipt email and a person answers.' },
      ],
    },
    {
      kind: 'final-cta',
      body: 'P.S. Every seminar in full · A live Q&A · One payment · Yours to keep',
      headline: 'The pattern ends where you decide it ends.',
      emphasis: 'you decide it ends.',
      buttonLabel: 'Yes, I want peace of mind about my future',
      image: { src: `${IMG}/bali-scenery.jpg`, alt: 'A coastline at golden hour' },
    },
  ],
  stickyBar: { text: 'Paul Counsel', buttonLabel: 'Yes, I want in' },
  footer: 'BraveBrand',
};
