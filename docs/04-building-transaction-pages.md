# Building Transaction Pages

## Page structure

A Service NSW transaction page has these regions:

```
┌─────────────────────────────────────────┐
│ Utility bar (dark charcoal #22272B)     │
├─────────────────────────────────────────┤
│ Header (white, Service NSW logo + nav)  │
├─────────────────────────────────────────┤
│ Hero band (grey #f2f2f2, title + label) │
├─────────────────────────────────────────┤
│ Main content (white #ffffff)            │
│   └─ max-width 768px, left-aligned     │
├─────────────────────────────────────────┤
│ Acknowledgement (grey #dee3e5)          │
├─────────────────────────────────────────┤
│ Footer (dark #22272B, 3-column)         │
├─────────────────────────────────────────┤
│ Footer bottom (slightly lighter #333940)│
└─────────────────────────────────────────┘
```

## Page shell

The page shell (header, footer, acknowledgement) is **not a GEL component**. No header/footer package exists in the GEL source snapshot. The shell is provided by the CMS on the live site and loaded via JavaScript.

For local preview, create a `ServiceNSWChrome` wrapper component that approximates the shell.

### Key shell elements
- **Utility bar**: Change language (globe icon), Account (avatar icon), Log out (sign-out icon)
- **Header**: Service NSW logo SVG, nav links (Home, Find services, Business, Find locations), search input + red button
- **Hero band**: Service label (small grey text), page title (h1, 2.25rem bold)
- **Footer**: 3-column grid (Find services, Service NSW, Contact), social icons, bottom links strip

### Assets available
- Service NSW logo: fetch from `https://www.service.nsw.gov.au/themes/snsw_theme/images/servicensw-logo.svg`
- Icons (globe, avatar, sign-out, search, chevron): extract SVG paths from `@snsw-gel/ui-icons` in the source snapshot
- Public Sans font: `https://fonts.service.nsw.gov.au/public-sans-min.css`

## Building a form page

### Step 1: Create the page component

```typescript
// src/MyPage.tsx
import { Button, Field, Input, RadioButtonList, ErrorSummary } from './gel'
import { IconChevronLeft } from './layout-preview/icons'

export function MyPage() {
  // State, validation, handlers...
  
  return (
    <div>
      <ErrorSummary ref={errorSummaryRef} errors={errors} />
      
      <Field id="my-field" label="Field label">
        <Input id="my-field" value={value} onChange={handleChange} />
      </Field>
      
      <Button onClick={handleSubmit}>Continue</Button>
      
      <button type="button" className="snsw-back-link" onClick={handleBack}>
        <IconChevronLeft size={16} />
        Back
      </button>
    </div>
  )
}
```

### Step 2: Wire it into App.tsx

```typescript
import { ServiceNSWChrome } from './layout-preview/ServiceNSWChrome'
import { MyPage } from './MyPage'

export function App() {
  return (
    <ServiceNSWChrome serviceLabel="My Service" pageTitle="Page title">
      <MyPage />
    </ServiceNSWChrome>
  )
}
```

## Error handling pattern

### Consolidated errors (GEL pattern)

1. **ErrorSummary** at the top of the form — shows all errors with links
2. **Inline errors** below each invalid field — uses the field error pattern (icon + pink bg)
3. **Focus management** — ErrorSummary receives focus via ref when errors appear

### Implementation

```typescript
const errors: { id: string; text: string }[] = []
if (fieldAError) errors.push({ id: 'field-a', text: 'Error message for field A' })
if (fieldBError) errors.push({ id: 'field-b', text: 'Error message for field B' })

// On submit:
if (errors.length > 0) {
  setTimeout(() => errorSummaryRef.current?.focus(), 0)
}
```

### Error count affects the title
- 1 error: "Your form has an error" + "Check the error:"
- 2+ errors: "Your form has errors" + "Check the 2 errors:"

## Multi-page flows

For multi-page transactions without a router:

```typescript
type Page = 'page-1' | 'page-2' | 'page-3'
const [currentPage, setCurrentPage] = useState<Page>('page-1')
```

Update the hero title dynamically based on the current page.

## GEL components available in preview

| Component | GEL package | Preview status |
|-----------|-------------|----------------|
| Button | `@snsw-gel/button` | ✅ Primary, secondary, tertiary, link variants |
| Input | `@snsw-gel/input` | ✅ With inputWidth sizing |
| Select | `@snsw-gel/select` | ✅ With custom chevron |
| Field | `@snsw-gel/field` | ✅ Label, help text, error |
| RadioButtonList | `@snsw-gel/radio-button-list` | ✅ Custom radio indicators |
| Checkbox | `@snsw-gel/checkbox` | ✅ Custom checkbox indicator |
| ErrorSummary | `@snsw-gel/error-summary` | ✅ InPageAlert error variant |
| InPageAlert | `@snsw-gel/in-page-alert` | ✅ Error, warning, success, info |
| Heading | `@snsw-gel/content` | ✅ Levels 1-6 |
| TextLink | `@snsw-gel/text-link` | ✅ href or button |
| GlobalStyle | `@snsw-gel/theming` | ✅ (no-op in preview) |

## Prompts for Kiro

### Build a new page
```
Create a new page component for [description].
Use GEL components from ./gel only.
Match the Service NSW form styling.
Include error handling with ErrorSummary.
Include Continue button and Back link.
```

### Add validation
```
Add form validation to [page].
Show ErrorSummary at top with all errors.
Show inline errors below each invalid field.
Focus ErrorSummary when errors appear.
Error count should match the number of inline errors shown.
```

### Match a design
```
Here is the target design [attach image].
Replicate the layout using GEL components.
Match colours and spacing from the live service.nsw.gov.au CSS variables.
Use the page shell (ServiceNSWChrome) for header/footer.
```
