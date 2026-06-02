# Prompt 03: review a generated transaction against TaPaaS rules

Use this after Kiro or Codex has generated a transaction and you want a rules audit before patching.

```text
CODEX

Start one slice only: review the generated Temporary street trading permit prototype against the TaPaaS transaction rules.

Repo:
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial

Do not edit files in this slice.

Source mode:
Prompt-only rule-generated prototype.

Source of truth:
Use the committed TaPaaS transaction rule files under docs/tapaas:

- 12-clara-tapaas-transaction-rules-v01.md
- 13-privacy-terms-transaction-template.md
- 14-stepper-page-structure-rules.md
- 15-authenticated-profile-playback-rules.md
- 16-review-confirmation-rules.md
- 17-validation-control-choice-rules.md
- 18-approved-examples-and-anti-patterns.md

Audit:

1. Identify the transaction files.
2. Identify existing tests.
3. Confirm source mode and outcome type.
4. Check privacy-and-terms structure.
5. Check stepper use, labels and confirmation exclusion.
6. Check authenticated profile playback and whether profile-owned details are recaptured.
7. Check transaction-specific fields and control choices.
8. Check date format help text and character guidance.
9. Check conditional fields.
10. Check declaration placement.
11. Check review sections and one edit affordance per section.
12. Check confirmation outcome, receipt number, transaction date, Keep a record, Next steps and feedback affordance.
13. Check customer-facing UI for designer annotations, mock-only notes, owner-confirmation notes, placeholder warnings or internal implementation notes.
14. Check for approval or compliance overclaims.

Return:

- audit verdict
- files inspected
- material rule defects
- non-blocking caveats
- owner-confirmation items
- suggested smallest patch slice
- validation that should be run after patching
- git status --short

Do not edit or commit files.
```
