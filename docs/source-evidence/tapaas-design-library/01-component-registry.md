# TaPaaS component registry

## Trial component set

| Component | Source node | Classification | Maturity | Trial use | Implementation status |
|---|---|---|---|---|---|
| Confirmation page header | `9:10494` | GEL variant | needs engineer review | Confirmation step success header | Preview component: `ConfirmationHeader` |
| Transaction summary card | `10:1861` | TaPaaS-specific composite | coded-preview | Confirmation summary and receipt details | Preview component: `TransactionSummaryCard`. Isolated Storybook review and acceptance entry added for static mock summary rows and optional receipt content. |
| MPS confirmation frame | `0:33222` | TaPaaS-specific transaction frame pattern | coded-preview | Mobility Parking Scheme confirmation layout | Preview component: `MpsConfirmationFramePreview`. Preserves confirmation heading, reference/application details, next-step content, feedback prompt and action/footer relationship with mock content only. |
| MPS applicant details frame | `0:17387`, `0:17405` | TaPaaS-specific transaction frame pattern | coded-preview | Mobility Parking Scheme applicant and contact-details page layout | Preview component: `MpsApplicantDetailsFramePreview`. Preserves personal-details, DOB, contact-details, address-search and manual-address variants with mock form capture only. |
| MPS medical evidence status | certificate nodes `0:17316`, `0:17333`; report nodes `0:17357`, `0:17370`; boundary nodes `0:17327`, `0:17344`, `0:17351`, `0:17369`, `0:17381`, `0:17384`, `0:17385`, `0:17386` | TaPaaS-specific evidence-status pattern | coded-preview | Mobility Parking Scheme evidence/medical stage | Preview component: `MpsMedicalEvidenceStatusPreview`. Preserves static required/provided evidence-status anatomy for certificate/report variants with mock file-name display only. Source upload-state, heading, file-limit and report-section wording inconsistencies remain review-gated. |
| Next steps card | `10:1862` page; `11:4848` component set | TaPaaS-specific composite | coded-preview | Confirmation and post-submit next-step guidance | Preview component: `NextStepsCardPreview`. Supports 2 to 5 static steps, optional numbered rail and optional icon with mock/static content only. |
| Review info card | `18:4448` | TaPaaS-specific composite | coded-preview | Review page information playback | Preview component: `ReviewInfoCard`. Isolated Storybook review and acceptance entry added for stacked review rows and optional edit action. |
| Review fees card | `18:4449` | TaPaaS-specific composite | needs engineer review | Review page fee breakdown | Preview component: `ReviewFeesCard` |
| Privacy card | `1:198` | TaPaaS-specific composite | coded-preview | Privacy collection notice and start-step acknowledgement | Preview component: `PrivacyCardPreview`. Uses placeholder privacy, terms and notification sections only; owner-approved content, privacy/legal/policy approval and assistive-technology behaviour remain review-gated. |
| Conditional declaration | `27:56000` | GEL variant | draft | Mandatory declaration checkbox | Used as page guidance only |
| Declaration review | `27:38386` | TaPaaS-specific composite | needs engineer review | Review page declaration playback | Preview component: `DeclarationReview`. Includes card and accordion variants. Legal content treatment still needs owner confirmation. |
| MPS review frame | `0:33185` | TaPaaS-specific transaction frame pattern | coded-preview | Mobility Parking Scheme review-page layout | Preview component: `MpsReviewFramePreview`. Preserves review section order, required-field hint, callout, edit actions, declaration placement and CTA relationship with mock content only. |
| TaPaaS radio buttons | `31:63987` | GEL variant | draft | Radio selection with TaPaaS content model | Use existing `RadioButtonList` unless card behaviour is required |
| TaPaaS radio button cards | `31:63988` | TaPaaS-specific composite | needs engineer review | Card-based selection | Preview component: `RadioButtonCards`. Figma status remains `CONCEPT`, so use sparingly and verify keyboard/focus/error behaviour. |
| Search vehicle input | `22:16683` | TaPaaS-specific composite | coded-preview | Vehicle lookup/search step | Preview component: `TapaasSearchAction`. Static search input only; desktop/mobile layout tuned against source dimensions. No backend lookup, validation or result states. |
| Details card single | `2413:787` | TaPaaS-specific composite | draft | Context/details card | Documented only |
| Details card single interactive | `2958:2499` | TaPaaS-specific composite | needs engineer review | Interactive context/details card | Preview component: `InteractiveDetailsCard`. Action model remains preview-only and needs engineering/accessibility review before broader reuse. |
| Show more / less | `22:25082` | GEL variant | draft | Progressive reveal of optional content | MCP text extracted. Figma describes it as a GEL button with custom content and says it does not need to be rebuilt. Prefer existing GEL button/disclosure behaviour. |
| Legal info accordion | `22:35625` | TaPaaS-specific composite using GEL accordion behaviour | needs engineer review | Legal/privacy accordion content on review or declaration pages | Preview component: `LegalInfoAccordion`. Figma marks it BUILT and Custom/GEL, but legal/privacy content must not be hidden or made optional without content and accessibility confirmation. |
| VEOS selection card | `31:63989` | TaPaaS-specific composite | design-only | Vehicle Emissions Offset Scheme selection card | MCP inventory confirmed. Candidate selection-card pattern only. Needs deep review before use. |
| Backend error examples | `31:73426` | TaPaaS-specific pattern set | needs engineer review | Backend/business/system error examples | Preview data/component: `backendErrorExamples` and `BackendErrorExamplePage` for mock-only outcomes. Real error rules and routing remain out of scope. |

## Coded preview components

These are **trial-only composites** in `src/tapaas-preview/`. They are not real TaPaaS production components.

| Preview component | Inputs | Source evidence | Notes |
|---|---|---|---|
| `ConfirmationHeader` | `title`, `transactionName` | Confirmation page header `9:10494` | Uses a visual success mark and plain text. Requires accessibility review before reuse. |
| `TransactionSummaryCard` | `heading`, `items`, optional `children` | Transaction summary card `10:1861` | Uses semantic section and definition-list style rows. |
| `MpsConfirmationFramePreview` | `title`, `referenceNumber`, `applicationDetails`, `nextSteps`, optional related content/start callback | MPS Confirmation frame `0:33222` | Preview-only MPS confirmation-frame layout. Keeps reference number, timeframe, notification, related transaction and receipt details as mock/placeholder content. |
| `MpsApplicantDetailsFramePreview` | address mode, mock field values, optional address-mode and CTA callbacks | MPS Applicant details frames `0:17387`, `0:17405` | Preview-only applicant/contact-details page skeleton. Supports address-search and manual-address variants. No real address lookup, identity verification, customer record update, backend persistence, age eligibility or production validation rules. |
| `MpsMedicalEvidenceStatusPreview` | `evidenceType`, `state`, optional `fileName` | MPS Medical certificate frames `0:17316`, `0:17333`; report frames `0:17357`, `0:17370`; boundary nodes `0:17327`, `0:17344`, `0:17351`, `0:17369`, `0:17381`, `0:17384`, `0:17385`, `0:17386` | Preview-only medical evidence status pattern. Reuses `EvidenceChecklistCard` and `InPageAlert`; shows certificate/report required/provided states and static mock file names only. No upload, remove-file behaviour, storage, validation, virus scanning, backend integration, medical assessment or privacy/security approval. |
| `NextStepsCardPreview` | `heading`, `items`, optional `showStepNumbers`, optional `showIcon`, `headingLevel` | Next steps card page `10:1862`, component set `11:4848` | Preview-only post-submit guidance card. Supports ordered/unordered treatment and 2 to 5 mock/static steps. |
| `ReviewInfoCard` | `title`, `sections`, optional edit action | Review info card `18:4448` | Supports stacked review rows only for this trial. |
| `ReviewFeesCard` | `title`, `fees`, `totalLabel`, `totalAmount` | Review fees card `18:4449` | Mock amounts only. No payment logic. |
| `TransactionCtaGroup` | `onBack`, `onContinue`, `onExit`, labels | Transaction CTA button guidance `27:34294` and end-of-transaction CTA guidance `9:791` | Preview-only action area using GEL preview buttons. No routing, modal, save, logout, session or analytics behaviour included. |
| `PrivacyCardPreview` | `title`, `description`, `sections`, optional acknowledgement state/error props | Privacy card `1:198`; Privacy step `3395:41359` | Preview-only privacy/start card. Uses placeholder content only. No real privacy, legal, policy, notification, storage or consent persistence behaviour. |
| `ExitModal` | `isOpen`, `onContinue`, `onExit`, labels | Exit modal `4677:1042` | Source-backed trial preview for exit confirmation. Uses `role="dialog"`, `aria-modal`, labelled/described content, Escape close, return focus and basic focus containment. Needs VoiceOver/NVDA review. |
| `EmailConfirmationModal` | `isOpen`, `emailAddress`, `onSend`, `onEdit`, optional dismiss/labels | Email confirmation modal `9290:50392`, component frame `9241:18447` | TaPaaS-specific coded preview for confirmation-step email verification. validation_status: build-tested. review_reason: engineer, accessibility, owner. Preview callbacks only; no email delivery, persistence or transaction routing. |
| `BusinessErrorPage` | `title`, `message`, `guidance`, `reference`, `onStartAgain` | Business error page `8931:31271` | Source-backed trial preview for hard-stop business outcomes. Uses `role="alert"` around the error content. Requires real source-confirmed business rules before reuse. |
| `BackendErrorExamplePage` | `example`, `onStartAgain` | Backend errors repository `31:73426` | Mock-only variants for hard-stop outcomes. Wraps `BusinessErrorPage` and displays source-backed mock error codes. |
| `RepeatableGroup` | `title`, optional `description`, `children`, optional `actions` | Form input page `8410:37703`; GEL fieldset/form evidence | Preview composition for repeated form groups. Used for address and authorised-contact sections. Not a standalone TaPaaS component. |
| `EvidenceChecklistCard` | `title`, evidence `items`, optional `children` | MPS medical frames `4.A`/`4.Aa`/`4.B`/`4.Ba`; GEL file-upload evidence | Mock-only status summary for evidence requirements. Does not upload files and must not be treated as GEL FileUpload. |
| `AssessmentSummaryPanel` | `title`, assessment `items`, optional `children` | MPS eligibility, concession and review frame groups; GEL status-label evidence | Mock-only routing/status display. Does not make decisions or validate eligibility, concessions or payments. |
| `DeclarationReview` | `title`, `intro`, `sections`, `variant` | Declaration review `27:38386` | Review-page declaration playback. Supports card and accordion variants. Legal content requires owner confirmation. |
| `MpsReviewFramePreview` | `sections`, `declarationStatements`, optional edit/back/submit/exit callbacks | MPS Review frame `0:33185` | Preview-only MPS review-frame layout. Keeps unsupported identity, eligibility, medical, concession, payment, legal, privacy, policy and backend logic unresolved. |
| `LegalInfoAccordion` | `title`, `items` | Legal info accordion `22:35625` | Content-specific wrapper around GEL Accordion behaviour. Use only for optional legal/privacy guidance unless confirmed otherwise. |
| `InteractiveDetailsCard` | `title`, `description`, `rows`, `statusLabel`, `actions` | Details card single interactive `2958:2499` | Context card with explicit action buttons. Action semantics and focus expectations need review. |
| `RadioButtonCards` | `id`, `legend`, `options`, `value`, `onChange`, error props | TaPaaS radio button cards `31:63988` | Native radio inputs presented as cards. Figma status is `CONCEPT`; use for 2 to 4 high-clarity choices only. |

## Build rules

- Prefer existing GEL preview components for basic inputs, buttons, alerts, links and error summary.
- Add TaPaaS composites only when the pattern is repeated across transaction pages.
- Keep the TaPaaS layer separate from `src/gel.ts`.
- Do not add payment, identity proofing, backend calls or policy logic to the trial skeleton.
- Every coded TaPaaS preview component must map to a source node and have a maturity label.

## Composition patterns

These patterns use existing GEL preview components without creating new TaPaaS composites.

| Pattern | Components used | Classification | Maturity | Notes |
|---|---|---|---|---|
| Address input group | `Field` + `Input` (street, suburb, postcode) + `Select` (state) in a `fieldset` | GEL-aligned | draft | Wrap in fieldset with legend. No backend address lookup. |
| Date input (3-field) | 3 × `Input` (day xxs, month xxs, year sm) in a `fieldset` with legend | GEL-aligned | draft | Standard government date pattern. No date picker. No age/eligibility logic. |
| Textarea | `Textarea` GEL preview component | GEL-aligned | needs engineer review | Source: `@snsw-gel/textarea`. Added in v0.3 for multi-line text input. |
| Progress stepper | `ProgressStepper` GEL preview component | GEL-aligned | needs engineer review | Source: `@snsw-gel/progress-stepper` (local source evidence at `docs/source-evidence/gel-progress-stepper/`). Usage boundary: 4 to 6 steps only. Mobile shows step counter text; desktop shows step names with connecting lines. Completed steps show tick, current step shows blue numbered circle, todo steps are grey. Do not use for 8+ step flows. |
| Details card | `DetailsCard` TaPaaS preview composite | TaPaaS-specific | needs engineer review | Read-only contextual summary card. Source evidence: Details card single `2413:787`. Configurable heading level. Optional status label and action link. Coded and used in Accessible market permit skeleton. |
| Conditional question panel | `ConditionalQuestionPanel` TaPaaS preview composite | TaPaaS-specific | coded-preview | Shows extra fields based on a radio answer. Uses fieldset/legend. Conditional content appears after the radio group. Isolated Storybook review and acceptance entry added for preview-only conditional reveal. Validation blocks when conditional branch requires input. |
| More info panel | `MoreInfoDisclosure` GEL preview component (alias: `MoreInfoPanel`) | GEL variant | needs engineer review | GEL MoreInfoPanel source is a modal dialog with portal, backdrop, focus lock, Escape close and return-focus. The trial preview is a simplified inline disclosure for contextual help only. Do not use for critical content. Full GEL modal behaviour remains future engineer review work. Source: `docs/source-evidence/gel-components/more-info-panel/`. |
| Accordion | `Accordion` GEL preview component | GEL-aligned | needs engineer review | Source: `@snsw-gel/accordion` (evidence at `docs/source-evidence/gel-components/accordion/`). Button-based headings with `aria-expanded` and `aria-controls`. Open all/Close all with focus management (focus moves to opposite button after toggle, matching GEL source nextFocusTarget pattern). Panels use `section` with `aria-labelledby`. Does not implement full controlled/uncontrolled API or exact GEL styling. Do not nest. Do not put critical information inside. TaPaaS legal accordion `22:35625` is a content-specific use of this pattern and needs separate legal/content review. |
| Exit modal | `ExitModal` TaPaaS preview component | GEL/TaPaaS modal pattern | coded-preview | Source: Exit modal `4677:1042`. Use for explicit exit confirmation only. Includes labelled/described dialog, Escape close, return focus and basic focus containment. Isolated Storybook review and acceptance entry added. Does not claim full production modal approval. |
| Email confirmation modal | `EmailConfirmationModal` TaPaaS preview component | TaPaaS-specific | coded-preview | Source: Email confirmation modal `9290:50392`, frame `9241:18447`. Use for confirmation-step email verification review only. validation_status: build-tested. review_reason: engineer, accessibility, owner. No real email send, persistence, transaction routing or critical-error handling. |
| Business error page | `BusinessErrorPage` TaPaaS preview component | TaPaaS page pattern | needs engineer review | Source: Business error page `8931:31271`. Use only for hard-stop business outcomes with source-confirmed business rules and recovery instructions. The complex transaction uses simulated mock content only. |
| Repeatable group | `RepeatableGroup` TaPaaS preview composition | GEL-aligned form composition | needs engineer review | Uses `fieldset` and `legend` to group repeated fields. Source-backed by the generic Form input page `8410:37703` and GEL fieldset/input patterns. Keep legends plain; do not use native fieldset notches or decorative bordered card headings. |
| Evidence checklist card | `EvidenceChecklistCard` TaPaaS preview composition | GEL/TaPaaS composition | needs engineer review | Used to summarise evidence requirements and mock statuses. Mapped to MPS medical evidence frames and GEL status-label/file-upload evidence. It is not a file upload component and must not claim file validation, progress, upload or storage behaviour. `MpsMedicalEvidenceStatusPreview` composes it for the MPS medical evidence status story. |
| Assessment summary panel | `AssessmentSummaryPanel` TaPaaS preview composition | GEL/TaPaaS composition | needs engineer review | Used for mock routing summaries. Mapped to MPS eligibility/concession/review frame groups and GEL status-label evidence. It must not claim automated decisioning, eligibility assessment or policy validation. |

## MCP documentation findings

The 2026-05-20 MCP pass confirmed that several TaPaaS component pages already include explicit design/build status labels:

| Component | Figma status text seen | Practical Kiro interpretation |
|---|---|---|
| Confirmation page header | `READY FOR BUILD` | Safe to use as preview guidance, but keep engineer/accessibility review gate. |
| Privacy card | `BUILT` | Strong page guidance. Privacy wording still requires owner confirmation. |
| Conditional declaration | `READY FOR BUILD` | Good pattern for declaration structure. Legal wording remains unverified. |
| Legal info accordion | `BUILT`, `Custom / GEL` | Preview coded as `LegalInfoAccordion`, but use only after confirming whether legal/privacy content may be collapsed. |
| Declaration review | `READY FOR BUILD`, `GEL`, `Figma`, `Storybook` | Good candidate for next coded component, but choose accordion vs card variant first. |
| Details card single interactive | `READY FOR BUILD` | Preview coded as `InteractiveDetailsCard`, but confirm action semantics and keyboard behaviour. |
| Search vehicle input | `CONCEPT` | Keep mock-only and avoid backend lookup. |
| Review info card, review fees card, next steps card, transaction summary card | `CONCEPT` | Useful as trial composites. Do not overclaim maturity. |
| TaPaaS radio button cards | `CONCEPT` | Preview coded as `RadioButtonCards` for trial review only; do not promote until accessibility behaviour is confirmed. |

The component pages consistently separate `Component`, `Sub-components`, `Designer documentation`, `Developer documentation` and `Accessibility annotations`. Kiro should inspect those sections before coding or changing a preview component.

## MCP extraction status

The 2026-05-20 Figma MCP pass confirmed component pages, documentation/accessibility sections and selected text for the main reusable components.

Before promoting any `design-only` component above, run a targeted MCP deep-dive on that component page and record:

- component anatomy
- variants/states
- dev annotations
- accessibility annotations
- dependencies on GEL or TaPaaS components
- templates where it appears
- coded equivalent or gap
