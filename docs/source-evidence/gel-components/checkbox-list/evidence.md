# Component evidence card: Checkbox list

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Checkbox list (includes checkbox) |
| Package paths | `packages/checkbox-list`, `packages/checkbox` |
| Package names | `@snsw-gel/checkbox-list`, `@snsw-gel/checkbox` |
| Component family | Form / selection / grouped controls |
| Risk class | Medium |
| Recommended testing depth | Full A/B test |

## Evidence found

| Evidence type | Found? | Path / note |
|---|---:|---|
| Curated MD | Unknown | Not yet generated |
| MDX docs | ✅ | Both packages have Storybook MDX |
| Stories | ✅ | Both packages have stories |
| Source | ✅ | Both packages have source |
| Tests | ✅ | Both packages have tests |
| Styled source | Unknown | Not confirmed |
| Package metadata | ✅ | Both packages have package.json |
| Rendered Storybook | Unknown | Not inspected |
| Owner confirmation | Unknown | Not sought |

## Verified

- Both packages exist in the monorepo (Verified from package scan)
- MDX, stories, source and tests are present for both (Verified from package scan)
- Both are classified as medium risk due to grouping, first-input IDs, ARIA and validation (Verified from risk rationale)
- Related package exists: `@snsw-gel/fieldset` for grouped control wrapping (Verified from package scan)
- Error Summary A/B test references `-0` convention for first checkbox input IDs (Verified from Error Summary results)

## Assumptions

- Checkbox list likely renders a group of checkboxes within a fieldset/legend (Assumption — needs source confirmation)
- Checkbox likely renders a single checkbox input with label (Assumption — needs source confirmation)
- Checkbox list likely generates IDs with `-0` suffix for the first input (Assumption — based on Error Summary A/B test reference, needs source confirmation)
- Checkbox list likely integrates with Field/Fieldset for label and error linkage (Assumption — based on Field A/B test pattern)
- Checkbox list likely supports validation and error state (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ID generation pattern (especially `-0` for first input) | Source-backed review |
| ARIA group implementation (role="group" vs fieldset) | Source-backed review |
| Indeterminate/mixed state support | Source-backed review |
| Fieldset/legend integration | Source-backed review |
| Error state rendering and ARIA | Source-backed review |
| Validation behaviour (min/max selections, required) | Source-backed review |
| Relationship between checkbox and checkbox-list | Source-backed review |
| Select-all / deselect-all behaviour | Source-backed review |
| How Error Summary links to first checkbox input | Source-backed review (cross-reference with Error Summary findings) |

## Risk notes

- Medium risk: grouped form controls, ARIA, validation, ID generation.
- The `-0` ID convention for first inputs is referenced in the Error Summary A/B test but not source-confirmed for this package.
- Indeterminate state adds complexity if supported.
- Cannot infer any runtime, DOM, ARIA or keyboard behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Yes |
| Should this get a full A/B test? | Yes |
