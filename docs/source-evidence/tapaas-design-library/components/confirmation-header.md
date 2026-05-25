# Confirmation header

## Source

- source_context_node: `9:10494`
- source file: `Components - TaPaaS Design Library (Copy).fig`
- source basis: Figma component status recorded as `READY FOR BUILD`
- implementation_boundary_node: existing `ConfirmationHeader` preview component in `src/tapaas-preview/index.tsx`

## Classification

- artefact type: component / catalogue-only
- classification: GEL variant
- maturity: coded-preview
- validation_status: static acceptance, Storybook acceptance, unit tests, build, parity and diff checks passed
- review_reason: engineer, accessibility, owner

## Anatomy

- transaction name kicker
- success/status icon treatment
- past-tense confirmation heading
- status semantics for transaction-complete preview state

## Behaviour Boundary

The component only displays a mock completion/status header. It does not prove submission, approval, reference creation, notification, receipt, backend persistence, payment or production outcome handling.

## Unknowns

- exact icon treatment
- final transaction name source
- whether role/status behaviour is sufficient for the target transaction
- mobile pixel parity
- assistive-technology behaviour

## Acceptance

- isolated Storybook story: `Confirmation Header`
- targeted tests: `src/tapaas-preview/SelectedMaturityComponents.test.tsx`
- acceptance manifest entry: `confirmation-header`

No production readiness, WCAG compliance, GEL approval, TaPaaS approval, legal approval, privacy approval or policy approval is claimed.
