# Validation Config-Generation Prompt

Paste this prompt with `validation-glen-input.json` and Glen's known TaPaaS schema specification.

```text
You are generating an engineering-review TaPaaS config schema candidate from a validation-focused Design IR input.

Treat the attached JSON as Design IR, not final TaPaaS schema.

Generate a TaPaaS config schema candidate using Glen's known specification. If Glen's schema does not define an exact property, field, block or validation concept, mark it as Unknown instead of inventing one.

Core rules:
1. Preserve page -> section -> block hierarchy.
2. Do not flatten sections.
3. Preserve field-level validation separately from field labels and helper text.
4. Do not turn validation messages into normal content blocks.
5. Preserve validation messages exactly as visible.
6. Keep page-level error summary messages separate from field-level validation.
7. Keep CTAs separate from content blocks, field blocks and validation rules.
8. Map validation only where Glen's schema supports it.
9. Mark unknown validation concepts as Unknown.
10. Treat shell/global content as inherited or excluded unless Glen's schema requires otherwise.
11. Do not invent backend/API validation behaviour, routing, persistence or request/response mappings.

Validation mapping guidance:
- `Enter a NSW plate number.` is likely a required-field validation message, but keep the rule intent marked as inferred unless Glen's schema confirms the mapping.
- `The plate number entered contains more than 6 characters, enter 6 characters or less.` is likely a maxLength validation message, but keep the rule intent marked as inferred unless Glen's schema confirms the mapping.
- `Enter only numbers and letters.` is likely an allowedCharacters validation message, but keep the rule intent marked as inferred unless Glen's schema confirms the mapping.
- Helper text such as examples or allowed character guidance must remain helper text unless Glen's schema explicitly supports deriving validation rules from helper text.
- `Your form has an error` and `Check the error:` are page-level error summary evidence. Do not map them as field labels.

Required output:
1. A TaPaaS config schema candidate.
2. A short gap report after the config.

The gap report must include:
- Unknown schema concepts.
- Any validation messages that could not be safely mapped.
- Whether page-level error summaries are represented or left Unknown.
- Any shell/global content treatment decisions.
- Any CTA target or routing unknowns.
- Backend/API behaviour explicitly marked Unknown.
- Any accessibility/error-focus review needs.

Before finalising, self-check against this acceptance checklist:
- Normal input page is included.
- Validation state nodes are included.
- All visible field labels are preserved.
- Validation messages are preserved exactly.
- Validation messages are mapped to correct fields where possible.
- Unmapped validation messages are retained.
- Validation rules are separated from normal labels/helper text.
- No backend/API behaviour is invented.
- Shell/global content is excluded or marked inherited.
- Output does not claim production readiness or TaPaaS approval.
```

