# Legal info accordion

## Purpose

Structured privacy, terms and notification information shown in declaration or review contexts.

## Source evidence

- Figma file: Components TaPaaS Design Library
- Source page/node: `22:35625`
- Page name: `Legal info accordion`
- MCP extraction date: 2026-05-23

## Figma findings

- Figma text includes `Custom / GEL`.
- Component text includes `Legal info accordion`.
- Example accordion sections include:
  - `Privacy Collection Notice`
  - `Terms and Conditions`
  - `Notifications`
  - `Privacy and notifications`
  - `Digital notifications`
- Developer note says the component is identical to GEL accordion aside from formatted text inside the panels.
- Figma notes say headings inside accordions need to be marked up as H3 but styled as body text in bold, and the main accordion heading should be marked up as H2.
- Figma notes record 8px spacing between subheadings and paragraphs.

## GEL relationship

This is a TaPaaS content-specific wrapper over GEL accordion behaviour.

## Usage rules

- Use only for optional legal/privacy/supporting guidance unless owners confirm required content may be collapsed.
- Do not use it to hide mandatory declaration acceptance.
- Keep privacy, terms and notification copy placeholder until owner-confirmed.

## Accessibility notes

- Accordion buttons must expose expanded/collapsed state.
- Do not place critical content exclusively inside collapsed panels without review.
- Keep heading hierarchy sequential within the page.

## Preview implementation decision

Implemented as `LegalInfoAccordion` in `src/tapaas-preview/`.

Status: `coded preview`, still `needs engineer review`.

## Open questions

- Which legal/privacy content must always be visible?
- Should all sections start collapsed or should a section open by default?
- Does MPS require different privacy/notification sections from the default examples?
