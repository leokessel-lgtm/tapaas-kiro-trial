# MPS source-informed row-by-row audit

## Purpose

This audit records a source-informed comparison between the current Mobility Parking Scheme preview and the strongest known MPS source frames before any further runtime patching.

It does not claim MPS source parity, production readiness, WCAG compliance, accessibility compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval, final copy approval or reusable TaPaaS rule readiness.

## Scope

| Area | Source evidence | Runtime surface | Treatment |
|---|---|---|---|
| Concession | Figma `0:33144`, review concession section in `0:33185` | `ConcessionStep`, review concession rows | Highest-risk source gap. Audit before patching. |
| Review | Figma `0:33185` | `ReviewStep`, `MpsReviewFramePreview` | Bounded source-informed match, not parity. |
| Confirmation | Figma `0:33222` | `OutcomeStep`, `MpsConfirmationFramePreview` | Bounded source-informed match with source-gated placeholders. |
| Applicant details | Figma `0:17387`, `0:17405` | `ApplicantStep`, `MpsApplicantDetailsFramePreview` | Strongest aligned area, with backend/search/mobile gaps. |
| Medical evidence | Figma `0:17316`, `0:17333`, `0:17357`, `0:17370` | `MedicalEvidenceStep`, `MpsMedicalEvidenceStatusPreview` | Static status preview only. Upload behaviour excluded. |

## Classification labels

| Label | Meaning |
|---|---|
| `SOURCE_CONFIRMED` | The source frame or source-backed relationship is confirmed enough for audit comparison. |
| `SOURCE_GATED` | Needs designer, service-owner or narrower source confirmation before finalising. |
| `MOCK_BE_STATE` | Represents backend/API, identity, evidence, concession, eligibility, payment or assessment state without real processing. |
| `TRIAL_ONLY` | Included for trial review or stress testing, not confirmed transaction behaviour. |
| `DEFERRED` | Known gap intentionally left for later patching or manual review. |
| `REUSABILITY_GATED` | Not ready to become a reusable TaPaaS rule. |

## Concession audit

| Source node | Source text / component / state | Current runtime text / component / state | Match level | Classification | Patch recommendation | Notes / risk |
|---|---|---|---|---|---|---|
| `0:33144` | Page title `Concession card details`. | Runtime heading `Concession details`. | Partial match | `SOURCE_GATED` | Patch only if designer confirms. | Source wording is more specific. Runtime heading is understandable but not frame-faithful. |
| `0:33144` | Question: `Do you have a New South Wales concession card?` | Runtime legend: `Concession card option`. | Gap | `SOURCE_GATED` | Patch recommended only if source-required. | This is the clearest source mismatch. Source asks a Yes/No question. Runtime starts from a card option taxonomy. |
| `0:33144` | Radio options: `Yes`, `No`. | Runtime options: `No concession card (mock)`, `Centrelink card (mock)`, `DVA card (mock)`. | Gap | `SOURCE_GATED` | Patch recommended only if source-required. | Runtime may be useful for mock routing, but it is not equivalent to the source frame. |
| `0:33144` | No card number field is visible in the inspected source frame. | Runtime conditionally asks for `Concession card number`. | Gap | `SOURCE_GATED` | Patch only if designer or service owner confirms. | Do not remove yet because review source shows concession card detail rows, but input-source evidence for this field is not confirmed by `0:33144`. |
| `0:33144` | No backend validation chooser is visible. | Runtime exposes `Mock validation result` for valid, invalid, mismatch and duplicate outcomes. | Intentional trial-only divergence | `MOCK_BE_STATE` | Defer. | Keep visibly separated if retained. This is reviewer-selected backend state, not customer-entered source UI. |
| `0:33185` | Review section `Concession card details` lists first name, last name, card issuer and card number. | Runtime review section `Concession card details` lists card type and concession validation result. | Partial match | `SOURCE_GATED` | Patch only after concession source decision. | Runtime separates mock validation, but does not replay the source review row set. |

## Review audit

| Source node | Source text / component / state | Current runtime text / component / state | Match level | Classification | Patch recommendation | Notes / risk |
|---|---|---|---|---|---|---|
| `0:33185` | Heading `Review your application`. | `MpsReviewFramePreview` heading `Review your application`. | Strong match | `SOURCE_CONFIRMED` | No patch. | Preserve. |
| `0:33185` | Required-field hint: `* indicates a required field`. | Preview renders required-field hint. | Strong match | `SOURCE_CONFIRMED` | No patch. | Preserve. |
| `0:33185` | Important in-page notification titled `Mobility Parking Scheme permit`. | Preview callout title defaults to `Mobility Parking Scheme permit`. | Strong match | `SOURCE_CONFIRMED` | No patch. | Copy is directionally aligned, final wording still source-gated. |
| `0:33185` | Application details section with `Application type` and `Permit type`. | Runtime section includes application type, existing permit number and replacement reason. | Partial match | `SOURCE_GATED` | Patch only if designer confirms row set. | Runtime adds renewal/replacement branch data from the mock flow. |
| `0:33185` | Personal details section with first name, last name, DOB, residential address, email and phone. | Runtime section includes full name, DOB, email, phone and address. | Partial match | `SOURCE_GATED` | Patch only if designer confirms labels. | Runtime combines first and last name into full name, which is useful but not exact source playback. |
| `0:33185` | Concession card details section with card issuer and card number rows. | Runtime section includes card type and simulated validation result. | Gap | `SOURCE_GATED` / `MOCK_BE_STATE` | Patch after concession decision. | This should not be patched in isolation because it depends on the concession input model. |
| `0:33185` | Visible `Edit` buttons on source sections. | Runtime skeleton removes non-routing review edit buttons. | Intentional trial-only divergence | `DEFERRED` | Defer. | Removal is safer until real edit routes are implemented. The isolated frame preview can still display edit treatment. |
| `0:33185` | Declaration includes checked terms and information collection notice controls. | Runtime preview renders checked declaration rows; skeleton also has a separate declaration step before review. | Partial match | `SOURCE_GATED` | No runtime patch until legal/content confirmation. | Source-like visual treatment exists, but legal/privacy copy and validation semantics remain owner-gated. |
| `0:33185` | Back and Submit CTAs. | Runtime uses back and `Submit mock application`. | Partial match | `TRIAL_ONLY` | No patch. | Mock wording protects against real submission claims. |
| Runtime only | None in source review frame. | `Trial-only system states`, evidence checklist, assessment summary and mock fee card after the review frame. | Intentional trial-only divergence | `MOCK_BE_STATE` | Defer. | These rows are useful for trial review, but should stay clearly outside source-parity claims. |

## Confirmation audit

| Source node | Source text / component / state | Current runtime text / component / state | Match level | Classification | Patch recommendation | Notes / risk |
|---|---|---|---|---|---|---|
| `0:33222` | Heading `Your application has been submitted for assessment.` | Runtime heading is `Your application has been submitted` or `Your application has been received for manual review`. | Partial match | `SOURCE_GATED` | Patch only if designer confirms final outcome copy. | Runtime avoids operational assessment claims. |
| `0:33222` | Confirmation email copy referencing the applicant email. | Preview support text defaults to confirmation email copy, but runtime passes source-gated placeholder context through mock outcome. | Partial match | `SOURCE_GATED` | Defer. | Needs real notification-channel decision before stronger wording. |
| `0:33222` | Application details rows: reference number, application, lodgement date. | Runtime details: applicant, application type and outcome route. Reference is shown separately by the preview component. | Partial match | `SOURCE_GATED` | Patch only if designer confirms summary rows. | Lodgement date and source application label are not currently replayed in the runtime outcome. |
| `0:33222` | `What happens next?` with four operational next steps. | Runtime uses source-gated placeholders for assessment timeframe, notification timing and permit issue. | Intentional source-gated divergence | `SOURCE_GATED` | No patch until service owner confirmation. | This protects against inventing operational behaviour. |
| `0:33222` | Return-card copy for expired or replaced cards, including fine warning. | Runtime uses `Keep a record` placeholder stating no receipt, permit, approval record or payment record has been issued. | Gap | `SOURCE_GATED` | Patch only if source-required and service owner confirms. | The source copy is operational and should not be added without confirmation. |
| `0:33222` | Feedback prompt: `How was the Mobility Parking Scheme permit?` | Preview includes local mock feedback controls. | Partial match | `SOURCE_CONFIRMED` / `TRIAL_ONLY` | No patch. | Visual relationship is source-informed; analytics/storage/capture behaviour is not implemented. |
| `0:33222` | No trial boundary message visible in source. | Runtime adds `Trial boundary` alert. | Intentional trial-only divergence | `TRIAL_ONLY` | No patch. | Protects against overclaiming approval, payment receipt, eligibility decision or concession validation. |

## Applicant details audit

| Source node | Source text / component / state | Current runtime text / component / state | Match level | Classification | Patch recommendation | Notes / risk |
|---|---|---|---|---|---|---|
| `0:17387`, `0:17405` | `Personal details` frame and manual-address variant. | `ApplicantStep` uses `MpsApplicantDetailsFramePreview`. | Strong match | `SOURCE_CONFIRMED` | No patch. | Strongest aligned runtime area. |
| `0:17387`, `0:17405` | Field order: first name, last name, DOB, contact details, residential address, email, phone. | Preview preserves this order through a thin adapter. | Strong match | `SOURCE_CONFIRMED` | No patch. | Preserve current source-backed adapter. |
| `0:17405` | Manual-address variant expands residential address. | Runtime supports search-address and manual-address modes. | Strong match | `SOURCE_CONFIRMED` | No patch. | Backend lookup remains excluded. |
| Source unresolved | Address result list, no-result state, mobile variant and production validation are not confirmed. | Runtime uses static mock capture only. | Source-gated | `SOURCE_GATED` | Defer. | Do not add real address lookup, age eligibility or backend persistence without source and owner evidence. |

## Medical evidence audit

| Source node | Source text / component / state | Current runtime text / component / state | Match level | Classification | Patch recommendation | Notes / risk |
|---|---|---|---|---|---|---|
| `0:17316`, `0:17333` | Certificate required/provided source frames. | Runtime uses `MpsMedicalEvidenceStatusPreview` for certificate required/provided states. | Partial match | `SOURCE_CONFIRMED` / `SOURCE_GATED` | No patch. | Static status anatomy is useful, but source state naming is inconsistent. |
| `0:17357`, `0:17370` | Report required/provided source frames. | Runtime supports report required/provided states. | Partial match | `SOURCE_CONFIRMED` / `SOURCE_GATED` | No patch. | Report wording and section references remain review-gated. |
| Source frames | Visible upload/remove-file treatments appear in source evidence. | Runtime deliberately excludes upload and remove-file controls. | Intentional source-gated divergence | `DEFERRED` | Defer. | File upload is high risk and needs deeper source, engineering, privacy/security and accessibility review. |
| Runtime only | Reviewer chooses mock evidence type and mock provision method. | Runtime maps choices to static status preview. | Intentional trial-only divergence | `MOCK_BE_STATE` | No patch. | Useful for routing review, but not real evidence handling. |

## Known major gap areas

| Area | Current status | Recommendation |
|---|---|---|
| Concession | Highest source mismatch. Source appears to be Yes/No; runtime expands to card type, number and mock backend validation. | Treat as first candidate patch slice only after designer confirmation. |
| Representative/contact | Skeleton-only. No standalone MPS representative/contact frame confirmed. | Keep source-gated. Do not promote from applicant contact fields alone. |
| Delivery | Kiro stress-test route only. | Keep trial-only or remove only if designers confirm it is misleading. |
| Payment | Mock payment/routing state only. | Keep out of source parity. Do not add real payment assumptions. |
| Backend/system states | Mock identity, eligibility, concession, medical, payment and assessment states. | Keep visibly separated from customer-entered source UI. |
| Final copy | Review, declaration, confirmation and next-step text remain owner/source-gated. | Patch only with designer/service-owner confirmation. |

## Designer-confirmation questions

1. Should the runtime concession page be reduced to the source-observed Yes/No question from `0:33144`, or is the expanded card-type/card-number/mock-validation model intentionally retained for backend-state review?
2. If concession is simplified, where should card issuer, card number and validation result appear, if anywhere?
3. Should review replay first name and last name separately, as in source, or keep runtime full-name playback?
4. Should review edit buttons be restored only after real edit routing exists, or should non-routing preview edit buttons appear in the transaction review surface?
5. Should confirmation replay the source operational next steps and return-card copy, or should the current source-gated placeholders remain until a service owner confirms post-submit behaviour?
6. Is representative/contact part of the intended MPS flow, or only a stress-test pattern?
7. Are delivery and payment part of the intended source flow, or should they remain trial-only review aids?

## Recommended next patch slice

Do not patch runtime from this audit alone.

Recommended next slice after designer review:

| Order | Slice | Purpose | Boundary |
|---|---|---|---|
| 9C | Concession source-required decision | Align concession input and review playback if designers confirm the source Yes/No model should drive runtime. | No real concession validation or backend service. |
| 9D | Confirmation copy reconciliation | Decide whether source next steps and return-card copy are safe to replay or must remain placeholders. | No real notification, receipt, permit issue or approval behaviour. |
| 9E | Review row alignment | Align review rows only after concession and confirmation decisions are made. | No non-routing edit actions unless explicitly accepted as preview-only. |
| 9F | Stress-path decisions | Decide whether representative/contact, delivery, payment and backend-state summaries stay, move, or are removed from designer-review runtime. | No production behaviour. |
| 9G | Review pack update | Update the designer review pack after any audited patches. | Documentation only unless separately scoped. |

## Validation boundary

This file is documentation only. It should be validated with `git diff --check`; `npm run acceptance:static` is useful if the repo's documentation conventions should be rechecked.
