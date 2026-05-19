# Component evidence card: Accordion

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Accordion |
| Package path | `packages/accordion` |
| Package name | `@snsw-gel/accordion` |
| Component family | Disclosure / content |
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

- Package exists at `@snsw-gel/accordion` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as medium risk due to expand/collapse, keyboard support and ARIA state (Verified from risk rationale)

## Assumptions

- Accordion likely implements ARIA expanded/collapsed state on trigger buttons (Assumption — needs source confirmation)
- Accordion likely uses button elements as triggers with aria-expanded (Assumption — needs source confirmation)
- Accordion likely supports keyboard interaction (Enter/Space to toggle) (Assumption — needs source confirmation)
- Accordion likely supports single-open or multi-open modes (Assumption — needs source confirmation)
- Accordion likely uses aria-controls to link trigger to panel (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ARIA pattern (aria-expanded, aria-controls, roles) | Source-backed review |
| Keyboard interaction model | Source-backed review + rendered Storybook |
| Single-open vs multi-open behaviour | Source-backed review |
| Animation/transition implementation | Rendered Storybook |
| Whether panels are rendered when collapsed (hidden vs unmounted) | Source-backed review |
| Focus management after expand/collapse | Source-backed review + rendered Storybook |
| Nested accordion support | Source-backed review |
| Heading level configuration | Source-backed review |

## Risk notes

- Medium risk: ARIA expanded state, keyboard interaction, disclosure pattern.
- Accordion is a well-understood ARIA pattern but implementation details vary.
- Cannot infer any runtime, DOM, ARIA or keyboard behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Maybe |
| Should this get a full A/B test? | Yes |
