# Trial Permit feedback reconciliation

Date: 2026-05-30

## Executive summary

Overall status: Trial Permit is hardened as a simple Experiment 1 transaction assembly benchmark. Slice 8 fixed the source-verified error-summary link colour item, and Slice 9 closed the post-reconciliation cleanup items that were appropriate before designer-facing review: shared CTA ordering and removal of the developer-facing source inventory link from the confirmation UI.

What is genuinely fixed:

- Step order is preserved as `privacy`, `input`, `declaration`, `review`, `confirmation`.
- Non-confirmation steps use a form-header scaffold with transaction label, active page title and stepper.
- Error summary placement is below the page title/header.
- Privacy collection notice and T&Cs/declaration concerns are separated.
- Privacy, review, fees, declaration review, transaction summary and next-steps patterns are used where repo evidence supports them.
- Review edit actions return to the relevant source step, with a documented step-level limitation.
- CTA order and confirmation action wording are improved; shared `TransactionCtaGroup` now follows the Back-before-primary order when a Back action exists.
- Submitted validation errors persist while typing and clear/revalidate only on Continue.
- Mandatory-field guidance is present on the application-details step.

What is protected:

- Correct high-level transaction flow.
- Checkbox component choice where the interaction is an acknowledgement or declaration.
- Existing polite/focus behaviour around the error summary.
- Error-summary links to relevant fields.
- Responsive button wrapping and review-card stacking support.

What is documented as reusable rules:

- TaPaaS templates should be used before generic UI.
- Form header owns transaction label, page title and stepper.
- Privacy notice and T&Cs/declaration content are separate.
- Source-required placeholders are better than invented copy.
- Review pages need source-context edit actions.
- Confirmation uses confirmation-specific CTA and summary/next-step composition.
- Error summary stays below the page title/header and follows GEL anatomy.
- Error-summary links should use dark link treatment, with error colour reserved for marker/icon/border/background.
- Accessibility claims require measured or manual evidence.

What remains source-gated:

- No standalone Trial Permit Figma flow has been found.
- Exact Trial Permit privacy notice copy, T&Cs/declaration copy, permit-type explanation, confirmation copy, receipt/reference rules and post-submit actions remain unverified.
- Whether Trial Permit specifically needs Keep a record or TUTD remains unverified.
- The approved replacement for the suspected deprecated ice-blue token remains unverified.
- Field-level edit anchors and auto-return-to-review remain unverified.

What remains manual QA:

- Browser visual checks at desktop, tablet and narrow mobile widths.
- Secondary-heading wrapping and resize behaviour.
- Keyboard pass for error links, review edit controls and CTA order.
- VoiceOver/NVDA or equivalent assistive-technology testing.
- Contrast measurement before any WCAG pass/fail claim.

Partly addressed or source-gated items:

- Review, confirmation, privacy and declaration are structurally improved, but remain partly addressed where final copy or Trial Permit-specific Figma source is missing.
- Confirmation Keep a record/TUTD is correctly deferred, not silently fixed.

## Feedback-by-feedback reconciliation table

| ID | Original feedback | Category | Current status | Evidence | Remaining action | Blocks next transaction? |
|---|---|---|---|---|---|---|
| TP-01 | Correct steps and order. | Transaction flow | Fixed; Protected | `src/TrialPermitSkeleton.tsx` defines `privacy`, `input`, `declaration`, `review`, `confirmation`; tests walk the flow. | Preserve unless a Trial Permit source flow proves otherwise. | No |
| TP-02 | Declaration page differs from Figma structure. | Figma/source fidelity; page templates; content | Partly addressed; Source-gated | Declaration now sits under form header, uses warning alert and declaration checkbox. No Trial Permit source flow found. | Verify exact declaration structure and copy if a source flow is supplied. | No |
| TP-03 | Review differs from Figma title, page structure and sections. | Figma/source fidelity; page templates | Partly addressed; Source-gated | Review title is `Review your application`; uses review info, fees and declaration review patterns. | Verify exact Trial Permit review structure, headings and section order against source. | No |
| TP-04 | Confirmation differs from Figma page structure, sections and components. | Figma/source fidelity; page templates | Partly addressed; Source-gated | Confirmation uses confirmation header, transaction summary, next steps and post-submit reset action. | Verify exact Trial Permit confirmation source, including missing sections and post-submit actions. | No |
| TP-05 | Privacy differs from Figma title, section structure and content. | Figma/source fidelity; content | Partly addressed; Source-gated | Privacy page uses `PrivacyCardPreview`, separate privacy notice and T&Cs placeholders. | Replace placeholders only with source or owner-approved copy. | No |
| TP-06 | Trial Permit source flow not found. | Figma/source fidelity | Source-gated; Not promoted | Closure report and Slice 6B docs state Trial Permit is a simple assembly benchmark, not a source-parity recreation. | Do not claim Trial Permit source parity unless a standalone source flow is supplied. | No |
| TP-07 | Form header is not used correctly. | Page templates | Fixed; Documented rule | `TrialPermitFormHeader` wraps transaction label, page title and stepper for non-confirmation steps. | Manual visual review against TaPaaS template still useful. | No |
| TP-08 | Stepper should be inside form header. | Page templates | Fixed; Documented rule | `ProgressStepper` is rendered inside `TrialPermitFormHeader`. | Preserve in future page-template slices. | No |
| TP-09 | Transaction name should be page label. | Page templates | Fixed; Documented rule | `transactionName` is displayed as the form-header page label. | Preserve. | No |
| TP-10 | Page title should mirror active step. | Page templates | Fixed; Documented rule | `pageTitles` drives the active heading in the form header. | Verify exact page title wording if source appears. | No |
| TP-11 | Error in-page alert appears above page title. | Page templates; validation/error handling | Fixed; Protected | `ErrorSummary` is rendered after the form header; tests assert heading precedes summary. | Preserve placement. | No |
| TP-12 | Secondary/back CTA does not follow expected left-side pattern. | Component relationships; page templates | Fixed; Protected | `TrialPermitActionGroup` renders Back before primary action; shared `TransactionCtaGroup` now uses the same Back-before-primary order where Back exists; tests assert both paths. | Preserve when future transaction skeletons use the shared component. | No |
| TP-13 | Secondary/back CTA has red/destructive styling concern. | Component choice; accessibility | Fixed; Manual QA required | Back uses `Button variant='secondary'`; tests assert `gel-btn--secondary` and not `gel-btn--destructive`. | Manual contrast/visual review still required. | No |
| TP-14 | Confirmation CTA is missing secondary button and primary action appears wrong. | Transaction flow; component relationships | Partly addressed; Source-gated | Confirmation no longer shows Continue; primary label is `Start another application`. | Do not add final destination or secondary action without source evidence. | No |
| TP-15 | Privacy card missing. | Component choice | Fixed | `PrivacyCardPreview` is used. | Keep final content source-gated. | No |
| TP-16 | Checkbox is right component type but wrong privacy/T&Cs purpose. | Component choice; content | Fixed; Protected | Checkbox label is T&Cs agreement, not privacy collection notice. | Verify final legal wording. | No |
| TP-17 | Input fields are not GEL components or not used correctly. | Component choice; accessibility | Partly addressed | Uses local GEL-shaped `Field`, `Input` and `RadioButtonList`. | Shared component-level GEL parity remains outside Trial Permit. | No |
| TP-18 | Labels are not bold. | Component choice; page templates | Fixed locally; Not promoted globally | Trial Permit passes `<strong>` label and legend content locally. | Decide separately whether shared GEL preview labels should change. | No |
| TP-19 | Review card is not TaPaaS review card. | Component choice | Partly addressed; Source-gated | Review uses existing `ReviewInfoCard`; docs still note exact Review Card variant may differ. | Verify the exact TaPaaS Review Card expected by designers. | No |
| TP-20 | Fees component missing. | Component choice | Fixed; Source-gated content | `ReviewFeesCard` is rendered and tested. | Confirm whether `$0.00` is the right Trial Permit fee treatment. | No |
| TP-21 | Confirmation missing Keep a record or TUTD. | Component choice; content | Source-gated; Deferred | Closure report explicitly lists Keep a record/TUTD as unconfirmed. | Add only if Trial Permit-specific source evidence confirms it. | No |
| TP-22 | Transaction summary card misaligned, missing key info and includes unnecessary applicant name. | Component choice; content | Partly addressed; Source-gated | Uses `TransactionSummaryCard`; applicant name removed; summary includes reference, permit type and receipt placeholder. | Verify exact required rows, alignment and receipt/reference rules. | No |
| TP-23 | Review edit button should go to relevant input page. | Component relationships | Fixed; Documented limitation | Application edit routes to application-details step; declaration edit routes to declaration step. | Field-level anchors and auto-return-to-review remain source-gated. | No |
| TP-24 | Confirmation summary should use relevant transaction info. | Component relationships; content | Partly addressed | Summary uses reference, permit type and receipt placeholder, without applicant name. | Verify final transaction summary rules. | No |
| TP-25 | Confirmation should use next-step/end-of-transaction composition. | Component relationships | Partly addressed; Source-gated | Uses `NextStepsCardPreview`; confirmation action is post-submit reset; developer-facing source inventory link was removed from the confirmation UI in Slice 9. | Verify final end-of-transaction CTA set and any Keep a record/TUTD need. | No |
| TP-26 | Permit type explanation missing. | Content | Partly addressed; Source-gated | A source-required permit-type explanation placeholder is present. | Replace only with source-backed explanation. | No |
| TP-27 | Missing T&Cs. | Content | Partly addressed; Source-gated | Terms and conditions section exists with source-required placeholder. | Replace placeholder with owner-approved terms. | No |
| TP-28 | Privacy collection notice and intro text not reused. | Content; Figma/source fidelity | Source-gated | Privacy collection notice placeholder exists; intro copy remains preview/mock wording. | Source or owner-approved content required. | No |
| TP-29 | Declaration/review/input intro text not source-backed. | Content | Source-gated; Partly addressed | Mock/non-production and source-required wording is visible; final copy is not claimed. | Replace only with source-backed content. | No |
| TP-30 | Mandatory input field instructions missing. | Page templates; accessibility; content | Fixed | Application details includes `* indicates a required field.` | Verify wording if source requires different instruction. | No |
| TP-31 | Error summary does not use GEL components correctly. | Validation/error handling; component choice | Partly addressed; Manual QA required | Uses shared local `ErrorSummary` with GEL marker, class and field links; tests cover structure. | Compare full visual/role anatomy against current GEL source before stronger claim. | No |
| TP-32 | Error message displays in red. | Validation/error handling; accessibility | Fixed; Manual QA required | Shared `ErrorSummary` links now use `style={{ color: 'var(--gel-color-link)' }}`. Trial Permit tests check summary links target fields and do not use `var(--gel-color-error)`. | Contrast and assistive-technology checks remain manual QA. | No |
| TP-33 | Error state disappears on entering input, not after Continue. | Validation/error handling | Fixed; Protected | Submitted errors are stored separately and tests confirm errors persist while typing until Continue revalidates. | Preserve. | No |
| TP-34 | Polite alert for error summary works. | Accessibility; validation/error handling | Protected; Manual QA required | Error summary focus/link behaviour is preserved; step text has polite live region. | Manual AT testing still required for announcement quality. | No |
| TP-35 | Error summary links to relevant errors work. | Accessibility; validation/error handling | Fixed; Protected | Tests assert links to privacy, name, permit type and declaration controls. | Preserve in future fields. | No |
| TP-36 | Claimed WCAG AA contrast risk for secondary button. | Accessibility | Manual QA required; Not claimed | Tests only assert non-destructive class; closure report rejects WCAG claims. | Measure contrast in rendered browser before any pass/fail claim. | No |
| TP-37 | Error-summary link styling should use dark link treatment. | Accessibility; validation/error handling | Fixed; Documented rule | Slice 8 changed the shared local `ErrorSummary` link colour to `var(--gel-color-link)` while preserving error colour for icon/border/background. | Keep contrast and AT checks manual-QA gated unless measured. | No |
| TP-38 | Heading order and layout. | Accessibility; page templates | Partly addressed; Manual QA required | Form header/page title structure improved; no standalone Trial Permit source or AT heading audit. | Manual heading and landmark review required. | No |
| TP-39 | Manual keyboard/focus/AT checks. | Accessibility | Manual QA required | Closure report lists keyboard and VoiceOver/NVDA gates. | Perform browser and AT QA before any approval claim. | No |
| TP-40 | Secondary headings may not resize correctly. | Responsiveness | Manual QA required | Existing CSS supports wrapping/stacking, but no browser screenshot pass was run in Slice 5. | Browser resize QA at sensible widths. | No |
| TP-41 | Buttons responsive. | Responsiveness | Protected | GEL preview CSS makes buttons full-width at narrow width; action group uses wrapping. | Preserve. | No |
| TP-42 | Review card stacking works. | Responsiveness | Protected | `.tapaas-summary-row` stacks at `max-width: 640px`; tests protect review card headings. | Browser visual QA still useful. | No |
| TP-43 | Could work for a simple transaction. | Reusability; positive signals | Protected; Documented rule | Closure report treats Trial Permit as simple assembly benchmark, not source-parity recreation. | Use as process benchmark only. | No |
| TP-44 | Reusable TaPaaS/GEL rules should be recorded. | Reusability | Fixed; Documented rule | Slice 6B updated Trial Permit plan, MPS review pack and Storybook architecture docs. | Promote further only with evidence-backed stories or acceptance targets. | No |

## Findings by category

### Transaction flow

The high-level Trial Permit flow is fixed and protected. The runtime uses the expected five-step sequence and the tests walk the major happy and blocked paths. Confirmation now behaves as a post-submission state instead of a normal form input step.

### Figma/source fidelity

No standalone Trial Permit source flow has been found. MCP/source evidence supports reusable TaPaaS/GEL transaction patterns from Owner Builder master templates, MPS, NOD and subscribed libraries, but not Trial Permit-specific source parity. During this reconciliation, Owner Builder master template metadata was rechecked through MCP and confirmed the presence of privacy, input, declaration, review, confirmation, receipt and error master frames. The previously documented Slice 6B GEL node evidence is retained as source evidence, but a fresh direct lookup of the recorded GEL Error summary node was not available from the current MCP context.

Trial Permit must therefore stay framed as a simple assembly benchmark. Copy, exact sections, receipt/reference behaviour and source-level page structure remain source-gated.

### Page templates

The page-template feedback is mostly fixed. The form header owns the transaction label, page title and stepper on non-confirmation steps. The error summary is now below that header/page-title structure. These rules are also documented for future transaction assemblies.

### Component choice

Component selection is materially improved:

- `PrivacyCardPreview` is used for privacy/T&Cs structure.
- `Field`, `Input`, `RadioButtonList` and `Checkbox` are used for inputs and acknowledgements.
- `ReviewInfoCard`, `ReviewFeesCard` and `DeclarationReview` are used on review.
- `TransactionSummaryCard` and `NextStepsCardPreview` are used on confirmation.

Remaining component-choice caveats are source-gated or manual-QA-gated. The suspected `#f4f7f9` ice-blue issue remains in shared preview styles for review/fees card-like components and should not be changed without confirmed replacement token evidence.

### Component relationships

Review edit relationships are fixed at the safest available step level. Application details and declaration edits return to the relevant source step. Field-level anchors and auto-return-to-review are documented limitations, not hidden defects.

CTA hierarchy is improved. Back appears before the primary action and uses the secondary button variant in both Trial Permit and the shared `TransactionCtaGroup`. Confirmation uses a post-submit reset label, `Start another application`, rather than Continue. Final destination URLs, service-specific secondary actions and exact end-of-transaction CTA patterns remain source-gated.

### Content

Content is mostly source-gated by design. The runtime now uses explicit placeholders for privacy notice, terms and conditions, permit type explanation, confirmation timeframes, contact method and permit access method. This is the right behaviour for Experiment 1 because it avoids inventing legal, privacy, policy or operational content.

### Validation/error handling

Validation timing and field-link behaviour are fixed and protected. Submitted errors now persist while the user types and clear/revalidate only after Continue is clicked again.

The main runtime validation/error behaviours are now fixed or protected. Error-summary links use the dark link token, errors persist while typing, errors clear/revalidate only on Continue, and links remain available to relevant fields. Visual contrast and assistive-technology behaviour remain manual QA.

### Accessibility

Accessibility-related structure improved, but approval-level claims remain correctly gated. The code and tests protect error links, error placement and CTA order. Manual keyboard, focus order, heading/landmark, dynamic announcement and assistive-technology checks remain required. WCAG contrast claims are not supported until rendered colours are measured.

### Responsiveness

Responsive positives are protected by existing CSS and test coverage at component-structure level. Buttons wrap and become full width on narrow screens. Review summary rows stack at small widths. Secondary-heading resizing was not browser-verified in Slice 5 and remains manual QA.

### Reusability

Trial Permit has produced reusable rules for future transaction assembly, but it should not be promoted as a source-complete Trial Permit flow or acceptance-backed Storybook review surface. The deliberate decision not to add a Trial Permit Storybook story remains acceptable. A future story could be useful, but it would not become acceptance-backed unless the manifest is intentionally updated.

## Hidden-gap review

- No original feedback item appears to be entirely missing from the parity plan or closure report.
- Some early "fix now" entries in the parity plan are legacy planning text. Later slice status and the closure report supersede them.
- The dark error-summary link treatment is now implemented in the shared local `ErrorSummary` and protected by focused Trial Permit regression coverage.
- The shared CTA ordering mismatch identified after reconciliation has been fixed in Slice 9.
- The developer-facing source inventory link has been removed from the Trial Permit confirmation runtime UI; source inventory documentation remains in docs.
- Keep a record/TUTD is correctly deferred and source-gated.
- Final copy is consistently source-gated and not claimed as complete.
- There are no unsupported claims that Trial Permit is production-like, source-complete, WCAG compliant, GEL approved or TaPaaS approved.
- Trial Permit Storybook expansion was deliberately not done and remains acceptable because no Storybook story or manifest-backed acceptance target was intentionally created.

## Risks and caveats

- No standalone Trial Permit source flow has been found.
- Final Trial Permit copy is not verified.
- Trial Permit-specific Keep a record/TUTD remains unverified.
- WCAG, contrast and assistive-technology outcomes remain manual QA unless measured.
- Source parity is not claimed.
- The local shared `ErrorSummary` visual link treatment was corrected in Slice 8. Broader error-summary role, announcement, spacing and contrast parity still require source/manual verification.

## Decision

Recommendation: Ready to move to the next transaction, subject to the already documented manual QA and source-gated content caveats.

Slice 8 closed the previously recommended error-summary visual treatment slice:

- Shared local `ErrorSummary` links now use dark link treatment.
- Error colour remains reserved for marker/icon/border/background.
- Focused Trial Permit regression coverage protects link targets and link colour treatment.

Slice 9 closed the post-reconciliation cleanup that was appropriate before designer-facing review:

- Shared `TransactionCtaGroup` now renders Back before the primary action where a Back action exists.
- Trial Permit confirmation no longer exposes the developer-facing source inventory link in runtime UI.
- Source/content gates, Storybook deferral, manual accessibility QA and source-parity anti-claims remain unchanged.

Remaining gates are not blockers for the next transaction:

- final Trial Permit source copy and source-specific post-submit actions
- Keep a record/TUTD verification
- WCAG/contrast/assistive-technology evidence
- standalone Trial Permit source-Figma parity
