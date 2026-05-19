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
- two non-production repeatable transaction skeletons:
  - vehicle search skeleton
  - trial permit application skeleton

This is **build-assist material only**. It does not claim production readiness, formal accessibility compliance, GEL compliance, privacy approval, legal approval, policy approval or TaPaaS engineering sign-off.

## Preview app

A working local preview of two TaPaaS repeatable transaction skeletons, built with GEL-shaped preview components and a small `src/tapaas-preview/` composite layer.

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
- Switcher between vehicle and trial permit skeletons
- TaPaaS maturity labels and evidence notes

## How to run

```bash
npm install --cache ./.npm-cache
npm run dev
npm run build
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
- `.kiro/steering/10-tapaas-transaction-skeleton-rules.md`
- `.kiro/steering/11-tapaas-component-selection-rules.md`
- `.kiro/steering/12-tapaas-figma-to-code-evidence-rules.md`
- `.kiro/steering/13-tapaas-safety-boundaries.md`
- `.kiro/steering/14-tapaas-prompt-templates.md`
