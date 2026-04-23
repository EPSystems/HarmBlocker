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

2026-04-23: no mixed-content resource loads found in `index.html` or `success.html`. Both files reference only HTTPS external origins (`fonts.googleapis.com`, `fonts.gstatic.com`). The literal substring `http://` does appear once in `index.html` line 88 as the SVG XML namespace identifier (`xmlns="http://www.w3.org/2000/svg"`) — this is a name (required verbatim by the W3C SVG specification), not a URL fetched by the browser, and does not trigger mixed-content warnings. No code changes were needed.

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
