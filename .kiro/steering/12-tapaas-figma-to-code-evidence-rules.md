# TaPaaS Figma-to-code evidence rules

Use Figma as structured evidence, not pixel-only inspiration.

## Before coding

Confirm:

- component or template name
- source Figma file
- source node ID where available
- purpose
- anatomy
- required states
- content rules
- accessibility notes
- designer documentation notes
- developer documentation notes
- sub-component relationships
- unknowns
- component-template relationships from `docs/tapaas/05-component-template-relationship-map.md`

## Evidence sources

Use evidence in this order:

1. Source-backed GEL evidence in `docs/source-evidence/gel-components/` or `docs/source-evidence/gel-progress-stepper/`
2. Live Figma MCP evidence from the user's personal-copy TaPaaS files, where available
3. TaPaaS extracted evidence in `docs/source-evidence/tapaas-design-library/`
4. Local `.fig` parse evidence in `docs/tapaas/`

Personal-copy Figma MCP evidence is useful for trial extraction, but it is not official design sign-off.

## During coding

- Map coded components back to Figma source nodes.
- Keep implementation smaller than the Figma design system.
- Use semantic HTML before visual polish.
- Prefer existing GEL preview components.
- Do not invent unsupported variants.
- If a Figma page has `Component`, `Sub-components`, `Designer documentation`, `Developer documentation` and `Accessibility annotations`, inspect all relevant sections before changing code.
- If Figma says a pattern is a GEL component with custom content, do not rebuild a new TaPaaS component. Use or extend the source-backed GEL preview pattern.
- If Figma says a page or component is `CONCEPT`, do not promote it to `build-tested` or `GEL-aligned` without coded evidence and review.
- If Figma says a page or component is `READY FOR BUILD` or `BUILT`, still keep the trial review gate. That status is design evidence, not production approval.

## After coding

Record:

- output produced
- tests run
- what worked
- what failed
- accessibility issues
- engineering issues
- steering changes needed
- next action

## Evidence boundary

Local `.fig` parsing is draft evidence. Use live Figma MCP confirmation before claiming implementation readiness.

If Figma MCP rate limits block a deep extraction, record the inventory as confirmed and mark the missing annotations, states or relationships as pending. Do not fill gaps by inference.

## Mobility Parking Scheme boundary

The Mobility Parking Scheme Figma file is useful evidence for transaction complexity, but it includes identity proofing, eligibility, medical evidence, concessions, backend validation and assessment wording.

For any MPS-inspired skeleton:

- use mock data only
- do not implement proof-of-identity flows
- do not implement real eligibility logic
- do not implement medical-document upload
- do not implement concession-card validation
- do not implement backend error codes without source-confirmed rules
- do not implement real payment, receipt, refund or reconciliation behaviour
- mark privacy, legal, identity, eligibility, medical, concession, assessment and timeframe content as owner-confirmation required

If the skeleton needs to test delivery complexity, use mock routing states only. Acceptable mock states include manual review, payment failed, payment cancelled, concession invalid, concession mismatch and concession duplicate. These states must be labelled as simulated and must not include real backend error codes or policy rules.
