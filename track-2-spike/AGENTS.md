# Track 2 Spike Instructions

## Scope

This folder is an isolated setup for the Track 2 Figma extraction spike.

Work here must remain contained to `track-2-spike/` unless Leo explicitly approves a broader repo change.

## Boundaries

- Do not call the Figma API during setup.
- Do not require `FIGMA_TOKEN` for setup, documentation, schema review or placeholder generation.
- Require `FIGMA_TOKEN` only when running the fetch step.
- Treat Figma output as design evidence only, not production approval.
- Mark missing behaviour as `Unknown` or `Needs TaPaaS confirmation`.
- Do not create production code, Storybook stories, transaction skeletons or component previews from this spike unless separately approved.
- Do not infer backend, identity, eligibility, concession, payment, medical, fraud, privacy, policy or legal rules from frames.

## Evidence Rules

Every generated output must preserve:

- `fileKey`
- `nodeId`
- extraction timestamp
- source URL, where available
- raw Figma response path
- normalised evidence path
- unknowns and review gates

## Default Commands

Setup checks may run without credentials:

```zsh
node track-2-spike/scripts/validate-json.mjs track-2-spike/schemas/pipeline-run.schema.json track-2-spike/outputs/pipeline-run.placeholder.json
```

Live fetch requires credentials:

```zsh
node track-2-spike/scripts/run-pipeline.mjs --fetch
```
