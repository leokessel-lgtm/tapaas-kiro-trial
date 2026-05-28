# Experiment 5 Validation Page Map

## TLDR

This is a validation-focused candidate pack for Glen, not a full transaction export.

It uses one normal Vehicle details input page candidate and three related validation/error state candidates to test how validation rules can be added into a TaPaaS config file.

Recommended Glen input file:

```text
track-2-spike/review/validation-glen-input.json
```

## Selected Nodes

| Order | Node ID | Node name | Type | Likely role | Confidence | Classification |
|---:|---|---|---|---|---|---|
| 1 | `490:60291` | `1.1A_NOD` | FRAME | Vehicle details normal input page candidate | High for normal input page; medium for page confirmation | Normal input page |
| 2 | `0:9900` | `2.4_NOD` | FRAME | Required-field validation state candidate | Medium | Validation-error state |
| 3 | `751:10333` | `2.4_NOD` | FRAME | Max-length validation state candidate | Medium | Validation-error state |
| 4 | `751:15260` | `2.4_NOD` | FRAME | Allowed-characters validation state candidate | Medium | Validation-error state |

## Field And Validation Map

| Field / content type | Label or text | Source nodes | Classification | Likely rule intent |
|---|---|---|---|---|
| Page title | `Vehicle selection` | All 4 nodes | Heading | Not validation |
| Section heading | `Select the vehicle you sold to continue` | All 4 nodes | Heading/content | Not validation |
| Field label | `Enter a NSW plate number` | All 4 nodes | Field label | Unknown |
| Helper text | `For example ABC123. Do not include spaces or special characters.` | All 4 nodes | Helper text | Pattern-like guidance, inferred only |
| Field label | `NSW plate number or billing number` | All 4 nodes | Field label | Unknown |
| Helper text | `Enter a plate number, for example ABC123, or 8 digit billing number on your renewal notice or Certificate of Registration.` | All 4 nodes | Helper text | Pattern-like guidance, inferred only |
| Validation message | `Enter a NSW plate number.` | `0:9900` | Field-level validation | Required, inferred |
| Validation message | `The plate number entered contains more than 6 characters, enter 6 characters or less.` | `751:10333` | Field-level validation | maxLength, inferred |
| Validation message | `Enter only numbers and letters.` | `751:15260` | Field-level validation | allowedCharacters, inferred |
| Error summary title | `Your form has an error` | `0:9900`, `751:10333`, `751:15260` | Page-level error summary | Unmapped to field |
| Error summary copy | `Check the error:` | `0:9900`, `751:10333`, `751:15260` | Page-level error summary | Unmapped to field |
| CTA | `Find vehicle` | All 4 nodes | CTA/action | Not validation |
| CTA | `Back` | All 4 nodes | CTA/action | Not validation |
| CTA | `Exit` | All 4 nodes | CTA/action | Not validation |

## Why This Is Useful For Glen

- It tests field-level validation without using backend-only validation examples.
- It keeps normal labels, helper text and validation messages separate.
- It gives Glen three visible validation rule candidates:
  - required
  - maxLength
  - allowedCharacters
- It also includes page-level error summary evidence that may need a different TaPaaS schema concept from field-level validation.

## Unknowns And Review Gates

- Whether these nodes are confirmed pages, component states or validation variants.
- Whether the three `2.4_NOD` frames are the intended error states for `1.1A_NOD`.
- Exact TaPaaS schema property names for pages, sections, blocks, fields, CTAs and validation.
- Whether helper text can inform validation constraints or must remain content only.
- Whether error summary title and copy should be represented separately from field-level validation.
- CTA targets and routing are Unknown.
- Backend/API validation behaviour is Unknown.
- Shell/global content should be excluded or marked inherited unless Glen's schema requires otherwise.
- Accessibility behaviour and error focus handling require TaPaaS engineering/accessibility review.

## Do Not Overclaim

- Do not call this a full transaction export.
- Do not call these confirmed TaPaaS pages.
- Do not claim backend integration or API validation behaviour.
- Do not claim production readiness.
- Do not claim TaPaaS schema compatibility.
- Do not claim accessibility, privacy/legal, GEL or TaPaaS approval.

