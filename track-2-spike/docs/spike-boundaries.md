# Track 2 Spike Boundaries

## Purpose

Track 2 tests whether a small, repeatable Figma API pipeline can capture selected-node evidence in a form that is easier for Kiro/Codex to inspect, compare and turn into reviewable planning artefacts.

## In Scope

- One selected Figma node at a time.
- Raw Figma node capture.
- Normalised node metadata, text, component instances and simple visual anatomy.
- Draft markdown summaries for review.
- Explicit unknowns and review gates.
- Local schemas for checking output shape.

## Out Of Scope

- Production component implementation.
- Storybook integration.
- Transaction skeleton wiring.
- Backend integration.
- Policy, legal, privacy, payment, identity, eligibility, concession, medical or fraud logic.
- Accessibility compliance claims.
- GEL or TaPaaS approval claims.
- Full-file Figma scraping unless separately approved.

## Non-Claims

The spike output is not:

- a production contract
- a source of policy truth
- a WCAG compliance result
- a GEL approval
- a TaPaaS design approval
- a replacement for engineering, accessibility or owner review

## Review Gate

Before any spike output is promoted into main repo docs or preview code, confirm:

- the selected Figma source is correct
- the node scope is narrow enough
- the normalised evidence is readable and faithful
- unknown behaviour is still marked as unknown
- there is a clear preview-only implementation boundary
