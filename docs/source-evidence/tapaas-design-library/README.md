# TaPaaS design-library evidence

This folder gives Kiro a local source-evidence entrypoint for TaPaaS component and template work.

The files here are copies of the current extracted TaPaaS evidence from `docs/tapaas/` at the time this source-evidence bundle was created.

## Files

| File | Purpose |
|---|---|
| `00-source-inventory.md` | Source inventory from the TaPaaS `.fig` files |
| `01-component-registry.md` | Component registry, classification and maturity labels |
| `02-page-template-registry.md` | Page template registry for transaction skeletons |
| `03-figma-evidence-notes.md` | Figma evidence notes, node IDs, gaps and warnings |
| `05-component-template-relationship-map.md` | Component-template relationship guidance for Kiro component selection |

## Important boundaries

- Local `.fig` parsing is draft evidence, not design sign-off.
- Use live Figma MCP confirmation before claiming implementation readiness.
- TaPaaS preview composites in `src/tapaas-preview/` are trial-only.
- Do not claim production readiness, GEL compliance, WCAG compliance, accessibility approval, privacy approval, legal approval, policy approval or TaPaaS engineering approval.

## Current coded TaPaaS preview composites

The current coded TaPaaS preview layer lives in `src/tapaas-preview/` and includes:

- `ConfirmationHeader`
- `TransactionSummaryCard`
- `ReviewInfoCard`
- `ReviewFeesCard`
- `TransactionCtaGroup`
- `DetailsCard`
- `ConditionalQuestionPanel`

Use `docs/tapaas/04-evidence-log.md` for current implementation evidence and retest history.

Use `docs/tapaas/05-component-template-relationship-map.md` when deciding which components should be used for a template-driven transaction.
