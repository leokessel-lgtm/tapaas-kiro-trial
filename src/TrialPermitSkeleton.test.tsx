import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TrialPermitSkeleton } from './TrialPermitSkeleton'

async function completePrivacy(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I agree to the terms and conditions for this trial permit application.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeInput(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Full name/), 'Jane Citizen')
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
    expect(screen.getByRole('link', { name: 'Confirm that you agree to the terms and conditions' })).toHaveAttribute('href', '#privacy-confirmation')
    expect(screen.getByRole('heading', { name: 'Privacy information' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Trial permit privacy and terms' })).toBeInTheDocument()
    expect(screen.getByText('[Source content required: privacy collection notice]')).toBeInTheDocument()
    expect(screen.getByText('[Source content required: terms and conditions text]')).toBeInTheDocument()

    await completePrivacy(user)

    expect(screen.getByRole('heading', { name: 'Application details' })).toBeInTheDocument()
  })

  it('blocks empty input submission and then advances with valid details', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await completePrivacy(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    const heading = screen.getByRole('heading', { name: 'Application details' })
    const errorSummary = screen.getByRole('group', { name: 'Your form has errors' })
    expect(heading.compareDocumentPosition(errorSummary) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(errorSummary).toHaveAttribute('id', 'trial-permit-error-summary')
    expect(errorSummary).toHaveAttribute('data-gelweb-component', 'error-summary')
    expect(errorSummary).toHaveClass('gel-error-summary')
    expect(screen.getByText((_, element) => element?.textContent === '* indicates a required field.')).toBeInTheDocument()
    const fullNameErrorLink = screen.getByRole('link', { name: 'Enter your full name' })
    const permitTypeErrorLink = screen.getByRole('link', { name: 'Select a permit type' })
    expect(fullNameErrorLink).toHaveAttribute('href', '#applicant-name')
    expect(permitTypeErrorLink).toHaveAttribute('href', '#permit-type')
    expect(fullNameErrorLink).toHaveStyle({ color: 'var(--gel-color-link)' })
    expect(permitTypeErrorLink).toHaveStyle({ color: 'var(--gel-color-link)' })
    expect(fullNameErrorLink).not.toHaveStyle({ color: 'var(--gel-color-error)' })
    expect(permitTypeErrorLink).not.toHaveStyle({ color: 'var(--gel-color-error)' })
    expect(screen.getByText('[Source content required: permit type explanation]')).toBeInTheDocument()

    await completeInput(user)

    expect(screen.getByRole('heading', { name: 'Declaration' })).toBeInTheDocument()
  })

  it('keeps submitted errors visible until Continue revalidates the current step', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await completePrivacy(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    const fullNameInput = screen.getByLabelText(/Full name/)
    expect(screen.getByRole('link', { name: 'Enter your full name' })).toHaveAttribute('href', '#applicant-name')
    expect(fullNameInput).toHaveAttribute('aria-invalid', 'true')

    await user.type(fullNameInput, 'Jane Citizen')

    expect(screen.getByRole('link', { name: 'Enter your full name' })).toHaveAttribute('href', '#applicant-name')
    expect(fullNameInput).toHaveAttribute('aria-invalid', 'true')

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.queryByRole('link', { name: 'Enter your full name' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Select a permit type' })).toHaveAttribute('href', '#permit-type')
    expect(fullNameInput).not.toHaveAttribute('aria-invalid')
  })

  it('maps review edit actions to the relevant source steps', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await completePrivacy(user)
    await completeInput(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Accept the declaration to continue' })).toHaveAttribute('href', '#declaration-accepted')

    await completeDeclaration(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Edit Application details' }))

    expect(screen.getByRole('heading', { name: 'Application details' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Continue' }))
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Edit declaration' }))

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
    expect(screen.getByRole('heading', { name: 'Application details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Fees' })).toBeInTheDocument()
    expect(screen.getByText('Jane Citizen')).toBeInTheDocument()
    expect(screen.getByText('Standard permit (mock)')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Declaration' })).toBeInTheDocument()
    expect(screen.getAllByText('$0.00')).toHaveLength(2)

    const reviewActions = screen.getByRole('group', { name: 'Transaction actions' })
    const reviewButtons = within(reviewActions).getAllByRole('button').map((button) => button.textContent)
    expect(reviewButtons).toEqual(['Back', 'Submit application', 'Exit'])
    const backButton = within(reviewActions).getByRole('button', { name: 'Back' })
    expect(backButton).toHaveClass('gel-btn--secondary')
    expect(backButton).not.toHaveClass('gel-btn--destructive')

    await user.click(screen.getByRole('button', { name: 'Submit application' }))

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Application submitted' })).toBeInTheDocument()
    expect(screen.getByText('PERMIT-000000')).toBeInTheDocument()
    expect(screen.queryByText('Jane Citizen')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Next steps' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start another application' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Review TaPaaS source inventory' })).not.toBeInTheDocument()
  })
})
