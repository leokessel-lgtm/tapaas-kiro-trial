# Figma evidence notes

## Extraction method

The TaPaaS `.fig` files were parsed locally as Figma `fig-kiwi` archives. This provides page names, node IDs, node types, text content, symbol counts and instance counts.

Use this as draft evidence. Live Figma MCP inspection is still preferred before marking any component as implementation-ready.

On 2026-05-20, Figma MCP was connected to the user's personal Figma account (`leokessel@gmail.com`) and used against personal-copy Figma files for Components, Templates and Mobility Parking Scheme. MCP access worked and confirmed file/page structure. A later MCP pass extracted selected component/template documentation text, accessibility-note excerpts and the `MPS Final` frame inventory.

Use the 2026-05-20 MCP output as **trial design evidence** only. It improves the earlier local parse but is still not official design-system sign-off or production readiness evidence.

## Component evidence highlights

| Component | Evidence summary | Known gaps |
|---|---|---|
| Confirmation page header | MCP text confirms `READY FOR BUILD`, Step: Confirmation, and notes that spacing is identical to GEL section header with page title area adjusted to accommodate the icon. Transaction name guidance is `[Noun] + [past-tense verb]`, for example `Application submitted`. | Need final icon, heading hierarchy and exact accessible naming verified in implementation. |
| Transaction summary card | MCP text confirms confirmation-step summary content, receipt rows and optional address/email/payment-style rows. | Need final data model and which rows are mandatory per transaction. |
| Review info card | MCP text confirms editable/non-editable variants, horizontal/stacked layouts and label/content emphasis variants. | Trial preview implements stacked rows only. |
| Review fees card | MCP text confirms editable/non-editable and large/small variants, itemised fee rows and total cost. | Trial preview uses mock fee rows only. Payment integration is excluded. |
| Privacy card | MCP text confirms `BUILT`, privacy collection notice/privacy statement purpose, agency sub-variant and usage on consent pages where personal data is collected or processed. | Privacy content requires owner confirmation. |
| Conditional declaration | MCP text confirms `READY FOR BUILD`, legal step usage and mandatory declaration-style content. | Legal content requires owner confirmation. |
| TaPaaS radio buttons | MCP text confirms extra content model: value, clarifying text and optional price-style content. | Existing GEL preview radio list should be used first unless the richer content model is required. |
| TaPaaS radio button cards | MCP text confirms card set, label, clarifying text, error message and responsive spacing notes. | Do not code without keyboard, focus and error-state review. |
| Search vehicle input | MCP text confirms primary and secondary search variants and examples such as plate/billing-number search. | No backend lookup in this pack. |
| Details card single | MCP text confirms static details card with key information, status label and label/value content. | Needs data model and transaction-specific examples. |
| Details card single interactive | MCP text confirms `READY FOR BUILD`, action text such as `Remove this vehicle`, and accessibility/developer sections. | Interaction behaviour, focus handling and action semantics still require engineering/accessibility review. |
| Show more / less | MCP text says this is a GEL button with custom content and does not need to be rebuilt. It is conceptually similar to an accordion header for revealing or hiding associated content. | Prefer source-backed GEL button/disclosure behaviour. Do not create a bespoke visual component. |
| Legal info accordion | MCP text confirms `BUILT`, `Custom / GEL`, Review-step usage, and content sections such as Privacy, Terms and Conditions and Notifications. | Do not use for critical legal/privacy content until content and accessibility owners confirm collapsible treatment. |
| Declaration review | MCP text confirms accordion and card variants, both using GEL/Storybook evidence labels. | Choose one variant per flow and confirm legal-content treatment before coding. |
| VEOS selection card | MCP text confirms a vehicle-specific animated/expanded selected-state card tied to Renew registration and carbon-offset contribution. | Out of scope for generic trial skeletons. Requires motion, payment/contribution and accessibility review before use. |

## Template evidence highlights

| Template | Evidence summary | Known gaps |
|---|---|---|
| Privacy step | MCP text confirms privacy/legal sections, error summary, notifications and checkbox accessibility example with explicit input/label association. | Needs transaction-specific privacy and terms text. |
| Search input page | MCP text confirms search-only and list-and-search variants plus accessibility notes for search and dynamic selection regions. | Trial skeleton only includes search-only mock flow. |
| Form input page | MCP text confirms GEL form field input slot, section headings, in-page error messages, introductory text, mandatory field instructions and page-title accessibility notes. | Trial skeletons should continue using focused topic pages rather than dense mega-forms. |
| Declaration step | MCP text confirms statement declarations and questionnaire/radio variants. | Legal and policy text must be confirmed. |
| Review step | MCP text confirms review info, review fees, legal/declaration material and accessibility guidance for descriptive edit links. | Trial skeletons must use section-specific edit labels and avoid hiding critical legal content. |
| Confirmation step | MCP text confirms confirmation header, backend alert placeholder, summary, next steps, feedback and end CTA guidance. | Trial skeleton includes only a minimal confirmation flow. Backend alerts and next steps remain mock/placeholder. |

## Mobility Parking Scheme MCP status

The Mobility Parking Scheme personal-copy file is accessible via MCP and contains these pages:

| Page | Node | Evidence summary | Known gaps |
|---|---|---|---|
| Cover | `1:25331` | Cover page accessible. | No transaction evidence. |
| MOS - Aligned with PSM | `0:1` | Page accessible; appears to contain aligned flow/reference material. | Deep component mapping still required before reuse. |
| MPS Final | `0:16535` | Frame inventory extracted. Contains application type, POI, personal details, eligibility, medical document, concession, review and confirmation frames. | Policy, identity, medical evidence, concession validation and backend rules are high-risk and must not be implemented from frames alone. |
| Water Carting - Mobile | `0:33253` | Page accessible. | Likely out of scope unless confirmed relevant. |
| Symbols | `0:33464` | Legacy/local symbols page accessible. Contains many local components such as buttons, global nav, validation message and icons. | Need mapping to current GEL/TaPaaS source-backed components before reuse. |
| Emails | `0:39493` | Page accessible. | Email artefacts not extracted. |
| Archive | `0:39557` | Page accessible. | Historical material only unless confirmed relevant. |

Do not treat Mobility Parking Scheme as the final trial candidate until `MPS Final` is inspected at frame level and mapped to TaPaaS templates/components.

## Mobility Parking Scheme frame groups

| Group | Frames seen | Mapping hypothesis | Build boundary |
|---|---|---|---|
| Landing/account/identity | `0.A Landing page`, `0.B MyAccount`, `0.C POI` to `0.H POI` | Introduction/account/identity pre-flow | Identity proofing remains out of scope. |
| Application type | `1.0 - Application`, `1.A - New`, `1.B - Renew`, `1.C - Replace`, `1.CA - Replace Reason` | Form input plus conditional branch | Use mock-only branching if prototyped. |
| Personal details | `2.A - Personal details`, `2.B - Personal details - Manual address` | Form input page plus address/date patterns | Safe as generic mock form fields only. |
| Eligibility | `3.0 - Eligibility` and driver/photo/medical branch frames | Conditional-question page | High-risk eligibility logic requires owner confirmation. |
| Medical documents | `4.A`, `4.Aa`, `4.B`, `4.Ba` medical certificate/report frames | Future upload/evidence pattern | File upload and medical evidence excluded from v0.3 code. |
| Concession cards | `5.0`, `5.a` to error/mismatch/duplicate variants | Backend/business-error pattern candidate | Concession validation and backend errors require source-confirmed rules. |
| Review/confirmation | `6.A - Review`, `6.B - Review without non permit declaraction`, `6.A Confirmation screen`, `6.B Confirmation screen with tile` | Review and Confirmation templates | Reference, email, assessment and related-transaction content require owner confirmation. |

## MCP extraction priority list

Use the next MCP pass on personal Figma copies in this order:

1. Deep-map MPS Review and Confirmation frames against TaPaaS Review/Confirmation templates.
2. Deep-map MPS Personal details and Manual address frames against Form input, address and date guidance.
3. Deep-map MPS Eligibility branch frames as conditional-question evidence, without implementing real eligibility rules.
4. Deep-map MPS medical/concession frames only as future upload/backend-error evidence.
5. Extract Legal info accordion and Declaration review variants in full before adding either as coded preview components.

## Evidence boundary

- Extracted text is useful design evidence, but it is not a production contract.
- Generated implementation should sit below supplied evidence.
- Unknown behaviour must be labelled `Unknown` or `Needs TaPaaS confirmation`.
- Do not infer backend responses, payment rules, identity rules or legal wording.
- Do not treat personal-copy Figma MCP evidence as official design sign-off.
- Do not implement Mobility Parking Scheme policy or eligibility logic from visual frames alone.
