# Figma evidence notes

## Extraction method

The TaPaaS `.fig` files were parsed locally as Figma `fig-kiwi` archives. This provides page names, node IDs, node types, text content, symbol counts and instance counts.

Use this as draft evidence. Live Figma MCP inspection is still preferred before marking any component as implementation-ready.

## Component evidence highlights

| Component | Evidence summary | Known gaps |
|---|---|---|
| Confirmation page header | Figma text says this modifies the GEL form header with a green tick to show successful completion. It recommends an accessible label such as “Transaction completed”. | Need live inspection for final icon, heading hierarchy and exact accessible naming. |
| Transaction summary card | Figma text says it is a confirmation-page composite with summary heading, receipt information and optional product/address/payment rows. | Need final data model and which rows are mandatory per transaction. |
| Review info card | Figma text says it groups related review information, supports editable and non-editable states, horizontal and stacked layouts, and label/content emphasis. | Trial preview implements stacked rows only. |
| Review fees card | Figma text says it displays itemised fees and total cost, with editable and non-editable states. | Trial preview uses mock fee rows only. Payment integration is excluded. |
| Privacy card | Figma text says it provides privacy collection notice or privacy statement content and appears on consent/privacy pages. | Privacy content requires owner confirmation. |
| Conditional declaration | Figma text says the checkbox is mandatory and must be selected before continuing. | Legal content requires owner confirmation. |
| TaPaaS radio buttons | Figma text says these extend radio selection with optional secondary labels and clarifying text. | Existing GEL preview radio list should be used first. |
| TaPaaS radio button cards | Figma text says cards have selected, hover, focused and error states. | Do not code without accessibility review. |
| Search vehicle input | Figma text describes primary and secondary search functions for vehicle lookup. | No backend lookup in this pack. |
| Details card single | Figma text describes a card for displaying user/context information outside the review step. | Needs data model and transaction-specific examples. |

## Template evidence highlights

| Template | Evidence summary | Known gaps |
|---|---|---|
| Privacy step | Contains privacy card, optional terms, optional notifications and CTA guidance. | Needs transaction-specific privacy and terms text. |
| Search input page | Supports search-only and dynamic selection variants, including result and error states. | Trial skeleton only includes search-only mock flow. |
| Declaration step | Supports statement declarations and questionnaire declarations with required checkbox/radio validation. | Legal and policy text must be confirmed. |
| Review step | Groups review info, review fees, declaration review, legal accordion and CTA patterns. | Trial skeleton excludes legal accordion implementation. |
| Confirmation step | Includes confirmation header, alerts, summary, next steps, feedback and end CTA guidance. | Trial skeleton includes only a minimal confirmation flow. |

## Evidence boundary

- Extracted text is useful design evidence, but it is not a production contract.
- Generated implementation should sit below supplied evidence.
- Unknown behaviour must be labelled `Unknown` or `Needs TaPaaS confirmation`.
- Do not infer backend responses, payment rules, identity rules or legal wording.

