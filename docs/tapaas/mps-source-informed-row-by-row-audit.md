# MPS source-informed row-by-row audit

## Purpose

This audit records a source-informed comparison between the current Mobility Parking Scheme preview and the strongest known MPS source frames. It was created before Slices 9C to 9G and now includes post-audit runtime notes for those slices.

It does not claim MPS source parity, production readiness, WCAG compliance, accessibility compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval, final copy approval or reusable TaPaaS rule readiness.

## Scope

| Area | Source evidence | Runtime surface | Treatment |
|---|---|---|---|
| Concession | Figma `0:33144`, review concession section in `0:33185` | `ConcessionStep`, review concession rows | Highest-risk source gap in Slice 9B; source-observed Yes/No input patched in Slice 9C. |
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
| `0:33144` | Page title `Concession card details`. | Runtime heading `Concession card details`. | Strong match after Slice 9C | `SOURCE_CONFIRMED` / `SOURCE_GATED` | Patched. | Source wording is now reflected in the runtime heading. Final source parity still needs designer review. |
| `0:33144` | Question: `Do you have a New South Wales concession card?` | Runtime legend: `Do you have a New South Wales concession card?`. | Strong match after Slice 9C | `SOURCE_CONFIRMED` / `SOURCE_GATED` | Patched. | Runtime now follows the inspected source question. |
| `0:33144` | Radio options: `Yes`, `No`. | Runtime options: `Yes`, `No`. | Strong match after Slice 9C | `SOURCE_CONFIRMED` / `SOURCE_GATED` | Patched. | Removed the previous card taxonomy from the editable flow. |
| `0:33144` | No card number field is visible in the inspected source frame. | Runtime does not collect card issuer or card number. | Stronger source alignment after Slice 9C | `SOURCE_GATED` | Patched to source-gated. | Review source shows concession card detail rows, but input-source evidence for collecting these fields is still not confirmed by `0:33144`. |
| `0:33144` | No backend validation chooser is visible. | Runtime does not expose a concession backend validation chooser. | Stronger source alignment after Slice 9C | `SOURCE_GATED` | Patched to source-gated. | Validation, recovery states and backend rules need designer and service-owner confirmation. |
| `0:33185` | Review section `Concession card details` lists first name, last name, card issuer and card number. | Runtime review section lists Yes/No plus card issuer and card number as source-gated or not applicable. | Partial match after Slice 9E | `SOURCE_GATED` | Patched within current evidence boundary. | Runtime does not invent issuer, number or validation values. |

## Review audit

| Source node | Source text / component / state | Current runtime text / component / state | Match level | Classification | Patch recommendation | Notes / risk |
|---|---|---|---|---|---|---|
| `0:33185` | Heading `Review your application`. | `MpsReviewFramePreview` heading `Review your application`. | Strong match | `SOURCE_CONFIRMED` | No patch. | Preserve. |
| `0:33185` | Required-field hint: `* indicates a required field`. | Preview renders required-field hint. | Strong match | `SOURCE_CONFIRMED` | No patch. | Preserve. |
| `0:33185` | Important in-page notification titled `Mobility Parking Scheme permit`. | Preview callout title defaults to `Mobility Parking Scheme permit`. | Strong match | `SOURCE_CONFIRMED` | No patch. | Copy is directionally aligned, final wording still source-gated. |
| `0:33185` | Application details section with `Application type` and `Permit type`. | Runtime section includes application type, permit type, existing permit number and replacement reason. | Partial match after Slice 9E | `SOURCE_GATED` | Patched within current evidence boundary. | Runtime still adds renewal/replacement branch data from the mock flow. |
| `0:33185` | Personal details section with first name, last name, DOB, residential address, email and phone. | Runtime section includes first name, last name, DOB, residential address, email and phone. | Stronger match after Slice 9E | `SOURCE_CONFIRMED` / `SOURCE_GATED` | Patched. | Final label and order sign-off still needs designer review. |
| `0:33185` | Concession card details section with card issuer and card number rows. | Runtime section includes Yes/No plus card issuer and card number as source-gated or not applicable. | Partial match after Slice 9E | `SOURCE_GATED` | Patched within current evidence boundary. | Runtime avoids inventing uncollected card details. |
| `0:33185` | Visible `Edit` buttons on source sections. | Runtime skeleton removes non-routing review edit buttons. | Intentional trial-only divergence | `DEFERRED` | Defer. | Removal is safer until real edit routes are implemented. The isolated frame preview can still display edit treatment. |
| `0:33185` | Declaration includes checked terms and information collection notice controls. | Runtime preview renders checked declaration rows; skeleton also has a separate declaration step before review. | Partial match | `SOURCE_GATED` | No runtime patch until legal/content confirmation. | Source-like visual treatment exists, but legal/privacy copy and validation semantics remain owner-gated. |
| `0:33185` | Back and Submit CTAs. | Runtime uses back and `Submit mock application`. | Partial match | `TRIAL_ONLY` | No patch. | Mock wording protects against real submission claims. |
| Runtime only | None in source review frame. | `Trial-only stress and backend states`, evidence checklist, assessment summary and mock fee card after the review frame. | Intentional trial-only divergence | `MOCK_BE_STATE` / `TRIAL_ONLY` | Retained after Slice 9F. | These rows are useful for trial review, but stay clearly outside source-parity claims. |

## Confirmation audit

| Source node | Source text / component / state | Current runtime text / component / state | Match level | Classification | Patch recommendation | Notes / risk |
|---|---|---|---|---|---|---|
| `0:33222` | Heading `Your application has been submitted for assessment.` | Runtime heading is `Your application has been submitted for assessment`. | Stronger match after Slice 9D | `SOURCE_CONFIRMED` / `SOURCE_GATED` | Patched without final-copy claim. | Punctuation and final copy still need designer/service-owner review. |
| `0:33222` | Confirmation email copy referencing the applicant email. | Preview support text defaults to confirmation email copy, but runtime still caveats notification/channel behaviour through source-gated next steps. | Partial match | `SOURCE_GATED` | Defer final notification copy. | Needs real notification-channel decision before stronger wording. |
| `0:33222` | Application details rows: reference number, application, lodgement date. | Runtime shows reference through the preview component, and rows for applicant, application, lodgement date, application type and outcome route. | Partial match after Slice 9D | `SOURCE_GATED` | Patched within current evidence boundary. | Lodgement date is explicitly `Source-gated`; no real lodgement record is created. |
| `0:33222` | `What happens next?` with four operational next steps. | Runtime shows four source-observed next-step areas with explicit service-owner/source-gated caveats. | Partial match after Slice 9D | `SOURCE_GATED` | Patched without operational claims. | This protects against inventing real assessment, contact/payment, service-centre or mailout behaviour. |
| `0:33222` | Return-card copy for expired or replaced cards, including fine warning. | Runtime shows a return-card area with a service-owner confirmation caveat. | Partial match after Slice 9D | `SOURCE_GATED` | Patched without operational guidance claim. | Fine-warning and operational return instructions remain service-owner-gated. |
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
| Concession | Slice 9C now follows the source-observed Yes/No input and gates issuer, number and validation. | Designer review should confirm whether this narrowed input is acceptable and whether any card-detail capture belongs elsewhere. |
| Representative/contact | Skeleton-only. No standalone MPS representative/contact frame confirmed. | Keep source-gated. Do not promote from applicant contact fields alone. |
| Delivery | Kiro stress-test route only. | Keep trial-only or remove only if designers confirm it is misleading. |
| Payment | Mock payment/routing state only. | Keep out of source parity. Do not add real payment assumptions. |
| Backend/system states | Mock identity, eligibility, concession, medical, payment and assessment states. | Keep visibly separated from customer-entered source UI. |
| Final copy | Review, declaration, confirmation and next-step text remain owner/source-gated. | Patch only with designer/service-owner confirmation. |

## Designer-confirmation questions

1. Does the Slice 9C concession page correctly use the source-observed Yes/No question from `0:33144`?
2. If card issuer, card number or validation result are required, where should they appear and what source/service-owner evidence supports them?
3. Should review replay first name and last name separately, as in source, or keep runtime full-name playback?
4. Should review edit buttons be restored only after real edit routing exists, or should non-routing preview edit buttons appear in the transaction review surface?
5. Should confirmation replay the source operational next steps and return-card copy, or should the current source-gated placeholders remain until a service owner confirms post-submit behaviour?
6. Is representative/contact part of the intended MPS flow, or only a stress-test pattern?
7. Are delivery and payment part of the intended source flow, or should they remain trial-only review aids?

## Recommended next patch slice

Runtime was patched only after this audit was reviewed and Slices 9C to 9G were requested.

Post-audit patch summary:

| Order | Slice | Purpose | Boundary |
|---|---|---|---|
| 9C | Concession source-required decision | Aligned concession input and review playback to the source-observed Yes/No model. | No real concession validation or backend service. |
| 9D | Confirmation copy reconciliation | Added source-observed confirmation structure with caveats. | No real notification, receipt, permit issue or approval behaviour. |
| 9E | Review row alignment | Aligned review rows for first/last name, permit type and source-gated concession rows. | No non-routing edit actions. |
| 9F | Stress-path decisions | Kept representative/contact, delivery, payment and backend-state summaries grouped as trial-only or mock state content. | No production behaviour. |
| 9G | Review pack update | Updated the designer review pack and this audit. | Documentation only. |

## Validation boundary

This file is documentation only. It should be validated with `git diff --check`; `npm run acceptance:static` is useful if the repo's documentation conventions should be rechecked.
