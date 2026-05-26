# Experiment 2 Node Comparison

## Summary

This report compares 3 locally available Figma nodes from the current raw payload. It highlights likely normal/acknowledgement and validation-error state differences for review.

## CTA And Validation Comparison

| Order | Node ID | Node name | Likely CTAs | Likely validation/error evidence | Likely relationship |
|---|---|---|---|---|---|
| 1 | `490:60286` | 0.1D_NOD | Continue | None detected | normal-or-acknowledgement-state |
| 2 | `490:60291` | 1.1A_NOD | Back | None detected | normal-or-acknowledgement-state |
| 3 | `531:23422` | NOD review - Individual | Back<br>Submit | None detected | normal-or-acknowledgement-state |

## Per-Node Differences

### 1. 0.1D_NOD

- Source node: `490:60286`
- Shared labels/content with first node: 61
- Only in this node: None detected
- Missing from this node compared with first node: None detected

### 2. 1.1A_NOD

- Source node: `490:60291`
- Shared labels/content with first node: 52
- Only in this node: 07 November 2025; 1234567; 13 November 2025; 16 - md; 3456; 417; 4S4BP61C95712; 6456; 83920; 890; ADC74M; ASTRA SEDAN – WHITE – 2016
- Missing from this node compared with first node: Continue; I accept the terms and conditions for Notice of Disposal; Notifications; Privacy collection notice; Service NSW delivers this service on behalf of Transport of NSW and some personal information will be shared with them. To learn how your personal information is handled, visit the Notice of Disposal privacy statement     and Terms and Conditions and call 13 77 88.; Terms and conditions; These are the Terms and Conditions    .; Type something; We will send you an email with the details of your notice of disposal after you complete and submit this form online.

### 3. NOD review - Individual

- Source node: `531:23422`
- Shared labels/content with first node: 53
- Only in this node: $0.00; $20,000; *; 07 November 2025; 12/01/2025; 12345678; 56 - xxxl; 84912093956525278; ADC74M; Back; Buyer details; Content
- Missing from this node compared with first node: Continue; I accept the terms and conditions for Notice of Disposal; Privacy collection notice; Service NSW delivers this service on behalf of Transport of NSW and some personal information will be shared with them. To learn how your personal information is handled, visit the Notice of Disposal privacy statement     and Terms and Conditions and call 13 77 88.; Terms and conditions; These are the Terms and Conditions    .; Type something; We will send you an email with the details of your notice of disposal after you complete and submit this form online.

## Unknowns Requiring Confirmation

- Designer confirmation: whether selected nodes are normal states, error states or separate pages.
- Engineer confirmation: whether extracted labels map to TaPaaS blocks, fields, validation or shell content.
- Prototype confirmation: whether CTAs have explicit cross-page targets outside the selected raw evidence.
- Content confirmation: whether shared or differing text is approved wording or design draft content.
