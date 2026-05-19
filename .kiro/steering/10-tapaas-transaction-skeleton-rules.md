# TaPaaS transaction skeleton rules

Use these rules when building repeatable Service NSW transaction skeletons from TaPaaS templates.

## Default page order

1. Privacy
2. Search or input
3. Declaration
4. Review
5. Confirmation

Use this order unless the supplied transaction evidence clearly requires another sequence.

## Page rules

- Use mock data only unless a safe backend path already exists.
- Keep the prototype visibly non-production.
- Do not add payment, identity proofing, fraud, eligibility or complex policy logic.
- Use the existing GEL preview components for basic controls.
- Use `src/tapaas-preview/` only for TaPaaS composite patterns.
- Keep every page small enough for engineering review.

## Required evidence

Every page must record:

- source Figma file
- source page or node ID
- maturity label
- assumptions
- unknowns
- risky content that needs owner confirmation

