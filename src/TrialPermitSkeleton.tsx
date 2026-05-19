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
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

type PermitStep = 'privacy' | 'input' | 'declaration' | 'review' | 'confirmation'

const stepOrder: PermitStep[] = ['privacy', 'input', 'declaration', 'review', 'confirmation']

const stepLabels: Record<PermitStep, string> = {
  privacy: 'Privacy',
  input: 'Application details',
  declaration: 'Declaration',
  review: 'Review',
  confirmation: 'Confirmation',
}

export function TrialPermitSkeleton() {
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [permitType, setPermitType] = useState('')
  const [declarationAccepted, setDeclarationAccepted] = useState(false)

  const getErrors = useCallback((s: PermitStep) => {
    const errs: { id: string; text: string }[] = []
    if (s === 'privacy' && !privacyAgreed) {
      errs.push({ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' })
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

  const { step, attempted, errors, errorSummaryRef, exitRef, exitNotice, goBack, goNext, handleExit, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton — Apply for a trial permit.</strong>
        <p style={{ margin: '0.25rem 0 0' }}>
          This is a non-production build-assist example using mock data only. Privacy, legal, fee and processing details need owner confirmation.
        </p>
      </div>

      {step !== 'confirmation' && (
        <>
          <ProgressStepper stepsList={stepOrder.map((s, i) => ({
            content: stepLabels[s],
            status: i < stepOrder.indexOf(step) ? 'completed' : i === stepOrder.indexOf(step) ? 'current' : 'todo',
          }))} />
          <p aria-live='polite' style={{ color: 'var(--gel-color-text-grey)', marginTop: 0 }}>
            Step {stepOrder.indexOf(step) + 1} of {stepOrder.length}: {stepLabels[step]}
          </p>
        </>
      )}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && (
        <PrivacyStep
          privacyAgreed={privacyAgreed}
          hasError={attempted && !privacyAgreed}
          onChange={setPrivacyAgreed}
          onContinue={goNext}
          onExit={handleExit}
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
          onExit={handleExit}
        />
      )}

      {step === 'declaration' && (
        <DeclarationStep
          accepted={declarationAccepted}
          hasError={attempted && !declarationAccepted}
          onChange={setDeclarationAccepted}
          onBack={goBack}
          onContinue={goNext}
          onExit={handleExit}
        />
      )}

      {step === 'review' && (
        <ReviewStep
          applicantName={applicantName}
          permitType={permitType}
          onBack={goBack}
          onSubmit={goNext}
          onExit={handleExit}
        />
      )}

      {step === 'confirmation' && (
        <ConfirmationStep
          applicantName={applicantName}
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

      {exitNotice && (
        <div ref={exitRef} tabIndex={-1}>
          <InPageAlert variant='info' title='Exit modal is not implemented in this trial skeleton'>
            <p>
              The TaPaaS Exit modal is documented as design-only in this pack. It needs modal focus management and wording confirmation before implementation.
            </p>
          </InPageAlert>
        </div>
      )}
    </div>
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
      <Heading level={2} id='privacy-heading'>Privacy information</Heading>
      <InPageAlert variant='info' title='Owner confirmation required'>
        <p>
          Replace this placeholder with the confirmed privacy collection notice for the trial permit service. Agency, purpose, disclosure and retention details must be confirmed before any real use.
        </p>
      </InPageAlert>
      <p>
        We collect your personal information to process your trial permit application. This information may be shared with [confirmed disclosure recipients]. For more information, see [confirmed privacy policy URL].
      </p>
      <Checkbox
        id='privacy-confirmation'
        label='I have read and understand the privacy information.'
        checked={privacyAgreed}
        onChange={(value) => onChange(Boolean(value))}
        hasError={hasError}
        errorMessage='Confirm that you have read the privacy information.'
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
      <Heading level={2} id='input-heading'>Apply for a trial permit</Heading>
      <p>
        Enter your details to apply for a mock trial permit. This page uses mock data only and does not submit to a real service.
      </p>
      <Field
        id='applicant-name'
        label='Full name'
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
        legend='Permit type'
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
      <Heading level={2} id='declaration-heading'>Declaration</Heading>
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
      <Heading level={2} id='review-heading'>Review your application</Heading>
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
      <InPageAlert variant='info' title='Payment excluded'>
        <p>No payment flow is included in this trial skeleton. Fee amounts need owner confirmation.</p>
      </InPageAlert>
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

function ConfirmationStep({
  applicantName,
  permitType,
  onStartAgain,
}: {
  applicantName: string
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
          { label: 'Applicant', value: applicantName },
          { label: 'Permit type', value: permitLabel },
          { label: 'Receipt', value: 'No payment receipt generated' },
        ]}
      >
        <p>
          Processing timeframes, receipt wording and next steps must be confirmed by the service owner before reuse. Expected processing time: [confirmed timeframe].
        </p>
      </TransactionSummaryCard>
      <Heading level={2}>Next steps</Heading>
      <ol className='tapaas-step-list'>
        <li>Your application will be reviewed within [confirmed timeframe].</li>
        <li>You will receive a notification at [confirmed contact method].</li>
        <li>If approved, your permit will be available at [confirmed location or method].</li>
      </ol>
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
