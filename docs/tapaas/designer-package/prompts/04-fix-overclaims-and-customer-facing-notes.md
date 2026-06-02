# Prompt 04: fix overclaims and customer-facing notes

Use this when a generated transaction has leaked internal notes or makes approval/compliance claims.

```text
CODEX

Start one slice only: remove overclaims and customer-facing internal notes from the Temporary street trading permit prototype.

Repo:
cd /Users/leonardo.kesselring/Documents/Work/SNSW/Kiro/tapaas-kiro-trial

Scope:
Patch the Temporary street trading permit prototype only.

Do not change:

- other transactions
- Storybook unless the same customer-facing text is rendered there and must compile
- package or lock files
- workflows

Source of truth:
Use the committed TaPaaS transaction rule files under docs/tapaas, especially:

- 12-clara-tapaas-transaction-rules-v01.md
- 18-approved-examples-and-anti-patterns.md
- 07-known-limitations-and-governance-caveats.md in the designer package

Fix:

1. Remove any customer-facing designer annotations.
2. Remove any customer-facing mock-only notes.
3. Remove any customer-facing owner-confirmation notes.
4. Remove any customer-facing placeholder warnings.
5. Remove any customer-facing internal implementation notes.
6. Remove or reword production readiness claims.
7. Remove or reword accessibility compliance claims.
8. Remove or reword privacy/legal approval claims.
9. Remove or reword GEL approval claims.
10. Remove or reword TaPaaS approval claims.
11. Remove or reword policy or governance clearance claims.
12. Keep caveats in documentation or boundary notes where appropriate, not in the customer journey.

Use this permitted framing outside the customer journey:

Temporary street trading permit is a rule-generated prototype created from the TaPaaS transaction rules. It is internal trial material only and is not production-ready, accessibility-compliant, privacy/legal approved, GEL approved, TaPaaS approved, policy approved or governance cleared.

Before editing:

- identify files to change
- report the customer-facing strings that need removal or rewrite

After editing:

- update focused tests so blocked strings do not render as customer UI
- run focused tests
- run npm run test if reasonable
- run git diff --check
- run git status --short

Return:

- files changed
- strings removed or rewritten
- tests added or updated
- validation results
- git status --short
- any remaining historical story IDs or commit references that still contain legacy wording

Do not commit until Leo approves.
```
