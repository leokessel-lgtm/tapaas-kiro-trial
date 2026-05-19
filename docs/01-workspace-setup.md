# Workspace Setup

## Kiro workspace

The v0.3 pack can be used as a standalone Kiro workspace for trial work.

If a team is adapting a real app, add that app as an additional workspace root and keep this pack available as the reference root.

| Root | Folder | Purpose | Editable? |
|------|--------|---------|-----------|
| Root 1 | `GEL-Kiro-Trial-Build-Pack-v0.3-tapaas-trial` | Active TaPaaS trial pack and preview app | Yes for trial changes |
| Optional Root 2 | Real app repo | The app being adapted | Yes |
| Optional Root 3 | GEL source snapshot, if available | Read-only GEL package source truth | No |

## Step 1: Unzip the pack

```
GEL-Kiro-Trial-Build-Pack-v0.3-tapaas-trial.zip
```

## Step 2: Open the v0.3 pack in Kiro

Start with the v0.3 pack. It contains the working preview app, TaPaaS docs and steering files.

If the team is adapting a real app, add that app as another root after the v0.3 pack is open.

## Step 3: Add optional shared roots

If available, add:

1. the real app repo
2. a GEL package source snapshot

## Step 4: Verify the workspace

Ask Kiro:

```
Confirm this multi-root workspace is set up correctly.
Expected roots:
1. GEL-Kiro-Trial-Build-Pack-v0.3-tapaas-trial
2. optional real app repo
3. optional GEL package source snapshot

Check:
- the v0.3 pack contains package.json, src/, docs/tapaas/ and .kiro/steering/
- the optional real app repo contains package.json
- the optional GEL source snapshot contains packages/
```

## Step 5: Run the readiness check

Ask Kiro:

```
Using this workspace, check whether the v0.3 pack or real app is ready to use the TaPaaS transaction skeleton.

Inspect:
- package.json
- package manager and lockfile
- existing GEL imports
- existing TaPaaS preview imports
- existing page/component conventions
- existing styling setup
- build/test scripts

Do not edit files yet.
Return readiness status, existing GEL dependencies, missing dependencies,
confirmed import paths, app conventions, blockers, and Unknowns.
```

## What Kiro should find

Kiro will separate findings into:

| Label | Meaning |
|-------|---------|
| Verified | Confirmed from source, evidence or app files |
| Assumption | Reasonable but not confirmed |
| Unknown | Needs further evidence, owner input or runtime testing |
