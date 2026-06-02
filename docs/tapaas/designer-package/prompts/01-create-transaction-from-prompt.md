# Prompt 01: create a transaction from prompt only

Use this when you have a written transaction idea but no approved design source.

This example creates a complete prompt for a prompt-only, submitted-for-review transaction called **Temporary street trading permit**. Change the transaction facts only if you have better owner evidence.

```text
CODEX

Start one slice only: Temporary street trading permit transaction prototype.

Repo:
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial

Source mode:
Prompt-only.

Framing:
Create a rule-generated prototype using the committed TaPaaS transaction rules. Treat all service content, policy, eligibility, fees, dates, receipt wording, notification wording and permit-delivery wording as owner-gated unless already present in the repo.

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
Temporary street trading permit.

Outcome type:
Submitted for review.

Customer goal:
The customer wants to apply for permission to operate a temporary street trading stall in a public place and receive a submitted application receipt.

Recommended flow:

1. Privacy
2. Your details
3. Trading details
4. Additional details
5. Review
6. Confirmation

Stepper:
Use a progress stepper because this is a longer staged flow.
Stepper labels must be:

- Privacy
- Your details
- Trading details
- Additional details
- Review

Confirmation must not appear in the stepper.
Do not use generated labels such as "Step 1 of 9".
Stepper labels must remain stable across default and error states.

Privacy:
Use the TaPaaS privacy-and-terms template:

- Privacy Collection Notice
- Terms and Conditions
- Terms and Conditions checkbox
- notifications or receipt copy where relevant
- Exit and Continue

Do not add a Privacy Collection Notice checkbox by default.

Authenticated details:
Show personal details as read-only Account/Profile playback:

- first name: Leo
- family name: Kesselring
- email: leo@example.test
- mobile: 0400 000 000

Do not create editable first name or family name fields.
If details are wrong, guide the customer to update them through Account/Profile.

Transaction-specific fields:

- trading business name
- trading location
- trading date, with help text that states the expected format
- trading start time
- trading end time
- goods or services to be sold
- public liability insurance held: Yes / No
- accessibility or support needs: Yes / No

Control guidance:

- use text input for short free-text fields
- use textarea for goods or services, with character limit guidance
- use radio buttons for Yes/No questions
- reveal accessibility/support needs description only when Yes is selected
- do not add fee tables or fee cards unless a fee is evidenced

Additional details:
Include:

- support needs description, conditional on Yes
- short declaration confirming the information is true and the applicant understands the application will be reviewed

Do not create a standalone Declaration step.

Review:
Mirror completed sections:

- Your details
- Trading details
- Additional details
- Privacy

Use one edit affordance per section.

Confirmation:
Use submitted-for-review confirmation:

- heading communicates submitted outcome
- summary includes receipt number and transaction date
- Keep a record is present
- Next steps explain review, outcome notification and permit/document delivery as owner-gated draft wording
- feedback affordance appears where applicable

Customer-facing boundary:
Designer annotations, mock-only notes, owner-confirmation notes, placeholder warnings and internal implementation notes must not render as customer-facing UI.

Do not:

- change other transactions
- update Storybook unless this slice explicitly says so
- change package or lock files
- change workflows
- add raw PDFs, videos, screenshots, frames, SharePoint files, Figma exports, sketch/source mock-up images or ZIP files
- claim production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval, policy approval or governance clearance

Before editing:

- identify planned files to change
- identify any closest existing transaction pattern
- identify existing tests that should be copied or adapted
- report the planned file list before patching

After editing:

- add focused tests for stepper labels, confirmation exclusion, privacy template, profile playback, transaction-specific capture, conditional support needs, review sections, submitted confirmation and annotation boundaries
- run focused tests
- run npm run test if reasonable
- run npm run build if reasonable
- run git diff --check
- run git status --short

Return:

- files changed
- implementation summary
- tests added or updated
- validation results
- git status --short
- caveats and owner-confirmation items

Do not commit until Leo approves.
```
