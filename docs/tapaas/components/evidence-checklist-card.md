# Evidence checklist card preview evidence

## Source

- Source context: MPS medical evidence frames `4.A`, `4.Aa`, `4.B` and `4.Ba`
- Supporting nodes: certificate nodes `0:17316`, `0:17333`; report nodes `0:17357`, `0:17370`
- Supporting evidence: GEL status-label evidence and GEL file-upload evidence
- Evidence mode: current registry, relationship map, coverage matrix and existing preview implementation

## Extraction summary

The source evidence supports a bounded static evidence status summary. The current implementation is the existing `EvidenceChecklistCard` in `src/tapaas-preview/index.tsx`.

This promotion does not add upload, remove-file, storage, validation, virus scanning, backend, medical assessment, privacy/security or production behaviour.

## Anatomy

- Card container with labelled heading.
- List of evidence items.
- Status pill for each item.
- Evidence item label.
- Optional item description.
- Optional supporting content below the list.

## States and variants

- `required`
- `provided`
- `not-required`
- `needs-review`

## Behaviour boundary

- Preview-only evidence status summary.
- Static mock states only.
- Not a GEL FileUpload implementation.
- No upload controls, remove-file controls, progress states, storage, file validation, virus scanning, backend integration or medical assessment.

## Classification and maturity

- Classification: `GEL/TaPaaS composition`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`, `privacy`

## Unknowns

- Final upload and remove-file states.
- File rules, file size limits and medical evidence wording.
- Privacy/security handling for evidence documents.
- Source inconsistencies across MPS medical evidence frames.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Evidence Checklist Card` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
