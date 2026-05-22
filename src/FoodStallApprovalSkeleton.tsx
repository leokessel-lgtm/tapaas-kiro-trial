import { useState, useCallback } from 'react'
import { useTransactionStep } from './useTransactionStep'
import {
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  InPageAlert,
  Input,
  RadioButtonList,
  Textarea,
  TextLink,
} from './gel'
import {
  ConfirmationHeader,
  ExitModal,
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
  ConditionalQuestionPanel,
} from './tapaas-preview'

type FoodStep =
  | 'privacy'
  | 'applicant'
  | 'stall'
  | 'food'
  | 'supporting'
  | 'declaration'
  | 'review'
  | 'confirmation'

const stepOrder: FoodStep[] = [
  'privacy', 'applicant', 'stall', 'food', 'supporting', 'declaration', 'review', 'confirmation',
]

const stepLabels: Record<FoodStep, string> = {
  privacy: 'Privacy',
  applicant: 'Applicant details',
  stall: 'Stall details',
  food: 'Food handling details',
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
  stallName: string
  stallType: 'hot-food' | 'cold-food' | 'beverages' | 'mixed' | ''
  eventName: string
  eventDay: string
  eventMonth: string
  eventYear: string
  preparesOnSite: 'yes' | 'no' | ''
  preparationDetails: string
  additionalInfo: string
  declarationAccepted: boolean
}

const initialState: FormState = {
  privacyAgreed: false,
  fullName: '',
  email: '',
  phone: '',
  stallName: '',
  stallType: '',
  eventName: '',
  eventDay: '',
  eventMonth: '',
  eventYear: '',
  preparesOnSite: '',
  preparationDetails: '',
  additionalInfo: '',
  declarationAccepted: false,
}

export function FoodStallApprovalSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((s: FoodStep) => errorsForStep(s, form), [form])
  const { step, attempted, errors, errorSummaryRef, exitModalOpen, openExitModal, closeExitModal, goBack, goNext, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton — Temporary food stall approval.</strong>
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
      {step === 'stall' && <StallStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'food' && <FoodHandlingStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'supporting' && <SupportingStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'declaration' && <DeclarationStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'review' && <ReviewStep form={form} onBack={goBack} onSubmit={goNext} onExit={openExitModal} />}
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
function errorsForStep(step: FoodStep, form: FormState) {
  const errs: { id: string; text: string }[] = []
  if (step === 'privacy' && !form.privacyAgreed) {
    errs.push({ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' })
  }
  if (step === 'applicant') {
    if (!form.fullName.trim()) errs.push({ id: 'full-name', text: 'Enter your full name' })
    if (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.')) errs.push({ id: 'email', text: 'Enter a valid email address' })
    if (!form.phone.trim()) errs.push({ id: 'phone', text: 'Enter your phone number' })
  }
  if (step === 'stall') {
    if (!form.stallName.trim()) errs.push({ id: 'stall-name', text: 'Enter your stall name' })
    if (!form.stallType) errs.push({ id: 'stall-type', text: 'Select a stall type' })
    if (!form.eventName.trim()) errs.push({ id: 'event-name', text: 'Enter the event name' })
    if (!form.eventDay || !form.eventMonth || !form.eventYear) errs.push({ id: 'event-day', text: 'Enter the event date' })
    else {
      const d = parseInt(form.eventDay), m = parseInt(form.eventMonth), y = parseInt(form.eventYear)
      if (d < 1 || d > 31 || m < 1 || m > 12 || y < 2024 || y > 2030) errs.push({ id: 'event-day', text: 'Enter a valid event date' })
    }
  }
  if (step === 'food') {
    if (!form.preparesOnSite) errs.push({ id: 'prepares-on-site', text: 'Select whether you will prepare food on site' })
    if (form.preparesOnSite === 'yes' && !form.preparationDetails.trim()) errs.push({ id: 'preparation-details', text: 'Describe how food will be prepared safely' })
  }
  if (step === 'supporting') {
    if (!form.additionalInfo.trim()) errs.push({ id: 'additional-info', text: 'Provide additional information about your food stall' })
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
        <p>Replace this placeholder with the confirmed privacy collection notice for the temporary food stall approval service.</p>
      </InPageAlert>
      <p>We collect your personal information to process your temporary food stall approval application. This information may be shared with [confirmed disclosure recipients]. For more information, see [confirmed privacy policy URL].</p>
      <Checkbox
        id='privacy-confirmation'
        label='I have read and understand the privacy information.'
        checked={form.privacyAgreed}
        onChange={(v) => update({ privacyAgreed: Boolean(v) })}
        hasError={attempted && !form.privacyAgreed}
        errorMessage='Confirm that you have read the privacy information.'
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

function StallStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const nameErr = attempted && !form.stallName.trim()
  const typeErr = attempted && !form.stallType
  const eventErr = attempted && !form.eventName.trim()
  const dateErr = attempted && (!form.eventDay || !form.eventMonth || !form.eventYear)
  return (
    <section aria-labelledby='stall-heading'>
      <Heading level={2} id='stall-heading'>Stall details</Heading>
      <Field id='stall-name' label='Stall name' hasError={nameErr} errorMessage='Enter your stall name.'>
        <Input id='stall-name' value={form.stallName} onChange={(e) => update({ stallName: e.target.value })} hasError={nameErr} inputWidth='xl' />
      </Field>
      <RadioButtonList
        id='stall-type'
        legend='Stall type'
        value={form.stallType}
        onChange={(v) => update({ stallType: v as FormState['stallType'] })}
        hasError={typeErr}
        errorMessage='Select a stall type.'
        options={[
          { value: 'hot-food', label: 'Hot food (mock)' },
          { value: 'cold-food', label: 'Cold food (mock)' },
          { value: 'beverages', label: 'Beverages (mock)' },
          { value: 'mixed', label: 'Mixed (mock)' },
        ]}
      />
      <Field id='event-name' label='Event name' hasError={eventErr} errorMessage='Enter the event name.'>
        <Input id='event-name' value={form.eventName} onChange={(e) => update({ eventName: e.target.value })} hasError={eventErr} inputWidth='xl' />
      </Field>
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
        <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>Event date</legend>
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
            <span style={{ color: 'var(--gel-color-error)' }}>⊘</span> Enter the event date.
          </div>
        )}
      </fieldset>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function FoodHandlingStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const preparesErr = attempted && !form.preparesOnSite
  const detailsErr = attempted && form.preparesOnSite === 'yes' && !form.preparationDetails.trim()
  return (
    <section aria-labelledby='food-heading'>
      <Heading level={2} id='food-heading'>Food handling details</Heading>
      <ConditionalQuestionPanel
        id='prepares-on-site'
        legend='Will you prepare food on site?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={form.preparesOnSite}
        onChange={(v) => update({ preparesOnSite: v as FormState['preparesOnSite'] })}
        showWhen='yes'
        hasError={preparesErr}
        errorMessage='Select whether you will prepare food on site'
      >
        <Field id='preparation-details' label='Describe how food will be prepared safely' helpMessage='This is placeholder content only. No food safety assessment is made.' hasError={detailsErr} errorMessage='Describe how food will be prepared safely.'>
          <Textarea id='preparation-details' value={form.preparationDetails} onChange={(e) => update({ preparationDetails: e.target.value })} hasError={detailsErr} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <InPageAlert variant='info' title='Food safety — mock content only'>
        <p>Food safety requirements, permits and inspections are not assessed in this trial skeleton. All content is mock only.</p>
      </InPageAlert>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function SupportingStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const infoErr = attempted && !form.additionalInfo.trim()
  const charLimit = 400
  return (
    <section aria-labelledby='supporting-heading'>
      <Heading level={2} id='supporting-heading'>Supporting information</Heading>
      <p>Provide additional details about your food stall to help us process your application. This uses mock data only.</p>
      <InPageAlert variant='warning' title='Sensitive information'>
        <p>Do not include sensitive personal, health, identity or payment information.</p>
      </InPageAlert>
      <Field id='additional-info' label='Additional information' helpMessage={`Describe any specific requirements for your food stall. Maximum ${charLimit} characters.`} hasError={infoErr} errorMessage='Provide additional information about your food stall.'>
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
      <p>By submitting this application, I declare that the information I have provided is true and correct. I understand that providing false or misleading information is [confirmed legal consequence — policy owner to confirm].</p>
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

function ReviewStep({ form, onBack, onSubmit, onExit }: { form: FormState; onBack: () => void; onSubmit: () => void; onExit: () => void }) {
  const stallTypeLabel: Record<string, string> = { 'hot-food': 'Hot food', 'cold-food': 'Cold food', 'beverages': 'Beverages', 'mixed': 'Mixed' }
  return (
    <section aria-labelledby='review-heading'>
      <Heading level={2} id='review-heading'>Review your application</Heading>
      <p>Check the information below before submitting. This page does not submit to a real service.</p>
      <ReviewInfoCard title='Applicant details' sections={[{ title: 'Personal information', rows: [
        { label: 'Full name', value: form.fullName },
        { label: 'Email', value: form.email },
        { label: 'Phone', value: form.phone },
      ] }]} />
      <ReviewInfoCard title='Stall details' sections={[{ title: 'Stall information', rows: [
        { label: 'Stall name', value: form.stallName },
        { label: 'Stall type', value: stallTypeLabel[form.stallType] || form.stallType },
        { label: 'Event name', value: form.eventName },
        { label: 'Event date', value: `${form.eventDay}/${form.eventMonth}/${form.eventYear}` },
      ] }]} />
      <ReviewInfoCard title='Food handling details' sections={[{ title: 'Food preparation', rows: [
        { label: 'Prepares food on site', value: form.preparesOnSite === 'yes' ? 'Yes' : 'No' },
        ...(form.preparesOnSite === 'yes' ? [{ label: 'Preparation details', value: form.preparationDetails }] : []),
      ] }]} />
      <ReviewInfoCard title='Supporting information' sections={[{ title: 'Additional details', rows: [
        { label: 'Additional information', value: form.additionalInfo },
      ] }]} />
      <ReviewFeesCard fees={[{ label: 'Food stall approval fee', amount: '$0.00' }]} totalAmount='$0.00' />
      <InPageAlert variant='info' title='Payment excluded'>
        <p>No payment flow is included in this trial skeleton. Fee amounts need owner confirmation.</p>
      </InPageAlert>
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

function ConfirmationStep({ form, onStartAgain }: { form: FormState; onStartAgain: () => void }) {
  const stallTypeLabel: Record<string, string> = { 'hot-food': 'Hot food', 'cold-food': 'Cold food', 'beverages': 'Beverages', 'mixed': 'Mixed' }
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader title='Application submitted' transactionName='Temporary food stall approval' />
      <TransactionSummaryCard items={[
        { label: 'Reference number', value: 'FOOD-STALL-000000', helpText: 'Mock reference only.' },
        { label: 'Applicant', value: form.fullName },
        { label: 'Stall name', value: form.stallName },
        { label: 'Stall type', value: stallTypeLabel[form.stallType] || form.stallType },
        { label: 'Event date', value: `${form.eventDay}/${form.eventMonth}/${form.eventYear}` },
        { label: 'Receipt', value: 'No payment receipt generated' },
      ]}>
        <p>Processing timeframes, receipt wording and next steps must be confirmed by the service owner before reuse. Expected processing time: [confirmed timeframe].</p>
      </TransactionSummaryCard>
      <Heading level={2}>Next steps</Heading>
      <ol className='tapaas-step-list'>
        <li>Your application will be reviewed within [confirmed timeframe].</li>
        <li>You will receive a confirmation at [confirmed contact method].</li>
        <li>If approved, your temporary food stall approval will be confirmed for the requested event date.</li>
        <li>Contact [confirmed support channel] if you need to change your application details.</li>
      </ol>
      <InPageAlert variant='info' title='Owner confirmation required'>
        <p>All timeframes, contact methods and approval processes above are placeholders. They must be confirmed by the service owner before real use.</p>
      </InPageAlert>
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start again' />
      <p style={{ marginTop: '1rem' }}>
        <TextLink href='https://github.com/leokessel-lgtm/tapaas-kiro-trial/blob/main/docs/tapaas/00-source-inventory.md'>Review TaPaaS source inventory</TextLink>
      </p>
    </section>
  )
}
