# Component evidence card: Text area

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Text area |
| Package path | `packages/text-area` |
| Package name | `@snsw-gel/text-area` |
| Component family | Form / text entry |
| Risk class | High |
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

- Package exists at `@snsw-gel/text-area` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as high risk due to form control, ARIA, character count and validation (Verified from risk rationale)
- Related package exists: `@snsw-gel/field` for label/error linkage (Verified from Text input / Field A/B test)

## Assumptions

- Text area likely integrates with Field for label, help text and error linkage (Assumption — based on Field A/B test pattern)
- Text area likely receives id, aria-describedby and aria-invalid from Field context (Assumption — based on Field A/B test pattern)
- Text area likely supports character count with live announcement (Assumption — needs source confirmation)
- Text area likely supports auto-resize or fixed height (Assumption — needs source confirmation)
- Text area likely supports maxLength constraint (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| Character count implementation and ARIA live announcement | Source-backed review + rendered Storybook |
| Field context integration (id, aria-describedby) | Source-backed review |
| Auto-resize behaviour | Source-backed review + rendered Storybook |
| maxLength enforcement (hard limit vs soft warning) | Source-backed review |
| Error state rendering and ARIA | Source-backed review |
| Whether character count is announced to screen readers | Source-backed review + rendered Storybook |
| Validation behaviour (required, custom) | Source-backed review |
| Rows/cols configuration | Source-backed review |

## Risk notes

- High risk: form control, ARIA, character count with live announcements, validation.
- Character count with live region announcements is a common accessibility challenge.
- Field integration pattern is likely based on Text input / Field A/B test findings, but not confirmed for Text area specifically.
- Cannot infer any runtime, DOM or ARIA behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Maybe |
| Should this get a full A/B test? | Yes |
