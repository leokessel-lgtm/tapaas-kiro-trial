# Component evidence card: In-page alert

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | In-page alert |
| Package path | `packages/in-page-alert` |
| Package name | `@snsw-gel/in-page-alert` |
| Component family | Messaging / status |
| Risk class | Medium |
| Recommended testing depth | Targeted source check |

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

- Package exists at `@snsw-gel/in-page-alert` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as medium risk due to status messaging, role/semantics and content hierarchy (Verified from risk rationale)
- Error Summary renders through InPageAlert (Verified from Error Summary A/B test)
- InPageAlert is listed as a dependency source pack for the Error Summary test (Verified from docs/05-source-pack-inventory.md)

## Assumptions

- In-page alert likely supports multiple variants (info, success, warning, error) (Assumption — needs source confirmation)
- In-page alert likely uses ARIA role="alert" or role="status" depending on variant (Assumption — partially supported by Error Summary findings showing role="alert")
- In-page alert likely supports a heading/title element (Assumption — needs source confirmation)
- In-page alert likely supports dismiss behaviour for some variants (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| Which ARIA role is used per variant (alert vs status vs none) | Source-backed review |
| Whether dismiss is supported and how it's announced | Source-backed review + rendered Storybook |
| tabIndex behaviour per variant | Source-backed review |
| Content hierarchy (heading, body, actions) | Source-backed review |
| Whether in-page alert is used as a base for other components beyond Error Summary | Source-backed review |
| Animation/transition on appearance | Rendered Storybook |

## Risk notes

- Medium risk: ARIA role semantics, status messaging, content hierarchy.
- Error Summary A/B test confirmed that InPageAlert is used as a rendering dependency with `role="alert"` and `tabIndex={-1}`, but this may be specific to the Error Summary use case.
- Cannot infer full InPageAlert behaviour from the Error Summary test alone.
- Cannot infer any additional runtime, DOM or ARIA behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Yes for guidance |
| Is source-backed evidence needed? | Yes (for role/ARIA behaviour) |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Maybe |
| Should this get a full A/B test? | No (targeted source check is sufficient) |
