# Designer review checklist

Use this checklist when reviewing a Clara-aligned TaPaaS transaction prototype.

## Before reviewing

- [ ] Confirm which transaction and slice are being reviewed.
- [ ] Confirm whether this is runtime, Storybook or docs-only.
- [ ] Confirm the prototype is internal trial material.
- [ ] Confirm raw Clara/SharePoint assets are not included.
- [ ] Confirm caveats are visible outside customer-facing UI.

## Flow structure

- [ ] The flow starts with the right privacy/terms treatment.
- [ ] The number of pages feels necessary for the work.
- [ ] A stepper appears only where the customer needs orientation.
- [ ] Step labels are meaningful and stable.
- [ ] Confirmation is not included in the stepper.
- [ ] Declarations are placed with the related input unless a standalone step is justified.

## Details and data ownership

- [ ] Profile-owned personal details are read-only playback.
- [ ] Editable fields are transaction-specific or explicitly justified.
- [ ] The user knows where to update profile-owned details if incorrect.
- [ ] Contact and address capture is classified clearly.

## Page content and controls

- [ ] Required-field guidance is clear.
- [ ] Control choice fits the question and option set.
- [ ] Dates show expected format guidance.
- [ ] Long text fields show character guidance where useful.
- [ ] Conditional questions reveal or explain follow-up fields clearly.
- [ ] Help text helps the customer complete the task, not the designer review.

## Validation

- [ ] Error summary appears at the top of the relevant page.
- [ ] Error links move to the relevant control.
- [ ] Inline errors appear near the relevant fields.
- [ ] Default and error states keep the same structure.
- [ ] Validation timing is intentional.

## Review page

- [ ] Sections mirror completed meaningful parts of the journey.
- [ ] Each section has one edit affordance.
- [ ] Privacy appears where the transaction pattern needs it.
- [ ] Fee-style treatment appears only if fees exist.
- [ ] Review content does not include internal notes.

## Confirmation

- [ ] Heading matches the outcome type.
- [ ] Immediate-approval flows say the permit/outcome is approved.
- [ ] Submitted-for-review flows say the application/request has been submitted.
- [ ] Receipt number and transaction date are present where relevant.
- [ ] Keep a record appears where relevant.
- [ ] Next steps appear only when there is a genuine next action or review process.
- [ ] Feedback affordance appears only where applicable.

## Feedback classification

Classify review comments before asking Kiro/Codex to patch:

| Bucket | Use for |
|---|---|
| Source-fidelity defect | The prototype does not match confirmed source material. |
| TaPaaS rule defect | The prototype breaks a Clara/TaPaaS rule. |
| Content decision | Wording needs owner, content, legal or privacy confirmation. |
| Interaction defect | Validation, control choice, reveal behaviour or navigation feels wrong. |
| Manual QA item | Keyboard, focus, screen-reader, contrast or responsive review is needed. |
| Protected positive | Something useful should be kept during fixes. |
| Out of scope | The request belongs to production, backend, policy or another transaction. |

## Do not approve from this checklist alone

This checklist does not prove production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval or governance clearance.
