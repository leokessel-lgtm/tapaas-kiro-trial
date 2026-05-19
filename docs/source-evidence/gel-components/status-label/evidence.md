# Component evidence card: Status label

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | Status label (includes success-indicator) |
| Package paths | `packages/status-label`, `packages/success-indicator` |
| Package names | `@snsw-gel/status-label`, `@snsw-gel/success-indicator` |
| Component family | Feedback / status |
| Risk class | Low |
| Recommended testing depth | Targeted source check |

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
- Both are classified as low risk as presentational status indicators (Verified from risk rationale)

## Assumptions

- Status label likely renders a coloured badge/tag with status text (Assumption — needs source confirmation)
- Success indicator likely renders a checkmark or success icon with label (Assumption — needs source confirmation)
- Both likely use colour plus text/icon to convey status (not colour alone) (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| Whether status is conveyed by colour alone or also by text/icon | Source-backed review |
| ARIA role or live region usage | Source-backed review |
| Variant types (success, warning, error, info, pending) | Source-backed review |

## Risk notes

- Low risk: presentational status display.
- Colour-only status indication would be an accessibility concern, but this is not confirmed.
- Cannot infer any runtime or DOM behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Yes |
| Is source-backed evidence needed? | No (spot-check only) |
| Is rendered Storybook needed? | Maybe |
| Is owner confirmation needed? | No |
| Should this get a full A/B test? | No |
