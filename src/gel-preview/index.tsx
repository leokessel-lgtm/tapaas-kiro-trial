/**
 * Preview-only local GEL components.
 * Replace src/gel.ts exports with @snsw-gel/react exports when registry access is available.
 *
 * API shapes are derived from the GEL source snapshot (read-only reference):
 *   gel-packages-source-snapshot/packages/{component}/src/
 *
 * These components are for visual prototyping only.
 * They do not replicate GEL's full accessibility behaviour, theming, or design tokens.
 */

import React, {
  forwardRef,
  PropsWithChildren,
  HTMLAttributes,
} from 'react'
import './styles.css'

// ---------------------------------------------------------------------------
// GlobalStyle
// API mirrors: @snsw-gel/theming GlobalStyle
// Accepts optional `themes` prop (ignored in preview — no real theming).
// ---------------------------------------------------------------------------
export function GlobalStyle({ children }: PropsWithChildren<{ themes?: unknown[] }>) {
  return <>{children}</>
}

// ---------------------------------------------------------------------------
// ContentContainer
// API mirrors: @snsw-gel/page ContentContainer
// ---------------------------------------------------------------------------
export function ContentContainer({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        maxWidth: '768px',
        margin: '0 auto',
        padding: '0 1rem',
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section
// API mirrors: @snsw-gel/page Section (styled div)
// ---------------------------------------------------------------------------
export function Section({ children }: PropsWithChildren) {
  return (
    <section
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Heading
// API mirrors: @snsw-gel/content Heading
// Props: level (1–6), children
// ---------------------------------------------------------------------------
export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Heading({ level = 1, children, style, ...rest }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType

  const sizeMap: Record<number, string> = {
    1: '2rem',
    2: '1.5rem',
    3: '1.25rem',
    4: '1.125rem',
    5: '1rem',
    6: '0.875rem',
  }

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
// API mirrors: @snsw-gel/error-summary ErrorSummary
// Props: errors [{ id, text }], singularTitle, pluralTitle
// Accepts ref for focus management (forwarded to the container div).
// ---------------------------------------------------------------------------
export interface ErrorSummaryProps {
  errors: { id: string; text: string }[]
  singularTitle?: string
  pluralTitle?: string
  id?: string
}

export const ErrorSummary = forwardRef<HTMLDivElement, ErrorSummaryProps>(
  function ErrorSummary(
    {
      errors,
      singularTitle = 'Your form has an error',
      pluralTitle = 'Your form has errors',
      id,
    },
    ref,
  ) {
    const isMoreThanOne = errors.length > 1
    const title = isMoreThanOne ? pluralTitle : singularTitle

    if (errors.length === 0) return null

    return (
      <div
        id={id}
        ref={ref}
        role='alert'
        tabIndex={-1}
        style={{
          borderLeft: '4px solid var(--gel-color-error)',
          backgroundColor: 'var(--gel-color-error-bg)',
          padding: '1rem 1.25rem 1rem 3.25rem',
          marginBottom: '1.5rem',
          outline: 'none',
          position: 'relative',
        }}
        data-gelweb-component='error-summary'
      >
        <span
          aria-hidden='true'
          style={{
            position: 'absolute',
            left: '1rem',
            top: '1.125rem',
            width: '20px',
            height: '20px',
          }}
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='var(--gel-color-error)' xmlns='http://www.w3.org/2000/svg'>
            <path d='M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm1 15H9v-2h2v2Zm0-4H9V5h2v6Z' />
          </svg>
        </span>
        <strong style={{ display: 'block', fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          {title}
        </strong>
        <p style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>
          {isMoreThanOne ? `Check the ${errors.length} errors:` : 'Check the error:'}
        </p>
        {isMoreThanOne ? (
          <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {errors.map(({ id: errorId, text }) => (
              <li key={errorId}>
                <a
                  href={errorId.startsWith('#') ? errorId : `#${errorId}`}
                  style={{ color: 'var(--gel-color-error)', fontWeight: 700 }}
                >
                  {text.replace(/\.$/, '')}
                </a>
                .
              </li>
            ))}
          </ol>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {errors.map(({ id: errorId, text }) => (
              <li key={errorId}>
                <a
                  href={errorId.startsWith('#') ? errorId : `#${errorId}`}
                  style={{ color: 'var(--gel-color-error)', fontWeight: 700 }}
                >
                  {text.replace(/\.$/, '')}
                </a>
                .
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
// API mirrors: @snsw-gel/radio-button-list RadioButtonList
// Props: id, legend, options [{ value, label }], value, onChange,
//        hasError, errorMessage, vertical
// Accepts ref forwarded to the fieldset element.
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

    return (
      <fieldset
        id={id}
        ref={ref}
        aria-invalid={hasError || undefined}
        style={{
          border: 'none',
          padding: 0,
          margin: '0 0 1.5rem',
        }}
      >
        <legend
          style={{
            fontFamily: 'var(--gel-font-body)',
            fontSize: '1rem',
            fontWeight: 500,
            marginBottom: '1.125rem',
            padding: 0,
            color: 'var(--gel-color-text)',
          }}
        >
          {legend}
        </legend>

        <div
          style={{
            display: 'flex',
            flexDirection: vertical ? 'column' : 'row',
            gap: '1.25rem',
          }}
        >
          {options.map((option, index) => {
            const inputId = `${baseId}-${index}`
            const checked = option.value === value

            return (
              <div
                key={String(option.value)}
                style={{ position: 'relative', minHeight: '2rem', paddingLeft: '3rem' }}
              >
                <input
                  type='radio'
                  id={inputId}
                  name={baseId}
                  value={String(option.value)}
                  checked={checked}
                  onChange={() => onChange?.(option.value)}
                  className='snsw-preview-control-input'
                  style={{
                    position: 'absolute',
                    width: '2.75rem',
                    height: '2.75rem',
                    opacity: 0,
                    top: '-0.375rem',
                    left: '-0.375rem',
                    cursor: 'pointer',
                  }}
                />
                <label
                  htmlFor={inputId}
                  style={{
                    display: 'block',
                    cursor: 'pointer',
                    fontFamily: 'var(--gel-font-body)',
                    fontSize: '1rem',
                    color: 'var(--gel-color-text)',
                    lineHeight: '2rem',
                    position: 'relative',
                  }}
                >
                  <span
                    aria-hidden='true'
                    style={{
                      position: 'absolute',
                      left: '-3rem',
                      top: 0,
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
                      boxSizing: 'border-box',
                      backgroundColor: 'var(--gel-color-white)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {checked && (
                      <span style={{
                        width: '1rem',
                        height: '1rem',
                        borderRadius: '50%',
                        backgroundColor: '#646974',
                      }} />
                    )}
                  </span>
                  {option.label}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
    )
  },
)

// ---------------------------------------------------------------------------
// Button
// API mirrors: @snsw-gel/button Button
// Props: children, onClick, variant ('primary' | 'secondary'), type
// ---------------------------------------------------------------------------
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isPrimary = variant === 'primary'
  const isLink = variant === 'link'

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--gel-font-body)',
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: '1.5em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    textDecoration: 'none',
    transition: 'border-color 0.5s ease, background-color 0.5s ease, color 0.5s ease',
  }

  const variantStyles: React.CSSProperties =
    isLink
      ? {
          background: 'none',
          border: 'none',
          padding: '0 2px',
          color: 'var(--gel-color-link)',
          textDecoration: 'underline',
          borderRadius: '0',
          minWidth: 'auto',
        }
      : {
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          border: isPrimary ? '2px solid var(--gel-color-primary)' : '2px solid var(--gel-color-primary)',
          backgroundColor: isPrimary ? 'var(--gel-color-primary)' : 'transparent',
          color: isPrimary ? 'var(--gel-color-white)' : 'var(--gel-color-primary)',
          minWidth: '200px',
        }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...variantStyles,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// TextLink
// API mirrors: @snsw-gel/text-link TextLink
// Props: children, onClick, href
// ---------------------------------------------------------------------------
export interface TextLinkProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  href?: string
}

export function TextLink({ children, onClick, href }: TextLinkProps) {
  if (href) {
    return (
      <a
        href={href}
        style={{
          color: 'var(--gel-color-link)',
          textDecoration: 'underline',
          fontFamily: 'var(--gel-font-body)',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type='button'
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        color: 'var(--gel-color-link)',
        textDecoration: 'underline',
        fontFamily: 'var(--gel-font-body)',
        fontSize: '1rem',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Checkbox
// API mirrors: @snsw-gel/checkbox Checkbox
// Props: id, label, checked, onChange, hasError, errorMessage, disabled
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

export function Checkbox({
  id,
  label,
  checked = false,
  onChange,
  hasError,
  errorMessage,
  disabled,
  value = 'on',
}: CheckboxProps) {
  const elemId = id ?? 'checkbox'

  return (
    <div style={{ margin: '0 0 1.5rem', position: 'relative', minHeight: '2rem' }} data-gelweb-component='checkbox'>
      <div style={{ position: 'relative', paddingLeft: '3rem' }}>
        <input
          type='checkbox'
          id={elemId}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked ? value : '')}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className='snsw-preview-control-input'
          style={{
            position: 'absolute',
            width: '2.75rem',
            height: '2.75rem',
            opacity: 0,
            top: '-0.375rem',
            left: '-0.375rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        />
        <label
          htmlFor={elemId}
          style={{
            display: 'block',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            lineHeight: 1.5,
            fontFamily: 'var(--gel-font-body)',
            color: 'var(--gel-color-text)',
            position: 'relative',
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
          }}
        >
          <span
            aria-hidden='true'
            style={{
              position: 'absolute',
              left: '-3rem',
              top: '0',
              width: '2rem',
              height: '2rem',
              border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
              borderRadius: '4px',
              boxSizing: 'border-box',
              backgroundColor: 'var(--gel-color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {checked && (
              <svg width='19' height='15' viewBox='0 0 19 15' fill='#646974'>
                <path d='M18.6 3.4c.2-.2.2-.5 0-.7L16.3.4c-.2-.2-.5-.2-.7 0L7 9 3.4 5.4c-.2-.2-.5-.2-.7 0L.4 7.7c-.2.2-.2.5 0 .7l6.3 6.3c.2.2.5.2.7 0L18.6 3.4Z' />
              </svg>
            )}
          </span>
          {label}
        </label>
      </div>
      {hasError && errorMessage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            backgroundColor: 'var(--gel-color-error-bg)',
            padding: '0.5rem 1rem 0.5rem 0.625rem',
            marginTop: '0.5rem',
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        >
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
// API mirrors: @snsw-gel/in-page-alert InPageAlert
// Props: variant, title, children, compact
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
      role={variant === 'error' ? 'alert' : undefined}
      style={{
        borderLeft: `4px solid ${colors.border}`,
        backgroundColor: colors.bg,
        padding: compact ? '0.625rem 1rem' : '1rem 1.25rem',
        paddingLeft: compact ? '1rem' : '3.25rem',
        marginBottom: compact ? '0' : '1.5rem',
        position: 'relative',
        fontSize: compact ? '0.9375rem' : '1rem',
        lineHeight: 1.5,
        ...style,
      }}
      data-gelweb-component={`in-page-alert-${variant}`}
    >
      <span
        aria-hidden='true'
        style={{
          position: 'absolute',
          left: compact ? undefined : '1rem',
          top: compact ? '50%' : '1rem',
          transform: compact ? 'translateY(-50%)' : undefined,
          fontSize: '1.25rem',
          color: colors.border,
          fontWeight: 700,
          display: compact ? 'none' : 'block',
        }}
      >
        {colors.icon}
      </span>
      <strong style={{ display: 'block', fontWeight: 700 }}>{title}</strong>
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Field
// API mirrors: @snsw-gel/field Field
// Wraps a form input with label, help text, and error message
// Styles from live service.nsw.gov.au: label weight 500, spacing 1.5rem,
// error uses icon + pink background inline alert
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
  return (
    <div style={{ margin: '0 0 1.5rem', maxWidth: '48rem' }} data-gelweb-component='field'>
      <label
        htmlFor={elemId}
        style={{
          display: 'block',
          fontWeight: 500,
          fontSize: '1rem',
          marginBottom: '1.5rem',
          color: 'var(--gel-color-text)',
        }}
      >
        {label}{isOptional && ' (optional)'}
      </label>
      {helpMessage && (
        <p style={{ fontSize: '0.875rem', margin: '-1rem 0 0.5rem', color: 'var(--gel-color-text-grey, #646974)' }}>
          {helpMessage}
        </p>
      )}
      {children}
      {hasError && errorMessage && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            backgroundColor: 'var(--gel-color-error-bg)',
            padding: '0.5rem 1rem 0.5rem 0.625rem',
            marginTop: '0.5rem',
            fontWeight: 700,
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        >
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
// API mirrors: @snsw-gel/input Input
// Styles from live site: height 48px, border 2px solid #646974, radius 6px,
// padding 0.825rem, max-width 372px, focus outline 3px solid #0085b3
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

const inputWidthMap: Record<string, string> = {
  xxs: '56px',
  xs: '92px',
  sm: '132px',
  md: '200px',
  lg: '268px',
  xl: '416px',
}

export function Input({
  id,
  value,
  onChange,
  hasError,
  disabled,
  type = 'text',
  inputWidth,
  placeholder,
  name,
  maxLength,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      maxLength={maxLength}
      style={{
        display: 'block',
        width: inputWidth ? inputWidthMap[inputWidth] || '100%' : '100%',
        maxWidth: inputWidth ? undefined : '372px',
        height: '48px',
        padding: '0 0.825rem',
        fontSize: '1rem',
        fontFamily: 'var(--gel-font-body)',
        border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
        borderRadius: '6px',
        outline: 'none',
        boxSizing: 'border-box',
        color: 'var(--gel-color-text)',
        backgroundColor: 'var(--gel-color-white)',
      }}
      data-gelweb-component='input'
    />
  )
}

// ---------------------------------------------------------------------------
// Textarea
// API mirrors: @snsw-gel/textarea Textarea
// Styles from live site: same border/radius as Input, resizable vertically
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

export function Textarea({
  id,
  value,
  onChange,
  hasError,
  disabled,
  placeholder,
  maxLength,
  rows = 4,
}: TextareaProps) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={rows}
      style={{
        display: 'block',
        width: '100%',
        maxWidth: '100%',
        padding: '0.825rem',
        fontSize: '1rem',
        fontFamily: 'var(--gel-font-body)',
        border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
        borderRadius: '6px',
        outline: 'none',
        boxSizing: 'border-box',
        color: 'var(--gel-color-text)',
        backgroundColor: 'var(--gel-color-white)',
        resize: 'vertical',
        lineHeight: 1.5,
      }}
      data-gelweb-component='textarea'
    />
  )
}

// ---------------------------------------------------------------------------
// Select
// API mirrors: @snsw-gel/select Select
// Styles from live site: same as Input + custom chevron SVG background
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

export function Select({
  id,
  value,
  onChange,
  hasError,
  disabled,
  options,
  placeholder = 'Select',
  inputWidth,
}: SelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        display: 'block',
        width: inputWidth ? inputWidthMap[inputWidth] || '100%' : '100%',
        maxWidth: inputWidth ? undefined : '372px',
        height: '48px',
        padding: '0 0.825rem',
        fontSize: '1rem',
        fontFamily: 'var(--gel-font-body)',
        border: hasError ? '2px solid var(--gel-color-error)' : '2px solid #646974',
        borderRadius: '6px',
        outline: 'none',
        boxSizing: 'border-box',
        color: 'var(--gel-color-text)',
        backgroundColor: 'var(--gel-color-white)',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg width='12' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23002664' d='M12 2c0-.1 0-.1-.1-.2L10.3.1c-.1-.1-.3-.1-.4 0L6 4 2.1 0c-.1 0-.3 0-.4.1L.1 1.7c-.1.1-.1.3 0 .4l5.7 5.8c.1.1.3.1.4 0l5.7-5.8c.1 0 .1-.1.1-.1z'/%3E%3C/svg%3E")`,
        backgroundPosition: 'center right 18px',
        backgroundRepeat: 'no-repeat',
        paddingRight: '2.5rem',
        cursor: 'pointer',
      }}
      data-gelweb-component='select'
    >
      <option value=''>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.text}</option>
      ))}
    </select>
  )
}
