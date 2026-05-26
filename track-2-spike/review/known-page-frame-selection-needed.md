# Known Page Frame Selection Caveat

## TLDR

`known-page-frame-selection.json` has now been created using the best available precise nodes for exploratory Glen review.

Privacy and Vehicle details are selected as precise FRAME nodes. Review is selected as an INSTANCE candidate because the current local export does not expose one clean full-page child FRAME for the Review page.

## Why The Previous SECTION Selection Was Too Broad

The previous selection used:

- `490:23897` / Privacy
- `490:23907` / Vehicle details
- `490:67250` / Review

Those are SECTION nodes. They include normal page candidates plus sibling validation/error sections, shell/global navigation and alternate states. That is why the Glen review output picked up validation/error evidence inside what was meant to be a clean page export.

## Current Selection

| Page order | Parent section | Recommended node | Type | Confidence | Status |
|---:|---|---|---|---|---|
| 1 | `490:23897` / Privacy | `490:60286` / `0.1D_NOD` | FRAME | High | Ready to use as Privacy normal-page candidate |
| 2 | `490:23907` / Vehicle details | `490:60291` / `1.1A_NOD` | FRAME | Medium | Ready to use as Vehicle details normal-page candidate, subject to default/list-state confirmation |
| 3 | `490:67250` / Review | `531:23422` / `NOD review - Individual` | INSTANCE | Medium | Selected as best available Review candidate for exploratory Glen review; needs Glen/Michael confirmation |

## Confirmation Still Needed

Ask Glen or Michael to confirm whether `531:23422` / `NOD review - Individual` is acceptable as the Review page candidate for this exploratory pass.

The main caveat is that Review is an INSTANCE, not a clean child FRAME. It is selected because it is the best available local evidence, not because it is confirmed page-frame evidence.

## Next Export Candidate

```text
490:60286,490:60291,531:23422
```

If the export must use FRAME nodes only, inspect or request the underlying Figma frame for the intended Review variant before treating the Review candidate as page-frame evidence.

## Glen-Safe Language

Use:

> Narrower page-state candidates identified under the previously selected SECTION nodes.

Do not use:

> Confirmed TaPaaS schema pages.
