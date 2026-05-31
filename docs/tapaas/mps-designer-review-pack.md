# Mobility Parking Scheme designer review pack

## Purpose

This pack summarises the Mobility Parking Scheme (MPS) repair sequence for a bounded designer review pass.

It is a review artefact only. It does not claim MPS source parity, production readiness, WCAG compliance, accessibility compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval, final copy approval or reusable TaPaaS rule readiness.

## Review scope

Use this pack to review:

- whether the repaired MPS preview is directionally closer to the selected source flow;
- whether page-template usage is clearer;
- whether mock backend/API states are separated from customer-entered transaction UI;
- whether review and confirmation pages are understandable as bounded preview surfaces;
- whether remaining source-gated placeholders are visible enough for the next design decision.

Do not use this pack as:

- production approval evidence;
- source-parity sign-off;
- accessibility compliance evidence;
- backend/API behaviour evidence;
- final content, policy, fee, receipt, notification or permit-issue approval;
- a basis for promoting MPS-specific patterns into reusable TaPaaS rules.

## Source and boundary labels

| Label | Meaning in this pack |
|---|---|
| `SOURCE_CONFIRMED` | Supported by current source-access evidence, but still not production approval. |
| `SOURCE_GATED` | Needs designer, service-owner or narrower Figma confirmation before finalising. |
| `MOCK_BE_STATE` | Represents backend/API, identity, evidence, concession, eligibility, payment or assessment state without real processing. |
| `TRIAL_ONLY` | Included to support trial review or stress testing, not confirmed transaction behaviour. |
| `DEFERRED` | Known gap intentionally left for a later slice or manual review. |
| `REUSABILITY_GATED` | Not ready to become a reusable TaPaaS rule until source and designer review support it. |

## Repair sequence

| Slice | Status | Review note |
|---|---|---|
| Slice 0 | Source access gate | MPS source access was classified before patching. |
| Slice 1A | Source baseline and feedback plan | Locked current source anchors and classified designer feedback. |
| Slice 2A | Source/mock/system-state boundary cleanup | Added visible mock and trial-only boundaries where real service behaviour could be implied. |
| Slice 2B | Page-template container alignment | Added page-template markers and aligned the MPS skeleton containers for later review. |
| Slice 3A | Component choice cleanup | Changed fixed option sets for replacement reason and concession card option from selects to radio groups. |
| Slice 3B | Validation coverage | Added coverage for radio-group summary links and inline group errors. |
| Slice 4A | Backend/API state clarification | Clarified concession validation as a trial-only backend state selector, not customer-entered data. |
| Slice 5A | Review page rebuild | Rebuilt review structure into customer-entered details and trial-only system states. |
| Slice 6A | Confirmation page rebuild | Replaced operational next steps with source-gated placeholders and removed developer-facing source links. |
| Slice 7A | Full-flow QA | Confirmed the MPS mock-success path across desktop, tablet and mobile, with one shared-header caveat. |
| Slice 8A | Designer review pack | This pack packages the current state for bounded design review. |
| Slice 9B | Row-by-row source audit | Compared concession, review, confirmation, applicant details and medical evidence against selected source nodes before patching. |
| Slice 9C | Concession source-required patch | Reduced concession input to the source-observed NSW concession card Yes/No question and gated issuer, number and validation. |
| Slice 9D | Confirmation reconciliation | Replayed source-observed confirmation structure with caveats, without introducing real lodgement, assessment, payment or permit-issue behaviour. |
| Slice 9E | Review row alignment | Replayed first name, last name, permit type and source-gated concession rows more closely to the source review frame. |
| Slice 9F | Stress-path decisions | Kept representative/contact, delivery, payment, evidence and assessment rows grouped as trial-only or mock state summaries. |
| Slice 9G | Review pack update | Updated this pack and the audit notes to reflect the post-audit runtime state. |

## Designer review checklist

| Area | What to check | Current treatment |
|---|---|---|
| Figma/source fidelity | Does the repaired preview follow the intended source flow closely enough for the next review pass? | `SOURCE_GATED` |
| Page-template alignment | Are start, identity, form, evidence, concession, review and confirmation areas clearly separated? | `SOURCE_CONFIRMED` for current structure markers, final source parity still gated. |
| Review page structure | Are application details, personal details, concession details and trial-only stress/backend states understandable? | `SOURCE_GATED` |
| Confirmation page structure | Are source-observed next steps, lodgement date and return-card areas clear without implying real post-submit behaviour? | `SOURCE_GATED` |
| Concession treatment | Is the source-observed Yes/No question enough for review while issuer, number and backend validation remain clearly source-gated? | `SOURCE_GATED` |
| Backend/API state treatment | Are proof of identity, eligibility, evidence, payment, concession and assessment states visibly mock-only? | `MOCK_BE_STATE` |
| Component choices | Are radio groups appropriate for fixed replacement-reason choices and the concession Yes/No question? | `SOURCE_GATED` pending designer confirmation. |
| Validation and errors | Do radio-group summary links, inline errors and grouped controls feel correct enough for the next review pass? | `DEFERRED` for manual keyboard, focus and assistive-technology QA. |
| Source-gated placeholders | Are placeholders obvious enough where final content or service-owner decisions are missing? | `SOURCE_GATED` |
| Responsive/manual QA | Does the transaction content remain readable at desktop, tablet and mobile widths? | `DEFERRED` for formal responsive and accessibility QA. |
| Shared chrome caveat | Tablet-width page overflow was traced to shared Service NSW header search chrome, not MPS content. | `DEFERRED` outside MPS slice. |
| Reusable rules | Is any MPS pattern ready to promote into reusable TaPaaS guidance? | `REUSABILITY_GATED` |

## Current positives to protect

- Mock backend/API states are more visibly separated from customer-entered answers.
- Concession input no longer collects unconfirmed card type, issuer, number or mock validation choices.
- Review page no longer shows non-routing edit buttons.
- Review page no longer leaks the concession mock validation selector.
- Confirmation page no longer exposes the developer-facing component-template relationship map link.
- Confirmation next steps are source-observed but still caveated so they do not imply a real assessment timeframe, notification channel, service-centre requirement or permit issue process.
- The return-card area is visible as source-observed content, but still needs service-owner confirmation before it can be treated as operational guidance.
- Existing automated tests cover the MPS happy path, selected validation links and key mock-state boundaries.

## Remaining source-gated decisions

- Which exact source frames should drive final MPS flow parity.
- Whether representative/contact handling belongs in the MPS source flow or remains trial-only.
- Whether delivery preferences belong in the MPS source flow or remain a Kiro stress-test page.
- Final review section order, labels, fees and edit routing.
- Final confirmation title punctuation, reference format, notification wording, next steps, receipt/record handling, return-card/fine-warning content and related/TUTD content.
- Existing permit lookup result handling.
- Real concession issuer, card number and validation result handling.
- Real identity, medical evidence, eligibility, payment, assessment, approval and permit-issue behaviour.

## Manual QA still needed

- Designer source-fidelity review against the selected source frames.
- Keyboard order and focus handling.
- Screen-reader and assistive-technology behaviour.
- Error summary focus behaviour.
- Responsive review beyond the smoke widths checked in Slice 7A.
- Content, policy, fee, receipt, notification and post-submit wording review with service owners.

## Slice 7A QA summary

| Check | Result |
|---|---|
| Desktop 1280 mock-success path | Passed, no horizontal overflow detected. |
| Tablet 768 mock-success path | Passed. Full-page horizontal overflow detected, traced to shared Service NSW header search chrome. |
| Mobile 390 mock-success path | Passed, no horizontal overflow detected. |
| Replacement reason validation summary target | Passed. |
| Concession Yes/No validation summary target | Passed in Slice 9C focused tests. |
| Concession mock validation result summary target | Superseded. The mock validation selector has been removed from the editable flow. |
| Review boundaries | Passed for checked items. |
| Confirmation boundaries | Passed for checked items. |

## Slice 9C to 9G implementation summary

| Area | Post-audit treatment | Review boundary |
|---|---|---|
| Concession input | Source-observed `Do you have a New South Wales concession card?` with `Yes` and `No`. | Does not collect issuer, number or run validation. |
| Concession review rows | Shows Yes/No plus issuer and number rows as `Source-gated` or `Not applicable`. | No backend validation or recovery behaviour. |
| Confirmation | Shows source-observed assessment heading, application label, lodgement date row, four next-step areas and return-card area. | All operational content remains service-owner/source-gated. |
| Review | Separates first name, last name, residential address, permit type and trial-only stress/backend state rows. | Still not source-parity sign-off. |
| Stress paths | Representative/contact, delivery, payment, evidence and assessment stay grouped as trial-only or mock state summaries. | Designers need to decide whether each stays, moves or is removed. |

## Designer review readiness

MPS is ready for a bounded designer review pass focused on structure, source-gated decisions, mock-state clarity and whether the repaired preview is directionally useful after Slices 9C to 9G.

MPS is not ready for source-parity sign-off, production approval, accessibility compliance claims, privacy/legal/policy approval, backend integration decisions or reusable TaPaaS rule extraction.

## Recommended next action

Run a designer review against this pack, the row-by-row audit and the current MPS preview. Capture feedback as either:

- source-fidelity defects;
- mock/backend-state boundary defects;
- content or policy decisions;
- manual QA defects;
- reusable rule candidates; or
- explicitly protected positives.
