# Next steps card evidence note

| Field | Value |
|---|---|
| component | `NextStepsCardPreview` |
| candidate_discovery_mode | `manual-user-selected-from-guidance` |
| implementation_evidence_mode | `live-figma-mcp-targeted-node` |
| source_file | `Components - TaPaaS Design Library (Copy)` |
| source_page | `Next steps card` |
| source_page_node | `10:1862` |
| source_component_set | `11:4848` |
| anatomy | Bordered card, optional illustrative icon, `Next steps` heading, 2 to 5 repeated item rows, optional numbered step rail, item heading and body text. |
| states_variants | Viewport `768+` and `0-767`; rows `2`, `3`, `4`, `5`; step numbers `On` and `Off`. No interactive states evidenced. |
| behaviour | Static post-submit guidance only. Links, routing, notification timing and service outcomes are not implemented. |
| classification | `TaPaaS-specific` |
| maturity | `coded-preview` |
| validation_status | `build-tested` |
| implementation_boundary | Preview-only confirmation/post-submit guidance. Uses mock/static content for unconfirmed service facts. |
| unknowns | Final service-specific wording; whether item bodies may contain links; exact pictogram asset mapping; mobile pixel parity; assistive-technology behaviour; owner-approved use in real confirmation pages. |
| review_reason | `engineer`, `accessibility`, `owner` |

## Suitability gate

- Bounded enough to extract: yes, targeted component set `11:4848`; page node `10:1862` was broader source context only.
- Transaction-build value: high, because the component supports confirmation and post-submit next-step guidance.
- Anatomy: clear card, heading, optional icon, repeated rows, optional step numbers.
- States/variants: limited and evidenced through variant properties.
- Unsupported business logic: excluded. No legal, policy, eligibility, payment, identity, fraud, medical or privacy logic added.

## Notes

- Current selected node was not exposed through Figma selection state, so implementation used targeted live MCP extraction of the bounded component set and representative variant.
- Source page `10:1862` resolves as a page-like node and should not be used as the component implementation boundary.
- The 2026-05-24 fidelity tuning pass replaced the CSS-drawn placeholder icon with an inline preview pictogram, aligned the desktop/mobile icon sizing closer to source evidence, and kept step content mock/static.
- The preview component is suitable for Storybook and mock confirmation screens, but is not approved for production use.
