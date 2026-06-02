# Prompt 05: add local preview and test expectations

Use this when a transaction exists in code but needs a safer local preview path and focused tests.

```text
CODEX

Start one slice only: add local preview and focused test expectations for the Temporary street trading permit prototype.

Repo:
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial

Scope:
Patch only the Temporary street trading permit prototype and directly required app wiring.

Do not:

- change unrelated transactions
- change package or lock files
- change workflows
- add raw PDFs, videos, screenshots, frames, SharePoint files, Figma exports, Sketch files, source mock-up images or ZIP files
- claim production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval, policy approval or governance clearance

Source mode:
Prompt-only rule-generated prototype.

Framing:
Use "rule-generated prototype" for the transaction. Do not describe it as owner-approved or TaPaaS-approved.

Local preview:

- Add the prototype to the local app switcher only if that is the established repo pattern.
- Use a label that includes "prototype" where helpful.
- Keep any caveat or boundary note outside the customer-facing journey.
- Do not expose internal implementation notes to customers.

Focused tests:
Add or update tests for:

- correct stepper labels, if a stepper is used
- confirmation excluded from the stepper
- no generated "Step 1 of 9" labels
- privacy-and-terms template
- authenticated details are read-only playback
- profile-owned details are not recaptured by default
- transaction-specific fields use suitable controls
- date help text includes expected format
- conditional support-needs behaviour
- declaration placement
- review sections and one edit affordance per section
- submitted-for-review confirmation, including receipt number, transaction date, Keep a record and Next steps
- no customer-facing designer annotations, mock-only notes, owner-confirmation notes, placeholder warnings or internal implementation notes
- no approval or compliance overclaims

Validation:

- run focused tests
- run npm run test if reasonable
- run npm run build if reasonable
- run git diff --check
- run git status --short

Return:

- files changed
- local preview route or switcher label added
- tests added or updated
- validation results
- caveats
- git status --short

Do not commit until Leo approves.
```
