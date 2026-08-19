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
| `config.ts` | Funnel name and slug, palette tokens, opt-in gate, CTA |
| `landing.ts` | Landing page copy |
| `questions.ts` | The question flow, categories, branching, signals |
| `results.ts` | Archetypes, result sections, signal mapping |

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
| `npm run preview` | Build and preview on the Workers runtime |
| `npm run deploy` | Build and deploy to Cloudflare |

MIT licensed.
