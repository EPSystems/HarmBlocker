# Phase 6: Measurement - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

A privacy-first, cookieless analytics tool is wired into `index.html` and `success.html`, tracking pageviews plus `data-cta` click events. The snippet sits in a placeholder form so the user can swap in a real site-ID / data-domain after creating an account. Choice of vendor (Plausible / Umami / Fathom) is committed in this phase — all three are cookieless, so no consent-banner revisit needed.

</domain>

<decisions>
## Implementation Decisions

### Vendor Choice
- **Pick Plausible** — most common cookieless option, script is smallest (~1KB), self-host possible later, EU-hosted option (plausible.io/eu). Umami and Fathom are acceptable alternatives but we commit to one.
- Document rationale in COOKIE-DECISION.md followup note (or SUMMARY.md)

### Snippet Pattern
- Include Plausible's official script in `<head>` of both pages:
  ```html
  <script defer data-domain="__ANALYTICS_SITE_ID__" src="https://plausible.io/js/script.tagged-events.js"></script>
  ```
- `tagged-events.js` variant lets us fire events on any element with `class="plausible-event-name=..."` — used for CTA clicks
- Placeholder `__ANALYTICS_SITE_ID__` matches what user enters at Plausible (e.g., `harmblocker.bg`)

### CTA Event Tracking
- The two `<a data-cta="hero">` and `<a data-cta="pricing">` already exist
- Add `class="plausible-event-name=CTA+Click plausible-event-position=hero"` (and `...=pricing` on the other) to each CTA
- Preserve existing classes — concatenate
- Plausible will auto-fire the event on click

### Cookie-Banner Re-Check (ANLY-02)
- Plausible is cookieless + GDPR-friendly (see Plausible's own privacy page)
- Re-confirm COOKIE-DECISION.md still valid; no banner needed
- Add a brief note at bottom of COOKIE-DECISION.md referencing Phase 6's Plausible choice — makes the decision traceable

### Claude's Discretion
- Exact attribute concatenation (avoid breaking existing classes)
- Whether to add Plausible custom props (e.g., locale=bg) — keep minimal for v1

</decisions>

<code_context>
## Existing Code Insights

- `index.html` and `success.html` both load Google Fonts in `<head>` — Plausible script goes alongside, after the font link
- The two CTAs in `index.html` carry `data-cta="hero"` and `data-cta="pricing"` (preserved across Phases 1-5 per design)
- Neither page currently has any JS beyond `script.js` at the end of body
- No existing Plausible/Umami/Fathom config

</code_context>

<specifics>
## Specific Ideas

- Keep Plausible script `defer`red — do not block initial render
- Only two CTAs get event attributes — no automatic outbound-link tracking, no automatic file-download tracking
- The HTML comment near the Plausible script should read:
  ```html
  <!-- SWAP: replace __ANALYTICS_SITE_ID__ with your Plausible site ID (usually your domain).
       Create a free account at https://plausible.io; add site "harmblocker.bg" (or your domain).
       tagged-events script allows CTA click tracking via `class="plausible-event-name=..."`. -->
  ```

</specifics>

<deferred>
## Deferred Ideas

- Umami / Fathom — considered, documented, not chosen
- Plausible goals dashboard setup — user action in Plausible UI
- GA4 / Meta Pixel — rejected per PROJECT.md Out-of-Scope
- Scroll-depth tracking, heatmaps — post-launch

</deferred>
