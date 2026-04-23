# Roadmap: HarmBlocker

## Overview

The landing page and success page already exist as a prototype. The Launch-Ready
milestone turns that prototype into a commerce surface that can take real money
from Bulgarian consumers without legal or brand risk. The path is: stand up the
physical hosting floor, ship the legal floor underneath it, lock every word of
copy in the brand voice, then wire Stripe, finish the post-purchase handoff,
install privacy-first analytics, and end with a retroactive UI review before
the first real charge.

## Milestone

**Launch-Ready** — A Bulgarian customer can complete a real Stripe purchase, land
on a polished success flow, and the site meets EU/BG consumer-law obligations.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Phase 1 (infrastructure) and Phase 2 (legal) are independent and may run in
parallel. Phase 3 (copy) depends on both being complete enough to link from.
Phase 4 (checkout) depends on Phases 2 and 3. Phases 5, 6 can run in parallel
after Phase 4. Phase 7 runs last.

- [ ] **Phase 1: Production floor** - Domain, static host, and HTTPS so the site has a real home
- [x] **Phase 2: Legal floor** - Privacy Policy, Terms of Service with 14-day withdrawal clause, footer entity details, cookie-banner decision
- [x] **Phase 3: Copy lock** - Editorial pass on `index.html`, real copy on `success.html`, SEO baseline metadata
- [ ] **Phase 4: Checkout live** - Stripe subscription wired to both CTAs, pre-purchase 14-day disclosure surfaced near pricing
- [x] **Phase 5: Post-purchase handoff** - Cal.com booking embed and 14-day withdrawal notice on `success.html`
- [x] **Phase 6: Measurement** - Privacy-first cookieless analytics tracking pageviews and CTA clicks
- [ ] **Phase 7: Pre-launch audit** - Retroactive `/gsd:ui-review` of shipped landing and success pages, any fixes applied

## Phase Details

### Phase 1: Production floor
**Goal**: The site is reachable at its real domain over HTTPS from a production static host, with auto-deploy from the main branch
**Depends on**: Nothing (first phase)
**Requirements**: INFR-01, INFR-02, INFR-05
**Success Criteria** (what must be TRUE):
  1. Visiting the production domain in a browser loads `index.html` over HTTPS with a valid certificate
  2. A commit to the main branch triggers an automatic deploy to production without manual intervention
  3. Any HTTP request to the domain is redirected to HTTPS, and HSTS is set on responses
  4. No mixed-content warnings appear in the browser console on either `index.html` or `success.html`
**Plans**: 1 plan
- [x] 01-production-floor-01-PLAN.md — vercel.json + asset-origin audit + DEPLOY.md handoff

### Phase 2: Legal floor
**Goal**: The site carries the legal surface area required to charge Bulgarian consumers — Privacy Policy, Terms of Service with 14-day withdrawal, entity details in the footer, and an explicit cookie-banner decision
**Depends on**: Nothing (can run parallel to Phase 1)
**Requirements**: LEG-01, LEG-02, LEG-03, LEG-05, LEG-06
**Success Criteria** (what must be TRUE):
  1. A visitor can open a GDPR-compliant Bulgarian Privacy Policy page from the footer of every page
  2. A visitor can open a Bulgarian Terms of Service page from the footer of every page, and the ToS contains an explicit 14-day right-of-withdrawal clause
  3. The footer on every page shows the company/entity name, contact email, and registered address where applicable
  4. A documented decision exists recording whether a cookie banner ships or is skipped, with the reason tied to the analytics choice
**Plans**: 1 plan
- [x] 02-legal-floor-01-PLAN.md — privacy.html + terms.html + consolidated footer + COOKIE-DECISION.md
**UI hint**: yes

### Phase 3: Copy lock
**Goal**: Every word the visitor reads on `index.html` and `success.html` is final brand-voice copy, and the site carries the SEO metadata a real launch needs
**Depends on**: Phase 2 (so legal page titles and footer entity wording are available to reference in the audit)
**Requirements**: INFR-03, INFR-04, POST-02
**Success Criteria** (what must be TRUE):
  1. A read-through of `index.html` by an editor finds no placeholder, first-draft, or off-voice language — tone is calm, plainspoken, non-shaming, matching "Quiet Confidence"
  2. `success.html` step-by-step setup copy reflects the real DIY delivery model the customer actually follows, not demo placeholder text
  3. Each page has a meaningful `<title>`, meta description, OpenGraph/Twitter-card tags, and a favicon served from the root
  4. `robots.txt` and `sitemap.xml` are reachable at the domain root and list the canonical URLs of `index.html` and `success.html`
**Plans**: 1 plan
- [x] 03-copy-lock-01-PLAN.md — editorial copy pass on index.html + real DIY flow on success.html + SEO baseline (meta, OG, canonical, favicon.svg, robots.txt, sitemap.xml)
**UI hint**: yes

### Phase 4: Checkout live
**Goal**: Both CTAs open a live Stripe Checkout for a 3€/mo EUR subscription, all paths (success, cancel, fail) behave correctly, and the 14-day withdrawal right is disclosed near the pricing CTA before the customer pays
**Depends on**: Phase 2, Phase 3
**Requirements**: CHKT-01, CHKT-02, CHKT-03, CHKT-04, LEG-04
**Success Criteria** (what must be TRUE):
  1. Clicking either `data-cta="hero"` or `data-cta="pricing"` opens a live Stripe Checkout session for a recurring 3€/mo EUR subscription
  2. A successful test-mode charge redirects the customer back to `success.html` with `session_id` available in the URL for optional validation
  3. Cancelling or failing the Stripe Checkout returns the customer to the pricing section of `index.html` with no broken state
  4. Before clicking pay, a visitor can read a visible note near the pricing CTA stating the 14-day right of withdrawal, with a link to the relevant ToS clause
**Plans**: TBD
**UI hint**: yes

### Phase 5: Post-purchase handoff
**Goal**: A paying customer lands on `success.html` and can both book a support call and see their 14-day withdrawal right without scrolling past clutter
**Depends on**: Phase 4
**Requirements**: POST-01, POST-03
**Success Criteria** (what must be TRUE):
  1. `success.html` embeds a working Cal.com or Calendly booking widget, and a visitor can reach the point of selecting a time slot without leaving the page
  2. `success.html` displays a visible, non-hidden 14-day right-of-withdrawal notice in the brand voice, linked to the ToS clause
  3. The booking widget and the withdrawal notice both render without breaking the "Quiet Confidence" layout, spacing, or type scale
**Plans**: 1 plan
- [x] 05-post-purchase-handoff-01-PLAN.md — Cal.com iframe embed + 14-day withdrawal notice on success.html + .calcom-frame CSS primitive
**UI hint**: yes

### Phase 6: Measurement
**Goal**: A privacy-first, cookieless analytics tool is live on both pages and reports pageviews plus `data-cta` click events
**Depends on**: Phase 4
**Requirements**: ANLY-01, ANLY-02
**Success Criteria** (what must be TRUE):
  1. One of Plausible / Umami / Fathom is installed on `index.html` and `success.html` and is reporting pageviews in its dashboard
  2. Clicking either `data-cta="hero"` or `data-cta="pricing"` on `index.html` is recorded as a distinct event in the analytics dashboard
  3. The analytics install does not set cookies or any persistent identifier that would require a consent banner under GDPR, and the Phase 2 cookie-banner decision remains valid
**Plans**: 1 plan
- [x] 06-measurement-01-PLAN.md — Plausible analytics on index.html + success.html + CTA event classes + COOKIE-DECISION.md Phase 6 note

### Phase 7: Pre-launch audit
**Goal**: A retroactive `/gsd:ui-review` has been run against the shipped landing and success pages, and any pre-launch fixes it surfaces have been applied
**Depends on**: Phase 5, Phase 6
**Requirements**: AUDT-01
**Success Criteria** (what must be TRUE):
  1. A scored `.planning/UI-REVIEW.md` exists covering both `index.html` and `success.html`, produced by `/gsd:ui-review`
  2. Every finding in UI-REVIEW.md classified as pre-launch-blocking has either been fixed in code or explicitly deferred with a recorded reason
  3. A re-check of the pages after fixes confirms no regression against the "Quiet Confidence" design system rules documented in `CLAUDE.md`
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7
Phases 1 and 2 may execute in parallel. Phases 5 and 6 may execute in parallel after Phase 4.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Production floor | 1/1 | Complete | 2026-04-23 |
| 2. Legal floor | 1/1 | Complete | 2026-04-23 |
| 3. Copy lock | 1/1 | Complete | 2026-04-23 |
| 4. Checkout live | 1/1 | Complete | 2026-04-23 |
| 5. Post-purchase handoff | 1/1 | Complete | 2026-04-23 |
| 6. Measurement | 1/1 | Complete | 2026-04-23 |
| 7. Pre-launch audit | 0/TBD | Not started | - |

---
*Roadmap created: 2026-04-23*
*Milestone: Launch-Ready*
*Granularity: standard (7 phases)*
*Coverage: 21/21 v1 requirements mapped*
