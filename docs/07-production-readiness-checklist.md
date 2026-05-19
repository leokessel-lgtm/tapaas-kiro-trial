# Production Readiness Checklist

## Before production use

This checklist clarifies what remains before any page built with this pack can go to production.

### Registry and packages

- [ ] `.npmrc` configured with `@snsw-gel` scope pointing to JFrog
- [ ] `@snsw-gel/react` installed from private registry
- [ ] `src/gel.ts` swapped to export from `@snsw-gel/react`
- [ ] `src/gel-preview/` directory removed
- [ ] `<GlobalStyle themes={gel3Themes}>` wrapping the app
- [ ] `npm run build` passes with real packages
- [ ] No preview-only components remain in production bundle

### Visual and functional

- [ ] Page renders correctly with real GEL theming (design tokens active)
- [ ] All form inputs use real GEL components (not preview approximations)
- [ ] Error states render with real GEL InPageAlert styling
- [ ] Button hover/active/focus states work correctly
- [ ] Radio/checkbox custom indicators render from GEL styled-components
- [ ] Page shell replaced with real CMS-provided header/footer (or confirmed approach)

### Accessibility

- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus management on error (ErrorSummary receives focus)
- [ ] Focus visible indicators meet contrast requirements
- [ ] Screen reader announces errors via `role="alert"`
- [ ] Form labels correctly associated with inputs (`htmlFor`/`id`)
- [ ] Radio group uses `fieldset`/`legend` pattern
- [ ] Error links in ErrorSummary navigate to the correct field
- [ ] Touch targets meet 44px minimum
- [ ] Colour contrast meets WCAG 2.2 AA (4.5:1 text, 3:1 UI)

### Content and design

- [ ] Page content reviewed by content owner
- [ ] Page design reviewed by design owner
- [ ] Error messages reviewed for clarity
- [ ] Help text reviewed for accuracy

### Engineering

- [ ] Code reviewed by engineering peer
- [ ] Tests written for validation logic
- [ ] Tests written for page navigation flow
- [ ] Build passes in CI/CD pipeline
- [ ] No console errors or warnings in browser

### Owner sign-off

- [ ] Product owner approval
- [ ] Engineering lead approval
- [ ] Accessibility review (if required for this component risk level)
- [ ] Security review (if handling sensitive data)

## What this pack provides vs what it doesn't

| This pack provides | This pack does NOT provide |
|-------------------|---------------------------|
| Correct component API shapes | Real GEL runtime styling |
| Verified import paths | Package resolution |
| Form validation patterns | Accessibility certification |
| Page structure and flow | Production deployment |
| CSS variable reference | Design owner approval |
| Error handling patterns | Content owner approval |
| Local development workflow | Security review |
