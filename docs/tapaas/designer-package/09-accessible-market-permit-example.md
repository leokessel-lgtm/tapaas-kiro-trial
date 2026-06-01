# Accessible Market Permit example

## Status

Canonical longer, submitted-for-review TaPaaS transaction example for this trial.

This is Clara-aligned trial guidance, not production approval.

## Outcome type

Submitted for review.

The confirmation pattern should communicate that the application has been submitted, then explain review, outcome notification and permit or document delivery where the service pattern supports it.

## Flow shape

Accessible Market Permit has meaningful staged work, so it should use a progress stepper.

Canonical stepper labels:

1. Privacy
2. Your details
3. Market stall details
4. Additional details
5. Review

Confirmation is excluded from the stepper.

Do not use generated labels such as `Step 1 of 9`.

Stepper labels must remain stable across default and error states.

## Privacy page

Use the TaPaaS privacy-and-terms template:

- Privacy Collection Notice
- Terms and Conditions
- Terms and Conditions checkbox
- notifications or receipt copy where relevant
- Exit
- Continue

Do not add a Privacy Collection Notice checkbox by default.

## Your details

Authenticated personal details are read-only playback from Account/Profile or verified identity source.

Do not recapture profile-owned personal details by default.

If contact or address details are needed, classify them before implementation:

| Detail type | Treatment |
|---|---|
| Profile playback | Show read-only. |
| Profile update | Send the customer to the owning Account/Profile surface where known. |
| Transaction-specific capture | Capture inside the transaction and explain why it is needed. |
| Unknown | Mark as owner-confirmation item. |

Do not silently make the transaction a profile-management surface.

## Market stall details

Capture transaction-specific details:

- market name
- market type
- event date
- accessibility/support needs

Control-choice guidance:

- market type should use the control that fits the option set, likely select/dropdown for longer lists
- date help text must state the expected format
- support-needs description should be conditional on Yes unless an approved visible-but-conditional pattern is documented
- character limit guidance should appear where a long text response is expected

## Additional details

Additional information should contain:

- market-stall services description
- declaration

Do not create a fee-style table, fee card or fee keyline unless fees exist.

## Review

Review should mirror completed sections:

- Your details
- Market stall information
- Additional information
- Privacy

Use one edit affordance per section.

## Confirmation

Confirmation should be submitted-for-review:

- heading communicates submitted outcome
- summary includes receipt number and transaction date
- Keep a record is present
- Next steps explain review, outcome notification and permit/document delivery where confirmed
- feedback affordance appears where applicable

## Storybook surface

Use this Storybook ID:

- `tapaas-transactions--accessible-market-permit-clara-aligned`

Related rule stories:

- `tapaas-transaction-rules--privacy-and-terms`
- `tapaas-transaction-rules--stepper-and-page-structure`
- `tapaas-transaction-rules--authenticated-profile-playback`
- `tapaas-transaction-rules--validation-and-control-choice`
- `tapaas-transaction-rules--review-pages`
- `tapaas-transaction-rules--confirmation-pages`
- `tapaas-transaction-rules--annotation-boundaries`

## Review checklist

- [ ] Five canonical stepper labels are present.
- [ ] Confirmation is excluded from the stepper.
- [ ] No generated `Step 1 of 9` labels appear.
- [ ] Privacy uses the TaPaaS privacy-and-terms template.
- [ ] Authenticated details are read-only playback.
- [ ] Profile-owned details are not recaptured by default.
- [ ] Contact and address details have clear ownership classification.
- [ ] Market type control is justified.
- [ ] Date help text states the expected format.
- [ ] Support-needs follow-up is conditional or the approved alternative is documented.
- [ ] Review mirrors Your details, Market stall information, Additional information and Privacy.
- [ ] Each review section has one edit affordance.
- [ ] Confirmation is submitted-for-review and includes Next steps.
- [ ] No designer annotations render as customer-facing UI.

## Known owner-confirmation items

- whether AMP is a confirmed real transaction candidate
- exact profile, POI or Profile Connect source
- contact/address ownership
- market type option list
- final support-needs behaviour
- final privacy/legal/declaration wording
- receipt/reference format
- notification and permit/document delivery wording
- accessibility, legal, privacy, GEL, TaPaaS and governance review

## Source links

- [Core Clara/TaPaaS rule layer](../12-clara-tapaas-transaction-rules-v01.md)
- [Stepper and page structure rules](../14-stepper-page-structure-rules.md)
- [Authenticated profile playback rules](../15-authenticated-profile-playback-rules.md)
- [Validation and control-choice rules](../17-validation-control-choice-rules.md)
- [Review and confirmation rules](../16-review-confirmation-rules.md)
