import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  BackendErrorExamplePage,
  DeclarationReview,
  InteractiveDetailsCard,
  LegalInfoAccordion,
  PermitApplicationPictogram,
  RadioButtonCards,
  RenewApplicationPictogram,
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
          { value: 'new', label: 'Apply for a new permit', description: 'Start a new mock application.', pictogram: <PermitApplicationPictogram /> },
          { value: 'renew', label: 'Renew a permit', description: 'Use an existing mock permit number.', pictogram: <RenewApplicationPictogram /> },
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
