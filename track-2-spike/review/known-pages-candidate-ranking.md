# Experiment 3 Known Pages Candidate Ranking

## TLDR

The selected set is 3 deliberately selected high-confidence Figma page candidates from the NOD Production inventory. They are not confirmed TaPaaS schema pages.

## Selected 3 Pages

| Page order | nodeId | Figma name | Safe label | Inventory confidence | Rationale |
|---:|---|---|---|---|---|
| 1 | `490:23897` | Privacy | Privacy / terms acknowledgement page | High | High-confidence privacy page candidate from the NOD Production inventory. |
| 2 | `490:23907` | Vehicle details | Vehicle details page | High | High-confidence vehicle/details page candidate from the NOD Production inventory. |
| 3 | `490:67250` | Review | Review page | High | High-confidence review page candidate from the NOD Production inventory. |

## Optional Fourth Candidate

| nodeId | Figma name | Safe label | Inventory confidence | Why optional |
|---|---|---|---|---|
| `490:67254` | Confirmation | Confirmation page | High | Strong candidate for a later 4-page review, but outside the requested 3-page Glen input. |

## Excluded Candidates

| nodeId / group | Name | Reason excluded |
|---|---|---|
| `490:60298` | Disposal details | High-confidence vehicle/details candidate, but may overlap with `490:23907` / Vehicle details and can be considered later. |
| `531:11036` | NOD Input: Sale and buyer details - default | Medium confidence and may be component/variant-like rather than a page frame. |
| Backend validation errors | Low-confidence validation/error candidates | Excluded because these look like state/variant candidates, not primary page frames for this 3-page selection. |
| Timeout modals | Modal candidates | Excluded because they are modal candidates, not transaction page frames. |

## Glen-Safe Framing

Use:

> 3 deliberately selected high-confidence Figma page candidates for engineering review.

Do not use:

> 3 confirmed TaPaaS schema pages.

## Review Boundaries

- This is not a full transaction extraction.
- The page order is a curated review order, not proven runtime routing.
- TaPaaS schema compatibility is not claimed.
- Backend integration is not claimed.
- Accessibility, privacy/legal, GEL and TaPaaS approval are not claimed.
