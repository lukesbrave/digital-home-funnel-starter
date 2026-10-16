/**
 * Unit tests for the affiliate referral helpers (src/lib/referral.ts).
 * Pure functions only: no DOM, no React, no backend.
 *
 * Run: npm test  (node --test, type-stripped TypeScript import)
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeRefCode,
  readRefFromUrl,
  withClientReferenceId,
  ctaHref,
  MAX_REF_LENGTH,
} from '../src/lib/referral.ts';

test('normalizeRefCode keeps clean codes and trims whitespace', () => {
  assert.equal(normalizeRefCode('luke-2026'), 'luke-2026');
  assert.equal(normalizeRefCode('  ATT_42 '), 'ATT_42');
});

test('normalizeRefCode rejects empty, oversized and unsafe values', () => {
  assert.equal(normalizeRefCode(''), undefined);
  assert.equal(normalizeRefCode('   '), undefined);
  assert.equal(normalizeRefCode(null), undefined);
  assert.equal(normalizeRefCode(undefined), undefined);
  assert.equal(normalizeRefCode('a'.repeat(MAX_REF_LENGTH)), 'a'.repeat(MAX_REF_LENGTH));
  assert.equal(normalizeRefCode('a'.repeat(MAX_REF_LENGTH + 1)), undefined);
  assert.equal(normalizeRefCode('<script>'), undefined);
  assert.equal(normalizeRefCode('luke zuzu'), undefined);
  assert.equal(normalizeRefCode('a.b'), undefined);
  assert.equal(normalizeRefCode('a&b=c'), undefined);
});

test('readRefFromUrl reads ?ref= next to utm_* and ignores the rest', () => {
  assert.equal(
    readRefFromUrl('https://offer.example.com/?utm_source=ig&utm_medium=social&ref=att-7'),
    'att-7'
  );
  assert.equal(readRefFromUrl('https://offer.example.com/?utm_source=ig'), undefined);
  assert.equal(readRefFromUrl('https://offer.example.com/?ref='), undefined);
  assert.equal(readRefFromUrl('https://offer.example.com/?ref=bad%20code'), undefined);
  assert.equal(readRefFromUrl('not a url'), undefined);
});

test('withClientReferenceId leaves the URL untouched without a code', () => {
  const url = 'https://buy.stripe.com/test_abc123';
  assert.equal(withClientReferenceId(url, undefined), url);
  assert.equal(withClientReferenceId(url, ''), url);
  assert.equal(withClientReferenceId(url, 'bad code'), url);
});

test('withClientReferenceId appends client_reference_id to a payment link', () => {
  assert.equal(
    withClientReferenceId('https://buy.stripe.com/test_abc123', 'att-7'),
    'https://buy.stripe.com/test_abc123?client_reference_id=att-7'
  );
});

test('withClientReferenceId keeps existing query and hash', () => {
  assert.equal(
    withClientReferenceId('https://buy.stripe.com/test_abc123?locale=en#top', 'att-7'),
    'https://buy.stripe.com/test_abc123?locale=en&client_reference_id=att-7#top'
  );
});

test('withClientReferenceId never overrides an owner-set client_reference_id', () => {
  const url = 'https://buy.stripe.com/test_abc123?client_reference_id=fixed';
  assert.equal(withClientReferenceId(url, 'att-7'), url);
});

test('withClientReferenceId falls back to string append for a relative URL', () => {
  assert.equal(withClientReferenceId('/checkout', 'att-7'), '/checkout?client_reference_id=att-7');
  assert.equal(withClientReferenceId('/checkout?x=1', 'att-7'), '/checkout?x=1&client_reference_id=att-7');
});

test('ctaHref tags only the checkout kind', () => {
  const stripe = 'https://buy.stripe.com/test_abc123';
  assert.equal(
    ctaHref({ kind: 'checkout', url: stripe }, 'att-7'),
    `${stripe}?client_reference_id=att-7`
  );
  assert.equal(ctaHref({ kind: 'checkout', url: stripe }, undefined), stripe);
  const cal = 'https://cal.com/your-name/intro';
  assert.equal(ctaHref({ kind: 'book-call', url: cal }, 'att-7'), cal);
  assert.equal(ctaHref({ kind: 'external-link', url: cal }, 'att-7'), cal);
  assert.equal(ctaHref({ kind: 'lead-capture' }, 'att-7'), undefined);
});
