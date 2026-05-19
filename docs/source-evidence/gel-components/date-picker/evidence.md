# Component evidence card: Date picker

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Date picker |
| Package path | `packages/date-picker` |
| Package name | `@snsw-gel/date-picker` |
| Component family | Form / date selection |
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

- Package exists at `@snsw-gel/date-picker` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as high risk due to complex keyboard/date interaction, calendar grid and ARIA (Verified from risk rationale)
- Related packages exist: `@snsw-gel/date-input`, `@snsw-gel/date-multi-input`, `@snsw-gel/dates` (Verified from package scan)

## Assumptions

- Date picker likely renders a calendar grid with day/month/year navigation (Assumption — needs source confirmation)
- Date picker likely implements ARIA grid or table pattern for the calendar (Assumption — needs source confirmation)
- Date picker likely supports keyboard navigation (arrow keys, Home, End, Page Up/Down) (Assumption — needs source confirmation)
- Date picker likely integrates with date-input for text entry fallback (Assumption — needs source confirmation)
- Date picker likely uses @snsw-gel/dates for date formatting/parsing (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ARIA pattern (grid vs table vs dialog) | Source-backed review |
| Keyboard navigation model (arrow keys, page, home/end) | Source-backed review + rendered Storybook |
| Focus management when calendar opens/closes | Source-backed review + rendered Storybook |
| Date range constraints (min/max) | Source-backed review |
| Relationship to date-input and date-multi-input | Source-backed review |
| Locale and date format handling | Source-backed review |
| How selected date is announced to assistive technology | Source-backed review + rendered Storybook |
| Whether calendar is rendered inline or as a popover/dialog | Source-backed review + rendered Storybook |
| Mobile/touch interaction behaviour | Rendered Storybook |

## Risk notes

- High risk: complex keyboard interaction, ARIA grid/table semantics, focus management, date logic.
- Calendar/date picker components are among the most complex ARIA patterns.
- Cannot infer any runtime, DOM, keyboard or ARIA behaviour from package scan alone.
- The @snsw-gel/dates helper may influence date formatting but its API is Unknown.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | No |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Yes |
| Should this get a full A/B test? | Yes |
