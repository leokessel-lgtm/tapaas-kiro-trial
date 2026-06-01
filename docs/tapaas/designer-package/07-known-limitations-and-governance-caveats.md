# Known limitations and governance caveats

## TLDR

This package is a trial review aid. It helps designers and agents apply Clara/TaPaaS rules consistently, but it does not approve the prototype for production use.

## Standing caveats

Keep these visible in any handover, prompt, review pack or share-out:

- Internal trial material only.
- Not production-ready.
- Not accessibility compliance evidence.
- Not privacy/legal approval.
- Not formal GEL approval.
- Not TaPaaS approval.
- Not governance clearance.
- Not final TaPaaS policy or product approval.

## Source limitations

The package uses text summaries and committed steering files. It does not include raw Clara PDFs, videos, frames, screenshots, SharePoint files or source mock-up images.

Do not add or redistribute raw source assets unless Leo confirms the destination and permissions.

## Design limitations

Clara-aligned means derived from Clara's feedback for this trial. It does not mean Clara has approved every future implementation.

Designers still need to confirm:

- final page grouping
- final content
- final review section treatment
- final confirmation wording
- final feedback affordance
- whether a pattern is generally reusable or transaction-specific

## Content, legal and privacy limitations

Generated prototypes must not invent:

- final Privacy Collection Notice wording
- Terms and Conditions wording
- declaration wording
- notification wording
- receipt/proof wording
- eligibility, policy or decision rules
- privacy or legal approval

Use `Unknown` or owner-confirmation notes in documentation when source is missing.

## Accessibility limitations

Automated tests and Storybook rendering do not prove accessibility compliance.

Manual review may still be needed for:

- keyboard journey
- focus order
- screen-reader announcements
- error recovery
- conditional reveal behaviour
- colour contrast
- mobile and zoom behaviour
- heading and landmark structure

## Engineering limitations

The trial prototypes may include mock data, local preview components and simplified routing.

Do not infer real:

- backend integration
- identity or profile integration
- payment
- lodgement
- approval
- permit issue
- notification delivery
- document delivery
- feedback submission

## When to stop and ask

Stop before patching if:

- the transaction needs real policy, eligibility, payment, identity, privacy or legal rules
- the requested change would alter another transaction
- the change would require raw source assets in the repo
- the change would imply approval or compliance
- the source material conflicts and no owner decision exists
