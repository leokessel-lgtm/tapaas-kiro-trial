# Requirements: Replace placeholder modal with GEL Modal

## Summary

Replace the placeholder modal in `example-consumer-app/src/App.tsx` with the real GEL Modal component from `@snsw-gel/modal`, verified against source snapshot and evidence repo.

## Functional requirements

1. **FR-1:** App displays a Button that opens a modal on click.
2. **FR-2:** Modal displays a title, optional description, body content and up to two action buttons.
3. **FR-3:** Modal closes when the user clicks Confirm, Cancel, the close button, presses Escape, or clicks the background overlay.
4. **FR-4:** Modal uses conditional rendering (mount/unmount pattern, not show/hide).
5. **FR-5:** Modal renders via Portal to avoid z-index and overflow issues.

## Non-functional requirements

6. **NFR-1:** Import path must be `import { Modal } from '@snsw-gel/modal'` (Verified from source).
7. **NFR-2:** Import path must be `import { Button } from '@snsw-gel/button'` (Verified from source).
8. **NFR-3:** All required props (`title`, `buttons`, `children`) must be provided.
9. **NFR-4:** `buttons` array uses `children` field (not deprecated `text` field).
10. **NFR-5:** `onClose` prop is provided to enable Escape, background click and close button.
11. **NFR-6:** No secrets, PII or production data in component content.

## Constraints

- Only `example-consumer-app` is editable.
- `snsw-kiro-gel-trial-evidence` is evidence only — do not edit.
- `gel-packages-source-snapshot` is read-only source truth — do not edit.
- Do not claim WCAG compliance, accessibility approval or production readiness.

## Acceptance criteria

- [ ] App.tsx imports Modal from `@snsw-gel/modal` and Button from `@snsw-gel/button`
- [ ] Modal renders conditionally based on state
- [ ] Modal has title, buttons (max 2), children content
- [ ] onClose handler is wired to state toggle
- [ ] No TypeScript errors in the component file
- [ ] No edits to source snapshot or evidence repo
