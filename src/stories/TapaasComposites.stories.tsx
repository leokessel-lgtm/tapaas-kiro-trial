import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, Field, Input, InPageAlert, Textarea } from '../gel'
import {
  AssessmentSummaryPanel,
  BackendErrorExamplePage,
  BusinessErrorPage,
  ConditionalQuestionPanel,
  ConfirmationHeader,
  DeclarationReview,
  DetailsCard,
  EmailConfirmationModal,
  EvidenceChecklistCard,
  ExitModal,
  InteractiveDetailsCard,
  LegalInfoAccordion,
  MpsApplicantDetailsFramePreview,
  MpsConfirmationFramePreview,
  MpsReviewFramePreview,
  NextStepsCardPreview,
  RadioButtonCards,
  RepeatableGroup,
  ReviewFeesCard,
  ReviewInfoCard,
  TapaasSearchAction,
  TransactionCtaGroup,
  TransactionSummaryCard,
  backendErrorExamples,
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
  const [isEmailOpen, setIsEmailOpen] = useState(false)

  return (
    <div className='storybook-stack'>
      <InPageAlert variant='warning' title='Trial boundary'>
        <p>Modal and business-error behaviour still needs VoiceOver/NVDA review.</p>
      </InPageAlert>
      <Button onClick={() => setIsOpen(true)}>Open exit modal</Button>
      <Button variant='secondary' onClick={() => setIsEmailOpen(true)}>Open email confirmation modal</Button>
      <ExitModal
        isOpen={isOpen}
        onContinue={() => setIsOpen(false)}
        onExit={() => setIsOpen(false)}
        description='This preview does not save draft applications.'
      />
      <EmailConfirmationModal
        isOpen={isEmailOpen}
        emailAddress='samplemail@email.com'
        onSend={() => setIsEmailOpen(false)}
        onEdit={() => setIsEmailOpen(false)}
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

const mpsReviewSections = [
  {
    id: 'storybook-mps-review-application',
    title: 'Application details',
    rows: [
      { label: 'Application type', value: 'Renewal' },
      { label: 'Existing permit', value: 'MPS-MOCK-123456' },
    ],
  },
  {
    id: 'storybook-mps-review-personal',
    title: 'Personal details',
    rows: [
      { label: 'Full name', value: 'Jane Citizen' },
      { label: 'Address', value: '1 Mock Street, Sydney NSW 2000' },
    ],
  },
  {
    id: 'storybook-mps-review-concession',
    title: 'Concession card details',
    rows: [
      { label: 'Card type', value: 'None' },
      { label: 'Delivery method', value: 'Post to residential address' },
    ],
  },
]

const mpsDeclarationStatements = [
  'I declare that the information provided is true and correct.',
  'I understand this preview does not submit to a real service.',
]

const mpsApplicantDetailsValue = {
  firstName: 'Jane',
  lastName: 'Citizen',
  dateOfBirthDay: '12',
  dateOfBirthMonth: 'jan',
  dateOfBirthYear: '1984',
  residentialAddress: '1 Mock Street, Sydney NSW 2000',
  unitNumber: '',
  streetNumber: '1',
  streetName: 'Mock',
  streetType: 'street',
  suburb: 'Sydney',
  state: 'NSW',
  postcode: '2000',
  email: 'jane.citizen@example.test',
  phone: '0212345678',
}

const mpsApplicationDetails = [
  { label: 'Applicant', value: 'Jane Citizen' },
  { label: 'Application type', value: 'Renewal' },
  { label: 'Outcome route', value: 'Submitted', helpText: 'Mock outcome only.' },
]

const mpsNextSteps = [
  { id: 'assessment', content: 'Your mock application will be assessed within [confirmed timeframe].' },
  { id: 'updates', content: 'You will receive updates by [confirmed contact channel].' },
  { id: 'issue', content: 'If approved by the real service, the permit would be issued using confirmed delivery rules.' },
]

export const MpsReviewFrameFigmaFidelity: Story = {
  name: 'MPS Review Frame - Figma Fidelity',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the MPS `6.A - Review` frame preview. Use this story for Figma fidelity QA only; content remains mock and owner-confirmation required.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>MPS Review Frame - Figma fidelity</strong>
        <p>Isolated preview of source frame 0:33185. Use this story to compare layout, callout treatment, section order, edit links, declaration placement and CTA relationship.</p>
        <ul>
          <li>Source: Mobility_Parking_Scheme.sketch 1 (Copy), page MPS Final, frame 6.A - Review, node 0:33185.</li>
          <li>Boundary: preview-only frame pattern with mock content and unresolved edit routes.</li>
          <li>Unresolved: 6.B review variant, final declaration wording, checkbox validation semantics and assistive-technology behaviour.</li>
          <li>Review: compare edit button treatment, declaration checkboxes, required markers, CTA placement and section order.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved or TaPaaS-approved.</li>
        </ul>
      </div>
      <MpsReviewFramePreview
        sections={mpsReviewSections}
        declarationStatements={mpsDeclarationStatements}
        onEdit={() => undefined}
        onSubmit={() => undefined}
        onBack={() => undefined}
        onExit={() => undefined}
      />
    </div>
  ),
}

export const MpsApplicantDetailsFrameFigmaFidelity: Story = {
  name: 'MPS Applicant Details Frames - Figma Fidelity',
  parameters: {
    docs: {
      description: {
        story: 'Paired extraction preview for MPS `2.A - Personal details` and `2.B - Personal details - Manual address`. Use this for early/middle transaction assembly QA only.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>MPS Applicant Details Frames - Figma fidelity</strong>
        <p>Paired preview of source frames 0:17387 and 0:17405. Use this story to compare field order, section grouping, address-search/manual-address variants, required markers, helper text and CTA relationship.</p>
        <ul>
          <li>Sources: Mobility_Parking_Scheme.sketch 1 (Copy), page MPS Final, frames 2.A - Personal details and 2.B - Personal details - Manual address.</li>
          <li>Source context nodes: 0:17387 and 0:17405. Implementation boundary: form content/page skeleton only, excluding global nav/footer and real address lookup.</li>
          <li>Boundary: preview-only mock form capture with no identity verification, customer-record update, backend persistence, age eligibility or address lookup.</li>
          <li>Review: compare personal details, date of birth, contact details, residential address search, manual-address field order and Cancel/Next placement.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, privacy-approved, legal-approved or policy-approved.</li>
        </ul>
      </div>
      <MpsApplicantDetailsFramePreview
        addressMode='search'
        value={mpsApplicantDetailsValue}
        onManualAddress={() => undefined}
        onContinue={() => undefined}
        onBack={() => undefined}
      />
      <MpsApplicantDetailsFramePreview
        addressMode='manual'
        value={mpsApplicantDetailsValue}
        onAddressSearch={() => undefined}
        onContinue={() => undefined}
        onBack={() => undefined}
      />
    </div>
  ),
}

export const MpsConfirmationFrameFigmaFidelity: Story = {
  name: 'MPS Confirmation Frame - Figma Fidelity',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the MPS `6.A Confirmation screen` frame preview. Use this story for Figma fidelity QA only; reference, timeframe and notification content remain mock.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>MPS Confirmation Frame - Figma fidelity</strong>
        <p>Isolated preview of source frame 0:33222. Use this story to compare confirmation heading, reference/application details, next-step content, feedback prompt and action/footer relationship.</p>
        <ul>
          <li>Source: Mobility_Parking_Scheme.sketch 1 (Copy), page MPS Final, frame 6.A Confirmation screen, node 0:33222.</li>
          <li>Boundary: preview-only frame pattern with mock reference, timeframe, notification and feedback behaviour.</li>
          <li>Unresolved: 6.B tile variant, real reference format, final next-step wording, feedback capture and assistive-technology behaviour.</li>
          <li>Review: compare status heading, details layout, next-step content, feedback prompt and footer/action relationship.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved or TaPaaS-approved.</li>
        </ul>
      </div>
      <MpsConfirmationFramePreview
        referenceNumber='MPS-MOCK-000000'
        applicationDetails={mpsApplicationDetails}
        nextSteps={mpsNextSteps}
        relatedContent={<p>Related transactions and notification wording need owner confirmation.</p>}
        onStartAgain={() => undefined}
      />
    </div>
  ),
}

export const ReviewAndConfirmation: Story = {
  name: 'Review and Confirmation - Transaction Assembly',
  parameters: {
    docs: {
      description: {
        story: 'Composite transaction assembly story showing how review, fee, confirmation, summary and next-step patterns can sit together. Use the isolated MPS stories for Figma fidelity QA.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Review and Confirmation - transaction assembly</strong>
        <p>Composite review surface for pattern relationships. For frame-by-frame Figma fidelity, use the isolated MPS Review Frame and MPS Confirmation Frame stories.</p>
      </div>
      <MpsReviewFramePreview
        sections={mpsReviewSections}
        declarationStatements={mpsDeclarationStatements}
        onEdit={() => undefined}
        onSubmit={() => undefined}
        onBack={() => undefined}
        onExit={() => undefined}
      />
      <MpsApplicantDetailsFramePreview
        addressMode='manual'
        value={mpsApplicantDetailsValue}
        onAddressSearch={() => undefined}
        onContinue={() => undefined}
        onBack={() => undefined}
      />
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
      <MpsConfirmationFramePreview
        referenceNumber='MPS-MOCK-000000'
        applicationDetails={mpsApplicationDetails}
        nextSteps={mpsNextSteps}
        relatedContent={<p>Related transactions and notification wording need owner confirmation.</p>}
        onStartAgain={() => undefined}
      />
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

export const NextStepsCard: Story = {
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Next steps card</strong>
        <p>Preview-only post-submit guidance. Step content is mock/static and needs owner confirmation before service use.</p>
      </div>
      <NextStepsCardPreview
        items={[
          {
            id: 'assessment',
            heading: 'Application assessment',
            body: <p>Your mock application will be assessed within [confirmed timeframe].</p>,
          },
          {
            id: 'updates',
            heading: 'Application updates',
            body: <p>You will receive updates by [confirmed contact channel].</p>,
          },
          {
            id: 'outcome',
            heading: 'Permit outcome',
            body: <p>If approved by the real service, the permit would be issued using confirmed delivery rules.</p>,
          },
        ]}
      />
      <NextStepsCardPreview
        heading='Other ways to keep going'
        showStepNumbers={false}
        showIcon={false}
        headingLevel={3}
        items={[
          {
            id: 'save',
            heading: 'Save your reference',
            body: <p>Keep the mock reference number for review conversations.</p>,
          },
          {
            id: 'review',
            heading: 'Review related transactions',
            body: <p>Related transaction links and routing need owner confirmation.</p>,
          },
        ]}
      />
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
          { value: 'new', label: 'Apply for a new permit', description: 'Start a new mock application.', pictogram: <PermitIcon /> },
          { value: 'renew', label: 'Renew a permit', description: 'Use an existing mock permit number.', pictogram: <RefreshIcon /> },
        ]}
        errorMessage='Select an option to continue'
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
        title='Mock permit holder'
        description='Interactive details card example. Actions use buttons because they change local state.'
        statusLabel={removed ? 'Removed in mock state' : 'Mock active'}
        rows={[
          { label: 'Name', value: 'Alex Citizen' },
          { label: 'Permit type', value: 'Individual MPS permit' },
        ]}
        actions={[
          { label: removed ? 'Restore mock holder' : 'Remove this holder', onAction: () => setRemoved((value) => !value), variant: 'secondary' },
        ]}
      />
      <BackendErrorExamplePage example={backendErrorExamples.addressNotNsw} onStartAgain={() => undefined} />
    </div>
  )
}

export const SelectedMaturityComponents: Story = {
  render: () => <SelectedMaturityComponentsExample />,
}

function PermitIcon() {
  return (
    <svg viewBox='0 0 32 32' focusable='false'>
      <path fill='currentColor' d='M8 4h12l4 4v20H8V4Zm11 2.8V9h2.2L19 6.8ZM11 13h10v2H11v-2Zm0 4h10v2H11v-2Zm0 4h7v2h-7v-2Z' />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg viewBox='0 0 32 32' focusable='false'>
      <path fill='currentColor' d='M23.5 9.8A9 9 0 1 0 25 16h-3a6 6 0 1 1-1.1-3.5L17 16h10V6l-3.5 3.8Z' />
    </svg>
  )
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

function EmailConfirmationModalExample({ mode }: { mode: 'desktop' | 'mobile' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [lastAction, setLastAction] = useState('No action selected')
  const isMobile = mode === 'mobile'

  return (
    <div className='storybook-stack' style={isMobile ? { maxWidth: 390 } : undefined}>
      <div className='storybook-note'>
        <strong>{isMobile ? 'Email confirmation modal — mobile bottom modal' : 'Email confirmation modal — desktop centred modal'}</strong>
        <p>Source: TaPaaS Email confirmation modal <code>9290:50392</code>, component frame <code>9241:18447</code>. Preview callbacks only.</p>
        {isMobile
          ? <p>Set the Storybook viewport below 640px to verify the bottom-modal treatment. The constrained container shows intended mobile review width but cannot force CSS media queries by itself.</p>
          : <p>Use a desktop-width Storybook viewport to verify centred modal placement and horizontal action order.</p>}
      </div>
      <Button onClick={() => setIsOpen(true)}>Open email confirmation modal</Button>
      <p aria-live='polite'>{lastAction}</p>
      <EmailConfirmationModal
        isOpen={isOpen}
        emailAddress='samplemail@email.com'
        onSend={() => { setIsOpen(false); setLastAction('Mock send selected') }}
        onEdit={() => { setIsOpen(false); setLastAction('Mock edit selected') }}
        onDismiss={() => { setIsOpen(false); setLastAction('Mock close selected') }}
      />
    </div>
  )
}

export const EmailConfirmationModalDesktop: Story = {
  render: () => <EmailConfirmationModalExample mode='desktop' />,
}

export const EmailConfirmationModalMobile: Story = {
  render: () => <EmailConfirmationModalExample mode='mobile' />,
}
