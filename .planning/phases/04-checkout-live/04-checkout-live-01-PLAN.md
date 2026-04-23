---
plan: 04-checkout-live-01
phase: 04-checkout-live
wave: 1
depends_on: []
requirements: [CHKT-01, CHKT-02, CHKT-03, CHKT-04, LEG-04]
files_modified: [index.html, terms.html, styles.css]
autonomous: true
---

# Phase 4 Plan 01: Checkout live

## Objective

Swap both `data-cta` anchor hrefs in `index.html` to a clearly-marked Stripe
Checkout placeholder, add grep-findable HTML swap-instruction comments above
each CTA, surface a single-line 14-day withdrawal disclosure directly below
the pricing CTA (linking to `/terms#отказ`), verify the `отказ` anchor exists
in `terms.html`, and add a small `.price-note` style in `styles.css` using
only existing design tokens. No backend, no JavaScript, no new fonts, no
new colors.

## Context

- @CLAUDE.md — "Quiet Confidence" design system (single amber accent, paper/ink palette, hairlines not shadows, Inter for UI text)
- @.planning/phases/04-checkout-live/04-CONTEXT.md — phase boundary, Stripe swap pattern, 14-day disclosure copy direction
- @.planning/ROADMAP.md — Phase 4 success criteria (CHKT-01..04, LEG-04 pre-purchase half)
- @.planning/REQUIREMENTS.md — CHKT-01..04 and LEG-04 definitions
- @index.html — both CTAs live here, carrying `data-cta="hero"` and `data-cta="pricing"`
- @terms.html — 14-day withdrawal clause (needs verified `id="отказ"` anchor)
- @styles.css — design tokens + all component styles

## Tasks

### Task 1: Swap CTA hrefs + add swap-instruction comment blocks

<type>auto</type>

<read_first>
- @index.html (lines 83-95 hero CTA, lines 336-346 pricing CTA)
</read_first>

<action>
In `index.html`, change BOTH CTA anchor hrefs from `"success.html"` to
`"__STRIPE_CHECKOUT_URL__"` and immediately above EACH CTA insert an HTML
comment block covering the four swap instructions.

Preserve:
- `data-cta="hero"` and `data-cta="pricing"` attributes (Phase 6 analytics)
- `btn btn--primary btn--large` classes
- Arrow SVG and existing button copy
- All surrounding structure (hero__cta wrapper, pricing card)

Comment block template (same for both CTAs, placed immediately above `<a ...>`):

```html
<!-- SWAP: replace __STRIPE_CHECKOUT_URL__ with your live Stripe Checkout URL.
     Configure success URL → https://harmblocker.bg/success?session_id={CHECKOUT_SESSION_ID}
     Configure cancel URL  → https://harmblocker.bg/#pricing
     Product: 3€/mo EUR recurring subscription -->
```

The comment must contain the strings `__STRIPE_CHECKOUT_URL__`, `session_id`,
and `cancel` so the grep-verifiable acceptance checks find them.
</action>

<acceptance_criteria>
- `grep -c 'href="__STRIPE_CHECKOUT_URL__"' index.html` returns `2`
- `grep -c 'data-cta="hero"' index.html` returns `1` (preserved)
- `grep -c 'data-cta="pricing"' index.html` returns `1` (preserved)
- `grep -c 'SWAP: replace __STRIPE_CHECKOUT_URL__' index.html` returns `2`
- `grep -c 'session_id={CHECKOUT_SESSION_ID}' index.html` returns `2`
- `grep -c 'Configure cancel URL' index.html` returns `2`
- `grep -c 'href="success.html"' index.html` returns `0`
</acceptance_criteria>

<done_when>
Both CTAs point at the Stripe placeholder URL, both carry the swap comment
with all three marker strings (`__STRIPE_CHECKOUT_URL__`, `session_id`,
`cancel`), `data-cta` attributes preserved, no `success.html` hrefs remain
on CTAs.
</done_when>

---

### Task 2: Add 14-day disclosure line directly below pricing CTA

<type>auto</type>

<read_first>
- @index.html (lines 336-349 pricing-card CTA + existing `.price-card__small`)
</read_first>

<action>
In `index.html`, insert a new `<p class="price-note">` element
IMMEDIATELY AFTER the pricing CTA closing `</a>` and BEFORE (or adjacent to)
the existing `.price-card__small`. The line must:

- Be ONE short Bulgarian sentence, calm, brand-voice ("Quiet Confidence")
- Link the word "условия" (or equivalent) to `/terms#отказ`
- Not be alarmist, not be a warning banner, not use urgency language
- Sit as a small editorial note beneath the CTA

Suggested copy (adjust only lightly to match voice):

```html
<p class="price-note">
  14-дневно право на отказ. <a href="/terms#отказ">Виж условия</a>.
</p>
```

Keep the existing `.price-card__small` line ("Отказ по всяко време — един
имейл е достатъчен.") — it's different information (cancellation-anytime,
not 14-day statutory withdrawal). Place `.price-note` BETWEEN the CTA and
the existing `.price-card__small` so the editorial order reads:
  CTA → 14-day disclosure → cancel-anytime small print.
</action>

<acceptance_criteria>
- `grep -c 'class="price-note"' index.html` returns `1`
- `grep -c 'href="/terms#отказ"' index.html` returns `1`
- `grep -c '14-дневно право на отказ' index.html` returns `1`
- The `.price-note` element appears inside the `.price-card` block, after the pricing CTA, before `.price-card__small`
- The existing `.price-card__small` line is untouched
</acceptance_criteria>

<done_when>
Visiting the pricing section shows a single small line directly under the
"Започнете сега" button: "14-дневно право на отказ. Виж условия." with
"условия" hyperlinked to `/terms#отказ`. The existing cancel-anytime note
remains below it.
</done_when>

---

### Task 3: Verify / add the `отказ` anchor in terms.html

<type>auto</type>

<read_first>
- @terms.html (section "Право на отказ в рамките на 14 дни" near line 97)
</read_first>

<action>
Verify `terms.html` contains an element with `id="отказ"` on (or adjacent to)
the "Право на отказ в рамките на 14 дни" `<h2>` heading.

Current state (from read): the `<h2>Право на отказ в рамките на 14 дни</h2>`
does NOT have an `id` attribute. Add one: `<h2 id="отказ">Право на отказ в
рамките на 14 дни</h2>`.

Do not restructure the section, do not rename the heading, do not add
decorative anchor-link glyphs. Minimal change — single attribute addition.
</action>

<acceptance_criteria>
- `grep -c 'id="отказ"' terms.html` returns `1`
- The `id="отказ"` is on the `<h2>` whose text is "Право на отказ в рамките на 14 дни"
- No other structural changes to `terms.html`
- `href="/terms#отказ"` from `index.html` (Task 2) resolves to this heading
</acceptance_criteria>

<done_when>
The 14-day heading in `terms.html` carries `id="отказ"` and the Task-2 link
from the pricing section jumps to it when followed.
</done_when>

---

### Task 4: Add `.price-note` style in styles.css

<type>auto</type>

<read_first>
- @styles.css (existing `.price-card__small` at lines 712-718 for scale reference)
- Design tokens at `:root` (lines 55-102)
</read_first>

<action>
Append a minimal `.price-note` block to `styles.css` in the Pricing section
(near `.price-card__small`). Use only existing tokens.

```css
.price-note {
  margin-top: var(--space-4);
  font-size: 0.8125rem;
  color: var(--ink-muted);
  text-align: center;
  letter-spacing: 0.005em;
}

.price-note a {
  color: var(--ink-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--amber-soft);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.price-note a:hover {
  color: var(--ink);
  border-bottom-color: var(--amber);
}
```

Rules this respects:
- No new color tokens (only `--ink-muted`, `--amber-soft`, `--amber`, `--ink`)
- No new spacing token (only `--space-4`)
- No pill, no shadow, no tinted background
- Link treatment mirrors the footer `.footer__entity-meta a` hairline-amber
  pattern already established in the codebase
</action>

<acceptance_criteria>
- `grep -c '\.price-note {' styles.css` returns `1`
- `grep -c '\.price-note a {' styles.css` returns `1`
- `grep -c '\.price-note a:hover {' styles.css` returns `1`
- Only existing tokens referenced (no new `--foo` definitions added)
- No `box-shadow`, no `border-radius: 999`, no `background:` on `.price-note`
</acceptance_criteria>

<done_when>
`styles.css` contains a `.price-note` rule sized at 0.8125rem in
`--ink-muted`, centered, with an amber-hairline underline on its link that
strengthens on hover. No new tokens introduced.
</done_when>

---

## Verification

After all four tasks:

- Open `index.html` in a browser at `http://localhost:8080/`
- Both CTAs render unchanged visually (same black pill with amber arrow)
- Inspecting the hero CTA shows `href="__STRIPE_CHECKOUT_URL__"` and the
  swap HTML comment immediately above
- Inspecting the pricing CTA same as above
- Directly under the "Започнете сега" button there is a small muted-gray
  line with "14-дневно право на отказ. Виж условия." and "условия" is
  underlined in amber
- Clicking "условия" navigates to `/terms#отказ` and lands at the 14-day
  withdrawal heading
- Existing "Отказ по всяко време — един имейл е достатъчен." remains below
  the new disclosure

## Success Criteria

1. Both `data-cta` anchors in `index.html` point to `__STRIPE_CHECKOUT_URL__`
   and are preceded by a 4-line HTML comment containing all three marker
   strings (`__STRIPE_CHECKOUT_URL__`, `session_id`, `cancel`).
2. A 14-day disclosure line sits directly below the pricing CTA, linked
   to `/terms#отказ`, styled as muted small print — not a banner.
3. `terms.html` has `id="отказ"` on the 14-day heading; the pricing-section
   link resolves.
4. `styles.css` gains a `.price-note` rule and nothing else; no new tokens,
   no new colors, no shadows.
5. All four commits atomic, in the `feat(04-checkout-live-01):` /
   `style(04-checkout-live-01):` / `chore(04-checkout-live-01):` family.

## Output

- `index.html` — CTA hrefs swapped, swap comments added, 14-day disclosure line added
- `terms.html` — `id="отказ"` on the withdrawal heading
- `styles.css` — `.price-note` rule appended
- SUMMARY at `.planning/phases/04-checkout-live/04-checkout-live-01-SUMMARY.md`
