# MPS medical evidence status evidence note

| Field | Value |
|---|---|
| component | `MpsMedicalEvidenceStatusPreview` |
| candidate_discovery_mode | `selection-guidance` |
| implementation_evidence_mode | `live-figma-mcp-targeted-node` |
| source_file | `Mobility_Parking_Scheme.sketch 1 (Master @ 509b60a) (Copy)` |
| source_page | `MPS Final` |
| source_frames | `4.A - Medical certificate`, `4.Aa - Medical certificate uploaded`, `4.B - Medical report`, `4.Ba - Medical report uploaded` |
| source_context_nodes | certificate: `0:17316`, `0:17333`; report: `0:17357`, `0:17370` |
| implementation_boundary_nodes | certificate: `0:17327` static uploaded/provided evidence display, `0:17344` static upload requirement area, `0:17351` important medical-document guidance; report: `0:17369` static requirement area, `0:17381` uploaded/static file group, `0:17384` static file name, `0:17385` visible remove-file text, `0:17386` report guidance |
| anatomy | Page title context, step indicator, required-field hint, medical document heading, important guidance callout, evidence requirement/status area and static mock file-name display. |
| states_variants | Certificate and report variants, each with required/not-provided and provided/static mock-file states. |
| behaviour | Static status display only. No upload, remove-file, storage, validation, virus scanning, backend integration or medical assessment behaviour. |
| classification | `TaPaaS-specific evidence-status pattern` |
| maturity | `coded-preview` |
| validation_status | `build-tested` |
| implementation_boundary | Preview-only evidence-status pattern composed from `EvidenceChecklistCard` and `InPageAlert`. Uses static mock file names only. Does not implement a general file-upload component. |
| source_inconsistency | Certificate frames remain inconsistent: `4.A` is named Medical certificate but visually shows a selected file row and Remove file; `4.Aa` is named Medical certificate uploaded but visually shows an upload/drop-zone style state; file constraints differ between 5 MB and 4 MB; `4.Aa` heading appears to say Eligibility. Report frames map more cleanly to not-uploaded/uploaded states, but `4.B` says section A and B while `4.Ba` says sections 2 and 3, and both report frames appear under an Eligibility heading. These remain review-gated and are not resolved in code. |
| unknowns | Final medical evidence wording, true uploaded/not-uploaded state mapping, report section wording, file type and file-size rules, upload/remove behaviour, assistive-technology behaviour, owner-approved service content and privacy/security handling. |
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
- The mock file names `medicalcertificate_april2020.png` and `medicalreport_april2020.png` are source-derived display evidence only.
- The pattern does not confirm file limits, accepted formats or medical evidence policy.
