# System error page

## Source

- source_context_node: `17628:2069`
- source file: `Templates - TaPaaS Design Library.fig`
- source basis: Figma template evidence recorded in `docs/tapaas/02-page-template-registry.md`
- implementation_boundary_node: `SystemErrorPage` preview component in `src/tapaas-preview/index.tsx`

## Classification

- artefact type: page skeleton / review-gated pattern
- classification: TaPaaS page template
- maturity: coded-preview
- validation_status: static acceptance, Storybook acceptance, unit tests, build, parity and diff checks passed
- review_reason: engineer, accessibility, owner

## Anatomy

- technical hard-stop alert block
- title, message and guidance copy
- optional mock reference
- retry, start-again and logout action positions
- preview boundary text for unresolved recovery behaviour

## Behaviour Boundary

This preview is static and callback-only. It does not implement retry, recovery routing, logout/session handling, backend checks, operational ownership, storage, analytics or production validation.

## Unknowns

- real system error taxonomy
- retry and recovery rules
- start-over route behaviour
- logout/session rules
- operational ownership and support wording
- assistive-technology behaviour

## Acceptance

- isolated Storybook story: `System Error Page`
- targeted tests: `src/tapaas-preview/SelectedMaturityComponents.test.tsx`
- acceptance manifest entry: `system-error-page`

No production readiness, WCAG compliance, GEL approval, TaPaaS approval, legal approval, privacy approval or policy approval is claimed.
