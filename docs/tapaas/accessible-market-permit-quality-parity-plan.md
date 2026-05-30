# Accessible Market Permit quality parity plan

Date: 2026-05-31

Status: Slice 4 support-needs conditional structure completed. AMP remains a mock transaction skeleton with no confirmed transaction-specific source flow.

## TLDR

Accessible Market Permit is implemented in `src/AccessibleMarketPermitSkeleton.tsx`, but local evidence does not confirm a standalone Accessible Market Permit Figma source flow.

Treat AMP as a complex mock transaction skeleton built to exercise reusable TaPaaS/GEL patterns, not as a source-parity transaction. The designer feedback should therefore be split into:

- inherited Trial Permit feedback that should be applied only where the same structural problem exists in AMP
- AMP-specific feedback around contact details, DOB/email validation, support-needs structure and full-width inputs
- source-gated decisions where final service flow, copy, fees, confirmation behaviour or backend split is unknown
- manual QA for keyboard, focus, screen-reader, visual resize and contrast checks

Do not claim production readiness, formal accessibility compliance, GEL compliance, TaPaaS approval, privacy approval, legal approval or policy approval.

## What I inspected

| Area | Evidence | Finding |
|---|---|---|
| Repo state | `git status --short`, `git branch --show-current` | Clean on `main` before documentation edit. |
| AMP implementation | `src/AccessibleMarketPermitSkeleton.tsx` | Runtime exists as a 9-step skeleton: privacy, applicant, contact, market, accessibility, supporting, declaration, review, confirmation. |
| App surface | `src/App.tsx` search result | AMP is visible in the transaction switcher as `Accessible market permit`. |
| Evidence log | `docs/tapaas/04-evidence-log.md` | AMP was introduced as a complexity push using DetailsCard and ConditionalQuestionPanel evidence, not as a transaction-specific source recreation. |
| Source inventory | `docs/tapaas/00-source-inventory.md`, `docs/tapaas/03-figma-evidence-notes.md` | No AMP-specific Figma flow is listed. Confirmed source files are TaPaaS components/templates and MPS. |
| Trial Permit feedback | `docs/tapaas/trial-permit-feedback-reconciliation.md`, `docs/tapaas/trial-permit-quality-parity-plan.md` | Trial Permit inherited comments are available and should be reused as structural rules, not as AMP source parity. |
| Reusable pattern evidence | `docs/tapaas/01-component-registry.md`, `docs/tapaas/02-page-template-registry.md` | Form input, privacy, declaration, review and confirmation templates are reusable evidence; exact AMP content remains unverified. |
| Shared component behaviour | `src/gel-preview/index.tsx`, `src/tapaas-preview/index.tsx` | `Field`, `Input`, `TransactionCtaGroup` and `ConditionalQuestionPanel` are local preview components with known boundaries. |

## Source and Figma status

No standalone Accessible Market Permit Figma/source flow was found in the repo evidence.

The strongest AMP evidence is implementation/test evidence plus reusable TaPaaS/GEL component/template evidence:

- AMP code exists: `src/AccessibleMarketPermitSkeleton.tsx`.
- AMP source evidence does not exist as a transaction-specific Figma flow in the current source inventory.
- Reusable evidence exists for page templates, GEL form controls, privacy, declaration, review, confirmation, DetailsCard and ConditionalQuestionPanel.
- Figma MCP was not used in this slice because no AMP-specific source flow or node was found. Per the boundary, future MCP use should be limited to reusable TaPaaS/GEL patterns unless an AMP source flow is supplied.

Current source classification:

| Evidence type | Status | What it proves | What it does not prove |
|---|---|---|---|
| Transaction-specific AMP Figma flow | Not found | Nothing transaction-specific | Exact AMP pages, copy, sections, backend split, fees, confirmation actions or source parity. |
| Repo implementation | Found | Current runtime structure and defects to classify. | That the flow is correct or source-backed. |
| TaPaaS component/template evidence | Found | Reusable page and component patterns can guide safe remediation. | AMP-specific service content or policy. |
| Designer feedback | Provided as post-it board context, not stored as local artefact | Design intent and quality issues. | Source truth, production rules or approved final copy. |

## Current AMP implementation summary

| Area | Current implementation | Classification |
|---|---|---|
| Step model | 9 steps: privacy, applicant, contact, market, accessibility, supporting, declaration, review, confirmation | AMP-specific, build-tested skeleton structure; source-gated for exact flow. |
| Privacy | Free text and generic privacy acknowledgement checkbox | Inherited Trial Permit feedback applies; should use privacy/T&Cs separation if patched. |
| Applicant details | Full name plus hand-coded DOB fieldset | Slice 2 added DOB validation treatment. Slice 3 added required marker treatment and full-width input treatment for full name. |
| Contact details | Email, phone and postal address using `Field`, `Input`, `Select` | Slice 2 tightened preview-level email validation. Slice 3 added required marker treatment and full-width treatment for primary contact/address text inputs. State and postcode remain intentionally compact. |
| Market details | Market name, market type and event date | Source-gated for real market fields and backend split. |
| Accessibility/support needs | `ConditionalQuestionPanel` with yes/no radio and a labelled support-details sub-section when Yes is selected | Slice 4 clarified the conditional follow-up structure and added validation/review tests. Manual QA remains required. |
| Supporting information | Textarea with character count | AMP-specific; likely safe but copy/source remains gated. |
| Declaration | Warning alert, placeholder declaration and checkbox | Inherited Trial Permit feedback applies; legal copy source-gated. |
| Review | `ReviewInfoCard` sections, `ReviewFeesCard` and step-level edit actions | Slice 6 adds edit actions back to source steps. Field-level anchors, auto-return-to-review and exact review content remain source-gated. |
| Confirmation | `ConfirmationHeader`, `TransactionSummaryCard`, next-step list, end-of-transaction CTA | Slice 1 removed the developer-facing source-inventory link and aligned the CTA label to the Trial Permit-safe wording. Confirmation content remains source-gated. |

## Feedback classification

| ID | Feedback item | Classification bucket | Evidence | Treatment | Notes |
|---|---|---|---|---|---|
| AMP-01 | "Same comments as transaction above" | inherited Trial Permit feedback | Trial Permit reconciliation records page-template, privacy, review, confirmation, CTA, validation and source-gating rules. | Apply selectively to matching AMP defects. | Do not blindly copy Trial Permit runtime. AMP has 9 steps and conditional support needs. |
| AMP-02 | AMP appears to be a made-up transaction | source-gated | No standalone AMP source flow in source inventory; evidence log frames AMP as a complexity skeleton. | Document boundary; do not claim source parity. | Keep AMP as mock/demo transaction unless source is supplied. |
| AMP-03 | Contact details input labels and GEL usage | AMP-specific feedback; reusable rule candidate | Contact page uses local `Field`/`Input`/`Select`; Slice 3 keeps these local GEL-shaped controls and adds required marker treatment. | Fixed in Slice 3 for label/required-marker treatment. | Further visual/source confirmation remains review-gated because no AMP-specific source flow exists. |
| AMP-04 | DOB validation | AMP-specific feedback | DOB validation checked only presence and broad ranges; parsing permitted impossible dates such as 31/02. | Fixed in Slice 2. | Uses preview-level calendar-date checking only; no age eligibility, identity or backend validation. |
| AMP-05 | Email validation | AMP-specific feedback | Email check was a simple `@` plus dot test. | Fixed in Slice 2. | Uses a lightweight preview-level format check; no production-grade or backend/email verification claim. |
| AMP-06 | Missing inline DOB error | AMP-specific feedback | Inline DOB error appeared only for missing fields through `dobErr`; invalid-date branch in `errorsForStep` did not set a separate inline invalid-date state. | Fixed in Slice 2. | Field-level and summary error text now agree for missing vs invalid date. |
| AMP-07 | Conditional accessibility/support needs structure | AMP-specific feedback; manual QA | Uses `ConditionalQuestionPanel`; Slice 4 now wraps the Yes follow-up textarea in a labelled support-details group. | Fixed structurally in Slice 4; manual QA remains required. | Preserves the conditional-panel pattern. Does not imply assessment, eligibility, service promise or automated decisioning. |
| AMP-08 | Full-width input behaviour | AMP-specific feedback; manual QA | Many inputs used `inputWidth='xl'`, `lg`, `md`, `xs`; `Input` fixed-width mapping capped `xl` at 416px. | Fixed in Slice 3 for full name and primary contact/address text inputs. | State and postcode remain compact. Browser visual QA is still required because there is no AMP-specific source layout. |
| AMP-09 | Input-page split/back-end dependency question | source-gated | AMP has separate applicant, contact, market, accessibility and supporting pages. Backend dependency is unknown. | Do not patch until owner/source decision. | Current split may be useful for review, but real AMP flow may not exist. Avoid inventing backend persistence or account/customer-record behaviour. |
| AMP-10 | Privacy/T&Cs structure inherited from Trial Permit | inherited Trial Permit feedback; source-gated | AMP privacy page is free text and privacy acknowledgement; Trial Permit fix separated privacy notice from T&Cs. | Patch candidate if applying inherited structural cleanup. | Use placeholders; no final privacy/legal copy. |
| AMP-11 | Form header/error summary placement inherited from Trial Permit | inherited Trial Permit feedback | AMP has step text and `ErrorSummary` before step body, not the hardened Trial Permit form-header composition. | Patch candidate, but larger blast radius. | Good reusable rule, but AMP has 9 steps so ProgressStepper usage boundary matters. |
| AMP-12 | Review edit actions inherited from Trial Permit | inherited Trial Permit feedback | AMP review now has step-level edit actions back to applicant/contact/market/accessibility/supporting/declaration steps. | Fixed in Slice 6. | Field-level anchors, section anchors and auto-return-to-review remain source-gated. |
| AMP-13 | Confirmation runtime source-inventory link | inherited Trial Permit feedback | AMP confirmation included `Review TaPaaS source inventory` runtime link. | Fixed in Slice 1. | Trial Permit Slice 9 removed equivalent developer-facing runtime UI. |
| AMP-14 | Review/fees/confirmation exact sections | source-gated | AMP has review cards, fees and summary, but no source confirms rows, fees or receipt rules. | Document only until source exists. | Do not add Keep a record/TUTD or final next steps without source. |
| AMP-15 | Error-summary visual/accessibility behaviour | inherited Trial Permit feedback; manual QA | Shared `ErrorSummary` has been improved after Trial Permit, but AMP has no focused tests. | Test/protect when patching validation. | Do not claim WCAG or AT behaviour. |
| AMP-16 | Buttons and review stacking responsiveness | positive/protected; manual QA | Shared `TransactionCtaGroup` now has Back-before-primary order; mobile CSS stacks buttons. | Protect. | Browser resize QA still required for AMP-specific longer content. |
| AMP-17 | Conditional pattern usefulness | positive/protected; reusable rule candidate | Evidence log says ConditionalQuestionPanel works and validates conditional branch. | Protect. | Keep as preview evidence for conditional transaction questions, subject to AT review. |
| AMP-18 | DetailsCard context on support step | positive/protected; manual QA | Evidence log identifies DetailsCard as useful context; AMP uses it on support step. | Protect unless source says remove. | Heading level and exact placement remain review-gated. |
| AMP-19 | Reusable rule opportunity from AMP complexity | reusable rule candidate | AMP exercises multi-page form inputs, conditional support needs and review/confirmation composition. | Document after patches prove useful. | Do not promote exact AMP content or flow. |

## Positives to protect

| Positive | Evidence | Protection rule |
|---|---|---|
| AMP is clearly marked non-production | Trial banner states mock/non-production boundary. | Preserve preview-only wording and anti-claims. |
| Uses local GEL-shaped form components | `Field`, `Input`, `Select`, `RadioButtonList`, `Checkbox`, `Textarea` are used. | Do not replace with ad hoc controls. |
| Conditional support-needs pattern exists | `ConditionalQuestionPanel` is used for yes/no support details. | Preserve the conditional pattern unless source says the page should be split. |
| Conditional details are not framed as an assessment or service promise | Help text says no assessment, decision or service promise. | Keep this boundary. |
| Support-needs validation exists | Slice 4 preserves answer-required and Yes-details-required validation. | Protect submitted-error timing and summary links; do not add focus/live-region claims without manual QA. |
| Review uses TaPaaS cards and fee preview | `ReviewInfoCard`, `ReviewFeesCard` and step-level edit actions are present. | Protect the local preview-card pattern; do not add field anchors or source-specific review grouping without source evidence. |
| Confirmation uses TaPaaS confirmation primitives | `ConfirmationHeader` and `TransactionSummaryCard` are present. | Keep confirmation-specific composition. |
| Exit modal is available on transaction steps | `ExitModal` is wired to clear mock data. | Preserve; do not add real draft saving. |
| Mock backend/payment boundaries are explicit | Review says no real payment; confirmation uses placeholders. | Preserve; do not invent backend, payment, receipt or approval logic. |
| Front-end DOB/email validation exists | Designer feedback identified date and email format validation as a positive. | Protect as preview-level validation only; do not turn it into eligibility, identity, backend or production-grade validation. |
| Contact fields use local GEL-shaped form controls | `Field`, `Input` and `Select` remain in use after Slice 3. | Protect component choice and local adapter boundary; do not introduce shared GEL reference changes for AMP-only treatment. |

## High-priority fixes

| Priority | Fix | Why first | Safe boundary |
|---|---|---|---|
| 1 | Remove developer-facing source inventory link from AMP confirmation and align restart CTA wording. | Low-risk inherited Trial Permit cleanup; runtime UI should not expose internal docs. | Completed in Slice 1. Runtime-only UI cleanup, no source-content claim. |
| 2 | Fix DOB inline error state to handle both missing and invalid DOB. | Designer called out missing inline DOB error; current invalid-date summary can disagree with inline state. | Completed in Slice 2. Uses local preview validation only; no age, identity or eligibility logic. |
| 3 | Tighten preview-level email validation and add focused tests. | Current rule is very loose. | Completed in Slice 2. Simple format validation only; no backend/email verification. |
| 4 | Review contact labels, required markers and GEL field usage. | Direct designer focus area and likely reusable across form pages. | Completed in Slice 3 for AMP full name/contact fields. Uses existing GEL preview components; no new shared abstractions. |
| 5 | Decide targeted full-width input behaviour for contact/supporting fields. | Likely visual polish and responsiveness issue. | Completed in Slice 3 for full name and primary contact/address text inputs. Supporting information remains deferred. |
| 6 | Improve support-needs structure only if a browser/keyboard pass shows a real issue. | Conditional reveal is sensitive for AT behaviour. | Completed structurally in Slice 4; manual QA still required. No focus/live-region claims added. |
| 7 | Add step-level review edit actions. | Remaining inherited Trial Permit review gap after Slice 5 reconciliation. | Completed in Slice 6. No field-level anchors, section anchors, auto-return-to-review or source-specific review grouping. |

## Source-gated decisions

| Decision | Current status | Evidence needed |
|---|---|---|
| Whether AMP is a real transaction candidate | Unknown | AMP-specific Figma flow, owner confirmation or source pack. |
| Exact AMP step order and whether input pages should be split | Unknown | Transaction-specific source flow or owner decision. |
| Whether contact details should be one page or split by backend/customer-record dependency | Unknown | Backend/process decision and source flow. |
| Privacy notice, T&Cs and declaration copy | Unknown | Privacy/legal/policy owner-approved text. |
| Market type options and support-needs wording | Unknown | Service owner or transaction source. |
| Fees, receipt and payment treatment | Unknown | Service owner/source; payment is currently excluded. |
| Confirmation next steps, reference format and post-submit CTAs | Unknown | Source-confirmed confirmation step. |
| Whether Keep a record/TUTD applies | Unknown | Confirmation template/source evidence. |
| Whether full-width input means GEL default, TaPaaS template slot width, or mobile-only full width | Unknown | Figma/source visual evidence or designer clarification. |

## Manual QA items

| Item | Why manual |
|---|---|
| Keyboard pass through AMP happy path and validation path | Ensure error links, back/continue/exit and conditional reveal order are usable. |
| VoiceOver/NVDA pass for error summary and conditional support reveal | Automated checks cannot prove announcement quality. |
| Browser visual pass at desktop, tablet and narrow mobile widths | Full-width inputs, long labels, support details and review cards need rendered review. |
| Contrast measurement for field errors, secondary buttons and card backgrounds | No WCAG pass/fail claim without measurement. |
| Heading and landmark review | AMP has many steps and nested cards; semantic structure should be checked after any header patch. |
| Conditional support-needs reveal | Need to verify whether focus should stay on radio or move only after explicit user action. |

## Recommended patch slices

### Slice 1 - Low-risk inherited cleanup

Scope:

- Removed runtime source-inventory link from AMP confirmation.
- Aligned confirmation CTA from `Start again` to `Start another application`.
- Added focused AMP regression coverage for confirmation content boundary and inherited CTA ordering at review.
- Did not change DOB/email validation, contact fields, support-needs structure, page splitting or source-gated confirmation copy.

Validation:

- `npm run acceptance:static`
- `npm run test`
- `npm run build:all`
- `npm run parity`
- `git diff --check`

### Slice 2 - DOB and email validation

Scope:

- Added missing vs invalid DOB inline error treatment.
- Kept the DOB summary link targeting the DOB day input while wiring the grouped DOB fields to the inline error text.
- Tightened email validation to a lightweight preview-level format check.
- Aligned AMP submitted-error timing with the Trial Permit pattern so errors persist until Continue revalidates the current step.
- Added focused tests for invalid DOB, DOB summary link target, validation persistence, invalid email, valid DOB/email continuation and existing Slice 1 confirmation behaviour.
- Did not change support-needs structure, contact field layout/labels, page splitting, backend dependency logic, final copy, eligibility, fees, policy or confirmation content.

Preview-validation boundary:

- This slice protects useful front-end date and email format feedback in the mock transaction only.
- It does not claim production-grade date parsing, age eligibility, identity validation, backend validation, email verification or source/policy correctness.

Validation:

- `npx vitest run src/AccessibleMarketPermitSkeleton.test.tsx`
- `npm run acceptance:static`
- `npm run test`
- `npm run build:all`
- `npm run parity`
- `git diff --check`

### Slice 3 - Contact details GEL/input treatment

Scope:

- Added visible required marker treatment to full name and AMP contact fields.
- Kept existing local `Field`, `Input` and `Select` usage.
- Added local full-width input treatment for full name, email, phone, street address and suburb.
- Kept state and postcode compact because those are short structured inputs.
- Added focused tests for required accessible labels, full-width style treatment and required contact-field validation.
- Preserved Slice 2 DOB/email validation timing and Slice 1 confirmation behaviour.
- Did not change support-needs structure, page splitting, backend dependency logic, final copy, policy, fees, eligibility, Storybook, GEL reference files or other transactions.

Validation:

- `npx vitest run src/AccessibleMarketPermitSkeleton.test.tsx`
- `npm run acceptance:static`
- `npm run test`
- `npm run build:all`
- `npm run parity`
- `git diff --check`

Remaining manual QA:

- Browser visual check at desktop and mobile to confirm the full-width treatment works visually for long labels and narrow screens.
- Assistive-technology behaviour remains manual QA; this slice does not claim WCAG/accessibility compliance.

### Slice 4 - Conditional support-needs structure

Scope:

- Preserve `ConditionalQuestionPanel`.
- Clarified the Yes follow-up by wrapping the support-details textarea in a labelled local group.
- Preserved `needsSupport` and `supportDetails` state shape.
- Preserved validation rules: support-needs answer required; support details required only when Yes is selected.
- Preserved error summary targets `#needs-support` and `#support-details`.
- Preserved review representation as separate `Needs support` and `Support details` rows.
- Added tests for no answer, No path, Yes without details, Yes with details and review representation for Yes/No states.
- Did not add focus movement, live regions, page splitting, backend assumptions, review edit actions, confirmation content, final copy, policy, fees or eligibility logic.

Manual QA boundary:

- Keyboard, focus, screen-reader and responsive behaviour still require manual QA.
- Automated tests protect structure and validation only; they do not prove WCAG/accessibility compliance.
- Support-needs wording remains source-gated.

Validation:

- `npx vitest run src/AccessibleMarketPermitSkeleton.test.tsx`
- `npm run acceptance:static`
- `npm run test`
- `npm run build:all`
- `npm run parity`
- `git diff --check`

### Slice 5 - Inherited template alignment

Scope:

- Consider form-header/error-summary placement alignment from Trial Permit.
- Be careful with the 9-step flow because ProgressStepper has a 4-to-6-step usage boundary.
- Add review edit actions only at step level unless source supports anchors.

Validation:

- full `npm run acceptance:static`
- `npm run acceptance:storybook`
- `npm run test`
- `npm run build:all`
- `npm run parity`
- `git diff --check`

### Slice 6 - Review edit actions

Fixed:

- Added step-level review edit actions for Applicant details, Contact details, Market details, Accessibility support, Supporting information and Declaration.
- Each action returns to the matching AMP source step.
- Preserved existing review rows, fee preview, validation behaviour and form state shape.

Deferred:

- Field-level anchors, section anchors and auto-return-to-review.
- Source-specific review grouping, exact review rows and final copy.
- Page splitting, backend dependency behaviour, support-needs behaviour and confirmation content.

Boundary:

- This is a preview-only inherited cleanup. It does not claim AMP source parity, production readiness, WCAG compliance, policy correctness, eligibility correctness or final-copy approval.

### Slice 7 - Documentation and reusable rules

Scope:

- Update this plan and evidence log after runtime patches.
- Promote only rules proven by AMP patches plus reusable component/template evidence.
- Do not promote AMP-specific copy, source flow, backend or policy assumptions.

## Do not patch yet

- Do not add backend calls, data loading, customer-record lookup, address lookup, email verification, payment, identity, eligibility, approval or real permit issuance logic.
- Do not claim AMP source parity.
- Do not use Figma MCP for AMP transaction source unless a specific AMP flow, file key or node is supplied.
- Do not add Keep a record/TUTD or final confirmation sections without source.
- Do not change package files or lockfiles.
- Do not touch `track-2-spike/`.

## Evidence captured

| Evidence | Result |
|---|---|
| AMP runtime file | `src/AccessibleMarketPermitSkeleton.tsx` found and inspected. |
| AMP source flow | Not found in current repo source inventory. |
| Reusable Figma/TaPaaS evidence | Existing source inventory and template/component registries only. No new MCP call. |
| Track 2 raw files | Not read or touched. |
| Runtime code | Not changed in this slice. |
