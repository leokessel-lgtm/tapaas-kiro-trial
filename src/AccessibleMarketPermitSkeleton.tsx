import { useCallback, useState, type CSSProperties } from 'react'
import { type StepError, useTransactionStep } from './useTransactionStep'
import {
  Button,
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  Input,
  ProgressStepper,
  Select,
  TextLink,
  Textarea,
} from './gel'
import {
  ConditionalQuestionPanel,
  ConfirmationHeader,
  DetailsCard,
  ExitModal,
  PrivacyCardPreview,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

type MarketStep = 'privacy' | 'yourDetails' | 'marketStallDetails' | 'additionalDetails' | 'review' | 'confirmation'
type StepperStep = Exclude<MarketStep, 'confirmation'>

const stepOrder: MarketStep[] = ['privacy', 'yourDetails', 'marketStallDetails', 'additionalDetails', 'review', 'confirmation']
const stepperSteps: StepperStep[] = ['privacy', 'yourDetails', 'marketStallDetails', 'additionalDetails', 'review']

const transactionName = 'Accessible market permit'

const stepLabels: Record<MarketStep, string> = {
  privacy: 'Privacy',
  yourDetails: 'Your details',
  marketStallDetails: 'Market stall details',
  additionalDetails: 'Additional details',
  review: 'Review',
  confirmation: 'Application submitted for review',
}

const accountProfile = {
  fullName: 'Alex Citizen',
  dateOfBirth: '15 March 1990',
  source: 'Account/Profile',
}

const applicationReceipt = {
  number: 'AMP-000000',
  transactionDate: '1 June 2026',
}

const marketTypeOptions = [
  { value: 'community-market', text: 'Community market' },
  { value: 'farmers-market', text: 'Farmers market' },
  { value: 'food-market', text: 'Food market' },
  { value: 'arts-craft-market', text: 'Arts and craft market' },
  { value: 'mixed-market', text: 'Mixed market' },
  { value: 'other-market', text: 'Other market' },
]

const marketTypeLabel = Object.fromEntries(marketTypeOptions.map((option) => [option.value, option.text]))

interface FormState {
  termsAccepted: boolean
  email: string
  phone: string
  street: string
  suburb: string
  state: string
  postcode: string
  marketName: string
  marketType: string
  eventDay: string
  eventMonth: string
  eventYear: string
  needsSupport: string
  supportDetails: string
  servicesDescription: string
  declarationAccepted: boolean
}

const initialState: FormState = {
  termsAccepted: false,
  email: '',
  phone: '',
  street: '',
  suburb: '',
  state: '',
  postcode: '',
  marketName: '',
  marketType: '',
  eventDay: '',
  eventMonth: '',
  eventYear: '',
  needsSupport: '',
  supportDetails: '',
  servicesDescription: '',
  declarationAccepted: false,
}

function fullWidthInputStyle(hasError?: boolean): CSSProperties {
  return {
    display: 'block',
    width: '100%',
    maxWidth: '48rem',
    height: '48px',
    padding: '0 0.825rem',
    fontSize: '1rem',
    fontFamily: 'var(--gel-font-body)',
    border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
    borderRadius: '6px',
    boxSizing: 'border-box',
    color: 'var(--gel-color-text)',
    backgroundColor: 'var(--gel-color-white)',
  }
}

export function AccessibleMarketPermitSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submittedErrors, setSubmittedErrors] = useState<StepError[]>([])

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((s: MarketStep) => errorsForStep(s, form), [form])
  const { step, setStep, setAttempted, errorSummaryRef, exitModalOpen, openExitModal, closeExitModal, goBack, goNext, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  function handleContinue() {
    const nextErrors = getErrors(step)
    setSubmittedErrors(nextErrors)
    goNext()
  }

  function handleBack() {
    setSubmittedErrors([])
    goBack()
  }

  function goToReviewSource(targetStep: Exclude<MarketStep, 'review' | 'confirmation'>) {
    setAttempted(false)
    setSubmittedErrors([])
    setStep(targetStep)
  }

  function resetTransaction() {
    setSubmittedErrors([])
    reset()
    setForm(initialState)
  }

  return (
    <div>
      {step !== 'confirmation' && (
        <AccessibleMarketFormHeader step={step} />
      )}

      <ErrorSummary ref={errorSummaryRef} errors={submittedErrors} />

      {step === 'privacy' && (
        <PrivacyStep
          form={form}
          submittedErrors={submittedErrors}
          update={update}
          onContinue={handleContinue}
          onExit={openExitModal}
        />
      )}
      {step === 'yourDetails' && (
        <YourDetailsStep
          form={form}
          submittedErrors={submittedErrors}
          update={update}
          onBack={handleBack}
          onContinue={handleContinue}
          onExit={openExitModal}
        />
      )}
      {step === 'marketStallDetails' && (
        <MarketStallDetailsStep
          form={form}
          submittedErrors={submittedErrors}
          update={update}
          onBack={handleBack}
          onContinue={handleContinue}
          onExit={openExitModal}
        />
      )}
      {step === 'additionalDetails' && (
        <AdditionalDetailsStep
          form={form}
          submittedErrors={submittedErrors}
          update={update}
          onBack={handleBack}
          onContinue={handleContinue}
          onExit={openExitModal}
        />
      )}
      {step === 'review' && (
        <ReviewStep
          form={form}
          onBack={handleBack}
          onEditStep={goToReviewSource}
          onSubmit={handleContinue}
          onExit={openExitModal}
        />
      )}
      {step === 'confirmation' && <ConfirmationStep onStartAgain={resetTransaction} />}

      <ExitModal
        isOpen={exitModalOpen}
        onContinue={closeExitModal}
        onExit={resetTransaction}
        description='If you exit, the information entered in this application will be cleared.'
      />
    </div>
  )
}

function AccessibleMarketFormHeader({ step }: { step: StepperStep }) {
  const currentIndex = stepperSteps.indexOf(step)
  return (
    <header
      aria-labelledby={`${step}-heading`}
      style={{
        background: '#f4f4f4',
        borderBottom: '1px solid var(--gel-color-border)',
        borderTop: '1px solid var(--gel-color-border)',
        marginBottom: '1.5rem',
        padding: '1.5rem',
      }}
    >
      <ProgressStepper
        stepsList={stepperSteps.map((stepperStep, index) => ({
          content: stepLabels[stepperStep],
          status: index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'todo',
        }))}
      />
      <p style={{ color: 'var(--gel-color-text-grey)', fontSize: '0.875rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
        {transactionName}
      </p>
      <Heading level={2} id={`${step}-heading`} style={{ marginBottom: 0 }}>
        {stepLabels[step]}
      </Heading>
    </header>
  )
}

function errorsForStep(step: MarketStep, form: FormState) {
  const errs: { id: string; text: string }[] = []
  if (step === 'privacy' && !form.termsAccepted) {
    errs.push({ id: 'terms-and-conditions', text: 'Accept the Terms and Conditions to continue' })
  }
  if (step === 'yourDetails') {
    if (!isPreviewEmail(form.email)) errs.push({ id: 'email', text: 'Enter a valid email address' })
    if (!form.phone.trim()) errs.push({ id: 'phone', text: 'Enter your phone number' })
    if (!form.street.trim()) errs.push({ id: 'street', text: 'Enter your street address' })
    if (!form.suburb.trim()) errs.push({ id: 'suburb', text: 'Enter your suburb' })
    if (!form.state) errs.push({ id: 'state', text: 'Select your state' })
    if (!form.postcode.trim() || form.postcode.length !== 4) errs.push({ id: 'postcode', text: 'Enter a valid 4-digit postcode' })
  }
  if (step === 'marketStallDetails') {
    if (!form.marketName.trim()) errs.push({ id: 'market-name', text: 'Enter the market name' })
    if (!form.marketType) errs.push({ id: 'market-type', text: 'Select a market type' })
    if (!form.eventDay || !form.eventMonth || !form.eventYear) {
      errs.push({ id: 'event-day', text: 'Enter the event date' })
    } else if (!isPreviewDate(form.eventDay, form.eventMonth, form.eventYear, 2026, 2030)) {
      errs.push({ id: 'event-day', text: 'Enter a valid event date' })
    }
    if (!form.needsSupport) errs.push({ id: 'needs-support', text: 'Select whether you need accessibility support' })
    if (form.needsSupport === 'yes' && !form.supportDetails.trim()) errs.push({ id: 'support-details', text: 'Describe the support needed' })
  }
  if (step === 'additionalDetails') {
    if (!form.servicesDescription.trim()) errs.push({ id: 'services-description', text: 'Describe the goods, services or activities for your stall' })
    if (!form.declarationAccepted) errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to continue' })
  }
  return errs
}

function isPreviewDate(dayValue: string, monthValue: string, yearValue: string, minYear: number, maxYear: number) {
  if (!/^\d{1,2}$/.test(dayValue) || !/^\d{1,2}$/.test(monthValue) || !/^\d{4}$/.test(yearValue)) return false
  const day = Number(dayValue)
  const month = Number(monthValue)
  const year = Number(yearValue)
  const date = new Date(year, month - 1, day)
  return (
    year >= minYear &&
    year <= maxYear &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

function isPreviewEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function hasSubmittedError(errors: StepError[], id: string) {
  return errors.some((error) => error.id === id)
}

function submittedErrorText(errors: StepError[], id: string) {
  return errors.find((error) => error.id === id)?.text ?? ''
}

interface StepProps {
  form: FormState
  submittedErrors: StepError[]
  update: (patch: Partial<FormState>) => void
  onBack?: () => void
  onContinue: () => void
  onExit: () => void
}

function PrivacyStep({ form, submittedErrors, update, onContinue, onExit }: StepProps) {
  const termsError = hasSubmittedError(submittedErrors, 'terms-and-conditions')
  return (
    <section aria-labelledby='privacy-heading'>
      <PrivacyCardPreview
        title='Privacy and terms'
        description='Read the Privacy Collection Notice and Terms and Conditions before continuing.'
        showAcknowledgement={false}
        sections={[
          {
            id: 'accessible-market-privacy-collection-notice',
            title: 'Privacy Collection Notice',
            content: <p>Read the Privacy Collection Notice for this service before continuing.</p>,
          },
          {
            id: 'accessible-market-terms-and-conditions',
            title: 'Terms and Conditions',
            content: <p>Read the Terms and Conditions for this application before continuing.</p>,
          },
          {
            id: 'accessible-market-notifications-receipt',
            title: 'Notifications and receipt',
            content: <p>We will send the submitted application receipt to the contact details provided in this application.</p>,
          },
        ]}
      />
      <Checkbox
        id='terms-and-conditions'
        label='I agree to the Terms and Conditions.'
        checked={form.termsAccepted}
        onChange={(value) => update({ termsAccepted: Boolean(value) })}
        hasError={termsError}
        errorMessage='Accept the Terms and Conditions to continue.'
      />
      <TransactionCtaGroup onContinue={onContinue} onExit={onExit} continueLabel='Continue' />
    </section>
  )
}

function YourDetailsStep({ form, submittedErrors, update, onBack, onContinue, onExit }: StepProps) {
  const emailErr = hasSubmittedError(submittedErrors, 'email')
  const phoneErr = hasSubmittedError(submittedErrors, 'phone')
  const streetErr = hasSubmittedError(submittedErrors, 'street')
  const suburbErr = hasSubmittedError(submittedErrors, 'suburb')
  const stateErr = hasSubmittedError(submittedErrors, 'state')
  const postcodeErr = hasSubmittedError(submittedErrors, 'postcode')

  return (
    <section aria-labelledby='yourDetails-heading'>
      <p>Check your verified identity details and provide contact details for this application.</p>
      <p style={{ fontSize: '0.875rem', margin: '0 0 1.5rem' }}>
        All fields must be completed unless marked optional.
      </p>
      <DetailsCard
        title='Verified identity details'
        description='These details come from Account/Profile. If they are incorrect, update them through Account/Profile before continuing.'
        rows={[
          { label: 'Full name', value: accountProfile.fullName },
          { label: 'Date of birth', value: accountProfile.dateOfBirth },
          { label: 'Source', value: accountProfile.source },
        ]}
        headingLevel={3}
      />
      <section aria-labelledby='contact-details-heading'>
        <Heading level={3} id='contact-details-heading'>Contact details for this application</Heading>
        <p className='tapaas-help-text'>
          These contact and postal address details are captured for this application. They do not update Account/Profile.
        </p>
        <Field id='email' label='Email address' hasError={emailErr} errorMessage='Enter a valid email address.'>
          <Input id='email' type='email' value={form.email} onChange={(e) => update({ email: e.target.value })} hasError={emailErr} autoComplete='email' style={fullWidthInputStyle(emailErr)} />
        </Field>
        <Field id='phone' label='Phone number' hasError={phoneErr} errorMessage='Enter your phone number.'>
          <Input id='phone' type='tel' value={form.phone} onChange={(e) => update({ phone: e.target.value })} hasError={phoneErr} autoComplete='tel' style={fullWidthInputStyle(phoneErr)} />
        </Field>
        <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
          <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '1rem' }}>Postal address for this application</legend>
          <Field id='street' label='Street address' hasError={streetErr} errorMessage='Enter your street address.'>
            <Input id='street' value={form.street} onChange={(e) => update({ street: e.target.value })} hasError={streetErr} autoComplete='street-address' style={fullWidthInputStyle(streetErr)} />
          </Field>
          <Field id='suburb' label='Suburb' hasError={suburbErr} errorMessage='Enter your suburb.'>
            <Input id='suburb' value={form.suburb} onChange={(e) => update({ suburb: e.target.value })} hasError={suburbErr} autoComplete='address-level2' style={fullWidthInputStyle(suburbErr)} />
          </Field>
          <Field id='state' label='State' hasError={stateErr} errorMessage='Select your state.'>
            <Select
              id='state'
              value={form.state}
              onChange={(e) => update({ state: e.target.value })}
              hasError={stateErr}
              inputWidth='md'
              autoComplete='address-level1'
              options={[
                { value: 'NSW', text: 'NSW' },
                { value: 'VIC', text: 'VIC' },
                { value: 'QLD', text: 'QLD' },
                { value: 'WA', text: 'WA' },
                { value: 'SA', text: 'SA' },
                { value: 'TAS', text: 'TAS' },
                { value: 'ACT', text: 'ACT' },
                { value: 'NT', text: 'NT' },
              ]}
            />
          </Field>
          <Field id='postcode' label='Postcode' hasError={postcodeErr} errorMessage='Enter a valid 4-digit postcode.'>
            <Input id='postcode' value={form.postcode} onChange={(e) => update({ postcode: e.target.value.replace(/\D/g, '').slice(0, 4) })} hasError={postcodeErr} inputWidth='xs' maxLength={4} autoComplete='postal-code' />
          </Field>
        </fieldset>
      </section>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function MarketStallDetailsStep({ form, submittedErrors, update, onBack, onContinue, onExit }: StepProps) {
  const nameErr = hasSubmittedError(submittedErrors, 'market-name')
  const typeErr = hasSubmittedError(submittedErrors, 'market-type')
  const eventDateErrorMessage = submittedErrorText(submittedErrors, 'event-day')
  const dateErr = Boolean(eventDateErrorMessage)
  const supportErr = hasSubmittedError(submittedErrors, 'needs-support')
  const detailsErr = hasSubmittedError(submittedErrors, 'support-details')
  const eventHelpId = 'event-date-help'
  const eventErrorId = dateErr ? 'event-day-error' : undefined
  const eventDescribedBy = [eventHelpId, eventErrorId].filter(Boolean).join(' ') || undefined

  return (
    <section aria-labelledby='marketStallDetails-heading'>
      <p>Provide the market stall details needed to assess this application.</p>
      <p style={{ fontSize: '0.875rem', margin: '0 0 1.5rem' }}>
        All fields must be completed unless marked optional.
      </p>
      <Field id='market-name' label='Market name' hasError={nameErr} errorMessage='Enter the market name.'>
        <Input id='market-name' value={form.marketName} onChange={(e) => update({ marketName: e.target.value })} hasError={nameErr} style={fullWidthInputStyle(nameErr)} />
      </Field>
      <Field id='market-type' label='Market type' hasError={typeErr} errorMessage='Select a market type.'>
        <Select
          id='market-type'
          value={form.marketType}
          onChange={(e) => update({ marketType: e.target.value })}
          hasError={typeErr}
          inputWidth='xl'
          placeholder='Select market type'
          options={marketTypeOptions}
        />
      </Field>
      <fieldset id='event-date-fieldset' aria-invalid={dateErr || undefined} aria-describedby={eventDescribedBy} style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
        <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>Event date</legend>
        <p id={eventHelpId} style={{ fontSize: '0.875rem', margin: '0 0 0.5rem', color: 'var(--gel-color-text-grey)' }}>Format: DD MM YYYY. For example, 25 12 2026.</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div>
            <label htmlFor='event-day' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Event day</label>
            <Input id='event-day' value={form.eventDay} onChange={(e) => update({ eventDay: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateErr} inputWidth='xxs' maxLength={2} aria-describedby={eventDescribedBy} />
          </div>
          <div>
            <label htmlFor='event-month' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Event month</label>
            <Input id='event-month' value={form.eventMonth} onChange={(e) => update({ eventMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateErr} inputWidth='xxs' maxLength={2} aria-describedby={eventDescribedBy} />
          </div>
          <div>
            <label htmlFor='event-year' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Event year</label>
            <Input id='event-year' value={form.eventYear} onChange={(e) => update({ eventYear: e.target.value.replace(/\D/g, '').slice(0, 4) })} hasError={dateErr} inputWidth='sm' maxLength={4} aria-describedby={eventDescribedBy} />
          </div>
        </div>
        {dateErr && (
          <div id={eventErrorId} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--gel-color-error-bg)', padding: '0.5rem 1rem', marginTop: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
            {eventDateErrorMessage}.
          </div>
        )}
      </fieldset>
      <ConditionalQuestionPanel
        id='needs-support'
        legend='Do you need accessibility or inclusion support for this market stall?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={form.needsSupport}
        onChange={(value) => update({ needsSupport: value, supportDetails: value === 'yes' ? form.supportDetails : '' })}
        showWhen='yes'
        hasError={supportErr}
        errorMessage='Select whether you need accessibility support'
      >
        <Field id='support-details' label='Describe the support needed' helpMessage='Maximum 500 characters.' hasError={detailsErr} errorMessage='Describe the support needed.'>
          <Textarea id='support-details' value={form.supportDetails} onChange={(e) => update({ supportDetails: e.target.value })} hasError={detailsErr} maxLength={500} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function AdditionalDetailsStep({ form, submittedErrors, update, onBack, onContinue, onExit }: StepProps) {
  const servicesErr = hasSubmittedError(submittedErrors, 'services-description')
  const declarationErr = hasSubmittedError(submittedErrors, 'declaration-accepted')
  const charLimit = 500
  return (
    <section aria-labelledby='additionalDetails-heading'>
      <p>Tell us what your stall will provide and accept the declaration before review.</p>
      <Field
        id='services-description'
        label='Market-stall services description'
        helpMessage={`Describe the goods, services or activities your stall will provide. Maximum ${charLimit} characters.`}
        hasError={servicesErr}
        errorMessage='Describe the goods, services or activities for your stall.'
      >
        <Textarea id='services-description' value={form.servicesDescription} onChange={(e) => update({ servicesDescription: e.target.value })} hasError={servicesErr} maxLength={charLimit} rows={5} />
      </Field>
      <p aria-live='polite' aria-atomic='true' style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', marginTop: '-1rem' }}>
        {form.servicesDescription.length}/{charLimit} characters
      </p>
      <section aria-labelledby='declaration-heading'>
        <Heading level={3} id='declaration-heading'>Declaration</Heading>
        <p>By submitting this application, I declare that the information I have provided is true and correct.</p>
        <Checkbox
          id='declaration-accepted'
          label='I declare that the information provided is true and correct.'
          checked={form.declarationAccepted}
          onChange={(value) => update({ declarationAccepted: Boolean(value) })}
          hasError={declarationErr}
          errorMessage='Accept the declaration to continue.'
        />
      </section>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ReviewStep({
  form,
  onBack,
  onEditStep,
  onSubmit,
  onExit,
}: {
  form: FormState
  onBack: () => void
  onEditStep: (step: Exclude<MarketStep, 'review' | 'confirmation'>) => void
  onSubmit: () => void
  onExit: () => void
}) {
  return (
    <section aria-labelledby='review-heading'>
      <p>Check your application before submitting.</p>
      <ReviewInfoCard
        title='Your details'
        sections={[
          {
            title: 'Verified identity details',
            rows: [
              { label: 'Full name', value: accountProfile.fullName },
              { label: 'Date of birth', value: accountProfile.dateOfBirth },
              { label: 'Source', value: accountProfile.source },
            ],
          },
          {
            title: 'Contact details for this application',
            rows: [
              { label: 'Email', value: form.email },
              { label: 'Phone', value: form.phone },
              { label: 'Postal address', value: `${form.street}, ${form.suburb} ${form.state} ${form.postcode}` },
            ],
          },
        ]}
        onEdit={() => onEditStep('yourDetails')}
      />
      <ReviewInfoCard
        title='Market stall information'
        sections={[
          {
            title: 'Market stall details',
            rows: [
              { label: 'Market name', value: form.marketName },
              { label: 'Market type', value: marketTypeLabel[form.marketType] || form.marketType },
              { label: 'Event date', value: formatEventDate(form) },
              { label: 'Needs accessibility support', value: form.needsSupport === 'yes' ? 'Yes' : 'No' },
              ...(form.needsSupport === 'yes' ? [{ label: 'Support details', value: form.supportDetails }] : []),
            ],
          },
        ]}
        onEdit={() => onEditStep('marketStallDetails')}
      />
      <ReviewInfoCard
        title='Additional information'
        sections={[
          {
            title: 'Additional details',
            rows: [
              { label: 'Market-stall services description', value: form.servicesDescription },
              { label: 'Declaration', value: 'Accepted' },
            ],
          },
        ]}
        onEdit={() => onEditStep('additionalDetails')}
      />
      <ReviewInfoCard
        title='Privacy'
        sections={[
          {
            title: 'Privacy and terms',
            rows: [
              { label: 'Privacy Collection Notice', value: 'Read' },
              { label: 'Terms and Conditions', value: 'Accepted' },
              { label: 'Notifications and receipt', value: 'Receipt sent after submission' },
            ],
          },
        ]}
        onEdit={() => onEditStep('privacy')}
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

function ConfirmationStep({ onStartAgain }: { onStartAgain: () => void }) {
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader title='Application submitted for review' transactionName={transactionName} />
      <TransactionSummaryCard
        heading='Receipt details'
        items={[
          { label: 'Receipt number', value: applicationReceipt.number },
          { label: 'Transaction date', value: applicationReceipt.transactionDate },
        ]}
      />
      <section className='tapaas-card' aria-labelledby='keep-a-record-heading'>
        <Heading level={2} id='keep-a-record-heading'>Keep a record</Heading>
        <p>Print or save this receipt for your records.</p>
        <Button variant='secondary' onClick={() => window.print()}>Print or save receipt</Button>
      </section>
      <section aria-labelledby='next-steps-heading'>
        <Heading level={2} id='next-steps-heading'>Next steps</Heading>
        <ol className='tapaas-step-list'>
          <li>Your application will be reviewed.</li>
          <li>You will be sent the outcome using the contact details provided.</li>
          <li>If approved, permit details or documents will be sent to you.</li>
        </ol>
      </section>
      <p>
        <TextLink href='#!'>Tell us about your experience</TextLink>
      </p>
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start another application' />
    </section>
  )
}

function formatEventDate(form: FormState) {
  return `${form.eventDay}/${form.eventMonth}/${form.eventYear}`
}
