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

  await user.click(screen.getByRole('radio', { name: 'No concession card (mock)' }))
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

async function reachMedicalEvidenceStep(user: ReturnType<typeof userEvent.setup>) {
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
}

async function reachConcessionStep(user: ReturnType<typeof userEvent.setup>) {
  await reachMedicalEvidenceStep(user)
  await user.click(screen.getByRole('radio', { name: 'Medical certificate (mock)' }))
  await user.click(screen.getByRole('radio', { name: 'Mock uploaded now' }))
  await user.click(screen.getByRole('checkbox', { name: 'I understand medical evidence handling is simulated only.' }))
  await continueFromCurrentStep(user)
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

  await user.click(screen.getByRole('radio', { name: 'No concession card (mock)' }))
  await continueFromCurrentStep(user)

  await user.click(screen.getByRole('radio', { name: 'Post to residential address (mock)' }))
  await continueFromCurrentStep(user)
}

describe('MobilityParkingPermitSkeleton', () => {
  it('blocks the privacy step and then completes a mock successful MPS path', async () => {
    const user = userEvent.setup()
    const { container } = render(<MobilityParkingPermitSkeleton />)

    expect(screen.getByText('Step 1 of 7: Start and privacy')).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="start-intro"]')).toBeInTheDocument()

    await continueFromCurrentStep(user)
    expect(screen.getByRole('link', { name: 'Confirm that you have read the privacy information' })).toHaveAttribute('href', '#privacy-confirmation')

    await reachApplicantDetailsStep(user)

    expect(screen.getByRole('heading', { name: 'Personal details' })).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="form-page"]')).toBeInTheDocument()
    expect(screen.getByLabelText('Residential address *')).toBeInTheDocument()
    await fillApplicantSearchStep(user)
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Representative and authorised contacts' })).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'No' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Eligibility questions' })).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="eligibility-state"]')).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'No' }))
    await user.click(screen.getAllByRole('radio', { name: 'Yes (mock)' })[0])
    await user.click(screen.getAllByRole('radio', { name: 'Yes (mock)' })[1])
    await user.click(screen.getAllByRole('radio', { name: 'No (mock)' })[2])
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Medical evidence' })).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="evidence-state"]')).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Medical certificate (mock)' }))
    await user.click(screen.getByRole('radio', { name: 'Mock uploaded now' }))
    await user.click(screen.getByRole('checkbox', { name: 'I understand medical evidence handling is simulated only.' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Concession details' })).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="concession-validation-state"]')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Concession card option' })).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'Concession card option' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'No concession card (mock)' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Delivery preferences' })).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="kiro-stress-test-form"]')).toBeInTheDocument()
    expect(screen.getByText('Trial-only delivery stress path')).toBeInTheDocument()
    expect(screen.getByText('This page is a Kiro stress-test route only. It is not confirmed in the MPS source flow and does not set real delivery, approval or fulfilment behaviour.')).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Choose a trial-only delivery route' })).toBeInTheDocument()
    expect(screen.queryByText('How would the permit be delivered if the real service approves the application?')).not.toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Post to residential address (mock)' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Payment simulation' })).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="mock-payment-state"]')).toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Mock payment succeeds and application submits' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Declaration' })).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="declaration"]')).toBeInTheDocument()
    await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(container.querySelector('[data-mps-page-template="review"]')).toBeInTheDocument()
    expect(screen.getByText('Alex Citizen')).toBeInTheDocument()
    expect(screen.getByText('New application')).toBeInTheDocument()
    expect(screen.getByText('1 Mock Street, Sydney NSW 2000')).toBeInTheDocument()
    expect(screen.getByText('Mock/system state summary')).toBeInTheDocument()
    expect(screen.getByText('Evidence, concession, payment and assessment rows are trial-only state summaries. They do not prove backend validation, eligibility, payment, approval or permit issue behaviour.')).toBeInTheDocument()
    expect(screen.getByText('Mock application fee')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Submit mock application' }))

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Your application has been submitted' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Mobility Parking Scheme outcome' })).toHaveAttribute('data-mps-page-template', 'confirmation')
    expect(screen.getByText('MPS-MOCK-000000')).toBeInTheDocument()
  })

  it('shows the source-backed certificate uploaded status without upload or remove controls', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachMedicalEvidenceStep(user)

    await user.click(screen.getByRole('radio', { name: 'Medical certificate (mock)' }))
    await user.click(screen.getByRole('radio', { name: 'Mock uploaded now' }))

    expect(screen.getByRole('heading', { name: 'Medical document' })).toBeInTheDocument()
    expect(screen.getByText('medicalcertificate_april2020.png')).toBeInTheDocument()
    expect(screen.getByText('Medical certificate')).toBeInTheDocument()
    expect(screen.getByText('Supporting evidence status')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /select file/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /remove file/i })).not.toBeInTheDocument()
  })

  it('shows the source-backed report uploaded status without upload or remove controls', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachMedicalEvidenceStep(user)

    await user.click(screen.getByRole('radio', { name: 'Medical report (mock)' }))
    await user.click(screen.getByRole('radio', { name: 'Mock uploaded now' }))

    expect(screen.getByText('medicalreport_april2020.png')).toBeInTheDocument()
    expect(screen.getByText('Medical report')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /select file/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /remove file/i })).not.toBeInTheDocument()
  })

  it('keeps provide-later as required status and routes to manual review', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachMedicalEvidenceStep(user)

    await user.click(screen.getByRole('radio', { name: 'Medical report (mock)' }))
    await user.click(screen.getByRole('radio', { name: 'Provide after submission' }))

    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.queryByText('medicalcertificate_april2020.png')).not.toBeInTheDocument()
    expect(screen.queryByText('medicalreport_april2020.png')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /select file/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /remove file/i })).not.toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'I understand medical evidence handling is simulated only.' }))
    await continueFromCurrentStep(user)

    await user.click(screen.getByRole('radio', { name: 'No concession card (mock)' }))
    await continueFromCurrentStep(user)

    await user.click(screen.getByRole('radio', { name: 'Post to residential address (mock)' }))
    await continueFromCurrentStep(user)

    await user.click(screen.getByRole('radio', { name: 'Mock payment succeeds and application submits' }))
    await continueFromCurrentStep(user)

    await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
    await continueFromCurrentStep(user)

    await user.click(screen.getByRole('button', { name: 'Submit mock application' }))

    expect(screen.getByRole('status', { name: 'Transaction completed' })).toBeInTheDocument()
    expect(screen.getByText('MPS-REVIEW-000000')).toBeInTheDocument()
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
    expect(screen.queryByRole('group', { name: 'Reason for replacement' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Renew an existing permit (mock)' }))

    expect(screen.getByLabelText('Existing permit number')).toBeInTheDocument()
    expect(screen.getByText('Mock only. No permit lookup is performed.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /find|lookup|search/i })).not.toBeInTheDocument()
  })

  it('links replacement-reason validation summary to the radio group and shows inline group error', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachApplicationTypeStep(user)
    await user.click(screen.getByRole('radio', { name: 'Replace a permit (mock)' }))
    await user.type(screen.getByLabelText('Existing permit number'), 'MPS-REPLACE-001')
    await continueFromCurrentStep(user)

    expect(screen.getByRole('link', { name: 'Select a replacement reason' })).toHaveAttribute('href', '#replace-reason')
    expect(screen.getByRole('group', { name: 'Reason for replacement' })).toHaveAttribute('aria-describedby', 'replace-reason-error')
    expect(screen.getAllByText('Select a replacement reason.')).toHaveLength(1)
    expect(screen.getByRole('radio', { name: 'Lost permit (mock)' })).toBeInTheDocument()
  })

  it('links concession radio-group validation summary to the relevant groups and keeps mock state separate', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await reachConcessionStep(user)
    await continueFromCurrentStep(user)

    expect(screen.getByRole('link', { name: 'Select a concession card option' })).toHaveAttribute('href', '#concession-card-type')
    expect(screen.getByRole('group', { name: 'Concession card option' })).toHaveAttribute('aria-describedby', 'concession-card-type-error')
    expect(screen.getAllByText('Select a concession card option.')).toHaveLength(1)
    expect(screen.getByText('Concession validation is simulated')).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Centrelink card (mock)' }))
    await continueFromCurrentStep(user)

    expect(screen.getByRole('link', { name: 'Enter the concession card number' })).toHaveAttribute('href', '#concession-card-number')
    expect(screen.getByRole('link', { name: 'Select a mock concession validation result' })).toHaveAttribute('href', '#concession-validation-scenario')
    expect(screen.getByRole('group', { name: 'Mock validation result' })).toHaveAttribute('aria-describedby', 'concession-validation-scenario-error')
    expect(screen.getAllByText('Select a mock concession validation result.')).toHaveLength(1)
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
    expect(screen.getByRole('group', { name: 'Reason for replacement' })).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'Reason for replacement' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /find|lookup|search/i })).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('Existing permit number'), 'MPS-REPLACE-001')
    await user.click(screen.getByRole('radio', { name: 'Lost permit (mock)' }))
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
