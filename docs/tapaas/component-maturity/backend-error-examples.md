# Backend error examples

## Purpose

Source-backed examples for hard-stop, retry and service-centre recovery outcomes.

## Source evidence

- Figma file: Components TaPaaS Design Library
- Source page/node: `31:73426`
- Page name: `Back end errors repository`
- MCP extraction date: 2026-05-23

## Figma findings

- The page contains backend error codes and example messages.
- Example code groups include vehicle registration transfer, notice of disposal and MPS full-page errors.
- MPS examples include:
  - `ADDRESS_NOT_NSW`
  - `INVALID_PAYMENT_DETAILS`
  - `CUSTOMER_NOT_INDIVIDUAL`
  - `CUSTOMER_UNDER_16`
  - `DOWNGRADE_NOT_ALLOWED`
  - `DUAL_PERMIT`
  - `EMAIL_BLANK`
  - `INVALID_PHOTO`
  - medical certificate/photo combined errors
- Example titles include:
  - `Your address is not in NSW`
  - `Unable to submit permit request`
  - `You cannot request organisation mobility parking permits online`
  - `You must be aged 16 or over to continue online`
  - `Our system is temporarily unavailable`

## GEL/TaPaaS relationship

This is not a component by itself. It is a pattern set for mapping backend or business outcomes to hard-stop pages, inline errors or recovery alerts.

## Usage rules

- Do not invent real error codes.
- Do not implement backend routing.
- Use mock variants only in the trial unless service owners confirm rules and wording.
- Treat full-page errors as hard-stop outcomes.

## Accessibility notes

- Hard-stop outcomes should use a clearly announced error region.
- Recovery actions must be explicit.
- Reference numbers and codes must not be presented as real unless backed by a system.

## Preview implementation decision

Implemented as `backendErrorExamples` data and `BackendErrorExamplePage` in `src/tapaas-preview/`.

Status: `coded preview` for mock variants only. Real backend behaviour remains out of scope.

## Fidelity pass

2026-05-24 comparison against the backend errors repository tuned the visible preview alert treatment:

- hard-stop alert content now includes a small error icon treatment closer to the source notification-error anatomy
- examples remain source-code/mock-message previews only
- no real backend routing, recovery handling, validation, persistence or escalation behaviour was added

Exact mapping from backend codes to full-page, inline or recoverable error states remains unresolved.

## Open questions

- Which MPS error variants should appear in the final trial candidate?
- Which errors are inline recoverable versus full-page hard stops?
- What recovery wording is approved by product/content owners?
