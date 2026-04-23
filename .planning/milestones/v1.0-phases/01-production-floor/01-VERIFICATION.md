---
phase: 01-production-floor
verified: 2026-04-23T19:30:00Z
status: human_needed
score: 3/5 must-haves verified automatically
re_verification: false
human_verification:
  - test: "Visit https://harmblocker.bg in a browser"
    expected: "index.html loads, browser shows a valid HTTPS certificate (padlock present), no certificate warning"
    why_human: "Requires domain registration, DNS propagation, and Vercel project creation — all user-action steps documented in DEPLOY.md. Cannot be verified from inside the repo."
  - test: "Push a commit to the main branch and watch the Vercel dashboard"
    expected: "A new deploy starts automatically within ~10 seconds of the push, without any manual trigger"
    why_human: "Requires the Vercel project to be linked to the Git repository. This is a user-action step (DEPLOY.md section 3). No way to confirm from the repo alone."
  - test: "Visit http://harmblocker.bg (plain HTTP) in a browser"
    expected: "Browser is automatically redirected to https://harmblocker.bg; the response headers include Strict-Transport-Security with max-age=63072000"
    why_human: "HTTP-to-HTTPS redirect is Vercel platform behaviour triggered after the custom domain is added and DNS resolves. Requires live deployment."
---

# Phase 1: Production Floor Verification Report

**Phase Goal:** The site is reachable at its real domain over HTTPS from a production static host, with auto-deploy from the main branch.
**Verified:** 2026-04-23T19:30:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A request to harmblocker.bg over HTTPS loads index.html with a valid certificate | ? HUMAN NEEDED | Domain purchase, DNS, and Vercel project are user-action steps not yet confirmed. DEPLOY.md provides the complete handoff. |
| 2 | A commit to main triggers an automatic Vercel deploy | ? HUMAN NEEDED | Vercel auto-deploy requires the project to be linked to the Git repo — user action per DEPLOY.md section 3. Cannot verify from the repo. |
| 3 | HTTP requests to the domain redirect to HTTPS and responses carry HSTS | ? HUMAN NEEDED | Vercel HTTP→HTTPS redirect is a platform behaviour active only after the custom domain is configured. HSTS header is declared in vercel.json (verified). Live check requires deployment. |
| 4 | Neither index.html nor success.html loads any resource over http:// (no mixed-content) | ✓ VERIFIED | Grep for `http://` in index.html returns one match (line 88) — the SVG XML namespace identifier `xmlns="http://www.w3.org/2000/svg"`, which is a W3C-required name string, not a fetched resource. No mixed-content resource loads exist. Grep for `http://` in success.html returns zero matches. All external origins use `https://` (fonts.googleapis.com, fonts.gstatic.com). |
| 5 | The repo contains a documented handoff the user can follow end-to-end | ✓ VERIFIED | DEPLOY.md exists at repo root (5312 chars), covers Vercel project creation (dashboard + CLI), Hostinger DNS (apex A + www CNAME), HTTPS/HSTS behaviour, production verification checklist, and Phase 2–6 deferrals. All required terms present; no forbidden providers (Netlify, Cloudflare) mentioned. |

**Score:** 2/5 truths verified automatically, 3/5 deferred to human verification (all three are live-deployment checks)

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `vercel.json` | Static-host config: security headers, cleanUrls, trailingSlash | ✓ VERIFIED | Exists at repo root (28 lines, valid JSON). `cleanUrls: true`, `trailingSlash: false`. Source `/(.*).` Four required headers present: X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin), Permissions-Policy (camera/mic/geolocation/interest-cohort disabled), Strict-Transport-Security (max-age=63072000; includeSubDomains; preload). No forbidden keys (functions, rewrites, redirects, env). |
| `DEPLOY.md` | User-action handoff: Vercel project creation, Hostinger DNS records, domain verification checklist | ✓ VERIFIED | Exists at repo root. Contains all required terms. Covers dashboard and CLI paths, apex A record + www CNAME with cname.vercel-dns.com, HTTP→HTTPS + HSTS documentation, verify-production checklist, troubleshooting section, and out-of-scope callouts for Phases 2–6. No {replace-me} placeholder. Asset audit outcome is documented. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `vercel.json` | Response headers on every deployed route | Vercel headers config block with `"source": "/(.*)"` | ✓ VERIFIED | Pattern `"source": "/(.*)"` confirmed present. All four hardening headers declared under it. Vercel will apply these to every response on deploy. |
| `DEPLOY.md` | `vercel.json` | References the shipped config in deployment guidance | ✓ VERIFIED | DEPLOY.md section 1 and section 5 explicitly reference `vercel.json`. The term appears in the document. |
| `index.html` and `success.html` | Only HTTPS origins | `<link>` and `<script>` tags | ✓ VERIFIED | All external `<link>` and `<script>` tags use `https://`. Relative references (`styles.css`, `script.js`) inherit page protocol. Only `http://` substring found is the SVG xmlns namespace string on index.html line 88 — not a fetched resource. success.html has zero `http://` matches. |

---

### Data-Flow Trace (Level 4)

Not applicable. This phase produces static configuration files and documentation, not components that render dynamic data.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| vercel.json parses as valid JSON | `node -e "require('D:/Claude/HarmBlocker/vercel.json')"` | Exit 0, no error | ✓ PASS |
| All 4 required headers present in vercel.json | Node script checking keys array | All 4 keys found | ✓ PASS |
| HSTS value correct | Check value string for max-age=63072000; includeSubDomains; preload | All three present | ✓ PASS |
| No forbidden vercel.json keys | Check for functions/rewrites/redirects/env absence | None found | ✓ PASS |
| DEPLOY.md contains all required terms | Node script checking 9 required strings | All 9 present | ✓ PASS |
| DEPLOY.md has no placeholder text | Check for {replace-me} | Not found | ✓ PASS |
| DEPLOY.md length sanity check | Character count | 5312 chars (>= 2000) | ✓ PASS |
| No mixed-content in index.html | Grep for `http://` | 1 match — xmlns namespace string, not a fetched resource | ✓ PASS |
| No mixed-content in success.html | Grep for `http://` | 0 matches | ✓ PASS |
| No package.json at repo root | ls check | Not found — no-build-tools constraint preserved | ✓ PASS |
| Commits documented in SUMMARY exist | git log | 1653634 and fa949a9 confirmed in git history | ✓ PASS |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| INFR-01 | 01-production-floor-01-PLAN.md | Production domain registered and pointed at static host | ? HUMAN NEEDED | Repo deliverable (DEPLOY.md) provides the complete handoff. Domain registration and DNS configuration are user actions not yet confirmed. REQUIREMENTS.md marks this complete, suggesting user has taken action. |
| INFR-02 | 01-production-floor-01-PLAN.md | Production hosting set up, auto-deploying from main branch | ? HUMAN NEEDED | Repo deliverable (vercel.json) is correct. Vercel project creation and Git linking are user actions. REQUIREMENTS.md marks this complete. |
| INFR-05 | 01-production-floor-01-PLAN.md | HTTPS enforced on production (HSTS header, no mixed content) | PARTIAL — repo-side complete, live check human needed | vercel.json ships HSTS header. No mixed-content in HTML files. HTTP→HTTPS redirect and live HSTS delivery require live deployment check. REQUIREMENTS.md marks this complete. |

**Note on REQUIREMENTS.md status:** INFR-01, INFR-02, and INFR-05 are all marked `[x]` (complete) and "Complete" in the traceability table. This suggests the user has already performed the domain registration, Vercel project creation, and DNS configuration documented in DEPLOY.md. The human verification items below are the confirmatory checks the user should run.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `success.html` | 168 | `mailto:support@harmblocker.example` — placeholder email domain | ⚠️ Warning | The support email uses `.example` TLD, which is a reserved placeholder domain. Not a Phase 1 concern (Phase 3 handles copy lock), but noted for future phases. |
| `index.html` | 344–345 | Footer links `href="#"` for Поверителност and Поддръжка | ℹ️ Info | Hash-only href is expected at this phase — legal pages and support contact are Phase 2 and later. Not a Phase 1 blocker. |
| `success.html` | 188–189 | Same footer links `href="#"` | ℹ️ Info | Same as above — expected state at this phase. |

No blockers found. All anti-patterns are either expected placeholders for future phases or outside Phase 1 scope.

---

### Human Verification Required

#### 1. HTTPS on Production Domain

**Test:** In a browser, navigate to `https://harmblocker.bg`
**Expected:** The page loads, the browser shows a valid HTTPS certificate (padlock in address bar, no certificate warning), and the content of `index.html` is rendered correctly.
**Why human:** This requires domain registration at Hostinger, DNS A record pointing to Vercel's IP, and a Vercel project linked to this repository — all user actions documented in DEPLOY.md sections 3–4. The Let's Encrypt certificate is issued by Vercel automatically once DNS resolves, with no repo change possible.

#### 2. Auto-Deploy from Main

**Test:** Push a trivial commit to the `main` branch (e.g., add a comment to `script.js`), then watch the Vercel dashboard.
**Expected:** Within approximately 10 seconds of the push, a new deploy appears in the Vercel dashboard and completes successfully without any manual trigger.
**Why human:** Auto-deploy is a Vercel project setting that becomes active only after the project is linked to the Git repository (DEPLOY.md section 3). Cannot be verified from the codebase.

#### 3. HTTP-to-HTTPS Redirect and HSTS Header

**Test:** In a browser or with `curl -I http://harmblocker.bg`, send an HTTP (non-TLS) request to the domain.
**Expected:** The response is a redirect to `https://harmblocker.bg`. On the HTTPS response, the headers include `strict-transport-security: max-age=63072000; includeSubDomains; preload`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, and a `permissions-policy` header.
**Why human:** HTTP→HTTPS redirect is a Vercel platform behaviour active only after a custom domain is added to the Vercel project. The HSTS and other security headers declared in `vercel.json` can only be confirmed in actual response headers from a live deployment.

---

### Gaps Summary

No structural gaps. All repo-side deliverables are complete, correct, and fully substantiated:

- `vercel.json` is present, parses cleanly, and contains the exact header set specified in the plan.
- `DEPLOY.md` is present, self-contained, and covers every user-action step end-to-end.
- Both HTML files are free of mixed-content resource loads.
- No build tooling was introduced.
- Commits 1653634 and fa949a9 exist in git history confirming the work was committed.

The three human-verification items (SC1, SC2, SC3) are live-deployment checks that cannot be confirmed from the repo. They are classified `human_needed` rather than `gaps_found` because the repo deliverables fully enable them — the only outstanding work is the user following DEPLOY.md.

The REQUIREMENTS.md traceability table already marks INFR-01, INFR-02, and INFR-05 as complete, which suggests the user has performed the live-deployment steps. If so, all three human-verification items above are confirmatory rather than blocking.

---

_Verified: 2026-04-23T19:30:00Z_
_Verifier: Claude (gsd-verifier)_
