# Details card single interactive

## Purpose

Context card that shows key information and exposes one or more explicit actions.

## Source evidence

- Figma file: Components TaPaaS Design Library
- Source page/node: `2958:2499`
- Page name: `Details card single interactive`
- MCP extraction date: 2026-05-23

## Figma findings

- Figma text includes `Details card single interactive`.
- Example content includes:
  - `Key information`
  - `Expiring soon`
  - `Label: Value`
  - `Remove this vehicle`
- Developer notes include fixed width `570px` and button width determined by label.
- Text info notes say key information uses 20px/28px and data points use body text 16px/20px.
- Accessibility annotation text includes guidance for headings, landmarks, reading order, focus order, links vs buttons, dynamic content, states and labels.

## GEL relationship

The visual card is TaPaaS-specific. Actions must still use GEL button/link semantics.

## Usage rules

- Use for contextual information that supports the current page.
- Use buttons for actions that change state, such as remove, restore or change in place.
- Use links only for navigation to another page or section.
- Keep the primary information visible and concise.

## Accessibility notes

- The card heading should fit the page heading hierarchy.
- Action labels must be specific, such as `Remove this vehicle`, not generic `Remove`.
- If an action opens a modal or changes focus, focus return must be defined.
- Status text must not be the only cue for state.

## Preview implementation decision

Implemented as `InteractiveDetailsCard` in `src/tapaas-preview/`.

Status: `coded preview`, still `needs engineer review`.

## Fidelity pass

2026-05-24 Storybook comparison pass tuned the preview toward the source anatomy:

- 48px leading icon, information group and action area now align more closely with the Figma frame
- example content uses `Key information`, status text and `Label: Value` row treatment from the source
- link-style action support was added for the source-like `Remove this vehicle` treatment

Action behaviour is still preview-only. Real remove, restore, modal, routing or persistence behaviour is unresolved.

## Open questions

- Which actions are allowed in production TaPaaS contexts?
- Should destructive actions require confirmation?
- Should status labels use GEL status-label tokens when the real package is available?
