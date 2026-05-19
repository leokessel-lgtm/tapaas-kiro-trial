/**
 * Preview-only local GEL components.
 * Replace src/gel.ts exports with @snsw-gel/react exports when registry access is available.
 *
 * API shapes are derived from the GEL source snapshot (read-only reference):
 *   gel-packages-source-snapshot/packages/{component}/src/
 *
 * These components are for visual prototyping only.
 * They do not replicate GEL's full accessibility behaviour, theming, or design tokens.
 *
 * TaPaaS styling takes precedence where GEL and TaPaaS conflict.
 */

import React, {
  forwardRef,
  PropsWithChildren,
  HTMLAttributes,
} from 'react'
import './styles.css'

// ---------------------------------------------------------------------------
// GlobalStyle
// ---------------------------------------------------------------------------
export function GlobalStyle({ children }: PropsWithChildren<{ themes?: unknown[] }>) {
  return <>{children}</>
}

// ---------------------------------------------------------------------------
// ContentContainer
// ---------------------------------------------------------------------------
export function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0 1rem' }}>
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export function Section({ children }: PropsWithChildren) {
  return (
    <section style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Heading
// ---------------------------------------------------------------------------
export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Heading({ level = 1, children, style, ...rest }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType
  const sizeMap: Record<number, string> = { 1: '2rem', 2: '1.5rem', 3: '1.25rem', 4: '1.125rem', 5: '1rem', 6: '0.875rem' }
  return (
    <Tag
      style={{
        fontFamily: 'var(--gel-font-body)',
        fontSize: sizeMap[level],
        fontWeight: 700,
        lineHeight: 1.25,
        color: 'var(--gel-color-text)',
        margin: '0 0 1rem',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// ---------------------------------------------------------------------------
// ErrorSummary
// Uses role="group" + aria-labelledby instead of role="alert" to avoid
// double-announcement when focus is programmatically moved to the container.
// ---------------------------------------------------------------------------
export interface ErrorSummaryProps {
  errors: { id: string; text: string }[]
  singularTitle?: string
  pluralTitle?: string
  id?: string
}

export const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(
  function ErrorSummary(
    { errors, singularTitle = 'Your form has an error', pluralTitle = 'Your form has errors', id },
    ref,
  ) {
    const isMoreThanOne = errors.length > 1
    const title = isMoreThanOne ? pluralTitle : singularTitle
    const titleId = id ? `${id}-title` : 'error-summary-title'

    if (errors.length === 0) return null

    return (
      <div
        id={id}
        ref={ref}
        role='group'
        aria-labelledby={titleId}
        tabIndex={-1}
        className='gel-error-summary'
        data-gelweb-component='error-summary'
      >
        <span aria-hidden='true' className='gel-error-summary__icon'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='var(--gel-color-error)' xmlns='http://www.w3.org/2000/svg'>
            <path d='M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm1 15H9v-2h2v2Zm0-4H9V5h2v6Z' />
          </svg>
        </span>
        <strong id={titleId} style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          {title}
        </strong>
        <p style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>
          {isMoreThanOne ? `Check the ${errors.length} errors:` : 'Check the error:'}
        </p>
        {isMoreThanOne ? (
          <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {errors.map(({ id: errorId, text }) => (
              <li key={errorId}>
                <a href={errorId.startsWith('#') ? errorId : `#${errorId}`} style={{ color: 'var(--gel-color-error)', fontWeight: 700 }}>
                  {text.replace(/\.$/, '')}
                </a>.
              </li>
            ))}
          </ol>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {errors.map(({ id: errorId, text }) => (
              <li key={errorId}>
                <a href={errorId.startsWith('#') ? errorId : `#${errorId}`} style={{ color: 'var(--gel-color-error)', fontWeight: 700 }}>
                  {text.replace(/\.$/, '')}
                </a>.
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  },
)

// ---------------------------------------------------------------------------
// RadioButtonList
// Now renders inline errorMessage and uses brand colour for selected state.
// ---------------------------------------------------------------------------
export interface RadioButtonListOption<T = string> {
  value: T
  label: React.ReactNode
}

export interface RadioButtonListProps<T = string> {
  id?: string
  legend: React.ReactNode
  options: RadioButtonListOption<T>[]
  value?: T
  onChange?: (value: T) => void
  hasError?: boolean
  errorMessage?: string
  vertical?: boolean
}

export const RadioButtonList = forwardRef<HTMLFieldSetElement, RadioButtonListProps>(
  function RadioButtonList(
    { id, legend, options, value, onChange, hasError, errorMessage, vertical = true },
    ref,
  ) {
    const baseId = id ?? 'radio-group'
    const errorId = `${baseId}-error`

    return (
      <fieldset
        id={id}
        ref={ref}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError && errorMessage ? errorId : undefined}
        style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}
      >
        <legend style={{ fontFamily: 'var(--gel-font-body)', fontSize: '1rem', fontWeight: 500, marginBottom: '1.125rem', padding: 0, color: 'var(--gel-color-text)' }}>
          {legend}
        </legend>

        <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', gap: '1.25rem' }}>
          {options.map((option, index) => {
            const inputId = `${baseId}-${index}`
            const checked = option.value === value
            const borderColor = hasError ? 'var(--gel-color-error)' : checked ? '#002664' : '#646974'
            const dotColor = '#002664'

            return (
              <div key={String(option.value)} style={{ position: 'relative', minHeight: '2rem', paddingLeft: '3rem' }}>
                <input
                  type='radio'
                  id={inputId}
                  name={baseId}
                  value={String(option.value)}
                  checked={checked}
                  onChange={() => onChange?.(option.value)}
                  aria-required={hasError ? true : undefined}
                  className='snsw-preview-control-input'
                  style={{ position: 'absolute', width: '2.75rem', height: '2.75rem', opacity: 0, top: '-0.375rem', left: '-0.375rem', cursor: 'pointer' }}
                />
                <label htmlFor={inputId} style={{ display: 'block', cursor: 'pointer', fontFamily: 'var(--gel-font-body)', fontSize: '1rem', color: 'var(--gel-color-text)', lineHeight: '2rem', position: 'relative' }}>
                  <span
                    aria-hidden='true'
                    style={{
                      position: 'absolute', left: '-3rem', top: 0, width: '2rem', height: '2rem',
                      borderRadius: '50%', border: `2px solid ${borderColor}`, boxSizing: 'border-box',
                      backgroundColor: 'var(--gel-color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {checked && <span style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: dotColor }} />}
                  </span>
                  {option.label}
                </label>
              </div>
            )
          })}
        </div>

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
  },
)

// ---------------------------------------------------------------------------
// Button
// Added hover class and min-height for link variant.
// ---------------------------------------------------------------------------
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({ children, onClick, variant = 'primary', type = 'button', disabled, style, ...rest }: ButtonProps) {
  const isPrimary = variant === 'primary'
  const isLink = variant === 'link'

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--gel-font-body)', fontSize: '1rem', fontWeight: 600, lineHeight: '1.5em',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
    textDecoration: 'none', transition: 'border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease',
  }

  const variantStyles: React.CSSProperties = isLink
    ? { background: 'none', border: 'none', padding: '0.5rem 2px', color: 'var(--gel-color-link)', textDecoration: 'underline', borderRadius: '0', minWidth: 'auto', minHeight: '44px' }
    : { padding: '0.75rem 1.5rem', borderRadius: '6px', border: '2px solid var(--gel-color-primary)', backgroundColor: isPrimary ? 'var(--gel-color-primary)' : 'transparent', color: isPrimary ? 'var(--gel-color-white)' : 'var(--gel-color-primary)', minWidth: '200px' }

  return (
    <button
      type={type} onClick={onClick} disabled={disabled}
      className={`gel-btn gel-btn--${variant}`}
      style={{ ...baseStyles, ...variantStyles, ...style }}
      {...rest}
    >
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// TextLink
// ---------------------------------------------------------------------------
export interface TextLinkProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  href?: string
}

export function TextLink({ children, onClick, href }: TextLinkProps) {
  if (href) {
    return <a href={href} style={{ color: 'var(--gel-color-link)', textDecoration: 'underline', fontFamily: 'var(--gel-font-body)', fontSize: '1rem', cursor: 'pointer' }}>{children}</a>
  }
  return (
    <button type='button' onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--gel-color-link)', textDecoration: 'underline', fontFamily: 'var(--gel-font-body)', fontSize: '1rem', cursor: 'pointer' }}>
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Checkbox
// Uses brand colour (#002664) for checked state. Adds aria-describedby for error.
// ---------------------------------------------------------------------------
export interface CheckboxProps {
  id?: string
  label: React.ReactNode
  checked?: boolean
  onChange?: (value: string) => void
  hasError?: boolean
  errorMessage?: string
  disabled?: boolean
  value?: string
}

export function Checkbox({ id, label, checked = false, onChange, hasError, errorMessage, disabled, value = 'on' }: CheckboxProps) {
  const elemId = id ?? 'checkbox'
  const errorId = `${elemId}-error`
  const borderColor = hasError ? 'var(--gel-color-error)' : checked ? '#002664' : '#646974'
  const checkColor = '#002664'

  return (
    <div style={{ margin: '0 0 1.5rem', position: 'relative', minHeight: '2rem' }} data-gelweb-component='checkbox'>
      <div style={{ position: 'relative', paddingLeft: '3rem' }}>
        <input
          type='checkbox' id={elemId} checked={checked}
          onChange={(e) => onChange?.(e.target.checked ? value : '')}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-required={hasError ? true : undefined}
          aria-describedby={hasError && errorMessage ? errorId : undefined}
          className='snsw-preview-control-input'
          style={{ position: 'absolute', width: '2.75rem', height: '2.75rem', opacity: 0, top: '-0.375rem', left: '-0.375rem', cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
        <label htmlFor={elemId} style={{ display: 'block', cursor: disabled ? 'not-allowed' : 'pointer', fontSize: '1rem', lineHeight: 1.5, fontFamily: 'var(--gel-font-body)', color: 'var(--gel-color-text)', position: 'relative', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}>
          <span
            aria-hidden='true'
            style={{
              position: 'absolute', left: '-3rem', top: '0', width: '2rem', height: '2rem',
              border: `2px solid ${borderColor}`, borderRadius: '4px', boxSizing: 'border-box',
              backgroundColor: checked ? '#002664' : 'var(--gel-color-white)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {checked && (
              <svg width='14' height='11' viewBox='0 0 14 11' fill='#ffffff'>
                <path d='M13.4 1.4c.2-.2.2-.5 0-.7L11.8.1c-.2-.2-.5-.2-.7 0L5 6.2 2.9 4.1c-.2-.2-.5-.2-.7 0L.6 5.7c-.2.2-.2.5 0 .7l4.1 4.1c.2.2.5.2.7 0l8-8Z' />
              </svg>
            )}
          </span>
          {label}
        </label>
      </div>
      {hasError && errorMessage && (
        <div id={errorId} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: 'var(--gel-color-error-bg)', padding: '0.5rem 1rem 0.5rem 0.625rem', marginTop: '0.5rem', fontWeight: 700, fontSize: '1rem', lineHeight: 1.5 }}>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='var(--gel-color-error)' style={{ flexShrink: 0, marginTop: '2px' }}>
            <path d='M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm1 15H9v-2h2v2Zm0-4H9V5h2v6Z' />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// InPageAlert
// ---------------------------------------------------------------------------
export interface InPageAlertProps {
  variant: 'error' | 'warning' | 'success' | 'info'
  title: string
  children?: React.ReactNode
  compact?: boolean
  style?: React.CSSProperties
}

const alertColors = {
  error: { border: 'var(--gel-color-error)', bg: 'var(--gel-color-error-bg)', icon: '⊘' },
  warning: { border: '#c95000', bg: '#fbeee5', icon: '⚠' },
  success: { border: '#008a07', bg: '#e5f6e6', icon: '✓' },
  info: { border: '#2e5299', bg: '#eaedf4', icon: 'ℹ' },
}

export function InPageAlert({ variant, title, children, compact, style }: InPageAlertProps) {
  const colors = alertColors[variant]
  return (
    <div
      role={variant === 'error' ? 'alert' : 'note'}
      style={{
        borderLeft: `4px solid ${colors.border}`, backgroundColor: colors.bg,
        padding: compact ? '0.625rem 1rem' : '1rem 1.25rem',
        paddingLeft: compact ? '1rem' : '3.25rem',
        marginBottom: compact ? '0' : '1.5rem', position: 'relative',
        fontSize: compact ? '0.9375rem' : '1rem', lineHeight: 1.5, ...style,
      }}
      data-gelweb-component={`in-page-alert-${variant}`}
    >
      <span aria-hidden='true' style={{ position: 'absolute', left: compact ? undefined : '1rem', top: compact ? '50%' : '1rem', transform: compact ? 'translateY(-50%)' : undefined, fontSize: '1.25rem', color: colors.border, fontWeight: 700, display: compact ? 'none' : 'block' }}>
        {colors.icon}
      </span>
      <strong style={{ display: 'block', fontWeight: 700 }}>{title}</strong>
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Field
// Fixed: label margin reduced to 0.5rem, help text margin fixed,
// aria-describedby wired to error and help text.
// ---------------------------------------------------------------------------
export interface FieldProps {
  id?: string
  label: React.ReactNode
  helpMessage?: string
  hasError?: boolean
  errorMessage?: string
  children?: React.ReactNode
  isOptional?: boolean
}

export function Field({ id, label, helpMessage, hasError, errorMessage, children, isOptional }: FieldProps) {
  const elemId = id ?? 'field'
  const helpId = helpMessage ? `${elemId}-help` : undefined
  const errorMsgId = hasError && errorMessage ? `${elemId}-error` : undefined
  const describedBy = [helpId, errorMsgId].filter(Boolean).join(' ') || undefined

  return (
    <div style={{ margin: '0 0 1.5rem', maxWidth: '48rem' }} data-gelweb-component='field'>
      <label htmlFor={elemId} style={{ display: 'block', fontWeight: 500, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--gel-color-text)' }}>
        {label}{isOptional && ' (optional)'}
      </label>
      {helpMessage && (
        <p id={helpId} style={{ fontSize: '0.875rem', margin: '0 0 0.5rem', color: 'var(--gel-color-text-grey, #646974)' }}>
          {helpMessage}
        </p>
      )}
      {children && React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            'aria-describedby': describedBy,
            'aria-invalid': hasError || undefined,
            'aria-required': hasError ? true : undefined,
          })
        : children
      }
      {hasError && errorMessage && (
        <div id={errorMsgId} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: 'var(--gel-color-error-bg)', padding: '0.5rem 1rem 0.5rem 0.625rem', marginTop: '0.5rem', fontWeight: 700, fontSize: '1rem', lineHeight: 1.5 }}>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='var(--gel-color-error)' style={{ flexShrink: 0, marginTop: '2px' }}>
            <path d='M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm1 15H9v-2h2v2Zm0-4H9V5h2v6Z' />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Input
// Fixed: removed outline:none so :focus-visible CSS works. Added aria-invalid.
// ---------------------------------------------------------------------------
export interface InputProps {
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  hasError?: boolean
  disabled?: boolean
  type?: string
  inputWidth?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  placeholder?: string
  name?: string
  maxLength?: number
}

const inputWidthMap: Record<string, string> = { xxs: '56px', xs: '92px', sm: '132px', md: '200px', lg: '268px', xl: '416px' }

export function Input({ id, value, onChange, hasError, disabled, type = 'text', inputWidth, placeholder, name, maxLength, ...rest }: InputProps & Record<string, unknown>) {
  return (
    <input
      id={id} type={type} value={value} onChange={onChange} disabled={disabled}
      placeholder={placeholder} name={name} maxLength={maxLength}
      aria-invalid={hasError || undefined}
      className='gel-input'
      style={{
        display: 'block',
        width: inputWidth ? inputWidthMap[inputWidth] || '100%' : '100%',
        maxWidth: inputWidth ? undefined : '372px',
        height: '48px', padding: '0 0.825rem', fontSize: '1rem',
        fontFamily: 'var(--gel-font-body)',
        border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
        borderRadius: '6px', boxSizing: 'border-box',
        color: 'var(--gel-color-text)', backgroundColor: 'var(--gel-color-white)',
      }}
      data-gelweb-component='input'
      {...rest}
    />
  )
}

// ---------------------------------------------------------------------------
// Textarea
// Fixed: removed outline:none, added aria-invalid, uses gel-textarea class.
// ---------------------------------------------------------------------------
export interface TextareaProps {
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  hasError?: boolean
  disabled?: boolean
  placeholder?: string
  maxLength?: number
  rows?: number
}

export function Textarea({ id, value, onChange, hasError, disabled, placeholder, maxLength, rows = 4, ...rest }: TextareaProps & Record<string, unknown>) {
  return (
    <textarea
      id={id} value={value} onChange={onChange} disabled={disabled}
      placeholder={placeholder} maxLength={maxLength} rows={rows}
      aria-invalid={hasError || undefined}
      className='gel-textarea'
      style={{
        display: 'block', width: '100%', maxWidth: '100%',
        padding: '0.825rem', fontSize: '1rem', fontFamily: 'var(--gel-font-body)',
        border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
        borderRadius: '6px', boxSizing: 'border-box',
        color: 'var(--gel-color-text)', backgroundColor: 'var(--gel-color-white)',
        resize: 'vertical', lineHeight: 1.5,
      }}
      data-gelweb-component='textarea'
      {...rest}
    />
  )
}

// ---------------------------------------------------------------------------
// Select
// Fixed: removed outline:none, added aria-invalid, placeholder colour.
// ---------------------------------------------------------------------------
export interface SelectProps {
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  hasError?: boolean
  disabled?: boolean
  options: { value: string; text: string }[]
  placeholder?: string
  inputWidth?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function Select({ id, value, onChange, hasError, disabled, options, placeholder = 'Select', inputWidth, ...rest }: SelectProps & Record<string, unknown>) {
  const isPlaceholder = !value
  return (
    <select
      id={id} value={value} onChange={onChange} disabled={disabled}
      aria-invalid={hasError || undefined}
      className='gel-select'
      style={{
        display: 'block',
        width: inputWidth ? inputWidthMap[inputWidth] || '100%' : '100%',
        maxWidth: inputWidth ? undefined : '372px',
        height: '48px', padding: '0 0.825rem', fontSize: '1rem',
        fontFamily: 'var(--gel-font-body)',
        border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
        borderRadius: '6px', boxSizing: 'border-box',
        color: isPlaceholder ? 'var(--gel-color-text-grey)' : 'var(--gel-color-text)',
        backgroundColor: 'var(--gel-color-white)',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='12' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23002664' d='M12 2c0-.1 0-.1-.1-.2L10.3.1c-.1-.1-.3-.1-.4 0L6 4 2.1 0c-.1 0-.3 0-.4.1L.1 1.7c-.1.1-.1.3 0 .4l5.7 5.8c.1.1.3.1.4 0l5.7-5.8c.1 0 .1-.1.1-.1z'/%3E%3C/svg%3E")`,
        backgroundPosition: 'center right 18px', backgroundRepeat: 'no-repeat',
        paddingRight: '2.5rem', cursor: 'pointer',
      }}
      data-gelweb-component='select'
      {...rest}
    >
      <option value=''>{placeholder}</option>
      {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
    </select>
  )
}


// ---------------------------------------------------------------------------
// ProgressStepper
// Source-backed GEL preview component.
// Evidence: docs/source-evidence/gel-progress-stepper/
// Package: @snsw-gel/progress-stepper
// Usage boundary: 4 to 6 steps only. Do not use for 8+ step flows.
// Mobile: shows step counter text only. Desktop: shows step names.
// Does not replace the aria-live text step indicator.
// ---------------------------------------------------------------------------
export interface ProgressStepperProps {
  stepsList: { content: string; status: 'completed' | 'current' | 'todo' }[]
}

export function ProgressStepper({ stepsList }: ProgressStepperProps) {
  const numberOfSteps = stepsList.length
  const currentIndex = stepsList.findIndex(s => s.status === 'current')
  const currentStepNumber = currentIndex !== -1 ? currentIndex + 1 : (stepsList.every(s => s.status === 'completed') ? numberOfSteps : 1)

  return (
    <div data-gelweb-component='progress-stepper' className='gel-progress-stepper'>
      {/* Mobile: step counter only */}
      <span className='gel-progress-stepper__mobile-label'>
        Step {currentStepNumber} of {numberOfSteps}
      </span>
      {/* Desktop: full step list */}
      <ol className='gel-progress-stepper__list'>
        {stepsList.map((step, index) => (
          <li key={index} className={`gel-progress-stepper__step gel-progress-stepper__step--${step.status}`}>
            <div className='gel-progress-stepper__position' aria-hidden='true'>
              {step.status === 'completed' ? (
                <svg width='14' height='14' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M13.17 1.86c.57-.68 1.57-.77 2.25-.2.64.53.76 1.45.31 2.12l-.1.13-8.5 10.23c-.56.67-1.54.76-2.21.24l-.13-.11-4.3-4.18c-.63-.62-.65-1.63-.04-2.26.58-.59 1.5-.64 2.14-.14l.12.11 3.07 2.98 7.4-8.9z' fill='currentColor'/>
                </svg>
              ) : (
                <span className='gel-progress-stepper__number'>{index + 1}</span>
              )}
            </div>
            <span className='gel-progress-stepper__label'>
              {(step.status === 'completed' || step.status === 'current') && (
                <span className='gel-sr-only'>{step.status === 'completed' ? 'Completed' : 'Current'}: Step {index + 1} </span>
              )}
              {step.status === 'todo' && (
                <span className='gel-sr-only'>Step {index + 1} </span>
              )}
              <span>{step.content}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MoreInfoDisclosure (inline disclosure variant)
// Source evidence: docs/source-evidence/gel-components/more-info-panel/
// GEL MoreInfoPanel source is a modal dialog with portal, backdrop, focus lock,
// Escape close and return-focus. That behaviour needs engineer review.
// This preview implements a simplified inline disclosure for contextual help.
// Classification: GEL variant. Maturity: needs engineer review.
// Full GEL modal MoreInfoPanel behaviour is future work.
// ---------------------------------------------------------------------------
export interface MoreInfoDisclosureProps {
  triggerText: string
  title: string
  children: React.ReactNode
}

export function MoreInfoDisclosure({ triggerText, title, children }: MoreInfoDisclosureProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const panelId = `more-info-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <div className='gel-more-info-panel' data-gelweb-component='more-info-disclosure' style={{ margin: '0.5rem 0 1rem' }}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className='gel-more-info-panel__trigger'
      >
        <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor' aria-hidden='true' style={{ marginRight: '0.375rem', verticalAlign: 'middle' }}>
          <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm.8 12H7.2V7.2h1.6V12Zm0-6.4H7.2V4h1.6v1.6Z'/>
        </svg>
        {triggerText}
      </button>
      {isOpen && (
        <div id={panelId} className='gel-more-info-panel__content' role='region' aria-label={title}>
          <strong style={{ display: 'block', marginBottom: '0.5rem' }}>{title}</strong>
          {children}
        </div>
      )}
    </div>
  )
}

/** @deprecated Use MoreInfoDisclosure. This alias exists for backwards compatibility only. */
export const MoreInfoPanel = MoreInfoDisclosure

// ---------------------------------------------------------------------------
// Accordion
// Source evidence: docs/source-evidence/gel-components/accordion/
// Uses button-based headings with aria-expanded and aria-controls.
// Open all / Close all: after toggling, focus moves to the opposite button
// (matching GEL source nextFocusTarget pattern).
// Classification: GEL-aligned. Maturity: needs engineer review.
// ---------------------------------------------------------------------------
export interface AccordionItemData {
  id?: string
  title: string
  children: React.ReactNode
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  defaultExpanded?: boolean
}

export interface AccordionProps {
  id: string
  items: AccordionItemData[]
  name?: string
}

export function Accordion({ id, items, name = 'sections' }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    const defaults = new Set<string>()
    items.forEach((item, i) => { if (item.defaultExpanded) defaults.add(item.id || `${id}-${i}`) })
    return defaults
  })
  const openAllRef = React.useRef<HTMLButtonElement>(null)
  const closeAllRef = React.useRef<HTMLButtonElement>(null)
  const pendingFocusRef = React.useRef<'open' | 'close' | null>(null)

  React.useEffect(() => {
    if (pendingFocusRef.current === 'close' && closeAllRef.current) {
      closeAllRef.current.focus()
      pendingFocusRef.current = null
    } else if (pendingFocusRef.current === 'open' && openAllRef.current) {
      openAllRef.current.focus()
      pendingFocusRef.current = null
    }
  }, [openItems])

  function handleOpenAll() {
    setOpenItems(new Set(items.map((item, i) => item.id || `${id}-${i}`)))
    pendingFocusRef.current = 'close'
  }

  function handleCloseAll() {
    setOpenItems(new Set())
    pendingFocusRef.current = 'open'
  }

  function toggle(itemId: string) {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(itemId)) { next.delete(itemId) } else { next.add(itemId) }
      return next
    })
  }

  const allOpen = openItems.size === items.length
  const allClosed = openItems.size === 0

  return (
    <div id={id} data-gelweb-component='accordion-group' className='gel-accordion'>
      {items.length >= 2 && (
        <div className='gel-accordion__toggles'>
          <button ref={openAllRef} type='button' className='gel-accordion__toggle-btn' onClick={handleOpenAll} disabled={allOpen}>
            Open all <span className='gel-sr-only'>{name}</span>
          </button>
          <button ref={closeAllRef} type='button' className='gel-accordion__toggle-btn' onClick={handleCloseAll} disabled={allClosed}>
            Close all <span className='gel-sr-only'>{name}</span>
          </button>
        </div>
      )}
      {items.map((item, i) => {
        const itemId = item.id || `${id}-${i}`
        const buttonId = `${itemId}-button`
        const panelId = `${itemId}-panel`
        const isOpen = openItems.has(itemId)
        const HeadingTag = (item.headingLevel || 'h3') as React.ElementType

        return (
          <div key={itemId} className='gel-accordion__item' data-gelweb-component='accordion-item'>
            <HeadingTag style={{ margin: 0 }}>
              <button
                type='button'
                id={buttonId}
                className='gel-accordion__button'
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(itemId)}
              >
                <span>{item.title}</span>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='currentColor' aria-hidden='true' style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                  <path d='M8 11.4L1.3 4.7l1.4-1.4L8 8.6l5.3-5.3 1.4 1.4z'/>
                </svg>
              </button>
            </HeadingTag>
            <section id={panelId} className={`gel-accordion__content ${isOpen ? 'gel-accordion__content--open' : ''}`} aria-labelledby={buttonId} hidden={!isOpen}>
              <div className='gel-accordion__content-padding'>
                {item.children}
              </div>
            </section>
          </div>
        )
      })}
    </div>
  )
}
