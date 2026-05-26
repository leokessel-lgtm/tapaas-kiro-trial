# Track 2 Tomorrow Summary

## Plain English Summary

Track 2 now proves that we can take one selected Figma node through a local evidence pipeline:

Figma REST API -> local raw JSON -> normalised evidence -> Design IR -> pseudo schema/gap report

The output is useful as a review pack for discussing how Figma evidence might become TaPaaS schema input. It is still a private R&D spike, not a production schema, not backend-connected and not approved.

## What Was Proven

- The Figma REST API can fetch the selected Privacy node into local raw JSON.
- The pipeline can reuse the local raw payload without another live fetch.
- The normalised evidence can be converted into a Design IR with pages, sections, blocks, fields, CTAs, text and navigation hints.
- The spike can produce a pseudo schema and gap report for engineering review.
- The artefacts preserve node IDs, names and mapping status rather than pretending everything is certain.

## What Was Not Proven

- No actual TaPaaS schema compatibility has been proven.
- No backend request or response mapping has been proven.
- No production readiness, accessibility compliance, GEL approval or TaPaaS approval has been proven.
- The Continue target is inferred, not confirmed by explicit prototype navigation.
- Privacy and terms wording still need owner confirmation.

## Specific Asks

| Person | Ask |
|---|---|
| Glen | Share a minimal real TaPaaS schema sample and block catalogue entries for privacy notice, checkbox, validation and CTAs. |
| Maddy | Confirm whether the selected Privacy frames and normal/error naming are the right source pattern for this spike. |
| Michael | Confirm whether this is the right pattern to test next and who should approve the privacy/terms content before reuse. |

## Current Evidence

- Selected node: Privacy
- Node type: SECTION
- Generated Design IR pages: 2
- Production ready: false
- Schema compatibility claim: none
