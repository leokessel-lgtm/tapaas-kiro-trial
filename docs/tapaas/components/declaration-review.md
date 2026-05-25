# Declaration review preview evidence

## Source

- Source library: `Components - TaPaaS Design Library (Copy)`
- Source context node: `27:38386`
- Implementation boundary node: existing `DeclarationReview` preview component in `src/tapaas-preview/index.tsx`
- Evidence mode: current registry, relationship map, coverage matrix and selected maturity tests

## Extraction summary

The source evidence supports bounded declaration playback for review pages. The current implementation is the existing `DeclarationReview`, with card and accordion variants.

This promotion does not add final declaration, legal, privacy or policy wording and does not add submission validation behaviour.

## Anatomy

- Section container with labelled heading.
- Introductory playback text.
- One or more declaration sections.
- Declaration statement list.
- Card or accordion presentation variant.

## States and variants

- Card variant.
- Accordion variant.
- Mock accepted declaration statements.

## Behaviour boundary

- Preview-only declaration playback.
- Placeholder wording only.
- No legal interpretation.
- No privacy or policy approval.
- No submission validation behaviour.

## Classification and maturity

- Classification: `TaPaaS-specific composite`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`, `privacy`, `policy`

## Unknowns

- Final declaration statements.
- Whether declarations should play back as card, accordion or another treatment.
- Legal/privacy/policy content ownership.
- Checkbox validation semantics in the source transaction.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Declaration Review` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
