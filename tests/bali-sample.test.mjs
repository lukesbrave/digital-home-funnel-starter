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

test('the seat price is the only anchor and the early bird never appears', () => {
  assert.ok(!text.includes('997'));
  assert.ok(!text.includes('—'), 'no em dashes');
  const stack = SALES.sections.find((s) => s.kind === 'value-stack');
  assert.equal(stack.items.length, 7);
  for (const item of stack.items) assert.equal(item.value, undefined, item.label);
  assert.equal(stack.total.value, '$1,500');
  assert.equal(SALES.sections.find((s) => s.kind === 'pricing').price, '$500');
});

test('no price before step seven: the hero and the rail carry none', () => {
  const hero = SALES.sections[0];
  const heroText = JSON.stringify(hero) + (SALES.stickyBar?.text ?? '');
  assert.ok(!heroText.includes('$'), 'no dollar figure in the hero or the sticky bar text');
  const firstPriced = SALES.sections.findIndex((s) => JSON.stringify(s).includes('$'));
  assert.ok(firstPriced >= SALES.sections.findIndex((s) => s.kind === 'value-stack'), 'price appears no earlier than the value stack');
});

test('no narrator: no "we", no lines about the page itself', () => {
  const prose = SALES.sections.flatMap((s) => [s.headline, s.subheadline, s.body, ...(s.items ?? []).map((i) => i.a ?? i.detail ?? i.label), ...(s.steps ?? []).map((x) => x.body)]).flat().filter(Boolean).join(' ');
  assert.ok(!/\b(we|our|ours)\b/i.test(prose), 'the copy speaks from inside the reader, never as "we"');
  assert.ok(!/this page/i.test(prose), 'the copy never talks about the page');
});

test('no partner terms and no invented proof', () => {
  for (const word of ['commission', 'partner', 'affiliate', 'payout']) assert.ok(!text.toLowerCase().includes(word), word);
  const proof = SALES.sections.find((s) => s.kind === 'proof');
  assert.deepEqual(proof.quotes.map((q) => q.who), ['Bryan Susilo', 'Luke Carter']);
});

test('hero and closing carry media from the photo bank', () => {
  const hero = SALES.sections[0];
  assert.match(hero.media.image, /^\/images\/bali\//);
  assert.match(hero.media.video ?? hero.panel?.video ?? '', /\.mp4$/, 'a loop plays in the hero, full-bleed or in the panel');
  assert.match(SALES.sections.at(-1).image.src, /^\/images\/bali\//);
});
