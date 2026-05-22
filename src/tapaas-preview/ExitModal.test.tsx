import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ExitModal } from './index'

describe('ExitModal', () => {
  it('renders as a labelled modal dialog and supports continue/exit actions', async () => {
    const user = userEvent.setup()
    const onContinue = vi.fn()
    const onExit = vi.fn()

    render(<ExitModal isOpen onContinue={onContinue} onExit={onExit} />)

    expect(screen.getByRole('dialog', { name: 'Are you sure you want to exit and lose your progress?' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'No, continue' }))
    expect(onContinue).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: 'Yes, exit' }))
    expect(onExit).toHaveBeenCalledTimes(1)
  })

  it('closes via Escape and traps tab focus between modal buttons', async () => {
    const user = userEvent.setup()
    const onContinue = vi.fn()

    render(<ExitModal isOpen onContinue={onContinue} onExit={() => undefined} />)

    const continueButton = screen.getByRole('button', { name: 'No, continue' })
    const exitButton = screen.getByRole('button', { name: 'Yes, exit' })

    continueButton.focus()
    await user.tab({ shift: true })
    expect(exitButton).toHaveFocus()

    await user.tab()
    expect(continueButton).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(onContinue).toHaveBeenCalledTimes(1)
  })
})
