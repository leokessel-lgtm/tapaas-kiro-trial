# TaPaaS component-template relationship map

## Purpose

This map helps Kiro choose the right component when building from TaPaaS page templates.

It combines:

- local `.fig` extraction from the TaPaaS Components and Templates libraries
- Figma MCP inventory from the user's personal-copy Figma files on 2026-05-20
- current v0.3 coded preview components

This is **trial guidance only**. It does not claim production readiness, GEL compliance, accessibility compliance, privacy approval, legal approval, policy approval or TaPaaS engineering sign-off.

## Evidence status

| Evidence type | Status |
|---|---|
| Local `.fig` parse | Broad page/node/text extraction completed on 2026-05-19 |
| Figma MCP access | Confirmed on 2026-05-20 with personal Figma account `leokessel@gmail.com` |
| Figma MCP deep extraction | Partial. Selected component/template documentation, accessibility-note excerpts and frame inventories were extracted on 2026-05-20 |
| Mobility Parking Scheme transaction mapping | Frame inventory completed for `MPS Final`; v0.3 now includes a non-production simulated delivery flow. Detailed frame-by-frame content and annotation extraction remains pending. |

## Component-template map

| Component or pattern | Source node | Appears in templates | Classification | Current code status | Kiro rule |
|---|---|---|---|---|---|
| Privacy card | `1:198` | Privacy step `3395:41359` | TaPaaS-specific composite | `PrivacyCardPreview` | Use for privacy/start card structure only. Privacy, terms, notification and acknowledgement wording must be owner-confirmed. |
| Search vehicle input | `22:16683` | Search input page `16274:18397` | TaPaaS-specific composite | `TapaasSearchAction` with `Input` and `Button` | Use mock search only. Do not add backend lookup, validation or result states. |
| Form input pattern | Template `8410:37703` | Form input page | GEL-aligned composition | Built across skeletons | Use multiple focused form pages for 6+ step flows. |
| Conditional question panel | Form input page `8410:37703`; conditional declaration `27:56000`; MPS eligibility branch inventory | Form/input, eligibility and declaration pages | TaPaaS-specific composite | `ConditionalQuestionPanel`; isolated `Conditional Question Panel` Storybook story | Use for preview-only conditional reveal. Do not use it to encode real eligibility, identity, concession, backend or policy decisions. |
| Conditional declaration | `27:56000` | Declaration step `9894:3936`, Review step `8143:15161` | GEL variant | Composed from checkbox/radio patterns | Legal wording must be source-confirmed. |
| Declaration review | `27:38386` | Review step `8143:15161` | TaPaaS-specific composite | `DeclarationReview` | Use card variant when declarations must remain visibly available. Accordion variant needs legal/content confirmation. |
| Review info card | `18:4448` | Review step `8143:15161` | TaPaaS-specific composite | `ReviewInfoCard`; isolated `Review Info Card` Storybook story | Use for data playback. Keep rows factual and editable only where route exists. |
| MPS review frame | `0:33185` | MPS `6.A - Review`; maps to Review step `8143:15161` | TaPaaS-specific transaction frame pattern | `MpsReviewFramePreview` | Use as a frame-aligned MPS review layout only. Keep real edit routing, declaration/legal wording, eligibility, concession, payment and backend rules unresolved. |
| Review fees card | `18:4449` | Review step `8143:15161` | TaPaaS-specific composite | `ReviewFeesCard` | Mock fees only. Do not add payment logic. |
| Legal info accordion | `22:35625` | Review step `8143:15161` | TaPaaS-specific composite using GEL accordion behaviour | `LegalInfoAccordion` | MCP confirms `BUILT` and `Custom / GEL`, but legal/privacy content needs owner and accessibility confirmation before broader use. |
| MPS applicant details frame | `0:17387`, `0:17405` | MPS `2.A - Personal details`, `2.B - Personal details - Manual address`; maps to Form input page `8410:37703` | TaPaaS-specific transaction frame pattern | `MpsApplicantDetailsFramePreview` | Use as an early/middle applicant/contact-details page skeleton only. Keep address search and manual-address capture mock-only; no real address lookup, identity verification, customer record update, backend persistence, age eligibility or production validation rules. |
| Confirmation page header | `9:10494` | Confirmation step `5354:8224` | GEL variant | `ConfirmationHeader` | Use with `role="status"` in preview. Needs AT review. |
| Transaction summary card | `10:1861` | Confirmation step `5354:8224` | TaPaaS-specific composite | `TransactionSummaryCard`; isolated `Transaction Summary Card` Storybook story | Use for mock reference/summary/receipt rows. Do not add receipt, payment, notification or routing behaviour. |
| MPS confirmation frame | `0:33222` | MPS `6.A Confirmation screen`; maps to Confirmation step `5354:8224` | TaPaaS-specific transaction frame pattern | `MpsConfirmationFramePreview` | Use as a frame-aligned MPS confirmation layout only. Keep reference number, notification timing, feedback behaviour, related transactions and receipt outcomes unresolved. |
| Next steps card | `10:1862` page; `11:4848` component set | Confirmation step `5354:8224` | TaPaaS-specific composite | `NextStepsCardPreview` | Use for confirmation/post-submit guidance with mock or owner-confirmed content only. Do not add notification timing, routing or service outcome logic. |
| End of transaction CTA buttons | `9:791` | Confirmation step `5354:8224` | GEL/TaPaaS composition | `TransactionCtaGroup`; isolated `Transaction Action Areas` Storybook story | Use for Start again / exit actions. No real routing, session, save, logout or analytics behaviour. |
| Transaction CTA buttons | `27:34294` | Privacy, input, declaration, review templates | GEL/TaPaaS composition | `TransactionCtaGroup`; isolated `Transaction Action Areas` Storybook story | Use consistent Continue/Back/Exit placement. Keep route destinations and exit behaviour owner-confirmed. |
| Details card single | `2413:787` | Later input/support/review context pages | TaPaaS-specific composite | `DetailsCard` | Use as read-only context only. Do not use for decisions. |
| Details card single interactive | `2958:2499` | Input/context pages, exact templates still pending | TaPaaS-specific composite | `InteractiveDetailsCard` | Action semantics, focus handling and keyboard behaviour still need review before broader use. |
| More info panel | GEL source evidence; TaPaaS guidance page `50:2726` | Form/input pages where contextual help is optional | GEL variant in v0.3 | `MoreInfoDisclosure` alias `MoreInfoPanel` | Use inline disclosure only for non-critical help. Full GEL modal panel remains future work. |
| Accordion | GEL source evidence; Legal info accordion `22:35625` | Review/legal guidance and optional guidance sections | GEL-aligned preview for generic accordion; TaPaaS legal accordion remains design-only | `Accordion` | Use only for optional guidance. Do not place required or critical content inside. |
| Show more / less | `22:25082` | Optional content reveal, exact templates still pending | GEL variant | Not coded | MCP says it is a GEL button with custom content and does not need to be rebuilt. Use existing button/disclosure behaviour for optional content only. |
| Radio buttons | `31:63987` | Form input page `8410:37703`, declaration step `9894:3936` | GEL variant | `RadioButtonList` | Use existing GEL preview radio list first. |
| Radio button cards | `31:63988` | Selection/input pages | TaPaaS-specific composite | `RadioButtonCards` | Figma status is `CONCEPT`; keep trial-only and verify keyboard/focus/error-state behaviour before promotion. |
| VEOS selection card | `31:63989` | Vehicle-specific flows only | TaPaaS-specific composite | Not coded | Design-only. Do not generalise without source confirmation. |
| Exit modal | `4677:1042` | Exit/cancel flows | GEL/TaPaaS modal pattern | `ExitModal`; isolated `Exit Modal` Storybook story | Trial preview includes labelled/described dialog, Escape close, return focus and basic focus containment. Needs VoiceOver/NVDA review. No real save, logout, routing, session or analytics behaviour. |
| Email confirmation modal | `9290:50392`; frame `9241:18447` | Confirmation step | TaPaaS-specific | `EmailConfirmationModal` | Catalogue-only coded preview for email verification before sending receipts or communications. validation_status: build-tested. review_reason: engineer, accessibility, owner. Do not add real email send, persistence, routing or critical-error handling without owner and engineering evidence. |
| Business error page | `8931:31271`; backend examples `31:73426` | Error routing | TaPaaS page template and pattern set | `BusinessErrorPage`, `BackendErrorExamplePage` | Trial preview supports mock hard-stop outcomes with `role="alert"` and source-backed mock codes. Real use requires source-confirmed business rules. |
| System error page | `17628:2069` | Error routing | TaPaaS page template | Not coded | Requires app error-routing design. |
| Repeatable field group | Form input page `8410:37703`; GEL fieldset/input evidence | Applicant, representative and repeatable-contact pages | GEL-aligned form composition | `RepeatableGroup` | Use for repeated groups only. Keep semantic `fieldset`/`legend`; avoid decorative card headers that obscure the group label. |
| Evidence checklist | MPS medical frames `4.A`/`4.Aa`/`4.B`/`4.Ba`; extracted certificate nodes `0:17316`, `0:17333`; extracted report nodes `0:17357`, `0:17370`; boundary nodes `0:17327`, `0:17344`, `0:17351`, `0:17369`, `0:17381`, `0:17384`, `0:17385`, `0:17386`; GEL file-upload/status-label evidence | Evidence and review pages | GEL/TaPaaS composition | `EvidenceChecklistCard`, `MpsMedicalEvidenceStatusPreview`; isolated `Evidence Checklist Card` Storybook story | Use as mock evidence status only. Do not implement upload, remove-file behaviour, file validation, storage or progress without full GEL FileUpload review. Certificate upload-state/file-limit and report section-wording inconsistencies remain review-gated. |
| Assessment summary | MPS eligibility, concession, review and confirmation frame groups; GEL status-label evidence | Eligibility, review and outcome pages | GEL/TaPaaS composition | `AssessmentSummaryPanel`; isolated `Assessment Summary Panel` Storybook story | Use for mock routing/status only. Do not claim real eligibility, concession, payment or policy decisioning. |

## Mobility Parking Scheme mapping status

The Mobility Parking Scheme file is accessible via MCP. `MPS Final` frame inventory was extracted in the 2026-05-20 pass, but detailed component/template mapping was not completed.

The frame inventory shows these groups:

| MPS group | Example frames | Likely TaPaaS mapping | Boundary |
|---|---|---|---|
| Entry/account/identity | `0.A Landing page`, `0.B MyAccount`, `0.C POI` to `0.H POI` | Introduction/account context, out-of-band proof of identity | Identity proofing is out of scope for the v0.3 coded pack. |
| Application type | `1.0 - Application`, `1.A - New`, `1.B - Renew`, `1.C - Replace`, `1.CA - Replace Reason` | Form input page plus conditional branch | Use mock application-type branching only. |
| Personal details | `2.A - Personal details`, `2.B - Personal details - Manual address` | Form input page, address input, date input | Safe as source for generic form pattern only. |
| Eligibility | `3.0 - Eligibility` and driver/photo/medical branch variants | Conditional question pages | Eligibility decisions require owner confirmation. |
| Medical documents | `4.A`/`4.B` medical certificate/report and uploaded variants; certificate nodes `0:17316`, `0:17333`; report nodes `0:17357`, `0:17370` | Evidence checklist and mock evidence pages | File upload and medical evidence handling remain mock-only. No real upload, storage or validation. `MpsMedicalEvidenceStatusPreview` covers only static required/provided certificate/report status and mock file-name display. |
| Concession cards | `5.0` and Centrelink/DVA invalid/duplicate/mismatch variants | Backend/business error patterns | Backend validation and concessions require source-confirmed rules. |
| Review/confirmation | `6.A - Review`, `6.B - Review without non permit declaraction`, `6.A Confirmation screen`, `6.B Confirmation screen with tile` | Review, outcome and confirmation templates | Reference numbers, payment, email, outcome and assessment wording require owner confirmation. |

## v0.3 MPS simulation status

The coded `MobilityParkingPermitSkeleton` is a trial simulation, not a faithful implementation of the MPS product.

It intentionally includes:

- mock account and proof-of-identity acknowledgement
- mock application-type branching for new, renewal and replacement
- applicant details, manual address and 3-field date input
- representative and repeatable authorised contacts
- mock eligibility questions and routing summary
- mock medical evidence checklist without file upload
- mock concession validation outcomes
- mock delivery and payment-routing outcomes
- review, business-error and confirmation/manual-review outcomes

It intentionally excludes:

- real proof of identity
- real eligibility decisioning
- medical document upload, storage or validation
- concession card validation
- real payment, receipts or refunds
- backend calls, error codes or policy logic

Before building an MPS skeleton, extract:

1. page/frame order from `MPS Final` (`0:16535`)
2. which frames map to Privacy, Input/Search, Declaration, Review and Confirmation templates
3. which local Symbols are legacy components vs TaPaaS/GEL components
4. any annotations about eligibility, concessions, medical evidence, identity, documents or backend checks
5. content that must be marked owner-confirmation required

## Kiro component-selection rule

When a page template and component both exist:

1. Use the page template for flow structure.
2. Use source-backed GEL components for basic controls.
3. Use TaPaaS preview composites only when the pattern is documented and repeated.
4. If a component is `design-only`, skip it or ask for confirmation before coding.
5. If the flow references Mobility Parking Scheme policy, eligibility, concessions, medical evidence, identity or backend checks, use placeholders and mark as owner-confirmation required.
