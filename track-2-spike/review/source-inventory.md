# Track 2 Source Inventory

## TLDR

This is a selected-node extraction, not a full transaction extraction.

The current local evidence contains 2 selected Figma nodes from the `NOD Production` payload:

1. `490:60286` / `0.1D_NOD`
2. `751:10322` / `2.4_NOD`

Both selected nodes are Figma `FRAME` nodes. The safest engineering review label is that they are page/state candidates, likely representing Privacy acknowledgement normal and validation-error states. They are not confirmed transaction pages from the available evidence.

## Source Evidence Inspected

- `outputs/raw/figma-node-response.json` as local ignored evidence only
- `outputs/normalised/extracted-evidence.json`
- `outputs/02-design-ir.json`
- `outputs/03-component-map.csv`
- `outputs/04-flow-map.json`
- `outputs/05-schema-candidate.pseudo.json`
- `outputs/06-gap-report.md`
- `outputs/07-node-comparison.md`

## Extraction Boundary

| Question | Answer |
|---|---|
| Full transaction extracted? | No |
| Selected-node extraction? | Yes |
| Source node count | 2 |
| Confirmed transaction page count | Unknown |
| Safe review framing | 2 selected Figma nodes interpreted as likely Privacy acknowledgement normal/error states |
| Production readiness claim | None |
| TaPaaS schema compatibility claim | None |

## Selected Source Nodes

| Source order | nodeId | nodeName | nodeType | Top-level parent / section | Looks like | Confidence | Safe label for Glen |
|---:|---|---|---|---|---|---|---|
| 1 | `490:60286` | `0.1D_NOD` | `FRAME` | Not available in normalised output; raw payload returns this as a selected document node in `NOD Production` | State candidate, possibly a Privacy acknowledgement normal state | Medium | Selected Figma node: likely Privacy acknowledgement normal state candidate |
| 2 | `751:10322` | `2.4_NOD` | `FRAME` | Not available in normalised output; raw payload returns this as a selected document node in `NOD Production` | State candidate, likely a Privacy acknowledgement validation-error state | Medium | Selected Figma node: likely Privacy acknowledgement validation-error state candidate |

## Per-Node Notes

### 1. `490:60286` / `0.1D_NOD`

- Type: `FRAME`
- Source order: 1
- Raw payload file name: `NOD Production`
- Raw node envelope name/type: `0.1D_NOD` / `FRAME`
- Normalised text count: 75
- Normalised instance count: 73
- Generated flow role: `normal-or-acknowledgement-state`
- Generated schema title candidate: `Privacy`
- Visible content evidence includes:
  - `Submit a notice of disposal for a vehicle`
  - `Privacy`
  - `Privacy collection notice`
  - `Terms and conditions`
  - `I accept the terms and conditions for Notice of Disposal`
  - `Continue`
  - `Exit`
- Validation evidence: none detected in the node comparison.
- Classification evidence: the extracted content and component map include Privacy notice, Terms and conditions, an acknowledgement checkbox candidate and Continue/Exit controls.
- Why not a confirmed page: the selected node is a frame with page-like content, but the extraction does not prove it is a standalone transaction page or its intended route in the full flow.

### 2. `751:10322` / `2.4_NOD`

- Type: `FRAME`
- Source order: 2
- Raw payload file name: `NOD Production`
- Raw node envelope name/type: `2.4_NOD` / `FRAME`
- Normalised text count: 87
- Normalised instance count: 86
- Generated flow role: `validation-error-state`
- Generated schema title candidate: `Privacy`
- Visible content evidence includes:
  - `Submit a notice of disposal for a vehicle`
  - `Privacy`
  - `Privacy collection notice`
  - `Terms and conditions`
  - `I accept the terms and conditions for Notice of Disposal.`
  - `Continue`
  - `Exit`
- Validation evidence includes:
  - `Your form has an error`
  - `Check the error:`
  - `Accept the Terms and conditions to continue.`
- Classification evidence: the second node shares most content with the first node and adds validation/error text tied to the terms acknowledgement.
- Why not a confirmed page: the extracted evidence supports a likely error-state variant, but it does not prove designer intent, route identity, or transaction-page status.

## Safe Component Mapping Language

The current component map can be discussed as candidate mapping only:

| Candidate | Evidence | Status |
|---|---|---|
| `PrivacyNoticeCandidate` | Privacy collection notice and terms content extracted from both selected nodes | Candidate/inferred until Glen confirms TaPaaS block catalogue fit |
| `CheckboxFieldCandidate` | Acknowledgement label and validation message appear in selected nodes | Candidate/inferred until Glen confirms schema field and validation model |
| `PageHeaderCandidate` | Header and page title content detected | Candidate/inferred; may be shell/content rather than transaction schema |
| `ProgressStepCandidate` | Progress stepper instances detected | Candidate/inferred; schema ownership unknown |
| `LayoutOrContentCandidate` | Header, nav, logos, icons, search, footer and spacing instances detected | Candidate/inferred; may not belong in generated transaction schema |

## Do Not Overclaim

- Do not say the spike extracted a full Notice of Disposal transaction.
- Do not say the spike extracted 2 confirmed transaction pages.
- Do not say the selected nodes prove the transaction order.
- Do not say the selected nodes prove normal-to-error behaviour.
- Do not say the Continue CTA target is known.
- Do not say the payload proves TaPaaS schema compatibility.
- Do not say the payload proves backend integration, OpenAPI mapping or persistence behaviour.
- Do not say the content is approved privacy, legal or terms wording.
- Do not say the implementation is production ready.
- Do not say the design has accessibility, privacy, legal, GEL or TaPaaS approval.

## Safe Glen Framing

Send this as a compact engineering review candidate:

> We extracted 2 selected Figma nodes from the current NOD payload. They appear to be page/state candidates for a Privacy acknowledgement step: one likely normal state and one likely validation-error state. We need Glen to confirm whether the candidate Privacy notice, acknowledgement checkbox, validation error and shell elements map to TaPaaS schema concepts, and which parts should be ignored as inherited app chrome.

