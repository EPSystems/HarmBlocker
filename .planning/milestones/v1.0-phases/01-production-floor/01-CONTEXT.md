# Phase 1: Production floor - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

The site is reachable at its real domain over HTTPS from a production static host, with auto-deploy from the main branch. This phase delivers the hosting surface only — domain purchase, DNS configuration, and hosting account provisioning are user actions; the repo-side deliverable is whatever configuration files Vercel needs plus a documented handoff for the user.

</domain>

<decisions>
## Implementation Decisions

### Hosting + Domain (locked in PROJECT.md)
- Hosting platform: Vercel (user-provisioned)
- Domain registrar: Hostinger (user-provisioned)
- Canonical production domain: `harmblocker.bg` (pending user confirmation)
- Auto-deploy trigger: push to `main` branch

### Repo Deliverables
- `vercel.json` in repo root if zero-config defaults are insufficient (security headers, clean URLs, redirects)
- HTTP → HTTPS enforcement and HSTS header (Vercel default plus any explicit config needed in `vercel.json`)
- No mixed-content sources anywhere in `index.html` / `success.html` (all Google Fonts + assets already on HTTPS — verify)

### User-Action Placeholders
- Register domain via Hostinger
- Create Vercel project linked to this repo's main branch
- Point Hostinger DNS at Vercel (CNAME / A record per Vercel's instructions)
- These are documented in a README section or dedicated handoff doc, not executed by Claude

### Claude's Discretion
All implementation choices not listed above are at Claude's discretion. Use ROADMAP phase goal, success criteria, and codebase conventions (from CLAUDE.md) to guide decisions.

</decisions>

<code_context>
## Existing Code Insights

- Repo root has 4 shipped files: `index.html`, `success.html`, `styles.css`, `script.js`
- No build step, no `package.json`, no framework
- External dependencies: Google Fonts via `<link>` (HTTPS) only
- No `vercel.json` or hosting config exists yet
- CLAUDE.md documents preview command: `python -m http.server 8080`

</code_context>

<specifics>
## Specific Ideas

- Minimal `vercel.json` preferred — only include what's necessary (security headers, clean-URLs). Don't over-configure.
- Security headers to consider: HSTS (Vercel adds automatically on apex+www), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (conservative defaults).
- Clean URLs preferred: `/privacy` should serve `privacy.html` (will matter in Phase 2).
- `trailingSlash: false` to normalize URLs.

</specifics>

<deferred>
## Deferred Ideas

- Edge functions, ISR, any dynamic Vercel features — not applicable to static site.
- Preview deployment configuration — default Vercel behavior is fine.
- CI tests in Vercel pipeline — no tests exist yet.

</deferred>
