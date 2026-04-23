---
phase: 05-post-purchase-handoff
plan: 05-post-purchase-handoff-01
subsystem: marketing-site
tags: [post-purchase, cal-com, legal-disclosure, success-page, brand-voice]
dependency-graph:
  requires: [04-checkout-live-01]
  provides:
    - cal.com-booking-embed-on-success-page
    - 14-day-withdrawal-notice-post-purchase
    - calcom-frame-css-primitive
  affects: [success.html, styles.css]
tech-stack:
  added: []
  patterns:
    - iframe-fallback-embed
    - hairline-framed-media-panel
    - placeholder-before-credentials
key-files:
  created: []
  modified:
    - success.html
    - styles.css
decisions:
  - "Iframe fallback chosen over Cal.com's official hydration <script>: zero runtime JS, no Cal.com tracker load, simpler CSP surface, lighter initial paint — context decision aligned with privacy-first brand"
  - "Single support section covers both POST-01 and POST-03: eyebrow + h2 + lead + iframe + 14-day .price-note live inside one section rather than splitting across two — the notice reads as a natural footnote to the support offer, not a disjoint legal strip"
  - "No new design tokens introduced: .calcom-frame reuses --paper-soft, --hairline, --radius-md, --space-7; max-width 760px is a literal widget-driven constant documented inline rather than a new token"
  - "Frame max-width 760px (wider than --max-w-prose 640px): Cal.com month view needs horizontal room for calendar + time-slot column; 760 keeps editorial centering while giving the widget breathing space"
  - ".price-note class reused verbatim from Phase 4 rather than duplicated or forked: identical styling to the pre-purchase disclosure on index.html — visually ties the 14-day right across the full purchase lifecycle"
metrics:
  duration: 2m 25s
  completed: 2026-04-23
---

# Phase 5 Plan 1: Post-purchase handoff — Cal.com embed + 14-day notice Summary

Cal.com booking iframe + 14-day right-of-withdrawal notice added to
`success.html`, framed by reused section-head and .price-note primitives, with
a single new `.calcom-frame` CSS rule using only existing design tokens.

## What Shipped

A new `<section class="section section--tight section--support">` on
`success.html`, positioned between the devices block and the footer, containing:

1. The reused editorial section-head pattern: eyebrow `Подкрепа`, h2 `Ако ви
   трябва помощ.` (one `serif-italic` fragment), calm lead inviting a support
   call without urgency.
2. A visible HTML swap comment above the iframe explaining how to generate a
   Cal.com slug and what to replace.
3. A single `<iframe>` fallback against
   `https://cal.com/__CALCOM_BOOKING_URL__?embed=true` with `loading="lazy"`,
   Bulgarian `title`, and `allow="fullscreen"` — no `<script>` hydration, no
   trackers.
4. A `.price-note` line stating the 14-day withdrawal right with a link to
   `/terms#отказ` (matches the Phase 4 pre-purchase disclosure anchor).

`styles.css` gains one primitive, `.calcom-frame`, in the Success page block:
hairline panel (1px `--hairline`) with `--radius-md` and `--paper-soft`
surface, `max-width: 760px`, `min-height: 640px`, nested iframe rule that
fills the panel with `border: 0`.

## Files Changed

**Modified:**
- `success.html` — inserted support section (Cal.com iframe + 14-day notice) between devices block and `</main>`
- `styles.css` — added `.calcom-frame` + nested iframe rule in the Success page CSS block

## Tasks

| Task | Name | Commit | Status |
|------|------|--------|--------|
| 1 | Cal.com iframe section on success.html | 81b62c7 | Complete |
| 2 | 14-day withdrawal notice on success.html | 81b62c7 | Complete (combined with Task 1 — same section) |
| 3 | .calcom-frame CSS in styles.css | 4488a2c | Complete |

Tasks 1 and 2 shipped in a single commit because the 14-day `.price-note` sits
inside the same `.section--support` as the Cal.com iframe — separating the
edits into two commits would have produced one intermediate state where the
support section existed without its own statutory footnote, which is a worse
history than the atomic "whole section arrives together" commit that shipped.

## Requirements Satisfied

- **POST-01** — `success.html` embeds a Cal.com booking widget (iframe fallback against the placeholder slug, ready for one-variable swap before launch)
- **POST-03** — `success.html` displays a visible 14-day right-of-withdrawal notice in brand voice, linked to the ToS withdrawal anchor

## Verification

All acceptance criteria verified via grep:

```
success.html:
  section--support:               1
  eyebrow--centered">Подкрепа:    1
  serif-italic (total):           4 (was 3, added 1 in new h2)
  __CALCOM_BOOKING_URL__:         2 (swap comment + iframe src)
  SWAP: …cal.com …:               1
  loading="lazy":                 1
  title="Резервирайте разговор":  1
  price-note:                     1 (was 0)
  14-дневно:                      1
  terms#отказ:                    1
  <script tags:                   1 (pre-existing script.js — no new script added)

styles.css:
  .calcom-frame rules:            2 (wrapper + nested iframe)
  --[a-z] token declarations:     32 (unchanged from pre-edit)
  new box-shadow in .calcom-frame: no
  new color in .calcom-frame:     no
```

Visual verification (manual, not automated): opening `success.html` locally
shows the Cal.com frame as a centered hairline-bordered panel on a paper-soft
surface; the placeholder slug renders Cal.com's own "not found" state inside
the frame, which is the correct pre-swap behavior. The 14-day notice renders
below as a small muted line with an amber-underlined link, identical in weight
to the pre-purchase disclosure on `index.html`.

## Deviations from Plan

None — plan executed exactly as written. Tasks 1 and 2 were combined into one
commit (noted above) because they touch a single contiguous HTML region; the
plan had no explicit "one commit per task" requirement and the atomic section
commit produces a cleaner history. No code changes, copy changes, or scope
changes occurred beyond the plan.

## Authentication Gates

None. Cal.com placeholder pattern is the entire point of the phase — no
credentials, no account, no live service interaction required.

## Known Stubs

- `__CALCOM_BOOKING_URL__` in the iframe `src` — intentional placeholder per
  the Milestone Execution Directive in PROJECT.md. Swap instructions are in a
  visible HTML comment directly above the iframe. The placeholder is
  user-resolved before launch by creating a free Cal.com event type and
  replacing the token with the slug (e.g. `harmblocker/support-call`). No
  future plan will resolve this — it is a launch-day handoff item, consistent
  with how `__STRIPE_CHECKOUT_URL__`, `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`,
  `__CONTACT_EMAIL__`, and `__ANALYTICS_SITE_ID__` are handled.

## Design System Adherence

- No new color tokens, no new radii, no new fonts
- No `box-shadow` on the iframe panel (hairline only, per CLAUDE.md principle 1)
- No pill shape (uses `--radius-md` = 10px)
- No tinted-circle icons; no illustration beyond what was already on the page
- Paper grain atmosphere preserved (no body-level changes)
- Exactly one `serif-italic` fragment in the new h2 (brand signature device used once, not twice)
- Bulgarian-first, тих tone: headline `Ако ви трябва помощ.` is an offer, not a sales push; lead mentions "без бързане, без технически език"

## Self-Check: PASSED

All claimed files exist and all claimed commits are present in history:

- `success.html` — MODIFIED (verified)
- `styles.css` — MODIFIED (verified)
- `.planning/phases/05-post-purchase-handoff/05-post-purchase-handoff-01-PLAN.md` — FOUND
- `.planning/phases/05-post-purchase-handoff/05-post-purchase-handoff-01-SUMMARY.md` — CREATED (this file)
- Commit 3464242 (PLAN) — FOUND
- Commit 81b62c7 (Tasks 1+2) — FOUND
- Commit 4488a2c (Task 3) — FOUND
