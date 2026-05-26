# Track 2 Page/State Map

## TLDR

This is a human-readable map of the current selected-node extraction. It should be described as 2 selected Figma nodes interpreted as likely Privacy acknowledgement normal/error states, not as 2 confirmed transaction pages.

## Extraction Status

| Item | Status |
|---|---|
| Full transaction extracted | No |
| Selected-node extraction | Yes |
| Source node count | 2 |
| Confirmed transaction page count | Unknown |
| Page/state candidate count | 2 |
| Production ready | No |
| TaPaaS schema compatibility claim | None |
| Requires TaPaaS engineering review | Yes |

## Node Role Map

| Source order | Node ID | Node name | Node type | Likely role | Confidence | Confirmed page? | Confirmed state variant? |
|---:|---|---|---|---|---|---|---|
| 1 | `490:60286` | `0.1D_NOD` | `FRAME` | Privacy acknowledgement normal-state candidate | Medium | No | No |
| 2 | `751:10322` | `2.4_NOD` | `FRAME` | Privacy acknowledgement validation-error-state candidate | Medium | No | No |

## Node 1: `490:60286` / `0.1D_NOD`

Likely role: Privacy acknowledgement normal-state candidate.

Evidence:

- Visible Privacy step/title evidence: `Privacy`
- Privacy and terms content detected.
- Acknowledgement label detected: `I accept the terms and conditions for Notice of Disposal`
- CTA evidence: `Continue`
- No validation/error text detected in the node comparison.
- The flow map labels the role as `normal-or-acknowledgement-state`.

Unknowns:

- Whether this is a confirmed transaction page.
- Whether this is a confirmed state variant.
- Continue target.
- Whether shell content belongs in TaPaaS schema output.
- Backend request/response mapping.

## Node 2: `751:10322` / `2.4_NOD`

Likely role: Privacy acknowledgement validation-error-state candidate.

Evidence:

- Shares Privacy and terms content with `490:60286`.
- Error summary/title detected: `Your form has an error`
- Error summary copy detected: `Check the error:`
- Validation message detected: `Accept the Terms and conditions to continue.`
- CTA evidence: `Continue`
- The flow map labels the role as `validation-error-state`.

Unknowns:

- Whether this is a confirmed transaction page.
- Whether this is a confirmed state variant.
- Whether this is the only error state.
- Continue target and recovery behaviour.
- Backend validation model.

## Inferred Relationship

The two selected nodes appear to be related because they share the same Privacy acknowledgement structure and differ mainly by validation/error content. The safest relationship label is:

> likely normal/error state pair for a Privacy acknowledgement page/state candidate

This remains inferred until Maddy, Michael or the source design owner confirms the design intent.

## What I Can Safely Send Glen

- A compact selected-node summary.
- Source node IDs and names:
  - `490:60286` / `0.1D_NOD`
  - `751:10322` / `2.4_NOD`
- A page/state candidate map, not a confirmed page map.
- Candidate component/block mappings:
  - `PrivacyNoticeCandidate`
  - `CheckboxFieldCandidate`
  - `PageHeaderCandidate`
  - `ProgressStepCandidate`
  - `LayoutOrContentCandidate`
- Explicit unknowns:
  - TaPaaS schema shape is unknown.
  - CTA targets are unknown.
  - Backend request/response mapping is unknown.
  - Shell ownership is unknown.
  - Content approval status is unknown.
- Specific asks for Glen:
  - Which TaPaaS schema concepts match privacy notice, acknowledgement checkbox and validation error?
  - Which shell elements should be excluded from transaction schema?
  - What minimal schema sample should the spike compare against next?

## What I Should Not Send Glen Yet

- A claim that this is a full Notice of Disposal transaction extraction.
- A claim that there are 2 confirmed transaction pages.
- A claim that `0.1D_NOD` and `2.4_NOD` are confirmed normal/error states.
- Raw Figma JSON.
- A production-ready schema.
- A TaPaaS-compatible schema claim.
- Backend integration, OpenAPI, persistence or validation-contract claims.
- Privacy, legal, accessibility, GEL or TaPaaS approval claims.

