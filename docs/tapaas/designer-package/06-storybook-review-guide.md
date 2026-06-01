# Storybook review guide

## Purpose

Storybook is the designer-facing review surface for the trial rules and examples. It helps designers inspect patterns without opening raw Clara/SharePoint assets.

It is review evidence only. It is not accessibility compliance evidence, production approval, GEL approval, TaPaaS approval or privacy/legal approval.

Dedicated Clara-aligned Storybook transaction stories currently exist for Trial Permit and Accessible Market Permit. Clara-aligned runtime app examples now include Trial Permit, Accessible Market Permit, MPS and Community Venue; review MPS and Community Venue in the app runtime until dedicated Clara-aligned Storybook transaction stories are added.

## Rule stories

Use these stories to review the reusable rules:

| Storybook title | Story ID | Review focus |
|---|---|---|
| TaPaaS Transaction Rules / Privacy and Terms | `tapaas-transaction-rules--privacy-and-terms` | PCN, Terms and Conditions, Terms checkbox and notifications/receipt copy. |
| TaPaaS Transaction Rules / Stepper and Page Structure | `tapaas-transaction-rules--stepper-and-page-structure` | When a stepper is justified, stable labels and confirmation exclusion. |
| TaPaaS Transaction Rules / Authenticated Profile Playback | `tapaas-transaction-rules--authenticated-profile-playback` | Read-only account/profile playback and update guidance. |
| TaPaaS Transaction Rules / Review Pages | `tapaas-transaction-rules--review-pages` | Review sections, edit affordances and privacy review content. |
| TaPaaS Transaction Rules / Confirmation Pages | `tapaas-transaction-rules--confirmation-pages` | Immediate approval versus submitted-for-review treatment. |
| TaPaaS Transaction Rules / Validation and Control Choice | `tapaas-transaction-rules--validation-and-control-choice` | Error summary, inline errors, date help, selects and character guidance. |
| TaPaaS Transaction Rules / Annotation Boundaries | `tapaas-transaction-rules--annotation-boundaries` | Keeping designer notes out of customer UI. |

## Transaction examples

Use these stories to review the two dedicated Clara-aligned Storybook transaction examples:

| Storybook title | Story ID | Review focus |
|---|---|---|
| TaPaaS Transactions / Trial Permit - Clara Aligned | `tapaas-transactions--trial-permit-clara-aligned` | Short immediate-approval flow with no stepper, profile playback, short declaration, mirrored review and approved confirmation. |
| TaPaaS Transactions / Accessible Market Permit - Clara Aligned | `tapaas-transactions--accessible-market-permit-clara-aligned` | Longer submitted-for-review flow with five-step orientation, market details, conditional support needs, review and submitted confirmation. |

## Suggested review order

1. Start with `Privacy and Terms`.
2. Compare `Stepper and Page Structure` with both transaction examples.
3. Review `Authenticated Profile Playback`.
4. Review `Validation and Control Choice`.
5. Review `Review Pages`.
6. Review `Confirmation Pages`.
7. Finish with `Annotation Boundaries`.

## What to capture

For each story, capture:

- rule followed
- rule broken
- source or owner evidence needed
- manual QA needed
- protected positives
- whether the issue is general or transaction-specific

## Boundaries

Do not treat a Storybook story as proof that:

- the content is final
- privacy/legal wording is approved
- the interaction is accessible
- the pattern is GEL approved
- TaPaaS has approved production use
- backend, identity, payment, notification or permit-delivery behaviour exists
