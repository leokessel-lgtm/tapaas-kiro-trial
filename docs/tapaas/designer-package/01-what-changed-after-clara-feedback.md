# What changed after Clara feedback

## TLDR

Clara's feedback turns the trial from "generate a transaction that looks plausible" into "assemble the transaction using TaPaaS rules, with clear data ownership, review structure and outcome-specific confirmation".

The biggest shift is that Kiro/Codex should not invent transaction structure from page count or generic form habits. It should follow the TaPaaS transaction rules first.

## Main changes

| Area | Previous risk | TaPaaS transaction rule |
|---|---|---|
| Privacy | Privacy and terms could be merged or both treated as accepted content. | Privacy informs through a Privacy Collection Notice. Terms and Conditions are accepted through one checkbox. |
| Short flows | A stepper could be generated just because screens exist. | Short immediate-approval flows such as Trial Permit should not use a stepper unless a tracked rule requires it. |
| Longer flows | Stepper labels could be generated from internal routes. | Longer staged flows such as Accessible Market Permit use stable meaningful labels and exclude confirmation. |
| Personal details | The transaction could recapture name or identity details. | Authenticated profile-owned details are read-only playback from Account/Profile or verified identity source. |
| Declarations | Kiro/Codex could create a standalone declaration step by default. | Short declarations stay with the related application details unless there is a documented reason to separate them. |
| Review | Review could become one generic table. | Review mirrors completed meaningful sections and uses one edit affordance per section. |
| Confirmation | One generic confirmation page could be reused for every outcome. | Immediate-approval and submitted-for-review confirmations use different content patterns. |
| Validation | Controls could be chosen by convenience rather than task. | Validation has top summary plus inline errors, and control choice matches the option set and answer type. |
| Designer notes | Mock notes could leak into customer UI. | Designer annotations, owner-confirmation notes and internal implementation notes stay out of customer-facing screens. |

## What this means for designers

When reviewing a generated transaction, ask:

- Did the flow choose pages and stages for customer meaning, not internal convenience?
- Are profile-owned personal details played back instead of recaptured?
- Is privacy separated from terms acceptance?
- Does review mirror what the customer completed?
- Does confirmation match the outcome type?
- Are caveats documented outside the customer UI?

## What did not change

The TaPaaS transaction rules do not approve final content, legal wording, privacy notices, accessibility compliance, GEL approval, TaPaaS approval, backend behaviour or production readiness.

They also do not allow raw Clara/SharePoint assets to be committed or redistributed.

## Source links

- [Clara-informed TaPaaS rule layer](../12-clara-tapaas-transaction-rules-v01.md)
- [Approved examples and anti-patterns](../18-approved-examples-and-anti-patterns.md)
