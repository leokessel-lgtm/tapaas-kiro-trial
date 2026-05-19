import React from 'react'
import { Button, Heading, TextLink } from '../gel'
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

export function ConfirmationHeader({
  title,
  transactionName,
}: {
  title: string
  transactionName: string
}) {
  return (
    <header className='tapaas-confirmation-header' role='status' aria-label='Transaction completed'>
      <span className='tapaas-confirmation-icon' aria-hidden='true'>✓</span>
      <div>
        <p className='tapaas-kicker'>{transactionName}</p>
        <Heading level={1} style={{ marginBottom: 0 }}>{title}</Heading>
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
          <TextLink onClick={onEdit}>Edit <span className='gel-sr-only'>{title}</span></TextLink>
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

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
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
  hasError?: boolean
  errorMessage?: string
  children?: React.ReactNode
}

export function ConditionalQuestionPanel({ id, legend, options, value, onChange, hasError, errorMessage, children }: ConditionalQuestionPanelProps) {
  const errorId = `${id}-error`
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
      {value && children && (
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
