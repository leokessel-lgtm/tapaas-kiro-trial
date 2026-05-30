# Accessible Market Permit quality parity plan

Date: 2026-05-31

Status: Slice 0 classification only. No runtime patch has been applied.

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
| Applicant details | Full name plus hand-coded DOB fieldset | AMP-specific issue; DOB validation/error structure needs targeted patch. |
| Contact details | Email, phone and postal address using `Field`, `Input`, `Select` | AMP-specific issue; labels/GEL usage/full-width behaviour need review. |
| Market details | Market name, market type and event date | Source-gated for real market fields and backend split. |
| Accessibility/support needs | `ConditionalQuestionPanel` with yes/no radio and support-details textarea | AMP-specific and manual-QA-sensitive. |
| Supporting information | Textarea with character count | AMP-specific; likely safe but copy/source remains gated. |
| Declaration | Warning alert, placeholder declaration and checkbox | Inherited Trial Permit feedback applies; legal copy source-gated. |
| Review | `ReviewInfoCard` sections and `ReviewFeesCard`, no edit actions | Inherited Trial Permit feedback applies; edit routing and exact review content source-gated. |
| Confirmation | `ConfirmationHeader`, `TransactionSummaryCard`, next-step list, source-inventory link | Inherited Trial Permit feedback applies; source link should not remain in runtime if patched. |

## Feedback classification

| ID | Feedback item | Classification bucket | Evidence | Treatment | Notes |
|---|---|---|---|---|---|
| AMP-01 | "Same comments as transaction above" | inherited Trial Permit feedback | Trial Permit reconciliation records page-template, privacy, review, confirmation, CTA, validation and source-gating rules. | Apply selectively to matching AMP defects. | Do not blindly copy Trial Permit runtime. AMP has 9 steps and conditional support needs. |
| AMP-02 | AMP appears to be a made-up transaction | source-gated | No standalone AMP source flow in source inventory; evidence log frames AMP as a complexity skeleton. | Document boundary; do not claim source parity. | Keep AMP as mock/demo transaction unless source is supplied. |
| AMP-03 | Contact details input labels and GEL usage | AMP-specific feedback; reusable rule candidate | Contact page uses local `Field`/`Input`/`Select`; shared `Field` label weight is 500 and inputs use fixed widths when `inputWidth` is set. | Patch candidate after classification. | Check labels, required markers, help text and whether contact fields should use the same required-field guidance as source-backed form pages. |
| AMP-04 | DOB validation | AMP-specific feedback | DOB validation checks only presence and broad ranges; parsing permits impossible dates such as 31/02. | High-priority patch candidate. | Use static validation only; do not add age eligibility, identity or backend validation. |
| AMP-05 | Email validation | AMP-specific feedback | Email check is a simple `@` plus dot test. | High-priority patch candidate, but keep lightweight. | Avoid overbuilding. Use a safer preview-level email validation rule and tests. |
| AMP-06 | Missing inline DOB error | AMP-specific feedback | Inline DOB error appears only for missing fields through `dobErr`; invalid-date branch in `errorsForStep` does not set a separate inline invalid-date state. | High-priority patch candidate. | Field-level and summary error text should agree for missing vs invalid date. |
| AMP-07 | Conditional accessibility/support needs structure | AMP-specific feedback; manual QA | Uses `ConditionalQuestionPanel`; conditional content appears after radio group with no focus move on reveal. | Patch carefully and manually QA. | Preserve source-backed conditional-panel pattern. Do not imply assessment, eligibility, service promise or automated decisioning. |
| AMP-08 | Full-width input behaviour | AMP-specific feedback; manual QA | Many inputs use `inputWidth='xl'`, `lg`, `md`, `xs`; `Input` fixed-width mapping caps `xl` at 416px. | Inspect visually before patching; likely targeted width changes only. | Confirm whether "full-width" means container width, mobile width, or matching Figma input slot. |
| AMP-09 | Input-page split/back-end dependency question | source-gated | AMP has separate applicant, contact, market, accessibility and supporting pages. Backend dependency is unknown. | Do not patch until owner/source decision. | Current split may be useful for review, but real AMP flow may not exist. Avoid inventing backend persistence or account/customer-record behaviour. |
| AMP-10 | Privacy/T&Cs structure inherited from Trial Permit | inherited Trial Permit feedback; source-gated | AMP privacy page is free text and privacy acknowledgement; Trial Permit fix separated privacy notice from T&Cs. | Patch candidate if applying inherited structural cleanup. | Use placeholders; no final privacy/legal copy. |
| AMP-11 | Form header/error summary placement inherited from Trial Permit | inherited Trial Permit feedback | AMP has step text and `ErrorSummary` before step body, not the hardened Trial Permit form-header composition. | Patch candidate, but larger blast radius. | Good reusable rule, but AMP has 9 steps so ProgressStepper usage boundary matters. |
| AMP-12 | Review edit actions inherited from Trial Permit | inherited Trial Permit feedback | AMP review has no edit actions back to applicant/contact/market/accessibility/supporting/declaration steps. | Patch candidate after validation slice. | Step-level edit routing is safe; field-level anchors and auto-return-to-review remain source-gated. |
| AMP-13 | Confirmation runtime source-inventory link | inherited Trial Permit feedback | AMP confirmation includes `Review TaPaaS source inventory` runtime link. | High-priority low-risk patch. | Trial Permit Slice 9 removed equivalent developer-facing runtime UI. |
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
| Review uses TaPaaS cards and fee preview | `ReviewInfoCard` and `ReviewFeesCard` are present. | Improve edit/actions and rows without replacing with generic UI. |
| Confirmation uses TaPaaS confirmation primitives | `ConfirmationHeader` and `TransactionSummaryCard` are present. | Keep confirmation-specific composition. |
| Exit modal is available on transaction steps | `ExitModal` is wired to clear mock data. | Preserve; do not add real draft saving. |
| Mock backend/payment boundaries are explicit | Review says no real payment; confirmation uses placeholders. | Preserve; do not invent backend, payment, receipt or approval logic. |

## High-priority fixes

| Priority | Fix | Why first | Safe boundary |
|---|---|---|---|
| 1 | Remove developer-facing source inventory link from AMP confirmation. | Low-risk inherited Trial Permit cleanup; runtime UI should not expose internal docs. | Runtime-only UI cleanup, no source-content claim. |
| 2 | Fix DOB inline error state to handle both missing and invalid DOB. | Designer called out missing inline DOB error; current invalid-date summary can disagree with inline state. | Use local validation only; no age, identity or eligibility logic. |
| 3 | Tighten preview-level email validation and add focused tests. | Current rule is very loose. | Keep simple and testable; no backend/email verification. |
| 4 | Review contact labels, required markers and GEL field usage. | Direct designer focus area and likely reusable across form pages. | Use existing GEL preview components; do not introduce new component abstractions. |
| 5 | Decide targeted full-width input behaviour for contact/supporting fields. | Likely visual polish and responsiveness issue. | Use responsive CSS/props only after browser check. |
| 6 | Improve support-needs structure only if a browser/keyboard pass shows a real issue. | Conditional reveal is sensitive for AT behaviour. | Keep conditional content adjacent; no focus/live-region claims unless tested. |

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

- Remove runtime source-inventory link from AMP confirmation.
- Add focused AMP regression coverage for confirmation content boundary.

Validation:

- `npm run test`
- `npm run build:all`
- `git diff --check`

### Slice 2 - DOB and email validation

Scope:

- Add missing vs invalid DOB inline error treatment.
- Tighten email validation without backend verification.
- Add tests for missing DOB, invalid DOB, invalid email and valid continuation.

Validation:

- focused AMP test if added
- `npm run test`
- `npm run build:all`

### Slice 3 - Contact details GEL/input treatment

Scope:

- Review labels, required markers, help text and field widths.
- Keep existing `Field`, `Input` and `Select`.
- Avoid changing shared `Field` unless the issue is confirmed reusable.

Validation:

- browser visual check at desktop and mobile
- `npm run test`
- `npm run build:all`

### Slice 4 - Conditional support-needs structure

Scope:

- Preserve `ConditionalQuestionPanel`.
- Clarify wording and required/error treatment.
- Add tests for "No" path, "Yes without details" blocked path and "Yes with details" path.

Validation:

- keyboard smoke
- manual QA notes for AT behaviour
- `npm run test`

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

### Slice 6 - Documentation and reusable rules

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
