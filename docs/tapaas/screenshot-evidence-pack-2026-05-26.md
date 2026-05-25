# Screenshot evidence pack - 2026-05-26

## Purpose

This index records the temporary screenshot evidence pack created for visual-source review of selected TaPaaS/MPS showcase targets.

The pack pairs source Figma screenshots with coded Storybook screenshots so reviewers can compare visible structure, layout, spacing, grouping, state coverage and composition. It is design QA evidence only. It does not prove pixel-perfect parity, GEL approval, WCAG compliance, accessibility approval, policy approval, privacy approval, legal approval, production readiness, backend behaviour or real transaction approval.

## Temporary pack location

Screenshots are currently stored outside the repo at:

`/tmp/tapaas-screenshot-evidence-pack-2026-05-26`

Screenshots have not been committed to the repo. This file is an index only.

## Captured source screenshots

| Target | Source frame/reference | Screenshot path |
|---|---|---|
| MPS Review Frame | MPS `6.A - Review`, node `0:33185` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/mps-review-frame-source-0-33185.png` |
| MPS Applicant Details | `2.A - Personal details`, node `0:17387` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/mps-applicant-details-search-source-0-17387.png` |
| MPS Applicant Details | `2.B - Personal details - Manual address`, node `0:17405` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/mps-applicant-details-manual-source-0-17405.png` |
| MPS Confirmation Frame | `6.A Confirmation screen`, node `0:33222` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/mps-confirmation-frame-source-0-33222.png` |
| MPS Medical Evidence | `4.A - Medical certificate`, node `0:17316` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/mps-medical-certificate-source-0-17316.png` |
| MPS Medical Evidence | `4.Aa - Medical certificate uploaded`, node `0:17333` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/mps-medical-certificate-uploaded-source-0-17333.png` |
| MPS Medical Evidence | `4.B - Medical report`, node `0:17357` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/mps-medical-report-source-0-17357.png` |
| MPS Medical Evidence | `4.Ba - Medical report uploaded`, node `0:17370` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/mps-medical-report-uploaded-source-0-17370.png` |
| Email Confirmation Modal mobile | Template source node `9290:50392` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/email-confirmation-modal-source-9290-50392.png` |
| Email Confirmation Modal mobile | Component frame `9241:18447` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/email-confirmation-modal-source-9241-18447.png` |
| Radio Button Card States | TaPaaS radio button cards, node `31:63988` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/source/radio-button-card-states-source-31-63988.png` |

## Captured coded Storybook screenshots

| Target | Storybook/page target | Screenshot path |
|---|---|---|
| MPS Review Frame | `tapaas-preview-composites--mps-review-frame-figma-fidelity` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/mps-review-frame-desktop.png` |
| MPS Applicant Details | `tapaas-preview-composites--mps-applicant-details-frame-figma-fidelity` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/mps-applicant-details-desktop.png` |
| MPS Confirmation Frame | `tapaas-preview-composites--mps-confirmation-frame-figma-fidelity` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/mps-confirmation-frame-desktop.png` |
| MPS Medical Evidence | `tapaas-preview-composites--mps-medical-evidence-status` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/mps-medical-evidence-desktop.png` |
| Email Confirmation Modal mobile | `tapaas-preview-composites--email-confirmation-modal-mobile` | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/email-confirmation-modal-mobile.png` |
| Radio Button Card States | `tapaas-preview-composites--radio-button-card-states` desktop | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/radio-button-card-states-desktop.png` |
| Radio Button Card States | `tapaas-preview-composites--radio-button-card-states` mobile | `/tmp/tapaas-screenshot-evidence-pack-2026-05-26/radio-button-card-states-mobile.png` |

## Evidence grades and safe claims

| Target | Evidence grade after capture | Safe visual claim | Unresolved review gates |
|---|---|---|---|
| MPS Review Frame | `A` for desktop `6.A` review comparison | Desktop source and coded screenshots are available for visual review of layout order, section grouping, edit-control placement, declaration placement and CTA relationship. | Mobile parity remains review-gated without a matching mobile source frame. Edit routing, submission, declaration/legal wording, policy/privacy approval and assistive-technology behaviour remain out of scope. |
| MPS Applicant Details | `A` for desktop search/manual variants | Desktop source and coded screenshots are available for visual review of field order, section grouping, address-search/manual-address split and action placement. | Mobile parity remains review-gated without matching mobile source frames. Real address lookup, address results, validation, identity/customer-record behaviour, privacy/policy approval and assistive-technology behaviour remain out of scope. |
| MPS Confirmation Frame | `A` for desktop `6.A` confirmation comparison | Desktop source and coded screenshots are available for visual review of confirmation heading, reference/details area, next steps, feedback prompt and footer/action relationship. | Mobile parity and `6.B` tile variant remain review-gated. Real reference format, notification timing, receipt behaviour, feedback capture, related transaction routing and assistive-technology behaviour remain out of scope. |
| MPS Medical Evidence | `A` for ambiguity evidence only | Source and coded screenshots are available to review visible source ambiguity and the preview-only static evidence-status treatment. | This is not resolved parity evidence. True uploaded/not-uploaded mapping, headings, file limits, report wording, upload/remove behaviour, storage, validation, medical rules, privacy/security approval and assistive-technology behaviour remain review-gated. |
| Email Confirmation Modal mobile | `A` for mobile visual review | Source and coded screenshots are available for visual review of mobile bottom-modal layout, close-button placement, email emphasis and action grouping. | Real email delivery, persistence, routing, critical-error handling, production modal behaviour, focus behaviour with assistive technology and approval/conformance claims remain out of scope. |
| Radio Button Card States | `A` for screenshot-backed review, concept-gated | Source and desktop/mobile coded screenshots are available for visual review of card layout, spacing, selected/error treatment and responsive stacking. | The source remains `CONCEPT`. Final pictogram assets, exact selected/hover/focus treatment, production reuse, GEL/TaPaaS approval and assistive-technology behaviour remain review-gated. |

## Decisions needed

Decide whether to:

1. Archive the screenshot pack externally and keep this index as the repo pointer.
2. Commit selected screenshots into the repo as durable review evidence.
3. Keep the repo index-only and regenerate screenshots when needed.

Until that decision is made, `/tmp/tapaas-screenshot-evidence-pack-2026-05-26` should be treated as temporary local evidence.
