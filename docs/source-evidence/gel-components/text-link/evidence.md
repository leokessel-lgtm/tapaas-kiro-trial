# Component evidence card: Text link

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Text link |
| Package path | `packages/text-link` |
| Package name | `@snsw-gel/text-link` |
| Component family | Navigation / inline |
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

- Package exists at `@snsw-gel/text-link` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as low risk due to link semantics and external link behaviour (Verified from risk rationale)
- Button A/B test confirmed external link behaviour patterns (target="_blank", rel="noopener noreferrer", new-tab icon) for the Button component (Verified from Button results)

## Assumptions

- Text link likely renders a semantic anchor element (Assumption — needs source confirmation)
- Text link likely supports external link behaviour similar to Button (target, rel, icon) (Assumption — based on Button A/B test pattern, needs source confirmation)
- Text link likely supports router integration (as prop) (Assumption — based on Button A/B test pattern, needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| External link handling (target, rel, icon) | Source-backed review |
| Router integration (as, to props) | Source-backed review |
| Whether text-link shares implementation with Button link mode | Source-backed review |
| Visited state styling | Rendered Storybook |

## Risk notes

- Low risk: link semantics, minimal interaction.
- External link behaviour is a known pattern from the Button A/B test but not confirmed for text-link.
- Cannot infer any runtime or DOM behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Yes |
| Is source-backed evidence needed? | Spot-check |
| Is rendered Storybook needed? | No |
| Is owner confirmation needed? | No |
| Should this get a full A/B test? | No |
