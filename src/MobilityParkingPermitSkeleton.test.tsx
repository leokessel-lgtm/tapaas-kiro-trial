import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MobilityParkingPermitSkeleton } from './MobilityParkingPermitSkeleton'

async function continueFromCurrentStep(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

describe('MobilityParkingPermitSkeleton', () => {
  it('blocks the privacy step and then completes a mock successful MPS path', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    expect(screen.getByText('Step 1 of 7: Start and privacy')).toBeInTheDocument()

    await continueFromCurrentStep(user)
    expect(screen.getByRole('link', { name: 'Confirm that you have read the privacy information' })).toHaveAttribute('href', '#privacy-confirmation')

    await user.click(screen.getByRole('checkbox', { name: 'I have read and understand the privacy information.' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Account and identity' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Signed in with verified account details (mock)' }))
    await user.click(screen.getByRole('checkbox', { name: 'I understand proof of identity is not performed in this prototype.' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Application type' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Apply for a new permit (mock)' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Applicant details' })).toBeInTheDocument()
    await user.type(screen.getByLabelText('Full name'), 'Alex Citizen')
    await user.type(screen.getByLabelText('Day'), '15')
    await user.type(screen.getByLabelText('Month'), '03')
    await user.type(screen.getByLabelText('Year'), '1990')
    await user.type(screen.getByLabelText('Email address'), 'alex@example.test')
    await user.type(screen.getByLabelText('Phone number'), '0400000000')
    await user.type(screen.getByLabelText('Street address'), '1 Mock Street')
    await user.type(screen.getByLabelText('Suburb'), 'Sydney')
    await user.selectOptions(screen.getByLabelText('State'), 'NSW')
    await user.type(screen.getByLabelText('Postcode'), '2000')
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Representative and authorised contacts' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'No' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Eligibility questions' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'No' }))
    await user.click(screen.getAllByRole('radio', { name: 'Yes (mock)' })[0])
    await user.click(screen.getAllByRole('radio', { name: 'Yes (mock)' })[1])
    await user.click(screen.getAllByRole('radio', { name: 'No (mock)' })[2])
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Medical evidence' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Medical certificate (mock)' }))
    await user.click(screen.getByRole('radio', { name: 'Mock uploaded now' }))
    await user.click(screen.getByRole('checkbox', { name: 'I understand medical evidence handling is simulated only.' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Concession details' })).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('Concession card option'), 'none')
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Delivery preferences' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Post to residential address (mock)' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Payment simulation' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Mock payment succeeds and application submits' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Declaration' })).toBeInTheDocument()
    await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.getByText('Alex Citizen')).toBeInTheDocument()
    expect(screen.getByText('New application')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Submit mock application' }))

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Application submitted' })).toBeInTheDocument()
    expect(screen.getByText('MPS-MOCK-000000')).toBeInTheDocument()
  })
})
