# Details card

## Source

- source_context_node: `2413:787`
- source file: `Components - TaPaaS Design Library (Copy).fig`
- source basis: Figma component evidence recorded in the component registry and intake catalogue
- implementation_boundary_node: existing `DetailsCard` preview component in `src/tapaas-preview/index.tsx`

## Classification

- artefact type: component / catalogue-only
- classification: TaPaaS-specific composite
- maturity: coded-preview
- validation_status: static acceptance, Storybook acceptance, unit tests, build, parity and diff checks passed
- review_reason: engineer, accessibility, owner

## Anatomy

- card container
- heading and optional description
- optional status label
- label/value rows
- optional local action link/button

## Behaviour Boundary

The card is read-only context/detail display. The optional action is callback-only in preview and does not include route, edit, account, identity, persistence, analytics or backend behaviour.

## Unknowns

- final status-label treatment
- whether actions are allowed in each transaction context
- real action destination and focus return behaviour
- mobile pixel parity
- assistive-technology behaviour

## Acceptance

- isolated Storybook story: `Details Card`
- targeted tests: `src/tapaas-preview/SelectedMaturityComponents.test.tsx`
- acceptance manifest entry: `details-card`

No production readiness, WCAG compliance, GEL approval, TaPaaS approval, legal approval, privacy approval or policy approval is claimed.
