import { within, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CommunityVenueBookingSkeleton } from './CommunityVenueBookingSkeleton'

async function acceptTerms(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Contact phone number'), '0400000000')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeVenue(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByLabelText('Venue type'), 'hall')
  await user.type(screen.getByLabelText('Booking purpose'), 'Community workshop')
  await user.type(screen.getByLabelText('Day'), '25')
  await user.type(screen.getByLabelText('Month'), '12')
  await user.type(screen.getByLabelText('Year'), '2026')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeAccessibilityNo(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: 'No' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeSupporting(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Additional information'), 'Community workshop with light catering and after-hours access.')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeToReview(user: ReturnType<typeof userEvent.setup>) {
  await acceptTerms(user)
  await completeDetails(user)
  await completeVenue(user)
  await completeAccessibilityNo(user)
  await completeSupporting(user)
}

async function completeToConfirmation(user: ReturnType<typeof userEvent.setup>) {
  await completeToReview(user)
  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Submit booking request' }))
}

describe('CommunityVenueBookingSkeleton', () => {
  it('uses stable staged stepper labels and excludes confirmation from the stepper', () => {
    render(<CommunityVenueBookingSkeleton />)

    const progress = screen.getByRole('navigation', { name: 'Booking progress' })

    expect(within(progress).getByText('Privacy')).toBeInTheDocument()
    expect(within(progress).getByText('Your details')).toBeInTheDocument()
    expect(within(progress).getByText('Venue booking details')).toBeInTheDocument()
    expect(within(progress).getByText('Accessibility and equipment')).toBeInTheDocument()
    expect(within(progress).getByText('Supporting information')).toBeInTheDocument()
    expect(within(progress).getByText('Review')).toBeInTheDocument()
    expect(within(progress).queryByText('Confirmation')).not.toBeInTheDocument()
    expect(screen.queryByText(/Step \d+ of \d+/i)).not.toBeInTheDocument()
  })

  it('uses the TaPaaS privacy and terms template', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    expect(screen.getByRole('heading', { name: 'Privacy Collection Notice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Terms and Conditions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications and receipt' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'I have read and understand the privacy and terms information.' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Accept the Terms and Conditions to continue' })).toHaveAttribute('href', '#terms-and-conditions')
  })

  it('plays back profile-owned details and does not recapture personal names', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await acceptTerms(user)

    expect(screen.getByRole('heading', { name: 'Your profile details' })).toBeInTheDocument()
    expect(screen.getByText('Alex Citizen')).toBeInTheDocument()
    expect(screen.getByText('alex.citizen@example.test')).toBeInTheDocument()
    expect(screen.getByText('These details come from Account/Profile. If they are incorrect, update them in Account/Profile before continuing.')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact phone number')).toBeInTheDocument()
    expect(screen.queryByLabelText('Full name')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('First name')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Family name')).not.toBeInTheDocument()
  })

  it('uses the expected market-style controls and conditional support details pattern', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await acceptTerms(user)
    await completeDetails(user)

    expect(screen.getByRole('combobox', { name: 'Venue type' })).toBeInTheDocument()
    expect(screen.getByText('Enter the date as DD MM YYYY. For example, 25 12 2026.')).toBeInTheDocument()

    await completeVenue(user)

    expect(screen.queryByLabelText('Describe the support needed')).not.toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Yes' }))

    expect(screen.getByLabelText('Describe the support needed')).toBeInTheDocument()
    expect(screen.getByText('Maximum 500 characters.')).toBeInTheDocument()
    expect(screen.getByText('0/500 characters')).toBeInTheDocument()
  })

  it('keeps the declaration on the review page rather than a standalone step', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await completeToReview(user)

    expect(screen.getByRole('heading', { name: 'Review' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Declaration' })).not.toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Submit booking request' }))

    expect(screen.getByRole('link', { name: 'Accept the declaration to submit' })).toHaveAttribute('href', '#declaration-accepted')
  })

  it('mirrors completed review sections with one edit affordance per section', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await completeToReview(user)

    for (const section of ['Your details', 'Venue booking details', 'Accessibility and equipment', 'Supporting information', 'Privacy']) {
      expect(screen.getByRole('heading', { name: section })).toBeInTheDocument()
      expect(screen.getAllByRole('button', { name: `Edit ${section}` })).toHaveLength(1)
    }

    expect(screen.queryByRole('button', { name: 'Edit declaration' })).not.toBeInTheDocument()
  })

  it('renders submitted confirmation with receipt details, next steps, keep-a-record and feedback affordance', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await completeToConfirmation(user)

    expect(screen.getByRole('heading', { name: 'Your booking request has been submitted' })).toBeInTheDocument()
    expect(screen.getByText('VENUE-000000')).toBeInTheDocument()
    expect(screen.getByText('1 June 2026')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Keep a record' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What happens next?' })).toBeInTheDocument()
    expect(screen.getByText('Your booking request will be reviewed.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Help us improve' })).toBeInTheDocument()
    expect(screen.queryByText(/payment|fee/i)).not.toBeInTheDocument()
  })

  it('does not render customer-facing annotations or fee/payment placeholders', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await completeToConfirmation(user)

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
