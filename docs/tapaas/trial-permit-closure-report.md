# Trial Permit quality-parity closure report

Date: 2026-05-30

## Status

- Closed for Experiment 1 runtime hardening.
- Ready for designer review.
- Not source-complete.
- Not production-like.
- Not final-copy approved.
- Not WCAG, GEL or TaPaaS approval evidence.

## Designer feedback received

Designer feedback identified that Trial Permit had the right broad step order and could work for a simple transaction, but its transaction assembly was not yet good enough as a parity benchmark. The main concerns were page-template structure, component choice, component relationships, review/edit behaviour, CTA hierarchy, confirmation composition, source-copy reuse, validation/error behaviour, accessibility and responsiveness.

Positive behaviours to preserve were also called out:

- correct steps and order
- checkbox component choice where appropriate
- polite alert behaviour for the error summary
- error links to relevant fields
- responsive buttons
- review card stacking content

## Slice summary

| Slice | Scope | Outcome |
|---|---|---|
| Slice 1 | Page template/header/stepper/title structure | Added form header for non-confirmation steps, moved stepper into the header, added transaction label and page title structure, moved error summary below the page title/header, preserved step order. |
| Slice 2 | Component selection and TaPaaS/GEL alignment | Used TaPaaS privacy, review, fees, declaration review, transaction summary and next-steps patterns where supported; separated privacy notice from T&Cs/declaration placeholders. |
| Slice 3 | Review edit relationships and CTA relationships | Added step-level review edit actions, corrected Back/primary action order, changed confirmation action label to a safer post-submit reset label, added permit-type source placeholder. |
| Slice 4 | Validation/error persistence behaviour | Made submitted errors persist while typing and clear/revalidate only on Continue; preserved error-summary links and placement. |
| Slice 5 | Visual parity regression checks | Added regression coverage for secondary CTA class, error-summary structure and review component structure; documented manual visual, contrast and responsive checks. |
| Slice 6A | Figma/MCP and repo evidence audit | Confirmed reusable evidence from TaPaaS/GEL libraries, NOD, MPS and Owner Builder files; no standalone Trial Permit Figma source was found. |
| Slice 6B | Reusable rule promotion into docs | Promoted evidence-backed transaction assembly rules into the Trial Permit control plan, MPS review pack and Storybook architecture guidance. |

## Feedback exhaustion table

| Area | Disposition | Closure summary |
|---|---|---|
| Transaction flow | Fixed; protected | Step order remains `privacy`, `input`, `declaration`, `review`, `confirmation`. This is protected as a positive behaviour. |
| Figma/source fidelity | Source-gated; not promoted | No standalone Trial Permit Figma flow was found. Trial Permit is a simple assembly benchmark, not a source-parity recreation. |
| Page templates | Fixed; documented reusable rule | Form header, transaction label, page title, stepper placement and error-summary placement were hardened and promoted as reusable page-template rules. |
| Component choice | Fixed; documented reusable rule | Privacy card, review info card, review fees card, declaration review, transaction summary and next-steps patterns are used where repo/source evidence supports them. |
| Component relationships | Fixed; documented limitation | Review edit actions route to relevant source steps. Field-level anchors and auto-return-to-review remain deferred. |
| Content | Source-gated | Privacy notice, T&Cs/declaration, permit-type explanation and confirmation copy remain explicit source-required placeholders or owner-gated items. |
| Validation/error handling | Fixed; protected; documented reusable rule | Validation-on-Continue, persistent submitted errors, error links and placement below the page title/header are protected. |
| Accessibility | Protected; manual QA required | Heading/page-title structure, error links and CTA order were improved or protected. WCAG, contrast and assistive-technology claims remain manual-evidence-gated. |
| Responsiveness | Protected; manual QA required | Existing responsive button and review-card stacking behaviours are protected by tests/code inspection. Browser visual QA remains required. |
| Reusability | Documented reusable rule | Slice 6B promoted transaction assembly rules for future transaction batches. Storybook expansion remains future work, not part of this runtime hardening closure. |

## Remaining gates

Keep these explicit and do not treat them as solved by Trial Permit hardening:

- exact Trial Permit privacy notice copy
- exact T&Cs/declaration copy
- exact permit-type explanation
- exact confirmation copy, receipt/reference details and post-submit actions
- whether Trial Permit specifically needs Keep a record/TUTD
- WCAG pass/fail or contrast claims
- assistive technology testing
- approved replacement for suspected deprecated ice-blue token
- field-level edit anchors and auto-return-to-review
- standalone Trial Permit source-Figma parity

## Reusable rules carried forward

- Use TaPaaS templates before generic UI.
- Form header owns transaction label, page title and stepper.
- Privacy notice and T&Cs/declaration are separate.
- Source-required placeholders are better than invented content.
- Review pages need source-context edit actions.
- Review info, fees and declaration review patterns should be used where relevant.
- Transaction CTAs belong at the bottom of transaction pages except confirmation.
- Confirmation uses confirmation-specific CTA and summary/next-step composition.
- Validation-on-Continue and error persistence are preferred for this pattern.
- Error summary stays below page title/header and follows GEL anatomy.
- Error-summary links use dark link treatment, not red error styling.
- Accessibility claims require measured/manual evidence.
- Do not substitute generic UI where TaPaaS/GEL components exist.

## What should not be claimed

- Trial Permit is not source-complete.
- Trial Permit is not production-like.
- Trial Permit copy is not final.
- Trial Permit is not WCAG compliant based on this work.
- Trial Permit is not GEL approved.
- Trial Permit is not TaPaaS approved.
- Trial Permit does not prove privacy, legal or policy approval.
- Keep a record/TUTD is not confirmed as required for Trial Permit.

## What to show designers

Show designers the hardened Trial Permit flow as a simple transaction assembly review surface. Ask them to review:

- page structure and form-header composition
- privacy/T&Cs/declaration separation
- component choice and any remaining generic UI risks
- review edit relationships
- CTA hierarchy and confirmation action semantics
- validation-on-Continue and persistent error behaviour
- confirmation composition and source-specific content gaps
- responsive behaviour and any heading/wrapping issues

## Next-transaction readiness checklist

Before patching the next designer feedback batch:

- Capture the transaction name and source/Figma URLs.
- Capture the designer owner or source reviewer.
- Classify post-its before patching.
- Identify source-backed items, judgement items and unknown items.
- Protect positives before fixing negatives.
- Record source-required placeholders instead of inventing copy, policy or service behaviour.

Patch in slices:

1. Template/page structure.
2. Component selection.
3. Component relationships/CTA semantics.
4. Content/source placeholders.
5. Validation/errors.
6. Responsiveness/accessibility/manual QA.
7. Reusable rules/Storybook/docs.

Promotion rules:

- Promote a reusable rule only when backed by implementation evidence, repo source evidence or Figma/MCP evidence.
- Do not claim final copy without owner-approved source.
- Do not claim accessibility compliance without measured/manual evidence.
- Do not claim production parity without production scope and source evidence.
- Do not claim GEL, TaPaaS, privacy, legal or policy approval without explicit approval evidence.

## Designer-review note

Trial Permit has been hardened using the designer feedback as an Experiment 1 simple transaction assembly benchmark. The runtime now better reflects TaPaaS/GEL page structure, component selection, review/edit relationships, CTA semantics and validation/error behaviour.

Some areas remain deliberately source-gated: exact privacy notice copy, T&Cs/declaration copy, permit-type explanation, confirmation wording, receipt/reference behaviour, post-submit actions and whether Keep a record/TUTD is required for this specific transaction.

Please review the composition, page structure, component choice, CTA semantics, validation/error behaviour and any remaining source-specific content gaps. This is ready for review, but it is not source-complete, final-copy approved, production-like or accessibility/GEL/TaPaaS approval evidence.
