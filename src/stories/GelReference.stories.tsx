import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Button,
  Callout,
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  InPageAlert,
  Input,
  ProgressStepper,
  RadioButtonList,
  Select,
  Textarea,
  TextLink,
} from '../gel'
import './storybook.css'

const meta: Meta = {
  title: 'GEL Reference/Batch 1',
  parameters: {
    docs: {
      description: {
        component: 'Storybook reference only for Batch 1 GEL components. These are source-informed local previews, not production GEL exports, and not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim.',
      },
    },
  },
}

export default meta
type Story = StoryObj

function ReferenceBoundaryNote() {
  return (
    <div className='storybook-note'>
      <strong>source-informed local preview</strong>
      <p>Storybook reference only. This is not a production GEL export and not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim.</p>
    </div>
  )
}

function ButtonsAndLinksExample() {
  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Buttons and links</Heading>
      <p>Content, heading and text-link examples are included here to show the local GEL reference boundary for simple page content.</p>
      <div className='storybook-row'>
        <Button>Primary action</Button>
        <Button variant='secondary'>Secondary action</Button>
        <Button variant='tertiary'>Tertiary action</Button>
        <Button variant='link'>Button link action</Button>
      </div>
      <p>
        Read the <TextLink href='https://www.service.nsw.gov.au/'>Service NSW example link</TextLink>.
      </p>
    </div>
  )
}

function FieldsAndInputsExample() {
  const [fullName, setFullName] = useState('')
  const [reason, setReason] = useState('')
  const [state, setState] = useState('')
  const [reference, setReference] = useState('')

  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Fields and inputs</Heading>
      <Field id='gel-ref-full-name' label='Full name' helpMessage='Enter your name as it appears on your supporting documents.'>
        <Input id='gel-ref-full-name' value={fullName} onChange={(event) => setFullName(event.target.value)} inputWidth='xl' autoComplete='name' />
      </Field>
      <Field id='gel-ref-reference' label='Reference number' isOptional helpMessage='Use this example to check optional field copy.'>
        <Input id='gel-ref-reference' value={reference} onChange={(event) => setReference(event.target.value)} inputWidth='md' />
      </Field>
      <Field id='gel-ref-state' label='State' hasError={!state} errorMessage='Select a state.'>
        <Select
          id='gel-ref-state'
          value={state}
          onChange={(event) => setState(event.target.value)}
          hasError={!state}
          inputWidth='md'
          options={[
            { value: 'NSW', text: 'NSW' },
            { value: 'VIC', text: 'VIC' },
            { value: 'QLD', text: 'QLD' },
          ]}
        />
      </Field>
      <Field id='gel-ref-reason' label='Supporting information' helpMessage='Keep this short for the reference preview.'>
        <Textarea id='gel-ref-reason' value={reason} onChange={(event) => setReason(event.target.value)} rows={4} maxLength={500} />
      </Field>
    </div>
  )
}

function ChoiceControlsExample() {
  const [radio, setRadio] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Choice controls</Heading>
      <RadioButtonList
        id='gel-ref-radio'
        legend='Choose a reference option'
        options={[
          { value: 'standard', label: 'Standard application' },
          { value: 'renewal', label: 'Renewal application' },
          { value: 'replacement', label: 'Replacement application' },
        ]}
        value={radio}
        onChange={(value) => setRadio(String(value))}
        hasError={!radio}
        errorMessage='Choose a reference option.'
      />
      <Checkbox
        id='gel-ref-checkbox'
        label='I understand this is a Storybook reference only.'
        checked={checked}
        onChange={(value) => setChecked(Boolean(value))}
      />
    </div>
  )
}

export const ButtonsAndLinks: Story = {
  render: () => <ButtonsAndLinksExample />,
}

export const FieldsAndInputs: Story = {
  render: () => <FieldsAndInputsExample />,
}

export const ChoiceControls: Story = {
  render: () => <ChoiceControlsExample />,
}

export const FeedbackAndErrors: Story = {
  render: () => (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Feedback and errors</Heading>
      <ErrorSummary
        errors={[
          { id: 'gel-ref-full-name', text: 'Enter a full name' },
          { id: 'gel-ref-state', text: 'Select a state' },
        ]}
      />
      <InPageAlert variant='info' title='Information message'>
        <p>This in-page alert is rendered through the local GEL preview boundary.</p>
      </InPageAlert>
      <InPageAlert variant='warning' title='Review required'>
        <p>Use review wording for unverified legal, privacy, policy or operational content.</p>
      </InPageAlert>
      <Callout title='Names must match'>
        <p>If the names on your documents do not match, include supporting evidence where the transaction asks for it.</p>
      </Callout>
    </div>
  ),
}

export const ProgressStepperReference: Story = {
  render: () => (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Progress stepper</Heading>
      <ProgressStepper
        stepsList={[
          { content: 'Privacy', status: 'completed' },
          { content: 'Details', status: 'completed' },
          { content: 'Review', status: 'current' },
          { content: 'Confirmation', status: 'todo' },
        ]}
      />
    </div>
  ),
}
