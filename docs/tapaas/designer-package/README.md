# TaPaaS designer package

## Status

Internal trial guidance for designers.

This package helps designers brief, generate, review and critique Clara-aligned TaPaaS transaction prototypes in this trial. It is not a production, privacy, legal, accessibility, GEL, TaPaaS or governance approval pack.

## Start here

Use this package when you need to:

- brief a new low-risk transaction prototype
- check whether a generated transaction followed Clara/TaPaaS rules
- review Trial Permit as the short immediate-approval example
- review Accessible Market Permit as the longer submitted-for-review example
- prepare feedback for Kiro or Codex without exposing raw source assets

## Source of truth

The rules live in the committed Clara/TaPaaS steering files:

- [Clara TaPaaS transaction rules](../12-clara-tapaas-transaction-rules-v01.md)
- [Privacy and Terms transaction template](../13-privacy-terms-transaction-template.md)
- [Stepper and page structure rules](../14-stepper-page-structure-rules.md)
- [Authenticated profile playback rules](../15-authenticated-profile-playback-rules.md)
- [Review and confirmation rules](../16-review-confirmation-rules.md)
- [Validation and control-choice rules](../17-validation-control-choice-rules.md)
- [Approved examples and anti-patterns](../18-approved-examples-and-anti-patterns.md)

This package summarises those rules for design use. If there is a conflict, use the source-of-truth rule files first.

## Navigation

| Step | File | Use it for |
|---|---|---|
| 1 | [What changed after Clara feedback](01-what-changed-after-clara-feedback.md) | Quick orientation on the main rule changes. |
| 2 | [Transaction rules checklist](02-transaction-rules-checklist.md) | Checking a proposed or generated flow. |
| 3 | [Trial Permit example](08-trial-permit-example.md) | Short immediate-approval transaction benchmark. |
| 4 | [Accessible Market Permit example](09-accessible-market-permit-example.md) | Longer submitted-for-review transaction benchmark. |
| 5 | [Storybook review guide](06-storybook-review-guide.md) | Which Storybook stories to inspect. |
| 6 | [Transaction brief template](03-transaction-brief-template.md) | Capturing the transaction before generation. |
| 7 | [Kiro/Codex prompt template](04-kiro-codex-prompt-template.md) | Paste-ready prompt structure. |
| 8 | [Designer review checklist](05-designer-review-checklist.md) | Reviewing generated output. |
| 9 | [Known limitations and governance caveats](07-known-limitations-and-governance-caveats.md) | Keeping the trial boundary visible. |

## Clara-aligned Storybook surfaces

Use these Storybook story IDs when reviewing the rule surfaces:

- `tapaas-transaction-rules--privacy-and-terms`
- `tapaas-transaction-rules--stepper-and-page-structure`
- `tapaas-transaction-rules--authenticated-profile-playback`
- `tapaas-transaction-rules--review-pages`
- `tapaas-transaction-rules--confirmation-pages`
- `tapaas-transaction-rules--validation-and-control-choice`
- `tapaas-transaction-rules--annotation-boundaries`
- `tapaas-transactions--trial-permit-clara-aligned`
- `tapaas-transactions--accessible-market-permit-clara-aligned`

## Boundary

Do not add or share raw Clara PDFs, videos, frames, screenshots, SharePoint files or source mock-up images through this package.

"Clara-aligned" means the prototype follows rules derived from Clara's feedback for this trial. It does not mean formal TaPaaS approval, production readiness, accessibility compliance, privacy/legal approval, GEL approval or governance clearance.
