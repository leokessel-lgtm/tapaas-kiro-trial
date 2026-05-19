# Test plan: GEL Modal implementation

## Scope

Verify that the GEL Modal implementation in `example-consumer-app/src/App.tsx` behaves correctly.

---

## Static checks (can run without browser)

| Test | Method | Status |
|------|--------|--------|
| TypeScript compiles without errors | `tsc --noEmit` | Not run (no tsconfig in app) |
| Lint passes | App lint command | Not run (no lint configured) |
| Build passes | `npm run build` | Not run (placeholder script) |
| No secrets/PII in code | Manual code review | ✅ Pass |

## Unit / integration tests (require test framework)

| Test | Expected behaviour | Status |
|------|-------------------|--------|
| Button click sets `showModal` to true | Modal mounts in DOM | Not run |
| Modal renders with correct props | `title`, `buttons`, `children` present | Not run |
| Confirm button click sets `showModal` to false | Modal unmounts | Not run |
| Cancel button click sets `showModal` to false | Modal unmounts | Not run |
| `onClose` is called on Escape key | Modal unmounts | Not run |

## Browser / rendered checks (require running app)

| Test | Expected behaviour | Status |
|------|-------------------|--------|
| Modal appears visually on button click | Overlay + dialog visible | Not run |
| Modal disappears on Confirm/Cancel/Escape/background click | Dialog removed from DOM | Not run |
| Focus moves to modal heading on open | `titleRef` receives focus | Not run |
| Focus returns to trigger button on close | Button receives focus | Not run |
| Tab key cycles within modal (focus trap) | Cannot tab outside modal | Not run |
| Background overlay prevents interaction with page | Clicks on page are blocked | Not run |
| No console errors | Clean console | Not run |
| Visual output matches GEL Storybook | Compare side by side | Not run |

## Accessibility checks (require AT or automated tools)

| Test | Expected behaviour | Status |
|------|-------------------|--------|
| `role="dialog"` present | Announced as dialog | Not run |
| `aria-modal="true"` present | AT treats as modal | Not run |
| `aria-labelledby` links to title | Title announced on focus | Not run |
| Screen reader announces "Start of dialog" | SROnly element present | Not run |
| Colour contrast meets minimum ratio | Text readable | Not run |

Do not claim WCAG compliance from these checks alone.

---

## Test execution notes

- No test framework is configured in the example consumer app
- Build/dev scripts are placeholders
- All browser and accessibility tests require the engineer to run the app locally
- Record results when tests are executed and update this plan

## Conclusion

Static code review passes. All runtime tests are blocked until the app has a real build/dev environment. Flag as Unknown until verified.
