# GEL Kiro TaPaaS Trial Pack v0.3

## Current state

This package is the active **TaPaaS x Kiro v0.3 trial build pack**.

It supersedes the earlier v0.2 package for this trial. Use v0.3 as the working package from now on.

It includes:

- TaPaaS source inventory from the component and template `.fig` files
- component registry for the first trial component set
- page template registry for repeatable transaction skeletons
- TaPaaS steering files for Kiro
- trial-only TaPaaS preview composites
- five visible non-production transaction skeletons:
  - vehicle search skeleton
  - trial permit application skeleton
  - accessible market permit
  - community venue booking
  - Mobility Parking Scheme simulation
- Storybook component catalogue for isolated designer review
- TaPaaS component intake board for evidence-first Figma component triage

This is **build-assist material only**. It does not claim production readiness, formal accessibility compliance, GEL compliance, privacy approval, legal approval, policy approval or TaPaaS engineering sign-off.

## Preview app

A working local preview of selected TaPaaS repeatable transaction skeletons, built with GEL-shaped preview components and a small `src/tapaas-preview/` composite layer.

The deployed app is available at:

- Main preview: `https://leokessel-lgtm.github.io/tapaas-kiro-trial/`
- Storybook catalogue: `https://leokessel-lgtm.github.io/tapaas-kiro-trial/storybook/`

### Pages implemented

| Page | Route | Status |
|------|-------|--------|
| Privacy | In-app step | Trial skeleton with required checkbox |
| Search or Input | In-app step | Mock vehicle search or trial permit application details |
| Declaration | In-app step | Required declaration checkbox with placeholder wording |
| Review | In-app step | Review info and review fees preview components |
| Confirmation | In-app step | Confirmation header and summary preview components |

### Features

- Service NSW page shell
- Local GEL preview adapter
- Trial-only TaPaaS composite layer
- Mock data only
- Error summary and inline validation
- Responsive transaction skeleton
- Switcher between the visible trial skeletons
- TaPaaS maturity labels and evidence notes
- Storybook catalogue for component-by-component review
- TaPaaS intake board showing coded, documented-only, page-guidance and design-only candidates

## How to run

```bash
npm install --cache ./.npm-cache
npm run dev
npm run build
npm run test
npm run test:browser
npm run parity
npm run validate
npm run storybook
npm run build:storybook
npm run build:all
```

Storybook runs locally at `http://localhost:6006`. The GitHub Pages workflow runs `npm run build:all`, so the main Vite app and Storybook catalogue are deployed together.

Use `npm run validate` before committing substantial changes. It runs the audit, lint, evidence parity check, automated component tests, app build, Storybook build and Playwright browser smoke tests.

The browser smoke tests run against the built local preview by default. To run the same smoke checks against the deployed GitHub Pages site, use:

```bash
PLAYWRIGHT_BASE_URL=https://leokessel-lgtm.github.io/tapaas-kiro-trial/ npm run test:browser
```

## Architecture

```text
src/
├── gel.ts                         ← Adapter, single swap point for real GEL
├── gel-preview/                   ← Local preview GEL components
├── tapaas-preview/                ← Trial-only TaPaaS composite components
├── layout-preview/                ← Page shell
├── TapaasTransactionSkeleton.tsx   ← Vehicle-style repeatable skeleton
├── TrialPermitSkeleton.tsx         ← Trial permit repeatability proof
├── AccessibleMarketPermitSkeleton.tsx
├── CommunityVenueBookingSkeleton.tsx
├── MobilityParkingPermitSkeleton.tsx
├── stories/                        ← Storybook component catalogue
├── App.tsx                        ← Shell wrapper and skeleton switcher
└── main.tsx                       ← React root + GlobalStyle
```

## TaPaaS preview components

| Component | Source evidence | Preview status |
|---|---|---|
| `ConfirmationHeader` | Confirmation page header `9:10494` | Trial-only |
| `TransactionSummaryCard` | Transaction summary card `10:1861` | Trial-only |
| `ReviewInfoCard` | Review info card `18:4448` | Trial-only |
| `ReviewFeesCard` | Review fees card `18:4449` | Trial-only |
| `TransactionCtaGroup` | Transaction CTA/end CTA guidance | Trial-only |
| `ExitModal` | Exit modal template `4677:1042` | Trial-only |
| `BusinessErrorPage` | Business error page template `8931:31271` | Trial-only |
| `RepeatableGroup` | Repeatable form composition | Trial-only |
| `EvidenceChecklistCard` | MPS evidence simulation | Trial-only |
| `AssessmentSummaryPanel` | MPS assessment simulation | Trial-only |
| `DetailsCard` | Details card source evidence | Trial-only |
| `ConditionalQuestionPanel` | Conditional question pattern | Trial-only |

## Boundaries

- This uses local preview components shaped from GEL source. It is not real `@snsw-gel/react` runtime.
- TaPaaS preview components are trial-only composites, not production TaPaaS components.
- Real GEL swap requires private registry access.
- No WCAG compliance is claimed.
- No accessibility approval is claimed.
- No production readiness is claimed.
- No privacy, legal, policy, payment or identity approval is claimed.

## Documentation

See:

- `docs/00-build-pack-overview.md`
- `docs/tapaas/00-source-inventory.md`
- `docs/tapaas/01-component-registry.md`
- `docs/tapaas/02-page-template-registry.md`
- `docs/tapaas/03-figma-evidence-notes.md`
- `docs/tapaas/04-evidence-log.md`
- `docs/tapaas/06-selected-component-maturity-backlog.md`
- `docs/tapaas/component-maturity/`
- `.kiro/steering/10-tapaas-transaction-skeleton-rules.md`
- `.kiro/steering/11-tapaas-component-selection-rules.md`
- `.kiro/steering/12-tapaas-figma-to-code-evidence-rules.md`
- `.kiro/steering/13-tapaas-safety-boundaries.md`
- `.kiro/steering/14-tapaas-prompt-templates.md`
