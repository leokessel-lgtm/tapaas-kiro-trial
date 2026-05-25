# Exit modal preview evidence

## Source

- Source library: `Templates - TaPaaS Design Library`
- Source node: Exit modal `4677:1042`
- Evidence mode: current registry, relationship map, page-template registry and existing preview tests

## Extraction summary

The source evidence supports a bounded exit-confirmation modal pattern. The current implementation is the existing `ExitModal` in `src/tapaas-preview/index.tsx`.

## Anatomy

- Dialog with accessible name and description.
- Primary continue action.
- Exit action.
- Preview description text.
- Modal backdrop and dialog container.

## States and variants

- Open state is implemented.
- Escape dismissal is implemented through the continue callback.
- Basic tab-wrap smoke coverage exists for the two modal actions.
- Authenticated and unauthenticated copy variants remain owner-gated.

## Behaviour boundary

- Preview-only exit confirmation.
- No real save-draft behaviour.
- No logout or session handling.
- No routing, analytics or persistence.

## Classification and maturity

- Classification: `GEL/TaPaaS modal pattern`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`

## Unknowns

- Final exit wording for each transaction context.
- Authenticated versus unauthenticated variants.
- Real route destinations and state-reset behaviour.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Exit Modal` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
