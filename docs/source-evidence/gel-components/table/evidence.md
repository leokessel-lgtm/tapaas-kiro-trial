# Component evidence card: Table

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Table |
| Package path | `packages/table` |
| Package name | `@snsw-gel/table` |
| Component family | Data display / layout |
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

- Package exists at `@snsw-gel/table` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as medium risk due to responsive behaviour, sorting, ARIA table and caption (Verified from risk rationale)

## Assumptions

- Table likely renders semantic HTML table elements (table, thead, tbody, th, td) (Assumption — needs source confirmation)
- Table likely supports a caption or aria-label for table identification (Assumption — needs source confirmation)
- Table likely supports sortable columns with ARIA sort indicators (Assumption — needs source confirmation)
- Table likely supports responsive behaviour (stacking, scrolling or card layout on mobile) (Assumption — needs source confirmation)
- Table likely supports row headers (scope="row") (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| Whether table uses semantic HTML or ARIA grid role | Source-backed review |
| Sorting implementation and ARIA sort state | Source-backed review + rendered Storybook |
| Responsive strategy (scroll, stack, card) | Source-backed review + rendered Storybook |
| Caption/aria-label support | Source-backed review |
| Column and row header scope | Source-backed review |
| Whether table supports interactive cells (links, buttons) | Source-backed review |
| Keyboard navigation for sortable headers | Source-backed review + rendered Storybook |
| Pagination integration | Source-backed review |
| Striped/bordered variant styling | Rendered Storybook |

## Risk notes

- Medium risk: responsive behaviour, sorting interaction, ARIA table semantics.
- Responsive tables are a common accessibility challenge — stacking or card layouts can break table semantics.
- Sortable columns require ARIA sort state management.
- Cannot infer any runtime, DOM, ARIA or responsive behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Maybe |
| Should this get a full A/B test? | Yes |
