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

## Form composition patterns

For address input, use `Field` + `Input` for street, suburb and postcode, and `Field` + `Select` for state. Wrap in a `fieldset` with `legend`.

For date input, use 3 narrow `Input` fields (day xxs, month xxs, year sm) in a `fieldset` with `legend`. Include a hint showing the expected format (e.g. "For example, 15 03 1990"). Do not use a date picker. Do not add age or eligibility logic.

For multi-line text input, use the `Textarea` GEL preview component. Set a `maxLength` character limit where appropriate and show a character counter below the field.

