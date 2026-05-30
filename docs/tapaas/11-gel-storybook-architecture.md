# GEL Storybook architecture

## Status

Batch 1 added a GEL Reference Storybook layer for source-informed local previews only.

Storybook audience-facing titles should describe the review surface, not the implementation batch. Batch labels stay in this document and supporting evidence notes so the project history remains traceable without making the Storybook sidebar implementation-history-focused.

Current dependency boundary:

- `@snsw-gel/react` is not installed in this package.
- No `.npmrc` or private GEL registry access is confirmed in this repo.
- `src/gel.ts` is the single GEL import and adapter boundary.
- Local renders are reference previews, not canonical GEL package exports.

Required wording for rendered GEL reference stories:

- source-informed local preview
- Storybook reference only
- not a production GEL export
- not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim

## Storybook information architecture

| Section | Purpose | Example stories | Acceptance level |
|---|---|---|---|
| GEL Reference | Show GEL components as source-informed local previews through `src/gel.ts`. | `GEL Reference/Core Primitives` | Story-only by default |
| TaPaaS GEL Patterns | Show composed transaction patterns that use GEL primitives with TaPaaS guidance. | `TaPaaS GEL Patterns/Form Patterns` | Story-only and review-gated before manifest entry |
| TaPaaS Exported/Adapted Components | Show coded TaPaaS components with a stable exported contract. | Existing TaPaaS preview composites | Manifest-backed only when accepted |
| Transaction Assemblies | Show thin transaction slices and frame previews. | MPS transaction preview stories | Manifest-backed only where transaction-critical |
| Visual QA & Evidence | Show source intake, maturity, promotion and review-gate material for designers, owners and maintenance. | `Visual QA & Evidence/Component Intake Board` | Evidence and guidance only unless separately manifest-backed |

## Target Storybook IA

Use this target structure for future Storybook navigation:

| Target section | Audience | Purpose | Notes |
|---|---|---|---|
| GEL Reference | Engineers and designers | Local source-informed reference previews for GEL primitives. | Story-only by default; no primitive-only manifest entries. |
| TaPaaS GEL Patterns | Engineers and transaction designers | Repeatable transaction patterns composed from GEL primitives. | Story-only until a later transaction-critical pattern is explicitly accepted. |
| TaPaaS Components | Engineers and reviewers | Manifest-backed or candidate TaPaaS exported/adapted components. | Keep acceptance IDs stable when moving stories. |
| Transaction Frames | Designers and source owners | Bounded source-review frames for MPS and future transaction screens. | Screenshot evidence supports review only, not full parity or approval. |
| Transaction Assemblies | Stakeholders and product reviewers | Thin mocked transaction journeys and showcase-safe preview surfaces. | Mock-only unless later backend evidence exists. |
| Visual QA & Evidence | Designers, source owners and Codex/Kiro maintenance | Intake boards, maturity backlog, screenshot-backed review and review-gate guidance. | Evidence-only unless separately manifest-backed. |
| Development Evidence | Engineers and Codex/Kiro maintenance | Generated or development-only smoke stories that support local implementation checks. | Not review-facing, not acceptance-manifest-backed, and not production, source parity, GEL/TaPaaS approval or WCAG evidence. |

Generated `.ai` stories are housed under `Development Evidence/Generated Checks`. They are not review-facing evidence. Curated `GEL Reference`, `TaPaaS Components` and `Transaction Frames` stories remain the preferred surfaces for design review, source-structure review and acceptance-backed evidence.

The legacy `GEL Preview/Form Controls` group is housed under `Development Evidence/Legacy GEL Preview`. It is retained as local smoke/development evidence only, is not acceptance-manifest-backed, and should not be used as the preferred review surface. Use curated `GEL Reference/*` and `TaPaaS GEL Patterns/*` stories for review.

## Transaction assembly review surfaces

Transaction assembly review surfaces sit above isolated component stories and below production approval. They are useful for reviewing how TaPaaS and GEL patterns work together in a mocked transaction journey, but they do not create production, accessibility, GEL, TaPaaS, privacy, legal, policy or source-parity approval by themselves.

Trial Permit can be considered for a future Storybook review surface as a simple transaction assembly benchmark. It should not be presented as a source-complete Trial Permit recreation unless a Trial Permit-specific source flow is supplied and reviewed.

Storybook transaction review should distinguish:

- component evidence: a component or pattern exists and can render in isolation
- composition evidence: components are assembled with the expected page template, CTA, review, confirmation and validation relationships
- source parity evidence: a specific source frame or flow has been checked against the coded surface
- acceptance-manifest evidence: a deliberate manifest-backed target has been declared and passes the relevant checks

Adding a Trial Permit story later would not automatically make it acceptance-backed. It should remain story-only until a deliberate manifest-backed story is created, moved or renamed.

Do not update `docs/tapaas/09-component-acceptance-manifest.json` unless a Storybook ID changes, a new acceptance story is intentionally created, or an existing manifest-backed story must be moved or renamed.

## Phase 2 split status

Phase 2A stopped before moving `SelectedMaturityComponents` because the story is manifest-backed. Phase 2B.1 moves that story into `Visual QA & Evidence/Selected Maturity` with a manifest-safe Storybook ID remap only.

| Phase | Scope | Story ID change | Acceptance impact |
|---|---|---|---|
| Phase 2B.1 | Move `SelectedMaturityComponents` out of `TaPaaS Preview/Composites` into `Visual QA & Evidence/Selected Maturity`. | `tapaas-preview-composites--selected-maturity-components` -> `visual-qa-evidence-selected-maturity--selected-maturity-components` | Same manifest entries, same expected text, same acceptance intent. |
| Phase 2B.2 | Move `BusinessErrorPagePattern` and `SystemErrorPagePattern` out of `TaPaaS Preview/Composites` into `TaPaaS Components/Error Pages`. | `tapaas-preview-composites--business-error-page-pattern` -> `tapaas-components-error-pages--business-error-page-pattern`; `tapaas-preview-composites--system-error-page-pattern` -> `tapaas-components-error-pages--system-error-page-pattern` | Same manifest entries, same expected text, same acceptance intent. Business/recoverable error coverage and technical hard-stop/error-shell coverage remain separate. |
| Phase 2B.3 | Move `ExitModalIsolated`, `EmailConfirmationModalDesktop` and `EmailConfirmationModalMobile` out of `TaPaaS Preview/Composites` into `TaPaaS Components/Modals & Overlays`. | `tapaas-preview-composites--exit-modal-isolated` -> `tapaas-components-modals-overlays--exit-modal-isolated`; `tapaas-preview-composites--email-confirmation-modal-desktop` -> `tapaas-components-modals-overlays--email-confirmation-modal-desktop`; `tapaas-preview-composites--email-confirmation-modal-mobile` -> `tapaas-components-modals-overlays--email-confirmation-modal-mobile` | Same manifest entries, same expected text, same acceptance intent. Modal behaviour, focus management, routing, persistence and email delivery semantics remain unchanged. |
| Phase 2B.4 | Move `RadioButtonCardStates`, `SearchVehicleInput` and `ConditionalQuestionPanelPattern` out of `TaPaaS Preview/Composites` into `TaPaaS Components/Choices & Inputs`. | `tapaas-preview-composites--radio-button-card-states` -> `tapaas-components-choices-inputs--radio-button-card-states`; `tapaas-preview-composites--search-vehicle-input` -> `tapaas-components-choices-inputs--search-vehicle-input`; `tapaas-preview-composites--conditional-question-panel-pattern` -> `tapaas-components-choices-inputs--conditional-question-panel-pattern` | Same manifest entries, same expected text, same acceptance intent. `RadioButtonCardStates` remains concept-gated; selected, focus, error and colour treatment remain unchanged. `ConditionalAndRepeatable` stays in `TaPaaS Preview/Composites`. |
| Phase 2B.5 | Move `EvidenceChecklistCardPattern`, `AssessmentSummaryPanelPattern` and `MpsEvidenceAndAssessment` out of `TaPaaS Preview/Composites` into `TaPaaS Components/Evidence & Assessment`. | `tapaas-preview-composites--evidence-checklist-card-pattern` -> `tapaas-components-evidence-assessment--evidence-checklist-card-pattern`; `tapaas-preview-composites--assessment-summary-panel-pattern` -> `tapaas-components-evidence-assessment--assessment-summary-panel-pattern`; `tapaas-preview-composites--mps-evidence-and-assessment` -> `tapaas-components-evidence-assessment--mps-evidence-and-assessment` | Same manifest entries, same expected text, same acceptance intent. No upload, validation, storage, file handling, backend behaviour or medical evidence state mapping changed. `MpsMedicalEvidenceStatus` stays in `TaPaaS Preview/Composites` and remains review-gated. |
| Phase 2B.6 | Move `DetailsCardPattern`, `DetailsCardContext`, `InteractiveDetailsCardPattern` and `PrivacyCardPattern` out of `TaPaaS Preview/Composites` into `TaPaaS Components/Cards & Panels`. | `tapaas-preview-composites--details-card-pattern` -> `tapaas-components-cards-panels--details-card-pattern`; `tapaas-preview-composites--details-card-context` -> `tapaas-components-cards-panels--details-card-context`; `tapaas-preview-composites--interactive-details-card-pattern` -> `tapaas-components-cards-panels--interactive-details-card-pattern`; `tapaas-preview-composites--privacy-card-pattern` -> `tapaas-components-cards-panels--privacy-card-pattern` | Same manifest entries, same expected text, same acceptance intent. Card and panel behaviour, visual state and wording semantics remain unchanged. `PrivacyCardPattern` remains preview-only and does not imply privacy, legal, policy, consent, collection notice or production approval. |
| Phase 2B.7 | Move `NextStepsCard`, `ConfirmationHeaderPattern`, `TransactionActionAreas`, `ReviewInfoCardPattern`, `TransactionSummaryCardPattern`, `DeclarationReviewPattern` and `LegalInfoAccordionPattern` out of `TaPaaS Preview/Composites` into `TaPaaS Components/Review & Confirmation`. | `tapaas-preview-composites--next-steps-card` -> `tapaas-components-review-confirmation--next-steps-card`; `tapaas-preview-composites--confirmation-header-pattern` -> `tapaas-components-review-confirmation--confirmation-header-pattern`; `tapaas-preview-composites--transaction-action-areas` -> `tapaas-components-review-confirmation--transaction-action-areas`; `tapaas-preview-composites--review-info-card-pattern` -> `tapaas-components-review-confirmation--review-info-card-pattern`; `tapaas-preview-composites--transaction-summary-card-pattern` -> `tapaas-components-review-confirmation--transaction-summary-card-pattern`; `tapaas-preview-composites--declaration-review-pattern` -> `tapaas-components-review-confirmation--declaration-review-pattern`; `tapaas-preview-composites--legal-info-accordion-pattern` -> `tapaas-components-review-confirmation--legal-info-accordion-pattern` | Same manifest entries, same expected text, same acceptance intent. Review, confirmation, declaration, legal-info and transaction-action preview stories remain preview-only and do not imply final copy, legal, privacy, policy, accessibility, GEL, TaPaaS or production approval. |
| Phase 2B.8 | Move `MpsReviewFrameFigmaFidelity`, `MpsApplicantDetailsFrameFigmaFidelity` and `MpsConfirmationFrameFigmaFidelity` out of `TaPaaS Preview/Composites` into `Transaction Frames/MPS`. | `tapaas-preview-composites--mps-review-frame-figma-fidelity` -> `transaction-frames-mps--mps-review-frame-figma-fidelity`; `tapaas-preview-composites--mps-applicant-details-frame-figma-fidelity` -> `transaction-frames-mps--mps-applicant-details-frame-figma-fidelity`; `tapaas-preview-composites--mps-confirmation-frame-figma-fidelity` -> `transaction-frames-mps--mps-confirmation-frame-figma-fidelity` | Same manifest entries, same expected text, same acceptance intent. These remain bounded source-frame review surfaces only; full-frame, mobile, content, assistive-technology and production behaviour parity remain review-gated. `MpsEndToEndTransactionAssemblyV1` and `MpsMedicalEvidenceStatus` stay in `TaPaaS Preview/Composites`. |

The remaining manifest-backed split of `TaPaaS Preview/Composites` is deferred. Future clusters should continue to move one audience group at a time and update only the affected Storybook IDs in the manifest.

## Batch 1 reference inventory

| GEL package/component | TaPaaS use case | Story target | Recommended action | Acceptance level | Notes |
|---|---|---|---|---|---|
| Button | Primary, secondary, tertiary and link-style actions | `ButtonsAndLinks` | import-as-is through `src/gel.ts` | Story-only | Do not create a TaPaaS wrapper without a real contract. |
| TextLink | Inline content links | `ButtonsAndLinks` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| Content / Heading | Basic page content structure | `ButtonsAndLinks` | import-as-is through `src/gel.ts` | Story-only | Local content examples only. |
| Field | Label, hint and error layout around form controls | `FieldsAndInputs` | import-as-is through `src/gel.ts` | Story-only | Compose with input controls in stories. |
| Input | Text entry | `FieldsAndInputs` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| Select | Single select input | `FieldsAndInputs` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| Textarea | Multi-line text entry | `FieldsAndInputs` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| Checkbox | Binary choice | `ChoiceControls` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| RadioButtonList | Mutually exclusive choice set | `ChoiceControls` | import-as-is through `src/gel.ts` | Story-only | TaPaaS card-style radio patterns remain separate. |
| ErrorSummary | Form-level error navigation | `FeedbackAndErrors` | import-as-is through `src/gel.ts` | Story-only | No compliance claim from Storybook rendering. |
| InPageAlert | Inline status and warning content | `FeedbackAndErrors` | import-as-is through `src/gel.ts` | Story-only | Use preview-only state examples. |
| Callout | Highlighted informational content | `FeedbackAndErrors` | import-as-is through `src/gel.ts` local preview boundary | Story-only | Source shows Callout wraps InPageAlert with `variant='callout'`. |
| ProgressStepper | Short transaction progress display | `ProgressStepperReference` export, displayed as `Progress stepper` | import-as-is through `src/gel.ts` | Story-only | Use bounded 4-step reference only. |

## Batch 3A reference inventory

Batch 3A adds Storybook-only GEL Reference coverage for selected Navigation & Status components. These remain source-informed local previews through `src/gel.ts`; they are not real `@snsw-gel/react` adoption, not acceptance-manifest-backed, and not production, accessibility, WCAG, GEL, TaPaaS, legal, privacy or policy approval evidence.

| GEL package/component | TaPaaS use case | Story target | Recommended action | Acceptance level | Notes |
|---|---|---|---|---|---|
| Breadcrumb | Transaction navigation context and page hierarchy review | `BreadcrumbReference` export, displayed as `Breadcrumb` | source-informed local preview through `src/gel.ts` | Story-only | Static links only. No routing, analytics, mobile truncation parity or production GEL package behaviour claim. |
| StatusLabel | Transaction review/status labelling examples | `StatusLabelReference` export, displayed as `Status label` | source-informed local preview through `src/gel.ts` | Story-only | Static labels only. No workflow state, live announcement or production GEL package behaviour claim. |
| Pagination | Multi-page result navigation | Deferred | do not add in Batch 3A | Deferred | Read-only coverage map rated transaction-review value low for current transaction assembly work. |

## Batch 3B reference inventory

Batch 3B adds Storybook-only GEL Reference coverage for Transaction Inputs. These are local reference previews through `src/gel.ts` for design and composition review only. They are not acceptance-manifest-backed, do not introduce the real `@snsw-gel/react` package dependency, and do not prove production behaviour, source parity, accessibility compliance, WCAG compliance, GEL approval, TaPaaS approval, privacy approval, legal approval or policy approval.

Date examples are visual/reference-only. They do not add date parsing, masking, validation, age checks, eligibility logic, storage, form submission or backend behaviour.

| GEL package/component | TaPaaS use case | Story target | Recommended action | Acceptance level | Notes |
|---|---|---|---|---|---|
| Fieldset | Grouped transaction controls with a legend and help/error relationship | `FieldsetReference` export, displayed as `Fieldset` | source-informed local preview through `src/gel.ts` | Story-only | Semantic grouping reference only. Does not replicate GEL FocusGroup, theming, margin system or full accessibility behaviour. |
| CheckboxList | Multiple independent checkbox options for neutral transaction preferences | `CheckboxListReference` export, displayed as `Checkbox list` | source-informed local preview through `src/gel.ts` | Story-only | No consent, declaration, privacy, eligibility, policy or approval logic. |
| DateInput | Single date-shaped text input reference | `DateInputReference` export, displayed as `Date input` | source-informed local preview through `src/gel.ts` | Story-only | Visual reference only. No parsing, formatting, masking or validation callback behaviour. |
| DateMultiInput | Day/month/year grouped date reference | `DateMultiInputReference` export, displayed as `Date multi input` | source-informed local preview through `src/gel.ts` | Story-only | Visual grouping reference only. No hidden value generation, date object handling, validation or age calculation. |

## Batch 3C reference inventory

Batch 3C adds static Storybook-only GEL Reference coverage for Evidence & Upload. These are local reference previews through `src/gel.ts` for design and composition review only. They are not acceptance-manifest-backed, do not introduce the real `@snsw-gel/react` package dependency, and do not prove production upload behaviour, upload security, privacy handling, file validation, accessibility compliance, WCAG compliance, backend integration, GEL approval, TaPaaS approval, legal approval or policy approval.

DropZone and UploadedItem are deferred because drag-and-drop, selected-file display, remove-file behaviour and uploaded-file state need deeper source and behaviour review before this trial should preview them.

| GEL package/component | TaPaaS use case | Story target | Recommended action | Acceptance level | Notes |
|---|---|---|---|---|---|
| FileInput | Static placement of label, hint and select-file style action in an evidence step | `FileInputStaticReference` export, displayed as `File input static reference` | source-informed static local preview through `src/gel.ts` | Story-only | Does not render `input[type='file']`, open a file picker, read selected files, validate file type/size/count, upload, store, scan or persist files. |
| FileUpload | Static shell showing upload guidance and action placement in a transaction page | `FileUploadStaticReference` export, displayed as `File upload static reference` | source-informed static local preview through `src/gel.ts` | Story-only | No DropZone, UploadedItem, progress, remove-file action, API call, backend integration, storage, validation, scanning or production behaviour claim. |
| DropZone | Drag-and-drop upload area | Deferred | do not add in Batch 3C | Deferred | Drag/drop can imply browser, keyboard and assistive-technology behaviour that has not been reviewed. |
| UploadedItem | Uploaded-file row/status display | Deferred | do not add in Batch 3C | Deferred | Live GEL Storybook evidence exists, but the local source package snapshot is missing and remove/status semantics need deeper review. |

## Batch 2 pattern inventory

Batch 2 adds story-only TaPaaS GEL patterns. These stories compose existing GEL primitives and do not create TaPaaS wrappers, transaction refactors or manifest entries.

| Pattern | TaPaaS use case | GEL primitives used | Story target | Acceptance level | Notes |
|---|---|---|---|---|---|
| Error summary + field error pattern | Repeatable form validation display across transaction steps | `ErrorSummary`, `Field`, `Input`, `Select`, `Textarea` | `ErrorSummaryAndFieldErrors` | Story-only, review-gated | Validation and accessibility behaviour remains review-sensitive. |
| Required / optional field pattern | Consistent required marker, optional label and help-text treatment | `Field`, `Input` | `RequiredAndOptionalFields` | Story-only, review-gated | Content and validation wording must stay transaction-specific. |
| Progress stepper usage pattern | Short transaction orientation for bounded flows | `ProgressStepper` | `ProgressStepperUsage` | Story-only, review-gated | Use as guidance for short flows only; longer flows need separate review. |

## Batch 2b pattern inventory

Batch 2b adds a story-only Date/DOB pattern using existing GEL primitives. It does not introduce `DateInput`, `DateMultiInput`, a local date preview component, a TaPaaS wrapper or validation behaviour.

| Pattern | TaPaaS use case | GEL primitives used | Story target | Acceptance level | Notes |
|---|---|---|---|---|---|
| Date / DOB pattern | Repeatable DOB/date grouping for transaction forms | `ErrorSummary`, `Field`, `Input`, `Select` | `DateOfBirthPattern` | Story-only, review-gated | Visual/content/structure guidance only. No DOB validation, age eligibility, identity checks, backend validation or customer-record behaviour. |

## Wrapper policy

Use GEL directly when:

- a GEL component already covers the primitive interaction or content need
- `src/gel.ts` exposes the component
- TaPaaS does not need a separate exported contract

Compose GEL into TaPaaS patterns when:

- multiple GEL primitives form a repeatable transaction pattern
- the pattern has TaPaaS-specific content guidance or review needs
- the pattern is useful in transaction assembly, but is not yet a standalone exported component

Create a TaPaaS wrapper only when:

- TaPaaS needs a stable exported prop contract
- the wrapper encodes a real transaction or platform rule
- there is evidence and review support for the adapted behaviour

Reject a Figma-exported primitive in favour of GEL when:

- the Figma component duplicates a GEL primitive
- there is no TaPaaS-specific contract or pattern behaviour
- using the Figma export would create visual or behavioural drift from GEL

Do not create wrappers for `Button`, `Checkbox`, `Input`, `Select`, `Field`, `Textarea` or `TextLink` in Batch 1.

## Evidence and manifest rules

GEL Reference story only:

- use for simple GEL primitives and local reference previews
- do not add to `docs/tapaas/09-component-acceptance-manifest.json`

TaPaaS pattern story:

- use when GEL primitives are composed into a repeatable transaction pattern
- keep review-gated until source parity and transaction relevance are clear
- keep Batch 2 patterns story-only unless a later transaction-critical use case needs manifest-backed acceptance

Manifest-backed acceptance:

- use only for TaPaaS exported/adapted components or transaction-critical GEL-backed patterns
- require evidence links, Storybook IDs, tests or acceptance checks, and explicit preview boundaries

Screenshot evidence:

- use for visual review and parity discussion
- keep separate from source evidence and acceptance evidence

Review-gated status:

- use when source evidence exists but visual parity, accessibility behaviour, owner review or transaction fit is not settled

## Batch 1 guardrails

- Do not refactor transaction skeletons or assemblies.
- Do not add `@snsw-gel/react`.
- Do not change package, lockfile, registry or `.npmrc` files.
- Do not expand the acceptance manifest with primitive GEL stories.
- Do not touch upload, autosuggest, modal-heavy or backend-like components.
- If implementation requires a file outside the approved Batch 1 file list, stop and report the file, reason and risk before changing it.

## Batch 2 guardrails

- Do not refactor transaction skeletons or assemblies.
- Do not add TaPaaS wrappers.
- Do not add dependencies or registry configuration.
- Do not expand the acceptance manifest with story-only pattern guidance.
- Date/DOB was deferred from Batch 2 and later handled in Batch 2b as story-only pattern guidance.
- Do not touch Manual Address or Accordion/Disclosure patterns in Batch 2.
- Use `src/gel.ts` as the only GEL component import boundary.
- Keep pattern wording explicit: source-informed local pattern preview, Storybook guidance only, not a production GEL export, and not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim.

## Batch 2b guardrails

- Do not refactor transaction skeletons or assemblies.
- Do not add `DateInput`, `DateMultiInput`, local date preview components or TaPaaS date wrappers.
- Do not add eligibility, age calculation, backend validation, identity, customer-record, policy, privacy or legal logic.
- Do not add dependencies or registry configuration.
- Do not expand the acceptance manifest with the Date/DOB pattern story.
- Use `src/gel.ts` as the only GEL component import boundary.
- Keep Date/DOB wording explicit: source-informed local pattern preview, Storybook guidance only, no real DOB validation, and no approval or compliance claims.
