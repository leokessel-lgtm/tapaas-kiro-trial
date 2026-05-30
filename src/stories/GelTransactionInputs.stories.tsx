import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  CheckboxList,
  DateInput,
  DateMultiInput,
  Field,
  Fieldset,
  Heading,
} from '../gel'
import './storybook.css'

const meta: Meta = {
  title: 'GEL Reference/Transaction Inputs',
  parameters: {
    docs: {
      description: {
        component: 'Storybook reference only for Batch 3B GEL transaction inputs. These are source-informed local previews, not production GEL exports, and not an accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim.',
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

function FieldsetReferenceExample() {
  const [delivery, setDelivery] = useState('email')

  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Fieldset</Heading>
      <Fieldset
        id='gel-ref-fieldset-delivery'
        legend='Notification preference'
        helpMessage='Choose how this preview should show follow-up messages.'
      >
        <div className='storybook-stack'>
          {[
            { value: 'email', label: 'Email' },
            { value: 'sms', label: 'SMS' },
            { value: 'post', label: 'Post' },
          ].map((option) => (
            <label key={option.value} style={{ display: 'block' }}>
              <input
                type='radio'
                name='gel-ref-fieldset-delivery'
                value={option.value}
                checked={delivery === option.value}
                onChange={() => setDelivery(option.value)}
              />{' '}
              {option.label}
            </label>
          ))}
        </div>
      </Fieldset>
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This preview is for grouped-control structure and legend treatment only. It does not prove production GEL behaviour, full accessibility compliance or transaction policy rules.</p>
      </div>
    </div>
  )
}

function CheckboxListReferenceExample() {
  const [selected, setSelected] = useState<string[]>(['email'])

  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Checkbox list</Heading>
      <CheckboxList
        id='gel-ref-checkbox-list-updates'
        legend='Preview update types'
        helpMessage='Choose one or more update examples to show in this reference story.'
        value={selected}
        onChange={setSelected}
        options={[
          { value: 'email', label: 'Email updates', clarify: 'Used here as a neutral communication example only.' },
          { value: 'sms', label: 'SMS updates' },
          { value: 'postal', label: 'Postal updates', editor: 'Extra delivery detail would remain transaction-specific.' },
        ]}
      />
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This preview shows grouped independent checkbox options only. It does not imply consent, declaration, privacy, eligibility, policy or approval logic.</p>
      </div>
    </div>
  )
}

function DateInputReferenceExample() {
  const [date, setDate] = useState('')

  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Date input</Heading>
      <Field
        id='gel-ref-date-input'
        label='Preferred appointment date'
        helpMessage='For example, 31/01/2026.'
      >
        <DateInput
          id='gel-ref-date-input'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </Field>
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This is a visual reference for a date-shaped text input only. It does not parse, mask, validate, store or submit dates.</p>
      </div>
    </div>
  )
}

function DateMultiInputReferenceExample() {
  const [date, setDate] = useState<{ day?: string; month?: string; year?: string }>({ day: '', month: '', year: '' })

  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Date multi input</Heading>
      <DateMultiInput
        id='gel-ref-date-multi-input'
        label='Document issue date'
        helpMessage='Use this story to review day, month and year field grouping.'
        value={date}
        onChange={setDate}
      />
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This is a visual reference for grouped day, month and year fields only. It does not parse, mask, validate, calculate age, store or submit dates.</p>
      </div>
    </div>
  )
}

export const FieldsetReference: Story = {
  name: 'Fieldset',
  render: () => <FieldsetReferenceExample />,
}

export const CheckboxListReference: Story = {
  name: 'Checkbox list',
  render: () => <CheckboxListReferenceExample />,
}

export const DateInputReference: Story = {
  name: 'Date input',
  render: () => <DateInputReferenceExample />,
}

export const DateMultiInputReference: Story = {
  name: 'Date multi input',
  render: () => <DateMultiInputReferenceExample />,
}
