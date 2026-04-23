---
status: passed
phase: 05-post-purchase-handoff
score: 3/3
verified: 2026-04-23
---

# Phase 05 — Post-Purchase Handoff — Verification

## Goal Achievement

**Goal:** A paying customer lands on `success.html` and can (a) book a support call via an embedded Cal.com widget, and (b) see their 14-day withdrawal right without scrolling past clutter.

**Result:** ✓ Achieved within the Placeholder Strategy.

## Success Criteria Check

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | `success.html` embeds a working Cal.com/Calendly widget; visitor reaches time-slot selection without leaving page | ✓ (placeholder) | `<iframe src="https://cal.com/__CALCOM_BOOKING_URL__?embed=true" loading="lazy">` inside new support section; HTML swap comment documents how to provision |
| 2 | Visible, non-hidden 14-day withdrawal notice in brand voice, linked to ToS clause | ✓ | `<p class="price-note">` below Cal.com section, links to `/terms#отказ` |
| 3 | Both additions render without breaking "Quiet Confidence" layout | ✓ | No new tokens/colors/shadows; `.calcom-frame` uses only existing variables; one serif-italic fragment in the new h2; eyebrow + lead pattern reused verbatim |

## Requirement Coverage

| REQ-ID | Verified |
|--------|----------|
| POST-01 (Cal.com embed) | ✓ — iframe present with placeholder URL |
| POST-03 (14-day notice on success page) | ✓ — `.price-note` line shipped |

## User Action Required Before Launch

- Create a Cal.com account, set up an event type, get the booking link (e.g., `harmblocker/support-call`)
- Swap `__CALCOM_BOOKING_URL__` in `success.html` (1 occurrence in `iframe[src]`)

## Findings

No gaps. No anti-patterns. Iframe-over-script choice preserves privacy-first posture (no Cal.com hydration tracker). Commits atomic: 3464242 → 81b62c7 → 4488a2c → ebb2fe1.

**Verdict:** Phase 5 passes within the Placeholder Strategy.
