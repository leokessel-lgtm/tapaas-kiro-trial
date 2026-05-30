import type { Meta, StoryObj } from '@storybook/react'
import {
  ConfirmationHeader,
  DeclarationReview,
  LegalInfoAccordion,
  NextStepsCardPreview,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Components/Review & Confirmation',
  parameters: {
    docs: {
      description: {
        component: 'Manifest-backed review, confirmation and action-area preview stories. These are preview-only and do not claim accessibility approval, WCAG compliance, GEL approval, TaPaaS approval, production readiness, privacy approval, policy approval or legal approval.',
      },
    },
  },
}

export default meta
type Story = StoryObj

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

export const ConfirmationHeaderPattern: Story = {
  name: 'Confirmation Header',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the confirmation page header from source node 9:10494. This is a preview-only status header and does not prove a real submitted outcome.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Confirmation header</strong>
        <p>Preview-only success/status header. Use past-tense transaction outcomes only when the surrounding transaction result is mock or owner-confirmed.</p>
        <ul>
          <li>Source context node: <code>9:10494</code>.</li>
          <li>Implementation boundary node: existing <code>ConfirmationHeader</code> preview component.</li>
          <li>Unresolved: exact icon treatment, final transaction name, real outcome semantics and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <ConfirmationHeader title='Application submitted' transactionName='Mock transaction' />
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

export const LegalInfoAccordionPattern: Story = {
  name: 'Legal Info Accordion',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the legal information accordion wrapper. Placeholder legal/privacy content remains owner-gated and must not be treated as approved wording.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Legal info accordion</strong>
        <p>Preview-only accordion wrapper with placeholder legal/privacy content. Required or critical legal/privacy content must not be hidden without owner confirmation.</p>
        <ul>
          <li>Source context node: <code>22:35625</code>.</li>
          <li>Implementation boundary node: existing <code>LegalInfoAccordion</code> preview wrapper over GEL accordion behaviour.</li>
          <li>Unresolved: final legal/privacy wording, whether content may be collapsed, critical-content treatment and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <LegalInfoAccordion />
    </div>
  ),
}

export const DeclarationReviewPattern: Story = {
  name: 'Declaration Review',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of declaration playback variants. The statements are mock placeholders and do not represent approved legal, privacy or policy wording.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Declaration review</strong>
        <p>Preview-only declaration playback in card and accordion variants. Use owner-confirmed wording before any real transaction use.</p>
        <ul>
          <li>Source context node: <code>27:38386</code>.</li>
          <li>Implementation boundary node: existing <code>DeclarationReview</code> preview component.</li>
          <li>Unresolved: final statements, legal/privacy/policy treatment, whether card or accordion is appropriate and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <DeclarationReview
        title='Declaration review card'
        sections={[
          {
            title: 'Accepted declaration',
            statements: [
              'I declare that the mock information provided is true and correct.',
              'I understand this preview does not submit to a real service.',
            ],
          },
        ]}
      />
      <DeclarationReview
        title='Declaration review accordion'
        variant='accordion'
        sections={[
          {
            title: 'Accepted declaration',
            statements: [
              'I declare that the mock information provided is true and correct.',
              'I understand this preview does not submit to a real service.',
            ],
          },
        ]}
      />
    </div>
  ),
}
