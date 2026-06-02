import { useCallback, useState } from 'react'
import { type StepError, useTransactionStep } from './useTransactionStep'
import {
  Accordion,
  Button,
  Checkbox,
  ErrorSummary,
  Field,
  Heading,
  Input,
  MoreInfoDisclosure,
  ProgressStepper,
  RadioButtonList,
  TextLink,
} from './gel'
import {
  ConfirmationHeader,
  DetailsCard,
  ExitModal,
  PrivacyCardPreview,
  ReviewInfoCard,
  TransactionCtaGroup,
  TransactionSummaryCard,
} from './tapaas-preview'

type NodStep = 'privacy' | 'vehicleSelection' | 'saleAndBuyer' | 'review' | 'confirmation'
type StepperStep = Exclude<NodStep, 'confirmation'>

const stepOrder: NodStep[] = ['privacy', 'vehicleSelection', 'saleAndBuyer', 'review', 'confirmation']
const stepperSteps: StepperStep[] = ['privacy', 'vehicleSelection', 'saleAndBuyer', 'review']

const transactionName = 'Submit a notice of disposal for a vehicle'

const stepLabels: Record<NodStep, string> = {
  privacy: 'Privacy',
  vehicleSelection: 'Vehicle selection',
  saleAndBuyer: 'Sale and buyer details',
  review: 'Review',
  confirmation: 'Notice of Disposal submitted',
}

const accountProfile = {
  familyName: 'Citizen',
}

const mockVehicle = {
  plate: 'ADC74M',
  description: 'SUBARU OUTBACK WAGON \u2013 NAVY \u2013 2005',
  vin: '4S4BP61C957126456',
  regoExpiry: '7 November 2025',
}

const receipt = {
  referenceNumber: 'I-037283638',
  transactionDate: '2 June 2026',
}

interface FormState {
  termsAccepted: boolean
  vehicleSelected: boolean
  searchPlate: string
  saleDateDay: string
  saleDateMonth: string
  saleDateYear: string
  salePrice: string
  buyerType: string
  buyerLicenceNumber: string
  buyerFamilyName: string
  dealerLicenceNumber: string
  dealerBusinessName: string
}

const initialState: FormState = {
  termsAccepted: false,
  vehicleSelected: false,
  searchPlate: '',
  saleDateDay: '',
  saleDateMonth: '',
  saleDateYear: '',
  salePrice: '',
  buyerType: '',
  buyerLicenceNumber: '',
  buyerFamilyName: '',
  dealerLicenceNumber: '',
  dealerBusinessName: '',
}

export function NoticeOfDisposalSkeleton() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submittedErrors, setSubmittedErrors] = useState<StepError[]>([])

  function update(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  const getErrors = useCallback((s: NodStep) => errorsForStep(s, form), [form])
  const { step, setStep, setAttempted, errorSummaryRef, exitModalOpen, openExitModal, closeExitModal, goBack, goNext, reset } = useTransactionStep(stepOrder, 'confirmation', getErrors)

  function handleContinue() {
    const nextErrors = getErrors(step)
    setSubmittedErrors(nextErrors)
    goNext()
  }

  function handleBack() {
    setSubmittedErrors([])
    goBack()
  }

  function goToReviewSource(targetStep: Exclude<NodStep, 'review' | 'confirmation'>) {
    setAttempted(false)
    setSubmittedErrors([])
    setStep(targetStep)
  }

  function resetTransaction() {
    setSubmittedErrors([])
    reset()
    setForm(initialState)
  }

  return (
    <div>
      {step !== 'confirmation' && <NodFormHeader step={step} />}
      <ErrorSummary ref={errorSummaryRef} errors={submittedErrors} />
      {step === 'privacy' && (
        <PrivacyStep form={form} submittedErrors={submittedErrors} update={update} onContinue={handleContinue} onExit={openExitModal} />
      )}
      {step === 'vehicleSelection' && (
        <VehicleSelectionStep form={form} submittedErrors={submittedErrors} update={update} onBack={handleBack} onContinue={handleContinue} onExit={openExitModal} />
      )}
      {step === 'saleAndBuyer' && (
        <SaleAndBuyerStep form={form} submittedErrors={submittedErrors} update={update} onBack={handleBack} onContinue={handleContinue} onExit={openExitModal} />
      )}
      {step === 'review' && (
        <ReviewStep form={form} onBack={handleBack} onEditStep={goToReviewSource} onSubmit={handleContinue} onExit={openExitModal} />
      )}
      {step === 'confirmation' && <ConfirmationStep onStartAgain={resetTransaction} />}
      <ExitModal isOpen={exitModalOpen} onContinue={closeExitModal} onExit={resetTransaction} description='If you exit, the information entered will be cleared.' />
    </div>
  )
}

function NodFormHeader({ step }: { step: StepperStep }) {
  const currentIndex = stepperSteps.indexOf(step)
  return (
    <header
      aria-labelledby={`${step}-heading`}
      style={{ background: '#f4f4f4', borderBottom: '1px solid var(--gel-color-border)', borderTop: '1px solid var(--gel-color-border)', marginBottom: '1.5rem', padding: '1.5rem' }}
    >
      <ProgressStepper
        stepsList={stepperSteps.map((s, index) => ({
          content: stepLabels[s],
          status: index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'todo',
        }))}
      />
      <p style={{ color: 'var(--gel-color-text-grey)', fontSize: '0.875rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
        {transactionName}
      </p>
      <Heading level={2} id={`${step}-heading`} style={{ marginBottom: 0 }}>
        {stepLabels[step]}
      </Heading>
    </header>
  )
}

function errorsForStep(step: NodStep, form: FormState): StepError[] {
  const errs: StepError[] = []
  if (step === 'privacy' && !form.termsAccepted) {
    errs.push({ id: 'terms-and-conditions', text: 'Accept the Terms and Conditions to continue' })
  }
  if (step === 'vehicleSelection' && !form.vehicleSelected) {
    errs.push({ id: 'vehicle-selection', text: 'Select a vehicle to continue' })
  }
  if (step === 'saleAndBuyer') {
    if (!form.saleDateDay || !form.saleDateMonth || !form.saleDateYear) {
      errs.push({ id: 'sale-date-day', text: 'Enter the date of sale' })
    } else if (!isValidDate(form.saleDateDay, form.saleDateMonth, form.saleDateYear)) {
      errs.push({ id: 'sale-date-day', text: 'Enter a valid date of sale as DD/MM/YYYY' })
    }
    if (!form.salePrice.trim() || Number(form.salePrice) < 1) {
      errs.push({ id: 'sale-price', text: 'Enter the sale price or market value' })
    } else if (Number(form.salePrice) > 2000000) {
      errs.push({ id: 'sale-price', text: 'Enter an amount of no more than $2 million' })
    }
    if (!form.buyerType) errs.push({ id: 'buyer-type', text: 'Select who you sold the vehicle to' })
    if (form.buyerType === 'individual') {
      if (!form.buyerLicenceNumber.trim()) errs.push({ id: 'buyer-licence-number', text: 'Enter the buyer\'s NSW Driver Licence number' })
      if (!form.buyerFamilyName.trim()) errs.push({ id: 'buyer-family-name', text: 'Enter the buyer\'s family name' })
    }
    if (form.buyerType === 'dealer') {
      if (!form.dealerLicenceNumber.trim()) errs.push({ id: 'dealer-licence-number', text: 'Enter the NSW Motor dealer licence number' })
      if (!form.dealerBusinessName.trim()) errs.push({ id: 'dealer-business-name', text: 'Enter the registered business name' })
    }
  }
  return errs
}

function isValidDate(day: string, month: string, year: string) {
  if (!/^\d{1,2}$/.test(day) || !/^\d{1,2}$/.test(month) || !/^\d{4}$/.test(year)) return false
  const d = Number(day), m = Number(month), y = Number(year)
  const date = new Date(y, m - 1, d)
  return y >= 2020 && y <= 2026 && date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

function hasErr(errors: StepError[], id: string) { return errors.some((e) => e.id === id) }

// ---------------------------------------------------------------------------
// Privacy step
// ---------------------------------------------------------------------------
function PrivacyStep({ form, submittedErrors, update, onContinue, onExit }: { form: FormState; submittedErrors: StepError[]; update: (p: Partial<FormState>) => void; onContinue: () => void; onExit: () => void }) {
  const termsError = hasErr(submittedErrors, 'terms-and-conditions')
  return (
    <section aria-labelledby='privacy-heading'>
      <PrivacyCardPreview
        title='Privacy and terms'
        description='Read the Privacy Collection Notice and Terms and Conditions before continuing.'
        showAcknowledgement={false}
        sections={[
          { id: 'nod-privacy-collection-notice', title: 'Privacy Collection Notice', content: <p>Read the Privacy Collection Notice for this service before continuing.</p> },
          { id: 'nod-terms-and-conditions', title: 'Terms and Conditions', content: <p>Read the Terms and Conditions for Notice of Disposal before continuing.</p> },
          { id: 'nod-notifications', title: 'Notifications', content: <p>We will send you an email with the details of your notice of disposal after you complete and submit this form online.</p> },
        ]}
      />
      <Checkbox
        id='terms-and-conditions'
        label='I accept the terms and conditions for Notice of Disposal.'
        checked={form.termsAccepted}
        onChange={(value) => update({ termsAccepted: Boolean(value) })}
        hasError={termsError}
        errorMessage='Accept the Terms and Conditions to continue.'
      />
      <TransactionCtaGroup onContinue={onContinue} onExit={onExit} continueLabel='Continue' />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Vehicle selection step
// ---------------------------------------------------------------------------
function VehicleSelectionStep({ form, submittedErrors, update, onBack, onContinue, onExit }: { form: FormState; submittedErrors: StepError[]; update: (p: Partial<FormState>) => void; onBack: () => void; onContinue: () => void; onExit: () => void }) {
  const selectionErr = hasErr(submittedErrors, 'vehicle-selection')
  return (
    <section aria-labelledby='vehicleSelection-heading'>
      <p>Select the vehicle you sold to continue.</p>
      <section className='tapaas-card' aria-labelledby='eligible-vehicle-heading'>
        <Heading level={3} id='eligible-vehicle-heading' style={{ marginBottom: '0.5rem' }}>{mockVehicle.plate}</Heading>
        <dl className='tapaas-summary-list'>
          <div className='tapaas-summary-row'><dt>Vehicle</dt><dd>{mockVehicle.description}</dd></div>
          <div className='tapaas-summary-row'><dt>VIN/Chassis</dt><dd>{mockVehicle.vin}</dd></div>
          <div className='tapaas-summary-row'><dt>Registration expiry</dt><dd>{mockVehicle.regoExpiry}</dd></div>
        </dl>
        <Button
          onClick={() => update({ vehicleSelected: true })}
          aria-pressed={form.vehicleSelected}
          variant={form.vehicleSelected ? 'secondary' : 'primary'}
        >
          {form.vehicleSelected ? 'Vehicle selected' : 'Select vehicle'}
        </Button>
      </section>
      {selectionErr && (
        <p className='gel-field__error' role='alert' style={{ marginTop: '1rem' }}>Select a vehicle to continue.</p>
      )}
      <section aria-labelledby='search-another-heading' style={{ marginTop: '2rem' }}>
        <Heading level={3} id='search-another-heading'>Search for another vehicle</Heading>
        <Field id='search-plate' label='Enter a NSW plate number' helpMessage='For example ABC123. Do not include spaces or special characters.'>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Input id='search-plate' value={form.searchPlate} onChange={(e) => update({ searchPlate: e.target.value })} inputWidth='lg' />
            <Button variant='secondary' onClick={() => { /* mock search – no real lookup */ }}>Find vehicle</Button>
          </div>
        </Field>
      </section>
      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Sale and buyer details step
// ---------------------------------------------------------------------------
function SaleAndBuyerStep({ form, submittedErrors, update, onBack, onContinue, onExit }: { form: FormState; submittedErrors: StepError[]; update: (p: Partial<FormState>) => void; onBack: () => void; onContinue: () => void; onExit: () => void }) {
  const dateErr = hasErr(submittedErrors, 'sale-date-day')
  const priceErr = hasErr(submittedErrors, 'sale-price')
  const buyerTypeErr = hasErr(submittedErrors, 'buyer-type')
  const licenceErr = hasErr(submittedErrors, 'buyer-licence-number')
  const familyErr = hasErr(submittedErrors, 'buyer-family-name')
  const dealerLicErr = hasErr(submittedErrors, 'dealer-licence-number')
  const dealerNameErr = hasErr(submittedErrors, 'dealer-business-name')
  const dateHelpId = 'sale-date-help'

  return (
    <section aria-labelledby='saleAndBuyer-heading'>
      <div className='tapaas-card' style={{ borderLeft: '4px solid var(--gel-color-primary)', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Check that all information is accurate and truthful</p>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>It is a criminal offence to give false or misleading information.</p>
      </div>
      <p style={{ fontSize: '0.875rem', margin: '0 0 1.5rem' }}>All fields must be completed.</p>

      <Heading level={3}>Enter sale details</Heading>
      <fieldset aria-describedby={dateHelpId} style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
        <legend style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem' }}>Date of sale</legend>
        <p id={dateHelpId} style={{ fontSize: '0.875rem', margin: '0 0 0.5rem', color: 'var(--gel-color-text-grey)' }}>
          Enter the date you sold or disposed of the vehicle using the format DD/MM/YYYY.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div>
            <label htmlFor='sale-date-day' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Day</label>
            <Input id='sale-date-day' value={form.saleDateDay} onChange={(e) => update({ saleDateDay: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateErr} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='sale-date-month' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Month</label>
            <Input id='sale-date-month' value={form.saleDateMonth} onChange={(e) => update({ saleDateMonth: e.target.value.replace(/\D/g, '').slice(0, 2) })} hasError={dateErr} inputWidth='xxs' maxLength={2} />
          </div>
          <div>
            <label htmlFor='sale-date-year' style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Year</label>
            <Input id='sale-date-year' value={form.saleDateYear} onChange={(e) => update({ saleDateYear: e.target.value.replace(/\D/g, '').slice(0, 4) })} hasError={dateErr} inputWidth='sm' maxLength={4} />
          </div>
        </div>
        {dateErr && <p className='gel-field__error' id='sale-date-day-error'>Enter the date of sale as DD/MM/YYYY.</p>}
      </fieldset>

      <Field id='sale-price' label='Sale price or market value (whichever is higher)' helpMessage='Enter an amount of at least $1 and no more than $2 million. Do not include cents.' hasError={priceErr} errorMessage='Enter the sale price or market value.'>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 700 }}>$</span>
          <Input id='sale-price' value={form.salePrice} onChange={(e) => update({ salePrice: e.target.value.replace(/\D/g, '') })} hasError={priceErr} inputWidth='md' inputMode='numeric' />
        </div>
      </Field>

      <MoreInfoDisclosure triggerText='What to enter' title='Sale price and market value'>
        <p>You and the buyer must give the correct amount. Revenue NSW uses the amount to calculate stamp duty (motor vehicle duty).</p>
      </MoreInfoDisclosure>

      <Heading level={3}>Enter buyer details</Heading>
      <RadioButtonList
        id='buyer-type'
        legend={<strong>Who did you sell the vehicle to?</strong>}
        options={[
          { value: 'individual', label: 'Individual' },
          { value: 'dealer', label: 'Motor dealer' },
        ]}
        value={form.buyerType}
        onChange={(value) => update({ buyerType: String(value), buyerLicenceNumber: '', buyerFamilyName: '', dealerLicenceNumber: '', dealerBusinessName: '' })}
        hasError={buyerTypeErr}
        errorMessage='Select who you sold the vehicle to.'
      />
      <p style={{ fontSize: '0.875rem', margin: '0 0 1.5rem' }}>
        If you sold or disposed of your vehicle to a business, organisation or company, you need to submit a <TextLink href='#!'>paper form</TextLink>.
      </p>

      {form.buyerType === 'individual' && (
        <section aria-labelledby='buyer-details-heading'>
          <Heading level={4} id='buyer-details-heading'>Buyer details</Heading>
          <Field id='buyer-licence-number' label="Buyer's NSW Driver Licence number" helpMessage='Enter the numbers and letters on the card under Licence number.' hasError={licenceErr} errorMessage="Enter the buyer's NSW Driver Licence number.">
            <Input id='buyer-licence-number' value={form.buyerLicenceNumber} onChange={(e) => update({ buyerLicenceNumber: e.target.value })} hasError={licenceErr} inputWidth='md' />
          </Field>
          <Field id='buyer-family-name' label="Buyer's family name" helpMessage='The family name on the card is in CAPITAL LETTERS. Enter the family name exactly as it is on the licence.' hasError={familyErr} errorMessage="Enter the buyer's family name.">
            <Input id='buyer-family-name' value={form.buyerFamilyName} onChange={(e) => update({ buyerFamilyName: e.target.value })} hasError={familyErr} inputWidth='lg' />
          </Field>
        </section>
      )}

      {form.buyerType === 'dealer' && (
        <section aria-labelledby='dealer-details-heading'>
          <Heading level={4} id='dealer-details-heading'>Motor dealer details</Heading>
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Enter only the 1 to 6 digit licence number, no letters or spaces.</p>
          <Field id='dealer-licence-number' label='NSW Motor dealer licence number' hasError={dealerLicErr} errorMessage='Enter the NSW Motor dealer licence number.'>
            <Input id='dealer-licence-number' value={form.dealerLicenceNumber} onChange={(e) => update({ dealerLicenceNumber: e.target.value.replace(/\D/g, '').slice(0, 6) })} hasError={dealerLicErr} inputWidth='md' maxLength={6} />
          </Field>
          <Field id='dealer-business-name' label='Registered business name' helpMessage='You may find this name on official documents such as receipts and contracts. It may be different to the trading name used.' hasError={dealerNameErr} errorMessage='Enter the registered business name.'>
            <Input id='dealer-business-name' value={form.dealerBusinessName} onChange={(e) => update({ dealerBusinessName: e.target.value })} hasError={dealerNameErr} inputWidth='xl' />
          </Field>
        </section>
      )}

      <TransactionCtaGroup onBack={onBack} onContinue={onContinue} onExit={onExit} />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Review step
// ---------------------------------------------------------------------------
function ReviewStep({ form, onBack, onEditStep, onSubmit, onExit }: { form: FormState; onBack: () => void; onEditStep: (s: Exclude<NodStep, 'review' | 'confirmation'>) => void; onSubmit: () => void; onExit: () => void }) {
  const buyerRows = form.buyerType === 'dealer'
    ? [
        { label: 'Buyer type', value: 'Motor dealer' },
        { label: 'NSW Motor dealer licence number', value: form.dealerLicenceNumber },
        { label: 'Registered business name', value: form.dealerBusinessName },
      ]
    : [
        { label: 'Buyer type', value: 'Individual' },
        { label: "Buyer's NSW Driver Licence number", value: form.buyerLicenceNumber },
        { label: "Buyer's family name", value: form.buyerFamilyName },
      ]

  return (
    <section aria-labelledby='review-heading'>
      <div className='tapaas-card' style={{ borderLeft: '4px solid var(--gel-color-primary)', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Make sure all your details are correct</p>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>To make any changes after submission you will need to contact us.</p>
      </div>

      <DetailsCard
        title='Your details'
        description='These details come from your Service NSW Account.'
        rows={[{ label: 'Family name', value: accountProfile.familyName }]}
        headingLevel={3}
      />

      <ReviewInfoCard
        title='Vehicle details'
        sections={[{ title: 'Selected vehicle', rows: [
          { label: 'Plate number', value: mockVehicle.plate },
          { label: 'Vehicle', value: mockVehicle.description },
          { label: 'VIN/Chassis', value: mockVehicle.vin },
          { label: 'Registration expiry', value: mockVehicle.regoExpiry },
        ] }]}
        onEdit={() => onEditStep('vehicleSelection')}
      />

      <ReviewInfoCard
        title='Sale and buyer details'
        sections={[
          { title: 'Sale details', rows: [
            { label: 'Date of sale', value: `${form.saleDateDay}/${form.saleDateMonth}/${form.saleDateYear}` },
            { label: 'Sale price or market value', value: `$${form.salePrice}` },
          ] },
          { title: 'Buyer details', rows: buyerRows },
        ]}
        onEdit={() => onEditStep('saleAndBuyer')}
      />

      <Accordion
        id='review-privacy'
        items={[{
          title: 'Privacy',
          children: (
            <div>
              <Heading level={4}>Privacy Collection Notice</Heading>
              <p>Read the Privacy Collection Notice for this service.</p>
              <Heading level={4}>Terms and Conditions</Heading>
              <p>You have agreed to the Terms and Conditions for Notice of Disposal.</p>
              <Heading level={4}>Notifications</Heading>
              <p>We will send you an email with the details of your notice of disposal after you complete and submit this form online.</p>
            </div>
          ),
        }]}
      />

      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel='Submit' />
    </section>
  )
}

// ---------------------------------------------------------------------------
// Confirmation step
// ---------------------------------------------------------------------------
function ConfirmationStep({ onStartAgain }: { onStartAgain: () => void }) {
  return (
    <section aria-labelledby='confirmation-heading'>
      <ConfirmationHeader title='Notice of Disposal submitted' transactionName={transactionName} />

      <TransactionSummaryCard
        heading='Summary'
        items={[
          { label: 'Receipt number', value: receipt.referenceNumber },
          { label: 'Date of transaction', value: receipt.transactionDate },
        ]}
      />

      <div className='tapaas-card' style={{ borderLeft: '4px solid var(--gel-color-info)', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Notify the buyer</p>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>Let the new vehicle owner know you have completed a Notice of Disposal so they can transfer the vehicle registration and avoid any late fees.</p>
      </div>

      <section className='tapaas-card' aria-labelledby='keep-a-record-heading'>
        <Heading level={2} id='keep-a-record-heading'>Keep a record</Heading>
        <p>Save a copy of this receipt for your records.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant='secondary' onClick={() => window.print()}>Download receipt</Button>
          <Button variant='secondary' onClick={() => window.print()}>Print receipt</Button>
        </div>
      </section>

      <section aria-labelledby='next-steps-heading'>
        <Heading level={2} id='next-steps-heading'>Next steps</Heading>
        <Heading level={3}>Insurance</Heading>
        <p>Your compulsory third party (CTP) insurance for the vehicle will automatically transfer to the new owner.</p>
        <Heading level={3}>E-tag or toll pass</Heading>
        <p>Remove any tags or passes from the vehicle and delete the registration number from your account(s).</p>
        <Heading level={3}>Personalised or special number plates</Heading>
        <p>If you want to keep your personalised or special number plates you can reserve and replace them, or exchange them with another vehicle registered in your name.</p>
      </section>

      <section className='tapaas-card' aria-labelledby='feedback-heading'>
        <Heading level={2} id='feedback-heading'>Help us improve</Heading>
        <p>Tell us about your experience by answering a few questions. <TextLink href='#!'>Give feedback</TextLink></p>
      </section>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <Button onClick={onStartAgain}>Submit another Notice of Disposal</Button>
        <Button variant='secondary' onClick={() => { /* mock nav */ }}>Go to my account</Button>
      </div>
      <p style={{ marginTop: '1rem' }}><TextLink href='#!'>Log out</TextLink></p>
    </section>
  )
}
