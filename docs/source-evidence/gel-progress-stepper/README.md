# GEL ProgressStepper source evidence

This folder contains a local source-evidence copy of the GEL `progress-stepper` package files used for the TaPaaS x Kiro v0.3 trial.

## Source files

| File | Purpose |
|---|---|
| `ProgressStepper.tsx` | Source component API, markup and status behaviour |
| `ProgressStepper.styled.tsx` | Source styling structure and responsive behaviour |
| `ProgressStepper.mdx` | Source usage guidance, do/don't rules and Figma reference |
| `progress-stepper-evidence.md` | Existing GEL trial evidence note for this component |

## Use in this pack

Use these files as reference evidence only. Do not import these files directly into the trial app.

If implementing a v0.3 preview component, mirror the source-backed API and behaviour in the local preview layer, then export through `src/gel.ts`.

## Important usage boundaries

- The source guidance says the progress stepper is for processes with 4 to 6 steps.
- Do not use the visual progress stepper on 8-step or 9-step skeletons unless a confirmed TaPaaS/GEL long-flow pattern is documented.
- Keep the existing text step indicator with `aria-live="polite"` as the accessible orientation fallback.
- Do not make future steps clickable.
- Do not claim GEL compliance, accessibility compliance, production readiness or approval.

## Maturity

Classification: `GEL-aligned`

Maturity: `needs engineer review`

