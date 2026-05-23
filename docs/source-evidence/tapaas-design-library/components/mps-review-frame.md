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
| anatomy | Page header/progress context, `Review your application` heading, required-field hint, important in-page notification, three visible review sections, section edit buttons, declaration checkbox area, primary/back-style CTA group and footer relationship. |
| states_variants | Single review frame extracted. Other review variant `6.B - Review without non permit declaraction` remains unresolved. |
| behaviour | Edit links and submit/back/exit actions are preview callbacks only. No route editing or real submission is implemented by this component. |
| classification | `TaPaaS-specific transaction frame pattern` |
| maturity | `coded-preview` |
| validation_status | `build-tested` |
| implementation_boundary | Preview-only review layout. No identity, eligibility, medical, concession, payment, legal, privacy, policy or backend logic. |
| unknowns | Exact source text, final content wording, edit route destinations, whether all sections are mandatory, detailed `6.B` variant rules, final accessibility behaviour with assistive technology. |
| review_reason | `engineer`, `accessibility`, `owner`, `policy`, `privacy` |

## Suitability gate

- Bounded enough to extract: yes, one supplied Figma frame.
- Transaction-build value: high, because it maps the MPS candidate to the review template and current MPS simulation.
- Anatomy: clear enough for preview layout.
- States/variants: one frame evidenced; alternate review variant unresolved.
- Unsupported business logic: excluded and marked unresolved.

## Notes

- The component preserves the frame-level order: review heading, required-field hint, callout, application details, personal details, concession card details, declaration and transaction actions.
- The broader MPS review frame remains source evidence. The reusable preview pattern is limited to layout and section playback.
- Content is mock/placeholder only until service owners confirm wording and rules.
