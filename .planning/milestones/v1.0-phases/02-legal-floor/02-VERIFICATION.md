---
phase: 02-legal-floor
verified: 2026-04-23T20:00:00Z
status: passed
score: 6/6 must-haves verified
re_verification: false
gaps: []
human_verification: []
---

# Phase 2: Legal Floor Verification Report

**Phase Goal:** The site carries the legal surface area required to charge Bulgarian consumers — Privacy Policy, Terms of Service with 14-day withdrawal, entity details in the footer, and an explicit cookie-banner decision.
**Verified:** 2026-04-23
**Status:** passed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | A visitor clicking the footer 'Поверителност' link from any page lands on a Bulgarian Privacy Policy page | VERIFIED | `privacy.html` exists at repo root; `lang="bg"` confirmed; `href="/privacy"` present in all four footers |
| 2 | A visitor clicking the footer 'Условия' link from any page lands on a Bulgarian Terms of Service page | VERIFIED | `terms.html` exists at repo root; `lang="bg"` confirmed; `href="/terms"` present in all four footers |
| 3 | The Terms of Service page contains an explicit, clearly-worded 14-day right-of-withdrawal clause citing Bulgarian ЗЗП / EU Directive 2011/83/EU | VERIFIED | `grep "14-дневно"` = 1 match; `grep "14 дни"` = 5 matches; `grep "ЗЗП"` = 2 matches; `grep "2011/83"` = 2 matches; full clause section present with blockquote template |
| 4 | The footer on every page shows the entity name, contact email, and registered address via grep-able placeholders | VERIFIED | All three tokens confirmed on all four pages: `__ENTITY_NAME__` (2+ hits each), `__ENTITY_ADDRESS__` (1+ hits each), `__CONTACT_EMAIL__` (1+ hits each) |
| 5 | A documented cookie-banner decision exists at .planning/phases/02-legal-floor/COOKIE-DECISION.md | VERIFIED | File exists; contains "cookieless" (4 hits), "Plausible", "Umami", "Fathom", "ANLY-02" (2 hits), "Phase 6" (4 hits), "When to revisit" section |
| 6 | Both legal pages visibly mark themselves as drafts requiring lawyer review (visible banner + HTML comment) | VERIFIED | `grep "LAWYER REVIEW REQUIRED BEFORE LAUNCH"` = 1 hit on both pages; `grep "Чернова"` = 1 hit on both pages; `.legal-banner` aside element present in both files |

**Score:** 6/6 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `privacy.html` | Bulgarian GDPR Privacy Policy draft | VERIFIED | Exists; contains ЧЕРНОВА banner, LAWYER REVIEW comment, all 3 entity placeholders, GDPR rights (6 listed with article cites), 3 third-party processors named, `lang="bg"` |
| `terms.html` | Bulgarian ToS draft with 14-day withdrawal clause | VERIFIED | Exists; contains ЧЕРНОВА banner, LAWYER REVIEW comment, 14-day clause with ЗЗП чл. 50–57 and Directive 2011/83/ЕС, copyable blockquote template, `lang="bg"` |
| `.planning/phases/02-legal-floor/COOKIE-DECISION.md` | Documented rationale for not shipping a cookie banner | VERIFIED | Exists; contains "cookieless", "Plausible", "Umami", "Fathom", "ANLY-02", "When to revisit" |
| `styles.css` | `.legal` / `.prose` / `.legal-banner` styles for long-form legal readability | VERIFIED | All three classes present + full prose typography block (.prose h2, h3, p, ul, a, blockquote, hr) + footer extension classes (.footer__brand, .footer__entity, .footer__copy) |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| index.html footer | privacy.html and terms.html | `href="/privacy"` and `href="/terms"` | WIRED | Both links present in index.html footer |
| success.html footer | privacy.html and terms.html | `href="/privacy"` and `href="/terms"` | WIRED | Both links present in success.html footer |
| privacy.html footer | terms.html and back to home | `href="/terms"`, `href="index.html"` | WIRED | `/terms` in footer nav; `index.html` in nav brand link |
| terms.html footer | privacy.html and back to home | `href="/privacy"`, `href="index.html"` | WIRED | `/privacy` in footer nav; `index.html` in nav brand link |
| terms.html body | privacy.html | `href="/privacy"` inline link in data-protection section | WIRED | Line 160 in terms.html: `<a href="/privacy">Политика за поверителност</a>` |

---

### Data-Flow Trace (Level 4)

Not applicable — all files are static HTML with no dynamic data rendering. Placeholder tokens (`__ENTITY_NAME__`, etc.) are intentional design-for-launch patterns, not stub data.

---

### Behavioral Spot-Checks

Static HTML only. No runnable entry points to spot-check beyond file existence and grep verification, which are all covered above.

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| LEG-01 | 02-legal-floor-01-PLAN.md | Privacy Policy page exists in Bulgarian, GDPR-compliant, linked from footer on every page | SATISFIED | `privacy.html` exists with Bulgarian GDPR content; footer link `/privacy` confirmed on all 4 pages |
| LEG-02 | 02-legal-floor-01-PLAN.md | Terms of Service page exists in Bulgarian, linked from footer on every page | SATISFIED | `terms.html` exists; footer link `/terms` confirmed on all 4 pages |
| LEG-03 | 02-legal-floor-01-PLAN.md | Terms of Service includes explicit 14-day right-of-withdrawal clause | SATISFIED | "14-дневно", "14 дни", "ЗЗП", "2011/83" all grep-confirmed; full clause with blockquote email template present |
| LEG-05 | 02-legal-floor-01-PLAN.md | Footer contains company/entity name, contact email, registered address | SATISFIED | `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__` confirmed on all 4 pages — intentional pre-launch placeholders per PROJECT.md directive |
| LEG-06 | 02-legal-floor-01-PLAN.md | Cookie consent banner evaluated — only shipped if analytics requires it | SATISFIED | COOKIE-DECISION.md documents "Not shipped" decision tied to Phase 6 cookieless analytics commitment |

---

### Anti-Patterns Found

| File | Pattern | Severity | Assessment |
|------|---------|----------|------------|
| privacy.html, terms.html, index.html, success.html | `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__` placeholder tokens | INFO | Intentional pre-launch swap tokens per PROJECT.md directive. Visible `.legal-banner` and HTML comment ensure they cannot be missed. Not a stub. |

No blocker or warning anti-patterns found. The placeholder tokens are by design, disclosed by visible draft banners on the legal pages, and documented in the SUMMARY as user-required pre-launch steps.

---

### Human Verification Required

None. All success criteria are verifiable programmatically via file existence and grep checks. Lawyer review of legal content quality is explicitly out of scope per the phase context directive — the HTML comment and visible Bulgarian draft banner delegate that to the appropriate professional before launch.

---

### Gaps Summary

No gaps. All 6 must-have truths verified, all 5 requirements satisfied, all key links wired, all artifacts substantive and wired.

---

_Verified: 2026-04-23_
_Verifier: Claude (gsd-verifier)_
