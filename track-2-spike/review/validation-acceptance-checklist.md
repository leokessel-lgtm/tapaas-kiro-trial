# Validation Acceptance Checklist

Use this checklist to assess Glen's first-run validation-focused config output.

## Input Coverage

- [ ] Normal input page is included.
- [ ] Validation state nodes are included.
- [ ] All four selected node IDs are preserved or traceable:
  - `490:60291`
  - `0:9900`
  - `751:10333`
  - `751:15260`

## Field And Validation Handling

- [ ] All visible field labels are preserved.
- [ ] Helper text is preserved separately from validation messages.
- [ ] Validation messages are preserved exactly:
  - `Enter a NSW plate number.`
  - `The plate number entered contains more than 6 characters, enter 6 characters or less.`
  - `Enter only numbers and letters.`
- [ ] Validation messages are mapped to correct fields where possible.
- [ ] Unmapped validation messages are retained:
  - `Your form has an error`
  - `Check the error:`
- [ ] Validation rules are separated from normal labels/helper text.
- [ ] Validation messages are not turned into normal content blocks.

## Structure And Boundaries

- [ ] Page -> section -> block hierarchy is preserved.
- [ ] Sections are not flattened.
- [ ] CTAs are represented separately from fields and validation rules.
- [ ] Shell/global content is excluded or marked inherited.
- [ ] Unknown validation concepts remain Unknown rather than invented.
- [ ] No backend/API behaviour is invented.

## Claims

- [ ] Output does not claim production readiness.
- [ ] Output does not claim backend integration.
- [ ] Output does not claim TaPaaS schema compatibility.
- [ ] Output does not claim accessibility approval.
- [ ] Output does not claim privacy/legal approval.
- [ ] Output does not claim GEL approval.
- [ ] Output does not claim TaPaaS approval.

