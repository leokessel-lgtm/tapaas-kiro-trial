# TaPaaS source inventory

## Purpose

This inventory records the TaPaaS Figma artefacts used to extend the GEL Kiro trial pack.

The material is **trial guidance only**. It does not claim production readiness, GEL compliance, accessibility compliance, legal approval, privacy approval or TaPaaS engineering sign-off.

## Source files inspected

| Source | Exported at | Local parse result | Evidence quality | Notes |
|---|---:|---:|---|---|
| `Components - TaPaaS Design Library (Copy).fig` | 2026-05-19 01:20 UTC | 63,024 nodes, 55 canvas pages, 7,152 symbols, 23,648 instances, 9,999 text nodes, 82 images | Draft extraction | Good for component inventory and documentation extraction. Live Figma MCP confirmation preferred before implementation readiness. |
| `Templates - TaPaaS Design Library.fig` | 2026-05-19 02:14 UTC | 54,399 nodes, 28 canvas pages, 7,244 symbols, 25,004 instances, 6,355 text nodes, 141 images | Draft extraction | Good for page-template inventory and transaction skeleton rules. Live Figma MCP confirmation preferred before implementation readiness. |
| `Components - TaPaaS Design Library (Copy)` personal Figma copy | 2026-05-20 | Figma MCP access confirmed. 54 pages returned. Core component pages, documentation sections and selected annotation text extracted. | MCP partial deep extraction | Personal Figma account source. Useful for trial evidence only. Component pages consistently expose Component, Sub-components, Designer documentation, Developer documentation and Accessibility annotations where applicable. |
| `Templates - TaPaaS Design Library` personal Figma copy | 2026-05-20 | Figma MCP access confirmed. 27 pages returned. Core template pages, documentation sections and selected annotation text extracted. | MCP partial deep extraction | Personal Figma account source. Useful for trial evidence only. Template pages consistently expose Component, Sub-components, Designer documentation, Developer documentation and Accessibility annotations where applicable. |
| `Mobility_Parking_Scheme.sketch 1 (Master @ 509b60a) (Copy)` personal Figma copy | 2026-05-20 | Figma MCP access confirmed. 7 pages returned. `MPS Final` returned 63 top-level frames/text nodes, including application, identity proofing, personal details, eligibility, medical documents, concession cards, review and confirmation frames. | MCP frame inventory confirmed | Candidate transaction only. Do not treat as final trial scope or source truth until risk, policy and backend boundaries are confirmed. |

## Figma MCP access notes

Figma MCP was reconnected to the user's personal Figma account on 2026-05-20 and confirmed as `leokessel@gmail.com`.

The three personal-copy Figma files were accessible through MCP. The first pass successfully extracted page and top-level section inventories. A later pass extracted selected component and template documentation text, accessibility-note excerpts and the `MPS Final` frame inventory.

Use this MCP result as **trial design evidence**, not implementation-ready evidence.

## Component-library pages found

| Page | Figma node | Trial use | Evidence quality |
|---|---|---|---|
| Privacy card | `1:198` | Privacy and consent pattern | MCP text extracted |
| End of Transaction CTA buttons | `9:791` | Confirmation-page action group | MCP text extracted |
| Confirmation page header | `9:10494` | Success-state page header | MCP text extracted |
| Transaction summary card | `10:1861` | Confirmation summary | MCP text extracted |
| Next steps card | `10:1862` page; `11:4848` component set | Confirmation next steps | MCP targeted extraction; coded preview |
| Review info card | `18:4448` | Review page data playback | MCP text extracted |
| Review fees card | `18:4449` | Review page fee playback | MCP text extracted |
| Search vehicle input | `22:16683` | Vehicle search input pattern | MCP text extracted |
| Legal info accordion | `22:35625` | Review legal/privacy information | MCP text extracted |
| Declaration review | `27:38386` | Review page declaration playback | MCP text extracted |
| Conditional declaration | `27:56000` | Mandatory declaration checkbox pattern | MCP text extracted |
| TaPaaS radio buttons | `31:63987` | Form selection input | MCP text extracted |
| TaPaaS radio button cards | `31:63988` | Card-based selection input | MCP text extracted |
| Details card single | `2413:787` | User/context information card | MCP text extracted |
| SUPR-Q | `2749:6623` | Confirmation feedback prompt | Draft extraction |
| Details card single interactive | `2958:2499` | Interactive context/details card | MCP text extracted |
| Show more / less | `22:25082` | Progressive reveal pattern | MCP text extracted |
| VEOS selection card | `31:63989` | Selection-card pattern for Vehicle Emissions Offset Scheme | MCP text extracted |
| Backend errors repository | `31:73426` | Error examples and backend-error patterns | MCP inventory confirmed, deep extraction pending |

## Template-library pages found

| Page template | Figma node | Trial use | Evidence quality |
|---|---|---|---|
| Privacy step | `3395:41359` | First authenticated transaction page | MCP text extracted |
| Search input page | `16274:18397` | Search-first input step | MCP text extracted |
| Form input page | `8410:37703` | Generic data capture page | MCP text extracted |
| Declaration step | `9894:3936` | Legal/customer declaration step | MCP text extracted |
| Review step | `8143:15161` | Review and submit page | MCP text extracted |
| Confirmation step | `5354:8224` | Completed transaction page | MCP text extracted |
| PDF receipt | `9926:3752` | Receipt output guidance | Design-only for this pack |
| Exit modal | `4677:1042` | Prevent accidental exit | Design-only for this pack |
| Email confirmation modal | `9290:50392` | Confirmation email update | Design-only for this pack |
| Time out modal | `13768:39` | Session timeout handling | Design-only for this pack |
| Business error page | `8931:31271` | Business-rule hard stop | Design-only for this pack |
| System error page | `17628:2069` | Technical hard stop | Design-only for this pack |

## Mobility Parking Scheme pages found

| Page | Figma node | Trial use | Evidence quality |
|---|---|---|---|
| Cover | `1:25331` | File cover only | MCP inventory confirmed |
| MOS - Aligned with PSM | `0:1` | Possible mapped flow or analysis page | MCP access confirmed, deep extraction pending |
| MPS Final | `0:16535` | Candidate Mobility Parking Scheme transaction flow | MCP frame inventory confirmed |
| Water Carting - Mobile | `0:33253` | Out-of-scope mobile reference unless confirmed relevant | MCP inventory confirmed |
| Symbols | `0:33464` | Legacy/local component symbols used by the transaction file | MCP inventory confirmed |
| Emails | `0:39493` | Possible notification/email artefacts | MCP inventory confirmed |
| Archive | `0:39557` | Historical material | MCP inventory confirmed |

## Maturity labels

| Label | Meaning |
|---|---|
| `proven` | Implemented in this pack and passed local build checks. Still not production approved. |
| `draft` | Extracted from TaPaaS Figma documentation and useful for build guidance, but not fully implemented. |
| `needs engineer review` | Coded or specified enough to inspect, but requires engineering and accessibility review before reuse. |
| `design-only` | Context only. Do not build from it without deeper Figma inspection and owner confirmation. |

## Mobility Parking Scheme frame inventory

`MPS Final` contains 63 top-level frames/text nodes. The visible structure suggests a richer, riskier candidate transaction than the trial skeletons already in v0.3.

| Area | Example frames | Trial relevance | Boundary |
|---|---|---|---|
| Entry and account/identity | `0.A Landing page`, `0.B MyAccount`, `0.C POI` to `0.H POI` | Useful to understand the existing journey around account and identity | Identity proofing is out of scope for v0.3 build unless explicitly approved. |
| Application type | `1.0 - Application`, `1.A - New`, `1.B - Renew`, `1.C - Replace`, `1.CA - Replace Reason` | Useful candidate for conditional application-type routing | Do not encode real product rules from frames alone. |
| Personal details | `2.A - Personal details`, `2.B - Personal details - Manual address` | Maps to Form input page and GEL address/date/input guidance | Safe as mock form pattern only. |
| Eligibility | `3.0 - Eligibility`, `3.A - Eligibility Drivers Y`, `3.B - Eligibility Drivers N`, branch variants | Useful for conditional-question stress testing | Eligibility decisions are high risk. Use placeholders and owner confirmation. |
| Medical documents | `4.A - Medical certificate`, `4.Aa - Medical certificate uploaded`, `4.B - Medical report`, `4.Ba - Medical report uploaded` | Useful for future upload/evidence pattern analysis | File upload and medical evidence are out of current coded scope. |
| Concession cards | `5.0 - Concession`, Centrelink/DVA/invalid/duplicate/mismatch variants | Useful for backend-error and business-error pattern analysis | Concession validation and backend checks are out of current coded scope. |
| Review and confirmation | `6.A - Review`, `6.B - Review without non permit declaraction`, `6.A Confirmation screen`, `6.B Confirmation screen with tile` | Strong candidate for mapping to Review and Confirmation templates | Reference numbers, email, assessment and related transaction content require owner confirmation. |

## Do not infer

- Do not infer component behaviour from thumbnails or visual similarity alone.
- Do not treat local `.fig` parsing as final design sign-off.
- Do not claim GEL alignment unless the Figma documentation or GEL source confirms it.
- Do not invent privacy, legal, payment, identity, eligibility or policy content.
- Do not treat TaPaaS generated synthesis as source truth.
- Do not treat personal Figma-copy MCP access as official government design-system sign-off.
- Do not treat Mobility Parking Scheme as the final trial transaction until its flow frames, annotations and TaPaaS owner context are inspected.
