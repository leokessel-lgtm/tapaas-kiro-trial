# Privacy and Terms transaction template

## Status

TaPaaS rule from Clara feedback.

This is the default privacy-and-terms structure for TaPaaS transactions unless a documented privacy/legal exception requires a different treatment.

## Principle

Privacy and Terms serve different jobs:

- Privacy Collection Notice informs the customer.
- Terms and Conditions are accepted by the customer.

The design should not create extra friction for the Privacy Collection Notice unless privacy/legal explicitly requires it.

## Rule

For TaPaaS transactions, the privacy page should include:

1. Privacy Collection Notice card
2. Terms and Conditions section
3. Terms and Conditions checkbox
4. Notifications or receipt copy, where relevant
5. Continue action
6. Exit action

Do not add a checkbox for the Privacy Collection Notice by default.

## Kiro/Codex implementation instruction

When generating a privacy page:

- Use one reusable privacy-and-terms page pattern.
- Keep the PCN card and Terms and Conditions as separate sections.
- Put the checkbox under Terms and Conditions only.
- Use transaction-specific wording only where the rule allows it, such as the Terms checkbox label or notification/receipt copy.
- Keep legal/privacy copy placeholders clearly outside customer UI unless the placeholder text is explicitly intended for the customer.
- Do not invent final privacy, legal or policy wording.

## Approved example

For a permit-style transaction:

- Show a PCN card with the correct privacy source/link.
- Show Terms and Conditions with the relevant link.
- Ask the customer to accept the Terms and Conditions.
- Tell the customer what notification or receipt they will receive, if applicable.
- Provide Continue and Exit actions.

## Anti-pattern

Do not:

- add a checkbox that says the customer accepts the Privacy Collection Notice
- combine privacy and terms into one undifferentiated block
- omit Terms and Conditions where the transaction requires acceptance
- render owner-confirmation notes or mock-only notes as customer-facing page content
- imply the page has legal/privacy sign-off from this prototype

## Acceptance check

- Privacy Collection Notice card is present.
- Terms and Conditions section is present where required.
- Only the Terms and Conditions acceptance uses a checkbox.
- Notification/receipt copy is present where the transaction needs it.
- Error state links target the Terms checkbox when it is not accepted.
- No customer-facing privacy/legal placeholder notes are rendered.

## Caveats / owner-confirmation items

- Confirm which privacy page elements are legal/privacy requirements versus reusable UX structure.
- Confirm whether notification/receipt copy is always present or conditional by service.
- Confirm any privacy/legal exception that requires a different treatment.
