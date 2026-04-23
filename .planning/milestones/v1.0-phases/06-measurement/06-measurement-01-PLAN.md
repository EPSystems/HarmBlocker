---
plan: 06-measurement-01
phase: 06-measurement
wave: 1
depends_on: []
requirements: [ANLY-01, ANLY-02]
files_modified: [index.html, success.html, .planning/phases/02-legal-floor/COOKIE-DECISION.md]
autonomous: true
---

# Phase 6 Plan 1: Install Plausible Analytics

## Objective

Install Plausible (cookieless) analytics on `index.html` and `success.html` with a
placeholder site-ID, tag the two CTAs for click-event tracking, and record the
vendor decision in `COOKIE-DECISION.md`.

## Context

- Both HTML pages have a Google Fonts link in `<head>` — Plausible script goes
  directly below it.
- Two CTAs in `index.html` carry `data-cta="hero"` and `data-cta="pricing"`.
  Plausible's `tagged-events.js` variant fires custom events when elements carry
  `class="plausible-event-name=..."`.
- Plausible is cookieless and GDPR-friendly — ANLY-02 holds, no consent banner
  needed (already documented in COOKIE-DECISION.md Phase 2 decision).
- `__ANALYTICS_SITE_ID__` follows the project's established placeholder naming
  convention (e.g., `__STRIPE_CHECKOUT_URL__`, `__CALCOM_BOOKING_URL__`).

## Tasks

### Task 1 — Install Plausible on `index.html`

**Type:** auto

**Read first:** `index.html` — specifically the `<head>` block (lines 1–37).

**Action:**
Insert the following HTML comment + script tag directly below the closing
`</link>` for Google Fonts (after line 34, before `<link rel="stylesheet" href="styles.css" />`):

```html
    <!-- SWAP: replace __ANALYTICS_SITE_ID__ with your Plausible site ID (usually your domain).
         Create a free account at https://plausible.io; add site "harmblocker.bg" (or your domain).
         tagged-events script allows CTA click tracking via `class="plausible-event-name=..."`. -->
    <script defer data-domain="__ANALYTICS_SITE_ID__" src="https://plausible.io/js/script.tagged-events.js"></script>
```

**Acceptance criteria:**
- `grep -n "plausible.io" index.html` returns a result
- `grep -n "__ANALYTICS_SITE_ID__" index.html` returns at least 2 results (comment + data-domain)
- `grep -n "tagged-events" index.html` returns a result
- `grep -n "defer" index.html` returns a result on the Plausible script line

---

### Task 2 — Install Plausible on `success.html`

**Type:** auto

**Read first:** `success.html` — specifically the `<head>` block (lines 1–37).

**Action:**
Insert the same HTML comment + script tag in `success.html` in the same position —
directly below the Google Fonts `<link>` tag, before `<link rel="stylesheet" href="styles.css" />`:

```html
    <!-- SWAP: replace __ANALYTICS_SITE_ID__ with your Plausible site ID (usually your domain).
         Create a free account at https://plausible.io; add site "harmblocker.bg" (or your domain).
         tagged-events script allows CTA click tracking via `class="plausible-event-name=..."`. -->
    <script defer data-domain="__ANALYTICS_SITE_ID__" src="https://plausible.io/js/script.tagged-events.js"></script>
```

**Acceptance criteria:**
- `grep -n "plausible.io" success.html` returns a result
- `grep -n "__ANALYTICS_SITE_ID__" success.html` returns at least 2 results
- `grep -n "tagged-events" success.html` returns a result

---

### Task 3 — Tag the two CTAs in `index.html`

**Type:** auto

**Read first:** `index.html` — the hero CTA block (around line 88) and the pricing
CTA block (around line 344).

**Action:**
On the hero CTA `<a>` element (the one with `data-cta="hero"`), concatenate
Plausible event classes onto the existing `class` attribute:

Before:
```html
                  class="btn btn--primary btn--large"
                  data-cta="hero"
```

After:
```html
                  class="btn btn--primary btn--large plausible-event-name=CTA+Click plausible-event-position=hero"
                  data-cta="hero"
```

On the pricing CTA `<a>` element (the one with `data-cta="pricing"`), concatenate:

Before:
```html
                class="btn btn--primary btn--large"
                data-cta="pricing"
```

After:
```html
                class="btn btn--primary btn--large plausible-event-name=CTA+Click plausible-event-position=pricing"
                data-cta="pricing"
```

**Acceptance criteria:**
- `grep -n "plausible-event-name=CTA+Click" index.html` returns 2 results
- `grep -n "plausible-event-position=hero" index.html` returns 1 result
- `grep -n "plausible-event-position=pricing" index.html` returns 1 result
- `grep -n 'data-cta="hero"' index.html` returns 1 result (attribute preserved)
- `grep -n 'data-cta="pricing"' index.html` returns 1 result (attribute preserved)
- `grep -n "btn--primary" index.html` returns at least 2 results (classes preserved)

---

### Task 4 — Append Phase 6 outcome to `COOKIE-DECISION.md`

**Type:** auto

**Read first:** `.planning/phases/02-legal-floor/COOKIE-DECISION.md` — read entire file
to understand existing structure and append at the bottom.

**Action:**
Append the following section at the end of the file:

```markdown

---

## Phase 6 Outcome

**Date:** 2026-04-23
**Vendor chosen:** Plausible (`https://plausible.io/js/script.tagged-events.js`)
**Site ID placeholder:** `__ANALYTICS_SITE_ID__` — replace with your Plausible site ID
  (e.g., `harmblocker.bg`) after creating an account at https://plausible.io.

### Confirmation

Plausible is **cookieless** and **GDPR-friendly**. It does not set cookies, does
not use persistent client-side identifiers, and stores no personal data in the
browser. The Phase 2 decision (no cookie banner required) remains valid.

**What was installed:**
- `script.tagged-events.js` — the Plausible variant that auto-fires custom events
  on elements carrying `class="plausible-event-name=..."` classes.
- Both `index.html` and `success.html` carry the Plausible script in `<head>`.
- Two CTA elements in `index.html` carry `plausible-event-name=CTA+Click` with
  position properties (`hero` and `pricing`) for distinct event segmentation.

**No cookie banner is triggered by this installation.** ANLY-02 satisfied.
```

**Acceptance criteria:**
- `grep -n "Phase 6 Outcome" .planning/phases/02-legal-floor/COOKIE-DECISION.md` returns 1 result
- `grep -n "__ANALYTICS_SITE_ID__" .planning/phases/02-legal-floor/COOKIE-DECISION.md` returns 1 result
- `grep -n "ANLY-02 satisfied" .planning/phases/02-legal-floor/COOKIE-DECISION.md` returns 1 result
- `grep -n "No cookie banner is triggered" .planning/phases/02-legal-floor/COOKIE-DECISION.md` returns 1 result

---

## Verification

After all four tasks are committed, verify:

1. Both pages have Plausible: `grep -l "plausible.io" index.html success.html` → both files listed
2. Placeholder present: `grep -c "__ANALYTICS_SITE_ID__" index.html` → 2 or more (comment + attribute)
3. CTAs tagged: `grep -c "plausible-event-name=CTA+Click" index.html` → 2
4. Existing classes intact: `grep "btn--primary" index.html | grep -c "data-cta"` → 0 (data-cta is separate attribute, not inside class)
5. COOKIE-DECISION.md updated: `grep "Phase 6 Outcome" .planning/phases/02-legal-floor/COOKIE-DECISION.md`

## Success Criteria

- [ ] `<script defer data-domain="__ANALYTICS_SITE_ID__" src="https://plausible.io/js/script.tagged-events.js">` present in both `<head>` sections
- [ ] HTML swap comment containing `__ANALYTICS_SITE_ID__` present near the script on both pages
- [ ] Both CTAs on `index.html` carry `plausible-event-name=CTA+Click` class
- [ ] Both CTAs on `index.html` preserve their existing `data-cta` attributes and `btn--primary btn--large` classes
- [ ] `COOKIE-DECISION.md` has a new "Phase 6 Outcome" section confirming Plausible is cookieless
- [ ] No cookies set; ANLY-02 constraint holds

## Output

No new files created. Four files modified:
- `index.html` — Plausible script in head + CTA event classes
- `success.html` — Plausible script in head
- `.planning/phases/02-legal-floor/COOKIE-DECISION.md` — Phase 6 outcome note
- `.planning/phases/06-measurement/06-measurement-01-SUMMARY.md` — created after execution
