import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AccessibleMarketPermitSkeleton } from './AccessibleMarketPermitSkeleton'

async function completeAccessibleMarketPermit(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I have read and understand the privacy information.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.type(screen.getByLabelText('Full name'), 'Alex Citizen')
  await user.type(screen.getByLabelText('Day'), '15')
  await user.type(screen.getByLabelText('Month'), '03')
  await user.type(screen.getByLabelText('Year'), '1990')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.type(screen.getByLabelText('Email address'), 'alex@example.test')
  await user.type(screen.getByLabelText('Phone number'), '0400000000')
  await user.type(screen.getByLabelText('Street address'), '1 Market Street')
  await user.type(screen.getByLabelText('Suburb'), 'Sydney')
  await user.selectOptions(screen.getByLabelText('State'), 'NSW')
  await user.type(screen.getByLabelText('Postcode'), '2000')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.type(screen.getByLabelText('Market name'), 'Community access market')
  await user.click(screen.getByRole('radio', { name: 'Craft market (mock)' }))
  await user.type(screen.getByLabelText('Day'), '25')
  await user.type(screen.getByLabelText('Month'), '12')
  await user.type(screen.getByLabelText('Year'), '2026')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.click(screen.getByRole('radio', { name: 'No' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.type(screen.getByLabelText('Additional information'), 'Stall setup details for the mock application.')
  await user.click(screen.getByRole('button', { name: 'Continue' }))

  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

describe('AccessibleMarketPermitSkeleton', () => {
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
