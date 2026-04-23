---
phase: 03-copy-lock
plan: 03-copy-lock-01
subsystem: marketing-site
tags: [copy, seo, bulgarian, brand-voice, meta-tags, favicon, sitemap]
requirements: [INFR-03, INFR-04, POST-02]
dependency-graph:
  requires: [phase-02-legal-floor]
  provides: [final-copy-lock, seo-baseline, favicon, crawler-config]
  affects: [index.html, success.html]
tech-stack:
  added: []
  patterns: [static-html, meta-og-twitter, xml-sitemap-0.9, svg-favicon]
key-files:
  created:
    - favicon.svg
    - robots.txt
    - sitemap.xml
    - .planning/phases/03-copy-lock/03-copy-lock-01-PLAN.md
    - .planning/phases/03-copy-lock/03-copy-lock-01-SUMMARY.md
  modified:
    - index.html
    - success.html
decisions:
  - "Canonical domain fixed to harmblocker.bg across all meta, canonical links, sitemap, and support email"
  - "OG image referenced at /og-image.svg but SVG asset itself deferred to a later polish pass (documented inline in HTML comment)"
  - "success.html pivots from vague 'поставете настройките за защита' to concrete 'въведете двата DNS адреса от имейла' — router-first framing as the тих default"
  - "how-it-works step I on index.html rewritten from 'Регистрирайте се' to 'Платете с карта' — v1 has no account; Stripe manages subscription state"
  - "Privacy/Terms pages intentionally NOT rewritten — legal drafts stay until lawyer review (per CONTEXT.md deferred list)"
metrics:
  duration: "3m 8s"
  tasks: 5
  files-created: 5
  files-modified: 2
  commits: 6
  completed: 2026-04-23
---

# Phase 3 Plan 01: Copy Lock Summary

Editorial copy pass on `index.html` and `success.html` locked in the final brand-voice language, rewrote the success-page setup flow to reflect the real DIY DNS delivery model, and shipped the full SEO baseline (meta tags, OpenGraph, Twitter, canonical, favicon, `robots.txt`, `sitemap.xml`) required for a public launch.

## What Was Built

### 1. `index.html` copy touch-ups

Three surgical rewrites, no full overhaul:

- **How-it-works step I** — was "Регистрирайте се за секунди" + "Създайте акаунт само с имейл". V1 has no account — Stripe owns subscription state. Now reads "Платете с карта за секунди" / "Наръчникът пристига на имейла веднага след плащането." Accurate + тих.
- **How-it-works step II** — tightened to "Следвайте наръчника" + "Кратки стъпки за домашен рутер или отделно устройство. Без технически език."
- **Pricing lead** — was "Отказ по всяко време — директно от акаунта си." Now "Отказ по всяко време, без обяснения." (accurate: cancellation is by email until a portal is wired).
- **Pricing small-print** — was "Можете да откажете по всяко време от акаунта си." Now "Отказ по всяко време — един имейл е достатъчен."

Everything else on `index.html` was already on-voice. Hero headline, benefits, emotional section, pricing card features — untouched.

### 2. `success.html` DIY flow rewrite

Three editorial setup steps rewritten to describe the **real** post-purchase journey:

- **I. Отворете имейла с наръчника** — references the setup guide emailed to the payment address, with "два DNS адреса и прости стъпки за домашен рутер или отделно устройство".
- **II. Настройте вашия рутер (или устройство)** — router-first framing ("Най-тихият начин е ... домашния си рутер — тогава всички устройства вкъщи са покрити с едно движение"), with per-device fallback.
- **III. Готово. Защитата е активна** — "Промяната действа веднага — без рестарт, без инсталация."

Device mini-lists updated to concrete DNS-entry instructions ("Намерете секцията за мрежа, Wi-Fi или частен DNS. Въведете двата DNS адреса от имейла и запазете.") instead of the old vague "Поставете настройките за защита от имейла."

Help card rewritten: heading from "Затруднявате се? Ще ви помогнем." to warmer "Нужна е помощ? Ще седнем заедно."; body promises personal replies without scripts; email updated from placeholder `support@harmblocker.example` to canonical `support@harmblocker.bg`.

Hero lead paragraph tightened from "Отнема по-малко от две минути" to "Отнема няколко минути и се прави веднъж." — honest about a realistic router-config time, and the "веднъж" framing reinforces the тих value proposition.

### 3. SEO meta baseline on both pages

Added a consistent head block to `index.html` and `success.html`:

- `<link rel="canonical">` — `https://harmblocker.bg/` and `https://harmblocker.bg/success`.
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.
- OpenGraph: `og:type=website`, `og:site_name=HarmBlocker`, `og:locale=bg_BG`, `og:title`, `og:description`, `og:url`, `og:image=https://harmblocker.bg/og-image.svg`.
- Twitter: `<meta name="twitter:card" content="summary_large_image">` (inherits OG content, no duplicates).
- Existing titles kept ("HarmBlocker — По-тих интернет за вашия дом" and "Всичко е готово — HarmBlocker") — both were already on-voice.
- `success.html` description tightened to "Благодарим за доверието. В имейла ще намерите наръчника и двата DNS адреса за настройка на вашия рутер или устройство." — reads as a post-purchase confirmation in the OG preview rather than an ad.

An inline HTML comment near `og:image` documents that the raster/vector `og-image.svg` asset itself is a deliverable for a later polish pass (per CONTEXT.md deferred list).

### 4. `favicon.svg`

Created at repo root per CLAUDE.md signet rules:

- 24×24 viewBox, paper-cream rounded-rect background (`#f6f1e8`, rx=3) so the icon stays visible on dark browser UI.
- Three concentric amber rings (`#b87d33`) at stroke-width 1.25, opacities 0.35 / 0.65 / 1.0 — echoes the hero signet rhythm at browser-tab scale.
- Solid amber center dot (r=1.5).
- Direct hex colors (not `currentColor`) because favicons render outside the page's CSS context.

### 5. `robots.txt` + `sitemap.xml`

At repo root, served by the Vercel static host configured in Phase 1:

- `robots.txt`: allow all crawlers, `Sitemap: https://harmblocker.bg/sitemap.xml`.
- `sitemap.xml`: XML 1.0, `sitemaps.org/schemas/sitemap/0.9` schema, four canonical URLs on `harmblocker.bg` (`/`, `/success`, `/privacy`, `/terms`), each with `<lastmod>2026-04-23</lastmod>`, `<changefreq>monthly</changefreq>`. Priorities: 1.0 (index), 0.5 (success), 0.3 (legal). URLs match Vercel's `cleanUrls: true` routing.

## Key Decisions

- **Canonical domain = `harmblocker.bg`.** Used everywhere: meta/canonical/OG URLs, sitemap, support email, robots.txt sitemap reference. Any apex/www redirection is a host-level concern (Vercel + Hostinger DNS), not a code concern.
- **No account, so no "акаунт" in copy.** V1 has Stripe-managed subscriptions; cancellation via email. Any wording that implied a customer account has been excised.
- **Router-first as the тих default.** The success-page setup copy leads with "domestic router" because it is the single cheapest user action that covers every household device in one move — which *is* the brand's core promise.
- **Privacy/Terms NOT rewritten.** Per CONTEXT.md §"Deferred": the legal drafts from Phase 2 wait for a Bulgarian lawyer before any wording pass. Not in `files_modified`.
- **OG image is a later deliverable.** The reference URL ships; the actual 1200×630 SVG/PNG is a polish-pass item and is documented inline so a future agent or developer finds it. This unblocks the SEO baseline without creating a rushed deliverable.
- **Favicon uses direct hex, not `currentColor`.** Favicons render outside the page's CSS context — `currentColor` would render as default black. The direct amber + paper background also means the icon remains legible against dark browser chrome.

## Deviations from Plan

None — the plan was executed exactly as written. One stylistic scope-call: the `og-image.svg` asset is explicitly listed in CONTEXT.md §"Deferred" and the plan specifies "reference the URL only", so no deviation to record there.

## Commits

- `603937a` — docs(03-copy-lock-01): plan editorial copy pass + SEO baseline
- `d03620c` — feat(03-copy-lock-01): lock index.html copy to real payment flow
- `615e2b5` — feat(03-copy-lock-01): lock success.html to real DIY DNS setup flow
- `3aa1e23` — feat(03-copy-lock-01): ship SEO baseline on index + success pages
- `04d9aa8` — feat(03-copy-lock-01): add favicon.svg as 3-ring signet variant
- `b5c3569` — feat(03-copy-lock-01): add robots.txt + sitemap.xml at repo root

## Verification

Acceptance criteria (all grep-verified after each task):

- **Task 1** — `index.html`: "Регистрирайте се" 0 matches, "от акаунта си" 0 matches, "По-тих интернет" 3 matches (hero + og:title + og:description), "serif-italic" 5 matches (italic fragments preserved).
- **Task 2** — `success.html`: "DNS" 8 matches, "рутер" 3 matches, "поставете настройките за защита" 0 matches (case-insensitive), "support@harmblocker.bg" 1 match, "support@harmblocker.example" 0 matches, "setup-step__badge" 3 matches (structure preserved).
- **Task 3** — HTML files: `rel="canonical"` 2 matches (1 per file), `og:locale` 2 matches, `twitter:card` 2 matches, `harmblocker.bg` 7 matches across both, `rel="icon"` 2 matches.
- **Task 4** — `favicon.svg`: exists, `#b87d33` 2 matches, `#f6f1e8` 1 match, `circle` 4 matches (3 rings + 1 dot), `stroke-width="1.25"` 1 match.
- **Task 5** — `robots.txt`: exists, sitemap line present; `sitemap.xml`: exists, `harmblocker.bg` 4 matches, `2026-04-23` 4 matches, valid 0.9 schema.

Manual: both pages render in the browser with the favicon in the tab, layout unchanged, no console errors, copy reads calm/тих end-to-end.

## Known Stubs

- **`og-image.svg`** — referenced in OG tags on both pages but not yet delivered as a file. Intentional: CONTEXT.md §"Deferred" explicitly moves the raster/vector OG image out of this phase scope. An inline HTML comment near each `og:image` tag documents the deferred status so it surfaces to future agents. Recommended follow-up phase: Phase 7 (pre-launch audit) should add the asset before launch — the canonical path `https://harmblocker.bg/og-image.svg` is already reserved.
- **Entity placeholders** (`__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__`) — untouched in footer. Owned by Phase 2, user-swap before launch per PROJECT.md §"Milestone Execution Directive". Not a regression.

## Self-Check: PASSED

All claimed files exist:
- `D:/Claude/HarmBlocker/favicon.svg` — FOUND
- `D:/Claude/HarmBlocker/robots.txt` — FOUND
- `D:/Claude/HarmBlocker/sitemap.xml` — FOUND
- `D:/Claude/HarmBlocker/index.html` — FOUND (modified)
- `D:/Claude/HarmBlocker/success.html` — FOUND (modified)
- `D:/Claude/HarmBlocker/.planning/phases/03-copy-lock/03-copy-lock-01-PLAN.md` — FOUND

All claimed commits exist on `main` (verified via `git log --oneline -8`):
- `603937a`, `d03620c`, `615e2b5`, `3aa1e23`, `04d9aa8`, `b5c3569` — all present.
