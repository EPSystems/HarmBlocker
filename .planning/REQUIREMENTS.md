# Requirements: HarmBlocker

**Defined:** 2026-04-23
**Core Value:** A Bulgarian customer can land on the site, understand the product in under 30 seconds, pay with a card, and reach a setup flow that actually gets the blocker running on their household devices — without ever feeling shamed, judged, or marketed-at.

## v1 Requirements

Requirements for the **Launch-Ready** milestone. Each maps to roadmap phases.

### Checkout

- [x] **CHKT-01**: Both CTAs (`data-cta="hero"` and `data-cta="pricing"`) link to a live Stripe Checkout session for a 3€/mo EUR subscription
- [x] **CHKT-02**: Stripe Checkout is configured to redirect back to `success.html` on successful purchase, passing session_id so the page can confirm the purchase if needed
- [x] **CHKT-03**: Checkout failure / cancel path returns the customer to the pricing section of `index.html` without a broken state
- [x] **CHKT-04**: Stripe subscription product is live in Stripe dashboard, priced at 3€/mo, recurring monthly, EUR

### Legal

- [x] **LEG-01**: Privacy Policy page exists in Bulgarian, GDPR-compliant, linked from footer on every page and referenced during checkout
- [x] **LEG-02**: Terms of Service page exists in Bulgarian, linked from footer on every page and referenced during checkout
- [x] **LEG-03**: Terms of Service includes explicit 14-day right-of-withdrawal clause (EU distance-selling law for B2C)
- [x] **LEG-04**: 14-day withdrawal disclosure is surfaced pre-purchase (near the pricing CTA) and post-purchase (on `success.html`), not hidden only in ToS
- [x] **LEG-05**: Footer contains the company details required for EU B2C commerce: company/entity name, contact email, registered address if applicable
- [x] **LEG-06**: Cookie consent banner is evaluated — only shipped if the chosen analytics tool requires it; skipped if cookieless

### Post-Purchase Flow

- [x] **POST-01**: `success.html` embeds a Cal.com / Calendly booking widget so customers can request a support meeting
- [x] **POST-02**: `success.html` copy is rewritten to reflect the real DIY delivery model (current copy is placeholder-flavored)
- [x] **POST-03**: `success.html` includes a visible 14-day withdrawal notice (per LEG-04)

### Analytics

- [ ] **ANLY-01**: A privacy-first analytics tool (Plausible OR Umami OR Fathom — decision during phase) is installed on both pages, tracking pageviews + the `data-cta` click events
- [ ] **ANLY-02**: Analytics choice is consistent with the "no cookie banner if avoidable" constraint — i.e., cookieless by design

### Launch Infrastructure

- [x] **INFR-01**: Production domain is registered and pointed at the static host
- [x] **INFR-02**: Production hosting is set up (Cloudflare Pages / Netlify / Vercel — decision during phase), auto-deploying from the main branch
- [x] **INFR-03**: SEO baseline ships: meaningful `<title>` and meta description per page, OpenGraph/Twitter-card tags, favicon, `robots.txt`, `sitemap.xml`
- [x] **INFR-04**: A copy audit of `index.html` is done — any placeholder or first-draft language is rewritten in the "Quiet Confidence" brand voice before real money changes hands
- [x] **INFR-05**: HTTPS is enforced on production (HSTS header, no mixed content)

### Retrospective Audit

- [ ] **AUDT-01**: `/gsd:ui-review` runs against the existing landing + success pages once a Phase 1 SUMMARY.md exists, producing a scored UI-REVIEW.md with any pre-launch fixes

## v2 Requirements

Deferred to post-launch. Acknowledged but not in current roadmap.

### Local Payments

- **LPAY-01**: Borica card processing for BG customers
- **LPAY-02**: EasyPay voucher payment option
- **LPAY-03**: Revolut Pay button

### Accounting

- **ACCT-01**: Automatic VAT-compliant invoice (фактура) emailed on purchase
- **ACCT-02**: Customer can request invoice with company details post-purchase

### Distribution

- **DIST-01**: "За църкви и общности" (For churches and communities) dedicated page / partnership path
- **DIST-02**: Referral or affiliate mechanism

### Optimization

- **OPTM-01**: Funnel analytics dashboard
- **OPTM-02**: A/B testing of hero copy
- **OPTM-03**: Churn / retention visibility

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Local BG payment methods (Borica/EasyPay/Revolut) in v1 | Deferred; Stripe-cards covers enough of the market for launch validation |
| VAT-invoice automation in v1 | Manual invoicing acceptable until volume justifies automation |
| GA4 / Meta Pixel / other ad-network trackers | Privacy-first is a brand commitment, not just compliance |
| Free trial / first-month-free | Discounts cheapen a 3€/mo product; simplicity wins |
| Annual pricing tier | One plan, one price, one decision for customer |
| Multi-language (English, Russian, etc.) | Bulgarian-first is explicit positioning |
| Account system / login on the marketing site | Not needed — Stripe owns subscription state, Cal.com owns support |
| The blocker product itself (DNS / app / extension) | Separate product, separate repo |
| Mobile app marketing surface | The blocker ships separately; marketing site doesn't need an app store listing yet |
| Email marketing / newsletter capture | Not useful pre-launch; adds a GDPR consent surface for zero return |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CHKT-01 | Phase 4 — Checkout live | Complete |
| CHKT-02 | Phase 4 — Checkout live | Complete |
| CHKT-03 | Phase 4 — Checkout live | Complete |
| CHKT-04 | Phase 4 — Checkout live | Complete |
| LEG-01 | Phase 2 — Legal floor | Complete |
| LEG-02 | Phase 2 — Legal floor | Complete |
| LEG-03 | Phase 2 — Legal floor | Complete |
| LEG-04 | Phase 4 — Checkout live | Complete |
| LEG-05 | Phase 2 — Legal floor | Complete |
| LEG-06 | Phase 2 — Legal floor | Complete |
| POST-01 | Phase 5 — Post-purchase handoff | Complete |
| POST-02 | Phase 3 — Copy lock | Complete |
| POST-03 | Phase 5 — Post-purchase handoff | Complete |
| ANLY-01 | Phase 6 — Measurement | Pending |
| ANLY-02 | Phase 6 — Measurement | Pending |
| INFR-01 | Phase 1 — Production floor | Complete |
| INFR-02 | Phase 1 — Production floor | Complete |
| INFR-03 | Phase 3 — Copy lock | Complete |
| INFR-04 | Phase 3 — Copy lock | Complete |
| INFR-05 | Phase 1 — Production floor | Complete |
| AUDT-01 | Phase 7 — Pre-launch audit | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21 ✓
- Unmapped: 0

**Note on LEG-04 vs POST-03:** LEG-04 mandates the 14-day withdrawal disclosure
appear both pre-purchase (near pricing CTA) and post-purchase (on `success.html`).
LEG-04 is assigned to Phase 4 where the pre-purchase CTA-adjacent disclosure
lives. POST-03 is the separate, explicit requirement for the success-page
surface of the same right and is assigned to Phase 5. Together they cover the
full LEG-04 mandate without either phase becoming ambiguous.

---
*Requirements defined: 2026-04-23*
*Last updated: 2026-04-23 after roadmap creation — traceability table populated*
