import { useState, useCallback } from 'react'
import { useTransactionStep } from './useTransactionStep'
import {
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  InPageAlert,
  Input,
  Select,
  Textarea,
  MoreInfoDisclosure,
  Accordion,
  TextLink,
} from './gel'
import {
  ConfirmationHeader,
  DeclarationReview,
  ExitModal,
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
  ConditionalQuestionPanel,
} from './tapaas-preview'

type VenueStep =
  | 'privacy'
  | 'applicant'
  | 'venue'
  | 'accessibility'
  | 'supporting'
  | 'declaration'
  | 'review'
  | 'confirmation'

const stepOrder: VenueStep[] = [
  'privacy', 'applicant', 'venue', 'accessibility', 'supporting', 'declaration', 'review', 'confirmation',
]

const stepLabels: Record<VenueStep, string> = {
  privacy: 'Privacy',
  applicant: 'Applicant details',
  venue: 'Venue booking details',
  accessibility: 'Accessibility and equipment',
  supporting: 'Supporting information',
  declaration: 'Declaration',
  review: 'Review',
  confirmation: 'Confirmation',
}

interface FormState {
  privacyAgreed: boolean
  fullName: string
  email: string
  phone: string
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
  privacyAgreed: false,
  fullName: '',
  email: '',
  phone: '',
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

  const getErrors = useCallback((s: VenueStep) => errorsForStep(s, form), [form])
  const { step, setStep, attempted, setAttempted, errors, errorSummaryRef, exitModalOpen, openExitModal, closeExitModal, goBack, goNext, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  function goToReviewSource(targetStep: Exclude<VenueStep, 'privacy' | 'review' | 'confirmation'>) {
    setAttempted(false)
    setStep(targetStep)
  }

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton — Community venue booking.</strong>
        <p style={{ margin: '0.25rem 0 0' }}>
          This is a non-production build-assist example using mock data only. Privacy, legal, fee and processing details need owner confirmation.
        </p>
      </div>

      {step !== 'confirmation' && (
        <p aria-live='polite' style={{ color: 'var(--gel-color-text-grey)', marginTop: 0 }}>
          Step {stepOrder.indexOf(step) + 1} of 8: {stepLabels[step]}
        </p>
      )}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && <PrivacyStep form={form} attempted={attempted} update={update} onContinue={goNext} onExit={openExitModal} />}
      {step === 'applicant' && <ApplicantStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'venue' && <VenueStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'accessibility' && <AccessibilityStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'supporting' && <SupportingStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'declaration' && <DeclarationStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'review' && <ReviewStep form={form} onBack={goBack} onEditStep={goToReviewSource} onSubmit={goNext} onExit={openExitModal} />}
      {step === 'confirmation' && <ConfirmationStep form={form} onStartAgain={() => { reset(); setForm(initialState) }} />}

      <ExitModal
        isOpen={exitModalOpen}
        onContinue={closeExitModal}
        onExit={() => { reset(); setForm(initialState) }}
        description='This preview does not save draft applications. If you exit, the mock form data will be cleared.'
      />
    </div>
  )
}

// --- Validation ---
function errorsForStep(step: VenueStep, form: FormState) {
  const errs: { id: string; text: string }[] = []
  if (step === 'privacy' && !form.privacyAgreed) {
    errs.push({ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy and terms information' })
  }
  if (step === 'applicant') {
    if (!form.fullName.trim()) errs.push({ id: 'full-name', text: 'Enter your full name' })
    if (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.')) errs.push({ id: 'email', text: 'Enter a valid email address' })
    if (!form.phone.trim()) errs.push({ id: 'phone', text: 'Enter your phone number' })
  }
  if (step === 'venue') {
    if (!form.venueType) errs.push({ id: 'venue-type', text: 'Select a venue type' })
    if (!form.bookingPurpose.trim()) errs.push({ id: 'booking-purpose', text: 'Enter the booking purpose' })
    if (!form.eventDay || !form.eventMonth || !form.eventYear) errs.push({ id: 'event-day', text: 'Enter the booking date' })
    else {
      const d = parseInt(form.eventDay), m = parseInt(form.eventMonth), y = parseInt(form.eventYear)
      if (d < 1 || d > 31 || m < 1 || m > 12 || y < 2024 || y > 2030) errs.push({ id: 'event-day', text: 'Enter a valid booking date' })
    }
  }
  if (step === 'accessibility') {
    if (!form.needsSupport) errs.push({ id: 'needs-support', text: 'Select whether you need accessibility or equipment support' })
    if (form.needsSupport === 'yes' && !form.supportDetails.trim()) errs.push({ id: 'support-details', text: 'Describe the support needed' })
  }
  if (step === 'supporting') {
    if (!form.additionalInfo.trim()) errs.push({ id: 'additional-info', text: 'Provide additional information about your booking' })
  }
  if (step === 'declaration' && !form.declarationAccepted) {
    errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to continue' })
  }
  return errs
}

// --- Page components ---
interface StepProps {
  form: FormState
  attempted: boolean
  update: (patch: Partial<FormState>) => void
  onBack?: () => void
  onContinue: () => void
  onExit: () => void
}

function PrivacyStep({ form, attempted, update, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='privacy-heading'>
      <Heading level={2} id='privacy-heading'>Privacy information</Heading>
      <InPageAlert variant='info' title='Owner confirmation required'>
        <p>Replace these placeholders with the confirmed privacy collection notice, terms and notification wording for the community venue booking service.</p>
      </InPageAlert>
      <section aria-labelledby='privacy-collection-notice-heading'>
        <Heading level={3} id='privacy-collection-notice-heading'>Privacy collection notice</Heading>
        <p>We collect your personal information to process your community venue booking. This information may be shared with [confirmed disclosure recipients]. For more information, see [confirmed privacy policy URL].</p>
      </section>
      <section aria-labelledby='terms-and-conditions-heading'>
        <Heading level={3} id='terms-and-conditions-heading'>Terms and conditions</Heading>
        <p>Terms, conditions and consent wording for this booking must be supplied by the service owner before real use.</p>
      </section>
      <section aria-labelledby='notifications-heading'>
        <Heading level={3} id='notifications-heading'>Notifications</Heading>
        <p>Notification channels, timing and content are placeholders in this preview and need owner confirmation.</p>
      </section>
      <Checkbox
        id='privacy-confirmation'
        label='I have read and understand the privacy and terms information.'
        checked={form.privacyAgreed}
        onChange={(v) => update({ privacyAgreed: Boolean(v) })}
        hasError={attempted && !form.privacyAgreed}
        errorMessage='Confirm that you have read the privacy and terms information.'
      />
      <TransactionCtaGroup onContinue={onContinue} onExit={onExit} continueLabel='Continue' />
    </section>
  )
}

function ApplicantStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const nameErr = attempted && !form.fullName.trim()
  const emailErr = attempted && (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.'))
  const phoneErr = attempted && !form.phone.trim()
  return (
    <section aria-labelledby='applicant-heading'>
      <Heading level={2} id='applicant-heading'>Applicant details</Heading>
      <Field id='full-name' label='Full name' helpMessage='Enter your first and last name.' hasError={nameErr} errorMessage='Enter your full name.'>
        <Input id='full-name' value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} hasError={nameErr} inputWidth='xl' autoComplete='name' />
      </Field>
      <Field id='email' label='Email address' hasError={emailErr} errorMessage='Enter a valid email address.'>
        <Input id='email' type='email' value={form.email} onChange={(e) => update({ email: e.target.value })} hasError={emailErr} inputWidth='xl' autoComplete='email' />
      </Field>
      <Field id='phone' label='Phone number' hasError={phoneErr} errorMessage='Enter your phone number.'>
        <Input id='phone' type='tel' value={form.phone} onChange={(e) => update({ phone: e.target.value })} hasError={phoneErr} inputWidth='lg' autoComplete='tel' />
      </Field>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function VenueStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const typeErr = attempted && !form.venueType
  const purposeErr = attempted && !form.bookingPurpose.trim()
  const dateErr = attempted && (!form.eventDay || !form.eventMonth || !form.eventYear)
  return (
    <section aria-labelledby='venue-heading'>
      <Heading level={2} id='venue-heading'>Venue booking details</Heading>
      <Field id='venue-type' label='Venue type' hasError={typeErr} errorMessage='Select a venue type.'>
        <Select
          id='venue-type'
          value={form.venueType}
          onChange={(e) => update({ venueType: e.target.value as FormState['venueType'] })}
          hasError={typeErr}
          inputWidth='xl'
          options={[
            { value: 'meeting-room', text: 'Meeting room (mock)' },
            { value: 'hall', text: 'Hall (mock)' },
            { value: 'outdoor-space', text: 'Outdoor space (mock)' },
          ]}
        />
      </Field>
      <MoreInfoDisclosure triggerText='Help choosing a venue type' title='Venue type guidance'>
        <ul>
          <li>Use meeting room for small group sessions.</li>
          <li>Use hall for larger community activities.</li>
          <li>Use outdoor space for activities that need open areas.</li>
          <li>This is mock guidance only and needs owner confirmation.</li>
        </ul>
      </MoreInfoDisclosure>
      <Field id='booking-purpose' label='Booking purpose' hasError={purposeErr} errorMessage='Enter the booking purpose.'>
        <Input id='booking-purpose' value={form.bookingPurpose} onChange={(e) => update({ bookingPurpose: e.target.value })} hasError={purposeErr} inputWidth='xl' />
      </Field>
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
        <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>Booking date</legend>
        <p style={{ fontSize: '0.875rem', margin: '0 0 0.5rem', color: 'var(--gel-color-text-grey)' }}>For example, 25 12 2026</p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div>
            <label htmlFor='event-day' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Day</label>
            <Input id='event-day' value={form.eventDay} onChange={(e) => update({ eventDay: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateErr} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='event-month' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Month</label>
            <Input id='event-month' value={form.eventMonth} onChange={(e) => update({ eventMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateErr} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='event-year' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Year</label>
            <Input id='event-year' value={form.eventYear} onChange={(e) => update({ eventYear: e.target.value.replace(/\D/g, '').slice(0, 4) })} hasError={dateErr} inputWidth='sm' maxLength={4} />
          </div>
        </div>
        {dateErr && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--gel-color-error-bg)', padding: '0.5rem 1rem', marginTop: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
            <span style={{ color: 'var(--gel-color-error)' }}>⊘</span> Enter the booking date.
          </div>
        )}
      </fieldset>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function AccessibilityStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const supportErr = attempted && !form.needsSupport
  const detailsErr = attempted && form.needsSupport === 'yes' && !form.supportDetails.trim()
  return (
    <section aria-labelledby='accessibility-heading'>
      <Heading level={2} id='accessibility-heading'>Accessibility and equipment</Heading>
      <ConditionalQuestionPanel
        id='needs-support'
        legend='Do you need accessibility or equipment support?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={form.needsSupport}
        onChange={(v) => update({ needsSupport: v as FormState['needsSupport'] })}
        showWhen='yes'
        hasError={supportErr}
        errorMessage='Select whether you need accessibility or equipment support'
      >
        <Field id='support-details' label='Describe the support needed' helpMessage='This is placeholder content only. No assessment, decision or service promise is made.' hasError={detailsErr} errorMessage='Describe the support needed.'>
          <Textarea id='support-details' value={form.supportDetails} onChange={(e) => update({ supportDetails: e.target.value })} hasError={detailsErr} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <Accordion
        id='support-guidance'
        items={[
          {
            title: 'Accessibility support',
            children: (
              <>
                <p>Placeholder guidance about accessible entry, seating and toilets.</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', fontStyle: 'italic' }}>Owner confirmation required before real use.</p>
              </>
            ),
          },
          {
            title: 'Equipment requests',
            children: (
              <>
                <p>Placeholder guidance about tables, chairs, projector or audio equipment.</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', fontStyle: 'italic' }}>Owner confirmation required before real use.</p>
              </>
            ),
          },
          {
            title: 'What not to include',
            children: (
              <p>Do not include sensitive personal, health or identity information in this prototype. This is mock data only.</p>
            ),
          },
        ]}
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function SupportingStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const infoErr = attempted && !form.additionalInfo.trim()
  const charLimit = 500
  return (
    <section aria-labelledby='supporting-heading'>
      <Heading level={2} id='supporting-heading'>Supporting information</Heading>
      <p>Provide additional details about your venue booking to help us process your request. This uses mock data only.</p>
      <InPageAlert variant='warning' title='Sensitive information'>
        <p>Do not include sensitive personal, health, identity or payment information.</p>
      </InPageAlert>
      <Field id='additional-info' label='Additional information' helpMessage={`Describe any specific requirements for your booking. Maximum ${charLimit} characters.`} hasError={infoErr} errorMessage='Provide additional information about your booking.'>
        <Textarea id='additional-info' value={form.additionalInfo} onChange={(e) => update({ additionalInfo: e.target.value })} hasError={infoErr} maxLength={charLimit} rows={5} />
      </Field>
      <p aria-live='polite' aria-atomic='true' style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', marginTop: '-1rem' }}>
        {form.additionalInfo.length}/{charLimit} characters
      </p>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function DeclarationStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='declaration-heading'>
      <Heading level={2} id='declaration-heading'>Declaration</Heading>
      <InPageAlert variant='warning' title='Legal wording required'>
        <p>This placeholder must be replaced with confirmed legal or policy wording before use in a real transaction.</p>
      </InPageAlert>
      <p>By submitting this booking request, I declare that the information I have provided is true and correct. I understand that providing false or misleading information is [confirmed legal consequence — policy owner to confirm].</p>
      <Checkbox
        id='declaration-accepted'
        label='I declare that the information provided is true and correct.'
        checked={form.declarationAccepted}
        onChange={(v) => update({ declarationAccepted: Boolean(v) })}
        hasError={attempted && !form.declarationAccepted}
        errorMessage='Accept the declaration to continue.'
      />
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
  onEditStep: (step: Exclude<VenueStep, 'privacy' | 'review' | 'confirmation'>) => void
  onSubmit: () => void
  onExit: () => void
}) {
  const venueTypeLabel: Record<string, string> = { 'meeting-room': 'Meeting room', 'hall': 'Hall', 'outdoor-space': 'Outdoor space' }
  return (
    <section aria-labelledby='review-heading'>
      <Heading level={2} id='review-heading'>Review your booking</Heading>
      <p>Check the information below before submitting. This page does not submit to a real service.</p>
      <ReviewInfoCard title='Applicant details' sections={[{ title: 'Personal information', rows: [
        { label: 'Full name', value: form.fullName },
        { label: 'Email', value: form.email },
        { label: 'Phone', value: form.phone },
      ] }]} onEdit={() => onEditStep('applicant')} />
      <ReviewInfoCard title='Venue booking details' sections={[{ title: 'Venue information', rows: [
        { label: 'Venue type', value: venueTypeLabel[form.venueType] || form.venueType },
        { label: 'Booking purpose', value: form.bookingPurpose },
        { label: 'Booking date', value: `${form.eventDay}/${form.eventMonth}/${form.eventYear}` },
      ] }]} onEdit={() => onEditStep('venue')} />
      <ReviewInfoCard title='Accessibility and equipment' sections={[{ title: 'Support needs', rows: [
        { label: 'Needs support', value: form.needsSupport === 'yes' ? 'Yes' : 'No' },
        ...(form.needsSupport === 'yes' ? [{ label: 'Support details', value: form.supportDetails }] : []),
      ] }]} onEdit={() => onEditStep('accessibility')} />
      <ReviewInfoCard title='Supporting information' sections={[{ title: 'Additional details', rows: [
        { label: 'Additional information', value: form.additionalInfo },
      ] }]} onEdit={() => onEditStep('supporting')} />
      <DeclarationReview
        intro='You accepted this placeholder declaration before reviewing the booking:'
        sections={[{
          title: 'Declaration accepted',
          statements: [
            'I declare that the information provided is true and correct.',
            'Legal consequence wording remains source-gated and must be confirmed by the policy owner.',
          ],
        }]}
      />
      <p>
        <TextLink onClick={() => onEditStep('declaration')}>Edit declaration</TextLink>
      </p>
      <ReviewFeesCard fees={[{ label: 'Venue booking fee', amount: '$0.00' }]} totalAmount='$0.00' />
      <InPageAlert variant='info' title='Payment excluded'>
        <p>No payment flow is included in this trial skeleton. Fee amounts need owner confirmation.</p>
      </InPageAlert>
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit booking' />
    </section>
  )
}

function ConfirmationStep({ form, onStartAgain }: { form: FormState; onStartAgain: () => void }) {
  const venueTypeLabel: Record<string, string> = { 'meeting-room': 'Meeting room', 'hall': 'Hall', 'outdoor-space': 'Outdoor space' }
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader title='Booking submitted' transactionName='Community venue booking' />
      <TransactionSummaryCard items={[
        { label: 'Reference number', value: 'VENUE-000000', helpText: 'Mock reference only.' },
        { label: 'Applicant', value: form.fullName },
        { label: 'Venue type', value: venueTypeLabel[form.venueType] || form.venueType },
        { label: 'Booking date', value: `${form.eventDay}/${form.eventMonth}/${form.eventYear}` },
        { label: 'Receipt', value: 'No payment receipt generated' },
      ]}>
        <p>Processing timeframes, receipt wording and next steps must be confirmed by the service owner before reuse. Expected processing time: [confirmed timeframe].</p>
      </TransactionSummaryCard>
      <Heading level={2}>Next steps</Heading>
      <ol className='tapaas-step-list'>
        <li>Your booking will be reviewed within [confirmed timeframe].</li>
        <li>You will receive a confirmation at [confirmed contact method].</li>
        <li>If approved, your venue booking will be confirmed for the requested date.</li>
        <li>Contact [confirmed support channel] if you need to change your booking details.</li>
      </ol>
      <InPageAlert variant='info' title='Owner confirmation required'>
        <p>All timeframes, contact methods and approval processes above are placeholders. They must be confirmed by the service owner before real use.</p>
      </InPageAlert>
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start another booking' />
    </section>
  )
}
