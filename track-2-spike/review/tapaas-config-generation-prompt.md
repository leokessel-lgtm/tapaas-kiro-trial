# TaPaaS Config-Generation Prompt

Paste this prompt with `known-pages-glen-input.json` and Glen's known TaPaaS schema specification.

```text
You are generating an engineering-review TaPaaS config schema candidate from a Design IR input.

Treat the attached JSON as Design IR, not as final TaPaaS schema.

Use Glen's known TaPaaS config schema specification as the target shape. If the Design IR contains evidence but Glen's specification does not define the exact field, block, property or behaviour, mark it as Unknown instead of inventing an exact TaPaaS schema field.

Primary task:
Generate a TaPaaS config schema candidate from the Design IR.

Structural rules:
1. Preserve every selected input page candidate.
2. Preserve page order from the input.
3. Preserve page -> section -> block hierarchy.
4. Do not flatten blocks directly under a page when sections exist in the input or candidate schema evidence.
5. Every page must contain sections unless it is explicitly marked shell-only.
6. Every section must contain blocks or an explicit Unknown placeholder explaining what is missing.
7. Keep CTAs/actions separate from content blocks and field blocks.
8. Keep validation and error evidence separate from normal field labels, content text and help text.
9. Treat shell/global content as inherited or excluded unless Glen's schema explicitly requires shell/global content to be represented.
10. Preserve the Review INSTANCE caveat: the Review page candidate is an INSTANCE, not a clean child FRAME, and requires Glen/Michael confirmation.
11. Preserve privacy and legal content as requiring owner confirmation. Do not treat it as approved wording.
12. Do not infer backend mapping, routing, persistence, validation contracts or API behaviour unless Glen's schema specification explicitly provides it.

Required output:
1. A TaPaaS config schema candidate using Glen's known specification.
2. A short gap report immediately after the config.

Gap report must include:
- Unknown schema concepts.
- Missing block or field mappings.
- Any shell/global content treatment decisions.
- Any CTA target or routing unknowns.
- Any validation/error unknowns.
- The Review INSTANCE caveat.
- Any owner-confirmation needs for privacy, legal, accessibility, GEL or TaPaaS decisions.

Self-check before finalising:
Run the output against the acceptance checklist below and fix any first-run hierarchy problems before providing the final answer.

Acceptance checklist:
- All selected input candidates appear in the config.
- Page order is preserved.
- Page -> section -> block hierarchy is preserved.
- No page with sections has blocks flattened directly under the page.
- Each page has at least one section unless explicitly shell-only.
- Each section has at least one block or explicit Unknown placeholder.
- CTAs are represented separately from content blocks.
- Validation evidence is not mixed into normal field labels.
- Shell/global content is excluded or marked inherited.
- Privacy and legal content remains marked as requiring owner confirmation.
- Review INSTANCE caveat is preserved.
- Unknowns remain unknown rather than invented.
- Output does not claim production readiness, backend integration, TaPaaS schema compatibility, accessibility approval, privacy/legal approval, GEL approval or TaPaaS approval.
```

