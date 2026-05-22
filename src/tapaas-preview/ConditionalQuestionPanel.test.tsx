import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ConditionalQuestionPanel } from './index'

describe('ConditionalQuestionPanel', () => {
  it('reveals conditional content only when the selected value matches showWhen', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { rerender } = render(
      <ConditionalQuestionPanel
        id='support'
        legend='Do you need support?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value=''
        onChange={onChange}
        showWhen='yes'
      >
        <label htmlFor='support-details'>Support details</label>
        <textarea id='support-details' />
      </ConditionalQuestionPanel>,
    )

    expect(screen.queryByLabelText('Support details')).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Yes' }))
    expect(onChange).toHaveBeenCalledWith('yes')

    rerender(
      <ConditionalQuestionPanel
        id='support'
        legend='Do you need support?'
        options={[
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ]}
        value='yes'
        onChange={onChange}
        showWhen='yes'
      >
        <label htmlFor='support-details'>Support details</label>
        <textarea id='support-details' />
      </ConditionalQuestionPanel>,
    )

    expect(screen.getByLabelText('Support details')).toBeInTheDocument()
  })

  it('links error text to the fieldset when invalid', () => {
    render(
      <ConditionalQuestionPanel
        id='support'
        legend='Do you need support?'
        options={[{ value: 'yes', label: 'Yes' }]}
        value=''
        onChange={() => undefined}
        hasError
        errorMessage='Select yes or no.'
      />,
    )

    const fieldset = screen.getByRole('group', { name: 'Do you need support?' })
    expect(fieldset).toHaveAttribute('aria-invalid', 'true')
    expect(fieldset).toHaveAttribute('aria-describedby', 'support-error')
    expect(document.getElementById('support-error')).toHaveTextContent('Select yes or no.')
  })
})
