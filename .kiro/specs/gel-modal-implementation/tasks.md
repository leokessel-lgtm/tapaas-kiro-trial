# Tasks: GEL Modal implementation

## Task 1: Verify dependencies
- [x] Confirm `@snsw-gel/modal` is in package.json
- [x] Confirm `@snsw-gel/button` is in package.json
- [x] Confirm `styled-components` is in package.json
- [x] Confirm `react` and `react-dom` are in package.json

## Task 2: Confirm import paths from source
- [x] Verify `Modal` is a named export from `@snsw-gel/modal` (source: `packages/modal/src/index.ts`)
- [x] Verify `Button` is a named export from `@snsw-gel/button` (source: `packages/button/src/index.ts`)

## Task 3: Confirm required props from source
- [x] `title: string` — required
- [x] `buttons: ModalButtonProps[]` — required, max 2
- [x] `children: ReactNode` — required
- [x] `description?: string` — optional
- [x] `onClose?: () => any` — optional but needed for close behaviour
- [x] `id?: string` — optional

## Task 4: Implement Modal in App.tsx
- [x] Import `useState` from React
- [x] Import `Modal` from `@snsw-gel/modal`
- [x] Import `Button` from `@snsw-gel/button`
- [x] Add `showModal` state with `useState(false)`
- [x] Add trigger Button with `onClick` to set state true
- [x] Add conditional `{showModal && <Modal ... />}`
- [x] Provide `title`, `buttons`, `children`, `description`, `onClose`, `id`
- [x] Use `children` field on buttons (not deprecated `text`)
- [x] Wire `onClose` and button `onClick` to set state false

## Task 5: Review implementation
- [x] Confirm imports match source exports
- [x] Confirm all required props provided
- [x] Confirm conditional rendering pattern (mount/unmount)
- [x] Confirm no edits to source snapshot or evidence repo
- [x] Confirm no secrets, PII or production data in content

## Task 6: Document production-readiness gaps
- [x] Record that install/build has not been run
- [x] Record that GEL GlobalStyle is not present
- [x] Record that rendered behaviour is not verified
- [x] Record that accessibility is not confirmed
- [x] Record that owner sign-off is not yet sought

## Status

All tasks complete. Implementation is in place. Production-readiness gaps documented.
