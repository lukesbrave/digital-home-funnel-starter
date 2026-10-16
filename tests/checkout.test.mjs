/**
 * Unit tests for the two-step checkout helpers (src/lib/checkout.ts).
 * Run: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildGetCheckoutUrl, buildPostCheckoutFields } from '../src/lib/checkout.ts';

const stripe = { url: 'https://buy.stripe.com/test_abc123', method: 'get' };
const site = {
  url: 'https://www.example.com/api/checkout',
  method: 'post',
  fields: { slug: 'event-recordings', tier: 'full' },
};

function params(url) {
  return Object.fromEntries(new URL(url).searchParams.entries());
}

test('get: prefilled_email always, client_reference_id only with a code', () => {
  const withRef = buildGetCheckoutUrl(stripe, 'sam@example.com', 'att-7');
  assert.ok(withRef.startsWith('https://buy.stripe.com/test_abc123?'));
  assert.deepEqual(params(withRef), { prefilled_email: 'sam@example.com', client_reference_id: 'att-7' });

  const noRef = buildGetCheckoutUrl(stripe, ' sam@example.com ', undefined);
  assert.deepEqual(params(noRef), { prefilled_email: 'sam@example.com' });

  const badRef = buildGetCheckoutUrl(stripe, 'sam@example.com', 'bad code');
  assert.deepEqual(params(badRef), { prefilled_email: 'sam@example.com' });
});

test('get: every entry of fields rides along, existing query survives', () => {
  const url = buildGetCheckoutUrl(
    { url: 'https://buy.stripe.com/test_abc123?locale=en', method: 'get', fields: { utm_source: 'event' } },
    'sam@example.com',
    'att-7'
  );
  assert.deepEqual(params(url), {
    locale: 'en',
    utm_source: 'event',
    prefilled_email: 'sam@example.com',
    client_reference_id: 'att-7',
  });
});

test('get: fields cannot override the session-owned keys', () => {
  const url = buildGetCheckoutUrl(
    { ...stripe, fields: { prefilled_email: 'x@y.z', client_reference_id: 'spoof' } },
    'sam@example.com',
    'att-7'
  );
  assert.deepEqual(params(url), { prefilled_email: 'sam@example.com', client_reference_id: 'att-7' });
});

test('post: email, ref and every field; ref omitted without a code', () => {
  assert.deepEqual(buildPostCheckoutFields(site, 'sam@example.com', 'att-7'), {
    slug: 'event-recordings',
    tier: 'full',
    email: 'sam@example.com',
    ref: 'att-7',
  });
  assert.deepEqual(buildPostCheckoutFields(site, 'sam@example.com', undefined), {
    slug: 'event-recordings',
    tier: 'full',
    email: 'sam@example.com',
  });
});

test('post: works with no fields and never lets fields spoof email or ref', () => {
  assert.deepEqual(
    buildPostCheckoutFields({ url: 'https://www.example.com/api/checkout', method: 'post' }, 'sam@example.com', undefined),
    { email: 'sam@example.com' }
  );
  assert.deepEqual(
    buildPostCheckoutFields({ ...site, fields: { email: 'x@y.z', ref: 'spoof', tier: 'full' } }, 'sam@example.com', 'att-7'),
    { tier: 'full', email: 'sam@example.com', ref: 'att-7' }
  );
});
