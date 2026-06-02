# NOD Figma-informed source summary

## Status

This is a sanitised source-summary derived from a local Figma extraction and later visual review evidence. It is planning evidence only.

It is not the full source inventory and is not design sign-off, production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval, policy approval or governance clearance.

The full extracted inventory is kept local-only and must not be committed or redistributed without approval.

## Source mode

Figma-informed, no API or MCP.

The source file was parsed locally from a `.fig` export to identify screen names, visible text strings and transaction structure. Later visual evidence was used to confirm the high-level page structure and customer-facing pattern signals.

The raw `.fig` file, full extracted inventory and source images or exports are not stored in this repo.

## Source handling

| Item | Treatment |
|---|---|
| Raw `.fig` file | Kept outside the repo in a local-only source-assets folder. |
| Full extracted inventory | Kept outside the repo in a local-only source-assets folder. |
| Source images or exports | Kept out of the repo. Use only approved, sanitised text summaries here. |
| Sanitised summary | This file. Suitable for planning review, subject to owner confirmation. |

## High-level extraction result

The local extraction and visual review found:

- 3 top-level Figma pages
- 39 NOD-related screen or frame variants
- a clear staged transaction flow
- customer-facing field groups
- buyer-type branching
- review and confirmation surfaces
- validation and error-state categories
- payment and no-payment variants at a high level
- modal and help surfaces at a high level

The evidence now gives higher confidence for customer-facing structure and visible page patterns, but still cannot reliably prove:

- exact component variants
- focus behaviour or assistive-technology behaviour
- final legal, privacy or declaration wording
- final payment rules
- backend behaviour
- production readiness

## Visual evidence status

The visual evidence supports high-confidence structural planning for these surfaces:

- Privacy
- Vehicle selection
- Sale and buyer details
- Review
- Confirmation
- full-page error categories
- session timeout or session-ended modals

This visual evidence improves planning confidence. It does not turn this summary into source truth, approval evidence or accessibility evidence.

## Inferred transaction flow

| Stage | Purpose | Evidence level |
|---|---|---|
| Privacy | Inform the customer and capture required consent or terms acknowledgement. | High |
| Vehicle selection | Let the customer identify, search for or select the vehicle they are disposing of. | High |
| Sale and buyer details | Capture sale details and buyer information needed to lodge the notice. | High |
| Review | Let the customer check details before submission. | High |
| Confirmation | Show submission outcome, receipt or reference details, and post-submission actions. | High |

## Page and stage notes

### Privacy

The source indicates a privacy or consent entry point with default, selected and error states.

Visual evidence confirms:

- Privacy Collection Notice
- separate Terms and Conditions section
- one Terms and Conditions checkbox
- Notifications copy
- Continue and Exit actions
- Terms checkbox error state

TaPaaS implication:

- Use the TaPaaS privacy-and-terms template where applicable.
- Keep Privacy Collection Notice and terms acceptance distinct.
- Use a Terms and Conditions checkbox only unless privacy/legal confirms otherwise.
- Do not invent final privacy or legal wording.

### Vehicle selection

The source indicates vehicle lookup, search results, vehicle list and selection states.

Visual evidence confirms:

- selected or eligible vehicle cards
- plate search
- search another vehicle action
- high-level vehicle validation and error categories
- session timeout or session-ended modal patterns

Customer-facing field group:

- vehicle search input
- vehicle result or selection card
- vehicle details playback

TaPaaS implication:

- Treat vehicle/account-owned details as playback unless a source or owner confirms they are transaction-specific capture.
- Use high-level validation language only.
- Do not create real lookup, eligibility or backend logic in a trial skeleton.

### Sale and buyer details

The source indicates sale details and buyer details as the main transaction-specific capture step.

Visual evidence confirms:

- sale date with `DD/MM/YYYY` guidance
- sale price or market value field
- buyer type branching for Individual and Motor dealer
- individual buyer fields at a high level
- motor dealer fields at a high level

Customer-facing field groups:

- sale date
- sale or purchase price
- buyer type
- buyer identification details
- buyer name or organisation details where relevant

TaPaaS implication:

- Use date help text that states the expected format.
- Use control choices that match the answer type and option set.
- Treat buyer lookup rules as owner-gated.
- Treat the business, organisation or company path as owner-gated and likely off-channel unless confirmed otherwise.

### Review

The source indicates review surfaces for more than one buyer path.

Visual evidence confirms:

- review heading
- read-only Your details
- Vehicle details card with one edit link
- Sale and buyer details card with one edit link
- Privacy accordion
- Back, Submit and Exit actions
- no visible fee or payment section in the reviewed path
- no standalone declaration step in the reviewed path

Likely review sections for the reviewed path:

- your details
- vehicle details
- sale and buyer details
- privacy

The reviewed path appears to use a truthfulness callout or acknowledgement rather than a standalone declaration step. Confirm final declaration treatment with the product/content owner before implementation.

TaPaaS implication:

- Review should mirror completed meaningful sections.
- Use one edit affordance per review section.
- Do not add fee or payment treatment unless the selected path genuinely requires it.
- Do not create a standalone Declaration step unless owner evidence requires it.
- Do not render internal notes or owner-confirmation notes as customer-facing UI.

### Confirmation

The source indicates a submitted outcome with receipt-related actions and a feedback/survey variant.

Visual evidence confirms:

- outcome heading equivalent to `Notice of Disposal submitted`
- receipt or reference and transaction-date summary
- notify-buyer callout
- Keep a record
- next-step categories for insurance or CTP transfer, e-tag or toll pass, and personalised or special plates
- feedback affordance
- submit another Notice of Disposal, account and logout actions

Customer-facing confirmation groups:

- submitted or lodged outcome heading
- receipt or reference summary
- transaction date where relevant
- Keep a record actions
- notify-buyer guidance where supported by final content
- genuine post-lodgement next steps
- option to start another transaction where appropriate
- feedback affordance where applicable

TaPaaS implication:

- Confirmation wording must match the true outcome type: successful lodgement or submitted NOD, not approval and not submitted-for-review.
- Do not imply approval.
- Do not invent receipt, payment, document delivery or notification behaviour.

## Buyer-type branching

The source indicates concept-level branching by buyer type:

| Buyer type | Planning treatment |
|---|---|
| Individual | Capture buyer identity details needed for the transaction, subject to owner confirmation. |
| Motor dealer | Capture dealer-related buyer details, subject to owner confirmation. |
| Business, organisation or company | Treat as an owner-gated or likely off-channel path. Do not assume it can be completed online. |

This summary does not include internal lookup rules or backend response details.

## Validation and error-state categories

The source includes validation and error-state evidence. For repo-safe planning, group these as categories rather than raw backend or internal system codes:

- required-field errors
- invalid format errors
- buyer detail mismatch or lookup failure
- vehicle lookup or selection failure
- ownership or eligibility issue
- duplicate or already-lodged transaction issue
- service availability or system issue
- full-page error state
- timeout or session-ended modal

Owner confirmation is needed before any category becomes customer-facing wording or runtime behaviour.

## Component and pattern signals

The source suggests these pattern families:

- buttons and link buttons
- text inputs
- date input or date picker
- select/dropdown
- checkbox
- fieldset
- search input
- cards
- status labels
- modal dialogs
- in-page alerts
- loading state
- lists
- page shell
- typography and spacing foundations

Exact component variants, visual treatment and accessibility behaviour still need Figma MCP/API if approved, selective exports, or manual review. This summary does not prove focus order, keyboard behaviour or assistive-technology behaviour.

## Payment signal

The source indicates payment and no-payment variants at a high level. The visually reviewed path does not show a fee or payment section.

Do not add fee tables, payment screens or payment logic to a trial skeleton unless the NOD slice explicitly scopes payment and owner evidence supports it.

## Modal and help signal

The source indicates timeout/session and contextual-help modal patterns at a high level.

Do not add session, timeout, save, exit or help behaviour unless the NOD slice explicitly scopes it and the behaviour is validated against owner evidence.

## TaPaaS rule implications

For a future NOD planning slice:

- Use a progress stepper because the staged work is meaningful to the customer.
- Exclude confirmation from the stepper.
- Use stable customer-facing step labels: Privacy, Vehicle selection, Sale and buyer details, Review.
- Keep authenticated or account-owned details as playback unless owner evidence says otherwise.
- Keep transaction-specific capture focused on sale, buyer and vehicle-disposal details.
- Keep any truthfulness or declaration-like content with the related review or details step unless a standalone declaration step is evidenced.
- Mirror completed meaningful sections on review.
- Use one edit affordance per review section.
- Match confirmation to the real outcome: successful lodgement or submitted NOD.
- Use genuine next steps only where owner evidence supports them.
- Keep internal notes, owner-confirmation notes and mock-only notes out of customer-facing UI.

## Updated NOD build implications

If Leo approves a future build slice, the safest build framing is:

- source mode: Figma-informed prototype
- outcome type: successful lodgement or submitted NOD
- stepper labels: Privacy, Vehicle selection, Sale and buyer details, Review
- confirmation excluded from the stepper
- review sections: Your details, Vehicle details, Sale and buyer details, Privacy
- confirmation pattern: submitted success, receipt or reference/date, Keep a record, notify-buyer guidance, genuine next steps and feedback
- no real lookup, backend logic, payment logic, backend code names or approval claims

## Remaining gaps / owner-gated items

Keep these unresolved until an owner confirms them:

- motor dealer review variant
- final policy, legal, privacy and declaration wording
- real vehicle lookup and eligibility rules
- buyer and dealer validation rules
- business, organisation or company path treatment
- CTP, payment, plates and notification operational detail
- final receipt or reference format
- feedback destination
- accessibility and manual QA findings
- production, compliance, approval and governance status

## Owner-gated questions

Before building a NOD prototype beyond planning, confirm:

- whether NOD is in scope for this trial
- exact outcome type and confirmation wording
- final Privacy Collection Notice wording
- final terms or consent wording
- final declaration wording
- whether payment is in scope
- whether the business/organisation/company path is online or off-channel
- buyer identity and dealer lookup rules
- vehicle lookup and eligibility rules
- receipt/reference format
- notification and receipt delivery behaviour
- feedback/survey destination
- accessibility, content, legal, privacy, GEL, TaPaaS, policy and governance review needs

## Recommended next slice

If this summary update is validated, the next slice can be a mock-only NOD build slice, subject to Leo approval.

Do not build the NOD transaction until Leo approves that build slice.

## Boundary

This summary is source-informed but not source truth.

It intentionally excludes detailed backend error-code names, internal canvas references, raw source assets, operational implementation details, tokens, URLs, personal data and realistic customer data.

Use it to plan a safe trial skeleton. Do not use it to claim production readiness, accessibility compliance, privacy/legal approval, GEL approval, TaPaaS approval, policy approval or governance clearance.
