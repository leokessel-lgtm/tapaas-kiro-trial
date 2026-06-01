# Validation and control-choice rules

## Status

TaPaaS rule from Clara feedback, with owner-confirmation items for specific component choices and interaction details.

## Principle

Validation should help the customer recover quickly. Control choice should match the information being requested, not the first component Kiro finds.

## Rule: Validation

Validation should:

- trigger at the expected interaction point, usually Continue or Submit for these examples
- show a top error summary
- link from summary errors to the relevant field or control
- show inline errors at the relevant field or control
- keep default and error states structurally consistent
- avoid live validation while typing unless explicitly approved for that field

## Rule: Required fields

Input pages should tell customers what to expect:

- use "All fields must be completed unless marked optional" or an approved equivalent
- do not mix required-field strategies without a reason
- do not invent asterisk patterns unless the transaction or design system uses them

## Rule: Control choice

Use the control that fits the option set and task:

- short mutually exclusive sets may use radio buttons
- longer option sets or sets with an "Other" style option may need a select/dropdown
- dates should include clear format guidance
- help panels or help text should be used where customers may not know where to find the information
- character limits should be visible where a long text response is expected

## Kiro/Codex implementation instruction

Before implementing a field:

1. Identify the expected answer type.
2. Identify whether the field is required, optional or conditional.
3. Choose the control based on the answer type and option count.
4. Add help text or info panel where the customer may need context.
5. Add validation summary and inline error behaviour.
6. Keep customer-facing text separate from designer notes.

## Approved examples

### Error handling

Both source examples support:

- top error summary
- field-level inline error
- summary links that take the customer to the relevant control

### Accessible market permit control choices

TaPaaS examples with owner-confirmation items:

- Market type may use a select/dropdown when there are enough options to justify it.
- Event date should show the expected format, such as DD MM YYYY.
- Support-needs description should be conditional or clearly marked as conditional.
- Character limits and remaining-count behaviour are useful TaPaaS patterns, with reuse subject to owner confirmation.

## Anti-pattern

Do not:

- validate while typing if the expected pattern is validation on Continue
- use radio buttons for a long or uncertain option set
- show only a vague date example without format guidance
- render duplicate support-needs helper lines
- turn character-count behaviour into a GEL claim without confirmation
- use red secondary button styling without approved contrast and component treatment

## Acceptance check

- Error summary appears at the top when errors occur.
- Error summary links target the right control.
- Inline errors appear at the relevant fields.
- Validation timing is intentional and documented.
- Required-field guidance is visible or an approved alternative is used.
- Control choices are justified.
- Red secondary button styling is avoided unless approved and contrast-verified.

## Caveats / owner-confirmation items

- Confirm whether support-needs textarea is hidden until Yes or visible but required only when Yes is selected.
- Confirm market type control choice and option list.
- Confirm date input format and whether a date picker is appropriate.
- Confirm character-count guidance as a TaPaaS pattern before reusing broadly.
- Measure contrast before calling any colour treatment a formal accessibility failure.
