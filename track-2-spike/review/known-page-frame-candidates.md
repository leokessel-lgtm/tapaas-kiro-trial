# Experiment 3 Known Page Frame Candidates

## TLDR

The previous SECTION selection was too broad. The selected SECTION nodes include normal page candidates plus validation/error siblings, shell/global navigation and, for Review, alternate review variants.

This inventory is based on local raw evidence only. It does not claim these are confirmed TaPaaS schema pages.

The current precise exploratory selection is:

1. `490:60286` / `0.1D_NOD` / FRAME for Privacy.
2. `490:60291` / `1.1A_NOD` / FRAME for Vehicle details.
3. `531:23422` / `NOD review - Individual` / INSTANCE for Review.

Privacy and Vehicle details are precise FRAME selections. Review is an INSTANCE candidate because no clean child FRAME was available in the local export. This is acceptable for exploratory Glen review only, not as confirmed page-frame evidence.

## Source Sections Inspected

| Parent section nodeId | Parent section name | Finding |
|---|---|---|
| `490:23897` | Privacy | Contains one normal page FRAME and a separate front-end validation errors SECTION. |
| `490:23907` | Vehicle details | Contains two normal page FRAME candidates and a separate front-end validation errors SECTION with multiple error/modal-like states. |
| `490:67250` | Review | Contains Motor dealer and Individual subsections. The full-page review candidates are INSTANCE nodes, not clean child FRAME nodes. |

## Recommended Direction

Do not use the parent SECTION IDs for Glen review. They pull in too much sibling evidence.

Use a narrower node selection once the review-page target is confirmed:

| Page | Best current candidate | Type | Confidence | Status |
|---|---|---|---|---|
| Privacy / terms acknowledgement normal page | `490:60286` / `0.1D_NOD` | FRAME | High | Recommended |
| Vehicle details normal page | `490:60291` / `1.1A_NOD` | FRAME | Medium | Recommended over `490:60289` as the cleaner default/list state |
| Review normal page | `531:23422` / `NOD review - Individual` | INSTANCE | Medium | Selected as the best available review-page candidate for exploratory Glen review; requires Glen/Michael confirmation because it is not a clean child FRAME |

## Privacy Section: `490:23897` / Privacy

### Likely Normal Page Frames

| child nodeId | child name | type | confidence | Evidence summary | Warning flags |
|---|---|---|---|---|---|
| `490:60286` | `0.1D_NOD` | FRAME | High | Contains `Submit a notice of disposal for a vehicle`, page title `Privacy`, `Privacy collection notice`, terms acknowledgement content, `Continue` and `Exit`. No `Your form has an error` or `Check the error` text detected in this frame. | Includes shell/footer content because the page frame contains full page chrome. |

### Validation/Error Frames

| child nodeId | child name | type | Evidence summary | Exclusion reason |
|---|---|---|---|---|
| `751:10320` | Front end validation errors | SECTION | Contains validation/error sibling states under Privacy. | Validation/error group, not the normal Privacy page. |
| `751:10322` | `2.4_NOD` | FRAME | Contains `Your form has an error`, `Check the error:` and `Accept the Terms and conditions to continue.` | Error state. Exclude from clean normal-page export. |

### Shell/Nav Frames

Shell/global navigation appears inside the full page frame as page chrome. It should be treated as inherited/shell content for review, not as evidence that the parent SECTION is a clean transaction page.

### Best Privacy Recommendation

| Field | Value |
|---|---|
| parentSectionNodeId | `490:23897` |
| parentSectionName | Privacy |
| childFrameNodeId | `490:60286` |
| childFrameName | `0.1D_NOD` |
| safeLabel | Privacy / terms acknowledgement normal page |
| pageOrder | 1 |
| confidence | High |
| whySelected | Direct child FRAME under Privacy with normal privacy/terms content and normal CTAs. |
| warningFlags | Full page chrome included; not a confirmed TaPaaS schema page. |
| evidenceSummary | Page title `Privacy`; content includes privacy notice, terms and conditions, acknowledgement checkbox, `Continue`, `Exit`; no visible error-summary text in this frame. |
| excludedSiblingExamples | `751:10320` / Front end validation errors; `751:10322` / `2.4_NOD` error state. |

## Vehicle Details Section: `490:23907` / Vehicle details

### Likely Normal Page Frames

| child nodeId | child name | type | confidence | Evidence summary | Warning flags |
|---|---|---|---|---|---|
| `490:60291` | `1.1A_NOD` | FRAME | Medium | Contains transaction label, `Vehicle selection`, `Select the vehicle you sold to continue`, eligible vehicle cards, search field, `Find vehicle`, `Back` and `Exit`. No error summary text detected. | Contains full page chrome; frame name does not use the human page title. |
| `490:60289` | `1.1B_NOD` | FRAME | Medium | Contains the same vehicle selection structure plus a filled search result / extra vehicle-result state. | May be a later or filled search-result state rather than the clean default page. |

### Validation/Error Frames

| child nodeId | child name | type | Evidence summary | Exclusion reason |
|---|---|---|---|---|
| `751:10331` | Front end validation errors | SECTION | Contains multiple error and modal-like Vehicle details states. | Validation/error group, not a clean normal page. |
| `0:9900` | `2.4_NOD` | FRAME | Contains `Your form has an error`, `Check the error:` and `Enter a NSW plate number.` | Error state. |
| `751:10333` | `2.4_NOD` | FRAME | Contains `Your form has an error`, `Check the error:` and length validation copy. | Error state. |
| `751:15260` | `2.4_NOD` | FRAME | Contains `Your form has an error`, `Check the error:` and character validation copy. | Error state. |

### Modal Frames

| child nodeId | child name | type | Evidence summary | Exclusion reason |
|---|---|---|---|---|
| `751:15529` | `2.4_NOD` | FRAME | Contains `Cannot continue online` content. | Modal/exception-like state, not normal Vehicle details page. |

### Component/Variant Frames

Several nested frames include names such as `CORE NOD Input: filled in search results`, `CORE NOD Input: vehicles list`, or `NOD Input: Search vehicle error - special characters`. These are useful evidence but should not be selected as the primary page frame for Glen.

### Best Vehicle Recommendation

| Field | Value |
|---|---|
| parentSectionNodeId | `490:23907` |
| parentSectionName | Vehicle details |
| childFrameNodeId | `490:60291` |
| childFrameName | `1.1A_NOD` |
| safeLabel | Vehicle details normal page |
| pageOrder | 2 |
| confidence | Medium |
| whySelected | Direct child FRAME under Vehicle details with normal vehicle selection content, search field and normal CTAs. It appears cleaner than the filled search-result variant. |
| warningFlags | Full page chrome included; exact default-vs-list state needs design confirmation; not a confirmed TaPaaS schema page. |
| evidenceSummary | Contains `Vehicle selection`, `Select the vehicle you sold to continue`, vehicle cards, NSW plate/billing search field, `Find vehicle`, `Back` and `Exit`; no visible `Your form has an error` or `Check the error` text in this frame. |
| excludedSiblingExamples | `490:60289` / `1.1B_NOD` filled search-result state; `751:10331` / Front end validation errors; `0:9900`, `751:10333`, `751:15260` validation states; `751:15529` exception/modal-like state. |

## Review Section: `490:67250` / Review

### Likely Normal Page Candidates

| child nodeId | child name | type | confidence | Evidence summary | Warning flags |
|---|---|---|---|---|---|
| `531:19574` | Motor dealer | SECTION | Medium | Contains the motor dealer review variant and a full-page review INSTANCE. | SECTION, not a clean page FRAME. |
| `531:23421` | NOD review - motor dealer | INSTANCE | Medium | Contains `Review`, `Make sure all your details are correct`, vehicle details, sale/buyer details, privacy content, `Back`, `Submit`, `Exit`. | INSTANCE, not FRAME. Motor dealer variant may not match the intended default review path. |
| `531:19583` | Individual | SECTION | Medium | Contains the individual review variant and a full-page review INSTANCE. | SECTION, not a clean page FRAME. |
| `531:23422` | NOD review - Individual | INSTANCE | Medium | Contains `Review`, `Make sure all your details are correct`, vehicle details, sale/buyer details, privacy content, `Back`, `Submit`, `Exit`. | INSTANCE, not FRAME. Needs confirmation that Individual is the intended default review path. |

### Shell/Nav Frames

The Review candidates contain nested masthead, main header and footer frames. These are shell/global navigation evidence and should not be selected as transaction page frames.

### Component/Variant Frames

Nested content frames under the Review page instances are useful for structure, but they are not full-page frames. Selecting them would lose page-level context such as page title and CTAs.

### Best Review Recommendation

No clean child FRAME recommendation is available from the current local evidence because the exported Review SECTION does not expose a clean full-page child FRAME. The best current full-page candidates are INSTANCE nodes:

- `531:23422` / `NOD review - Individual`
- `531:23421` / `NOD review - motor dealer`

For the current exploratory Glen review, `531:23422` / `NOD review - Individual` is selected as the best available Review candidate because it uses individual buyer details rather than motor dealer licence details. It remains an INSTANCE candidate and requires Glen/Michael confirmation.

## Excluded Pattern Summary

| Category | Excluded examples | Reason |
|---|---|---|
| Validation/error frames | `751:10322`, `0:9900`, `751:10333`, `751:15260` | Contain `Your form has an error`, `Check the error` or validation-only copy. |
| Modal/exception frames | `751:15529` | Contains `Cannot continue online`; not a normal page frame. |
| Shell/nav frames | Main header, footer body, footer bottom, masthead frames | Shell/global page chrome, not transaction page content. |
| Component/variant frames | `CORE NOD Input...`, `NOD Input...` nested frames | Component/variant-like evidence, not primary page frame selection. |
| Uncertain frames | Review `Motor dealer` and `Individual` SECTION wrappers | Need variant intent confirmation before selecting one as the normal review page. |

## Do Not Overclaim

- Do not say the recommended child nodes are confirmed TaPaaS schema pages.
- Do not say the Review INSTANCE is confirmed page-frame evidence.
- Do not say the page order proves runtime routing.
- Do not say full page chrome belongs in TaPaaS schema.
- Do not claim backend integration, production readiness, accessibility approval, privacy/legal approval, GEL approval or TaPaaS approval.
