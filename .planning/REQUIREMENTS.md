# Requirements: HarmBlocker

**Defined:** 2026-04-23
**Core Value:** A Bulgarian customer can land on the site, understand the product in under 30 seconds, pay with a card, and reach a setup flow that actually gets the blocker running on their household devices — without ever feeling shamed, judged, or marketed-at.

## v1 Requirements

Requirements for the **Launch-Ready** milestone. Each maps to roadmap phases.

### Checkout

- [ ] **CHKT-01**: Both CTAs (`data-cta="hero"` and `data-cta="pricing"`) link to a live Stripe Checkout session for a 3€/mo EUR subscription
- [ ] **CHKT-02**: Stripe Checkout is configured to redirect back to `success.html` on successful purchase, passing session_id so the page can confirm the purchase if needed
- [ ] **CHKT-03**: Checkout failure / cancel path returns the customer to the pricing section of `index.html` without a broken state
- [ ] **CHKT-04**: Stripe subscription product is live in Stripe dashboard, priced at 3€/mo, recurring monthly, EUR

### Legal

- [ ] **LEG-01**: Privacy Policy page exists in Bulgarian, GDPR-compliant, linked from footer on every page and referenced during checkout
- [ ] **LEG-02**: Terms of Service page exists in Bulgarian, linked from footer on every page and referenced during checkout
- [ ] **LEG-03**: Terms of Service includes explicit 14-day right-of-withdrawal clause (EU distance-selling law for B2C)
- [ ] **LEG-04**: 14-day withdrawal disclosure is surfaced pre-purchase (near the pricing CTA) and post-purchase (on `success.html`), not hidden only in ToS
- [ ] **LEG-05**: Footer contains the company details required for EU B2C commerce: company/entity name, contact email, registered address if applicable
- [ ] **LEG-06**: Cookie consent banner is evaluated — only shipped if the chosen analytics tool requires it; skipped if cookieless

### Post-Purchase Flow

- [ ] **POST-01**: `success.html` embeds a Cal.com / Calendly booking widget so customers can request a support meeting
- [ ] **POST-02**: `success.html` copy is rewritten to reflect the real DIY delivery model (current copy is placeholder-flavored)
- [ ] **POST-03**: `success.html` includes a visible 14-day withdrawal notice (per LEG-04)

### Analytics

- [ ] **ANLY-01**: A privacy-first analytics tool (Plausible OR Umami OR Fathom — decision during phase) is installed on both pages, tracking pageviews + the `data-cta` click events
- [ ] **ANLY-02**: Analytics choice is consistent with the "no cookie banner if avoidable" constraint — i.e., cookieless by design

### Launch Infrastructure

- [ ] **INFR-01**: Production domain is registered and pointed at the static host
- [ ] **INFR-02**: Production hosting is set up (Cloudflare Pages / Netlify / Vercel — decision during phase), auto-deploying from the main branch
- [ ] **INFR-03**: SEO baseline ships: meaningful `<title>` and meta description per page, OpenGraph/Twitter-card tags, favicon, `robots.txt`, `sitemap.xml`
- [ ] **INFR-04**: A copy audit of `index.html` is done — any placeholder or first-draft language is rewritten in the "Quiet Confidence" brand voice before real money changes hands
- [ ] **INFR-05**: HTTPS is enforced on production (HSTS header, no mixed content)

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

Populated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CHKT-01 | — | Pending |
| CHKT-02 | — | Pending |
| CHKT-03 | — | Pending |
| CHKT-04 | — | Pending |
| LEG-01 | — | Pending |
| LEG-02 | — | Pending |
| LEG-03 | — | Pending |
| LEG-04 | — | Pending |
| LEG-05 | — | Pending |
| LEG-06 | — | Pending |
| POST-01 | — | Pending |
| POST-02 | — | Pending |
| POST-03 | — | Pending |
| ANLY-01 | — | Pending |
| ANLY-02 | — | Pending |
| INFR-01 | — | Pending |
| INFR-02 | — | Pending |
| INFR-03 | — | Pending |
| INFR-04 | — | Pending |
| INFR-05 | — | Pending |
| AUDT-01 | — | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 0 (roadmap pending)
- Unmapped: 21 ⚠️ (will be mapped by roadmapper)

---
*Requirements defined: 2026-04-23*
*Last updated: 2026-04-23 after initial definition*
