# Mobility Parking Scheme quality parity plan

## Slice 1A status

This document records the MPS source baseline and patch plan after the Slice 0 source-access gate.

Slice 1A is documentation-only. It does not patch runtime UI, Storybook stories, acceptance manifest entries, package files, lockfiles or Track 2 outputs.

This plan does not claim MPS source parity, production readiness, WCAG compliance, accessibility compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval or final copy approval.

## Source-parity triage status - account, application cards and applicant step marker

This pass applies a narrow source-informed correction for the three deployed review items:

- The account context surface now uses the read-only details-card pattern and removes the non-source `Change mock account` action. It remains a static MyAccount context preview only and does not perform identity proofing or use real account data.
- The MPS application-type cards now use shared decorative pictograms instead of `N`, `R` and `P` letter placeholders. The same pictogram exports are reused by Storybook radio-card examples so the transaction and catalogue review surface do not drift.
- The red `Step 1 of 4` marker is retained and protected because it belongs to the source-backed applicant details frame, while the outer transaction still exposes the broader seven-stage prototype step text.

Still review-gated:

- Exact MyAccount and proof-of-identity frame behaviour.
- Final account, branch and permit copy.
- Exact TaPaaS pictogram assets and selected, hover, focus and error-state pixel parity.
- Assistive-technology behaviour and any production accessibility claim.

## Slice 2A status

Slice 2A applies a narrow mock/source/system-state boundary cleanup to the MPS preview skeleton only.

Fixed in Slice 2A:

- Delivery preferences now carry a visible `Trial-only delivery stress path` caveat.
- The delivery question no longer frames the mock route as behaviour after real service approval.
- Review now carries a compact `Mock/system state summary` caveat before the evidence, concession, payment and assessment summaries.
- The review fee row is labelled as a mock application fee.
- Focused MPS tests cover the delivery boundary, removed real-service delivery wording, review boundary and mock fee label.

Still deferred:

- Review page rebuild from the source/template map.
- Confirmation page rebuild from the source/template map.
- Real permit lookup, identity proofing, concession validation, medical evidence handling, payment and backend assessment behaviour.
- Final MPS content, policy, fees, receipt, notification timing, delivery, approval and fulfilment wording.
- Accessibility, responsive and assistive-technology QA beyond existing automated checks.

## Slice 2B status

Slice 2B applies a narrow page-template audit and container-alignment pass. It does not rebuild detailed review content, detailed confirmation content, field logic, backend behaviour or component choices.

Current page/template mapping:

| Runtime page | Template marker | Treatment |
|---|---|---|
| Privacy information | `start-intro` | Start or introductory page placeholder. Privacy copy remains owner-gated. |
| Account and identity | `identity-state` | Mock account and proof-of-identity state. No identity proofing is performed. |
| Application type, applicant details, representative/contact pages | `form-page` | Form pages with source-gated field and control decisions. |
| Eligibility questions | `eligibility-state` | Hybrid form/system-state area. Eligibility decision remains mock/deferred. |
| Medical evidence | `evidence-state` | Evidence status preview only. No upload, storage, scanning or backend evidence handling. |
| Concession details | `concession-source-state` | Source-confirmed Yes/No question only. Card issuer, card number and validation remain source-gated. |
| Delivery preferences | `kiro-stress-test-form` | Trial-only stress-test page, not confirmed MPS source flow. |
| Payment simulation | `mock-payment-state` | Mock payment/routing state. No provider, receipt or refund behaviour. |
| Declaration | `declaration` | Placeholder legal/policy wording only. |
| Review | `review` | Existing source-informed review frame plus deferred mock/system summaries. Detailed rebuild remains deferred. |
| Outcome | `confirmation` | Existing source-informed confirmation frame plus trial boundary. Detailed rebuild remains deferred. |

Fixed in Slice 2B:

- Added internal page-template markers to the MPS runtime pages so future slices can distinguish form pages, source-informed frames, mock system states and Kiro stress-test pages.
- Fixed the successful outcome wrapper so its `aria-labelledby` target exists.
- Added focused tests for page-template markers, review container presence and confirmation container labelling.

Still source-gated or deferred:

- Whether the representative/contact page belongs in the MPS source flow.
- Whether delivery belongs in the MPS source flow or remains a Kiro stress-test page.
- Review section content, edit routing, concession validity, fees and declaration details.
- Confirmation summary, Keep a record, next steps, TUTD, receipt/reference and post-submit wording.
- Backend-derived state modelling for identity, existing permit lookup, eligibility, concession, medical evidence, payment and assessment.

## Slice 3A status

Slice 3A applies a narrow component-choice and field-relationship cleanup. It does not change validation rules, backend/API state modelling, review content, confirmation content, page routing or reusable TaPaaS rules.

Component-choice issues audited:

- Small fixed option sets currently rendered as dropdowns/selects.
- Nested or visually nested radio/choice patterns.
- Checkbox/radio misuse.
- Weak grouping between question text, options and conditional follow-up content.
- Mock/system-state content that could look like editable customer input.

Fixed in Slice 3A:

- `Reason for replacement` now uses a radio group instead of a select because the preview exposes three fixed mutually exclusive options.
- `Concession card option` used a radio group instead of a select in this slice. Slice 9C later narrowed this to the source-observed Yes/No concession question.
- Focused tests assert both changed groups are radio groups and no longer render as comboboxes.
- Existing Slice 2A boundary labels and Slice 2B page-template markers are preserved.

Retained or deferred:

- Month, street type and state inputs remain in the applicant frame preview because changing those embedded source-informed fields would be a broader applicant-frame/component slice.
- Existing permit lookup, payment scenario and eligibility questions remain mock/system-state previews, not backend implementations. Concession validation was later removed from the editable flow in Slice 9C and is now source-gated.
- Review and confirmation fields remain deferred to later template-backed rebuild slices.
- No MPS-specific component choice rule is promoted to reusable TaPaaS guidance from this slice alone.

## Slice 3B status

Slice 3B adds focused validation and error-handling coverage for the Slice 3A radio-group changes. It does not rewrite validation rules, introduce backend/API behaviour, rebuild review content or rebuild confirmation content.

Validation issues audited:

- Required group validation for `Reason for replacement`, `Concession card option` and `Mock validation result`. Slice 9C later replaced the concession area with a source-observed Yes/No group and removed the mock validation selector.
- Error summary links for radio groups changed or affected by Slice 3A.
- Inline group-level error placement for radio groups.
- Validation wording that could imply real backend concession validation.

Fixed or protected in Slice 3B:

- Added focused tests proving the replacement-reason error summary link targets `#replace-reason`.
- Added focused tests proving concession card option errors target `#concession-card-type`.
- Added focused tests proving concession validation result errors target `#concession-validation-scenario`.
- Slice 9C later replaced this coverage with tests proving the source-observed Yes/No question targets `#has-concession-card`.
- Added focused tests proving the changed radio groups expose inline group-level error messages.
- Protected the visible `Concession validation is simulated` boundary while testing validation. Slice 9C later removed that selector from the editable customer flow and replaced it with a source-gated boundary.

Retained or deferred:

- No DOB, applicant-frame, payment, backend, review or confirmation validation rules were changed.
- Existing mock/system-state warnings remain separate from editable field validation.
- Error-summary focus behaviour is not claimed as accessibility compliance.
- Broader validation timing, keyboard, focus and assistive-technology checks remain manual QA until the MPS structure is stable.
- No MPS-specific validation rule is promoted to reusable TaPaaS guidance from this slice alone.

## Slice 4A status

Slice 4A clarifies backend/API-adjacent state modelling. It does not introduce backend calls, production eligibility logic, real concession validation, real medical evidence handling, real payment behaviour, review rebuilds or confirmation rebuilds.

State model audit:

| State area | Current treatment | Slice 4A classification |
|---|---|---|
| Proof of identity | Static mock account card and POI acknowledgement | Mock backend/API state. No identity proofing. |
| Existing permit number | Customer-entered text field with no lookup action | Customer-entered mock value. Existing permit lookup remains deferred. |
| Eligibility result | User answers plus mock assessment summary | Mock/system-derived preview. No eligibility decision. |
| Concession card Yes/No | Customer-selected radio group | Source-observed preview question only. |
| Concession issuer, number and validation result | Not collected in the runtime input flow | Source-gated pending designer and service-owner confirmation. |
| Medical evidence status | Source-informed status card plus mock evidence scenario | Mock evidence state. No upload, storage, scanning or backend evidence processing. |
| Fee/payment state | Mock fee estimate and payment scenario radio group | Mock payment/routing state. No provider, receipt or refund behaviour. |
| Manual review or assessment state | Mock assessment summary and outcome routing | Mock assessment state. No approval or permit issue. |

Patched in Slice 4A:

- Added a visible `Trial-only validation state selector` caveat before the concession validation result radio group.
- Clarified that the concession validation result is a simulated backend result for reviewers, not a customer-entered concession field.
- Added focused test coverage for the concession validation state boundary.
- Slice 9C later superseded this runtime treatment by removing the mock selector and gating issuer, number and validation details.

Left untouched:

- Existing permit lookup remains absent and source/backend-gated.
- Proof of identity, eligibility, medical evidence, fee/payment and manual-review states remain mock-only.
- Review and confirmation content remain deferred to later template-backed slices.
- No MPS-specific backend/API rule is promoted to reusable TaPaaS guidance from this slice alone.

## Slice 5A status

Slice 5A rebuilds the MPS review page structure within the existing preview frame. It does not rebuild confirmation, introduce backend calls, add Storybook stories, change the acceptance manifest, or claim source parity.

Review issues audited:

- Review content should be summary-style, not editable-form-style.
- Customer-entered answers should be separated from mock/backend/system-derived results.
- Concession issuer, number and validation should remain clearly source-gated unless designers and service owners confirm the intended input and backend treatment.
- Evidence status should not imply real upload, storage, scanning or assessment.
- Existing permit lookup/result state should remain separate from the customer-entered permit number.
- Review edit actions should not appear unless they route to existing editable pages or sections.

Patched in Slice 5A:

- Review sections now separate application details, personal details, concession card details and `Trial-only system states`.
- Existing permit number is labelled as a customer-entered mock value with no lookup result.
- Concession card details now use a source-observed Yes/No row, with issuer and number shown as source-gated when needed.
- Medical evidence, representative/contact, delivery and payment review rows are grouped as trial-only stress and backend states with mock-only or source-gated help text.
- Removed non-routing review edit buttons from the MPS skeleton review page.
- Added focused tests for review summary-style structure, trial-only state grouping, concession validation separation and absence of non-routing edit buttons.

Still source-gated or deferred:

- Source-confirmed review section order, final row labels, fees and declarations.
- Section-level edit routing from review back to editable pages.
- Existing permit lookup result handling.
- Real concession issuer, number and validation handling.
- Confirmation page rebuild.

## Slice 6A status

Slice 6A rebuilds the MPS confirmation page content boundary within the existing preview frame. It does not introduce backend calls, real receipt handling, real permit issue, real payment records, final notification copy, Storybook changes, acceptance-manifest changes, or source-parity claims.

Confirmation issues audited:

- Next-step wording should not imply a real assessment timeframe, notification channel or permit issue process.
- Keep-a-record content should remain a source-gated placeholder until a service owner confirms receipt, record and payment behaviour.
- Development-only reference links should not appear in the transaction confirmation UI.
- Confirmation should preserve the existing trial boundary that no approval, permit issue, payment receipt, eligibility decision or concession validation has occurred.

Patched in Slice 6A:

- Replaced operational next-step wording with source-gated placeholders for assessment timeframe, notification timing and permit issue.
- Added a visible `Keep a record` placeholder that states no real receipt, permit, approval record or payment record has been issued. Slice 9D later replaced this with a caveated source-observed return-card area.
- Removed the developer-facing `Review TaPaaS component-template relationship map` link from the MPS confirmation page.
- Added focused tests for confirmation next steps, keep-a-record boundary, trial boundary and absence of the developer-facing source link.

Still source-gated or deferred:

- Final confirmation title, reference format, summary rows, notification copy and next-step content.
- Real receipt, record, payment, permit issue and approval handling.
- Tell Us Then/TUTD or related transaction content.
- Confirmation mobile/responsive and assistive-technology QA.

## Slice 7A status

Slice 7A performs a full-flow QA pass after the MPS structural slices. It does not patch runtime code, introduce backend behaviour, change Storybook, change package files, change lockfiles, change the acceptance manifest, or claim MPS parity, production readiness, WCAG compliance or accessibility approval.

QA checks performed:

- Ran the full mock-success path from privacy through account/identity, application type, applicant details, representative/contact, eligibility, medical evidence, concession, delivery, payment, declaration, review and confirmation.
- Checked desktop, tablet and mobile viewport widths for the mock-success path.
- Checked review-page boundaries: no non-routing edit buttons, no leaked mock validation selector, trial-only system states remain grouped, and evidence/payment/concession states remain explicitly mock-only.
- Checked confirmation-page boundaries: source-gated next steps, `Keep a record` placeholder, trial boundary and absence of the developer-facing component-template relationship map link. Slice 9D later replaced `Keep a record` with a caveated source-observed return-card area.
- Checked validation summary targets for replacement reason, concession card option and concession mock validation result.

Defects found:

- No MPS-specific runtime defect was found in the checked flow.
- Tablet-width horizontal overflow was detected at the full-page level, but inspection traced it to the shared Service NSW header search chrome, not the MPS transaction content. This remains outside the MPS slice.

Patched in Slice 7A:

- No runtime code was patched.
- This plan was updated with the QA result and remaining caveats.

Still source-gated or deferred:

- Final MPS source/content parity review by designers.
- Manual keyboard, focus, screen-reader and assistive-technology QA.
- Shared Service NSW chrome responsive overflow, if the trial later decides to patch global layout.
- Final confirmation copy, notification timing, receipt/reference, payment, permit issue, approval and backend behaviour.

Designer review readiness:

- Ready for a bounded designer review pass focused on structure, content boundaries, mocked-state clarity and source-gated gaps.
- Not ready for source-parity sign-off, production approval, WCAG/accessibility compliance claims, privacy/legal/policy approval or reusable TaPaaS rule extraction.

Recommended next slice:

- Slice 8A: prepare a designer review pack that summarises what changed, what is source-backed, what remains mock-only and what remains source-gated.

## Slice 8A status

Slice 8A packages the current MPS repair state for bounded designer review. It is documentation-only and does not patch runtime code, tests, Storybook, acceptance-manifest entries, package files, lockfiles, Track 2 files or Community Venue files.

Created review artefact:

- [MPS designer review pack](./mps-designer-review-pack.md)

The review pack separates `SOURCE_CONFIRMED`, `SOURCE_GATED`, `MOCK_BE_STATE`, `TRIAL_ONLY`, `DEFERRED` and `REUSABILITY_GATED` items. It also repeats the non-claims around source parity, production readiness, WCAG/accessibility compliance, real backend/API processing, real approval/permit/payment/concession behaviour and reusable TaPaaS rule promotion.

## Slice 9B status

Slice 9B adds a docs-only row-by-row audit before any further MPS runtime patching. It does not change runtime code, tests, Storybook, acceptance-manifest entries, package files, lockfiles, Track 2 files, Community Venue files or shared Service NSW chrome.

Created audit artefact:

- [MPS source-informed row-by-row audit](./mps-source-informed-row-by-row-audit.md)

The audit compares the runtime against source nodes `0:33144`, `0:33185`, `0:33222`, `0:17387`, `0:17405`, `0:17316`, `0:17333`, `0:17357` and `0:17370`. It recorded concession as the highest-risk source gap because the inspected source page uses a simple NSW concession card Yes/No question while the pre-9C runtime expanded that area into card type, card number and mock validation result.

## Slices 9C to 9G status

Slices 9C to 9G apply the audited MPS runtime and documentation cleanup after the Slice 9B row-by-row audit. They do not introduce real backend behaviour, Storybook changes, acceptance-manifest entries, package changes, lockfile changes, Track 2 changes or source-parity claims.

Fixed in Slices 9C to 9G:

- Slice 9C: Concession input now follows the inspected source question, `Do you have a New South Wales concession card?`, with `Yes` and `No` options only.
- Slice 9C: Card issuer, card number, concession validation, recovery states and backend concession rules are visibly source-gated and are not collected in the runtime input flow.
- Slice 9D: Confirmation uses the source-observed assessment heading, application label, lodgement-date row, next-step areas and return-card area with visible service-owner/source-gated caveats.
- Slice 9E: Review playback now separates first name and last name, adds permit type, and presents concession rows as Yes/No plus source-gated issuer and number rows.
- Slice 9F: Representative/contact, delivery, payment, evidence and assessment rows remain grouped as trial-only or mock state summaries rather than source-parity content.
- Slice 9G: The designer review pack and row-by-row audit have been updated to reflect the post-audit runtime state.

Still source-gated or deferred:

- Final concession issuer, number, validation, recovery and backend rules.
- Whether representative/contact, delivery and payment belong in the confirmed MPS source flow or remain trial-only review aids.
- Real identity proofing, existing-permit lookup, medical evidence upload/storage/scanning, payment, assessment, approval, permit issue, receipt and notification behaviour.
- Final confirmation, return-card, fine-warning, Tell Us Then/TUTD, declaration, fee and post-submit content.
- Review edit routing and manual keyboard, focus, screen-reader, responsive and assistive-technology QA.

Slice 9B does not claim source parity, production readiness, accessibility compliance, GEL approval, TaPaaS approval, final copy approval, backend integration or reusable rule readiness.

## Source access report

File key: `MzngfrwuAT3YI3JRxTgTTo`

| Node | Metadata | Screenshot | Source role | Treatment | Notes |
|---|---|---|---|---|---|
| `0:1` | Readable | Generated | `MOS - Aligned with PSM` canvas with desktop landing, POI, application, concession, review and confirmation frames | SOURCE_CONFIRMED | Primary MPS source anchor for broad desktop flow mapping. |
| `0:16535` | Readable | Generated | `MPS Final` canvas with eligibility branches, concession, review, confirmation and MPS final frames | SOURCE_CONFIRMED | Strongest MPS source anchor for patch planning. |
| `0:33253` | Readable | Generated | `Water Carting - Mobile` canvas with mobile personal details, eligibility, payment, review and confirmation | SOURCE_GATED | Relevance-gated. Do not use as MPS transaction source unless a designer confirms it is an intentional shared mobile reference. |
| `0:33464` | Readable | Generated after smaller isolated retry | `Symbols` canvas with buttons, colours, inputs, notifications, progress bars, file upload and related symbols | REUSABILITY_GATED | Component/symbol reference only. Large screenshot timed out; smaller contents-only screenshot worked. |

## Confirmed source anchors

Use these as the current MPS source anchors for classification and source-template mapping:

- `0:1` - broad desktop MPS/source canvas.
- `0:16535` - strongest MPS final-flow canvas.

Do not use these as production approval evidence. They are live Figma/MCP source evidence for trial planning only.

## Quarantined or limited nodes

| Node | Status | Boundary |
|---|---|---|
| `0:33253` | Relevance-gated | Labelled `Water Carting - Mobile`, not MPS. Treat as out of MPS source scope unless a specific shared pattern is confirmed. |
| `0:33464` | Component-reference only | Use for symbol/component context only. Do not treat it as a transaction flow. |

## Feedback classification

| ID | Feedback theme | Category | Severity | Evidence type | Treatment | Tag |
|---|---|---|---|---|---|---|
| MPS-001 | Unclear whether Kiro used and understood the correct MPS source. | Source/Figma fidelity | Critical | Designer judgement plus Slice 0 MCP evidence | Lock source anchors before patching. | SOURCE_CONFIRMED |
| MPS-002 | Current skeleton is not close enough to source screens. | Source/Figma fidelity | Critical | Designer judgement plus existing source inventory | Compare against `0:1` and `0:16535` before runtime changes. | SOURCE_GATED |
| MPS-003 | Kiro appears to build generic templates instead of TaPaaS page templates. | Page template misuse | Critical | Designer judgement plus repo template registry | Map source screens to Privacy/Input/Declaration/Review/Confirmation templates first. | SOURCE_GATED |
| MPS-004 | Mock BE/API or Kiro stress-test content is mixed with real transaction UI. | Mock/Kiro content confusion | Critical | Designer judgement plus implementation/coverage evidence | Separate real UI, mock backend state and stress-test-only content. | MOCK_BE_STATE |
| MPS-005 | Eligibility is treated too much like ordinary user-entered form data. | Backend/API and eligibility state modelling | Critical | Designer judgement plus MPS source anchors | Model eligibility as user answer, backend-derived state, manual assessment or deferred. | SOURCE_GATED |
| MPS-006 | Existing permit lookup, identity proofing and assessment states are not clearly modelled. | Backend/API and eligibility state modelling | Critical | Designer judgement plus source inventory | Do not invent backend behaviour. Create explicit state boundaries before patching. | MOCK_BE_STATE |
| MPS-007 | Concession card handling needs validation-state modelling, not raw data replay. | Backend/API and concession state modelling | Critical | Designer judgement plus source inventory | Model not selected, pending validation, valid, invalid, mismatch and deferred states. | SOURCE_GATED |
| MPS-008 | Dropdowns appear where radio groups may be expected for limited option sets. | Component choice issues | High | Designer judgement plus symbols/source evidence | Check against source and component symbols before changing controls. | SOURCE_GATED |
| MPS-009 | Nested radio or conditional patterns may not align with GEL/TaPaaS relationships. | Component relationship issues | High | Designer judgement | Re-map parent question, child reveal, validation and summary relationships. | SOURCE_GATED |
| MPS-010 | Error states and messages are inconsistent or not fully displayed. | Validation and error handling | High | Designer judgement | Defer until source pages and validation states are mapped. | DEFERRED |
| MPS-011 | Review has too many confusing Step 7 screens and does not follow the expected review template. | Review page issues | High | Designer judgement plus `0:1`/`0:16535` anchors | Rebuild review from template after source-template map. Do not patch text in isolation. | SOURCE_GATED |
| MPS-012 | Review labels and sections need source-backed cleanup, including contact details, address, concession validity and fees. | Review page issues | High | Designer judgement | Include only source-confirmed sections and source-confirmed fee state. | SOURCE_GATED |
| MPS-013 | Review edit actions need consistent section routing. | Component relationship issues | High | Existing MPS coverage plus designer judgement | Patch after review structure is re-mapped. | DEFERRED |
| MPS-014 | Confirmation does not follow the confirmation template. | Confirmation page issues | High | Designer judgement plus source inventory | Rebuild from confirmation template after page map. | SOURCE_GATED |
| MPS-015 | Confirmation may need summary heading, transaction summary, Keep a record, next steps and TUTD. | Confirmation page issues | High | Designer judgement plus template/source evidence | Add only where source/template confirms. | SOURCE_GATED |
| MPS-016 | Medical evidence upload is mocked but paths and boundaries are unclear. | Mock/Kiro content confusion | High | Existing medical evidence clarification docs plus designer judgement | Keep upload/storage/scanning mock-only unless owner/backend evidence is supplied. | MOCK_BE_STATE |
| MPS-017 | Representative/contact handling may be a stress pattern rather than source-backed MPS flow. | Mock/Kiro content confusion | High | Coverage matrix | Keep representative/contact logic marked skeleton-only until source is found. | REUSABILITY_GATED |
| MPS-018 | Accessibility and responsiveness cannot be judged until structure and validation are repaired. | Accessibility/responsiveness unknowns | High | Manual QA | Defer keyboard, focus, screen-reader, contrast and responsive QA until after structural slices. | DEFERRED |
| MPS-019 | MPS is not ready to produce reusable TaPaaS rules. | Reusability not ready | High | Designer judgement plus source-gated gaps | Promote only rules backed by source, implementation and review evidence. | REUSABILITY_GATED |

## Source screen to page-template map

| Source screen or group | Source anchor | Expected page/template type | Current skeleton status | Action | Tag |
|---|---|---|---|---|---|
| Landing/start | `0:1`, `0:16535` | Start or landing page plus authenticated transaction entry | Partially represented by current skeleton and app switcher | Re-baseline before UI patch. | SOURCE_GATED |
| POI/account identity | `0:1`, `0:16535` | Identity/account or backend-derived state | Mock-only in trial skeleton | Keep out of user-facing certainty unless explicitly source/owner confirmed. | MOCK_BE_STATE |
| Application type | `0:1`, `0:16535` | Form input page with conditional routing | Partially represented | Map source branches before control or copy changes. | SOURCE_CONFIRMED |
| Applicant/personal/contact details | `0:1`, `0:16535` | Form input page | Partially represented, with known review-label feedback | Confirm contact-vs-personal naming and required fields before patching. | SOURCE_GATED |
| Eligibility | `0:1`, `0:16535` | Form/system-state hybrid | High-risk mock logic | Split user answers, backend checks, manual assessment and deferred states. | MOCK_BE_STATE |
| Medical evidence | `0:16535` plus existing medical evidence docs | Evidence upload/status page | Preview-only status handling exists | Keep upload and provide-later behaviour review-gated. | MOCK_BE_STATE |
| Concession | `0:1`, `0:16535` | Validation/system-state page | Partially represented, backend-state risk | Rebuild around validation state if source confirms. | SOURCE_GATED |
| Review | `0:1`, `0:16535` | Review template | Existing bounded review frame exists, but feedback indicates source/template gaps | Rebuild from template after mapping. | SOURCE_GATED |
| Confirmation | `0:1`, `0:16535` | Confirmation template | Existing bounded confirmation frame exists, but feedback indicates template gaps | Rebuild from template after mapping. | SOURCE_GATED |
| Mobile references | `0:33253` | Unknown for MPS | Not MPS-confirmed | Do not use for MPS unless designer confirms relevance. | SOURCE_GATED |
| Symbols/components | `0:33464` | Component reference | Useful for source-informed component checks | Use as component context only. | REUSABILITY_GATED |

## Recommended patch slices

Slice 1A was the source baseline and patch plan. Slice 2A is now limited to boundary cleanup; later slices still need review before broader UI or behaviour changes.

| Order | Slice | Purpose | Boundary |
|---|---|---|---|
| 1 | Source baseline and patch plan | Lock source anchors, classify feedback and map source screens to templates. | Docs only. |
| 2 | Mock/source/system-state boundary cleanup | Separate real UI, mock BE/API states and Kiro stress-test content. | No backend behaviour invented. |
| 3 | Page template correction | Correct start, review and confirmation structure before field-level fixes. | Use source/template evidence first. |
| 4 | Component choice and relationships | Fix radios, sections, conditional fields and nested patterns. | No component replacement without source or manual QA evidence. |
| 5 | Backend/API state modelling | Model permit lookup, concession validation, identity/evidence state and manual review routes. | Preview/mock state only unless backend evidence exists. |
| 6 | Review rebuild | Rebuild from template, not piecemeal text edits. | Include only source-confirmed sections and edit actions. |
| 7 | Confirmation rebuild | Add summary, Keep a record, next steps and TUTD only if source/template-backed. | No final post-submit claims. |
| 8 | Validation and responsive QA | Validate after structure is stable. | No WCAG/accessibility compliance claim. |

## Files that would need to change later

Likely future patch files, subject to approved slice scope:

- `src/MobilityParkingPermitSkeleton.tsx`
- `src/MobilityParkingPermitSkeleton.test.tsx`
- `src/stories/TapaasComposites.stories.tsx`
- `src/stories/TapaasMpsTransactionFrames.stories.tsx`
- MPS-related evidence docs under `docs/tapaas/components/`
- This plan

Storybook, manifest and acceptance changes must be explicitly scoped before any patch.

## Files intentionally not changed in Slice 1A

- Runtime transaction code.
- Storybook stories.
- Acceptance manifest.
- Package files and lockfiles.
- Existing Trial Permit, AMP and Community Venue runtime files.
- Track 2 files and raw Figma JSON outputs.

## Remaining source-gated questions

- Which exact MPS source canvas should drive patch priority: broad `0:1`, `MPS Final` `0:16535`, or a narrower frame subset?
- Is `0:33253` intentionally relevant as shared mobile reference, or should it stay excluded from MPS source truth?
- Which review sections are source-confirmed for the current trial target?
- Which confirmation sections are required: transaction summary, Keep a record, next steps, TUTD, related transactions or receipt?
- Which eligibility, existing-permit, concession, identity and medical evidence states are real backend states versus trial-only mock states?
- Which MPS feedback items are source-fidelity defects versus deliberate stress-test boundaries?

## Validation

Slice 1A requires `git diff --check` only unless files beyond docs are changed.
