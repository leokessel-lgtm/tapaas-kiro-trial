# EmailConfirmationModal Evidence Note

| Field | Value |
|---|---|
| component | `EmailConfirmationModal` |
| candidate_discovery_mode | `repo-evidence` |
| implementation_evidence_mode | `live-figma-mcp-targeted-node` |
| source_library | `Templates - TaPaaS Design Library` |
| source_node | `9290:50392` |
| component_frame | `9241:18447` |
| anatomy | Modal title, email confirmation copy with bold email address, close button, secondary `Edit email address`, primary `Send`. |
| states_variants | Desktop centred modal, mobile bottom modal. |
| behaviour | `Send`, `Edit`, `Close` and `Escape` evidenced as modal actions; implemented as preview callbacks only. Reverse and forward tab wrap smoke-tested in preview. |
| classification | `TaPaaS-specific` |
| maturity | `coded-preview` |
| validation_status | `build-tested` |
| implementation_boundary | Preview-only; no email delivery, persistence, transaction routing or critical-error handling. |
| unknowns | Exact GEL modal parity; final focus behaviour with assistive tech; production routing; real email-send behaviour; persistence; critical-error handling; owner-approved content. |
| review_reason | `engineer`, `accessibility`, `owner` |
| anti_claims | Not production-ready; not WCAG-compliant; not GEL-approved; not TaPaaS-approved. |

## Notes

- Current Figma selection was attempted and could not be resolved.
- Candidate selection came from existing active-repo TaPaaS evidence where Email confirmation modal was listed as design-only.
- Implementation evidence came from targeted live Figma MCP extraction of the source node and bounded component frame.
- The preview component is catalogue-ready for designer and engineering review, but not approved for production use.
