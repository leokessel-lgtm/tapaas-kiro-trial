# Component evidence card: Modal

## Status

Intake complete. Updated to **Full A/B test complete**.

See `results/modal/modal-ab-test-summary.md` for full findings.

## Component identity

| Field | Value |
|---|---|
| Component name | Modal |
| Package path | `packages/modal` |
| Package name | `@snsw-gel/modal` |
| Component family | Overlay / dialog |
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

- Package exists at `@snsw-gel/modal` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as high risk due to focus trap, escape behaviour, overlay and dialog semantics (Verified from risk rationale)

## Assumptions

- Modal likely implements ARIA `role="dialog"` or `role="alertdialog"` (Assumption — needs source confirmation)
- Modal likely traps focus within the dialog when open (Assumption — needs source confirmation)
- Modal likely returns focus to the trigger element on close (Assumption — needs source confirmation)
- Modal likely responds to Escape key to close (Assumption — needs source confirmation)
- Modal likely renders via a portal to avoid z-index and overflow issues (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| ARIA role implementation (dialog vs alertdialog) | Source-backed review |
| Focus trap mechanism and edge cases | Source-backed review + rendered Storybook |
| Escape key handling | Source-backed review |
| Focus return behaviour on close | Source-backed review + rendered Storybook |
| Portal rendering approach | Source-backed review |
| Scroll lock on body when open | Source-backed review + rendered Storybook |
| Nested modal behaviour | Source-backed review |
| Animation/transition implementation | Rendered Storybook |
| Relationship to more-info-modal | Owner confirmation |
| Whether modal uses @snsw-gel/focus-group | Source-backed review |

## Risk notes

- High risk: focus trap, keyboard interaction, ARIA dialog semantics, overlay behaviour.
- Incorrect focus management is a common WCAG failure for modal dialogs.
- Cannot infer any runtime, DOM or ARIA behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | No |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Yes |
| Should this get a full A/B test? | Yes |
