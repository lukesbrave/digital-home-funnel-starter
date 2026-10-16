/**
 * The bali theme and the sales-page sample data it is meant to carry.
 * Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bali } from '../src/themes/bali.ts';
import { clean } from '../src/themes/clean.ts';
import { manuscript } from '../src/themes/manuscript.ts';
import { signal } from '../src/themes/signal.ts';
import { SALES_BRAND_MOMENTUM as SALES } from '../src/funnel/samples/brand-momentum.ts';

const HEX = /^#[0-9a-f]{6}$/;

test('bali is the event page look: claret on cream, Sentient and Inter, editorial price', () => {
  assert.equal(bali.id, 'bali');
  for (const [name, value] of Object.entries(bali.tokens)) assert.match(value, HEX, name);
  assert.equal(bali.tokens.ink, '#47141a');
  assert.equal(bali.font.display, 'var(--font-sentient)');
  assert.equal(bali.font.body, 'var(--font-inter)');
  assert.equal(bali.button.radius, '0px');
  assert.equal(bali.button.label, 'caps');
  assert.equal(bali.price, 'editorial');
});

test('every other theme keeps the boxed price it had', () => {
  for (const theme of [clean, manuscript, signal]) assert.equal(theme.price, 'boxed', theme.id);
});

test('the sample sales page carries a value stack with a total between offer and proof', () => {
  const kinds = SALES.sections.map((s) => s.kind);
  const at = kinds.indexOf('value-stack');
  assert.ok(at > kinds.indexOf('offer'));
  assert.ok(at < kinds.indexOf('proof'));
  const stack = SALES.sections[at];
  assert.ok(stack.items.length >= 3);
  for (const item of stack.items) assert.ok(item.label && item.value, item.label);
  assert.equal(stack.total.label, 'Total value');
});
