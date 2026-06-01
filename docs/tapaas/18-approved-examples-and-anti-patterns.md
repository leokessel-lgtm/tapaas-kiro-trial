# Approved examples and anti-patterns

## Status

Designer-review steering aid.

This file uses text-only examples. It deliberately avoids raw screenshots, PDF crops, video frames and SharePoint-derived assets.

## Screenshot and evidence-card guidance

Screenshots may be useful for Clara/Michael review and designer education, but they should be used as curated evidence cards, not as a raw screenshot archive.

Do not add raw SharePoint screenshots, PDFs, video frames or source mock-up crops to the repo or package unless Leo confirms the destination is approved for those assets.

Preferred structure:

- rule
- approved example
- anti-pattern
- Kiro/Codex instruction
- acceptance check

Use synthetic or redrawn examples where the package may be shared outside the approved TaPaaS/SNSW context.

## How to use this file

Use these examples when briefing Kiro/Codex or reviewing generated outputs.

Do not treat them as production copy, legal copy, accessibility sign-off or GEL approval.

## Approved examples

### Privacy and Terms

Use:

- Privacy Collection Notice card
- Terms and Conditions section
- one Terms and Conditions checkbox
- Notifications or receipt copy where relevant
- Continue and Exit actions

Why:

- Privacy informs.
- Terms are accepted.
- The same structure is the default TaPaaS privacy-and-terms pattern unless a documented exception applies.

### Authenticated profile playback

Use:

- read-only playback for account/profile/POI-owned details
- a clear pathway to update details through the owning account/profile surface, where known
- transaction-specific capture only where the data is not profile-owned or not available

Why:

- The transaction should not become a profile-management surface by accident.
- Recapture increases friction and may create data-minimisation issues.

### Review page

Use:

- one section per meaningful prior transaction section
- clear headings
- one edit affordance per section
- privacy review content where the pattern requires it

Why:

- The review page should map back to the journey the customer just completed.

### Immediate approval confirmation

Use for Trial permit-like outcomes:

- approved heading
- receipt number
- transaction date
- proof/receipt wording
- Keep a record
- feedback affordance where applicable
- no next-steps card unless post-approval action genuinely exists

### Submitted-for-review confirmation

Use for Accessible market permit-like outcomes:

- submitted heading
- receipt number
- transaction date
- Keep a record
- next steps explaining review, notification and delivery
- feedback affordance where applicable

## Anti-patterns

### Privacy checkbox

Avoid:

- a checkbox asking the customer to accept the Privacy Collection Notice

Use instead:

- a Terms and Conditions checkbox only, unless privacy/legal confirms otherwise.

### Generated step count

Avoid:

- Step 1 of 9
- confirmation inside the stepper
- labels that change between default and error states

Use instead:

- meaningful staged labels confirmed for the transaction.

### Recapturing trusted profile data

Avoid:

- editable first name, family name or date-of-birth fields where account/profile/POI playback is available

Use instead:

- read-only playback and profile-owned update flow.

### Generic review summary

Avoid:

- one generic grey/keyline table for all data
- duplicate edit actions
- fee treatments when there are no fees

Use instead:

- sections that mirror the transaction journey.

### Wrong confirmation pattern

Avoid:

- adding next steps to an immediate approval flow by default
- replaying every application detail on the confirmation page

Use instead:

- confirmation content based on outcome type.

### Designer notes in customer UI

Avoid rendering:

- "mock only"
- "owner confirmation required"
- "placeholder legal copy"
- implementation notes
- internal caveats

Use instead:

- keep those notes in documentation, Storybook notes, review packs or comments outside customer-facing UI.

## Acceptance check

Before a generated transaction is shown to Clara or Michael:

- Privacy and Terms are separate.
- Stepper use is justified and labels are stable.
- Profile-owned personal details are played back, not recaptured.
- Review sections map to prior pages.
- Confirmation content matches outcome type.
- Validation summary and inline errors work together.
- Designer annotations are not rendered as customer content.
- Caveats are visible in documentation, not buried in UI.
