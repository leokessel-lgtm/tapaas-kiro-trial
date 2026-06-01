# Clara TaPaaS transaction rules v0.1

## TLDR

This is the first steering layer translated from Clara Burgos' feedback on the Trial permit and Accessible market permit examples.

Use this pack before asking Kiro or Codex to change transaction code. It is a rules layer, not a production approval pack.

## Evidence boundary

Source material used:

- Clara's recorded walkthrough from 2026-06-01.
- `Trial permit.pdf`.
- `Accessible market permit.pdf`.
- Follow-up validation in ChatGPT.
- Existing project evidence discipline.

Source material not included:

- raw PDFs
- video files
- video frames
- SharePoint screenshots
- source mock-up images

Do not commit or package Clara's raw SharePoint material unless Leo confirms the repository/package destination is approved for those assets.

Text summaries of Clara's feedback may be used for internal steering. Raw source artefacts must not be redistributed or committed unless the destination and permissions are confirmed.

## Authority stack

Use this order when guidance conflicts:

1. Mandatory constraints: law, privacy, security, accessibility, governance, confirmed platform constraints and confirmed non-negotiable GEL constraints
2. Michael/TaPaaS design direction, where explicitly given
3. Clara Burgos' TaPaaS transaction rules for this trial
4. GEL foundations and Service NSW component patterns, where they do not conflict with TaPaaS transaction rules
5. Existing Storybook and coded transaction patterns
6. Kiro/Codex generated output

Clara's feedback is the canonical hands-on TaPaaS transaction-design source for this trial. Her rules build on GEL and specialise it for transaction assembly. Kiro/Codex must implement documented TaPaaS rules and must not invent new transaction behaviour.

## Rule status model

Classify rules before implementation:

| Status | Meaning | Use |
|---|---|---|
| TaPaaS rule from Clara feedback | Clara's feedback establishes the default TaPaaS transaction rule for this trial. | Apply by default across TaPaaS transaction work unless a documented exception applies. |
| Transaction-specific example | Demonstrates how a TaPaaS rule applies to Trial permit, Accessible market permit or another named transaction type. | Use when the outcome type, flow and context match. |
| Mandatory constraint | Legal, privacy, security, accessibility, governance, platform or confirmed GEL constraint. | Overrides implementation where there is a conflict. |
| Unresolved source inconsistency | Source screens, walkthrough comments or validation evidence disagree. | Do not turn into a hard build requirement until resolved. |
| Owner-confirmation item | Detail that requires Clara, Michael, GEL, legal/privacy, accessibility, product or engineering confirmation. | Track explicitly. Do not invent. |

## Core principles

### 1. Privacy and Terms are separate

The customer is informed by the Privacy Collection Notice. The customer accepts Terms and Conditions.

Do not add a privacy checkbox by default.

### 2. Authenticated transactions play back trusted personal data

For authenticated transactions, personal details flow into the transaction from Account/Profile by default.

The transaction plays back trusted personal details rather than recapturing them. Profile owns the capture and management of personal data updates. The transaction captures only transaction-specific data unless a documented exception applies.

### 3. Use a stepper only for meaningful staged work

Stepper use is based on customer orientation need and meaningful stages, not raw page count.

Confirmation is excluded from the stepper.

### 4. Declarations stay with related input unless there is a reason to separate them

Short declarations should sit with the related application/input page.

Separate declaration pages need a reason, such as heavy legal content or separate storage/submission requirements.

### 5. Review pages mirror the transaction journey

Review pages should group content by meaningful prior sections and provide one clear edit affordance per section.

### 6. Confirmation pages are outcome-driven

Immediate approval and submitted-for-review flows need different confirmation patterns.

### 7. Designer annotations are not customer UI

Implementation notes, placeholder warnings, owner-confirmation notes and mock-only caveats must not render inside customer-facing transaction screens.

## Rule files in this pack

- `13-privacy-terms-transaction-template.md`
- `14-stepper-page-structure-rules.md`
- `15-authenticated-profile-playback-rules.md`
- `16-review-confirmation-rules.md`
- `17-validation-control-choice-rules.md`
- `18-approved-examples-and-anti-patterns.md`

## Known unresolved items

- Trial permit stepper: Clara said the flow is short enough that she would not use a stepper, but the PDF error-state screen includes a 4-step indicator. Confirm whether this is intentional, stale or accidentally carried over.
- Accessible market permit labels: visual review mostly supports Privacy, Your details, Market stall details, Additional details and Review, but extracted text has inconsistencies. Confirm canonical labels before implementation.
- Review card treatment: Clara's mock-ups favour section cards and clear grouping over generic grey/keyline tables. Confirm exact coded treatment against TaPaaS/GEL before hard-coding.
- Support-needs textarea: confirm whether it is hidden until Yes is selected, or visible but required only when Yes is selected.
- Character count: treat maximum-character and countdown guidance as a TaPaaS owner-confirmation item, not GEL.

## Acceptance check

Before any transaction implementation:

- Rules have been classified as TaPaaS rule from Clara feedback, transaction-specific example, mandatory constraint, unresolved source inconsistency or owner-confirmation item.
- Unresolved items are not turned into hard build requirements.
- No raw source assets are committed.
- No file claims production readiness, GEL compliance, accessibility compliance, privacy/legal approval or governance clearance.
- The next Kiro/Codex prompt points to this rules pack before code changes.
