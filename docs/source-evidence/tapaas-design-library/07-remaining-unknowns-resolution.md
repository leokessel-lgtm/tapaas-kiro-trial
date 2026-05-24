# Remaining unknowns resolution register

This register turns the current fidelity unknowns into explicit review tracks.

It does not claim production readiness, WCAG compliance, GEL approval, TaPaaS approval, legal approval, privacy approval or policy approval.

## Resolution status

| Unknown | Current resolution | Evidence now available | Still needs |
|---|---|---|---|
| Exact pixel parity across all desktop/mobile Figma variants | Partially resolved as Storybook smoke coverage, not exact pixel parity. | Built Storybook smoke checks have confirmed target stories render at 390px without horizontal overflow. | Live Figma screenshots for each selected node and a formal pixel comparison threshold per component. |
| Final pictogram asset parity | Resolved as explicit placeholder mapping only. | Pictograms are decorative SVG placeholders in preview code and are marked as non-essential. | Approved TaPaaS/GEL pictogram source, asset names and usage rules. |
| Radio selected/hover/focus parity | Improved in preview and covered by targeted tests. | `RadioButtonCards` now has selected/hover/focus treatment, visible native-radio proxy control, error state, mobile stack and keyboard arrow/Home/End fallback. | Designer/accessibility review against source node `31:63988`, which remains `CONCEPT`. |
| Final legal/privacy/declaration wording | Resolved as owner-gated placeholder content. | Legal accordion and declaration review use source-like structure with explicit placeholders. | Confirmed legal/privacy/policy copy and decision on whether required material can sit inside collapsed accordions. |
| Real backend error routing and recovery rules | Resolved as mock-only routing categories, not real routing. | Backend examples remain source-code-backed mock hard-stop examples with visible mock code/reference treatment. | Source-confirmed backend codes, routing categories, recovery wording, service-centre/call-centre rules and ownership. |
| Email modal fine-grain source parity | Improved for review. | Desktop and mobile Storybook stories now open the modal by default, making the dialog directly inspectable. Unit tests cover modal role, `aria-modal`, email copy, action callbacks, Escape and tab wrap. | Live Figma re-resolution of source node `9290:50392` / frame `9241:18447` and desktop/mobile screenshot comparison. |
| MPS representative/contact details source gap | Resolved as skeleton-only until stronger evidence exists. | No standalone representative/contact details frame was found in `MPS Final`. Applicant contact details in `2.A - Personal details` `0:17387` and `2.B - Personal details - Manual address` `0:17405` can be used only as structural reference. | Dedicated representative/contact frame evidence or owner-supplied representative, nominee, authority, relationship, consent, identity and privacy rules. |
| Assistive technology behaviour | Partially resolved as automated semantic/focus smoke coverage. | Tests cover native radio selection, radio keyboard fallback, modal focus wrap, Escape close, dialog labelling and key frame semantics. | Manual VoiceOver/NVDA review. Automated checks must not be treated as WCAG compliance. |

## Review sequence

1. Radio button cards: designer/accessibility review for selected, hover, focus, error and mobile states.
2. Email confirmation modal: compare open desktop/mobile Storybook stories with re-resolved Figma source.
3. Pictograms: map every placeholder to an approved TaPaaS/GEL asset or keep it decorative.
4. Pixel parity: run per-story screenshot comparison only for components intended for designer-facing fidelity review.
5. Legal/privacy/declaration content: gather owner-approved wording and collapse/visibility decisions.
6. Backend error routing: gather source-confirmed routing and recovery rules before adding behaviour.
7. Representative/contact details: do not extract or align further unless a dedicated frame is found or owner evidence is supplied.
8. Assistive technology: run manual screen-reader checks after the above visual/content decisions stabilise.

## Backend routing decision matrix

| Source-backed example | Current preview category | Current preview behaviour | Real behaviour status |
|---|---|---|---|
| `ADDRESS_NOT_NSW` | Mock hard stop | Shows hard-stop alert with mock reference and start-again action. | Unknown. Needs owner-confirmed recovery path and wording. |
| `INVALID_PAYMENT_DETAILS` | Mock hard stop/retry | Shows hard-stop alert with mock payment wording. | Unknown. Payment flow remains out of scope. |
| `CUSTOMER_NOT_INDIVIDUAL` | Candidate hard stop | Documented in source evidence only. | Unknown. Identity/customer-type rules remain out of scope. |
| `CUSTOMER_UNDER_16` | Candidate hard stop | Documented in source evidence only. | Unknown. Age eligibility logic remains out of scope. |
| `SYSTEM_FAILURE` | Mock system unavailable | Shows temporary-unavailable mock wording. | Unknown. Real retry, incident and support routing remain out of scope. |

## Content decision matrix

| Area | Current preview treatment | Required decision |
|---|---|---|
| Privacy Collection Notice | Placeholder agency and transaction wording. | Confirm agency, privacy collection notice, visibility and whether accordion treatment is allowed. |
| Terms and Conditions | Placeholder transaction wording. | Confirm approved text, link target and whether acceptance/playback wording is sufficient. |
| Notifications | Placeholder email/update wording. | Confirm notification channels, timing and whether email receipt copy is correct. |
| Declaration review | Source-like playback structure with mock statements. | Confirm exact declaration statements, grouping and whether accordion playback is permitted. |
| Representative/contact details | Skeleton-only mock fields. Applicant contact details may inform field grouping only. | Confirm whether representative, nominee, authority, relationship, consent, identity or privacy rules exist, and whether the pattern belongs in the MPS transaction. |

## Pictogram asset matrix

| Preview location | Current asset | Parity status | Next action |
|---|---|---|---|
| Next steps card | Inline decorative clipboard/check SVG | Placeholder, source-like only | Map to approved `Prepare and plan` or TaPaaS pictogram asset. |
| Radio card: new permit | Inline decorative permit/document SVG | Placeholder | Map to approved source pictogram or remove if pictograms are not useful. |
| Radio card: renew permit | Inline decorative refresh SVG | Placeholder | Map to approved source pictogram or remove if pictograms are not useful. |
| Details card interactive | Inline decorative document/details SVG | Placeholder | Map to approved details-card pictogram asset. |
| Backend/business error | Inline styled `!` marker | Placeholder source-like alert icon | Map to GEL/TaPaaS notification-error icon if approved. |

## Assistive technology smoke matrix

| Component or pattern | Automated coverage now available | Manual review still needed |
|---|---|---|
| Radio button cards | Group name, required/error state, checked state, click selection and keyboard fallback. | VoiceOver/NVDA announcement of card labels, descriptions, error text and arrow movement. |
| Email confirmation modal | Dialog name, `aria-modal`, Escape close and tab wrap. | VoiceOver/NVDA announcement order, close button naming and focus return. |
| Declaration review | Heading structure, accordion `aria-expanded` and visible card playback. | Whether declaration playback can be collapsed and how statements are announced. |
| Legal info accordion | Accordion button semantics and placeholder content. | Whether required legal/privacy content may be collapsed. |
| MPS frame previews | Key headings, groups, checked declarations and action labels in unit coverage. | Full page reading order and screen-reader navigation. |

## Implementation boundary

- Preview-only code and documentation.
- No backend lookup, routing, validation, persistence, identity, eligibility, address lookup, email delivery, payment, legal, privacy or policy behaviour added.
- MPS representative/contact details remains skeleton-only. Future extraction should proceed only if a dedicated representative/contact frame is found or owner evidence is supplied.
- Live Figma MCP re-resolution failed for some historical component nodes in the 2026-05-24 follow-up pass, so exact pixel parity and email modal fine-grain parity remain review-gated.
