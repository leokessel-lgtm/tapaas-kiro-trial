# TaPaaS page template registry

## Repeatable transaction skeleton

Use this page order for the v0.3 trial skeleton:

1. Privacy
2. Search or input
3. Declaration
4. Review
5. Confirmation

The skeleton is intentionally generic. It should help Kiro users build simple repeatable transactions, not recreate every TaPaaS state.

## Multi-page form input guidance

For transactions with more than 5 steps, use multiple form input pages between Privacy and Declaration. Each form page maps to template `8410:37703`.

Keep each page focused on one topic:
- Applicant details (name, date of birth)
- Contact details (email, phone, address)
- Service-specific details (event, vehicle, permit type)
- Supporting information (free text, document confirmation)

This pattern scales to 6–10 steps without requiring new components or templates.

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

## MCP-confirmed template structure

The 2026-05-20 Figma MCP pass confirmed that each core template page is organised into source sections such as:

- `Component`
- `Sub-components`
- `Designer documentation`
- `Developer documentation`
- `Accessibility annotations`

This confirms the Templates file is structured well for Kiro extraction. Selected annotation text was extracted for the core pages. Kiro should continue to treat the source sections as separate evidence streams rather than flattening them into a single visual description.

## MCP documentation findings

| Template | Figma documentation signal | Kiro rule |
|---|---|---|
| Privacy step `3395:41359` | Includes Privacy page, privacy/legal sections, terms and conditions, notifications, error summary and accessibility code example for the terms checkbox. | Use native checkbox with explicit label association. Privacy/terms text requires owner confirmation. |
| Search input page `16274:18397` | Includes Search only and List and search variants, dynamic selection content, accessibility notes for search and vehicle-detail landmarks. | Keep mock search in this pack. If adding result selection, preserve heading/region structure and do not add backend lookup. |
| Form input page `8410:37703` | Includes input slot, GEL form fields, sections, section headings, in-page errors, introductory text, mandatory field instructions and page-title accessibility notes. | Use focused form pages. Include visible mandatory-field guidance and source-backed error summary behaviour. |
| Declaration step `9894:3936` | Includes statement declarations and questionnaire/radio variants. | Keep declaration wording placeholder until legal/policy owner confirms it. |
| Review step `8143:15161` | Accessibility note says edit link labels should describe the section being edited, for example `Edit <Heading 3>`. | Review edit controls must be section-specific, not generic `Edit`. |
| Confirmation step `5354:8224` | Usage guidance says header verb must be past tense and transaction summary, alerts, next steps and backend messages require configuration. Accessibility note says callout headings should be H3 semantically even if visually smaller. | Use past-tense confirmation heading, mock backend alerts only, and preserve semantic heading levels. |
| Exit modal `4677:1042` | Has authenticated and unauthenticated variants with `No, continue`, `Yes, exit and log out`, and `Yes, exit` copy. | Do not implement as an inline notice if a real exit flow is required. Use a source-backed modal with focus management. |
| Business error page `8931:31271` | Accessibility annotations include page title, H1/H2, empty alt and `role="alert"` guidance. | Treat business errors as source-confirmed hard-stop routes only. Do not invent error codes. |
| System error page `17628:2069` | Includes a technical hard-stop page with retry/start-over/logout actions and accessibility guidance. | Use only for app/system routing. Do not blend with validation errors. |

## Additional template/context pages confirmed by MCP

| Page | Source node | Role | Current status |
|---|---|---|---|
| Intro/Context | `8131:11988` | Includes Right Hand Panel Usage Guidance | Deep extraction pending |
| Business error page | `8931:31271` | Business-rule hard stop template | Design-only |
| System error page | `17628:2069` | System/technical error template | Design-only |
| Exit modal | `4677:1042` | Exit/cancel confirmation modal | Design-only |
| Email confirmation modal | `9290:50392` | Email confirmation/update modal | Design-only |
| Time out modal | `13768:39` | Session timeout modal | Design-only |
| Local Components | `632:695` | File-local template components | Deep extraction pending |

## Template extraction priorities for next MCP pass

1. Mobility Parking Scheme `MPS Final` `0:16535`
   - Map its real frames to the TaPaaS page templates before attempting an MPS skeleton.
2. Review step `8143:15161`
   - Deep-map review info card, review fees card, declaration review, legal accordion and edit-link labelling.
3. Search input page `16274:18397`
   - Extract search-only, list-and-search, result, selection and error states.
4. Exit modal `4677:1042`
   - Extract modal behaviour and focus expectations before implementing any full modal pattern.
5. Business and system error pages `8931:31271`, `17628:2069`
   - Extract hard-stop routing rules and accessibility annotations before coding error pages.

## Skeleton page requirements

| Page | Minimum content | Validation | Risk notes |
|---|---|---|---|
| Privacy | Privacy card, optional terms checkbox, CTA group | Terms checkbox if present | Privacy wording must be confirmed by owner. |
| Search/input | Heading, body guidance, one input or form group, CTA group | Required input selection | Do not call backend APIs. Mock search only. |
| Declaration | Declaration callout, checkbox statement, CTA group | Checkbox required | Legal wording must be confirmed. |
| Review | Review info card, optional fee card, declaration reminder, CTA group | Submit action only | No payment logic in this pack. |
| Confirmation | Confirmation header, transaction summary, next steps, CTA group | None | Reference numbers and timeframes are mock data only. |

## Kiro rule

When building from these templates, Kiro should treat the template page as the source of page structure and the component registry as the source of reusable component choice. If the template references a component that is `design-only`, Kiro must either skip it, substitute a safer source-backed GEL component, or ask for confirmation before implementing.
