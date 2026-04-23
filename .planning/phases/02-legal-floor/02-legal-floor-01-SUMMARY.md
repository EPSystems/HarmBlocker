---
phase: 02-legal-floor
plan: 01
subsystem: legal
tags: [gdpr, bulgarian-consumer-law, stripe, cal.com, privacy, terms, cookie-banner, zzp, directive-2011-83]

# Dependency graph
requires:
  - phase: 01-production-floor
    provides: "vercel.json with cleanUrls:true enabling /privacy and /terms routes without additional config"
provides:
  - "Bulgarian GDPR-compliant Privacy Policy draft (privacy.html) with lawyer-review gate"
  - "Bulgarian Terms of Service draft (terms.html) with explicit 14-day right-of-withdrawal clause citing ЗЗП чл. 50–57 and Directive 2011/83/ЕС"
  - "Consolidated footer on all four pages (index, success, privacy, terms) with grep-able entity placeholders and legal links"
  - "Signed cookie-banner decision (no-banner for v1.0) tied to Phase 6's cookieless analytics commitment"
  - "Three grep-able entity placeholders for user-swap at launch: __ENTITY_NAME__, __ENTITY_ADDRESS__, __CONTACT_EMAIL__"
  - "CSS .legal / .legal-banner / .prose blocks for long-form legal readability"
affects: [03-copy-lock, 04-checkout-live, 05-post-purchase-handoff, 06-measurement]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Grep-able underscore-bracketed placeholders (__TOKEN__) for values that ship later"
    - "Legal-page draft banner: paper-soft background + hairline + amber border-left + Instrument Serif italic label"
    - "Prose article styling: Instrument Serif h2 (400), Inter h3 (600), amber underlined links, amber list-markers, amber blockquote border"
    - "Consolidated site-wide footer: signet mark + entity row + legal links + copyright line, flex-wrap at 640px+"

key-files:
  created:
    - "privacy.html — Bulgarian GDPR Privacy Policy draft with lawyer-review HTML comment + visible Чернова banner"
    - "terms.html — Bulgarian ToS draft with 14-day withdrawal clause and copyable cancellation email template"
    - ".planning/phases/02-legal-floor/COOKIE-DECISION.md — one-pager recording no-banner decision and revisit triggers"
  modified:
    - "index.html — footer replaced with consolidated entity-placeholder version"
    - "success.html — footer replaced with consolidated entity-placeholder version"
    - "styles.css — appended .legal / .legal-banner / .prose blocks and footer__brand / footer__entity / footer__copy classes"

key-decisions:
  - "No cookie banner ships in v1.0 — site sets no cookies of its own and Phase 6 commits to cookieless analytics (Plausible/Umami/Fathom). Documented in COOKIE-DECISION.md with revisit triggers."
  - "Copyright line uses __ENTITY_NAME__ (not the brand name HarmBlocker) because the legal entity owns copyright; HarmBlocker is the product. Both appear in the consolidated footer."
  - "Draft legal pages are marked two ways: an HTML comment <!-- LAWYER REVIEW REQUIRED BEFORE LAUNCH --> that cannot be missed by developers, and a visible in-page .legal-banner in Bulgarian so a casual viewer also sees the draft status."
  - "Links use /privacy and /terms (not .html extensions) because vercel.json ships with cleanUrls:true from Phase 1."
  - "Legal-pages nav uses the simpler success.html variant (brand-only, no CTA) — CTAs don't belong on legal pages."

patterns-established:
  - "Bulgarian-first legal copy: тих voice, no shaming, no legalese-for-its-own-sake. Citations (GDPR Art., ЗЗП чл., Directive 2011/83/ЕС) are load-bearing but the surrounding prose remains conversational."
  - "One serif-italic fragment per h1 on legal pages, matching brand rule; no italic scatter through body text."
  - "Entity placeholders are grep-able exact tokens (__ENTITY_NAME__, __ENTITY_ADDRESS__, __CONTACT_EMAIL__) so a single ripgrep pass finds every slot before launch."
  - "The .legal-banner is the only chrome allowed on a legal page beyond prose + hairlines — no tinted warnings, no shadows, no alarmist red."

requirements-completed: [LEG-01, LEG-02, LEG-03, LEG-05, LEG-06]

# Metrics
duration: 4min
completed: 2026-04-23
---

# Phase 02-legal-floor Plan 01: Legal floor Summary

**Bulgarian GDPR Privacy Policy + ToS with 14-day ЗЗП/Directive 2011/83/ЕС withdrawal clause, consolidated footer with grep-able entity placeholders on all four pages, and a signed no-cookie-banner decision tied to Phase 6's cookieless analytics commitment.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-23T19:22:03Z
- **Completed:** 2026-04-23T19:26:02Z
- **Tasks:** 4
- **Files modified:** 6 (3 created, 3 modified)

## Accomplishments

- `privacy.html` ships as a Bulgarian GDPR-compliant draft: data controller (GDPR Art. 4(7)), six user rights enumerated with article citations, three third-party processors named plainly (Google Fonts, Stripe, Cal.com), cookie section aligned with Phase 6 decision, КЗЛД escalation path.
- `terms.html` ships with an unmissable 14-day right-of-withdrawal clause citing both Bulgarian ЗЗП чл. 50–57 and EU Directive 2011/83/ЕС, plus a copyable blockquote email template the customer can paste into mail. Bulgarian law + КЗП + EU ODR dispute paths all disclosed.
- Consolidated footer lives identically on all four pages (`index`, `success`, `privacy`, `terms`): signet brand mark preserved, entity placeholder row, legal links to `/privacy` and `/terms`, copyright line owned by the legal entity (not the brand name).
- `COOKIE-DECISION.md` records the no-banner decision with four explicit revisit triggers, so future phases cannot silently invalidate it.
- Design system preserved: no new fonts, no new colors, no shadows, no pill shapes, no tinted warnings. The draft banner reads as editorial, not SaaS-alarmist.

## Task Commits

Each task was committed atomically:

1. **Task 1: Draft privacy.html** — `228c321` (feat) — privacy.html + styles.css `.legal` / `.legal-banner` / `.prose` / `.footer__entity` blocks
2. **Task 2: Draft terms.html** — `f40e9c7` (feat) — terms.html with 14-day withdrawal clause and copyable template
3. **Task 3: Consolidate footer** — `17606d0` (feat) — index.html + success.html footer replacement
4. **Task 4: COOKIE-DECISION.md** — `738eddd` (docs) — no-banner decision record

**Plan metadata commit:** (pending — includes this SUMMARY, STATE.md, ROADMAP.md, REQUIREMENTS.md)

## Files Created/Modified

- `privacy.html` (created) — Bulgarian GDPR Privacy Policy draft with lawyer-review HTML comment, visible Чернова banner, GDPR rights, three third-party processors
- `terms.html` (created) — Bulgarian ToS draft with 14-day right-of-withdrawal clause and copyable cancellation email template
- `.planning/phases/02-legal-floor/COOKIE-DECISION.md` (created) — No-banner decision tied to Phase 6 cookieless analytics
- `index.html` (modified) — footer replaced with consolidated entity-placeholder version (nav, hero, pricing, all other sections untouched)
- `success.html` (modified) — footer replaced with consolidated entity-placeholder version (nav, hero, setup steps, devices untouched)
- `styles.css` (modified) — appended `.legal` / `.legal-banner` / `.prose` blocks and `.footer__brand` / `.footer__entity` / `.footer__copy` rules at the end of the file, after the existing focus-visible block

## Decisions Made

- No cookie banner in v1.0. Documented in `.planning/phases/02-legal-floor/COOKIE-DECISION.md`. Revisit if Phase 6 analytics is not cookieless, or if any future phase adds marketing pixels, chat widgets, session replay, heatmaps, A/B libraries, or login-state cookies.
- Entity placeholders use grep-able `__TOKEN__` format so a single `rg __ENTITY_` run finds every swap-slot before launch.
- Copyright in the consolidated footer names `__ENTITY_NAME__` (the legal entity), not the product brand. The product brand "HarmBlocker" still appears in the copyright tagline as context.
- Clean-URL links (`/privacy`, `/terms`) rely on `cleanUrls:true` from `vercel.json` (shipped in Phase 1). If hosting ever changes, either re-enable cleanUrls or rewrite to `.html` suffixes.
- Draft status is marked twice: an HTML comment for developers (`<!-- LAWYER REVIEW REQUIRED BEFORE LAUNCH -->`) and a visible Bulgarian `.legal-banner` for casual readers. Both are required so neither a developer nor a business reader can push the page live unaware.

## Deviations from Plan

None — plan executed exactly as written.

The plan explicitly allowed flexibility on Task 1's footer (stub vs. consolidated). Task 1 shipped the consolidated footer directly per the plan's preferred path, which meant Task 3 became an edit-only operation on `index.html` and `success.html` (no churn on the legal pages). This was anticipated and is not a deviation.

## Issues Encountered

None. Git produced CRLF warnings on Windows for every write — expected behavior on this platform, no action required.

## User Setup Required

None technical for this phase — no external services configured. However, **three human actions are required before launch** and are called out repeatedly by the placeholders and the visible draft banner:

1. **Legal review.** Both `privacy.html` and `terms.html` must be reviewed by a Bulgarian lawyer before publishing. The HTML comment `<!-- LAWYER REVIEW REQUIRED BEFORE LAUNCH -->` and the visible `.legal-banner` make this unavoidable to miss.
2. **Entity placeholder swap.** Replace every occurrence of `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, and `__CONTACT_EMAIL__` across `index.html`, `success.html`, `privacy.html`, `terms.html`, and `COOKIE-DECISION.md`. Use `rg __ENTITY_` / `rg __CONTACT_` to find every slot.
3. **Remove the draft banner.** After lawyer sign-off, delete the `<aside class="legal-banner">...</aside>` block and the `<!-- LAWYER REVIEW REQUIRED BEFORE LAUNCH -->` comment on both legal pages.

## Known Stubs

None. Everything that looks like a stub is an intentional grep-able placeholder:

- `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__` — documented in PROJECT.md's Milestone Execution Directive as user-swap values. Each appears in the consolidated footer and inside legal-page copy. These are not stub renders — they are clearly-marked swap tokens and the visible draft banner makes their placeholder nature obvious to the reader.
- `Последна актуализация: 2026-04-23` — today's date, not a placeholder.

## Next Phase Readiness

- **Phase 3 (Copy lock)** can now reference legal page titles, the `/privacy` and `/terms` URLs, and the consolidated footer copy — all in place and linkable.
- **Phase 4 (Checkout live)** can link directly to `/terms#pravo-na-otkaz` (or the exact heading) from the pre-purchase 14-day disclosure called out in LEG-04. The clause heading `<h2>Право на отказ в рамките на 14 дни</h2>` is stable text Phase 4 can anchor against.
- **Phase 5 (Post-purchase handoff)** can reuse the same 14-day clause for the `success.html` post-purchase notice (POST-03).
- **Phase 6 (Measurement)** inherits the no-cookie-banner constraint from `COOKIE-DECISION.md`. Any analytics tool that sets cookies invalidates the Phase 2 decision and requires a banner to ship alongside the analytics script.

**Blocker (unchanged from STATE.md):** a real entity name + registered address is required before Phase 4 can legitimately go live. Phase 2 surfaces this as three obvious placeholders; it does not resolve it.

## Self-Check: PASSED

**Files verified on disk:**
- `privacy.html` — FOUND
- `terms.html` — FOUND
- `index.html` — FOUND (modified)
- `success.html` — FOUND (modified)
- `styles.css` — FOUND (modified)
- `.planning/phases/02-legal-floor/COOKIE-DECISION.md` — FOUND
- `.planning/phases/02-legal-floor/02-legal-floor-01-SUMMARY.md` — FOUND

**Commits verified in git log:**
- `228c321` (Task 1) — FOUND
- `f40e9c7` (Task 2) — FOUND
- `17606d0` (Task 3) — FOUND
- `738eddd` (Task 4) — FOUND

**Phase verification block (from PLAN.md `<verification>` section):**
- All entity placeholders present on all 4 pages (index, success, privacy, terms) — PASS
- Both legal links (`/privacy`, `/terms`) present on all 4 pages — PASS
- Draft marks (HTML comment + visible Чернова banner) on both legal pages — PASS
- GDPR signals on privacy.html (GDPR, Google Fonts, Stripe, Cal.com) — PASS
- 14-day withdrawal markers on terms.html (14-дневно, 14 дни, ЗЗП, 2011/83) — PASS
- Bulgarian lang attribute on both legal pages — PASS
- COOKIE-DECISION.md file exists and contains "cookieless" — PASS
- CSS additions present in styles.css (.legal, .legal-banner, .prose, .footer__entity) — PASS

---
*Phase: 02-legal-floor*
*Completed: 2026-04-23*
