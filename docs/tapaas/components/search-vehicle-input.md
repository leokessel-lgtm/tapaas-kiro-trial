# Search vehicle input preview evidence

## Source

- Source context: Templates library search/input page `16274:18397`
- Component evidence: Search vehicle input `22:16683`
- Evidence mode: repo-recorded source evidence and current coded preview
- Storybook target: `tapaas-components-choices-inputs--search-vehicle-input`

## Extraction summary

The source evidence supports a static search-first input with an adjacent action button. The current implementation is `TapaasSearchAction` in `src/tapaas-preview/index.tsx`.

This preview does not add search behaviour, validation, result states, backend lookup, API integration, vehicle matching, persistence or production routing.

## Anatomy

- Labelled input for a NSW plate number.
- Help text below the label.
- Input and action button grouped on the same row when space allows.
- Static action label.

## States and variants

- Static default state only.
- No confirmed validation, loading, no-result, result-list or backend-error states.

## Behaviour boundary

- Preview-only static input/action composition.
- No lookup is performed.
- No vehicle data is retrieved, matched, stored or validated.
- No backend or API behaviour is represented.

## Classification and maturity

- Classification: `TaPaaS-specific composite`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`

## Unknowns

- Exact interaction contract.
- Final validation and error copy.
- Result and no-result states.
- Loading or disabled states.
- Vehicle lookup backend and privacy/security handling.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Search Vehicle Input` for catalogue review only. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
