import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AccessibleMarketPermitSkeleton } from './AccessibleMarketPermitSkeleton'

async function completeAccessibleMarketPermit(user: ReturnType<typeof userEvent.setup>, options: { needsSupport?: 'yes' | 'no' } = {}) {
  await completePrivacy(user)
  await completeApplicantDetails(user)
  await completeContactDetails(user)
  await completeMarketDetails(user)

  if (options.needsSupport === 'yes') {
    await user.click(screen.getByRole('radio', { name: 'Yes' }))
    await user.type(screen.getByLabelText('Describe the support needed'), 'Accessible stall position near step-free access.')
    await user.click(screen.getByRole('button', { name: 'Continue' }))
  } else {
    await user.click(screen.getByRole('radio', { name: 'No' }))
    await user.click(screen.getByRole('button', { name: 'Continue' }))
  }

  await user.type(screen.getByLabelText('Additional information'), 'Stall setup details for the mock application.')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completePrivacy(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I have read and understand the privacy information.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeApplicantDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Full name *'), 'Alex Citizen')
  await user.type(screen.getByLabelText('Day'), '15')
  await user.type(screen.getByLabelText('Month'), '03')
  await user.type(screen.getByLabelText('Year'), '1990')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeContactDetails(user: ReturnType<typeof userEvent.setup>, email = 'alex@example.test') {
  await user.type(screen.getByLabelText('Email address *'), email)
  await user.type(screen.getByLabelText('Phone number *'), '0400000000')
  await user.type(screen.getByLabelText('Street address *'), '1 Market Street')
  await user.type(screen.getByLabelText('Suburb *'), 'Sydney')
  await user.selectOptions(screen.getByLabelText('State *'), 'NSW')
  await user.type(screen.getByLabelText('Postcode *'), '2000')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeMarketDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Market name'), 'Community access market')
  await user.click(screen.getByRole('radio', { name: 'Craft market (mock)' }))
  await user.type(screen.getByLabelText('Day'), '25')
  await user.type(screen.getByLabelText('Month'), '12')
  await user.type(screen.getByLabelText('Year'), '2026')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

describe('AccessibleMarketPermitSkeleton', () => {
  it('renders required full name and primary contact inputs with full-width treatment', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)

    const fullName = screen.getByLabelText('Full name *')
    expect(fullName).toHaveStyle({ width: '100%', maxWidth: '48rem' })

    await completeApplicantDetails(user)

    expect(screen.getByLabelText('Email address *')).toHaveStyle({ width: '100%', maxWidth: '48rem' })
    expect(screen.getByLabelText('Phone number *')).toHaveStyle({ width: '100%', maxWidth: '48rem' })
    expect(screen.getByLabelText('Street address *')).toHaveStyle({ width: '100%', maxWidth: '48rem' })
    expect(screen.getByLabelText('Suburb *')).toHaveStyle({ width: '100%', maxWidth: '48rem' })
    expect(screen.getByLabelText('State *')).toBeInTheDocument()
    expect(screen.getByLabelText('Postcode *')).toBeInTheDocument()
  })

  it('shows an inline invalid DOB error and keeps it until Continue revalidates', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await user.type(screen.getByLabelText('Full name *'), 'Alex Citizen')
    await user.type(screen.getByLabelText('Day'), '31')
    await user.type(screen.getByLabelText('Month'), '02')
    await user.type(screen.getByLabelText('Year'), '1990')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Enter a valid date of birth' })).toHaveAttribute('href', '#dob-day')
    expect(document.getElementById('dob-day-error')).toHaveTextContent('Enter a valid date of birth.')
    expect(screen.getByLabelText('Day')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Month')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Year')).toHaveAttribute('aria-invalid', 'true')

    await user.clear(screen.getByLabelText('Day'))
    await user.type(screen.getByLabelText('Day'), '15')
    await user.clear(screen.getByLabelText('Month'))
    await user.type(screen.getByLabelText('Month'), '03')

    expect(screen.getByRole('link', { name: 'Enter a valid date of birth' })).toBeInTheDocument()
    expect(document.getElementById('dob-day-error')).toHaveTextContent('Enter a valid date of birth.')

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.queryByRole('link', { name: 'Enter a valid date of birth' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Contact details' })).toBeInTheDocument()
  })

  it('shows preview-level email validation and advances after Continue revalidates a valid email', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await completeApplicantDetails(user)
    await completeContactDetails(user, 'alex@example')

    expect(screen.getByRole('link', { name: 'Enter a valid email address' })).toHaveAttribute('href', '#email')
    expect(screen.getByLabelText('Email address *')).toHaveAttribute('aria-invalid', 'true')
    expect(document.getElementById('email-error')).toHaveTextContent('Enter a valid email address.')

    await user.clear(screen.getByLabelText('Email address *'))
    await user.type(screen.getByLabelText('Email address *'), 'alex@example.test')

    expect(screen.getByRole('link', { name: 'Enter a valid email address' })).toBeInTheDocument()
    expect(document.getElementById('email-error')).toHaveTextContent('Enter a valid email address.')

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.queryByRole('link', { name: 'Enter a valid email address' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Market details' })).toBeInTheDocument()
  })

  it('keeps required contact fields on the contact step when they are empty', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await completeApplicantDetails(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Enter a valid email address' })).toHaveAttribute('href', '#email')
    expect(screen.getByRole('link', { name: 'Enter your phone number' })).toHaveAttribute('href', '#phone')
    expect(screen.getByRole('link', { name: 'Enter your street address' })).toHaveAttribute('href', '#street')
    expect(screen.getByRole('link', { name: 'Enter your suburb' })).toHaveAttribute('href', '#suburb')
    expect(screen.getByRole('link', { name: 'Select your state' })).toHaveAttribute('href', '#state')
    expect(screen.getByRole('link', { name: 'Enter a valid 4-digit postcode' })).toHaveAttribute('href', '#postcode')
    expect(screen.getByRole('heading', { name: 'Contact details' })).toBeInTheDocument()
  })

  it('blocks support-needs progression until the yes/no question is answered', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await completeApplicantDetails(user)
    await completeContactDetails(user)
    await completeMarketDetails(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Select whether you need accessibility support' })).toHaveAttribute('href', '#needs-support')
    expect(screen.getByRole('heading', { name: 'Accessibility and support needs' })).toBeInTheDocument()
  })

  it('allows the No support-needs path without support details', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await completeApplicantDetails(user)
    await completeContactDetails(user)
    await completeMarketDetails(user)
    await user.click(screen.getByRole('radio', { name: 'No' }))
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('heading', { name: 'Supporting information' })).toBeInTheDocument()
    expect(screen.queryByLabelText('Describe the support needed')).not.toBeInTheDocument()
  })

  it('requires support details when Yes is selected and preserves the labelled sub-section', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await completeApplicantDetails(user)
    await completeContactDetails(user)
    await completeMarketDetails(user)
    await user.click(screen.getByRole('radio', { name: 'Yes' }))

    const supportDetailsGroup = screen.getByRole('group', { name: 'Support details' })
    expect(within(supportDetailsGroup).getByLabelText('Describe the support needed')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Describe the support needed' })).toHaveAttribute('href', '#support-details')
    expect(within(supportDetailsGroup).getByLabelText('Describe the support needed')).toHaveAttribute('aria-invalid', 'true')

    await user.type(within(supportDetailsGroup).getByLabelText('Describe the support needed'), 'Accessible stall position near step-free access.')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('heading', { name: 'Supporting information' })).toBeInTheDocument()
  })

  it('shows Yes support-needs answer and details as separate review rows', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completeAccessibleMarketPermit(user, { needsSupport: 'yes' })

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.getByText('Needs support')).toBeInTheDocument()
    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('Support details')).toBeInTheDocument()
    expect(screen.getByText('Accessible stall position near step-free access.')).toBeInTheDocument()
  })

  it('shows No support-needs answer on review and omits support details', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completeAccessibleMarketPermit(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.getByText('Needs support')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
    expect(screen.queryByText('Support details')).not.toBeInTheDocument()
  })

  it('submits the mock flow to confirmation without exposing source inventory links', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completeAccessibleMarketPermit(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    const reviewActions = screen.getByRole('group', { name: 'Transaction actions' })
    expect(within(reviewActions).getAllByRole('button').map((button) => button.textContent)).toEqual(['Back', 'Submit application', 'Exit'])

    await user.click(screen.getByRole('button', { name: 'Submit application' }))

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Application submitted' })).toBeInTheDocument()
    expect(screen.getByText('ACCESS-MARKET-000000')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start another application' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Start again' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Review TaPaaS source inventory' })).not.toBeInTheDocument()
  })
})
