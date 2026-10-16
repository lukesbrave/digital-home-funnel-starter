/**
 * THE BALI CHAPTER RECORDINGS, sales page copy. 12-step direct response,
 * draft V4 (copy coach pass, 2026-10-16), in the editorial layout, one
 * block per step.
 *
 * Source material: the event page at bravebrand.com/events/bali-october-2026
 * (its pain language, its proof, its voice) and the printed itinerary (the
 * seven sessions and their one-line descriptions). Rules it obeys: the
 * $1,500 seat price is the only comparison, no worth figures, no partner
 * terms, proof only from the event page, no em dashes, no invented numbers,
 * no price before step 7. One voice: second person, inside the reader's
 * head, every paragraph handing to the next. No narrator, no "we", no
 * lines about the page itself.
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
        'Seven Seminars That Will Collapse Years of Financial Anxiety and Uncertainty About Your Future Into Peace of Mind, at the Exact Moment in History When That Matters Most.',
      emphasis: 'Peace of Mind',
      subheadline:
        'Seven seminars recorded in the room at The Bali Chapter, where Paul Counsel, the mentor who warned of the 2008 crash in his books, takes apart the conditioning that keeps money leaving and shows what has to change in the person holding it. Everything the room learned, in the order it learned it, at your own pace.',
      buttonLabel: 'Get the recordings',
      secondaryLabel: 'Start with the hook',
      microcopy: 'Seven seminars · The final-day Q&A · Recorded in the room',
      media: { image: `${IMG}/bali-hero-poster.jpg`, video: `${IMG}/bali-hero-loop.mp4`, alt: 'Bali coastline at dusk' },
    },
    {
      kind: 'problem',
      kicker: 'Start here',
      headline: "The hook you don't know you're hooked by.",
      emphasis: 'hooked by.',
      body: [
        'Think about the last time money came in. Not the number. The feeling. The small lift, the plan you made for it, and the week it took to go somewhere you never quite decided. Then the flat stretch after, and the quiet promise that next time would be different.',
        'You have made that promise before. You have read the books that told you what to do with the next one. Somewhere there is a spreadsheet with a version of you in it who does the right thing. And you still sold when the chart went red for a fortnight, and you still bought the thing at eleven at night because something in you needed the lift.',
        'So you have drawn the only conclusion the evidence seemed to allow. The problem is you. Not disciplined enough. Not sharp enough with money. Should be further along by now.',
        'Sit with that for a second, because it is the wrong conclusion, and the right one is harder to hear. The pull you feel at the checkout is not a weakness. It is a circuit. The one that kept your ancestors alive when food was scarce and status was survival is the same one now being pressed, hundreds of times a day, by systems built by people who understand it far better than you do. Anticipation releases more dopamine than reward ever does. That is the hook. And what you hand over each time it lands is not money. It is independence over your own experience.',
        'Keep going as you are and nothing dramatic happens. That is the point. The model of you gets a little sharper every week, the nudges a little better timed, and ten years from now you are inside the same pattern with less time to do anything about it. You can feel it under the ribs every time the month starts at zero. That feeling is the mechanism, noticed for one second, before something pulls your eyes back down.',
      ],
      image: { src: `${IMG}/paul-counsel-room.jpg`, alt: 'Paul Counsel teaching in the room at Andaz Bali', caption: 'Andaz Bali, Sanur · October 2026' },
    },
    {
      kind: 'story',
      kicker: 'What changes it',
      headline: 'You cannot out-strategise a mechanism you cannot see.',
      emphasis: 'cannot see.',
      body:
        'Which is why no budget, no portfolio and no plan has ever held for you longer than the feeling that made it. Over three days in a studio in Sanur, Paul Counsel took a room of people exactly where you are now down through the layers that decide what happens to your money before you have chosen anything, and back up with the capacity to choose. Seven seminars, recorded as the room heard them, and the final afternoon where the room put its own situations to him.',
      image: { src: `${IMG}/andaz-studio-longtable.jpg`, alt: 'The studio at Andaz Bali set for a session' },
      steps: [
        { title: 'First, you see the conditioning', body: 'The value system you were handed before you were old enough to question it, and the inherited rules still quietly making your financial decisions today. You were taught to sit still and then blamed for standing still. You cannot rewrite a rule you have never noticed you are following, so the first thing that happens is noticing.' },
        { title: 'Then you name the trade', body: 'The three things you accept without noticing in exchange for sovereignty over your own experience: a frictionless life, a place to belong, the spike of reward. And the chemical that makes each one feel like your own idea. Once you can watch it running, it stops holding you the way it did.' },
        { title: 'Then you change the person holding the money', body: 'Why it has arrived and left again your whole life, and what has to be different in you before a gain stays. Almost nobody teaches this part. It is where the three days end up, and it is the reason the room flew across the world.' },
      ],
    },
    {
      kind: 'credentials',
      kicker: 'Who is teaching you',
      headline: 'The man who warned of 2008 in his books.',
      emphasis: 'in his books.',
      body: [
        'You are not being taught by someone who read about this. Paul Counsel has taught wealth psychology for twenty-eight years, built four businesses and written five books, including the ones that saw 2008 coming before it arrived. He was in crypto in 2015 and telling the people close to him about Bitcoin in 2017, years before you heard about it from a stranger.',
        'He does not sell a system and he will not hand you a script. What the people who have been near him longest describe is simpler and harder to buy: being close, for long enough, to someone who sees the world differently, until the way of seeing becomes your own. For seven seminars, you are that close.',
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
        'The room heard each seminar once, live, with no way back. You get the full recordings, which means you can stop on the sentence that lands, return to it the next morning, and sit with it until it changes something in you. The people in the room would have paid for that. For you it is simply how it comes.',
      buttonLabel: 'Get the recordings',
      items: [
        { label: "All seven of Paul's seminars, in full, in the order the room heard them", tag: 'recorded' },
        { label: 'The final-day Q&A, where the room put its own situations to Paul', tag: 'recorded' },
        { label: 'Stop, rewind and return to any seminar as often as you need', tag: 'yours to keep' },
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
      headline: 'Seven seminars. The room paid $1,500 to sit in them.',
      emphasis: 'to sit in them.',
      body: 'Each one in full, as the room heard it, with the one-line brief Paul gave before he began.',
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
      headline: 'The cycle does not wait for you to be ready.',
      emphasis: 'to be ready.',
      body: [
        'You are standing somewhere in an economic cycle right now, whether or not you have looked up to check. Paul spent one of the seven seminars on exactly where that is, what it is saying underneath the headlines, and how to position before it turns rather than after everyone agrees it has.',
        'Every month you spend inside the old pattern is a month the model of you gets sharper, the nudges get better timed, and the window to move before the turn gets narrower. The recordings will still be here next month. You will be a month further in.',
        'And the mechanism does not pause while you think about it. It is running now, in the small voice telling you that you will come back to this later. Notice that voice. You are about to find out what it is made of.',
      ],
    },
    {
      kind: 'guarantee',
      kicker: 'What you can count on',
      headline: 'Three things that will not move.',
      emphasis: 'will not move.',
      body: [
        'You get the seminars as the room heard them. Full recordings, not a highlights cut, not a course rebuilt from notes afterwards. If a sentence landed in Bali, it is in here for you.',
        'You pay once and nothing follows. No subscription, no second door, no upsell waiting behind the first. Your link arrives at the email you check out with, and it stays yours.',
        'You are dealt with by a person. If something is wrong, or the recordings are not what you expected, your message is read and answered by a human who would rather fix it than be right about it.',
      ],
      buttonLabel: 'Get the recordings',
    },
    {
      kind: 'pricing',
      kicker: 'Get access',
      headline: 'The room is gone. The teaching is not.',
      emphasis: 'The teaching is not.',
      body:
        'Here is exactly what happens next. You press the button. You enter your email, so your receipt and your access link have somewhere to go. You pay $500 once on a secure Stripe page. Your link arrives at that email the moment the seminars are ready. There is nothing else to do and nothing else to pay.',
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
      headline: 'You will mean to come back to this.',
      emphasis: 'come back to this.',
      body: [
        'You will think about it on the drive home, and again the next time a month starts at zero. Then the feed will show you something, and the small lift of the next thing will do what it was built to do.',
        'A year from now you will be where you are today, with the same chart, the same resolve, and one more year of evidence that the problem is you. It is not you. It never was. But knowing that and having watched it taken apart are two different things, and only one of them changes what you do next.',
        'The people who do not come back to this later are not braver or richer than you. They noticed the pull while they were reading, and looked at it instead of away from it. That is the whole of what Paul teaches, in one decision. You can make it now.',
      ],
      buttonLabel: 'Get the recordings',
    },
    {
      kind: 'faq',
      kicker: 'Questions',
      headline: "Everything else you're wondering.",
      items: [
        { q: "I wasn't in Bali. Is this still for me?", a: 'It was made for you. The room had the advantage of being there. You have the advantage of being able to go back. The teaching is the same.' },
        { q: "I've read the books on money psychology.", a: 'So had most of the room. Reading about the mechanism and watching it taken apart in front of you, with your own reactions to notice while it happens, are not the same experience. The second one is what you are buying.' },
        { q: 'Will I actually watch seven seminars?', a: 'Start with the hook. It is the one you will not be able to stop thinking about afterwards, and it decides whether you want the rest. The seminars are long because the material is, and you are not timed.' },
        { q: 'When do I get access?', a: 'Your access link is sent to the email you check out with as soon as the seminars are edited after the event.' },
        { q: 'Is this the whole event?', a: "No. The island day, the dinners and the conversations between seminars stay in Bali. What you get is Paul's seven seminars and the final-day Q&A, in full." },
        { q: 'Can I share it?', a: 'Access is yours, and the person who shares your accounts. A friend who wants it needs their own.' },
        { q: 'Something else?', a: 'Reply to your receipt email and a person answers.' },
      ],
    },
    {
      kind: 'final-cta',
      body: 'P.S. Seven seminars · The final-day Q&A · One payment · Yours to keep',
      headline: "You had to be there. Now you don't.",
      emphasis: "Now you don't.",
      buttonLabel: 'Get the recordings',
      image: { src: `${IMG}/bali-scenery.jpg`, alt: 'Bali at golden hour' },
    },
  ],
  stickyBar: { text: 'The Bali Chapter Recordings', buttonLabel: 'Get the recordings' },
  footer: 'BraveBrand Events',
};
