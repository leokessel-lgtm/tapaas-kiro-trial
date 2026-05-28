# Track 2 Gap Report

## Summary

Experiment 2 keeps the spike controlled: selected Figma nodes can be compared, normalised and converted into review artefacts, but this still does not prove TaPaaS schema compatibility, backend integration or approval readiness.

## Unknown From Figma Evidence

- Whether selected nodes are pages, component states or validation variants.
- Whether CTA targets are explicit page transitions or only component-state interactions.
- Whether frame order matches intended transaction order.
- Whether visible shell elements belong in generated schema or inherited app chrome.

## Unknown From Missing TaPaaS Schema Sample

- Real page, section, block, field, validation and CTA property names.
- Which candidate block types match existing TaPaaS blocks.
- Whether repeated content should be represented once, inherited, or repeated per page.

## Unknown From Missing OpenAPI/Swagger Spec

- Request fields for acknowledgement, consent or transaction progression.
- Response fields for validation, next-page routing or error recovery.
- Backend-owned error taxonomy and status handling.

## Unknown From Missing Content, Legal Or Privacy Owner Confirmation

- Approved privacy collection notice wording.
- Approved terms and conditions wording.
- Whether acknowledgement text must be stored, audited or displayed in a specific way.
- Whether content can be reused outside this private R&D spike.

## Top 10 Unknowns

| # | Unknown | Category | Needed from |
|---|---|---|---|
| 1 | Actual block type for privacy notice | Missing TaPaaS schema sample | Glen |
| 2 | Actual block type for acknowledgement checkbox | Missing TaPaaS schema sample | Glen |
| 3 | Validation model for terms acknowledgement | Missing TaPaaS schema sample | Glen |
| 4 | Continue target after valid acknowledgement | Figma evidence | Maddy or Michael |
| 5 | Whether selected nodes are normal/error states | Figma evidence | Maddy or Michael |
| 6 | Backend request mapping | Missing OpenAPI/Swagger spec | Glen or engineering |
| 7 | Backend response and error mapping | Missing OpenAPI/Swagger spec | Glen or engineering |
| 8 | Approved privacy and terms wording | Content/legal/privacy owner confirmation | Michael or owner |
| 9 | Whether shell content belongs in schema | Missing TaPaaS schema sample | Glen |
| 10 | Accessibility behaviour for error focus and checkbox association | Engineering/accessibility review | TaPaaS engineering |

## Recommended Next Experiment

Run a two-node fetch for the normal Privacy state and its validation-error state, then compare the generated node comparison report against Glen's minimal schema sample. Success means the spike can identify stable Design IR fields without inventing schema compatibility or backend behaviour.

## Evidence Snapshot

- Source node count: 4
- Generated pages/states: 4
- Production ready: false
- Schema compatibility claim: none
