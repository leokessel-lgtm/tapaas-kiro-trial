import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { EmailConfirmationModal } from './index'

describe('EmailConfirmationModal', () => {
  it('renders the evidenced email confirmation anatomy and actions', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    const onEdit = vi.fn()
    const onDismiss = vi.fn()

    render(
      <EmailConfirmationModal
        isOpen
        emailAddress='samplemail@email.com'
        onSend={onSend}
        onEdit={onEdit}
        onDismiss={onDismiss}
      />,
    )

    expect(screen.getByRole('dialog', { name: 'Confirm email address' })).toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: 'Confirm email address' })).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText('samplemail@email.com')).toBeInTheDocument()
    expect(screen.getByText(/Check the address/)).toHaveTextContent("Check the address. We'll send your receipt to samplemail@email.com")

    await user.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSend).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'Edit email address' }))
    expect(onEdit).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'Close email confirmation modal' }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('dismisses via Escape and keeps tab focus inside the modal', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <EmailConfirmationModal
        isOpen
        emailAddress='samplemail@email.com'
        onSend={() => undefined}
        onEdit={() => undefined}
        onDismiss={onDismiss}
      />,
    )

    const closeButton = screen.getByRole('button', { name: 'Close email confirmation modal' })
    const sendButton = screen.getByRole('button', { name: 'Send' })

    closeButton.focus()
    await user.tab({ shift: true })
    expect(sendButton).toHaveFocus()

    sendButton.focus()
    await user.tab()
    expect(closeButton).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })
})
