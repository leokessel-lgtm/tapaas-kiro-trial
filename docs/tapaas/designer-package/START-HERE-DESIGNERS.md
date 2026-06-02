# Start here for designers

## TLDR

Use this package to brief, generate, preview and critique TaPaaS-like transaction prototypes locally in Kiro.

You do not need GitHub publishing access to use it. Work from the local folder, run the preview app or Storybook on your machine, then send structured feedback back to the trial team.

## What this package is

This is an internal trial package for applying the TaPaaS transaction rules to low-risk, repeatable transaction prototypes.

It includes:

- the TaPaaS transaction rule layer
- short and longer transaction examples
- local preview instructions
- prompt templates for Kiro or Codex
- designer review checklists
- feedback and ZIP packaging guidance

## What this package is not

This package is not:

- a production build
- accessibility compliance evidence
- privacy or legal approval
- formal GEL approval
- formal TaPaaS approval
- policy approval
- governance clearance
- permission to redistribute raw source assets

## Who should use it

Use it if you are:

- a designer reviewing a generated transaction prototype
- a designer preparing a transaction brief for Kiro or Codex
- a reviewer comparing a local prototype against TaPaaS transaction rules
- a team member testing whether prompt-assisted transaction build is repeatable

## No-GitHub workflow

Designers can use the package without GitHub publishing access:

1. Receive the clean ZIP package.
2. Unzip it on your machine.
3. Open the unzipped folder in Kiro.
4. Ask Kiro to inspect the package before making changes.
5. Use the prompts in [prompts](prompts/) to create or review a transaction.
6. Run the local app or Storybook using [LOCAL-PREVIEW-GUIDE.md](LOCAL-PREVIEW-GUIDE.md).
7. Send feedback using [designer-feedback-template.md](designer-feedback-template.md).

Do not publish, deploy or push changes unless Leo has asked for that workflow.

## Where to start

| Need | Start with |
|---|---|
| Open and preview the package locally | [LOCAL-PREVIEW-GUIDE.md](LOCAL-PREVIEW-GUIDE.md) |
| Generate a transaction from a written brief only | [prompts/01-create-transaction-from-prompt.md](prompts/01-create-transaction-from-prompt.md) |
| Generate from Figma exports or screenshots without API/MCP | [prompts/02-create-transaction-from-figma-export-no-api-no-mcp.md](prompts/02-create-transaction-from-figma-export-no-api-no-mcp.md) |
| Review a generated transaction | [prompts/03-review-generated-transaction-against-tapaas-rules.md](prompts/03-review-generated-transaction-against-tapaas-rules.md) |
| Remove overclaims or internal notes | [prompts/04-fix-overclaims-and-customer-facing-notes.md](prompts/04-fix-overclaims-and-customer-facing-notes.md) |
| Add preview and test expectations | [prompts/05-add-local-preview-and-tests.md](prompts/05-add-local-preview-and-tests.md) |
| Check the rules manually | [02-transaction-rules-checklist.md](02-transaction-rules-checklist.md) |
| Compare against examples | [08-trial-permit-example.md](08-trial-permit-example.md), [09-accessible-market-permit-example.md](09-accessible-market-permit-example.md), [10-busking-rule-generated-prototype-example.md](10-busking-rule-generated-prototype-example.md) |

## Choose the right source mode

| Source mode | Use when | Framing to use |
|---|---|---|
| Prompt-only | You have a written brief but no approved design source. | Rule-generated prototype |
| Figma-informed | You have exported frames, screenshots or notes, but no API/MCP access. | Figma-informed prototype |
| Source-bounded | You are reproducing only what a documented source proves. | Source-bounded example |
| Legacy/pre-TaPaaS-rules | You are reviewing older trial material. | Legacy or historical reference |

Do not use "Clara rules" as operational wording. The reusable guidance is the TaPaaS transaction rules. Historical notes may say that Clara's walkthrough helped establish the rules.

## Before sharing output

Check that:

- the prototype is labelled as internal trial material
- the source mode is clear
- raw Clara, SharePoint, Figma, screenshot or source mock-up assets are not added to the repo
- profile-owned personal details are not recaptured by default
- privacy, review and confirmation follow the TaPaaS rules
- customer-facing screens do not show designer annotations, mock-only notes, owner-confirmation notes or internal implementation notes
- no production, accessibility compliance, privacy/legal, GEL, TaPaaS, policy or governance approval claim is made

## What to send back

Send:

- transaction name
- source mode
- which local preview you reviewed
- screens reviewed
- TaPaaS rule issues
- content or owner assumptions
- accessibility concerns
- profile or data ownership assumptions
- screenshots or notes, if they are approved to share
- recommended next action

Use [designer-feedback-template.md](designer-feedback-template.md) to keep feedback consistent.
