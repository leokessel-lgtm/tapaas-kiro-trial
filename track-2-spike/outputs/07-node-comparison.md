# Experiment 2 Node Comparison

## Summary

This report compares 2 locally available Figma nodes from the current raw payload. It highlights likely normal/acknowledgement and validation-error state differences for review.

## CTA And Validation Comparison

| Order | Node ID | Node name | Likely CTAs | Likely validation/error evidence | Likely relationship |
|---|---|---|---|---|---|
| 1 | `490:60286` | 0.1D_NOD | Continue | None detected | normal-or-acknowledgement-state |
| 2 | `751:10322` | 2.4_NOD | Continue | Your form has an error<br>Check the error:<br>Accept the Terms and conditions to continue. | validation-error-state |

## Per-Node Differences

### 1. 0.1D_NOD

- Source node: `490:60286`
- Shared labels/content with first node: 61
- Only in this node: None detected
- Missing from this node compared with first node: None detected

### 2. 2.4_NOD

- Source node: `751:10322`
- Shared labels/content with first node: 58
- Only in this node: Accept the Terms and conditions to continue.; Check the error:; For more information about how we collect, use and disclose your personal information, including who we may disclose it to, check our Privacy Collection notice.; I accept the terms and conditions for Notice of Disposal.; These are the Terms and Conditions     .; Your form has an error
- Missing from this node compared with first node: I accept the terms and conditions for Notice of Disposal; Service NSW delivers this service on behalf of Transport of NSW and some personal information will be shared with them. To learn how your personal information is handled, visit the Notice of Disposal privacy statement     and Terms and Conditions and call 13 77 88.; These are the Terms and Conditions    .

## Unknowns Requiring Confirmation

- Designer confirmation: whether selected nodes are normal states, error states or separate pages.
- Engineer confirmation: whether extracted labels map to TaPaaS blocks, fields, validation or shell content.
- Prototype confirmation: whether CTAs have explicit cross-page targets outside the selected raw evidence.
- Content confirmation: whether shared or differing text is approved wording or design draft content.
