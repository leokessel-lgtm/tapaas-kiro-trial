# Track 2 Gap Report

## Summary

The selected Figma evidence is useful for identifying a Privacy step, a mandatory terms acknowledgement, a Continue action and a validation-error state. It is not enough to claim a TaPaaS-compatible schema, production readiness, backend integration or approved privacy/legal content.

## What Cannot Be Known From Figma Alone

- Whether each visual pattern maps to an existing TaPaaS schema block, a new block, or a composition of existing blocks.
- The exact TaPaaS page, section, block, CTA and validation schema names.
- Backend request and response payloads.
- Whether the Terms and Conditions acknowledgement is stored, audited or sent to a backend.
- The real target page after Continue.
- Approved privacy collection notice, privacy statement and terms wording.
- Error handling beyond the visible front-end validation example.
- Accessibility behaviour in assistive technologies.

## Top 10 Unknowns

| # | Unknown | Why it matters | Needs |
|---|---|---|---|
| 1 | Actual TaPaaS block type for the privacy notice | Determines whether this can be generated from existing blocks | Glen's schema sample and TaPaaS block catalogue |
| 2 | Actual block type for the acknowledgement checkbox | Determines form field modelling and validation | Glen's schema sample and TaPaaS block catalogue |
| 3 | Validation schema for mandatory acknowledgement | Figma shows message text but not runtime validation structure | Glen's schema sample |
| 4 | Continue target after successful acknowledgement | Flow cannot be proven from the selected node | Designer frame naming confirmation and prototype links |
| 5 | Backend request field for acknowledgement | Required before any API-connected implementation | OpenAPI/Swagger spec |
| 6 | Backend response after Continue | Required for navigation, errors and state transitions | OpenAPI/Swagger spec |
| 7 | Approved privacy and terms wording | Figma text may be draft or copied content | Content owner confirmation |
| 8 | Whether header/footer/global nav are part of TaPaaS schema | Affects what should be generated versus inherited from shell | TaPaaS block catalogue |
| 9 | Whether validation-error frame naming is canonical | Affects repeatable extraction from future pages | Designer frame naming confirmation |
| 10 | Accessibility expectations for error focus and checkbox association | Figma visual evidence does not prove assistive-technology behaviour | TaPaaS engineering and accessibility review |

## Inputs Needed

| Input | Needed from | Use |
|---|---|---|
| Schema sample | Glen | Compare Design IR to real page/section/block structure |
| TaPaaS block catalogue | Glen or TaPaaS engineering | Replace candidate block types with real block types |
| OpenAPI/Swagger spec | Glen or engineering | Add request/response mapping placeholders with real field names |
| Frame naming confirmation | Michael or Maddy | Confirm page order, state naming and normal/error frame relationships |
| Content owner confirmation | Michael, Maddy or nominated owner | Confirm privacy, terms and notification wording |

## Recommended Next Experiment

Use Glen's smallest real schema sample for one simple page and map this Privacy Design IR into it without building UI. The success test should be narrow: can we convert Figma evidence into a valid draft schema shape with all unsupported fields marked Unknown, without inventing backend or policy behaviour?

## Evidence Snapshot

- Selected node: Privacy (SECTION)
- First inferred page: 0.1D_NOD
- Generated pages: 2
- Production ready: false
- Schema compatibility claim: none
