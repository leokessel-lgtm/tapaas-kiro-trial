# Prompt 02: create a transaction from Figma exports without API or MCP

Use this when designers have approved local Figma exports, screenshots or notes, but Kiro/Codex cannot call the Figma API or MCP.

Do not commit the exported images or source files unless Leo has approved the destination and permissions.

```text
CODEX

Start one slice only: Picnic shelter booking request Figma-informed transaction prototype.

Repo:
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial

Source mode:
Figma-informed without API or MCP.

Available source material:
Use only the local exports, screenshots and notes I attach in this Kiro session. Treat them as review evidence, not as permission to commit raw assets. Do not add the exports, screenshots, frames, Figma files, Sketch files or source mock-up images to the repo.

Framing:
Create a Figma-informed prototype using the committed TaPaaS transaction rules. Preserve a clear distinction between:

- what the exports visibly show
- what is inferred
- what is Unknown
- what needs owner confirmation

Source of truth:
Use the committed TaPaaS transaction rule files under docs/tapaas:

- 12-clara-tapaas-transaction-rules-v01.md
- 13-privacy-terms-transaction-template.md
- 14-stepper-page-structure-rules.md
- 15-authenticated-profile-playback-rules.md
- 16-review-confirmation-rules.md
- 17-validation-control-choice-rules.md
- 18-approved-examples-and-anti-patterns.md

Transaction:
Picnic shelter booking request.

Outcome type:
Booking request submitted for review.

Customer goal:
The customer wants to request use of a public picnic shelter for an event and receive a submitted booking request receipt.

First step:
Inspect the attached exports/screenshots/notes and report:

- screens identified
- visible fields
- visible copy that appears source-backed
- inferred fields
- missing or Unknown content
- likely outcome type
- likely stepper need
- owner-confirmation items
- planned files to change

Do not edit until that report is clear.

Rules to apply after inspection:

- Use a stepper only if the source material or transaction complexity shows meaningful staged work.
- Exclude confirmation from the stepper.
- Use Privacy Collection Notice, Terms and Conditions, Terms and Conditions checkbox, notifications/receipt copy where relevant, Exit and Continue.
- Play back authenticated profile-owned details as read-only unless the source proves transaction-specific capture.
- Do not create editable first name or family name fields by default.
- Use control choices that match the visible option sets.
- Add date help text with expected format if dates are captured.
- Use character limit guidance for long text responses.
- Keep declarations with the related page unless the source proves a standalone declaration step.
- Review must mirror completed meaningful sections and use one edit affordance per section.
- Confirmation must match the outcome type and include receipt number, transaction date and Keep a record where relevant.
- Next steps must explain the review/booking outcome only where supported by the source or clearly marked as owner-gated in docs, not customer UI.

Customer-facing boundary:
Do not render designer annotations, mock-only notes, owner-confirmation notes, placeholder warnings or internal implementation notes as customer-facing UI.

Do not:

- change unrelated transactions
- update Storybook unless explicitly needed and approved
- change package or lock files
- change workflows
- add raw PDFs, videos, screenshots, frames, SharePoint files, Figma exports, Sketch files, source mock-up images or ZIP files
- claim production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval, policy approval or governance clearance

After editing:

- add focused tests for the key TaPaaS rules used in the prototype
- run focused tests
- run npm run test if reasonable
- run npm run build if reasonable
- run git diff --check
- run git status --short

Return:

- files changed
- source-backed decisions
- inferred decisions
- Unknowns
- tests added or updated
- validation results
- git status --short
- caveats and owner-confirmation items

Do not commit until Leo approves.
```
