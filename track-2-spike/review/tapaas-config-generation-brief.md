# TaPaaS Config-Generation Brief

## Purpose

This context pack sits beside `known-pages-glen-input.json` as an engineering review aid.

It is meant to help Glen run a first-pass TaPaaS config schema generation from the Design IR without losing the page, section and block structure already present in the input evidence.

It is not a production generator. It does not prove TaPaaS schema compatibility, backend integration or approval readiness.

## Glen Feedback

- The Glen-facing JSON had the required information.
- The first generated config schema was around 70% correct.
- The first two pages worked as expected.
- The Review page was less reliable.
- Sections were not created in the first run even though sections existed in the JSON.
- After asking the model to review again, it corrected itself.
- The likely gap is generation context and prompting, not Figma extraction quality.

## Goal

- Improve first-run config-generation accuracy.
- Preserve page -> section -> block structure.
- Avoid flattening blocks directly under pages when sections exist.
- Avoid inventing schema fields or behaviours that are not supported by Glen's known specification.
- Keep CTAs separate from normal content and field blocks.
- Keep validation and error evidence separate from normal field and content evidence.
- Preserve shell/global content as excluded or inherited unless Glen's schema requires it.
- Preserve the Review INSTANCE caveat.

## How To Use

Use `tapaas-config-generation-prompt.md` with:

- `known-pages-glen-input.json`
- Glen's known TaPaaS schema specification or block catalogue
- this brief
- `tapaas-config-acceptance-checklist.md`
- `tapaas-config-generation-context.json`

The expected output is a TaPaaS config schema candidate plus a short gap report, not an approved config.

## Do Not Overclaim

- Do not claim production readiness.
- Do not claim backend integration.
- Do not claim TaPaaS schema compatibility.
- Do not claim accessibility approval.
- Do not claim privacy or legal approval.
- Do not claim GEL approval.
- Do not claim TaPaaS approval.
- Do not treat the Review INSTANCE candidate as confirmed page-frame evidence.
- Do not treat generated synthesis as source truth.

