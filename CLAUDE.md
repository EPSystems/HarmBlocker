# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# HarmBlocker — Project Guide

Static Bulgarian landing page + success page for **HarmBlocker**, a subscription
that blocks adult content and dating apps across a household's devices.
3€ / month. Plain HTML + CSS + vanilla JS. No build tools, no tests, no linter —
ship by uploading the four files to any static host (Netlify/Vercel/Cloudflare
Pages/GitHub Pages).

**One exception to the static-only rule:** `middleware.js` at repo root is a
Vercel Edge Middleware module that guards `/success` — it calls Stripe's REST
API with `STRIPE_SECRET_KEY` to verify the post-purchase session before any
HTML is served. Still no build step, still no npm dependencies (uses the
Edge runtime's built-in `fetch`). If you ever move hosts off Vercel, the gate
moves with you: port the same logic to that host's edge-function equivalent
or fall back to a client-side check. See `DEPLOY.md` §8 for env var setup.

## Files

- `index.html` — landing page (hero, how it works, benefits, emotional, pricing, footer)
- `success.html` — post-purchase setup guide (hero, steps, device instructions); gated by `middleware.js`
- `privacy.html`, `terms.html` — Bulgarian GDPR/ЗЗП legal pages (drafts, `noindex` until lawyer review)
- `styles.css` — design tokens + all component styles
- `script.js` — smooth anchor scroll, sticky-nav shadow, reveal-on-scroll
- `middleware.js` — Vercel Edge Middleware that verifies Stripe Checkout sessions before `/success` is served
- `vercel.json` — security headers + cleanUrls
- `favicon.svg`, `og-image.svg`, `robots.txt`, `sitemap.xml` — SEO + branding assets
- `DEPLOY.md` — Vercel + Hostinger + env-var handoff
- `.env.example` — required environment variables (copy to `.env` locally if needed)
- `README.md` — user-facing repo notes
- `CLAUDE.md` — this file

## Preview locally

```bash
python -m http.server 8080
# then http://localhost:8080
```

---

# Design system — "Quiet Confidence"

Premium privacy-forward. Editorial, restrained, paper-and-ink. The goal is
a design that reads as *serious and discreet*, not "generic SaaS." Sensitive
product (household porn / dating-app blocker) — must never feel cartoonish,
shaming, or cheap.

## Principles

1. **Hairlines, not shadows.** Default to 1px borders at low ink alpha.
   Drop shadows are reserved for exceptional cases — almost never used.
2. **Serif for moments, sans for work.** Instrument Serif carries emotional /
   display weight. Inter carries every body, label, button, and UI task.
3. **One accent.** Amber only. No secondary blue. No success green, no danger
   red (yet — add semantic colors only when a feature demands them).
4. **Confident whitespace.** Section padding is generous (`--space-9` to
   `--space-10`). Do not compress.
5. **Italic fragments for voice.** Use `.serif-italic` to italicize a
   fragment inside a display headline — this is the brand's signature move.
   Don't overuse; 1 italic fragment per headline.
6. **Numbered in Roman.** `I.` / `II.` / `III.` rendered in Instrument Serif
   italic amber. Never use `01` / `02` / `03` — that's generic SaaS.
7. **No pill shapes.** Pills are consumer-SaaS coded. Use `--radius-sm` (6px)
   or `--radius-md` (10px). Small radii.
8. **No tinted-circle icons.** Icons sit bare in amber, stroke 1.5px, aligned
   with text. The old "colored circle around an icon" pattern is banned.
9. **Paper grain is permanent.** A fixed SVG noise layer lives on `body::before`
   at ~35% opacity with `mix-blend-mode: multiply`. Do not remove it — it's
   the atmospheric tell that separates this site from a flat SaaS template.

## Color tokens (`:root`)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f6f1e8` | Primary background — warm cream |
| `--paper-soft` | `#ece4d2` | Surface variant (emotional / setup sections) |
| `--paper-deep` | `#e4dcc6` | Deeper surface (reserved) |
| `--ink` | `#0e1420` | All text, primary CTA background |
| `--ink-soft` | `#232a38` | Softer body, lead paragraphs |
| `--ink-muted` | `#5a6472` | Captions, meta, muted copy |
| `--ink-faint` | `#8b94a2` | Tertiary text (use sparingly) |
| `--hairline` | `rgba(14,20,32,0.12)` | Standard dividers |
| `--hairline-strong` | `rgba(14,20,32,0.22)` | Emphasized borders (pricing card) |
| `--hairline-faint` | `rgba(14,20,32,0.06)` | Column-grid rules in art |
| `--amber` | `#b87d33` | Single accent — icons, checks, dots, eyebrow rule, italic accents |
| `--amber-deep` | `#8e5d21` | Hover / pressed amber |
| `--amber-soft` | `rgba(184,125,51,0.12)` | Tint backgrounds (reserved) |

**Contrast notes (WCAG AA):**
- `--ink` on `--paper`: ~17:1 ✓
- `--ink-muted` on `--paper`: ~6.2:1 ✓
- **Amber is NOT for body text.** Amber on paper hits ~3:1 — adequate for UI
  glyphs / icons / the small underline on links, but never for paragraphs.

## Typography

**Load order (both pages):**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
```

| Token | Stack |
|---|---|
| `--font-display` | `"Instrument Serif", "Fraunces", Georgia, serif` |
| `--font-sans` | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", ...` |

**Usage rules:**
- `h1` / `h2` — always `--font-display` at weight 400. Never bold the serif.
- `h3` / body / buttons / labels — always `--font-sans`.
- Roman numerals (`I.` `II.` `III.`), the ordered-list numbers in `.device ol`,
  the setup step badges, and `<span class="serif-italic">` — `--font-display`
  **italic** in amber.
- Eyebrow labels — Inter 500, uppercase, 12px, letter-spacing `0.14em`, with
  a 28px amber `::before` rule.
- Instrument Serif ships one weight (400) + italic only. Do not ask for 500
  or bold from it — it won't exist.

**Type scale:**
| Style | Size | Font | Notes |
|---|---|---|---|
| `.h1` | `clamp(2.6rem, 6.4vw, 5rem)` | Serif 400 | `letter-spacing: -0.018em`, `line-height: 1.02`, `max-width: 14ch` on hero |
| `.h2` | `clamp(2rem, 4.4vw, 3.25rem)` | Serif 400 | `line-height: 1.08` |
| `.h3` | `1.0625rem` | Sans 600 | Editorial label feel |
| `.lead` | `clamp(1.0625rem, 1.6vw, 1.1875rem)` | Sans 400 | `color: --ink-muted` |
| body | `1.0625rem / 1.65` | Sans 400 | `color: --ink` |
| `.eyebrow` | `0.75rem` | Sans 500 | Uppercase, tracking `0.14em`, amber rule |

## Spacing & layout

- 4/8 scale via `--space-1` through `--space-10`.
- `--max-w: 1120px` for layout, `--max-w-prose: 640px` for copy blocks.
- Section padding uses `clamp(--space-9, 12vw, --space-10)` — generous.
- `--space-10 = 144px` (larger than default 128 — deliberate, for confidence).

## Signet motif (brand mark)

Six concentric rings of increasing opacity + a small solid center + two
horizon lines. Rendered in amber. Appears:

1. **Nav brand** — compact 28×28 SVG with 3 rings.
2. **Hero art** — full-size 420×420 with 6 rings + faint column grid +
   editorial serial number "№ 001 ⁄ HB" top right.
3. **Emotional section mark** — 56×56, 3 rings.
4. **Success page seal** — 96×96, 4 rings + center checkmark.

**Rules:**
- Stroke width 1 to 1.25. Never heavier.
- Use `currentColor` and set the wrapper color to `var(--amber)` —
  do not hardcode the color inside the SVG.
- The motif is the brand. Don't invent alternative illustrations.
  If a new page needs an icon moment, render another signet variant.

## Components

### Buttons

| Class | Background | Border | Use |
|---|---|---|---|
| `.btn.btn--primary` | `--ink` | `--ink` | All primary CTAs |
| `.btn.btn--ghost` | transparent | `--hairline-strong` | Secondary (rare) |
| `.btn.btn--large` | — | — | Modifier for larger padding/font |

Primary CTAs get `<svg class="btn__arrow">`. The arrow renders in amber and
translates +2px on hover. Don't change the arrow color or remove it from
primary CTAs.

### Eyebrow label

```html
<span class="eyebrow eyebrow--centered">Настройка</span>
```

The 28px amber rule is drawn by `::before`. `--centered` centers it inside
a centered section head. Every `section-head` should have one — they're
the editorial spine of the page.

### Serif italic fragment

```html
<h2 class="h2">Две минути <span class="serif-italic">от начало до край.</span></h2>
```

Wrap the *emotional / adjective* part of the headline in italic. This is
the brand's signature voice device. Use once per headline, never more.

### Steps / setup-steps

Editorial 3-column layout separated by hairlines. Roman numeral in serif
italic amber. No card backgrounds. Do not reintroduce the old card-with-shadow
pattern.

### Benefits

Two-column editorial list. Each row is icon + title + description, separated
by a 1px hairline. **Do not turn this back into a 3-column card grid.** The
hairline list is the intentional differentiator vs. generic SaaS.

### Pricing card

The *only* place a card still exists. Styled with:
- `border: 1px solid --hairline-strong`
- **No shadow**. Do not add one.
- **No gradient top bar**. Do not add one.
- Amount in Instrument Serif at `clamp(3.5rem, 7vw, 4.75rem)`.
- Features use 16×16 amber checkmarks, stroke 1.8.

## Animation

- `.reveal` — `translateY(12px)` + `opacity: 0` → animates on scroll via
  `IntersectionObserver` in `script.js`. Duration 0.7s ease.
- Button hover: `translateY(-1px)` + 22ms background swap. Keep it subtle.
- All animation respects `prefers-reduced-motion`.
- No bouncing, no springy, no decorative motion. Motion carries meaning only.

## Accessibility

- Focus visible: 2px amber outline, 3px offset (`--amber` on `--paper`
  meets 3:1 against the background for non-text UI — acceptable for focus
  indicators).
- All interactive elements have accessible labels; decorative SVGs carry
  `aria-hidden="true"`.
- Touch targets ≥ 44px. The nav CTA is 36px tall at its smallest — if
  redesigning nav, bump padding before tightening.
- `prefers-reduced-motion` kills all transitions/animations globally in CSS.

---

# Editing guide for Claude

When making design changes:

- **Stay in the palette.** Do not introduce new colors. If you need a new
  semantic role (error, warning), propose it and wait for approval — don't
  just pick a red.
- **Stay in the type system.** Only Instrument Serif and Inter. No third font.
- **Stay with the signet.** Every illustration moment is a variant of the
  concentric-rings motif. Do not introduce shields, houses, locks, checkmarks
  in circles, or other stock metaphors. The old `index.html` had a
  shield-containing-house illustration — it's been removed deliberately.
- **Stay editorial.** Before adding a card with a shadow and a tinted-icon
  background, ask: "can this be a hairline-separated row with a bare amber
  icon instead?" Almost always yes.
- **Bulgarian-first copy.** All user-facing text is in Bulgarian. When
  adding or editing copy, match the existing tone: calm, plainspoken, never
  shaming, never alarmist. The brand voice is "тих" (quiet) — reinforce it.
- **No emoji icons.** Always SVG. Stroke 1.5 for content icons, 1.25 for
  the signet rings, 1.8 for the pricing checkmarks.

## CTA wiring (for real checkout)

Two `<a>` tags in `index.html` carry `data-cta="hero"` and `data-cta="pricing"`.
Both link to `success.html` as a demo. To wire a real Stripe / Paddle /
Lemon Squeezy checkout:

1. Replace `href="success.html"` on both CTAs with the checkout URL.
2. Point the checkout provider's success redirect back to `success.html`.

Nothing else to change — there's no state, no auth, no backend here.

<!-- GSD:project-start source:PROJECT.md -->
## Project

**HarmBlocker**

HarmBlocker е абонамент за 3€/месец, който блокира порнография и dating приложения
на всички устройства в домакинството. Продуктът е насочен към българския пазар —
семейства, двойки и общности, които искат тих, нестигматизиращ инструмент за
защита на дома. Този repo е маркетинговият сайт + post-purchase setup flow;
самият блокиращ механизъм (DNS service / app / extension) е отделен продукт
извън обхвата на това хранилище.

**Core Value:** A Bulgarian customer can land on the site, understand the product in under 30
seconds, pay with a card, and reach a setup flow that actually gets the blocker
running on their household devices — without ever feeling shamed, judged, or
marketed-at.

### Constraints

- **Tech stack:** Static HTML/CSS/JS only. No frameworks, no build step. Stripe Checkout is a redirect, not a SDK integration. Why: matches team size, keeps hosting trivial, zero maintenance burden.
- **Language:** All user-facing copy in Bulgarian. No i18n system needed. Why: explicit market focus; i18n adds friction without upside at this stage.
- **Design system:** Locked to "Quiet Confidence" as documented in `CLAUDE.md` — no new fonts, no new colors, no shadows, no pill shapes, no tinted-circle icons, no third illustration. Why: the brand differentiation depends on restraint.
- **Privacy:** Privacy-first posture is non-negotiable. No third-party trackers beyond Stripe + chosen cookieless analytics. Why: product is about trust and discretion; GA4 contradicts the brand promise.
- **Legal floor:** Before first real charge, v1 must ship with Privacy Policy, Terms of Service (with 14-day withdrawal clause), and a cookie banner if the analytics choice requires one. Why: EU/BG consumer-protection + GDPR compliance.
- **Budget:** Small-team bootstrap. Favor free/low-cost tooling (Stripe standard fees; Plausible/Umami self-host or cheap tier; Cal.com free tier; Cloudflare Pages/Netlify free tier). Why: pre-revenue.
- **Timeline:** Flexible — quality over speed. Why: no funding clock or external deadline; the wrong launch would hurt the brand more than a slow launch.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
