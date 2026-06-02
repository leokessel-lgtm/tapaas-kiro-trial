# Trial Permit example

## Status

Canonical short, immediate-approval TaPaaS transaction example for this trial.

This is TaPaaS-rule aligned trial guidance, not production approval.

## Outcome type

Immediate approval.

The confirmation pattern should communicate that the permit is approved and that the receipt/proof is the permit where that wording is confirmed for the prototype.

## Flow shape

Trial Permit should stay short:

1. Privacy
2. Application details
3. Review
4. Approved confirmation

No stepper should render for this short flow unless an existing tracked rule explicitly requires it.

## Privacy page

Use the TaPaaS privacy-and-terms template:

- Privacy Collection Notice
- Terms and Conditions
- Terms and Conditions checkbox
- notifications or receipt copy where relevant
- Exit
- Continue

Do not add a Privacy Collection Notice checkbox by default.

## Personal details

Authenticated personal details are read-only playback from Account/Profile.

Do not generate editable first name or family name fields.

If details are incorrect, guide the customer to update them through Account/Profile where the owner flow is known. Do not turn the transaction into a profile-management surface.

## Application details

Application details should hold:

- permit type
- short declaration

Do not create a standalone Declaration step for this short flow unless a documented legal, content or storage reason is added.

## Review

Review should mirror completed sections:

- Application details
- Privacy

Use one edit affordance per section.

## Confirmation

Confirmation should be immediate approval:

- heading communicates approved outcome
- summary includes receipt number and transaction date
- receipt/proof language explains the receipt is the permit where confirmed
- Keep a record is present
- feedback affordance appears where applicable
- no Next steps card unless there is a genuine post-approval action

## Storybook surface

Use this Storybook ID:

- `tapaas-transactions--trial-permit-clara-aligned`

Related rule stories:

- `tapaas-transaction-rules--privacy-and-terms`
- `tapaas-transaction-rules--authenticated-profile-playback`
- `tapaas-transaction-rules--review-pages`
- `tapaas-transaction-rules--confirmation-pages`
- `tapaas-transaction-rules--annotation-boundaries`

## Review checklist

- [ ] No stepper is rendered.
- [ ] Profile-owned details are read-only.
- [ ] No editable first name or family name fields are present.
- [ ] Permit type sits on Application details.
- [ ] Short declaration sits on Application details.
- [ ] Review sections are Application details and Privacy.
- [ ] Each review section has one edit affordance.
- [ ] Confirmation communicates approval.
- [ ] No Next steps card appears unless a real post-approval action exists.
- [ ] No designer annotations render as customer-facing UI.

## Known owner-confirmation items

- exact profile source
- final Privacy Collection Notice source and wording
- final Terms and Conditions wording
- final receipt/proof wording
- final feedback destination
- whether any post-approval action is genuinely required
- accessibility, legal, privacy, GEL, TaPaaS and governance review

## Source links

- [Clara-informed TaPaaS rule layer](../12-clara-tapaas-transaction-rules-v01.md)
- [Stepper and page structure rules](../14-stepper-page-structure-rules.md)
- [Authenticated profile playback rules](../15-authenticated-profile-playback-rules.md)
- [Review and confirmation rules](../16-review-confirmation-rules.md)
