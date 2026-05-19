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
- unknowns

## During coding

- Map coded components back to Figma source nodes.
- Keep implementation smaller than the Figma design system.
- Use semantic HTML before visual polish.
- Prefer existing GEL preview components.
- Do not invent unsupported variants.

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

