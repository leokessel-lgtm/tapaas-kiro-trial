# TaPaaS component selection rules

Use these rules before creating or reusing a TaPaaS component.

## Prefer this order

1. Existing GEL preview component from `src/gel.ts`
2. Existing page-level composition using GEL components
3. TaPaaS preview composite from `src/tapaas-preview/`
4. New TaPaaS preview composite, only when documented and repeated

## Classification

Classify every TaPaaS component as one of:

- `GEL-aligned`
- `GEL variant`
- `TaPaaS-specific`
- `unresolved`

Classify maturity as one of:

- `proven`
- `draft`
- `needs engineer review`
- `design-only`

## Do not build

Do not build components that involve:

- unconfirmed legal declarations
- payment processing
- identity proofing
- backend-only business rules
- unreviewed modal focus behaviour
- unreviewed card-radio accessibility behaviour

