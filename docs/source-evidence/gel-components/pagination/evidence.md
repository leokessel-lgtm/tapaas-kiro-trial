# Component evidence card: Pagination

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Pagination |
| Package path | `packages/pagination` |
| Package name | `@snsw-gel/pagination` |
| Component family | Navigation |
| Risk class | Medium |
| Recommended testing depth | Full A/B test |

## Evidence found

| Evidence type | Found? | Path / note |
|---|---:|---|
| Curated MD | Unknown | Not yet generated |
| MDX docs | ✅ | Storybook MDX |
| Stories | ✅ | Storybook stories |
| Source | ✅ | Component source |
| Tests | ✅ | Test files |
| Styled source | Unknown | Not confirmed |
| Package metadata | ✅ | package.json |
| Rendered Storybook | Unknown | Not inspected |
| Owner confirmation | Unknown | Not sought |

## Verified

- Package exists at `@snsw-gel/pagination` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as medium risk due to navigation, current page state and keyboard behaviour (Verified from risk rationale)

## Assumptions

- Pagination likely renders a nav landmark with aria-label (Assumption — needs source confirmation)
- Pagination likely uses links or buttons for page items (Assumption — needs source confirmation)
- Pagination likely marks the current page with aria-current="page" (Assumption — needs source confirmation)
- Pagination likely supports previous/next navigation (Assumption — needs source confirmation)
- Pagination likely supports truncation for large page counts (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| Whether items are links (anchor) or buttons | Source-backed review |
| ARIA navigation landmark and labelling | Source-backed review |
| Current page indication (aria-current vs aria-selected vs visual only) | Source-backed review |
| Keyboard navigation model | Source-backed review + rendered Storybook |
| Truncation/ellipsis behaviour for many pages | Source-backed review + rendered Storybook |
| Router integration (href vs onClick) | Source-backed review |
| Whether page change triggers focus management | Source-backed review + rendered Storybook |
| Responsive behaviour (compact vs full) | Rendered Storybook |

## Risk notes

- Medium risk: navigation semantics, current page state, keyboard behaviour, potential routing.
- Link vs button semantics affect whether pagination works with browser navigation.
- Cannot infer any runtime, DOM, ARIA or keyboard behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Maybe |
| Should this get a full A/B test? | Yes |
