# Legal info accordion preview evidence

## Source

- Source library: `Components - TaPaaS Design Library (Copy)`
- Source context node: `22:35625`
- Implementation boundary node: existing `LegalInfoAccordion` preview wrapper in `src/tapaas-preview/index.tsx`
- Evidence mode: current registry, relationship map, Storybook catalogue and selected maturity tests

## Extraction summary

The source evidence identifies the Legal info accordion as a TaPaaS-specific composite using GEL accordion behaviour. The current implementation is the existing `LegalInfoAccordion` wrapper with placeholder content.

This promotion does not add final legal, privacy or policy wording and does not approve hiding critical content in an accordion.

## Anatomy

- Section container with heading.
- GEL accordion behaviour.
- Legal/privacy information sections.
- Placeholder content requiring owner confirmation.

## States and variants

- Collapsed accordion section.
- Expanded accordion section.
- Default placeholder privacy, terms and notification sections.

## Behaviour boundary

- Preview-only accordion wrapper.
- Placeholder content only.
- No final legal/privacy/policy wording.
- No approval that critical content may be collapsed.

## Classification and maturity

- Classification: `TaPaaS-specific composite using GEL accordion behaviour`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`, `privacy`, `policy`

## Unknowns

- Final legal/privacy/policy wording.
- Whether each section may be collapsed.
- Treatment for required or critical content.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Legal Info Accordion` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
