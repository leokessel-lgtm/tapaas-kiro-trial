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
  Select,
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
  DetailsCard,
  ConditionalQuestionPanel,
} from './tapaas-preview'

type MarketStep =
  | 'privacy'
  | 'applicant'
  | 'contact'
  | 'market'
  | 'accessibility'
  | 'supporting'
  | 'declaration'
  | 'review'
  | 'confirmation'

const stepOrder: MarketStep[] = [
  'privacy', 'applicant', 'contact', 'market', 'accessibility', 'supporting', 'declaration', 'review', 'confirmation',
]

const stepLabels: Record<MarketStep, string> = {
  privacy: 'Privacy',
  applicant: 'Applicant details',
  contact: 'Contact details',
  market: 'Market details',
  accessibility: 'Accessibility and support',
  supporting: 'Supporting information',
  declaration: 'Declaration',
  review: 'Review',
  confirmation: 'Confirmation',
}

interface FormState {
  privacyAgreed: boolean
  fullName: string
  dobDay: string
  dobMonth: string
  dobYear: string
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
  additionalInfo: string
  declarationAccepted: boolean
}

const initialState: FormState = {
  privacyAgreed: false,
  fullName: '',
  dobDay: '',
  dobMonth: '',
  dobYear: '',
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
  additionalInfo: '',
  declarationAccepted: false,
}

export function AccessibleMarketPermitSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((s: MarketStep) => errorsForStep(s, form), [form])
  const { step, attempted, errors, errorSummaryRef, exitModalOpen, openExitModal, closeExitModal, goBack, goNext, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton — Accessible market permit.</strong>
        <p style={{ margin: '0.25rem 0 0' }}>
          This is a non-production build-assist example using mock data only. Privacy, legal, fee and processing details need owner confirmation.
        </p>
      </div>

      {step !== 'confirmation' && (
        <p aria-live='polite' style={{ color: 'var(--gel-color-text-grey)', marginTop: 0 }}>
          Step {stepOrder.indexOf(step) + 1} of {stepOrder.length}: {stepLabels[step]}
        </p>
      )}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && <PrivacyStep form={form} attempted={attempted} update={update} onContinue={goNext} onExit={openExitModal} />}
      {step === 'applicant' && <ApplicantStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'contact' && <ContactStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'market' && <MarketStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'accessibility' && <AccessibilityStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
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
function errorsForStep(step: MarketStep, form: FormState) {
  const errs: { id: string; text: string }[] = []
  if (step === 'privacy' && !form.privacyAgreed) {
    errs.push({ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' })
  }
  if (step === 'applicant') {
    if (!form.fullName.trim()) errs.push({ id: 'full-name', text: 'Enter your full name' })
    if (!form.dobDay || !form.dobMonth || !form.dobYear) errs.push({ id: 'dob-day', text: 'Enter your date of birth' })
    else {
      const d = parseInt(form.dobDay), m = parseInt(form.dobMonth), y = parseInt(form.dobYear)
      if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2026) errs.push({ id: 'dob-day', text: 'Enter a valid date of birth' })
    }
  }
  if (step === 'contact') {
    if (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.')) errs.push({ id: 'email', text: 'Enter a valid email address' })
    if (!form.phone.trim()) errs.push({ id: 'phone', text: 'Enter your phone number' })
    if (!form.street.trim()) errs.push({ id: 'street', text: 'Enter your street address' })
    if (!form.suburb.trim()) errs.push({ id: 'suburb', text: 'Enter your suburb' })
    if (!form.state) errs.push({ id: 'state', text: 'Select your state' })
    if (!form.postcode.trim() || form.postcode.length !== 4) errs.push({ id: 'postcode', text: 'Enter a valid 4-digit postcode' })
  }
  if (step === 'market') {
    if (!form.marketName.trim()) errs.push({ id: 'market-name', text: 'Enter the market name' })
    if (!form.marketType) errs.push({ id: 'market-type', text: 'Select a market type' })
    if (!form.eventDay || !form.eventMonth || !form.eventYear) errs.push({ id: 'event-day', text: 'Enter the event date' })
    else {
      const d = parseInt(form.eventDay), m = parseInt(form.eventMonth), y = parseInt(form.eventYear)
      if (d < 1 || d > 31 || m < 1 || m > 12 || y < 2024 || y > 2030) errs.push({ id: 'event-day', text: 'Enter a valid event date' })
    }
  }
  if (step === 'accessibility') {
    if (!form.needsSupport) errs.push({ id: 'needs-support', text: 'Select whether you need accessibility support' })
    if (form.needsSupport === 'yes' && !form.supportDetails.trim()) errs.push({ id: 'support-details', text: 'Describe the support needed' })
  }
  if (step === 'supporting') {
    if (!form.additionalInfo.trim()) errs.push({ id: 'additional-info', text: 'Provide additional information about your market stall' })
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
        <p>Replace this placeholder with the confirmed privacy collection notice for the accessible market permit service.</p>
      </InPageAlert>
      <p>We collect your personal information to process your accessible market permit application. This information may be shared with [confirmed disclosure recipients]. For more information, see [confirmed privacy policy URL].</p>
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
  const dobErr = attempted && (!form.dobDay || !form.dobMonth || !form.dobYear)
  return (
    <section aria-labelledby='applicant-heading'>
      <Heading level={2} id='applicant-heading'>Your details</Heading>
      <Field id='full-name' label='Full name' helpMessage='Enter your first and last name.' hasError={nameErr} errorMessage='Enter your full name.'>
        <Input id='full-name' value={form.fullName} onChange={(e) => update({ fullName: e.target.value })} hasError={nameErr} inputWidth='xl' autoComplete='name' />
      </Field>
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
        <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>Date of birth</legend>
        <p style={{ fontSize: '0.875rem', margin: '0 0 0.5rem', color: 'var(--gel-color-text-grey)' }}>For example, 15 03 1990</p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div>
            <label htmlFor='dob-day' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Day</label>
            <Input id='dob-day' value={form.dobDay} onChange={(e) => update({ dobDay: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dobErr} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='dob-month' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Month</label>
            <Input id='dob-month' value={form.dobMonth} onChange={(e) => update({ dobMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dobErr} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='dob-year' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Year</label>
            <Input id='dob-year' value={form.dobYear} onChange={(e) => update({ dobYear: e.target.value.replace(/\D/g, '').slice(0, 4) })} hasError={dobErr} inputWidth='sm' maxLength={4} />
          </div>
        </div>
        {dobErr && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--gel-color-error-bg)', padding: '0.5rem 1rem', marginTop: '0.5rem', fontWeight: 700, fontSize: '1rem' }}>
            <span style={{ color: 'var(--gel-color-error)' }}>⊘</span> Enter your date of birth.
          </div>
        )}
      </fieldset>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ContactStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const emailErr = attempted && (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.'))
  const phoneErr = attempted && !form.phone.trim()
  const streetErr = attempted && !form.street.trim()
  const suburbErr = attempted && !form.suburb.trim()
  const stateErr = attempted && !form.state
  const postcodeErr = attempted && (!form.postcode.trim() || form.postcode.length !== 4)
  return (
    <section aria-labelledby='contact-heading'>
      <Heading level={2} id='contact-heading'>Contact details</Heading>
      <Field id='email' label='Email address' hasError={emailErr} errorMessage='Enter a valid email address.'>
        <Input id='email' type='email' value={form.email} onChange={(e) => update({ email: e.target.value })} hasError={emailErr} inputWidth='xl' autoComplete='email' />
      </Field>
      <Field id='phone' label='Phone number' hasError={phoneErr} errorMessage='Enter your phone number.'>
        <Input id='phone' type='tel' value={form.phone} onChange={(e) => update({ phone: e.target.value })} hasError={phoneErr} inputWidth='lg' autoComplete='tel' />
      </Field>
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
        <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '1rem' }}>Postal address</legend>
        <Field id='street' label='Street address' hasError={streetErr} errorMessage='Enter your street address.'>
          <Input id='street' value={form.street} onChange={(e) => update({ street: e.target.value })} hasError={streetErr} inputWidth='xl' autoComplete='street-address' />
        </Field>
        <Field id='suburb' label='Suburb' hasError={suburbErr} errorMessage='Enter your suburb.'>
          <Input id='suburb' value={form.suburb} onChange={(e) => update({ suburb: e.target.value })} hasError={suburbErr} inputWidth='lg' autoComplete='address-level2' />
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
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function MarketStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const nameErr = attempted && !form.marketName.trim()
  const typeErr = attempted && !form.marketType
  const dateErr = attempted && (!form.eventDay || !form.eventMonth || !form.eventYear)
  return (
    <section aria-labelledby='market-heading'>
      <Heading level={2} id='market-heading'>Market details</Heading>
      <Field id='market-name' label='Market name' hasError={nameErr} errorMessage='Enter the market name.'>
        <Input id='market-name' value={form.marketName} onChange={(e) => update({ marketName: e.target.value })} hasError={nameErr} inputWidth='xl' />
      </Field>
      <RadioButtonList
        id='market-type'
        legend='Market type'
        options={[
          { value: 'food-market', label: 'Food market (mock)' },
          { value: 'craft-market', label: 'Craft market (mock)' },
          { value: 'farmers-market', label: 'Farmers market (mock)' },
          { value: 'mixed-market', label: 'Mixed market (mock)' },
        ]}
        value={form.marketType}
        onChange={(v) => update({ marketType: String(v) })}
        hasError={typeErr}
        errorMessage='Select a market type.'
      />
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

function AccessibilityStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const supportErr = attempted && !form.needsSupport
  const detailsErr = attempted && form.needsSupport === 'yes' && !form.supportDetails.trim()
  return (
    <section aria-labelledby='accessibility-heading'>
      <Heading level={2} id='accessibility-heading'>Accessibility and support needs</Heading>
      <ConditionalQuestionPanel
        id='needs-support'
        legend='Do you need accessibility or inclusion support for this market stall?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={form.needsSupport}
        onChange={(v) => update({ needsSupport: v })}
        showWhen='yes'
        hasError={supportErr}
        errorMessage='Select whether you need accessibility support'
      >
        <Field id='support-details' label='Describe the support needed' helpMessage='This is placeholder content only. No assessment, decision or service promise is made.' hasError={detailsErr} errorMessage='Describe the support needed.'>
          <Textarea id='support-details' value={form.supportDetails} onChange={(e) => update({ supportDetails: e.target.value })} hasError={detailsErr} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <DetailsCard
        title='Your application so far'
        rows={[
          { label: 'Name', value: form.fullName || '—' },
          { label: 'Market name', value: form.marketName || '—' },
        ]}
        headingLevel={3}
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
      <p>Provide additional details about your market stall to help us process your application. This uses mock data only.</p>
      <Field id='additional-info' label='Additional information' helpMessage={`Describe what your stall will offer, any equipment needs and special requirements. Maximum ${charLimit} characters.`} hasError={infoErr} errorMessage='Provide additional information about your market stall.'>
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
  const marketTypeLabel: Record<string, string> = { 'food-market': 'Food market', 'craft-market': 'Craft market', 'farmers-market': 'Farmers market', 'mixed-market': 'Mixed market' }
  return (
    <section aria-labelledby='review-heading'>
      <Heading level={2} id='review-heading'>Review your application</Heading>
      <p>Check the information below before submitting. This page does not submit to a real service.</p>
      <ReviewInfoCard title='Applicant details' sections={[{ title: 'Personal information', rows: [
        { label: 'Full name', value: form.fullName },
        { label: 'Date of birth', value: `${form.dobDay}/${form.dobMonth}/${form.dobYear}` },
      ] }]} />
      <ReviewInfoCard title='Contact details' sections={[{ title: 'Contact information', rows: [
        { label: 'Email', value: form.email },
        { label: 'Phone', value: form.phone },
        { label: 'Address', value: `${form.street}, ${form.suburb} ${form.state} ${form.postcode}` },
      ] }]} />
      <ReviewInfoCard title='Market details' sections={[{ title: 'Market information', rows: [
        { label: 'Market name', value: form.marketName },
        { label: 'Market type', value: marketTypeLabel[form.marketType] || form.marketType },
        { label: 'Event date', value: `${form.eventDay}/${form.eventMonth}/${form.eventYear}` },
      ] }]} />
      <ReviewInfoCard title='Accessibility support' sections={[{ title: 'Support needs', rows: [
        { label: 'Needs support', value: form.needsSupport === 'yes' ? 'Yes' : 'No' },
        ...(form.needsSupport === 'yes' ? [{ label: 'Support details', value: form.supportDetails }] : []),
      ] }]} />
      <ReviewInfoCard title='Supporting information' sections={[{ title: 'Additional details', rows: [
        { label: 'Additional information', value: form.additionalInfo },
      ] }]} />
      <ReviewFeesCard fees={[{ label: 'Application fee', amount: '$0.00' }, { label: 'Processing fee', amount: '$0.00' }]} totalAmount='$0.00' />
      <InPageAlert variant='info' title='Payment excluded'>
        <p>No payment flow is included in this trial skeleton. Fee amounts need owner confirmation.</p>
      </InPageAlert>
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

function ConfirmationStep({ form, onStartAgain }: { form: FormState; onStartAgain: () => void }) {
  const marketTypeLabel: Record<string, string> = { 'food-market': 'Food market', 'craft-market': 'Craft market', 'farmers-market': 'Farmers market', 'mixed-market': 'Mixed market' }
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader title='Application submitted' transactionName='Accessible market permit' />
      <TransactionSummaryCard items={[
        { label: 'Reference number', value: 'ACCESS-MARKET-000000', helpText: 'Mock reference only.' },
        { label: 'Applicant', value: form.fullName },
        { label: 'Market name', value: form.marketName },
        { label: 'Market type', value: marketTypeLabel[form.marketType] || form.marketType },
        { label: 'Event date', value: `${form.eventDay}/${form.eventMonth}/${form.eventYear}` },
        { label: 'Receipt', value: 'No payment receipt generated' },
      ]}>
        <p>Processing timeframes, receipt wording and next steps must be confirmed by the service owner before reuse. Expected processing time: [confirmed timeframe].</p>
      </TransactionSummaryCard>
      <Heading level={2}>Next steps</Heading>
      <ol className='tapaas-step-list'>
        <li>Your application will be reviewed within [confirmed timeframe].</li>
        <li>You will receive a notification at [confirmed contact method].</li>
        <li>If approved, your accessible market permit will be issued for the event date.</li>
        <li>Contact [confirmed support channel] if you need to change your market details.</li>
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
