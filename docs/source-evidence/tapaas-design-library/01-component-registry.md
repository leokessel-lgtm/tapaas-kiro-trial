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
| Declaration review | `27:38386` | TaPaaS-specific composite | draft | Review page declaration playback | Documented only |
| TaPaaS radio buttons | `31:63987` | GEL variant | draft | Radio selection with TaPaaS content model | Use existing `RadioButtonList` unless card behaviour is required |
| TaPaaS radio button cards | `31:63988` | TaPaaS-specific composite | design-only | Card-based selection | Do not implement without engineer and accessibility review |
| Search vehicle input | `22:16683` | TaPaaS-specific composite | draft | Vehicle lookup/search step | Built in skeleton with existing `Field`, `Input`, `Button` only |
| Details card single | `2413:787` | TaPaaS-specific composite | draft | Context/details card | Documented only |

## Coded preview components

These are **trial-only composites** in `src/tapaas-preview/`. They are not real TaPaaS production components.

| Preview component | Inputs | Source evidence | Notes |
|---|---|---|---|
| `ConfirmationHeader` | `title`, `transactionName` | Confirmation page header `9:10494` | Uses a visual success mark and plain text. Requires accessibility review before reuse. |
| `TransactionSummaryCard` | `heading`, `items`, optional `children` | Transaction summary card `10:1861` | Uses semantic section and definition-list style rows. |
| `ReviewInfoCard` | `title`, `sections`, optional edit action | Review info card `18:4448` | Supports stacked review rows only for this trial. |
| `ReviewFeesCard` | `title`, `fees`, `totalLabel`, `totalAmount` | Review fees card `18:4449` | Mock amounts only. No payment logic. |
| `TransactionCtaGroup` | `onBack`, `onContinue`, `onExit`, labels | Transaction CTA button guidance and end-of-transaction CTA guidance | Uses GEL preview buttons. No modal behaviour included. |

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
| Details card | `DetailsCard` TaPaaS preview composite | TaPaaS-specific | draft | Read-only contextual summary card. Source evidence: Details card single `2413:787`. Configurable heading level. Optional status label and action link. |
| Conditional question panel | `ConditionalQuestionPanel` TaPaaS preview composite | TaPaaS-specific | needs engineer review | Shows extra fields based on a radio answer. Uses fieldset/legend. Conditional content appears after the radio group. Validation blocks when conditional branch requires input. |

