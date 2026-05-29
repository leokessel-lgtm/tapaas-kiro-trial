import { useState, useCallback } from 'react'
import { useTransactionStep } from './useTransactionStep'
import {
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  InPageAlert,
  Input,
  ProgressStepper,
  RadioButtonList,
  TextLink,
} from './gel'
import {
  ConfirmationHeader,
  DeclarationReview,
  ExitModal,
  NextStepsCardPreview,
  PrivacyCardPreview,
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

type PermitStep = 'privacy' | 'input' | 'declaration' | 'review' | 'confirmation'

const stepOrder: PermitStep[] = ['privacy', 'input', 'declaration', 'review', 'confirmation']

const transactionName = 'Apply for a trial permit'

const stepLabels: Record<PermitStep, string> = {
  privacy: 'Privacy',
  input: 'Application details',
  declaration: 'Declaration',
  review: 'Review',
  confirmation: 'Confirmation',
}

const pageTitles: Record<PermitStep, string> = {
  privacy: 'Privacy information',
  input: 'Application details',
  declaration: 'Declaration',
  review: 'Review your application',
  confirmation: 'Application submitted',
}

export function TrialPermitSkeleton() {
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [permitType, setPermitType] = useState('')
  const [declarationAccepted, setDeclarationAccepted] = useState(false)

  const getErrors = useCallback((s: PermitStep) => {
    const errs: { id: string; text: string }[] = []
    if (s === 'privacy' && !privacyAgreed) {
      errs.push({ id: 'privacy-confirmation', text: 'Confirm that you agree to the terms and conditions' })
    }
    if (s === 'input') {
      if (!applicantName.trim()) {
        errs.push({ id: 'applicant-name', text: 'Enter your full name' })
      }
      if (!permitType) {
        errs.push({ id: 'permit-type', text: 'Select a permit type' })
      }
    }
    if (s === 'declaration' && !declarationAccepted) {
      errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to continue' })
    }
    return errs
  }, [privacyAgreed, applicantName, permitType, declarationAccepted])

  const { step, attempted, errors, errorSummaryRef, exitModalOpen, openExitModal, closeExitModal, goBack, goNext, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton — {transactionName}.</strong>
        <p style={{ margin: '0.25rem 0 0' }}>
          This is a non-production build-assist example using mock data only. Privacy, legal, fee and processing details need owner confirmation.
        </p>
      </div>

      {step !== 'confirmation' && (
        <TrialPermitFormHeader step={step} />
      )}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && (
        <PrivacyStep
          privacyAgreed={privacyAgreed}
          hasError={attempted && !privacyAgreed}
          onChange={setPrivacyAgreed}
          onContinue={goNext}
          onExit={openExitModal}
        />
      )}

      {step === 'input' && (
        <InputStep
          applicantName={applicantName}
          permitType={permitType}
          nameError={attempted && !applicantName.trim()}
          permitError={attempted && !permitType}
          onNameChange={setApplicantName}
          onPermitChange={setPermitType}
          onBack={goBack}
          onContinue={goNext}
          onExit={openExitModal}
        />
      )}

      {step === 'declaration' && (
        <DeclarationStep
          accepted={declarationAccepted}
          hasError={attempted && !declarationAccepted}
          onChange={setDeclarationAccepted}
          onBack={goBack}
          onContinue={goNext}
          onExit={openExitModal}
        />
      )}

      {step === 'review' && (
        <ReviewStep
          applicantName={applicantName}
          permitType={permitType}
          onBack={goBack}
          onSubmit={goNext}
          onExit={openExitModal}
        />
      )}

      {step === 'confirmation' && (
        <ConfirmationStep
          permitType={permitType}
          onStartAgain={() => {
            reset()
            setPrivacyAgreed(false)
            setApplicantName('')
            setPermitType('')
            setDeclarationAccepted(false)
          }}
        />
      )}

      <ExitModal
        isOpen={exitModalOpen}
        onContinue={closeExitModal}
        onExit={() => { reset(); setPrivacyAgreed(false); setApplicantName(''); setPermitType(''); setDeclarationAccepted(false) }}
        description='This preview does not save draft applications. If you exit, the mock form data will be cleared.'
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
      <ProgressStepper stepsList={stepOrder.map((s, i) => ({
        content: stepLabels[s],
        status: i < stepOrder.indexOf(step) ? 'completed' : i === stepOrder.indexOf(step) ? 'current' : 'todo',
      }))} />
      <p aria-live='polite' style={{ color: 'var(--gel-color-text-grey)', margin: 0 }}>
        Step {stepOrder.indexOf(step) + 1} of {stepOrder.length}: {stepLabels[step]}
      </p>
    </header>
  )
}

function PrivacyStep({
  privacyAgreed,
  hasError,
  onChange,
  onContinue,
  onExit,
}: {
  privacyAgreed: boolean
  hasError: boolean
  onChange: (value: boolean) => void
  onContinue: () => void
  onExit: () => void
}) {
  return (
    <section aria-labelledby='privacy-heading'>
      <PrivacyCardPreview
        title='Trial permit privacy and terms'
        description='Review the source-backed privacy and terms sections before continuing.'
        showAcknowledgement={false}
        sections={[
          {
            id: 'trial-permit-privacy-collection-notice',
            title: 'Privacy collection notice',
            content: <p>[Source content required: privacy collection notice]</p>,
          },
          {
            id: 'trial-permit-terms-and-conditions',
            title: 'Terms and conditions',
            content: <p>[Source content required: terms and conditions text]</p>,
          },
        ]}
      />
      <Checkbox
        id='privacy-confirmation'
        label='I agree to the terms and conditions for this trial permit application.'
        checked={privacyAgreed}
        onChange={(value) => onChange(Boolean(value))}
        hasError={hasError}
        errorMessage='Confirm that you agree to the terms and conditions.'
      />
      <TransactionCtaGroup onContinue={onContinue} onExit={onExit} continueLabel='Continue' />
    </section>
  )
}

function InputStep({
  applicantName,
  permitType,
  nameError,
  permitError,
  onNameChange,
  onPermitChange,
  onBack,
  onContinue,
  onExit,
}: {
  applicantName: string
  permitType: string
  nameError: boolean
  permitError: boolean
  onNameChange: (value: string) => void
  onPermitChange: (value: string) => void
  onBack: () => void
  onContinue: () => void
  onExit: () => void
}) {
  return (
    <section aria-labelledby='input-heading'>
      <p>
        Enter your details to apply for a mock trial permit. This page uses mock data only and does not submit to a real service.
      </p>
      <p style={{ fontSize: '0.875rem', margin: '0 0 1.5rem' }}>
        <span style={{ color: 'var(--gel-color-error)', fontWeight: 700 }}>*</span> indicates a required field.
      </p>
      <Field
        id='applicant-name'
        label={<strong>Full name *</strong>}
        helpMessage='Enter your first and last name as they appear on your identification.'
        hasError={nameError}
        errorMessage='Enter your full name.'
      >
        <Input
          id='applicant-name'
          value={applicantName}
          onChange={(event) => onNameChange(event.target.value)}
          hasError={nameError}
          inputWidth='xl'
        />
      </Field>
      <RadioButtonList
        id='permit-type'
        legend={<strong>Permit type *</strong>}
        options={[
          { value: 'standard', label: 'Standard permit (mock)' },
          { value: 'extended', label: 'Extended permit (mock)' },
        ]}
        value={permitType}
        onChange={(value) => onPermitChange(String(value))}
        hasError={permitError}
        errorMessage='Select a permit type.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function DeclarationStep({
  accepted,
  hasError,
  onChange,
  onBack,
  onContinue,
  onExit,
}: {
  accepted: boolean
  hasError: boolean
  onChange: (value: boolean) => void
  onBack: () => void
  onContinue: () => void
  onExit: () => void
}) {
  return (
    <section aria-labelledby='declaration-heading'>
      <InPageAlert variant='warning' title='Legal wording required'>
        <p>
          This placeholder must be replaced with confirmed legal or policy wording before use in a real transaction. Do not use this declaration text in production.
        </p>
      </InPageAlert>
      <p>
        By submitting this application, I declare that the information I have provided is true and correct. I understand that providing false or misleading information is [confirmed legal consequence — policy owner to confirm].
      </p>
      <Checkbox
        id='declaration-accepted'
        label='I declare that the information provided is true and correct.'
        checked={accepted}
        onChange={(value) => onChange(Boolean(value))}
        hasError={hasError}
        errorMessage='Accept the declaration to continue.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ReviewStep({
  applicantName,
  permitType,
  onBack,
  onSubmit,
  onExit,
}: {
  applicantName: string
  permitType: string
  onBack: () => void
  onSubmit: () => void
  onExit: () => void
}) {
  const permitLabel = permitType === 'extended' ? 'Extended permit (mock)' : 'Standard permit (mock)'
  return (
    <section aria-labelledby='review-heading'>
      <p>
        Check the information below before submitting. This page does not submit to a real service.
      </p>
      <ReviewInfoCard
        title='Application details'
        sections={[
          {
            title: 'Applicant',
            rows: [
              { label: 'Full name', value: applicantName },
              { label: 'Permit type', value: permitLabel },
            ],
          },
        ]}
      />
      <ReviewFeesCard
        fees={[
          { label: 'Application fee', amount: '$0.00' },
        ]}
        totalAmount='$0.00'
      />
      <DeclarationReview
        title='Declaration'
        intro='You have accepted this declaration:'
        sections={[
          {
            title: 'Applicant declaration',
            statements: ['I declare that the information provided is true and correct.'],
          },
        ]}
      />
      <InPageAlert variant='info' title='Payment excluded'>
        <p>No payment flow is included in this trial skeleton. Fee amounts need owner confirmation.</p>
      </InPageAlert>
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

function ConfirmationStep({
  permitType,
  onStartAgain,
}: {
  permitType: string
  onStartAgain: () => void
}) {
  const permitLabel = permitType === 'extended' ? 'Extended permit (mock)' : 'Standard permit (mock)'
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader
        title='Application submitted'
        transactionName='Apply for a trial permit'
      />
      <TransactionSummaryCard
        items={[
          { label: 'Reference number', value: 'PERMIT-000000', helpText: 'Mock reference only.' },
          { label: 'Permit type', value: permitLabel },
          { label: 'Receipt', value: 'No payment receipt generated' },
        ]}
      >
        <p>
          Processing timeframes, receipt wording and next steps must be confirmed by the service owner before reuse. Expected processing time: [confirmed timeframe].
        </p>
      </TransactionSummaryCard>
      <NextStepsCardPreview
        items={[
          {
            id: 'trial-permit-review-timeframe',
            heading: 'Application review',
            body: <p>Your application will be reviewed within [confirmed timeframe].</p>,
          },
          {
            id: 'trial-permit-notification',
            heading: 'Notification',
            body: <p>You will receive a notification at [confirmed contact method].</p>,
          },
          {
            id: 'trial-permit-permit-access',
            heading: 'Permit access',
            body: <p>If approved, your permit will be available at [confirmed location or method].</p>,
          },
        ]}
      />
      <InPageAlert variant='info' title='Owner confirmation required'>
        <p>
          All timeframes, contact methods and approval processes above are placeholders. They must be confirmed by the service owner before real use.
        </p>
      </InPageAlert>
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start again' />
      <p style={{ marginTop: '1rem' }}>
        <TextLink href='https://github.com/leokessel-lgtm/tapaas-kiro-trial/blob/main/docs/tapaas/00-source-inventory.md'>Review TaPaaS source inventory</TextLink>
      </p>
    </section>
  )
}
