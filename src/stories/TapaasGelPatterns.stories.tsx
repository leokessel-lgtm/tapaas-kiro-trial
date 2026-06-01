import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  ErrorSummary,
  Field,
  Heading,
  Input,
  ProgressStepper,
  Select,
  Textarea,
} from '../gel'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS GEL Patterns/Form Patterns',
  parameters: {
    docs: {
      description: {
        component: 'Storybook guidance only for TaPaaS GEL patterns composed from GEL primitives. These are source-informed local pattern previews, not production GEL exports, and not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim. Transaction-specific Clara/TaPaaS rules may override these generic examples.',
      },
    },
  },
}

export default meta
type Story = StoryObj

function PatternBoundaryNote() {
  return (
    <div className='storybook-note'>
      <strong>source-informed local pattern preview</strong>
      <p>Storybook guidance only. This is not a production GEL export and not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim.</p>
      <p>Generic GEL examples and Clara/TaPaaS transaction rules are not interchangeable. Current Clara-aligned runtime app examples are Trial Permit, Accessible Market Permit, MPS and Community Venue. Dedicated Clara-aligned Storybook transaction stories currently cover Trial Permit and Accessible Market Permit under TaPaaS Transactions.</p>
    </div>
  )
}

function ErrorSummaryAndFieldErrorsExample() {
  const [fullName, setFullName] = useState('')
  const [state, setState] = useState('')
  const [details, setDetails] = useState('')
  const showErrors = true

  return (
    <div className='storybook-stack'>
      <PatternBoundaryNote />
      <Heading level={2}>Error summary and field errors</Heading>
      <p>This story shows a repeatable transaction pattern for pairing a form-level error summary with field-level error states.</p>
      <ErrorSummary
        id='tapaas-gel-pattern-error-summary'
        errors={[
          { id: 'tapaas-pattern-full-name', text: 'Enter a full name' },
          { id: 'tapaas-pattern-state', text: 'Select a state' },
          { id: 'tapaas-pattern-details', text: 'Enter supporting information' },
        ]}
      />
      <Field
        id='tapaas-pattern-full-name'
        label='Full name'
        hasError={showErrors && !fullName.trim()}
        errorMessage='Enter a full name.'
      >
        <Input id='tapaas-pattern-full-name' value={fullName} onChange={(event) => setFullName(event.target.value)} inputWidth='xl' autoComplete='name' />
      </Field>
      <Field
        id='tapaas-pattern-state'
        label='State'
        hasError={showErrors && !state}
        errorMessage='Select a state.'
      >
        <Select
          id='tapaas-pattern-state'
          value={state}
          onChange={(event) => setState(event.target.value)}
          hasError={showErrors && !state}
          inputWidth='md'
          options={[
            { value: 'NSW', text: 'NSW' },
            { value: 'ACT', text: 'ACT' },
            { value: 'VIC', text: 'VIC' },
          ]}
        />
      </Field>
      <Field
        id='tapaas-pattern-details'
        label='Supporting information'
        hasError={showErrors && !details.trim()}
        errorMessage='Enter supporting information.'
      >
        <Textarea id='tapaas-pattern-details' value={details} onChange={(event) => setDetails(event.target.value)} rows={4} />
      </Field>
    </div>
  )
}

function RequiredAndOptionalFieldsExample() {
  const [customerName, setCustomerName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [phone, setPhone] = useState('')
  const showErrors = true

  return (
    <div className='storybook-stack'>
      <PatternBoundaryNote />
      <Heading level={2}>Required and optional fields</Heading>
      <p>This story shows required and optional field treatment for transaction forms without creating a TaPaaS wrapper.</p>
      <p><span aria-hidden='true'>*</span> indicates a required field</p>
      <Field
        id='tapaas-pattern-customer-name'
        label='Customer name *'
        hasError={showErrors && !customerName.trim()}
        errorMessage='Enter a customer name.'
      >
        <Input id='tapaas-pattern-customer-name' value={customerName} onChange={(event) => setCustomerName(event.target.value)} inputWidth='xl' autoComplete='name' />
      </Field>
      <Field
        id='tapaas-pattern-middle-name'
        label='Middle name'
        isOptional
        helpMessage='Only enter this if it appears on your supporting document.'
      >
        <Input id='tapaas-pattern-middle-name' value={middleName} onChange={(event) => setMiddleName(event.target.value)} inputWidth='xl' autoComplete='additional-name' />
      </Field>
      <Field
        id='tapaas-pattern-phone'
        label='Phone number *'
        helpMessage='Enter a phone number using 10 digits with no spaces or symbols.'
        hasError={showErrors && !phone.trim()}
        errorMessage='Enter a phone number.'
      >
        <Input id='tapaas-pattern-phone' value={phone} onChange={(event) => setPhone(event.target.value)} inputWidth='xl' autoComplete='tel' inputMode='tel' />
      </Field>
    </div>
  )
}

function DateOfBirthPatternExample() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const showErrors = true
  const hasDateError = showErrors && (!day.trim() || !month || !year.trim())
  const errorId = 'tapaas-pattern-dob-error'

  return (
    <div className='storybook-stack'>
      <PatternBoundaryNote />
      <Heading level={2}>Date of birth pattern</Heading>
      <p>This story shows visual, content and structure guidance for a DOB/date input pattern using existing GEL primitives only.</p>
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This does not include real DOB validation, age eligibility, identity checks, backend validation or customer-record behaviour.</p>
      </div>
      <ErrorSummary
        id='tapaas-pattern-dob-error-summary'
        errors={[
          { id: 'tapaas-pattern-dob-day', text: 'Enter a date of birth' },
        ]}
      />
      <fieldset
        aria-describedby={hasDateError ? errorId : undefined}
        aria-invalid={hasDateError || undefined}
        style={{
          border: 0,
          margin: 0,
          padding: 0,
        }}
      >
        <legend style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Date of birth *</legend>
        <p style={{ marginTop: 0 }}>For example, 31 Jan 1980.</p>
        <div className='storybook-row'>
          <Field id='tapaas-pattern-dob-day' label='Day'>
            <Input
              id='tapaas-pattern-dob-day'
              value={day}
              onChange={(event) => setDay(event.target.value)}
              hasError={hasDateError}
              inputWidth='xxs'
              placeholder='DD'
              autoComplete='bday-day'
              inputMode='numeric'
              maxLength={2}
            />
          </Field>
          <Field id='tapaas-pattern-dob-month' label='Month'>
            <Select
              id='tapaas-pattern-dob-month'
              value={month}
              onChange={(event) => setMonth(event.target.value)}
              hasError={hasDateError}
              inputWidth='xs'
              placeholder='MMM'
              options={[
                { value: 'jan', text: 'Jan' },
                { value: 'feb', text: 'Feb' },
                { value: 'mar', text: 'Mar' },
                { value: 'apr', text: 'Apr' },
                { value: 'may', text: 'May' },
                { value: 'jun', text: 'Jun' },
                { value: 'jul', text: 'Jul' },
                { value: 'aug', text: 'Aug' },
                { value: 'sep', text: 'Sep' },
                { value: 'oct', text: 'Oct' },
                { value: 'nov', text: 'Nov' },
                { value: 'dec', text: 'Dec' },
              ]}
              autoComplete='bday-month'
            />
          </Field>
          <Field id='tapaas-pattern-dob-year' label='Year'>
            <Input
              id='tapaas-pattern-dob-year'
              value={year}
              onChange={(event) => setYear(event.target.value)}
              hasError={hasDateError}
              inputWidth='xs'
              placeholder='YYYY'
              autoComplete='bday-year'
              inputMode='numeric'
              maxLength={4}
            />
          </Field>
        </div>
        {hasDateError && (
          <div id={errorId} style={{ fontWeight: 700, marginTop: '-0.5rem' }}>
            Enter a date of birth.
          </div>
        )}
      </fieldset>
    </div>
  )
}

export const ErrorSummaryAndFieldErrors: Story = {
  render: () => <ErrorSummaryAndFieldErrorsExample />,
}

export const RequiredAndOptionalFields: Story = {
  render: () => <RequiredAndOptionalFieldsExample />,
}

export const DateOfBirthPattern: Story = {
  render: () => <DateOfBirthPatternExample />,
}

export const ProgressStepperUsage: Story = {
  render: () => (
    <div className='storybook-stack'>
      <PatternBoundaryNote />
      <Heading level={2}>Progress stepper usage</Heading>
      <p>This story shows a generic progress-stepper pattern for bounded flows where a visible stepper helps orientation. For Clara/TaPaaS transaction flows, confirmation is excluded from the transaction stepper.</p>
      <ProgressStepper
        stepsList={[
          { content: 'Privacy', status: 'completed' },
          { content: 'Details', status: 'current' },
          { content: 'Review', status: 'todo' },
        ]}
      />
      <div className='storybook-note'>
        <strong>Usage boundary</strong>
        <p>Use this as pattern guidance only. Keep longer or complex transaction progress behaviour review-gated, and do not add Confirmation as a transaction stepper item for Clara/TaPaaS transaction examples.</p>
      </div>
    </div>
  ),
}
