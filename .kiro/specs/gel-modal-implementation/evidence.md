# Evidence: GEL Modal implementation

## Evidence sources used

| Source | Path | What it confirmed |
|--------|------|-------------------|
| Modal source | `gel-packages-source-snapshot/packages/modal/src/Modal.tsx` | Props interface, FocusLock, Portal, Escape handler, ARIA attributes, button handling |
| Modal index | `gel-packages-source-snapshot/packages/modal/src/index.ts` | Named export `{ Modal }` |
| Modal package.json | `gel-packages-source-snapshot/packages/modal/package.json` | Package name `@snsw-gel/modal`, peer deps |
| Button index | `gel-packages-source-snapshot/packages/button/src/index.ts` | Named export `{ Button }` |
| Button source | `gel-packages-source-snapshot/packages/button/src/Button.tsx` | ButtonProps interface |
| Button package.json | `gel-packages-source-snapshot/packages/button/package.json` | Package name `@snsw-gel/button`, peer deps |
| Modal A/B summary | `snsw-kiro-gel-trial-evidence/results/modal/modal-ab-test-summary.md` | Confirmed conditional rendering, FocusLock, Portal, Escape, background click, return focus, ARIA |
| Modal evidence card | `snsw-kiro-gel-trial-evidence/components/modal.md` | Risk classification, evidence inventory |
| Theming source | `gel-packages-source-snapshot/packages/theming/src/index.ts` | GlobalStyle export, gel3Themes |

## Evidence classification

### Verified

- Package name: `@snsw-gel/modal` (from package.json)
- Import path: `import { Modal } from '@snsw-gel/modal'` (from index.ts)
- Package name: `@snsw-gel/button` (from package.json)
- Import path: `import { Button } from '@snsw-gel/button'` (from index.ts)
- Required props: `title`, `buttons`, `children` (from ModalProps interface)
- Optional props: `description`, `onClose`, `id`, `className` (from ModalProps interface)
- `buttons` uses `children` field; `text` is deprecated (from source + JSDoc)
- Modal renders via Portal (from source)
- FocusLock traps focus (from source)
- Escape key calls `onClose` (from source)
- Background click calls `onClose` (from source)
- `role="dialog"` and `aria-modal="true"` applied (from source)
- `aria-labelledby` links to title element (from source)
- Conditional rendering = mount/unmount pattern (from source + A/B summary)
- Return focus to previously active element on unmount (from source)
- `styled-components` >=6.3.9 required as peer dependency (from package.json)

### Assumptions

- Button auto-assigns `variant: 'secondary'` to the first rendered item when 2 buttons are present (inferred from source reversal logic — not explicitly tested at runtime)
- GEL components will render basic structure without GlobalStyle, but tokens may not resolve (inferred from styled-components behaviour)

### Unknowns

| Unknown | What would verify it |
|---------|---------------------|
| Whether `workspace:*` protocol resolves in this build-pack structure | Running `npm install` or equivalent |
| Whether GEL GlobalStyle is needed for basic rendering | Running the app in a browser |
| Whether body scroll is locked when modal is open | Rendered browser check or `Modal.styled.ts` inspection |
| Exact assistive-technology announcement when modal opens | Manual screen reader testing |
| Animation/transition timing and its effect on focus | Rendered Storybook or browser |
| Whether the app needs additional transitive dependencies | Running install and checking warnings |
| WCAG conformance of the assembled page | Manual accessibility audit |
