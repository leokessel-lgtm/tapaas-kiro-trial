# MPS applicant details frame evidence note

| Field | Value |
|---|---|
| component | `MpsApplicantDetailsFramePreview` |
| candidate_discovery_mode | `sequential-extraction-queue` |
| implementation_evidence_mode | `live-figma-mcp-targeted-node` |
| source_file | `Mobility_Parking_Scheme.sketch 1 (Master @ 509b60a) (Copy)` |
| source_page | `MPS Final` |
| source_frames | `2.A - Personal details`, `2.B - Personal details - Manual address` |
| source_context_nodes | `0:17387`, `0:17405` |
| implementation_boundary_node | Form-content/page-skeleton boundary inside `0:17387` and `0:17405`; global nav, page header and footer excluded. |
| anatomy | Step indicator, `Personal details` heading, required-field hint, first name, last name, date of birth, `Contact details` heading, address search/manual-address variants, email address, phone number, and Cancel/Next actions. |
| field_order | First name; Last name; Date of birth; Contact details; Residential address; Email address; Phone number. Manual-address variant expands Residential address to Unit number, Street number, Street name, Street type, Suburb, State and Postcode. |
| states_variants | Two extracted desktop frames: address-search variant and manual-address variant. Mobile variant, address result list, no-result state and error-summary state remain unresolved. |
| behaviour | Preview callbacks only. Address-mode actions can call `onManualAddress` or `onAddressSearch`; Cancel and Next can call preview callbacks. No real address lookup, identity verification, customer record update, backend persistence, age eligibility, production validation, privacy approval, legal approval or policy approval. |
| classification | `TaPaaS-specific transaction frame pattern` |
| maturity | `coded-preview` |
| validation_status | `build-tested` |
| implementation_boundary | Preview-only mock form capture. Uses local GEL preview Field, Input, Select and native fieldsets for date and manual-address grouping. ManualAddress is mapped as source evidence but not imported as a production component. |
| unknowns | Production address lookup behaviour, result-list/no-result states, error-summary expectations, complete street-type options, state restriction rules, mobile frame variant, assistive-technology behaviour, owner-approved real-service labels/helper text and final DOB input treatment. |
| review_reason | `engineer`, `accessibility`, `owner`, `privacy`, `policy` |

## Suitability gate

- Bounded enough to extract: yes, two supplied MPS frames.
- Transaction-build value: high, because applicant and address capture is a common early/middle transaction assembly stage.
- Anatomy: clear enough for a preview page skeleton.
- States/variants: search-address and manual-address variants are evidenced.
- Unsupported business logic: excluded and marked unresolved.

## Mapping

- TaPaaS Form input template `8410:37703`: strong structural match for focused form page, section headings, required-field hint and grouped fields.
- GEL Field/Input/Select: used for individual controls.
- Date input pattern: used as separate Day / Month / Year fields.
- GEL Manual Address: evidence-aligned shape only; preview composes local Field/Input/Select controls.

## Notes

- The coded preview intentionally excludes global navigation and footer because the active preview app provides the outer shell.
- Address search is a static text input with a manual-entry action only. It does not search, validate or return address results.
- Manual address preserves the extracted field order and required/optional treatment.
- Content is mock/placeholder only until service owners confirm real wording and rules.

