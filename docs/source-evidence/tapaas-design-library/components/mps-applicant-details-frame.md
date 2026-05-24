# Component evidence note: MPS applicant details frame

## Summary

| Field | Value |
|---|---|
| Source library | `Mobility_Parking_Scheme.sketch 1 (Master @ 509b60a) (Copy)` |
| Source page | `MPS Final` |
| Source context nodes | `0:17387`, `0:17405` |
| Source frame names | `2.A - Personal details`, `2.B - Personal details - Manual address` |
| Implementation boundary node | Form-content/page-skeleton boundary inside `0:17387` and `0:17405`; global nav, page header and footer excluded from coded boundary |
| Classification | `TaPaaS-specific transaction frame pattern` |
| Maturity | `coded-preview` |
| Artefact type | `page skeleton / transaction frame pattern` |
| Implementation | `MpsApplicantDetailsFramePreview` in `src/tapaas-preview/index.tsx` |

## Extraction Queue Status

| Order | Target | Status | Notes |
|---:|---|---|---|
| 1 | `2.A - Personal details` | Resolved and extracted | Bounded frame under `MPS Final`; source context node `0:17387`; 1440 x 2209; 12 direct children. |
| 2 | `2.B - Personal details - Manual address` | Resolved and extracted | Bounded frame under `MPS Final`; source context node `0:17405`; 1440 x 2956; 15 direct children. |

Both frames were bounded enough for paired extraction. The implementation uses the form content and transaction-page structure only.

## Frame Anatomy

Both frames include:

- authenticated global navigation
- transaction page header: `Apply for a Mobility Parking Permit`
- progress indicator: `Step 1 of 4`
- section heading: `Personal details`
- required-field hint: `* indicates a required field`
- personal details fields
- section heading: `Contact details`
- address capture pattern
- email and phone fields
- bottom actions: `Cancel` and `Next`
- desktop footer

The coded preview excludes global navigation and footer because the active app already supplies a surrounding preview shell.

## Field Order

Shared field order:

1. First name
2. Last name
3. Date of birth
4. Contact details heading
5. Residential address pattern
6. Email address
7. Phone number

`2.A - Personal details` uses an address-search pattern:

1. Residential address
2. `Enter address manually` action
3. Help text explaining search and manual fallback

`2.B - Personal details - Manual address` uses manual address fields:

1. Residential address heading
2. `Back to search` action
3. Unit number
4. Street number
5. Street name
6. Street type
7. Suburb
8. State
9. Postcode

## Section Grouping

- `Personal details`: first name, last name, date of birth.
- `Contact details`: residential address, email address, phone number.
- `Residential address`: manual-address sub-group in the manual frame.

The coded preview uses headings and fieldsets where practical:

- date of birth is grouped as a `fieldset`
- manual address is grouped as a `fieldset`
- individual controls use labels and native inputs/selects

## Required And Optional Indicators

Evidenced required fields:

- First name
- Last name
- Date of birth
- Residential address in search mode
- Street number in manual mode
- Street name in manual mode
- Street type in manual mode
- Suburb in manual mode
- State in manual mode
- Postcode in manual mode
- Email address
- Phone number

Evidenced optional field:

- Unit number

## Hint And Helper Text

Evidence from `2.A`:

- Address search helper text: `Start typing and select your address from the results that appear. If you are unable to locate your address please enter it manually.`

Evidence from both frames:

- Phone helper text: `Enter your phone number using 10 digits with no spaces or symbols. Include the area code if you are entering a landline.`

## Error Summary Expectations

No error-summary frame or validation state was extracted from `2.A` or `2.B`.

The coded preview includes optional inline test error display only for Storybook and unit-test inspection. It must not be treated as production validation behaviour.

## Responsive Evidence

Only desktop frames were extracted in this pass.

Mobile behaviour remains unresolved. The preview uses responsive CSS so it can be inspected at narrow widths, but that is an implementation smoke path rather than Figma mobile evidence.

## Mapping To TaPaaS Templates

| Source | Mapping | Notes |
|---|---|---|
| TaPaaS Form input template `8410:37703` | Strong structural match | Focused form page, section headings, required-field hint, field groups, in-page field errors if needed. |
| MPS `2.A` | Form input page with address-search variant | Search behaviour and result list are unresolved. |
| MPS `2.B` | Form input page with manual-address variant | Manual address fields are source-evidenced. |

## Mapping To GEL Patterns

| Pattern | Mapping | Notes |
|---|---|---|
| GEL Field | Used for individual text/select controls | Labels and helper text preserved where evidenced. |
| GEL Input | Used for first name, last name, address text fields, email and phone | Mock form capture only. |
| GEL Select | Used for month, street type and state | Options are preview placeholders except state labels. |
| Date input pattern | Used for separate Day / Month / Year inputs | No age eligibility or date validation logic is implemented. |
| GEL Manual Address | Evidence-aligned shape | Manual-address source docs support manual entry, field config and error messaging, but the preview composes local Field/Input/Select controls rather than importing GEL ManualAddress. |

## Implementation Boundary

The preview implementation:

- is preview-only
- captures mock form values only
- supports search-address and manual-address variants
- does not perform real address lookup
- does not verify identity
- does not update customer records
- does not persist to a backend
- does not calculate age eligibility
- does not claim privacy, legal, policy, GEL, TaPaaS, WCAG or production approval

## Unknowns

- exact production address lookup behaviour
- result-list and no-result states for the address search
- production validation rules and error-summary behaviour
- whether street type options are complete and source-approved
- whether state restriction rules apply
- mobile frame variant
- assistive-technology behaviour
- owner-approved labels and helper text for a real service
- whether date of birth should use free-text month, select month, or another GEL-specific input in production

## Review Reason

`review_reason`: `engineer`, `accessibility`, `owner`, `privacy`, `policy`

## Validation

Targeted unit coverage checks:

- search-address variant renders required fields and helper text
- manual-address variant renders fieldset, manual field order and select values
- address-mode actions call preview callbacks

Broader checks:

- `npm run build:all`
- `npm run parity`

