import type { Meta, StoryObj } from '@storybook/react'
import {
  MpsApplicantDetailsFramePreview,
  MpsConfirmationFramePreview,
  MpsReviewFramePreview,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'Transaction Frames/MPS',
  parameters: {
    docs: {
      description: {
        component: 'Bounded MPS source-frame review stories. These are source-structure review surfaces only and do not claim full source parity, accessibility approval, WCAG compliance, GEL approval, TaPaaS approval, production readiness, privacy approval, policy approval or legal approval.',
      },
    },
  },
}

export default meta
type Story = StoryObj

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
