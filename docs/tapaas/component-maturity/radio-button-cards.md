# TaPaaS radio button cards

## Purpose

Card-based mutually exclusive selection pattern for high-clarity choices.

## Source evidence

- Figma file: Components TaPaaS Design Library
- Source page/node: `31:63988`
- Page name: `TaPaaS radio button cards`
- MCP extraction date: 2026-05-23

## Figma findings

- Figma text identifies the component as `TaPaaS card radio buttons`.
- Component group: `Form inputs`.
- Step: `Input`.
- Status text: `CONCEPT`.
- Rationale says the pattern is for clarity at the cost of screen space.
- Usage rules say:
  - use only for mutually exclusive choices
  - do not use for one option
  - do not use when multiple options can be selected
  - best for 2 to 4 options
  - avoid if pictograms are not useful
  - labels should be short, ideally one line and at most two lines
  - on desktop 768px+, use rows with maximum two cards per row
  - use 24px horizontal and vertical space between cards on desktop
  - on mobile 0 to 767px, stack vertically with 16px space
  - card width is fixed 335px on desktop and fills container on mobile
  - error message appears under the bottom row with 16px spacing
- States include selected, hover, focused and error.
- Accessibility notes include `aria-required="true"` for mandatory fields and empty alt for decorative pictograms/icons.

## GEL relationship

The input behaviour must remain native radio behaviour. The card shell and pictogram treatment are TaPaaS-specific.

## Usage rules

- Use for 2 to 4 high-clarity mutually exclusive choices.
- Prefer GEL radio buttons for simpler choices.
- Keep pictograms decorative unless they communicate essential meaning.
- Do not use for high-density or long-option forms.

## Accessibility notes

- Preserve native radio input semantics.
- The fieldset legend must describe the question.
- Mandatory groups should expose required state.
- Error text must explain what happened and how to fix it.
- Error state applies to the whole set, not just one card.
- Pictograms are decorative by default.

## Preview implementation decision

Implemented as `RadioButtonCards` in `src/tapaas-preview/`.

Status: `coded preview`, still `needs engineer review`, because the Figma status remains `CONCEPT`.

## Storybook fidelity hardening

Designer-facing review on 2026-05-23 identified that the first Storybook example looked too unlike the Figma source because it opened in error state, used letter placeholders as pictograms and did not show a visible radio-control marker.

The preview was adjusted to:

- open the selected maturity example with one option selected, not in validation error state
- preserve a visible radio-control marker inside each card
- keep the whole card selectable through the associated native radio input and label
- replace letter placeholders with decorative SVG pictogram placeholders
- reuse shared decorative pictogram exports in MPS runtime and Storybook examples so transaction and catalogue review surfaces do not drift
- keep the component classified as a preview candidate, not production TaPaaS or GEL

This improves visual and behavioural review quality, but it is still not a pixel-perfect implementation. Exact TaPaaS pictogram assets, final spacing and final selected/error state treatment still need TaPaaS/GEL confirmation.

## Additional fidelity pass

2026-05-24 comparison against node `31:63988` further tuned the preview:

- desktop cards use the evidenced 335px card width with a two-column row and 24px gap
- mobile stacks at narrow widths with 16px spacing
- option labels use the source-like 24px bold treatment
- default error text now matches the source example: `Please select an option.`

The source remains marked `CONCEPT`, so this is still a coded-preview candidate only.

## Open questions

- Which pictogram library should be used when GEL and TaPaaS differ?
- Should selected state use the exact GEL radio selected marker when the real package is available?
- Does keyboard arrow navigation need additional testing in Safari/VoiceOver and NVDA?
