# Community Venue quality parity plan

## Slice 0 status

This document classifies designer feedback for the Community Venue booking skeleton before any runtime patching.

Community Venue appears to be a synthetic/generated transaction assembly used for TaPaaS designer feedback. No transaction-specific Community Venue Figma/source flow has been found in the current repo evidence.

This plan does not claim source parity, production readiness, WCAG compliance, accessibility compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval or final copy approval.

## Evidence inspected

| Evidence | Status | Notes |
|---|---|---|
| Community Venue implementation | Found | `src/CommunityVenueBookingSkeleton.tsx` implements an 8-step skeleton: privacy, applicant, venue, accessibility, supporting, declaration, review, confirmation. |
| App switcher | Found | `src/App.tsx` exposes `Community venue booking` as a visible skeleton option. |
| Tests | Not found | No focused `CommunityVenueBookingSkeleton.test.tsx` exists. |
| Source inventory | No Community Venue source flow found | `docs/tapaas/00-source-inventory.md` lists TaPaaS component/template sources and MPS, not a Community Venue transaction flow. |
| Template evidence | Found | `docs/tapaas/02-page-template-registry.md` confirms reusable Privacy, Form input, Declaration, Review and Confirmation template guidance. |
| Figma evidence notes | Reusable only | `docs/tapaas/03-figma-evidence-notes.md` records component/template evidence, not Community Venue transaction-specific parity. |
| Designer feedback source | Uploaded board in ChatGPT loop | Feedback themes were extracted from the Community Venue designer feedback PDF shared in the ChatGPT thread. |

Figma MCP was not used in this slice because no Community Venue-specific source flow, file key or node was identified. Future MCP use should be limited to reusable TaPaaS/GEL templates and components unless a Community Venue source flow is supplied.

## Implementation summary

| Area | Current implementation | Slice 0 assessment |
|---|---|---|
| Step model | 8 steps: privacy, applicant, venue, accessibility, supporting, declaration, review, confirmation | Build-tested skeleton pattern, but source-gated for exact Community Venue flow and page grouping. |
| Privacy | Inline `InPageAlert`, placeholder privacy copy and checkbox | Does not use the reusable `PrivacyCardPreview` pattern. Privacy collection notice wording remains owner-gated. |
| Applicant details | Full name, email, phone | May be unnecessary or different if profile/account connection is mandatory. Source-gated. |
| Venue booking details | Venue type select, MoreInfoDisclosure, booking purpose, date fields | Designer feedback says venue booking input is close enough, but component choice and grouping need review. |
| Accessibility/equipment | ConditionalQuestionPanel plus Accordion guidance | Useful prototype pattern, but accordion use and latest component status need source/component review. |
| Supporting information | Free-text area with character count and sensitive-info warning | Useful placeholder pattern. Exact content and sensitivity guidance remain source/owner-gated. |
| Declaration | Warning alert, single declaration paragraph and checkbox | Declaration rule is unclear when there is only one point. Legal wording remains source-gated. |
| Review | ReviewInfoCards, ReviewFeesCard, payment-excluded alert and submit CTA | No section edit actions. Fees/payment content is placeholder only. |
| Confirmation | ConfirmationHeader, TransactionSummaryCard, next steps, Start again CTA and source-inventory link | Contains developer-facing source inventory link and placeholder operational claims. Needs later cleanup. |

## Feedback classification

| ID | Raw feedback / inferred note | Category | Severity | Evidence type | Recommended treatment | Notes |
|---|---|---|---|---|---|---|
| CV-001 | Privacy page is not using the PCN/privacy collection notice component. | page templates | High | designer judgement plus code evidence | fix later | Current privacy step uses `InPageAlert`, paragraph copy and checkbox rather than the reusable privacy card pattern. |
| CV-002 | Privacy, T&Cs and declaration treatment is unclear. | gaps/governance | High | designer judgement plus reusable TaPaaS evidence | source-gated | Separate privacy notice, terms and declaration concerns before runtime changes. Legal/privacy wording needs owner confirmation. |
| CV-003 | Input content may need to sit under one step with multiple pages. | transaction flow | High | designer judgement plus template evidence | document rule | Current step model splits applicant, venue, accessibility and supporting as separate steps. Template registry allows multiple form input pages between Privacy and Declaration. |
| CV-004 | Need better documentation for grouping content and determining pages within steps. | reusability | High | designer judgement plus repo docs | document rule | Strong reusable rule candidate for future synthetic transactions. |
| CV-005 | Profile connect may cover applicant details if login is compulsory. | gaps/governance | High | source-gated | source-gated | Do not patch applicant details until account/profile requirements are known. No identity/account integration should be invented. |
| CV-006 | CTAs are wrong throughout. | component relationships | High | designer judgement plus code evidence | fix later | Audit `TransactionCtaGroup` placement, labels, Back order, submit labels and confirmation CTA. Current confirmation says `Start again`. |
| CV-007 | Venue booking input seems close enough. | positive/protected | Medium | designer judgement plus code evidence | protect | Protect the venue-type, purpose and date capture shape unless source evidence says otherwise. |
| CV-008 | Question whether dropdowns and accordions should be used within the input step. | component choice | Medium | designer judgement | source-gated | `Select`, `MoreInfoDisclosure` and `Accordion` need component/template review before changing. |
| CV-009 | Accordion component may not be the latest. | component choice | Medium | designer judgement plus source evidence | verify first | Existing local Accordion is source-backed preview evidence, but latest TaPaaS/GEL component status should be checked before patching. |
| CV-010 | Current flow may be good enough for a quick prototype. | positive/protected | Medium | designer judgement | protect | Keep prototype boundary clear and avoid over-investing without source. |
| CV-011 | Figma fidelity is not pixel-perfect but may be enough for quick prototype. | Figma/source fidelity | Medium | designer judgement | defer | Do not claim parity. Use visual QA only if a real source frame exists. |
| CV-012 | Kiro may be creating templates instead of using already-designed TaPaaS templates. | page templates | Very high | designer judgement plus template evidence | document rule | Highest reusable lesson. Future prompting should force template-first assembly. |
| CV-013 | Declaration step rules are unclear, especially when declaration is only one point. | page templates | High | designer judgement plus reusable template evidence | source-gated | Decide whether a single declaration should be a standalone step, a review declaration, or part of another template. |
| CV-014 | Component choice/relationships are enough for prototyping but not finished product. | component relationships | Medium | designer judgement | manual QA | Preserve prototype framing. Do not promote to production-ready pattern. |
| CV-015 | Simple content mostly works, and Kiro calls out where real text is needed. | positive/protected | Medium | designer judgement plus code evidence | protect | Keep visible placeholders and owner-confirmation warnings unless replacing with source-confirmed content. |
| CV-016 | Accessibility and responsiveness need more precise review by specialists. | accessibility | Medium | manual QA | manual QA | Manual keyboard, focus, screen-reader, responsive and contrast review remains required. No compliance claim. |
| CV-017 | With refinement this could be used again. | reusability | High | designer judgement | document rule | Capture reusable template/page grouping lessons after patches prove useful. |
| CV-018 | Gaps note suggests input-page grouping guidance and documentation are needed. | gaps/governance | High | designer judgement | document rule | Feed into docs/Skill only after implementation evidence confirms the rule. |
| CV-019 | Review page lacks source-context edit actions. | component relationships | Medium | code evidence plus reusable template evidence | fix later | Review cards currently have no edit actions. Template evidence says edit labels should describe the section. |
| CV-020 | Confirmation exposes developer-facing source inventory link. | content | Medium | code evidence | fix later | Likely inherited cleanup candidate. Remove from runtime UI in a low-risk slice if still present. |

## Positives to protect

| Positive | Why protect it |
|---|---|
| Venue booking input is close enough for prototype review | It gives a useful service-specific input example without needing backend integration. |
| Placeholder/source-gated copy is visible | It prevents accidental final-copy, policy, privacy, legal or operational claims. |
| Conditional support needs pattern is useful | It exercises a repeatable conditional-question pattern, subject to manual QA. |
| Sensitive-information warning is visible | It helps keep mock free text away from sensitive real data. |
| Transaction may be reusable with refinement | Reuse value is high if page grouping and template rules are captured before patching. |

## Source-gated decisions

| Decision | Current status | Evidence needed |
|---|---|---|
| Whether Community Venue is a real transaction candidate | Unknown | Transaction-specific source flow, owner confirmation or source pack. |
| Exact step/page grouping | Unknown | TaPaaS designer/product guidance for grouping pages inside steps. |
| Whether applicant details are needed | Unknown | Account/profile-connect and login requirement decision. |
| Privacy collection notice, T&Cs and declaration copy | Unknown | Privacy/legal/policy owner-approved content. |
| Whether the single-point declaration should be a standalone step | Unknown | Template/source guidance and legal content decision. |
| Venue fees, payment, receipt and confirmation next steps | Unknown | Service owner and backend/process evidence. |
| Dropdown, accordion and latest component usage | Unknown | Current TaPaaS/GEL component guidance and source-backed component status. |

## Manual QA items

| Item | Purpose |
|---|---|
| Keyboard pass through full happy path and validation path | Check CTA order, error summary links, conditional reveal and accordion controls. |
| Screen-reader review | Check step announcement, error summary, accordion state, conditional reveal and confirmation summary. |
| Responsive review | Check input widths, CTA stacking, accordion panels and review-card layout on mobile. |
| Content design review | Check whether grouped input pages, declarations and placeholders read clearly. |
| Visual/source review | Only if a Community Venue source frame is later supplied. |

## Recommended patch slices

Do not patch runtime code until this plan is reviewed.

| Slice | Scope | Boundary |
|---|---|---|
| Slice 1 | Source/synthetic boundary and page/step inventory | Documentation and low-risk runtime clutter only, if approved. Do not change flow logic yet. |
| Slice 2 | Privacy/PCN/T&Cs/declaration separation | Use placeholders and existing patterns only. No final privacy/legal copy. |
| Slice 3 | Step/page grouping and input architecture | Decide whether applicant, venue, accessibility and supporting content are steps or pages within an input step. Source/product-gated. |
| Slice 4 | CTA pattern alignment | Audit labels, Back order, submit action and confirmation CTA against existing hardened patterns. |
| Slice 5 | Component choice audit for dropdowns, MoreInfoDisclosure and Accordion | Verify latest component guidance before changing controls. |
| Slice 6 | Validation, responsiveness and manual QA coverage | Add tests only for patched behaviours. Manual accessibility QA remains required. |
| Slice 7 | Reconciliation and reusable rule capture | Separate fixed, protected, source-gated and manual-QA items before merge. Promote only proven reusable rules. |

## No-go claims

- Do not claim Community Venue source parity.
- Do not claim this is a real service transaction.
- Do not claim production readiness.
- Do not claim WCAG or accessibility compliance.
- Do not claim GEL or TaPaaS approval.
- Do not claim final privacy, legal, T&Cs, declaration, fee, receipt, confirmation or operational wording.
- Do not invent backend, profile-connect, payment, approval, booking allocation or service-owner rules.
- Do not use Figma MCP for Community Venue transaction parity unless a specific Community Venue source flow, file key or node is supplied.
- Do not touch `track-2-spike/` or raw Figma JSON outputs.

## Slice 0 audit result

| Check | Result |
|---|---|
| Implementation found | Yes, `src/CommunityVenueBookingSkeleton.tsx`. |
| Visible app surface found | Yes, `src/App.tsx` switcher includes `Community venue booking`. |
| Focused tests found | No focused Community Venue test file found. |
| Transaction-specific Figma/source flow found | No. |
| Runtime code changed in Slice 0 | No. |
| Storybook files changed in Slice 0 | No. |
| Track 2 raw files | Not read or touched. |

## Slice 2 low-risk confirmation cleanup

Slice 2 applies only low-risk inherited confirmation cleanup. It does not change page grouping, privacy/T&Cs/declaration structure, dropdown/accordion component choice, review edit actions, fees, eligibility, backend/page dependency logic or final confirmation copy.

Fixed items:

- Removed the developer-facing `Review TaPaaS source inventory` link from the Community Venue runtime confirmation UI.
- Changed the confirmation CTA label from `Start again` to `Start another booking` as preview-safe wording.
- Preserved the existing callback/reset behaviour and existing source-required placeholders.
- Added focused Community Venue regression coverage for completing the mock flow, absence of the source-inventory link and the confirmation CTA label.

Deferred items remain:

- Step/page grouping and whether input content should sit under one step with multiple pages.
- Privacy collection notice, T&Cs and declaration separation.
- Whether applicant details are needed when profile connect or login is mandatory.
- Dropdown, MoreInfoDisclosure and Accordion component-choice review.
- Review edit actions.
- Fee, receipt, approval, booking allocation, backend and service-owner process rules.
- Manual keyboard, focus, screen-reader, responsive and contrast QA.

Slice 2 does not make Community Venue source-complete, production-ready, WCAG/accessibility compliant, GEL/TaPaaS approved or final-copy approved.
