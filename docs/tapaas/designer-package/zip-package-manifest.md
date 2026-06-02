# ZIP package manifest

## Purpose

Use this manifest when preparing a clean local package for designers who need to open the trial in Kiro without GitHub publishing access.

The ZIP should contain enough source files to run the local app and Storybook. It should not contain generated build output, dependencies, caches, reports, secrets or raw source assets.

## Recommended ZIP name

```text
tapaas-kiro-designer-package-YYYY-MM-DD.zip
```

## Include

| Path | Why include it |
|---|---|
| `README.md` | Package overview and local run commands. |
| `package.json` | Scripts and dependency list. |
| `package-lock.json` | Reproducible dependency install. |
| `index.html` | Local app entry. |
| `vite.config.ts` | Local app build configuration. |
| `tsconfig*.json` | TypeScript configuration. |
| `.storybook/` | Local Storybook configuration. |
| `.kiro/steering/` | Kiro steering loaded when the folder is opened. |
| `docs/` | TaPaaS rules, evidence logs, designer package and guidance. |
| `src/` | Local app, preview components, transaction examples and tests. |
| `scripts/` | Local acceptance, parity and package checks. |
| `tests/` | Browser acceptance tests where included in the package. |
| `public/` | Public assets required by app or Storybook. |

## Exclude

| Path or file type | Why exclude it |
|---|---|
| `.git/` | Designers do not need Git history for local preview. |
| `node_modules/` | Very large and rebuilt by `npm install`. |
| `dist/` | Generated build output, rebuilt by scripts. |
| `.npm-cache/` | Local cache only. |
| `test-results/` | Generated test artefacts. |
| `playwright-report/` | Generated report artefacts. |
| `.env`, `.env.local`, `.env.*` | May contain secrets or environment-specific values. |
| `.DS_Store` | Local Mac metadata. |
| raw PDFs, MOV/MP4 videos, screenshots, frames, SharePoint files, Figma files, Sketch files, source mock-up images or ZIPs | Source assets must not be redistributed through this package unless Leo confirms the destination and permissions. |

## Suggested clean package structure

```text
tapaas-kiro-designer-package/
  README.md
  package.json
  package-lock.json
  index.html
  vite.config.ts
  tsconfig.json
  .storybook/
  .kiro/steering/
  docs/
    00-build-pack-overview.md
    tapaas/
      12-clara-tapaas-transaction-rules-v01.md
      13-privacy-terms-transaction-template.md
      14-stepper-page-structure-rules.md
      15-authenticated-profile-playback-rules.md
      16-review-confirmation-rules.md
      17-validation-control-choice-rules.md
      18-approved-examples-and-anti-patterns.md
      designer-package/
  src/
  scripts/
  tests/
  public/
```

## Designer expectation

Designers should:

- unzip the package
- open the folder in Kiro
- run `npm install`
- run `npm run dev` or `npm run storybook`
- review locally
- send feedback using [designer-feedback-template.md](designer-feedback-template.md)

Designers do not need GitHub publishing access for this workflow.

## Final check before sharing

Before creating or sharing the ZIP, confirm:

- no raw source assets are included
- no `.env` files are included
- no generated folders are included
- caveats remain visible
- local preview instructions are included
- the package is clearly framed as internal trial material only
