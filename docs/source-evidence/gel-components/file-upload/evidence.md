# Component evidence card: File upload

## Status

Intake complete.

## Component identity

| Field | Value |
|---|---|
| Component name | File upload |
| Package path | `packages/file-upload` |
| Package name | `@snsw-gel/file-upload` |
| Component family | Form / file handling |
| Risk class | High |
| Recommended testing depth | Full A/B test |

## Evidence found

| Evidence type | Found? | Path / note |
|---|---:|---|
| Curated MD | Unknown | Not yet generated |
| MDX docs | ✅ | Storybook MDX |
| Stories | ✅ | Storybook stories |
| Source | ✅ | Component source |
| Tests | ✅ | Test files |
| Styled source | Unknown | Not confirmed |
| Package metadata | ✅ | package.json |
| Rendered Storybook | Unknown | Not inspected |
| Owner confirmation | Unknown | Not sought |

## Verified

- Package exists at `@snsw-gel/file-upload` (Verified from package scan)
- MDX, stories, source and tests are present (Verified from package scan)
- Component is classified as high risk due to file handling, validation, progress and security-adjacent UX (Verified from risk rationale)
- Related packages exist: `@snsw-gel/file-input`, `@snsw-gel/drop-zone`, `@snsw-gel/uploaded-item` (Verified from package scan)

## Assumptions

- File upload likely validates file type, size and count constraints (Assumption — needs source confirmation)
- File upload likely provides upload progress feedback (Assumption — needs source confirmation)
- File upload likely composes with file-input, drop-zone and uploaded-item (Assumption — needs source confirmation)
- File upload likely announces upload status to assistive technology (Assumption — needs source confirmation)
- File upload likely handles error states for rejected files (Assumption — needs source confirmation)

## Unknowns

| Unknown | Evidence needed |
|---|---|
| File validation constraints (type, size, count) | Source-backed review |
| Upload progress mechanism (client-side vs server callback) | Source-backed review |
| Error handling for rejected files | Source-backed review |
| ARIA announcements during upload | Source-backed review + rendered Storybook |
| Relationship between file-upload, file-input, drop-zone and uploaded-item | Source-backed review |
| Security constraints (e.g. file type enforcement) | Source-backed review + owner confirmation |
| Keyboard interaction for file selection and removal | Source-backed review + rendered Storybook |
| Multiple file upload behaviour | Source-backed review |
| Drag-and-drop accessibility | Source-backed review + rendered Storybook |

## Risk notes

- High risk: file handling, validation, security-adjacent UX, progress state, error handling.
- File upload components often have accessibility gaps around drag-drop and progress announcements.
- Security constraints (allowed file types, size limits) cannot be inferred from MD alone.
- Cannot infer any runtime, DOM or ARIA behaviour from package scan alone.

## Recommendation

| Question | Answer |
|---|---|
| Is curated MD enough for guidance? | Partial |
| Is source-backed evidence needed? | Yes |
| Is rendered Storybook needed? | Yes |
| Is owner confirmation needed? | Yes |
| Should this get a full A/B test? | Yes |
