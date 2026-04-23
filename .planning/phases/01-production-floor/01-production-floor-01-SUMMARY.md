---
phase: 01-production-floor
plan: 01
subsystem: infra
tags: [vercel, hostinger, static-hosting, https, hsts, security-headers, dns]

# Dependency graph
requires: []
provides:
  - Minimal Vercel static-host config at repo root (vercel.json)
  - Security headers applied to every response (HSTS 2y, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
  - Clean URLs + no-trailing-slash normalization (enables Phase 2 /privacy and /terms without .html)
  - User-action handoff for Vercel project creation + Hostinger DNS (DEPLOY.md)
  - Asset-origin audit confirming no mixed-content resource loads
affects: [02-legal-floor, 03-copy-lock, 04-checkout-live, 05-post-purchase, 06-measurement]

# Tech tracking
tech-stack:
  added: [vercel.json (Vercel zero-config static hosting)]
  patterns:
    - "Security headers declared in vercel.json source /(.*) block (not in-page meta)"
    - "cleanUrls: true — future legal pages live at /privacy, /terms without routing logic"
    - "User-action handoff documented as committed repo file (DEPLOY.md), not external wiki"

key-files:
  created:
    - vercel.json
    - DEPLOY.md
    - .planning/phases/01-production-floor/01-production-floor-01-SUMMARY.md
  modified: []

key-decisions:
  - "HSTS max-age set to 63072000 (2 years) with includeSubDomains and preload — user may optionally submit to hstspreload.org post-launch"
  - "Permissions-Policy disables camera, microphone, geolocation, and interest-cohort (FLoC/Topics) — aligns with privacy-first brand posture"
  - "vercel.json stays minimal: no functions, no rewrites, no redirects, no env — Vercel's defaults plus headers are sufficient for a static site"
  - "Asset audit found literal 'http://' in index.html line 88 as SVG XML namespace (xmlns='http://www.w3.org/2000/svg'); left unchanged because namespace URIs are identifiers required verbatim by the W3C spec, not fetched resources"

patterns-established:
  - "Header hardening pattern: declared in vercel.json under source '/(.*)' — Phase 2/3 pages inherit automatically"
  - "User-action handoff pattern: internal docs in English (DEPLOY.md), user-facing copy in Bulgarian — preserves separation"

requirements-completed: [INFR-01, INFR-02, INFR-05]

# Metrics
duration: 2min
completed: 2026-04-23
---

# Phase 1 Plan 1: Production Floor Summary

**Static-host config (vercel.json) with 4 hardening headers and cleanUrls, plus a Vercel+Hostinger deploy handoff (DEPLOY.md) — repo is ready to ship to harmblocker.bg as soon as the user creates the Vercel project and points DNS**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-04-23T19:08:59Z
- **Completed:** 2026-04-23T19:10:59Z
- **Tasks:** 3
- **Files created:** 2 (vercel.json, DEPLOY.md) + 1 summary
- **Files modified:** 0 (HTML files untouched — audit was clean)

## Accomplishments

- `vercel.json` ships X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and Strict-Transport-Security on every response; `cleanUrls: true` and `trailingSlash: false` normalize the URL shape for future legal pages
- `DEPLOY.md` is self-contained: a first-time deployer can follow it end-to-end to create the Vercel project (dashboard OR CLI), configure Hostinger DNS (apex A + www CNAME), and verify HTTPS/HSTS + auto-deploy behavior without follow-up questions
- Asset-origin audit confirmed both HTML files reference only HTTPS origins (`fonts.googleapis.com`, `fonts.gstatic.com`) — no mixed-content resource loads exist; result documented in DEPLOY.md section 2

## Task Commits

Each task was committed atomically on `main`:

1. **Task 1: Create vercel.json with security headers and clean-URL config** - `1653634` (chore)
2. **Task 2: Audit index.html and success.html for mixed-content references** - (no code changes — read-only audit; outcome recorded in Task 3 commit)
3. **Task 3: Write DEPLOY.md documenting Vercel + Hostinger handoff** - `fa949a9` (docs)

**Plan metadata commit:** pending (includes SUMMARY.md, STATE.md, ROADMAP.md updates)

## Files Created/Modified

- `vercel.json` — Vercel static-host config (security headers, cleanUrls, trailingSlash). 28 lines.
- `DEPLOY.md` — User-action handoff for Vercel project creation, Hostinger DNS (harmblocker.bg apex A + www CNAME), HTTPS/HSTS verification, local preview reference, Phase 2–6 out-of-scope callouts. ~117 lines.
- `.planning/phases/01-production-floor/01-production-floor-01-SUMMARY.md` — this file.

## Decisions Made

- **HSTS value:** 2-year max-age with `includeSubDomains; preload`. Vercel emits HSTS automatically on custom domains, but declaring it in-repo makes the value reviewable and controllable; the `preload` flag is present so the user can optionally submit to hstspreload.org once the site has been stable for a week (documented in DEPLOY.md section 5). Rationale: matches privacy-first brand posture without locking in before launch.
- **Permissions-Policy scope:** disables `camera=(), microphone=(), geolocation=(), interest-cohort=()`. Rationale: site doesn't use any device APIs; `interest-cohort=()` opts out of FLoC/Topics, aligned with privacy-first commitment.
- **vercel.json minimality:** no `functions`, `rewrites`, `redirects`, or `env` keys. Rationale: the site is purely static. Phase 2–6 can add redirects (e.g., non-www→www) if needed; Phase 1 ships only what is strictly required by INFR-01/02/05.
- **DEPLOY.md in English:** internal deployer documentation. Rationale: preserves the Bulgarian-first user-facing copy boundary — user-facing text in `index.html`/`success.html` stays in Bulgarian; internal docs target whoever deploys the site (may not be a native Bulgarian speaker, may be Claude).

## Deviations from Plan

None - plan executed exactly as written.

One audit edge case was handled within scope (not a deviation):

- The plan's verification grep for literal `http://` substring in `index.html` flagged one match (line 88, `xmlns="http://www.w3.org/2000/svg"`). The plan's Action step 3 only requires rewriting to `https://` for "a match where the URL begins `http://` ... (is a mixed-content source)." An SVG XML namespace identifier is not a mixed-content source — it is a literal string required verbatim by the W3C SVG specification, never dereferenced by browsers. The plan's acceptance-criteria intent (no mixed-content resource loads) is fully satisfied. No HTML changes were made, and the audit outcome in DEPLOY.md documents this explicitly so future auditors don't re-investigate.

**Total deviations:** 0
**Impact on plan:** Executed as specified. Files shipped match the plan's artifacts block exactly.

## Known Stubs

None. No placeholder values ship in this plan's artifacts.

- DNS record values in DEPLOY.md section 4 (e.g., `76.76.21.21`) are documented as "copy the IP Vercel shows you at configure-time, do not hardcode" — this is a correctness note, not a stub.
- `harmblocker.bg` is the canonical domain per PROJECT.md Key Decisions; it is not a placeholder, it is the confirmed target.

## Issues Encountered

None. Tasks ran in the expected order; automated verifications (JSON parse, content term checks, file length) all passed on first attempt.

## User Setup Required

**External services require manual configuration.** See [DEPLOY.md](../../../DEPLOY.md) for:

- Create Vercel project linked to this Git repo (dashboard or CLI) — INFR-01, INFR-02
- Configure Hostinger DNS for `harmblocker.bg`: apex A record + www CNAME to `cname.vercel-dns.com` — INFR-01
- Verify HTTPS certificate, HTTP→HTTPS redirect, and HSTS header on first deploy — INFR-05
- (Optional, post-launch) submit to https://hstspreload.org

DEPLOY.md sections 3–6 cover every step end-to-end.

## Next Phase Readiness

- Phase 1 repo deliverables are shipped. Once the user follows DEPLOY.md, SC1–SC4 from ROADMAP.md Phase 1 (domain loads over HTTPS, auto-deploy from main, HTTP→HTTPS with HSTS, no mixed content) are all satisfied.
- **Phase 2 (Legal floor):** Can begin immediately — it is independent of Phase 1 per ROADMAP.md. The `cleanUrls: true` setting already shipped means Phase 2's `privacy.html` / `terms.html` will serve at `/privacy` / `/terms` without additional config.
- **Phase 3 (Copy lock) onward:** All future pages inherit the hardening headers automatically — no per-page setup needed.

No blockers. No carry-over concerns.

## Self-Check: PASSED

Verified claims against disk and git:

- FOUND: `D:\Claude\HarmBlocker\vercel.json` (28 lines, parses as valid JSON, all 4 required headers present)
- FOUND: `D:\Claude\HarmBlocker\DEPLOY.md` (5312 chars, all required terms present, no forbidden providers mentioned)
- FOUND: commit `1653634` (chore(01-01): add vercel.json with security headers and clean URLs)
- FOUND: commit `fa949a9` (docs(01-01): add DEPLOY.md with Vercel + Hostinger handoff)
- FOUND: `index.html` references only HTTPS external origins (fonts.googleapis.com, fonts.gstatic.com); no mixed-content resource loads
- FOUND: `success.html` no `http://` references whatsoever
- FOUND: no `package.json` in repo root (no-build-tools constraint preserved)

---
*Phase: 01-production-floor*
*Completed: 2026-04-23*
