# HarmBlocker Landing Page

A calm, minimal landing page for a subscription service that blocks adult content and dating apps across a household's devices. Static — no build tools.

## Preview locally

Either open `index.html` directly in a browser, or serve the folder so fonts and relative paths behave like production:

```bash
# Python (any version with http.server)
python -m http.server 8080

# Node
npx serve .
```

Then visit http://localhost:8080.

## Files

- `index.html` — main landing page
- `success.html` — post-purchase "You're all set!" setup guide
- `styles.css` — design tokens + all component styles
- `script.js` — smooth anchor scroll, sticky-nav shadow, reveal-on-scroll
- `README.md` — this file

## Editing copy

All user-facing copy lives in `index.html` and `success.html`. To change price, headline, or benefits, edit those two files directly — no code paths to trace.

## Wiring real checkout

The two primary CTAs both link to `success.html` as a demo. To wire Stripe (or Paddle / Lemon Squeezy):

1. Open `index.html`.
2. Find the two `<a>` tags with `data-cta="hero"` and `data-cta="pricing"`.
3. Replace `href="success.html"` with your Checkout URL.
4. Configure your checkout provider's success redirect to point back to `success.html`.

## Design tokens

All colors, spacing, radii, and shadows are CSS custom properties defined at the top of `styles.css` (`:root` block). Adjust there to restyle the whole site.

## Deploy

Any static host works — Netlify drop, Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront. Upload the four files and you're live.
