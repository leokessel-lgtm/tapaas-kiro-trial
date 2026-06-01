# Authenticated profile playback rules

## Status

TaPaaS rule from Clara feedback.

## Principle

Authenticated transactions should minimise recapture of trusted personal information.

For authenticated flows, assume profile playback until a documented exception says otherwise. Do not use uncertainty about the exact profile source as a reason to recapture personal details by default.

## Rule

For authenticated TaPaaS transactions, personal details should flow into the transaction from Account/Profile by default.

The transaction should play back trusted personal details as read-only information. Profile is responsible for capturing and managing personal data updates. The transaction should not become the profile-management surface.

The transaction should capture only transaction-specific data, or data explicitly confirmed as unavailable from Account/Profile.

The exact source of truth should be documented per transaction, but absence of that documentation must not cause Kiro/Codex to recapture personal details by default.

## Kiro/Codex implementation instruction

When generating an authenticated transaction:

1. Identify which personal details are account/profile/POI owned.
2. Render those details as read-only playback.
3. Include a change-details pathway only if the owning profile/account flow is known. If unknown, mark it unresolved rather than adding editable personal-detail fields.
4. Do not create editable fields for profile-managed personal data.
5. If the transaction needs contact or address details, confirm whether they are profile playback, profile update, or transaction-specific capture.

## Approved examples

### Trial permit

Transaction-specific example:

- Play back name details from MyServiceNSW Account.
- Tell the customer to update account details outside the transaction if incorrect.
- Do not recapture first name or family name.

### Accessible market permit

Transaction-specific example:

- Play back verified identity details where POI/profile is assumed.
- Capture only contact, mailing or market-related details where the transaction genuinely needs them and the data is not assumed to be available from Profile Connect or another profile source.

## Anti-pattern

Do not:

- ask for full name and date of birth again when trusted identity data is available
- let the transaction become the profile-management surface by accident
- create near-duplicate fields for account-owned data
- assume MyServiceNSW, POI or Profile Connect availability without confirmation

## Acceptance check

- Trusted personal details render as read-only playback.
- Editable fields are limited to transaction-specific or explicitly confirmed capture needs.
- Change-details behaviour routes to the owning profile/account process or is marked unresolved.
- Data-source assumptions are documented per transaction.

## Caveats / owner-confirmation items

- Confirm the source of truth for each transaction: MyServiceNSW, POI, Profile Connect or another service.
- Confirm whether changing details requires the customer to restart the transaction.
- Confirm when recapture is acceptable.
- Confirm privacy and data-minimisation expectations before implementation.
