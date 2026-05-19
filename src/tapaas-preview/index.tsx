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
        <Heading level={2} style={{ marginBottom: 0 }} id={`${slugify(title)}-heading`}>
          {title}
        </Heading>
        {onEdit && (
          <TextLink onClick={onEdit}>Edit</TextLink>
        )}
      </div>
      {sections.map((section) => (
        <div className='tapaas-review-section' key={section.title}>
          <Heading level={3}>{section.title}</Heading>
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
      <Heading level={2} id='review-fees-heading'>{title}</Heading>
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
    <div className='tapaas-cta-group' aria-label='Transaction actions'>
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
