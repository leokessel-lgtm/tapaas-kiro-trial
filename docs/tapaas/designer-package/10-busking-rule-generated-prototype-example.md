# Busking Permit rule-generated prototype example

## Status

Busking Permit is a prompt-generated, rule-generated prototype.

It is useful as workflow proof, but it is not reviewed or approved by Clara, TaPaaS, GEL, legal, privacy, accessibility, policy or governance owners.

## Source mode

Prompt-only.

The prototype applies the committed TaPaaS transaction rules to a plausible submitted-for-review permit flow. It is not evidence that the underlying service content, policy, form fields, decision rules or permit-delivery model is correct.

## Why it is useful

Busking Permit shows whether a designer or agent can create a new TaPaaS-like transaction from rules alone, then preview and critique it locally.

It is useful for testing:

- whether Kiro picks the right outcome type
- whether a longer staged flow uses a meaningful stepper
- whether confirmation is excluded from the stepper
- whether privacy and terms are separated correctly
- whether authenticated details are played back instead of recaptured
- whether declarations and review sections are placed sensibly
- whether approval and compliance overclaims stay out of the UI

## Storybook surface

Use this Storybook ID:

- `tapaas-transactions--busking-permit-rule-generated-prototype`

This is a rule-generated prototype story, not a TaPaaS-approved transaction story.

## What worked

- The flow is submitted-for-review, not immediate approval.
- The stepper uses stable meaningful labels and excludes confirmation.
- Privacy and terms are first.
- Account/Profile details are read-only playback.
- Performance and additional details are transaction-specific.
- The declaration sits with additional details.
- Review mirrors completed sections.
- Confirmation includes receipt/date, Keep a record, next steps and feedback.
- Boundary copy makes the non-approved status visible outside the customer journey.

## What still needs owner confirmation

- whether this is a real transaction candidate
- service owner and design owner
- final Privacy Collection Notice wording
- final Terms and Conditions wording
- final declaration wording
- location, time and performance-type rules
- whether fees, insurance, evidence or risk checks are required
- receipt/reference format
- outcome notification wording
- permit/document delivery wording
- feedback destination
- accessibility, privacy, legal, GEL, TaPaaS, policy and governance review

## How designers should critique it

Use Busking Permit to ask:

- Does the generated flow feel like a TaPaaS transaction?
- Which page groupings are useful?
- Which details are genuinely transaction-specific?
- Which fields are invented and need owner evidence?
- Does the confirmation match the submitted-for-review outcome?
- Are there any customer-facing annotations or internal notes?
- Which parts should be protected if Kiro patches it again?

## Caveat to preserve

Use this framing:

```text
Busking Permit is a rule-generated prototype created from the TaPaaS transaction rules. It is internal trial material only and is not production-ready, accessibility-compliant, privacy/legal approved, GEL approved, TaPaaS approved, policy approved or governance cleared.
```
