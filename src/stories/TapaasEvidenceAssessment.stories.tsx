import type { Meta, StoryObj } from '@storybook/react'
import {
  AssessmentSummaryPanel,
  EvidenceChecklistCard,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Components/Evidence & Assessment',
  parameters: {
    docs: {
      description: {
        component: 'Manifest-backed evidence and assessment preview stories. These are preview-only and do not claim accessibility approval, WCAG compliance, GEL approval, TaPaaS approval, production readiness, upload behaviour, file validation, storage, backend processing, privacy approval, security approval, policy approval or legal approval.',
      },
    },
  },
}

export default meta
type Story = StoryObj

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
