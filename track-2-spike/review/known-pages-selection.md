# Known Pages Selection

## Purpose

Use this file to choose 3 coherent NOD page frames for Glen review after generating the file page inventory.

## Selection Rules

- Select exactly 3 known page frame node IDs.
- Prefer high-confidence transaction-level frames.
- Preserve the exact Figma node IDs and frame names.
- Avoid validation/error states unless you deliberately want one of the 3 pages to be an error-state page frame.
- Avoid modals, shell/global navigation, component sets, component instances and variants.
- Do not treat candidate rows as confirmed TaPaaS schema pages.

## Suggested Process

1. Review `track-2-spike/outputs/09-file-page-inventory.md`.
2. Pick 3 high-confidence page/frame candidates that form a coherent sequence.
3. Copy `track-2-spike/review/known-pages-selection.template.json` to `track-2-spike/review/known-pages-selection.json`.
4. Replace each `nodeId`, `figmaName`, `safeLabel` and `whySelected`.
5. Run the 3-page node export using the selected node IDs.
6. Build the Glen review pack from the curated selection.

## Current Inventory Status

- Raw inventory available: yes
- Candidate count: 10
- Confirmed transaction pages: Unknown

## Notes For Glen-Safe Framing

Frame the next review as:

> 3 deliberately selected Figma page frames for engineering review.

Do not frame it as:

> 3 confirmed TaPaaS schema pages.
