# GEL Storybook architecture

## Status

Batch 1 adds a GEL Reference Storybook layer for source-informed local previews only.

Current dependency boundary:

- `@snsw-gel/react` is not installed in this package.
- No `.npmrc` or private GEL registry access is confirmed in this repo.
- `src/gel.ts` is the single GEL import and adapter boundary.
- Local renders are reference previews, not canonical GEL package exports.

Required wording for rendered GEL reference stories:

- source-informed local preview
- Storybook reference only
- not a production GEL export
- not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim

## Storybook information architecture

| Section | Purpose | Example stories | Acceptance level |
|---|---|---|---|
| GEL Reference | Show GEL components as source-informed local previews through `src/gel.ts`. | `GEL Reference/Batch 1` | Story-only by default |
| TaPaaS GEL Patterns | Show composed transaction patterns that use GEL primitives with TaPaaS guidance. | Future validation group, review group or declaration group patterns | Review-gated before manifest entry |
| TaPaaS Exported/Adapted Components | Show coded TaPaaS components with a stable exported contract. | Existing TaPaaS preview composites | Manifest-backed only when accepted |
| Transaction Assemblies | Show thin transaction slices and frame previews. | MPS transaction preview stories | Manifest-backed only where transaction-critical |

## Batch 1 reference inventory

| GEL package/component | TaPaaS use case | Story target | Recommended action | Acceptance level | Notes |
|---|---|---|---|---|---|
| Button | Primary, secondary, tertiary and link-style actions | `ButtonsAndLinks` | import-as-is through `src/gel.ts` | Story-only | Do not create a TaPaaS wrapper without a real contract. |
| TextLink | Inline content links | `ButtonsAndLinks` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| Content / Heading | Basic page content structure | `ButtonsAndLinks` | import-as-is through `src/gel.ts` | Story-only | Local content examples only. |
| Field | Label, hint and error layout around form controls | `FieldsAndInputs` | import-as-is through `src/gel.ts` | Story-only | Compose with input controls in stories. |
| Input | Text entry | `FieldsAndInputs` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| Select | Single select input | `FieldsAndInputs` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| Textarea | Multi-line text entry | `FieldsAndInputs` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| Checkbox | Binary choice | `ChoiceControls` | import-as-is through `src/gel.ts` | Story-only | Keep as a primitive. |
| RadioButtonList | Mutually exclusive choice set | `ChoiceControls` | import-as-is through `src/gel.ts` | Story-only | TaPaaS card-style radio patterns remain separate. |
| ErrorSummary | Form-level error navigation | `FeedbackAndErrors` | import-as-is through `src/gel.ts` | Story-only | No compliance claim from Storybook rendering. |
| InPageAlert | Inline status and warning content | `FeedbackAndErrors` | import-as-is through `src/gel.ts` | Story-only | Use preview-only state examples. |
| Callout | Highlighted informational content | `FeedbackAndErrors` | import-as-is through `src/gel.ts` local preview boundary | Story-only | Source shows Callout wraps InPageAlert with `variant='callout'`. |
| ProgressStepper | Short transaction progress display | `ProgressStepperReference` | import-as-is through `src/gel.ts` | Story-only | Use bounded 4-step reference only. |

## Wrapper policy

Use GEL directly when:

- a GEL component already covers the primitive interaction or content need
- `src/gel.ts` exposes the component
- TaPaaS does not need a separate exported contract

Compose GEL into TaPaaS patterns when:

- multiple GEL primitives form a repeatable transaction pattern
- the pattern has TaPaaS-specific content guidance or review needs
- the pattern is useful in transaction assembly, but is not yet a standalone exported component

Create a TaPaaS wrapper only when:

- TaPaaS needs a stable exported prop contract
- the wrapper encodes a real transaction or platform rule
- there is evidence and review support for the adapted behaviour

Reject a Figma-exported primitive in favour of GEL when:

- the Figma component duplicates a GEL primitive
- there is no TaPaaS-specific contract or pattern behaviour
- using the Figma export would create visual or behavioural drift from GEL

Do not create wrappers for `Button`, `Checkbox`, `Input`, `Select`, `Field`, `Textarea` or `TextLink` in Batch 1.

## Evidence and manifest rules

GEL Reference story only:

- use for simple GEL primitives and local reference previews
- do not add to `docs/tapaas/09-component-acceptance-manifest.json`

TaPaaS pattern story:

- use when GEL primitives are composed into a repeatable transaction pattern
- keep review-gated until source parity and transaction relevance are clear

Manifest-backed acceptance:

- use only for TaPaaS exported/adapted components or transaction-critical GEL-backed patterns
- require evidence links, Storybook IDs, tests or acceptance checks, and explicit preview boundaries

Screenshot evidence:

- use for visual review and parity discussion
- keep separate from source evidence and acceptance evidence

Review-gated status:

- use when source evidence exists but visual parity, accessibility behaviour, owner review or transaction fit is not settled

## Batch 1 guardrails

- Do not refactor transaction skeletons or assemblies.
- Do not add `@snsw-gel/react`.
- Do not change package, lockfile, registry or `.npmrc` files.
- Do not expand the acceptance manifest with primitive GEL stories.
- Do not touch upload, autosuggest, modal-heavy or backend-like components.
- If implementation requires a file outside the approved Batch 1 file list, stop and report the file, reason and risk before changing it.
