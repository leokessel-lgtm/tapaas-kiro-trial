# Conditional question panel preview evidence

## Source

- Source library: `Templates - TaPaaS Design Library`
- Source context: Form input template `8410:37703`, conditional declaration `27:56000`, MPS eligibility branch inventory
- Evidence mode: current registry, relationship map, coverage matrix and existing preview tests

## Extraction summary

The source evidence supports a bounded conditional reveal pattern for local form branching. The current implementation is the existing `ConditionalQuestionPanel` in `src/tapaas-preview/index.tsx`.

## Anatomy

- Fieldset and legend for the controlling question.
- Native radio inputs.
- Optional visible error text associated to the fieldset.
- Conditional content that appears immediately after the radio group.

## States and variants

- Default unanswered state.
- Selected state.
- Error state.
- Conditional content visible when the selected value matches `showWhen`.

## Behaviour boundary

- Preview-only conditional reveal.
- No eligibility decisioning.
- No identity, concession, backend or policy rules.
- No persistence or routing.

## Classification and maturity

- Classification: `TaPaaS-specific composite`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`

## Unknowns

- Final branch labels and content.
- Field validation rules for real services.
- Focus announcement behaviour when conditional content appears.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Conditional Question Panel` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
