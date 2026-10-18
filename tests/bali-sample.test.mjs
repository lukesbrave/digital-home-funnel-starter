import { existsSync } from 'node:fs';
/**
 * The Bali Recordings fallback draft keeps the rules it was written under.
 * Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SALES_BALI_RECORDINGS as SALES } from '../src/funnel/samples/bali-recordings.ts';

const text = JSON.stringify(SALES);

test('editorial layout with one block per step of the twelve, in order', () => {
  assert.equal(SALES.layout, 'editorial');
  assert.deepEqual(
    SALES.sections.map((s) => s.kind),
    ['hero', 'problem', 'story', 'credentials', 'offer', 'proof', 'value-stack', 'scarcity', 'guarantee', 'pricing', 'warning', 'faq', 'final-cta']
  );
});

test('no live or seat price anywhere; the only price is the price card', () => {
  assert.ok(!text.includes('997'));
  assert.ok(!text.includes('1,500'), 'no live price');
  assert.ok(!text.includes('—'), 'no em dashes');
  const stack = SALES.sections.find((s) => s.kind === 'value-stack');
  assert.equal(stack.items.length, 7);
  for (const item of stack.items) assert.equal(item.value, undefined, item.label);
  assert.equal(stack.total, undefined);
  assert.equal(SALES.sections.find((s) => s.kind === 'pricing').price, '$500');
});

test('no price before step seven: the hero and the rail carry none', () => {
  const hero = SALES.sections[0];
  const heroText = JSON.stringify(hero) + (SALES.stickyBar?.text ?? '');
  assert.ok(!heroText.includes('$'), 'no dollar figure in the hero or the sticky bar text');
  const firstPriced = SALES.sections.findIndex((s) => JSON.stringify(s).includes('$'));
  assert.equal(SALES.sections[firstPriced].kind, 'pricing', 'the first price on the page is the price card');
});

test('no narrator: no "we", no lines about the page itself', () => {
  const prose = SALES.sections.flatMap((s) => [s.headline, s.subheadline, s.body, ...(s.items ?? []).map((i) => i.a ?? i.detail ?? i.label), ...(s.steps ?? []).map((x) => x.body)]).flat().filter(Boolean).join(' ');
  assert.ok(!/\b(we|our|ours)\b/i.test(prose), 'the copy speaks from inside the reader, never as "we"');
  assert.ok(!/this page/i.test(prose), 'the copy never talks about the page');
});

test('sells the content, not the event: no room, dates, venue or section eyebrows', () => {
  const prose = SALES.sections.flatMap((s) => [s.kicker, s.eyebrow, s.headline, s.subheadline, s.body, s.microcopy, s.total?.label, s.cardLabel, s.panel?.label, s.panel?.caption, ...(s.items ?? []).flatMap((i) => [i.a, i.q, i.detail, i.label, i.group]), ...(s.steps ?? []).flatMap((x) => [x.title, x.body]), ...(s.quotes ?? []).map((q) => q.role)]).flat().filter(Boolean).join(' ') + ' ' + SALES.stickyBar.text;
  assert.ok(!/\b(the room|Bali|Sanur|Andaz|Thursday|Friday|Sunday|October)\b/i.test(prose), 'no event talk in the copy');
  for (const s of SALES.sections) assert.equal(s.kicker, undefined, `${s.kind} has no eyebrow`);
});

test('no word used as filler: "seven" once in the hero, twice on the page', () => {
  const hero = SALES.sections[0];
  const heroCopy = [hero.eyebrow, hero.headline, hero.subheadline, hero.microcopy, hero.buttonLabel, hero.panel?.label, hero.panel?.caption, SALES.stickyBar.text].filter(Boolean).join(' ');
  assert.equal((heroCopy.match(/seven/gi) ?? []).length, 1, 'the hero says seven once, in the headline');
  const page = JSON.stringify(SALES.sections) + SALES.stickyBar.text;
  assert.ok((page.match(/seven/gi) ?? []).length <= 2, 'seven appears at most twice on the whole page');
});

test('no partner terms and no invented proof', () => {
  for (const word of ['commission', 'partner', 'affiliate', 'payout']) assert.ok(!text.toLowerCase().includes(word), word);
  const proof = SALES.sections.find((s) => s.kind === 'proof');
  assert.deepEqual(proof.quotes.map((q) => q.who), ['Bryan Susilo', 'Luke Carter']);
});

test('hero and closing hold media slots, empty or a real file', () => {
  const hero = SALES.sections[0];
  const slotOk = (src) => src === '' || /^\/(images\/bali|media)\//.test(src);
  assert.ok(hero.media && slotOk(hero.media.image), 'the hero has an image slot');
  assert.ok(hero.media.video === undefined || hero.media.video === '' || /\.mp4$/.test(hero.media.video), 'a hero loop is an mp4');
  assert.ok(SALES.sections.at(-1).image && slotOk(SALES.sections.at(-1).image.src), 'the closing has an image slot');
});

test('every media file the page names exists in public/', () => {
  const paths = [];
  JSON.stringify(SALES, (_k, v) => {
    if (typeof v === 'string' && /^\/(images|media)\//.test(v)) paths.push(v);
    return v;
  });
  const missing = paths.filter((p) => !existsSync(new URL(`../public${p}`, import.meta.url)));
  assert.deepEqual(missing, [], `missing files: ${missing.join(', ')}`);
});

test('video testimonials: at most ten, real names only, never stand-ins', () => {
  const proof = SALES.sections.find((s) => s.kind === 'proof');
  const videos = proof.videos ?? [];
  assert.ok(videos.length <= 10, 'the grid holds ten');
  for (const v of videos) {
    assert.ok(v.src && v.name, 'every video has a file and a name');
    assert.ok(!/^Testimonial \d+$/.test(v.name), 'no stand-in names ship');
    assert.ok(!/manifest/i.test(`${v.role ?? ''} ${v.quote ?? ''}`), 'no placeholder lines ship');
  }
});
