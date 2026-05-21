import { useState, useCallback, useRef, useEffect } from 'react'
import { useTransactionStep } from './useTransactionStep'
import {
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  InPageAlert,
  Input,
  Button,
  Textarea,
  TextLink,
} from './gel'
import {
  ConfirmationHeader,
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

/* ─── Types ─────────────────────────────────────────────────────────── */

type StressStep =
  | 'privacy'
  | 'applicant'
  | 'holders'
  | 'supporting'
  | 'declaration'
  | 'review'
  | 'outcome'

const stepOrder: StressStep[] = [
  'privacy', 'applicant', 'holders', 'supporting', 'declaration', 'review', 'outcome',
]

const stepLabels: Record<StressStep, string> = {
  privacy: 'Privacy',
  applicant: 'Applicant details',
  holders: 'Permit holders',
  supporting: 'Supporting details',
  declaration: 'Declaration',
  review: 'Review',
  outcome: 'Outcome',
}

interface PermitHolder {
  name: string
  relationship: string
}

interface FormState {
  privacyAgreed: boolean
  fullName: string
  email: string
  phone: string
  holders: PermitHolder[]
  supportingInfo: string
  declarationAccepted: boolean
  simulateError: boolean
}

const initialState: FormState = {
  privacyAgreed: false,
  fullName: '',
  email: '',
  phone: '',
  holders: [{ name: '', relationship: '' }],
  supportingInfo: '',
  declarationAccepted: false,
  simulateError: false,
}

/* ─── Error logic ───────────────────────────────────────────────────── */

function errorsForStep(step: StressStep, form: FormState) {
  const errs: { id: string; text: string }[] = []
  if (step === 'privacy' && !form.privacyAgreed) {
    errs.push({ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' })
  }
  if (step === 'applicant') {
    if (!form.fullName.trim()) errs.push({ id: 'full-name', text: 'Enter your full name' })
    if (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.')) errs.push({ id: 'email', text: 'Enter a valid email address' })
    if (!form.phone.trim()) errs.push({ id: 'phone', text: 'Enter your phone number' })
  }
  if (step === 'holders') {
    const hasValid = form.holders.some((h) => h.name.trim() && h.relationship.trim())
    if (!hasValid) errs.push({ id: 'holder-0-name', text: 'At least one permit holder must have a name and relationship' })
  }
  if (step === 'supporting') {
    if (!form.supportingInfo.trim()) errs.push({ id: 'supporting-info', text: 'Provide supporting information' })
  }
  if (step === 'declaration' && !form.declarationAccepted) {
    errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to continue' })
  }
  return errs
}

/* ─── Main component ────────────────────────────────────────────────── */

export function ComplexTransactionStressTestSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)
  const [showExitModal, setShowExitModal] = useState(false)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((s: StressStep) => errorsForStep(s, form), [form])
  const {
    step, setStep, attempted, setAttempted, errors, errorSummaryRef,
    goBack, goNext, reset,
  } = useTransactionStep(stepOrder, 'outcome', getErrors)

  /* ── Exit modal logic ─────────────────────────────────────────────── */

  function openExitModal() {
    returnFocusRef.current = document.activeElement as HTMLElement
    setShowExitModal(true)
  }

  function closeExitModal() {
    setShowExitModal(false)
    window.setTimeout(() => returnFocusRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!showExitModal) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeExitModal()
    }
    document.addEventListener('keydown', handleKey)
    window.setTimeout(() => modalRef.current?.focus(), 0)
    return () => document.removeEventListener('keydown', handleKey)
  }, [showExitModal])

  function handleStartAgain() {
    reset()
    setForm(initialState)
    setShowExitModal(false)
  }

  /* ── Render ───────────────────────────────────────────────────────── */

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton — Complex transaction stress test (internal only).</strong>
        <p style={{ margin: '0.25rem 0 0' }}>
          This is a non-production build-assist example using mock data only. Privacy, legal and processing details need owner confirmation.
        </p>
      </div>

      {step !== 'outcome' && (
        <p aria-live='polite' style={{ color: 'var(--gel-color-text-grey)', marginTop: 0 }}>
          Step {stepOrder.indexOf(step) + 1} of 7: {stepLabels[step]}
        </p>
      )}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && <PrivacyStep form={form} attempted={attempted} update={update} onContinue={goNext} onExit={openExitModal} />}
      {step === 'applicant' && <ApplicantStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'holders' && <HoldersStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'supporting' && <SupportingStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'declaration' && <DeclarationStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={openExitModal} />}
      {step === 'review' && <ReviewStep form={form} update={update} setStep={setStep} setAttempted={setAttempted} onBack={goBack} onSubmit={goNext} onExit={openExitModal} />}
      {step === 'outcome' && <OutcomeStep form={form} onStartAgain={handleStartAgain} />}

      {/* ── Exit modal ──────────────────────────────────────────────── */}
      {showExitModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={closeExitModal} />
          <div
            ref={modalRef}
            tabIndex={-1}
            role='dialog'
            aria-modal='true'
            aria-labelledby='exit-modal-title'
            style={{ position: 'relative', background: 'var(--gel-color-white, #fff)', borderRadius: '6px', padding: '2rem', maxWidth: '480px', width: '90%', outline: 'none' }}
          >
            <Heading level={2} id='exit-modal-title'>Are you sure you want to exit?</Heading>
            <p>If you exit, your progress will not be saved.</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)' }}>
              This is a mock exit modal for stress testing. It does not claim production GEL modal behaviour.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Button onClick={closeExitModal}>No, continue</Button>
              <Button variant='secondary' onClick={handleStartAgain}>Yes, exit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Step components ───────────────────────────────────────────────── */

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
        <p>Replace this placeholder with the confirmed privacy collection notice for this service.</p>
      </InPageAlert>
      <p>
        We collect your personal information to process your application. This information may be shared with
        [confirmed disclosure recipients]. For more information, see [confirmed privacy policy URL].
      </p>
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

function HoldersStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const hasValid = form.holders.some((h) => h.name.trim() && h.relationship.trim())
  const holdersErr = attempted && !hasValid

  function addHolder() {
    if (form.holders.length < 3) {
      update({ holders: [...form.holders, { name: '', relationship: '' }] })
    }
  }

  function removeHolder(index: number) {
    if (form.holders.length > 1) {
      update({ holders: form.holders.filter((_, i) => i !== index) })
    }
  }

  function updateHolder(index: number, patch: Partial<PermitHolder>) {
    update({ holders: form.holders.map((h, i) => (i === index ? { ...h, ...patch } : h)) })
  }

  return (
    <section aria-labelledby='holders-heading'>
      <Heading level={2} id='holders-heading'>Permit holders</Heading>
      <p>Add up to 3 permit holders. At least one must have a name and relationship.</p>

      {holdersErr && (
        <InPageAlert variant='error' title='Missing holder details'>
          <p>At least one permit holder must have a name and relationship.</p>
        </InPageAlert>
      )}

      {form.holders.map((holder, index) => (
        <fieldset key={index} style={{ border: '1px solid var(--gel-color-border, #ccc)', borderRadius: '4px', padding: '1rem', margin: '0 0 1rem' }}>
          <legend style={{ fontWeight: 500, fontSize: '1rem' }}>Holder {index + 1}</legend>
          <Field id={`holder-${index}-name`} label='Full name' hasError={false} errorMessage=''>
            <Input id={`holder-${index}-name`} value={holder.name} onChange={(e) => updateHolder(index, { name: e.target.value })} inputWidth='xl' />
          </Field>
          <Field id={`holder-${index}-relationship`} label='Relationship to applicant' hasError={false} errorMessage=''>
            <Input id={`holder-${index}-relationship`} value={holder.relationship} onChange={(e) => updateHolder(index, { relationship: e.target.value })} inputWidth='lg' />
          </Field>
          {form.holders.length > 1 && (
            <Button variant='secondary' onClick={() => removeHolder(index)}>Remove holder {index + 1}</Button>
          )}
        </fieldset>
      ))}

      {form.holders.length < 3 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <Button variant='secondary' onClick={addHolder}>Add another holder</Button>
        </div>
      )}

      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function SupportingStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const infoErr = attempted && !form.supportingInfo.trim()
  const charLimit = 500
  return (
    <section aria-labelledby='supporting-heading'>
      <Heading level={2} id='supporting-heading'>Supporting details</Heading>
      <p>Provide any additional information to support your application. This uses mock data only.</p>
      <Field
        id='supporting-info'
        label='Supporting information'
        helpMessage={`Describe any relevant details. Maximum ${charLimit} characters.`}
        hasError={infoErr}
        errorMessage='Provide supporting information.'
      >
        <Textarea id='supporting-info' value={form.supportingInfo} onChange={(e) => update({ supportingInfo: e.target.value })} hasError={infoErr} maxLength={charLimit} rows={5} />
      </Field>
      <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', marginTop: '-1rem' }}>
        {form.supportingInfo.length}/{charLimit} characters
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
      <p>
        By submitting this application, I declare that the information I have provided is true and correct.
        I understand that providing false or misleading information is [confirmed legal consequence — policy owner to confirm].
      </p>
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

/* ─── Review step ───────────────────────────────────────────────────── */

interface ReviewStepProps {
  form: FormState
  update: (patch: Partial<FormState>) => void
  setStep: (step: StressStep) => void
  setAttempted: (v: boolean) => void
  onBack: () => void
  onSubmit: () => void
  onExit: () => void
}

function ReviewStep({ form, update, setStep, setAttempted, onBack, onSubmit, onExit }: ReviewStepProps) {
  const holdersDisplay = form.holders
    .filter((h) => h.name.trim())
    .map((h) => `${h.name} (${h.relationship || 'not specified'})`)
    .join('; ') || 'None provided'

  return (
    <section aria-labelledby='review-heading'>
      <Heading level={2} id='review-heading'>Review your application</Heading>
      <p>Check the information below before submitting. This page does not submit to a real service.</p>

      <ReviewInfoCard
        title='Applicant details'
        onEdit={() => { setStep('applicant'); setAttempted(false) }}
        sections={[{ title: 'Personal information', rows: [
          { label: 'Full name', value: form.fullName },
          { label: 'Email', value: form.email },
          { label: 'Phone', value: form.phone },
        ] }]}
      />

      <ReviewInfoCard
        title='Permit holders'
        onEdit={() => { setStep('holders'); setAttempted(false) }}
        sections={[{ title: 'Holders', rows: [
          { label: 'Permit holders', value: holdersDisplay },
        ] }]}
      />

      <ReviewInfoCard
        title='Supporting details'
        onEdit={() => { setStep('supporting'); setAttempted(false) }}
        sections={[{ title: 'Supporting information', rows: [
          { label: 'Details', value: form.supportingInfo || 'None provided' },
        ] }]}
      />

      <ReviewInfoCard
        title='Declaration'
        sections={[{ title: 'Declaration status', rows: [
          { label: 'Declaration accepted', value: form.declarationAccepted ? 'Yes' : 'No' },
        ] }]}
      />

      <ReviewFeesCard
        fees={[{ label: 'Application fee', amount: '$0.00' }, { label: 'Processing fee', amount: '$0.00' }]}
        totalAmount='$0.00'
      />

      <InPageAlert variant='info' title='Payment excluded'>
        <p>No payment flow is included in this trial skeleton. Fee amounts need owner confirmation.</p>
      </InPageAlert>

      <div style={{ margin: '1.5rem 0', padding: '1rem', border: '1px dashed var(--gel-color-border, #ccc)', borderRadius: '4px' }}>
        <Heading level={3}>Stress test controls</Heading>
        <Checkbox
          id='simulate-error'
          label='Simulate business error (stress test only)'
          checked={form.simulateError}
          onChange={(v) => update({ simulateError: Boolean(v) })}
        />
        <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', marginTop: '0.5rem' }}>
          When checked, the outcome page will show a business error instead of a confirmation.
        </p>
      </div>

      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

/* ─── Outcome step (conditional routing) ────────────────────────────── */

function OutcomeStep({ form, onStartAgain }: { form: FormState; onStartAgain: () => void }) {
  if (form.simulateError) {
    return (
      <section aria-labelledby='outcome-heading'>
        <div role='status'>
          <InPageAlert variant='error' title='Your application could not be processed'>
            <p>
              A business rule prevented this application from being submitted. This is a simulated error for stress testing purposes only.
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)' }}>
              In a real transaction, this page would show a specific error code and recovery instructions confirmed by the service owner.
            </p>
          </InPageAlert>
        </div>
        <Heading level={2} id='outcome-heading'>Application not submitted</Heading>
        <p>The simulated business error prevented submission. You can start again or contact [confirmed support channel] for help.</p>
        <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start again' />
        <p style={{ marginTop: '1rem' }}>
          <TextLink href='https://github.com/leokessel-lgtm/tapaas-kiro-trial/blob/main/docs/tapaas/00-source-inventory.md'>
            Review TaPaaS source inventory
          </TextLink>
        </p>
      </section>
    )
  }

  return (
    <section aria-labelledby='outcome-heading'>
      <ConfirmationHeader title='Application submitted' transactionName='Complex transaction stress test' />
      <Heading level={2} id='outcome-heading'>Application confirmed</Heading>
      <TransactionSummaryCard items={[
        { label: 'Reference number', value: 'STRESS-000000', helpText: 'Mock reference only.' },
        { label: 'Applicant', value: form.fullName },
        { label: 'Email', value: form.email },
        { label: 'Permit holders', value: `${form.holders.filter((h) => h.name.trim()).length} holder(s)` },
        { label: 'Receipt', value: 'No payment receipt generated' },
      ]}>
        <p>Processing timeframes, receipt wording and next steps must be confirmed by the service owner before reuse. Expected processing time: [confirmed timeframe].</p>
      </TransactionSummaryCard>
      <Heading level={3}>Next steps</Heading>
      <ol className='tapaas-step-list'>
        <li>Your application will be reviewed within [confirmed timeframe].</li>
        <li>You will receive a notification at [confirmed contact method].</li>
        <li>If approved, your permit will be issued.</li>
        <li>Contact [confirmed support channel] if you need to make changes.</li>
      </ol>
      <InPageAlert variant='info' title='Owner confirmation required'>
        <p>All timeframes, contact methods and approval processes above are placeholders. They must be confirmed by the service owner before real use.</p>
      </InPageAlert>
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start again' />
      <p style={{ marginTop: '1rem' }}>
        <TextLink href='https://github.com/leokessel-lgtm/tapaas-kiro-trial/blob/main/docs/tapaas/00-source-inventory.md'>
          Review TaPaaS source inventory
        </TextLink>
      </p>
    </section>
  )
}
