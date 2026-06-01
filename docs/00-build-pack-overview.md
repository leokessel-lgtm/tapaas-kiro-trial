# GEL Kiro TaPaaS Trial Pack v0.3

## v0.3 summary

The **GEL Kiro TaPaaS Trial Pack v0.3** is the active build-assist pack for this trial.

It supersedes v0.2 for ongoing work.

The first v0.3 outcome is repeatability: helping Kiro users assemble simple transaction flows from documented TaPaaS page templates and a small trial-only composite component layer.

This is **not** a TaPaaS production library and does **not** claim production readiness.

## What's new in v0.3

- TaPaaS `.fig` source inventory for component and template libraries
- First 12-component TaPaaS registry with maturity labels
- Page template registry for Privacy, Search/Input, Declaration, Review, Confirmation, Receipt, modals and error pages
- Figma evidence notes and local evidence log
- New `.kiro/steering/10-14-*` TaPaaS rules and prompt templates
- Trial-only `src/tapaas-preview/` composite components
- Repeatable transaction skeleton using mock data only

## Summary

The pack is a no-MCP build-assist package designed to help engineers use Kiro with Service NSW GEL-shaped preview components, TaPaaS Figma evidence and transaction skeleton guidance.

The pack gives Kiro access to:
1. a working local preview app
2. TaPaaS component and template evidence
3. GEL-shaped preview component guidance
4. content and safety steering

The pack is intended to help teams build faster and more safely during the trial. It is **not** a production approval mechanism.

## Foundation retained from earlier GEL work

- **Local preview adapter pattern** — build and iterate without private registry access
- **Live site CSS variable reference** — exact colours, spacing, typography from service.nsw.gov.au
- **Figma design token integration** — typography scale, spacing tokens, radius values
- **Real SVG icons** from `@snsw-gel/ui-icons` source
- **Service NSW logo** fetched from the live site
- **Public Sans font** loaded from `fonts.service.nsw.gov.au`
- **Multi-step flow** — demonstrated with a TaPaaS transaction skeleton
- **Form components** — Input, Select, Field, Checkbox, RadioButtonList with live site styling
- **Error handling** — ErrorSummary + InPageAlert consolidated error pattern
- **Page shell** — header, footer, acknowledgement matched to live site
- **Content design steering** — writing style, readability targets, risk boundaries, microcopy rules, content tasks checklist

## What the pack includes

| Item | Purpose |
|------|---------|
| Working preview app | TaPaaS transaction skeleton and local preview components |
| `docs/tapaas/` | TaPaaS source inventory, component registry, page registry and evidence log |
| `docs/tapaas/designer-package/` | Designer-facing Clara/TaPaaS transaction rules package, brief templates, review checklists and example guides |
| `docs/` folder | Engineer guides for getting to production-ready pages |
| `.kiro/steering/` | Content, safety and TaPaaS rules loaded automatically into Kiro |

## Important boundary

This pack is **build-assist ready**, not production-ready by itself.

It does **not** claim:
- WCAG compliance
- Accessibility approval
- Production readiness
- Formal sign-off
- Legal, privacy, security or policy approval

Each team still needs to verify:
- Package resolution (when registry access is available)
- GEL GlobalStyle / theming setup
- Rendered browser behaviour
- Keyboard and focus behaviour
- Accessibility review
- Product, design, content and engineering owner review
