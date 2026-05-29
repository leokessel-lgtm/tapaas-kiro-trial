# Trial Permit quality and parity remediation plan

Date: 2026-05-29

Status: Slice 6B patched. Runtime changes remain limited to Slices 1 to 5. Slice 6B is documentation-only reusable rule promotion from Trial Permit hardening and MCP/Figma evidence.

## TLDR

The Trial Permit transaction has the correct high-level step order and a useful simple-transaction baseline, but it is not yet a good parity target. The main gap is composition: the transaction uses the right broad page types, but several pages are assembled from generic preview pieces instead of the stronger TaPaaS page/template patterns now available in the build pack.

Fix the Trial Permit transaction before moving to other transactions. Treat this as Experiment 1 quality hardening: preserve the working flow and validation behaviours, then align page structure, component choice, content reuse, review editing, confirmation layout and Storybook coverage.

Do not claim production readiness, formal accessibility compliance, GEL compliance, TaPaaS approval, privacy approval, legal approval or policy approval.

## Slice 1 patch status

Completed on 2026-05-29:

- Added a Trial Permit form header structure for non-confirmation steps.
- Moved the stepper inside the form header.
- Added the transaction name as the page label in the form header.
- Added the active step title as the page title, using the existing step order.
- Moved the validation summary below the form header/page title so it no longer appears above the page title.
- Removed duplicate step headings from the individual page bodies where the form header now owns the page title.
- Added the missing scaffold-level required-field hint to the application-details page.
- Preserved the existing step order: `privacy`, `input`, `declaration`, `review`, `confirmation`.

Files changed in Slice 1:

- `src/TrialPermitSkeleton.tsx`
- `src/TrialPermitSkeleton.test.tsx`
- `docs/tapaas/trial-permit-quality-parity-plan.md`

Still open after Slice 1:

- CTA placement and confirmation CTA corrections.
- Privacy card internals and T&Cs content.
- Review card internals, edit functionality and Fees component parity.
- Confirmation summary internals, Keep a record/TUTD content and missing confirmation sections.
- GEL error summary visual/component fidelity.
- Exact source/Figma verification for Trial Permit copy, page sections and confirmation content.
- Storybook documentation and acceptance-manifest updates.

Risks and unknowns after Slice 1:

- The form header uses a bounded preview grey background and structure, not a verified production TaPaaS/GEL implementation.
- Confirmation still uses the existing confirmation component structure because confirmation internals were excluded from this slice.
- Required-field hint wording is scaffold-level and still needs source confirmation before broader reuse.
- Automated tests cover the changed heading expectation only; browser and visual parity checks are still required.

## Slice 2 patch status

Completed on 2026-05-29:

- Replaced the free-text privacy page body with the existing source-backed `PrivacyCardPreview` pattern.
- Separated privacy collection notice content from terms and conditions content.
- Used explicit placeholders where source copy is missing:
  - `[Source content required: privacy collection notice]`
  - `[Source content required: terms and conditions text]`
- Preserved the checkbox component type and changed its purpose from privacy acknowledgement to terms-and-conditions agreement.
- Kept the application-details data flow and field names while making the Trial Permit field label/legend treatment locally bold.
- Kept the existing source-backed `ReviewInfoCard` and `ReviewFeesCard` usage.
- Added the existing `DeclarationReview` component to review-page playback without adding edit navigation.
- Kept the existing source-backed `TransactionSummaryCard` usage.
- Removed applicant name from the confirmation summary because no source evidence in this pass required it.
- Replaced the hand-coded confirmation next-steps list with the existing source-backed `NextStepsCardPreview`.
- Preserved Slice 1 header/page-title structure, step order, validation timing, error-summary behaviour, error links, CTA journey semantics and responsive button behaviour.

Files changed in Slice 2:

- `src/TrialPermitSkeleton.tsx`
- `src/TrialPermitSkeleton.test.tsx`
- `docs/tapaas/trial-permit-quality-parity-plan.md`

Deferred after Slice 2:

- Review edit navigation back to the relevant input page.
- CTA placement and confirmation CTA journey corrections.
- Detailed review card internals beyond use of the existing review/fees/declaration components.
- Confirmation summary internals beyond removing applicant name and using the existing next-steps component.
- Privacy card final copy and final T&Cs copy.
- Storybook documentation and acceptance-manifest updates.
- Cross-transaction reusable rule promotion.

Items needing source/Figma verification after Slice 2:

- Exact privacy collection notice copy.
- Exact terms and conditions copy and whether the agreement checkbox belongs on the privacy/start page or a later declaration page.
- Final declaration wording and whether review-page declaration playback should be card or accordion variant.
- Whether Trial Permit requires a dedicated TaPaaS Review Card variant beyond `ReviewInfoCard`.
- Whether `$0.00` fees should appear for Trial Permit and the exact Fees component content model.
- Confirmation summary required rows, receipt rules and reference format.
- Keep a record / TUTD meaning, component availability and placement.
- Final next-step wording, notification timing and permit access wording.

Risks and unknowns after Slice 2:

- The privacy and T&Cs placeholders are intentionally not final service content.
- The terms checkbox now uses a more appropriate purpose, but final legal/privacy ownership is unverified.
- Application-details label bolding is local to Trial Permit; the shared GEL preview `Field` and `RadioButtonList` components still need a separate source-backed decision before broad changes.
- The review page now uses more existing TaPaaS components, but edit behaviour remains deliberately deferred.
- `NextStepsCardPreview` is source-backed as a component, but Trial Permit next-step content remains placeholder and owner-gated.
- No formal accessibility, GEL, TaPaaS, privacy, legal or policy approval is implied.

## Slice 3 patch status

Completed on 2026-05-29:

- Added review edit actions for the two evidenced review source contexts:
  - `Application details` routes back to the application-details step.
  - `Declaration` routes back to the declaration step.
- Implemented the safest available step-level edit routing in the current skeleton.
- Preserved validation timing and field-level validation logic while resetting attempted error display during review edit navigation.
- Added local Trial Permit CTA ordering so Back appears before the primary action on review/input/declaration steps.
- Kept secondary/back as a normal secondary action, not a destructive or error action.
- Changed confirmation action label from `Start again` to `Start another application` so the confirmation state reads as post-submission rather than another form input step.
- Kept confirmation action behaviour to the existing safe reset route; no final destination URL or service-specific action was invented.
- Added source-required permit-type guidance placeholder:
  - `[Source content required: permit type explanation]`
- Kept confirmation summary aligned to transaction details without reintroducing applicant name.
- Preserved Slice 1 and Slice 2 structures and component usage: `PrivacyCardPreview`, `ReviewInfoCard`, `ReviewFeesCard`, `DeclarationReview`, `TransactionSummaryCard` and `NextStepsCardPreview`.

Files changed in Slice 3:

- `src/TrialPermitSkeleton.tsx`
- `src/TrialPermitSkeleton.test.tsx`
- `docs/tapaas/trial-permit-quality-parity-plan.md`

Deferred after Slice 3:

- Full source-parity review edit routing to section anchors inside a step.
- Any edit route that skips forward directly back to review after a single field edit.
- Final CTA destinations, exit/save/session behaviour and post-submit service actions.
- Keep a record / TUTD component or content.
- Final permit-type guidance content.
- Storybook documentation and acceptance-manifest updates.
- Cross-transaction CTA or review-edit rule promotion.

Items needing source/Figma verification after Slice 3:

- Whether review edit links should target step-level pages or field/section anchors.
- Exact edit-link wording and placement for the Trial Permit review page.
- Confirmation CTA label, hierarchy and any real post-submit destination.
- Whether `Start another application` is an acceptable preview-only reset label.
- Whether permit-type guidance belongs before, inside or after the choice component.
- Final source copy for permit-type explanation.
- Keep a record / TUTD meaning, component evidence and placement.

Risks and unknowns after Slice 3:

- Review edit routing is step-level only. It should not be claimed as full source parity or field-level edit routing.
- Local Trial Permit CTA ordering avoids changing shared components, but broader transaction CTA rules remain unpromoted.
- Confirmation still uses placeholder next-step and receipt content; no operational instructions are confirmed.
- The permit-type guidance is an explicit placeholder, not policy or eligibility content.
- No accessibility measurement, WCAG claim, GEL approval, TaPaaS approval, privacy approval, legal approval or policy approval is implied.

## Slice 4 patch status

Completed on 2026-05-29:

- Kept the existing repo `ErrorSummary` component as the closest available GEL-shaped pattern.
- Added a Trial Permit-specific submitted-error state so error summary and field-level errors persist until the user clicks Continue again.
- Preserved error-summary focus and links to relevant fields.
- Added a stable `trial-permit-error-summary` id for the Trial Permit summary instance.
- Preserved validation timing, field-level validation rules, data entry and navigation behaviour.
- Confirmed the error summary remains below the Slice 1 page title/header structure.
- Preserved the application-details mandatory-field instruction without adding duplicate content.
- Kept Slice 2 and Slice 3 component structure and behaviours intact.

Files changed in Slice 4:

- `src/TrialPermitSkeleton.tsx`
- `src/TrialPermitSkeleton.test.tsx`
- `docs/tapaas/trial-permit-quality-parity-plan.md`

Deferred after Slice 4:

- Shared `ErrorSummary` implementation changes across all transactions.
- Visual/pixel comparison against the real GEL ErrorSummary and field-error components.
- Contrast measurement for summary links, field borders, icons or inline error text.
- VoiceOver/NVDA announcement testing for the error summary, field errors and revalidation flow.
- Any cross-transaction validation-state refactor.
- Storybook documentation and acceptance-manifest updates.

Items needing source/Figma/GEL verification after Slice 4:

- Whether the local preview `ErrorSummary` should use `role="group"` or the GEL source `role="alert"` in this trial context.
- Exact GEL/TaPaaS error-summary visual treatment, including link colour and icon treatment.
- Exact field-level error styling and whether the current local preview should be changed globally.
- Assistive-technology announcement behaviour for the submitted-error persistence pattern.
- Whether required-field guidance should remain per page or move into a reusable form-header/content pattern.

Risks and unknowns after Slice 4:

- Error persistence is intentionally local to Trial Permit. Other skeletons still use the shared hook's live recomputation behaviour.
- The shared local `ErrorSummary` still contains preview styling and has not been source-measured for contrast.
- No WCAG, GEL, TaPaaS, accessibility, privacy, legal or policy approval is implied.

## Slice 5 patch status

Completed on 2026-05-29:

- Inspected the Trial Permit secondary/back CTA implementation and confirmed it uses the local GEL-shaped `Button` with `variant='secondary'`.
- Added regression coverage that the Back CTA keeps the `gel-btn--secondary` class and does not use the destructive button class.
- Preserved the Slice 3 CTA order and journey semantics. No route destinations or post-submit behaviours were changed.
- Inspected the Trial Permit error summary after Slice 4 and confirmed it continues to use the repo `ErrorSummary` pattern with `data-gelweb-component='error-summary'`.
- Added regression coverage for the Trial Permit error-summary id, GEL component marker and CSS class while preserving links, placement and validation timing.
- Added review-page structure coverage for the current `ReviewInfoCard` and `ReviewFeesCard` composition.
- Inspected responsive support in the current repo styles:
  - buttons retain existing small-viewport full-width behaviour from `.gel-btn` mobile CSS;
  - Trial Permit action buttons retain `flexWrap`;
  - review summary rows retain the existing card-stacking rule at `max-width: 640px`.
- Inspected the deprecated/ice-blue risk. The remaining `#f4f7f9` usage is in shared preview styles for TaPaaS review/fees/evidence/card-like patterns, not a Trial Permit-only local override.
- Avoided changing shared TaPaaS preview colour styles in this slice because exact GEL/TaPaaS token replacement evidence is still missing.

Files changed in Slice 5:

- `src/TrialPermitSkeleton.test.tsx`
- `docs/tapaas/trial-permit-quality-parity-plan.md`

Verified visual/accessibility items in Slice 5:

- Secondary/back CTA is not using destructive/error semantics in the Trial Permit action group.
- CTA order remains Back, primary action, Exit on the review step.
- Error summary remains structurally tied to the GEL-shaped `ErrorSummary` component and remains below the Slice 1 page title/header structure.
- Error links remain available through the existing Slice 4 tests and structure.
- Review page still renders the current review and fees card headings.
- Button wrapping and review summary stacking are supported by the existing CSS rules and were not regressed by this slice.

Deferred after Slice 5:

- Browser screenshot or visual QA at desktop, tablet and narrow mobile widths.
- Manual check that secondary headings resize and wrap acceptably in real rendered browsers.
- Manual keyboard pass for error links, review edit controls and CTA order in a browser.
- VoiceOver/NVDA testing for error summary, review edit actions and post-submit state.
- Any shared TaPaaS preview style change for `#f4f7f9` until GEL/TaPaaS source confirms the replacement token or component treatment.
- Storybook documentation and acceptance-manifest updates.

Items needing GEL/Figma/source verification after Slice 5:

- Exact GEL/TaPaaS secondary button visual treatment and hover/focus states.
- Exact GEL/TaPaaS error-summary visual treatment, including link colour, icon treatment and role/announcement pattern.
- Whether the shared TaPaaS review/fees card `#f4f7f9` background is the deprecated ice-blue token referenced in designer feedback and, if so, the approved replacement token.
- Contrast for error summary links, field-error indicators, CTA colours and card backgrounds against rendered browser styles.
- Exact responsive rules for secondary headings in Trial Permit templates.

Risks and unknowns after Slice 5:

- No contrast measurement was performed in this slice. Requires manual contrast verification against rendered browser styles.
- No formal WCAG AA, GEL approval, TaPaaS approval or assistive-technology pass is implied.
- The suspected ice-blue colour remains in shared preview styles because changing it would affect other components and transactions without source-backed token evidence.
- The verification is component/test-level plus code inspection; visual parity still needs browser-based review against Figma/source.

## Slice 6B documentation status

Completed on 2026-05-30:

- Recorded the latest MCP/Figma evidence as reusable transaction-assembly evidence, not as Trial Permit-specific source parity.
- Promoted reusable TaPaaS/GEL transaction rules that were proven by Trial Permit hardening, repo evidence and the latest MCP inspection.
- Reclassified Trial Permit as a simple transaction assembly benchmark built from reusable TaPaaS/GEL patterns.
- Kept Trial Permit out of source-complete or production-like language because no standalone Trial Permit Figma source was found.
- Left runtime code, tests, Storybook stories, acceptance manifest, package files, lockfiles, shared CSS/token files and Track 2 spike files unchanged.

Latest MCP/Figma evidence inspected:

- NOD Production: `gx2Dt1o34FQVFkiKwuSEI7`, node `0:9685`.
- MPS Final: `75rryaOGOQPYkdUB4vHqK7`, node `0:16535`.
- Owner Builder WIP walkthrough: `A7P3WSOHhJoEDHCKYNogRY`, node `1:190`.
- Owner Builder layout specs: `A7P3WSOHhJoEDHCKYNogRY`, node `1:191`.
- Owner Builder accessibility annotations: `A7P3WSOHhJoEDHCKYNogRY`, node `1:192`.
- Owner Builder master templates/business rules: `A7P3WSOHhJoEDHCKYNogRY`, node `1:195`.
- Subscribed source libraries: GEL Web UI Kit, Templates - TaPaaS Design Library and Components - TaPaaS Design Library.
- GEL Button node `17291:7220`, confirming Primary, Secondary, Tertiary and Destructive are distinct button types.
- GEL Error summary node `1323:3458`, confirming dark link treatment for error-summary links and error colour reserved for marker/icon/border/background treatment.
- GEL Form header node `1334:6095`, confirming page label, page title and progress stepper inside the form-header area.

Slice 6B decision:

- Trial Permit remains useful as a simple transaction assembly quality benchmark.
- Trial Permit is not a source-parity recreation of a Trial Permit-specific Figma flow.
- Reusable rules can be promoted when they are backed by TaPaaS/GEL library evidence, transaction examples and the Trial Permit hardening work.
- Trial Permit-specific wording, final service actions and policy-like content remain source-gated.

Reusable rules promoted in Slice 6B:

1. Use TaPaaS page templates first, not generic cards or blocks.
2. Form header owns transaction label, page title and stepper composition.
3. Keep source-required placeholders where exact content is missing.
4. Privacy card is not a declaration checkbox.
5. Privacy notice and T&Cs/declaration are separate concerns.
6. Form/input pages should include required-field guidance and source-backed field instructions.
7. Review pages need source-context edit actions.
8. Review pages should use review info, fees and declaration review patterns where relevant.
9. Confirmation uses confirmation-specific CTA patterns, not normal form-step CTAs.
10. Confirmation should use transaction summary and next steps/what happens next patterns where relevant.
11. Transaction CTA buttons belong on transaction pages except confirmation.
12. End-of-transaction CTA buttons belong on success/confirmation steps.
13. Error summary stays below page title/header, links to fields, and follows GEL component anatomy.
14. Error-summary links should use dark link treatment, with error colour reserved for marker/icon/border/background treatment.
15. Do not substitute generic UI when a TaPaaS/GEL component exists.
16. Accessibility claims require measured or manual evidence.

Items still source-gated after Slice 6B:

- Exact Trial Permit privacy notice copy.
- Exact T&Cs/declaration copy.
- Exact permit-type explanation.
- Exact Trial Permit confirmation copy, receipt/reference rules and post-submit actions.
- Whether Trial Permit specifically needs Keep a record/TUTD.
- Approved replacement for the suspected deprecated ice-blue token.
- Field-level edit anchors or auto-return-to-review behaviour.

Manual QA still required:

- Browser screenshot or visual QA at desktop, tablet and narrow mobile widths.
- Manual check that secondary headings resize and wrap acceptably in real rendered browsers.
- Keyboard pass for error links, review edit controls and CTA order.
- VoiceOver/NVDA testing for error summary, review edit actions, dynamic validation updates and post-submit state.
- Contrast verification against rendered browser styles before any WCAG pass/fail claim.

Items not promoted:

- Exact Trial Permit privacy notice copy.
- Exact T&Cs/declaration copy.
- Exact permit-type explanation.
- Exact Trial Permit confirmation copy, receipt/reference rules and post-submit actions.
- Keep a record/TUTD as a Trial Permit requirement.
- WCAG pass/fail or contrast claims.
- Approved replacement for suspected deprecated ice-blue token.
- Field-level edit anchors or auto-return-to-review.
- Any claim that Trial Permit is Figma-complete, source-complete, production-like, GEL approved, TaPaaS approved or final-copy approved.

Files changed in Slice 6B:

- `docs/tapaas/trial-permit-quality-parity-plan.md`
- `docs/tapaas/10-review-pack-mps-transaction-assembly.md`
- `docs/tapaas/11-gel-storybook-architecture.md`

## Audit scope

### Primary implementation files

| File | Role in Trial Permit | Notes |
|---|---|---|
| `src/TrialPermitSkeleton.tsx` | Main Trial Permit transaction implementation | Contains step order, page rendering, form state, validation, review and confirmation content. Primary future change target. |
| `src/TrialPermitSkeleton.test.tsx` | Unit/integration tests for Trial Permit | Protects privacy blocking, input validation, declaration blocking, review submit and confirmation reference. Needs expansion for parity fixes. |
| `src/App.tsx` | In-app route/switcher surface | Defaults to Trial Permit and exposes it through the visible transaction switcher. May need only title/subtitle/page-label alignment. |
| `src/useTransactionStep.ts` | Shared transaction navigation and validation hook | Provides current positive behaviours: validation on Continue, error-summary focus, heading/status focus and back/reset handling. Avoid broad changes. |
| `src/gel.ts` | GEL preview adapter export surface | Confirms Trial Permit uses local preview components, not real `@snsw-gel/react`. Do not change for this pass unless a component export is genuinely missing. |
| `src/gel-preview/index.tsx` | Local GEL-shaped component implementations | Includes `ErrorSummary`, `Field`, `Input`, `RadioButtonList`, `Checkbox`, `InPageAlert`, `ProgressStepper`. May need targeted style/behaviour fixes if the defect is generic. |
| `src/gel-preview/styles.css` | GEL preview styling | Contains error summary styling and mobile button behaviour. Candidate only if error summary/link/field-label styling must be fixed globally. |
| `src/tapaas-preview/index.tsx` | TaPaaS preview composites | Contains `PrivacyCardPreview`, `ReviewInfoCard`, `ReviewFeesCard`, `ConfirmationHeader`, `TransactionSummaryCard`, `TransactionCtaGroup`, `MpsReviewFramePreview`, `MpsConfirmationFramePreview`, `NextStepsCardPreview`. Candidate for reusable rule fixes, especially CTA ordering. |
| `src/tapaas-preview/styles.css` | TaPaaS composite styling | Contains review card, summary card, CTA and responsive stacking styles. Candidate for left-side secondary/back CTA pattern and reusable review/confirmation layout fixes. |

### Storybook and review-surface files

| File | Role | Notes |
|---|---|---|
| `src/stories/TapaasComposites.stories.tsx` | Main Storybook review surface for TaPaaS composites and MPS end-to-end assembly | Existing stories cover review/confirmation, review info card, transaction summary card and confirmation header. Add Trial Permit-specific assembly story later. |
| `src/stories/TapaasCardsPanels.stories.tsx` | Storybook review surface for card/panel patterns | Existing `Privacy Card Pattern` should inform Trial Permit privacy rebuild. |
| `src/stories/TapaasChoicesInputs.stories.tsx` | Storybook review surface for choice/input patterns | Candidate for documenting permit-type choice and mandatory input rules if those become reusable. |
| `src/stories/TapaasGelPatterns.stories.tsx` | GEL/TaPaaS pattern review stories | Candidate if form header, error summary or mandatory field guidance becomes a reusable page rule. |
| `src/stories/VisualQaSelectedMaturity.stories.tsx` | Selected maturity visual QA surface | Candidate only if Trial Permit needs to appear in visual QA acceptance. Do not alter unrelated IDs without a manifest reason. |
| `tests/browser/deployed-smoke.spec.ts` | Published app and Storybook smoke tests | Currently checks Trial Permit initial heading and general mobile overflow. Add focused Trial Permit parity smoke later if implementation changes are accepted. |
| `tests/browser/component-acceptance.spec.ts` | Storybook/component acceptance checks | Candidate after new Trial Permit assembly story or acceptance-manifest entries are added. |

### Documentation and evidence files

| File | Role | Notes |
|---|---|---|
| `docs/tapaas/trial-permit-quality-parity-plan.md` | This plan | Documentation-only output for this audit pass. |
| `docs/tapaas/01-component-registry.md` | Component maturity and usage registry | Already records privacy card, review card, fees card, confirmation header, transaction summary card and CTA group. Update later only if Trial Permit changes promote a component rule. |
| `docs/tapaas/02-page-template-registry.md` | Page template source guidance | Key source for privacy, form input, declaration, review, confirmation, mandatory fields and review edit-link expectations. |
| `docs/tapaas/04-evidence-log.md` | Trial evidence log | Existing Trial Permit entry says it was a repeatability proof with placeholder privacy/legal/fee/timeframe content. Add a new entry after implementation, not during this planning pass unless Leo wants evidence-only tracking. |
| `docs/source-evidence/tapaas-design-library/04-evidence-log.md` | Mirrored evidence log | Must stay identical to `docs/tapaas/04-evidence-log.md` if evidence is updated later. |
| `docs/tapaas/05-component-template-relationship-map.md` | Component-to-template rules | Key source for choosing `PrivacyCardPreview`, `ReviewInfoCard`, `ReviewFeesCard`, `TransactionSummaryCard`, `NextStepsCardPreview` and `TransactionCtaGroup`. |
| `docs/tapaas/08-transaction-coverage-matrix.md` | MPS-focused coverage matrix | Not Trial Permit-specific today. Candidate for a new simple-transaction coverage section only if Experiment 1 needs cross-transaction rules. |
| `docs/tapaas/09-component-acceptance-manifest.json` | Storybook acceptance manifest | Do not change until a new or changed Storybook story needs acceptance checks. |
| `docs/tapaas/11-gel-storybook-architecture.md` | Storybook IA plan | Candidate only if new Trial Permit stories require IA decisions. |
| `docs/03-gel-form-styles-reference.md` | Form styling reference | Candidate for generic form field and label rules. |
| `docs/04-building-transaction-pages.md` | Transaction page build guidance | Candidate for reusable page-template and form-header rules after Trial Permit fixes prove useful. |
| `.kiro/steering/10-tapaas-transaction-skeleton-rules.md` | Transaction skeleton steering | Candidate for reusable rules after implementation evidence. |
| `.kiro/steering/11-tapaas-component-selection-rules.md` | Component selection steering | Candidate for component-choice rules after fixes. |
| `.kiro/steering/12-tapaas-figma-to-code-evidence-rules.md` | Evidence discipline | Candidate if source verification rules need tightening. |
| `.kiro/steering/13-tapaas-safety-boundaries.md` | Safety and anti-claim boundaries | Probably no change needed unless confirmation/privacy wording creates risk. |
| `.kiro/steering/14-tapaas-prompt-templates.md` | Prompt templates | Candidate for reusable Trial Permit build prompt after hardening. |

### Out of scope for this pass

- `package.json`, `package-lock.json`, `node_modules/`, generated `dist/`, generated raw source evidence, unrelated transaction skeletons, unrelated Storybook IDs and `track-2-spike/`.
- Live Figma re-extraction. This plan uses the designer feedback as the source of truth and marks source/Figma verification where needed.

## Positive behaviours to protect

| Behaviour | Current evidence | Protection rule |
|---|---|---|
| Correct steps and order | `stepOrder` is `privacy`, `input`, `declaration`, `review`, `confirmation` | Preserve this order unless Figma/source verification explicitly changes the simple transaction structure. |
| Checkbox component choice where appropriate | Privacy and declaration use `Checkbox` | Keep checkbox for terms/declaration-style acknowledgement. Correct the content and placement, not the basic control type. |
| Polite alert/error-summary behaviour | `useTransactionStep` validates on Continue and focuses `ErrorSummary`; step text uses `aria-live="polite"` | Preserve validation-on-submit and focus behaviour. Do not change error display to immediate validation on typing. |
| Error links to relevant fields | Error summary links target `#privacy-confirmation`, `#applicant-name`, `#permit-type`, `#declaration-accepted` | Preserve link targets and add tests for any new fields. |
| Responsive buttons | `TransactionCtaGroup` and GEL mobile button CSS stack buttons at small widths | Preserve mobile stacking while fixing desktop ordering/placement. |
| Review card stacking content | `.tapaas-summary-row` and review card styles stack/read well | Preserve stacked review readability while switching to the correct TaPaaS review card/frame pattern. |
| Simple transaction viability | Designer feedback says this could work for a simple transaction | Keep the hardening bounded. Do not expand into real backend, identity, payment, policy or production behaviour. |

## Feedback classification and disposition

| Feedback item | Classification | Current likely source | Disposition | Notes |
|---|---|---|---|---|
| Correct steps and order | Transaction flow | `TrialPermitSkeleton.tsx` | Protect | Keep five-step model. |
| Secondary/back CTA does not follow expected left-side pattern | Page templates; component relationships; responsiveness | `TransactionCtaGroup`, `.tapaas-primary-actions` | Fix now | Likely reusable `TransactionCtaGroup` rule. Verify exact desktop order against template guidance if available. |
| Confirmation CTA is missing secondary button and primary action appears wrong | Page templates; component choice; content | `ConfirmationStep`, `TransactionCtaGroup` | Fix now plus verify label | Add secondary/end action pattern. Primary action label likely needs source confirmation. Do not invent real routing. |
| Multiple pages differ from Figma design: titles, page structure, missing sections and missing components | Figma/source fidelity; page templates; content | All Trial Permit step components | Verify first, then fix | Use designer feedback as current source, but page-specific exact copy/sections need Figma/template verification. |
| Form header is not used correctly | Page templates; Figma/source fidelity; component relationships | Top-level progress stepper and page headings | Fix now plus source verify for exact anatomy | Stepper should sit inside form header grey background; transaction name should be page label; page title should mirror each step. |
| Review page has wrong title/component, missing edit functionality to relevant input page | Page templates; component choice; component relationships; accessibility | `ReviewStep`, `ReviewInfoCard` | Fix now | Add section-specific edit actions that return to relevant step. Preserve descriptive edit labels. |
| Not using TaPaaS Review Card; missing functionality; uses deprecated GEL colour token ice blue; not using Fees component | Component choice; Figma/source fidelity; reusability / Storybook rule candidate | `ReviewInfoCard`, `ReviewFeesCard`, `.tapaas-review-card`, `.tapaas-fees-card` | Partially fixed; token needs source verification | `ReviewInfoCard` and `ReviewFeesCard` are now used and covered by tests. Remaining `#f4f7f9` usage is shared preview styling, not a Trial Permit-only override; do not replace without approved token evidence. |
| Confirmation page missing sections/components, including Keep a record or TUTD | Page templates; component choice; content; Figma/source fidelity | `ConfirmationStep` | Verify first | Need source-confirmed section names, TUTD meaning/content and whether `NextStepsCardPreview` applies. |
| Confirmation summary card is misaligned, missing key info, includes unnecessary applicant name | Component choice; content; Figma/source fidelity | `TransactionSummaryCard` items | Fix now for applicant removal; verify missing key info | Remove applicant name unless source confirms it. Align summary card to confirmation template. |
| Privacy page missing T&Cs and not using TaPaaS privacy card | Component choice; page templates; content; privacy | `PrivacyStep` | Fix now with placeholders | Use `PrivacyCardPreview` with privacy collection notice and terms sections. Owner-approved wording remains review-gated. |
| Checkbox is correct component type but content is wrong where used for Privacy rather than T&Cs | Content; component choice; validation/error handling | `PrivacyStep` checkbox | Fix now | Keep checkbox but change acknowledgement to terms/conditions or confirmed template wording. Privacy acknowledgement wording needs source/owner verification. |
| Input fields are not GEL components or not used correctly; labels are not bold | Component choice; accessibility; page templates | `Field`, `Input`, GEL preview label style | Fix now, likely generic | `Field` currently uses `fontWeight: 500`; designer expects bold. Confirm if this should become GEL preview-wide. |
| Kiro did not reuse TaPaaS content for privacy collection notice or intro text in input, declaration and review pages | Content; Figma/source fidelity; reusability | Step copy in `TrialPermitSkeleton.tsx` | Verify first, then fix | Exact copy must come from TaPaaS source or owner-approved placeholder library. Do not invent final service copy. |
| Missed opportunity to explain differences between permit types | Content; component relationships; reusability / Storybook rule candidate | `InputStep` radio options | Fix now with bounded placeholder or verify source | Could add help text/descriptions if supported. Avoid policy-like eligibility claims. |
| Error summary does not use GEL components correctly | Validation/error handling; accessibility; component choice | `ErrorSummary` preview implementation | Verify first | Existing behaviour works partly. Need compare against GEL source/style before generic changes. |
| Error message displays in red | Validation/error handling; accessibility; component choice | Error summary link inline style and input border/icon | Verify first | Designer likely means inline error text should not be red. Current links are red and inline error text is black with red icon. Confirm target. |
| Error state disappears on entering input, not after clicking Continue for validation | Validation/error handling | `useTransactionStep` attempted state plus state updates | Protect / test | Current logic appears to keep attempted true until valid Continue. Add regression test because this positive behaviour is explicitly desired. |
| Mandatory input field instructions missing | Page templates; accessibility; content | `InputStep`, possibly form header | Fix now | Add visible required-field guidance, likely `* indicates a required field`, using source-backed form input template pattern. |
| Polite alert for error summary and links to relevant errors work and should be preserved | Accessibility; validation/error handling | `ErrorSummary`, `useTransactionStep` | Protect | Add test coverage around focus/link behaviour after changes. |
| Error in-page alert appears above page title | Page templates; validation/error handling; accessibility | Top-level `ErrorSummary` before active step component | Fix now | Move error summary into the form/page structure after form header/page title, while keeping focus and links. |
| Secondary headings may not adjust when resizing | Responsiveness; accessibility | Page headings and card headings | Verified by code inspection; browser check still required | Existing heading and card styles have responsive support, but desktop/tablet/390px rendered checks are still deferred. |
| Buttons and review card stacking appear responsive and should be preserved | Responsiveness | `TransactionCtaGroup`, `.tapaas-summary-row` | Protect | Add browser smoke checks if implementation changes are made. |
| Could work for a simple transaction | Transaction flow; reusability | Overall Trial Permit | Protect | Keep scope as simple transaction hardening, not a full MPS-style transaction. |

## Defects to fix now

1. Recompose the page header/form header so the transaction name is a page label, the active step title mirrors the step, and the stepper sits inside the grey form-header area.
2. Move the error summary/in-page validation alert below the page title/form header, not above it.
3. Correct `TransactionCtaGroup` desktop composition so Back/secondary follows the expected left-side pattern while preserving mobile stacking.
4. Add or correct confirmation page secondary action and review primary action labels without adding real routing.
5. Replace the privacy page body with `PrivacyCardPreview` structure including privacy collection notice, terms and conditions and notification-style sections.
6. Keep checkbox control type, but change privacy-step acknowledgement content so it is not a generic privacy checkbox if the template expects T&Cs acknowledgement.
7. Add mandatory-field guidance to input-style pages.
8. Make form labels bold where GEL/TaPaaS preview fields are used.
9. Add permit-type explanatory content that does not invent policy or eligibility rules.
10. Rework review page to use the correct TaPaaS review card/frame pattern, include section-specific edit actions back to relevant input/declaration pages, and keep fees visibly as a Fees component.
11. Remove unnecessary applicant name from confirmation summary unless source verifies it.
12. Verify deprecated ice-blue style/token usage in review/fees cards against GEL/TaPaaS source before changing shared preview styles.
13. Add regression tests for preserved behaviours: validation waits for Continue, error links target fields, review edit routes back to relevant step, responsive button/review stacking remains intact.

## Items needing source or Figma verification

| Item | Evidence needed | Why it should not be guessed |
|---|---|---|
| Exact form header anatomy | Template node or Figma frame showing grey header, stepper placement, page label/title hierarchy | A structural fix affects every transaction page if promoted. |
| Exact Trial Permit page titles and intro text | Trial Permit source frame or TaPaaS content source | Current copy is placeholder. Final-like content must not be invented. |
| Privacy collection notice and T&Cs wording | Service owner or source-backed content | Privacy/legal wording needs approval and must remain review-gated. |
| Declaration wording | Legal/policy owner or source-backed declaration pattern | Do not invent legal consequences or declarations. |
| Review Card vs current `ReviewInfoCard` | Component source for TaPaaS Review Card and expected edit placement | Designer says current component choice is wrong despite existing review card usage. |
| Fees component requirements | Source node `18:4449` and review template usage | Fees are currently present but not accepted by design feedback. Need exact composition. |
| Confirmation missing sections, including Keep a record or TUTD | Confirmation template/source frame | TUTD meaning, wording and section placement are unknown. |
| Confirmation CTA labels and destinations | Confirmation template and routing guidance | Avoid fake destinations or misleading primary actions. |
| Error summary GEL correctness | GEL source or designer example | Existing error summary works functionally but may not match visual/component anatomy. |
| Red error message treatment | GEL source or designer clarification | Need distinguish link colour, inline message text, border and icon colour. |
| Secondary-heading resizing | Browser screenshots plus source expectation | Could be a content/layout issue rather than component defect. |
| Shared review/fees card colour token | GEL/TaPaaS source token or Figma inspect data | `#f4f7f9` appears in shared preview card styles. Replacing it without source evidence could regress unrelated components. |

## Reusable rules for other transactions

1. Every transaction page should use the same form-header contract: transaction label, active step title, stepper placement and required-field hint where applicable.
2. Error summaries should appear within the active page structure after the page title/header, focus on failed Continue, and link to the relevant field or fieldset.
3. Validation errors should appear after Continue, not be cleared merely because the user has typed one character.
4. Back/secondary CTAs should follow the expected left-side/secondary pattern on desktop and remain full-width/stacked on mobile.
5. Privacy/start pages should use `PrivacyCardPreview` or a source-backed privacy card pattern, not free-text privacy paragraphs.
6. Terms, privacy, declaration and legal content must remain owner-confirmed or marked placeholder. Do not create source truth in code.
7. Review pages must use the TaPaaS review card/frame pattern with section-specific edit actions that route to the relevant input step.
8. Confirmation pages should compose confirmation header, transaction summary, keep-a-record/next-step content and end CTAs as a page template, not as independent cards.
9. Fees must use the Fees component/pattern when fee information is present, even for `$0.00` mock values.
10. Simple transactions should still explain choice differences where users select a type, without encoding unverified policy or eligibility decisions.
11. Deprecated GEL colour tokens should not appear in reusable TaPaaS preview CSS.
12. Any reusable rule promoted from Trial Permit must be backed by a Storybook review story or acceptance check before being applied broadly.

## Storybook documentation candidates

| Candidate | Proposed story/docs home | Purpose |
|---|---|---|
| Trial Permit end-to-end parity assembly | `src/stories/TapaasComposites.stories.tsx` | One review surface for the hardened simple transaction, similar to MPS end-to-end assembly but scoped to Trial Permit. |
| Form header and page title pattern | `src/stories/TapaasGelPatterns.stories.tsx` or a new transaction-template story section | Document transaction label, step title, stepper placement and required-field hint. |
| Transaction action area desktop/mobile states | Existing `Transaction Action Areas` story | Add accepted Back/Continue/Exit and confirmation/end-action variants. |
| Privacy card in transaction context | Existing `Privacy Card Pattern` story or new Trial Permit assembly story | Show privacy, terms and acknowledgement relationship. |
| Review card with edit routing | Existing `Review Info Card` story plus Trial Permit assembly story | Capture edit-label and destination expectations. |
| Fees component in review context | Existing review/confirmation story | Show `$0.00` or no-fee treatment without hiding the Fees component. |
| Confirmation page anatomy | Existing confirmation stories plus Trial Permit assembly story | Show confirmation header, transaction summary, Keep a record/TUTD, next steps and CTAs once source-verified. |
| Error summary placement and validation timing | GEL pattern story or test-only documentation | Protect placement after page title and validation-on-Continue behaviour. |

## Proposed implementation sequence

### Phase 0 - Baseline and guardrails

1. Capture current Trial Permit desktop and 390px screenshots for privacy, input, declaration, review, confirmation and validation error states.
2. Run current focused tests: `npx vitest run src/TrialPermitSkeleton.test.tsx`.
3. Record exact current Storybook IDs before adding any new Trial Permit review story.
4. Do not change package files, lockfiles, generated `dist/`, raw evidence or Track 2 spike files.

### Phase 1 - Page shell and validation placement

1. Add a Trial Permit page/form header composition inside `TrialPermitSkeleton.tsx`.
2. Move stepper and active page title into the form-header area.
3. Move `ErrorSummary` below the active page title/header and preserve focus.
4. Add required-field guidance to input/declaration pages where fields are mandatory.
5. Expand tests for error-summary placement, focus and validation timing.

### Phase 2 - CTA hardening

1. Adjust `TransactionCtaGroup` or its usage so Back/secondary appears in the expected desktop position.
2. Add confirmation secondary/end action using the confirmed or placeholder-safe destination.
3. Preserve mobile full-width/stacking behaviour.
4. Add targeted tests and a mobile browser smoke check.

### Phase 3 - Privacy and content composition

1. Replace the free-text privacy page with `PrivacyCardPreview` structure.
2. Include privacy collection notice, T&Cs and notification-style sections with source/owner placeholders if final text is not available.
3. Correct checkbox label/content to match the terms/acknowledgement purpose.
4. Reuse TaPaaS intro text where source-backed; otherwise mark placeholders clearly.

### Phase 4 - Input page fidelity

1. Keep GEL `Field`, `Input` and `RadioButtonList` unless source verifies a different choice component.
2. Correct label weight and field usage.
3. Add permit-type explanation content that is neutral and not policy-claiming.
4. Preserve validation-on-Continue and error links to `#applicant-name` and `#permit-type`.

### Phase 5 - Review page parity

1. Recompose review using the accepted TaPaaS Review Card/frame pattern.
2. Add section-specific edit actions to return to input and declaration pages.
3. Keep review content stacked and responsive.
4. Use the Fees component/pattern visibly and remove deprecated ice-blue styling.
5. Add tests for edit routing and review content.

### Phase 6 - Confirmation page parity

1. Recompose confirmation around `ConfirmationHeader`, `TransactionSummaryCard`, verified keep-a-record/TUTD content, next-step content and end CTAs.
2. Remove unnecessary applicant name from the summary unless source verifies it.
3. Add missing key info only when source/owner evidence exists.
4. Add tests for summary content, CTA availability and status semantics.

### Phase 7 - Storybook and evidence

1. Add a Trial Permit end-to-end Storybook review story only after the implementation shape is accepted.
2. Update `docs/tapaas/04-evidence-log.md` and `docs/source-evidence/tapaas-design-library/04-evidence-log.md` together.
3. Update component registry, relationship map, steering or acceptance manifest only for reusable rules actually proven by the hardening work.
4. Run `npm run test`, `npm run build:all`, `npm run parity` and targeted browser checks before any commit.

## Proposed files to change later

### Likely implementation changes

- `src/TrialPermitSkeleton.tsx`
- `src/TrialPermitSkeleton.test.tsx`
- `src/tapaas-preview/index.tsx`
- `src/tapaas-preview/styles.css`
- `src/gel-preview/index.tsx`
- `src/gel-preview/styles.css`

### Likely Storybook/test changes

- `src/stories/TapaasComposites.stories.tsx`
- `src/stories/TapaasCardsPanels.stories.tsx`
- `src/stories/TapaasGelPatterns.stories.tsx`
- `tests/browser/deployed-smoke.spec.ts`
- `tests/browser/component-acceptance.spec.ts`

### Likely documentation changes after implementation

- `docs/tapaas/04-evidence-log.md`
- `docs/source-evidence/tapaas-design-library/04-evidence-log.md`
- `docs/tapaas/01-component-registry.md`
- `docs/tapaas/05-component-template-relationship-map.md`
- `docs/tapaas/09-component-acceptance-manifest.json`
- `.kiro/steering/10-tapaas-transaction-skeleton-rules.md`
- `.kiro/steering/11-tapaas-component-selection-rules.md`
- `.kiro/steering/14-tapaas-prompt-templates.md`

## Validation plan for the later implementation

1. Unit: `npx vitest run src/TrialPermitSkeleton.test.tsx`.
2. Component/story: add or update targeted Storybook acceptance only if a new story or manifest entry is introduced.
3. Static: `npm run lint`, `npm run parity`, `git diff --check`.
4. Build: `npm run build:all`.
5. Browser: desktop and 390px walkthrough of privacy, input, declaration, review, confirmation and each validation-error state.
6. Accessibility smoke: keyboard-only navigation, focus after failed Continue, error links, Back/Edit routes and confirmation status focus.
7. Manual review: designer parity check against source/Figma for page header, privacy card, review card, fees and confirmation sections.

## Current risks and blockers

- Exact Trial Permit source copy and page sections are not verified in this pass.
- TUTD and Keep a record content are unknown and must not be invented.
- GEL error summary visual correctness needs source comparison or designer clarification.
- Review Card feedback conflicts with the current existence of `ReviewInfoCard`; this likely means the page-level composition is wrong, but the exact replacement should be source-verified.
- Broad `TransactionCtaGroup` or GEL `Field` fixes may affect other transactions. Treat those as reusable-rule changes and test visible flows.
- No formal accessibility claim should be made from automated tests alone.

## Audit conclusion

Trial Permit should be hardened before moving to other transactions. The best next move is a small, sequenced parity patch: page header and error placement first, CTA rules second, then privacy/input/review/confirmation composition. Keep the transaction simple, preserve the working validation behaviours, and only promote reusable rules once Storybook and tests prove the pattern.
