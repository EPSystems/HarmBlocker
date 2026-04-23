# Phase 7: Pre-launch audit - Context

**Gathered:** 2026-04-23
**Status:** Ready for planning
**Mode:** Auto-generated (discuss skipped via workflow.skip_discuss)

<domain>
## Phase Boundary

Retroactive 6-pillar UI audit (/gsd:ui-review) over the shipped landing + success + legal pages. Every pre-launch-blocking finding must either be fixed or explicitly deferred with a recorded reason. Re-check confirms no regression against CLAUDE.md.

</domain>

<decisions>
## Implementation Decisions

### Audit Scope
- Targets: `index.html`, `success.html`, `privacy.html`, `terms.html`
- Baseline: CLAUDE.md (design system is the UI-SPEC equivalent)
- Audit method: code-only (no dev server — static HTML; audit runs on file content + design-system compliance)
- Output: `.planning/phases/07-pre-launch-audit/07-UI-REVIEW.md`

### Fix Policy
- Any finding scored 1/4 or 2/4 on any pillar → fix (or document deferral)
- Findings scored 3/4 → address if quick; document if not
- Findings scored 4/4 → no action

### Claude's Discretion
- Whether specific fixes are worth doing now vs deferring
- Priority order of fixes if multiple found

</decisions>

<code_context>
## Existing Code Insights

- 4 HTML pages shipped across Phases 1-6
- Design system heavily documented in CLAUDE.md
- No dev server running; audit is static analysis

</code_context>

<specifics>
## Specific Ideas

- CLAUDE.md is the design contract — the auditor should score against it
- Known deferred item from Phase 3: `og-image.svg` not shipped (referenced in OG tags on both pages) — can be called out in audit but is already documented as deferred

</specifics>

<deferred>
## Deferred Ideas

- Live visual screenshots (no dev server)
- Cross-browser testing
- Lighthouse/performance audit — not in scope for UI review

</deferred>
