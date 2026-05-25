# Transaction summary card preview evidence

## Source

- Source library: `Components - TaPaaS Design Library (Copy)`
- Component node: `10:1861`
- Supporting template: `Templates - TaPaaS Design Library`, Confirmation step `5354:8224`
- Evidence mode: existing MCP partial deep extraction plus current registry and relationship map

## Extraction summary

The source evidence identifies the Transaction summary card as a confirmation-step summary pattern for reference, receipt, address, email or payment-style rows.

The bounded implementation is the existing `TransactionSummaryCard` in `src/tapaas-preview/index.tsx`.

## Anatomy

- Card container with labelled heading.
- Label/value summary rows.
- Optional row-level help text.
- Optional extra receipt or confirmation content below rows.

## States and variants

- Static summary rows are implemented for this trial.
- Optional extra content is supported.
- Payment-style and service-specific receipt variants are not implemented as behaviour.

## Behaviour boundary

- Preview-only summary display.
- Mock reference and receipt details only.
- No receipt issuing, payment handling, notification sending, routing, backend or persistence.

## Classification and maturity

- Classification: `TaPaaS-specific composite`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`

## Unknowns

- Mandatory row model per transaction.
- Real reference number format.
- Receipt, payment-style and notification content rules.
- Mobile source parity and assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Transaction Summary Card` for catalogue review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
