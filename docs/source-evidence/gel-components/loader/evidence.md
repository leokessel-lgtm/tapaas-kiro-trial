# Component evidence card: Loader

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Loader |
| Package path | `packages/loader` |
| Package name | `@snsw-gel/loader` |
| Component family | Feedback / status |
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

- Package exists at `@snsw-gel/loader` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as low risk as a loading state indicator (Verified from risk rationale)

## Assumptions

- Loader likely renders a visual spinner or progress indicator (Assumption — needs source confirmation)
- Loader likely provides an accessible label for screen readers (Assumption — needs source confirmation)
- Loader likely uses role="status" or aria-live for announcements (Assumption — needs source confirmation)
- Loader likely supports a text label alongside the visual indicator (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ARIA role and live region implementation | Source-backed review |
| Whether loading state is announced to screen readers | Source-backed review + rendered Storybook |
| Motion/animation (prefers-reduced-motion support) | Source-backed review + rendered Storybook |
| Inline vs overlay/fullscreen variants | Source-backed review |

## Risk notes

- Low risk: presentational loading indicator.
- ARIA live region announcements are a potential accessibility concern but low complexity.
- Cannot infer any runtime, DOM or ARIA behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Yes |
| Is source-backed evidence needed? | Spot-check |
| Is rendered Storybook needed? | Maybe |
| Is owner confirmation needed? | No |
| Should this get a full A/B test? | No |
