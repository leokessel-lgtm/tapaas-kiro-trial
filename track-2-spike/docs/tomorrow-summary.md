# Track 2 Tomorrow Summary

## Plain English Summary

Experiment 2 extends Track 2 from one selected Figma node to a controlled multi-node path:

Figma REST API -> local raw JSON -> per-node normalised evidence -> Design IR -> pseudo schema, gap report and node comparison

This remains a private R&D spike. It is not production schema, not backend-connected, not approved and not a TaPaaS compatibility claim.

## What Is Now Supported

- `FIGMA_NODE_IDS` can be used for comma-separated multi-node fetches.
- `FIGMA_NODE_ID` still works for the original single-node path.
- Normalisation preserves per-source-node evidence: IDs, names, type, order, text, instances, likely fields, CTAs and validation evidence.
- The review pack now includes `07-node-comparison.md`.

## What Still Is Not Proven

- Actual TaPaaS schema compatibility.
- Backend request/response mapping.
- Production readiness or approval.
- Accessibility, legal, privacy, security, GEL or TaPaaS approval.
- Designer-confirmed state/page relationships.

## Specific Asks

| Person | Ask |
|---|---|
| Glen | Provide a minimal schema sample and confirm how normal/error states, validation and CTAs are represented. |
| Maddy | Provide the exact normal and error Figma node IDs to use for the controlled multi-node fetch. |
| Michael | Confirm whether this comparison is useful enough to take into a schema-mapping conversation. |

## Current Evidence

- Source node count: 4
- Generated pages/states: 4
- Production ready: false
- Schema compatibility claim: none
