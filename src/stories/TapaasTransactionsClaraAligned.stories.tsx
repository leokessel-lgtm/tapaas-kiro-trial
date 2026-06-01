import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { AccessibleMarketPermitSkeleton } from '../AccessibleMarketPermitSkeleton'
import { TrialPermitSkeleton } from '../TrialPermitSkeleton'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Transactions',
  parameters: {
    docs: {
      description: {
        component: 'Clara-aligned transaction examples rendered for Storybook review. These stories are preview-only and do not claim production readiness, accessibility compliance, WCAG compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval or governance clearance.',
      },
    },
  },
}

export default meta
type Story = StoryObj

function TransactionBoundaryNote({
  transactionType,
  children,
}: {
  transactionType: string
  children: ReactNode
}) {
  return (
    <div className='storybook-note'>
      <strong>{transactionType}</strong>
      <p>
        Storybook review surface only. This renders the committed transaction component for designer and engineering review, not as a production, accessibility, privacy, legal, GEL, TaPaaS or governance approval claim.
      </p>
      {children}
    </div>
  )
}

export const TrialPermitClaraAligned: Story = {
  name: 'Trial Permit - Clara Aligned',
  parameters: {
    docs: {
      description: {
        story: 'Canonical short, immediate-approval TaPaaS transaction example aligned to the committed Clara/TaPaaS rules.',
      },
    },
  },
  render: () => (
    <div className='storybook-board'>
      <TransactionBoundaryNote transactionType='Trial Permit - Clara aligned'>
        <ul>
          <li>Short flow with no progress stepper.</li>
          <li>Privacy and terms before application details.</li>
          <li>Authenticated personal details are read-only playback.</li>
          <li>Declaration sits on the Application details page.</li>
          <li>Confirmation is immediate approval and the receipt is the permit.</li>
        </ul>
      </TransactionBoundaryNote>
      <TrialPermitSkeleton />
    </div>
  ),
}

export const AccessibleMarketPermitClaraAligned: Story = {
  name: 'Accessible Market Permit - Clara Aligned',
  parameters: {
    docs: {
      description: {
        story: 'Canonical longer, submitted-for-review TaPaaS transaction example aligned to the committed Clara/TaPaaS rules.',
      },
    },
  },
  render: () => (
    <div className='storybook-board'>
      <TransactionBoundaryNote transactionType='Accessible Market Permit - Clara aligned'>
        <ul>
          <li>Longer staged flow with stable stepper labels and no confirmation step in the stepper.</li>
          <li>Privacy and terms first.</li>
          <li>Authenticated identity details are read-only playback.</li>
          <li>Market stall and additional details capture transaction-specific information.</li>
          <li>Confirmation is submitted-for-review with genuine next steps.</li>
        </ul>
      </TransactionBoundaryNote>
      <AccessibleMarketPermitSkeleton />
    </div>
  ),
}
