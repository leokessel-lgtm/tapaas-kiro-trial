# TaPaaS prompt templates

## Build a transaction skeleton

```text
Build a non-production TaPaaS transaction skeleton for [transaction name].
Use the page order Privacy, Search/Input, Declaration, Review, Confirmation.
Use GEL preview components from ./gel for basic controls.
Use TaPaaS preview composites from ./tapaas-preview only where documented.
Use mock data only.
Mark privacy, legal, payment, identity, eligibility and policy claims for confirmation.
Do not add backend APIs.
```

## Add a TaPaaS review page

```text
Create a Review page using ReviewInfoCard, optional ReviewFeesCard and TransactionCtaGroup.
Map the page to TaPaaS Review step node 8143:15161.
Use semantic headings and labels.
Show mock data only.
Do not include payment processing.
```

## Add a confirmation page

```text
Create a Confirmation page using ConfirmationHeader, TransactionSummaryCard and TransactionCtaGroup.
Map the page to TaPaaS Confirmation step node 5354:8224.
Use a mock reference number.
Mark processing timeframes and receipt wording as source-confirmation required.
Do not claim production readiness or formal accessibility compliance.
```

## Document a component before coding

```text
Document [component name] before implementing it.
Include source Figma file, node ID, purpose, anatomy, states, content rules, accessibility notes, classification, maturity label and known gaps.
If behaviour is unknown, write Unknown rather than inventing it.
```

