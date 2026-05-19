# TaPaaS source inventory

## Purpose

This inventory records the TaPaaS Figma artefacts used to extend the GEL Kiro trial pack.

The material is **trial guidance only**. It does not claim production readiness, GEL compliance, accessibility compliance, legal approval, privacy approval or TaPaaS engineering sign-off.

## Source files inspected

| Source | Exported at | Local parse result | Evidence quality | Notes |
|---|---:|---:|---|---|
| `Components - TaPaaS Design Library (Copy).fig` | 2026-05-19 01:20 UTC | 63,024 nodes, 55 canvas pages, 7,152 symbols, 23,648 instances, 9,999 text nodes, 82 images | Draft extraction | Good for component inventory and documentation extraction. Live Figma MCP confirmation preferred before implementation readiness. |
| `Templates - TaPaaS Design Library.fig` | 2026-05-19 02:14 UTC | 54,399 nodes, 28 canvas pages, 7,244 symbols, 25,004 instances, 6,355 text nodes, 141 images | Draft extraction | Good for page-template inventory and transaction skeleton rules. Live Figma MCP confirmation preferred before implementation readiness. |

## Component-library pages found

| Page | Figma node | Trial use | Evidence quality |
|---|---|---|---|
| Privacy card | `1:198` | Privacy and consent pattern | Draft extraction |
| End of Transaction CTA buttons | `9:791` | Confirmation-page action group | Draft extraction |
| Confirmation page header | `9:10494` | Success-state page header | Draft extraction |
| Transaction summary card | `10:1861` | Confirmation summary | Draft extraction |
| Next steps card | `10:1862` | Confirmation next steps | Draft extraction |
| Review info card | `18:4448` | Review page data playback | Draft extraction |
| Review fees card | `18:4449` | Review page fee playback | Draft extraction |
| Search vehicle input | `22:16683` | Vehicle search input pattern | Draft extraction |
| Legal info accordion | `22:35625` | Review legal/privacy information | Draft extraction |
| Declaration review | `27:38386` | Review page declaration playback | Draft extraction |
| Conditional declaration | `27:56000` | Mandatory declaration checkbox pattern | Draft extraction |
| TaPaaS radio buttons | `31:63987` | Form selection input | Draft extraction |
| TaPaaS radio button cards | `31:63988` | Card-based selection input | Draft extraction |
| Details card single | `2413:787` | User/context information card | Draft extraction |
| SUPR-Q | `2749:6623` | Confirmation feedback prompt | Draft extraction |

## Template-library pages found

| Page template | Figma node | Trial use | Evidence quality |
|---|---|---|---|
| Privacy step | `3395:41359` | First authenticated transaction page | Draft extraction |
| Search input page | `16274:18397` | Search-first input step | Draft extraction |
| Form input page | `8410:37703` | Generic data capture page | Draft extraction |
| Declaration step | `9894:3936` | Legal/customer declaration step | Draft extraction |
| Review step | `8143:15161` | Review and submit page | Draft extraction |
| Confirmation step | `5354:8224` | Completed transaction page | Draft extraction |
| PDF receipt | `9926:3752` | Receipt output guidance | Design-only for this pack |
| Exit modal | `4677:1042` | Prevent accidental exit | Design-only for this pack |
| Email confirmation modal | `9290:50392` | Confirmation email update | Design-only for this pack |
| Time out modal | `13768:39` | Session timeout handling | Design-only for this pack |
| Business error page | `8931:31271` | Business-rule hard stop | Design-only for this pack |
| System error page | `17628:2069` | Technical hard stop | Design-only for this pack |

## Maturity labels

| Label | Meaning |
|---|---|
| `proven` | Implemented in this pack and passed local build checks. Still not production approved. |
| `draft` | Extracted from TaPaaS Figma documentation and useful for build guidance, but not fully implemented. |
| `needs engineer review` | Coded or specified enough to inspect, but requires engineering and accessibility review before reuse. |
| `design-only` | Context only. Do not build from it without deeper Figma inspection and owner confirmation. |

## Do not infer

- Do not infer component behaviour from thumbnails or visual similarity alone.
- Do not treat local `.fig` parsing as final design sign-off.
- Do not claim GEL alignment unless the Figma documentation or GEL source confirms it.
- Do not invent privacy, legal, payment, identity, eligibility or policy content.
- Do not treat TaPaaS generated synthesis as source truth.

