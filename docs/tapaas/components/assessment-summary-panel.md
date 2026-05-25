# Assessment summary panel preview evidence

## Source

- Source context: MPS eligibility, concession, review and confirmation frame groups
- Supporting evidence: GEL status-label evidence
- Evidence mode: current registry, relationship map, coverage matrix and existing preview implementation

## Extraction summary

The source evidence supports a bounded mock status and routing summary. The current implementation is the existing `AssessmentSummaryPanel` in `src/tapaas-preview/index.tsx`.

This promotion does not add eligibility, concession, payment, policy, backend, routing, analytics or production validation behaviour.

## Anatomy

- Card container with labelled heading.
- Definition-list style status rows.
- Label for each status item.
- Status value with neutral, good, warning or error tone.
- Optional supporting content below the rows.

## States and variants

- Neutral status value.
- Good status value.
- Warning status value.
- Error status value.

## Behaviour boundary

- Preview-only mock status display.
- No automated decisioning.
- No eligibility assessment.
- No concession validation.
- No payment routing or processing.
- No backend rules, analytics, persistence, legal, privacy or policy behaviour.

## Classification and maturity

- Classification: `GEL/TaPaaS composition`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`, `policy`

## Unknowns

- Final status labels and value vocabulary.
- Whether this pattern should appear on eligibility, review, outcome or back-office handoff pages.
- Real routing and recovery rules.
- Concession, payment and policy decision boundaries.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Assessment Summary Panel` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
