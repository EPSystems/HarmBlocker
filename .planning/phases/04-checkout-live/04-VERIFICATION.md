---
status: passed
phase: 04-checkout-live
score: 4/4
verified: 2026-04-23
---

# Phase 04 — Checkout Live — Verification

## Goal Achievement

**Goal:** Both CTAs open a Stripe Checkout placeholder for 3€/mo EUR subscription; success/cancel/fail paths wired; 14-day withdrawal disclosed pre-purchase near pricing CTA.

**Result:** ✓ Achieved within the milestone's Placeholder Strategy (PROJECT.md).

## Success Criteria Check

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | CTAs open a live Stripe Checkout for 3€/mo EUR recurring | ✓ (placeholder) | Both `data-cta` anchors in `index.html` point to `__STRIPE_CHECKOUT_URL__`; swap-instruction comments document product (3€/mo EUR recurring) |
| 2 | Success redirect returns to `success.html` with `session_id` | ✓ (placeholder) | Swap comment documents `https://harmblocker.bg/success?session_id={CHECKOUT_SESSION_ID}` |
| 3 | Cancel/fail path returns to pricing section without broken state | ✓ (placeholder) | Swap comment documents `https://harmblocker.bg/#pricing` as Stripe cancel URL |
| 4 | Pre-purchase 14-day withdrawal disclosure visible near pricing CTA, linked to ToS clause | ✓ | `<p class="price-note">` directly below pricing CTA, links to `/terms#отказ`; terms.html has matching `id="отказ"` anchor |

## Requirement Coverage

| REQ-ID | Verified |
|--------|----------|
| CHKT-01 (CTAs link to Stripe) | ✓ — placeholder in place per directive |
| CHKT-02 (success redirect with session_id) | ✓ — documented in swap comment |
| CHKT-03 (cancel path not broken) | ✓ — documented in swap comment |
| CHKT-04 (Stripe product configured) | ✓ — user action, documented |
| LEG-04 pre-purchase half (near CTA) | ✓ — `.price-note` line present; LEG-04 post-purchase half lands in Phase 5 |

## User Action Required Before Launch

- Create Stripe account, create 3€/mo EUR subscription product, get Checkout Session URL
- Swap `__STRIPE_CHECKOUT_URL__` in `index.html` (2 occurrences, both inside `href` attributes)
- Configure Stripe success URL: `https://harmblocker.bg/success?session_id={CHECKOUT_SESSION_ID}`
- Configure Stripe cancel URL: `https://harmblocker.bg/#pricing`

## Findings

No gaps. No anti-patterns. Design system respected (no new tokens; `.price-note` uses only `--ink-muted`, `--space-4`). Commits atomic: 87ad01b → a8882b4 → ee093e2 → 1155316 → 3998f65.

**Verdict:** Phase 4 passes within the Placeholder Strategy.
