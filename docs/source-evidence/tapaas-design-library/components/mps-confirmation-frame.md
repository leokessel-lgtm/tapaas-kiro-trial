# MPS confirmation frame evidence note

| Field | Value |
|---|---|
| component | `MpsConfirmationFramePreview` |
| candidate_discovery_mode | `selection-guidance` |
| implementation_evidence_mode | `live-figma-mcp-targeted-node` |
| source_file | `Mobility_Parking_Scheme.sketch 1 (Master @ 509b60a) (Copy)` |
| source_page | `MPS Final` |
| source_frame | `6.A Confirmation screen` |
| source_node | `0:33222` |
| anatomy | Page header/global nav context, status check icon, past-tense confirmation heading, short supporting text, application details/reference area, `What happens next?` heading, ordered next-step content, supporting paragraph, feedback prompt and footer relationship. Current preview covers the bounded content-frame anatomy only. |
| states_variants | Single confirmation screen extracted. Tile variant `6.B Confirmation screen with tile` remains unresolved. |
| behaviour | Start-again and feedback actions are preview-only. Feedback buttons set a local aria-live mock acknowledgement only. No receipt, notification, related-transaction routing, analytics, storage or persistence is implemented. |
| classification | `TaPaaS-specific transaction frame pattern` |
| maturity | `coded-preview` |
| validation_status | `build-tested` |
| implementation_boundary | Preview-only confirmation layout. Reference number, timeframe, communication channel and issue outcome are mock/placeholder values. The latest visual cleanup tightens support copy, application details, next-step text density and feedback strip treatment without adding real receipt, notification, feedback capture or related-transaction behaviour. |
| unknowns | Exact heading/supporting text, real reference format, actual next-step wording, real feedback capture behaviour, related transaction tile rules, tile variant, mobile source parity, full-frame chrome/footer parity and final assistive-technology behaviour. |
| review_reason | `engineer`, `accessibility`, `owner`, `policy` |

## Suitability gate

- Bounded enough to extract: yes, one supplied Figma frame.
- Transaction-build value: high, because it maps the MPS outcome to the confirmation template.
- Anatomy: clear enough for preview layout.
- States/variants: one frame evidenced; related tile variant unresolved.
- Unsupported business logic: excluded and marked unresolved.

## Notes

- The component preserves the frame-level order: confirmation status, reference/application details, what-happens-next content, feedback prompt and footer/action relationship.
- Feedback controls are mock-interactive only and do not capture, send, store or analyse feedback.
- The broader confirmation frame remains source evidence. The reusable preview pattern is limited to layout and placeholder transaction content.
- The `6.B Confirmation screen with tile` variant is source-needed before implementation. Do not infer it from `6.A`.
