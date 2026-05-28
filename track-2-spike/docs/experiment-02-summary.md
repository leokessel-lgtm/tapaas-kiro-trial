# Experiment 2 Summary

## Purpose

Test whether Track 2 can handle a controlled set of selected Figma nodes without broadening into full transaction extraction.

## What Changed

- Added optional `FIGMA_NODE_IDS` support for comma-separated Figma node IDs.
- Kept backward compatibility with `FIGMA_NODE_ID`.
- Preserved per-source-node evidence in normalised output.
- Added node comparison output for normal/error or page/state comparisons.

## Current Run Boundary

This summary was generated from the existing local raw payload. No live Figma fetch was run by Codex for this increment.

## How To Run Multi-Node Fetch

```zsh
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial
export FIGMA_FILE_KEY="pFDBhMVirBMo9JnJQbeI3I"
export FIGMA_NODE_IDS="490:60286,751:10322"
export FIGMA_TOKEN="$(pbpaste | tr -d '\n\r')"
node track-2-spike/scripts/run-pipeline.mjs --fetch
```

## Review Boundary

Private R&D only. No production readiness, backend integration, real schema compatibility or approval claim.

## Current Evidence

- Source node count: 4
- Generated pages/states: 4
