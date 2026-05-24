import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MobilityParkingPermitSkeleton } from './MobilityParkingPermitSkeleton'

async function continueFromCurrentStep(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.queryByRole('button', { name: 'Continue' }) ?? screen.getByRole('button', { name: 'Next' }))
}

async function reachApplicationTypeStep(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I have read and understand the privacy information.' }))
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'Signed in with verified account details (mock)' }))
  await user.click(screen.getByRole('checkbox', { name: 'I understand proof of identity is not performed in this prototype.' }))
  await continueFromCurrentStep(user)
}

async function reachApplicantDetailsStep(user: ReturnType<typeof userEvent.setup>) {
  await reachApplicationTypeStep(user)
  await user.click(screen.getByRole('radio', { name: 'Apply for a new permit (mock)' }))
  await continueFromCurrentStep(user)
}

async function completeFromApplicantDetailsToReview(user: ReturnType<typeof userEvent.setup>) {
  await fillApplicantSearchStep(user)
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'No' }))
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'No' }))
  await user.click(screen.getAllByRole('radio', { name: 'Yes (mock)' })[0])
  await user.click(screen.getAllByRole('radio', { name: 'Yes (mock)' })[1])
  await user.click(screen.getAllByRole('radio', { name: 'No (mock)' })[2])
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'Medical certificate (mock)' }))
  await user.click(screen.getByRole('radio', { name: 'Mock uploaded now' }))
  await user.click(screen.getByRole('checkbox', { name: 'I understand medical evidence handling is simulated only.' }))
  await continueFromCurrentStep(user)

  await user.selectOptions(screen.getByLabelText('Concession card option'), 'none')
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'Post to residential address (mock)' }))
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'Mock payment succeeds and application submits' }))
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await continueFromCurrentStep(user)
}

async function fillApplicantSearchStep(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('First name *'), 'Alex')
  await user.type(screen.getByLabelText('Last name *'), 'Citizen')
  await user.type(screen.getByLabelText('Day'), '15')
  await user.selectOptions(screen.getByLabelText('Month'), 'mar')
  await user.type(screen.getByLabelText('Year'), '1990')
  await user.type(screen.getByLabelText('Email address *'), 'alex@example.test')
  await user.type(screen.getByLabelText('Phone number *'), '0400000000')
  await user.type(screen.getByLabelText('Residential address *'), '1 Mock Street, Sydney NSW 2000')
}

async function completeSuccessfulPathToPayment(user: ReturnType<typeof userEvent.setup>) {
  await reachApplicantDetailsStep(user)
  await fillApplicantSearchStep(user)
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'No' }))
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'No' }))
  await user.click(screen.getAllByRole('radio', { name: 'Yes (mock)' })[0])
  await user.click(screen.getAllByRole('radio', { name: 'Yes (mock)' })[1])
  await user.click(screen.getAllByRole('radio', { name: 'No (mock)' })[2])
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'Medical certificate (mock)' }))
  await user.click(screen.getByRole('radio', { name: 'Mock uploaded now' }))
  await user.click(screen.getByRole('checkbox', { name: 'I understand medical evidence handling is simulated only.' }))
  await continueFromCurrentStep(user)

  await user.selectOptions(screen.getByLabelText('Concession card option'), 'none')
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'Post to residential address (mock)' }))
  await continueFromCurrentStep(user)
}

describe('MobilityParkingPermitSkeleton', () => {
  it('blocks the privacy step and then completes a mock successful MPS path', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    expect(screen.getByText('Step 1 of 7: Start and privacy')).toBeInTheDocument()

    await continueFromCurrentStep(user)
    expect(screen.getByRole('link', { name: 'Confirm that you have read the privacy information' })).toHaveAttribute('href', '#privacy-confirmation')

    await reachApplicantDetailsStep(user)

    expect(screen.getByRole('heading', { name: 'Personal details' })).toBeInTheDocument()
    expect(screen.getByLabelText('Residential address *')).toBeInTheDocument()
    await fillApplicantSearchStep(user)
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
    expect(screen.getByText('1 Mock Street, Sydney NSW 2000')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Submit mock application' }))

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Your application has been submitted' })).toBeInTheDocument()
    expect(screen.getByText('MPS-MOCK-000000')).toBeInTheDocument()
  })

  it('shows the source-backed manual address frame state without address lookup or backend behaviour', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachApplicantDetailsStep(user)

    expect(screen.getByRole('heading', { name: 'Personal details' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Enter address manually' }))

    expect(screen.getByRole('group', { name: 'Residential address' })).toBeInTheDocument()
    expect(screen.getByLabelText('Street number *')).toBeInTheDocument()
    expect(screen.getByLabelText('Street name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Street type *')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /find|lookup/i })).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('First name *'), 'Alex')
    await user.type(screen.getByLabelText('Last name *'), 'Citizen')
    await user.type(screen.getByLabelText('Day'), '15')
    await user.selectOptions(screen.getByLabelText('Month'), 'mar')
    await user.type(screen.getByLabelText('Year'), '1990')
    await user.type(screen.getByLabelText('Street number *'), '1')
    await user.type(screen.getByLabelText('Street name *'), 'Mock')
    await user.selectOptions(screen.getByLabelText('Street type *'), 'street')
    await user.type(screen.getByLabelText('Suburb *'), 'Sydney')
    await user.selectOptions(screen.getByLabelText('State *'), 'NSW')
    await user.type(screen.getByLabelText('Postcode *'), '2000')
    await user.type(screen.getByLabelText('Email address *'), 'alex@example.test')
    await user.type(screen.getByLabelText('Phone number *'), '0400000000')
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Representative and authorised contacts' })).toBeInTheDocument()
  })

  it('shows the radio-card application branch without permit lookup behaviour', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachApplicationTypeStep(user)

    expect(screen.getByRole('heading', { name: 'Application type' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Apply for a new permit (mock)' }))

    expect(screen.queryByLabelText('Existing permit number')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Reason for replacement')).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Renew an existing permit (mock)' }))

    expect(screen.getByLabelText('Existing permit number')).toBeInTheDocument()
    expect(screen.getByText('Mock only. No permit lookup is performed.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /find|lookup|search/i })).not.toBeInTheDocument()
  })

  it('carries the renewal branch through to review without lookup or backend behaviour', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachApplicationTypeStep(user)
    await user.click(screen.getByRole('radio', { name: 'Renew an existing permit (mock)' }))
    await user.type(screen.getByLabelText('Existing permit number'), 'MPS-RENEW-001')
    await continueFromCurrentStep(user)

    expect(screen.queryByRole('button', { name: /find|lookup|search/i })).not.toBeInTheDocument()
    await completeFromApplicantDetailsToReview(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.getByText('Renewal')).toBeInTheDocument()
    expect(screen.getByText('MPS-RENEW-001')).toBeInTheDocument()
    expect(screen.getByText('Not applicable')).toBeInTheDocument()
  })

  it('carries the replacement branch and reason through to review without lookup or backend behaviour', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachApplicationTypeStep(user)
    await user.click(screen.getByRole('radio', { name: 'Replace a permit (mock)' }))

    expect(screen.getByLabelText('Existing permit number')).toBeInTheDocument()
    expect(screen.getByLabelText('Reason for replacement')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /find|lookup|search/i })).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('Existing permit number'), 'MPS-REPLACE-001')
    await user.selectOptions(screen.getByLabelText('Reason for replacement'), 'lost')
    await continueFromCurrentStep(user)

    await completeFromApplicantDetailsToReview(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.getByText('Replacement')).toBeInTheDocument()
    expect(screen.getByText('MPS-REPLACE-001')).toBeInTheDocument()
    expect(screen.getByText('Lost permit (mock)')).toBeInTheDocument()
  })

  it('routes mock payment failure through the backend error preview without real submission behaviour', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await completeSuccessfulPathToPayment(user)
    await user.click(screen.getByRole('radio', { name: 'Payment fails and shows a recoverable error' }))
    await continueFromCurrentStep(user)

    await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
    await continueFromCurrentStep(user)

    await user.click(screen.getByRole('button', { name: 'Submit mock application' }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Unable to submit permit request' })).toBeInTheDocument()
    expect(screen.getByText('Mock backend code:')).toBeInTheDocument()
    expect(screen.getByText('INVALID_PAYMENT_DETAILS')).toBeInTheDocument()
    expect(screen.queryByText('MPS-MOCK-000000')).not.toBeInTheDocument()
  })
})
