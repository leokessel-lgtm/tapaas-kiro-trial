# MPS transaction assembly review pack

## Review purpose

This pack helps designers, engineers, product/portfolio stakeholders and TaPaaS/GEL reviewers assess the current Mobility Parking Scheme transaction assembly preview.

The preview is for:

- reviewing the current end-to-end MPS transaction skeleton
- checking how source-backed preview components are used in the transaction
- identifying source-backed, skeleton-only and review-gated stages
- deciding which gaps should be extracted, patched, deferred or documented only
- gathering design, engineering, accessibility, content, privacy, policy and service-logic feedback before further build work

The preview is not for:

- production release
- service launch readiness
- formal accessibility sign-off
- GEL or TaPaaS component approval
- legal, privacy or policy approval
- validating real MPS eligibility, medical evidence, concession, identity, upload, backend, payment or persistence behaviour

Anti-claims:

- Do not treat this pack, the deployed preview, Storybook stories, tests or acceptance checks as production readiness.
- Do not treat automated checks as WCAG compliance.
- Do not treat Figma-aligned previews as GEL approval, TaPaaS approval, legal approval, privacy approval or policy approval.
- Do not infer real backend, upload, validation, identity, medical assessment or policy rules from mock-only preview behaviour.

## Quick links

| Item | Link or location | Review use |
|---|---|---|
| Deployed Storybook | https://leokessel-lgtm.github.io/tapaas-kiro-trial/storybook/ | Primary review surface for transaction and component stories. |
| MPS End-to-End Transaction Assembly v1 | Storybook story: `tapaas-preview-composites--mps-end-to-end-transaction-assembly-v-1` | Review the complete mocked transaction journey. |
| Applicant details fidelity story | Storybook story for `MPS Applicant Details Frames - Figma Fidelity` | Review source-backed applicant details and manual address variants. |
| Medical evidence status story | Storybook story for `MPS Medical Evidence Status - Figma Evidence` | Review certificate/report required and provided status variants. |
| MPS Review Frame bounded source story | Storybook story for `MPS Review Frame - Bounded Source Review` | Review source-backed review-page content-frame layout and mock playback. |
| MPS Confirmation Frame bounded source story | Storybook story for `MPS Confirmation Frame - Bounded Source Review` | Review source-backed confirmation content-frame layout and next-step content. |
| Radio card support story | Storybook story: `tapaas-preview-composites--radio-button-card-states` | Review application-type branching control treatment. |
| Backend/business error support story | Storybook story: `tapaas-preview-composites--selected-maturity-components` | Review mock backend/business error examples only. |
| Coverage matrix | `docs/tapaas/08-transaction-coverage-matrix.md` | Stage-by-stage preview, story, skeleton, test and evidence status. |
| Evidence log | `docs/tapaas/04-evidence-log.md` | Chronological evidence for extraction, preview, alignment and validation work. |
| Unknowns register | `docs/tapaas/07-remaining-unknowns-resolution.md` | Review-gated issues and unresolved decisions. |
| Acceptance manifest | `docs/tapaas/09-component-acceptance-manifest.json` | Manifest targets used by static and Storybook acceptance checks. |
| Component registry | `docs/tapaas/01-component-registry.md` | Component source, classification, maturity and trial-use status. |
| Relationship map | `docs/tapaas/05-component-template-relationship-map.md` | Component/template mapping and MPS transaction boundaries. |

## Current readiness summary

Current verdict: ready for internal review, not production.

Strongest areas:

- Applicant details/manual address has source-backed frame previews, a dedicated Storybook review story, transaction skeleton usage, tests and evidence.
- Review has a source-backed MPS review frame preview, supporting preview components, transaction usage and tests.
- Confirmation has a source-backed MPS confirmation frame preview, next-step content, transaction usage and tests.
- Medical evidence has improved from a generic evidence area to a bounded preview-only certificate/report evidence-status pattern now composed inside the skeleton.

Weakest areas:

- Representative/contact details remains skeleton-only. Applicant contact details may be used only as a structural reference.
- Concession and recoverable/business errors remain mock-only and review-gated because real backend validation and recovery rules are not evidenced.
- Privacy/start and declaration include placeholder or owner-gated wording and need content, privacy, legal, policy and accessibility review.

Known risks:

- Reviewers may over-read mock-only preview behaviour as real service logic.
- Source-backed visual structure does not confirm production behaviour, accessibility behaviour or approval status.
- Medical evidence source frames contain known inconsistencies around uploaded/not-uploaded state names, heading text, file limits and report wording.
- The transaction skeleton includes useful assembly logic, but not real identity, eligibility, upload, concession, backend, payment or persistence behaviour.
- Review and confirmation screenshot evidence supports bounded content-frame review only, not full-frame parity across global chrome, footer or mobile layouts.

## Stage-by-stage review table

| Stage | Current status | Source backing | Storybook review surface | Transaction skeleton usage | Acceptance coverage | Main review question | Owner/reviewer needed |
|---|---|---|---|---|---|---|---|
| privacy/start | Partial | Privacy page guidance only; wording must be owner-confirmed | MPS end-to-end story | `PrivacyStep` and `AccountStep` | Covered through transaction assembly smoke, not isolated fidelity | Is the placeholder start/privacy/account structure acceptable for the review, or does it need owner-approved content first? | Product owner, privacy/content, accessibility, engineering |
| application type / branching | Partial | Radio card source node `31:63988`, with Figma status still `CONCEPT`; known MPS branch frames exist but exact parity remains review-gated | MPS end-to-end story; `RadioButtonCardStates` | `ApplicationTypeStep` | Manifest entries for radio cards and MPS application branching | Are card-based new/renew/replace choices acceptable for trial review, and what selected/focus/error fidelity needs further work? | Designer, accessibility, engineering, product owner |
| applicant details / manual address | Aligned | MPS frames `0:17387` and `0:17405` | MPS applicant details fidelity story; MPS end-to-end story | `ApplicantStep` uses `MpsApplicantDetailsFramePreview` through a thin adapter | Manifest entry for MPS applicant details frame | Does the source-backed structure match designer intent well enough, given lookup, validation and customer-record behaviour are excluded? | Designer, engineering, accessibility, content/product owner |
| representative/contact details | Skeleton-only | No standalone MPS representative/contact frame found; applicant contact frames are structural reference only | MPS end-to-end story only | `RepresentativeStep` | Transaction smoke only; no dedicated acceptance target | Should this stay skeleton-only, be removed/deferred, or wait for a dedicated representative/contact source frame or owner evidence? | Product owner, designer, privacy/legal/policy, engineering |
| medical evidence | Partial, improved | Certificate frames `0:17316`, `0:17333`; report frames `0:17357`, `0:17370`; bounded evidence-status nodes recorded | Medical evidence status story; MPS end-to-end story; `Mps Evidence And Assessment` | `MedicalEvidenceStep` composes `MpsMedicalEvidenceStatusPreview` with mock certificate/report states | Manifest entry for medical evidence status, review-gated | Is the static evidence-status boundary acceptable, and how should source inconsistencies be resolved before any upload or validation work? | Designer, engineering, accessibility, privacy/security, product owner |
| concession | Partial | Relationship map identifies concession/backend patterns, but real validation rules are not source-confirmed | MPS end-to-end story; backend/business error support stories | `ConcessionStep` and mock hard-stop outcomes | Backend examples manifest entry; no isolated concession frame target | Should concession stay mock-only, or should specific concession frames/rules be extracted next? | Product owner, engineering, policy/content, service logic owner |
| declaration | Partial | Declaration review and MPS review frame evidence; final wording unresolved | MPS end-to-end story; selected maturity story; MPS review fidelity story | `DeclarationStep`; review uses MPS review frame declaration area | Declaration review manifest entry is review-gated | What declaration wording and playback structure should be owner-approved before stronger reuse? | Legal/content, privacy/policy, accessibility, product owner |
| review | Aligned, bounded | MPS review frame `0:33185`; supporting legal accordion, review fees, evidence and assessment patterns | MPS review bounded source review story; review/confirmation assembly; MPS end-to-end story | `ReviewStep` uses `MpsReviewFramePreview` and support components | Manifest entry for MPS review frame | Does the review content-frame layout and data playback support the intended review process, with full-frame/mobile parity, edit routing and content still review-gated? | Designer, engineering, content/product owner, accessibility |
| confirmation | Aligned, patched and bounded | MPS confirmation frame `0:33222`; next steps card `11:4848` | MPS confirmation bounded source review story; review/confirmation assembly; MPS end-to-end story | `OutcomeStep` uses `MpsConfirmationFramePreview` | Manifest entries for confirmation frame and next steps card | Does the tightened confirmation content-frame communicate the mocked outcome clearly without implying real reference, notification, feedback or receipt behaviour? | Designer, product owner, content, engineering |
| business/recoverable errors | Review-gated | Backend error examples source node `31:73426`; real rules unknown | Backend/business error support story; MPS end-to-end story | `OutcomeStep` uses mock hard stops for payment/concession routes | Backend examples manifest entry | Which error categories, recovery routes and ownership rules are real enough to bring into the transaction later? | Engineering, service logic owner, product owner, content, operations |

## Key review questions

### Design fidelity

- Do the source-backed applicant, medical evidence, review and confirmation stories match the intended MPS frame anatomy closely enough for a trial review?
- Are any visual placeholders, especially pictograms and mock status displays, misleading?
- Are the medical evidence source inconsistencies acceptable as documented review gates, or should the source frames be corrected before further work?
- Does the radio-card application branching pattern match the intended MPS selection experience, despite the source component remaining `CONCEPT`?

### Engineering feasibility

- Are the preview components composed in the skeleton in a maintainable way?
- Are there duplicate or stale skeleton-only areas that should now use source-backed previews?
- Is the current split between reusable preview components and transaction-specific adapters sensible?
- Are any Storybook stories too broad or too weak for engineering review?

### Accessibility and assistive technology

- Do repeated controls, especially edit actions, radio cards, accordions, modals and mock status regions, have clear names and relationships?
- Does the 390px Storybook smoke target reveal any horizontal overflow or layout risk?
- Should any content currently inside accordions be forced visible for accessibility or content-governance reasons?
- What manual VoiceOver/NVDA checks are required before stronger accessibility claims can be made?

### Privacy, legal, policy and content

- Who owns the final privacy collection notice, declaration statements, legal accordion wording and confirmation content?
- Which current text is placeholder only and should not be repeated outside the review context?
- Are there representative/contact, consent, authority or relationship rules that must be supplied before further implementation?
- Is any medical evidence guidance sensitive enough to require privacy/security/content review before reuse?

### Backend and service logic

- Which concession outcomes are real service states, and which are only mock review examples?
- What backend error codes, recovery routes and support instructions are source-confirmed?
- Which upload, file validation, virus scanning, storage and medical assessment behaviours are explicitly out of scope for this preview?
- Are payment, receipt and reference-number behaviours needed for the next review, or can they stay mocked?

### Transaction assembly

- Is the current end-to-end skeleton useful enough to discuss transaction structure with designers and engineers?
- Which stage should be strengthened next: representative/contact, concession/backend, privacy/declaration content, or accessibility smoke review?
- Which preview components should be promoted for broader trial reuse, deferred, or documented only?
- Does the transaction coverage matrix reflect the review team's understanding of maturity and risk?

## Decision prompts

| Decision | Current evidence | Decision needed | Recommended default |
|---|---|---|---|
| Representative/contact source gap | No standalone MPS representative/contact frame found. Applicant contact frames are structural reference only. | Decide whether to supply a dedicated frame/owner evidence, defer the stage, or keep it skeleton-only. | Keep skeleton-only until a dedicated source frame or owner evidence is supplied. |
| Medical evidence boundary and source inconsistencies | Certificate/report status preview exists, but source frames have inconsistent state names, heading text, file limits and report wording. | Confirm true uploaded/not-uploaded state mapping, wording, file rules and whether upload behaviour remains out of scope. | Keep preview-only static status. Do not add upload/remove/validation behaviour. |
| Concession/backend validation handling | Mock hard-stop examples exist. Real concession validation and recovery rules are unknown. | Decide whether to extract specific concession frames or keep concession as mock-only. | Keep mock-only unless source-confirmed rules and recovery paths are supplied. |
| Privacy/declaration/legal wording ownership | Structure exists, but final wording and content rules are owner-gated. | Assign owners for privacy, declaration, legal, policy and confirmation copy decisions. | Treat wording as placeholder until owner-approved content is supplied. |
| Radio-card branching fidelity | `RadioButtonCards` is coded and tested for preview, but source status remains `CONCEPT`. | Confirm whether card selection is appropriate for MPS application type branching and what state fidelity is required. | Keep as trial-only until design/accessibility review confirms the interaction. |
| Business/system error visual differentiation | Separate source nodes and coded stories exist, but paired source/coded screenshot comparison is not in the current pack. | Decide whether error-page visual differentiation matters for the next trial review. | Capture targeted error-page screenshots before styling either page further. |
| Review and transaction summary card variants | Current previews cover stacked/static rows only. Horizontal, emphasis, receipt, payment-style and notification variants are not implemented. | Decide whether any missing card variant is needed by the current MPS review or confirmation surface. | Defer until a transaction surface needs the variant and source/owner evidence exists. |
| MPS mobile parity | Current mobile checks are no-overflow smoke evidence only. Matching mobile source frames are missing. | Decide whether mobile parity is a review gate. | Treat mobile parity as source-needed before visual patching. |
| Promote, defer or document-only | Applicant/review/confirmation are strongest; medical is useful but review-gated; representative/concession are weakest. | Decide which areas move into the next patch or extraction cycle. | Prepare review pack now, then patch only review-approved gaps. |

## Reviewer checklist

Use this checklist while reviewing Storybook:

- Open the MPS end-to-end transaction assembly story and walk the happy path.
- Check the applicant details fidelity story against the documented source nodes.
- Check the medical evidence status story for certificate/report required and provided states.
- Check the MPS review frame fidelity story for section order, edit action clarity and declaration placement.
- Check the MPS confirmation frame fidelity story for reference, next steps, feedback and CTA treatment.
- Check radio-card states for selected, hover/focus, error and mobile behaviour.
- Check backend/business error examples only as mock hard-stop patterns.
- Resize key stories to 390px and check for horizontal overflow or unusable wrapping.
- Look for repeated controls, especially edit buttons, and confirm names are clear enough for review.
- Check that review notes and visible labels do not imply unsupported upload, backend, validation, identity, medical assessment, legal, privacy, policy or production behaviour.
- Mark any content that needs owner approval before further reuse.
- Record whether each stage should be promoted, patched, deferred or documented only.

## Acceptance status

The current manifest contains 11 acceptance targets.

| Check | Current role | What it helps prove | What it does not prove |
|---|---|---|---|
| `npm run acceptance:static` | Verifies manifest links between preview exports, Storybook IDs, transaction usage, tests and evidence files. | The documented acceptance targets are structurally connected. | It does not prove visual parity, accessibility compliance, source approval or production readiness. |
| `npm run acceptance:storybook` | Runs Storybook acceptance checks against declared story targets, including mobile no-overflow checks where declared. | Key review stories render and declared text targets are present. | It does not prove full designer fidelity, assistive-technology behaviour, keyboard completeness or governance approval. |
| `npm run acceptance:deployed` | Checks the deployed Storybook against the manifest targets. | The deployed review surface is reachable and matches manifest expectations at a smoke-test level. | It does not prove production readiness, legal/privacy/policy approval, backend correctness or WCAG compliance. |

Manifest target summary:

- 11 total manifest targets.
- Transaction-used or transaction-review targets include application branching, applicant details, medical evidence, review, confirmation, next steps, radio cards and backend error examples.
- Catalogue-only targets include email confirmation modal and search vehicle input.
- Review-gated targets include declaration review and MPS medical evidence status.

Before the review session, re-run deployed acceptance if the deployed Storybook has changed since the last clean baseline.

## Recommended next actions after review

1. Decide the representative/contact path first: keep skeleton-only, remove/defer, or supply a dedicated source frame/owner evidence for extraction.
2. Resolve medical evidence review gates: confirm state mapping, headings, file limits, report wording and whether upload behaviour remains explicitly out of scope.
3. Choose the next bounded patch: concession/backend extraction, privacy/declaration wording ownership, or accessibility/assistive-technology smoke review.

Do not continue broad extraction until reviewers confirm which of these gaps matters most for the next trial decision. The current stop condition is: no broad extraction while confirmation, review, medical evidence, radio-card states, error-page differentiation and mobile parity are still being classified or reviewed.
