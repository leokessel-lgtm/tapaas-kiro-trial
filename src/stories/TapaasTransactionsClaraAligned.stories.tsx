import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { AccessibleMarketPermitSkeleton } from '../AccessibleMarketPermitSkeleton'
import { BuskingPermitSkeleton } from '../BuskingPermitSkeleton'
import { NoticeOfDisposalSkeleton } from '../NoticeOfDisposalSkeleton'
import { TrialPermitSkeleton } from '../TrialPermitSkeleton'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Transactions',
  parameters: {
    docs: {
      description: {
        component: 'TaPaaS transaction examples rendered for Storybook review using the committed Clara/TaPaaS rule layer. These stories are preview-only and do not claim production readiness, accessibility compliance, WCAG compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval or governance clearance.',
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


export const BuskingPermitRuleGeneratedPrototype: Story = {
  name: 'Busking Permit - Rule-generated Prototype',
  parameters: {
    docs: {
      description: {
        story: 'Prompt-generated, submitted-for-review TaPaaS transaction prototype using the committed Clara/TaPaaS rule layer. Uses a 5-step progress stepper with confirmation excluded.',
      },
    },
  },
  render: () => (
    <div className='storybook-board'>
      <TransactionBoundaryNote transactionType='Busking Permit - rule-generated prototype'>
        <ul>
          <li>Prompt-generated prototype using the Clara/TaPaaS rule layer. It has not been reviewed or approved by Clara, TaPaaS, GEL, legal, privacy, accessibility or governance owners.</li>
          <li>Longer staged flow with stable stepper labels and no confirmation step in the stepper.</li>
          <li>Privacy and terms first.</li>
          <li>Authenticated personal details are read-only playback from Account/Profile.</li>
          <li>Performance details and additional details capture transaction-specific information.</li>
          <li>Declaration sits on the Additional details page.</li>
          <li>Confirmation is submitted-for-review with genuine next steps.</li>
        </ul>
      </TransactionBoundaryNote>
      <BuskingPermitSkeleton />
    </div>
  ),
}


export const NoticeOfDisposalFigmaInformedPrototype: Story = {
  name: 'Notice of Disposal - Figma-informed Prototype',
  parameters: {
    docs: {
      description: {
        story: 'Figma-informed prototype using TaPaaS transaction rules and a sanitised source summary. This has not been approved by TaPaaS, GEL, legal, privacy, accessibility, policy or governance owners.',
      },
    },
  },
  render: () => (
    <div className='storybook-board'>
      <TransactionBoundaryNote transactionType='Notice of Disposal - Figma-informed prototype'>
        <ul>
          <li>This is a Figma-informed prototype using TaPaaS transaction rules and a sanitised source summary.</li>
          <li>It has not been approved by TaPaaS, GEL, legal, privacy, accessibility, policy or governance owners.</li>
          <li>Staged flow: Privacy, Vehicle selection, Sale and buyer details, Review. Confirmation excluded from stepper.</li>
          <li>Your details are read-only Account/Profile playback.</li>
          <li>Buyer type branches into Individual and Motor dealer paths.</li>
          <li>Confirmation is successful lodgement with genuine next steps.</li>
          <li>No real lookup, backend integration, payment or notification behaviour.</li>
        </ul>
      </TransactionBoundaryNote>
      <NoticeOfDisposalSkeleton />
    </div>
  ),
}
