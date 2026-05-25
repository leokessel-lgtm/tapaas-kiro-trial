# Privacy card preview evidence

## Source

- Source library: `Components - TaPaaS Design Library (Copy)`
- Component node: `1:198`
- Supporting template: `Templates - TaPaaS Design Library`, Privacy step `3395:41359`
- Evidence mode: existing MCP partial deep extraction plus local source registry

## Extraction summary

The source evidence identifies the Privacy card as a TaPaaS-specific privacy and consent pattern used on the Privacy step where personal information is collected or processed.

The bounded implementation is `PrivacyCardPreview` in `src/tapaas-preview/index.tsx`.

## Anatomy

- Card container with labelled heading.
- Short explanatory description.
- Privacy collection notice section.
- Terms and conditions section.
- Notifications section.
- Optional acknowledgement checkbox using the local GEL-shaped `Checkbox` preview.
- Error state for the acknowledgement checkbox.

## States and variants

- Default privacy card with acknowledgement checked for review.
- Error state where acknowledgement is required.
- Optional card without acknowledgement through `showAcknowledgement={false}`.

## Behaviour boundary

- Preview-only rendering and checkbox callback.
- No real privacy collection notice.
- No real legal, terms, notification or policy wording.
- No storage, submission, routing or consent persistence.

## Classification and maturity

- Classification: `TaPaaS-specific composite`
- Maturity: `coded-preview`
- Review reason: `owner`, `privacy`, `legal`, `policy`, `accessibility`, `engineer`

## Unknowns

- Final agency name and privacy collection notice.
- Whether terms and notifications always appear inside this card.
- Final acknowledgement wording and validation timing.
- Manual assistive-technology behaviour.
- Owner-approved privacy, legal and policy content.

## Review notes

Use the isolated Storybook story `Privacy Card Pattern` for review. This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, privacy-approved, legal-approved or policy-approved.
