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
  Accordion,
  MoreInfoDisclosure,
} from './gel'
import {
  ConfirmationHeader,
  ReviewFeesCard,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
  ConditionalQuestionPanel,
  DetailsCard,
} from './tapaas-preview'

type MpsStep =
  | 'privacy'
  | 'appType'
  | 'applicant'
  | 'eligibility'
  | 'evidence'
  | 'concession'
  | 'declaration'
  | 'review'
  | 'confirmation'

const stepOrder: MpsStep[] = [
  'privacy', 'appType', 'applicant', 'eligibility', 'evidence', 'concession', 'declaration', 'review', 'confirmation',
]

const stepLabels: Record<MpsStep, string> = {
  privacy: 'Privacy',
  appType: 'Application type',
  applicant: 'Applicant details',
  eligibility: 'Eligibility questions',
  evidence: 'Evidence',
  concession: 'Concession details',
  declaration: 'Declaration',
  review: 'Review',
  confirmation: 'Confirmation',
}

interface FormState {
  privacyAgreed: boolean
  applicationType: 'new' | 'renew' | 'replace' | ''
  fullName: string
  email: string
  phone: string
  street: string
  suburb: string
  state: string
  postcode: string
  hasCondition: 'yes' | 'no' | ''
  conditionDetails: string
  isDriver: 'yes' | 'no' | ''
  driverDetails: string
  evidenceAcknowledged: boolean
  concessionType: string
  concessionNumber: string
  declarationAccepted: boolean
}

const initialState: FormState = {
  privacyAgreed: false,
  applicationType: '',
  fullName: '',
  email: '',
  phone: '',
  street: '',
  suburb: '',
  state: '',
  postcode: '',
  hasCondition: '',
  conditionDetails: '',
  isDriver: '',
  driverDetails: '',
  evidenceAcknowledged: false,
  concessionType: '',
  concessionNumber: '',
  declarationAccepted: false,
}

export function MobilityParkingPermitSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((s: MpsStep) => errorsForStep(s, form), [form])
  const { step, attempted, errors, errorSummaryRef, exitRef, exitNotice, goBack, goNext, handleExit, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  return (
    <div>
      <div className='tapaas-trial-banner'>
        <strong>TaPaaS v0.3 trial skeleton — Mobility parking permit complexity test.</strong>
        <p style={{ margin: '0.25rem 0 0' }}>
          This is a non-production build-assist example using mock data only. Privacy, legal, eligibility, medical, concession and processing details need owner confirmation.
        </p>
      </div>

      {step !== 'confirmation' && (
        <p aria-live='polite' style={{ color: 'var(--gel-color-text-grey)', marginTop: 0 }}>
          Step {stepOrder.indexOf(step) + 1} of 9: {stepLabels[step]}
        </p>
      )}

      <ErrorSummary ref={errorSummaryRef} errors={errors} />

      {step === 'privacy' && <PrivacyStep form={form} attempted={attempted} update={update} onContinue={goNext} onExit={handleExit} />}
      {step === 'appType' && <AppTypeStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={handleExit} />}
      {step === 'applicant' && <ApplicantStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={handleExit} />}
      {step === 'eligibility' && <EligibilityStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={handleExit} />}
      {step === 'evidence' && <EvidenceStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={handleExit} />}
      {step === 'concession' && <ConcessionStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={handleExit} />}
      {step === 'declaration' && <DeclarationStep form={form} attempted={attempted} update={update} onBack={goBack} onContinue={goNext} onExit={handleExit} />}
      {step === 'review' && <ReviewStep form={form} onBack={goBack} onSubmit={goNext} onExit={handleExit} />}
      {step === 'confirmation' && <ConfirmationStep form={form} onStartAgain={() => { reset(); setForm(initialState) }} />}

      {exitNotice && (
        <div ref={exitRef} tabIndex={-1}>
          <InPageAlert variant='info' title='Exit modal is not implemented in this trial skeleton'>
            <p>The TaPaaS Exit modal is documented as design-only in this pack. It needs modal focus management and wording confirmation before implementation.</p>
          </InPageAlert>
        </div>
      )}
    </div>
  )
}

// --- Validation ---
function errorsForStep(step: MpsStep, form: FormState) {
  const errs: { id: string; text: string }[] = []
  if (step === 'privacy' && !form.privacyAgreed) {
    errs.push({ id: 'privacy-confirmation', text: 'Confirm that you have read the privacy information' })
  }
  if (step === 'appType') {
    if (!form.applicationType) errs.push({ id: 'application-type', text: 'Select an application type' })
  }
  if (step === 'applicant') {
    if (!form.fullName.trim()) errs.push({ id: 'full-name', text: 'Enter your full name' })
    if (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.')) errs.push({ id: 'email', text: 'Enter a valid email address' })
    if (!form.phone.trim()) errs.push({ id: 'phone', text: 'Enter your phone number' })
    if (!form.street.trim()) errs.push({ id: 'street', text: 'Enter your street address' })
    if (!form.suburb.trim()) errs.push({ id: 'suburb', text: 'Enter your suburb' })
    if (!form.state) errs.push({ id: 'state', text: 'Select your state' })
    if (!form.postcode.trim() || form.postcode.length !== 4) errs.push({ id: 'postcode', text: 'Enter a valid 4-digit postcode' })
  }
  if (step === 'eligibility') {
    if (!form.hasCondition) errs.push({ id: 'has-condition', text: 'Select whether you have a condition that affects your mobility' })
    if (form.hasCondition === 'yes' && !form.conditionDetails.trim()) errs.push({ id: 'condition-details', text: 'Describe your condition' })
    if (!form.isDriver) errs.push({ id: 'is-driver', text: 'Select whether you are the driver of the vehicle' })
    if (form.isDriver === 'yes' && !form.driverDetails.trim()) errs.push({ id: 'driver-details', text: 'Describe your driving situation' })
  }
  if (step === 'evidence') {
    if (!form.evidenceAcknowledged) errs.push({ id: 'evidence-acknowledged', text: 'Confirm that you understand evidence will need to be provided separately' })
  }
  if (step === 'concession') {
    if (!form.concessionType) errs.push({ id: 'concession-type', text: 'Select a concession card type' })
    if (!form.concessionNumber.trim()) errs.push({ id: 'concession-number', text: 'Enter your concession card number' })
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
        <p>Replace this placeholder with the confirmed privacy collection notice for the mobility parking permit service.</p>
      </InPageAlert>
      <p>We collect your personal information to process your mobility parking permit application. This information may be shared with [confirmed disclosure recipients]. For more information, see [confirmed privacy policy URL].</p>
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

function AppTypeStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const typeErr = attempted && !form.applicationType
  return (
    <section aria-labelledby='app-type-heading'>
      <Heading level={2} id='app-type-heading'>Application type</Heading>
      <RadioButtonList
        id='application-type'
        legend='Application type'
        options={[
          { value: 'new', label: 'New application (mock)' },
          { value: 'renew', label: 'Renewal (mock)' },
          { value: 'replace', label: 'Replacement (mock)' },
        ]}
        value={form.applicationType}
        onChange={(v) => update({ applicationType: String(v) as FormState['applicationType'] })}
        hasError={typeErr}
        errorMessage='Select an application type.'
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ApplicantStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const nameErr = attempted && !form.fullName.trim()
  const emailErr = attempted && (!form.email.trim() || !form.email.includes('@') || !form.email.split('@')[1]?.includes('.'))
  const phoneErr = attempted && !form.phone.trim()
  const streetErr = attempted && !form.street.trim()
  const suburbErr = attempted && !form.suburb.trim()
  const stateErr = attempted && !form.state
  const postcodeErr = attempted && (!form.postcode.trim() || form.postcode.length !== 4)
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

function EligibilityStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const conditionErr = attempted && !form.hasCondition
  const conditionDetailsErr = attempted && form.hasCondition === 'yes' && !form.conditionDetails.trim()
  const driverErr = attempted && !form.isDriver
  const driverDetailsErr = attempted && form.isDriver === 'yes' && !form.driverDetails.trim()
  const appTypeLabel: Record<string, string> = { new: 'New application', renew: 'Renewal', replace: 'Replacement' }
  return (
    <section aria-labelledby='eligibility-heading'>
      <Heading level={2} id='eligibility-heading'>Eligibility questions</Heading>
      <ConditionalQuestionPanel
        id='has-condition'
        legend='Do you have a condition that affects your mobility?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={form.hasCondition}
        onChange={(v) => update({ hasCondition: v as FormState['hasCondition'] })}
        showWhen='yes'
        hasError={conditionErr}
        errorMessage='Select whether you have a condition that affects your mobility'
      >
        <Field id='condition-details' label='Describe your condition' helpMessage='This is placeholder content only. No medical assessment is made in this prototype.' hasError={conditionDetailsErr} errorMessage='Describe your condition.'>
          <Textarea id='condition-details' value={form.conditionDetails} onChange={(e) => update({ conditionDetails: e.target.value })} hasError={conditionDetailsErr} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <ConditionalQuestionPanel
        id='is-driver'
        legend='Are you the driver of the vehicle?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value={form.isDriver}
        onChange={(v) => update({ isDriver: v as FormState['isDriver'] })}
        showWhen='yes'
        hasError={driverErr}
        errorMessage='Select whether you are the driver of the vehicle'
      >
        <Field id='driver-details' label='Describe your driving situation' helpMessage='This is placeholder content only. No eligibility decision is made.' hasError={driverDetailsErr} errorMessage='Describe your driving situation.'>
          <Textarea id='driver-details' value={form.driverDetails} onChange={(e) => update({ driverDetails: e.target.value })} hasError={driverDetailsErr} rows={4} />
        </Field>
      </ConditionalQuestionPanel>
      <InPageAlert variant='warning' title='Eligibility placeholder'>
        <p>Eligibility decisions are not made in this prototype. All questions use placeholder content and require owner confirmation.</p>
      </InPageAlert>
      <DetailsCard
        title='Application summary so far'
        rows={[
          { label: 'Name', value: form.fullName || '—' },
          { label: 'Application type', value: appTypeLabel[form.applicationType] || '—' },
        ]}
        headingLevel={3}
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function EvidenceStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const ackErr = attempted && !form.evidenceAcknowledged
  return (
    <section aria-labelledby='evidence-heading'>
      <Heading level={2} id='evidence-heading'>Evidence</Heading>
      <InPageAlert variant='info' title='File upload not implemented'>
        <p>In a real application, you would upload medical evidence here. File upload is not implemented in this trial skeleton.</p>
      </InPageAlert>
      <Checkbox
        id='evidence-acknowledged'
        label='I understand that evidence will need to be provided separately.'
        checked={form.evidenceAcknowledged}
        onChange={(v) => update({ evidenceAcknowledged: Boolean(v) })}
        hasError={ackErr}
        errorMessage='Confirm that you understand evidence will need to be provided separately.'
      />
      <Accordion
        id='evidence-guidance'
        items={[
          {
            title: 'What evidence is needed',
            children: (
              <>
                <p>You may need to provide a medical certificate or letter from your treating health professional confirming your mobility condition.</p>
                <p>Accepted evidence types include GP letters, specialist reports and occupational therapy assessments.</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', fontStyle: 'italic' }}>Owner confirmation required — evidence types and requirements are placeholder content only.</p>
              </>
            ),
          },
          {
            title: 'How to provide evidence',
            children: (
              <>
                <p>Evidence can be uploaded as a scanned document or photograph. Accepted formats include PDF, JPG and PNG.</p>
                <p>If you cannot upload evidence online, you may post it to [confirmed postal address].</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', fontStyle: 'italic' }}>Owner confirmation required — upload methods, formats and postal details are placeholder content only.</p>
              </>
            ),
          },
        ]}
      />
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

function ConcessionStep({ form, attempted, update, onBack, onContinue, onExit }: StepProps) {
  const typeErr = attempted && !form.concessionType
  const numberErr = attempted && !form.concessionNumber.trim()
  return (
    <section aria-labelledby='concession-heading'>
      <Heading level={2} id='concession-heading'>Concession details</Heading>
      <Field id='concession-type' label='Concession card type' hasError={typeErr} errorMessage='Select a concession card type.'>
        <Select
          id='concession-type'
          value={form.concessionType}
          onChange={(e) => update({ concessionType: e.target.value })}
          hasError={typeErr}
          inputWidth='xl'
          options={[
            { value: 'centrelink', text: 'Centrelink (mock)' },
            { value: 'dva', text: 'DVA (mock)' },
            { value: 'none', text: 'None (mock)' },
          ]}
        />
      </Field>
      <Field id='concession-number' label='Concession card number' helpMessage='Enter your card number. This is not validated in this prototype.' hasError={numberErr} errorMessage='Enter your concession card number.'>
        <Input id='concession-number' value={form.concessionNumber} onChange={(e) => update({ concessionNumber: e.target.value })} hasError={numberErr} inputWidth='lg' />
      </Field>
      <InPageAlert variant='info' title='Concession validation not performed'>
        <p>Concession card validation is not performed in this prototype. All details are mock only.</p>
      </InPageAlert>
      <MoreInfoDisclosure triggerText='What concession cards are accepted' title='Accepted concession cards'>
        <ul>
          <li>Centrelink Pensioner Concession Card</li>
          <li>Centrelink Health Care Card</li>
          <li>DVA Gold Card</li>
          <li>DVA White Card</li>
          <li>Commonwealth Seniors Health Card</li>
        </ul>
        <p style={{ fontSize: '0.875rem', color: 'var(--gel-color-text-grey)', fontStyle: 'italic' }}>Owner confirmation required — accepted card types are placeholder content only.</p>
      </MoreInfoDisclosure>
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
  const appTypeLabel: Record<string, string> = { new: 'New application', renew: 'Renewal', replace: 'Replacement' }
  const concessionLabel: Record<string, string> = { centrelink: 'Centrelink', dva: 'DVA', none: 'None' }
  return (
    <section aria-labelledby='review-heading'>
      <Heading level={2} id='review-heading'>Review your application</Heading>
      <p>Check the information below before submitting. This page does not submit to a real service.</p>
      <ReviewInfoCard title='Application type' sections={[{ title: 'Type', rows: [
        { label: 'Application type', value: appTypeLabel[form.applicationType] || form.applicationType },
      ] }]} />
      <ReviewInfoCard title='Applicant details' sections={[{ title: 'Personal information', rows: [
        { label: 'Full name', value: form.fullName },
        { label: 'Email', value: form.email },
        { label: 'Phone', value: form.phone },
        { label: 'Address', value: `${form.street}, ${form.suburb} ${form.state} ${form.postcode}` },
      ] }]} />
      <ReviewInfoCard title='Eligibility' sections={[{ title: 'Eligibility answers', rows: [
        { label: 'Condition affecting mobility', value: form.hasCondition === 'yes' ? 'Yes' : 'No' },
        ...(form.hasCondition === 'yes' ? [{ label: 'Condition details', value: form.conditionDetails }] : []),
        { label: 'Driver of vehicle', value: form.isDriver === 'yes' ? 'Yes' : 'No' },
        ...(form.isDriver === 'yes' ? [{ label: 'Driving situation', value: form.driverDetails }] : []),
      ] }]} />
      <ReviewInfoCard title='Evidence' sections={[{ title: 'Evidence acknowledgement', rows: [
        { label: 'Evidence acknowledged', value: form.evidenceAcknowledged ? 'Yes' : 'No' },
      ] }]} />
      <ReviewInfoCard title='Concession details' sections={[{ title: 'Concession information', rows: [
        { label: 'Concession card type', value: concessionLabel[form.concessionType] || form.concessionType },
        { label: 'Concession card number', value: form.concessionNumber },
      ] }]} />
      <ReviewFeesCard fees={[{ label: 'Application fee', amount: '$0.00' }]} totalAmount='$0.00' />
      <InPageAlert variant='info' title='Payment excluded'>
        <p>No payment flow is included in this trial skeleton. Fee amounts need owner confirmation.</p>
      </InPageAlert>
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit application' />
    </section>
  )
}

function ConfirmationStep({ form, onStartAgain }: { form: FormState; onStartAgain: () => void }) {
  const appTypeLabel: Record<string, string> = { new: 'New application', renew: 'Renewal', replace: 'Replacement' }
  const concessionLabel: Record<string, string> = { centrelink: 'Centrelink', dva: 'DVA', none: 'None' }
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader title='Application submitted' transactionName='Mobility parking permit' />
      <TransactionSummaryCard items={[
        { label: 'Reference number', value: 'MPS-MOCK-000000', helpText: 'Mock reference only.' },
        { label: 'Applicant', value: form.fullName },
        { label: 'Application type', value: appTypeLabel[form.applicationType] || form.applicationType },
        { label: 'Concession card type', value: concessionLabel[form.concessionType] || form.concessionType },
      ]}>
        <p>Processing timeframes, receipt wording and next steps must be confirmed by the service owner before reuse.</p>
      </TransactionSummaryCard>
      <Heading level={2}>Next steps</Heading>
      <ol className='tapaas-step-list'>
        <li>Your application will be assessed within [confirmed assessment timeframe].</li>
        <li>You will receive a notification at [confirmed contact method].</li>
        <li>If approved, your mobility parking permit will be issued.</li>
        <li>Contact [confirmed support channel] if you need to update your application.</li>
      </ol>
      <InPageAlert variant='info' title='Owner confirmation required'>
        <p>Owner confirmation required — assessment, timeframes and next steps are not real.</p>
      </InPageAlert>
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start again' />
      <p style={{ marginTop: '1rem' }}>
        <TextLink href='https://github.com/leokessel-lgtm/tapaas-kiro-trial/blob/main/docs/tapaas/00-source-inventory.md'>Review TaPaaS source inventory</TextLink>
      </p>
    </section>
  )
}
