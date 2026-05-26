# MPS Medical Evidence source-state clarification

## Status

This artefact records the known Mobility Parking Scheme medical evidence source states, the current bounded preview mapping, unresolved ambiguity, and decisions needed before any upload-related story or implementation work.

This artefact does not approve upload behaviour.

This artefact does not prove GEL, WCAG, accessibility, privacy, security, legal, policy, production or TaPaaS approval.

MPS Medical Evidence remains ambiguity evidence until owner/designer confirmation.

## Source-state table

| Source frame | Node | Visible state | Current preview mapping | Safe static preview? | Ambiguity | Required decision owner | Recommended action |
|---|---|---|---|---|---|---|---|
| 4.A - Medical certificate | `0:17316` | Medical certificate required/not yet provided | `MpsMedicalEvidenceStatusPreview` with `evidenceType='certificate'` and `state='required'` | Yes, as status-only preview | True required copy, heading text, file rules and whether this means upload now or provide later remain unclear | Designer, product owner, content owner | source-owner-review |
| 4.Aa - Medical certificate uploaded | `0:17333` | Medical certificate uploaded/provided | `MpsMedicalEvidenceStatusPreview` with `evidenceType='certificate'` and `state='provided'`; static mock file name only | Yes, as static file-name display only | Whether uploaded means selected, attached, submitted, accepted, verified or stored is unresolved | Designer, engineering, privacy/security owner | security/privacy-review |
| 4.B - Medical report | `0:17357` | Medical report required/not yet provided | `MpsMedicalEvidenceStatusPreview` with `evidenceType='report'` and `state='required'` | Yes, as status-only preview | Source report wording, heading hierarchy and whether report requirements differ from certificate requirements remain unclear | Designer, product owner, content owner | source-owner-review |
| 4.Ba - Medical report uploaded | `0:17370` | Medical report uploaded/provided | `MpsMedicalEvidenceStatusPreview` with `evidenceType='report'` and `state='provided'`; static mock file name only | Yes, as static file-name display only | Whether uploaded means selected, attached, submitted, accepted, verified or stored is unresolved; report file constraints are not confirmed | Designer, engineering, privacy/security owner | security/privacy-review |

## Current bounded preview behaviour

- `MpsMedicalEvidenceStatusPreview` shows certificate/report status using `required` and `provided` states only.
- The preview displays static mock file names for provided states.
- The preview records medical evidence as a status/checklist pattern, not an upload component.
- The MPS transaction skeleton composes the preview through a thin mock adapter for certificate/report and uploaded/provide-later choices.
- `EvidenceChecklistCard` can summarise static evidence states such as required, provided, not required and needs review.
- Existing manifest boundaries state no real upload, remove-file behaviour, file storage, file validation, virus scanning, backend integration, medical assessment logic, privacy/security approval claim or production validation.

## Unresolved state-mapping questions

- Does source `uploaded` mean locally selected, attached to a draft, submitted to a backend, accepted by the service, verified, or stored?
- Is `provide later` a real MPS service state, a trial-only mock route, or an unsupported scenario?
- Are certificate and report upload states equivalent, or do they require different content, file rules or assessment handling?
- What are the final source headings for certificate and report states?
- What are the approved medical evidence labels, helper text, status text and file-name display rules?
- What file size, file type, file count and image/document constraints apply, if any?
- Is remove-file behaviour required in the MPS flow?
- Should the preview status be `required`, `provided`, `needs-review`, or a more specific service state?
- Which parts of the source are GEL upload behaviour, TaPaaS evidence-status behaviour, or MPS-specific service content?
- What privacy, security and retention statements are required for medical documents?

## Out-of-scope claims

The current preview and this clarification artefact must not claim or implement:

- real upload behaviour
- file input behaviour
- drag-and-drop behaviour
- uploaded item behaviour
- remove-file behaviour
- backend integration
- endpoint or API behaviour
- file validation
- file storage
- virus scanning
- file-size enforcement
- file-type enforcement
- file-count enforcement
- upload progress
- medical assessment
- eligibility decisioning
- identity checks
- customer-record updates
- privacy approval
- security approval
- legal approval
- policy approval
- production readiness
- GEL approval
- TaPaaS approval
- WCAG or accessibility compliance

## Decisions needed before any upload-related story

| Decision | Needed from | Why |
|---|---|---|
| Confirm true source-state meaning for required, uploaded and provide-later states | Designer, product owner | Prevents the preview from treating ambiguous frame names as service truth. |
| Confirm certificate vs report content differences | Designer, content owner, product owner | Determines whether one generic pattern is enough or whether separate guidance is needed. |
| Confirm file constraints, if they should be shown at all | Product owner, engineering, privacy/security owner | File size/type/count guidance can imply real validation and security behaviour. |
| Confirm upload and remove-file boundary | Engineering, privacy/security owner | Upload/remove actions require backend, storage, validation and security decisions. |
| Confirm privacy/security handling for medical documents | Privacy/security owner, product owner | Medical evidence can contain sensitive information and must not be normalised as a simple file upload. |
| Confirm whether GEL `FileUpload` is the intended base pattern | Designer, engineering | GEL source is available, but using it implies upload/API/error/progress behaviour unless carefully constrained. |
| Confirm whether MPS needs only static evidence-status display for the trial | Product owner, designer | May avoid unsafe upload work while still supporting review of the transaction flow. |

## Recommendation

Do not implement upload, file input, drop zone, uploaded item, remove-file, backend, validation, storage, virus-scan, file-size, file-type or progress behaviour.

Do not add a GEL upload reference story or TaPaaS upload pattern story until the MPS source-state mapping and upload boundary are owner-reviewed.

The next safe step is owner/designer/privacy/security review of this state table. After that review, choose one of:

- keep the existing static `MpsMedicalEvidenceStatusPreview` only
- add a story-only evidence-status clarification story
- add GEL upload reference stories as clearly inert reference examples
- stop upload-related work for the trial
