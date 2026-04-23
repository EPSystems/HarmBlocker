---
phase: 01-production-floor
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - vercel.json
  - DEPLOY.md
autonomous: true
requirements:
  - INFR-01
  - INFR-02
  - INFR-05

must_haves:
  truths:
    - "A request to harmblocker.bg over HTTPS loads index.html with a valid certificate (user-verifiable after DNS handoff)"
    - "A commit pushed to main triggers an automatic Vercel deploy (user-verifiable after Vercel project creation)"
    - "HTTP requests to the domain redirect to HTTPS and responses carry HSTS and conservative hardening headers"
    - "Neither index.html nor success.html loads any resource over http:// — no mixed-content"
    - "The repo contains a documented handoff the user can follow end-to-end to register the domain, create the Vercel project, and point DNS"
  artifacts:
    - path: "vercel.json"
      provides: "Static-host configuration: security headers, cleanUrls, trailingSlash"
      contains: "headers"
    - path: "DEPLOY.md"
      provides: "User-action handoff: Vercel project creation, Hostinger DNS records, domain verification checklist"
      contains: "Hostinger"
  key_links:
    - from: "vercel.json"
      to: "response headers on every deployed route"
      via: "Vercel's headers config block"
      pattern: "\"source\".*\"/(.*)\""
    - from: "DEPLOY.md"
      to: "vercel.json"
      via: "DNS + Vercel-project setup references the shipped config"
      pattern: "vercel\\.json"
    - from: "index.html and success.html"
      to: "only HTTPS origins (fonts.googleapis.com, fonts.gstatic.com)"
      via: "<link> and <script> tags use https:// or protocol-relative sources"
      pattern: "http://"
---

<objective>
Stand up the production-floor repo deliverables for Phase 1 so the user can ship this static site to Vercel at harmblocker.bg over HTTPS with auto-deploy from main.

The phase boundary is deliberate: domain purchase, Vercel project creation, and DNS configuration are user actions. This plan ships only what the repo owns — a minimal vercel.json that hardens HTTP response headers, enables clean URLs for future legal pages, and normalizes trailing slashes; plus a DEPLOY.md that walks the user through the exact Vercel + Hostinger steps so nothing about the handoff is guessed.

Purpose: unblock requirements INFR-01 (domain pointed at host), INFR-02 (auto-deploy from main), INFR-05 (HTTPS enforced, no mixed content) with the smallest, most honest change possible.

Output:
- vercel.json at repo root (new)
- DEPLOY.md at repo root (new) with the full user-action handoff
- Confirmation note that index.html / success.html carry no http:// references (audit task, code-change only if audit fails — current read shows fonts are already HTTPS, so no fix is expected)
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-production-floor/01-CONTEXT.md
@CLAUDE.md
@index.html
@success.html

<interfaces>
<!-- Current HTTPS-critical asset references in both HTML files. -->
<!-- Executor should grep against these to verify the asset-origin audit. -->
<!-- Expected state (already true as of this plan): both files use https:// only. -->

From index.html (head):
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter..." rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  <script src="script.js" defer></script>

From success.html (head):
  (identical font-loading block to index.html)
  <link rel="stylesheet" href="styles.css" />
  <script src="script.js" defer></script>

Relative references (styles.css, script.js) are fine — they inherit page protocol (https:// in production).
The only external origins are fonts.googleapis.com and fonts.gstatic.com, both hardcoded https://.
</interfaces>

<decisions>
<!-- Locked decisions from CONTEXT.md that every task must honor. -->
- Hosting: Vercel. Domain: Hostinger. Canonical domain: harmblocker.bg.
- Deliverables are repo-only. NO tasks that create Vercel accounts, register domains, or touch DNS.
- vercel.json must be MINIMAL — only security headers, cleanUrls: true, trailingSlash: false. No functions, no rewrites, no redirects beyond the platform defaults, no env vars.
- HSTS is emitted by Vercel automatically on custom domains; vercel.json adds the complementary X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers.
- Clean URLs matters for Phase 2 (privacy.html, terms.html served at /privacy, /terms). Ship it now so Phase 2 doesn't need to touch config.
</decisions>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create vercel.json at repo root with security headers and clean-URL config</name>
  <files>vercel.json</files>
  <read_first>
    - D:\Claude\HarmBlocker\.planning\phases\01-production-floor\01-CONTEXT.md (specifics section — lists the exact header set to ship)
    - D:\Claude\HarmBlocker\CLAUDE.md (confirms no build tools, static-only posture)
    - Check repo root has no existing vercel.json: glob for vercel.json from D:\Claude\HarmBlocker\
  </read_first>
  <action>
    Create D:\Claude\HarmBlocker\vercel.json with EXACTLY this content (no comments — Vercel does not parse JSON comments):

    ```json
    {
      "$schema": "https://openapi.vercel.sh/vercel.json",
      "cleanUrls": true,
      "trailingSlash": false,
      "headers": [
        {
          "source": "/(.*)",
          "headers": [
            {
              "key": "X-Content-Type-Options",
              "value": "nosniff"
            },
            {
              "key": "Referrer-Policy",
              "value": "strict-origin-when-cross-origin"
            },
            {
              "key": "Permissions-Policy",
              "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()"
            },
            {
              "key": "Strict-Transport-Security",
              "value": "max-age=63072000; includeSubDomains; preload"
            }
          ]
        }
      ]
    }
    ```

    Notes for the executor on WHY each value:
    - `cleanUrls: true` — lets Phase 2 legal pages live at /privacy and /terms without .html extensions, no .html redirect logic needed now.
    - `trailingSlash: false` — normalizes URL shape so fonts.googleapis.com/x and fonts.googleapis.com/x/ don't both appear in analytics later.
    - `X-Content-Type-Options: nosniff` — stops MIME sniffing; cheap defense against content-type confusion.
    - `Referrer-Policy: strict-origin-when-cross-origin` — matches modern browser defaults but explicit for older clients and auditors.
    - `Permissions-Policy` — conservatively disables camera/mic/geolocation (site doesn't use them); `interest-cohort=()` opts out of FLoC/Topics, aligns with the privacy-first brand posture.
    - `Strict-Transport-Security` (HSTS) — `max-age=63072000` (2 years), `includeSubDomains`, `preload`. Vercel adds HSTS automatically on custom domains, but emitting it explicitly means the value is in-repo and reviewable; Vercel will honor the header we set. The `preload` flag is set so the user can optionally submit the domain to hstspreload.org post-launch (documented in DEPLOY.md).

    Do NOT add: `functions`, `rewrites`, `redirects`, `env`, `build`, `routes` (deprecated). The CONTEXT.md deferred-ideas section explicitly rules these out for Phase 1.
  </action>
  <verify>
    <automated>node -e "const c = require('D:/Claude/HarmBlocker/vercel.json'); if (c.cleanUrls !== true) throw new Error('cleanUrls not true'); if (c.trailingSlash !== false) throw new Error('trailingSlash not false'); if (!Array.isArray(c.headers) || c.headers.length === 0) throw new Error('headers missing'); const keys = c.headers[0].headers.map(h => h.key); for (const required of ['X-Content-Type-Options','Referrer-Policy','Permissions-Policy','Strict-Transport-Security']) { if (!keys.includes(required)) throw new Error('missing header: ' + required); } console.log('OK');"</automated>
  </verify>
  <acceptance_criteria>
    - File D:\Claude\HarmBlocker\vercel.json exists and parses as valid JSON (addresses INFR-02, INFR-05)
    - `cleanUrls` is `true` (grep: `"cleanUrls": true`)
    - `trailingSlash` is `false` (grep: `"trailingSlash": false`)
    - Header array for source `/(.*)` contains keys: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` (grep each literal string)
    - HSTS max-age is at least 63072000 (grep: `"max-age=63072000`)
    - File contains no `functions`, `rewrites`, `redirects`, or `env` keys (grep for absence)
  </acceptance_criteria>
  <done>vercel.json exists at repo root, parses cleanly, and emits the four hardening headers on every path; Vercel's zero-config static host will pick it up on next deploy without any further setup.</done>
</task>

<task type="auto">
  <name>Task 2: Audit index.html and success.html for mixed-content (http://) references</name>
  <files>index.html, success.html</files>
  <read_first>
    - D:\Claude\HarmBlocker\index.html (full file — already loaded in this plan's interfaces section)
    - D:\Claude\HarmBlocker\success.html (full file — already loaded in this plan's interfaces section)
  </read_first>
  <action>
    This is a verification task. Current reading of both files shows every external reference uses `https://` (fonts.googleapis.com, fonts.gstatic.com). No fix is expected — but the audit must be recorded.

    Steps:

    1. Run these greps from D:\Claude\HarmBlocker\ (use the Grep tool, not bash grep):
       - Pattern: `http://` (case-insensitive), files: `index.html`, `success.html`
       - Pattern: `src="http:` and `href="http:` (confirming no http-prefixed resource references exist)
       - Pattern: `https://` to confirm the external origins present are all HTTPS

    2. Expected result: ZERO matches for `http://` inside either file (ignoring lines that are part of `https://` — the Grep tool counts `http://` as a literal substring, so `https://` should NOT match `http://` because of the colon-slash-slash anchoring).

    3. Use Grep with `-n` and case-sensitive match for the exact substring `http://` (not a regex that allows the `s`). The pattern to use is literally `http://` as the search string. If the tool returns matches, inspect each: any match where the URL begins `http://` (not `https://`) is a mixed-content source and MUST be fixed by rewriting the URL to `https://`.

    4. If the audit finds NO http:// references: make NO code changes to either HTML file. The audit result is the deliverable.

    5. If the audit finds http:// references (not expected): rewrite each to https://. Do not remove the resource. Do not add a new resource. Change only the protocol.

    6. Record the audit outcome as a one-line comment at the top of DEPLOY.md (Task 3) in the "Asset audit" section. Either: "Audit 2026-04-23: no mixed-content references found in index.html or success.html." or the list of changes made.

    Do NOT:
    - Add any new external resources to either HTML file.
    - Change any copy, markup, or styles.
    - Introduce Subresource Integrity (SRI) hashes — that's a later optimization, not an INFR-05 requirement.
    - Inline the Google Fonts CSS — out of scope.
  </action>
  <verify>
    <automated>node -e "const fs = require('fs'); for (const f of ['D:/Claude/HarmBlocker/index.html','D:/Claude/HarmBlocker/success.html']) { const s = fs.readFileSync(f,'utf8'); const matches = s.match(/http:\/\//gi) || []; if (matches.length > 0) { throw new Error(f + ' contains ' + matches.length + ' http:// reference(s) — mixed content'); } } console.log('OK: no http:// references in either file');"</automated>
  </verify>
  <acceptance_criteria>
    - Running Grep for `http://` against `D:\Claude\HarmBlocker\index.html` returns zero matches (addresses INFR-05)
    - Running Grep for `http://` against `D:\Claude\HarmBlocker\success.html` returns zero matches (addresses INFR-05)
    - Running Grep for `https://fonts.googleapis.com` against `D:\Claude\HarmBlocker\index.html` returns at least one match (confirms fonts are HTTPS)
    - No structural or content edits made to either HTML file unless a mixed-content source was found
    - Audit outcome is recorded in DEPLOY.md (Task 3) under an "Asset audit" heading
  </acceptance_criteria>
  <done>Both HTML files are confirmed to reference only HTTPS origins; the audit result is captured in DEPLOY.md; no mixed-content warning will appear in the browser console on production.</done>
</task>

<task type="auto">
  <name>Task 3: Write DEPLOY.md documenting Vercel + Hostinger user-action handoff</name>
  <files>DEPLOY.md</files>
  <read_first>
    - D:\Claude\HarmBlocker\.planning\phases\01-production-floor\01-CONTEXT.md (user-action placeholders section — lists the exact user tasks)
    - D:\Claude\HarmBlocker\.planning\PROJECT.md (Key Decisions — Vercel + Hostinger + harmblocker.bg)
    - D:\Claude\HarmBlocker\CLAUDE.md (preview command + no-build-tools posture)
    - D:\Claude\HarmBlocker\vercel.json (just created in Task 1 — DEPLOY.md references it)
    - Audit outcome from Task 2
  </read_first>
  <action>
    Create D:\Claude\HarmBlocker\DEPLOY.md with the content below. This is the user-action handoff. It must be self-contained: a first-time deployer should be able to follow it without asking questions. Written in English (this is internal documentation, not user-facing Bulgarian copy).

    ```markdown
    # Deploy guide — HarmBlocker

    Production floor for `harmblocker.bg`. Static HTML/CSS/JS on Vercel, DNS
    at Hostinger. No build step, no framework. The repo ships a minimal
    `vercel.json` (see repo root) and nothing else — everything below is a
    user action that needs to happen once.

    ---

    ## 1. What this repo ships

    - `vercel.json` — static-host config: security headers (HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`), `cleanUrls: true`, `trailingSlash: false`
    - `index.html`, `success.html` — the two pages
    - `styles.css`, `script.js` — assets

    No build step. Vercel deploys the raw files.

    ## 2. Asset audit

    {replace-me} — insert audit outcome from Task 2. Either:
    - `2026-04-23: no mixed-content references found in index.html or success.html.`
    - OR the list of http:// → https:// fixes made.

    ## 3. Create the Vercel project

    Option A — dashboard (recommended for first deploy):

    1. Go to https://vercel.com/new
    2. Import this Git repository
    3. Framework preset: **Other** (no build settings needed)
    4. Root directory: `.` (repo root)
    5. Build command: leave empty
    6. Output directory: leave empty (Vercel serves the repo root as static)
    7. Click **Deploy**

    Option B — CLI:

    ```
    npm i -g vercel
    cd <this-repo>
    vercel          # first time: log in, link to new project
    vercel --prod   # promotes the current deploy to production
    ```

    After the first deploy:
    - Every push to `main` auto-deploys to production (INFR-02 satisfied).
    - Every push to any other branch creates a preview deployment — fine, no config change needed.
    - Vercel gives you a `*.vercel.app` URL immediately. Custom domain is next.

    ## 4. Point Hostinger DNS at Vercel

    In the Vercel project → **Settings → Domains**:

    1. Click **Add Domain**, enter `harmblocker.bg`
    2. Vercel shows the DNS records you need. Typical values:
       - **Apex** (`harmblocker.bg`): A record → `76.76.21.21`
       - **www** (`www.harmblocker.bg`): CNAME → `cname.vercel-dns.com`
    3. Note: Vercel sometimes rotates the apex A-record IP. Always copy the IP Vercel shows you in the dashboard at the moment you configure DNS — do not hardcode the value above without confirming.

    In Hostinger → **Domains → harmblocker.bg → DNS / Nameservers → Manage DNS**:

    1. Delete any existing A record on `@` (apex) that points elsewhere.
    2. Add A record:
       - Host: `@`
       - Value: (the IP from Vercel's Add-Domain screen)
       - TTL: 3600 (or leave default)
    3. Add CNAME record:
       - Host: `www`
       - Value: `cname.vercel-dns.com`
       - TTL: 3600
    4. Save.

    DNS propagation takes 5 minutes to a few hours. Vercel's domain panel shows a green check when it sees the records.

    ## 5. HTTPS + HSTS

    - Vercel issues a free Let's Encrypt certificate automatically once the domain resolves. No action needed.
    - Vercel redirects `http://` to `https://` automatically.
    - `vercel.json` emits `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` on every response.
    - **Optional post-launch:** once the site has been stable on HTTPS for a week, submit the domain at https://hstspreload.org to get it baked into browser HSTS preload lists. Only do this when you are sure — removal from the list takes months.

    ## 6. Verify the production floor

    After DNS propagates:

    1. Visit `https://harmblocker.bg` → `index.html` loads, certificate is valid (padlock in address bar).
    2. Visit `http://harmblocker.bg` → redirects to `https://harmblocker.bg`.
    3. Open browser devtools → Network → reload `index.html` and `success.html`. Confirm:
       - No mixed-content warnings in the Console tab.
       - Response headers on the document request include `strict-transport-security`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, and a `permissions-policy` header.
    4. Push a small commit to `main` (e.g., bump a comment). Watch Vercel dashboard — a new deploy should start automatically within ~10 seconds.

    ## 7. Local preview (reference)

    From the repo root:

    ```
    python -m http.server 8080
    # open http://localhost:8080
    ```

    Local preview serves over plain HTTP — this is expected and does not trigger the HSTS/mixed-content checks (those apply only to the production origin).

    ## 8. What is NOT set up here

    Explicit out-of-scope for Phase 1:

    - Stripe / Cal.com / analytics — Phases 4, 5, 6.
    - Privacy Policy, Terms of Service, cookie banner — Phase 2.
    - SEO metadata (OpenGraph, favicon, sitemap.xml, robots.txt) — Phase 3.
    - Preview deployment URL protection, password auth, team members — default Vercel behavior is fine.
    - Any kind of CI / tests — no tests exist yet.

    ## 9. If something breaks

    - Domain stuck on "Invalid Configuration" in Vercel: DNS hasn't propagated, or the record points to the wrong target. Re-check Hostinger values against what Vercel shows.
    - Site loads but no HSTS header: deploy hasn't picked up `vercel.json`. Trigger a redeploy from the Vercel dashboard.
    - Push to main didn't trigger a deploy: Vercel project is not linked to the Git repo — re-link from Settings → Git.
    ```

    Then, replace `{replace-me}` in the "Asset audit" section with the actual one-liner produced by Task 2. If Task 2's audit was clean (expected), write: `2026-04-23: no mixed-content references found in index.html or success.html.`

    Do NOT:
    - Write this file in Bulgarian — DEPLOY.md is internal documentation; user-facing copy in `index.html`/`success.html` stays Bulgarian.
    - Embed API keys, tokens, env vars, or project IDs — the user handles those in the Vercel dashboard.
    - Add screenshots — text-only is sufficient and easier to maintain.
    - Document Netlify or Cloudflare Pages alternatives — Vercel is locked per PROJECT.md Key Decisions.
  </action>
  <verify>
    <automated>node -e "const fs = require('fs'); const s = fs.readFileSync('D:/Claude/HarmBlocker/DEPLOY.md','utf8'); for (const term of ['Vercel','Hostinger','harmblocker.bg','vercel.json','cname.vercel-dns.com','Strict-Transport-Security','cleanUrls','http-equiv'.replace('-equiv','').slice(0,0)||'http://','main','Asset audit']) { if (!s.includes(term)) throw new Error('DEPLOY.md missing term: ' + term); } if (s.includes('{replace-me}')) throw new Error('DEPLOY.md still contains the {replace-me} audit placeholder'); if (s.length < 2000) throw new Error('DEPLOY.md too short — expected full handoff'); console.log('OK');"</automated>
  </verify>
  <acceptance_criteria>
    - File D:\Claude\HarmBlocker\DEPLOY.md exists at repo root (addresses INFR-01, INFR-02, INFR-05 — the user-action handoff for all three)
    - Contains the literal strings: `Vercel`, `Hostinger`, `harmblocker.bg`, `vercel.json`, `cname.vercel-dns.com`, `Strict-Transport-Security`, `cleanUrls`, `Asset audit`, `main` (grep each)
    - Contains instructions for both Vercel dashboard AND CLI setup paths
    - Contains explicit DNS record values (A record for apex, CNAME for www pointing at `cname.vercel-dns.com`)
    - Contains the HTTP→HTTPS redirect verification step
    - Contains a "what is NOT set up here" section listing Phase 2–6 deferrals
    - Does NOT contain the placeholder `{replace-me}` — the audit line from Task 2 is in place
    - Does NOT mention Netlify or Cloudflare Pages (Vercel is locked)
    - File length is at least 2000 characters (sanity check that full handoff was written)
  </acceptance_criteria>
  <done>DEPLOY.md is on disk, readable, and contains enough detail for the user to complete domain registration confirmation, Vercel project creation, Hostinger DNS configuration, and production verification without asking follow-up questions.</done>
</task>

</tasks>

<verification>
Phase-level checks (run by checker or user after execute-phase):

1. `node -e "require('D:/Claude/HarmBlocker/vercel.json')"` — vercel.json parses as valid JSON.
2. Grep `http://` inside `index.html` and `success.html` — zero matches (no mixed content).
3. `DEPLOY.md` exists and contains `Vercel`, `Hostinger`, `harmblocker.bg`, `cname.vercel-dns.com`.
4. Git status shows three new tracked paths: `vercel.json`, `DEPLOY.md`, and the updated `.planning/` entries.
5. Repo still has zero `package.json`, zero build step, zero framework config — "no build tools" constraint is preserved.

Phase success criteria mapping (from ROADMAP.md Phase 1):

- **SC1** (domain loads index.html over HTTPS with valid cert): covered by DEPLOY.md sections 3–5; verifiable by user after DNS + Vercel setup.
- **SC2** (push to main triggers auto-deploy): covered by DEPLOY.md section 3; default Vercel behavior once the project is linked.
- **SC3** (HTTP redirects to HTTPS with HSTS): covered by `vercel.json` Strict-Transport-Security header + Vercel's automatic HTTP→HTTPS redirect, documented in DEPLOY.md section 5.
- **SC4** (no mixed-content warnings): covered by Task 2's audit + DEPLOY.md section 6 verification step.
</verification>

<success_criteria>
This plan is complete when:

- [ ] `vercel.json` exists at repo root with `cleanUrls: true`, `trailingSlash: false`, and the four hardening headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) applied to source `/(.*)`.
- [ ] Grep confirms zero `http://` substrings in `index.html` and `success.html`.
- [ ] `DEPLOY.md` exists, covers Vercel project creation (both dashboard and CLI), Hostinger DNS configuration (apex A record + www CNAME), HTTPS/HSTS behavior, production verification steps, and Phase 2–6 out-of-scope callouts.
- [ ] No `package.json`, no build tooling, no framework files introduced.
- [ ] No changes to `index.html`, `success.html`, `styles.css`, `script.js` (unless Task 2's audit surfaced an unexpected mixed-content source, which is not anticipated).
- [ ] Requirements INFR-01, INFR-02, INFR-05 have a clear path to being satisfied once the user executes DEPLOY.md.
</success_criteria>

<output>
After completion, create `.planning/phases/01-production-floor/01-production-floor-01-SUMMARY.md` documenting:
- vercel.json contents shipped
- Asset audit result (clean or fixes applied)
- DEPLOY.md key sections (for quick reference during Phase 2–7 planning)
- Any deviations from this plan (expected: none)
</output>
