import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  DetailsCard,
  InteractiveDetailsCard,
  PrivacyCardPreview,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Components/Cards & Panels',
  parameters: {
    docs: {
      description: {
        component: 'Manifest-backed cards and panels preview stories. These are preview-only and do not claim accessibility approval, WCAG compliance, GEL approval, TaPaaS approval, production readiness, privacy approval, policy approval or legal approval.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const DetailsCardPattern: Story = {
  name: 'Details Card',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the TaPaaS details card from component node 2413:787. This is a read-only contextual summary pattern with optional local action only.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Details card</strong>
        <p>Preview-only read-only context card. Use for orientation or static detail playback only.</p>
        <ul>
          <li>Source context node: <code>2413:787</code>.</li>
          <li>Implementation boundary node: existing <code>DetailsCard</code> preview component.</li>
          <li>Unresolved: final status-label treatment, action availability, real route destinations and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <DetailsCard
        title='Account context'
        description='Read-only preview content. No real account or identity data is used.'
        statusLabel='Mock verified'
        rows={[
          { label: 'Name', value: 'Alex Citizen' },
          { label: 'Customer number', value: 'MOCK-0000' },
          { label: 'Contact email', value: 'alex.citizen@example.test' },
        ]}
        onAction={() => undefined}
        actionLabel='Review mock details'
      />
    </div>
  ),
}

export const DetailsCardContext: Story = {
  render: () => (
    <div className='storybook-stack'>
      <DetailsCard
        title='Mock account context'
        description='Read-only context only. No real account data is used.'
        statusLabel='Mock verified'
        rows={[
          { label: 'Account name', value: 'Alex Citizen' },
          { label: 'Identity status', value: 'Verified in mock scenario' },
          { label: 'Email', value: 'alex.citizen@example.test' },
        ]}
      />
    </div>
  ),
}

function InteractiveDetailsCardPatternExample() {
  const [lastAction, setLastAction] = useState('No preview action selected')

  return (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Interactive details card</strong>
        <p>Preview-only context card with explicit local actions. Use for review of action placement only.</p>
        <ul>
          <li>Source context node: <code>2958:2499</code>.</li>
          <li>Implementation boundary node: existing <code>InteractiveDetailsCard</code> preview component.</li>
          <li>Unresolved: action semantics, focus expectations, real routes, persistence, analytics and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <p aria-live='polite'>{lastAction}</p>
      <InteractiveDetailsCard
        title='Key information'
        description='Interactive details card example with preview-only actions.'
        statusLabel='Mock active'
        rows={[
          { label: 'Name', value: 'Alex Citizen' },
          { label: 'Permit type', value: 'Individual MPS permit' },
          { label: 'Status', value: 'Static preview only' },
        ]}
        actions={[
          { label: 'Review details', onAction: () => setLastAction('Review details selected in preview'), variant: 'secondary' },
          { label: 'Remove this vehicle', onAction: () => setLastAction('Remove selected in preview'), variant: 'link' },
        ]}
      />
    </div>
  )
}

export const InteractiveDetailsCardPattern: Story = {
  name: 'Interactive Details Card',
  render: () => <InteractiveDetailsCardPatternExample />,
}

export const PrivacyCardPattern: Story = {
  name: 'Privacy Card Pattern',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the TaPaaS privacy-card structure from component node 1:198 and privacy step template 3395:41359. Placeholder privacy, terms and notification wording must be owner-confirmed before reuse.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Privacy card pattern</strong>
        <p>Preview-only privacy/start card structure. This story is for component review, not privacy approval.</p>
        <ul>
          <li>Sources: Components - TaPaaS Design Library Privacy card node 1:198; Templates - TaPaaS Design Library Privacy step node 3395:41359.</li>
          <li>Implementation boundary: visible privacy card anatomy, content sections and optional acknowledgement checkbox only.</li>
          <li>Unresolved: agency-specific collection notice, legal/terms wording, notification channels, privacy approval and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <PrivacyCardPreview acknowledgementChecked />
      <PrivacyCardPreview
        title='Privacy information with required acknowledgement'
        acknowledgementChecked={false}
        hasError
      />
    </div>
  ),
}
