# Cookie Banner Decision

**Status:** Not shipped
**Decided:** 2026-04-23
**Owners:** Phase 2 (Legal floor) in coordination with Phase 6 (Measurement)
**Requirement:** LEG-06

## Decision

HarmBlocker ships **without** a cookie consent banner in v1.0 Launch-Ready.

## Reasoning

Under GDPR and the EU ePrivacy Directive, a cookie consent banner is required only when the site (a) sets cookies or other persistent identifiers that are not strictly necessary, or (b) embeds third-party scripts that do. As of Phase 2 the site sets no cookies of its own and runs no analytics. Phase 6 (Measurement) commits to a cookieless, privacy-first analytics tool — one of Plausible, Umami, or Fathom — all of which are designed to operate without cookies or persistent client identifiers (ref: ANLY-02 in REQUIREMENTS.md, and the Milestone 1 decision logged in STATE.md: "Cookieless analytics (Plausible/Umami/Fathom — chosen during Phase 6) to avoid cookie-banner tax").

The `__CONTACT_EMAIL__` link and the Stripe / Cal.com embeds are third-party interactions initiated by explicit user action (clicking a CTA or loading success.html's booking widget). Those services may set their own cookies under their own terms, and the Privacy Policy discloses this — but the site itself does not set consent-requiring storage, so no banner is triggered on the marketing-site surface.

Shipping a banner when none is required would add friction, contradict the brand's "Quiet Confidence" posture, and teach visitors that the site is surveilling them when in fact it is not.

## When to revisit

This decision must be re-opened if any of the following become true:

- Phase 6 selects an analytics tool that sets cookies or persistent identifiers (deviating from ANLY-02). Each candidate should be re-confirmed as cookieless at install time, not assumed.
- A future phase adds marketing pixels, embedded chat widgets, session replay, heatmap tools, A/B testing libraries, or any third-party script that drops consent-requiring storage.
- A future phase adds account/login state stored in cookies or localStorage tied to an identifier.
- Bulgarian or EU guidance clarifies that specific cookieless analytics implementations still require consent (regulatory drift).

Revisiting means: either remove the trigger, or ship a GDPR-compliant consent banner before the trigger goes live.

## Related

- `privacy.html` — Section "Бисквитки (cookies)" aligns with this decision and states plainly that the site sets no cookies.
- Phase 6 plan (not yet written) — must confirm the chosen analytics tool is cookieless before installation; if not, this decision is invalidated and a banner must ship with the analytics script.
- `.planning/STATE.md` — Decisions section records this alignment.
