# Component evidence card: Autosuggest

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Autosuggest |
| Package path | `packages/autosuggest` |
| Package name | `@snsw-gel/autosuggest` |
| Component family | Form / combobox / search |
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

- Package exists at `@snsw-gel/autosuggest` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as high risk due to ARIA combobox, keyboard navigation and async filtering (Verified from risk rationale)
- Related package exists: `@snsw-gel/auto-suggest-address` (Verified from package scan)
- Related package exists: `@snsw-gel/listbox` (Verified from package scan)

## Assumptions

- Autosuggest likely implements ARIA combobox pattern (role="combobox" + role="listbox") (Assumption — needs source confirmation)
- Autosuggest likely supports keyboard navigation through suggestion list (arrow keys, Enter, Escape) (Assumption — needs source confirmation)
- Autosuggest likely filters suggestions asynchronously based on input value (Assumption — needs source confirmation)
- Autosuggest likely announces suggestion count or loading state to assistive technology (Assumption — needs source confirmation)
- Autosuggest likely uses @snsw-gel/listbox for the dropdown list (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ARIA combobox implementation (1.1 vs 1.2 pattern) | Source-backed review |
| Keyboard navigation model | Source-backed review + rendered Storybook |
| How suggestions are announced to screen readers | Source-backed review + rendered Storybook |
| Async filtering mechanism (debounce, minimum characters) | Source-backed review |
| Loading state and announcement | Source-backed review |
| No-results state handling | Source-backed review |
| Relationship between autosuggest and auto-suggest-address | Source-backed review |
| Whether listbox package is used as a dependency | Source-backed review |
| Focus management when list opens/closes | Source-backed review + rendered Storybook |
| Whether free-text entry is allowed or selection is required | Source-backed review |

## Risk notes

- High risk: ARIA combobox is one of the most complex ARIA patterns.
- Incorrect combobox implementation is a common WCAG failure.
- Async behaviour adds complexity for loading states and announcements.
- Cannot infer any runtime, DOM, keyboard or ARIA behaviour from package scan alone.
- The auto-suggest-address variant adds address-specific API integration complexity.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | No |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Yes |
| Should this get a full A/B test? | Yes |
