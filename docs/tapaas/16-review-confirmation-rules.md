# Review and confirmation rules

## Status

TaPaaS rule from Clara feedback.

## Principle

Review and confirmation pages should reflect the customer's journey and the transaction outcome.

They should not be generic summaries generated from available data.

## Rule: Review pages

Review pages should:

- mirror meaningful prior transaction sections
- use clear section headings
- group content in a way that maps back to the source page
- provide one clear edit affordance per section
- avoid duplicate edit links
- avoid fee-style tables or keylines unless fees exist
- include privacy review content where the transaction pattern requires it

Exact visual card treatment needs TaPaaS/GEL confirmation before becoming a hard-coded styling rule.

## Rule: Confirmation pages

Confirmation pages are driven by outcome type:

| Outcome type | Confirmation treatment |
|---|---|
| Immediate approval | Confirm approval, provide receipt/proof details, Keep a record, and relevant feedback affordances. Do not add a next-steps card unless genuine post-approval actions exist. |
| Submitted for later review | Confirm submission, provide receipt details, Keep a record, and explain next steps such as review, notification and permit/document delivery. |

Summary content should usually be limited to transaction receipt facts:

- receipt number
- transaction date
- payment amount, if applicable

Do not replay all application details on confirmation unless the service genuinely requires it.

Kiro/Codex must determine confirmation content from the transaction outcome type before generating the page. It must not reuse a generic confirmation template across immediate-approval and submitted-for-review transactions.

Trial Permit-like flows are immediate approval. Accessible Market Permit-like flows are submitted-for-review.

## Kiro/Codex implementation instruction

When generating a review page:

1. List prior meaningful sections.
2. Render one review section per meaningful source section.
3. Add one edit affordance per section.
4. Include privacy review content only where the pattern requires it.
5. Avoid fee treatments if there are no fees.

When generating confirmation:

1. Identify the outcome type before writing content.
2. Use approved receipt/proof/next-step structure for that outcome type.
3. Include Keep a record where relevant.
4. Include feedback affordances only where the service pattern supports them.
5. Do not invent final operational, legal or notification copy.

## Approved examples

### Trial permit

Transaction-specific example:

- Immediate approval.
- Heading communicates the permit is approved.
- Summary includes receipt number and transaction date.
- Receipt/proof language explains the receipt is the permit.
- Keep a record and feedback affordances are present.
- No next-steps card unless a genuine post-approval action exists.

### Accessible market permit

Transaction-specific example:

- Submitted for review.
- Heading communicates the application is submitted.
- Summary includes receipt number and transaction date.
- Keep a record is present.
- Next steps explain review, outcome notification and permit delivery.

## Anti-pattern

Do not:

- create one generic review table detached from the prior journey
- add duplicate edit targets for the same section
- show fee styling when there are no fees
- add next steps to immediate approval flows by default
- replay every application detail on confirmation when the PDF/receipt already carries that information
- make placeholder review or confirmation notes customer-facing

## Acceptance check

- Review sections map to prior meaningful sections.
- Each review section has one edit affordance.
- Fee/keyline treatments appear only where justified.
- Confirmation outcome type is documented.
- Immediate approval and submitted-for-review flows use different confirmation content.
- No production, legal, privacy or operational finality is claimed.

## Caveats / owner-confirmation items

- Confirm whether privacy review content is always an open accordion, or contextual.
- Confirm which confirmation links open in a new tab.
- Confirm when Help us improve and online-experience feedback appear.
- Confirm final receipt/proof wording and next-step copy with product/legal owners.
