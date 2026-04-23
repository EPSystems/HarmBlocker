# Phase 3: Copy lock - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

Every word the visitor reads on `index.html` and `success.html` is final brand-voice copy, and the site carries the SEO metadata a real launch needs. This phase is about polish and public-facing completeness — existing copy stays if it's already on-voice; placeholder/first-draft language gets rewritten; every page gets proper `<title>`, meta description, OpenGraph, favicon, plus `robots.txt` + `sitemap.xml` at root.

</domain>

<decisions>
## Implementation Decisions

### Copy Audit Scope
- Two pages to audit: `index.html` and `success.html`
- Legal pages (`privacy.html`, `terms.html`) are drafts — out of scope for brand-voice polish in this phase (lawyer review comes later)
- Copy changes limited to user-facing text (nav, headlines, body, CTAs, footer microcopy)
- The success-page setup instructions must reflect the REAL DIY delivery model — the customer gets a setup guide, not a shipped device; they configure their own router/device DNS; they can book a support call (to be added in Phase 5)

### Brand Voice Checklist (applied during rewrite)
- Bulgarian only, no English fragments
- Calm, plainspoken, non-shaming, non-alarmist
- One serif-italic fragment per headline (don't overuse)
- Roman numerals for ordered lists, not 01/02/03
- No generic SaaS language ("seamless", "powerful", "revolutionary", etc.)
- Active voice preferred over passive

### SEO Baseline (per page)
- `<title>` — unique, descriptive, Bulgarian, ≤60 chars
- `<meta name="description">` — 140–160 chars, Bulgarian
- `<meta property="og:title">`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale` (bg_BG)
- `<meta name="twitter:card" content="summary_large_image">` (same og: content carries over)
- Favicon: inline SVG signet in `/favicon.svg`, plus a `/favicon.ico` fallback (32×32)
- Canonical URL pointing to `https://harmblocker.bg/{page}`

### Site-Wide Files
- `robots.txt` at root — allow all, sitemap reference
- `sitemap.xml` at root — lists `/`, `/success`, `/privacy`, `/terms` as canonical URLs (using `harmblocker.bg` domain)
- OG image: a 1200×630 image using the signet + wordmark; deliverable is `og-image.svg` (SVG scales; for platforms that require raster, a fallback PNG can be added post-launch or via an online converter — not in scope here)

### Claude's Discretion
- Exact new copy for any placeholder/first-draft language — match brand voice
- Meta description wording (within 140–160 char constraint)
- SVG favicon design (variant of the signet)
- Which specific lines of existing copy need revision (if any — some may already be on-voice)

</decisions>

<code_context>
## Existing Code Insights

- `index.html` — 17.5KB, sections: hero, how-it-works, benefits, emotional, pricing, footer; nav + footer already updated in Phase 2
- `success.html` — smaller, sections: hero (amber seal), setup steps, device-specific instructions
- Both pages already load Google Fonts (Inter + Instrument Serif)
- Current copy is largely on-voice per CLAUDE.md design system description — expect LIGHT rewrites, not full overhauls
- `<title>` on both pages currently reads minimally — needs upgrade
- No existing meta description, OG tags, or favicon

</code_context>

<specifics>
## Specific Ideas

- Success page step copy likely needs the most work — CLAUDE.md notes it as "post-purchase setup guide"; verify it reads as the real DIY flow, not demo placeholder.
- The emotional section on `index.html` is brand-signature — preserve its tone; only adjust if copy reads off.
- Use `harmblocker.bg` as canonical domain in all URLs.
- Favicon SVG: 3 concentric rings (compact variant from CLAUDE.md signet catalog), amber on paper.

</specifics>

<deferred>
## Deferred Ideas

- PNG variants of OG image — can be generated later; SVG covers most platforms in 2026
- Multi-language hreflang tags — Bulgarian-only per project scope
- Structured data / JSON-LD (Organization, Product) — nice to have post-launch; not required for launch-ready
- Per-page canonical variants for www vs apex — Vercel/Hostinger handle this via redirect
- Copy rewrites on `privacy.html` / `terms.html` — drafts stay as-is until lawyer review

</deferred>
