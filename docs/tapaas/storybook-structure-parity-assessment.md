# Storybook structure, source parity and visual validation assessment

## TLDR

The current Storybook is healthy enough for internal design and engineering review, with the important caveat that it remains a preview and evidence surface, not a production component library or approval record.

Highest-priority risks:

| Priority | Risk | Why it matters | Recommended treatment |
|---|---|---|---|
| P1 | Local preview adapters can diverge from the real GEL package | The repo does not use `@snsw-gel/react`, so GEL Reference stories cannot prove real package parity | Keep GEL stories non-manifest and visibly caveated until real package adoption is approved |
| P1 | Storybook IA still contains legacy/generated preview groups | `GEL Preview/Form Controls`, `gel-preview/*.ai` and `tapaas-preview/*.ai` sit beside curated evidence stories and can confuse review intent | Do a small Storybook IA cleanup before adding more reference batches |
| P1 | Manual visual and accessibility QA remains required | Automated checks prove render/index integrity, not WCAG, focus behaviour, assistive technology support, or pixel parity | Add a manual QA checklist and use it against manifest-backed stories |
| P2 | Upload references can imply real upload capability | Batch 3C is deliberately static and security/privacy/backend-adjacent | Keep FileInput/FileUpload static, defer DropZone/UploadedItem until stronger source and behaviour boundaries exist |
| P2 | Storybook ID moves can stale the acceptance manifest | MPS frame moves were handled correctly, but future moves remain manifest-impacting | Require built index verification before any manifest-backed story move |

Ready for review:

- Manifest-backed TaPaaS component stories and MPS Transaction Frames are present in the built Storybook index.
- GEL Reference Batch 3A, 3B and 3C stories are present, non-manifest, source-informed and visibly caveated.
- MPS frame IDs have moved to `Transaction Frames/MPS` and the obsolete `TaPaaS Preview/Composites` MPS frame IDs are absent from the manifest and built index.
- Representative browser smoke checks rendered selected stories at desktop and mobile widths with no horizontal overflow.

Not ready to claim:

- Source-complete parity.
- Production readiness.
- GEL or TaPaaS approval.
- WCAG compliance.
- Privacy, legal or policy approval.
- Real `@snsw-gel/react` adoption.
- Real upload, backend, storage, scanning, validation or security behaviour.

Recommended next slice: do a small Storybook IA cleanup first, focused on rehoming or retiring legacy/generated preview stories without touching runtime code. Then proceed to Batch 3D as a read-only mapping for Help, Modal and Loading patterns.

## Scope and evidence

Repo state checked:

| Item | Result |
|---|---|
| Branch | `main` |
| Head commit at audit start | `2b71cc8 Merge GEL Evidence Upload references` |
| Working tree | Clean tracked files |
| Expected untracked item | `track-2-spike/` |
| Files changed by this audit | This report only |

Files inspected:

| Area | Files inspected |
|---|---|
| Storybook stories | `src/stories/*.stories.tsx`, `src/gel-preview/*.stories.tsx`, `src/tapaas-preview/*.stories.tsx` |
| Acceptance | `docs/tapaas/09-component-acceptance-manifest.json`, `tests/browser/component-acceptance.spec.ts`, `tests/browser/deployed-smoke.spec.ts` |
| Architecture and review docs | `docs/tapaas/11-gel-storybook-architecture.md`, `docs/tapaas/10-review-pack-mps-transaction-assembly.md`, Trial Permit closure/reconciliation docs, source evidence docs |
| Local GEL adapter | `src/gel.ts`, `src/gel-preview/index.tsx`, `src/gel-preview/styles.css`, `src/gel-preview/*.test.tsx` |
| TaPaaS preview adapter | `src/tapaas-preview/index.tsx`, `src/tapaas-preview/styles.css`, `src/tapaas-preview/*.test.tsx` |
| Layout preview | `src/layout-preview/*` |
| Trial Permit runtime | `src/TrialPermitSkeleton.tsx`, `src/TrialPermitSkeleton.test.tsx` |

External/source evidence checked:

| Source | Result | Limit |
|---|---|---|
| Local built Storybook index | 69 story entries found | Proves index generation, not source parity |
| Acceptance manifest | 25 entries, 42 story references, 28 unique Storybook IDs | Proves declared coverage links only |
| Live GEL Storybook index | JSON reachable with relevant GEL entries for Breadcrumb, StatusLabel, Fieldset, CheckboxList, DateInput, DateMultiInput, FileInput, FileUpload, DropZone, UploadedItem, Modal, MoreInfoPanel, Loader and Skeleton | Does not prove the local preview implementation matches GEL package internals |
| Figma MCP library check | MPS file had subscribed libraries including `GEL Web UI Kit` | No current transaction-specific node was selected for exact parity comparison |
| Figma design-system search | Batch keyword search returned no direct component hits | Inconclusive, not evidence that components are absent |
| Supplied Figma source URLs, 2026-05-30 | MCP screenshots captured for MPS page `MzngfrwuAT3YI3JRxTgTTo` node `0:16535`, MPS/Water Carting mobile reference node `0:33253`, Components library node `31:73426`, and Templates library node `3395:41359` | These are large overview/source-board captures. They improve source orientation, but do not prove exact component-by-component visual parity without targeted child frame comparison |
| Repo source evidence | TaPaaS component registry, relationship map, coverage matrix, MPS source notes and screenshot pack references are present | Some screenshot pack files are outside the committed repo |

Validation commands run before report creation for audit evidence:

| Command | Result |
|---|---|
| `npm run build:all` | Passed, with existing bundle-size warning for chunks over 500 kB |
| `npm run acceptance:static` | Passed, 25 manifest entries checked |
| `npm run acceptance:storybook` | Passed, 28 Storybook acceptance checks passed |

Browser smoke evidence:

| Check | Result |
|---|---|
| Representative local built Storybook stories loaded in Chromium | Passed |
| Desktop viewport, 1280 x 900 | Selected stories rendered, no horizontal overflow found |
| Mobile viewport, 390 x 844 | Selected stories rendered, no horizontal overflow found |
| Batch 3C upload references | Rendered with zero `input[type="file"]` elements, supporting the static-reference boundary |
| Caveat text | Visible in GEL Reference and static upload stories, though exact smoke-script phrase matching was intentionally heuristic |

Limits of evidence:

- No pixel-perfect comparison was performed.
- No formal keyboard, focus-trap, screen-reader or WCAG audit was performed.
- No source-owner approval evidence was found.
- No real `@snsw-gel/react` package implementation was inspected or installed.
- No production backend, upload, validation, identity, eligibility, privacy, legal or policy behaviour was tested.

## Storybook inventory summary

Built Storybook inventory:

| Measure | Count |
|---|---:|
| Total story entries | 69 |
| Acceptance manifest entries | 25 |
| Manifest story references | 42 |
| Unique manifest-backed Storybook IDs | 28 |
| Missing manifest-backed IDs in built index | 0 |
| Non-manifest story entries | 41 |

Story counts by title:

| Storybook title | Story count | Manifest-backed story count |
|---|---:|---:|
| `GEL Preview/Form Controls` | 4 | 0 |
| `GEL Reference/Core Primitives` | 7 | 0 |
| `GEL Reference/Evidence & Upload` | 2 | 0 |
| `GEL Reference/Transaction Inputs` | 4 | 0 |
| `TaPaaS Components/Cards & Panels` | 4 | 4 |
| `TaPaaS Components/Choices & Inputs` | 3 | 3 |
| `TaPaaS Components/Error Pages` | 2 | 2 |
| `TaPaaS Components/Evidence & Assessment` | 3 | 3 |
| `TaPaaS Components/Modals & Overlays` | 3 | 3 |
| `TaPaaS Components/Review & Confirmation` | 7 | 7 |
| `TaPaaS GEL Patterns/Form Patterns` | 4 | 0 |
| `TaPaaS Preview/Composites` | 5 | 2 |
| `Transaction Frames/MPS` | 3 | 3 |
| `Visual QA & Evidence/Component Intake Board` | 5 | 0 |
| `Visual QA & Evidence/Selected Maturity` | 1 | 1 |
| `gel-preview/Button.ai` | 4 | 0 |
| `gel-preview/InPageAlert.ai` | 3 | 0 |
| `tapaas-preview/MpsReviewFramePreview.ai` | 2 | 0 |
| `tapaas-preview/NextStepsCardPreview.ai` | 3 | 0 |

New GEL reference batches:

| Batch | Stories | Status |
|---|---|---|
| 3A Navigation and Status | Breadcrumb, StatusLabel | Present, non-manifest |
| 3B Transaction Inputs | Fieldset, CheckboxList, DateInput, DateMultiInput | Present, non-manifest |
| 3C Evidence and Upload | FileInput static reference, FileUpload static reference | Present, non-manifest |
| Deferred | DropZone, UploadedItem | Not implemented |

Transaction frame and assembly coverage:

| Area | Status |
|---|---|
| MPS review frame | Manifest-backed under `Transaction Frames/MPS` |
| MPS applicant details frame | Manifest-backed under `Transaction Frames/MPS` |
| MPS confirmation frame | Manifest-backed under `Transaction Frames/MPS` |
| MPS end-to-end transaction assembly | Manifest-backed under `TaPaaS Preview/Composites` |
| Trial Permit runtime | Hardened public runtime flow, not represented by a dedicated committed Storybook review surface in this branch |

Full Storybook inventory:

| Storybook title | Story export | Generated Storybook ID | File path | Manifest-backed | Story category | Source evidence type | Claim risk | Caveat quality | Recommendation |
|---|---|---|---|---|---|---|---|---|---|
| `GEL Preview/Form Controls` | `ChoiceControls` | `gel-preview-form-controls--choice-controls` | `src/stories/GelPreview.stories.tsx` | no | Other | implementation/test evidence only | low | partial | retire/reorganise |
| `GEL Preview/Form Controls` | `DisclosureAndAccordion` | `gel-preview-form-controls--disclosure-and-accordion` | `src/stories/GelPreview.stories.tsx` | no | Other | implementation/test evidence only | low | partial | retire/reorganise |
| `GEL Preview/Form Controls` | `FeedbackAndNavigation` | `gel-preview-form-controls--feedback-and-navigation` | `src/stories/GelPreview.stories.tsx` | no | Other | implementation/test evidence only | low | partial | retire/reorganise |
| `GEL Preview/Form Controls` | `InputsAndFields` | `gel-preview-form-controls--inputs-and-fields` | `src/stories/GelPreview.stories.tsx` | no | Other | implementation/test evidence only | low | partial | retire/reorganise |
| `GEL Reference/Core Primitives` | `BreadcrumbReference` | `gel-reference-core-primitives--breadcrumb-reference` | `src/stories/GelReference.stories.tsx` | no | GEL Reference | live GEL index verified plus repo preview evidence | low | clear | should remain non-manifest |
| `GEL Reference/Core Primitives` | `ButtonsAndLinks` | `gel-reference-core-primitives--buttons-and-links` | `src/stories/GelReference.stories.tsx` | no | GEL Reference | repo evidence plus existing local adapter evidence | low | clear | should remain non-manifest |
| `GEL Reference/Core Primitives` | `ChoiceControls` | `gel-reference-core-primitives--choice-controls` | `src/stories/GelReference.stories.tsx` | no | GEL Reference | repo evidence plus existing local adapter evidence | low | clear | should remain non-manifest |
| `GEL Reference/Core Primitives` | `FeedbackAndErrors` | `gel-reference-core-primitives--feedback-and-errors` | `src/stories/GelReference.stories.tsx` | no | GEL Reference | repo evidence plus existing local adapter evidence | low | clear | should remain non-manifest |
| `GEL Reference/Core Primitives` | `FieldsAndInputs` | `gel-reference-core-primitives--fields-and-inputs` | `src/stories/GelReference.stories.tsx` | no | GEL Reference | repo evidence plus existing local adapter evidence | low | clear | should remain non-manifest |
| `GEL Reference/Core Primitives` | `ProgressStepperReference` | `gel-reference-core-primitives--progress-stepper-reference` | `src/stories/GelReference.stories.tsx` | no | GEL Reference | repo GEL progress-stepper source evidence | low | clear | should remain non-manifest |
| `GEL Reference/Core Primitives` | `StatusLabelReference` | `gel-reference-core-primitives--status-label-reference` | `src/stories/GelReference.stories.tsx` | no | GEL Reference | live GEL index verified plus repo preview evidence | low | clear | should remain non-manifest |
| `GEL Reference/Evidence & Upload` | `FileInputStaticReference` | `gel-reference-evidence-upload--file-input-static-reference` | `src/stories/GelEvidenceUpload.stories.tsx` | no | GEL Reference | live GEL index verified plus repo preview evidence | medium | clear | should remain non-manifest |
| `GEL Reference/Evidence & Upload` | `FileUploadStaticReference` | `gel-reference-evidence-upload--file-upload-static-reference` | `src/stories/GelEvidenceUpload.stories.tsx` | no | GEL Reference | live GEL index verified plus repo preview evidence | medium | clear | should remain non-manifest |
| `GEL Reference/Transaction Inputs` | `CheckboxListReference` | `gel-reference-transaction-inputs--checkbox-list-reference` | `src/stories/GelTransactionInputs.stories.tsx` | no | GEL Reference | live GEL index verified plus repo preview evidence | low | clear | should remain non-manifest |
| `GEL Reference/Transaction Inputs` | `DateInputReference` | `gel-reference-transaction-inputs--date-input-reference` | `src/stories/GelTransactionInputs.stories.tsx` | no | GEL Reference | live GEL index verified plus repo preview evidence | low | clear | should remain non-manifest |
| `GEL Reference/Transaction Inputs` | `DateMultiInputReference` | `gel-reference-transaction-inputs--date-multi-input-reference` | `src/stories/GelTransactionInputs.stories.tsx` | no | GEL Reference | live GEL index verified plus repo preview evidence | low | clear | should remain non-manifest |
| `GEL Reference/Transaction Inputs` | `FieldsetReference` | `gel-reference-transaction-inputs--fieldset-reference` | `src/stories/GelTransactionInputs.stories.tsx` | no | GEL Reference | live GEL index verified plus repo preview evidence | low | clear | should remain non-manifest |
| `gel-preview/Button.ai` | `CssCheck` | `gel-preview-button-ai--css-check` | `src/gel-preview/Button.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `gel-preview/Button.ai` | `LinkAction` | `gel-preview-button-ai--link-action` | `src/gel-preview/Button.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `gel-preview/Button.ai` | `Primary` | `gel-preview-button-ai--primary` | `src/gel-preview/Button.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `gel-preview/Button.ai` | `Secondary` | `gel-preview-button-ai--secondary` | `src/gel-preview/Button.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `gel-preview/InPageAlert.ai` | `Error` | `gel-preview-inpagealert-ai--error` | `src/gel-preview/InPageAlert.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `gel-preview/InPageAlert.ai` | `Information` | `gel-preview-inpagealert-ai--information` | `src/gel-preview/InPageAlert.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `gel-preview/InPageAlert.ai` | `Warning` | `gel-preview-inpagealert-ai--warning` | `src/gel-preview/InPageAlert.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `TaPaaS Components/Cards & Panels` | `DetailsCardContext` | `tapaas-components-cards-panels--details-card-context` | `src/stories/TapaasCardsPanels.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Cards & Panels` | `DetailsCardPattern` | `tapaas-components-cards-panels--details-card-pattern` | `src/stories/TapaasCardsPanels.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Cards & Panels` | `InteractiveDetailsCardPattern` | `tapaas-components-cards-panels--interactive-details-card-pattern` | `src/stories/TapaasCardsPanels.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Cards & Panels` | `PrivacyCardPattern` | `tapaas-components-cards-panels--privacy-card-pattern` | `src/stories/TapaasCardsPanels.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Choices & Inputs` | `ConditionalQuestionPanelPattern` | `tapaas-components-choices-inputs--conditional-question-panel-pattern` | `src/stories/TapaasChoicesInputs.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Choices & Inputs` | `RadioButtonCardStates` | `tapaas-components-choices-inputs--radio-button-card-states` | `src/stories/TapaasChoicesInputs.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Choices & Inputs` | `SearchVehicleInput` | `tapaas-components-choices-inputs--search-vehicle-input` | `src/stories/TapaasChoicesInputs.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Error Pages` | `BusinessErrorPagePattern` | `tapaas-components-error-pages--business-error-page-pattern` | `src/stories/TapaasErrorPages.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Error Pages` | `SystemErrorPagePattern` | `tapaas-components-error-pages--system-error-page-pattern` | `src/stories/TapaasErrorPages.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Evidence & Assessment` | `AssessmentSummaryPanelPattern` | `tapaas-components-evidence-assessment--assessment-summary-panel-pattern` | `src/stories/TapaasEvidenceAssessment.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Evidence & Assessment` | `EvidenceChecklistCardPattern` | `tapaas-components-evidence-assessment--evidence-checklist-card-pattern` | `src/stories/TapaasEvidenceAssessment.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Evidence & Assessment` | `MpsEvidenceAndAssessment` | `tapaas-components-evidence-assessment--mps-evidence-and-assessment` | `src/stories/TapaasEvidenceAssessment.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Modals & Overlays` | `EmailConfirmationModalDesktop` | `tapaas-components-modals-overlays--email-confirmation-modal-desktop` | `src/stories/TapaasModalsOverlays.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Modals & Overlays` | `EmailConfirmationModalMobile` | `tapaas-components-modals-overlays--email-confirmation-modal-mobile` | `src/stories/TapaasModalsOverlays.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Modals & Overlays` | `ExitModalIsolated` | `tapaas-components-modals-overlays--exit-modal-isolated` | `src/stories/TapaasModalsOverlays.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Review & Confirmation` | `ConfirmationHeaderPattern` | `tapaas-components-review-confirmation--confirmation-header-pattern` | `src/stories/TapaasReviewConfirmation.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Review & Confirmation` | `DeclarationReviewPattern` | `tapaas-components-review-confirmation--declaration-review-pattern` | `src/stories/TapaasReviewConfirmation.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Review & Confirmation` | `LegalInfoAccordionPattern` | `tapaas-components-review-confirmation--legal-info-accordion-pattern` | `src/stories/TapaasReviewConfirmation.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Review & Confirmation` | `NextStepsCard` | `tapaas-components-review-confirmation--next-steps-card` | `src/stories/TapaasReviewConfirmation.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Review & Confirmation` | `ReviewInfoCardPattern` | `tapaas-components-review-confirmation--review-info-card-pattern` | `src/stories/TapaasReviewConfirmation.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Review & Confirmation` | `TransactionActionAreas` | `tapaas-components-review-confirmation--transaction-action-areas` | `src/stories/TapaasReviewConfirmation.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Components/Review & Confirmation` | `TransactionSummaryCardPattern` | `tapaas-components-review-confirmation--transaction-summary-card-pattern` | `src/stories/TapaasReviewConfirmation.stories.tsx` | yes | TaPaaS Component | repo source evidence | medium | clear | keep, visual QA needed |
| `TaPaaS GEL Patterns/Form Patterns` | `DateOfBirthPattern` | `tapaas-gel-patterns-form-patterns--date-of-birth-pattern` | `src/stories/TapaasGelPatterns.stories.tsx` | no | TaPaaS GEL Pattern | implementation/test evidence only | low | clear | keep |
| `TaPaaS GEL Patterns/Form Patterns` | `ErrorSummaryAndFieldErrors` | `tapaas-gel-patterns-form-patterns--error-summary-and-field-errors` | `src/stories/TapaasGelPatterns.stories.tsx` | no | TaPaaS GEL Pattern | implementation/test evidence only | low | clear | keep |
| `TaPaaS GEL Patterns/Form Patterns` | `ProgressStepperUsage` | `tapaas-gel-patterns-form-patterns--progress-stepper-usage` | `src/stories/TapaasGelPatterns.stories.tsx` | no | TaPaaS GEL Pattern | implementation/test evidence only | low | clear | keep |
| `TaPaaS GEL Patterns/Form Patterns` | `RequiredAndOptionalFields` | `tapaas-gel-patterns-form-patterns--required-and-optional-fields` | `src/stories/TapaasGelPatterns.stories.tsx` | no | TaPaaS GEL Pattern | implementation/test evidence only | low | clear | keep |
| `TaPaaS Preview/Composites` | `ConditionalAndRepeatable` | `tapaas-preview-composites--conditional-and-repeatable` | `src/stories/TapaasComposites.stories.tsx` | no | TaPaaS Component | implementation/test evidence plus repo evidence | low | clear | improve docs/caveats |
| `TaPaaS Preview/Composites` | `ModalAndBusinessError` | `tapaas-preview-composites--modal-and-business-error` | `src/stories/TapaasComposites.stories.tsx` | no | TaPaaS Component | implementation/test evidence plus repo evidence | low | clear | improve docs/caveats |
| `TaPaaS Preview/Composites` | `MpsEndToEndTransactionAssemblyV1` | `tapaas-preview-composites--mps-end-to-end-transaction-assembly-v-1` | `src/stories/TapaasComposites.stories.tsx` | yes | Transaction Assembly | implementation/test evidence plus repo evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Preview/Composites` | `MpsMedicalEvidenceStatus` | `tapaas-preview-composites--mps-medical-evidence-status` | `src/stories/TapaasComposites.stories.tsx` | yes | TaPaaS Component | implementation/test evidence plus repo evidence | medium | clear | keep, visual QA needed |
| `TaPaaS Preview/Composites` | `ReviewAndConfirmation` | `tapaas-preview-composites--review-and-confirmation` | `src/stories/TapaasComposites.stories.tsx` | no | TaPaaS Component | implementation/test evidence plus repo evidence | low | clear | improve docs/caveats |
| `tapaas-preview/MpsReviewFramePreview.ai` | `FigmaFidelitySlice` | `tapaas-preview-mpsreviewframepreview-ai--figma-fidelity-slice` | `src/tapaas-preview/MpsReviewFramePreview.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `tapaas-preview/MpsReviewFramePreview.ai` | `WithoutEditCallbacks` | `tapaas-preview-mpsreviewframepreview-ai--without-edit-callbacks` | `src/tapaas-preview/MpsReviewFramePreview.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `tapaas-preview/NextStepsCardPreview.ai` | `CompactHeadingLevel` | `tapaas-preview-nextstepscardpreview-ai--compact-heading-level` | `src/tapaas-preview/NextStepsCardPreview.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `tapaas-preview/NextStepsCardPreview.ai` | `OrderedSteps` | `tapaas-preview-nextstepscardpreview-ai--ordered-steps` | `src/tapaas-preview/NextStepsCardPreview.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `tapaas-preview/NextStepsCardPreview.ai` | `UnorderedGuidance` | `tapaas-preview-nextstepscardpreview-ai--unordered-guidance` | `src/tapaas-preview/NextStepsCardPreview.ai.stories.tsx` | no | Other | implementation/test evidence only | medium | partial | retire/reorganise |
| `Transaction Frames/MPS` | `MpsApplicantDetailsFrameFigmaFidelity` | `transaction-frames-mps--mps-applicant-details-frame-figma-fidelity` | `src/stories/TapaasMpsTransactionFrames.stories.tsx` | yes | Transaction Frame | repo source evidence plus MPS screenshot pack | medium | clear | visual QA needed |
| `Transaction Frames/MPS` | `MpsConfirmationFrameFigmaFidelity` | `transaction-frames-mps--mps-confirmation-frame-figma-fidelity` | `src/stories/TapaasMpsTransactionFrames.stories.tsx` | yes | Transaction Frame | repo source evidence plus MPS screenshot pack | medium | clear | visual QA needed |
| `Transaction Frames/MPS` | `MpsReviewFrameFigmaFidelity` | `transaction-frames-mps--mps-review-frame-figma-fidelity` | `src/stories/TapaasMpsTransactionFrames.stories.tsx` | yes | Transaction Frame | repo source evidence plus MPS screenshot pack | medium | clear | visual QA needed |
| `Visual QA & Evidence/Component Intake Board` | `CandidateCards` | `visual-qa-evidence-component-intake-board--candidate-cards` | `src/stories/TapaasComponentIntake.stories.tsx` | no | Visual QA/Evidence | repo source evidence | low | clear | keep |
| `Visual QA & Evidence/Component Intake Board` | `IntakeOverview` | `visual-qa-evidence-component-intake-board--intake-overview` | `src/stories/TapaasComponentIntake.stories.tsx` | no | Visual QA/Evidence | repo source evidence | low | clear | keep |
| `Visual QA & Evidence/Component Intake Board` | `PromotionRules` | `visual-qa-evidence-component-intake-board--promotion-rules` | `src/stories/TapaasComponentIntake.stories.tsx` | no | Visual QA/Evidence | repo source evidence | low | clear | keep |
| `Visual QA & Evidence/Component Intake Board` | `SelectedMaturityBacklog` | `visual-qa-evidence-component-intake-board--selected-maturity-backlog` | `src/stories/TapaasComponentIntake.stories.tsx` | no | Visual QA/Evidence | repo source evidence | low | clear | keep |
| `Visual QA & Evidence/Component Intake Board` | `TemplateRelationships` | `visual-qa-evidence-component-intake-board--template-relationships` | `src/stories/TapaasComponentIntake.stories.tsx` | no | Visual QA/Evidence | repo source evidence | low | clear | keep |
| `Visual QA & Evidence/Selected Maturity` | `SelectedMaturityComponents` | `visual-qa-evidence-selected-maturity--selected-maturity-components` | `src/stories/VisualQaSelectedMaturity.stories.tsx` | yes | Visual QA/Evidence | repo source evidence | medium | clear | keep, visual QA needed |

## Storybook IA assessment

Current structure:

- `GEL Reference/*` is now the clearest place for local, source-informed GEL previews that are not real package adoption.
- `TaPaaS Components/*` holds most manifest-backed coded-preview component stories.
- `Transaction Frames/MPS` now correctly separates bounded MPS frame review from broader composites.
- `Visual QA & Evidence/*` is useful for maturity, intake and evidence review.
- `TaPaaS Preview/Composites` still mixes transaction assembly with older composite groupings.
- Legacy/generated technical story groups remain visible.

Strengths:

- The current title hierarchy separates reference previews, TaPaaS components, transaction frames and visual QA better than earlier Storybook structure.
- The recent MPS move reduced overload in `TaPaaS Preview/Composites`.
- GEL Batches 3A, 3B and 3C were added without acceptance-manifest backing, which is the right boundary.
- Manifest-backed stories are stable in the built index.
- Story-level caveats are strongest in the newer GEL Reference batches and the transaction frame stories.

Issues:

| Issue | Evidence | Severity | Affected stories/files | Recommended action | Impact |
|---|---|---|---|---|---|
| Legacy GEL preview group overlaps with newer GEL Reference groups | `GEL Preview/Form Controls` duplicates the purpose of curated `GEL Reference/*` stories | Medium | `src/stories/GelPreview.stories.tsx` | Rehouse, hide or retire after confirming no stakeholder dependency | Story-only |
| Generated `.ai` story groups are visible beside curated review surfaces | `gel-preview/Button.ai`, `gel-preview/InPageAlert.ai`, `tapaas-preview/MpsReviewFramePreview.ai`, `tapaas-preview/NextStepsCardPreview.ai` use technical lower-case titles and weaker caveats | Medium | `src/gel-preview/*.ai.stories.tsx`, `src/tapaas-preview/*.ai.stories.tsx` | Rehouse under dev evidence or remove from public Storybook if no longer needed | Story-only |
| `TaPaaS Preview/Composites` remains broad | Contains MPS assembly plus non-manifest composite examples and two manifest-backed entries | Medium | `src/stories/TapaasComposites.stories.tsx` | Split only through a manifest-safe move if changing manifest-backed IDs | Manifest-impacting if moved |
| Visual QA Selected Maturity is broad but manifest-backed | One story ID supports several manifest entries | Medium | `src/stories/VisualQaSelectedMaturity.stories.tsx`, manifest | Keep stable for now; split only with explicit acceptance migration | Manifest-impacting |
| Trial Permit has no dedicated current Storybook review surface | Trial Permit runtime is hardened, but no committed transaction assembly story exists in `main` | Low | `src/TrialPermitSkeleton.tsx`, Storybook | Optional story-only review surface later; keep non-manifest unless explicitly approved | Story-only |
| Batch 3C upload references are correctly static but high-risk by domain | File upload patterns naturally imply backend, privacy and security behaviour | Medium | `src/stories/GelEvidenceUpload.stories.tsx`, `src/gel-preview/*` | Keep static, caveated and non-manifest; defer DropZone and UploadedItem | Story-only |

Whether stories are in the wrong bucket:

- The new `GEL Reference/*` groups are correctly placed.
- `Transaction Frames/MPS` is correctly placed.
- `TaPaaS Components/*` is broadly coherent.
- `GEL Preview/Form Controls` and the `.ai` story groups are the main IA outliers.
- `TaPaaS Preview/Composites` is acceptable short term, but should not keep accumulating new transaction assemblies.

Storybook ID risk:

- Any move of manifest-backed stories is acceptance-manifest impacting.
- Safe candidates for story-only IA cleanup are non-manifest legacy/generated stories.
- Do not move `Transaction Frames/MPS`, `TaPaaS Components/*`, `Visual QA & Evidence/Selected Maturity`, `MpsEndToEndTransactionAssemblyV1` or `MpsMedicalEvidenceStatus` without an explicit manifest migration.

Trial Permit position:

- Trial Permit should remain runtime/app evidence plus an optional Storybook-only review surface.
- It should not be promoted into acceptance-manifest backing without source-owner approval and explicit acceptance criteria.
- Any Trial Permit Storybook surface should clearly say it is transaction assembly review only, not source parity, production readiness, final-copy approval or accessibility compliance evidence.

## Acceptance manifest assessment

Manifest health:

| Check | Result |
|---|---|
| Manifest entries | 25 |
| Manifest story references | 42 |
| Unique manifest-backed Storybook IDs | 28 |
| Missing IDs in built Storybook index | 0 |
| Obsolete old MPS frame IDs in manifest | 0 |
| Obsolete old MPS frame IDs in built index | 0 |
| Static acceptance | Passed |
| Storybook acceptance | Passed |

ID integrity:

- The expected moved MPS IDs are present:
  - `transaction-frames-mps--mps-review-frame-figma-fidelity`
  - `transaction-frames-mps--mps-applicant-details-frame-figma-fidelity`
  - `transaction-frames-mps--mps-confirmation-frame-figma-fidelity`
- The old IDs are absent:
  - `tapaas-preview-composites--mps-review-frame-figma-fidelity`
  - `tapaas-preview-composites--mps-applicant-details-frame-figma-fidelity`
  - `tapaas-preview-composites--mps-confirmation-frame-figma-fidelity`
- Some stories are intentionally reused across multiple manifest entries. That is acceptable, but it increases coupling.

Risks:

| Risk | Evidence | Recommendation |
|---|---|---|
| Manifest-backed story moves can break acceptance | MPS move required explicit manifest remapping | Keep the current manifest-safe process: build Storybook, inspect generated IDs, update only intended IDs |
| Broad stories create acceptance coupling | `Visual QA & Evidence/Selected Maturity` supports several entries | Keep stable until a deliberate split is approved |
| Preview-only stories may be mistaken as acceptance-backed | 41 non-manifest stories exist | Keep caveats visible and avoid adding GEL references to manifest |
| Expected text checks prove only string presence | Acceptance checks passed but do not prove pixel, source or accessibility parity | Add separate visual/manual QA evidence gates |

Candidates for future acceptance backing:

- No GEL Reference Batch 3A, 3B or 3C stories should be acceptance-manifest-backed yet.
- Trial Permit review surface, if added later, should start non-manifest.
- Some TaPaaS component stories could be split into narrower manifest-backed IDs later, but only if there is a clear review need.

Manifest-backed stories that may need review rather than demotion:

- `visual-qa-evidence-selected-maturity--selected-maturity-components`, because it is broad and shared.
- `tapaas-preview-composites--mps-medical-evidence-status`, because evidence/upload boundaries are high-risk and source-gated.
- `tapaas-preview-composites--mps-end-to-end-transaction-assembly-v-1`, because transaction assembly is useful but not source-complete production proof.

## Source and parity assessment

Parity classification by group:

| Group | Source parity | Visual parity confidence | Behavioural parity confidence | Accessibility confidence | Notes |
|---|---|---|---|---|---|
| GEL Reference/Core Primitives | medium | moderate | weak to intentionally simplified | manual QA required | Live GEL index confirms relevant GEL stories exist. Local adapter is source-informed only, not real GEL adoption. |
| GEL Reference/Transaction Inputs | medium | moderate | intentionally static for date examples | structurally improved, manual QA required | Fieldset, CheckboxList and date references are useful for design review, but no validation/date parsing claim is available. |
| GEL Reference/Evidence & Upload | low to medium | moderate | intentionally static | manual QA required | FileInput and FileUpload are static shells only. DropZone and UploadedItem remain deferred. |
| TaPaaS GEL Patterns/Form Patterns | medium | moderate | moderate for simple local patterns | structurally improved, manual QA required | Good pattern references, but not source approval or WCAG proof. |
| TaPaaS Components/Cards & Panels | medium | moderate | moderate | manual QA required | Strong source evidence exists for several components, with `#f4f7f9` review-card background concerns remaining source-gated. |
| TaPaaS Components/Error Pages | medium | moderate | weak to moderate | manual QA required | Useful coded previews, but no backend routing or service-failure proof. |
| TaPaaS Components/Evidence & Assessment | medium | moderate | weak to intentionally static | manual QA required | Source-backed preview only; no real evidence upload, assessment engine or validation. |
| TaPaaS Components/Modals & Overlays | medium | moderate | moderate for preview, not formal focus proof | manual QA required | Existing tests help, but modal focus-management and assistive technology claims still need manual QA. |
| TaPaaS Components/Review & Confirmation | medium to high for source-backed preview | moderate | moderate | manual QA required | Strong review/confirmation component set, but final copy and transaction policy remain source-gated. |
| Transaction Frames/MPS | medium to high within bounded frame scope | moderate to strong for inspected frames | moderate for preview interactions | manual QA required | Good bounded frame review surface. Not full transaction or production parity. |
| Trial Permit runtime flow | source-gated for Trial Permit-specific source parity | not reviewed in Storybook | runtime tests exist | structurally improved, manual QA required | Runtime was quality-hardened, but no dedicated Storybook review surface is currently in `main`. |
| Visual QA & Evidence | not applicable to production parity | not applicable | not applicable | not reviewed | Useful evidence surfaces, not product UI. |

Source/Figma/GEL notes:

- The live GEL Storybook index supports that the reference targets exist in GEL, including the 3A, 3B, 3C and likely 3D candidate areas.
- The local preview adapter should remain framed as source-informed. It is not a substitute for importing and testing `@snsw-gel/react`.
- MPS source evidence is stronger than most other transaction evidence because it has a relationship map, coverage matrix, frame stories, review pack and screenshot evidence references.
- The supplied MPS Figma URL for node `0:16535` is an overview of the MPS Final board. It supports broad flow orientation, but exact visual parity still needs targeted extraction of the specific child frames used by Storybook.
- The supplied `0:33253` Figma URL resolves to the Water Carting mobile board inside the same source file. Treat it as mobile transaction-template reference only, not MPS-specific parity evidence.
- The supplied Components and Templates URLs support source orientation for backend-error/component and privacy-step/template patterns, but targeted node checks remain required before changing source-gated visual details.
- Trial Permit has runtime hardening and deployment evidence, but transaction-specific Storybook parity remains optional and non-manifest unless explicitly approved.
- The known `#f4f7f9` background colour concern appears in shared preview CSS and remains source-gated. It should not be patched without approved token/source evidence.

## Visual validation findings

Visual validation performed:

- Built Storybook rendered locally after `npm run build:all`.
- Representative stories were opened in Chromium at desktop and mobile widths.
- Checks covered GEL Reference Core, Transaction Inputs, Evidence & Upload, TaPaaS Review/Confirmation, Evidence/Assessment, MPS Transaction Frames, MPS composite assembly and Visual QA evidence.

Findings:

| Story/component | Source compared against | Severity | Confidence | Evidence | Recommended next action |
|---|---|---|---|---|---|
| Storybook mobile overflow, follow-up 2026-05-30 | Local full-catalogue mobile browser sweep at 390 x 844 | Medium, fixed | Strong | Initial sweep found 5 mobile overflow stories; `Input` and `Select` local preview widths were clamped to container width; follow-up sweep across all 69 stories returned zero overflow issues | Keep the clamp; do not treat this as GEL package parity evidence |
| GEL Reference stories | Live GEL index plus local caveats | Low | Moderate | Representative GEL stories rendered with visible source-informed caveats | Keep non-manifest; do not claim package parity |
| Batch 3C FileInput/FileUpload | Live GEL index plus local static-boundary docs | Medium | Moderate | Stories rendered at desktop/mobile and contained zero `input[type="file"]` elements | Keep caveats visible; defer DropZone/UploadedItem |
| MPS Review frame | Repo source evidence and screenshot pack references | Medium | Moderate | Story rendered at desktop/mobile without horizontal overflow | Run a future visual QA pass against committed/reference screenshots |
| MPS Applicant Details frame | Repo source evidence and screenshot pack references | Medium | Moderate | Story rendered at desktop/mobile without horizontal overflow | Check date field, address and contact details against source frame with current Figma node evidence |
| MPS Confirmation frame | Repo source evidence and screenshot pack references | Medium | Moderate | Story rendered with confirmation/reference content; smoke phrase expected `Application received`, while current text says `Your application has been submitted` | Treat wording as source-gated; do not patch without source confirmation |
| `TaPaaS Preview/Composites` | Repo implementation evidence | Medium | Moderate | MPS assembly rendered at desktop/mobile | Keep assembly review caveats; consider IA split later |
| Review info card | Source evidence docs | Low | Moderate | Story rendered; smoke phrase expected `Change`, while story currently presents review data without that exact phrase in visible text | Confirm edit-link requirements during visual QA |
| Review/card-like backgrounds | CSS source search | Medium | Strong for presence, weak for source correctness | `#f4f7f9` remains in shared preview CSS | Source-gated token review, no immediate patch |
| Legacy `.ai` stories | Implementation evidence only | Medium | Strong | Visible Storybook titles use generated/dev naming | Rehouse or retire during Storybook IA cleanup |

No pixel-perfect claim is made. Current visual confidence is enough to say the stories render and are suitable for bounded review, not enough to approve parity.

Source-parity patch deferrals after supplied Figma URL review:

| Area | Decision | Reason |
|---|---|---|
| MPS frame spacing, footer chrome and exact mobile layout | Defer | The supplied MPS node is a large overview board. Patch only after targeted child-frame comparison for the exact Storybook frame. |
| Water Carting mobile layouts | Defer for MPS | The supplied mobile node is useful mobile transaction-template evidence, but it is not MPS-specific source parity evidence. |
| Backend/business error visuals | Defer | The supplied Components node is an overview/reference board. Patch only after selecting the exact backend-error child component/frame. |
| Privacy-step and transaction-template details | Defer | The supplied Templates node supports page-template orientation, not exact content, copy, spacing or approval for current stories. |
| Shared `#f4f7f9` review-card background | Defer | Still source-gated until a selected source component/frame or approved token decision confirms replacement. |

## Component quality findings

Strengths:

- The newer GEL Reference stories consistently state local-preview boundaries.
- Batch 3B inputs are semantically oriented and avoid validation or policy claims.
- Batch 3C correctly avoids real upload controls and backend-adjacent behaviour.
- MPS frame stories are now in a more accurate transaction-frame grouping.
- Review and confirmation component coverage is broad and supported by manifest entries.
- Existing tests cover several semantic and interaction boundaries, including GEL preview inputs, error summaries, transaction inputs and evidence upload references.

Weaknesses:

- Legacy/generated Storybook stories dilute the curated Storybook IA.
- Some broad stories are doing too much, especially `Visual QA & Evidence/Selected Maturity` and `TaPaaS Preview/Composites`.
- Modal and overlay previews remain higher-risk because focus, keyboard looping, dismiss behaviour and assistive technology behaviour are not fully proven by Storybook presence.
- Date and upload references are useful, but intentionally do not prove parsing, masking, validation, upload, security or privacy behaviours.
- Source parity varies by group, and exact Figma node evidence is not current for every story.

Component-by-component group notes:

| Group | Component intent | Composition quality | Behaviour boundary | Content boundary | Accessibility/semantics | Test and validation coverage |
|---|---|---|---|---|---|---|
| GEL Reference/Core Primitives | Good reference intent | Suitable for isolated review | Mostly static or basic preview | Good caveats | Structural only | Storybook/build smoke, no manifest |
| GEL Reference/Transaction Inputs | Good transaction-form intent | Useful grouping | No parsing/validation | Neutral wording | Fieldset/labels oriented | Unit tests plus Storybook/build smoke |
| GEL Reference/Evidence & Upload | Good but high-risk | Static shell is appropriate | Correctly no real upload | Caveats visible | Labels/hints oriented | Unit tests plus Storybook/build smoke |
| TaPaaS GEL Patterns/Form Patterns | Useful pattern set | Good for form review | Limited local behaviours | Generally neutral | Structural | Storybook/build smoke |
| Cards & Panels | Reusable across transactions | Good | Mostly static | Some source-gated copy | Needs manual QA | Manifest-backed |
| Choices & Inputs | Useful transaction controls | Good | Preview-only | Avoids hard policy logic | Needs manual QA | Manifest-backed |
| Error Pages | Useful state previews | Good | No backend routing | Preview-only | Needs manual QA | Manifest-backed |
| Evidence & Assessment | Useful but source-gated | Good for review | Static/no backend | Avoids approval claims | Needs manual QA | Manifest-backed |
| Modals & Overlays | High review value | Good | Focus-management claims need restraint | Avoids final approval claims | Manual QA required | Manifest-backed plus tests |
| Review & Confirmation | Strong transaction value | Strong | Review/edit needs route realism caveat | Final copy source-gated | Manual QA required | Manifest-backed |
| Transaction Frames/MPS | Strong bounded transaction value | Strongest transaction grouping | Preview interactions only | Source-gated copy | Manual QA required | Manifest-backed |
| Visual QA & Evidence | Good evidence intent | Not product composition | Not applicable | Good caveats | Not a product UI | One manifest-backed broad story |

## Accessibility and manual QA gates

Structurally improved:

- Newer field/input references use semantic labels, legends or grouped structures.
- Error summary and field-error patterns are represented and tested locally.
- Transaction CTA ordering has been corrected in shared preview components.
- File upload references avoid fake interactive upload behaviour.
- MPS frame stories render without obvious desktop/mobile horizontal overflow in the representative smoke pass.

Still untested:

- Keyboard traversal through all manifest-backed stories.
- Focus visibility and focus order across composite and frame stories.
- Modal focus trapping, return focus and escape/dismiss behaviour.
- Screen reader announcement behaviour for status labels, errors, caveats, date inputs and upload references.
- Colour contrast in all states, including the `#f4f7f9` review-card-like backgrounds.
- Responsive visual fidelity beyond simple no-overflow smoke checks.
- Assistive technology handling of review/edit relationships and confirmation/reference content.

Cannot be claimed:

- WCAG compliance.
- GEL accessibility parity.
- TaPaaS accessibility approval.
- Real upload accessibility.
- Modal accessibility readiness.
- Production transaction readiness.

Recommended manual QA gates:

| Gate | Stories to prioritise | Evidence needed |
|---|---|---|
| Keyboard/focus smoke | Manifest-backed TaPaaS components, MPS frames, modals | Tab order notes, focus screenshots or video, blockers logged |
| Screen reader spot check | Error summary, date inputs, upload references, review/edit cards | Announced names/roles/relationships |
| Contrast check | Status labels, cards/panels, review-card backgrounds, error states | Tool output or manual contrast notes |
| Responsive check | MPS frames, MPS assembly, Trial Permit runtime, modals | Mobile/tablet/desktop screenshots |
| Source copy check | Confirmation, privacy/T&Cs, declaration, Trial Permit content | Source-owner confirmation or explicit unknowns |

## Risk register

| ID | Risk | Affected area | Severity | Likelihood | Evidence | Recommended treatment | Owner type |
|---|---|---|---|---|---|---|---|
| R1 | Local preview adapter diverges from real `@snsw-gel/react` | All GEL Reference stories | High | High | Repo uses `src/gel.ts` local adapter | Keep non-manifest; plan real GEL adoption separately | engineering, GEL/TaPaaS |
| R2 | Preview stories may be mistaken for production approval | All Storybook review surfaces | High | Medium | Many stories render realistic transaction UI | Keep visible caveats and no-go claims | product, design |
| R3 | File upload references may imply real upload/security behaviour | Batch 3C | High | Medium | Upload components are security/privacy/backend-adjacent | Keep static; defer DropZone/UploadedItem | privacy/legal/policy, engineering |
| R4 | Modals/help patterns can imply focus-management readiness | Modals, future Batch 3D | High | Medium | Existing modal previews cannot prove AT/focus behaviour alone | Require manual QA before approval claims | accessibility, engineering |
| R5 | Source-gated transaction copy remains unresolved | Trial Permit, MPS confirmation, privacy/T&Cs, declarations | High | Medium | Docs consistently mark source/final-copy limits | Require source-owner review | content/source owner |
| R6 | Acceptance manifest can become stale when Storybook IDs move | Manifest-backed stories | High | Medium | MPS move required manifest remap | Build and inspect generated IDs before manifest edits | engineering |
| R7 | Bundle-level string searches can falsely flag old strings | Acceptance/parity checks | Medium | Medium | Prior workflow notes warn about unrelated preview strings | Prefer story-level and source-level checks | engineering |
| R8 | Visual QA and accessibility claims require manual evidence | All manifest-backed stories | High | High | Automated checks pass but do not prove WCAG or pixel parity | Add manual QA gates | accessibility, design |
| R9 | Review-card background token replacement remains source-gated | Cards/panels, review surfaces | Medium | Medium | `#f4f7f9` exists in shared preview CSS | Do not patch without approved token evidence | design, GEL/TaPaaS |
| R10 | Broad Visual QA story creates acceptance coupling | `Visual QA & Evidence/Selected Maturity` | Medium | Medium | One story supports multiple manifest entries | Split only with explicit manifest migration | engineering |
| R11 | Transaction assembly stories can be read as source-complete flows | MPS assembly, optional Trial Permit story | Medium | Medium | Assembly surfaces look like real flows | Keep assembly review caveats | product, design |
| R12 | Figma evidence may be stale or incomplete | Source parity claims | Medium | Medium | Current audit did not have selected nodes for all stories | Use Figma MCP targeted checks before parity claims | design |

## Recommended roadmap

| Slice | Objective | Expected files | Risk | Validation required | Touch manifest? | Touch runtime? | Figma MCP required? |
|---|---|---|---|---|---|---|---|
| A. Storybook IA cleanup | Rehouse or retire legacy/generated preview stories and clarify curated IA | Story files only, possibly architecture doc | Medium | `build:all`, `acceptance:storybook`, `acceptance:static`, `test`, `parity`, `diff --check` | No, unless moving manifest-backed stories | No | No |
| B. Visual QA pass for high-value manifest-backed stories | Capture bounded screenshots/notes for MPS frames, review/confirmation, modals and evidence cards | Docs only, optional small evidence register | Low to medium | `acceptance:static`, `test`, `build:all`, `parity`, browser smoke | No | No | Useful for source checks |
| C. GEL Batch 3D read-only map | Map Modal, MoreInfoModal, MoreInfoPanel, Loader/Skeleton before implementation | Docs/report only | Low | `git diff --check` if docs created | No | No | No, live GEL index enough for first map |
| D. Optional Trial Permit Storybook review surface | Add a non-manifest transaction assembly review story if still wanted | `src/stories/TapaasComposites.stories.tsx` or a clearer transaction assembly file, optional architecture doc | Medium | Full Storybook/build/test/parity suite | No by default | No | Not required unless claiming source parity |
| E. Manual accessibility QA checklist | Define repeatable manual review gates for designer review surfaces | Docs only, optional checklist/register | Low | `acceptance:static`, `test`, `build:all`, `parity` | No | No | No |

Recommended sequence:

1. Slice A, because it reduces confusion before more reference stories are added.
2. Slice C read-only map, because Batch 3D has modal/help/loading risk and should stay assessment-first.
3. Slice B or E, depending on whether the next stakeholder session needs visual evidence or QA readiness.
4. Slice D only if Trial Permit still needs a Storybook-only transaction assembly review surface.

Decision gates:

- Do not move manifest-backed stories without explicit manifest migration approval.
- Do not add GEL reference stories to the acceptance manifest without approval.
- Do not implement DropZone, UploadedItem, Modal focus claims or real upload behaviours without stronger source and QA evidence.
- Do not change runtime code as part of IA cleanup.

## No-go claims

Do not claim:

- Production-ready.
- Source-complete.
- GEL approved.
- TaPaaS approved.
- WCAG compliant.
- Accessibility approved.
- Privacy approved.
- Legal approved.
- Policy approved.
- Real `@snsw-gel/react` adoption.
- Real file picker behaviour in Batch 3C static references.
- Real upload, backend, API, storage, scanning, progress, validation or security behaviour.
- Final Trial Permit copy approval.
- Final MPS transaction policy or eligibility correctness.

## Decision

Recommendation: do a Storybook IA cleanup first.

Rationale:

- The manifest and built Storybook index are currently healthy, so there is no emergency fix.
- The biggest near-term confusion risk is IA drift, not missing component coverage.
- Cleaning up legacy/generated preview groups will make Batch 3D and any Trial Permit review surface easier to assess.
- The cleanup can be docs/story-only if it avoids manifest-backed IDs.

After that, proceed to a read-only Batch 3D mapping for Help, Modal and Loading patterns.
