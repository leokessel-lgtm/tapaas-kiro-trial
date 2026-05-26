# GEL component source evidence

This folder contains selected GEL source snapshot files and supporting evidence copied into the v0.3 trial pack so Kiro can inspect component evidence locally.

These files are reference evidence only. Do not import them directly.

## Recommended use

Before adding or changing a GEL-aligned preview component:

1. Read the matching component folder in `docs/source-evidence/gel-components/`.
2. Check `evidence.md` where available.
3. Check the component `stories/` docs for usage guidance.
4. Check `src/` for API shape, semantic markup and behaviour.
5. Implement only the smallest preview-layer slice needed for the trial.
6. Update `docs/tapaas/01-component-registry.md` and `docs/tapaas/04-evidence-log.md`.

## Batch 1 GEL Reference inventory

Batch 1 Storybook reference coverage uses source-informed local previews through `src/gel.ts` only. It is Storybook reference only and is not a production GEL export or an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim.

| Component | Source evidence folder | Batch 1 status |
|---|---|---|
| Button | `button` | Rendered reference preview |
| TextLink | `text-link` | Rendered reference preview |
| Content / Heading | `content` | Rendered reference preview |
| Field | `field` | Rendered reference preview |
| Input | `input` | Rendered reference preview |
| Select | `select` | Rendered reference preview |
| Textarea | `text-area` | Rendered reference preview |
| Checkbox | `checkbox` | Rendered reference preview |
| RadioButtonList | `radio-button-list` | Rendered reference preview |
| ErrorSummary | `error-summary` | Rendered reference preview |
| InPageAlert | `in-page-alert` | Rendered reference preview |
| Callout | `callout` | Rendered reference preview as a source-informed local wrapper over local `InPageAlert` |
| ProgressStepper | `docs/source-evidence/gel-progress-stepper` | Rendered reference preview |

Callout source evidence shows `@snsw-gel/callout` wraps `@snsw-gel/in-page-alert` with `variant='callout'`. The local preview follows that source-backed relationship only; it does not claim canonical GEL rendering.

## Maturity guidance

| Evidence state | Suggested maturity |
|---|---|
| Source, docs and evidence note are available, and preview implementation passes local build/browser smoke tests | `build-tested` or `needs engineer review` |
| Source exists but behaviour is complex or not yet tested in v0.3 | `needs engineer review` |
| Only design or partial notes exist | `design-only` |
| GEL/TaPaaS alignment is unclear | `unresolved` |

## High-risk components

Treat these as higher-risk in this trial:

- `modal`
- `more-info-modal`
- `date-picker`
- `autosuggest`
- `file-input`
- `file-upload`
- `drop-zone`

They may require deeper accessibility, keyboard, focus-management, validation, upload/security, or async-behaviour testing before use.
