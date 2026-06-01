# TaPaaS transaction rules checklist

Use this checklist before asking Kiro/Codex to generate a transaction, and again when reviewing the result.

## Source and scope

- [ ] Transaction name is clear.
- [ ] Outcome type is clear: immediate approval, submitted for review or unknown.
- [ ] Source artefacts and owner feedback are listed.
- [ ] Unknowns are marked `Unknown`, not guessed.
- [ ] Raw Clara PDFs, videos, frames, screenshots, SharePoint files or source mock-up images are not added to the repo.
- [ ] The prototype is framed as internal trial material only.

## Privacy and Terms

- [ ] Privacy Collection Notice is present where required.
- [ ] Terms and Conditions section is present where required.
- [ ] Only Terms and Conditions has a checkbox by default.
- [ ] Notification or receipt copy is present where relevant.
- [ ] Exit and Continue actions are available.
- [ ] Final privacy/legal wording is not invented.

Source: [Privacy and Terms transaction template](../13-privacy-terms-transaction-template.md)

## Personal details and data ownership

- [ ] Profile-owned personal details are read-only playback.
- [ ] Editable personal-detail fields are not created by default.
- [ ] If details are wrong, the customer is guided to Account/Profile where the owner flow is known.
- [ ] Contact or address details are classified as profile playback, profile update or transaction-specific capture.
- [ ] Data ownership assumptions are documented.

Source: [Authenticated profile playback rules](../15-authenticated-profile-playback-rules.md)

## Page structure and stepper

- [ ] Stepper use is justified by meaningful staged work.
- [ ] Short immediate-approval flows do not use a stepper unless a tracked rule requires it.
- [ ] Confirmation is excluded from the stepper.
- [ ] Stepper labels are stable across default and error states.
- [ ] Generated labels such as `Step 1 of 9` are not used unless approved.
- [ ] Declarations stay with related input unless there is a documented reason for a separate page.

Source: [Stepper and page structure rules](../14-stepper-page-structure-rules.md)

## Validation and controls

- [ ] Required-field guidance is visible or the alternative is documented.
- [ ] Validation timing is intentional, usually on Continue or Submit for these examples.
- [ ] Error summary appears at the top when errors occur.
- [ ] Error summary links target the right fields or controls.
- [ ] Inline errors appear at the relevant fields or controls.
- [ ] Control choice matches the option set and answer type.
- [ ] Date fields show expected format guidance.
- [ ] Character limits are visible where long text is expected.
- [ ] Conditional fields are clearly conditional.

Source: [Validation and control-choice rules](../17-validation-control-choice-rules.md)

## Review

- [ ] Review mirrors completed meaningful sections.
- [ ] One review section appears per meaningful source section.
- [ ] Each section has one edit affordance.
- [ ] Privacy content appears where the pattern requires it.
- [ ] Fee-style tables, fee cards or fee keylines appear only if fees exist.

Source: [Review and confirmation rules](../16-review-confirmation-rules.md)

## Confirmation

- [ ] Outcome type is documented before writing confirmation content.
- [ ] Immediate-approval flows communicate approval.
- [ ] Submitted-for-review flows communicate submission.
- [ ] Receipt number and transaction date appear where relevant.
- [ ] Keep a record is present where relevant.
- [ ] Next steps appear only when there is a genuine post-submission or post-approval action.
- [ ] Feedback affordance appears only where applicable.

Source: [Review and confirmation rules](../16-review-confirmation-rules.md)

## Customer-facing boundary

- [ ] No designer annotations render as customer UI.
- [ ] No mock-only notes render as customer UI.
- [ ] No owner-confirmation notes render as customer UI.
- [ ] No internal implementation notes render as customer UI.
- [ ] Documentation keeps caveats visible.
- [ ] The transaction does not claim production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval or governance clearance.
