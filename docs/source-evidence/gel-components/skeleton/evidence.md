# Component evidence card: Skeleton

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Skeleton |
| Package path | `packages/skeleton` |
| Package name | `@snsw-gel/skeleton` |
| Component family | Feedback / loading |
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

- Package exists at `@snsw-gel/skeleton` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as low risk as a loading placeholder, presentational (Verified from risk rationale)

## Assumptions

- Skeleton likely renders placeholder shapes matching content layout (Assumption — needs source confirmation)
- Skeleton likely uses aria-hidden or role="presentation" to hide from assistive technology (Assumption — needs source confirmation)
- Skeleton likely supports animation (pulse or wave) (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ARIA handling (hidden from AT or announced) | Source-backed review |
| Motion/animation (prefers-reduced-motion support) | Source-backed review |
| Variant shapes (text, circle, rectangle) | Source-backed review |

## Risk notes

- Low risk: presentational loading placeholder.
- Cannot infer any runtime or DOM behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Yes |
| Is source-backed evidence needed? | No (spot-check only) |
| Is rendered Storybook needed? | Maybe |
| Is owner confirmation needed? | No |
| Should this get a full A/B test? | No |
