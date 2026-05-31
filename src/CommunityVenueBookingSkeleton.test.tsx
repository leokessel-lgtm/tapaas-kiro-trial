import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CommunityVenueBookingSkeleton } from './CommunityVenueBookingSkeleton'

async function completeCommunityVenueBooking(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I have read and understand the privacy and terms information.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.type(screen.getByLabelText('Full name'), 'Alex Citizen')
  await user.type(screen.getByLabelText('Email address'), 'alex@example.test')
  await user.type(screen.getByLabelText('Phone number'), '0400000000')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.selectOptions(screen.getByLabelText('Venue type'), 'hall')
  await user.type(screen.getByLabelText('Booking purpose'), 'Community workshop')
  await user.type(screen.getByLabelText('Day'), '25')
  await user.type(screen.getByLabelText('Month'), '12')
  await user.type(screen.getByLabelText('Year'), '2026')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.click(screen.getByRole('radio', { name: 'No' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.type(screen.getByLabelText('Additional information'), 'Mock booking details for the community venue.')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

describe('CommunityVenueBookingSkeleton', () => {
  it('shows separate placeholder privacy, terms and notification sections', () => {
    render(<CommunityVenueBookingSkeleton />)

    expect(screen.getByRole('heading', { name: 'Privacy collection notice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Terms and conditions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeInTheDocument()
    expect(screen.getByText('Replace these placeholders with the confirmed privacy collection notice, terms and notification wording for the community venue booking service.')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I have read and understand the privacy and terms information.' })).toBeInTheDocument()
  })

  it('keeps declaration source-gated and replays accepted declaration on review', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await completeCommunityVenueBooking(user)

    expect(screen.getByRole('heading', { name: 'Review your booking' })).toBeInTheDocument()
    expect(screen.getByText('You accepted this placeholder declaration before reviewing the booking:')).toBeInTheDocument()
    expect(screen.getByText('Legal consequence wording remains source-gated and must be confirmed by the policy owner.')).toBeInTheDocument()
  })

  it('completes the mock flow to the confirmation step', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await completeCommunityVenueBooking(user)
    await user.click(screen.getByRole('button', { name: 'Submit booking' }))

    expect(screen.getByRole('heading', { name: 'Booking submitted' })).toBeInTheDocument()
    expect(screen.getByText('VENUE-000000')).toBeInTheDocument()
  })

  it('keeps Community Venue confirmation free of developer-facing source inventory links', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await completeCommunityVenueBooking(user)
    await user.click(screen.getByRole('button', { name: 'Submit booking' }))

    expect(screen.queryByRole('link', { name: 'Review TaPaaS source inventory' })).not.toBeInTheDocument()
    expect(screen.queryByText('Review TaPaaS source inventory')).not.toBeInTheDocument()
  })

  it('uses a preview-safe confirmation CTA label', async () => {
    const user = userEvent.setup()
    render(<CommunityVenueBookingSkeleton />)

    await completeCommunityVenueBooking(user)
    await user.click(screen.getByRole('button', { name: 'Submit booking' }))

    expect(screen.getByRole('button', { name: 'Start another booking' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Start again' })).not.toBeInTheDocument()
  })
})
