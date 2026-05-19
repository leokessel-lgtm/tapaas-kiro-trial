# Component evidence card: Callout

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Callout |
| Package path | `packages/callout` |
| Package name | `@snsw-gel/callout` |
| Component family | Content / messaging |
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

- Package exists at `@snsw-gel/callout` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as low risk as static content, presentational (Verified from risk rationale)

## Assumptions

- Callout likely renders a styled container with heading and body content (Assumption — needs source confirmation)
- Callout likely uses a semantic element (aside, section or div with role) (Assumption — needs source confirmation)
- Callout likely supports variant styling (info, warning) (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| Semantic element used (aside, section, div) | Source-backed review |
| Whether ARIA role is applied | Source-backed review |
| Heading level configuration | Source-backed review |
| Variant support | Source-backed review |

## Risk notes

- Low risk: mostly presentational, static content.
- Cannot infer any runtime or DOM behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Yes |
| Is source-backed evidence needed? | Spot-check |
| Is rendered Storybook needed? | Maybe |
| Is owner confirmation needed? | No |
| Should this get a full A/B test? | No |
