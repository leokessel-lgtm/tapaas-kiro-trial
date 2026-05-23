# Selected TaPaaS component maturity backlog

This backlog selects the next five TaPaaS candidates for deeper maturity work.

It is intentionally narrow. Do not expand the whole library. Mature these five through evidence, design review, engineering review and accessibility checks before adding more candidates.

This is not a commitment to code all five immediately. A candidate only moves into preview code after the source, behaviour and accessibility gates are satisfied.

## Selected candidates

| Order | Candidate | Source | Current status | Target | Why now | Gate before coding |
|---|---|---|---|---|---|---|
| 1 | Declaration review | `27:38386` | documented only | coded preview candidate | Review pages appear in every transaction skeleton, and declaration playback is a common TaPaaS-specific gap. | Choose accordion or card variant per flow. Confirm legal-content treatment before code. |
| 2 | Legal info accordion | `22:35625` | documented only | source-backed usage guidance | Legal and privacy guidance appears across declaration and review contexts and needs stricter collapse/visibility rules. | Use GEL accordion behaviour only for optional guidance. Do not hide required legal/privacy content without content and accessibility confirmation. |
| 3 | Details card single interactive | `2958:2499` | documented only | coded preview candidate | The read-only DetailsCard is already coded; the interactive variant is the next controlled increase in complexity. | Confirm action semantics, edit/remove labels, keyboard flow and focus return before implementation. |
| 4 | TaPaaS radio button cards | `31:63988` | documented only | prototype only after accessibility check | Card-based choices are useful for product/application type selection, but they carry native-radio accessibility risk. | Deep extract selected, unselected, focus, error, disabled and responsive states. Preserve native radio semantics. |
| 5 | Backend error examples | `31:73426` | design-only | coded variants for mock-only outcomes | The MPS simulation already needs realistic hard-stop, retry and manual-review outcomes without real backend logic. | Use only source-confirmed error types and recovery wording. Keep all rules mock-only unless service owners confirm them. |

## Suggested sequence

1. Start with `Declaration review` because it is tightly connected to the Review template and appears in many transaction flows.
2. Pair `Legal info accordion` with declaration review so legal/privacy collapse rules are decided together.
3. Mature `Details card single interactive` after the legal/review patterns because it extends an existing coded read-only DetailsCard.
4. Attempt `TaPaaS radio button cards` only after designer and accessibility review confirms radio-card behaviour.
5. Mature `Backend error examples` last because it touches business rules, routing and recovery wording.

## Evidence required for each candidate

Record the following before coding:

- Figma source node and page name
- anatomy and sub-components
- visual states
- responsive behaviour
- content rules
- dependency on GEL or TaPaaS components
- keyboard behaviour
- focus behaviour
- error handling
- accessibility annotations
- known gaps
- templates where the component appears
- whether the component should be GEL-aligned, GEL variant, TaPaaS-specific or design-only

## Coding boundary

When a component is ready to code:

- build the smallest reusable preview shape
- keep it in `src/tapaas-preview/` unless it is clearly a GEL preview component
- export only through the existing adapter pattern
- add Storybook stories before using it in a transaction
- add unit tests for keyboard/focus/state behaviour
- add Playwright smoke coverage if it appears in a visible transaction
- update the component registry, relationship map and evidence log

Do not add backend calls, payment logic, identity proofing, real eligibility rules, policy decisions or real error codes as part of this maturity backlog.

## Current recommendation

Use this backlog while TaPaaS designers review the published work. Their feedback should decide which of these five moves from `documented only` or `design-only` to coded preview first.
