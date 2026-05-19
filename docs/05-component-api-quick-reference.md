# Component API Quick Reference

## Button

```tsx
import { Button } from './gel'

<Button onClick={handleClick}>Continue</Button>
<Button variant="secondary" onClick={handleClick}>Cancel</Button>
<Button variant="link" onClick={handleClick}>Text action</Button>
<Button disabled>Disabled</Button>
```

**Props** (verified from `@snsw-gel/button` source):
- `variant`: `'primary'` | `'secondary'` | `'tertiary'` | `'destructive'` | `'link'`
- `type`: `'button'` | `'submit'` | `'reset'` (default: `'button'`)
- `onClick`: click handler
- `disabled`: boolean
- `href`: renders as anchor
- `children`: button content

## Input

```tsx
import { Field, Input } from './gel'

<Field id="email" label="Email address">
  <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</Field>

<Field id="postcode" label="Postcode">
  <Input id="postcode" inputWidth="xs" maxLength={4} />
</Field>
```

**Props** (verified from `@snsw-gel/input` source):
- `id`: string
- `value`: string
- `onChange`: change handler
- `hasError`: boolean
- `disabled`: boolean
- `type`: `'text'` | `'email'` | `'tel'` | etc.
- `inputWidth`: `'xxs'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
- `maxLength`: number
- `placeholder`: string

## Select

```tsx
import { Field, Select } from './gel'

<Field id="state" label="State or territory">
  <Select
    id="state"
    value={state}
    onChange={(e) => setState(e.target.value)}
    options={[
      { value: 'nsw', text: 'New South Wales' },
      { value: 'vic', text: 'Victoria' },
    ]}
  />
</Field>
```

**Props** (verified from `@snsw-gel/select` source):
- `id`: string
- `value`: string
- `onChange`: change handler
- `options`: `{ value: string; text: string }[]`
- `placeholder`: string (default: `'Select'`)
- `hasError`: boolean
- `disabled`: boolean
- `inputWidth`: same as Input

## Field

```tsx
import { Field, Input } from './gel'

<Field id="name" label="Full name" helpMessage="As shown on your ID">
  <Input id="name" />
</Field>

<Field id="phone" label="Phone" isOptional>
  <Input id="phone" type="tel" />
</Field>

<Field id="email" label="Email" hasError errorMessage="Enter a valid email">
  <Input id="email" hasError />
</Field>
```

**Props** (verified from `@snsw-gel/field` source):
- `id`: string
- `label`: ReactNode
- `helpMessage`: string (small grey text below label)
- `hasError`: boolean
- `errorMessage`: string (shown with error icon)
- `isOptional`: boolean (appends "(optional)" to label)
- `children`: the input element

## RadioButtonList

```tsx
import { RadioButtonList } from './gel'

<RadioButtonList
  id="choice"
  legend="Select an option"
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  value={selected}
  onChange={(value) => setSelected(value)}
  hasError={hasError}
  errorMessage="Select an option"
  vertical
/>
```

**Props** (verified from `@snsw-gel/radio-button-list` source):
- `id`: string
- `legend`: ReactNode (the question text)
- `options`: `{ value: T; label: ReactNode }[]`
- `value`: T (currently selected)
- `onChange`: `(value: T) => void`
- `hasError`: boolean
- `errorMessage`: string
- `vertical`: boolean (default: true)

## Checkbox

```tsx
import { Checkbox } from './gel'

<Checkbox
  id="agree"
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={(value) => setAgreed(!!value)}
  hasError={!agreed && submitted}
  errorMessage="You must agree to continue"
/>
```

**Props** (verified from `@snsw-gel/checkbox` source):
- `id`: string
- `label`: ReactNode
- `checked`: boolean
- `onChange`: `(value: string) => void` (returns value or empty string)
- `hasError`: boolean
- `errorMessage`: string
- `disabled`: boolean
- `value`: string (default: `'on'`)

## ErrorSummary

```tsx
import { ErrorSummary } from './gel'

const errors = [
  { id: 'field-1', text: 'Enter your name' },
  { id: 'field-2', text: 'Select a date' },
]

<ErrorSummary ref={errorSummaryRef} errors={errors} />
```

**Props** (verified from `@snsw-gel/error-summary` source):
- `errors`: `{ id: string; text: string }[]`
- `ref`: `Ref<HTMLDivElement>` (for focus management)
- `singularTitle`: string (default: "Your form has an error")
- `pluralTitle`: string (default: "Your form has errors")
- `id`: string

**Behaviour**: renders nothing when `errors` is empty. Links use `<a href="#id">` targeting the field.

## InPageAlert

```tsx
import { InPageAlert } from './gel'

<InPageAlert variant="error" title="Something went wrong">
  <p>Please try again later.</p>
</InPageAlert>

<InPageAlert variant="info" title="Note" compact />
```

**Props** (verified from `@snsw-gel/in-page-alert` source):
- `variant`: `'error'` | `'warning'` | `'success'` | `'info'`
- `title`: string (bold heading)
- `children`: ReactNode (body content)
- `compact`: boolean (smaller padding, inline layout)

## Back link pattern

```tsx
import { IconChevronLeft } from './layout-preview/icons'

<button type="button" className="snsw-back-link" onClick={handleBack}>
  <IconChevronLeft size={16} />
  Back
</button>
```

This uses the GEL chevron-left icon SVG and the `.snsw-back-link` CSS class.
