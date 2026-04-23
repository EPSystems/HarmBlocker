---
phase: 04-checkout-live
plan: 01
subsystem: payments
tags: [stripe, checkout, 14-day-withdrawal, gdpr, bulgarian-consumer-law, static-html]

# Dependency graph
requires:
  - phase: 02-legal-floor
    provides: terms.html with "Право на отказ в рамките на 14 дни" section (target of the new anchor)
  - phase: 03-copy-lock
    provides: final pricing-section copy on index.html (CTA label, cancel-anytime small print)
provides:
  - Both CTAs point at __STRIPE_CHECKOUT_URL__ placeholder with grep-findable swap instructions
  - Pre-purchase 14-day withdrawal disclosure line directly below pricing CTA
  - Stable #отказ anchor on terms.html 14-day heading for deep-linking
  - Minimal .price-note CSS using only existing design tokens
affects: [05-post-purchase-handoff, 06-measurement, 07-pre-launch-audit]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Grep-findable HTML swap comments for user-owned third-party URLs"
    - "Hairline-amber link treatment for muted-small-print anchors (matches footer entity-meta)"

key-files:
  created: []
  modified:
    - index.html
    - terms.html
    - styles.css

key-decisions:
  - "CTA swap comment kept co-located with each CTA (above the <a> tag, inside hero__cta / price-card), not in a separate README — user can swap the URL without hunting for docs"
  - ".price-note is a NEW element placed BETWEEN the CTA and the existing .price-card__small, preserving the existing cancel-anytime copy (different legal surface — statutory withdrawal vs. cancel-anytime courtesy)"
  - "14-day disclosure copy stays one short Bulgarian sentence with 'Виж условия' as the link label — calm, not alarmist, per Quiet Confidence voice"
  - "Anchor id='отказ' is intentionally Bulgarian (matches the brand's Bulgarian-only copy stance); URL-encodes to #%D0%BE%D1%82%D0%BA%D0%B0%D0%B7 but renders correctly in modern browsers"
  - ".price-note link treatment reuses the footer__entity-meta hairline-amber pattern (border-bottom amber-soft → amber on hover) — no new link style invented"

patterns-established:
  - "Third-party service URLs (Stripe, Cal.com, analytics) ship as grep-able placeholders (__SERVICE_URL__) with a 4-line HTML comment documenting success/cancel URLs and product details"
  - "Pre-purchase legal disclosures sit directly below the CTA as muted small print — not as banners, warnings, or scroll-blocking modals"

requirements-completed: [CHKT-01, CHKT-02, CHKT-03, CHKT-04, LEG-04]

# Metrics
duration: 2m 25s
completed: 2026-04-23
---

# Phase 4 Plan 01: Checkout live Summary

**Both CTAs point at a grep-findable Stripe Checkout placeholder with documented success/cancel URLs, and a calm 14-day withdrawal disclosure sits beneath the pricing CTA linking to a stable `#отказ` anchor in terms.html.**

## Performance

- **Duration:** 2m 25s
- **Started:** 2026-04-23T19:41:53Z
- **Completed:** 2026-04-23T19:44:18Z
- **Tasks:** 4
- **Files modified:** 3

## Accomplishments

- Both `data-cta="hero"` and `data-cta="pricing"` anchors in `index.html` now link to `__STRIPE_CHECKOUT_URL__` with a 4-line HTML swap-instruction comment immediately above each one. The comments carry the required marker strings (`__STRIPE_CHECKOUT_URL__`, `session_id={CHECKOUT_SESSION_ID}`, `Configure cancel URL`) so a future grep-verification run finds them.
- A one-line 14-day statutory withdrawal disclosure ("14-дневно право на отказ. Виж условия.") sits between the pricing CTA and the existing "Отказ по всяко време" cancel-anytime note, with "Виж условия" linking to `/terms#отказ`.
- `terms.html` "Право на отказ в рамките на 14 дни" heading carries `id="отказ"` for stable deep-linking.
- `styles.css` gains a minimal `.price-note` rule (0.8125rem Inter, `--ink-muted`, centered, amber-hairline link) using only existing design tokens — no new colors, no shadow, no pill.

## Task Commits

Each task was committed atomically:

1. **Task 1: Swap CTA hrefs + swap-instruction comments** — `87ad01b` (feat)
2. **Task 2: 14-day disclosure line below pricing CTA** — `a8882b4` (feat)
3. **Task 3: Add `id="отказ"` anchor in terms.html** — `ee093e2` (chore)
4. **Task 4: `.price-note` CSS rule** — `1155316` (style)

**Plan metadata:** pending (docs commit after SUMMARY.md)

## Files Created/Modified

- `index.html` — CTA hrefs swapped to `__STRIPE_CHECKOUT_URL__` on both hero and pricing CTAs; 4-line swap-instruction HTML comment added above each; new `<p class="price-note">` with the 14-day disclosure line inserted directly below the pricing CTA and above the existing `.price-card__small`.
- `terms.html` — Single attribute added: `id="отказ"` on the `<h2>Право на отказ в рамките на 14 дни</h2>` heading. No other changes.
- `styles.css` — Appended three rules in the Pricing section immediately after `.price-card__small`: `.price-note`, `.price-note a`, `.price-note a:hover`. No new tokens introduced.

## Decisions Made

- **Comment placement:** Swap-instruction comments live immediately above each CTA inside the same wrapper (hero__cta / .price-card), so the user swapping the URL can't miss them. A separate README would have drifted out of sync.
- **Order of small print:** CTA → 14-day statutory disclosure (`.price-note`) → cancel-anytime courtesy note (`.price-card__small`). The two notes cover different legal surfaces and both belong; statutory withdrawal ranks first because it is a legal right, the anytime-cancel is a brand promise.
- **Bulgarian anchor id:** `id="отказ"` was chosen over a Latin-script fallback like `id="withdrawal"` or `id="refund"` to stay consistent with the brand's Bulgarian-only posture. Modern browsers URL-encode non-ASCII anchors transparently; the link resolves correctly.
- **Link styling:** `.price-note a` mirrors the footer `.footer__entity-meta a` pattern (amber-soft border-bottom, strengthening to `--amber` on hover). This is the site's established muted-link treatment; inventing a new one would fragment the design system.
- **Space above `.price-note`:** `var(--space-4)` (16px) rather than `var(--space-5)` (24px) used by `.price-card__small` — keeps the disclosure visually attached to the CTA it qualifies, while the cancel-anytime note reads as a separate thought below.

## Deviations from Plan

None — plan executed exactly as written.

Each of the 4 tasks matched its `<action>` block precisely. All grep-verifiable acceptance criteria passed on first check. No Rule 1/2/3 auto-fixes triggered. No architectural decisions surfaced. No authentication gates hit (phase is pure front-end edits; Stripe account creation is explicitly out of scope).

## Known Stubs

The `__STRIPE_CHECKOUT_URL__` placeholder on both CTAs is an **intentional, documented stub** required by the Milestone Execution Directive in `PROJECT.md` (Placeholder strategy for third-party integrations). It is:

- **Flagged visibly:** Two 4-line HTML comments above each CTA explain the swap — including Stripe success URL, cancel URL, and the 3€/mo EUR product requirement.
- **Grep-findable:** A simple `grep __STRIPE_CHECKOUT_URL__ index.html` surfaces both locations.
- **Locked to user action:** Creating the Stripe product + checkout URL is explicitly out-of-scope per `04-CONTEXT.md` — the user owns that.
- **Non-blocking for Phase 5:** `success.html` is Phase 5's scope and doesn't depend on the Stripe URL being real; Stripe's success redirect wiring is documented in the swap comment for the user to configure in the Stripe dashboard.

This matches the same placeholder pattern already established for `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__`, `__CALCOM_BOOKING_URL__`, and `__ANALYTICS_SITE_ID__` across the codebase.

## Issues Encountered

None.

## User Setup Required

Before first real charge, the user must:

1. **Create the Stripe subscription product** — 3€/month EUR, recurring. (CHKT-04)
2. **Generate a live Stripe Checkout URL** for that product.
3. **Configure Stripe success URL:** `https://harmblocker.bg/success?session_id={CHECKOUT_SESSION_ID}` — ensures `success.html` receives the session_id query parameter. (CHKT-02)
4. **Configure Stripe cancel URL:** `https://harmblocker.bg/#pricing` — returns the customer to the pricing section. (CHKT-03)
5. **Replace `__STRIPE_CHECKOUT_URL__`** in `index.html` (2 occurrences, both inside `data-cta` anchors). Swap instructions are present in HTML comments above each CTA. (CHKT-01)

No environment variables, no build step, no backend. Pure href swap.

## Next Phase Readiness

- **Phase 5 (Post-purchase handoff):** Ready. `success.html` is unchanged and remains Phase 5's scope for Cal.com embed + the post-purchase half of LEG-04 (POST-03).
- **Phase 6 (Measurement):** Ready. `data-cta="hero"` and `data-cta="pricing"` preserved exactly — analytics event tracking can hook on these selectors unchanged.
- **Phase 7 (Pre-launch audit):** Ready. The only remaining legal/commerce gap before first charge is real entity details (LEG-05 placeholder swap) and Stripe setup (user-owned).

## Self-Check: PASSED

**Files verified present on disk:**

- `index.html` — modified (CTAs point at `__STRIPE_CHECKOUT_URL__`, swap comments present, `.price-note` element present)
- `terms.html` — modified (`id="отказ"` present at line 97)
- `styles.css` — modified (`.price-note`, `.price-note a`, `.price-note a:hover` rules present)

**Commits verified in git log:**

- `87ad01b` — FOUND (feat: swap CTA hrefs to Stripe placeholder)
- `a8882b4` — FOUND (feat: 14-day disclosure below pricing CTA)
- `ee093e2` — FOUND (chore: `id="отказ"` anchor in terms.html)
- `1155316` — FOUND (style: `.price-note` rule)

**Acceptance criteria verified:**

- Task 1: `href="__STRIPE_CHECKOUT_URL__"` count = 2 ✓; `data-cta="hero"` count = 1 ✓; `data-cta="pricing"` count = 1 ✓; `SWAP: replace __STRIPE_CHECKOUT_URL__` count = 2 ✓; `session_id={CHECKOUT_SESSION_ID}` count = 2 ✓; `Configure cancel URL` count = 2 ✓; `href="success.html"` count = 0 ✓.
- Task 2: `class="price-note"` count = 1 ✓; `href="/terms#отказ"` count = 1 ✓; `14-дневно право на отказ` count = 1 ✓; existing `.price-card__small` preserved ✓.
- Task 3: `id="отказ"` count = 1, on the 14-day heading ✓.
- Task 4: `.price-note {` count = 1 ✓; `.price-note a {` count = 1 ✓; `.price-note a:hover {` count = 1 ✓; no `box-shadow`, no `border-radius: 999`, no `background:` on `.price-note` ✓; only existing tokens referenced ✓.

---
*Phase: 04-checkout-live*
*Completed: 2026-04-23*
