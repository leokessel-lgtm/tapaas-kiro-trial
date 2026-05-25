# MPS medical evidence status evidence note

| Field | Value |
|---|---|
| component | `MpsMedicalEvidenceStatusPreview` |
| candidate_discovery_mode | `selection-guidance` |
| implementation_evidence_mode | `live-figma-mcp-targeted-node` |
| source_file | `Mobility_Parking_Scheme.sketch 1 (Master @ 509b60a) (Copy)` |
| source_page | `MPS Final` |
| source_frames | `4.A - Medical certificate`, `4.Aa - Medical certificate uploaded` |
| source_context_nodes | `0:17316`, `0:17333` |
| implementation_boundary_nodes | `0:17327` static uploaded/provided evidence display, `0:17344` static upload requirement area, `0:17351` important medical-document guidance |
| anatomy | Page title context, step indicator, required-field hint, medical document heading, important guidance callout, evidence requirement/status area and static mock file-name display. |
| states_variants | Required/not-provided and provided/static mock-file states. |
| behaviour | Static status display only. No upload, remove-file, storage, validation, virus scanning, backend integration or medical assessment behaviour. |
| classification | `TaPaaS-specific evidence-status pattern` |
| maturity | `coded-preview` |
| validation_status | `build-tested` |
| implementation_boundary | Preview-only evidence-status pattern composed from `EvidenceChecklistCard` and `InPageAlert`. Uses a static mock file name only. Does not implement a general file-upload component. |
| source_inconsistency | `4.A` is named Medical certificate but visually shows a selected file row and Remove file. `4.Aa` is named Medical certificate uploaded but visually shows an upload/drop-zone style state. File constraints differ between 5 MB and 4 MB. `4.Aa` heading appears to say Eligibility. These remain review-gated and are not resolved in code. |
| unknowns | Final medical evidence wording, true uploaded/not-uploaded state mapping, file type and file-size rules, upload/remove behaviour, assistive-technology behaviour, owner-approved service content and privacy/security handling. |
| review_reason | `engineer`, `accessibility`, `owner`, `privacy`, `policy` |

## Suitability gate

- Bounded enough to preview: yes, as a static evidence-status pattern.
- Bounded enough for real upload: no.
- Transaction-build value: useful for the MPS evidence/medical stage because the current skeleton already uses mock medical evidence status.
- Unsupported behaviour: upload, remove, storage, validation, virus scanning, backend integration, medical assessment and privacy/security approval remain out of scope.

## Notes

- The preview intentionally favours status anatomy over file-input behaviour.
- `EvidenceChecklistCard` is reused as the status summary surface.
- `InPageAlert` is used only for static important-guidance treatment.
- The mock file name `medicalcertificate_april2020.png` is source-derived display evidence only.
- The pattern does not confirm file limits, accepted formats or medical evidence policy.
