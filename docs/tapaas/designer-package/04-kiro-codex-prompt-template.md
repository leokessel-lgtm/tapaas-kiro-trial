# Kiro/Codex prompt template

Use this when asking Kiro or Codex to generate, patch or review a TaPaaS transaction.

For complete copy-ready examples, use the [prompts](prompts/) folder.

## Generic slice prompt

Replace the transaction facts before sending.

```text
Start one slice only: [transaction name] transaction update.

Repo:
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial

Source mode:
[Prompt-only / Figma-informed / Source-bounded / Legacy/pre-TaPaaS-rules]

Framing:
Use [rule-generated prototype / Figma-informed prototype / source-bounded example / TaPaaS-rule aligned runtime example] as the operating label.

Source of truth:
Use the committed TaPaaS transaction steering files under docs/tapaas:

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
- add raw Clara PDFs, videos, screenshots, frames, SharePoint files, Figma exports, Sketch files, source mock-up images or ZIP files
- change package or lock files
- change workflows
- claim production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval, policy approval or governance clearance

Target:
Treat [transaction name] as [short immediate-approval / longer submitted-for-review / booking request / other].

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
- run npm run acceptance:static if available/reasonable
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

Source mode:
[Prompt-only / Figma-informed / Source-bounded / Legacy/pre-TaPaaS-rules]

Changed files:
[list files]

Confirmed boundaries:
- [transaction-only / docs-only / Storybook-only]
- no raw Clara/SharePoint/Figma/source assets
- no package or lock changes
- no production/accessibility/privacy/legal/GEL/TaPaaS/policy/governance approval claims

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

## Naming reminder

Use "TaPaaS transaction rules" in operational guidance.

Use "Clara" only for historical context, existing story IDs or commit history where the exact label must be preserved.
