import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ErrorSummary, Input } from './index'

describe('ErrorSummary', () => {
  it('renders error links and focuses the target field on click', async () => {
    const user = userEvent.setup()

    render(
      <>
        <Input id='full-name' value='' onChange={() => undefined} />
        <ErrorSummary errors={[{ id: 'full-name', text: 'Enter your full name.' }]} />
      </>,
    )

    const link = screen.getByRole('link', { name: 'Enter your full name' })
    expect(link).toHaveAttribute('href', '#full-name')

    await user.click(link)

    expect(screen.getByRole('textbox')).toHaveFocus()
  })
})
