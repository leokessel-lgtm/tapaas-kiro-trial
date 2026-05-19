# Component evidence card: Card

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Card |
| Package path | `packages/card` |
| Package name | `@snsw-gel/card` |
| Component family | Content / navigation |
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

- Package exists at `@snsw-gel/card` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as medium risk due to link semantics, click target and content hierarchy (Verified from risk rationale)

## Assumptions

- Card likely renders as a clickable container with a heading link (Assumption — needs source confirmation)
- Card likely stretches the link click target to the full card area (Assumption — needs source confirmation)
- Card likely supports image, heading, description and metadata slots (Assumption — needs source confirmation)
- Card likely uses appropriate heading level for content hierarchy (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| Link click target implementation (full card vs heading only) | Source-backed review |
| Whether interactive children (buttons, links) are supported inside card | Source-backed review |
| Heading level configuration | Source-backed review |
| Image alt text handling | Source-backed review |
| Keyboard focus behaviour (single tab stop vs multiple) | Source-backed review + rendered Storybook |
| Responsive layout behaviour | Rendered Storybook |

## Risk notes

- Medium risk: link semantics, click target area, content hierarchy.
- Full-card click targets with nested interactive elements are a common accessibility challenge.
- Cannot infer any runtime, DOM or ARIA behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Yes for guidance |
| Is source-backed evidence needed? | Maybe |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Maybe |
| Should this get a full A/B test? | Yes |
