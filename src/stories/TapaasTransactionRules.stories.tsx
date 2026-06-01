import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import {
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  Input,
  ProgressStepper,
  RadioButtonList,
  Select,
  Textarea,
} from '../gel'
import {
  ConditionalQuestionPanel,
  ConfirmationHeader,
  DetailsCard,
  NextStepsCardPreview,
  PrivacyCardPreview,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Transaction Rules',
  parameters: {
    docs: {
      description: {
        component: 'Clara/TaPaaS transaction rule review surfaces. These stories are preview-only and do not claim production readiness, accessibility compliance, WCAG compliance, GEL approval, TaPaaS approval, privacy approval, legal approval, policy approval or governance clearance.',
      },
    },
  },
}

export default meta
type Story = StoryObj

function RuleBoundaryNote({
  title = 'Clara/TaPaaS transaction rule surface',
  children,
}: {
  title?: string
  children?: ReactNode
}) {
  return (
    <div className='storybook-note'>
      <strong>{title}</strong>
      <p>
        Storybook review surface only. Use this to compare transaction structure against the committed Clara/TaPaaS rules, not as production, accessibility, privacy, legal, GEL, TaPaaS or governance approval evidence.
      </p>
      {children}
    </div>
  )
}

export const PrivacyAndTerms: Story = {
  name: 'Privacy and Terms',
  parameters: {
    docs: {
      description: {
        story: 'TaPaaS privacy-and-terms template review surface for short and longer transaction flows.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <RuleBoundaryNote title='Privacy and terms rule'>
        <ul>
          <li>Privacy Collection Notice and Terms and Conditions appear before transaction-specific capture.</li>
          <li>The Terms and Conditions checkbox is outside the notice card so its error state can be shown consistently.</li>
          <li>Notification and receipt copy appears only where it helps the user understand what happens next.</li>
        </ul>
      </RuleBoundaryNote>
      <PrivacyCardPreview
        title='Privacy and terms'
        description='Read the Privacy Collection Notice and Terms and Conditions before continuing.'
        showAcknowledgement={false}
        sections={[
          {
            id: 'rule-privacy-collection-notice',
            title: 'Privacy Collection Notice',
            content: <p>Read the Privacy Collection Notice for this service before continuing.</p>,
          },
          {
            id: 'rule-terms-and-conditions',
            title: 'Terms and Conditions',
            content: <p>Read the Terms and Conditions for this application before continuing.</p>,
          },
          {
            id: 'rule-notifications-receipt',
            title: 'Notifications and receipt',
            content: <p>Receipt and notification copy is included when it affects what the customer should expect.</p>,
          },
        ]}
      />
      <Checkbox
        id='rule-terms-and-conditions-checkbox'
        label='I agree to the Terms and Conditions.'
        checked={false}
        onChange={() => undefined}
        hasError
        errorMessage='Accept the Terms and Conditions to continue.'
      />
      <TransactionCtaGroup onContinue={() => undefined} onExit={() => undefined} />
    </div>
  ),
}

export const StepperAndPageStructure: Story = {
  name: 'Stepper and Page Structure',
  parameters: {
    docs: {
      description: {
        story: 'Stepper and page-structure rule surface showing when a progress stepper is useful and how labels stay stable.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <RuleBoundaryNote title='Stepper and page structure rule'>
        <ul>
          <li>Short immediate-approval flows do not need a progress stepper unless another tracked rule requires one.</li>
          <li>Longer staged flows use stable task labels that do not change between default and error states.</li>
          <li>Confirmation is the transaction result and is not shown inside the stepper.</li>
        </ul>
      </RuleBoundaryNote>
      <section aria-labelledby='short-flow-heading'>
        <Heading level={2} id='short-flow-heading'>Short immediate-approval flow</Heading>
        <p>Privacy, Application details, Review and Confirmation can be presented without a visible progress stepper when the flow is short.</p>
      </section>
      <section aria-labelledby='long-flow-heading'>
        <Heading level={2} id='long-flow-heading'>Longer submitted-for-review flow</Heading>
        <ProgressStepper
          stepsList={[
            { content: 'Privacy', status: 'completed' },
            { content: 'Your details', status: 'completed' },
            { content: 'Market stall details', status: 'current' },
            { content: 'Additional details', status: 'todo' },
            { content: 'Review', status: 'todo' },
          ]}
        />
        <p>These labels stay the same in default and error states. Confirmation is deliberately excluded.</p>
      </section>
    </div>
  ),
}

export const AuthenticatedProfilePlayback: Story = {
  name: 'Authenticated Profile Playback',
  parameters: {
    docs: {
      description: {
        story: 'Authenticated detail playback rule surface showing read-only profile-owned data and transaction-specific capture boundaries.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <RuleBoundaryNote title='Authenticated profile playback rule'>
        <ul>
          <li>Profile-owned personal details are played back as read-only information.</li>
          <li>First name and family name are not recaptured as editable transaction fields by default.</li>
          <li>If details are incorrect, the user is directed to Account/Profile rather than silently editing profile data inside the transaction.</li>
        </ul>
      </RuleBoundaryNote>
      <DetailsCard
        title='Verified identity details'
        description='These details come from Account/Profile. If they are incorrect, update them through Account/Profile before continuing.'
        rows={[
          { label: 'Full name', value: 'Alex Citizen' },
          { label: 'Date of birth', value: '15 March 1990' },
          { label: 'Source', value: 'Account/Profile' },
        ]}
        headingLevel={3}
      />
      <section aria-labelledby='transaction-capture-heading'>
        <Heading level={3} id='transaction-capture-heading'>Transaction-specific contact details</Heading>
        <p className='tapaas-help-text'>These details are captured for this application and do not update Account/Profile.</p>
        <Field id='rule-contact-email' label='Email address'>
          <Input id='rule-contact-email' type='email' value='alex.citizen@example.test' onChange={() => undefined} inputWidth='xl' />
        </Field>
      </section>
    </div>
  ),
}

export const ReviewPages: Story = {
  name: 'Review Pages',
  parameters: {
    docs: {
      description: {
        story: 'Review-page rule surface showing completed sections mirrored with one edit affordance per section.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <RuleBoundaryNote title='Review page rule'>
        <ul>
          <li>Review mirrors the sections the customer has completed.</li>
          <li>Use one edit affordance per section.</li>
          <li>Do not add fee cards or fee-style rows unless fees exist.</li>
        </ul>
      </RuleBoundaryNote>
      <ReviewInfoCard
        title='Your details'
        sections={[
          {
            title: 'Verified identity details',
            rows: [
              { label: 'Full name', value: 'Alex Citizen' },
              { label: 'Source', value: 'Account/Profile' },
            ],
          },
        ]}
        onEdit={() => undefined}
      />
      <ReviewInfoCard
        title='Market stall information'
        sections={[
          {
            title: 'Market stall details',
            rows: [
              { label: 'Market name', value: 'Example community market' },
              { label: 'Market type', value: 'Community market' },
              { label: 'Event date', value: '25 12 2026' },
            ],
          },
        ]}
        onEdit={() => undefined}
      />
      <ReviewInfoCard
        title='Privacy'
        sections={[
          {
            title: 'Privacy and terms',
            rows: [
              { label: 'Privacy Collection Notice', value: 'Read' },
              { label: 'Terms and Conditions', value: 'Accepted' },
            ],
          },
        ]}
        onEdit={() => undefined}
      />
    </div>
  ),
}

export const ConfirmationPages: Story = {
  name: 'Confirmation Pages',
  parameters: {
    docs: {
      description: {
        story: 'Confirmation-page rule surface contrasting immediate approval with submitted-for-review outcomes.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <RuleBoundaryNote title='Confirmation page rule'>
        <ul>
          <li>Immediate-approval confirmation says the outcome is approved and explains when the receipt is the permit.</li>
          <li>Submitted-for-review confirmation says the application was submitted and includes genuine next steps.</li>
          <li>Keep a record is present in both patterns.</li>
        </ul>
      </RuleBoundaryNote>
      <ConfirmationHeader title='Your trial permit is approved' transactionName='Apply for a trial permit' />
      <TransactionSummaryCard
        heading='Receipt details'
        items={[
          { label: 'Receipt number', value: 'TP-000000' },
          { label: 'Transaction date', value: '1 June 2026' },
        ]}
      >
        <p>Your receipt is your trial permit.</p>
      </TransactionSummaryCard>
      <ConfirmationHeader title='Your accessible market permit application has been submitted' transactionName='Accessible market permit' />
      <TransactionSummaryCard
        heading='Application receipt'
        items={[
          { label: 'Receipt number', value: 'AMP-000000' },
          { label: 'Transaction date', value: '1 June 2026' },
        ]}
      />
      <NextStepsCardPreview
        items={[
          {
            id: 'review',
            heading: 'Application review',
            body: <p>The submitted application is reviewed before an outcome is provided.</p>,
          },
          {
            id: 'notification',
            heading: 'Outcome notification',
            body: <p>The applicant is told the outcome through the confirmed notification channel.</p>,
          },
          {
            id: 'delivery',
            heading: 'Permit or document delivery',
            body: <p>If approved, permit or document delivery follows the confirmed transaction rules.</p>,
          },
        ]}
      />
    </div>
  ),
}

function ValidationAndControlChoiceExample() {
  const [supportNeeded, setSupportNeeded] = useState('')

  return (
    <div className='storybook-stack'>
      <RuleBoundaryNote title='Validation and control choice rule'>
        <ul>
          <li>Use the control that fits the option set. Longer option lists should use a select/dropdown pattern.</li>
          <li>Date help text states the expected format.</li>
          <li>Long text responses show character limit guidance.</li>
          <li>Support-needs description is conditional on Yes unless an approved visible alternative is documented.</li>
        </ul>
      </RuleBoundaryNote>
      <ErrorSummary
        id='rule-validation-summary'
        errors={[
          { id: 'rule-market-type', text: 'Select a market type' },
          { id: 'rule-event-day', text: 'Enter the event date' },
        ]}
      />
      <Field id='rule-market-type' label='Market type' hasError errorMessage='Select a market type.'>
        <Select
          id='rule-market-type'
          value=''
          onChange={() => undefined}
          hasError
          inputWidth='xl'
          placeholder='Select market type'
          options={[
            { value: 'community-market', text: 'Community market' },
            { value: 'farmers-market', text: 'Farmers market' },
            { value: 'food-market', text: 'Food market' },
            { value: 'arts-craft-market', text: 'Arts and craft market' },
            { value: 'mixed-market', text: 'Mixed market' },
            { value: 'other-market', text: 'Other market' },
          ]}
        />
      </Field>
      <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
        <legend style={{ fontWeight: 700 }}>Event date</legend>
        <p className='tapaas-help-text'>Format: DD MM YYYY. For example, 25 12 2026.</p>
        <div className='storybook-row'>
          <Field id='rule-event-day' label='Event day'>
            <Input id='rule-event-day' inputWidth='xxs' value='' onChange={() => undefined} hasError maxLength={2} />
          </Field>
          <Field id='rule-event-month' label='Event month'>
            <Input id='rule-event-month' inputWidth='xxs' value='' onChange={() => undefined} hasError maxLength={2} />
          </Field>
          <Field id='rule-event-year' label='Event year'>
            <Input id='rule-event-year' inputWidth='sm' value='' onChange={() => undefined} hasError maxLength={4} />
          </Field>
        </div>
      </fieldset>
      <ConditionalQuestionPanel
        id='rule-support-needs'
        legend='Do you need accessibility or inclusion support for this market stall?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={supportNeeded}
        onChange={setSupportNeeded}
        showWhen='yes'
      >
        <Field id='rule-support-details' label='Describe the support needed' helpMessage='Maximum 500 characters.'>
          <Textarea id='rule-support-details' value='' onChange={() => undefined} maxLength={500} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <Field
        id='rule-services-description'
        label='Market-stall services description'
        helpMessage='Describe the goods, services or activities your stall will provide. Maximum 500 characters.'
      >
        <Textarea id='rule-services-description' value='' onChange={() => undefined} maxLength={500} rows={5} />
      </Field>
    </div>
  )
}

export const ValidationAndControlChoice: Story = {
  name: 'Validation and Control Choice',
  render: () => <ValidationAndControlChoiceExample />,
}

export const AnnotationBoundaries: Story = {
  name: 'Annotation Boundaries',
  parameters: {
    docs: {
      description: {
        story: 'Boundary surface for separating Storybook/design-review notes from customer-facing transaction UI.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <RuleBoundaryNote title='Annotation boundary rule'>
        <ul>
          <li>Designer annotations, mock-only notes, owner-confirmation notes, placeholder warnings and implementation notes stay in review/evidence surfaces.</li>
          <li>Customer-facing transaction pages render only customer copy and required transaction controls.</li>
          <li>Storybook caveats are useful here because this is a review surface, not the customer runtime.</li>
        </ul>
      </RuleBoundaryNote>
      <section className='tapaas-card' aria-labelledby='customer-ui-example-heading'>
        <Heading level={2} id='customer-ui-example-heading'>Customer-facing example</Heading>
        <p>Check your application before submitting.</p>
        <RadioButtonList
          id='rule-customer-choice'
          legend={<strong>Permit type *</strong>}
          options={[
            { value: 'standard', label: 'Standard trial permit' },
            { value: 'extended', label: 'Extended trial permit' },
          ]}
          value='standard'
          onChange={() => undefined}
        />
        <TransactionCtaGroup onContinue={() => undefined} onBack={() => undefined} onExit={() => undefined} />
      </section>
    </div>
  ),
}
