# Component evidence card: Breadcrumb

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Breadcrumb |
| Package path | `packages/breadcrumb` |
| Package name | `@snsw-gel/breadcrumb` |
| Component family | Navigation |
| Risk class | Low |
| Recommended testing depth | Targeted source check |

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

- Package exists at `@snsw-gel/breadcrumb` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as low risk due to navigation landmark and link semantics (Verified from risk rationale)

## Assumptions

- Breadcrumb likely renders a nav landmark with aria-label="Breadcrumb" (Assumption — needs source confirmation)
- Breadcrumb likely uses an ordered list for the trail (Assumption — needs source confirmation)
- Breadcrumb likely marks the current page with aria-current="page" (Assumption — needs source confirmation)
- Breadcrumb likely uses separator characters between items (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ARIA navigation landmark and labelling | Source-backed review |
| Current page indication (aria-current) | Source-backed review |
| Separator implementation (CSS vs DOM) | Source-backed review |
| Truncation for long trails | Source-backed review + rendered Storybook |
| Whether items are links or spans for current page | Source-backed review |

## Risk notes

- Low risk: well-understood ARIA pattern, minimal interaction.
- Cannot infer any runtime or DOM behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Yes |
| Is source-backed evidence needed? | Spot-check |
| Is rendered Storybook needed? | Maybe |
| Is owner confirmation needed? | No |
| Should this get a full A/B test? | No |
