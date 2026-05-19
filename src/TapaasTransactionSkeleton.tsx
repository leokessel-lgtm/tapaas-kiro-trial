import { useRef, useMemo, useState } from 'react'
import {
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  InPageAlert,
  Input,
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
  const [step, setStep] = useState<SkeletonStep>('privacy')
  const [attempted, setAttempted] = useState(false)
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [registration, setRegistration] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [declarationAccepted, setDeclarationAccepted] = useState(false)
  const [exitNotice, setExitNotice] = useState(false)
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const exitRef = useRef<HTMLDivElement>(null)

  const errors = useMemo(() => {
    if (!attempted) return []
    if (step === 'privacy' && !privacyAgreed) {
      return [{ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' }]
    }
    if (step === 'search' && !registration.trim() && !selectedVehicle) {
      return [{ id: 'vehicle-registration', text: 'Enter a registration number or select a mock vehicle' }]
    }
    if (step === 'declaration' && !declarationAccepted) {
      return [{ id: 'declaration-accepted', text: 'Accept the declaration to continue' }]
    }
    return []
  }, [attempted, declarationAccepted, privacyAgreed, registration, selectedVehicle, step])

  function goBack() {
    setAttempted(false)
    const currentIndex = stepOrder.indexOf(step)
    setStep(stepOrder[Math.max(currentIndex - 1, 0)])
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      const heading = document.querySelector('[id$="-heading"]') as HTMLElement
      if (heading) { heading.tabIndex = -1; heading.focus() }
    }, 0)
  }

  function goNext() {
    setAttempted(true)
    const nextErrors = errorsForStep()
    if (nextErrors.length > 0) {
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0)
      return
    }

    setAttempted(false)
    const currentIndex = stepOrder.indexOf(step)
    const nextStep = stepOrder[Math.min(currentIndex + 1, stepOrder.length - 1)]
    setStep(nextStep)
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      if (nextStep === 'confirmation') {
        const status = document.querySelector('[role="status"]') as HTMLElement
        if (status) { status.tabIndex = -1; status.focus() }
      } else {
        const heading = document.querySelector('[id$="-heading"]') as HTMLElement
        if (heading) { heading.tabIndex = -1; heading.focus() }
      }
    }, 0)
  }

  function errorsForStep() {
    if (step === 'privacy' && !privacyAgreed) {
      return [{ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' }]
    }
    if (step === 'search' && !registration.trim() && !selectedVehicle) {
      return [{ id: 'vehicle-registration', text: 'Enter a registration number or select a mock vehicle' }]
    }
    if (step === 'declaration' && !declarationAccepted) {
      return [{ id: 'declaration-accepted', text: 'Accept the declaration to continue' }]
    }
    return []
  }

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton.</strong>
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

      {step === 'privacy' && (
        <PrivacyStep
          privacyAgreed={privacyAgreed}
          hasError={attempted && !privacyAgreed}
          onChange={setPrivacyAgreed}
          onContinue={goNext}
          onExit={() => { setExitNotice(true); window.setTimeout(() => exitRef.current?.focus(), 0) }}
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
          onExit={() => { setExitNotice(true); window.setTimeout(() => exitRef.current?.focus(), 0) }}
        />
      )}

      {step === 'declaration' && (
        <DeclarationStep
          accepted={declarationAccepted}
          hasError={attempted && !declarationAccepted}
          onChange={setDeclarationAccepted}
          onBack={goBack}
          onContinue={goNext}
          onExit={() => { setExitNotice(true); window.setTimeout(() => exitRef.current?.focus(), 0) }}
        />
      )}

      {step === 'review' && (
        <ReviewStep
          registration={registration}
          selectedVehicle={selectedVehicle}
          onBack={goBack}
          onSubmit={goNext}
          onExit={() => { setExitNotice(true); window.setTimeout(() => exitRef.current?.focus(), 0) }}
        />
      )}

      {step === 'confirmation' && (
        <ConfirmationStep
          registration={registration}
          selectedVehicle={selectedVehicle}
          onStartAgain={() => {
            setAttempted(false)
            setPrivacyAgreed(false)
            setRegistration('')
            setSelectedVehicle('')
            setDeclarationAccepted(false)
            setExitNotice(false)
            setStep('privacy')
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
