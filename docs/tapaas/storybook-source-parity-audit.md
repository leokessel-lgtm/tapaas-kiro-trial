# Storybook source-parity audit

## TLDR

The manifest-backed Storybook surface renders and remains useful for internal review, but it does not prove full source parity.

This audit fixed the low-risk traceability gaps that were visible after the MPS source-informed review:

- `SearchVehicleInput` now has dedicated local and source-evidence component notes instead of relying only on the broad evidence log.
- `EmailConfirmationModal` now has a local component note matching the source-evidence note.
- The `RadioButtonCards` source-evidence mirror now records the shared decorative pictogram reuse added for MPS runtime and Storybook.

MPS medical evidence remains review-gated because the source frames still contain conflicting state, heading and file-rule evidence. No upload or medical-evidence runtime behaviour should be added until that source ambiguity is resolved.

## Scope

| Area | Checked |
|---|---|
| Acceptance manifest | 25 entries |
| Built Storybook index | Manifest-backed story IDs |
| Rendered Storybook stories | Manifest-backed smoke targets |
| Source docs | `docs/tapaas/components`, `docs/tapaas/component-maturity`, and `docs/source-evidence/tapaas-design-library` |
| MPS evidence family | Medical evidence status, evidence checklist and assessment summary docs |

## Fixes applied

| Component or area | Issue | Fix |
|---|---|---|
| `SearchVehicleInput` | Manifest evidence pointed only to `docs/tapaas/04-evidence-log.md`, so the component lacked the same dedicated traceability shape as stronger entries. | Added dedicated local and source-evidence component notes and linked them from the acceptance manifest. |
| `EmailConfirmationModal` | Source-evidence note existed, but the matching local `docs/tapaas/components` note was missing. | Added the local component note and linked it from the acceptance manifest. |
| `RadioButtonCards` | Local maturity note recorded shared decorative pictogram reuse, but the source-evidence mirror did not. | Updated the mirror note so the local and source-evidence descriptions no longer drift. |

## Current parity classification

| Component or area | Current status | Treatment |
|---|---|---|
| `SearchVehicleInput` | Static source-informed preview with improved traceability. | Keep catalogue-only until interaction, validation, result states and backend lookup are sourced. |
| `EmailConfirmationModal` | Coded preview with desktop and mobile review stories. | Keep catalogue-only until modal parity, assistive-technology behaviour, routing and real email behaviour are reviewed. |
| `RadioButtonCards` | Useful coded preview, but source remains marked `CONCEPT`. | Keep preview-only and review selected, hover, focus, error, mobile and pictogram details with designers/accessibility. |
| MPS medical evidence | Static evidence-status preview only. | Keep review-gated. Do not implement upload, remove-file, validation, storage, scanning, medical assessment or backend behaviour. |
| Error pages | Separate source nodes exist, but paired source/coded screenshots are still missing. | Keep visual differentiation source-gated until paired screenshots are captured. |
| MPS transaction frames | Bounded source-frame review surfaces. | Keep source claims narrow; full-frame, mobile, content and assistive-technology parity remain manual review items. |

## MPS medical evidence review gate

The next runtime change should not be an upload implementation. The existing source evidence still records:

- `4.A` and `4.Aa` certificate frames with inconsistent uploaded/not-uploaded naming and visible state evidence.
- different file-limit evidence across source frames.
- `4.Aa`, `4.B` and `4.Ba` heading ambiguity.
- report section wording that differs across `4.B` and `4.Ba`.
- unresolved meaning for uploaded, attached, submitted, accepted, verified or stored evidence states.

The safe current implementation is the static `MpsMedicalEvidenceStatusPreview` composed into the MPS skeleton. Anything stronger needs designer, product-owner, engineering and privacy/security review.

## Validation boundary

The current automated checks prove structure and rendering only. They do not prove source-complete parity, production readiness, GEL approval, TaPaaS approval, legal approval, privacy approval, policy approval, WCAG compliance, focus-management completeness, screen-reader behaviour or backend/data behaviour.

## Recommended next action

Use this audit as the close-out for low-risk Storybook source traceability. The next component work should start only after one of these review inputs is available:

1. Designer decision on `RadioButtonCards` source status and pictogram assets.
2. Owner/designer/privacy/security decision on MPS medical evidence source-state mapping.
3. Paired source and coded screenshots for business and system error pages.
