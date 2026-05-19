# TaPaaS component-template relationship map

## Purpose

This map helps Kiro choose the right component when building from TaPaaS page templates.

It combines:

- local `.fig` extraction from the TaPaaS Components and Templates libraries
- Figma MCP inventory from the user's personal-copy Figma files on 2026-05-20
- current v0.3 coded preview components

This is **trial guidance only**. It does not claim production readiness, GEL compliance, accessibility compliance, privacy approval, legal approval, policy approval or TaPaaS engineering sign-off.

## Evidence status

| Evidence type | Status |
|---|---|
| Local `.fig` parse | Broad page/node/text extraction completed on 2026-05-19 |
| Figma MCP access | Confirmed on 2026-05-20 with personal Figma account `leokessel@gmail.com` |
| Figma MCP deep extraction | Partial. Selected component/template documentation, accessibility-note excerpts and frame inventories were extracted on 2026-05-20 |
| Mobility Parking Scheme transaction mapping | Frame inventory completed for `MPS Final`; component/template mapping remains pending |

## Component-template map

| Component or pattern | Source node | Appears in templates | Classification | Current code status | Kiro rule |
|---|---|---|---|---|---|
| Privacy card | `1:198` | Privacy step `3395:41359` | TaPaaS-specific composite | Page guidance only | Use for privacy-page structure. Privacy wording must be owner-confirmed. |
| Search vehicle input | `22:16683` | Search input page `16274:18397` | TaPaaS-specific composite | Composed from `Field`, `Input`, `Button` | Use mock search only. Do not add backend lookup. |
| Form input pattern | Template `8410:37703` | Form input page | GEL-aligned composition | Built across skeletons | Use multiple focused form pages for 6+ step flows. |
| Conditional declaration | `27:56000` | Declaration step `9894:3936`, Review step `8143:15161` | GEL variant | Composed from checkbox/radio patterns | Legal wording must be source-confirmed. |
| Declaration review | `27:38386` | Review step `8143:15161` | TaPaaS-specific composite | Documented only | Do not code until review-step deep extraction confirms content model. |
| Review info card | `18:4448` | Review step `8143:15161` | TaPaaS-specific composite | `ReviewInfoCard` | Use for data playback. Keep rows factual and editable only where route exists. |
| Review fees card | `18:4449` | Review step `8143:15161` | TaPaaS-specific composite | `ReviewFeesCard` | Mock fees only. Do not add payment logic. |
| Legal info accordion | `22:35625` | Review step `8143:15161` | TaPaaS-specific composite using GEL accordion behaviour | Documented only | MCP confirms `BUILT` and `Custom / GEL`, but legal/privacy content needs owner and accessibility confirmation before use. |
| Confirmation page header | `9:10494` | Confirmation step `5354:8224` | GEL variant | `ConfirmationHeader` | Use with `role="status"` in preview. Needs AT review. |
| Transaction summary card | `10:1861` | Confirmation step `5354:8224` | TaPaaS-specific composite | `TransactionSummaryCard` | Use for mock reference/summary/receipt rows. |
| Next steps card | `10:1862` | Confirmation step `5354:8224` | TaPaaS-specific composite | Documented only; currently inline list/content | Keep next steps as placeholder content until owner-confirmed. |
| End of transaction CTA buttons | `9:791` | Confirmation step `5354:8224` | GEL/TaPaaS composition | `TransactionCtaGroup` | Use for Start again / exit actions. No real routing. |
| Transaction CTA buttons | `27:34294` | Privacy, input, declaration, review templates | GEL/TaPaaS composition | `TransactionCtaGroup` | Use consistent Continue/Back/Exit placement. |
| Details card single | `2413:787` | Later input/support/review context pages | TaPaaS-specific composite | `DetailsCard` | Use as read-only context only. Do not use for decisions. |
| Details card single interactive | `2958:2499` | Input/context pages, exact templates still pending | TaPaaS-specific composite | Not coded | MCP confirms `READY FOR BUILD`, but action semantics, focus handling and keyboard behaviour still need review. |
| More info panel | GEL source evidence; TaPaaS guidance page `50:2726` | Form/input pages where contextual help is optional | GEL variant in v0.3 | `MoreInfoDisclosure` alias `MoreInfoPanel` | Use inline disclosure only for non-critical help. Full GEL modal panel remains future work. |
| Accordion | GEL source evidence; Legal info accordion `22:35625` | Review/legal guidance and optional guidance sections | GEL-aligned preview for generic accordion; TaPaaS legal accordion remains design-only | `Accordion` | Use only for optional guidance. Do not place required or critical content inside. |
| Show more / less | `22:25082` | Optional content reveal, exact templates still pending | GEL variant | Not coded | MCP says it is a GEL button with custom content and does not need to be rebuilt. Use existing button/disclosure behaviour for optional content only. |
| Radio buttons | `31:63987` | Form input page `8410:37703`, declaration step `9894:3936` | GEL variant | `RadioButtonList` | Use existing GEL preview radio list first. |
| Radio button cards | `31:63988` | Selection/input pages | TaPaaS-specific composite | Not coded | MCP extracted responsive spacing and error-spacing notes. Needs keyboard/focus/error-state review before coding. |
| VEOS selection card | `31:63989` | Vehicle-specific flows only | TaPaaS-specific composite | Not coded | Design-only. Do not generalise without source confirmation. |
| Exit modal | `4677:1042` | Exit/cancel flows | GEL/TaPaaS modal pattern | Not coded; exit notice only | Design-only until modal focus behaviour and wording are confirmed. |
| Business error page | `8931:31271` | Error routing | TaPaaS page template | Not coded | Requires source-confirmed business rules. |
| System error page | `17628:2069` | Error routing | TaPaaS page template | Not coded | Requires app error-routing design. |

## Mobility Parking Scheme mapping status

The Mobility Parking Scheme file is accessible via MCP. `MPS Final` frame inventory was extracted in the 2026-05-20 pass, but detailed component/template mapping was not completed.

The frame inventory shows these groups:

| MPS group | Example frames | Likely TaPaaS mapping | Boundary |
|---|---|---|---|
| Entry/account/identity | `0.A Landing page`, `0.B MyAccount`, `0.C POI` to `0.H POI` | Introduction/account context, out-of-band proof of identity | Identity proofing is out of scope for the v0.3 coded pack. |
| Application type | `1.0 - Application`, `1.A - New`, `1.B - Renew`, `1.C - Replace`, `1.CA - Replace Reason` | Form input page plus conditional branch | Use mock application-type branching only. |
| Personal details | `2.A - Personal details`, `2.B - Personal details - Manual address` | Form input page, address input, date input | Safe as source for generic form pattern only. |
| Eligibility | `3.0 - Eligibility` and driver/photo/medical branch variants | Conditional question pages | Eligibility decisions require owner confirmation. |
| Medical documents | `4.A`/`4.B` medical certificate/report and uploaded variants | Future upload/evidence pages | File upload and medical evidence are out of current coded scope. |
| Concession cards | `5.0` and Centrelink/DVA invalid/duplicate/mismatch variants | Backend/business error patterns | Backend validation and concessions require source-confirmed rules. |
| Review/confirmation | `6.A - Review`, `6.B - Review without non permit declaraction`, `6.A Confirmation screen`, `6.B Confirmation screen with tile` | Review and Confirmation templates | Reference numbers, email and assessment wording require owner confirmation. |

Before building an MPS skeleton, extract:

1. page/frame order from `MPS Final` (`0:16535`)
2. which frames map to Privacy, Input/Search, Declaration, Review and Confirmation templates
3. which local Symbols are legacy components vs TaPaaS/GEL components
4. any annotations about eligibility, concessions, medical evidence, identity, documents or backend checks
5. content that must be marked owner-confirmation required

## Kiro component-selection rule

When a page template and component both exist:

1. Use the page template for flow structure.
2. Use source-backed GEL components for basic controls.
3. Use TaPaaS preview composites only when the pattern is documented and repeated.
4. If a component is `design-only`, skip it or ask for confirmation before coding.
5. If the flow references Mobility Parking Scheme policy, eligibility, concessions, medical evidence, identity or backend checks, use placeholders and mark as owner-confirmation required.
