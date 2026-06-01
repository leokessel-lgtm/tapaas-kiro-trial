import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AccessibleMarketPermitSkeleton } from './AccessibleMarketPermitSkeleton'

const expectedStepperLabels = ['Privacy', 'Your details', 'Market stall details', 'Additional details', 'Review']

function getProgressStepper() {
  const stepper = document.querySelector('[data-gelweb-component="progress-stepper"]')
  expect(stepper).not.toBeNull()
  return stepper as HTMLElement
}

function expectStepperLabels() {
  const stepper = getProgressStepper()
  expectedStepperLabels.forEach((label) => {
    expect(within(stepper).getByText(label)).toBeInTheDocument()
  })
  expect(within(stepper).queryByText('Confirmation')).not.toBeInTheDocument()
}

function expectNoDesignAnnotations() {
  const renderedText = document.body.textContent ?? ''
  expect(renderedText).not.toMatch(/owner confirmation/i)
  expect(renderedText).not.toMatch(/placeholder/i)
  expect(renderedText).not.toMatch(/mock/i)
  expect(renderedText).not.toMatch(/source inventory/i)
  expect(renderedText).not.toMatch(/replace this/i)
  expect(renderedText).not.toMatch(/confirmed/i)
  expect(renderedText).not.toMatch(/preview/i)
  expect(renderedText).not.toMatch(/non-production/i)
  expect(renderedText).not.toMatch(/payment excluded/i)
}

async function completeAccessibleMarketPermit(user: ReturnType<typeof userEvent.setup>, options: { needsSupport?: 'yes' | 'no' } = {}) {
  await completePrivacy(user)
  await completeYourDetails(user)
  await completeMarketStallDetails(user, options)
  await completeAdditionalDetails(user)
}

async function completePrivacy(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeYourDetails(user: ReturnType<typeof userEvent.setup>, email = 'alex@example.test') {
  await user.type(screen.getByLabelText('Email address'), email)
  await user.type(screen.getByLabelText('Phone number'), '0400000000')
  await user.type(screen.getByLabelText('Street address'), '1 Market Street')
  await user.type(screen.getByLabelText('Suburb'), 'Sydney')
  await user.selectOptions(screen.getByLabelText('State'), 'NSW')
  await user.type(screen.getByLabelText('Postcode'), '2000')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeMarketStallDetails(user: ReturnType<typeof userEvent.setup>, options: { needsSupport?: 'yes' | 'no' } = {}) {
  await user.type(screen.getByLabelText('Market name'), 'Community access market')
  await user.selectOptions(screen.getByLabelText('Market type'), 'arts-craft-market')
  await user.type(screen.getByLabelText('Event day'), '25')
  await user.type(screen.getByLabelText('Event month'), '12')
  await user.type(screen.getByLabelText('Event year'), '2026')

  if (options.needsSupport === 'yes') {
    await user.click(screen.getByRole('radio', { name: 'Yes' }))
    await user.type(screen.getByLabelText('Describe the support needed'), 'Accessible stall position near step-free access.')
  } else {
    await user.click(screen.getByRole('radio', { name: 'No' }))
  }

  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeAdditionalDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Market-stall services description'), 'Stall services and equipment for the market application.')
  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

describe('AccessibleMarketPermitSkeleton', () => {
  it('renders the canonical 5-step progress stepper and keeps labels stable in error state', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    expectStepperLabels()
    expect(document.body).not.toHaveTextContent('Step 1 of 9')

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Accept the Terms and Conditions to continue' })).toHaveAttribute('href', '#terms-and-conditions')
    expectStepperLabels()
    expect(document.body).not.toHaveTextContent('Step 1 of 9')
  })

  it('uses the privacy-and-terms template with a Terms and Conditions checkbox only', () => {
    render(<AccessibleMarketPermitSkeleton />)

    expect(screen.getByRole('heading', { name: 'Privacy Collection Notice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Terms and Conditions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications and receipt' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' })).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(1)
    expect(screen.queryByRole('checkbox', { name: /privacy/i })).not.toBeInTheDocument()
  })

  it('plays back authenticated details as read-only Account/Profile information', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)

    expect(screen.getByRole('heading', { name: 'Verified identity details' })).toBeInTheDocument()
    expect(screen.getByText('Alex Citizen')).toBeInTheDocument()
    expect(screen.getByText('15 March 1990')).toBeInTheDocument()
    expect(screen.getByText('Account/Profile')).toBeInTheDocument()
    expect(screen.getByText(/update them through Account\/Profile/i)).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /full name/i })).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/date of birth/i)).not.toBeInTheDocument()
  })

  it('captures contact and postal address details as transaction-specific details only', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)

    expect(screen.getByText(/captured for this application/i)).toBeInTheDocument()
    expect(screen.getByText(/do not update Account\/Profile/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone number')).toBeInTheDocument()
    expect(screen.getByLabelText('Street address')).toBeInTheDocument()
  })

  it('uses a select control for market type and states the event-date format', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await completeYourDetails(user)

    const marketType = screen.getByRole('combobox', { name: 'Market type' })
    expect(marketType.tagName).toBe('SELECT')
    expect(screen.getByText('Format: DD MM YYYY. For example, 25 12 2026.')).toBeInTheDocument()
    expect(screen.getByLabelText('Event day')).toBeInTheDocument()
    expect(screen.getByLabelText('Event month')).toBeInTheDocument()
    expect(screen.getByLabelText('Event year')).toBeInTheDocument()
  })

  it('keeps support details conditional on Yes and requires details only when Yes is selected', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await completeYourDetails(user)
    await user.type(screen.getByLabelText('Market name'), 'Community access market')
    await user.selectOptions(screen.getByLabelText('Market type'), 'arts-craft-market')
    await user.type(screen.getByLabelText('Event day'), '25')
    await user.type(screen.getByLabelText('Event month'), '12')
    await user.type(screen.getByLabelText('Event year'), '2026')

    expect(screen.queryByLabelText('Describe the support needed')).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Yes' }))

    expect(screen.getByLabelText('Describe the support needed')).toBeInTheDocument()
    expect(screen.getByText('Maximum 500 characters.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Describe the support needed' })).toHaveAttribute('href', '#support-details')
    expect(screen.getByLabelText('Describe the support needed')).toHaveAttribute('aria-invalid', 'true')

    await user.type(screen.getByLabelText('Describe the support needed'), 'Accessible stall position near step-free access.')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('heading', { name: 'Additional details' })).toBeInTheDocument()
  })

  it('puts market-stall services description and declaration on Additional details', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completePrivacy(user)
    await completeYourDetails(user)
    await completeMarketStallDetails(user)

    expect(screen.getByRole('heading', { name: 'Additional details' })).toBeInTheDocument()
    expect(screen.getByLabelText('Market-stall services description')).toBeInTheDocument()
    expect(screen.getByText(/Maximum 500 characters/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Declaration' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' })).toBeInTheDocument()
  })

  it('mirrors completed sections on review with one edit affordance per section and no fee treatment', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completeAccessibleMarketPermit(user, { needsSupport: 'yes' })

    expect(screen.getByRole('heading', { name: 'Review' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Your details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Market stall information' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Additional information' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Privacy' })).toBeInTheDocument()

    expect(screen.getAllByRole('button', { name: /^Edit / })).toHaveLength(4)
    expect(screen.getByRole('button', { name: 'Edit Your details' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Market stall information' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Additional information' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Privacy' })).toBeInTheDocument()
    expect(screen.queryByText('Fees')).not.toBeInTheDocument()
    expect(screen.queryByText('$0.00')).not.toBeInTheDocument()
  })

  it('excludes confirmation from the stepper and shows submitted-for-review confirmation content', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    await completeAccessibleMarketPermit(user)
    await user.click(screen.getByRole('button', { name: 'Submit application' }))

    expect(document.querySelector('[data-gelweb-component="progress-stepper"]')).toBeNull()
    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Application submitted for review' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Receipt details' })).toBeInTheDocument()
    expect(screen.getByText('Receipt number')).toBeInTheDocument()
    expect(screen.getByText('AMP-000000')).toBeInTheDocument()
    expect(screen.getByText('Transaction date')).toBeInTheDocument()
    expect(screen.getByText('1 June 2026')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Keep a record' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Print or save receipt' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Next steps' })).toBeInTheDocument()
    expect(screen.getByText('Your application will be reviewed.')).toBeInTheDocument()
    expect(screen.getByText('You will be sent the outcome using the contact details provided.')).toBeInTheDocument()
    expect(screen.getByText('If approved, permit details or documents will be sent to you.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tell us about your experience' })).toBeInTheDocument()
  })

  it('does not render customer-facing design annotations or internal notes across the AMP flow', async () => {
    const user = userEvent.setup()
    render(<AccessibleMarketPermitSkeleton />)

    expectNoDesignAnnotations()
    await completePrivacy(user)
    expectNoDesignAnnotations()
    await completeYourDetails(user)
    expectNoDesignAnnotations()
    await completeMarketStallDetails(user, { needsSupport: 'yes' })
    expectNoDesignAnnotations()
    await completeAdditionalDetails(user)
    expectNoDesignAnnotations()
    await user.click(screen.getByRole('button', { name: 'Submit application' }))
    expectNoDesignAnnotations()
  })
})
