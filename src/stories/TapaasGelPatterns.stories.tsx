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
  title: 'TaPaaS GEL Patterns/Batch 2',
  parameters: {
    docs: {
      description: {
        component: 'Storybook guidance only for TaPaaS GEL patterns composed from GEL primitives. These are source-informed local pattern previews, not production GEL exports, and not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim.',
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

export const ErrorSummaryAndFieldErrors: Story = {
  render: () => <ErrorSummaryAndFieldErrorsExample />,
}

export const RequiredAndOptionalFields: Story = {
  render: () => <RequiredAndOptionalFieldsExample />,
}

export const ProgressStepperUsage: Story = {
  render: () => (
    <div className='storybook-stack'>
      <PatternBoundaryNote />
      <Heading level={2}>Progress stepper usage</Heading>
      <p>This story shows a short transaction progress pattern for bounded flows where a visible stepper helps orientation.</p>
      <ProgressStepper
        stepsList={[
          { content: 'Privacy', status: 'completed' },
          { content: 'Details', status: 'current' },
          { content: 'Review', status: 'todo' },
          { content: 'Confirmation', status: 'todo' },
        ]}
      />
      <div className='storybook-note'>
        <strong>Usage boundary</strong>
        <p>Use this as pattern guidance only. Keep longer or complex transaction progress behaviour review-gated.</p>
      </div>
    </div>
  ),
}
