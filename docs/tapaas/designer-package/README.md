# TaPaaS designer package

## Status

Internal trial guidance for designers.

This package helps designers brief, generate, preview and critique TaPaaS-rule aligned transaction prototypes in this trial. It is not a production, privacy, legal, accessibility, GEL, TaPaaS, policy or governance approval pack.

Historical note: Clara's walkthrough helped establish the reusable transaction rules. Operational guidance should refer to them as the TaPaaS transaction rules.

## Start here

Use this package when you need to:

- open the ZIP locally in Kiro without GitHub publishing access
- run the app or Storybook locally
- brief a new low-risk transaction prototype
- create a prompt-only or Figma-informed prototype
- check whether a generated transaction followed the TaPaaS transaction rules
- review Trial Permit as the short immediate-approval example
- review Accessible Market Permit as the longer submitted-for-review example
- review Busking Permit as a rule-generated prototype
- orient MPS and Community Venue as TaPaaS-rule aligned runtime examples, noting they do not yet have dedicated transaction stories in Storybook
- prepare structured feedback for Kiro or Codex without exposing raw source assets

## Source of truth

The rules live in the committed TaPaaS transaction steering files:

- [Clara-informed TaPaaS transaction rules](../12-clara-tapaas-transaction-rules-v01.md)
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
| 1 | [Start here for designers](START-HERE-DESIGNERS.md) | Local no-GitHub workflow, source modes and first decisions. |
| 2 | [Local preview guide](LOCAL-PREVIEW-GUIDE.md) | Opening the package in Kiro, running the app, running Storybook and stopping servers. |
| 3 | [What changed after Clara feedback](01-what-changed-after-clara-feedback.md) | Historical context for why the rule layer changed. |
| 4 | [Transaction rules checklist](02-transaction-rules-checklist.md) | Checking a proposed or generated flow. |
| 5 | [Kiro/Codex prompt template](04-kiro-codex-prompt-template.md) | Generic slice prompt structure. |
| 6 | [Prompt folder](prompts/) | Copy-ready prompt-only, Figma-informed, review and cleanup prompts. |
| 7 | [Trial Permit example](08-trial-permit-example.md) | Short immediate-approval transaction benchmark. |
| 8 | [Accessible Market Permit example](09-accessible-market-permit-example.md) | Longer submitted-for-review transaction benchmark. |
| 9 | [Busking Permit rule-generated prototype](10-busking-rule-generated-prototype-example.md) | Prompt-generated transaction workflow proof. |
| 10 | [Storybook review guide](06-storybook-review-guide.md) | Which Storybook stories to inspect. |
| 11 | [Transaction brief template](03-transaction-brief-template.md) | Capturing the transaction before generation. |
| 12 | [Designer review checklist](05-designer-review-checklist.md) | Reviewing generated output. |
| 13 | [Designer feedback template](designer-feedback-template.md) | Returning structured feedback. |
| 14 | [ZIP package manifest](zip-package-manifest.md) | Preparing a clean local package. |
| 15 | [Known limitations and governance caveats](07-known-limitations-and-governance-caveats.md) | Keeping the trial boundary visible. |

## Local workflow

Designers do not need GitHub publishing access:

1. Unzip the clean package.
2. Open the folder in Kiro.
3. Ask Kiro to inspect the package before editing.
4. Run `npm install`.
5. Run the app locally with `npm run dev`.
6. Run Storybook locally with `npm run storybook`.
7. Stop local servers with `Control + C`.
8. Send feedback with [designer-feedback-template.md](designer-feedback-template.md).

Use [LOCAL-PREVIEW-GUIDE.md](LOCAL-PREVIEW-GUIDE.md) for details and troubleshooting.

## Naming and framing

Use these labels:

| Label | Meaning |
|---|---|
| TaPaaS-rule aligned runtime example | Curated runtime example aligned to the committed TaPaaS transaction rules for this trial. |
| Rule-generated prototype | Prompt-only output generated from the TaPaaS transaction rules. |
| Figma-informed prototype | Output informed by exported frames, screenshots or notes without API/MCP access. |
| Source-bounded example | Historical or evidence-bound example that only proves what the cited source proves. |
| Legacy/pre-TaPaaS-rules | Older trial material not yet aligned to the current rule layer. |

Avoid "Clara rules" as operational wording. Existing story IDs or commit history may still contain "clara-aligned"; keep those exact IDs where they are routing handles.

## Storybook surfaces

Use these Storybook story IDs when reviewing the rule surfaces:

- `tapaas-transaction-rules--privacy-and-terms`
- `tapaas-transaction-rules--stepper-and-page-structure`
- `tapaas-transaction-rules--authenticated-profile-playback`
- `tapaas-transaction-rules--review-pages`
- `tapaas-transaction-rules--confirmation-pages`
- `tapaas-transaction-rules--validation-and-control-choice`
- `tapaas-transaction-rules--annotation-boundaries`

Use these dedicated transaction stories:

- `tapaas-transactions--trial-permit-clara-aligned`
- `tapaas-transactions--accessible-market-permit-clara-aligned`
- `tapaas-transactions--busking-permit-rule-generated-prototype`

The Trial Permit and Accessible Market Permit story IDs are historical routing handles. Do not rename them without updating Storybook and any public references.

Current TaPaaS-rule aligned runtime app examples are Trial Permit, Accessible Market Permit, MPS and Community Venue. MPS and Community Venue are runtime examples only for now; they do not yet have dedicated transaction stories in Storybook.

## Boundary

Do not add or share raw Clara PDFs, videos, frames, screenshots, SharePoint files, Figma exports, Sketch files or source mock-up images through this package unless Leo confirms the destination and permissions.

TaPaaS-rule aligned means the prototype follows the committed rule layer for this trial. It does not mean formal TaPaaS approval, production readiness, accessibility compliance, privacy/legal approval, GEL approval, policy approval or governance clearance.
