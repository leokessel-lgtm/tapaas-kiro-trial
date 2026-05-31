# Email confirmation modal preview evidence

## Source

- Source library: Templates - TaPaaS Design Library
- Source node: `9290:50392`
- Component frame: `9241:18447`
- Evidence mode: repo-recorded source evidence and targeted live Figma MCP extraction from the original preview extraction
- Storybook targets:
  - `tapaas-components-modals-overlays--email-confirmation-modal-desktop`
  - `tapaas-components-modals-overlays--email-confirmation-modal-mobile`

## Extraction summary

The source evidence supports a preview email-confirmation modal for checking an email address before a send action. The current implementation is `EmailConfirmationModal` in `src/tapaas-preview/index.tsx`.

The implementation uses callback-only actions for `Send`, `Edit email address`, dismiss and Escape. It does not send email, persist data, route a transaction, store state, model critical errors or prove final modal behaviour.

## Anatomy

- Dialog title.
- Email confirmation copy with the email address visually emphasised.
- Close button.
- Secondary `Edit email address` action.
- Primary `Send` action.
- Desktop centred modal story.
- Mobile bottom-modal story.

## States and variants

- Open desktop modal.
- Open mobile review modal.
- Closed state in implementation only.

## Behaviour boundary

- Preview-only callbacks.
- No email delivery.
- No persistence.
- No transaction routing.
- No critical-error handling.
- No production modal approval.

## Classification and maturity

- Classification: `TaPaaS-specific composite`
- Maturity: `coded-preview`
- Review reason: `engineer`, `accessibility`, `owner`

## Unknowns

- Exact GEL modal parity.
- Final focus behaviour with assistive technologies.
- Production routing.
- Real email-send behaviour.
- Persistence.
- Critical-error handling.
- Owner-approved content.

## Review notes

Use both desktop and mobile Storybook stories for source review. The stories intentionally open the modal by default so reviewers can inspect the dialog without an extra interaction.

This preview is not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.
