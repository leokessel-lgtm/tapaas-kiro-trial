# Component evidence card: Select

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Select |
| Package path | `packages/select` |
| Package name | `@snsw-gel/select` |
| Component family | Form / selection |
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

- Package exists at `@snsw-gel/select` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as high risk due to form control, ARIA listbox, keyboard navigation and options (Verified from risk rationale)
- Related package exists: `@snsw-gel/field` for label/error linkage (Verified from Text input / Field A/B test)

## Assumptions

- Select likely wraps or enhances a native `<select>` element or implements a custom ARIA listbox (Assumption — needs source confirmation)
- Select likely integrates with Field for label, help text and error linkage (Assumption — based on Field A/B test pattern)
- Select likely supports keyboard navigation (arrow keys, type-ahead, Enter, Escape) (Assumption — needs source confirmation)
- Select likely supports grouped options (optgroup equivalent) (Assumption — needs source confirmation)
- Select likely receives id, aria-describedby and aria-invalid from Field context (Assumption — based on Field A/B test pattern)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| Whether Select uses native `<select>` or custom ARIA listbox | Source-backed review |
| Keyboard navigation model | Source-backed review + rendered Storybook |
| How Select integrates with Field context (id, aria-describedby) | Source-backed review |
| Grouped options support | Source-backed review |
| Multi-select support | Source-backed review |
| Placeholder/default option behaviour | Source-backed review |
| Error state rendering and ARIA | Source-backed review |
| Type-ahead / search filtering | Source-backed review + rendered Storybook |
| Mobile/touch behaviour (native vs custom on mobile) | Rendered Storybook |
| Whether disabled options are supported | Source-backed review |

## Risk notes

- High risk: form control, ARIA, keyboard navigation, label/error linkage.
- Custom select implementations often have accessibility gaps compared to native `<select>`.
- If native `<select>` is used, risk is lower but styling constraints apply.
- Cannot infer whether this is native or custom from package scan alone.
- Field integration pattern is likely based on Text input / Field A/B test findings, but not confirmed for Select specifically.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Yes |
| Should this get a full A/B test? | Yes |
