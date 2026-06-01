import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MobilityParkingPermitSkeleton } from './MobilityParkingPermitSkeleton'

async function continueFromCurrentStep(user: ReturnType<typeof userEvent.setup>, label = 'Continue') {
  await user.click(screen.getByRole('button', { name: label }))
}

async function acceptPrivacyTerms(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' }))
  await continueFromCurrentStep(user)
}

async function completeApplicationDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: 'Apply for a new permit' }))
  await continueFromCurrentStep(user)
}

async function completeYourDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Contact phone number'), '0400000000')
  await continueFromCurrentStep(user)
}

async function completeRepresentativeDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: 'No' }))
  await continueFromCurrentStep(user)
}

async function completeEligibility(user: ReturnType<typeof userEvent.setup>) {
  await user.click(within(screen.getByRole('group', { name: 'Does the applicant have a mobility condition?' })).getByRole('radio', { name: 'Yes' }))
  await user.type(screen.getByLabelText('Describe the mobility condition'), 'Mobility support is required for walking longer distances.')
  await user.click(within(screen.getByRole('group', { name: 'Does the applicant have a NSW driver licence?' })).getByRole('radio', { name: 'No' }))
  await user.click(within(screen.getByRole('group', { name: 'Does the applicant have a NSW photo card?' })).getByRole('radio', { name: 'No' }))
  await user.click(within(screen.getByRole('group', { name: 'Is a temporary permit needed while this application is reviewed?' })).getByRole('radio', { name: 'No' }))
  await continueFromCurrentStep(user)
}

async function completeSupportingEvidence(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: 'Medical certificate' }))
  await user.click(screen.getByRole('radio', { name: 'I have medical evidence ready' }))
  await user.click(screen.getByRole('radio', { name: 'No' }))
  await continueFromCurrentStep(user)
}

async function completeToReview(user: ReturnType<typeof userEvent.setup>) {
  await acceptPrivacyTerms(user)
  await completeApplicationDetails(user)
  await completeYourDetails(user)
  await completeRepresentativeDetails(user)
  await completeEligibility(user)
  await completeSupportingEvidence(user)
}

describe('MobilityParkingPermitSkeleton', () => {
  it('uses meaningful stable stepper labels and excludes confirmation', () => {
    render(<MobilityParkingPermitSkeleton />)

    const progress = screen.getByRole('navigation', { name: 'Application progress' })
    expect(within(progress).getByText('Privacy')).toBeInTheDocument()
    expect(within(progress).getByText('Application details')).toBeInTheDocument()
    expect(within(progress).getByText('Your details')).toBeInTheDocument()
    expect(within(progress).getByText('Eligibility')).toBeInTheDocument()
    expect(within(progress).getByText('Supporting evidence')).toBeInTheDocument()
    expect(within(progress).getByText('Review')).toBeInTheDocument()
    expect(within(progress).queryByText('Confirmation')).not.toBeInTheDocument()
    expect(screen.queryByText(/Step \d+ of \d+/)).not.toBeInTheDocument()
  })

  it('uses the TaPaaS privacy and terms template', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    expect(screen.getByRole('heading', { name: 'Privacy Collection Notice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Terms and Conditions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications and receipt' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'I have read and understand the privacy information.' })).not.toBeInTheDocument()

    await continueFromCurrentStep(user)
    expect(screen.getByRole('link', { name: 'Accept the Terms and Conditions to continue' })).toHaveAttribute('href', '#terms-and-conditions')
  })

  it('plays back profile-owned details as read-only and does not recapture name or date of birth', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await acceptPrivacyTerms(user)
    await completeApplicationDetails(user)

    const profile = screen.getByRole('region', { name: 'Your profile details' })
    expect(within(profile).getByText('These details come from Account/Profile. If they are incorrect, update them in Account/Profile before continuing.')).toBeInTheDocument()
    expect(within(profile).getByText('Full name')).toBeInTheDocument()
    expect(within(profile).getByText('Alex Citizen')).toBeInTheDocument()
    expect(within(profile).getByText('Date of birth')).toBeInTheDocument()
    expect(within(profile).getByText('15 March 1990')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact phone number')).toBeInTheDocument()
    expect(screen.queryByLabelText(/First name/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Family name/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Last name/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/^Date of birth/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Day')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Month')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Year')).not.toBeInTheDocument()
  })

  it('keeps declaration on the review page rather than a standalone step', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await completeToReview(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Declaration' })).not.toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' })).toBeInTheDocument()

    await continueFromCurrentStep(user, 'Submit application')
    expect(screen.getByRole('link', { name: 'Accept the declaration to submit' })).toHaveAttribute('href', '#declaration-accepted')
  })

  it('mirrors completed review sections with one edit affordance per section', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await completeToReview(user)

    const expectedSections = [
      'Application details',
      'Your details',
      'Representative details',
      'Eligibility',
      'Supporting evidence',
      'Privacy',
    ]

    for (const section of expectedSections) {
      expect(screen.getByRole('heading', { name: section })).toBeInTheDocument()
      expect(screen.getAllByRole('button', { name: `Edit ${section}` })).toHaveLength(1)
    }
  })

  it('renders submitted-for-review confirmation with receipt, next steps, keep a record and feedback', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await completeToReview(user)
    await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
    await continueFromCurrentStep(user, 'Submit application')

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Your application has been submitted for review' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Receipt details' })).toBeInTheDocument()
    expect(screen.getByText('MPS-000000')).toBeInTheDocument()
    expect(screen.getByText('1 June 2026')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Keep a record' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What happens next?' })).toBeInTheDocument()
    expect(screen.getByText('Your application will be reviewed.')).toBeInTheDocument()
    expect(screen.getByText('We will notify you of the outcome.')).toBeInTheDocument()
    expect(screen.getByText('If approved, your permit document will be sent using the service delivery process.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Help us improve' })).toBeInTheDocument()
    expect(screen.queryByText(/payment/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/fee/i)).not.toBeInTheDocument()
  })

  it('does not render customer-facing annotations or mock implementation notes', async () => {
    const user = userEvent.setup()
    render(<MobilityParkingPermitSkeleton />)

    await completeToReview(user)
    await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
    await continueFromCurrentStep(user, 'Submit application')

    expect(document.body).not.toHaveTextContent(/\bmock\b/i)
    expect(document.body).not.toHaveTextContent(/\bsource\b/i)
    expect(document.body).not.toHaveTextContent(/\bowner\b/i)
    expect(document.body).not.toHaveTextContent(/\bprototype\b/i)
    expect(document.body).not.toHaveTextContent(/\bkiro\b/i)
    expect(document.body).not.toHaveTextContent(/\bfigma\b/i)
    expect(document.body).not.toHaveTextContent(/\bpreview\b/i)
    expect(document.body).not.toHaveTextContent(/\bplaceholder\b/i)
    expect(document.body).not.toHaveTextContent(/\binternal\b/i)
    expect(document.body).not.toHaveTextContent(/\bpayment\b/i)
    expect(document.body).not.toHaveTextContent(/\bfee\b/i)
  })
})
