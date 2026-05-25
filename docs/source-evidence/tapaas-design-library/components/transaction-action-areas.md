# Transaction action areas preview evidence

## Source

- Source library: `Components - TaPaaS Design Library (Copy)`
- Transaction CTA source node: `27:34294`
- End-of-transaction CTA source node: `9:791`
- Supporting template: Confirmation step `5354:8224`
- Evidence mode: existing MCP partial extraction plus current coded usage across skeletons

## Extraction summary

The source evidence identifies reusable transaction action areas for in-flow navigation and end-of-transaction actions. The existing `TransactionCtaGroup` is now tracked as the preview implementation for this pattern.

## Anatomy

- Primary action group for Continue or Submit-style actions.
- Secondary action for Back where a prior step exists.
- Link-style Exit action where the transaction allows exit/cancel.
- End-of-transaction variant using Start again or return-style actions.

## States and variants

- Step actions: Continue, Back and Exit.
- End-of-transaction actions: Start another application and Return to Service NSW.
- Actions are optional based on supplied callbacks.

## Behaviour boundary

- Preview-only button grouping and callbacks.
- No real routing.
- No save, exit, logout, session or analytics behaviour.
- No transaction reset or persistence logic.

## Classification and maturity

- Classification: `GEL/TaPaaS composition`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`

## Unknowns

- Final routing destinations.
- Whether exit is always shown on each step.
- Final labels for end-of-transaction actions.
- Session handling, save behaviour and analytics requirements.
- Manual assistive-technology behaviour.

## Review notes

Use the isolated Storybook story `Transaction Action Areas` for review. This preview is not production-ready, WCAG-compliant, GEL-approved or TaPaaS-approved.
