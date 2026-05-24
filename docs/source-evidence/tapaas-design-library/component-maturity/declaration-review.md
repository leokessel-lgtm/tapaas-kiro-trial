# Declaration review

## Purpose

Review-page playback of declarations the customer has accepted before submission.

## Source evidence

- Figma file: Components TaPaaS Design Library
- Source page/node: `27:38386`
- Page name: `Declaration review (accordion & card)`
- MCP extraction date: 2026-05-23

## Figma findings

- The page contains both accordion and card variants.
- Figma text includes `Custom / GEL`.
- Figma notes say the accordion does not use Figma component open/close states because formatted content needs to sit inside the accordion.
- Example content uses the heading `Declaration`.
- Example introduction: `You have accepted these declarations:`
- Example declaration text follows the pattern `I + verb + statement...`.
- Example section headings include `Section 1`, `Section 2`, `Section 3`.

## GEL relationship

The accordion variant depends on GEL accordion behaviour. The card variant is a TaPaaS-specific review composite.

## Usage rules

- Use on review pages only.
- Use placeholder declaration text unless legal wording is confirmed.
- Prefer the card variant when the declaration must remain visibly available.
- Use the accordion variant only when TaPaaS design and accessibility review confirm the declaration can be collapsed.

## Accessibility notes

- Keep the component under the review page H2.
- Use H3 for the component heading and H4 for sections.
- Do not hide required legal content unless content and accessibility owners confirm that is acceptable.
- Accordion buttons must expose `aria-expanded` and `aria-controls`.

## Preview implementation decision

Implemented as `DeclarationReview` in `src/tapaas-preview/`.

Status: `coded preview`, still `needs engineer review`.

## Fidelity pass

2026-05-24 Storybook comparison pass tuned the card variant toward the source anatomy:

- default heading and intro retain the source pattern `Declaration` and `You have accepted these declarations:`
- card playback now uses visible paragraph statements rather than list bullets
- section grouping remains explicit, but final legal/declaration wording is placeholder/mock unless owner-confirmed

The accordion variant remains a preview of the source relationship only. Whether legally material declaration playback can be collapsed is unresolved.

## Open questions

- Which variant should be preferred for MPS and similar flows?
- Can legally material declaration playback be collapsed?
- Does the exact content model need individual declaration items, grouped sections, or free text?
