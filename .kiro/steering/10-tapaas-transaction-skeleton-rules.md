# TaPaaS transaction skeleton rules

Use these rules when building repeatable Service NSW transaction skeletons from TaPaaS templates.

## Default page order

1. Privacy
2. Search or input
3. Declaration
4. Review
5. Confirmation

Use this order unless the supplied transaction evidence clearly requires another sequence.

## Multi-step transactions

For transactions with more than 5 steps, insert additional form input pages between Privacy and Declaration. Each form page maps to template `8410:37703`. Keep each page focused on one topic (e.g. applicant, contact, details, supporting information). The step indicator should show the total step count accurately.

For transactions with 6 or more steps, a visual progress indicator may improve user orientation. Do not build a custom stepper unless it maps to a confirmed TaPaaS or GEL component. Use the text step indicator with aria-live until a pattern is confirmed.

Use the source-backed GEL ProgressStepper only for 4 to 6-step flows. For longer flows, keep text step indication unless a confirmed TaPaaS/GEL long-flow progress pattern is documented.

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

