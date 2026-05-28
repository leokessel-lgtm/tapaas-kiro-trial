# Experiment 5 Validation Page Candidate Ranking

## TLDR

Best current candidate for Glen's validation-focused config test:

```text
490:60291,0:9900,751:10333,751:15260
```

Use `490:60291` as the normal Vehicle details input page candidate and the three related Vehicle details validation/error state candidates as the first validation export set.

`531:11036` / `NOD Input: Sale and buyer details - default` is a strong domain-fit candidate for sale, buyer, date and amount fields, but the current local evidence does not expose a related validation/error state for it. It should be the next target if Glen specifically wants sale/buyer field validation rather than plate/billing validation.

## Evidence Basis

- Source inventory: `track-2-spike/outputs/08-file-page-inventory.json`
- Human inventory: `track-2-spike/outputs/09-file-page-inventory.md`
- Ignored local evidence only: `track-2-spike/outputs/raw/figma-file-inventory.json`
- Ignored local evidence only: `track-2-spike/outputs/raw/figma-node-response.json`
- Current Track 2 review artefacts under `track-2-spike/review/`

No MCP or live Figma call was used.

## Candidate Ranking

| Rank | nodeId | nodeName | nodeType | Parent section/path if known | Candidate role | Confidence | State classification | Why useful for Glen | Visible fields | Visible validation messages | Warning flags |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `490:60291` | `1.1A_NOD` | FRAME | `490:23907` / Vehicle details | Normal Vehicle details input page candidate | High for normal input page; medium for page confirmation | Normal input page | Best current normal page to pair with visible validation states. It contains a user-entered plate/billing search input and already has related validation/error siblings documented under Vehicle details. | `Enter a NSW plate number`; `NSW plate number or billing number`; `Billing number:`; vehicle cards; `Select vehicle`; `Find vehicle`; `Back`; `Exit` | None detected in this normal frame | Full page chrome included; exact default-vs-list state still needs design confirmation; not a confirmed TaPaaS page. |
| 2 | `0:9900` | `2.4_NOD` | FRAME | `490:23907` / Vehicle details -> `751:10331` / Front end validation errors | Related Vehicle details validation/error state candidate | Medium | Validation-error state | Useful as a required-field example for the same Vehicle details path. Existing review notes say it contains an error summary and plate-number validation copy. | Plate/billing search field inferred from Vehicle details validation group | `Your form has an error`; `Check the error:`; `Enter a NSW plate number.` | Error-state frame, not a normal page; node ID comes from existing review artefact, not the current raw node response; needs fresh export before Glen config generation. |
| 3 | `751:10333` | `2.4_NOD` | FRAME | `490:23907` / Vehicle details -> `751:10331` / Front end validation errors | Related Vehicle details validation/error state candidate | Medium | Validation-error state | Useful as a length validation example for the same Vehicle details path. Existing review notes say it contains error summary text and length validation copy. | Plate/billing search field inferred from Vehicle details validation group | `Your form has an error`; `Check the error:`; length validation copy | Error-state frame, not a normal page; exact message needs fresh export confirmation; not a confirmed TaPaaS page. |
| 4 | `751:15260` | `2.4_NOD` | FRAME | `490:23907` / Vehicle details -> `751:10331` / Front end validation errors | Related Vehicle details validation/error state candidate | Medium | Validation-error state | Useful as a character-format validation example for the same Vehicle details path. Existing review notes say it contains error summary text and character validation copy. | Plate/billing search field inferred from Vehicle details validation group | `Your form has an error`; `Check the error:`; character validation copy | Error-state frame, not a normal page; exact message needs fresh export confirmation; not a confirmed TaPaaS page. |
| 5 | `531:11036` | `NOD Input: Sale and buyer details - default` | FRAME | `Document / Production screens`; likely Disposal details / Sale and buyer details path | Sale and buyer details normal input candidate | Medium | Normal input/details page or component variant | Strongest domain-fit for Glen if he wants date, amount, licence and buyer/seller detail fields. It appears to be the exact kind of user-entered details page requested. | Expected from name and related review evidence: `Date of sale`; `Sale price or market value`; `NSW Driver Licence`; `Family name`; buyer details | None visible in current local raw evidence for this node | Current file inventory shows it as a tiny/possibly component-like frame; current raw node response does not include this node's full text; no related validation/error state identified locally yet. |
| 6 | `490:60298` | `Disposal details` | SECTION | `Document / Production screens` | Parent section for sale/disposal details exploration | Medium-low | Parent section, not a clean page | Useful only as a search area for child frames under Disposal details if a fresh inventory/export is run. | Unknown from current local evidence | Unknown from current local evidence | Parent SECTION is too broad for Glen config generation; do not use directly unless no narrower page frame can be found. |
| 7 | `772:18265` | `Back end validation errors` | SECTION | `Document / Production screens` | Backend validation example candidate | Low | Backend error example / validation section | Could help Glen reason about backend validation patterns only if no page-level error state is suitable. | Unknown | Backend validation examples, exact messages not visible in current summary | Do not select first; backend-only section, likely not a page-level input state. |
| 8 | `773:19390` | `Back end validation errors` | SECTION | `Document / Production screens` | Backend validation example candidate | Low | Backend error example / validation section | Same as above. | Unknown | Backend validation examples, exact messages not visible in current summary | Do not select first; backend-only section, likely not a page-level input state. |
| 9 | `773:19836` | `Back end validation errors` | SECTION | `Document / Production screens` | Backend validation example candidate | Low | Backend error example / validation section | Same as above. | Unknown | Backend validation examples, exact messages not visible in current summary | Do not select first; backend-only section, likely not a page-level input state. |

## Recommended Validation Export

Use this first export set:

```text
490:60291,0:9900,751:10333,751:15260
```

Why:

- It pairs one normal input/details page with related validation/error states.
- It avoids backend-only validation examples.
- It gives Glen multiple validation rule styles on one page family:
  - required-field validation
  - length validation
  - character/format validation
  - error-summary handling
- It keeps validation evidence tied to a real user input field: NSW plate number or billing number.

## Secondary Export If Glen Wants Sale/Buyer Field Rules

Use this as a follow-up target:

```text
531:11036
```

Then inspect the refreshed local evidence for sibling error states under Disposal details or Sale/buyer details before preparing a Glen-facing validation config pack.

Reason:

- `531:11036` is the best named candidate for sale details and buyer-entered details.
- The current local evidence does not prove a related validation/error state for it.
- It should not be paired with unrelated Vehicle details validation states unless clearly labelled as a cross-page validation comparison.

## Do Not Overclaim

- These are candidate/inferred selections only.
- Do not claim they are confirmed TaPaaS pages.
- Do not claim the error states are confirmed runtime states.
- Do not claim backend validation contract, routing, persistence or API behaviour.
- Do not claim production readiness, TaPaaS schema compatibility, accessibility approval, privacy/legal approval, GEL approval or TaPaaS approval.

## Live Fetch Needed Next?

Yes, for the recommended export set. The current raw node response only contains:

- `490:60286`
- `490:60291`
- `531:23422`

It does not currently include `0:9900`, `751:10333`, `751:15260` or `531:11036` as expanded selected-node payloads. A live Figma REST fetch is needed next if Glen needs the exact validation messages and field-level evidence for config generation.

