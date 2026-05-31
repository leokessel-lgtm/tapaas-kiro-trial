import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  ConditionalQuestionPanel,
  PermitApplicationPictogram,
  RadioButtonCards,
  RenewApplicationPictogram,
  TapaasSearchAction,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Components/Choices & Inputs',
  parameters: {
    docs: {
      description: {
        component: 'Manifest-backed choices and inputs preview stories. These are preview-only and do not claim accessibility approval, WCAG compliance, GEL approval, TaPaaS approval, production readiness, privacy approval, policy approval or legal approval.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const SearchVehicleInput: Story = {
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Search vehicle input</strong>
        <p>Static preview only. Search behaviour, validation, result states and backend lookup are unresolved.</p>
      </div>
      <TapaasSearchAction />
    </div>
  ),
}

export const ConditionalQuestionPanelPattern: Story = {
  name: 'Conditional Question Panel',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the conditional question panel pattern. This is a preview-only reveal pattern with mock support content and no eligibility, identity or policy decisioning.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Conditional question panel</strong>
        <p>Preview-only conditional reveal pattern. Use for local form branching where the branch does not make a real eligibility, identity, concession or policy decision.</p>
        <ul>
          <li>Source context: form input template, conditional declaration pattern and MPS eligibility branch inventory.</li>
          <li>Implementation boundary: fieldset/legend radio group, visible error text and immediate conditional content reveal only.</li>
          <li>Unresolved: final branch labels, field rules, focus announcement behaviour and assistive-technology review.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <ConditionalQuestionPanel
        id='storybook-conditional-panel-isolated'
        legend='Do you need support with this application?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value='yes'
        onChange={() => undefined}
        showWhen='yes'
      >
        <p className='tapaas-help-text'>Mock support details would be collected here. Do not enter real personal information.</p>
      </ConditionalQuestionPanel>
      <ConditionalQuestionPanel
        id='storybook-conditional-panel-error'
        legend='Select a mock option'
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
        value=''
        onChange={() => undefined}
        hasError
        errorMessage='Select yes or no.'
      />
    </div>
  ),
}

function RadioButtonCardStatesExample() {
  const [selected, setSelected] = useState('renew')

  return (
    <div className='storybook-stack'>
      <RadioButtonCards
        id='storybook-radio-card-state-review'
        legend='What do you want to do?'
        value={selected}
        onChange={setSelected}
        options={[
          { value: 'new', label: 'Apply for a new permit', description: 'Start a new mock application.', pictogram: <PermitApplicationPictogram /> },
          { value: 'renew', label: 'Renew a permit', description: 'Use an existing mock permit number.', pictogram: <RenewApplicationPictogram /> },
        ]}
        required
      />
      <RadioButtonCards
        id='storybook-radio-card-error-review'
        legend='Select a mock option'
        value=''
        onChange={() => undefined}
        options={[
          { value: 'first', label: 'First option', description: 'Decorative pictogram placeholder.', pictogram: <PermitApplicationPictogram /> },
          { value: 'second', label: 'Second option', description: 'Decorative pictogram placeholder.', pictogram: <RenewApplicationPictogram /> },
        ]}
        hasError
        required
      />
      <div className='storybook-note'>
        <strong>Radio button cards — state review</strong>
        <p>Preview-only state surface for selected, unselected, focus, keyboard and error review. Source node <code>31:63988</code> remains marked CONCEPT.</p>
      </div>
    </div>
  )
}

export const RadioButtonCardStates: Story = {
  render: () => <RadioButtonCardStatesExample />,
}
