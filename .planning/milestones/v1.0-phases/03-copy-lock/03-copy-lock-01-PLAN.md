---
plan: 03-copy-lock-01
phase: 03-copy-lock
wave: 1
depends_on: []
requirements: [INFR-03, INFR-04, POST-02]
files_modified: [index.html, success.html, robots.txt, sitemap.xml, favicon.svg]
autonomous: true
---

# Plan 03-copy-lock-01: Editorial copy pass + SEO baseline

## Objective

Turn every user-facing word on `index.html` and `success.html` into final,
launch-ready brand-voice copy in Bulgarian ("тих", calm, non-shaming,
plainspoken — no SaaS-speak). Rewrite `success.html` setup steps to reflect
the real DIY delivery flow (customer gets a setup guide, configures their
own router/device DNS). Ship the SEO baseline: unique titles, meta
descriptions, OpenGraph + Twitter-card tags, canonical URLs, favicon SVG,
`robots.txt`, `sitemap.xml`.

## Context

@.planning/phases/03-copy-lock/03-CONTEXT.md
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@CLAUDE.md
@index.html
@success.html

## Must-haves (from Phase 3 success criteria)

1. A read-through of `index.html` finds no placeholder, first-draft, or
   off-voice language — calm, plainspoken, non-shaming, "Quiet Confidence."
2. `success.html` step-by-step copy reflects the real DIY delivery model
   (setup guide, DNS configuration, optional support call coming later),
   not demo placeholder text.
3. Each page has meaningful `<title>`, meta description, OG/Twitter-card
   tags, canonical link, and a favicon served from `/favicon.svg`.
4. `robots.txt` and `sitemap.xml` exist at root with canonical URLs for
   `/`, `/success`, `/privacy`, `/terms` on `harmblocker.bg`.

## Brand voice checklist (enforced during rewrite)

- Bulgarian only, no English fragments in user-facing copy.
- One `serif-italic` fragment per headline, not more.
- Roman numerals for ordered steps (I./II./III.) — never 01/02/03.
- No SaaS buzzwords ("seamless", "powerful", "революционен", etc.).
- Active voice preferred; concrete nouns over abstract ones.
- Amber is for rules/icons/accents only — never body text.
- Don't rewrite what's already on-voice. Light touch only.

## Tasks

<task id="1" type="auto">
<name>Copy audit of index.html</name>

<read_first>
- index.html (full file)
- CLAUDE.md §"Editing guide for Claude" and §"Principles"
- .planning/PROJECT.md §"Brand voice"
</read_first>

<action>
Read `index.html` top-to-bottom. The bulk is already on-voice per
CLAUDE.md — expect LIGHT touch-ups, not a rewrite. Specifically:

1. Verify hero headline + sub read as calm and confident. Keep the
   existing headline "По-тих интернет, *за вашия дом.*" — on-voice.
2. Pricing section "Можете да откажете по всяко време от акаунта си."
   mentions "от акаунта си" but v1 has no account — customer manages the
   subscription from Stripe's customer portal (standard for Stripe
   subscriptions). Rewrite to something like "Отказ по всяко време, без
   обяснения." which is accurate and tighter.
3. "Регистрирайте се за секунди" in how-it-works step I. implies an
   account. There is no account in v1 — customer just pays and gets a
   setup guide emailed. Rewrite step I. to reflect the actual flow:
   headline "Платете с карта за секунди" + description about receiving
   the setup guide by email.
4. "Следвайте прост наръчник" step II. — OK. Light tighten.
5. "Насладете се на тишината" step III. — on-voice. Keep as-is.
6. Benefits card "Лесен наръчник след покупката" in pricing features —
   on-voice. Keep.
7. Scan for any English fragments, SaaS-speak, or off-voice lines.
   Nothing else expected.

Do NOT touch nav, footer, legal links, or the signet/SVG markup — those
were locked in Phase 2 and the design system doc.
</action>

<acceptance_criteria>
- grep "Регистрирайте се" index.html → 0 matches (rewritten to payment-first step)
- grep "от акаунта си" index.html → 0 matches (rewritten)
- grep "По-тих интернет" index.html → at least 1 match (hero headline preserved)
- grep "serif-italic" index.html → existing italic fragments preserved (5+ matches)
- No English words in user-facing copy (inspection)
</acceptance_criteria>
</task>

<task id="2" type="auto">
<name>Copy rewrite on success.html (DIY flow)</name>

<read_first>
- success.html (full file)
- CLAUDE.md §"Components" (setup-steps + devices)
- .planning/PROJECT.md §"Delivery model"
</read_first>

<action>
Rewrite the three setup steps on `success.html` to describe the ACTUAL
DIY flow:

- The customer receives a setup guide by email (`.pdf` link or inline
  HTML — implementation detail for later; copy just says "in the email").
- The guide contains two DNS addresses (IPv4 + IPv6) to enter either
  on the home router (preferred — covers every device at once) or on
  each individual device.
- Once DNS is set, the blocklist is active immediately; no reboot
  needed. A support call can be booked if stuck (Cal.com embed comes
  in Phase 5 — copy teases it gently, doesn't promise it).

New step copy (Bulgarian, тих):

- **I. Отворете имейла с наръчника.** — "Изпратихме ви наръчник за
  настройка на адреса, с който платихте. Съдържа два DNS адреса и
  прости стъпки за домашен рутер или отделно устройство."
- **II. Настройте вашия рутер (или устройство).** — "Най-тихият начин е
  да въведете DNS адресите в настройките на домашния си рутер — тогава
  всички устройства вкъщи са покрити с едно движение. Ако предпочитате,
  може да го направите и само на отделно устройство."
- **III. Готово. Защитата е активна.** — "Промяната действа веднага —
  без рестарт, без инсталация. Ако нещо не тръгне, отговорете на имейла
  и ще помогнем."

Also rewrite the per-device mini-lists below to reflect "въведете двата
DNS адреса от имейла" rather than "поставете настройките за защита от
имейла" (which was vague). Keep the same structure and numbering.

Update the hero lead paragraph from "Отнема по-малко от две минути" to
match the tone — it's fine as-is, but tighten to "Отнема няколко минути
и се прави веднъж." (accurate — router config takes a couple of minutes
once).

Keep the help-card section at the bottom but rewrite slightly:
- Heading: "Нужна е помощ? Ще седнем заедно." — warmer, less chatbot.
- Body: "Отговаряме на всеки имейл лично, обикновено в рамките на
  няколко часа. Без технически език, без скриптове."
- Keep the `support@harmblocker.example` mailto but update to
  `support@harmblocker.bg` to match the canonical domain.

Do NOT change the setup-step structure, the Roman numerals, or the
device-card layout. Editorial bones stay.
</action>

<acceptance_criteria>
- grep "DNS" success.html → at least 2 matches (real flow mentioned)
- grep "рутер" success.html → at least 2 matches (router-first framing)
- grep "поставете настройките за защита" success.html → 0 matches (old vague copy gone)
- grep "support@harmblocker.bg" success.html → 1 match (canonical domain)
- grep "support@harmblocker.example" success.html → 0 matches (old placeholder gone)
- grep "setup-step__badge" success.html → 3 matches (structure preserved)
</acceptance_criteria>
</task>

<task id="3" type="auto">
<name>SEO baseline — meta tags on both pages</name>

<read_first>
- index.html (current head section)
- success.html (current head section)
- .planning/phases/03-copy-lock/03-CONTEXT.md §"SEO Baseline (per page)"
</read_first>

<action>
Add a complete SEO head-block to both `index.html` and `success.html`.
Keep existing `<title>` and `<meta description>` if already good —
they are both reasonable. Augment with:

Common (both pages):
- `<link rel="canonical" href="https://harmblocker.bg{path}" />` —
  `/` for index, `/success` for success.
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
- OpenGraph: `og:type=website`, `og:locale=bg_BG`,
  `og:site_name=HarmBlocker`, `og:title`, `og:description`, `og:url`,
  `og:image=https://harmblocker.bg/og-image.svg`
- Twitter: `<meta name="twitter:card" content="summary_large_image">`
  (OG tags carry the title/description/image — no duplicates needed).

Per-page titles (keep or tighten):
- `index.html` → "HarmBlocker — По-тих интернет за вашия дом" (existing, keep)
- `success.html` → "Всичко е готово — HarmBlocker" (existing, keep)

Per-page descriptions (tighten if needed, 140-160 chars target):
- `index.html` — existing description is 149 chars, on-voice. Keep.
- `success.html` — tighten current description so the OG preview
  reads as a post-purchase confirmation, not an ad: "Благодарим за
  доверието. В имейла ще намерите наръчника и двата DNS адреса за
  настройка на вашия рутер или устройство." (~140 chars)

Do NOT create `og-image.svg` in this task — reference the URL only;
the raster fallback is explicitly deferred per CONTEXT.md §"Deferred".
Add an HTML comment near the `og:image` tag noting that
`og-image.svg` is a deliverable for a later polish pass (so that a
future agent/developer knows to ship one).
</action>

<acceptance_criteria>
- grep "rel=\"canonical\"" index.html success.html → 2 matches (one per file)
- grep "og:locale" index.html success.html → 2 matches
- grep "twitter:card" index.html success.html → 2 matches
- grep "harmblocker.bg" index.html success.html → at least 4 matches across both
- grep "rel=\"icon\"" index.html success.html → 2 matches
- Both files still have valid HTML (no unclosed tags)
</acceptance_criteria>
</task>

<task id="4" type="auto">
<name>Favicon — /favicon.svg signet variant</name>

<read_first>
- CLAUDE.md §"Signet motif" (stroke widths, color rules)
</read_first>

<action>
Create `D:\Claude\HarmBlocker\favicon.svg` as a compact 3-ring signet
variant. Rules from CLAUDE.md:

- `viewBox="0 0 24 24"` — browser tab scale
- 3 concentric amber rings, stroke-width 1.25, stroke color `#b87d33`
- Small solid amber center dot
- Paper-cream background rect (`#f6f1e8`) so the icon doesn't
  disappear on dark browser UI
- Uses direct hex colors (not `currentColor`) — favicons render
  outside the page's CSS context
- No `xmlns` prefix issues — include `xmlns="http://www.w3.org/2000/svg"`
- Ring radii: outer ~10.5, middle ~7, inner ~3.5; center dot r=1.5
  (scaled to 24×24)

The final SVG must be valid standalone (openable in a browser directly)
and render as an amber target/signet mark on a cream background.
</action>

<acceptance_criteria>
- ls favicon.svg → file exists at repo root
- grep "#b87d33" favicon.svg → at least 1 match (amber stroke/fill)
- grep "#f6f1e8" favicon.svg → 1 match (paper background)
- grep "circle" favicon.svg → at least 3 matches (three rings) + possibly 1 for center dot
- grep "stroke-width=\"1.25\"" favicon.svg → at least 1 match
</acceptance_criteria>
</task>

<task id="5" type="auto">
<name>robots.txt + sitemap.xml at root</name>

<read_first>
- .planning/phases/03-copy-lock/03-CONTEXT.md §"Site-Wide Files"
</read_first>

<action>
Create two files at repo root:

1. `D:\Claude\HarmBlocker\robots.txt` — allow all crawlers, reference
   sitemap:
   ```
   User-agent: *
   Allow: /

   Sitemap: https://harmblocker.bg/sitemap.xml
   ```
   (trailing newline)

2. `D:\Claude\HarmBlocker\sitemap.xml` — valid XML 1.0 sitemap with
   4 URLs:
   - `https://harmblocker.bg/` (priority 1.0)
   - `https://harmblocker.bg/success` (priority 0.5)
   - `https://harmblocker.bg/privacy` (priority 0.3)
   - `https://harmblocker.bg/terms` (priority 0.3)

   All with `<lastmod>2026-04-23</lastmod>` and
   `<changefreq>monthly</changefreq>`. Use the standard sitemaps.org
   schema: `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`.

The static host (Vercel, per Phase 1) serves files from repo root with
`cleanUrls: true` — so `/success` resolves to `success.html`,
`/privacy` to `privacy.html`, `/terms` to `terms.html`, matching the
sitemap's canonical URLs.
</action>

<acceptance_criteria>
- ls robots.txt → file exists at repo root
- ls sitemap.xml → file exists at repo root
- grep "Sitemap: https://harmblocker.bg/sitemap.xml" robots.txt → 1 match
- grep "harmblocker.bg" sitemap.xml → at least 4 matches (one per URL)
- grep "2026-04-23" sitemap.xml → at least 4 matches (lastmod per URL)
- grep "sitemaps.org/schemas/sitemap/0.9" sitemap.xml → 1 match (valid schema)
</acceptance_criteria>
</task>

## Verification (overall)

- Read `index.html` end-to-end: tone is calm/plainspoken, no SaaS-speak,
  every user-facing line in Bulgarian, one italic fragment per headline.
- Read `success.html` end-to-end: setup steps describe real DNS/router
  flow, not vague "settings from email"; support email uses canonical
  `harmblocker.bg` domain.
- Open both pages in the browser locally — favicon appears in tab,
  no console errors, layout unchanged.
- `robots.txt` + `sitemap.xml` validate with an online sitemap linter
  (manual, out of scope for this run — but structure matches spec).

## Success criteria

- [ ] INFR-04 satisfied — `index.html` copy audit complete, no
  placeholder language remains
- [ ] POST-02 satisfied — `success.html` setup copy reflects real DIY
  delivery model
- [ ] INFR-03 satisfied — SEO baseline (title, description, OG/Twitter,
  canonical, favicon, robots.txt, sitemap.xml) shipped

## Output

- Modified: `index.html`, `success.html`
- Created: `favicon.svg`, `robots.txt`, `sitemap.xml`
- Summary: `.planning/phases/03-copy-lock/03-copy-lock-01-SUMMARY.md`
