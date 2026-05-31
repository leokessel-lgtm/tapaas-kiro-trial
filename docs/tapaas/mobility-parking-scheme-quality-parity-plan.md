# Mobility Parking Scheme quality parity plan

## Slice 1A status

This document records the MPS source baseline and patch plan after the Slice 0 source-access gate.

Slice 1A is documentation-only. It does not patch runtime UI, Storybook stories, acceptance manifest entries, package files, lockfiles or Track 2 outputs.

This plan does not claim MPS source parity, production readiness, WCAG compliance, accessibility compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval or final copy approval.

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
| Concession details | `concession-validation-state` | Mock validation-state chooser only. No real card validation. |
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
