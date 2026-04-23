---
plan: 05-post-purchase-handoff-01
phase: 05-post-purchase-handoff
wave: 1
depends_on: []
requirements: [POST-01, POST-03]
files_modified: [success.html, styles.css]
autonomous: true
---

# Phase 5 Plan 1: Post-purchase handoff — Cal.com embed + 14-day notice

## Objective

Add two surfaces to `success.html`: (1) an embedded Cal.com booking widget so a
customer stuck during DIY DNS setup can book a support call without leaving the
page, and (2) a visible 14-day right-of-withdrawal notice per LEG-04 / POST-03.
Both additions must preserve the "Quiet Confidence" design system — no new
design tokens, no new illustrations, no shadows, no pill shapes, no alarmist
legal language.

## Context

- @CLAUDE.md — design system contract (palette, type scale, spacing, signet-only illustration, editorial list/steps patterns)
- @.planning/PROJECT.md — brand voice ("тих", calm, non-shaming); placeholder strategy for third-party integrations (Cal.com uses `__CALCOM_BOOKING_URL__`)
- @.planning/phases/05-post-purchase-handoff/05-CONTEXT.md — phase boundary + preferred iframe embed pattern + brand-voice framing
- @.planning/REQUIREMENTS.md — POST-01 (Cal.com embed), POST-03 (14-day notice on success.html)
- @success.html — target page; currently has nav + success-hero + setup-steps + devices + help-card + footer
- @styles.css — design tokens live at top; `.price-note` already exists (from Phase 4) and should be reused verbatim

**Existing patterns to reuse (not reinvent):**
- `.section.section--surface.section--tight` — section container with paper-soft background + top/bottom hairlines
- `.section-head > .eyebrow.eyebrow--centered + .h2 + .lead` — editorial section head, already in use twice on success.html
- `<span class="serif-italic">` — single italic fragment inside h2
- `.price-note` — 0.8125rem Inter in `--ink-muted`, centered, amber-soft underlined links (from Phase 4)
- `.reveal` — scroll-reveal animation on major blocks

**What NOT to do:**
- Do NOT add a loader/skeleton for the Cal.com iframe (adds visual noise; conflicts with "тих")
- Do NOT add a "Don't see the calendar? Click here" banner (Cal.com handles its own empty states)
- Do NOT introduce new color tokens, radii, or fonts
- Do NOT add a box-shadow on the iframe frame — hairlines only
- Do NOT include the Cal.com hydration `<script>`; iframe fallback is simpler and lighter (context decision)

## Tasks

<task id="1" type="auto">

### Cal.com booking iframe section on `success.html`

Insert a new `<section>` between the existing `section--surface` devices block
and the `<footer>`. Use the reused section-head pattern, a brand-voice headline
with a single serif-italic fragment, a calm invitation as the lead, and an
iframe fallback against the `__CALCOM_BOOKING_URL__` placeholder with a visible
swap comment directly above.

<read_first>
- D:\Claude\HarmBlocker\success.html (confirm insertion point: after `</section>` closing the devices block, before `</main>`)
- D:\Claude\HarmBlocker\CLAUDE.md (section-head pattern, serif-italic rule)
- D:\Claude\HarmBlocker\.planning\phases\05-post-purchase-handoff\05-CONTEXT.md (exact iframe fallback recipe)
</read_first>

<action>
Edit `success.html`. After the devices `</section>` (line ~199) and before `</main>`, insert a new `<section class="section section--tight section--support">` containing:

1. `<div class="container">`
2. `<div class="section-head reveal">` with:
   - `<span class="eyebrow eyebrow--centered">Подкрепа</span>`
   - `<h2 class="h2">Ако ви <span class="serif-italic">трябва помощ.</span></h2>`
     (or equivalent brand-voice Bulgarian headline with exactly one serif-italic fragment — calm, тих, not a sales push)
   - `<p class="lead">` short Bulgarian invitation, e.g. `Запазете си кратък разговор. Сядаме заедно на настройката — без бързане, без технически език.`
3. Visible HTML swap comment (exact form below) directly above the frame
4. `<div class="calcom-frame reveal">` containing a single `<iframe>` with:
   - `src="https://cal.com/__CALCOM_BOOKING_URL__?embed=true"`
   - `loading="lazy"`
   - `title="Резервирайте разговор"` (accessible name — Bulgarian)
   - `allow="fullscreen"`
   - No `frameborder` attr (use CSS `border: 0`)

The swap comment MUST read substantively as:
```html
<!-- SWAP: replace __CALCOM_BOOKING_URL__ with your Cal.com booking link
     (e.g. "harmblocker/support-call"). Create a free account + event type at
     https://cal.com/ to get the slug. The iframe then loads
     https://cal.com/<your-slug>?embed=true — no JS hydration, no trackers. -->
```

Brand-voice copy checklist:
- Headline: ≤ 6 Bulgarian words, exactly one `<span class="serif-italic">` fragment, no exclamation marks
- Lead: 1 sentence, ≤ 20 words, invites rather than demands; mentions "без бързане" or equivalent calm tone
</action>

<acceptance_criteria>
- `grep -c 'section--support' D:/Claude/HarmBlocker/success.html` → ≥ 1
- `grep -c 'eyebrow--centered">Подкрепа' D:/Claude/HarmBlocker/success.html` → 1
- `grep -c 'class="serif-italic"' D:/Claude/HarmBlocker/success.html` → was 2, now 3 (new h2 adds one)
- `grep -c '__CALCOM_BOOKING_URL__' D:/Claude/HarmBlocker/success.html` → ≥ 2 (comment + iframe src)
- `grep -c 'SWAP:' D:/Claude/HarmBlocker/success.html` → ≥ 1 and that line references `cal.com`
- `grep -c 'loading="lazy"' D:/Claude/HarmBlocker/success.html` → ≥ 1
- `grep -c 'title="Резервирайте разговор"' D:/Claude/HarmBlocker/success.html` → 1
- No `<script` tag is added (iframe-only embed; `grep -c '<script' success.html` unchanged)
- New section sits between devices `</section>` and `</main>` (verify by line order)
</acceptance_criteria>

<done_when>
- Support section renders between devices block and footer, styled like other section-head sections
- Cal.com iframe loads https://cal.com/__CALCOM_BOOKING_URL__?embed=true (the placeholder will 404 on Cal.com, which is expected pre-swap — the frame itself is visible)
- Swap comment is unambiguous about where to get the slug
</done_when>

</task>

<task id="2" type="auto">

### 14-day withdrawal notice on `success.html`

Below the Cal.com iframe, still inside the same `.container` of the support
section, add a `.price-note` line stating the 14-day right of withdrawal from
the date of purchase, with a link to the ToS withdrawal anchor (`/terms#отказ`,
consistent with Phase 4's pre-purchase disclosure).

<read_first>
- D:\Claude\HarmBlocker\success.html (after Task 1 edit)
- D:\Claude\HarmBlocker\index.html (confirm `.price-note` usage pattern near pricing CTA — same class will be reused verbatim)
- D:\Claude\HarmBlocker\.planning\phases\04-checkout-live\04-checkout-live-01-SUMMARY.md (if present — confirm `/terms#отказ` anchor exists)
</read_first>

<action>
Inside the `.container` of `.section--support`, after the `.calcom-frame` div but still within the container, add a centered `.price-note` paragraph:

```html
<p class="price-note">14-дневно право на отказ от датата на покупката. <a href="/terms#отказ">Пълни условия</a>.</p>
```

- Use `.price-note` verbatim — do NOT invent a new class or token
- Keep the link anchor `/terms#отказ` (Bulgarian anchor, consistent with Phase 4 decision)
- Bulgarian copy, calm, single sentence + link
- Wrap in `.reveal` if it reads naturally as its own animated block, or keep inline — either is fine; prefer inline to avoid visual over-staging
</action>

<acceptance_criteria>
- `grep -c 'price-note' D:/Claude/HarmBlocker/success.html` → ≥ 1 (was 0)
- `grep -c 'terms#отказ' D:/Claude/HarmBlocker/success.html` → ≥ 1
- `grep -c '14-дневно' D:/Claude/HarmBlocker/success.html` → ≥ 1
- The `.price-note` paragraph sits AFTER `.calcom-frame` and BEFORE `</section>` of the support section
- No new CSS added for the notice (reuses existing `.price-note` styles)
</acceptance_criteria>

<done_when>
- On `success.html`, below the Cal.com iframe, a small muted line reads the 14-day disclosure with a clickable link to `/terms#отказ`
- Visual weight matches the pricing-card footnote on `index.html` (same class, identical styling)
</done_when>

</task>

<task id="3" type="auto">

### `.calcom-frame` CSS in `styles.css`

Add the minimal frame styles for the iframe wrapper. No new tokens. Reuse
existing tokens only. Place the rule inside the "Success page" section of
`styles.css` so it lives alongside `.setup-steps`, `.devices`, `.help-card`.

<read_first>
- D:\Claude\HarmBlocker\styles.css (find the end of the "Success page" section, around the `.return-home` rule; new rule goes just before `/* ---------- Reveal animations ---------- */`)
</read_first>

<action>
Append to the Success page CSS block (before the `.reveal` animation block):

```css
.calcom-frame {
  width: 100%;
  max-width: 760px;
  margin: var(--space-7) auto 0;
  min-height: 640px;
  background: var(--paper-soft);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.calcom-frame iframe {
  width: 100%;
  height: 100%;
  min-height: 640px;
  border: 0;
  display: block;
}
```

Notes on the choices:
- `max-width: 760px` — wider than `--max-w-prose` (640px) because Cal.com's month-view calendar needs horizontal room, but narrower than `--max-w` (1120px) to preserve the editorial centering feel. Token-free literal is acceptable when the value is widget-driven; do NOT introduce a new token for a one-off widget width.
- `min-height: 640px` — Cal.com's embedded view renders at roughly this height for a month + available-times column; avoids aspect-ratio scroll-clip surprises across breakpoints.
- `background: var(--paper-soft)` — matches the surface the section sits on visually while Cal.com loads; harmonizes with `.section--surface` pattern.
- `border: 1px solid var(--hairline)` + `--radius-md` — hairline, not shadow. Consistent with `.device`, `.help-card`, `.legal-banner`.
- `overflow: hidden` — clip the iframe to the rounded corners.

**No `.section--support` modifier rule needed** — `.section.section--tight` already provides correct top/bottom padding. If spacing feels off during manual check, prefer adjusting the section-head margin-bottom within the existing `--space-*` scale over introducing a new modifier.
</action>

<acceptance_criteria>
- `grep -c '\.calcom-frame' D:/Claude/HarmBlocker/styles.css` → 2 (wrapper rule + nested iframe rule)
- `grep -c 'calcom-frame iframe' D:/Claude/HarmBlocker/styles.css` → 1
- Rule uses only existing tokens: `--space-7`, `--paper-soft`, `--hairline`, `--radius-md` — no new tokens introduced (`grep -En '^\s*--[a-z]' styles.css` count unchanged)
- No `box-shadow`, no `background-image`, no new color added in the new rule
- New rule is positioned inside the Success page CSS block (before the Reveal animations section)
</acceptance_criteria>

<done_when>
- The Cal.com iframe on success.html is framed by a hairline-bordered, rounded, paper-soft panel with top spacing matching other major blocks on the page
- Opening the page at narrow (mobile), medium (~720px), and wide (~1120px) viewports shows the frame centered at 100% width up to 760px without overflowing the container
</done_when>

</task>

## Verification

After all tasks:

```bash
# 1. Support section present with all required parts
grep -n 'section--support\|eyebrow--centered">Подкрепа\|__CALCOM_BOOKING_URL__\|loading="lazy"\|title="Резервирайте разговор"' D:/Claude/HarmBlocker/success.html

# 2. 14-day notice present and linked
grep -n 'price-note\|14-дневно\|terms#отказ' D:/Claude/HarmBlocker/success.html

# 3. Iframe swap comment present
grep -n 'SWAP:.*CALCOM\|cal.com' D:/Claude/HarmBlocker/success.html

# 4. CSS rule present using only existing tokens
grep -n '\.calcom-frame' D:/Claude/HarmBlocker/styles.css

# 5. No new design tokens introduced
grep -cE '^\s*--[a-z]' D:/Claude/HarmBlocker/styles.css  # should match the pre-edit count
```

Open `success.html` in a browser (python -m http.server 8080) and visually
confirm:
- Support section reads as calm, editorial, consistent with the rest of the page
- Cal.com frame is visible (it will show Cal.com's 404/"link not found" view — expected for the placeholder)
- 14-day notice renders as a small muted line with an amber-underlined link

## Success Criteria

- [ ] `success.html` has a `<section class="section section--tight section--support">` positioned between devices block and `</main>`
- [ ] Section uses the existing `.section-head` pattern with `eyebrow--centered` = "Подкрепа"
- [ ] h2 contains exactly one `<span class="serif-italic">` fragment in the new section
- [ ] Iframe has `src` containing `__CALCOM_BOOKING_URL__`, `loading="lazy"`, and a Bulgarian `title`
- [ ] A visible HTML swap comment mentions `__CALCOM_BOOKING_URL__` and `cal.com` with onboarding instructions
- [ ] 14-day `.price-note` is present on success.html linking to `/terms#отказ`
- [ ] `.calcom-frame` + nested `iframe` CSS rule is added to styles.css using only existing tokens
- [ ] No new design tokens, no shadows, no new colors introduced
- [ ] No `<script>` tag added for Cal.com (iframe-only embed)

## Must-haves (terse)

- Cal.com iframe present on success.html with `__CALCOM_BOOKING_URL__` placeholder
- Support section has eyebrow "Подкрепа", h2 with one serif-italic fragment, lead — matches design system
- 14-day notice on success.html linking to `/terms#отказ`
- No new design tokens introduced
