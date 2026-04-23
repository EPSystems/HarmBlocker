# Phase 7 — UI Review Fix Log

Actions taken against the 3 top fixes in `07-UI-REVIEW.md`.

## Fix 1 — SEO meta parity on legal pages ✓ APPLIED

**Finding:** `privacy.html` and `terms.html` lacked `rel="canonical"`, OpenGraph, and Twitter-card tags shipped in Phase 3 on the other pages.

**Action:** Added to both files (commit `9bbb660`):
- `<link rel="canonical">` pointing to the page's canonical URL
- `og:type=article`, `og:site_name`, `og:locale=bg_BG`, `og:title`, `og:description`, `og:url`, `og:image` — all pointing at `/og-image.svg`
- `<meta name="twitter:card" content="summary_large_image">`
- `<meta name="robots" content="noindex,nofollow">` — because these pages are lawyer-review drafts; we don't want search engines indexing a draft ToS or Privacy Policy. User removes this meta when the lawyer approves.

**Status:** Fixed.

## Fix 2 — Guard against `__*__` placeholders reaching production ✗ DEFERRED

**Finding:** Four placeholder tokens exist across the repo and would 404 / no-op if deployed as-is:
- `__STRIPE_CHECKOUT_URL__` — 2× in `index.html` CTAs
- `__CALCOM_BOOKING_URL__` — 1× in `success.html` iframe
- `__ANALYTICS_SITE_ID__` — 2× in Plausible scripts (both pages)
- `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__` — across 4 HTML pages

**Reason for deferral:** This is a process/CI recommendation, not an in-repo code fix. The appropriate guard lives in the deploy pipeline — either a Vercel build command that greps for `__[A-Z_]+__` and exits non-zero if found, or a pre-push git hook, or a simple manual pre-launch checklist.

**User action recommended** (when ready to go live):

```bash
# Add to your Vercel "Build Command" or run as a pre-deploy check:
if grep -rE '__[A-Z_]+__' --include="*.html" --include="*.css" --include="*.js" .; then
  echo "Placeholder tokens found — resolve before deploy"; exit 1;
fi
```

Or simpler: ship the `DEPLOY.md` checklist (already in repo from Phase 1) — it documents which tokens need swapping and where.

**Status:** Deferred to user. Documented here and already implicitly covered by `DEPLOY.md` + per-file HTML swap comments.

## Fix 3 — Ship `/og-image.svg` ✓ APPLIED

**Finding:** Both `index.html` and `success.html` reference `og-image.svg` in their `og:image` meta, but the file was not in the repo (known Phase 3 deferral).

**Action:** Created `og-image.svg` at repo root (commit `9bbb660`):
- 1200×630 viewBox (standard OG image size)
- Paper cream (`#f6f1e8`) background
- Signet motif on left (6 concentric amber rings + center dot + horizon lines), matching CLAUDE.md §Signet
- Editorial serial number "№ 001 ⁄ HB" top-right in Instrument Serif italic amber
- Wordmark "HARMBLOCKER" + tagline "По-тих интернет / за вашия дом." on right (serif + serif-italic fragment for "за вашия дом.")
- Subhead in Inter
- Paper-grain filter via `feTurbulence`

Stale HTML comments referencing og-image as "deliverable for polish pass" removed from `index.html` and `success.html`.

**Caveat:** Some social platforms (older Facebook scrapers, LinkedIn) don't render SVG OG images reliably. If that matters pre-launch, user can convert `og-image.svg` → `og-image.png` via an online tool (e.g., cloudconvert) and swap the `og:image` URL. 2026 platforms largely support SVG, so shipping the SVG is a reasonable v1.

**Status:** Fixed.

## Minor Recommendations (not addressed)

The audit also flagged 3 minor items:
1. Inline style cleanup on `success.html:75` — deferred (not blocking)
2. Iframe `sandbox` attribute on Cal.com embed — deferred; sandbox on Cal.com would break its JS, and the iframe loads a trusted origin
3. Minor copy tweak in `privacy.html:9` meta description (the word "плейнспоукън" is an anglicism) — **worth fixing** post-launch

These are not pre-launch-blocking.

## Re-Check

After the two fixes above:
- All 4 HTML pages now have consistent canonical/OG/twitter meta ✓
- `/og-image.svg` exists and is referenced consistently ✓
- Draft pages (privacy/terms) carry `noindex` to prevent premature indexing ✓
- No regressions against CLAUDE.md design system (no new fonts, colors, shadows, or illustrations introduced — og-image.svg uses only existing palette + signet motif) ✓

**Phase 7 success criterion 2** (pre-launch-blocking findings fixed or explicitly deferred) — **met**.
**Phase 7 success criterion 3** (no regression against design system) — **met**.
