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
  ExitModal,
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

type SkeletonStep = 'privacy' | 'search' | 'declaration' | 'review' | 'confirmation'

const stepOrder: SkeletonStep[] = ['privacy', 'search', 'declaration', 'review', 'confirmation']

const stepLabels: Record<SkeletonStep, string> = {
  privacy: 'Privacy',
  search: 'Search',
  declaration: 'Declaration',
  review: 'Review',
  confirmation: 'Confirmation',
}

export function TapaasTransactionSkeleton() {
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [registration, setRegistration] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [declarationAccepted, setDeclarationAccepted] = useState(false)

  const getErrors = useCallback((s: SkeletonStep) => {
    const errs: { id: string; text: string }[] = []
    if (s === 'privacy' && !privacyAgreed) {
      errs.push({ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' })
    }
    if (s === 'search' && !registration.trim() && !selectedVehicle) {
      errs.push({ id: 'vehicle-registration', text: 'Enter a registration number or select a mock vehicle' })
    }
    if (s === 'declaration' && !declarationAccepted) {
      errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to continue' })
    }
    return errs
  }, [privacyAgreed, registration, selectedVehicle, declarationAccepted])

  const { step, attempted, errors, errorSummaryRef, exitModalOpen, openExitModal, closeExitModal, goBack, goNext, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton.</strong>
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
          onExit={openExitModal}
        />
      )}

      {step === 'search' && (
        <SearchStep
          registration={registration}
          selectedVehicle={selectedVehicle}
          hasError={attempted && !registration.trim() && !selectedVehicle}
          onRegistrationChange={setRegistration}
          onVehicleSelect={setSelectedVehicle}
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
          registration={registration}
          selectedVehicle={selectedVehicle}
          onBack={goBack}
          onSubmit={goNext}
          onExit={openExitModal}
        />
      )}

      {step === 'confirmation' && (
        <ConfirmationStep
          registration={registration}
          selectedVehicle={selectedVehicle}
          onStartAgain={() => {
            reset()
            setPrivacyAgreed(false)
            setRegistration('')
            setSelectedVehicle('')
            setDeclarationAccepted(false)
          }}
        />
      )}

      <ExitModal
        isOpen={exitModalOpen}
        onContinue={closeExitModal}
        onExit={() => { reset(); setPrivacyAgreed(false); setRegistration(''); setSelectedVehicle(''); setDeclarationAccepted(false) }}
        description='This preview does not save draft applications. If you exit, the mock form data will be cleared.'
      />
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
          Replace this placeholder with the confirmed privacy collection notice or agency privacy statement before any real service use.
        </p>
      </InPageAlert>
      <Checkbox
        id='privacy-confirmation'
        label='I have read the privacy information for this trial transaction.'
        checked={privacyAgreed}
        onChange={(value) => onChange(Boolean(value))}
        hasError={hasError}
        errorMessage='Confirm that you have read the privacy information.'
      />
      <TransactionCtaGroup onContinue={onContinue} onExit={onExit} continueLabel='Continue' />
    </section>
  )
}

function SearchStep({
  registration,
  selectedVehicle,
  hasError,
  onRegistrationChange,
  onVehicleSelect,
  onBack,
  onContinue,
  onExit,
}: {
  registration: string
  selectedVehicle: string
  hasError: boolean
  onRegistrationChange: (value: string) => void
  onVehicleSelect: (value: string) => void
  onBack: () => void
  onContinue: () => void
  onExit: () => void
}) {
  return (
    <section aria-labelledby='search-heading'>
      <Heading level={2} id='search-heading'>Find a mock vehicle</Heading>
      <p>
        This page represents the TaPaaS search-first input pattern. It uses mock data only and does not call a vehicle service.
      </p>
      <Field
        id='vehicle-registration'
        label='Registration number'
        helpMessage='Use a mock value such as ABC123.'
        hasError={hasError}
        errorMessage='Enter a registration number or select a mock vehicle.'
      >
        <Input
          id='vehicle-registration'
          value={registration}
          onChange={(event) => onRegistrationChange(event.target.value.toUpperCase())}
          hasError={hasError}
          inputWidth='md'
          maxLength={6}
        />
      </Field>
      <RadioButtonList
        id='mock-vehicle'
        legend='Or select a mock vehicle'
        options={[
          { value: 'ABC123', label: 'ABC123, sedan, blue' },
          { value: 'XYZ789', label: 'XYZ789, wagon, white' },
        ]}
        value={selectedVehicle}
        onChange={(value) => onVehicleSelect(String(value))}
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
          This placeholder must be replaced with confirmed legal or policy wording before use in a real transaction.
        </p>
      </InPageAlert>
      <Checkbox
        id='declaration-accepted'
        label='I accept the declaration for this mock transaction.'
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
  registration,
  selectedVehicle,
  onBack,
  onSubmit,
  onExit,
}: {
  registration: string
  selectedVehicle: string
  onBack: () => void
  onSubmit: () => void
  onExit: () => void
}) {
  const vehicle = selectedVehicle || registration || 'ABC123'
  return (
    <section aria-labelledby='review-heading'>
      <Heading level={2} id='review-heading'>Review your details</Heading>
      <p>
        Check the mock information before submitting. This page does not submit to a real service.
      </p>
      <ReviewInfoCard
        title='Vehicle details'
        sections={[
          {
            title: 'Selected vehicle',
            rows: [
              { label: 'Registration', value: vehicle },
              { label: 'Vehicle', value: 'Mock vehicle details' },
              { label: 'Source', value: 'Static fixture data only' },
            ],
          },
        ]}
      />
      <ReviewFeesCard
        fees={[
          { label: 'Application fee', amount: '$0.00' },
          { label: 'Trial processing fee', amount: '$0.00' },
        ]}
        totalAmount='$0.00'
      />
      <InPageAlert variant='info' title='Payment excluded'>
        <p>No payment flow is included in this trial skeleton.</p>
      </InPageAlert>
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit mock transaction' />
    </section>
  )
}

function ConfirmationStep({
  registration,
  selectedVehicle,
  onStartAgain,
}: {
  registration: string
  selectedVehicle: string
  onStartAgain: () => void
}) {
  const vehicle = selectedVehicle || registration || 'ABC123'
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader
        title='Mock transaction submitted'
        transactionName='TaPaaS repeatable transaction skeleton'
      />
      <TransactionSummaryCard
        items={[
          { label: 'Reference number', value: 'TAPAAS-000000', helpText: 'Mock reference only.' },
          { label: 'Vehicle', value: vehicle },
          { label: 'Receipt', value: 'No payment receipt generated' },
        ]}
      >
        <p>
          Processing timeframes, receipt wording and next steps must be confirmed by the service owner before reuse.
        </p>
      </TransactionSummaryCard>
      <Heading level={2}>Next steps</Heading>
      <ol className='tapaas-step-list'>
        <li>Replace mock data with confirmed source data or a safe backend path.</li>
        <li>Confirm privacy, legal and transaction-specific wording.</li>
        <li>Run engineering and accessibility review before broader reuse.</li>
      </ol>
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start again' />
      <p style={{ marginTop: '1rem' }}>
        <TextLink href='https://github.com/leokessel-lgtm/tapaas-kiro-trial/blob/main/docs/tapaas/00-source-inventory.md'>Review TaPaaS source inventory</TextLink>
      </p>
    </section>
  )
}
