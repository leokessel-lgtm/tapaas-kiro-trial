# Experiment 2 Node Comparison

## Summary

This report compares 4 locally available Figma nodes from the current raw payload. It highlights likely normal/acknowledgement and validation-error state differences for review.

## CTA And Validation Comparison

| Order | Node ID | Node name | Likely CTAs | Likely validation/error evidence | Likely relationship |
|---|---|---|---|---|---|
| 1 | `490:60291` | 1.1A_NOD | Back | None detected | normal-or-acknowledgement-state |
| 2 | `0:9900` | 2.4_NOD | Back | Your form has an error<br>Check the error:<br>Enter a NSW plate number. | validation-error-state |
| 3 | `751:10333` | 2.4_NOD | Back | Your form has an error<br>Check the error:<br>The plate number entered contains more than 6 characters, enter 6 characters or less. | validation-error-state |
| 4 | `751:15260` | 2.4_NOD | Back | Your form has an error<br>Check the error:<br>Enter only numbers and letters. | validation-error-state |

## Per-Node Differences

### 1. 1.1A_NOD

- Source node: `490:60291`
- Shared labels/content with first node: 81
- Only in this node: None detected
- Missing from this node compared with first node: None detected

### 2. 2.4_NOD

- Source node: `0:9900`
- Shared labels/content with first node: 73
- Only in this node: 7 November 2025; Check the error:; Enter a NSW plate number.; Type something; Your form has an error
- Missing from this node compared with first node: 07 November 2025; 13 November 2025; 3456; 417; 83920; ASTRA SEDAN – WHITE – 2016; RRF293; W0L0AHG097G17

### 3. 2.4_NOD

- Source node: `751:10333`
- Shared labels/content with first node: 73
- Only in this node: 7 November 2025; BACH981; Check the error:; The plate number entered contains more than 6 characters, enter 6 characters or less.; Type something; Your form has an error
- Missing from this node compared with first node: 07 November 2025; 13 November 2025; 3456; 417; 83920; ASTRA SEDAN – WHITE – 2016; RRF293; W0L0AHG097G17

### 4. 2.4_NOD

- Source node: `751:15260`
- Shared labels/content with first node: 68
- Only in this node: 7 November 2025; 84912093956525278; B@C981; Check the error:; Enter only numbers and letters.; Type something; Your form has an error
- Missing from this node compared with first node: 07 November 2025; 1234567; 13 November 2025; 3456; 417; 4S4BP61C95712; 6456; 83920; 890; ASTRA SEDAN – WHITE – 2016; Billing number:; RRF293

## Unknowns Requiring Confirmation

- Designer confirmation: whether selected nodes are normal states, error states or separate pages.
- Engineer confirmation: whether extracted labels map to TaPaaS blocks, fields, validation or shell content.
- Prototype confirmation: whether CTAs have explicit cross-page targets outside the selected raw evidence.
- Content confirmation: whether shared or differing text is approved wording or design draft content.
