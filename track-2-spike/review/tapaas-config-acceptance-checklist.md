# TaPaaS Config Acceptance Checklist

Use this checklist to judge the first-run config-generation output.

## Structure

- [ ] All selected input candidates appear in the config.
- [ ] Page order is preserved.
- [ ] Page -> section -> block hierarchy is preserved.
- [ ] No page with sections has blocks flattened directly under the page.
- [ ] Each page has at least one section unless explicitly marked shell-only.
- [ ] Each section has at least one block or explicit Unknown placeholder.

## Mapping

- [ ] CTAs are represented separately from content blocks.
- [ ] Validation evidence is not mixed into normal field labels.
- [ ] Shell/global content is excluded or marked inherited.
- [ ] Privacy and legal content remains marked as requiring owner confirmation.
- [ ] Review INSTANCE caveat is preserved.
- [ ] Unknowns remain unknown rather than invented.

## Output Boundary

- [ ] Output does not claim production readiness.
- [ ] Output does not claim backend integration.
- [ ] Output does not claim TaPaaS schema compatibility.
- [ ] Output does not claim accessibility approval.
- [ ] Output does not claim privacy or legal approval.
- [ ] Output does not claim GEL approval.
- [ ] Output does not claim TaPaaS approval.

## Gap Report

- [ ] Gap report lists Unknown schema concepts.
- [ ] Gap report lists missing block or field mappings.
- [ ] Gap report lists shell/global handling decisions.
- [ ] Gap report lists CTA target or routing unknowns.
- [ ] Gap report lists validation/error unknowns.
- [ ] Gap report repeats the Review INSTANCE caveat.
- [ ] Gap report identifies owner-confirmation needs for privacy, legal, accessibility, GEL and TaPaaS decisions.

