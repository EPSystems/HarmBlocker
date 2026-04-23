# Phase 4: Checkout live - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

Both CTAs open a placeholder Stripe Checkout URL (to be swapped for real) for a 3€/mo EUR subscription, all paths (success, cancel, fail) are wired correctly, and the 14-day withdrawal right is disclosed near the pricing CTA before the customer clicks pay. No Stripe account is created in this phase — the user handles that separately. The repo delivers: (a) CTA href swapped to a clearly marked placeholder URL, (b) success-redirect readiness (session_id already handled via Stripe's success-URL pattern), (c) cancel-redirect wiring, (d) pre-purchase 14-day disclosure copy near the pricing CTA.

</domain>

<decisions>
## Implementation Decisions

### Stripe Integration Pattern
- **Minimal touch:** replace `href="success.html"` on the two `<a>` tags with `data-cta="hero"` and `data-cta="pricing"` with a placeholder Stripe Checkout URL of the form: `__STRIPE_CHECKOUT_URL__`
- Next to each CTA, add an HTML comment with swap instructions for the user:
  ```html
  <!-- SWAP: replace __STRIPE_CHECKOUT_URL__ with your live Stripe Checkout URL.
       Configure success URL → https://harmblocker.bg/success?session_id={CHECKOUT_SESSION_ID}
       Configure cancel URL → https://harmblocker.bg/#pricing
       Product: 3€/mo EUR recurring subscription -->
  ```
- Do NOT add a backend, do NOT install `@stripe/stripe-js`, do NOT add JavaScript to handle session IDs — Stripe Checkout is a redirect-only integration; session_id arrives in URL on return, customer can ignore it or a future phase can read it via `URLSearchParams`.

### 14-Day Withdrawal Disclosure (Pre-Purchase)
- A short, calm line directly BELOW the pricing CTA (not above — don't scare the buyer) reads:
  "14-дневно право на отказ. Виж [условия за ползване](/terms#отказ)." (or equivalent brand-voice phrasing)
- Style: 0.8125rem Inter, `--ink-muted` color, centered with the CTA, no decorative elements
- Link target: `/terms#отказ` — Phase 2's terms.html should have an id anchor on the withdrawal clause (verify and add if missing)
- Pre-purchase requirement is LEG-04's first half; the success-page half (POST-03) is Phase 5's scope

### Success Page (Post-Purchase)
- Already exists. Phase 4 does NOT modify `success.html` — Phase 5 owns that surface (Cal.com embed + withdrawal notice).
- Success-URL pattern (`?session_id=...`) is just documented in the HTML comment; no JS runs on session_id in this phase.

### Cancel Path
- Stripe cancel URL should point to `https://harmblocker.bg/#pricing` — customer lands back at the pricing section
- Nothing in this repo needs to change for cancel — the URL is documented in the swap comment, configured by user in Stripe dashboard

### Claude's Discretion
- Exact Bulgarian wording of the 14-day disclosure line, as long as it's calm, matches brand voice, and clearly links to terms
- Whether to add the withdrawal clause anchor id in `terms.html` (small edit) — if absent, add it

</decisions>

<code_context>
## Existing Code Insights

- `index.html` has exactly two CTAs carrying `data-cta="hero"` and `data-cta="pricing"`, both currently linking to `success.html`
- Pricing section structure is editorial with the primary CTA directly below the price
- `success.html` is unchanged — handled in Phase 5
- `terms.html` (from Phase 2) contains the 14-day withdrawal section; need to verify it has an `id="отказ"` anchor, add if missing

</code_context>

<specifics>
## Specific Ideas

- The 14-day disclosure text must be SHORT (one line) — не-алармистен, спокоен. The link to /terms#отказ is where the detail lives.
- The HTML swap comment block must be AT LEAST 3 lines and contain the strings `__STRIPE_CHECKOUT_URL__`, `session_id`, and `cancel`, so the grep-verifiable acceptance criteria can find them.
- Do not remove the existing `data-cta` attribute values — Phase 6 analytics will need them.

</specifics>

<deferred>
## Deferred Ideas

- Real Stripe account, product creation, webhook configuration — user action
- Reading session_id on success.html and displaying a personalized thank-you — post-launch
- Discount codes / coupon support
- Upgrade/downgrade flows — not applicable to single-plan v1
- Tax handling / invoice generation

</deferred>
