# Content design rules

## Purpose

These rules guide customer-facing content in transaction pages built with the GEL Kiro Trial Build Pack. They are loaded as Kiro steering files so they apply automatically.

## Steering files included

The following steering files are in `.kiro/steering/` and apply to all work in this workspace:

| File | Purpose |
|------|---------|
| `02-snsw-content-writing-style.md` | Plain language, active voice, preferred wording, tone |
| `03-snsw-readability-rules.md` | Grade targets, boundary language, human review |
| `04-snsw-content-risk-boundaries.md` | Flagging rules, placeholders, what Kiro must not claim |
| `05-content-design-in-kiro-specs.md` | How to include content in requirements, design and tasks |
| `06-snsw-component-microcopy-rules.md` | Rules per GEL component type |
| `07-content-outcomes-and-acceptance.md` | What users must achieve, testable criteria |
| `08-content-model-templates.md` | Tables for content model, microcopy inventory, errors |
| `09-content-tasks-checklist.md` | Checklist for content work in specs |

## Writing style summary

- Use plain language.
- Be specific and to the point.
- Include only what the user needs to complete the task.
- Use active voice for most content.
- Use personal pronouns ("you", "your", "we", "our").
- Avoid jargon and unnecessary acronyms.

### Preferred wording

| Prefer | Instead of |
|--------|-----------|
| about | approximately |
| apply | make an application |
| ask | enquire |
| because | as a consequence of |
| buy | purchase |
| get or have | obtain |
| help | assist |
| need or must | require |
| while | whilst |

## Readability targets

Customer-facing content should target:
- Flesch Reading Ease: 80+
- Flesch-Kincaid Grade Level: below 10
- Spelling issues: 0
- Grammar issues: 0

Technical or internal content may target Flesch Reading Ease 60+ where the subject requires it.

## Content risk boundaries

Flag content for human review when it includes:
- eligibility rules
- payment amounts or timing
- identity documents or proof of identity
- privacy, security, fraud or compliance
- legal consequences
- deadlines
- rejection, cancellation or enforcement
- medical, disaster, hardship or vulnerable customer content

Use placeholders when source facts are missing:
- `[confirmed date]`
- `[confirmed amount]`
- `[confirmed eligibility rule]`
- `[confirmed source URL]`
- `[policy owner to confirm]`

## Component microcopy rules

| Component | Rule |
|-----------|------|
| Page heading | State the task clearly. Avoid vague headings. |
| CTA button | Use an action-led label. Make the result clear. |
| Links | Describe the destination. Do not use "click here". |
| Form labels | Use clear labels. Do not rely on placeholder text. |
| Hint text | Explain what to enter and why, only where needed. |
| Error messages | Say what went wrong. Say how to fix it. Use plain language. |
| Error summary | Summarise all errors. Link each to the field. |
| Alerts | Match tone to severity. Do not alarm without confirmed risk. |
| Confirmation | Include what happened, what's next, reference number, timeframe. |

## Error message pattern

Good error messages:
- Say what went wrong
- Say how to fix it
- Use plain language
- Avoid blaming the user
- Use passive voice where it softens sensitive information

Example:
- ✅ "Confirm that you have read the privacy information"
- ❌ "Confirm if you have read and understood all applicable privacy information before proceeding"

## Content tasks checklist

Include these tasks in specs:

- [ ] Draft page headings and body content
- [ ] Draft labels, hints and help text
- [ ] Draft CTA and link text
- [ ] Draft field-level error messages
- [ ] Draft error summary
- [ ] Draft confirmation page content
- [ ] Check readability score
- [ ] Check spelling and grammar
- [ ] Check link purpose
- [ ] Mark risky claims for confirmation
- [ ] Complete content QA before handoff

## Content model template

For each page, define:

| Page | Purpose | Heading | Primary CTA | Secondary action | Key content | Content risk |
|------|---------|---------|-------------|-----------------|-------------|--------------|

## Boundary

Kiro must not:
- approve content
- claim WCAG compliance
- claim legal or policy compliance
- confirm eligibility rules
- invent dates, amounts, URLs or source facts

This needs content review. This needs accessibility review. This needs policy, legal or SME confirmation.
