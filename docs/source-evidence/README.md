# Source evidence index

This folder gives Kiro local, workspace-readable source evidence for GEL and TaPaaS component work.

Use this evidence before creating or changing preview components.

## Available evidence

| Folder | Contents | How to use |
|---|---|---|
| `gel-components/` | Selected GEL source snapshot files, Storybook docs and existing evidence notes for common components | Use as source-backed evidence before implementing or changing GEL-aligned preview components |
| `gel-progress-stepper/` | Dedicated ProgressStepper source evidence and usage rules | Use for ProgressStepper only; it has stricter 4-to-6 step boundaries |
| `tapaas-design-library/` | Index to TaPaaS extracted design-library evidence and coded preview composites | Use to map TaPaaS-specific or draft components back to local trial evidence |

## GEL components included

The `gel-components/` folder includes local evidence for:

- `accordion`
- `autosuggest`
- `breadcrumb`
- `button`
- `callout`
- `card`
- `checkbox`
- `checkbox-list`
- `content`
- `date-input`
- `date-multi-input`
- `date-picker`
- `drop-zone`
- `error-summary`
- `field`
- `fieldset`
- `file-input`
- `file-upload`
- `in-page-alert`
- `input`
- `listbox`
- `loader`
- `manual-address`
- `modal`
- `more-info-modal`
- `more-info-panel`
- `pagination`
- `radio-button-list`
- `select`
- `skeleton`
- `status-label`
- `table`
- `text-area`
- `text-link`

Each component folder may include:

- `src/` source files from the GEL source snapshot
- `stories/` Storybook documentation and examples where available
- `evidence.md` existing GEL trial evidence where available
- `package.json` package metadata

## Rules for Kiro

1. Read source evidence before implementing a preview component.
2. Do not import these evidence files directly into the app.
3. Implement preview components in the local preview layer, then export through `src/gel.ts` when appropriate.
4. Preserve source-backed behaviour and usage boundaries.
5. If the source evidence is incomplete, mark the component `needs engineer review` or `design-only`.
6. Do not claim GEL compliance, WCAG compliance, accessibility approval, production readiness or governance approval.
7. Do not add complex components such as modal, upload, date picker or autosuggest to a transaction without explicit testing and evidence logging.

