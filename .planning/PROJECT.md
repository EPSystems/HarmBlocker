# HarmBlocker

## What This Is

HarmBlocker е абонамент за 3€/месец, който блокира порнография и dating приложения
на всички устройства в домакинството. Продуктът е насочен към българския пазар —
семейства, двойки и общности, които искат тих, нестигматизиращ инструмент за
защита на дома. Този repo е маркетинговият сайт + post-purchase setup flow;
самият блокиращ механизъм (DNS service / app / extension) е отделен продукт
извън обхвата на това хранилище.

## Core Value

A Bulgarian customer can land on the site, understand the product in under 30
seconds, pay with a card, and reach a setup flow that actually gets the blocker
running on their household devices — without ever feeling shamed, judged, or
marketed-at.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Landing page with hero, how-it-works, benefits, pricing, footer — existing (pre-GSD)
- ✓ Post-purchase success page with setup guide and device instructions — existing (pre-GSD)
- ✓ "Quiet Confidence" design system — Instrument Serif + Inter, amber single-accent, paper/ink palette, hairline-not-shadows, signet motif — existing (pre-GSD)
- ✓ Bulgarian-first copy throughout, calm/non-shaming tone — existing (pre-GSD)
- ✓ Static deploy (no build tools, works on any static host) — existing (pre-GSD)

### Active

<!-- Current scope. Milestone 1: Launch-Ready. -->

- [ ] Stripe Checkout wired on both CTAs (data-cta="hero", data-cta="pricing"), EUR 3/mo subscription
- [ ] Stripe success-redirect configured to return to `success.html` with session validation
- [ ] Privacy Policy page (GDPR-compliant, Bulgarian) linked from footer + checkout
- [ ] Terms of Service page (Bulgarian) linked from footer + checkout, includes 14-day right-of-withdrawal clause
- [ ] 14-day withdrawal disclosure surfaced in checkout confirmation and on success page
- [ ] Cookie consent banner (only if analytics requires it — spec says no, keep as safety net)
- [ ] Privacy-first analytics installed (Plausible / Umami / Fathom — choose during phase)
- [ ] Cal.com / Calendly booking embed on `success.html` for support-meeting requests
- [ ] Real copy pass on `success.html` — current setup instructions are placeholder-ish; must reflect actual DIY delivery flow
- [ ] Domain + production hosting decision (static host — Netlify / Vercel / Cloudflare Pages)
- [ ] Footer hardened with company details required for EU B2C commerce (company name, address if registered entity, contact)
- [ ] SEO baseline: title, description, OpenGraph, favicon, sitemap.xml, robots.txt
- [ ] Copy audit of `index.html` for any placeholder/first-draft language before money changes hands
- [ ] Retroactive UI review of shipped landing + success pages (triggers `/gsd:ui-review`)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Local Bulgarian payment methods (Borica, EasyPay, Revolut Pay) — deferred to post-launch; Stripe cards cover enough of the market to validate demand
- VAT-invoice automation (фактура) — deferred; will add when volume justifies accounting overhead or if early customers request it
- GA4 / Meta Pixel / ad-network trackers — rejected; privacy-first posture is a brand commitment, not just compliance
- Free trial / first-month-free — rejected; 3€ is already low-friction, discounts cheapen the brand
- Annual pricing / discount tier — deferred; keep one price, one decision
- The blocker product itself (DNS service / app / browser extension) — separate product, separate repo, separate milestone
- Churn / retention / analytics dashboards — irrelevant pre-launch
- Localization beyond Bulgarian — deferred; Bulgarian-first is explicit positioning
- Account system / login on the marketing site — not needed; Stripe manages subscriptions, Cal.com handles support

## Context

**Team:** Small team / co-founders. Solo implementation attention on the site;
multiple stakeholders on product strategy.

**Stage:** Pre-launch, design/copy stage. No paying customers yet. Site exists
as a prototype that needs to be hardened into a commerce surface.

**Market:** Bulgaria. GDPR + EU consumer law apply. Bulgarian consumers expect
some local payment options long-term, but Stripe-only is acceptable for v1.
Religious / family / church-community framing is *available* as a distribution
angle but is not a required feature of v1 copy.

**Brand voice:** "Quiet Confidence." Calm, plainspoken, never shaming, never
alarmist. Tone word: "тих." This is load-bearing — if copy drifts to
fear-mongering or SaaS marketing-speak, the brand breaks.

**Design system:** Documented extensively in `CLAUDE.md`. Instrument Serif
(display, 400 + italic only) + Inter (UI). Amber (#b87d33) as the single
accent. Paper/ink palette. Hairlines, not shadows. Signet motif (concentric
rings) is the *only* illustration vocabulary — no new icons, illustrations,
or metaphors without updating CLAUDE.md first.

**Tech baseline:** Plain HTML + CSS + vanilla JS. No build tools. No framework.
No backend. Static deploy target. This is deliberate and should be preserved
unless a requirement genuinely forces otherwise (Stripe Checkout does not —
it's a redirect). Privacy-first analytics (Plausible/Umami/Fathom) does not
force a backend.

**Delivery model:** Customer pays → lands on `success.html` → follows DIY
setup guide → can optionally book a support call via Cal.com if stuck. The
actual blocker is consumed by the customer configuring their own router /
device DNS per the guide. No account, no provisioning, no fulfillment.

## Constraints

- **Tech stack:** Static HTML/CSS/JS only. No frameworks, no build step. Stripe Checkout is a redirect, not a SDK integration. Why: matches team size, keeps hosting trivial, zero maintenance burden.
- **Language:** All user-facing copy in Bulgarian. No i18n system needed. Why: explicit market focus; i18n adds friction without upside at this stage.
- **Design system:** Locked to "Quiet Confidence" as documented in `CLAUDE.md` — no new fonts, no new colors, no shadows, no pill shapes, no tinted-circle icons, no third illustration. Why: the brand differentiation depends on restraint.
- **Privacy:** Privacy-first posture is non-negotiable. No third-party trackers beyond Stripe + chosen cookieless analytics. Why: product is about trust and discretion; GA4 contradicts the brand promise.
- **Legal floor:** Before first real charge, v1 must ship with Privacy Policy, Terms of Service (with 14-day withdrawal clause), and a cookie banner if the analytics choice requires one. Why: EU/BG consumer-protection + GDPR compliance.
- **Budget:** Small-team bootstrap. Favor free/low-cost tooling (Stripe standard fees; Plausible/Umami self-host or cheap tier; Cal.com free tier; Cloudflare Pages/Netlify free tier). Why: pre-revenue.
- **Timeline:** Flexible — quality over speed. Why: no funding clock or external deadline; the wrong launch would hurt the brand more than a slow launch.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hosting: Vercel | User-provisioned; auto-deploy from main; zero-config for static sites | — Pending |
| Domain: Hostinger | User-provisioned; DNS points at Vercel via CNAME/A records | — Pending |
| Marketing site stays static HTML/CSS/JS | Matches team size, keeps hosting trivial, no surface area to maintain | — Pending |
| Stripe-only checkout for v1 (cards in EUR) | Fastest path to taking money; BG card acceptance is adequate for validation | — Pending |
| Local BG payment methods (Borica/EasyPay) deferred to post-launch | One provider at a time; add when volume justifies complexity | — Pending |
| Privacy-first cookieless analytics (Plausible/Umami/Fathom) | Brand promise of discretion > richer data; avoids cookie-banner UX tax | — Pending |
| Cal.com / Calendly embed for support meetings | DIY setup needs a human-escape hatch; scheduling widget is lowest-friction option | — Pending |
| 3€/mo single price, no trial, no annual tier | Simplicity; discounts would cheapen brand; one decision for customer | — Pending |
| 14-day right-of-withdrawal: full disclosure + ToS clause | EU distance-selling law; also reinforces brand trust to be explicit about it | — Pending |
| Blocker tech treated as separate product | This repo stays scoped; avoids coupling marketing cadence to product-engineering cadence | — Pending |
| Bulgarian-only copy for v1 | Market focus; i18n would dilute without upside | — Pending |

## Milestone Execution Directive (v1.0 Launch-Ready)

**Placeholder strategy for third-party integrations.** This milestone is being
executed autonomously on a timeline that doesn't block on external vendor
onboarding. Where a requirement depends on credentials, IDs, or booking links
the user will provision later, **use clearly-marked placeholders rather than
blocking the phase**. The user will swap them for real values before launch.

Specifically:

- **Stripe checkout URLs** — replace the hero and pricing CTA `href` values with
  `__STRIPE_CHECKOUT_URL__` (or an env-var reference) plus a code comment
  noting how to swap in the real Stripe Checkout session URL. Write the
  redirect/cancel wiring assuming the real URL is set; do not create a Stripe
  account.
- **Cal.com booking link** — embed against a placeholder URL
  (`__CALCOM_BOOKING_URL__`) with a visible code comment. Use an `<iframe>` or
  the official Cal.com embed snippet with the URL factored out.
- **Privacy-first analytics site ID** — install the chosen vendor's script tag
  with a placeholder `data-domain` / site-ID value (`__ANALYTICS_SITE_ID__`)
  and a comment noting exactly what to replace.
- **Legal pages (Privacy Policy, Terms of Service)** — draft full Bulgarian
  templates that are technically correct (GDPR, 14-day withdrawal clause,
  entity placeholders). Prefix each legal page with a prominent
  `<!-- LAWYER REVIEW REQUIRED BEFORE LAUNCH -->` HTML comment and a visible
  in-page note stating the text must be reviewed by a Bulgarian lawyer before
  going live. Use `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__`
  as entity placeholders.
- **Domain in metadata / sitemap / OG tags** — use `harmblocker.bg` as the
  canonical domain pending confirmation of the exact Hostinger registration.

**Deliverables the autonomous run should produce:**

- A `vercel.json` in repo root if Vercel's zero-config defaults are insufficient
  (security headers, redirects, clean-URLs). Keep it minimal.
- All phase work committed with real code where possible, placeholders where
  not, and no "skip this" decisions.

**Out of scope for this run:**

- Creating accounts with any vendor (Stripe, Cal.com, Plausible, Vercel,
  Hostinger) — all user-owned.
- Writing DNS records or touching hosting dashboards — user action.
- Claiming legal text is lawyer-reviewed — it is not; the warning comments
  make this explicit.

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-23 after initialization*
