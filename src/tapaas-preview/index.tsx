import React from 'react'
import { Accordion, Button, Heading, TextLink } from '../gel'
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
    <div className='tapaas-cta-group' role='group' aria-label='Transaction actions'>
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
        <Heading level={2} id='business-error-heading'>{title}</Heading>
        <div>{message}</div>
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
  items,
  children,
}: {
  title?: string
  items: EvidenceChecklistItem[]
  children?: React.ReactNode
}) {
  return (
    <section className='tapaas-card tapaas-evidence-card' aria-labelledby={`${slugify(title)}-heading`}>
      <Heading level={3} id={`${slugify(title)}-heading`}>{title}</Heading>
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
    <section className='tapaas-card tapaas-declaration-review' aria-labelledby={`${slugify(title)}-declaration-review-heading`}>
      <Heading level={3} id={`${slugify(title)}-declaration-review-heading`}>{title}</Heading>
      <p>{intro}</p>
      {sections.map((section) => (
        <div className='tapaas-declaration-section' key={section.title}>
          <Heading level={4}>{section.title}</Heading>
          <ul className='tapaas-declaration-list'>
            {section.statements.map((statement, index) => <li key={index}>{statement}</li>)}
          </ul>
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
  title = 'Privacy and notifications',
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
        Service NSW delivers this service on behalf of the responsible agency. Replace this placeholder with the confirmed privacy collection notice before reuse.
      </p>
    ),
  },
  {
    id: 'terms-and-conditions',
    title: 'Terms and Conditions',
    content: <p>You have agreed to the terms and conditions for this mock transaction. Confirm the real wording with the service owner.</p>,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    content: <p>We may send mock updates about this transaction. Real notification wording and channels need owner confirmation.</p>,
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
      <div className='tapaas-card-heading-row'>
        <div>
          <Heading level={headingLevel} style={{ marginBottom: description ? '0.25rem' : 0 }} id={id}>{title}</Heading>
          {description && <p className='tapaas-help-text'>{description}</p>}
        </div>
        {statusLabel && <span className='tapaas-status-pill tapaas-status-pill--needs-review'>{statusLabel}</span>}
      </div>
      <dl className='tapaas-summary-list'>
        {rows.map((row) => (
          <div className='tapaas-summary-row' key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className='tapaas-card-actions' aria-label={`${title} actions`}>
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant || 'secondary'}
            onClick={action.onAction}
          >
            {action.label}
          </Button>
        ))}
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
  errorMessage = 'Select an option to continue',
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
  return (
    <fieldset
      className={`tapaas-radio-card-fieldset ${hasError ? 'tapaas-radio-card-fieldset--error' : ''}`}
      aria-describedby={hasError ? errorId : undefined}
      aria-invalid={hasError || undefined}
    >
      <legend className='tapaas-radio-card-legend'>{legend}</legend>
      <div className='tapaas-radio-card-set'>
        {options.map((option) => {
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
              />
              <span className='tapaas-radio-card__body'>
                <span className='tapaas-radio-card__pictogram' aria-hidden='true'>{option.pictogram || '○'}</span>
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
