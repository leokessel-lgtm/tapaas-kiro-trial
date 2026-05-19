# Component evidence card: Progress stepper

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Progress stepper |
| Package path | `packages/progress-stepper` |
| Package name | `@snsw-gel/progress-stepper` |
| Component family | Navigation / status |
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

- Package exists at `@snsw-gel/progress-stepper` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as medium risk due to navigation state, step semantics and ARIA (Verified from risk rationale)

## Assumptions

- Progress stepper likely renders a list of steps with current/completed/upcoming states (Assumption — needs source confirmation)
- Progress stepper likely uses aria-current="step" or similar for the active step (Assumption — needs source confirmation)
- Progress stepper likely supports navigation between steps (links or buttons) (Assumption — needs source confirmation)
- Progress stepper likely uses an ordered list for semantic step order (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ARIA pattern (aria-current, roles, list semantics) | Source-backed review |
| Whether steps are navigable (links) or informational only | Source-backed review |
| Step state management (current, completed, upcoming, error) | Source-backed review |
| Responsive behaviour (horizontal vs vertical) | Rendered Storybook |
| Keyboard navigation between steps | Source-backed review + rendered Storybook |

## Risk notes

- Medium risk: navigation state, step semantics, potential ARIA.
- Cannot infer any runtime, DOM or ARIA behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Maybe |
| Should this get a full A/B test? | Yes |
