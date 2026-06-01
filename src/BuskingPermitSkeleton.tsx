import { useCallback, useState } from 'react'
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
  ConfirmationHeader,
  ConditionalQuestionPanel,
  DetailsCard,
  ExitModal,
  PrivacyCardPreview,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

type BuskingStep = 'privacy' | 'yourDetails' | 'performanceDetails' | 'additionalDetails' | 'review' | 'confirmation'
type StepperStep = Exclude<BuskingStep, 'confirmation'>

const stepOrder: BuskingStep[] = ['privacy', 'yourDetails', 'performanceDetails', 'additionalDetails', 'review', 'confirmation']
const stepperSteps: StepperStep[] = ['privacy', 'yourDetails', 'performanceDetails', 'additionalDetails', 'review']

const transactionName = 'Busking permit'

const stepLabels: Record<BuskingStep, string> = {
  privacy: 'Privacy',
  yourDetails: 'Your details',
  performanceDetails: 'Performance details',
  additionalDetails: 'Additional details',
  review: 'Review',
  confirmation: 'Your busking permit application has been submitted',
}

const accountProfile = {
  firstName: 'Alex',
  familyName: 'Citizen',
  email: 'alex.citizen@example.test',
}

const applicationReceipt = {
  number: 'BUSK-000000',
  transactionDate: '2 June 2026',
}

const performanceTypeOptions = [
  { value: 'music', text: 'Music' },
  { value: 'dance', text: 'Dance' },
  { value: 'theatre', text: 'Theatre or drama' },
  { value: 'circus', text: 'Circus or acrobatics' },
  { value: 'visual-art', text: 'Visual art' },
  { value: 'spoken-word', text: 'Spoken word or poetry' },
  { value: 'other', text: 'Other' },
]

const performanceTypeLabel = Object.fromEntries(performanceTypeOptions.map((o) => [o.value, o.text]))

interface FormState {
  termsAccepted: boolean
  performanceType: string
  performanceDescription: string
  proposedLocation: string
  proposedDateDay: string
  proposedDateMonth: string
  proposedDateYear: string
  proposedStartTime: string
  proposedEndTime: string
  needsSupport: string
  supportDetails: string
  declarationAccepted: boolean
}

const initialState: FormState = {
  termsAccepted: false,
  performanceType: '',
  performanceDescription: '',
  proposedLocation: '',
  proposedDateDay: '',
  proposedDateMonth: '',
  proposedDateYear: '',
  proposedStartTime: '',
  proposedEndTime: '',
  needsSupport: '',
  supportDetails: '',
  declarationAccepted: false,
}

export function BuskingPermitSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submittedErrors, setSubmittedErrors] = useState<StepError[]>([])

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((s: BuskingStep) => errorsForStep(s, form), [form])
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

  function goToReviewSource(targetStep: Exclude<BuskingStep, 'review' | 'confirmation'>) {
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
      {step !== 'confirmation' && <BuskingFormHeader step={step} />}

      <ErrorSummary ref={errorSummaryRef} errors={submittedErrors} />

      {step === 'privacy' && (
        <PrivacyStep form={form} submittedErrors={submittedErrors} update={update} onContinue={handleContinue} onExit={openExitModal} />
      )}
      {step === 'yourDetails' && (
        <YourDetailsStep onBack={handleBack} onContinue={handleContinue} onExit={openExitModal} />
      )}
      {step === 'performanceDetails' && (
        <PerformanceDetailsStep form={form} submittedErrors={submittedErrors} update={update} onBack={handleBack} onContinue={handleContinue} onExit={openExitModal} />
      )}
      {step === 'additionalDetails' && (
        <AdditionalDetailsStep form={form} submittedErrors={submittedErrors} update={update} onBack={handleBack} onContinue={handleContinue} onExit={openExitModal} />
      )}
      {step === 'review' && (
        <ReviewStep form={form} onBack={handleBack} onEditStep={goToReviewSource} onSubmit={handleContinue} onExit={openExitModal} />
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

function BuskingFormHeader({ step }: { step: StepperStep }) {
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
        stepsList={stepperSteps.map((s, index) => ({
          content: stepLabels[s],
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

function errorsForStep(step: BuskingStep, form: FormState): StepError[] {
  const errs: StepError[] = []

  if (step === 'privacy' && !form.termsAccepted) {
    errs.push({ id: 'terms-and-conditions', text: 'Accept the Terms and Conditions to continue' })
  }

  if (step === 'performanceDetails') {
    if (!form.performanceType) errs.push({ id: 'performance-type', text: 'Select a performance type' })
    if (!form.performanceDescription.trim()) errs.push({ id: 'performance-description', text: 'Describe your performance' })
    if (!form.proposedLocation.trim()) errs.push({ id: 'proposed-location', text: 'Enter the proposed location' })
    if (!form.proposedDateDay || !form.proposedDateMonth || !form.proposedDateYear) {
      errs.push({ id: 'proposed-date-day', text: 'Enter the proposed date' })
    } else if (!isValidDate(form.proposedDateDay, form.proposedDateMonth, form.proposedDateYear)) {
      errs.push({ id: 'proposed-date-day', text: 'Enter a valid proposed date' })
    }
    if (!form.proposedStartTime.trim()) errs.push({ id: 'proposed-start-time', text: 'Enter the proposed start time' })
    if (!form.proposedEndTime.trim()) errs.push({ id: 'proposed-end-time', text: 'Enter the proposed end time' })
  }

  if (step === 'additionalDetails') {
    if (!form.needsSupport) errs.push({ id: 'needs-support', text: 'Select whether you need accessibility or support adjustments' })
    if (form.needsSupport === 'yes' && !form.supportDetails.trim()) errs.push({ id: 'support-details', text: 'Describe the support or adjustments needed' })
    if (!form.declarationAccepted) errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to continue' })
  }

  return errs
}

function isValidDate(day: string, month: string, year: string) {
  if (!/^\d{1,2}$/.test(day) || !/^\d{1,2}$/.test(month) || !/^\d{4}$/.test(year)) return false
  const d = Number(day)
  const m = Number(month)
  const y = Number(year)
  const date = new Date(y, m - 1, d)
  return y >= 2026 && y <= 2030 && date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

function hasSubmittedError(errors: StepError[], id: string) {
  return errors.some((e) => e.id === id)
}

// ---------------------------------------------------------------------------
// Privacy step
// ---------------------------------------------------------------------------
function PrivacyStep({
  form,
  submittedErrors,
  update,
  onContinue,
  onExit,
}: {
  form: FormState
  submittedErrors: StepError[]
  update: (patch: Partial<FormState>) => void
  onContinue: () => void
  onExit: () => void
}) {
  const termsError = hasSubmittedError(submittedErrors, 'terms-and-conditions')
  return (
    <section aria-labelledby='privacy-heading'>
      <PrivacyCardPreview
        title='Privacy and terms'
        description='Read the Privacy Collection Notice and Terms and Conditions before continuing.'
        showAcknowledgement={false}
        sections={[
          {
            id: 'busking-privacy-collection-notice',
            title: 'Privacy Collection Notice',
            content: <p>Read the Privacy Collection Notice for this service before continuing.</p>,
          },
          {
            id: 'busking-terms-and-conditions',
            title: 'Terms and Conditions',
            content: <p>Read the Terms and Conditions for this application before continuing.</p>,
          },
          {
            id: 'busking-notifications-receipt',
            title: 'Notifications and receipt',
            content: <p>We will send the submitted application receipt to the email address shown in your profile.</p>,
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

// ---------------------------------------------------------------------------
// Your details step — read-only profile playback
// ---------------------------------------------------------------------------
function YourDetailsStep({
  onBack,
  onContinue,
  onExit,
}: {
  onBack: () => void
  onContinue: () => void
  onExit: () => void
}) {
  return (
    <section aria-labelledby='yourDetails-heading'>
      <DetailsCard
        title='Your profile details'
        description='These details come from your Service NSW Account. If they are incorrect, update them through Account/Profile before continuing.'
        rows={[
          { label: 'First name', value: accountProfile.firstName },
          { label: 'Family name', value: accountProfile.familyName },
          { label: 'Email', value: accountProfile.email },
        ]}
        headingLevel={3}
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} continueLabel='Continue' />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Performance details step
// ---------------------------------------------------------------------------
function PerformanceDetailsStep({
  form,
  submittedErrors,
  update,
  onBack,
  onContinue,
  onExit,
}: {
  form: FormState
  submittedErrors: StepError[]
  update: (patch: Partial<FormState>) => void
  onBack: () => void
  onContinue: () => void
  onExit: () => void
}) {
  const typeErr = hasSubmittedError(submittedErrors, 'performance-type')
  const descErr = hasSubmittedError(submittedErrors, 'performance-description')
  const locationErr = hasSubmittedError(submittedErrors, 'proposed-location')
  const dateErr = hasSubmittedError(submittedErrors, 'proposed-date-day')
  const startErr = hasSubmittedError(submittedErrors, 'proposed-start-time')
  const endErr = hasSubmittedError(submittedErrors, 'proposed-end-time')
  const descCharLimit = 500
  const dateHelpId = 'proposed-date-help'

  return (
    <section aria-labelledby='performanceDetails-heading'>
      <p>Provide the details of your proposed busking performance.</p>
      <p style={{ fontSize: '0.875rem', margin: '0 0 1.5rem' }}>
        All fields must be completed unless marked optional.
      </p>
      <Field id='performance-type' label='Performance type' hasError={typeErr} errorMessage='Select a performance type.'>
        <Select
          id='performance-type'
          value={form.performanceType}
          onChange={(e) => update({ performanceType: e.target.value })}
          hasError={typeErr}
          inputWidth='xl'
          placeholder='Select performance type'
          options={performanceTypeOptions}
        />
      </Field>
      <Field
        id='performance-description'
        label='Performance description'
        helpMessage={`Describe your performance. Maximum ${descCharLimit} characters.`}
        hasError={descErr}
        errorMessage='Describe your performance.'
      >
        <Textarea
          id='performance-description'
          value={form.performanceDescription}
          onChange={(e) => update({ performanceDescription: e.target.value })}
          hasError={descErr}
          maxLength={descCharLimit}
          rows={4}
        />
      </Field>
      <p aria-live='polite' aria-atomic='true' style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', marginTop: '-1rem' }}>
        {form.performanceDescription.length}/{descCharLimit} characters
      </p>
      <Field id='proposed-location' label='Proposed location' hasError={locationErr} errorMessage='Enter the proposed location.'>
        <Input id='proposed-location' value={form.proposedLocation} onChange={(e) => update({ proposedLocation: e.target.value })} hasError={locationErr} inputWidth='xl' />
      </Field>
      <fieldset aria-describedby={dateHelpId} style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
        <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>Proposed date</legend>
        <p id={dateHelpId} style={{ fontSize: '0.875rem', margin: '0 0 0.5rem', color: 'var(--gel-color-text-grey)' }}>
          Format: DD MM YYYY. For example, 15 08 2026.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div>
            <label htmlFor='proposed-date-day' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Day</label>
            <Input id='proposed-date-day' value={form.proposedDateDay} onChange={(e) => update({ proposedDateDay: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateErr} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='proposed-date-month' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Month</label>
            <Input id='proposed-date-month' value={form.proposedDateMonth} onChange={(e) => update({ proposedDateMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateErr} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='proposed-date-year' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Year</label>
            <Input id='proposed-date-year' value={form.proposedDateYear} onChange={(e) => update({ proposedDateYear: e.target.value.replace(/\D/g, '').slice(0, 4) })} hasError={dateErr} inputWidth='sm' maxLength={4} />
          </div>
        </div>
        {dateErr && <p className='gel-field__error' id='proposed-date-day-error'>Enter the proposed date.</p>}
      </fieldset>
      <Field id='proposed-start-time' label='Proposed start time' helpMessage='For example, 10:00 AM.' hasError={startErr} errorMessage='Enter the proposed start time.'>
        <Input id='proposed-start-time' value={form.proposedStartTime} onChange={(e) => update({ proposedStartTime: e.target.value })} hasError={startErr} inputWidth='md' />
      </Field>
      <Field id='proposed-end-time' label='Proposed end time' helpMessage='For example, 2:00 PM.' hasError={endErr} errorMessage='Enter the proposed end time.'>
        <Input id='proposed-end-time' value={form.proposedEndTime} onChange={(e) => update({ proposedEndTime: e.target.value })} hasError={endErr} inputWidth='md' />
      </Field>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Additional details step — support needs + declaration
// ---------------------------------------------------------------------------
function AdditionalDetailsStep({
  form,
  submittedErrors,
  update,
  onBack,
  onContinue,
  onExit,
}: {
  form: FormState
  submittedErrors: StepError[]
  update: (patch: Partial<FormState>) => void
  onBack: () => void
  onContinue: () => void
  onExit: () => void
}) {
  const supportErr = hasSubmittedError(submittedErrors, 'needs-support')
  const detailsErr = hasSubmittedError(submittedErrors, 'support-details')
  const declarationErr = hasSubmittedError(submittedErrors, 'declaration-accepted')
  const supportCharLimit = 500

  return (
    <section aria-labelledby='additionalDetails-heading'>
      <p>Tell us about any support or adjustments needed and accept the declaration.</p>
      <ConditionalQuestionPanel
        id='needs-support'
        legend='Do you need accessibility or support adjustments for your performance?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={form.needsSupport}
        onChange={(value) => update({ needsSupport: value, supportDetails: value === 'yes' ? form.supportDetails : '' })}
        showWhen='yes'
        hasError={supportErr}
        errorMessage='Select whether you need accessibility or support adjustments'
      >
        <Field
          id='support-details'
          label='Describe the support or adjustments needed'
          helpMessage={`Maximum ${supportCharLimit} characters.`}
          hasError={detailsErr}
          errorMessage='Describe the support or adjustments needed.'
        >
          <Textarea id='support-details' value={form.supportDetails} onChange={(e) => update({ supportDetails: e.target.value })} hasError={detailsErr} maxLength={supportCharLimit} rows={4} />
        </Field>
        <p aria-live='polite' aria-atomic='true' style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', marginTop: '-1rem' }}>
          {form.supportDetails.length}/{supportCharLimit} characters
        </p>
      </ConditionalQuestionPanel>
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

// ---------------------------------------------------------------------------
// Review step
// ---------------------------------------------------------------------------
function ReviewStep({
  form,
  onBack,
  onEditStep,
  onSubmit,
  onExit,
}: {
  form: FormState
  onBack: () => void
  onEditStep: (step: Exclude<BuskingStep, 'review' | 'confirmation'>) => void
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
            title: 'Profile details',
            rows: [
              { label: 'First name', value: accountProfile.firstName },
              { label: 'Family name', value: accountProfile.familyName },
              { label: 'Email', value: accountProfile.email },
            ],
          },
        ]}
        onEdit={() => onEditStep('yourDetails')}
      />
      <ReviewInfoCard
        title='Performance details'
        sections={[
          {
            title: 'Performance information',
            rows: [
              { label: 'Performance type', value: performanceTypeLabel[form.performanceType] || form.performanceType },
              { label: 'Performance description', value: form.performanceDescription },
              { label: 'Proposed location', value: form.proposedLocation },
              { label: 'Proposed date', value: `${form.proposedDateDay}/${form.proposedDateMonth}/${form.proposedDateYear}` },
              { label: 'Proposed start time', value: form.proposedStartTime },
              { label: 'Proposed end time', value: form.proposedEndTime },
            ],
          },
        ]}
        onEdit={() => onEditStep('performanceDetails')}
      />
      <ReviewInfoCard
        title='Additional details'
        sections={[
          {
            title: 'Support and declaration',
            rows: [
              { label: 'Needs accessibility or support adjustments', value: form.needsSupport === 'yes' ? 'Yes' : 'No' },
              ...(form.needsSupport === 'yes' ? [{ label: 'Support details', value: form.supportDetails }] : []),
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

// ---------------------------------------------------------------------------
// Confirmation step — submitted for review
// ---------------------------------------------------------------------------
function ConfirmationStep({ onStartAgain }: { onStartAgain: () => void }) {
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader title='Your busking permit application has been submitted' transactionName={transactionName} />
      <TransactionSummaryCard
        heading='Receipt details'
        items={[
          { label: 'Receipt number', value: applicationReceipt.number },
          { label: 'Transaction date', value: applicationReceipt.transactionDate },
        ]}
      />
      <section className='tapaas-card' aria-labelledby='keep-a-record-heading'>
        <Heading level={2} id='keep-a-record-heading'>Keep a record</Heading>
        <p>Keep your receipt number until the application has been reviewed.</p>
        <Button variant='secondary' onClick={() => window.print()}>Print or save receipt</Button>
      </section>
      <section aria-labelledby='next-steps-heading'>
        <Heading level={2} id='next-steps-heading'>Next steps</Heading>
        <ol className='tapaas-step-list'>
          <li>Your application will be reviewed.</li>
          <li>You will be notified of the outcome using the contact details in your profile.</li>
          <li>If your application is successful, your busking permit will be sent to you.</li>
        </ol>
      </section>
      <p>
        <TextLink href='#!'>Tell us about your experience</TextLink>
      </p>
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start another application' />
    </section>
  )
}
