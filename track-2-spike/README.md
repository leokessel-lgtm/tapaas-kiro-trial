# Track 2 Spike

Setup-only workspace for a bounded Figma API extraction and evidence-normalisation spike.

This folder does not modify the main preview app, Storybook, acceptance manifest or TaPaaS documentation. It is a staging area for raw Figma JSON, normalised evidence and draft review notes.

## What This Creates

- `scripts/` - local Node scripts for fetch, normalise, validate and output-doc generation.
- `schemas/` - lightweight JSON schemas for pipeline inputs and outputs.
- `docs/spike-boundaries.md` - explicit trial boundaries and non-claims.
- `outputs/` - placeholder files and future generated spike outputs.

## What This Does Not Do

- It does not call Figma during setup.
- It does not require `FIGMA_TOKEN` until the fetch step.
- It does not create or modify production code.
- It does not claim GEL, TaPaaS, accessibility, privacy, legal, policy or production approval.

## Required Environment For Live Fetch

Set these in your normal terminal before running the live pipeline:

```zsh
export FIGMA_FILE_KEY="pFDBhMVirBMo9JnJQbeI3I"
export FIGMA_NODE_ID="490:23897"
export FIGMA_TOKEN="$(pbpaste | tr -d '\n\r')"
```

## Run The Full Fetch And Pipeline

From the repo root:

```zsh
node track-2-spike/scripts/run-pipeline.mjs --fetch
```

This will:

1. Fetch the selected Figma node into `track-2-spike/outputs/raw/figma-node-response.json`.
2. Normalise the raw response into `track-2-spike/outputs/normalised/extracted-evidence.json`.
3. Validate the raw and normalised outputs against the local schemas.
4. Build draft output docs in `track-2-spike/outputs/docs/`.
5. Write a pipeline run record to `track-2-spike/outputs/pipeline-run.json`.

## Run Without Fetch

After a raw response already exists:

```zsh
node track-2-spike/scripts/run-pipeline.mjs
```

This reruns normalisation, validation and doc generation using the existing raw output.

## Review Expectations

Treat all generated docs as draft evidence. They can support a later decision about whether to add or update TaPaaS preview components, but they are not implementation instructions on their own.
