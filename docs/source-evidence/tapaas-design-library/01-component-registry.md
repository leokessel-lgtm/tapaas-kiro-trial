# TaPaaS component registry

## Trial component set

| Component | Source node | Classification | Maturity | Trial use | Implementation status |
|---|---|---|---|---|---|
| Confirmation page header | `9:10494` | GEL variant | needs engineer review | Confirmation step success header | Preview component: `ConfirmationHeader` |
| Transaction summary card | `10:1861` | TaPaaS-specific composite | needs engineer review | Confirmation summary and receipt details | Preview component: `TransactionSummaryCard` |
| Next steps card | `10:1862` | TaPaaS-specific composite | draft | Confirmation next steps | Documented only |
| Review info card | `18:4448` | TaPaaS-specific composite | needs engineer review | Review page information playback | Preview component: `ReviewInfoCard` |
| Review fees card | `18:4449` | TaPaaS-specific composite | needs engineer review | Review page fee breakdown | Preview component: `ReviewFeesCard` |
| Privacy card | `1:198` | TaPaaS-specific composite | draft | Privacy collection notice | Used as page guidance only |
| Conditional declaration | `27:56000` | GEL variant | draft | Mandatory declaration checkbox | Used as page guidance only |
| Declaration review | `27:38386` | TaPaaS-specific composite | needs engineer review | Review page declaration playback | MCP text extracted. Includes accordion and card variants. Use only after selecting the variant and confirming legal content treatment. |
| TaPaaS radio buttons | `31:63987` | GEL variant | draft | Radio selection with TaPaaS content model | Use existing `RadioButtonList` unless card behaviour is required |
| TaPaaS radio button cards | `31:63988` | TaPaaS-specific composite | needs engineer review | Card-based selection | MCP text extracted. Figma gives responsive spacing rules, fixed desktop width and error spacing. Do not implement until keyboard/focus/error behaviour is source-confirmed. |
| Search vehicle input | `22:16683` | TaPaaS-specific composite | draft | Vehicle lookup/search step | Built in skeleton with existing `Field`, `Input`, `Button` only |
| Details card single | `2413:787` | TaPaaS-specific composite | draft | Context/details card | Documented only |
| Details card single interactive | `2958:2499` | TaPaaS-specific composite | needs engineer review | Interactive context/details card | MCP text extracted. Figma marks it READY FOR BUILD, but the action model and keyboard behaviour still need engineering/accessibility review before coding. |
| Show more / less | `22:25082` | GEL variant | draft | Progressive reveal of optional content | MCP text extracted. Figma describes it as a GEL button with custom content and says it does not need to be rebuilt. Prefer existing GEL button/disclosure behaviour. |
| Legal info accordion | `22:35625` | TaPaaS-specific composite using GEL accordion behaviour | needs engineer review | Legal/privacy accordion content on review or declaration pages | MCP text extracted. Figma marks it BUILT and Custom/GEL, but legal/privacy content must not be hidden or made optional without content and accessibility confirmation. |
| VEOS selection card | `31:63989` | TaPaaS-specific composite | design-only | Vehicle Emissions Offset Scheme selection card | MCP inventory confirmed. Candidate selection-card pattern only. Needs deep review before use. |
| Backend error examples | `31:73426` | TaPaaS-specific pattern set | design-only | Backend/business/system error examples | MCP inventory confirmed. Requires source-confirmed business rules and error-routing design. |

## Coded preview components

These are **trial-only composites** in `src/tapaas-preview/`. They are not real TaPaaS production components.

| Preview component | Inputs | Source evidence | Notes |
|---|---|---|---|
| `ConfirmationHeader` | `title`, `transactionName` | Confirmation page header `9:10494` | Uses a visual success mark and plain text. Requires accessibility review before reuse. |
| `TransactionSummaryCard` | `heading`, `items`, optional `children` | Transaction summary card `10:1861` | Uses semantic section and definition-list style rows. |
| `ReviewInfoCard` | `title`, `sections`, optional edit action | Review info card `18:4448` | Supports stacked review rows only for this trial. |
| `ReviewFeesCard` | `title`, `fees`, `totalLabel`, `totalAmount` | Review fees card `18:4449` | Mock amounts only. No payment logic. |
| `TransactionCtaGroup` | `onBack`, `onContinue`, `onExit`, labels | Transaction CTA button guidance and end-of-transaction CTA guidance | Uses GEL preview buttons. No modal behaviour included. |
| `ExitModal` | `isOpen`, `onContinue`, `onExit`, labels | Exit modal `4677:1042` | Source-backed trial preview for exit confirmation. Uses `role="dialog"`, `aria-modal`, labelled/described content, Escape close, return focus and basic focus containment. Needs VoiceOver/NVDA review. |
| `BusinessErrorPage` | `title`, `message`, `guidance`, `reference`, `onStartAgain` | Business error page `8931:31271` | Source-backed trial preview for hard-stop business outcomes. Uses `role="alert"` around the error content. Requires real source-confirmed business rules before reuse. |
| `RepeatableGroup` | `title`, optional `description`, `children`, optional `actions` | Form input page `8410:37703`; GEL fieldset/form evidence | Preview composition for repeated form groups. Used for address and authorised-contact sections. Not a standalone TaPaaS component. |
| `EvidenceChecklistCard` | `title`, evidence `items`, optional `children` | MPS medical frames `4.A`/`4.Aa`/`4.B`/`4.Ba`; GEL file-upload evidence | Mock-only status summary for evidence requirements. Does not upload files and must not be treated as GEL FileUpload. |
| `AssessmentSummaryPanel` | `title`, assessment `items`, optional `children` | MPS eligibility, concession and review frame groups; GEL status-label evidence | Mock-only routing/status display. Does not make decisions or validate eligibility, concessions or payments. |

## Build rules

- Prefer existing GEL preview components for basic inputs, buttons, alerts, links and error summary.
- Add TaPaaS composites only when the pattern is repeated across transaction pages.
- Keep the TaPaaS layer separate from `src/gel.ts`.
- Do not add payment, identity proofing, backend calls or policy logic to the trial skeleton.
- Every coded TaPaaS preview component must map to a source node and have a maturity label.

## Composition patterns

These patterns use existing GEL preview components without creating new TaPaaS composites.

| Pattern | Components used | Classification | Maturity | Notes |
|---|---|---|---|---|
| Address input group | `Field` + `Input` (street, suburb, postcode) + `Select` (state) in a `fieldset` | GEL-aligned | draft | Wrap in fieldset with legend. No backend address lookup. |
| Date input (3-field) | 3 × `Input` (day xxs, month xxs, year sm) in a `fieldset` with legend | GEL-aligned | draft | Standard government date pattern. No date picker. No age/eligibility logic. |
| Textarea | `Textarea` GEL preview component | GEL-aligned | needs engineer review | Source: `@snsw-gel/textarea`. Added in v0.3 for multi-line text input. |
| Progress stepper | `ProgressStepper` GEL preview component | GEL-aligned | needs engineer review | Source: `@snsw-gel/progress-stepper` (local source evidence at `docs/source-evidence/gel-progress-stepper/`). Usage boundary: 4 to 6 steps only. Mobile shows step counter text; desktop shows step names with connecting lines. Completed steps show tick, current step shows blue numbered circle, todo steps are grey. Do not use for 8+ step flows. |
| Details card | `DetailsCard` TaPaaS preview composite | TaPaaS-specific | needs engineer review | Read-only contextual summary card. Source evidence: Details card single `2413:787`. Configurable heading level. Optional status label and action link. Coded and used in Accessible market permit skeleton. |
| Conditional question panel | `ConditionalQuestionPanel` TaPaaS preview composite | TaPaaS-specific | needs engineer review | Shows extra fields based on a radio answer. Uses fieldset/legend. Conditional content appears after the radio group. Validation blocks when conditional branch requires input. |
| More info panel | `MoreInfoDisclosure` GEL preview component (alias: `MoreInfoPanel`) | GEL variant | needs engineer review | GEL MoreInfoPanel source is a modal dialog with portal, backdrop, focus lock, Escape close and return-focus. The trial preview is a simplified inline disclosure for contextual help only. Do not use for critical content. Full GEL modal behaviour remains future engineer review work. Source: `docs/source-evidence/gel-components/more-info-panel/`. |
| Accordion | `Accordion` GEL preview component | GEL-aligned | needs engineer review | Source: `@snsw-gel/accordion` (evidence at `docs/source-evidence/gel-components/accordion/`). Button-based headings with `aria-expanded` and `aria-controls`. Open all/Close all with focus management (focus moves to opposite button after toggle, matching GEL source nextFocusTarget pattern). Panels use `section` with `aria-labelledby`. Does not implement full controlled/uncontrolled API or exact GEL styling. Do not nest. Do not put critical information inside. TaPaaS legal accordion `22:35625` is a content-specific use of this pattern and needs separate legal/content review. |
| Exit modal | `ExitModal` TaPaaS preview component | GEL/TaPaaS modal pattern | needs engineer review | Source: Exit modal `4677:1042`. Use for explicit exit confirmation only. Includes labelled/described dialog, Escape close, return focus and basic focus containment. Does not claim full production modal approval. |
| Business error page | `BusinessErrorPage` TaPaaS preview component | TaPaaS page pattern | needs engineer review | Source: Business error page `8931:31271`. Use only for hard-stop business outcomes with source-confirmed business rules and recovery instructions. The complex transaction uses simulated mock content only. |
| Repeatable group | `RepeatableGroup` TaPaaS preview composition | GEL-aligned form composition | needs engineer review | Uses `fieldset` and `legend` to group repeated fields. Source-backed by the generic Form input page `8410:37703` and GEL fieldset/input patterns. Keep legends plain; do not use native fieldset notches or decorative bordered card headings. |
| Evidence checklist card | `EvidenceChecklistCard` TaPaaS preview composition | GEL/TaPaaS composition | needs engineer review | Used to summarise evidence requirements and mock statuses. Mapped to MPS medical evidence frames and GEL status-label/file-upload evidence. It is not a file upload component and must not claim file validation, progress, upload or storage behaviour. |
| Assessment summary panel | `AssessmentSummaryPanel` TaPaaS preview composition | GEL/TaPaaS composition | needs engineer review | Used for mock routing summaries. Mapped to MPS eligibility/concession/review frame groups and GEL status-label evidence. It must not claim automated decisioning, eligibility assessment or policy validation. |

## MCP documentation findings

The 2026-05-20 MCP pass confirmed that several TaPaaS component pages already include explicit design/build status labels:

| Component | Figma status text seen | Practical Kiro interpretation |
|---|---|---|
| Confirmation page header | `READY FOR BUILD` | Safe to use as preview guidance, but keep engineer/accessibility review gate. |
| Privacy card | `BUILT` | Strong page guidance. Privacy wording still requires owner confirmation. |
| Conditional declaration | `READY FOR BUILD` | Good pattern for declaration structure. Legal wording remains unverified. |
| Legal info accordion | `BUILT`, `Custom / GEL` | Use only after confirming whether legal/privacy content may be collapsed. |
| Declaration review | `READY FOR BUILD`, `GEL`, `Figma`, `Storybook` | Good candidate for next coded component, but choose accordion vs card variant first. |
| Details card single interactive | `READY FOR BUILD` | Good candidate for next coded component, but confirm action semantics and keyboard behaviour. |
| Search vehicle input | `CONCEPT` | Keep mock-only and avoid backend lookup. |
| Review info card, review fees card, next steps card, transaction summary card | `CONCEPT` | Useful as trial composites. Do not overclaim maturity. |
| TaPaaS radio button cards | `CONCEPT` | Defer coding until accessibility behaviour is confirmed. |

The component pages consistently separate `Component`, `Sub-components`, `Designer documentation`, `Developer documentation` and `Accessibility annotations`. Kiro should inspect those sections before coding or changing a preview component.

## MCP extraction status

The 2026-05-20 Figma MCP pass confirmed component pages, documentation/accessibility sections and selected text for the main reusable components.

Before promoting any `design-only` component above, run a targeted MCP deep-dive on that component page and record:

- component anatomy
- variants/states
- dev annotations
- accessibility annotations
- dependencies on GEL or TaPaaS components
- templates where it appears
- coded equivalent or gap
