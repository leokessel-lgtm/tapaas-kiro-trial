import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TrialPermitSkeleton } from './TrialPermitSkeleton'

const annotationPattern = /mock only|mock data|source content|required:|placeholder|owner confirmation|implementation note|internal caveat|designer note|non-production|build-assist/i

function expectNoCustomerFacingAnnotations() {
  expect(document.body).not.toHaveTextContent(annotationPattern)
}

async function completePrivacy(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeApplicationDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('radio', { name: 'Standard trial permit' }))
  await user.click(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function getToReview(user: ReturnType<typeof userEvent.setup>) {
  await completePrivacy(user)
  await completeApplicationDetails(user)
}

async function getToConfirmation(user: ReturnType<typeof userEvent.setup>) {
  await getToReview(user)
  await user.click(screen.getByRole('button', { name: 'Submit application' }))
}

describe('TrialPermitSkeleton', () => {
  it('does not render a stepper in default or error states', async () => {
    const user = userEvent.setup()
    const { container } = render(<TrialPermitSkeleton />)

    expect(screen.getByRole('heading', { name: 'Privacy information' })).toBeInTheDocument()
    expect(screen.queryByText(/Step \d+ of \d+/)).not.toBeInTheDocument()
    expect(container.querySelector('[data-gelweb-component="progress-stepper"]')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('group', { name: 'Your form has an error' })).toBeInTheDocument()
    expect(screen.queryByText(/Step \d+ of \d+/)).not.toBeInTheDocument()
    expect(container.querySelector('[data-gelweb-component="progress-stepper"]')).not.toBeInTheDocument()
  })

  it('uses the TaPaaS privacy-and-terms template with a Terms checkbox', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('heading', { name: 'Privacy Collection Notice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Terms and Conditions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications and receipt' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I agree to the Terms and Conditions.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Accept the Terms and Conditions to continue' })).toHaveAttribute('href', '#terms-and-conditions')
    expect(screen.getByRole('button', { name: 'Exit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
    expectNoCustomerFacingAnnotations()
  })

  it('plays back authenticated personal details as read-only Account/Profile data', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await completePrivacy(user)

    expect(screen.getByRole('heading', { name: 'Personal details' })).toBeInTheDocument()
    expect(screen.getByText('These details come from your Service NSW Account.')).toBeInTheDocument()
    expect(screen.getByText('Jane')).toBeInTheDocument()
    expect(screen.getByText('Citizen')).toBeInTheDocument()
    expect(screen.getByText('If these details are incorrect, update them through Account/Profile before continuing.')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /first name/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /family name/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /full name/i })).not.toBeInTheDocument()
    expectNoCustomerFacingAnnotations()
  })

  it('keeps permit type and declaration on the Application details page', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await completePrivacy(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('heading', { name: 'Application details' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Select a permit type' })).toHaveAttribute('href', '#permit-type')
    expect(screen.getByRole('link', { name: 'Accept the declaration to continue' })).toHaveAttribute('href', '#declaration-accepted')
    expect(screen.getByText('By submitting this application, I declare that the information I have provided is true and correct.')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I declare that the information provided is true and correct.' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Declaration' })).not.toBeInTheDocument()

    await completeApplicationDetails(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
  })

  it('mirrors completed Application details and Privacy sections on review', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await getToReview(user)

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Application details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Privacy' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Application details' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Privacy' })).toBeInTheDocument()
    expect(screen.getByText('Standard trial permit')).toBeInTheDocument()
    expect(screen.getAllByText('Accepted')).toHaveLength(2)
    expect(screen.getByText('Receipt shown after approval')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Fees' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Declaration' })).not.toBeInTheDocument()

    const reviewActions = screen.getByRole('group', { name: 'Transaction actions' })
    const reviewButtons = within(reviewActions).getAllByRole('button').map((button) => button.textContent)
    expect(reviewButtons).toEqual(['Back', 'Submit application', 'Exit'])
    expectNoCustomerFacingAnnotations()
  })

  it('submits to immediate-approval confirmation without a Next steps card', async () => {
    const user = userEvent.setup()
    render(<TrialPermitSkeleton />)

    await getToConfirmation(user)

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Your trial permit is approved' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Receipt details' })).toBeInTheDocument()
    expect(screen.getByText('TP-000000')).toBeInTheDocument()
    expect(screen.getByText('1 June 2026')).toBeInTheDocument()
    expect(screen.getByText('Your receipt is your trial permit.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Keep a record' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Print or save receipt' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tell us about your experience' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start another application' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Next steps' })).not.toBeInTheDocument()
    expect(screen.queryByText(/reviewed within/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Continue' })).not.toBeInTheDocument()
    expectNoCustomerFacingAnnotations()
  })
})
