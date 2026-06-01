import { useCallback, useState } from 'react'
import { type StepError, useTransactionStep } from './useTransactionStep'
import {
  Button,
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  Input,
  RadioButtonList,
  Textarea,
} from './gel'
import {
  ConditionalQuestionPanel,
  ConfirmationHeader,
  DetailsCard,
  EvidenceChecklistCard,
  ExitModal,
  PermitApplicationPictogram,
  PrivacyCardPreview,
  RadioButtonCards,
  RenewApplicationPictogram,
  ReplaceApplicationPictogram,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

type MpsStep =
  | 'privacy'
  | 'application'
  | 'details'
  | 'representative'
  | 'eligibility'
  | 'evidence'
  | 'review'
  | 'confirmation'

type MpsStage = 'privacy' | 'application' | 'details' | 'eligibility' | 'evidence' | 'review'

const stepOrder: MpsStep[] = ['privacy', 'application', 'details', 'representative', 'eligibility', 'evidence', 'review', 'confirmation']
const stepperStages: MpsStage[] = ['privacy', 'application', 'details', 'eligibility', 'evidence', 'review']

const transactionName = 'Mobility Parking Scheme permit'

const stageLabels: Record<MpsStage, string> = {
  privacy: 'Privacy',
  application: 'Application details',
  details: 'Your details',
  eligibility: 'Eligibility',
  evidence: 'Supporting evidence',
  review: 'Review',
}

const pageTitles: Record<Exclude<MpsStep, 'confirmation'>, string> = {
  privacy: 'Privacy',
  application: 'Application details',
  details: 'Your details',
  representative: 'Representative details',
  eligibility: 'Eligibility',
  evidence: 'Supporting evidence',
  review: 'Review your application',
}

const stageForStep: Record<Exclude<MpsStep, 'confirmation'>, MpsStage> = {
  privacy: 'privacy',
  application: 'application',
  details: 'details',
  representative: 'details',
  eligibility: 'eligibility',
  evidence: 'evidence',
  review: 'review',
}

const accountProfile = {
  fullName: 'Alex Citizen',
  dateOfBirth: '15 March 1990',
  residentialAddress: '1 George Street, Sydney NSW 2000',
  email: 'alex.citizen@example.test',
}

const receipt = {
  number: 'MPS-000000',
  transactionDate: '1 June 2026',
}

interface FormState {
  termsAccepted: boolean
  applicationType: 'new' | 'renew' | 'replace' | ''
  permitNumber: string
  replaceReason: string
  contactPhone: string
  hasRepresentative: 'yes' | 'no' | ''
  representativeName: string
  representativeRelationship: string
  hasMobilityCondition: 'yes' | 'no' | ''
  conditionDetails: string
  hasDriverLicence: 'yes' | 'no' | ''
  hasPhotoCard: 'yes' | 'no' | ''
  needsTemporaryPermit: 'yes' | 'no' | ''
  medicalEvidenceType: 'certificate' | 'report' | ''
  medicalEvidenceMethod: 'ready' | 'later' | ''
  hasConcessionCard: 'yes' | 'no' | ''
  declarationAccepted: boolean
}

const initialState: FormState = {
  termsAccepted: false,
  applicationType: '',
  permitNumber: '',
  replaceReason: '',
  contactPhone: '',
  hasRepresentative: '',
  representativeName: '',
  representativeRelationship: '',
  hasMobilityCondition: '',
  conditionDetails: '',
  hasDriverLicence: '',
  hasPhotoCard: '',
  needsTemporaryPermit: '',
  medicalEvidenceType: '',
  medicalEvidenceMethod: '',
  hasConcessionCard: '',
  declarationAccepted: false,
}

export function MobilityParkingPermitSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)
  const [exitModalOpen, setExitModalOpen] = useState(false)

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((currentStep: MpsStep) => errorsForStep(currentStep, form), [form])
  const {
    step,
    setStep,
    setAttempted,
    attempted,
    errors,
    errorSummaryRef,
    goBack,
    goNext,
    reset,
  } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  function startAgain() {
    reset()
    setForm(initialState)
    setExitModalOpen(false)
  }

  function editFromReview(target: Exclude<MpsStep, 'review' | 'confirmation'>) {
    setAttempted(false)
    setStep(target)
  }

  return (
    <div>
      {step !== 'confirmation' && <MpsFormHeader step={step} />}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && <PrivacyStep form={form} attempted={attempted} errors={errors} update={update} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'application' && <ApplicationDetailsStep form={form} attempted={attempted} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'details' && <YourDetailsStep form={form} attempted={attempted} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'representative' && <RepresentativeStep form={form} attempted={attempted} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'eligibility' && <EligibilityStep form={form} attempted={attempted} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'evidence' && <SupportingEvidenceStep form={form} attempted={attempted} errors={errors} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'review' && <ReviewStep form={form} attempted={attempted} errors={errors} update={update} onBack={goBack} onSubmit={goNext} onExit={() => setExitModalOpen(true)} onEdit={editFromReview} />}
      {step === 'confirmation' && <ConfirmationStep onStartAgain={startAgain} />}

      <ExitModal
        isOpen={exitModalOpen}
        onContinue={() => setExitModalOpen(false)}
        onExit={startAgain}
        description='If you exit, the information entered in this application will be cleared.'
      />
    </div>
  )
}

function MpsFormHeader({ step }: { step: Exclude<MpsStep, 'confirmation'> }) {
  const currentStage = stageForStep[step]

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
      <MpsProgressStepper currentStage={currentStage} />
      <p style={{ color: 'var(--gel-color-text-grey)', fontSize: '0.875rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
        {transactionName}
      </p>
      <Heading level={2} id={`${step}-heading`} style={{ marginBottom: 0 }}>
        {pageTitles[step]}
      </Heading>
    </header>
  )
}

function MpsProgressStepper({ currentStage }: { currentStage: MpsStage }) {
  const currentIndex = stepperStages.indexOf(currentStage)

  return (
    <nav aria-label='Application progress' data-gelweb-component='progress-stepper' className='gel-progress-stepper'>
      <ol className='gel-progress-stepper__list'>
        {stepperStages.map((stage, index) => {
          const status = index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'todo'

          return (
            <li
              key={stage}
              className={`gel-progress-stepper__step gel-progress-stepper__step--${status}`}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              <div className='gel-progress-stepper__position' aria-hidden='true'>
                {status === 'completed' ? (
                  <svg width='14' height='14' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M13.17 1.86c.57-.68 1.57-.77 2.25-.2.64.53.76 1.45.31 2.12l-.1.13-8.5 10.23c-.56.67-1.54.76-2.21.24l-.13-.11-4.3-4.18c-.63-.62-.65-1.63-.04-2.26.58-.59 1.5-.64 2.14-.14l.12.11 3.07 2.98 7.4-8.9z' fill='currentColor' />
                  </svg>
                ) : (
                  <span className='gel-progress-stepper__number'>{index + 1}</span>
                )}
              </div>
              <span className='gel-progress-stepper__label'>
                {status !== 'todo' && <span className='gel-sr-only'>{status === 'completed' ? 'Completed: ' : 'Current: '}</span>}
                <span>{stageLabels[stage]}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function errorsForStep(step: MpsStep, form: FormState) {
  const errs: StepError[] = []

  if (step === 'privacy' && !form.termsAccepted) {
    errs.push({ id: 'terms-and-conditions', text: 'Accept the Terms and Conditions to continue' })
  }

  if (step === 'application') {
    if (!form.applicationType) errs.push({ id: 'application-type', text: 'Select an application type' })
    if ((form.applicationType === 'renew' || form.applicationType === 'replace') && !form.permitNumber.trim()) {
      errs.push({ id: 'permit-number', text: 'Enter the existing permit number' })
    }
    if (form.applicationType === 'replace' && !form.replaceReason) {
      errs.push({ id: 'replace-reason', text: 'Select a replacement reason' })
    }
  }

  if (step === 'details' && !form.contactPhone.trim()) {
    errs.push({ id: 'contact-phone', text: 'Enter a contact phone number' })
  }

  if (step === 'representative') {
    if (!form.hasRepresentative) errs.push({ id: 'has-representative', text: 'Select whether someone is applying on behalf of the applicant' })
    if (form.hasRepresentative === 'yes') {
      if (!form.representativeName.trim()) errs.push({ id: 'representative-name', text: 'Enter the representative name' })
      if (!form.representativeRelationship.trim()) errs.push({ id: 'representative-relationship', text: 'Enter the representative relationship' })
    }
  }

  if (step === 'eligibility') {
    if (!form.hasMobilityCondition) errs.push({ id: 'has-mobility-condition', text: 'Select whether the applicant has a mobility condition' })
    if (form.hasMobilityCondition === 'yes' && !form.conditionDetails.trim()) errs.push({ id: 'condition-details', text: 'Describe the mobility condition' })
    if (!form.hasDriverLicence) errs.push({ id: 'has-driver-licence', text: 'Select whether the applicant has a NSW driver licence' })
    if (!form.hasPhotoCard) errs.push({ id: 'has-photo-card', text: 'Select whether the applicant has a NSW photo card' })
    if (!form.needsTemporaryPermit) errs.push({ id: 'needs-temporary-permit', text: 'Select whether a temporary permit is needed' })
  }

  if (step === 'evidence') {
    if (!form.medicalEvidenceType) errs.push({ id: 'medical-evidence-type', text: 'Select a medical evidence type' })
    if (!form.medicalEvidenceMethod) errs.push({ id: 'medical-evidence-method', text: 'Select how medical evidence will be provided' })
    if (!form.hasConcessionCard) errs.push({ id: 'has-concession-card', text: 'Select whether the applicant has a New South Wales concession card' })
  }

  if (step === 'review' && !form.declarationAccepted) {
    errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to submit' })
  }

  return errs
}

interface StepProps {
  form: FormState
  attempted: boolean
  errors: StepError[]
  update: (patch: Partial<FormState>) => void
  onBack?: () => void
  onContinue: () => void
  onExit: () => void
}

function hasStepError(errors: StepError[], id: string) {
  return errors.some((error) => error.id === id)
}

function PrivacyStep({ form, errors, update, onContinue, onExit }: StepProps) {
  const termsError = hasStepError(errors, 'terms-and-conditions')

  return (
    <section aria-labelledby='privacy-heading' data-mps-page-template='privacy-and-terms'>
      <PrivacyCardPreview
        title='Privacy and terms'
        description='Read the Privacy Collection Notice and Terms and Conditions before continuing.'
        showAcknowledgement={false}
        sections={[
          {
            id: 'mps-privacy-collection-notice',
            title: 'Privacy Collection Notice',
            content: <p>Read the Privacy Collection Notice for this service before continuing.</p>,
          },
          {
            id: 'mps-terms-and-conditions',
            title: 'Terms and Conditions',
            content: <p>Read the Terms and Conditions for this application before continuing.</p>,
          },
          {
            id: 'mps-notifications-receipt',
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
      <TransactionCtaGroup onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ApplicationDetailsStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  const needsPermitNumber = form.applicationType === 'renew' || form.applicationType === 'replace'

  return (
    <section aria-labelledby='application-heading' data-mps-page-template='application-details'>
      <RadioButtonCards
        id='application-type'
        legend='What do you want to do?'
        options={[
          { value: 'new', label: 'Apply for a new permit', description: 'Start a Mobility Parking Scheme permit application.', pictogram: <PermitApplicationPictogram /> },
          { value: 'renew', label: 'Renew an existing permit', description: 'Use the number shown on your current permit.', pictogram: <RenewApplicationPictogram /> },
          { value: 'replace', label: 'Replace a permit', description: 'Tell us why the current permit needs to be replaced.', pictogram: <ReplaceApplicationPictogram /> },
        ]}
        value={form.applicationType}
        onChange={(value) => update({ applicationType: String(value) as FormState['applicationType'], permitNumber: '', replaceReason: '' })}
        hasError={hasStepError(errors, 'application-type')}
        errorMessage='Select an application type.'
        required
      />
      {needsPermitNumber && (
        <Field
          id='permit-number'
          label='Existing permit number'
          helpMessage='Enter the permit number shown on your current permit.'
          hasError={hasStepError(errors, 'permit-number')}
          errorMessage='Enter the existing permit number.'
        >
          <Input id='permit-number' value={form.permitNumber} onChange={(event) => update({ permitNumber: event.target.value })} hasError={hasStepError(errors, 'permit-number')} inputWidth='lg' />
        </Field>
      )}
      {form.applicationType === 'replace' && (
        <RadioButtonList
          id='replace-reason'
          legend='Reason for replacement'
          options={[
            { value: 'lost', label: 'Lost permit' },
            { value: 'stolen', label: 'Stolen permit' },
            { value: 'damaged', label: 'Damaged permit' },
          ]}
          value={form.replaceReason}
          onChange={(value) => update({ replaceReason: String(value) })}
          hasError={hasStepError(errors, 'replace-reason')}
          errorMessage='Select a replacement reason.'
        />
      )}
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function YourDetailsStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  const phoneError = hasStepError(errors, 'contact-phone')

  return (
    <section aria-labelledby='details-heading' data-mps-page-template='profile-playback'>
      <DetailsCard
        title='Your profile details'
        description='These details come from Account/Profile. If they are incorrect, update them in Account/Profile before continuing.'
        statusLabel='Account/Profile'
        rows={[
          { label: 'Full name', value: accountProfile.fullName },
          { label: 'Date of birth', value: accountProfile.dateOfBirth },
          { label: 'Residential address', value: accountProfile.residentialAddress },
          { label: 'Email', value: accountProfile.email },
        ]}
      />
      <Field
        id='contact-phone'
        label='Contact phone number'
        helpMessage='We will use this number if we need more information about this application.'
        hasError={phoneError}
        errorMessage='Enter a contact phone number.'
      >
        <Input id='contact-phone' type='tel' value={form.contactPhone} onChange={(event) => update({ contactPhone: event.target.value })} hasError={phoneError} inputWidth='lg' autoComplete='tel' />
      </Field>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function RepresentativeStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='representative-heading' data-mps-page-template='representative-details'>
      <ConditionalQuestionPanel
        id='has-representative'
        legend='Is someone applying on behalf of the applicant?'
        options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }]}
        value={form.hasRepresentative}
        onChange={(value) => update({ hasRepresentative: value as FormState['hasRepresentative'] })}
        showWhen='yes'
        hasError={hasStepError(errors, 'has-representative')}
        errorMessage='Select whether someone is applying on behalf of the applicant'
      >
        <Field id='representative-name' label='Representative name' hasError={hasStepError(errors, 'representative-name')} errorMessage='Enter the representative name.'>
          <Input id='representative-name' value={form.representativeName} onChange={(event) => update({ representativeName: event.target.value })} hasError={hasStepError(errors, 'representative-name')} inputWidth='xl' autoComplete='name' />
        </Field>
        <Field id='representative-relationship' label='Relationship to applicant' hasError={hasStepError(errors, 'representative-relationship')} errorMessage='Enter the representative relationship.'>
          <Input id='representative-relationship' value={form.representativeRelationship} onChange={(event) => update({ representativeRelationship: event.target.value })} hasError={hasStepError(errors, 'representative-relationship')} inputWidth='lg' />
        </Field>
      </ConditionalQuestionPanel>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function EligibilityStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='eligibility-heading' data-mps-page-template='eligibility'>
      <ConditionalQuestionPanel
        id='has-mobility-condition'
        legend='Does the applicant have a mobility condition?'
        options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        value={form.hasMobilityCondition}
        onChange={(value) => update({ hasMobilityCondition: value as FormState['hasMobilityCondition'] })}
        showWhen='yes'
        hasError={hasStepError(errors, 'has-mobility-condition')}
        errorMessage='Select whether the applicant has a mobility condition'
      >
        <Field
          id='condition-details'
          label='Describe the mobility condition'
          helpMessage='Maximum 500 characters.'
          hasError={hasStepError(errors, 'condition-details')}
          errorMessage='Describe the mobility condition.'
        >
          <Textarea id='condition-details' value={form.conditionDetails} onChange={(event) => update({ conditionDetails: event.target.value })} hasError={hasStepError(errors, 'condition-details')} maxLength={500} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <RadioButtonList
        id='has-driver-licence'
        legend='Does the applicant have a NSW driver licence?'
        options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        value={form.hasDriverLicence}
        onChange={(value) => update({ hasDriverLicence: String(value) as FormState['hasDriverLicence'] })}
        hasError={hasStepError(errors, 'has-driver-licence')}
        errorMessage='Select whether the applicant has a NSW driver licence.'
      />
      <RadioButtonList
        id='has-photo-card'
        legend='Does the applicant have a NSW photo card?'
        options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        value={form.hasPhotoCard}
        onChange={(value) => update({ hasPhotoCard: String(value) as FormState['hasPhotoCard'] })}
        hasError={hasStepError(errors, 'has-photo-card')}
        errorMessage='Select whether the applicant has a NSW photo card.'
      />
      <RadioButtonList
        id='needs-temporary-permit'
        legend='Is a temporary permit needed while this application is reviewed?'
        options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        value={form.needsTemporaryPermit}
        onChange={(value) => update({ needsTemporaryPermit: String(value) as FormState['needsTemporaryPermit'] })}
        hasError={hasStepError(errors, 'needs-temporary-permit')}
        errorMessage='Select whether a temporary permit is needed.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function SupportingEvidenceStep({ form, errors, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='evidence-heading' data-mps-page-template='supporting-evidence'>
      <RadioButtonList
        id='medical-evidence-type'
        legend='What medical evidence will be provided?'
        options={[{ value: 'certificate', label: 'Medical certificate' }, { value: 'report', label: 'Medical report' }]}
        value={form.medicalEvidenceType}
        onChange={(value) => update({ medicalEvidenceType: String(value) as FormState['medicalEvidenceType'] })}
        hasError={hasStepError(errors, 'medical-evidence-type')}
        errorMessage='Select a medical evidence type.'
      />
      <RadioButtonList
        id='medical-evidence-method'
        legend='How will the medical evidence be provided?'
        options={[{ value: 'ready', label: 'I have medical evidence ready' }, { value: 'later', label: 'I will provide medical evidence later' }]}
        value={form.medicalEvidenceMethod}
        onChange={(value) => update({ medicalEvidenceMethod: String(value) as FormState['medicalEvidenceMethod'] })}
        hasError={hasStepError(errors, 'medical-evidence-method')}
        errorMessage='Select how medical evidence will be provided.'
      />
      <RadioButtonList
        id='has-concession-card'
        legend='Does the applicant have a New South Wales concession card?'
        options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        value={form.hasConcessionCard}
        onChange={(value) => update({ hasConcessionCard: String(value) as FormState['hasConcessionCard'] })}
        hasError={hasStepError(errors, 'has-concession-card')}
        errorMessage='Select whether the applicant has a New South Wales concession card.'
      />
      <EvidenceChecklistCard
        title='Supporting evidence summary'
        items={[
          {
            id: 'medical',
            label: 'Medical evidence',
            status: form.medicalEvidenceMethod === 'ready' ? 'provided' : form.medicalEvidenceMethod === 'later' ? 'needs-review' : 'required',
            description: medicalEvidenceSummary(form),
          },
          {
            id: 'concession',
            label: 'Concession card',
            status: form.hasConcessionCard === 'yes' ? 'needs-review' : form.hasConcessionCard === 'no' ? 'not-required' : 'required',
            description: concessionCardLabel(form),
          },
        ]}
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ReviewStep({
  form,
  errors,
  update,
  onBack,
  onSubmit,
  onExit,
  onEdit,
}: {
  form: FormState
  attempted: boolean
  errors: StepError[]
  update: (patch: Partial<FormState>) => void
  onBack: () => void
  onSubmit: () => void
  onExit: () => void
  onEdit: (target: Exclude<MpsStep, 'review' | 'confirmation'>) => void
}) {
  const declarationError = hasStepError(errors, 'declaration-accepted')

  return (
    <section aria-labelledby='review-heading' data-mps-page-template='review'>
      <div className='storybook-stack'>
        <ReviewInfoCard
          title='Application details'
          onEdit={() => onEdit('application')}
          sections={[
            {
              title: 'Permit application',
              rows: [
                { label: 'Application type', value: appTypeLabel(form) },
                { label: 'Existing permit number', value: form.permitNumber || 'Not applicable' },
                { label: 'Replacement reason', value: replaceReasonLabel(form) },
              ],
            },
          ]}
        />
        <ReviewInfoCard
          title='Your details'
          onEdit={() => onEdit('details')}
          sections={[
            {
              title: 'Account/Profile playback',
              rows: [
                { label: 'Full name', value: accountProfile.fullName },
                { label: 'Date of birth', value: accountProfile.dateOfBirth },
                { label: 'Residential address', value: accountProfile.residentialAddress },
                { label: 'Email', value: accountProfile.email },
                { label: 'Contact phone number', value: form.contactPhone },
              ],
            },
          ]}
        />
        <ReviewInfoCard
          title='Representative details'
          onEdit={() => onEdit('representative')}
          sections={[
            {
              title: 'Representative',
              rows: [
                { label: 'Applying on behalf of applicant', value: yesNo(form.hasRepresentative) },
                { label: 'Representative name', value: form.hasRepresentative === 'yes' ? form.representativeName : 'Not applicable' },
                { label: 'Relationship to applicant', value: form.hasRepresentative === 'yes' ? form.representativeRelationship : 'Not applicable' },
              ],
            },
          ]}
        />
        <ReviewInfoCard
          title='Eligibility'
          onEdit={() => onEdit('eligibility')}
          sections={[
            {
              title: 'Eligibility responses',
              rows: [
                { label: 'Mobility condition', value: yesNo(form.hasMobilityCondition) },
                { label: 'Condition details', value: form.hasMobilityCondition === 'yes' ? form.conditionDetails : 'Not applicable' },
                { label: 'NSW driver licence', value: yesNo(form.hasDriverLicence) },
                { label: 'NSW photo card', value: yesNo(form.hasPhotoCard) },
                { label: 'Temporary permit needed', value: yesNo(form.needsTemporaryPermit) },
              ],
            },
          ]}
        />
        <ReviewInfoCard
          title='Supporting evidence'
          onEdit={() => onEdit('evidence')}
          sections={[
            {
              title: 'Evidence responses',
              rows: [
                { label: 'Medical evidence type', value: medicalEvidenceTypeLabel(form) },
                { label: 'Medical evidence timing', value: medicalEvidenceMethodLabel(form) },
                { label: 'New South Wales concession card', value: concessionCardLabel(form) },
              ],
            },
          ]}
        />
        <ReviewInfoCard
          title='Privacy'
          onEdit={() => onEdit('privacy')}
          sections={[
            {
              title: 'Privacy and terms',
              rows: [
                { label: 'Privacy Collection Notice', value: 'Read' },
                { label: 'Terms and Conditions', value: form.termsAccepted ? 'Accepted' : 'Not accepted' },
              ],
            },
          ]}
        />
      </div>
      <Checkbox
        id='declaration-accepted'
        label='I declare that the information provided is true and correct.'
        checked={form.declarationAccepted}
        onChange={(value) => update({ declarationAccepted: Boolean(value) })}
        hasError={declarationError}
        errorMessage='Accept the declaration to submit.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

function ConfirmationStep({ onStartAgain }: { onStartAgain: () => void }) {
  return (
    <section aria-labelledby='confirmation-heading' data-mps-page-template='confirmation'>
      <ConfirmationHeader title='Your application has been submitted for review' transactionName={transactionName} />
      <TransactionSummaryCard
        heading='Receipt details'
        items={[
          { label: 'Receipt number', value: receipt.number },
          { label: 'Transaction date', value: receipt.transactionDate },
        ]}
      />
      <section aria-labelledby='keep-record-heading' className='tapaas-card'>
        <Heading level={2} id='keep-record-heading'>Keep a record</Heading>
        <p>Keep your receipt number until your application has been reviewed.</p>
      </section>
      <section aria-labelledby='next-steps-heading' className='tapaas-card'>
        <Heading level={2} id='next-steps-heading'>What happens next?</Heading>
        <ol className='tapaas-step-list'>
          <li>Your application will be reviewed.</li>
          <li>We will contact you if more information is needed.</li>
          <li>We will notify you of the outcome.</li>
          <li>If approved, your permit document will be sent using the service delivery process.</li>
        </ol>
      </section>
      <FeedbackPrompt />
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start another application' />
    </section>
  )
}

function FeedbackPrompt() {
  const [feedbackChoice, setFeedbackChoice] = useState<string | null>(null)

  return (
    <section aria-labelledby='feedback-heading' className='tapaas-card'>
      <Heading level={2} id='feedback-heading'>Help us improve</Heading>
      <p>Was this transaction easy to understand?</p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button variant='secondary' onClick={() => setFeedbackChoice('yes')}>Yes</Button>
        <Button variant='secondary' onClick={() => setFeedbackChoice('no')}>No</Button>
      </div>
      <p aria-live='polite'>{feedbackChoice ? 'Thanks for your feedback.' : ''}</p>
    </section>
  )
}

function appTypeLabel(form: FormState) {
  if (form.applicationType === 'new') return 'New application'
  if (form.applicationType === 'renew') return 'Renewal'
  if (form.applicationType === 'replace') return 'Replacement'
  return 'Not selected'
}

function replaceReasonLabel(form: FormState) {
  if (form.applicationType !== 'replace') return 'Not applicable'
  if (form.replaceReason === 'lost') return 'Lost permit'
  if (form.replaceReason === 'stolen') return 'Stolen permit'
  if (form.replaceReason === 'damaged') return 'Damaged permit'
  return 'Not selected'
}

function medicalEvidenceTypeLabel(form: FormState) {
  if (form.medicalEvidenceType === 'certificate') return 'Medical certificate'
  if (form.medicalEvidenceType === 'report') return 'Medical report'
  return 'Not selected'
}

function medicalEvidenceMethodLabel(form: FormState) {
  if (form.medicalEvidenceMethod === 'ready') return 'Medical evidence ready'
  if (form.medicalEvidenceMethod === 'later') return 'Medical evidence will be provided later'
  return 'Not selected'
}

function medicalEvidenceSummary(form: FormState) {
  if (form.medicalEvidenceMethod === 'ready') return `${medicalEvidenceTypeLabel(form)} ready for this application.`
  if (form.medicalEvidenceMethod === 'later') return `${medicalEvidenceTypeLabel(form)} will be provided later.`
  return 'Select how medical evidence will be provided.'
}

function concessionCardLabel(form: FormState) {
  if (form.hasConcessionCard === 'yes') return 'Yes'
  if (form.hasConcessionCard === 'no') return 'No'
  return 'Not selected'
}

function yesNo(value: 'yes' | 'no' | '') {
  if (value === 'yes') return 'Yes'
  if (value === 'no') return 'No'
  return 'Not selected'
}
