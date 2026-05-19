# Design: GEL Modal implementation

## Architecture

Single-file change in `src/App.tsx`. No new files, no routing, no state management library.

## Component structure

```
<main>
  <h1>...</h1>
  <p>...</p>
  <Button onClick={open}>Open modal</Button>

  {showModal && (
    <Modal
      id="smoke-test-modal"
      title="..."
      description="..."
      onClose={close}
      buttons={[primaryButton, secondaryButton]}
    >
      <p>Body content</p>
    </Modal>
  )}
</main>
```

## State management

- `useState<boolean>` for open/close toggle
- No external state library needed for this scope

## Modal behaviour (Verified from source)

| Behaviour | Mechanism | Source |
|-----------|-----------|--------|
| Focus trap | `react-focus-lock` wraps modal content | Modal.tsx |
| Initial focus | Heading element via `titleRef.current?.focus()` | Modal.tsx |
| Return focus | Saves `document.activeElement` on mount, restores on unmount | Modal.tsx |
| Escape close | `keydown` event listener for keyCode 27 | Modal.tsx |
| Background click | `BgClicker` overlay calls `onClose` | Modal.tsx |
| Portal rendering | `<Portal id='modal-portal'>` | Modal.tsx |
| ARIA | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` | Modal.tsx |
| Conditional render | Mount when `showModal` is true, unmount when false | Consumer pattern |

## Button handling (Verified from source)

- `buttons` array accepts max 2 items
- Array is internally reversed: first item renders as primary (right), second as secondary (left)
- Each button accepts `children` (preferred), `onClick`, `variant`, and other `ButtonWithElementProps`
- `text` prop is deprecated

## Dependencies required

| Package | Version | Status |
|---------|---------|--------|
| `@snsw-gel/modal` | workspace:* | Declared in package.json |
| `@snsw-gel/button` | workspace:* | Declared in package.json |
| `styled-components` | ^6.3.9 | Declared in package.json |
| `react` | ^18.0.0 | Declared in package.json |

## Styling

- GEL `GlobalStyle` from `@snsw-gel/theming` is not present in the example app
- Components will render but may lack correct token values without it
- Treat as Unknown for this implementation; flag in production-readiness gaps

## Evidence sources

- `gel-packages-source-snapshot/packages/modal/src/Modal.tsx` — props, behaviour
- `gel-packages-source-snapshot/packages/modal/src/index.ts` — export confirmation
- `gel-packages-source-snapshot/packages/button/src/index.ts` — export confirmation
- `snsw-kiro-gel-trial-evidence/results/modal/modal-ab-test-summary.md` — A/B findings
- `snsw-kiro-gel-trial-evidence/components/modal.md` — evidence card
