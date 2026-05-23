import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, Field, Input, InPageAlert, Textarea } from '../gel'
import {
  AssessmentSummaryPanel,
  BusinessErrorPage,
  ConditionalQuestionPanel,
  ConfirmationHeader,
  DetailsCard,
  EvidenceChecklistCard,
  ExitModal,
  RepeatableGroup,
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Preview/Composites',
  parameters: {
    docs: {
      description: {
        component: 'Trial-only TaPaaS preview composites. These help designers review component relationships outside full transaction flows.',
      },
    },
  },
}

export default meta
type Story = StoryObj

function ConditionalAndRepeatableExample() {
  const [needsSupport, setNeedsSupport] = useState('')
  const [supportDetails, setSupportDetails] = useState('')
  const [contact, setContact] = useState('')

  return (
    <div className='storybook-stack'>
      <ConditionalQuestionPanel
        id='storybook-conditional'
        legend='Do you need support with this application?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={needsSupport}
        onChange={setNeedsSupport}
        showWhen='yes'
      >
        <Field id='support-details' label='Support details' helpMessage='Do not enter real personal information.'>
          <Textarea id='support-details' value={supportDetails} onChange={(event) => setSupportDetails(event.target.value)} rows={3} />
        </Field>
      </ConditionalQuestionPanel>
      <RepeatableGroup title='Authorised contact 1' description='Repeatable group using semantic fieldset and legend.'>
        <Field id='contact-name' label='Full name'>
          <Input id='contact-name' value={contact} onChange={(event) => setContact(event.target.value)} inputWidth='xl' />
        </Field>
      </RepeatableGroup>
    </div>
  )
}

function ModalAndBusinessErrorExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='storybook-stack'>
      <InPageAlert variant='warning' title='Trial boundary'>
        <p>Modal and business-error behaviour still needs VoiceOver/NVDA review.</p>
      </InPageAlert>
      <Button onClick={() => setIsOpen(true)}>Open exit modal</Button>
      <ExitModal
        isOpen={isOpen}
        onContinue={() => setIsOpen(false)}
        onExit={() => setIsOpen(false)}
        description='This preview does not save draft applications.'
      />
      <BusinessErrorPage
        title='Concession details need attention'
        message={<p>The mock concession outcome selected on this run cannot progress automatically.</p>}
        guidance={<p>Real concession recovery wording and backend rules need owner confirmation.</p>}
        reference='MPS-CONCESSION-MOCK'
        onStartAgain={() => undefined}
      />
      <TransactionCtaGroup onContinue={() => undefined} onBack={() => undefined} onExit={() => undefined} />
    </div>
  )
}

export const ReviewAndConfirmation: Story = {
  render: () => (
    <div className='storybook-stack'>
      <ReviewInfoCard
        title='Applicant details'
        sections={[
          {
            title: 'Personal information',
            rows: [
              { label: 'Full name', value: 'Jane Citizen' },
              { label: 'Email', value: 'jane@example.test' },
              { label: 'Address', value: '1 Mock Street, Sydney NSW 2000' },
            ],
          },
        ]}
        onEdit={() => undefined}
      />
      <ReviewFeesCard
        fees={[
          { label: 'Application fee', amount: '$0.00' },
          { label: 'Replacement fee', amount: '$0.00' },
        ]}
        totalAmount='$0.00'
      />
      <ConfirmationHeader title='Application submitted' transactionName='Mock transaction' />
      <TransactionSummaryCard
        items={[
          { label: 'Reference number', value: 'MOCK-000000', helpText: 'Mock reference only.' },
          { label: 'Applicant', value: 'Jane Citizen' },
        ]}
      >
        <p>Next-step and timeframe content needs owner confirmation before reuse.</p>
      </TransactionSummaryCard>
    </div>
  ),
}

export const MpsEvidenceAndAssessment: Story = {
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>MPS simulation components</strong>
        <p>These are mock-only compositions. They do not upload files, validate concessions, process payment or assess eligibility.</p>
      </div>
      <EvidenceChecklistCard
        title='Evidence checklist'
        items={[
          { id: 'identity', label: 'Proof of identity', status: 'provided', description: 'Static mock state only.' },
          { id: 'medical', label: 'Medical evidence', status: 'needs-review', description: 'No file is uploaded in this preview.' },
          { id: 'concession', label: 'Concession evidence', status: 'not-required', description: 'No card selected.' },
        ]}
      />
      <AssessmentSummaryPanel
        title='Mock assessment summary'
        items={[
          { label: 'Eligibility decision', value: 'Not assessed', tone: 'warning' },
          { label: 'Identity proofing', value: 'Mock acknowledged', tone: 'good' },
          { label: 'Concession validation', value: 'Not required', tone: 'neutral' },
          { label: 'Route after submission', value: 'Manual review', tone: 'warning' },
        ]}
      />
    </div>
  ),
}

export const ConditionalAndRepeatable: Story = {
  render: () => <ConditionalAndRepeatableExample />,
}

export const ModalAndBusinessError: Story = {
  render: () => <ModalAndBusinessErrorExample />,
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

/**
 * Exit modal in isolation.
 *
 * Source evidence: TaPaaS Exit modal template `4677:1042`.
 * This is a preview pattern — not the full GEL modal with FocusLock/Portal.
 *
 * Test: open, Escape close, Tab trap, No/Yes actions, return focus.
 */
function ExitModalIsolatedExample() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Exit modal — isolated test</strong>
        <p>Click the button to open. Test keyboard: Escape closes, Tab stays trapped inside, focus returns to trigger on close.</p>
        <p>Source: TaPaaS Exit modal template <code>4677:1042</code>. Preview only — does not claim full GEL modal behaviour.</p>
      </div>
      <Button onClick={() => setIsOpen(true)}>Open exit modal</Button>
      <ExitModal
        isOpen={isOpen}
        onContinue={() => setIsOpen(false)}
        onExit={() => { setIsOpen(false); alert('Exit action fired — in a real skeleton this resets form state.') }}
        description='This preview does not save draft applications. If you exit, the mock form data will be cleared.'
      />
    </div>
  )
}

export const ExitModalIsolated: Story = {
  render: () => <ExitModalIsolatedExample />,
}
