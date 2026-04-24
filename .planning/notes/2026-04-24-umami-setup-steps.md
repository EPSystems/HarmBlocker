---
date: "2026-04-24 00:00"
promoted: false
---

Umami setup steps — do this when the domain is registered and the site is on Vercel.

## 1. Add the website in Umami

In Umami dashboard: Settings → Websites → + Add website.
- Name: HarmBlocker
- Domain: harmblocker.bg (or whatever the production domain ends up being)

## 2. Grab the tracking script

After adding, click the website row → "Tracking code" tab. Look for:

```html
<script defer src="https://cloud.umami.is/script.js"
        data-website-id="XXXX-XXXX-XXXX-XXXX"></script>
```

Copy the `data-website-id` UUID.

## 3. Paste the UUID back to Claude and ask to swap

Tell Claude the UUID (and if it's the EU region `eu.umami.is` instead of `cloud.umami.is`, mention that). Claude will then:

- Swap the Plausible `<script>` in `index.html` + `success.html` → Umami script
- Convert CTA tracking classes from `class="plausible-event-name=CTA+Click plausible-event-position=hero"` → `data-umami-event="CTA Click" data-umami-event-position="hero"` attributes
- Commit as `chore: swap analytics from Plausible to Umami`

## 4. Verify

After deploy + a handful of visits, check Umami dashboard:
- Pageviews should show up for `/` and `/success`
- Clicking either CTA should record a "CTA Click" event with `position` = `hero` or `pricing`

## Open question (pre-swap)

- Confirm EU vs US region before swap — matters for the script `src`
- If self-hosting Umami later, swap `src` to own URL
