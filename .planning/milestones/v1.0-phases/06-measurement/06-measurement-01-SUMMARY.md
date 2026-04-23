---
plan: 06-measurement-01
phase: 06-measurement
subsystem: analytics
tags: [plausible, analytics, cookieless, gdpr, cta-tracking]
dependency_graph:
  requires: []
  provides: [pageview-tracking, cta-click-events]
  affects: [index.html, success.html, COOKIE-DECISION.md]
tech_stack:
  added: ["Plausible Analytics (plausible.io/js/script.tagged-events.js)"]
  patterns: ["HTML class-based event tracking (plausible-event-name=...)", "placeholder swap pattern (__ANALYTICS_SITE_ID__)"]
key_files:
  modified:
    - index.html
    - success.html
    - .planning/phases/02-legal-floor/COOKIE-DECISION.md
decisions:
  - "Chose Plausible over Umami/Fathom: smallest script (~1KB), EU-hosted option available, most common cookieless choice, self-host possible later"
  - "Used tagged-events.js variant to enable class-based CTA click tracking without writing any custom JS"
  - "Placeholder __ANALYTICS_SITE_ID__ follows established project placeholder naming convention"
metrics:
  duration: "2 minutes"
  completed: "2026-04-23T19:57:38Z"
  tasks_completed: 4
  tasks_total: 4
  files_modified: 3
---

# Phase 6 Plan 1: Plausible Analytics Install Summary

**One-liner:** Plausible cookieless analytics installed on both pages via `tagged-events.js` with `__ANALYTICS_SITE_ID__` placeholder and class-based CTA click event tracking.

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Install Plausible script in `index.html` head | b8255c8 | index.html |
| 2 | Install Plausible script in `success.html` head | f135141 | success.html |
| 3 | Tag hero + pricing CTAs with Plausible event classes | b66fc5b | index.html |
| 4 | Append Phase 6 outcome to COOKIE-DECISION.md | 70e280f | COOKIE-DECISION.md |

## What Was Built

**Plausible analytics** is now present in the `<head>` of both pages:
```html
<!-- SWAP: replace __ANALYTICS_SITE_ID__ with your Plausible site ID (usually your domain).
     Create a free account at https://plausible.io; add site "harmblocker.bg" (or your domain).
     tagged-events script allows CTA click tracking via `class="plausible-event-name=..."`. -->
<script defer data-domain="__ANALYTICS_SITE_ID__" src="https://plausible.io/js/script.tagged-events.js"></script>
```

**Both CTAs on `index.html`** carry Plausible event class attributes (concatenated, not replacing existing classes):
- Hero CTA: `class="btn btn--primary btn--large plausible-event-name=CTA+Click plausible-event-position=hero"`
- Pricing CTA: `class="btn btn--primary btn--large plausible-event-name=CTA+Click plausible-event-position=pricing"`

**COOKIE-DECISION.md** now records the Phase 6 outcome, confirming Plausible is cookieless, ANLY-02 is satisfied, and no cookie banner is triggered.

## Decisions Made

1. **Vendor: Plausible** — chosen over Umami and Fathom. All three are cookieless; Plausible has the smallest script footprint, is EU-hosted (plausible.io/eu option available), and can be self-hosted later if needed.

2. **`tagged-events.js` variant** — selected over the plain `script.js` variant because it allows class-attribute-based custom event firing. This means CTA click tracking requires zero JavaScript code changes — Plausible reads the `plausible-event-name=...` and `plausible-event-position=...` class attributes automatically.

3. **`__ANALYTICS_SITE_ID__` placeholder** — consistent with the established project pattern (`__STRIPE_CHECKOUT_URL__`, `__CALCOM_BOOKING_URL__`, `__ENTITY_NAME__`). The SWAP comment provides the exact Plausible account creation URL and site-ID format.

## Deviations from Plan

None — plan executed exactly as written.

## Requirements Satisfied

| Requirement | Status |
|-------------|--------|
| ANLY-01: Privacy-first analytics installed on both pages, tracking pageviews + CTA click events | Satisfied (pending site-ID swap + Plausible account creation) |
| ANLY-02: Analytics choice is cookieless, no consent banner required | Satisfied — Plausible confirmed cookieless |

## User Action Required Before Go-Live

1. Create a free Plausible account at https://plausible.io
2. Add a site with your domain (e.g., `harmblocker.bg`)
3. In both `index.html` and `success.html`, replace `__ANALYTICS_SITE_ID__` with the site ID from Plausible (the domain string, e.g., `harmblocker.bg`)
4. In Plausible dashboard, create a Goal named "CTA Click" to see the click events — Plausible auto-detects custom event names from tagged elements

## Known Stubs

- `__ANALYTICS_SITE_ID__` in both `index.html` and `success.html` — intentional placeholder per project convention. No data will be collected until the user swaps in a real Plausible site ID and creates an account. This is by design and documented in the SWAP comments.

## Self-Check: PASSED

Files verified:
- `index.html` — FOUND (contains plausible.io script + both CTA event classes)
- `success.html` — FOUND (contains plausible.io script)
- `.planning/phases/02-legal-floor/COOKIE-DECISION.md` — FOUND (Phase 6 Outcome section appended)

Commits verified:
- b8255c8 — FOUND (feat: Plausible on index.html)
- f135141 — FOUND (feat: Plausible on success.html)
- b66fc5b — FOUND (feat: CTA event classes)
- 70e280f — FOUND (docs: COOKIE-DECISION.md Phase 6 outcome)
