# Interactive details card preview evidence

## Source

- Source library: `Components - TaPaaS Design Library (Copy)`
- Source context node: `2958:2499`
- Implementation boundary node: existing `InteractiveDetailsCard` preview component in `src/tapaas-preview/index.tsx`
- Evidence mode: current registry, relationship map, Storybook catalogue and selected maturity tests

## Extraction summary

The source evidence supports a bounded interactive context/details card with explicit actions. The current implementation is the existing `InteractiveDetailsCard`.

This promotion does not add routing, persistence, analytics, backend behaviour, identity logic or production validation.

## Anatomy

- Card container with labelled heading.
- Supporting description.
- Visual preview icon.
- Optional status pill.
- Label/value rows.
- Explicit action area.

## States and variants

- Static context rows.
- Status label.
- Primary, secondary and link-style preview actions.

## Behaviour boundary

- Preview-only action callbacks.
- No real navigation or route change.
- No persistence, analytics or backend action.
- No identity or customer-record behaviour.

## Classification and maturity

- Classification: `TaPaaS-specific composite`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`

## Unknowns

- Final action semantics.
- Focus expectations after action selection.
- Real route destinations.
- Whether this pattern should be used on input, review or context pages.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Interactive Details Card` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
