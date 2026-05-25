import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, Field, Input, InPageAlert, Textarea } from '../gel'
import { MobilityParkingPermitSkeleton } from '../MobilityParkingPermitSkeleton'
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
  MpsMedicalEvidenceStatusPreview,
  MpsReviewFramePreview,
  NextStepsCardPreview,
  PrivacyCardPreview,
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
        idPrefix='mps-applicant-search'
        value={mpsApplicantDetailsValue}
        onManualAddress={() => undefined}
        onContinue={() => undefined}
        onBack={() => undefined}
      />
      <MpsApplicantDetailsFramePreview
        addressMode='manual'
        idPrefix='mps-applicant-manual'
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

export const ReviewInfoCardPattern: Story = {
  name: 'Review Info Card',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the TaPaaS review information card from component node 18:4448. This is a preview-only data playback pattern with mock content and unresolved edit routing.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Review info card</strong>
        <p>Preview-only review data playback. Keep row content factual and use edit actions only when a real route exists.</p>
        <ul>
          <li>Source: Components - TaPaaS Design Library Review info card node 18:4448.</li>
          <li>Implementation boundary: stacked label/value review rows and optional section edit action only.</li>
          <li>Unresolved: horizontal and emphasis variants, real edit routing, final labels/content and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <ReviewInfoCard
        title='Licence details'
        sections={[
          {
            title: 'Applicant information',
            rows: [
              { label: 'Full name', value: 'Alex Citizen' },
              { label: 'Licence type', value: 'Individual licence' },
              { label: 'Contact email', value: 'alex.citizen@example.test', helpText: 'Mock review value only.' },
            ],
          },
        ]}
        onEdit={() => undefined}
      />
    </div>
  ),
}

export const TransactionSummaryCardPattern: Story = {
  name: 'Transaction Summary Card',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the TaPaaS transaction summary card from component node 10:1861. This is a confirmation-stage summary with mock reference and receipt details only.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Transaction summary card</strong>
        <p>Preview-only confirmation summary. Reference, receipt and notification details are mock placeholders.</p>
        <ul>
          <li>Source: Components - TaPaaS Design Library Transaction summary card node 10:1861.</li>
          <li>Implementation boundary: summary heading, label/value rows and optional receipt/details content only.</li>
          <li>Unresolved: mandatory row model, receipt rules, payment-style rows, notification timing and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <TransactionSummaryCard
        heading='Receipt details'
        items={[
          { label: 'Reference number', value: 'MOCK-123456', helpText: 'Mock reference only.' },
          { label: 'Application', value: 'Sample transaction' },
          { label: 'Submitted by', value: 'Alex Citizen' },
        ]}
      >
        <p>Final receipt and notification content needs owner confirmation before service use.</p>
      </TransactionSummaryCard>
    </div>
  ),
}

export const MpsEndToEndTransactionAssemblyV1: Story = {
  name: 'MPS End-to-End Transaction Assembly v1',
  parameters: {
    docs: {
      description: {
        story: 'End-to-end review surface for the current MPS transaction skeleton. It composes the strongest available coded-preview artefacts while keeping unresolved backend, identity, upload, validation, legal, privacy and policy behaviour review-gated.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>MPS End-to-End Transaction Assembly v1</strong>
        <p>Interactive transaction skeleton for preview/story/transaction alignment review. Use isolated frame stories for strict Figma fidelity checks.</p>
        <ul>
          <li>Source-backed preview artefacts currently composed: applicant details/manual address frame, radio-card application type, MPS review frame, MPS confirmation frame, evidence/status summaries and mock backend error examples.</li>
          <li>Review-gated areas: privacy/start content, representative/contact frame parity, medical upload states, concession validation, declaration wording, backend recovery, identity, payment and assistive-technology behaviour.</li>
          <li>Boundary: preview-only mock transaction assembly; no real address lookup, identity verification, upload/storage, backend persistence, validation engine, eligibility, payment, legal, privacy or policy behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <MobilityParkingPermitSkeleton />
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

export const TransactionActionAreas: Story = {
  name: 'Transaction Action Areas',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of reusable transaction action areas from transaction CTA button guidance node 27:34294 and end-of-transaction CTA buttons node 9:791.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Transaction action areas</strong>
        <p>Preview-only action placement examples. Button callbacks are inert and no routing is included.</p>
        <ul>
          <li>Sources: Transaction CTA buttons node 27:34294; End of Transaction CTA buttons node 9:791.</li>
          <li>Implementation boundary: consistent Continue/Back/Exit and Start again/Exit action grouping only.</li>
          <li>Unresolved: real route destinations, save/exit behaviour, analytics, session handling and final content labels.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved or TaPaaS-approved.</li>
        </ul>
      </div>
      <section aria-labelledby='step-actions-heading'>
        <h3 id='step-actions-heading'>Step actions</h3>
        <TransactionCtaGroup onContinue={() => undefined} onBack={() => undefined} onExit={() => undefined} />
      </section>
      <section aria-labelledby='end-actions-heading'>
        <h3 id='end-actions-heading'>End of transaction actions</h3>
        <TransactionCtaGroup
          continueLabel='Start another application'
          exitLabel='Return to Service NSW'
          onContinue={() => undefined}
          onExit={() => undefined}
        />
      </section>
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

export const EvidenceChecklistCardPattern: Story = {
  name: 'Evidence Checklist Card',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the evidence checklist status card. This is a preview-only summary pattern and does not include upload, remove-file, storage, validation or medical assessment behaviour.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Evidence checklist card</strong>
        <p>Preview-only evidence status summary. Use for static review of required/provided/not-required/needs-review states only.</p>
        <ul>
          <li>Source context: MPS medical evidence frames, GEL status-label evidence and GEL file-upload evidence.</li>
          <li>Implementation boundary: status summary rows and optional supporting content only.</li>
          <li>Unresolved: upload states, file rules, remove-file behaviour, storage, validation, privacy/security handling and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <EvidenceChecklistCard
        title='Evidence checklist'
        items={[
          { id: 'identity', label: 'Proof of identity', status: 'provided', description: 'Static mock state only.' },
          { id: 'medical', label: 'Medical evidence', status: 'required', description: 'Evidence is required, but no file is uploaded in this preview.' },
          { id: 'concession', label: 'Concession evidence', status: 'not-required', description: 'No concession evidence is required in this mock scenario.' },
          { id: 'assessment', label: 'Assessment review', status: 'needs-review', description: 'Owner review is required before real assessment handling.' },
        ]}
      >
        <p className='tapaas-help-text'>This card summarises static evidence state only. It is not a GEL FileUpload preview.</p>
      </EvidenceChecklistCard>
    </div>
  ),
}

export const AssessmentSummaryPanelPattern: Story = {
  name: 'Assessment Summary Panel',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the assessment summary panel. This is a mock routing/status display and does not make eligibility, concession, payment or policy decisions.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Assessment summary panel</strong>
        <p>Preview-only assessment and routing status display. Use for mock summary states only.</p>
        <ul>
          <li>Source context: MPS eligibility, concession, review and confirmation frame groups plus GEL status-label evidence.</li>
          <li>Implementation boundary: label/value rows with neutral, good, warning and error tones only.</li>
          <li>Unresolved: final routing rules, decision wording, concession/payment handling, policy validation and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <AssessmentSummaryPanel
        title='Mock assessment summary'
        items={[
          { label: 'Eligibility decision', value: 'Not assessed', tone: 'warning' },
          { label: 'Identity proofing', value: 'Mock acknowledged', tone: 'good' },
          { label: 'Concession validation', value: 'Not required', tone: 'neutral' },
          { label: 'Payment route', value: 'Not started', tone: 'error' },
        ]}
      >
        <p className='tapaas-help-text'>This panel displays mock status only. It does not decide eligibility, validate concessions or process payment.</p>
      </AssessmentSummaryPanel>
    </div>
  ),
}

export const MpsMedicalEvidenceStatus: Story = {
  name: 'MPS Medical Evidence Status - Figma Evidence',
  parameters: {
    docs: {
      description: {
        story: 'Static preview of the MPS medical evidence status pattern from frames 4.A/4.Aa and 4.B/4.Ba. Upload/remove behaviour and medical evidence rules remain review-gated.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>MPS Medical Evidence Status - Figma evidence</strong>
        <p>Preview-only evidence-status pattern from MPS Final frames 4.A, 4.Aa, 4.B and 4.Ba.</p>
        <ul>
          <li>Certificate source context nodes: 0:17316 and 0:17333. Report source context nodes: 0:17357 and 0:17370.</li>
          <li>Implementation boundary nodes: certificate 0:17327, 0:17344 and 0:17351; report 0:17369, 0:17381, 0:17384, 0:17385 and 0:17386.</li>
          <li>Source inconsistency remains review-gated: certificate frame names and visible upload states appear inverted, certificate file limits differ, 4.Aa has a heading mismatch, and report guidance differs between section A/B and sections 2/3.</li>
          <li>Boundary: preview-only status display with no upload, remove-file, storage, validation, virus scanning, backend integration or medical assessment logic.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <MpsMedicalEvidenceStatusPreview state='required' idPrefix='mps-medical-required' />
      <MpsMedicalEvidenceStatusPreview state='provided' idPrefix='mps-medical-provided' />
      <MpsMedicalEvidenceStatusPreview evidenceType='report' state='required' idPrefix='mps-medical-report-required' />
      <MpsMedicalEvidenceStatusPreview evidenceType='report' state='provided' idPrefix='mps-medical-report-provided' />
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

function EmailConfirmationModalExample({ mode, initiallyOpen = true }: { mode: 'desktop' | 'mobile'; initiallyOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  const [lastAction, setLastAction] = useState('No action selected')
  const isMobile = mode === 'mobile'

  return (
    <div className='storybook-stack' style={isMobile ? { maxWidth: 390 } : undefined}>
      <div className='storybook-note'>
        <strong>{isMobile ? 'Email confirmation modal — mobile bottom modal' : 'Email confirmation modal — desktop centred modal'}</strong>
        <p>Source: TaPaaS Email confirmation modal <code>9290:50392</code>, component frame <code>9241:18447</code>. Preview callbacks only.</p>
        <p>The modal opens by default in this story so desktop/mobile source-parity review can inspect the actual dialog without an extra interaction.</p>
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

function RadioButtonCardStatesExample() {
  const [selected, setSelected] = useState('renew')

  return (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Radio button cards — state review</strong>
        <p>Preview-only state surface for selected, unselected, focus, keyboard and error review. Source node <code>31:63988</code> remains marked CONCEPT.</p>
      </div>
      <RadioButtonCards
        id='storybook-radio-card-state-review'
        legend='What do you want to do?'
        value={selected}
        onChange={setSelected}
        options={[
          { value: 'new', label: 'Apply for a new permit', description: 'Start a new mock application.', pictogram: <PermitIcon /> },
          { value: 'renew', label: 'Renew a permit', description: 'Use an existing mock permit number.', pictogram: <RefreshIcon /> },
        ]}
        required
      />
      <RadioButtonCards
        id='storybook-radio-card-error-review'
        legend='Select a mock option'
        value=''
        onChange={() => undefined}
        options={[
          { value: 'first', label: 'First option', description: 'Decorative pictogram placeholder.', pictogram: <PermitIcon /> },
          { value: 'second', label: 'Second option', description: 'Decorative pictogram placeholder.', pictogram: <RefreshIcon /> },
        ]}
        hasError
        required
      />
    </div>
  )
}

export const RadioButtonCardStates: Story = {
  render: () => <RadioButtonCardStatesExample />,
}
