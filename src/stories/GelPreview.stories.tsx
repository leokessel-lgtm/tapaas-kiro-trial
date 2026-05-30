import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Accordion,
  Button,
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  InPageAlert,
  Input,
  MoreInfoDisclosure,
  ProgressStepper,
  RadioButtonList,
  Select,
  Textarea,
  TextLink,
} from '../gel'
import './storybook.css'

const meta: Meta = {
  title: 'Development Evidence/Legacy GEL Preview/Form Controls',
  parameters: {
    docs: {
      description: {
        component: 'Legacy local GEL preview smoke surface retained for development evidence only. This is not the preferred designer review surface, not acceptance-manifest-backed, not real @snsw-gel/react adoption, and not production, WCAG, GEL or TaPaaS approval evidence. Use GEL Reference/* and TaPaaS GEL Patterns/* for curated review.',
      },
    },
  },
}

export default meta
type Story = StoryObj

function InputsAndFieldsExample() {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [state, setState] = useState('')

  return (
    <div className='storybook-surface'>
      <Heading level={2}>Input, textarea and select</Heading>
      <Field id='storybook-name' label='Full name' helpMessage='Example GEL-style field wrapper.'>
        <Input id='storybook-name' value={name} onChange={(event) => setName(event.target.value)} inputWidth='xl' autoComplete='name' />
      </Field>
      <Field id='storybook-details' label='Supporting information' helpMessage='Example multi-line field.'>
        <Textarea id='storybook-details' value={details} onChange={(event) => setDetails(event.target.value)} rows={4} maxLength={500} />
      </Field>
      <Field id='storybook-state' label='State' hasError={!state} errorMessage='Select your state.'>
        <Select
          id='storybook-state'
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
    </div>
  )
}

function ChoiceControlsExample() {
  const [radio, setRadio] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div className='storybook-surface'>
      <Heading level={2}>Radio buttons and checkbox</Heading>
      <RadioButtonList
        id='storybook-radio'
        legend='Choose a mock option'
        options={[
          { value: 'one', label: 'First option' },
          { value: 'two', label: 'Second option' },
          { value: 'three', label: 'Third option' },
        ]}
        value={radio}
        onChange={(value) => setRadio(String(value))}
        hasError={!radio}
        errorMessage='Choose a mock option.'
      />
      <Checkbox
        id='storybook-checkbox'
        label='I understand this is preview-only.'
        checked={checked}
        onChange={(value) => setChecked(Boolean(value))}
      />
    </div>
  )
}

export const InputsAndFields: Story = {
  render: () => <InputsAndFieldsExample />,
}

export const ChoiceControls: Story = {
  render: () => <ChoiceControlsExample />,
}

export const FeedbackAndNavigation: Story = {
  render: () => (
    <div className='storybook-stack'>
      <Heading level={2}>Feedback, links and navigation</Heading>
      <ErrorSummary
        errors={[
          { id: 'storybook-field-one', text: 'Enter a value for field one' },
          { id: 'storybook-field-two', text: 'Select an option for field two' },
        ]}
      />
      <InPageAlert variant='info' title='Information message'>
        <p>This is a preview-only in-page alert.</p>
      </InPageAlert>
      <InPageAlert variant='warning' title='Owner confirmation required'>
        <p>Use warnings for placeholder legal, privacy, policy or operational content.</p>
      </InPageAlert>
      <div className='storybook-row'>
        <Button>Primary action</Button>
        <Button variant='secondary'>Secondary action</Button>
        <Button variant='link'>Link action</Button>
      </div>
      <p><TextLink href='https://service.nsw.gov.au'>Example text link</TextLink></p>
      <ProgressStepper
        stepsList={[
          { content: 'Privacy', status: 'completed' },
          { content: 'Details', status: 'current' },
          { content: 'Review', status: 'todo' },
          { content: 'Confirmation', status: 'todo' },
        ]}
      />
    </div>
  ),
}

export const DisclosureAndAccordion: Story = {
  render: () => (
    <div className='storybook-stack'>
      <Heading level={2}>Disclosure and accordion</Heading>
      <MoreInfoDisclosure triggerText='What this preview includes' title='Preview boundary'>
        <p>This inline disclosure is not the full GEL MoreInfoPanel modal implementation.</p>
      </MoreInfoDisclosure>
      <Accordion
        id='storybook-accordion'
        name='storybook sections'
        items={[
          {
            id: 'story-accordion-one',
            title: 'Accessibility note',
            children: <p>Accordion content should be supporting content, not required legal or critical information.</p>,
          },
          {
            id: 'story-accordion-two',
            title: 'Implementation note',
            children: <p>Open all and Close all move focus between controls following the GEL source intent.</p>,
          },
        ]}
      />
    </div>
  ),
}
