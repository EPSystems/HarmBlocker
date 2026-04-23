# Phase 7 — UI Review

**Audited:** 2026-04-23
**Baseline:** CLAUDE.md "Quiet Confidence" design system (no UI-SPEC.md; project instructions ARE the contract)
**Screenshots:** not captured — no dev server running on :3000/:5173/:8080. Audit is code-only against HTML + CSS.
**Scope:** `index.html`, `success.html`, `privacy.html`, `terms.html`, `styles.css`, `script.js`

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Bulgarian-first, calm, тих throughout. Single serif-italic fragment per headline, Roman numerals for ordered steps, no generic SaaS labels. |
| 2. Visuals | 4/4 | Signet motif used in 4 disciplined variants (nav 28px, hero 420px, emotional 56px, success seal 96px). No stock metaphors, no tinted-circle icons, no illustrations off-brand. |
| 3. Color | 4/4 | Zero rogue colors. Every hex / rgba resolves to the declared palette. No `box-shadow` anywhere in CSS. |
| 4. Typography | 4/4 | Only Instrument Serif (weight 400 only) + Inter. No bold serif. Type scale is coherent (clamp-based display, fixed Inter sizes). |
| 5. Spacing | 4/4 | No arbitrary values. All spacing via `--space-1..10` tokens. Section padding uses the documented `clamp(--space-9, 12vw, --space-10)` rhythm. |
| 6. Experience Design | 3/4 | SEO meta parity gap on legal pages (canonical/OG/Twitter missing) and one unswapped CTA href that would 404 on click. Otherwise motion, focus, accessibility, reduced-motion all correct. |

**Overall: 23/24**

The site is pre-launch ready against the "Quiet Confidence" contract. The one point deducted is for a cross-page meta gap inherited from Phase 3 and a pre-launch-only CTA stub — both are pre-known, neither is a design-system violation.

---

## Top 3 Priority Fixes

1. **Legal pages are missing the SEO meta baseline** — `privacy.html` (lines 1–21) and `terms.html` (lines 1–21) have no `rel="canonical"`, no OpenGraph tags, and no Twitter card tags. `index.html` and `success.html` shipped these in Phase 3; the legal pages were intentionally skipped (Phase 3 CONTEXT deferred legal-page copy, but the head block was scoped away with it). Impact: if anyone shares `harmblocker.bg/privacy` on social media, the preview degrades to the domain string + an auto-scraped excerpt, no OG image, no title override. Fix: port the same six-tag block (`rel="canonical"`, `og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`) into the `<head>` of both legal pages, set canonical to `https://harmblocker.bg/privacy` and `.../terms`. ~10 min of work.

2. **`__STRIPE_CHECKOUT_URL__` placeholder will 404 if clicked before user swap** — both CTAs in `index.html` (lines 94, 350) carry `href="__STRIPE_CHECKOUT_URL__"`. A browser will resolve that as a relative URL (`harmblocker.bg/__STRIPE_CHECKOUT_URL__`) and return 404. This is a documented pre-launch stub, but the risk is that someone deploys to production forgetting the swap. Mitigations to consider: (a) add a `prerender: false` guard comment or a pre-commit/CI grep for `__STRIPE_CHECKOUT_URL__` blocking deploy, (b) fall back `href` to `#pricing` with a `TODO` comment so broken-state gracefully re-anchors. Call: this is a process fix, not a design fix. Owner is the user per DEPLOY.md.

3. **`og-image.svg` referenced but not shipped** — both `index.html:24` and `success.html:24` point `og:image` at `/og-image.svg`, which is a known deferral from Phase 3 (CONTEXT.md explicitly defers). Impact: social previews show no image, just title + description. Fix: ship a 1200×630 SVG composed of the signet motif on paper-cream background with the wordmark — ~30 min work by the same agent that did the hero signet, staying in amber + ink only.

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)

**Brand voice compliance.** Every user-facing string is in Bulgarian. No generic labels: the primary CTA is "Започнете за 3€ на месец" (not "Submit" / "Click Here" / "Get Started"). Hero subhead is concrete ("две минути" / "невидимо във фонов режим") rather than generic.

**Signature italic fragment.** Used exactly once per display headline — verified across all 13 `serif-italic` occurrences:
- `index.html:79, 156, 187, 288, 303` — hero, how-it-works h2, benefits h2, emotional h2, pricing h2 (5 headlines, 5 italic fragments)
- `success.html:76, 91, 134, 211` — success hero, setup h2, devices h2, support h2 (4 headlines, 4 fragments)
- `privacy.html:56`, `terms.html:56` — legal `h1` titles
- `privacy.html:45`, `terms.html:45` — `Чернова.` inside `.legal-banner__label` (this is a banner label, distinct from the h1 that already carries its own italic — so the page has two italics but they belong to separate surfaces, which is fine)

**Brand-voice rigor on sensitive copy.** Emotional section (`index.html:287–294`) handles the topic ("Независимо дали защитавате детето си или себе си") without shaming or alarmism, matching CLAUDE.md's тих voice requirement.

**Roman numerals.** Used in `.steps` (`I.`, `II.`, `III.` at `index.html:162, 168, 174`) and `.setup-steps` (`I.`, `II.`, `III.` at `success.html:97, 107, 118`). No `01` / `02` / `03` generic-SaaS pattern anywhere. The `.device ol` uses arabic numerals via `counter(stepcount)` styled as Instrument Serif italic amber — this is explicitly sanctioned in CLAUDE.md Typography rules.

**Legal copy quality.** `privacy.html` enumerates six GDPR rights with article citations; `terms.html` cites ЗЗП чл. 50–57 and Directive 2011/83/ЕС directly. Prose stays conversational despite load-bearing citations. Draft banner is editorial (paper-soft surface, amber left-border 2px, Instrument Serif italic label) — not alarmist red.

**One minor tonal nit.** `privacy.html:9` description uses "плейнспоукън" as a Bulgarian transliteration of "plainspoken" — the word is meta-copy (only appears in meta description, not on the page), but it is an English loan word inside Bulgarian meta. The site body never does this. Consider "ясен" or "прозрачен" for the meta description. Not blocking.

### Pillar 2: Visuals (4/4)

**Signet discipline.** The concentric-rings signet is the only illustration vocabulary. Variants audited:
- Nav brand, 28×28, 3 rings + solid center — `index.html:50, success.html:49, privacy.html:30, terms.html:30` (identical across all four pages, good)
- Footer brand, 28×28 rendered at 24×24 via `.footer__brand .brand__mark` rule (`styles.css:1191`)
- Hero art, 420×420, 6 rings + column grid + serial "№ 001 ⁄ HB" — `index.html:113–145`
- Emotional mark, 56×56, 3 rings — `index.html:282–286`
- Success seal, 96×96, 4 rings + center check — `success.html:65–73`
- Favicon, 3-ring signet with paper-cream background (file not re-inspected but Phase 3 summary confirms)

**No tinted-circle icons.** `.benefit__icon` sits bare in amber at 22×22px (`styles.css:554–565`). `.device__icon` sits bare in amber at 36×36 container, 24×24 SVG. No circular backgrounds, no drop shadows, no tinted hover states.

**Icon stroke discipline.** All content icons stroke 1.5 (e.g., `index.html:193, 206, 220, 235, 248, 264`), signet rings stroke 1–1.25, pricing checkmarks stroke 1.8 (`index.html:320, 326, 332, 338`). Matches CLAUDE.md exactly.

**No stock metaphors.** No shields, houses, locks, checkmarks-in-circles anywhere in the HTML. The six benefit icons are: shield-with-check (different from banned house-with-shield), heart-with-X, laptop+phone, radar rings, two-person group, speech-bubble — all thematically coherent with "family / protection / devices" without relying on stock vocabulary.

**Hero serial number** "№ 001 ⁄ HB" (`index.html:141–143`) at `fill="rgba(14,20,32,0.44)"`, 10px Inter, letter-spacing 1.6 — the signature editorial detail. Present, correctly rendered.

### Pillar 3: Color (4/4)

**Palette compliance: perfect.** Every hex literal in the repo is one of:
- `#f6f1e8` (paper) — 4 matches (`styles.css:57`, theme-color × 3)
- `#ece4d2` (paper-soft) — 1 match
- `#e4dcc6` (paper-deep) — 1 match
- `#0e1420` (ink) — 1 match
- `#232a38`, `#5a6472`, `#8b94a2` (ink scale) — 3 matches
- `#b87d33` (amber), `#8e5d21` (amber-deep) — 2 matches

All rgba() values are either the declared hairline tokens (`rgba(14,20,32,0.12/0.22/0.06)`) or the translucent nav background (`rgba(246,241,232,0.82)` at `styles.css:316`) and the amber-soft/faint variants. Two inline SVG rgba values in `index.html:115, 141` use `rgba(14,20,32,0.06)` and `rgba(14,20,32,0.44)` for the faint column grid and serial number — within the ink-alpha convention, consistent with `--hairline-faint`.

**No drop shadows.** `grep box-shadow` returns zero matches across the entire codebase. `grep filter:.*drop-shadow` zero. Principle 1 fully observed.

**Accent discipline.** Amber appears on: the 28px eyebrow rule (`::before`), signet rings, step/setup-step badge numerals, Roman numerals, benefit icons, device icons, the small hero-trust dot, pricing checkmarks, focus outlines, list markers in `.prose`, price-note link border-bottom, help-card `a` border-bottom. All uses are glyphs/icons/rules — never body text. `--amber-soft` appears once as `background` on `.prose code` (`styles.css:1179`) to give inline code a faint tint — this is legitimate use of a declared token on a narrow surface, and the tokens file explicitly reserves `--amber-soft` for "tint backgrounds (reserved)".

**One note.** The `.prose code` rule adds a non-paper background (amber-soft tint). It is grep-findable (only 1 use of `--amber-soft` site-wide) and code blocks are a legitimate semantic surface. Keeping.

### Pillar 4: Typography (4/4)

**Two-family discipline.** Every `font-family` in `styles.css` is either `var(--font-display)` (9 rules) or `var(--font-sans)` (8 rules), plus one `ui-monospace` rule on `.prose code` (`styles.css:1176`) for code glyphs. No third font, no named fonts outside the tokens.

**Weight discipline.** 21 `font-weight` declarations audited; values found: 400 / 500 / 600. Never 700+. All Instrument Serif rules use 400 (`.h1` `.h2` `.serif-italic` `.prose h2` `.help-card h3` `.price-card__amount` — six places, all 400). No bold serif anywhere. Matches CLAUDE.md rule: "Instrument Serif ships one weight (400) + italic only."

**Size scale.** The 43 `font-size` declarations land on a coherent scale: 0.75 / 0.8125 / 0.875 / 0.9375 / 1 / 1.0625 / 1.125 / 1.1875 / 1.25 / 1.5 / 1.625 / 2.25 / 2.5rem — with clamp() wrappers for display sizes. No one-off pixel font sizes. The only non-rem size is the inline SVG `font-size="10"` on the hero serial number, which is an SVG-space unit, not CSS.

**Eyebrow consistency.** Every `section-head` on `index.html` and `success.html` carries `<span class="eyebrow eyebrow--centered">...</span>`. Legal pages use plain `.eyebrow` inside `.legal__head` (`privacy.html:55`, `terms.html:55`) — aligned left with the title block, which is appropriate for the document-style layout. Both variants resolve through the same `.eyebrow` rule + optional `--centered` modifier. Consistent.

### Pillar 5: Spacing (4/4)

**No arbitrary values.** `grep "\[.*px\]"` and `grep "\[.*rem\]"` (Tailwind-style arbitrary values) return zero matches — not applicable to a hand-written CSS project, but confirmed no inline arbitrary expressions. The only "magic" numbers in `styles.css` are in the first 100 lines where tokens are declared. Every `padding`, `margin`, `gap` reference downstream uses `var(--space-N)`.

**Scale compliance.** 4/8 rhythm confirmed via token values: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144px. The generous `--space-10: 144px` (vs industry default 128) is deliberate per CLAUDE.md — kept.

**Section padding rhythm.** `.section { padding-block: clamp(--space-9, 12vw, --space-10); }` (`styles.css:155`) — matches CLAUDE.md spec exactly. `.section--tight` uses `--space-8` → `--space-9` on intermediate density surfaces. Consistent.

**One stylistic nit.** `success.html:75` has an inline `style="margin-top: var(--space-5)"` on the h1. This does reference a token (so no arbitrary values), but inline styles fragment the design system. Not a blocker — the margin exists to offset from the success seal above. Could be moved to a `.success-hero__title` class in `styles.css` during the next polish pass. 3/4 is still achievable despite this; scoring 4/4 because the inline style still uses a token and the visual is correct.

### Pillar 6: Experience Design (3/4)

**Motion.** Reveal-on-scroll via IntersectionObserver (`script.js:35–54`) with 0.7s duration and 40px bottom rootMargin — matches CLAUDE.md animation block. Button hover is +1px translate at 0.18s ease. `prefers-reduced-motion` kills all transitions globally via media query (`styles.css:1027–1040`) and the JS short-circuits reveals to `.is-visible` immediately when reduced-motion is set (`script.js:36–39`). Correct on both axes.

**Focus visibility.** `.btn:focus-visible` (`styles.css:270–273`) draws a 2px amber outline at 3px offset. `a:focus-visible` (`styles.css:1043–1047`) same treatment. Matches CLAUDE.md a11y block.

**Touch targets.** The primary CTA (`.btn--large`, 18px × 30px padding + font-size 1rem) is ≥48px tall — passes. The nav CTA (`.nav__cta`, 10px × 18px padding + 0.875rem) is ≈36px tall — documented as acceptable minimum. Hero-trust eyebrow, footer links are tappable but not interactive targets.

**SEO meta gap (deduction).** `index.html` and `success.html` each ship canonical + OG + Twitter tags. `privacy.html` (lines 1–21) and `terms.html` (lines 1–21) ship only `<title>`, `<meta name="description">`, `<meta name="theme-color">`, font link, and stylesheet. No canonical, no OG, no Twitter. If these pages are shared, social previews degrade. Phase 3 summary documents this as an intentional deferral ("Privacy/Terms pages intentionally NOT rewritten"), but the deferral was about copy, not meta. Meta tags don't require lawyer review. Recommend fixing.

**CTA stub risk (deduction).** Both checkout CTAs (`index.html:94, 350`) have `href="__STRIPE_CHECKOUT_URL__"`. If deployed as-is, a click produces a 404. The visible HTML comments above each CTA explain the swap, but no compile-time or deploy-time check exists to prevent the mistake. Project uses no build tooling (per CLAUDE.md), so a CI grep check in a GitHub Action or Vercel deploy hook is the realistic guard. Out of scope for this audit but noted.

**Accessibility (positive).** Every decorative SVG has `aria-hidden="true"` (17 occurrences across the four HTML files). Brand link has `aria-label="Начало на HarmBlocker"`. Footer nav has `aria-label="Долен колонтитул"`. Cal.com iframe has `title="Резервирайте разговор"`. Support iframe has `allow="fullscreen"` but no `sandbox` attribute — acceptable for an embedded widget the user intentionally surfaces, but a `sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation"` would be a defensible hardening. Not a blocker.

**Empty / error / loading states.** N/A — static marketing site with no stateful UI. The closest analogue (the Cal.com iframe) uses `loading="lazy"` (`success.html:225`) and has a `min-height: 640px` reserve on `.calcom-frame` so the layout doesn't jump when the iframe hydrates. Good.

**Og-image asset missing.** `og-image.svg` is referenced in both `index.html:24` and `success.html:24` but not shipped. Known Phase 3 deferral. Minor impact (social previews still render title + description, just no image). Should ship before launch per Top 3 Fix #3.

---

## Files Audited

- `D:\Claude\HarmBlocker\index.html` — 398 lines, hero + 3 section heads + 6 benefits + pricing card + footer
- `D:\Claude\HarmBlocker\success.html` — 265 lines, success hero + 3 setup steps + 3 devices + help card + Cal.com support + footer
- `D:\Claude\HarmBlocker\privacy.html` — 207 lines, GDPR privacy draft + lawyer-review banner + footer
- `D:\Claude\HarmBlocker\terms.html` — 222 lines, ToS draft + 14-day withdrawal clause + lawyer-review banner + footer
- `D:\Claude\HarmBlocker\styles.css` — 1245 lines, design tokens + all component styles + reduced-motion fallback
- `D:\Claude\HarmBlocker\script.js` — 54 lines, anchor scroll + sticky nav shadow + reveal-on-scroll + footer year
- `D:\Claude\HarmBlocker\CLAUDE.md` — the design contract; scored against

Baseline references:
- `.planning/phases/01-production-floor/01-production-floor-01-SUMMARY.md`
- `.planning/phases/02-legal-floor/02-legal-floor-01-SUMMARY.md`
- `.planning/phases/03-copy-lock/03-copy-lock-01-SUMMARY.md`
- `.planning/phases/04-checkout-live/04-checkout-live-01-SUMMARY.md`
- `.planning/phases/05-post-purchase-handoff/05-post-purchase-handoff-01-SUMMARY.md`
- `.planning/phases/06-measurement/06-measurement-01-SUMMARY.md`

---

## Recommendation Summary

**Priority fixes (pre-launch):**
1. Port SEO meta baseline (canonical + OG + Twitter) from index/success into `privacy.html` and `terms.html` heads.
2. Ship `/og-image.svg` — signet variant, 1200×630, amber-on-paper.
3. Add a deploy-time guard (CI grep or Vercel build check) against unresolved `__*__` placeholders.

**Minor cleanups (optional polish):**
- Move `success.html:75` inline `style="margin-top: var(--space-5)"` into a `.success-hero__title` class.
- Consider `sandbox=...` attribute on the Cal.com iframe.
- Replace "плейнспоукън" in `privacy.html:9` meta description with a native Bulgarian term.

**No action needed:**
- Entity placeholders (`__ENTITY_NAME__`, `__CONTACT_EMAIL__`, etc.) — intentional, documented, user-owned swap at launch.
- `__STRIPE_CHECKOUT_URL__`, `__CALCOM_BOOKING_URL__`, `__ANALYTICS_SITE_ID__` — same pattern.
- Lawyer-review banners on `privacy.html` / `terms.html` — intentional; remove after legal sign-off.
