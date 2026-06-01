import { useState, useCallback } from 'react'
import { type StepError, useTransactionStep } from './useTransactionStep'
import {
  Button,
  Checkbox,
  ErrorSummary,
  Heading,
  RadioButtonList,
  TextLink,
} from './gel'
import {
  ConfirmationHeader,
  ExitModal,
  PrivacyCardPreview,
  ReviewInfoCard,
  TransactionSummaryCard,
} from './tapaas-preview'

type PermitStep = 'privacy' | 'input' | 'review' | 'confirmation'

const stepOrder: PermitStep[] = ['privacy', 'input', 'review', 'confirmation']

const transactionName = 'Apply for a trial permit'

const pageTitles: Record<PermitStep, string> = {
  privacy: 'Privacy information',
  input: 'Application details',
  review: 'Review your application',
  confirmation: 'Your trial permit is approved',
}

const accountProfile = {
  firstName: 'Jane',
  familyName: 'Citizen',
}

const trialPermitReceipt = {
  number: 'TP-000000',
  transactionDate: '1 June 2026',
}

export function TrialPermitSkeleton() {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [permitType, setPermitType] = useState('')
  const [declarationAccepted, setDeclarationAccepted] = useState(false)
  const [submittedErrors, setSubmittedErrors] = useState<StepError[]>([])

  const getErrors = useCallback((s: PermitStep) => {
    const errs: { id: string; text: string }[] = []
    if (s === 'privacy' && !termsAccepted) {
      errs.push({ id: 'terms-and-conditions', text: 'Accept the Terms and Conditions to continue' })
    }
    if (s === 'input') {
      if (!permitType) {
        errs.push({ id: 'permit-type', text: 'Select a permit type' })
      }
      if (!declarationAccepted) {
        errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to continue' })
      }
    }
    return errs
  }, [termsAccepted, permitType, declarationAccepted])

  const { step, setStep, setAttempted, errorSummaryRef, exitModalOpen, openExitModal, closeExitModal, goBack, goNext, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  function hasSubmittedError(id: string) {
    return submittedErrors.some((error) => error.id === id)
  }

  function handleContinue() {
    const nextErrors = getErrors(step)
    setSubmittedErrors(nextErrors)
    goNext()
  }

  function handleBack() {
    setSubmittedErrors([])
    goBack()
  }

  function goToReviewSource(targetStep: Extract<PermitStep, 'privacy' | 'input'>) {
    setAttempted(false)
    setSubmittedErrors([])
    setStep(targetStep)
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      const heading = document.getElementById(`${targetStep}-heading`)
      if (heading) { heading.tabIndex = -1; heading.focus() }
    }, 0)
  }

  return (
    <div>
      {step !== 'confirmation' && (
        <TrialPermitFormHeader step={step} />
      )}

      <ErrorSummary id='trial-permit-error-summary' ref={errorSummaryRef} errors={submittedErrors} />

      {step === 'privacy' && (
        <PrivacyStep
          termsAccepted={termsAccepted}
          hasError={hasSubmittedError('terms-and-conditions')}
          onChange={setTermsAccepted}
          onContinue={handleContinue}
          onExit={openExitModal}
        />
      )}

      {step === 'input' && (
        <ApplicationDetailsStep
          profile={accountProfile}
          permitType={permitType}
          permitError={hasSubmittedError('permit-type')}
          declarationAccepted={declarationAccepted}
          declarationError={hasSubmittedError('declaration-accepted')}
          onPermitChange={setPermitType}
          onDeclarationChange={setDeclarationAccepted}
          onBack={handleBack}
          onContinue={handleContinue}
          onExit={openExitModal}
        />
      )}

      {step === 'review' && (
        <ReviewStep
          profile={accountProfile}
          permitType={permitType}
          onBack={handleBack}
          onEditPrivacy={() => goToReviewSource('privacy')}
          onEditApplication={() => goToReviewSource('input')}
          onSubmit={handleContinue}
          onExit={openExitModal}
        />
      )}

      {step === 'confirmation' && (
        <ConfirmationStep
          onStartAgain={() => {
            reset()
            setSubmittedErrors([])
            setTermsAccepted(false)
            setPermitType('')
            setDeclarationAccepted(false)
          }}
        />
      )}

      <ExitModal
        isOpen={exitModalOpen}
        onContinue={closeExitModal}
        onExit={() => { reset(); setSubmittedErrors([]); setTermsAccepted(false); setPermitType(''); setDeclarationAccepted(false) }}
        description='If you exit, the information entered in this application will be cleared.'
      />
    </div>
  )
}

function TrialPermitFormHeader({ step }: { step: PermitStep }) {
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
      <p style={{ color: 'var(--gel-color-text-grey)', fontSize: '0.875rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
        {transactionName}
      </p>
      <Heading level={2} id={`${step}-heading`} style={{ marginBottom: '1.5rem' }}>
        {pageTitles[step]}
      </Heading>
    </header>
  )
}

function PrivacyStep({
  termsAccepted,
  hasError,
  onChange,
  onContinue,
  onExit,
}: {
  termsAccepted: boolean
  hasError: boolean
  onChange: (value: boolean) => void
  onContinue: () => void
  onExit: () => void
}) {
  return (
    <section aria-labelledby='privacy-heading'>
      <PrivacyCardPreview
        title='Privacy and terms'
        description='Read the Privacy Collection Notice and Terms and Conditions before continuing.'
        showAcknowledgement={false}
        sections={[
          {
            id: 'trial-permit-privacy-collection-notice',
            title: 'Privacy Collection Notice',
            content: <p>Read the Privacy Collection Notice for this service before continuing.</p>,
          },
          {
            id: 'trial-permit-terms-and-conditions',
            title: 'Terms and Conditions',
            content: <p>Read the Terms and Conditions for this application before continuing.</p>,
          },
          {
            id: 'trial-permit-notifications-receipt',
            title: 'Notifications and receipt',
            content: <p>If your permit is approved, your receipt will be shown at the end of this transaction.</p>,
          },
        ]}
      />
      <Checkbox
        id='terms-and-conditions'
        label='I agree to the Terms and Conditions.'
        checked={termsAccepted}
        onChange={(value) => onChange(Boolean(value))}
        hasError={hasError}
        errorMessage='Accept the Terms and Conditions to continue.'
      />
      <TrialPermitActionGroup onContinue={onContinue} onExit={onExit} continueLabel='Continue' />
    </section>
  )
}

function ApplicationDetailsStep({
  profile,
  permitType,
  permitError,
  declarationAccepted,
  declarationError,
  onPermitChange,
  onDeclarationChange,
  onBack,
  onContinue,
  onExit,
}: {
  profile: typeof accountProfile
  permitType: string
  permitError: boolean
  declarationAccepted: boolean
  declarationError: boolean
  onPermitChange: (value: string) => void
  onDeclarationChange: (value: boolean) => void
  onBack: () => void
  onContinue: () => void
  onExit: () => void
}) {
  return (
    <section aria-labelledby='input-heading'>
      <p>
        Check your personal details and choose the trial permit type you want to apply for.
      </p>
      <p style={{ fontSize: '0.875rem', margin: '0 0 1.5rem' }}>
        All fields must be completed unless marked optional.
      </p>
      <section className='tapaas-card' aria-labelledby='personal-details-heading'>
        <Heading level={3} id='personal-details-heading'>Personal details</Heading>
        <p>These details come from your Service NSW Account.</p>
        <dl className='tapaas-summary-list'>
          <div className='tapaas-summary-row'>
            <dt>First name</dt>
            <dd>{profile.firstName}</dd>
          </div>
          <div className='tapaas-summary-row'>
            <dt>Family name</dt>
            <dd>{profile.familyName}</dd>
          </div>
        </dl>
        <p className='tapaas-help-text'>
          If these details are incorrect, update them through Account/Profile before continuing.
        </p>
      </section>
      <RadioButtonList
        id='permit-type'
        legend={<strong>Permit type *</strong>}
        options={[
          { value: 'standard', label: 'Standard trial permit' },
          { value: 'extended', label: 'Extended trial permit' },
        ]}
        value={permitType}
        onChange={(value) => onPermitChange(String(value))}
        hasError={permitError}
        errorMessage='Select a permit type.'
      />
      <p>
        By submitting this application, I declare that the information I have provided is true and correct.
      </p>
      <Checkbox
        id='declaration-accepted'
        label='I declare that the information provided is true and correct.'
        checked={declarationAccepted}
        onChange={(value) => onDeclarationChange(Boolean(value))}
        hasError={declarationError}
        errorMessage='Accept the declaration to continue.'
      />
      <TrialPermitActionGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ReviewStep({
  profile,
  permitType,
  onBack,
  onEditPrivacy,
  onEditApplication,
  onSubmit,
  onExit,
}: {
  profile: typeof accountProfile
  permitType: string
  onBack: () => void
  onEditPrivacy: () => void
  onEditApplication: () => void
  onSubmit: () => void
  onExit: () => void
}) {
  const permitLabel = permitType === 'extended' ? 'Extended trial permit' : 'Standard trial permit'
  return (
    <section aria-labelledby='review-heading'>
      <p>
        Check your application before submitting.
      </p>
      <ReviewInfoCard
        title='Application details'
        sections={[
          {
            title: 'Personal details',
            rows: [
              { label: 'First name', value: profile.firstName },
              { label: 'Family name', value: profile.familyName },
            ],
          },
          {
            title: 'Permit details',
            rows: [
              { label: 'Permit type', value: permitLabel },
              { label: 'Declaration', value: 'Accepted' },
            ],
          },
        ]}
        onEdit={onEditApplication}
      />
      <ReviewInfoCard
        title='Privacy'
        sections={[
          {
            title: 'Privacy and terms',
            rows: [
              { label: 'Privacy Collection Notice', value: 'Read' },
              { label: 'Terms and Conditions', value: 'Accepted' },
              { label: 'Notifications and receipt', value: 'Receipt shown after approval' },
            ],
          },
        ]}
        onEdit={onEditPrivacy}
      />
      <TrialPermitActionGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

function ConfirmationStep({
  onStartAgain,
}: {
  onStartAgain: () => void
}) {
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader
        title='Your trial permit is approved'
        transactionName='Apply for a trial permit'
      />
      <TransactionSummaryCard
        heading='Receipt details'
        items={[
          { label: 'Receipt number', value: trialPermitReceipt.number },
          { label: 'Transaction date', value: trialPermitReceipt.transactionDate },
        ]}
      >
        <p>
          Your receipt is your trial permit.
        </p>
      </TransactionSummaryCard>
      <section className='tapaas-card' aria-labelledby='keep-a-record-heading'>
        <Heading level={2} id='keep-a-record-heading'>Keep a record</Heading>
        <p>
          Print or save this receipt for your records.
        </p>
        <Button variant='secondary' onClick={() => window.print()}>Print or save receipt</Button>
      </section>
      <p>
        <TextLink href='#!'>Tell us about your experience</TextLink>
      </p>
      <TrialPermitActionGroup onContinue={onStartAgain} continueLabel='Start another application' />
    </section>
  )
}

function TrialPermitActionGroup({
  onBack,
  onContinue,
  onExit,
  continueLabel = 'Continue',
  backLabel = 'Back',
  exitLabel = 'Exit',
}: {
  onBack?: () => void
  onContinue?: () => void
  onExit?: () => void
  continueLabel?: string
  backLabel?: string
  exitLabel?: string
}) {
  return (
    <div
      role='group'
      aria-label='Transaction actions'
      data-tapaas-component='transaction-action-area'
      data-preview-boundary='trial-permit local CTA ordering; no new routing included'
      style={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0 0' }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {onBack && <Button variant='secondary' onClick={onBack}>{backLabel}</Button>}
        {onContinue && <Button onClick={onContinue}>{continueLabel}</Button>}
      </div>
      {onExit && <Button variant='link' onClick={onExit}>{exitLabel}</Button>}
    </div>
  )
}
