import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { BuskingPermitSkeleton } from './BuskingPermitSkeleton'

const expectedStepperLabels = ['Privacy', 'Your details', 'Performance details', 'Additional details', 'Review']

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
  expect(renderedText).not.toMatch(/\bplaceholder\b/i)
  expect(renderedText).not.toMatch(/\bmock\b/i)
  expect(renderedText).not.toMatch(/source inventory/i)
  expect(renderedText).not.toMatch(/replace this/i)
  expect(renderedText).not.toMatch(/\bpreview\b/i)
  expect(renderedText).not.toMatch(/non-production/i)
  expect(renderedText).not.toMatch(/designer note/i)
  expect(renderedText).not.toMatch(/implementation note/i)
}

async function completePrivacy(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeYourDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completePerformanceDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.selectOptions(screen.getByLabelText('Performance type'), 'music')
  await user.type(screen.getByLabelText('Performance description'), 'Acoustic guitar and vocals in a public square.')
  await user.type(screen.getByLabelText('Proposed location'), 'Martin Place, Sydney')
  await user.type(screen.getByLabelText('Day'), '15')
  await user.type(screen.getByLabelText('Month'), '08')
  await user.type(screen.getByLabelText('Year'), '2026')
  await user.type(screen.getByLabelText('Proposed start time'), '10:00 AM')
  await user.type(screen.getByLabelText('Proposed end time'), '2:00 PM')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeAdditionalDetailsNo(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: 'No' }))
  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeAdditionalDetailsYes(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: 'Yes' }))
  await user.type(screen.getByLabelText('Describe the support or adjustments needed'), 'Need accessible power outlet near performance area.')
  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeToReview(user: ReturnType<typeof userEvent.setup>, supportNeeded = false) {
  await completePrivacy(user)
  await completeYourDetails(user)
  await completePerformanceDetails(user)
  if (supportNeeded) {
    await completeAdditionalDetailsYes(user)
  } else {
    await completeAdditionalDetailsNo(user)
  }
}

async function completeToConfirmation(user: ReturnType<typeof userEvent.setup>) {
  await completeToReview(user)
  await user.click(screen.getByRole('button', { name: 'Submit application' }))
}

describe('BuskingPermitSkeleton', () => {
  it('renders the canonical 5-step progress stepper and keeps labels stable in error state', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    expectStepperLabels()
    expect(document.body).not.toHaveTextContent('Step 1 of 9')

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Accept the Terms and Conditions to continue' })).toHaveAttribute('href', '#terms-and-conditions')
    expectStepperLabels()
    expect(document.body).not.toHaveTextContent('Step 1 of 9')
  })

  it('excludes Confirmation from the stepper', () => {
    render(<BuskingPermitSkeleton />)

    const stepper = getProgressStepper()
    expect(within(stepper).queryByText('Confirmation')).not.toBeInTheDocument()
    expect(within(stepper).queryByText(/submitted/i)).not.toBeInTheDocument()
  })

  it('uses the TaPaaS privacy-and-terms template with a Terms checkbox only', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    expect(screen.getByRole('heading', { name: 'Privacy Collection Notice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Terms and Conditions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications and receipt' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' })).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Accept the Terms and Conditions to continue' })).toHaveAttribute('href', '#terms-and-conditions')
  })

  it('plays back authenticated personal details as read-only and does not render editable name fields', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    await completePrivacy(user)

    expect(screen.getByRole('heading', { name: 'Your profile details' })).toBeInTheDocument()
    expect(screen.getByText('Alex')).toBeInTheDocument()
    expect(screen.getByText('Citizen')).toBeInTheDocument()
    expect(screen.getByText('alex.citizen@example.test')).toBeInTheDocument()
    expect(screen.getByText(/update them through Account\/Profile/i)).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /first name/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /family name/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /full name/i })).not.toBeInTheDocument()
  })

  it('uses a select control for performance type', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    await completePrivacy(user)
    await completeYourDetails(user)

    const performanceType = screen.getByRole('combobox', { name: 'Performance type' })
    expect(performanceType.tagName).toBe('SELECT')
  })

  it('shows date help text with the expected format', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    await completePrivacy(user)
    await completeYourDetails(user)

    expect(screen.getByText('Format: DD MM YYYY. For example, 15 08 2026.')).toBeInTheDocument()
    expect(screen.getByLabelText('Day')).toBeInTheDocument()
    expect(screen.getByLabelText('Month')).toBeInTheDocument()
    expect(screen.getByLabelText('Year')).toBeInTheDocument()
  })

  it('keeps support-needs conditional — hidden until Yes is selected', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    await completePrivacy(user)
    await completeYourDetails(user)
    await completePerformanceDetails(user)

    expect(screen.queryByLabelText('Describe the support or adjustments needed')).not.toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Yes' }))

    expect(screen.getByLabelText('Describe the support or adjustments needed')).toBeInTheDocument()
    expect(screen.getByText('Maximum 500 characters.')).toBeInTheDocument()
  })

  it('keeps the declaration on the Additional details page', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    await completePrivacy(user)
    await completeYourDetails(user)
    await completePerformanceDetails(user)

    expect(screen.getByRole('heading', { name: 'Additional details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Declaration' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' })).toBeInTheDocument()
  })

  it('mirrors completed sections on review with one edit affordance per section', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    await completeToReview(user, true)

    expect(screen.getByRole('heading', { name: 'Review' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Your details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Performance details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Additional details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Privacy' })).toBeInTheDocument()

    expect(screen.getAllByRole('button', { name: /^Edit / })).toHaveLength(4)
    expect(screen.getByRole('button', { name: 'Edit Your details' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Performance details' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Additional details' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Privacy' })).toBeInTheDocument()

    expect(screen.getByText('Music')).toBeInTheDocument()
    expect(screen.getByText('Martin Place, Sydney')).toBeInTheDocument()
    expect(screen.getByText('10:00 AM')).toBeInTheDocument()
    expect(screen.getByText('2:00 PM')).toBeInTheDocument()
    expect(screen.getByText('Need accessible power outlet near performance area.')).toBeInTheDocument()
    expect(screen.queryByText('Fees')).not.toBeInTheDocument()
  })

  it('renders submitted-for-review confirmation with Next steps', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    await completeToConfirmation(user)

    expect(document.querySelector('[data-gelweb-component="progress-stepper"]')).toBeNull()
    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Your busking permit application has been submitted' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Receipt details' })).toBeInTheDocument()
    expect(screen.getByText('BUSK-000000')).toBeInTheDocument()
    expect(screen.getByText('2 June 2026')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Keep a record' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Print or save receipt' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Next steps' })).toBeInTheDocument()
    expect(screen.getByText('Your application will be reviewed.')).toBeInTheDocument()
    expect(screen.getByText('You will be notified of the outcome using the contact details in your profile.')).toBeInTheDocument()
    expect(screen.getByText('If your application is successful, your busking permit will be sent to you.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tell us about your experience' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start another application' })).toBeInTheDocument()
  })

  it('does not render customer-facing design annotations across the full flow', async () => {
    const user = userEvent.setup()
    render(<BuskingPermitSkeleton />)

    expectNoDesignAnnotations()
    await completePrivacy(user)
    expectNoDesignAnnotations()
    await completeYourDetails(user)
    expectNoDesignAnnotations()
    await completePerformanceDetails(user)
    expectNoDesignAnnotations()
    await completeAdditionalDetailsNo(user)
    expectNoDesignAnnotations()
    await user.click(screen.getByRole('button', { name: 'Submit application' }))
    expectNoDesignAnnotations()
  })
})
