# Review info card preview evidence

## Source

- Source library: `Components - TaPaaS Design Library (Copy)`
- Component node: `18:4448`
- Supporting template: `Templates - TaPaaS Design Library`, Review step `8143:15161`
- Evidence mode: existing MCP partial deep extraction plus current registry and relationship map

## Extraction summary

The source evidence identifies the Review info card as a TaPaaS-specific review-page data playback pattern with editable/non-editable variants, horizontal/stacked layouts and label/content emphasis variants.

The bounded implementation is the existing `ReviewInfoCard` in `src/tapaas-preview/index.tsx`.

## Anatomy

- Card container with labelled heading.
- Optional section-specific edit action.
- One or more review sections.
- Label/value summary rows.
- Optional row-level help text.

## States and variants

- Stacked review rows are implemented for this trial.
- Optional edit action is available for review surfaces where a route exists.
- Horizontal and emphasis variants are not implemented in this preview.

## Behaviour boundary

- Preview-only review playback.
- No real edit routing.
- No persistence or validation engine.
- No backend, identity, eligibility, payment, legal, privacy or policy behaviour.

## Classification and maturity

- Classification: `TaPaaS-specific composite`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`

## Unknowns

- Final row data model.
- Which variants are required for broader reuse.
- Real edit destinations and route labels.
- Mobile source parity and assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Review Info Card` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
