import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, Field, Input, InPageAlert, Textarea } from '../gel'
import { MobilityParkingPermitSkeleton } from '../MobilityParkingPermitSkeleton'
import {
  BusinessErrorPage,
  ConditionalQuestionPanel,
  ConfirmationHeader,
  EmailConfirmationModal,
  ExitModal,
  MpsApplicantDetailsFramePreview,
  MpsConfirmationFramePreview,
  MpsMedicalEvidenceStatusPreview,
  MpsReviewFramePreview,
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
  { label: 'Application', value: 'Apply for a Mobility Parking Permit' },
  { label: 'Application type', value: 'Renewal' },
  { label: 'Lodgement date', value: '[confirmed lodgement date]' },
  { label: 'Outcome route', value: 'Submitted', helpText: 'Mock outcome only.' },
]

const mpsNextSteps = [
  { id: 'assessment', content: 'Your mock application will be assessed within [confirmed timeframe].' },
  { id: 'updates', content: 'We will contact you if we require further information or need to verify details before the real service can process the application.' },
  { id: 'issue', content: 'If approved by the real service, the permit would be issued using confirmed delivery rules.' },
  { id: 'return', content: 'Return, receipt and related transaction instructions need service-owner confirmation.' },
]

export const MpsReviewFrameFigmaFidelity: Story = {
  name: 'MPS Review Frame - Bounded Source Review',
  parameters: {
    docs: {
      description: {
        story: 'Isolated bounded review of the MPS `6.A - Review` content frame. Use this story for source-structure QA only; full-frame, mobile, content and behaviour parity remain review-gated.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <MpsReviewFramePreview
        sections={mpsReviewSections}
        declarationStatements={mpsDeclarationStatements}
        onEdit={() => undefined}
        onSubmit={() => undefined}
        onBack={() => undefined}
        onExit={() => undefined}
      />
      <div className='storybook-note'>
        <strong>MPS Review Frame - bounded source review</strong>
        <p>Isolated preview of source frame 0:33185. Use this story to compare section order, callout treatment, edit links, declaration placement and CTA relationship only.</p>
        <ul>
          <li>Source: Mobility_Parking_Scheme.sketch 1 (Copy), page MPS Final, frame 6.A - Review, node 0:33185.</li>
          <li>Boundary: bounded content-frame preview with mock content and unresolved edit routes; not full-page chrome, footer or mobile parity.</li>
          <li>Unresolved: 6.B review variant, final declaration wording, checkbox state semantics, mobile source parity and assistive-technology behaviour.</li>
          <li>Review: compare edit button treatment, declaration checkboxes, required markers, CTA placement and section order.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved or TaPaaS-approved.</li>
        </ul>
      </div>
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
    </div>
  ),
}

export const MpsConfirmationFrameFigmaFidelity: Story = {
  name: 'MPS Confirmation Frame - Bounded Source Review',
  parameters: {
    docs: {
      description: {
        story: 'Isolated bounded review of the MPS `6.A Confirmation screen` content frame. Use this story for source-structure QA only; mobile, tile variant, receipt and production behaviour remain review-gated.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <MpsConfirmationFramePreview
        referenceNumber='MPS-MOCK-000000'
        applicationDetails={mpsApplicationDetails}
        nextSteps={mpsNextSteps}
        supportText='We have sent a confirmation email to jane.citizen@example.test.'
        relatedContent={<p>Related transaction, receipt and notification wording need owner confirmation.</p>}
        onStartAgain={() => undefined}
      />
      <div className='storybook-note'>
        <strong>MPS Confirmation Frame - bounded source review</strong>
        <p>Isolated preview of source frame 0:33222. Use this story to compare confirmation heading, reference/application details, next-step content, feedback prompt and action relationship only.</p>
        <ul>
          <li>Source: Mobility_Parking_Scheme.sketch 1 (Copy), page MPS Final, frame 6.A Confirmation screen, node 0:33222.</li>
          <li>Boundary: bounded content-frame preview with mock reference, timeframe, notification and feedback behaviour; not full-page chrome, footer or mobile parity.</li>
          <li>Unresolved: 6.B tile variant, real reference format, final next-step wording, feedback capture, mobile source parity and assistive-technology behaviour.</li>
          <li>Review: compare status heading, details layout, next-step content, feedback prompt and footer/action relationship.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved or TaPaaS-approved.</li>
        </ul>
      </div>
    </div>
  ),
}

export const ReviewAndConfirmation: Story = {
  name: 'Review and Confirmation - Transaction Assembly',
  parameters: {
    docs: {
      description: {
        story: 'Composite transaction assembly story showing how review, fee, confirmation, summary and next-step patterns can sit together. Use the isolated MPS stories for bounded source-structure QA.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Review and Confirmation - transaction assembly</strong>
        <p>Composite review surface for pattern relationships. For bounded source-structure review, use the isolated MPS Review Frame and MPS Confirmation Frame stories.</p>
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
        <p>Interactive transaction skeleton for preview/story/transaction alignment review. Use isolated frame stories for bounded source-structure checks.</p>
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
      <MpsMedicalEvidenceStatusPreview state='required' idPrefix='mps-medical-required' />
      <MpsMedicalEvidenceStatusPreview state='provided' idPrefix='mps-medical-provided' />
      <MpsMedicalEvidenceStatusPreview evidenceType='report' state='required' idPrefix='mps-medical-report-required' />
      <MpsMedicalEvidenceStatusPreview evidenceType='report' state='provided' idPrefix='mps-medical-report-provided' />
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
    </div>
  ),
}

export const ConditionalAndRepeatable: Story = {
  render: () => <ConditionalAndRepeatableExample />,
}

export const ModalAndBusinessError: Story = {
  render: () => <ModalAndBusinessErrorExample />,
}
