# Phase 2: Legal floor - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

The site carries the legal surface area required to charge Bulgarian consumers — GDPR-compliant Privacy Policy, Terms of Service with an explicit 14-day right-of-withdrawal clause, entity details in the footer, and a documented decision on whether a cookie banner is needed. Drafts go to disk as templates with explicit "requires lawyer review" warnings; actual legal vetting is user action outside this phase.

</domain>

<decisions>
## Implementation Decisions

### Legal Pages
- Two new HTML pages at repo root: `privacy.html` and `terms.html`
- Bulgarian language only (matches site-wide copy rule)
- Both pages use the same "Quiet Confidence" design system — inherit `styles.css`, reuse nav + footer partials inline, eyebrow + serif h1, Inter body
- Each page prefixed with a visible banner + HTML comment marking "ЧЕРНОВА — ИЗИСКВА ПРАВЕН ПРЕГЛЕД" (DRAFT — REQUIRES LEGAL REVIEW)
- Cookie banner: **not shipped** in this phase. Decision documented in `.planning/phases/02-legal-floor/COOKIE-DECISION.md` noting that Phase 6's privacy-first analytics (Plausible/Umami/Fathom, cookieless) means no consent banner required. If Phase 6 swaps to a cookie-setting tool, revisit.

### Footer Updates
- Update footer in `index.html`, `success.html`, `privacy.html`, `terms.html` to include:
  - Entity placeholders: `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__`
  - Links to `/privacy` and `/terms` (cleanUrls will resolve these to the .html files)
  - Copyright year via static text (2026)

### Content Requirements — Privacy Policy
- Data controller identity (placeholder)
- What data is collected: none by default (static site); if Phase 6 installs analytics, an update will be needed
- Cookies: none (until confirmed in Phase 6)
- Third-party services: Google Fonts (IP processed per Google's terms), Stripe (on checkout click), Cal.com (on success page booking widget load)
- User rights under GDPR: access, rectification, erasure, portability, objection
- Contact for data requests

### Content Requirements — Terms of Service
- Service description: 3€/mo subscription that blocks adult content + dating apps
- Provider identity (placeholder)
- Pricing and billing cadence
- **14-day right of withdrawal** (Article 7, Consumer Protection Act / EU Directive 2011/83/EU):
  - Explicit clause stating the right
  - How to exercise (written form, template form included)
  - 14-day window start: from contract conclusion
  - Refund policy aligned with the right
- Termination / cancellation terms
- Limitation of liability
- Governing law: Bulgarian law
- Dispute resolution

### Claude's Discretion
- Exact wording of each section, as long as it meets GDPR + BG consumer law baseline and matches brand voice (тих, plainspoken)
- Structure of each page (sections, ordering)

</decisions>

<code_context>
## Existing Code Insights

- Nav in both `index.html` and `success.html` is inline HTML (no partial system)
- Footer in `index.html` and `success.html` is inline HTML — will need to be updated in parallel on all pages
- `styles.css` has `.container`, `.section`, `.eyebrow`, `.h1/.h2`, `.lead` — should be sufficient for long-form legal copy
- No styling exists yet for long-form body text; may need to add a `.legal` or `.prose` class with `max-width: var(--max-w-prose)` and increased line-height for readability
- `vercel.json` has `cleanUrls: true` so `/privacy` resolves to `/privacy.html`

</code_context>

<specifics>
## Specific Ideas

- Draft warning banner (top of privacy.html and terms.html) should use `--paper-soft` background with a hairline, Instrument Serif italic for "Черновa" and Inter for the rest, amber underline. Same design language — not an ugly red warning.
- The 14-day withdrawal template form (in terms.html) should match the design system: no input fields, just quotable text the customer can copy into an email.
- Footer placeholders must be grep-able — use exactly `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__`.

</specifics>

<deferred>
## Deferred Ideas

- Actual lawyer review (user action)
- Filling in real entity details (user action)
- Cookie banner (revisit only if Phase 6 picks a cookie-setting analytics tool)
- Impressum / additional country-specific legal pages (not required for BG)
- Separate "Cookie Policy" page (merged into Privacy Policy)

</deferred>
