import React from 'react'
import { Accordion, Button, Checkbox, Field, Heading, InPageAlert, Input, Select, TextLink } from '../gel'
import './styles.css'

export interface SummaryItem {
  label: string
  value: React.ReactNode
  helpText?: React.ReactNode
}

export interface ReviewSection {
  title: string
  rows: SummaryItem[]
}

export interface FeeItem {
  label: string
  amount: string
}

export interface EvidenceChecklistItem {
  id: string
  label: string
  description?: string
  status: 'required' | 'provided' | 'not-required' | 'needs-review'
}

export interface MpsMedicalEvidenceStatusPreviewProps {
  evidenceType?: 'certificate' | 'report'
  state?: 'required' | 'provided'
  fileName?: string
  idPrefix?: string
}

export interface AssessmentSummaryItem {
  label: string
  value: React.ReactNode
  tone?: 'neutral' | 'good' | 'warning' | 'error'
}

export interface DeclarationReviewSection {
  title: string
  statements: React.ReactNode[]
}

export interface RadioButtonCardOption {
  value: string
  label: string
  description?: React.ReactNode
  pictogram?: React.ReactNode
}

export interface BackendErrorExample {
  code: string
  title: string
  message: string
  guidance: string
  reference: string
}

export interface MpsReviewFrameSection {
  id: string
  title: string
  rows: SummaryItem[]
  editLabel?: string
}

export interface MpsConfirmationNextStep {
  id: string
  content: React.ReactNode
}

export interface NextStepsCardItem {
  id: string
  heading: React.ReactNode
  body: React.ReactNode
}

export interface NextStepsCardPreviewProps {
  heading?: string
  items: NextStepsCardItem[]
  showStepNumbers?: boolean
  showIcon?: boolean
  headingLevel?: 2 | 3
}

export interface TapaasSearchActionProps {
  id?: string
  label?: string
  helpText?: string
  buttonLabel?: string
  placeholder?: string
  defaultValue?: string
}

export interface PrivacyCardSection {
  id: string
  title: string
  content: React.ReactNode
}

export interface PrivacyCardPreviewProps {
  title?: string
  description?: React.ReactNode
  sections?: PrivacyCardSection[]
  acknowledgementLabel?: React.ReactNode
  acknowledgementChecked?: boolean
  onAcknowledgementChange?: (value: string) => void
  showAcknowledgement?: boolean
  hasError?: boolean
  errorMessage?: string
}

export interface MpsApplicantDetailsFrameValue {
  firstName?: string
  lastName?: string
  dateOfBirthDay?: string
  dateOfBirthMonth?: string
  dateOfBirthYear?: string
  residentialAddress?: string
  unitNumber?: string
  streetNumber?: string
  streetName?: string
  streetType?: string
  suburb?: string
  state?: string
  postcode?: string
  email?: string
  phone?: string
}

export interface MpsApplicantDetailsFramePreviewProps {
  addressMode?: 'search' | 'manual'
  idPrefix?: string
  value?: MpsApplicantDetailsFrameValue
  onChange?: (value: MpsApplicantDetailsFrameValue) => void
  onManualAddress?: () => void
  onAddressSearch?: () => void
  onBack?: () => void
  onContinue?: () => void
  showErrors?: boolean
}

export interface EmailConfirmationModalProps {
  isOpen: boolean
  emailAddress: string
  onSend: () => void
  onEdit: () => void
  onDismiss?: () => void
  title?: string
  sendLabel?: string
  editLabel?: string
}

export function ConfirmationHeader({
  title,
  transactionName,
  headingLevel = 2,
}: {
  title: string
  transactionName: string
  headingLevel?: 1 | 2 | 3
}) {
  return (
    <header className='tapaas-confirmation-header' role='status' aria-label='Transaction completed'>
      <span className='tapaas-confirmation-icon' aria-hidden='true'>✓</span>
      <div>
        <p className='tapaas-kicker'>{transactionName}</p>
        <Heading level={headingLevel} style={{ marginBottom: 0 }}>{title}</Heading>
      </div>
    </header>
  )
}

export function TransactionSummaryCard({
  heading = 'Summary',
  items,
  children,
}: {
  heading?: string
  items: SummaryItem[]
  children?: React.ReactNode
}) {
  return (
    <section className='tapaas-card' aria-labelledby='transaction-summary-heading'>
      <Heading level={2} style={{ marginBottom: '1rem' }} id='transaction-summary-heading'>
        {heading}
      </Heading>
      <dl className='tapaas-summary-list'>
        {items.map((item) => (
          <div className='tapaas-summary-row' key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.value}
              {item.helpText && <p className='tapaas-help-text'>{item.helpText}</p>}
            </dd>
          </div>
        ))}
      </dl>
      {children && <div className='tapaas-card-extra'>{children}</div>}
    </section>
  )
}

export function ReviewInfoCard({
  title,
  sections,
  onEdit,
}: {
  title: string
  sections: ReviewSection[]
  onEdit?: () => void
}) {
  return (
    <section className='tapaas-card tapaas-review-card' aria-labelledby={`${slugify(title)}-heading`}>
      <div className='tapaas-card-heading-row'>
        <Heading level={3} style={{ marginBottom: 0 }} id={`${slugify(title)}-heading`}>
          {title}
        </Heading>
        {onEdit && (
          <TextLink onClick={onEdit}>Edit {title}</TextLink>
        )}
      </div>
      {sections.map((section) => (
        <div className='tapaas-review-section' key={section.title}>
          <Heading level={4}>{section.title}</Heading>
          <dl className='tapaas-summary-list'>
            {section.rows.map((row) => (
              <div className='tapaas-summary-row' key={`${section.title}-${row.label}`}>
                <dt>{row.label}</dt>
                <dd>
                  {row.value}
                  {row.helpText && <p className='tapaas-help-text'>{row.helpText}</p>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </section>
  )
}

export function ReviewFeesCard({
  title = 'Fees',
  fees,
  totalLabel = 'Total amount due',
  totalAmount,
}: {
  title?: string
  fees: FeeItem[]
  totalLabel?: string
  totalAmount: string
}) {
  return (
    <section className='tapaas-card tapaas-fees-card' aria-labelledby='review-fees-heading'>
      <Heading level={3} id='review-fees-heading'>{title}</Heading>
      <dl className='tapaas-summary-list'>
        {fees.map((fee) => (
          <div className='tapaas-summary-row' key={fee.label}>
            <dt>{fee.label}</dt>
            <dd>{fee.amount}</dd>
          </div>
        ))}
        <div className='tapaas-summary-row tapaas-total-row'>
          <dt>{totalLabel}</dt>
          <dd>{totalAmount}</dd>
        </div>
      </dl>
    </section>
  )
}

// ---------------------------------------------------------------------------
// MpsApplicantDetailsFramePreview
// MPS applicant-details frame pattern extracted as a paired sequence from
// `MPS Final` frames `2.A - Personal details` (`0:17387`) and
// `2.B - Personal details - Manual address` (`0:17405`).
// Address lookup, identity, persistence, age eligibility and policy logic stay unresolved.
// ---------------------------------------------------------------------------
export function MpsApplicantDetailsFramePreview({
  addressMode = 'search',
  idPrefix,
  value,
  onChange,
  onManualAddress,
  onAddressSearch,
  onBack,
  onContinue,
  showErrors = false,
}: MpsApplicantDetailsFramePreviewProps) {
  const formValue = value || {}
  const headingId = scopedId('mps-applicant-frame-heading', idPrefix)

  function update(field: keyof MpsApplicantDetailsFrameValue, nextValue: string) {
    onChange?.({ ...formValue, [field]: nextValue })
  }

  const requiredErrors = getMpsApplicantDetailsErrors(formValue, addressMode)

  return (
    <section
      className='tapaas-mps-applicant-frame'
      aria-labelledby={headingId}
      data-tapaas-component='mps-applicant-details-frame-preview'
      data-preview-boundary='preview implementation; mock form capture only; not production-approved'
    >
      <p className='tapaas-mps-applicant-frame__step'>Step 1 of 4</p>
      <Heading level={2} id={headingId}>Personal details</Heading>
      <p className='tapaas-mps-applicant-frame__hint'>
        <span>*</span> indicates a required field
      </p>
      {showErrors && requiredErrors.length > 0 && (
        <InPageAlert variant='error' title='Check the applicant details'>
          <ul>
            {requiredErrors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </InPageAlert>
      )}
      <div className='tapaas-mps-applicant-frame__section'>
        <Field id={scopedId('mps-applicant-first-name', idPrefix)} label='First name *' hasError={showErrors && !formValue.firstName?.trim()} errorMessage='Enter a first name.'>
          <Input id={scopedId('mps-applicant-first-name', idPrefix)} value={formValue.firstName || ''} onChange={(event) => update('firstName', event.target.value)} inputWidth='xl' autoComplete='given-name' />
        </Field>
        <Field id={scopedId('mps-applicant-last-name', idPrefix)} label='Last name *' hasError={showErrors && !formValue.lastName?.trim()} errorMessage='Enter a last name.'>
          <Input id={scopedId('mps-applicant-last-name', idPrefix)} value={formValue.lastName || ''} onChange={(event) => update('lastName', event.target.value)} inputWidth='xl' autoComplete='family-name' />
        </Field>
        <MpsDateInputGroup value={formValue} update={update} showErrors={showErrors} idPrefix={idPrefix} />
      </div>
      <div className='tapaas-mps-applicant-frame__section'>
        <Heading level={3}>Contact details</Heading>
        {addressMode === 'manual' ? (
          <MpsManualAddressGroup value={formValue} update={update} onAddressSearch={onAddressSearch} showErrors={showErrors} idPrefix={idPrefix} />
        ) : (
          <MpsAddressSearchGroup value={formValue} update={update} onManualAddress={onManualAddress} showErrors={showErrors} idPrefix={idPrefix} />
        )}
        <Field id={scopedId('mps-applicant-email', idPrefix)} label='Email address *' hasError={showErrors && !formValue.email?.trim()} errorMessage='Enter an email address.'>
          <Input id={scopedId('mps-applicant-email', idPrefix)} value={formValue.email || ''} onChange={(event) => update('email', event.target.value)} inputWidth='xl' autoComplete='email' />
        </Field>
        <Field
          id={scopedId('mps-applicant-phone', idPrefix)}
          label='Phone number *'
          helpMessage='Enter your phone number using 10 digits with no spaces or symbols. Include the area code if you are entering a landline.'
          hasError={showErrors && !formValue.phone?.trim()}
          errorMessage='Enter a phone number.'
        >
          <Input id={scopedId('mps-applicant-phone', idPrefix)} value={formValue.phone || ''} onChange={(event) => update('phone', event.target.value)} inputWidth='xl' autoComplete='tel' inputMode='tel' />
        </Field>
      </div>
      <div className='tapaas-mps-applicant-frame__actions' role='group' aria-label='Applicant details actions'>
        {onBack ? <Button variant='secondary' onClick={onBack}>Cancel</Button> : <span aria-hidden='true' />}
        {onContinue && <Button onClick={onContinue}>Next</Button>}
      </div>
    </section>
  )
}

function MpsDateInputGroup({
  value,
  update,
  showErrors,
  idPrefix,
}: {
  value: MpsApplicantDetailsFrameValue
  update: (field: keyof MpsApplicantDetailsFrameValue, nextValue: string) => void
  showErrors: boolean
  idPrefix?: string
}) {
  const hasDateError = showErrors && (!value.dateOfBirthDay?.trim() || !value.dateOfBirthMonth?.trim() || !value.dateOfBirthYear?.trim())
  const errorId = scopedId('mps-applicant-date-of-birth-error', idPrefix)

  return (
    <fieldset className='tapaas-mps-date-group' aria-describedby={hasDateError ? errorId : undefined} aria-invalid={hasDateError || undefined}>
      <legend>Date of birth *</legend>
      <div className='tapaas-mps-date-group__fields'>
        <Field id={scopedId('mps-applicant-dob-day', idPrefix)} label='Day'>
          <Input id={scopedId('mps-applicant-dob-day', idPrefix)} value={value.dateOfBirthDay || ''} onChange={(event) => update('dateOfBirthDay', event.target.value)} inputWidth='xxs' placeholder='DD' autoComplete='bday-day' inputMode='numeric' maxLength={2} />
        </Field>
        <Field id={scopedId('mps-applicant-dob-month', idPrefix)} label='Month'>
          <Select
            id={scopedId('mps-applicant-dob-month', idPrefix)}
            value={value.dateOfBirthMonth || ''}
            onChange={(event) => update('dateOfBirthMonth', event.target.value)}
            inputWidth='xs'
            options={[
              { value: 'jan', text: 'Jan' },
              { value: 'feb', text: 'Feb' },
              { value: 'mar', text: 'Mar' },
              { value: 'apr', text: 'Apr' },
              { value: 'may', text: 'May' },
              { value: 'jun', text: 'Jun' },
              { value: 'jul', text: 'Jul' },
              { value: 'aug', text: 'Aug' },
              { value: 'sep', text: 'Sep' },
              { value: 'oct', text: 'Oct' },
              { value: 'nov', text: 'Nov' },
              { value: 'dec', text: 'Dec' },
            ]}
            placeholder='MMM'
            autoComplete='bday-month'
          />
        </Field>
        <Field id={scopedId('mps-applicant-dob-year', idPrefix)} label='Year'>
          <Input id={scopedId('mps-applicant-dob-year', idPrefix)} value={value.dateOfBirthYear || ''} onChange={(event) => update('dateOfBirthYear', event.target.value)} inputWidth='xs' placeholder='YYYY' autoComplete='bday-year' inputMode='numeric' maxLength={4} />
        </Field>
      </div>
      {hasDateError && (
        <div id={errorId} className='tapaas-mps-applicant-frame__inline-error'>
          Enter a date of birth.
        </div>
      )}
    </fieldset>
  )
}

function MpsAddressSearchGroup({
  value,
  update,
  onManualAddress,
  showErrors,
  idPrefix,
}: {
  value: MpsApplicantDetailsFrameValue
  update: (field: keyof MpsApplicantDetailsFrameValue, nextValue: string) => void
  onManualAddress?: () => void
  showErrors: boolean
  idPrefix?: string
}) {
  return (
    <div className='tapaas-mps-address-search'>
      <div className='tapaas-mps-address-search__heading'>
        <Field
          id={scopedId('mps-applicant-residential-address', idPrefix)}
          label='Residential address *'
          helpMessage='Start typing and select your address from the results that appear. If you are unable to locate your address please enter it manually.'
          hasError={showErrors && !value.residentialAddress?.trim()}
          errorMessage='Enter a residential address.'
        >
          <Input id={scopedId('mps-applicant-residential-address', idPrefix)} value={value.residentialAddress || ''} onChange={(event) => update('residentialAddress', event.target.value)} inputWidth='xl' autoComplete='street-address' />
        </Field>
        {onManualAddress && (
          <button type='button' className='tapaas-mps-applicant-frame__text-action' onClick={onManualAddress}>
            Enter address manually
          </button>
        )}
      </div>
    </div>
  )
}

function MpsManualAddressGroup({
  value,
  update,
  onAddressSearch,
  showErrors,
  idPrefix,
}: {
  value: MpsApplicantDetailsFrameValue
  update: (field: keyof MpsApplicantDetailsFrameValue, nextValue: string) => void
  onAddressSearch?: () => void
  showErrors: boolean
  idPrefix?: string
}) {
  return (
    <fieldset className='tapaas-mps-manual-address'>
      <legend>Residential address</legend>
      {onAddressSearch && (
        <button type='button' className='tapaas-mps-applicant-frame__text-action' onClick={onAddressSearch}>
          Back to search
        </button>
      )}
      <Field id={scopedId('mps-applicant-unit-number', idPrefix)} label='Unit number'>
        <Input id={scopedId('mps-applicant-unit-number', idPrefix)} value={value.unitNumber || ''} onChange={(event) => update('unitNumber', event.target.value)} inputWidth='xl' autoComplete='address-line2' />
      </Field>
      <Field id={scopedId('mps-applicant-street-number', idPrefix)} label='Street number *' hasError={showErrors && !value.streetNumber?.trim()} errorMessage='Enter a street number.'>
        <Input id={scopedId('mps-applicant-street-number', idPrefix)} value={value.streetNumber || ''} onChange={(event) => update('streetNumber', event.target.value)} inputWidth='xl' autoComplete='address-line1' />
      </Field>
      <Field id={scopedId('mps-applicant-street-name', idPrefix)} label='Street name *' hasError={showErrors && !value.streetName?.trim()} errorMessage='Enter a street name.'>
        <Input id={scopedId('mps-applicant-street-name', idPrefix)} value={value.streetName || ''} onChange={(event) => update('streetName', event.target.value)} inputWidth='xl' />
      </Field>
      <Field id={scopedId('mps-applicant-street-type', idPrefix)} label='Street type *' hasError={showErrors && !value.streetType} errorMessage='Select a street type.'>
        <Select
          id={scopedId('mps-applicant-street-type', idPrefix)}
          value={value.streetType || ''}
          onChange={(event) => update('streetType', event.target.value)}
          inputWidth='xl'
          options={[
            { value: 'street', text: 'Street' },
            { value: 'road', text: 'Road' },
            { value: 'avenue', text: 'Avenue' },
            { value: 'drive', text: 'Drive' },
          ]}
        />
      </Field>
      <Field id={scopedId('mps-applicant-suburb', idPrefix)} label='Suburb *' hasError={showErrors && !value.suburb?.trim()} errorMessage='Enter a suburb.'>
        <Input id={scopedId('mps-applicant-suburb', idPrefix)} value={value.suburb || ''} onChange={(event) => update('suburb', event.target.value)} inputWidth='xl' autoComplete='address-level2' />
      </Field>
      <Field id={scopedId('mps-applicant-state', idPrefix)} label='State *' hasError={showErrors && !value.state} errorMessage='Select a state.'>
        <Select
          id={scopedId('mps-applicant-state', idPrefix)}
          value={value.state || ''}
          onChange={(event) => update('state', event.target.value)}
          inputWidth='xl'
          options={[
            { value: 'NSW', text: 'NSW' },
            { value: 'ACT', text: 'ACT' },
            { value: 'QLD', text: 'QLD' },
            { value: 'VIC', text: 'VIC' },
            { value: 'SA', text: 'SA' },
            { value: 'WA', text: 'WA' },
            { value: 'TAS', text: 'TAS' },
            { value: 'NT', text: 'NT' },
          ]}
          autoComplete='address-level1'
        />
      </Field>
      <Field id={scopedId('mps-applicant-postcode', idPrefix)} label='Postcode *' hasError={showErrors && !value.postcode?.trim()} errorMessage='Enter a postcode.'>
        <Input id={scopedId('mps-applicant-postcode', idPrefix)} value={value.postcode || ''} onChange={(event) => update('postcode', event.target.value)} inputWidth='xl' autoComplete='postal-code' inputMode='numeric' maxLength={4} />
      </Field>
    </fieldset>
  )
}

function getMpsApplicantDetailsErrors(value: MpsApplicantDetailsFrameValue, addressMode: 'search' | 'manual') {
  const errors: string[] = []
  if (!value.firstName?.trim()) errors.push('Enter a first name.')
  if (!value.lastName?.trim()) errors.push('Enter a last name.')
  if (!value.dateOfBirthDay?.trim() || !value.dateOfBirthMonth?.trim() || !value.dateOfBirthYear?.trim()) errors.push('Enter a date of birth.')
  if (addressMode === 'search' && !value.residentialAddress?.trim()) errors.push('Enter a residential address.')
  if (addressMode === 'manual') {
    if (!value.streetNumber?.trim()) errors.push('Enter a street number.')
    if (!value.streetName?.trim()) errors.push('Enter a street name.')
    if (!value.streetType) errors.push('Select a street type.')
    if (!value.suburb?.trim()) errors.push('Enter a suburb.')
    if (!value.state) errors.push('Select a state.')
    if (!value.postcode?.trim()) errors.push('Enter a postcode.')
  }
  if (!value.email?.trim()) errors.push('Enter an email address.')
  if (!value.phone?.trim()) errors.push('Enter a phone number.')
  return errors
}

// ---------------------------------------------------------------------------
// MpsReviewFramePreview
// MPS transaction review-frame layout extracted from `MPS Final` frame `6.A - Review` (`0:33185`).
// Source evidence shows required-field hint, warning callout, review sections, edit links,
// declaration checkbox area and bottom CTA/footer relationship. Content and rules stay mock-only.
// ---------------------------------------------------------------------------
export function MpsReviewFramePreview({
  sections,
  declarationStatements,
  onEdit,
  onBack,
  onSubmit,
  onExit,
  calloutTitle = 'Mobility Parking Scheme permit',
  calloutText = 'Please ensure that the details listed below are correct. Incorrect information may cause a delay in a real application.',
  submitLabel = 'Submit mock application',
}: {
  sections: MpsReviewFrameSection[]
  declarationStatements: React.ReactNode[]
  onEdit?: (sectionId: string) => void
  onBack?: () => void
  onSubmit?: () => void
  onExit?: () => void
  calloutTitle?: string
  calloutText?: React.ReactNode
  submitLabel?: string
}) {
  return (
    <section
      className='tapaas-mps-review-frame'
      aria-labelledby='mps-review-frame-heading'
      data-tapaas-component='mps-review-frame-preview'
      data-preview-boundary='preview implementation; not production-approved'
    >
      <Heading level={2} id='mps-review-frame-heading'>Review your application</Heading>
      <p id='mps-review-required-hint' className='tapaas-mps-review-frame__hint'>
        <span>*</span> indicates a required field
      </p>
      <InPageAlert variant='info' title={calloutTitle}>
        <p>{calloutText}</p>
      </InPageAlert>
      <div className='tapaas-mps-review-frame__sections'>
        {sections.map((section) => (
          <section className='tapaas-mps-review-frame__section' aria-labelledby={`${section.id}-heading`} key={section.id}>
            <div className='tapaas-mps-review-frame__section-heading'>
              <Heading level={3} id={`${section.id}-heading`} style={{ marginBottom: 0 }}>{section.title}</Heading>
            </div>
            <dl className='tapaas-summary-list'>
              {section.rows.map((row) => (
                <div className='tapaas-summary-row' key={`${section.id}-${row.label}`}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.value}
                    {row.helpText && <p className='tapaas-help-text'>{row.helpText}</p>}
                  </dd>
                </div>
              ))}
            </dl>
            {onEdit && (
              <div className='tapaas-mps-review-frame__section-action'>
                <button
                  type='button'
                  className='tapaas-mps-review-frame__edit'
                  aria-label={section.editLabel || `Edit ${section.title}`}
                  onClick={() => onEdit(section.id)}
                >
                  Edit
                </button>
              </div>
            )}
          </section>
        ))}
      </div>
      <MpsReviewDeclarationPreview reviewNotes={declarationStatements} />
      <TransactionCtaGroup onBack={onBack} onContinue={onSubmit} onExit={onExit} continueLabel={submitLabel} />
    </section>
  )
}

function MpsReviewDeclarationPreview({ reviewNotes }: { reviewNotes: React.ReactNode[] }) {
  return (
    <fieldset
      className='tapaas-mps-review-declaration'
      aria-describedby='mps-review-required-hint mps-review-declaration-boundary'
      data-preview-boundary='preview-only checked checkbox state; no persistence or submission validation'
    >
      <legend>Declaration</legend>
      <label className='tapaas-mps-review-declaration__row'>
        <input type='checkbox' checked readOnly required />
        <span className='tapaas-mps-review-declaration__box' aria-hidden='true' />
        <span className='tapaas-mps-review-declaration__label'>
          I have read and accept the applicant{' '}
          <span className='tapaas-link-like'>[Applicant Terms and Conditions]</span>{' '}
          <span className='tapaas-required-marker'>*</span>
        </span>
      </label>
      <label className='tapaas-mps-review-declaration__row'>
        <input type='checkbox' checked readOnly required />
        <span className='tapaas-mps-review-declaration__box' aria-hidden='true' />
        <span className='tapaas-mps-review-declaration__label'>
          I have read and understood the{' '}
          <span className='tapaas-link-like'>[Information Collection Notice]</span>{' '}
          and agree to save and reuse my details for future transactions.{' '}
          <span className='tapaas-required-marker'>*</span>
        </span>
      </label>
      <p id='mps-review-declaration-boundary' className='gel-sr-only'>
        Legal, privacy and policy wording is placeholder-only and needs owner review.
        {reviewNotes.length > 0 && ' Supplied declaration notes are treated as evidence only.'}
      </p>
    </fieldset>
  )
}

// ---------------------------------------------------------------------------
// MpsConfirmationFramePreview
// MPS transaction confirmation frame extracted from `MPS Final` frame
// `6.A Confirmation screen` (`0:33222`). Outcome facts remain mock/placeholder.
// ---------------------------------------------------------------------------
export function MpsConfirmationFramePreview({
  title = 'Your application has been submitted',
  transactionName = 'Mobility Parking Scheme',
  referenceNumber,
  applicationDetails,
  nextSteps,
  relatedContent,
  onStartAgain,
  feedbackLabel = 'How was the Mobility Parking Scheme permit?',
}: {
  title?: string
  transactionName?: string
  referenceNumber: string
  applicationDetails: SummaryItem[]
  nextSteps: MpsConfirmationNextStep[]
  relatedContent?: React.ReactNode
  onStartAgain?: () => void
  feedbackLabel?: string
}) {
  const [feedbackChoice, setFeedbackChoice] = React.useState<string | null>(null)

  return (
    <section
      className='tapaas-mps-confirmation-frame'
      aria-labelledby='mps-confirmation-frame-heading'
      data-tapaas-component='mps-confirmation-frame-preview'
      data-preview-boundary='preview implementation; not production-approved'
    >
      <ConfirmationHeader title={title} transactionName={transactionName} />
      <p className='tapaas-mps-confirmation-frame__reference'>
        Reference number: <strong>{referenceNumber}</strong>
      </p>
      <TransactionSummaryCard heading='Application details' items={applicationDetails} />
      <section className='tapaas-mps-confirmation-frame__next' aria-labelledby='mps-confirmation-next-heading'>
        <Heading level={2} id='mps-confirmation-next-heading'>What happens next?</Heading>
        <ol className='tapaas-step-list'>
          {nextSteps.map((step) => <li key={step.id}>{step.content}</li>)}
        </ol>
        {relatedContent && <div className='tapaas-mps-confirmation-frame__related'>{relatedContent}</div>}
      </section>
      <div className='tapaas-mps-confirmation-frame__feedback' aria-label={feedbackLabel}>
        <p>{feedbackLabel}</p>
        <div className='tapaas-mps-confirmation-frame__feedback-actions'>
          <Button variant='secondary' onClick={() => setFeedbackChoice('positive')}>Yes</Button>
          <Button variant='secondary' onClick={() => setFeedbackChoice('negative')}>No</Button>
        </div>
        <p className='tapaas-mps-confirmation-frame__feedback-status' aria-live='polite'>
          {feedbackChoice ? 'Mock feedback selected. Feedback capture is not implemented in this preview.' : ''}
        </p>
      </div>
      {onStartAgain && <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start again' />}
    </section>
  )
}

// ---------------------------------------------------------------------------
// NextStepsCardPreview
// TaPaaS confirmation/post-submit guidance card extracted from component set
// `Next steps card` (`11:4848`) on the component-library page `10:1862`.
// Variants evidence 2-5 rows, desktop/mobile widths and step numbers on/off.
// ---------------------------------------------------------------------------
export function NextStepsCardPreview({
  heading = 'Next steps',
  items,
  showStepNumbers = true,
  showIcon = true,
  headingLevel = 2,
}: NextStepsCardPreviewProps) {
  const generatedId = React.useId()
  const headingId = `next-steps-card-${generatedId}`
  const ListTag = showStepNumbers ? 'ol' : 'ul'

  return (
    <section
      className={`tapaas-next-steps-card${showStepNumbers ? '' : ' tapaas-next-steps-card--unordered'}`}
      aria-labelledby={headingId}
      data-tapaas-component='next-steps-card-preview'
      data-preview-boundary='preview implementation; not production-approved'
    >
      <div className='tapaas-next-steps-card__heading'>
        {showIcon && (
          <span className='tapaas-next-steps-card__icon' aria-hidden='true'>
            <svg viewBox='0 0 48 48' focusable='false'>
              <path d='M15 5h18v5h5v33H10V10h5V5Z' fill='none' stroke='currentColor' strokeWidth='3' strokeLinejoin='round' />
              <path d='M17 10h14' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' />
              <path className='tapaas-next-steps-card__icon-accent' d='m16 25 4 4 7-10m-11 17 4 4 11-15' fill='none' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </span>
        )}
        <Heading level={headingLevel} id={headingId} style={{ marginBottom: 0 }}>
          {heading}
        </Heading>
      </div>
      <ListTag className='tapaas-next-steps-card__list'>
        {items.map((item, index) => (
          <li className='tapaas-next-steps-card__item' key={item.id}>
            {showStepNumbers && (
              <span className='tapaas-next-steps-card__step' aria-hidden='true'>
                <span className='tapaas-next-steps-card__step-number'>{index + 1}</span>
                {index < items.length - 1 && <span className='tapaas-next-steps-card__line' />}
              </span>
            )}
            <div className='tapaas-next-steps-card__copy'>
              <h3>{item.heading}</h3>
              <div>{item.body}</div>
            </div>
          </li>
        ))}
      </ListTag>
    </section>
  )
}

export function TransactionCtaGroup({
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
      className='tapaas-cta-group'
      role='group'
      aria-label='Transaction actions'
      data-tapaas-component='transaction-action-area'
      data-preview-boundary='preview implementation; no routing included'
    >
      <div className='tapaas-primary-actions'>
        {onContinue && <Button onClick={onContinue}>{continueLabel}</Button>}
        {onBack && <Button variant='secondary' onClick={onBack}>{backLabel}</Button>}
      </div>
      {onExit && (
        <Button variant='link' onClick={onExit}>{exitLabel}</Button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// PrivacyCardPreview
// TaPaaS preview composite — privacy/start card structure.
// Source evidence: Privacy card `1:198`, Privacy step template `3395:41359`.
// Privacy, legal, notification and terms wording remain owner-confirmation
// required and are represented with placeholders only.
// ---------------------------------------------------------------------------
export function PrivacyCardPreview({
  title = 'Privacy information',
  description = 'This preview shows the structure of a privacy/start card. Replace all placeholder content with owner-confirmed wording before reuse.',
  sections = defaultPrivacyCardSections,
  acknowledgementLabel = 'I have read and understood the privacy information.',
  acknowledgementChecked = false,
  onAcknowledgementChange,
  showAcknowledgement = true,
  hasError,
  errorMessage = 'Confirm that you have read the privacy information.',
}: PrivacyCardPreviewProps) {
  const headingId = `${slugify(title)}-privacy-card-heading`

  return (
    <section
      className='tapaas-card tapaas-privacy-card'
      aria-labelledby={headingId}
      data-tapaas-component='privacy-card-preview'
      data-preview-boundary='preview implementation; owner-confirmed privacy wording required'
    >
      <Heading level={3} id={headingId}>{title}</Heading>
      {description && <p className='tapaas-privacy-card__description'>{description}</p>}
      <div className='tapaas-privacy-card__sections'>
        {sections.map((section) => (
          <section className='tapaas-privacy-card__section' aria-labelledby={`${section.id}-heading`} key={section.id}>
            <Heading level={4} id={`${section.id}-heading`}>{section.title}</Heading>
            <div className='tapaas-privacy-card__content'>{section.content}</div>
          </section>
        ))}
      </div>
      {showAcknowledgement && (
        <div className='tapaas-privacy-card__acknowledgement'>
          <Checkbox
            id={`${slugify(title)}-privacy-acknowledgement`}
            label={acknowledgementLabel}
            checked={acknowledgementChecked}
            onChange={onAcknowledgementChange}
            hasError={hasError}
            errorMessage={errorMessage}
          />
        </div>
      )}
    </section>
  )
}

const defaultPrivacyCardSections: PrivacyCardSection[] = [
  {
    id: 'privacy-collection-notice',
    title: 'Privacy collection notice',
    content: <p>Service NSW delivers this service on behalf of <span aria-label='agency name placeholder'>[Agency name]</span>. Replace this placeholder with the confirmed collection notice.</p>,
  },
  {
    id: 'terms-and-conditions',
    title: 'Terms and conditions',
    content: <p>Terms, conditions and consent wording for <span aria-label='transaction name placeholder'>[Transaction name]</span> must be supplied by the service owner.</p>,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    content: <p>Notification channels, timing and content are placeholders in this preview and need owner confirmation.</p>,
  },
]

// ---------------------------------------------------------------------------
// TapaasSearchAction
// TaPaaS preview composite — search-first input with action button.
// Source evidence: Search vehicle input `22:16683`, Search input page `16274:18397`.
// Behaviour, validation, result states and backend lookup remain unresolved.
// ---------------------------------------------------------------------------
export function TapaasSearchAction({
  id,
  label = 'Enter a NSW plate number',
  helpText = 'For example ABC123. Do not include spaces or special characters.',
  buttonLabel = 'Find vehicle',
  placeholder,
  defaultValue,
}: TapaasSearchActionProps) {
  const generatedId = React.useId()
  const inputId = id || `tapaas-search-action-${generatedId}`

  return (
    <div
      className='tapaas-search-action'
      data-tapaas-component='search-vehicle-input'
      data-preview-boundary='static preview only'
    >
      <label className='tapaas-search-action__label' htmlFor={inputId}>
        {label}
      </label>
      {helpText && <p className='tapaas-search-action__help'>{helpText}</p>}
      <div className='tapaas-search-action__controls'>
        <Input id={inputId} defaultValue={defaultValue} placeholder={placeholder} inputWidth='xl' />
        <Button>{buttonLabel}</Button>
      </div>
    </div>
  )
}

export function ExitModal({
  isOpen,
  onContinue,
  onExit,
  title = 'Are you sure you want to exit and lose your progress?',
  description = "If you exit now, you'll have to start again next time.",
  continueLabel = 'No, continue',
  exitLabel = 'Yes, exit',
}: {
  isOpen: boolean
  onContinue: () => void
  onExit: () => void
  title?: string
  description?: string
  continueLabel?: string
  exitLabel?: string
}) {
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)

  function getFocusableControls() {
    if (!dialogRef.current) return []
    return Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ))
  }

  React.useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => {
      const firstControl = getFocusableControls()[0]
      if (firstControl) {
        firstControl.focus()
      } else {
        dialogRef.current?.focus()
      }
    }, 0)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onContinue()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = getFocusableControls()
      if (focusable.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      window.setTimeout(() => previousFocusRef.current?.focus(), 0)
    }
  }, [isOpen, onContinue])

  if (!isOpen) return null

  return (
    <div className='tapaas-modal-layer' role='presentation'>
      <div className='tapaas-modal-backdrop' aria-hidden='true' />
      <div
        ref={dialogRef}
        className='tapaas-modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby='exit-modal-title'
        aria-describedby='exit-modal-description'
        tabIndex={-1}
      >
        <Heading level={2} id='exit-modal-title'>{title}</Heading>
        <p id='exit-modal-description'>{description}</p>
        <div className='tapaas-modal-actions'>
          <Button onClick={onContinue}>{continueLabel}</Button>
          <Button variant='secondary' onClick={onExit}>{exitLabel}</Button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EmailConfirmationModal
// TaPaaS preview composite — confirmation-step email verification modal.
// Source evidence: Email confirmation modal `9290:50392`; component frame `9241:18447`.
// Send/edit/dismiss callbacks are mock-only and do not send email or persist data.
// ---------------------------------------------------------------------------
export function EmailConfirmationModal({
  isOpen,
  emailAddress,
  onSend,
  onEdit,
  onDismiss,
  title = 'Confirm email address',
  sendLabel = 'Send',
  editLabel = 'Edit email address',
}: EmailConfirmationModalProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)
  const generatedId = React.useId()
  const titleId = `${generatedId}-title`
  const descriptionId = `${generatedId}-description`
  const dismiss = onDismiss || onEdit

  function getFocusableControls() {
    if (!dialogRef.current) return []
    return Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ))
  }

  React.useEffect(() => {
    if (!isOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => {
      getFocusableControls()[0]?.focus()
    }, 0)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        dismiss()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = getFocusableControls()
      if (focusable.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      window.setTimeout(() => previousFocusRef.current?.focus(), 0)
    }
  }, [dismiss, isOpen])

  if (!isOpen) return null

  return (
    <div className='tapaas-modal-layer tapaas-email-confirmation-layer' role='presentation'>
      <div className='tapaas-modal-backdrop' aria-hidden='true' />
      <div
        ref={dialogRef}
        className='tapaas-modal tapaas-email-confirmation-modal'
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        data-tapaas-component='email-confirmation-modal'
        data-preview-boundary='preview implementation; not production-approved'
      >
        <button
          type='button'
          className='tapaas-email-confirmation-modal__close'
          aria-label='Close email confirmation modal'
          onClick={dismiss}
        >
          <span aria-hidden='true'>&times;</span>
        </button>
        <Heading level={2} id={titleId} style={{ marginBottom: '1rem' }}>{title}</Heading>
        <p id={descriptionId} className='tapaas-email-confirmation-modal__description'>
          Check the address. We'll send your receipt to <strong>{emailAddress}</strong>
        </p>
        <div className='tapaas-modal-actions tapaas-email-confirmation-modal__actions'>
          <Button variant='secondary' onClick={onEdit}>{editLabel}</Button>
          <Button onClick={onSend}>{sendLabel}</Button>
        </div>
      </div>
    </div>
  )
}

export function BusinessErrorPage({
  title = 'We cannot progress this application',
  message,
  guidance,
  reference,
  onStartAgain,
}: {
  title?: string
  message: React.ReactNode
  guidance?: React.ReactNode
  reference?: string
  onStartAgain: () => void
}) {
  return (
    <section className='tapaas-error-page' aria-labelledby='business-error-heading'>
      <div role='alert' className='tapaas-error-page__alert'>
        <span className='tapaas-error-page__icon' aria-hidden='true'>!</span>
        <div className='tapaas-error-page__content'>
          <Heading level={2} id='business-error-heading'>{title}</Heading>
          <div>{message}</div>
        </div>
      </div>
      {reference && (
        <p className='tapaas-error-page__reference'>
          Reference: <strong>{reference}</strong>
        </p>
      )}
      {guidance && <div className='tapaas-error-page__guidance'>{guidance}</div>}
      <TransactionCtaGroup onContinue={onStartAgain} continueLabel='Start again' />
    </section>
  )
}

// ---------------------------------------------------------------------------
// BackendErrorExamplePage
// TaPaaS preview composite — mock-only business/backend error variants.
// Source evidence: Backend errors repository `31:73426`.
// ---------------------------------------------------------------------------
export const backendErrorExamples = {
  paymentError: {
    code: 'INVALID_PAYMENT_DETAILS',
    title: 'Unable to submit permit request',
    message: 'We could not submit this permit request due to a payment error. No money has been taken.',
    guidance: 'Try again or visit a service centre. This is mock recovery wording only.',
    reference: 'MPS-PAYMENT-MOCK',
  },
  concessionNeedsAttention: {
    code: 'INVALID_INPUT',
    title: 'Concession details need attention',
    message: 'The mock concession outcome selected on this run cannot progress automatically.',
    guidance: 'Real concession recovery wording, backend error codes and support channels need source-confirmed business rules.',
    reference: 'MPS-CONCESSION-MOCK',
  },
  addressNotNsw: {
    code: 'ADDRESS_NOT_NSW',
    title: 'Your address is not in NSW',
    message: 'Mobility parking permits are only available for NSW residents.',
    guidance: 'Check the eligibility criteria. If you need help, call 13 77 88. This is mock content only.',
    reference: 'MPS-ADDRESS-MOCK',
  },
  systemUnavailable: {
    code: 'SYSTEM_FAILURE',
    title: 'Our system is temporarily unavailable',
    message: 'We are working to resolve this technical issue.',
    guidance: 'Try again later. This prototype does not connect to a real system.',
    reference: 'MPS-SYSTEM-MOCK',
  },
} satisfies Record<string, BackendErrorExample>

export function BackendErrorExamplePage({
  example,
  onStartAgain,
}: {
  example: BackendErrorExample
  onStartAgain: () => void
}) {
  return (
    <BusinessErrorPage
      title={example.title}
      message={(
        <>
          <p>{example.message}</p>
          <p className='tapaas-help-text'>Mock backend code: <strong>{example.code}</strong></p>
        </>
      )}
      guidance={<p>{example.guidance}</p>}
      reference={example.reference}
      onStartAgain={onStartAgain}
    />
  )
}

export function RepeatableGroup({
  title,
  description,
  children,
  actions,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <fieldset className='tapaas-repeatable-group'>
      <legend className='tapaas-repeatable-group__legend'>{title}</legend>
      {description && <p className='tapaas-repeatable-group__description'>{description}</p>}
      <div className='tapaas-repeatable-group__fields'>
        {children}
      </div>
      {actions && <div className='tapaas-repeatable-group__actions'>{actions}</div>}
    </fieldset>
  )
}

export function EvidenceChecklistCard({
  title = 'Evidence checklist',
  idPrefix,
  items,
  children,
}: {
  title?: string
  idPrefix?: string
  items: EvidenceChecklistItem[]
  children?: React.ReactNode
}) {
  const headingId = scopedId(`${slugify(title)}-heading`, idPrefix)

  return (
    <section className='tapaas-card tapaas-evidence-card' aria-labelledby={headingId}>
      <Heading level={3} id={headingId}>{title}</Heading>
      <ul className='tapaas-evidence-list'>
        {items.map((item) => (
          <li className='tapaas-evidence-item' key={item.id}>
            <span className={`tapaas-status-pill tapaas-status-pill--${item.status}`}>
              {statusLabel(item.status)}
            </span>
            <div>
              <strong>{item.label}</strong>
              {item.description && <p className='tapaas-help-text'>{item.description}</p>}
            </div>
          </li>
        ))}
      </ul>
      {children && <div className='tapaas-card-extra'>{children}</div>}
    </section>
  )
}

export function MpsMedicalEvidenceStatusPreview({
  evidenceType = 'certificate',
  state = 'required',
  fileName,
  idPrefix,
}: MpsMedicalEvidenceStatusPreviewProps) {
  const isProvided = state === 'provided'
  const headingId = scopedId('mps-medical-evidence-status-heading', idPrefix)
  const evidenceConfig = {
    certificate: {
      itemId: 'medical-certificate',
      label: 'Medical certificate',
      defaultFileName: 'medicalcertificate_april2020.png',
      fileLabel: 'Static mock medical certificate file',
      requiredDescription: 'Medical evidence is required in this preview. Upload controls, file validation and file limits remain review-gated.',
      providedDescription: 'A static mock file name is shown from source frame 0:17327. No remove-file behaviour is implemented.',
      unresolvedNote: 'Source frames show inconsistent file-size and upload-state evidence. This preview records the requirement only.',
    },
    report: {
      itemId: 'medical-report',
      label: 'Medical report',
      defaultFileName: 'medicalreport_april2020.png',
      fileLabel: 'Static mock medical report file',
      requiredDescription: 'A medical report is required in this preview. Upload controls, file validation and file limits remain review-gated.',
      providedDescription: 'A static mock report file name is shown from source frame 0:17384. No remove-file behaviour is implemented.',
      unresolvedNote: 'Source report frames use different section wording. This preview records the requirement only.',
    },
  }[evidenceType]
  const displayFileName = fileName || evidenceConfig.defaultFileName

  return (
    <section
      className='tapaas-mps-medical-evidence-status'
      aria-labelledby={headingId}
      data-tapaas-component='mps-medical-evidence-status-preview'
    >
      <Heading level={2} id={headingId}>Medical document</Heading>
      <p className='tapaas-mps-medical-evidence-status__hint'>
        <span aria-hidden='true'>*</span> indicates a required field
      </p>
      <InPageAlert variant='info' title='Mobility Parking Scheme permit'>
        <p>Please ensure that documents are completed in full and clearly legible. This is static source-guidance treatment only.</p>
      </InPageAlert>
      <EvidenceChecklistCard
        title='Medical evidence status'
        idPrefix={idPrefix}
        items={[
          {
            id: evidenceConfig.itemId,
            label: evidenceConfig.label,
            status: isProvided ? 'provided' : 'required',
            description: isProvided
              ? evidenceConfig.providedDescription
              : evidenceConfig.requiredDescription,
          },
        ]}
      >
        {isProvided ? (
          <div className='tapaas-mps-medical-evidence-status__file' aria-label={evidenceConfig.fileLabel}>
            <span>Static mock file</span>
            <strong>{displayFileName}</strong>
            <p>No upload, remove-file, storage or validation behaviour is included.</p>
          </div>
        ) : (
          <p className='tapaas-help-text'>
            {evidenceConfig.unresolvedNote}
          </p>
        )}
      </EvidenceChecklistCard>
      <p className='tapaas-help-text'>
        Preview-only evidence-status pattern. Medical assessment, backend handling, file upload and privacy/security approval remain out of scope.
      </p>
    </section>
  )
}

export function AssessmentSummaryPanel({
  title = 'Mock assessment summary',
  items,
  children,
}: {
  title?: string
  items: AssessmentSummaryItem[]
  children?: React.ReactNode
}) {
  return (
    <section className='tapaas-card tapaas-assessment-panel' aria-labelledby={`${slugify(title)}-heading`}>
      <Heading level={3} id={`${slugify(title)}-heading`}>{title}</Heading>
      <dl className='tapaas-assessment-list'>
        {items.map((item) => (
          <div className='tapaas-assessment-row' key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              <span className={`tapaas-assessment-value tapaas-assessment-value--${item.tone || 'neutral'}`}>
                {item.value}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {children && <div className='tapaas-card-extra'>{children}</div>}
    </section>
  )
}

// ---------------------------------------------------------------------------
// DeclarationReview
// TaPaaS preview composite — review-page declaration playback.
// Source evidence: Declaration review `27:38386`.
// ---------------------------------------------------------------------------
export function DeclarationReview({
  title = 'Declaration',
  intro = 'You have accepted these declarations:',
  sections,
  variant = 'card',
}: {
  title?: string
  intro?: string
  sections: DeclarationReviewSection[]
  variant?: 'card' | 'accordion'
}) {
  if (variant === 'accordion') {
    return (
      <section className='tapaas-declaration-review' aria-labelledby={`${slugify(title)}-declaration-review-heading`}>
        <Heading level={3} id={`${slugify(title)}-declaration-review-heading`}>{title}</Heading>
        <p>{intro}</p>
        <Accordion
          id={`${slugify(title)}-declaration-accordion`}
          name='declaration sections'
          items={sections.map((section) => ({
            id: `${slugify(title)}-${slugify(section.title)}`,
            title: section.title,
            headingLevel: 'h4',
            children: (
              <ul className='tapaas-declaration-list'>
                {section.statements.map((statement, index) => <li key={index}>{statement}</li>)}
              </ul>
            ),
          }))}
        />
      </section>
    )
  }

  return (
    <section className='tapaas-card tapaas-declaration-review tapaas-declaration-review--card' aria-labelledby={`${slugify(title)}-declaration-review-heading`}>
      <Heading level={3} id={`${slugify(title)}-declaration-review-heading`}>{title}</Heading>
      <p className='tapaas-declaration-review__intro'>{intro}</p>
      {sections.map((section) => (
        <div className='tapaas-declaration-section' key={section.title}>
          <Heading level={4}>{section.title}</Heading>
          <div className='tapaas-declaration-list'>
            {section.statements.map((statement, index) => <p key={index}>{statement}</p>)}
          </div>
        </div>
      ))}
    </section>
  )
}

// ---------------------------------------------------------------------------
// LegalInfoAccordion
// TaPaaS content-specific wrapper over GEL Accordion behaviour.
// Source evidence: Legal info accordion `22:35625`.
// ---------------------------------------------------------------------------
export function LegalInfoAccordion({
  title = 'Privacy',
  items = defaultLegalInfoItems,
}: {
  title?: string
  items?: { id: string; title: string; content: React.ReactNode }[]
}) {
  return (
    <section className='tapaas-legal-info' aria-labelledby={`${slugify(title)}-legal-info-heading`}>
      <Heading level={3} id={`${slugify(title)}-legal-info-heading`}>{title}</Heading>
      <Accordion
        id={`${slugify(title)}-legal-info-accordion`}
        name='legal information sections'
        items={items.map((item) => ({
          id: item.id,
          title: item.title,
          headingLevel: 'h4',
          children: item.content,
        }))}
      />
    </section>
  )
}

const defaultLegalInfoItems = [
  {
    id: 'privacy-collection-notice',
    title: 'Privacy Collection Notice',
    content: (
      <p>
        Service NSW delivers this service on behalf of <span aria-label='agency name placeholder'>[Agency name]</span> and some personal information will be shared with them. Replace this placeholder with the confirmed privacy collection notice before reuse.
      </p>
    ),
  },
  {
    id: 'terms-and-conditions',
    title: 'Terms and Conditions',
    content: <p>You have agreed to the Terms and Conditions for <span aria-label='transaction name placeholder'>[Transaction name]</span>. Confirm the real wording with the service owner.</p>,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    content: <p>We will send you an email with the details of your <span aria-label='transaction product placeholder'>[transaction product]</span> after you complete and submit this form online. Real notification wording and channels need owner confirmation.</p>,
  },
]

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function statusLabel(status: EvidenceChecklistItem['status']) {
  if (status === 'provided') return 'Mock provided'
  if (status === 'not-required') return 'Not required'
  if (status === 'needs-review') return 'Needs review'
  return 'Required'
}

function scopedId(id: string, idPrefix?: string) {
  return idPrefix ? `${idPrefix}-${id}` : id
}

// ---------------------------------------------------------------------------
// DetailsCard
// TaPaaS preview composite — read-only contextual summary card.
// Source evidence: Details card single `2413:787` (draft).
// ---------------------------------------------------------------------------
export interface DetailsCardRow {
  label: string
  value: React.ReactNode
}

export interface DetailsCardProps {
  title: string
  description?: string
  rows: DetailsCardRow[]
  statusLabel?: string
  onAction?: () => void
  actionLabel?: string
  headingLevel?: 2 | 3 | 4
}

export function DetailsCard({ title, description, rows, statusLabel, onAction, actionLabel = 'Change', headingLevel = 3 }: DetailsCardProps) {
  const id = slugify(title) + '-details'
  return (
    <section className='tapaas-card' aria-labelledby={id} data-tapaas-component='details-card'>
      <div className='tapaas-card-heading-row'>
        <div>
          <Heading level={headingLevel} style={{ marginBottom: description ? '0.25rem' : 0 }} id={id}>{title}</Heading>
          {description && <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--gel-color-text-grey)' }}>{description}</p>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {statusLabel && <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gel-color-text-grey)', whiteSpace: 'nowrap' }}>{statusLabel}</span>}
          {onAction && <TextLink onClick={onAction}>{actionLabel}</TextLink>}
        </div>
      </div>
      <dl className='tapaas-summary-list'>
        {rows.map((row) => (
          <div className='tapaas-summary-row' key={row.label}>
            <dt>{row.label}</dt>
            <dd style={{ margin: 0 }}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export interface InteractiveDetailsCardAction {
  label: string
  onAction: () => void
  variant?: 'primary' | 'secondary' | 'link'
}

export interface InteractiveDetailsCardProps extends Omit<DetailsCardProps, 'onAction' | 'actionLabel'> {
  actions: InteractiveDetailsCardAction[]
}

// ---------------------------------------------------------------------------
// InteractiveDetailsCard
// TaPaaS preview composite — context card with explicit actions.
// Source evidence: Details card single interactive `2958:2499`.
// ---------------------------------------------------------------------------
export function InteractiveDetailsCard({ title, description, rows, statusLabel, headingLevel = 3, actions }: InteractiveDetailsCardProps) {
  const id = slugify(title) + '-interactive-details'
  return (
    <section className='tapaas-card tapaas-interactive-details-card' aria-labelledby={id} data-tapaas-component='interactive-details-card'>
      <div className='tapaas-interactive-details-card__primary'>
        <span className='tapaas-interactive-details-card__icon' aria-hidden='true'>
          <svg viewBox='0 0 48 48' focusable='false'>
            <path d='M12 9h24v30H12V9Zm6 9h12M18 24h18M18 30h14' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </span>
        <div className='tapaas-interactive-details-card__info'>
          <Heading level={headingLevel} style={{ marginBottom: description ? '0.25rem' : 0 }} id={id}>{title}</Heading>
          {description && <p className='tapaas-help-text'>{description}</p>}
          {statusLabel && <span className='tapaas-status-pill tapaas-status-pill--needs-review'>{statusLabel}</span>}
          <dl className='tapaas-summary-list tapaas-interactive-details-card__rows'>
            {rows.map((row) => (
              <div className='tapaas-summary-row' key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className='tapaas-card-actions' aria-label={`${title} actions`}>
        {actions.map((action) => {
          if (action.variant === 'link') {
            return <TextLink key={action.label} onClick={action.onAction}>{action.label}</TextLink>
          }
          return (
            <Button
              key={action.label}
              variant={action.variant || 'secondary'}
              onClick={action.onAction}
            >
              {action.label}
            </Button>
          )
        })}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// RadioButtonCards
// TaPaaS preview composite — native radio inputs presented as cards.
// Source evidence: TaPaaS radio button cards `31:63988`.
// ---------------------------------------------------------------------------
export function RadioButtonCards({
  id,
  legend,
  options,
  value,
  onChange,
  hasError,
  errorMessage = 'Please select an option.',
  required,
}: {
  id: string
  legend: string
  options: RadioButtonCardOption[]
  value: string
  onChange: (value: string) => void
  hasError?: boolean
  errorMessage?: string
  required?: boolean
}) {
  const errorId = `${id}-error`
  function selectByOffset(currentIndex: number, offset: number) {
    const nextIndex = (currentIndex + offset + options.length) % options.length
    onChange(options[nextIndex].value)
  }

  return (
    <fieldset
      className={`tapaas-radio-card-fieldset ${hasError ? 'tapaas-radio-card-fieldset--error' : ''}`}
      aria-describedby={hasError ? errorId : undefined}
      aria-invalid={hasError || undefined}
    >
      <legend className='tapaas-radio-card-legend'>{legend}</legend>
      <div className='tapaas-radio-card-set'>
        {options.map((option, index) => {
          const optionId = `${id}-${option.value}`
          const labelId = `${optionId}-label`
          const descriptionId = option.description ? `${optionId}-description` : undefined
          const selected = option.value === value
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`tapaas-radio-card ${selected ? 'tapaas-radio-card--selected' : ''} ${hasError ? 'tapaas-radio-card--error' : ''}`}
            >
              <input
                id={optionId}
                name={id}
                type='radio'
                value={option.value}
                checked={selected}
                required={required}
                aria-required={required || undefined}
                aria-labelledby={labelId}
                aria-describedby={[descriptionId, hasError ? errorId : undefined].filter(Boolean).join(' ') || undefined}
                onChange={() => onChange(option.value)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault()
                    selectByOffset(index, 1)
                  }
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault()
                    selectByOffset(index, -1)
                  }
                  if (event.key === 'Home') {
                    event.preventDefault()
                    onChange(options[0].value)
                  }
                  if (event.key === 'End') {
                    event.preventDefault()
                    onChange(options[options.length - 1].value)
                  }
                }}
              />
              <span className='tapaas-radio-card__body'>
                <span className='tapaas-radio-card__pictogram' aria-hidden='true'>{option.pictogram || '○'}</span>
                <span className='tapaas-radio-card__control' aria-hidden='true'>
                  {selected && <span />}
                </span>
                <span className='tapaas-radio-card__text'>
                  <span id={labelId} className='tapaas-radio-card__label'>{option.label}</span>
                  {option.description && <span id={descriptionId} className='tapaas-radio-card__description'>{option.description}</span>}
                </span>
              </span>
            </label>
          )
        })}
      </div>
      {hasError && (
        <div id={errorId} className='tapaas-radio-card-error'>
          <span aria-hidden='true'>⊘</span>
          <strong>{errorMessage}</strong>
        </div>
      )}
    </fieldset>
  )
}

// ---------------------------------------------------------------------------
// ConditionalQuestionPanel
// TaPaaS preview composite — shows extra fields based on a radio answer.
// Uses fieldset/legend for accessibility. Conditional content appears
// immediately after the radio group.
// ---------------------------------------------------------------------------
export interface ConditionalQuestionPanelProps {
  id: string
  legend: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  /** Show children only when value matches this string. Defaults to showing for any truthy value if not set. */
  showWhen?: string
  hasError?: boolean
  errorMessage?: string
  children?: React.ReactNode
}

export function ConditionalQuestionPanel({ id, legend, options, value, onChange, showWhen, hasError, errorMessage, children }: ConditionalQuestionPanelProps) {
  const errorId = `${id}-error`
  const shouldShowChildren = showWhen ? value === showWhen : Boolean(value)
  return (
    <fieldset
      id={id}
      aria-invalid={hasError || undefined}
      aria-describedby={hasError && errorMessage ? errorId : undefined}
      style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}
      data-tapaas-component='conditional-question-panel'
    >
      <legend style={{ fontFamily: 'var(--gel-font-body)', fontSize: '1rem', fontWeight: 500, marginBottom: '1rem', padding: 0, color: 'var(--gel-color-text)' }}>
        {legend}
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {options.map((option) => {
          const inputId = `${id}-${option.value}`
          const checked = option.value === value
          const borderColor = hasError ? 'var(--gel-color-error)' : checked ? '#002664' : '#646974'
          return (
            <div key={option.value} style={{ position: 'relative', minHeight: '2rem', paddingLeft: '3rem' }}>
              <input
                type='radio' id={inputId} name={id} value={option.value}
                checked={checked} onChange={() => onChange(option.value)}
                className='snsw-preview-control-input'
                style={{ position: 'absolute', width: '2.75rem', height: '2.75rem', opacity: 0, top: '-0.375rem', left: '-0.375rem', cursor: 'pointer' }}
              />
              <label htmlFor={inputId} style={{ display: 'block', cursor: 'pointer', fontFamily: 'var(--gel-font-body)', fontSize: '1rem', color: 'var(--gel-color-text)', lineHeight: '2rem', position: 'relative' }}>
                <span aria-hidden='true' style={{ position: 'absolute', left: '-3rem', top: 0, width: '2rem', height: '2rem', borderRadius: '50%', border: `2px solid ${borderColor}`, boxSizing: 'border-box', backgroundColor: 'var(--gel-color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {checked && <span style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: '#002664' }} />}
                </span>
                {option.label}
              </label>
            </div>
          )
        })}
      </div>
      {shouldShowChildren && children && (
        <div style={{ marginTop: '1rem', borderLeft: '3px solid var(--gel-color-border)', paddingLeft: '1rem' }}>
          {children}
        </div>
      )}
      {hasError && errorMessage && (
        <div id={errorId} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: 'var(--gel-color-error-bg)', padding: '0.5rem 1rem 0.5rem 0.625rem', marginTop: '0.75rem', fontWeight: 700, fontSize: '1rem', lineHeight: 1.5 }}>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='var(--gel-color-error)' style={{ flexShrink: 0, marginTop: '2px' }}>
            <path d='M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm1 15H9v-2h2v2Zm0-4H9V5h2v6Z' />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </fieldset>
  )
}
