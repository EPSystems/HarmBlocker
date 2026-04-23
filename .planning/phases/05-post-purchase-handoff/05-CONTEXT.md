# Phase 5: Post-purchase handoff - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

A paying customer lands on `success.html` and can (a) book a support call via an embedded Cal.com widget, and (b) see their 14-day withdrawal right clearly disclosed. Both additions preserve the "Quiet Confidence" layout — no new illustrations, no alarmist legal language, no cartoonish booking banners.

</domain>

<decisions>
## Implementation Decisions

### Cal.com Embed Pattern
- Use Cal.com's **official embed snippet** — a `<script>` that hydrates a `<div data-cal-link="__CALCOM_BOOKING_URL__">` trigger, OR a direct `<iframe src="https://cal.com/__CALCOM_BOOKING_URL__?embed=true">` fallback
- Preferred: the `<iframe>` fallback — simpler, no runtime JS, no Cal.com tracker hydration, lighter
- Placeholder: `__CALCOM_BOOKING_URL__` (e.g., would resolve to something like `yourname/15min` after user swaps)
- Add a visible HTML comment above the embed with swap instructions:
  ```html
  <!-- SWAP: replace __CALCOM_BOOKING_URL__ with your Cal.com booking link (e.g., "harmblocker/support-call").
       Get it from https://app.cal.com after creating a free account + event type.
       The iframe will then load https://cal.com/__CALCOM_BOOKING_URL__?embed=true -->
  ```
- Position: a new section on `success.html`, AFTER the setup steps, BEFORE the footer — framed by an eyebrow label + h2 headline in brand voice, no hard-sell

### Section Framing (brand voice)
- Eyebrow: `ПОДКРЕПА` (or equivalent — calm)
- Headline: something like "Ако имате нужда от помощ." — one serif-italic fragment, тих
- Lead: short sentence inviting the booking — no urgency
- Cal.com iframe: `width: 100%; min-height: 600px; border: 1px solid var(--hairline); border-radius: var(--radius-md); background: var(--paper-soft);`
- Loading state: `loading="lazy"` on the iframe so it doesn't block initial paint

### 14-Day Withdrawal Notice (Post-Purchase)
- Position: a small notice directly BELOW the Cal.com section (or in the footer area above the main footer — whichever reads more natural)
- Text: brand-voice, calm, Bulgarian. E.g.:
  "14-дневно право на отказ от дата на покупката. [Пълни условия](/terms#отказ)."
- Style: matches the `.price-note` style from Phase 4 — 0.8125rem Inter, `--ink-muted`, centered

### Claude's Discretion
- Exact Bulgarian copy for the support section headline + lead
- Exact framing of the 14-day notice on success.html
- Whether to use Cal.com's inline embed script or the iframe fallback (pick one, document in SUMMARY)

</decisions>

<code_context>
## Existing Code Insights

- `success.html` currently has: nav, hero with signet seal, setup steps section, footer
- After Phase 3's copy rewrite, the steps describe real DIY DNS/router flow
- `styles.css` has `.price-note` (from Phase 4) which can be reused for the 14-day notice on success.html — either move it to a shared class name or reuse as-is
- No existing iframe styles — will need minimal CSS for the Cal.com frame

</code_context>

<specifics>
## Specific Ideas

- Do NOT add a loader/skeleton for the Cal.com iframe — Cal.com loads fast, and a skeleton adds visual noise that conflicts with "Quiet Confidence"
- Do NOT add a "Don't see the calendar? Click here" fallback banner — Cal.com handles its own error states
- The section-head pattern already in success.html (eyebrow + h2 + lead) should be reused verbatim — consistency

</specifics>

<deferred>
## Deferred Ideas

- Pre-filling the Cal.com booking with the customer's email from Stripe session_id — post-launch (requires JS to read URL params + pass to Cal.com)
- Cal.com webhook integration to notify the team of new bookings — user configures in Cal.com dashboard, not in this repo
- A native form fallback if Cal.com is unreachable — YAGNI for v1

</deferred>
