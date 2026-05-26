# Experiment 3 File Page Inventory

## TLDR

This inventory lists likely page/frame candidates from the local file-level Figma inventory. It is for manual known-page selection only.

## Boundaries

- This is not a full transaction extraction.
- Candidate rows are discovery hints, not confirmed transaction pages.
- Do not send raw Figma JSON.
- Do not claim TaPaaS schema compatibility, backend integration or approval readiness.

## Candidate Summary

- Raw inventory available: yes
- Candidate count: 10
- Raw source path: `track-2-spike/outputs/raw/figma-file-inventory.json`

## confirmation page

| nodeId | nodeName | type | depth | confidence | warning | safe label |
|---|---|---|---:|---|---|---|
| `490:67254` | Confirmation | SECTION | 2 | high |  | confirmation page candidate: Confirmation |

## modal

| nodeId | nodeName | type | depth | confidence | warning | safe label |
|---|---|---|---:|---|---|---|
| `531:19556` | Time out modals | SECTION | 2 | low | May be a state/variant rather than a distinct transaction page. | modal candidate: Time out modals |

## privacy page

| nodeId | nodeName | type | depth | confidence | warning | safe label |
|---|---|---|---:|---|---|---|
| `490:23897` | Privacy | SECTION | 2 | high |  | privacy page candidate: Privacy |

## review page

| nodeId | nodeName | type | depth | confidence | warning | safe label |
|---|---|---|---:|---|---|---|
| `490:67250` | Review | SECTION | 2 | high |  | review page candidate: Review |

## validation/error state

| nodeId | nodeName | type | depth | confidence | warning | safe label |
|---|---|---|---:|---|---|---|
| `772:18265` | Back end validation errors | SECTION | 2 | low | May be a state/variant rather than a distinct transaction page. | validation/error state candidate: Back end validation errors |
| `773:19390` | Back end validation errors | SECTION | 2 | low | May be a state/variant rather than a distinct transaction page. | validation/error state candidate: Back end validation errors |
| `773:19836` | Back end validation errors | SECTION | 2 | low | May be a state/variant rather than a distinct transaction page. | validation/error state candidate: Back end validation errors |

## vehicle/details page

| nodeId | nodeName | type | depth | confidence | warning | safe label |
|---|---|---|---:|---|---|---|
| `490:60298` | Disposal details | SECTION | 2 | high |  | vehicle/details page candidate: Disposal details |
| `531:11036` | NOD Input: Sale and buyer details - default | FRAME | 2 | medium | May be a component/variant rather than a transaction page. | vehicle/details page candidate: NOD Input: Sale and buyer details - default |
| `490:23907` | Vehicle details | SECTION | 2 | high |  | vehicle/details page candidate: Vehicle details |

