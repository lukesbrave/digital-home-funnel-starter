# Affiliate referral: what the Digital Home CRM needs next

Status 2026-10-16. The funnel starter now sends attribution data; the
Digital Home backend (digital-home-backend starter, and the house
master it is cut from) does not yet surface it. Nothing here edits
the backend; it is the brief for that change.

## What the starter sends today (v1, no backend change)

| Where | Field | Value |
| --- | --- | --- |
| Funnel event beacon (top level, next to `referrer`) | `ref` | the `?ref=` code, normalized |
| Funnel event beacon | `event_data.ref` | same code |
| Lead capture | `custom.referred_by` | same code, or `null` |
| Stripe payment link | `client_reference_id` query parameter | same code |

Codes match `^[A-Za-z0-9_-]{1,64}$`. Anything else is dropped before
it leaves the browser.

## What lands in the CRM right now

- `funnel_events.event_data` is stored as JSON, so `event_data.ref`
  is already recorded on every row. The top-level `ref` is dropped by
  the ingest route, which only lifts known fields into columns.
- `leads.custom` is stored as JSON, so `custom.referred_by` is already
  on every captured lead.
- Nothing reads either value yet: no column, no filter, no report.
- Stripe records `client_reference_id` on the Checkout Session; the
  CRM does not see it unless a Stripe webhook or a capture carrying
  `custom.booking_amount_cents` posts the sale.

## Backend fields to add (in the order they pay off)

1. **`leads.referred_by text null`**, filled from `custom.referred_by`
   on capture and kept on upsert (first non-null value wins, never
   overwritten by a later unreferred capture). Index it. This is the
   one field that turns "a lead exists" into "this attendee sent it".
2. **`funnel_events.referred_by text null`**, lifted from the beacon's
   top-level `ref` (fall back to `event_data.ref`) in the ingest
   route, the same way `screen_index` and `screen_id` are lifted.
   Gives per-attendee funnel counts (sessions, CTA clicks) without
   JSON digging.
3. **Deal attribution.** When a won deal is created from a capture
   that carries `custom.booking_amount_cents`, copy `referred_by` onto
   the deal (`deals.referred_by text null`) so revenue, not just
   leads, is attributable. For Stripe-only sales, a Stripe webhook
   (checkout.session.completed) should post a capture with the
   session's `client_reference_id` as `custom.referred_by` and the
   amount as `custom.booking_amount_cents`; the existing capture
   route then wins the deal with attribution attached.
4. **Affiliate report** (`/crm/affiliates`): one row per code with
   sessions, leads, won deals, revenue, and the owed share at the
   programme's rate (50% for the event recording offer). Rate is a
   setting per funnel, not per row. Export to CSV for payout.
5. **Code registry (optional).** A table mapping `code` to the
   attendee lead, so the report shows names and payout details
   instead of bare codes. The Skool sync already stores Skool's own
   `referring affiliate` and `commission rate` on members; that is
   Skool's programme and stays separate.

## Traffic-source bucketing

`traffic-source.ts` buckets `utm_medium` into paid / social / email /
referral. A `ref` code is not a medium; keep it out of that bucketing.
If a session has `ref` but no `utm_*`, the report should still class
it as referral traffic.

## Payout in v1

Manual, from the Stripe dashboard: filter Checkout Sessions by
`client_reference_id`, total per code, pay 50%. The README's
"Affiliate links" section says the same to owners.
