# Kiro/Codex prompt template

Use this when asking Kiro or Codex to generate or patch a TaPaaS transaction.

Replace the bracketed fields before sending.

```text
Start one slice only: [transaction name] transaction update.

Repo:
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial

Source of truth:
Use the committed Clara/TaPaaS steering files under docs/tapaas:

- 12-clara-tapaas-transaction-rules-v01.md
- 13-privacy-terms-transaction-template.md
- 14-stepper-page-structure-rules.md
- 15-authenticated-profile-playback-rules.md
- 16-review-confirmation-rules.md
- 17-validation-control-choice-rules.md
- 18-approved-examples-and-anti-patterns.md

Scope:
Patch [transaction name] only.

Do not:
- change other transactions
- update Storybook unless this slice explicitly says so
- add raw Clara PDFs, videos, screenshots, frames, SharePoint files or source mock-up images
- change package or lock files
- claim production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval or governance clearance

Target:
Treat [transaction name] as [short immediate-approval / longer submitted-for-review / other].

Rules to apply:
1. [Stepper rule: none / stable labels / confirmation excluded]
2. Privacy page uses the TaPaaS privacy-and-terms template.
3. Authenticated personal details are read-only playback unless a documented exception applies.
4. Do not recapture profile-owned personal details by default.
5. Declarations sit with related input unless there is a documented reason for a standalone step.
6. Review mirrors completed meaningful sections and uses one edit affordance per section.
7. Confirmation matches the outcome type.
8. Validation uses summary plus inline errors and stable default/error structure.
9. Designer annotations, mock-only notes, owner-confirmation notes and internal implementation notes must not render as customer-facing UI.

Before editing:
- identify files for [transaction name]
- identify existing tests
- report planned files to change

After editing:
- add or update focused tests for [list important behaviours]
- run focused tests
- run npm run test if reasonable
- run npm run build if reasonable
- run npm run acceptance if available/reasonable
- run git diff --check
- run git status --short

Return:
1. files changed
2. implementation summary
3. tests added or updated
4. validation results
5. git status --short
6. caveats or unresolved owner-confirmation items

Do not commit until Leo approves.
```

## Review prompt

Use this after a slice is patched and validated:

```text
Please validate this TaPaaS transaction slice.

Repo:
/Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial

Slice:
[slice name]

Changed files:
[list files]

Confirmed boundaries:
- [transaction-only / docs-only / Storybook-only]
- no raw Clara/SharePoint/source assets
- no package or lock changes
- no production/accessibility/privacy/legal/GEL/TaPaaS/governance approval claims

Validation:
[list commands and results]

Caveats:
[list unresolved owner-confirmation items]

Return:
- verdict
- what is validated
- material issues
- non-blocking caveats
- recommended next direction
- smallest next Codex action
```
