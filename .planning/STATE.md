---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: verifying
stopped_at: Completed 02-legal-floor-01-PLAN.md
last_updated: "2026-04-23T19:28:07.270Z"
last_activity: 2026-04-23
progress:
  total_phases: 7
  completed_phases: 2
  total_plans: 2
  completed_plans: 2
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-23)

**Core value:** A Bulgarian customer can land on the site, understand the product in under 30 seconds, pay with a card, and reach a setup flow that actually gets the blocker running — without ever feeling shamed, judged, or marketed-at.
**Current focus:** Phase 02 — legal-floor

## Current Position

Phase: 3
Plan: Not started
Status: Phase complete — ready for verification
Last activity: 2026-04-23

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**

- Total plans completed: 0
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**

- Last 5 plans: —
- Trend: —

*Updated after each plan completion*
| Phase 01-production-floor P01 | 2min | 3 tasks | 2 files |
| Phase 02-legal-floor P01 | 4min | 4 tasks | 6 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table. Recent decisions affecting current work:

- Milestone 1 (Launch-Ready): Site stays static HTML/CSS/JS; Stripe Checkout via redirect, no SDK
- Milestone 1: Stripe-only for v1, local BG payment methods deferred
- Milestone 1: Cookieless analytics (Plausible/Umami/Fathom — chosen during Phase 6) to avoid cookie-banner tax
- Milestone 1: Bulgarian-only copy; no i18n system
- [Phase 01-production-floor]: HSTS max-age=63072000 with includeSubDomains and preload; optional hstspreload.org submission documented in DEPLOY.md
- [Phase 01-production-floor]: Permissions-Policy disables camera, microphone, geolocation, and interest-cohort (FLoC/Topics opt-out)
- [Phase 01-production-floor]: vercel.json stays minimal: no functions, rewrites, redirects, or env — cleanUrls:true enables future /privacy and /terms routes without config change
- [Phase 02-legal-floor]: No cookie banner ships in v1.0 — site sets no own cookies and Phase 6 commits to cookieless analytics; revisit triggers documented in .planning/phases/02-legal-floor/COOKIE-DECISION.md
- [Phase 02-legal-floor]: Entity placeholders use grep-able __ENTITY_NAME__ / __ENTITY_ADDRESS__ / __CONTACT_EMAIL__ tokens across all 4 pages and both legal drafts; user-swap before launch
- [Phase 02-legal-floor]: Legal drafts marked two ways — HTML comment (developer-visible) and visible .legal-banner in Bulgarian (reader-visible); both must be removed after lawyer sign-off
- [Phase 02-legal-floor]: 14-day right-of-withdrawal clause in terms.html cites both ЗЗП чл. 50–57 and Directive 2011/83/ЕС and includes a copyable blockquote cancellation template; heading is stable anchor text for Phase 4 LEG-04 pre-purchase disclosure

### Pending Todos

[From .planning/todos/pending/ — ideas captured during sessions]

None yet.

### Blockers/Concerns

[Issues that affect future work]

- Phase 2 (Legal floor) depends on a real entity name + registered address if any — if the founding entity is not yet formed, LEG-05 surfaces that fact before Phase 4 (Checkout) can legitimately go live
- Phase 6 analytics tool choice (Plausible vs Umami vs Fathom) is a decision to make during that phase; the choice must remain cookieless to keep the Phase 2 cookie-banner decision valid

## Session Continuity

Last session: 2026-04-23T19:28:07.264Z
Stopped at: Completed 02-legal-floor-01-PLAN.md
Resume file: None
