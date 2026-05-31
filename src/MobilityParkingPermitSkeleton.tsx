import { useCallback, useState } from 'react'
import { useTransactionStep } from './useTransactionStep'
import {
  Accordion,
  Button,
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  InPageAlert,
  Input,
  MoreInfoDisclosure,
  RadioButtonList,
  Textarea,
} from './gel'
import {
  AssessmentSummaryPanel,
  BackendErrorExamplePage,
  ConditionalQuestionPanel,
  ConfirmationHeader,
  DeclarationReview,
  EvidenceChecklistCard,
  ExitModal,
  InteractiveDetailsCard,
  LegalInfoAccordion,
  MpsApplicantDetailsFramePreview,
  MpsConfirmationFramePreview,
  MpsMedicalEvidenceStatusPreview,
  MpsReviewFramePreview,
  RadioButtonCards,
  RepeatableGroup,
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
  backendErrorExamples,
} from './tapaas-preview'
import type { MpsApplicantDetailsFrameValue } from './tapaas-preview'

type MpsStep =
  | 'privacy'
  | 'account'
  | 'appType'
  | 'applicant'
  | 'representative'
  | 'eligibility'
  | 'medical'
  | 'concession'
  | 'delivery'
  | 'payment'
  | 'declaration'
  | 'review'
  | 'outcome'

const stepOrder: MpsStep[] = [
  'privacy',
  'account',
  'appType',
  'applicant',
  'representative',
  'eligibility',
  'medical',
  'concession',
  'delivery',
  'payment',
  'declaration',
  'review',
  'outcome',
]

const _stepLabels: Record<MpsStep, string> = {
  privacy: 'Privacy',
  account: 'Account and identity',
  appType: 'Application type',
  applicant: 'Applicant details',
  representative: 'Representative',
  eligibility: 'Eligibility',
  medical: 'Medical evidence',
  concession: 'Concession',
  delivery: 'Delivery',
  payment: 'Payment simulation',
  declaration: 'Declaration',
  review: 'Review',
  outcome: 'Outcome',
}

const mpsStageMap: Record<MpsStep, { number: number; label: string; detail?: string }> = {
  privacy: { number: 1, label: 'Start and privacy', detail: 'Trial-only privacy page' },
  account: { number: 1, label: 'Start and privacy', detail: 'Mock account and identity context' },
  appType: { number: 2, label: 'Application details', detail: 'New, renewal or replacement branch' },
  applicant: { number: 3, label: 'Personal details', detail: 'Applicant details and manual address' },
  representative: { number: 3, label: 'Personal details', detail: 'Representative and authorised contacts' },
  eligibility: { number: 4, label: 'Eligibility', detail: 'Mock eligibility questions' },
  medical: { number: 5, label: 'Medical evidence', detail: 'Mock evidence status only' },
  concession: { number: 6, label: 'Concession card details', detail: 'Source-confirmed Yes/No question' },
  delivery: { number: 7, label: 'Review and submit', detail: 'Kiro stress-test addition: delivery preference' },
  payment: { number: 7, label: 'Review and submit', detail: 'Kiro stress-test addition: payment routing' },
  declaration: { number: 7, label: 'Review and submit', detail: 'Declaration before review' },
  review: { number: 7, label: 'Review and submit', detail: 'Review page mapped to MPS Review frame' },
  outcome: { number: 7, label: 'Outcome', detail: 'Confirmation, manual review or business error' },
}

interface ContactState {
  name: string
  relationship: string
  phone: string
}

interface FormState {
  privacyAgreed: boolean
  accountScenario: 'signed-in' | 'guest' | ''
  poiAcknowledged: boolean
  applicationType: 'new' | 'renew' | 'replace' | ''
  replaceReason: string
  permitNumber: string
  applicantAddressMode: 'search' | 'manual'
  firstName: string
  lastName: string
  fullName: string
  day: string
  month: string
  year: string
  email: string
  phone: string
  residentialAddress: string
  unitNumber: string
  streetNumber: string
  streetName: string
  streetType: string
  street: string
  suburb: string
  state: string
  postcode: string
  hasRepresentative: 'yes' | 'no' | ''
  representativeName: string
  representativeRelationship: string
  authorisedContacts: ContactState[]
  hasMobilityCondition: 'yes' | 'no' | ''
  conditionDetails: string
  hasDriverLicence: 'yes' | 'no' | ''
  hasPhotoCard: 'yes' | 'no' | ''
  needsTemporaryPermit: 'yes' | 'no' | ''
  medicalEvidenceType: 'certificate' | 'report' | ''
  medicalEvidenceMethod: 'uploaded' | 'provide-later' | ''
  medicalEvidenceAcknowledged: boolean
  hasConcessionCard: 'yes' | 'no' | ''
  deliveryMethod: 'post' | 'service-centre' | ''
  deliveryInstructions: string
  paymentScenario: 'success' | 'failed' | 'cancelled' | 'manual-review' | ''
  declarationAccepted: boolean
}

const initialState: FormState = {
  privacyAgreed: false,
  accountScenario: '',
  poiAcknowledged: false,
  applicationType: '',
  replaceReason: '',
  permitNumber: '',
  applicantAddressMode: 'search',
  firstName: '',
  lastName: '',
  fullName: '',
  day: '',
  month: '',
  year: '',
  email: '',
  phone: '',
  residentialAddress: '',
  unitNumber: '',
  streetNumber: '',
  streetName: '',
  streetType: '',
  street: '',
  suburb: '',
  state: '',
  postcode: '',
  hasRepresentative: '',
  representativeName: '',
  representativeRelationship: '',
  authorisedContacts: [{ name: '', relationship: '', phone: '' }],
  hasMobilityCondition: '',
  conditionDetails: '',
  hasDriverLicence: '',
  hasPhotoCard: '',
  needsTemporaryPermit: '',
  medicalEvidenceType: '',
  medicalEvidenceMethod: '',
  medicalEvidenceAcknowledged: false,
  hasConcessionCard: '',
  deliveryMethod: '',
  deliveryInstructions: '',
  paymentScenario: '',
  declarationAccepted: false,
}

export function MobilityParkingPermitSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)
  const [exitModalOpen, setExitModalOpen] = useState(false)

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  function updateContact(index: number, patch: Partial<ContactState>) {
    setForm((prev) => ({
      ...prev,
      authorisedContacts: prev.authorisedContacts.map((contact, contactIndex) =>
        contactIndex === index ? { ...contact, ...patch } : contact,
      ),
    }))
  }

  function addContact() {
    setForm((prev) => ({
      ...prev,
      authorisedContacts: [...prev.authorisedContacts, { name: '', relationship: '', phone: '' }],
    }))
  }

  function removeContact(index: number) {
    setForm((prev) => ({
      ...prev,
      authorisedContacts: prev.authorisedContacts.filter((_, contactIndex) => contactIndex !== index),
    }))
  }

  const getErrors = useCallback((step: MpsStep) => errorsForStep(step, form), [form])
  const {
    step,
    attempted,
    errors,
    errorSummaryRef,
    goBack,
    goNext,
    reset,
  } = useTransactionStep(stepOrder, 'outcome', getErrors)

  function startAgain() {
    reset()
    setForm(initialState)
    setExitModalOpen(false)
  }

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton — Mobility Parking Scheme Figma-guided simulation.</strong>
        <p style={{ margin: '0.25rem 0 0' }}>
          This leans on the MPS Figma frame order while adding Kiro stress-test behaviours. Identity, eligibility, medical evidence, concessions, payment and assessment outcomes are simulated and require owner confirmation.
        </p>
      </div>

      {step !== 'outcome' && (
        <div aria-live='polite' style={{ color: 'var(--gel-color-text-grey)', marginTop: 0, marginBottom: '1rem' }}>
          <p style={{ margin: 0 }}>
            Step {mpsStageMap[step].number} of 7: {mpsStageMap[step].label}
          </p>
          {mpsStageMap[step].detail && (
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
              Prototype detail: {mpsStageMap[step].detail}
            </p>
          )}
        </div>
      )}

      {step !== 'outcome' && step !== 'applicant' && <RequiredFieldHint />}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && <PrivacyStep form={form} attempted={attempted} update={update} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'account' && <AccountStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'appType' && <ApplicationTypeStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'applicant' && <ApplicantStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'representative' && <RepresentativeStep form={form} attempted={attempted} update={update} updateContact={updateContact} addContact={addContact} removeContact={removeContact} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'eligibility' && <EligibilityStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'medical' && <MedicalEvidenceStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'concession' && <ConcessionStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'delivery' && <DeliveryStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'payment' && <PaymentStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'declaration' && <DeclarationStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'review' && <ReviewStep form={form} onBack={goBack} onSubmit={goNext} onExit={() => setExitModalOpen(true)} />}
      {step === 'outcome' && <OutcomeStep form={form} onStartAgain={startAgain} />}

      <ExitModal
        isOpen={exitModalOpen}
        onContinue={() => setExitModalOpen(false)}
        onExit={startAgain}
        description='This preview does not save draft applications. If you exit, the mock form data will be cleared.'
      />
    </div>
  )
}

function errorsForStep(step: MpsStep, form: FormState) {
  const errs: { id: string; text: string }[] = []
  if (step === 'privacy' && !form.privacyAgreed) errs.push({ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' })
  if (step === 'account') {
    if (!form.accountScenario) errs.push({ id: 'account-scenario', text: 'Select an account and identity scenario' })
    if (!form.poiAcknowledged) errs.push({ id: 'poi-acknowledged', text: 'Confirm that proof of identity is simulated only' })
  }
  if (step === 'appType') {
    if (!form.applicationType) errs.push({ id: 'application-type', text: 'Select an application type' })
    if ((form.applicationType === 'renew' || form.applicationType === 'replace') && !form.permitNumber.trim()) errs.push({ id: 'permit-number', text: 'Enter the existing permit number' })
    if (form.applicationType === 'replace' && !form.replaceReason) errs.push({ id: 'replace-reason', text: 'Select a replacement reason' })
  }
  if (step === 'applicant') {
    if (!form.firstName.trim()) errs.push({ id: 'mps-applicant-first-name', text: 'Enter a first name' })
    if (!form.lastName.trim()) errs.push({ id: 'mps-applicant-last-name', text: 'Enter a last name' })
    if (!isDateComplete(form)) errs.push({ id: 'mps-applicant-dob-day', text: 'Enter a date of birth' })
    if (form.applicantAddressMode === 'search' && !form.residentialAddress.trim()) errs.push({ id: 'mps-applicant-residential-address', text: 'Enter a residential address' })
    if (form.applicantAddressMode === 'manual') {
      if (!form.streetNumber.trim()) errs.push({ id: 'mps-applicant-street-number', text: 'Enter a street number' })
      if (!form.streetName.trim()) errs.push({ id: 'mps-applicant-street-name', text: 'Enter a street name' })
      if (!form.streetType) errs.push({ id: 'mps-applicant-street-type', text: 'Select a street type' })
      if (!form.suburb.trim()) errs.push({ id: 'mps-applicant-suburb', text: 'Enter a suburb' })
      if (!form.state) errs.push({ id: 'mps-applicant-state', text: 'Select a state' })
      if (!form.postcode.trim()) errs.push({ id: 'mps-applicant-postcode', text: 'Enter a postcode' })
    }
    if (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.')) errs.push({ id: 'mps-applicant-email', text: 'Enter a valid email address' })
    if (!form.phone.trim()) errs.push({ id: 'mps-applicant-phone', text: 'Enter your phone number' })
  }
  if (step === 'representative') {
    if (!form.hasRepresentative) errs.push({ id: 'has-representative', text: 'Select whether someone is applying on behalf of the applicant' })
    if (form.hasRepresentative === 'yes') {
      if (!form.representativeName.trim()) errs.push({ id: 'representative-name', text: 'Enter the representative name' })
      if (!form.representativeRelationship.trim()) errs.push({ id: 'representative-relationship', text: 'Enter the representative relationship' })
    }
    form.authorisedContacts.forEach((contact, index) => {
      const hasAny = Boolean(contact.name.trim() || contact.relationship.trim() || contact.phone.trim())
      if (hasAny && !contact.name.trim()) errs.push({ id: `contact-${index}-name`, text: `Enter the name for authorised contact ${index + 1}` })
      if (hasAny && !contact.relationship.trim()) errs.push({ id: `contact-${index}-relationship`, text: `Enter the relationship for authorised contact ${index + 1}` })
      if (hasAny && !contact.phone.trim()) errs.push({ id: `contact-${index}-phone`, text: `Enter the phone number for authorised contact ${index + 1}` })
    })
  }
  if (step === 'eligibility') {
    if (!form.hasMobilityCondition) errs.push({ id: 'has-mobility-condition', text: 'Select whether the applicant has a mobility condition' })
    if (form.hasMobilityCondition === 'yes' && !form.conditionDetails.trim()) errs.push({ id: 'condition-details', text: 'Describe the mobility condition' })
    if (!form.hasDriverLicence) errs.push({ id: 'has-driver-licence', text: 'Select whether the applicant has a NSW driver licence' })
    if (!form.hasPhotoCard) errs.push({ id: 'has-photo-card', text: 'Select whether the applicant has a NSW photo card' })
    if (!form.needsTemporaryPermit) errs.push({ id: 'needs-temporary-permit', text: 'Select whether a temporary permit is needed' })
  }
  if (step === 'medical') {
    if (!form.medicalEvidenceType) errs.push({ id: 'medical-evidence-type', text: 'Select a medical evidence type' })
    if (!form.medicalEvidenceMethod) errs.push({ id: 'medical-evidence-method', text: 'Select how medical evidence will be provided' })
    if (!form.medicalEvidenceAcknowledged) errs.push({ id: 'medical-evidence-acknowledged', text: 'Confirm that medical evidence handling is simulated only' })
  }
  if (step === 'concession') {
    if (!form.hasConcessionCard) errs.push({ id: 'has-concession-card', text: 'Select whether the applicant has a New South Wales concession card' })
  }
  if (step === 'delivery') {
    if (!form.deliveryMethod) errs.push({ id: 'delivery-method', text: 'Select a delivery method' })
  }
  if (step === 'payment') {
    if (!form.paymentScenario) errs.push({ id: 'payment-scenario', text: 'Select a mock payment or routing outcome' })
  }
  if (step === 'declaration' && !form.declarationAccepted) errs.push({ id: 'declaration-accepted', text: 'Accept the declaration to continue' })
  return errs
}

function RequiredFieldHint() {
  return (
    <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem' }}>
      <span aria-hidden='true' style={{ color: 'var(--gel-color-error)', fontWeight: 700 }}>*</span>
      <span> indicates a required field</span>
    </p>
  )
}

function isDateComplete(form: FormState) {
  return /^\d{1,2}$/.test(form.day) && Boolean(form.month.trim()) && /^\d{4}$/.test(form.year)
}

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
    <section aria-labelledby='privacy-heading' data-mps-page-template='start-intro'>
      <Heading level={2} id='privacy-heading'>Privacy information</Heading>
      <InPageAlert variant='info' title='Owner confirmation required'>
        <p>Replace this placeholder with the confirmed Mobility Parking Scheme privacy collection notice.</p>
      </InPageAlert>
      <p>This preview collects mock information to demonstrate the transaction pattern. It does not connect to Service NSW systems, verify identity, assess eligibility or store medical evidence.</p>
      <Checkbox
        id='privacy-confirmation'
        label='I have read and understand the privacy information.'
        checked={form.privacyAgreed}
        onChange={(value) => update({ privacyAgreed: Boolean(value) })}
        hasError={attempted && !form.privacyAgreed}
        errorMessage='Confirm that you have read the privacy information.'
      />
      <TransactionCtaGroup onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function AccountStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='account-heading' data-mps-page-template='identity-state'>
      <Heading level={2} id='account-heading'>Account and identity</Heading>
      <InPageAlert variant='warning' title='Identity proofing is simulated'>
        <p>The MPS Figma flow includes MyAccount and proof-of-identity screens. This prototype uses a static mock state only and does not perform identity checks.</p>
      </InPageAlert>
      <RadioButtonList
        id='account-scenario'
        legend='Choose a mock account scenario'
        options={[
          { value: 'signed-in', label: 'Signed in with verified account details (mock)' },
          { value: 'guest', label: 'Continue as guest with manual details (mock)' },
        ]}
        value={form.accountScenario}
        onChange={(value) => update({ accountScenario: String(value) as FormState['accountScenario'] })}
        hasError={attempted && !form.accountScenario}
        errorMessage='Select an account and identity scenario.'
      />
      {form.accountScenario === 'signed-in' && (
        <InteractiveDetailsCard
          title='Mock account context'
          description='Read-only context only. No real account data is used.'
          statusLabel='Mock verified'
          rows={[
            { label: 'Account name', value: 'Alex Citizen' },
            { label: 'Identity status', value: 'Verified in mock scenario' },
            { label: 'Email', value: 'alex.citizen@example.test' },
          ]}
          actions={[
            { label: 'Change mock account', onAction: () => update({ accountScenario: 'guest' }), variant: 'secondary' },
          ]}
        />
      )}
      <Checkbox
        id='poi-acknowledged'
        label='I understand proof of identity is not performed in this prototype.'
        checked={form.poiAcknowledged}
        onChange={(value) => update({ poiAcknowledged: Boolean(value) })}
        hasError={attempted && !form.poiAcknowledged}
        errorMessage='Confirm that proof of identity is simulated only.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ApplicationTypeStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const needsPermitNumber = form.applicationType === 'renew' || form.applicationType === 'replace'
  return (
    <section aria-labelledby='app-type-heading' data-mps-page-template='form-page'>
      <Heading level={2} id='app-type-heading'>Application type</Heading>
      <RadioButtonCards
        id='application-type'
        legend='What do you want to do?'
        options={[
          { value: 'new', label: 'Apply for a new permit (mock)', description: 'Start a new mock MPS application.', pictogram: 'N' },
          { value: 'renew', label: 'Renew an existing permit (mock)', description: 'Use an existing mock permit number.', pictogram: 'R' },
          { value: 'replace', label: 'Replace a permit (mock)', description: 'Choose a mock replacement reason.', pictogram: 'P' },
        ]}
        value={form.applicationType}
        onChange={(value) => update({ applicationType: String(value) as FormState['applicationType'], replaceReason: '', permitNumber: '' })}
        hasError={attempted && !form.applicationType}
        errorMessage='Select an application type.'
        required
      />
      {needsPermitNumber && (
        <Field id='permit-number' label='Existing permit number' helpMessage='Mock only. No permit lookup is performed.' hasError={attempted && !form.permitNumber.trim()} errorMessage='Enter the existing permit number.'>
          <Input id='permit-number' value={form.permitNumber} onChange={(event) => update({ permitNumber: event.target.value })} hasError={attempted && !form.permitNumber.trim()} inputWidth='lg' />
        </Field>
      )}
      {form.applicationType === 'replace' && (
        <RadioButtonList
          id='replace-reason'
          legend='Reason for replacement'
          options={[
            { value: 'lost', label: 'Lost permit (mock)' },
            { value: 'stolen', label: 'Stolen permit (mock)' },
            { value: 'damaged', label: 'Damaged permit (mock)' },
          ]}
          value={form.replaceReason}
          onChange={(value) => update({ replaceReason: String(value) })}
          hasError={attempted && !form.replaceReason}
          errorMessage='Select a replacement reason.'
        />
      )}
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ApplicantStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  function handleFrameChange(value: MpsApplicantDetailsFrameValue) {
    const firstName = value.firstName || ''
    const lastName = value.lastName || ''
    const street = form.applicantAddressMode === 'manual'
      ? formatManualStreet(value)
      : value.residentialAddress || ''

    update({
      firstName,
      lastName,
      fullName: [firstName, lastName].filter(Boolean).join(' '),
      day: (value.dateOfBirthDay || '').replace(/\D/g, '').slice(0, 2),
      month: value.dateOfBirthMonth || '',
      year: (value.dateOfBirthYear || '').replace(/\D/g, '').slice(0, 4),
      email: value.email || '',
      phone: value.phone || '',
      residentialAddress: value.residentialAddress || '',
      unitNumber: value.unitNumber || '',
      streetNumber: value.streetNumber || '',
      streetName: value.streetName || '',
      streetType: value.streetType || '',
      street,
      suburb: value.suburb || '',
      state: value.state || '',
      postcode: (value.postcode || '').replace(/\D/g, '').slice(0, 4),
    })
  }

  return (
    <section aria-labelledby='applicant-heading' data-mps-page-template='form-page'>
      <span id='applicant-heading' hidden>Applicant details</span>
      <MpsApplicantDetailsFramePreview
        addressMode={form.applicantAddressMode}
        value={applicantFrameValue(form)}
        onChange={handleFrameChange}
        onManualAddress={() => update({ applicantAddressMode: 'manual' })}
        onAddressSearch={() => update({ applicantAddressMode: 'search' })}
        onBack={onBack}
        onContinue={onContinue}
        showErrors={attempted}
      />
      <Button variant='link' onClick={onExit}>Exit</Button>
    </section>
  )
}

function applicantFrameValue(form: FormState): MpsApplicantDetailsFrameValue {
  return {
    firstName: form.firstName,
    lastName: form.lastName,
    dateOfBirthDay: form.day,
    dateOfBirthMonth: form.month,
    dateOfBirthYear: form.year,
    residentialAddress: form.residentialAddress,
    unitNumber: form.unitNumber,
    streetNumber: form.streetNumber,
    streetName: form.streetName,
    streetType: form.streetType,
    suburb: form.suburb,
    state: form.state,
    postcode: form.postcode,
    email: form.email,
    phone: form.phone,
  }
}

function formatManualStreet(value: MpsApplicantDetailsFrameValue) {
  return [value.unitNumber, value.streetNumber, value.streetName, streetTypeLabel(value.streetType)]
    .filter(Boolean)
    .join(' ')
}

interface RepresentativeStepProps extends StepProps {
  updateContact: (index: number, patch: Partial<ContactState>) => void
  addContact: () => void
  removeContact: (index: number) => void
}

function RepresentativeStep({ form, attempted, update, updateContact, addContact, removeContact, onBack, onContinue, onExit }: RepresentativeStepProps) {
  return (
    <section aria-labelledby='representative-heading' data-mps-page-template='form-page'>
      <Heading level={2} id='representative-heading'>Representative and authorised contacts</Heading>
      <ConditionalQuestionPanel
        id='has-representative'
        legend='Is someone applying on behalf of the applicant?'
        options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }]}
        value={form.hasRepresentative}
        onChange={(value) => update({ hasRepresentative: value as FormState['hasRepresentative'] })}
        showWhen='yes'
        hasError={attempted && !form.hasRepresentative}
        errorMessage='Select whether someone is applying on behalf of the applicant'
      >
        <Field id='representative-name' label='Representative name' hasError={attempted && form.hasRepresentative === 'yes' && !form.representativeName.trim()} errorMessage='Enter the representative name.'>
          <Input id='representative-name' value={form.representativeName} onChange={(event) => update({ representativeName: event.target.value })} hasError={attempted && form.hasRepresentative === 'yes' && !form.representativeName.trim()} inputWidth='xl' />
        </Field>
        <Field id='representative-relationship' label='Relationship to applicant' hasError={attempted && form.hasRepresentative === 'yes' && !form.representativeRelationship.trim()} errorMessage='Enter the representative relationship.'>
          <Input id='representative-relationship' value={form.representativeRelationship} onChange={(event) => update({ representativeRelationship: event.target.value })} hasError={attempted && form.hasRepresentative === 'yes' && !form.representativeRelationship.trim()} inputWidth='lg' />
        </Field>
      </ConditionalQuestionPanel>
      <p>Optional authorised contacts test the repeatable group pattern. At least one field in a contact makes the full contact row required.</p>
      <div className='tapaas-repeatable-list'>
        {form.authorisedContacts.map((contact, index) => {
          const hasAny = Boolean(contact.name.trim() || contact.relationship.trim() || contact.phone.trim())
          return (
            <RepeatableGroup
              key={`contact-${index}`}
              title={`Authorised contact ${index + 1}`}
              actions={index > 0 ? <Button variant='secondary' onClick={() => removeContact(index)}>Remove contact</Button> : undefined}
            >
              <Field id={`contact-${index}-name`} label='Full name' hasError={attempted && hasAny && !contact.name.trim()} errorMessage={`Enter the name for authorised contact ${index + 1}.`}>
                <Input id={`contact-${index}-name`} value={contact.name} onChange={(event) => updateContact(index, { name: event.target.value })} hasError={attempted && hasAny && !contact.name.trim()} inputWidth='xl' />
              </Field>
              <Field id={`contact-${index}-relationship`} label='Relationship to applicant' hasError={attempted && hasAny && !contact.relationship.trim()} errorMessage={`Enter the relationship for authorised contact ${index + 1}.`}>
                <Input id={`contact-${index}-relationship`} value={contact.relationship} onChange={(event) => updateContact(index, { relationship: event.target.value })} hasError={attempted && hasAny && !contact.relationship.trim()} inputWidth='lg' />
              </Field>
              <Field id={`contact-${index}-phone`} label='Phone number' hasError={attempted && hasAny && !contact.phone.trim()} errorMessage={`Enter the phone number for authorised contact ${index + 1}.`}>
                <Input id={`contact-${index}-phone`} type='tel' value={contact.phone} onChange={(event) => updateContact(index, { phone: event.target.value })} hasError={attempted && hasAny && !contact.phone.trim()} inputWidth='lg' />
              </Field>
            </RepeatableGroup>
          )
        })}
      </div>
      {form.authorisedContacts.length < 3 && <Button variant='secondary' onClick={addContact}>Add another contact</Button>}
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function EligibilityStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='eligibility-heading' data-mps-page-template='eligibility-state'>
      <Heading level={2} id='eligibility-heading'>Eligibility questions</Heading>
      <InPageAlert variant='warning' title='No eligibility decision is made'>
        <p>These questions mirror the shape of the MPS Figma flow, but the answers do not assess or decide eligibility.</p>
      </InPageAlert>
      <ConditionalQuestionPanel
        id='has-mobility-condition'
        legend='Does the applicant have a mobility condition?'
        options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
        value={form.hasMobilityCondition}
        onChange={(value) => update({ hasMobilityCondition: value as FormState['hasMobilityCondition'] })}
        showWhen='yes'
        hasError={attempted && !form.hasMobilityCondition}
        errorMessage='Select whether the applicant has a mobility condition'
      >
        <Field id='condition-details' label='Describe the condition' helpMessage='Mock content only. Do not enter real medical information.' hasError={attempted && form.hasMobilityCondition === 'yes' && !form.conditionDetails.trim()} errorMessage='Describe the mobility condition.'>
          <Textarea id='condition-details' value={form.conditionDetails} onChange={(event) => update({ conditionDetails: event.target.value })} hasError={attempted && form.hasMobilityCondition === 'yes' && !form.conditionDetails.trim()} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <RadioButtonList
        id='has-driver-licence'
        legend='Does the applicant have a NSW driver licence?'
        options={[{ value: 'yes', label: 'Yes (mock)' }, { value: 'no', label: 'No (mock)' }]}
        value={form.hasDriverLicence}
        onChange={(value) => update({ hasDriverLicence: String(value) as FormState['hasDriverLicence'] })}
        hasError={attempted && !form.hasDriverLicence}
        errorMessage='Select whether the applicant has a NSW driver licence.'
      />
      <RadioButtonList
        id='has-photo-card'
        legend='Does the applicant have a NSW photo card?'
        options={[{ value: 'yes', label: 'Yes (mock)' }, { value: 'no', label: 'No (mock)' }]}
        value={form.hasPhotoCard}
        onChange={(value) => update({ hasPhotoCard: String(value) as FormState['hasPhotoCard'] })}
        hasError={attempted && !form.hasPhotoCard}
        errorMessage='Select whether the applicant has a NSW photo card.'
      />
      <RadioButtonList
        id='needs-temporary-permit'
        legend='Is a temporary permit needed while this is assessed?'
        options={[{ value: 'yes', label: 'Yes (mock)' }, { value: 'no', label: 'No (mock)' }]}
        value={form.needsTemporaryPermit}
        onChange={(value) => update({ needsTemporaryPermit: String(value) as FormState['needsTemporaryPermit'] })}
        hasError={attempted && !form.needsTemporaryPermit}
        errorMessage='Select whether a temporary permit is needed.'
      />
      <AssessmentSummaryPanel title='Mock routing preview' items={assessmentItems(form)} />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function MedicalEvidenceStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const medicalEvidenceType = form.medicalEvidenceType === 'report' ? 'report' : 'certificate'
  const medicalEvidenceState = form.medicalEvidenceMethod === 'uploaded' ? 'provided' : 'required'

  return (
    <section aria-labelledby='medical-heading' data-mps-page-template='evidence-state'>
      <Heading level={2} id='medical-heading'>Medical evidence</Heading>
      <InPageAlert variant='info' title='File upload is deliberately mocked'>
        <p>GEL file upload is high risk and needs deeper source-backed review. This preview records an evidence scenario only and does not upload files.</p>
      </InPageAlert>
      <RadioButtonList
        id='medical-evidence-type'
        legend='What evidence type will be provided?'
        options={[{ value: 'certificate', label: 'Medical certificate (mock)' }, { value: 'report', label: 'Medical report (mock)' }]}
        value={form.medicalEvidenceType}
        onChange={(value) => update({ medicalEvidenceType: String(value) as FormState['medicalEvidenceType'] })}
        hasError={attempted && !form.medicalEvidenceType}
        errorMessage='Select a medical evidence type.'
      />
      <RadioButtonList
        id='medical-evidence-method'
        legend='How will the evidence be provided?'
        options={[{ value: 'uploaded', label: 'Mock uploaded now' }, { value: 'provide-later', label: 'Provide after submission' }]}
        value={form.medicalEvidenceMethod}
        onChange={(value) => update({ medicalEvidenceMethod: String(value) as FormState['medicalEvidenceMethod'] })}
        hasError={attempted && !form.medicalEvidenceMethod}
        errorMessage='Select how medical evidence will be provided.'
      />
      <MpsMedicalEvidenceStatusPreview
        evidenceType={medicalEvidenceType}
        state={medicalEvidenceState}
        idPrefix='mps-skeleton-medical-status'
      />
      <EvidenceChecklistCard
        title='Supporting evidence status'
        items={[
          { id: 'identity', label: 'Identity evidence', status: form.poiAcknowledged ? 'provided' : 'needs-review', description: 'Static mock proof-of-identity state only.' },
          { id: 'concession', label: 'Concession evidence', status: form.hasConcessionCard === 'yes' ? 'needs-review' : 'not-required', description: 'Concession card issuer, number and validation remain source-gated.' },
        ]}
      />
      <Checkbox
        id='medical-evidence-acknowledged'
        label='I understand medical evidence handling is simulated only.'
        checked={form.medicalEvidenceAcknowledged}
        onChange={(value) => update({ medicalEvidenceAcknowledged: Boolean(value) })}
        hasError={attempted && !form.medicalEvidenceAcknowledged}
        errorMessage='Confirm that medical evidence handling is simulated only.'
      />
      <Accordion
        id='medical-guidance'
        items={[
          { title: 'What happens if evidence is provided later?', children: <p>The mock application routes to manual review. A real service would need confirmed policy and operational rules.</p> },
          { title: 'Why not build upload now?', children: <p>File upload has validation, privacy, security and accessibility risks. The pack needs deeper engineering review before a coded preview claims that behaviour.</p> },
        ]}
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ConcessionStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='concession-heading' data-mps-page-template='concession-source-state'>
      <Heading level={2} id='concession-heading'>Concession card details</Heading>
      <InPageAlert variant='info' title='Concession details are source-gated'>
        <p>The inspected MPS source frame confirms this Yes/No question only. Card issuer, card number and backend validation remain source-gated and are not collected in this preview.</p>
      </InPageAlert>
      <RadioButtonList
        id='has-concession-card'
        legend='Do you have a New South Wales concession card?'
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
        value={form.hasConcessionCard}
        onChange={(value) => update({ hasConcessionCard: String(value) as FormState['hasConcessionCard'] })}
        hasError={attempted && !form.hasConcessionCard}
        errorMessage='Select whether the applicant has a New South Wales concession card.'
      />
      <MoreInfoDisclosure triggerText='What is still source-gated' title='Concession source boundaries'>
        <p>Card issuer, card number, concession validation, recovery states and backend rules need designer and service-owner confirmation before they can be added to this preview.</p>
      </MoreInfoDisclosure>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function DeliveryStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='delivery-heading' data-mps-page-template='kiro-stress-test-form'>
      <Heading level={2} id='delivery-heading'>Delivery preferences</Heading>
      <InPageAlert variant='info' title='Trial-only delivery stress path'>
        <p>This page is a Kiro stress-test route only. It is not confirmed in the MPS source flow and does not set real delivery, approval or fulfilment behaviour.</p>
      </InPageAlert>
      <RadioButtonList
        id='delivery-method'
        legend='Choose a trial-only delivery route'
        options={[{ value: 'post', label: 'Post to residential address (mock)' }, { value: 'service-centre', label: 'Collect at a service centre (mock)' }]}
        value={form.deliveryMethod}
        onChange={(value) => update({ deliveryMethod: String(value) as FormState['deliveryMethod'] })}
        hasError={attempted && !form.deliveryMethod}
        errorMessage='Select a delivery method.'
      />
      <Field id='delivery-instructions' label='Delivery instructions' helpMessage='Optional. This is not sent anywhere.' isOptional>
        <Textarea id='delivery-instructions' value={form.deliveryInstructions} onChange={(event) => update({ deliveryInstructions: event.target.value })} rows={3} />
      </Field>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function PaymentStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='payment-heading' data-mps-page-template='mock-payment-state'>
      <Heading level={2} id='payment-heading'>Payment simulation</Heading>
      <ReviewFeesCard
        title='Mock fee estimate'
        fees={[
          { label: 'Mobility parking permit application', amount: '$0.00' },
          { label: 'Replacement fee', amount: form.applicationType === 'replace' ? '$0.00' : '$0.00' },
        ]}
        totalAmount='$0.00'
      />
      <InPageAlert variant='info' title='No real payment is included'>
        <p>This page only simulates payment and routing outcomes. No payment provider, receipt or refund process is connected.</p>
      </InPageAlert>
      <RadioButtonList
        id='payment-scenario'
        legend='Choose a mock payment or routing outcome'
        options={[
          { value: 'success', label: 'Mock payment succeeds and application submits' },
          { value: 'failed', label: 'Payment fails and shows a recoverable error' },
          { value: 'cancelled', label: 'Payment is cancelled' },
          { value: 'manual-review', label: 'Skip payment and route to manual review' },
        ]}
        value={form.paymentScenario}
        onChange={(value) => update({ paymentScenario: String(value) as FormState['paymentScenario'] })}
        hasError={attempted && !form.paymentScenario}
        errorMessage='Select a mock payment or routing outcome.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function DeclarationStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  return (
    <section aria-labelledby='declaration-heading' data-mps-page-template='declaration'>
      <Heading level={2} id='declaration-heading'>Declaration</Heading>
      <InPageAlert variant='warning' title='Legal wording required'>
        <p>This placeholder must be replaced with confirmed MPS declaration wording before real use.</p>
      </InPageAlert>
      <p>I declare that the information I have provided is true and correct. I understand that providing false or misleading information may have consequences confirmed by the policy owner.</p>
      <Checkbox
        id='declaration-accepted'
        label='I declare that the information provided is true and correct.'
        checked={form.declarationAccepted}
        onChange={(value) => update({ declarationAccepted: Boolean(value) })}
        hasError={attempted && !form.declarationAccepted}
        errorMessage='Accept the declaration to continue.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ReviewStep({ form, onBack, onSubmit, onExit }: { form: FormState; onBack: () => void; onSubmit: () => void; onExit: () => void }) {
  return (
    <section aria-label='MPS review and supporting preview status' data-mps-page-template='review'>
      <MpsReviewFramePreview
        sections={[
          {
            id: 'mps-review-application',
            title: 'Application details',
            rows: [
              { label: 'Application type', value: appTypeLabel(form) },
              { label: 'Permit type', value: 'Mobility parking permit', helpText: 'Source-aligned label for review only. No permit issue has occurred.' },
              { label: 'Existing permit number', value: form.permitNumber || 'Not provided', helpText: 'Customer-entered mock value. No permit lookup result is shown.' },
              { label: 'Replacement reason', value: replaceReasonLabel(form) },
            ],
          },
          {
            id: 'mps-review-personal',
            title: 'Personal details',
            rows: [
              { label: 'First name', value: form.firstName },
              { label: 'Last name', value: form.lastName },
              { label: 'Date of birth', value: dateOfBirthLabel(form) },
              { label: 'Residential address', value: addressLabel(form) },
              { label: 'Email', value: form.email },
              { label: 'Phone number', value: form.phone },
            ],
          },
          {
            id: 'mps-review-concession',
            title: 'Concession card details',
            rows: [
              { label: 'Has New South Wales concession card', value: concessionCardLabel(form) },
              { label: 'Card issuer', value: sourceGatedConcessionValue(form), helpText: 'Source-gated. Not collected in this preview.' },
              { label: 'Card number', value: sourceGatedConcessionValue(form), helpText: 'Source-gated. Not collected in this preview.' },
            ],
          },
          {
            id: 'mps-review-system-state',
            title: 'Trial-only stress and backend states',
            rows: [
              { label: 'Proof of identity state', value: form.poiAcknowledged ? 'Mock acknowledged' : 'Needs review', helpText: 'Static mock proof-of-identity state only.' },
              { label: 'Medical evidence status', value: evidenceLabel(form), helpText: 'No real upload, storage, scanning or assessment occurs.' },
              { label: 'Representative/contact route', value: representativeLabel(form), helpText: 'Skeleton-only. No standalone MPS representative/contact source frame is confirmed.' },
              { label: 'Delivery route', value: deliveryLabel(form), helpText: 'Kiro stress-test route only. Not confirmed as MPS source behaviour.' },
              { label: 'Payment route', value: paymentScenarioLabel(form), helpText: 'Mock payment and routing state only. No payment provider, receipt or refund behaviour is connected.' },
            ],
          },
        ]}
        declarationStatements={[
          'I declare that the information provided is true and correct.',
          'I understand this prototype does not assess eligibility or submit to a real service.',
        ]}
        onBack={onBack}
        onSubmit={onSubmit}
        onExit={onExit}
      />
      <InPageAlert variant='info' title='Mock/system state summary'>
        <p>Representative/contact, delivery, payment, evidence and assessment rows are trial-only or mock state summaries. They do not prove backend validation, eligibility, payment, approval or permit issue behaviour.</p>
      </InPageAlert>
      <EvidenceChecklistCard title='Evidence and validation status' items={evidenceItems(form)} />
      <AssessmentSummaryPanel title='Mock assessment summary' items={assessmentItems(form)} />
      <LegalInfoAccordion />
      <ReviewFeesCard fees={[{ label: 'Mock application fee', amount: '$0.00' }]} totalAmount='$0.00' />
    </section>
  )
}

function OutcomeStep({ form, onStartAgain }: { form: FormState; onStartAgain: () => void }) {
  if (form.paymentScenario === 'failed' || form.paymentScenario === 'cancelled') {
    return (
      <BackendErrorExamplePage
        example={form.paymentScenario === 'failed' ? backendErrorExamples.paymentError : {
          ...backendErrorExamples.paymentError,
          code: 'PAYMENT_CANCELLED',
          title: 'Payment was cancelled',
          message: 'The application has not been submitted. This is a simulated payment cancellation path only.',
          reference: 'MPS-PAYMENT-CANCELLED-MOCK',
        }}
        onStartAgain={onStartAgain}
      />
    )
  }
  const manual = isManualReview(form)
  return (
    <section aria-labelledby='outcome-heading' data-mps-page-template='confirmation'>
      <span id='outcome-heading' hidden>Mobility Parking Scheme outcome</span>
      <MpsConfirmationFramePreview
        title='Your application has been submitted for assessment'
        referenceNumber={manual ? 'MPS-REVIEW-000000' : 'MPS-MOCK-000000'}
        applicationDetails={[
          { label: 'Applicant', value: form.fullName },
          { label: 'Application', value: 'Apply for a Mobility Parking Permit' },
          { label: 'Lodgement date', value: 'Source-gated', helpText: 'The source frame includes a lodgement date. This preview does not create a real lodgement record.' },
          { label: 'Application type', value: appTypeLabel(form), helpText: 'Mock branch captured during the preview flow.' },
          { label: 'Outcome route', value: manual ? 'Manual review' : 'Submitted', helpText: 'Mock outcome only.' },
        ]}
        nextSteps={[
          { id: 'assessment', content: 'Source-observed assessment step: your application will be reviewed. Timing and ownership need service-owner confirmation.' },
          { id: 'updates', content: 'Source-observed contact/payment step: further information and payment processing rules are not connected in this preview.' },
          { id: 'service-centre', content: 'Source-observed service-centre step: any visit requirement needs service-owner confirmation.' },
          { id: 'issue', content: 'Source-observed permit mailout step: no permit issue or delivery has occurred in this preview.' },
        ]}
        relatedContent={(
          <section aria-labelledby='mps-confirmation-return-cards-heading'>
            <Heading level={3} id='mps-confirmation-return-cards-heading'>Return expired or replaced cards</Heading>
            <p>Source-observed return-card instructions and fine warnings require service-owner confirmation before they can be treated as operational guidance.</p>
          </section>
        )}
        onStartAgain={onStartAgain}
      />
      <InPageAlert variant='info' title='Trial boundary'>
        <p>Source-observed confirmation content is shown for review only. No approval, permit issue, payment receipt, eligibility decision, lodgement record or concession validation has occurred.</p>
      </InPageAlert>
    </section>
  )
}

function evidenceItems(form: FormState) {
  return [
    { id: 'identity', label: 'Proof of identity', status: form.poiAcknowledged ? 'provided' as const : 'needs-review' as const, description: 'Static mock state only.' },
    { id: 'medical', label: 'Medical evidence', status: form.medicalEvidenceMethod === 'uploaded' ? 'provided' as const : 'needs-review' as const, description: evidenceLabel(form) },
    { id: 'concession', label: 'Concession evidence', status: form.hasConcessionCard === 'yes' ? 'needs-review' as const : 'not-required' as const, description: concessionCardLabel(form) },
  ]
}

function assessmentItems(form: FormState) {
  return [
    { label: 'Eligibility decision', value: 'Not assessed', tone: 'warning' as const },
    { label: 'Identity proofing', value: form.poiAcknowledged ? 'Mock acknowledged' : 'Needs review', tone: form.poiAcknowledged ? 'good' as const : 'warning' as const },
    { label: 'Medical evidence', value: form.medicalEvidenceMethod === 'uploaded' ? 'Mock provided' : 'Manual review likely', tone: form.medicalEvidenceMethod === 'uploaded' ? 'good' as const : 'warning' as const },
    { label: 'Concession card details', value: concessionCardLabel(form), tone: form.hasConcessionCard === 'yes' ? 'warning' as const : 'neutral' as const },
    { label: 'Route after submission', value: isManualReview(form) ? 'Manual review' : 'Standard mock submission', tone: isManualReview(form) ? 'warning' as const : 'good' as const },
  ]
}

function isManualReview(form: FormState) {
  return form.paymentScenario === 'manual-review' ||
    form.medicalEvidenceMethod === 'provide-later' ||
    form.hasDriverLicence === 'no' ||
    form.hasPhotoCard === 'no'
}

function appTypeLabel(form: FormState) {
  if (form.applicationType === 'new') return 'New application'
  if (form.applicationType === 'renew') return 'Renewal'
  if (form.applicationType === 'replace') return 'Replacement'
  return 'Not selected'
}

function replaceReasonLabel(form: FormState) {
  if (form.applicationType !== 'replace') return 'Not applicable'
  if (form.replaceReason === 'lost') return 'Lost permit (mock)'
  if (form.replaceReason === 'stolen') return 'Stolen permit (mock)'
  if (form.replaceReason === 'damaged') return 'Damaged permit (mock)'
  return 'Not selected'
}

function concessionCardLabel(form: FormState) {
  if (form.hasConcessionCard === 'yes') return 'Yes'
  if (form.hasConcessionCard === 'no') return 'No'
  return 'Not selected'
}

function sourceGatedConcessionValue(form: FormState) {
  if (form.hasConcessionCard === 'yes') return 'Source-gated'
  if (form.hasConcessionCard === 'no') return 'Not applicable'
  return 'Not selected'
}

function evidenceLabel(form: FormState) {
  if (form.medicalEvidenceMethod === 'uploaded') return `${form.medicalEvidenceType || 'Medical evidence'} marked as mock uploaded`
  if (form.medicalEvidenceMethod === 'provide-later') return `${form.medicalEvidenceType || 'Medical evidence'} will be provided later`
  return 'Not selected'
}

function deliveryLabel(form: FormState) {
  if (form.deliveryMethod === 'post') return 'Post to residential address'
  if (form.deliveryMethod === 'service-centre') return 'Collect at a service centre'
  return 'Not selected'
}

function paymentScenarioLabel(form: FormState) {
  if (form.paymentScenario === 'success') return 'Mock payment succeeds'
  if (form.paymentScenario === 'failed') return 'Mock payment fails'
  if (form.paymentScenario === 'cancelled') return 'Mock payment is cancelled'
  if (form.paymentScenario === 'manual-review') return 'Manual review route'
  return 'Not selected'
}

function representativeLabel(form: FormState) {
  if (form.hasRepresentative === 'yes') return 'Representative recorded in skeleton-only preview'
  if (form.hasRepresentative === 'no') return 'No representative'
  return 'Not selected'
}

function dateOfBirthLabel(form: FormState) {
  return [form.day, monthLabel(form.month), form.year].filter(Boolean).join(' ')
}

function addressLabel(form: FormState) {
  if (form.applicantAddressMode === 'search') return form.residentialAddress || 'Not provided'
  const suburbLine = [form.suburb, form.state, form.postcode].filter(Boolean).join(' ')
  return [form.street, suburbLine].filter(Boolean).join(', ') || 'Not provided'
}

function streetTypeLabel(value?: string) {
  if (value === 'street') return 'Street'
  if (value === 'road') return 'Road'
  if (value === 'avenue') return 'Avenue'
  if (value === 'drive') return 'Drive'
  return value || ''
}

function monthLabel(value: string) {
  const labels: Record<string, string> = {
    jan: 'Jan',
    feb: 'Feb',
    mar: 'Mar',
    apr: 'Apr',
    may: 'May',
    jun: 'Jun',
    jul: 'Jul',
    aug: 'Aug',
    sep: 'Sep',
    oct: 'Oct',
    nov: 'Nov',
    dec: 'Dec',
  }
  return labels[value] || value
}

function yesNo(value: 'yes' | 'no' | '') {
  if (value === 'yes') return 'Yes'
  if (value === 'no') return 'No'
  return 'Not selected'
}
