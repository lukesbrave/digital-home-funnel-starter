/**
 * THE BALI CHAPTER RECORDINGS, sales page copy. 12-step direct response,
 * draft V6 (line-by-line pass, 2026-10-17), in the editorial layout, one
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
        'Most people never become wealthy, and it has nothing to do with income or effort. It is conditioning that decides what happens to your money before you choose anything. Paul Counsel, 28 years teaching wealth psychology and the mentor who warned of 2008, shows you how to see it, break it, and start building wealth that stays. Get instant access to the full recordings and start rewiring your brain for a lifetime of wealth.',
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
        "Think about the last time money came in. Remember the lift when you saw it land. Now think about how it felt two weeks later, when you checked again and most of it was gone, and you couldn't say exactly where.",
        "That low hum of unease is familiar. It's there when the card taps at the checkout, when a friend books a holiday you can't justify, when you lie awake doing the maths on what happens if the work dries up. You've promised yourself next time will be different. It hasn't been, yet.",
        "So you've drawn the only conclusion the evidence seems to allow. The problem is you. Not disciplined enough. Not good enough with money. Should be further along by now.",
        "Hold that thought for a second, because it's wrong. Think about the last thing you really wanted to buy. The days of looking at it, the tab you kept open, the little rush when you finally pressed pay. Then the box arrived, and it sat by the door for a week before you opened it.",
        "That gap is the hook. Your brain releases more dopamine wanting something than having it, the same wiring that kept your ancestors hunting. Every app, ad and checkout you touch is built by people who understand that wiring better than you do, and they press it hundreds of times a day. What it costs you isn't only money. It's the decisions you think are yours.",
        "Leave it running and nothing dramatic happens. That's what makes it dangerous. The ads get a little more accurate, the urge a little better timed, and ten years from now you're still lying awake doing the same maths, with less time left to change the answer.",
      ],
      image: { src: `${IMG}/paul-counsel-room.jpg`, alt: 'Paul Counsel teaching' },
    },
    {
      kind: 'story',
      headline: "You can't out-plan a mechanism you can't see.",
      emphasis: "you can't see.",
      body:
        "Which is why the budget lasted three weeks. Why the savings plan quietly stopped. Why the investing app got deleted after one bad month. None of it failed because you're lazy. It failed because it was built on top of the hook instead of underneath it. Paul Counsel goes underneath. He shows you what decides your money before you've chosen anything, then how to choose differently, one recording at a time, with a live Q&A where people in your position put their own situations to him.",
      image: { src: `${IMG}/andaz-studio-longtable.jpg`, alt: 'Where the seminars were taught' },
      steps: [
        { title: 'First, you see the conditioning', body: "The rules about money you picked up before you were old enough to question them. Money is hard to come by. People like us don't do that. Spend it before it disappears. You've followed them for decades without ever agreeing to. You can't change a rule you can't see, so the first thing that happens is that you see it." },
        { title: 'Then you name the trade', body: "The three things you swap your attention for without noticing: life without friction, the feeling of belonging, the hit of reward. Once you can catch yourself mid-swap, thumb hovering over the buy button, it stops working on you the way it did." },
        { title: 'Then you change the person holding the money', body: "Why money has arrived and left your whole life, and what has to be different in you before it stays. Almost nobody teaches this part, and it's where building wealth actually starts. Not with a strategy, but with a person who can hold one." },
      ],
    },
    {
      kind: 'credentials',
      headline: 'The man who warned of 2008 in his books.',
      emphasis: 'in his books.',
      body: [
        "You'd want to learn that from someone who has done it, not someone who read about it. Paul Counsel has taught wealth psychology for 28 years, built four businesses and written five books, including the ones that warned of the 2008 crash before it hit. He was in crypto in 2015 and telling the people close to him about Bitcoin in 2017, years before you heard about it from a stranger at a barbecue.",
        "He won't hand you a script or sell you a system. The people closest to him describe something simpler: spend enough time near someone who sees money differently, and you start to see it that way too. Every recording puts you right next to him.",
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
      headline: 'Every word of it, and a pause button.',
      emphasis: 'a pause button.',
      body:
        "When a line hits, you'll want to stop. Rewind it. Play it again on your commute, then once more before bed. That's how this sinks in: not in one sitting, but the third or fourth time you hear the line that was meant for you. Do that as often as you like, on any device, for as long as you want.",
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
      headline: 'What happens when it lands.',
      emphasis: 'when it lands.',
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
      body: 'For both of them, it started here. Each recording opens with a single line from Paul. Move through them.',
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
      headline: 'Every payday runs through the same hook.',
      emphasis: 'the same hook.',
      image: { src: `${IMG}/bali-coast-dusk.jpg`, alt: 'A coastline at dusk' },
      body: [
        "Count back to the first time you told yourself you'd get serious about money. How many paydays since then? Each one landed, felt good for a moment, and was gone before the next one arrived.",
        "Nothing about next month is set up to be different. Prices keep climbing, the ads keep getting sharper, and the gap between what you earn and what you keep stays exactly where it is, unless something in you changes first.",
        "And notice the small voice right now, the one saying you'll come back to this later. That voice is the hook, working in real time. You're about to find out exactly how it's built.",
      ],
    },
    {
      kind: 'guarantee',
      headline: 'Three things you can count on.',
      emphasis: 'count on.',
      body: [
        "You get every seminar exactly as it was taught. No highlights reel, no course pieced together from notes afterwards. If Paul said it, it's in there.",
        "You pay once and that's it. No subscription quietly renewing, no upsell waiting on the next screen. Your link lands in your inbox and stays yours.",
        "A real person looks after you. If something's wrong, or it isn't what you expected, reply to your receipt and a human sorts it out.",
      ],
      buttonLabel: "Yes, I'm ready to start",
    },
    {
      kind: 'pricing',
      headline: 'Everything is ready. The only thing left is your decision.',
      emphasis: 'your decision.',
      body:
        "Here's exactly what happens next. You press the button and enter your email, so your receipt and your access link have somewhere to go. You pay $500 once on a secure Stripe page. A minute later the link is in your inbox and the first recording is ready to play. Tonight, if you want.",
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
        "You'll think about it on the way home, and again the next time you check your balance. Then your phone will buzz, something else will grab you, and the tab will quietly close.",
        "A year from now you'll be checking the same balance with the same tight feeling, making the same promise, with one more year of evidence that the problem is you. It isn't. It never was. But knowing that and watching it taken apart are two different things, and only one of them changes what you do on payday.",
        "The people who don't come back to this later aren't braver or richer than you. They noticed the pull while they were reading, and looked at it instead of away. That's the whole of what Paul teaches, in one decision. You can make it now.",
      ],
      buttonLabel: "Yes, I'm done with the pattern",
    },
    {
      kind: 'faq',
      headline: "Everything else you're wondering.",
      items: [
        { q: 'What exactly is in it?', a: "Paul Counsel's seven seminars, in full and in order, and the live Q&A where people in your position put their own situations to him." },
        { q: "I've read the books on money psychology.", a: "Then you know the ideas, and knowing them hasn't stopped the late-night checkout. Watching the mechanism taken apart while you catch yourself doing it is a different experience, and it's the one that changes what you do." },
        { q: 'Will I actually watch them all?', a: "Start with the hook. Most people can't stop after that one. Watch one a night or all of them over a weekend. Nothing is timed and nothing expires." },
        { q: 'When do I get access?', a: 'The moment you check out. Your access link goes straight to the email you use.' },
        { q: 'How long do I have it for?', a: 'For as long as you want it. Nothing expires and nothing renews.' },
        { q: 'Can I share it?', a: 'Access is yours, and the person who shares your accounts. A friend who wants it needs their own.' },
        { q: 'Something else?', a: 'Reply to your receipt email and a person answers.' },
      ],
    },
    {
      kind: 'final-cta',
      body: 'P.S. Every seminar in full · A live Q&A · One payment · Yours to keep',
      headline: 'Next payday can be the first one that stays.',
      emphasis: 'the first one that stays.',
      buttonLabel: 'Yes, I want peace of mind about my future',
      image: { src: `${IMG}/bali-scenery.jpg`, alt: 'A coastline at golden hour' },
    },
  ],
  stickyBar: { text: 'Paul Counsel', buttonLabel: 'Yes, I want in' },
  footer: 'BraveBrand',
};
