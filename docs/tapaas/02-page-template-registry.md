# TaPaaS page template registry

## Repeatable transaction skeleton

Use this page order for the v0.3 trial skeleton:

1. Privacy
2. Search or input
3. Declaration
4. Review
5. Confirmation

The skeleton is intentionally generic. It should help Kiro users build simple repeatable transactions, not recreate every TaPaaS state.

## Page templates

| Template | Source node | Maturity | Role in skeleton | Notes |
|---|---|---|---|---|
| Privacy step | `3395:41359` | draft | Included | Use after authentication when privacy and consent information is required. Mark privacy wording for owner confirmation. |
| Search input page | `16274:18397` | draft | Included as search-first input example | Use when the user needs to find an item before continuing. Search results are mock-only in this pack. |
| Form input page | `8410:37703` | draft | Alternative input pattern | Use for generic form capture where search is not required. |
| Declaration step | `9894:3936` | draft | Included | Use when formal acknowledgment is required. Legal wording must be source-confirmed. |
| Review step | `8143:15161` | draft | Included | Use for playback of captured details, declarations and fees before submit. |
| Confirmation step | `5354:8224` | draft | Included | Use after successful completion. Timeframes, reference numbers and next steps must be source-confirmed. |
| PDF receipt | `9926:3752` | design-only | Excluded from coded skeleton | Treat as future receipt guidance only. |
| Exit modal | `4677:1042` | design-only | Excluded from coded skeleton | Requires modal behaviour, focus management and wording confirmation. |
| Email confirmation modal | `9290:50392` | design-only | Excluded from coded skeleton | Requires modal behaviour and content confirmation. |
| Time out modal | `13768:39` | design-only | Excluded from coded skeleton | Requires session behaviour and security review. |
| Business error page | `8931:31271` | design-only | Excluded from coded skeleton | Requires source-confirmed business rules. |
| System error page | `17628:2069` | design-only | Excluded from coded skeleton | Requires app error-routing design. |

## Skeleton page requirements

| Page | Minimum content | Validation | Risk notes |
|---|---|---|---|
| Privacy | Privacy card, optional terms checkbox, CTA group | Terms checkbox if present | Privacy wording must be confirmed by owner. |
| Search/input | Heading, body guidance, one input or form group, CTA group | Required input selection | Do not call backend APIs. Mock search only. |
| Declaration | Declaration callout, checkbox statement, CTA group | Checkbox required | Legal wording must be confirmed. |
| Review | Review info card, optional fee card, declaration reminder, CTA group | Submit action only | No payment logic in this pack. |
| Confirmation | Confirmation header, transaction summary, next steps, CTA group | None | Reference numbers and timeframes are mock data only. |

