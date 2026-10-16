# Digital Home Funnel Starter

The house quiz funnel. Clone it, inject your data, wire two config
values, deploy on your own Cloudflare. It looks good out of the box
and feeds every lead and every step of the journey straight into
your Digital Home CRM.

A funnel here is a template plus data. The template (components,
engine, tracking) never changes per funnel. The data
(`src/funnel/`) is the whole funnel: copy, questions, results,
palette, CTA.

## Quick start

```bash
git clone https://github.com/lukesbrave/digital-home-funnel-starter my-funnel
cd my-funnel
npm install
npm run dev
```

Open http://localhost:3000. The sample funnel works immediately,
with no keys and no backend: results are deterministic and tracking
is silently skipped until wired.

## The customization surface: src/funnel/

Everything a funnel is lives in four data files. Editing anything
outside this folder is customization of the template itself, not of
a funnel.

| File | Owns |
| --- | --- |
| `config.ts` | Funnel name and slug, theme, opt-in gate, CTA |
| `landing.ts` | Landing page copy |
| `questions.ts` | The question flow, categories, branching, signals |
| `results.ts` | Archetypes, result sections, signal mapping |

## Themes

The design is a theme system: design tokens only (palette, type
pair, numerals, progress and option treatments), with the same
components and layout underneath. `THEME` in `config.ts` is one
value:

| Theme | Feel |
| --- | --- |
| `clean` (default) | Quiet sans-serif, generous white, one restrained accent. Fits the most brands with the least risk. |
| `manuscript` | Warm paper, high-contrast serif, printed questionnaire. |
| `signal` | Dark graphite, bold caps, one loud accent. |

Screenshots of every theme (landing, quiz step, results) live in
`previews/`. The funnel-builder agent shows those previews at its
plan gate so the human picks a theme before the build starts.
`PALETTE_OVERRIDES` in `config.ts` can tint any theme's tokens per
funnel. Themes are defined in `src/themes/`; adding one is one new
file there.

`/preview?theme=<id>&screen=<landing|quiz|optin|results>` renders
any screen in any theme statically (no quiz walking, motion
disabled). Regenerate the preview set with `npm run previews`
(dev server must be running).

How results work: every answer option can emit signals. The engine
tallies signals, picks the archetype with the highest tally, and
picks each section's best matching variant. Deterministic: same
answers, same result, no API keys required.

CTA kinds: `book-call`, `checkout`, `external-link`, or
`lead-capture`. One CTA per funnel.

## Wiring your Digital Home (two values)

Your backend (digital-home-backend v2.5.8 or later) already ships
the funnel dashboard and ingest route. The funnel needs exactly two
values:

1. `FUNNEL_BACKEND_URL`: your backend URL.
2. `FUNNEL_SECRET`: the `crm_funnel_secret` setting from your
   backend. Set `crm_capture_key` to the same value so lead capture
   works with this single secret (or set `FUNNEL_CAPTURE_KEY`
   separately if yours differ).

Locally: copy `.env.example` to `.env.local`. In production: store
them as Cloudflare secrets. Never commit real values.

Both secrets stay server-side. The browser talks only to this
funnel's own `/api/events` and `/api/capture` routes, which relay
server-to-server.

What flows into your Digital Home:

- Funnel events `start`, `view`, `complete`, `cta_click`, deduped
  per session, so `/crm/funnel` in your dashboard lights up with
  starts, opt-in rate, CTA rate, and per-step drop-off.
- Every opt-in lands in your leads table with the quiz answers and
  archetype attached under `custom`, tagged with the funnel slug.
- A visitor who arrived on an affiliate link (`?ref=<code>`) carries
  the code on every event and lead (see Affiliate links below).

## Affiliate links

Every event attendee (or any partner) can get a personal link that
credits them for the sales and leads they send. No backend change is
needed; the page does the work.

Handing out links: take the funnel's URL and add `?ref=<code>`, one
code per person, for example
`https://offer.yourdomain.com/?ref=sam-k`. Codes are letters, digits,
hyphens and underscores, up to 64 characters. `utm_*` parameters can
sit beside it as before.

What happens on the page:

- The code is read on land and remembered for the browser session,
  so it survives scrolling, the quiz, and the opt-in.
- Every funnel event beacon carries it as `ref` (next to `referrer`)
  and inside `event_data.ref`, so your Digital Home records which
  code each session arrived on.
- A `checkout` CTA (Stripe payment link) gets
  `?client_reference_id=<code>` appended, so the Stripe dashboard
  shows the code on every payment it produced. Without a code the
  link is untouched. `book-call` and `external-link` URLs are never
  changed.
- A `lead-capture` CTA (and the quiz opt-in) sends the code with the
  lead as `custom.referred_by`.

Payout is manual in v1: in Stripe, filter payments by
`client_reference_id` (it is on each Checkout Session), total them
per code, and pay the attendee their share. The Digital Home shows
the code on leads and events but does not yet total commissions;
`NOTES-affiliate.md` lists what the CRM needs for that.

## AI-enhanced results (optional, later)

`/api/generate-result` is the single result endpoint. Out of the
box it is fully deterministic. If you set a server-side
`ANTHROPIC_API_KEY`, only the sections marked `aiEnhance: true` in
`results.ts` are rewritten per visitor. Your method, proof, and CTA
sections stay exactly as written. No provider key is ever required,
and none is ever exposed client-side.

## Deploy (your Cloudflare, free tier)

```bash
npx wrangler login
npx wrangler secret put FUNNEL_BACKEND_URL
npx wrangler secret put FUNNEL_SECRET
npm run deploy
```

Then add your subdomain (for example `quiz.yourdomain.com`) as a
custom domain on the worker in the Cloudflare dashboard. Your
account, your keys, always.

## For the funnel-builder agent

Build order, after the plan is approved:

1. Clone this repo at its latest GitHub RELEASE (not just the
   newest tag).
2. Inject the approved plan by editing the four files in
   `src/funnel/` only. Keep 5 to 9 questions balanced across the
   categories `situation`, `pain`, `goals`, `urgency`, `readiness`,
   `identity`, and one `qualifier`. Give every option the signals
   its answer should emit, and make sure every archetype is
   reachable.
3. `npm run build` must pass before deploying. A type error here
   almost always means a data file drifted from the types in
   `src/lib/types.ts`.
4. Wire the two env values (paste once, store, tell the human to
   delete the message). Confirm `crm_capture_key` equals
   `crm_funnel_secret` in the backend settings, or set
   `FUNNEL_CAPTURE_KEY` too.
5. Deploy with `npm run deploy` to the member's Cloudflare, then
   attach the agreed subdomain.
6. Prove it: live URL, a marked test lead visible in the CRM leads
   table, and the funnel dashboard counting the test session.

Copy rules: no em dashes anywhere in visitor-facing copy. Results
must teach something true, with real proof only.

## Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build and type check |
| `npm test` | Unit tests (referral helpers) |
| `npm run preview` | Build and preview on the Workers runtime |
| `npm run deploy` | Build and deploy to Cloudflare |

MIT licensed.
