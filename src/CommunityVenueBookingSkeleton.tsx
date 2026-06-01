import { useCallback, useState } from 'react'
import { type StepError, useTransactionStep } from './useTransactionStep'
import {
  Button,
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  Input,
  Select,
  Textarea,
  MoreInfoDisclosure,
  Accordion,
} from './gel'
import {
  ConfirmationHeader,
  ConditionalQuestionPanel,
  DetailsCard,
  ExitModal,
  PrivacyCardPreview,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

type VenueStep =
  | 'privacy'
  | 'details'
  | 'venue'
  | 'accessibility'
  | 'supporting'
  | 'review'
  | 'confirmation'

type VenueStage = Exclude<VenueStep, 'confirmation'>

const stepOrder: VenueStep[] = ['privacy', 'details', 'venue', 'accessibility', 'supporting', 'review', 'confirmation']
const stepperStages: VenueStage[] = ['privacy', 'details', 'venue', 'accessibility', 'supporting', 'review']

const transactionName = 'Community venue booking'

const stageLabels: Record<VenueStage, string> = {
  privacy: 'Privacy',
  details: 'Your details',
  venue: 'Venue booking details',
  accessibility: 'Accessibility and equipment',
  supporting: 'Supporting information',
  review: 'Review',
}

const accountProfile = {
  fullName: 'Alex Citizen',
  email: 'alex.citizen@example.test',
}

const receipt = {
  referenceNumber: 'VENUE-000000',
  transactionDate: '1 June 2026',
}

interface FormState {
  termsAccepted: boolean
  contactPhone: string
  venueType: 'meeting-room' | 'hall' | 'outdoor-space' | ''
  bookingPurpose: string
  eventDay: string
  eventMonth: string
  eventYear: string
  needsSupport: 'yes' | 'no' | ''
  supportDetails: string
  additionalInfo: string
  declarationAccepted: boolean
}

const initialState: FormState = {
  termsAccepted: false,
  contactPhone: '',
  venueType: '',
  bookingPurpose: '',
  eventDay: '',
  eventMonth: '',
  eventYear: '',
  needsSupport: '',
  supportDetails: '',
  additionalInfo: '',
  declarationAccepted: false,
}

export function CommunityVenueBookingSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((currentStep: VenueStep) => errorsForStep(currentStep, form), [form])
  const {
    step,
    setStep,
    setAttempted,
    errors,
    errorSummaryRef,
    exitModalOpen,
    openExitModal,
    closeExitModal,
    goBack,
    goNext,
    reset,
  } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  function goToReviewSource(targetStep: Exclude<VenueStep, 'review' | 'confirmation'>) {
    setAttempted(false)
    setStep(targetStep)
  }

  function startAgain() {
    reset()
    setForm(initialState)
  }

  return (
    <div>
      {step !== 'confirmation' && <VenueFormHeader step={step} />}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && <PrivacyStep form={form} errors={errors} update={update} onContinue={goNext} onExit={openExitModal} />}
      {step === 'details' && <YourDetailsStep form={form} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'venue' && <VenueBookingStep form={form} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'accessibility' && <AccessibilityStep form={form} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'supporting' && <SupportingStep form={form} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'review' && <ReviewStep form={form} errors={errors} update={update} onBack={goBack} onEditStep={goToReviewSource} onSubmit={goNext} onExit={openExitModal} />}
      {step === 'confirmation' && <ConfirmationStep onStartAgain={startAgain} />}

      <ExitModal
        isOpen={exitModalOpen}
        onContinue={closeExitModal}
        onExit={startAgain}
        description='If you exit, the information entered in this booking request will be cleared.'
      />
    </div>
  )
}

function VenueFormHeader({ step }: { step: VenueStage }) {
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
      <VenueProgressStepper currentStage={step} />
      <p style={{ color: 'var(--gel-color-text-grey)', fontSize: '0.875rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
        {transactionName}
      </p>
      <Heading level={2} id={`${step}-heading`} style={{ marginBottom: 0 }}>
        {stageLabels[step]}
      </Heading>
    </header>
  )
}

function VenueProgressStepper({ currentStage }: { currentStage: VenueStage }) {
  const currentIndex = stepperStages.indexOf(currentStage)

  return (
    <nav aria-label='Booking progress' data-gelweb-component='progress-stepper' className='gel-progress-stepper'>
      <ol className='gel-progress-stepper__list'>
        {stepperStages.map((stage, index) => {
          const status = index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'todo'

          return (
            <li
              key={stage}
              className={`gel-progress-stepper__step gel-progress-stepper__step--${status}`}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              <div className='gel-progress-stepper__position' aria-hidden='true'>
                {status === 'completed' ? (
                  <svg width='14' height='14' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M13.17 1.86c.57-.68 1.57-.77 2.25-.2.64.53.76 1.45.31 2.12l-.1.13-8.5 10.23c-.56.67-1.54.76-2.21.24l-.13-.11-4.3-4.18c-.63-.62-.65-1.63-.04-2.26.58-.59 1.5-.64 2.14-.14l.12.11 3.07 2.98 7.4-8.9z' fill='currentColor' />
                  </svg>
                ) : (
                  <span className='gel-progress-stepper__number'>{index + 1}</span>
                )}
              </div>
              <span className='gel-progress-stepper__label'>
                {status !== 'todo' && <span className='gel-sr-only'>{status === 'completed' ? 'Completed: ' : 'Current: '}</span>}
                <span>{stageLabels[stage]}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function errorsForStep(step: VenueStep, form: FormState) {
  const errs: StepError[] = []

  if (step === 'privacy' && !form.termsAccepted) {
    errs.push({ id: 'terms-and-conditions', text: 'Accept the Terms and Conditions to continue' })
  }

  if (step === 'details' && !form.contactPhone.trim()) {
    errs.push({ id: 'contact-phone', text: 'Enter a contact phone number' })
  }

  if (step === 'venue') {
    if (!form.venueType) errs.push({ id: 'venue-type', text: 'Select a venue type' })
    if (!form.bookingPurpose.trim()) errs.push({ id: 'booking-purpose', text: 'Enter the booking purpose' })
    if (!form.eventDay || !form.eventMonth || !form.eventYear) {
      errs.push({ id: 'event-day', text: 'Enter the booking date' })
    } else {
      const day = Number.parseInt(form.eventDay, 10)
      const month = Number.parseInt(form.eventMonth, 10)
      const year = Number.parseInt(form.eventYear, 10)
      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2026 || year > 2030) {
        errs.push({ id: 'event-day', text: 'Enter a valid booking date' })
      }
    }
  }

  if (step === 'accessibility') {
    if (!form.needsSupport) errs.push({ id: 'needs-support', text: 'Select whether accessibility or equipment support is needed' })
    if (form.needsSupport === 'yes' && !form.supportDetails.trim()) errs.push({ id: 'support-details', text: 'Describe the support needed' })
  }

  if (step === 'supporting' && !form.additionalInfo.trim()) {
    errs.push({ id: 'additional-info', text: 'Provide additional information about the booking' })
  }

  if (step === 'review' && !form.declarationAccepted) {
    errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to submit' })
  }

  return errs
}

interface StepProps {
  form: FormState
  errors: StepError[]
  update: (patch: Partial<FormState>) => void
  onBack?: () => void
  onContinue: () => void
  onExit: () => void
}

function hasStepError(errors: StepError[], id: string) {
  return errors.some((error) => error.id === id)
}

function PrivacyStep({ form, errors, update, onContinue, onExit }: StepProps) {
  const termsError = hasStepError(errors, 'terms-and-conditions')

  return (
    <section aria-labelledby='privacy-heading' data-venue-page-template='privacy-and-terms'>
      <PrivacyCardPreview
        title='Privacy and terms'
        description='Read the Privacy Collection Notice and Terms and Conditions before continuing.'
        showAcknowledgement={false}
        sections={[
          {
            id: 'community-venue-privacy-collection-notice',
            title: 'Privacy Collection Notice',
            content: <p>Read the Privacy Collection Notice for this service before continuing.</p>,
          },
          {
            id: 'community-venue-terms-and-conditions',
            title: 'Terms and Conditions',
            content: <p>Read the Terms and Conditions for this booking request before continuing.</p>,
          },
          {
            id: 'community-venue-notifications-receipt',
            title: 'Notifications and receipt',
            content: <p>We will send the submitted booking receipt to the email address shown in your profile.</p>,
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
      <TransactionCtaGroup onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function YourDetailsStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  const phoneError = hasStepError(errors, 'contact-phone')

  return (
    <section aria-labelledby='details-heading' data-venue-page-template='profile-playback'>
      <DetailsCard
        title='Your profile details'
        description='These details come from Account/Profile. If they are incorrect, update them in Account/Profile before continuing.'
        statusLabel='Account/Profile'
        rows={[
          { label: 'Full name', value: accountProfile.fullName },
          { label: 'Email', value: accountProfile.email },
        ]}
      />
      <Field
        id='contact-phone'
        label='Contact phone number'
        helpMessage='We will use this number if we need more information about this booking request.'
        hasError={phoneError}
        errorMessage='Enter a contact phone number.'
      >
        <Input id='contact-phone' type='tel' value={form.contactPhone} onChange={(event) => update({ contactPhone: event.target.value })} hasError={phoneError} inputWidth='lg' autoComplete='tel' />
      </Field>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function VenueBookingStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  const typeError = hasStepError(errors, 'venue-type')
  const purposeError = hasStepError(errors, 'booking-purpose')
  const dateError = hasStepError(errors, 'event-day')

  return (
    <section aria-labelledby='venue-heading' data-venue-page-template='venue-booking-details'>
      <p>All fields must be completed unless marked optional.</p>
      <Field id='venue-type' label='Venue type' hasError={typeError} errorMessage='Select a venue type.'>
        <Select
          id='venue-type'
          value={form.venueType}
          onChange={(event) => update({ venueType: event.target.value as FormState['venueType'] })}
          hasError={typeError}
          inputWidth='xl'
          options={[
            { value: 'meeting-room', text: 'Meeting room' },
            { value: 'hall', text: 'Hall' },
            { value: 'outdoor-space', text: 'Outdoor space' },
          ]}
        />
      </Field>
      <MoreInfoDisclosure triggerText='Help choosing a venue type' title='Venue type guidance'>
        <ul>
          <li>Use meeting room for small group sessions.</li>
          <li>Use hall for larger community activities.</li>
          <li>Use outdoor space for activities that need open areas.</li>
        </ul>
      </MoreInfoDisclosure>
      <Field id='booking-purpose' label='Booking purpose' hasError={purposeError} errorMessage='Enter the booking purpose.'>
        <Input id='booking-purpose' value={form.bookingPurpose} onChange={(event) => update({ bookingPurpose: event.target.value })} hasError={purposeError} inputWidth='xl' />
      </Field>
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
        <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>Booking date</legend>
        <p style={{ fontSize: '0.875rem', margin: '0 0 0.5rem', color: 'var(--gel-color-text-grey)' }}>Enter the date as DD MM YYYY. For example, 25 12 2026.</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div>
            <label htmlFor='event-day' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Day</label>
            <Input id='event-day' value={form.eventDay} onChange={(event) => update({ eventDay: event.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateError} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='event-month' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Month</label>
            <Input id='event-month' value={form.eventMonth} onChange={(event) => update({ eventMonth: event.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateError} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='event-year' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Year</label>
            <Input id='event-year' value={form.eventYear} onChange={(event) => update({ eventYear: event.target.value.replace(/\D/g, '').slice(0, 4) })} hasError={dateError} inputWidth='sm' maxLength={4} />
          </div>
        </div>
        {dateError && <p className='gel-field__error' id='event-day-error'>Enter the booking date.</p>}
      </fieldset>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function AccessibilityStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  const supportError = hasStepError(errors, 'needs-support')
  const detailsError = hasStepError(errors, 'support-details')
  const charLimit = 500

  return (
    <section aria-labelledby='accessibility-heading' data-venue-page-template='accessibility-and-equipment'>
      <ConditionalQuestionPanel
        id='needs-support'
        legend='Do you need accessibility or equipment support?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={form.needsSupport}
        onChange={(value) => update({ needsSupport: value as FormState['needsSupport'], supportDetails: value === 'yes' ? form.supportDetails : '' })}
        showWhen='yes'
        hasError={supportError}
        errorMessage='Select whether accessibility or equipment support is needed'
      >
        <Field
          id='support-details'
          label='Describe the support needed'
          helpMessage={`Maximum ${charLimit} characters.`}
          hasError={detailsError}
          errorMessage='Describe the support needed.'
        >
          <Textarea id='support-details' value={form.supportDetails} onChange={(event) => update({ supportDetails: event.target.value })} hasError={detailsError} maxLength={charLimit} rows={4} />
        </Field>
        <p aria-live='polite' aria-atomic='true' style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', marginTop: '-1rem' }}>
          {form.supportDetails.length}/{charLimit} characters
        </p>
      </ConditionalQuestionPanel>
      <Accordion
        id='support-guidance'
        items={[
          {
            title: 'Accessibility support',
            children: <p>Tell us about accessible entry, seating or toilet access that would help the booking work well.</p>,
          },
          {
            title: 'Equipment requests',
            children: <p>Tell us about tables, chairs, projector or audio equipment needed for the booking.</p>,
          },
          {
            title: 'What not to include',
            children: <p>Do not include sensitive personal, health or identity information.</p>,
          },
        ]}
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function SupportingStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  const infoError = hasStepError(errors, 'additional-info')
  const charLimit = 500

  return (
    <section aria-labelledby='supporting-heading' data-venue-page-template='supporting-information'>
      <p>Provide any other details that will help us review this booking request.</p>
      <Field
        id='additional-info'
        label='Additional information'
        helpMessage={`Describe any specific requirements for your booking. Maximum ${charLimit} characters.`}
        hasError={infoError}
        errorMessage='Provide additional information about the booking.'
      >
        <Textarea id='additional-info' value={form.additionalInfo} onChange={(event) => update({ additionalInfo: event.target.value })} hasError={infoError} maxLength={charLimit} rows={5} />
      </Field>
      <p aria-live='polite' aria-atomic='true' style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', marginTop: '-1rem' }}>
        {form.additionalInfo.length}/{charLimit} characters
      </p>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ReviewStep({
  form,
  errors,
  update,
  onBack,
  onEditStep,
  onSubmit,
  onExit,
}: {
  form: FormState
  errors: StepError[]
  update: (patch: Partial<FormState>) => void
  onBack: () => void
  onEditStep: (step: Exclude<VenueStep, 'review' | 'confirmation'>) => void
  onSubmit: () => void
  onExit: () => void
}) {
  const declarationError = hasStepError(errors, 'declaration-accepted')

  return (
    <section aria-labelledby='review-heading' data-venue-page-template='review'>
      <div className='storybook-stack'>
        <ReviewInfoCard title='Your details' sections={[{ title: 'Profile and contact', rows: [
          { label: 'Full name', value: accountProfile.fullName },
          { label: 'Email', value: accountProfile.email },
          { label: 'Contact phone number', value: form.contactPhone },
        ] }]} onEdit={() => onEditStep('details')} />
        <ReviewInfoCard title='Venue booking details' sections={[{ title: 'Venue information', rows: [
          { label: 'Venue type', value: venueTypeLabel(form.venueType) },
          { label: 'Booking purpose', value: form.bookingPurpose },
          { label: 'Booking date', value: bookingDate(form) },
        ] }]} onEdit={() => onEditStep('venue')} />
        <ReviewInfoCard title='Accessibility and equipment' sections={[{ title: 'Support needs', rows: [
          { label: 'Support needed', value: yesNo(form.needsSupport) },
          { label: 'Support details', value: form.needsSupport === 'yes' ? form.supportDetails : 'Not applicable' },
        ] }]} onEdit={() => onEditStep('accessibility')} />
        <ReviewInfoCard title='Supporting information' sections={[{ title: 'Additional details', rows: [
          { label: 'Additional information', value: form.additionalInfo },
        ] }]} onEdit={() => onEditStep('supporting')} />
        <ReviewInfoCard title='Privacy' sections={[{ title: 'Privacy and terms', rows: [
          { label: 'Privacy Collection Notice', value: 'Read' },
          { label: 'Terms and Conditions', value: form.termsAccepted ? 'Accepted' : 'Not accepted' },
        ] }]} onEdit={() => onEditStep('privacy')} />
      </div>
      <Checkbox
        id='declaration-accepted'
        label='I declare that the information provided is true and correct.'
        checked={form.declarationAccepted}
        onChange={(value) => update({ declarationAccepted: Boolean(value) })}
        hasError={declarationError}
        errorMessage='Accept the declaration to submit.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit booking request' />
    </section>
  )
}

function ConfirmationStep({ onStartAgain }: { onStartAgain: () => void }) {
  return (
    <section aria-labelledby='confirmation-heading' data-venue-page-template='confirmation'>
      <ConfirmationHeader title='Your booking request has been submitted' transactionName={transactionName} />
      <TransactionSummaryCard
        heading='Receipt details'
        items={[
          { label: 'Reference number', value: receipt.referenceNumber },
          { label: 'Transaction date', value: receipt.transactionDate },
        ]}
      />
      <section aria-labelledby='keep-record-heading' className='tapaas-card'>
        <Heading level={2} id='keep-record-heading'>Keep a record</Heading>
        <p>Keep your reference number until the booking request has been reviewed.</p>
      </section>
      <section aria-labelledby='next-steps-heading' className='tapaas-card'>
        <Heading level={2} id='next-steps-heading'>What happens next?</Heading>
        <ol className='tapaas-step-list'>
          <li>Your booking request will be reviewed.</li>
          <li>We will contact you if more information is needed.</li>
          <li>We will notify you of the outcome.</li>
          <li>If accepted, you will receive booking details for the requested date.</li>
        </ol>
      </section>
      <FeedbackPrompt />
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start another booking' />
    </section>
  )
}

function FeedbackPrompt() {
  const [feedbackChoice, setFeedbackChoice] = useState<string | null>(null)

  return (
    <section aria-labelledby='feedback-heading' className='tapaas-card'>
      <Heading level={2} id='feedback-heading'>Help us improve</Heading>
      <p>Was this transaction easy to understand?</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button variant='secondary' onClick={() => setFeedbackChoice('yes')}>Yes</Button>
        <Button variant='secondary' onClick={() => setFeedbackChoice('no')}>No</Button>
      </div>
      <p aria-live='polite'>{feedbackChoice ? 'Thanks for your feedback.' : ''}</p>
    </section>
  )
}

function venueTypeLabel(value: FormState['venueType']) {
  if (value === 'meeting-room') return 'Meeting room'
  if (value === 'hall') return 'Hall'
  if (value === 'outdoor-space') return 'Outdoor space'
  return 'Not selected'
}

function bookingDate(form: FormState) {
  return `${form.eventDay}/${form.eventMonth}/${form.eventYear}`
}

function yesNo(value: 'yes' | 'no' | '') {
  if (value === 'yes') return 'Yes'
  if (value === 'no') return 'No'
  return 'Not selected'
}
