import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  BackendErrorExamplePage,
  DeclarationReview,
  InteractiveDetailsCard,
  LegalInfoAccordion,
  RadioButtonCards,
  backendErrorExamples,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'Visual QA & Evidence/Selected Maturity',
  parameters: {
    docs: {
      description: {
        component: 'Manifest-backed visual QA and evidence review surface for selected maturity backlog components. This remains preview-only evidence and does not claim production readiness, WCAG compliance, GEL approval, TaPaaS approval, legal approval, privacy approval or policy approval.',
      },
    },
  },
}

export default meta
type Story = StoryObj

function SelectedMaturityComponentsExample() {
  const [applicationType, setApplicationType] = useState('renew')
  const [removed, setRemoved] = useState(false)

  return (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Selected maturity backlog components</strong>
        <p>These examples are source-backed preview candidates, not production TaPaaS components.</p>
      </div>
      <RadioButtonCards
        id='storybook-radio-cards'
        legend='What do you want to do?'
        value={applicationType}
        onChange={setApplicationType}
        options={[
          { value: 'new', label: 'Apply for a new permit', description: 'Start a new mock application.', pictogram: <SelectedMaturityPermitIcon /> },
          { value: 'renew', label: 'Renew a permit', description: 'Use an existing mock permit number.', pictogram: <SelectedMaturityRefreshIcon /> },
        ]}
        required
      />
      <DeclarationReview
        title='Declaration review'
        sections={[
          {
            title: 'Accepted declaration',
            statements: [
              'I declare that the information provided is true and correct.',
              'I understand this preview does not submit to a real service.',
            ],
          },
        ]}
      />
      <LegalInfoAccordion />
      <InteractiveDetailsCard
        title='Key information'
        description='Interactive details card example. Action uses a preview link-button pattern.'
        statusLabel={removed ? 'Removed in mock state' : 'Mock active'}
        rows={[
          { label: 'Name', value: 'Alex Citizen' },
          { label: 'Permit type', value: 'Individual MPS permit' },
        ]}
        actions={[
          { label: removed ? 'Restore mock holder' : 'Remove this vehicle', onAction: () => setRemoved((value) => !value), variant: 'link' },
        ]}
      />
      <BackendErrorExamplePage example={backendErrorExamples.addressNotNsw} onStartAgain={() => undefined} />
    </div>
  )
}

export const SelectedMaturityComponents: Story = {
  render: () => <SelectedMaturityComponentsExample />,
}

function SelectedMaturityPermitIcon() {
  return (
    <svg viewBox='0 0 32 32' focusable='false'>
      <path fill='currentColor' d='M8 4h12l4 4v20H8V4Zm11 2.8V9h2.2L19 6.8ZM11 13h10v2H11v-2Zm0 4h10v2H11v-2Zm0 4h7v2h-7v-2Z' />
    </svg>
  )
}

function SelectedMaturityRefreshIcon() {
  return (
    <svg viewBox='0 0 32 32' focusable='false'>
      <path fill='currentColor' d='M23.5 9.8A9 9 0 1 0 25 16h-3a6 6 0 1 1-1.1-3.5L17 16h10V6l-3.5 3.8Z' />
    </svg>
  )
}
