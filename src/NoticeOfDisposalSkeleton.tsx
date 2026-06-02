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
  saleDate: string
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
  saleDate: '',
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
    if (!form.saleDate.trim()) {
      errs.push({ id: 'sale-date', text: 'Enter the date of sale' })
    } else if (!isValidDate(form.saleDate)) {
      errs.push({ id: 'sale-date', text: 'Enter a valid date of sale as DD/MM/YYYY' })
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

function isValidDate(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return false
  const [, day, month, year] = match
  const d = Number(day), m = Number(month), y = Number(year)
  const date = new Date(y, m - 1, d)
  return y >= 2020 && y <= 2026 && date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

function formatDateInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

function hasErr(errors: StepError[], id: string) { return errors.some((e) => e.id === id) }

function NodRuleCallout({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ borderLeft: '6px solid var(--gel-color-primary)', margin: '0 0 1.5rem', padding: '0.75rem 0 0.75rem 1.25rem' }}>
      <p style={{ fontWeight: 700, margin: '0 0 0.5rem' }}>{title}</p>
      <p style={{ margin: 0 }}>{body}</p>
    </div>
  )
}

function NodCalendarPopover() {
  const days = [
    ['26', '27', '28', '30', '31', '1', '2'],
    ['3', '4', '5', '6', '7', '8', '9'],
    ['10', '11', '12', '13', '14', '15', '16'],
    ['17', '18', '19', '20', '21', '22', '23'],
    ['24', '25', '26', '27', '28', '29', '30'],
    ['31', '1', '2', '3', '4', '5', '6'],
  ]
  const mutedDays = new Set(['26', '27', '28', '30', '31', '1', '2', '3', '4', '5', '6'])

  return (
    <div
      role='dialog'
      aria-label='Calendar'
      style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.18)',
        left: 0,
        padding: '1.25rem',
        position: 'absolute',
        top: '3.35rem',
        width: '20rem',
        zIndex: 10,
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.75rem', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <strong>Aug 2023</strong>
        <span aria-hidden='true' style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ background: '#edf1f4', borderRadius: '50%', display: 'inline-block', height: '2rem', position: 'relative', width: '2rem' }} />
          <span style={{ background: '#edf1f4', borderRadius: '50%', display: 'inline-block', height: '2rem', position: 'relative', width: '2rem' }} />
        </span>
      </div>
      <div style={{ columnGap: '0.75rem', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: '0.75rem', textAlign: 'center' }}>
        {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map((day) => (
          <strong key={day} style={{ fontSize: '0.75rem' }}>{day}</strong>
        ))}
        {days.flat().map((day, index) => {
          const selected = day === '12' && index === 16
          return (
            <span
              key={`${day}-${index}`}
              aria-current={selected ? 'date' : undefined}
              style={{
                alignItems: 'center',
                background: selected ? '#2e5aac' : 'transparent',
                borderRadius: '50%',
                color: selected ? '#fff' : mutedDays.has(day) ? '#7f8794' : '#22272b',
                display: 'inline-flex',
                fontWeight: selected ? 700 : 600,
                height: '2rem',
                justifyContent: 'center',
                width: '2rem',
              }}
            >
              {day}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function NswDriverLicenceHelper() {
  return (
    <figure
      aria-label='NSW Driver Licence guide'
      style={{
        margin: '0 0 1.5rem',
        maxWidth: '28rem',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          gap: '0.75rem',
          gridTemplateColumns: '7rem 12rem 7rem',
        }}
      >
        <div style={{ display: 'grid', gap: '0.35rem', fontSize: '0.875rem', fontWeight: 700, justifyItems: 'end' }}>
          <span>Name</span>
          <span>Licence number</span>
          <span>Date of birth</span>
        </div>
        <div
          style={{
            background: '#eef2f6',
            border: '1px solid #c3c8cf',
            borderRadius: '10px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
            minHeight: '6.4rem',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div style={{ background: '#f7e500', color: '#22272b', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.75rem' }}>New South Wales</div>
          <div style={{ padding: '0.45rem 0.75rem' }}>
            <div style={{ display: 'flex', fontSize: '0.75rem', fontWeight: 700, justifyContent: 'space-between' }}>
              <span>Jay Citizen</span>
              <span>1234 567 890</span>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '0.55rem' }}>12345678</div>
            <div aria-hidden='true' style={{ background: '#9aa0a8', borderRadius: '50%', height: '2rem', margin: '-0.65rem 0 0 auto', width: '2rem' }} />
            <div style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '0.35rem', textAlign: 'center' }}>01/01/2000</div>
          </div>
        </div>
        <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Card number</div>
      </div>
      <figcaption style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Use the licence number and family name exactly as they appear on the buyer's NSW Driver Licence.</figcaption>
    </figure>
  )
}

function ReceiptSummaryPanel() {
  return (
    <dl
      style={{
        background: '#f3f6f8',
        display: 'grid',
        gap: '0.75rem 4rem',
        gridTemplateColumns: 'minmax(10rem, 1fr) minmax(10rem, 2fr)',
        margin: '1.5rem 0',
        maxWidth: '42rem',
        padding: '1.5rem',
      }}
    >
      <dt>Receipt number</dt>
      <dd style={{ fontWeight: 700, margin: 0 }}>{receipt.referenceNumber}</dd>
      <dt>Date of transaction</dt>
      <dd style={{ fontWeight: 700, margin: 0 }}>{receipt.transactionDate}</dd>
    </dl>
  )
}

function RecordAction({ icon, label }: { icon: 'download' | 'print'; label: string }) {
  return (
    <TextLink href='#!'>
      <span
        aria-hidden='true'
        style={{
          border: '2px solid var(--gel-color-primary)',
          borderTop: icon === 'download' ? 0 : '2px solid var(--gel-color-primary)',
          display: 'inline-block',
          height: icon === 'download' ? '0.75rem' : '0.9rem',
          marginRight: '0.5rem',
          position: 'relative',
          top: '0.12rem',
          width: '0.9rem',
        }}
      />
      {label}
    </TextLink>
  )
}

function NodExperienceBar() {
  return (
    <section
      aria-label='Online experience feedback'
      style={{
        alignItems: 'center',
        background: '#2f5da9',
        color: '#fff',
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
        marginTop: '2rem',
        maxWidth: '48rem',
        minHeight: '2.875rem',
        padding: '0.5rem 1rem',
      }}
    >
      <span>How was your online experience today?</span>
      {['Like', 'Comment', 'Dislike'].map((label) => (
        <button
          key={label}
          type='button'
          aria-label={label}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.9)',
            color: '#fff',
            cursor: 'pointer',
            minHeight: '1.5rem',
            minWidth: '1.5rem',
          }}
        >
          <span aria-hidden='true'>{label.slice(0, 1)}</span>
        </button>
      ))}
    </section>
  )
}

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
  const [calendarOpen, setCalendarOpen] = useState(false)
  const dateErr = hasErr(submittedErrors, 'sale-date')
  const priceErr = hasErr(submittedErrors, 'sale-price')
  const buyerTypeErr = hasErr(submittedErrors, 'buyer-type')
  const licenceErr = hasErr(submittedErrors, 'buyer-licence-number')
  const familyErr = hasErr(submittedErrors, 'buyer-family-name')
  const dealerLicErr = hasErr(submittedErrors, 'dealer-licence-number')
  const dealerNameErr = hasErr(submittedErrors, 'dealer-business-name')
  const dateHelpId = 'sale-date-help'

  return (
    <section aria-labelledby='saleAndBuyer-heading'>
      <NodRuleCallout
        title='Check that all information is accurate and truthful'
        body='It is a criminal offence to give false or misleading information.'
      />
      <p style={{ fontSize: '0.875rem', margin: '0 0 1.5rem' }}>All fields must be completed.</p>

      <Heading level={3}>Enter sale details</Heading>
      <Field
        id='sale-date'
        label='Date of sale'
        helpMessage='Enter date you sold or disposed of the vehicle using the format DD/MM/YYYY.'
        hasError={dateErr}
        errorMessage='Enter the date of sale as DD/MM/YYYY.'
      >
        <div style={{ position: 'relative', width: '21.5rem', maxWidth: '100%' }}>
          <div
            data-testid='sale-date-field'
            style={{
              alignItems: 'stretch',
              display: 'flex',
              maxWidth: '100%',
              width: '21.5rem',
            }}
          >
            <input
              id='sale-date'
              aria-describedby={`${dateHelpId}${dateErr ? ' sale-date-error' : ''}`}
              aria-invalid={dateErr || undefined}
              value={form.saleDate}
              onChange={(e) => update({ saleDate: formatDateInput(e.target.value) })}
              inputMode='numeric'
              maxLength={10}
              placeholder='DD/MM/YYYY'
              style={{
                borderBottom: `1px solid ${dateErr ? 'var(--gel-color-error)' : 'var(--gel-color-border)'}`,
                borderLeft: `1px solid ${dateErr ? 'var(--gel-color-error)' : 'var(--gel-color-border)'}`,
                borderRight: 0,
                borderRadius: '4px 0 0 4px',
                borderTop: `1px solid ${dateErr ? 'var(--gel-color-error)' : 'var(--gel-color-border)'}`,
                flex: '1 1 auto',
                font: 'inherit',
                minHeight: '3rem',
                minWidth: 0,
                padding: '0.75rem 1rem',
              }}
            />
            <button
              type='button'
              aria-label='Open calendar'
              aria-expanded={calendarOpen}
              onClick={() => setCalendarOpen((open) => !open)}
              style={{
                alignItems: 'center',
                background: '#f4f7f9',
                border: `1px solid ${dateErr ? 'var(--gel-color-error)' : 'var(--gel-color-border)'}`,
                borderRadius: '0 4px 4px 0',
                color: 'var(--gel-color-primary)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '3rem',
                width: '3.25rem',
              }}
            >
              <span aria-hidden='true' style={{ border: '2px solid currentColor', borderRadius: '2px', display: 'inline-block', height: '1.1rem', position: 'relative', width: '1.1rem' }}>
                <span style={{ background: 'currentColor', height: '2px', left: 0, position: 'absolute', right: 0, top: '0.28rem' }} />
              </span>
            </button>
          </div>
          {calendarOpen && <NodCalendarPopover />}
        </div>
      </Field>

      <Field id='sale-price' label='Sale price or market value (whichever is higher)' helpMessage='Enter an amount of at least $1 and no more than $2 million. Do not include cents.' hasError={priceErr} errorMessage='Enter the sale price or market value.'>
        <div
          data-testid='sale-price-field'
          style={{
            alignItems: 'stretch',
            display: 'flex',
            maxWidth: '100%',
            width: '21.5rem',
          }}
        >
          <span
            data-testid='sale-price-prefix'
            aria-hidden='true'
            style={{
              alignItems: 'center',
              background: '#f4f4f4',
              border: `1px solid ${priceErr ? 'var(--gel-color-error)' : 'var(--gel-color-border)'}`,
              borderRadius: '4px 0 0 4px',
              display: 'flex',
              fontWeight: 700,
              justifyContent: 'center',
              minHeight: '3rem',
              width: '3rem',
            }}
          >
            $
          </span>
          <input
            id='sale-price'
            aria-invalid={priceErr || undefined}
            value={form.salePrice}
            onChange={(e) => update({ salePrice: e.target.value.replace(/\D/g, '') })}
            inputMode='numeric'
            style={{
              borderBottom: `1px solid ${priceErr ? 'var(--gel-color-error)' : 'var(--gel-color-border)'}`,
              borderLeft: 0,
              borderRadius: '0 4px 4px 0',
              borderRight: `1px solid ${priceErr ? 'var(--gel-color-error)' : 'var(--gel-color-border)'}`,
              borderTop: `1px solid ${priceErr ? 'var(--gel-color-error)' : 'var(--gel-color-border)'}`,
              flex: '1 1 auto',
              font: 'inherit',
              minHeight: '3rem',
              minWidth: 0,
              padding: '0.75rem 1rem',
            }}
          />
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
          <NswDriverLicenceHelper />
          <Field id='buyer-licence-number' label="Buyer's NSW Driver Licence number" helpMessage="Enter the numbers and letters on the card under 'Licence number'." hasError={licenceErr} errorMessage="Enter the buyer's NSW Driver Licence number.">
            <Input id='buyer-licence-number' value={form.buyerLicenceNumber} onChange={(e) => update({ buyerLicenceNumber: e.target.value })} hasError={licenceErr} inputWidth='md' />
          </Field>
          <p style={{ marginTop: '-0.5rem' }}>
            <TextLink href='#!'>Buyer does not have a NSW Driver Licence?</TextLink>
            <span aria-hidden='true' style={{ border: '2px solid var(--gel-color-primary)', borderRadius: '50%', color: 'var(--gel-color-primary)', display: 'inline-flex', fontSize: '0.75rem', fontWeight: 700, height: '1rem', justifyContent: 'center', lineHeight: '0.8rem', marginLeft: '0.4rem', width: '1rem' }}>i</span>
          </p>
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
      <NodRuleCallout
        title='Make sure all your details are correct'
        body='To make any changes after submission you will need to contact us.'
      />

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
            { label: 'Date of sale', value: form.saleDate },
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

      <section aria-labelledby='summary-heading'>
        <Heading level={2} id='summary-heading'>Summary</Heading>
        <p>You have successfully submitted a Notice of Disposal for {mockVehicle.plate}.</p>
        <p>
          A receipt has been emailed to <strong>{'{samplemail@gmail.com.au}'}</strong>.{' '}
          <TextLink href='#!'>Send to another email</TextLink>
        </p>
        <ReceiptSummaryPanel />
      </section>

      <NodRuleCallout
        title='Notify the buyer'
        body='Let the new vehicle owner know you have completed a Notice of Disposal so they can transfer the vehicle registration and avoid any late fees.'
      />

      <section aria-labelledby='keep-a-record-heading'>
        <Heading level={2} id='keep-a-record-heading'>Keep a record</Heading>
        <div style={{ display: 'grid', gap: '0.75rem', justifyItems: 'start', marginBottom: '0.75rem' }}>
          <RecordAction icon='download' label='Download receipt (PDF 5KB)' />
          <RecordAction icon='print' label='Print receipt' />
          <p style={{ fontWeight: 700, margin: 0 }}>
            <span aria-hidden='true' style={{ border: '2px solid var(--gel-color-text)', display: 'inline-block', height: '0.75rem', marginRight: '0.5rem', position: 'relative', top: '0.1rem', width: '1rem' }} />
            Email receipt
          </p>
          <input
            aria-label='Email receipt address'
            style={{
              border: '1px solid var(--gel-color-border)',
              borderRadius: '4px',
              font: 'inherit',
              minHeight: '3rem',
              padding: '0.75rem 1rem',
              width: '18rem',
            }}
          />
          <Button variant='secondary' onClick={() => { /* preview only, no email is sent */ }}>Send</Button>
        </div>
      </section>

      <section aria-labelledby='next-steps-heading'>
        <Heading level={2} id='next-steps-heading'>Next steps</Heading>
        <Heading level={3}>Insurance</Heading>
        <p>Your compulsory third party (CTP) insurance for the vehicle, also known as a green slip, will automatically transfer to the new owner. <strong>You don't need to do anything.</strong></p>
        <p>If you have comprehensive insurance cover, contact your provider and remove the vehicle from the policy.</p>
        <Heading level={3}>E-tag or toll pass</Heading>
        <p>
          Make sure you are not charged for the new owner's toll use. Remove any tags or passes from the vehicle and delete the registration number from your account(s). For more information, visit <TextLink href='#!'>Tolls</TextLink>.
        </p>
        <Heading level={3}>Personalised or special number plates</Heading>
        <p>If you want to keep your personalised or special number plates you can either:</p>
        <ul>
          <li><TextLink href='#!'>reserve and replace</TextLink> them with general number plates, or</li>
          <li>exchange them with another vehicle registered in your name.</li>
        </ul>
      </section>

      <section aria-labelledby='feedback-heading'>
        <Heading level={2} id='feedback-heading'>Help us improve</Heading>
        <p>
          Tell us about your experience by answering a few questions. <TextLink href='#!'>Give feedback</TextLink>
          <span aria-hidden='true' style={{ border: '1px solid var(--gel-color-primary)', display: 'inline-block', height: '0.75rem', marginLeft: '0.25rem', position: 'relative', top: '0.1rem', width: '0.75rem' }} />
        </p>
      </section>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <Button onClick={onStartAgain}>Submit another Notice of Disposal</Button>
        <Button variant='secondary' onClick={() => { /* mock nav */ }}>Go to my account</Button>
      </div>
      <p style={{ marginTop: '1rem' }}>
        <TextLink href='#!'>
          Log out <span aria-hidden='true' style={{ border: '1px solid var(--gel-color-primary)', display: 'inline-block', height: '0.75rem', marginLeft: '0.25rem', position: 'relative', top: '0.1rem', width: '0.75rem' }} />
        </TextLink>
      </p>
      <NodExperienceBar />
    </section>
  )
}
