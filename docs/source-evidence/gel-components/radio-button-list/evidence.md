# Component evidence card: Radio button list

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Radio button list |
| Package path | `packages/radio-button-list` |
| Package name | `@snsw-gel/radio-button-list` |
| Component family | Form / selection / grouped controls |
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

- Package exists at `@snsw-gel/radio-button-list` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as medium risk due to grouping, first-input IDs, ARIA and validation (Verified from risk rationale)
- Related package exists: `@snsw-gel/fieldset` for grouped control wrapping (Verified from package scan)
- Error Summary A/B test references `-0` convention for first radio/checkbox input IDs (Verified from Error Summary results)

## Assumptions

- Radio button list likely renders a group of radio inputs within a fieldset/legend (Assumption — needs source confirmation)
- Radio button list likely generates IDs with `-0` suffix for the first input (Assumption — based on Error Summary A/B test reference, needs source confirmation)
- Radio button list likely integrates with Field/Fieldset for label and error linkage (Assumption — based on Field A/B test pattern)
- Radio button list likely supports keyboard navigation within the group (arrow keys) (Assumption — needs source confirmation)
- Radio button list likely supports validation and error state (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ID generation pattern (especially `-0` for first input) | Source-backed review |
| ARIA radio group implementation | Source-backed review |
| Keyboard navigation model (arrow keys, roving tabindex vs tabindex on group) | Source-backed review + rendered Storybook |
| Fieldset/legend integration | Source-backed review |
| Error state rendering and ARIA | Source-backed review |
| Validation behaviour (required, custom validation) | Source-backed review |
| Horizontal vs vertical layout support | Source-backed review + rendered Storybook |
| Disabled option support | Source-backed review |
| How Error Summary links to first radio input | Source-backed review (cross-reference with Error Summary findings) |

## Risk notes

- Medium risk: grouped form controls, ARIA radio group, keyboard navigation, validation.
- The `-0` ID convention for first inputs is referenced in the Error Summary A/B test but not source-confirmed for this package.
- Cannot infer any runtime, DOM, ARIA or keyboard behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Yes |
| Should this get a full A/B test? | Yes |
