# Stepper and page structure rules

## Status

TaPaaS rule from Clara feedback, with one unresolved Trial permit source inconsistency.

## Principle

Progress indicators should help customers understand meaningful stages. They should not be generated from page count alone.

## Rule

Use a progress stepper only when the transaction has enough meaningful stages to justify orientation.

When a stepper is used:

- labels must match canonical page names
- confirmation must be excluded
- generated labels such as "Step 1 of 9" must not appear unless approved by TaPaaS
- labels must remain stable across default and error states
- mobile and desktop behaviour must follow the approved pattern

## Kiro/Codex implementation instruction

Before adding or removing a stepper:

1. Identify the transaction outcome type.
2. Count meaningful customer stages, not internal states.
3. Confirm canonical page labels.
4. Confirm whether confirmation is outside the stepper.
5. Check default and error states for consistency.

Do not create a separate step for a short declaration unless the declaration needs a separate page for content, legal or storage reasons.

## Approved examples

### Trial permit

Transaction-specific example:

- Clara said the short flow would not need a stepper.
- The PDF error-state screen includes a 4-step progress indicator.
- Treat the Trial permit stepper as unresolved until Clara confirms the intended rule.

### Accessible market permit

TaPaaS staged-flow rule / transaction example:

1. Privacy
2. Your details
3. Market stall details
4. Additional details
5. Review

Confirmation is excluded.

## Anti-pattern

Do not:

- use a stepper just because there are multiple rendered screens
- include confirmation as a step
- generate "Step 1 of 9" summaries from internal routes
- let default and error states use different stepper structures
- duplicate the page title as desktop step text unless TaPaaS approves it

## Acceptance check

- Stepper presence is justified by meaningful staged work.
- Confirmation is not included.
- Labels match canonical page names.
- Default and error states match.
- Trial permit unresolved stepper contradiction is called out before implementation.
- Accessible market permit labels are confirmed before implementation.

## Caveats / owner-confirmation items

- Ask Clara whether Trial permit should have no stepper despite the PDF error-state stepper.
- Confirm canonical Accessible market permit step labels.
- Confirm the blue-line/current-step behaviour Clara was unsure about.
- Confirm mobile stepper behaviour separately if implementation proceeds.
