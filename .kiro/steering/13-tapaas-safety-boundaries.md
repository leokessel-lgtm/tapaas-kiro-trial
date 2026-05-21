# TaPaaS safety boundaries

Apply these rules to Privacy, Declaration, Review and Confirmation pages.

## Privacy

- Do not invent privacy collection notices.
- Use placeholders where agency, purpose, disclosure or retention details are unknown.
- Mark privacy wording for owner confirmation.

## Declaration

- Do not invent legal declarations.
- Do not soften or remove obligations without human review.
- Required declaration controls must have visible labels and validation.

## Review

- Show only mock data unless source data is available.
- Do not imply payment has happened.
- Do not submit to real services.

## Confirmation

- Use mock reference numbers and timeframes only.
- Mark expected processing times for confirmation.
- Do not claim the user is eligible, approved or entitled unless source evidence confirms it.

## Error and exit outcomes

- Business error pages must be hard-stop outcomes with source-confirmed rules, recovery wording and reference formats.
- In trial skeletons, use mock business-error content only and label it as simulated.
- Exit confirmation must use the source-backed `ExitModal` preview, not an inline notice, when the flow is intended to test exit behaviour.
- Do not claim modal, error-page or focus behaviour is production approved without engineering and accessibility review.

## Global boundary

Do not claim production readiness, formal WCAG compliance, legal approval, privacy approval, policy approval or GEL compliance.
