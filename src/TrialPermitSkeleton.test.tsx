import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TrialPermitSkeleton } from './TrialPermitSkeleton'

async function completePrivacy(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I have read and understand the privacy information.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeInput(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Full name'), 'Jane Citizen')
  await user.click(screen.getByRole('radio', { name: 'Standard permit (mock)' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeDeclaration(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

describe('TrialPermitSkeleton', () => {
  it('blocks privacy progression until the privacy checkbox is selected', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('group', { name: 'Your form has an error' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Confirm that you have read the privacy information' })).toHaveAttribute('href', '#privacy-confirmation')
    expect(screen.getByRole('heading', { name: 'Privacy information' })).toBeInTheDocument()

    await completePrivacy(user)

    expect(screen.getByRole('heading', { name: 'Apply for a trial permit' })).toBeInTheDocument()
  })

  it('blocks empty input submission and then advances with valid details', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await completePrivacy(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Enter your full name' })).toHaveAttribute('href', '#applicant-name')
    expect(screen.getByRole('link', { name: 'Select a permit type' })).toHaveAttribute('href', '#permit-type')

    await completeInput(user)

    expect(screen.getByRole('heading', { name: 'Declaration' })).toBeInTheDocument()
  })

  it('blocks declaration until accepted, then submits review to confirmation', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await completePrivacy(user)
    await completeInput(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Accept the declaration to continue' })).toHaveAttribute('href', '#declaration-accepted')

    await completeDeclaration(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.getByText('Jane Citizen')).toBeInTheDocument()
    expect(screen.getByText('Standard permit (mock)')).toBeInTheDocument()
    expect(screen.getAllByText('$0.00')).toHaveLength(2)

    await user.click(screen.getByRole('button', { name: 'Submit application' }))

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Application submitted' })).toBeInTheDocument()
    expect(screen.getByText('PERMIT-000000')).toBeInTheDocument()
  })
})
