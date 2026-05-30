import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CheckboxList, DateInput, DateMultiInput, Field, Fieldset } from './index'

describe('GEL transaction input previews', () => {
  it('renders a semantic fieldset with legend and help text', () => {
    render(
      <Fieldset id='test-fieldset' legend='Notification preference' helpMessage='Choose how this preview should show messages.'>
        <label>
          <input type='radio' name='test-fieldset' />
          Email
        </label>
      </Fieldset>,
    )

    const group = screen.getByRole('group', { name: 'Notification preference' })
    expect(group).toHaveAttribute('data-gelweb-component', 'fieldset')
    expect(group).toHaveAccessibleDescription('Choose how this preview should show messages.')
  })

  it('renders checkbox list options within a grouped fieldset', () => {
    render(
      <CheckboxList
        id='test-checkbox-list'
        legend='Preview update types'
        value={['sms']}
        onChange={vi.fn()}
        options={[
          { value: 'email', label: 'Email updates' },
          { value: 'sms', label: 'SMS updates' },
          { value: 'post', label: 'Postal updates' },
        ]}
      />,
    )

    const group = screen.getByRole('group', { name: 'Preview update types' })
    expect(group).toHaveAttribute('data-gelweb-component', 'checkbox-list')

    const checkboxes = within(group).getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
    expect(within(group).getByRole('checkbox', { name: 'SMS updates' })).toBeChecked()
  })

  it('renders a date input as a labelled text input reference', () => {
    render(
      <Field id='test-date-input' label='Preferred appointment date'>
        <DateInput id='test-date-input' value='' onChange={vi.fn()} />
      </Field>,
    )

    const input = screen.getByRole('textbox', { name: 'Preferred appointment date' })
    expect(input).toHaveAttribute('data-gelweb-component', 'date-input')
    expect(input).toHaveAttribute('placeholder', 'DD/MM/YYYY')
  })

  it('renders date multi input day, month and year fields', () => {
    render(
      <DateMultiInput
        id='test-date-multi-input'
        label='Document issue date'
        value={{ day: '', month: '', year: '' }}
        onChange={vi.fn()}
      />,
    )

    const group = screen.getByRole('group', { name: 'Document issue date' })
    expect(screen.getByText('Document issue date').closest('[data-gelweb-component="date-multi-input"]')).toBeInTheDocument()
    expect(within(group).getByLabelText('Day')).toBeInTheDocument()
    expect(within(group).getByLabelText('Month')).toBeInTheDocument()
    expect(within(group).getByLabelText('Year')).toBeInTheDocument()
  })
})
