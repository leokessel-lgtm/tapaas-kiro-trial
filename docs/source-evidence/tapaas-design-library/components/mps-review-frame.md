# MPS review frame evidence note

| Field | Value |
|---|---|
| component | `MpsReviewFramePreview` |
| candidate_discovery_mode | `selection-guidance` |
| implementation_evidence_mode | `live-figma-mcp-targeted-node` |
| source_file | `Mobility_Parking_Scheme.sketch 1 (Master @ 509b60a) (Copy)` |
| source_page | `MPS Final` |
| source_frame | `6.A - Review` |
| source_node | `0:33185` |
| anatomy | Page header/progress context, `Review your application` heading, required-field hint, important in-page notification, three visible review sections, section edit buttons, Figma-faithful checked declaration checkbox area with 32px custom preview boxes, primary/back-style CTA group and footer relationship. |
| states_variants | Single review frame extracted. Other review variant `6.B - Review without non permit declaraction` remains unresolved. |
| behaviour | Edit actions use visible `Edit` button text with unique accessible names per section and are visually aligned with their section block. Edit routes and submit/back/exit actions are preview callbacks only. Declaration checkboxes are checked, read-only preview controls with custom visual markers. No route editing, persistence, validation or real submission is implemented by this component. |
| classification | `TaPaaS-specific transaction frame pattern` |
| maturity | `coded-preview` |
| validation_status | `build-tested` |
| implementation_boundary | Preview-only bounded review content-frame layout. Declaration checkbox and edit-action visual fidelity improved against node `0:33185`, but this is not full-frame chrome/footer or mobile parity. The declaration evidence helper is screen-reader-only and not shown as frame content. No identity, eligibility, medical, concession, payment, legal, privacy, policy or backend logic. No legal/policy wording is confirmed. |
| unknowns | Exact source text, final legal/privacy text, checkbox state and validation semantics, edit route destinations, whether all sections are mandatory, detailed `6.B` variant rules, mobile source parity, full-frame chrome/footer parity, owner-approved legal/privacy content, final accessibility behaviour with assistive technology. |
| review_reason | `engineer`, `accessibility`, `owner`, `policy`, `privacy` |

## Suitability gate

- Bounded enough to extract: yes, one supplied Figma frame.
- Transaction-build value: high, because it maps the MPS candidate to the review template and current MPS simulation.
- Anatomy: clear enough for preview layout.
- States/variants: one frame evidenced; alternate review variant unresolved.
- Unsupported business logic: excluded and marked unresolved.

## Notes

- The component preserves the frame-level order: review heading, required-field hint, callout, application details, personal details, concession card details, checked declaration checkbox area and transaction actions.
- The broader MPS review frame remains source evidence. The reusable preview pattern is limited to layout, review sections and declaration checkbox structure.
- Declaration checkboxes are preview-only and checked by default. The visual checkbox box/check treatment is locally styled for Figma fidelity while preserving native checkbox semantics. They do not persist acceptance or block submission.
- Edit controls do not route. Visible text follows the Figma `Edit` button treatment, visual width/height/colour is closer to the source frame, and accessible names remain unique per review section.
- The evidence/helper note under the declaration is kept out of the visible fidelity story and remains in evidence documentation/screen-reader description only.
- Content is mock/placeholder only until service owners confirm wording and rules.
- Treat the current story as bounded source review, not a full-frame parity claim.
