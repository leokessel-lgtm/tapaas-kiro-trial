import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { NoticeOfDisposalSkeleton } from './NoticeOfDisposalSkeleton'

const expectedStepperLabels = ['Privacy', 'Vehicle selection', 'Sale and buyer details', 'Review']

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

const backendCodePattern = /NOD\/[A-Z_]+/
const annotationPattern = /\b(mock only|source inventory|owner confirmation|figma node|non-production|build-assist|implementation note|designer note)\b/i

function expectNoBoundaryViolations() {
  const text = document.body.textContent ?? ''
  expect(text).not.toMatch(backendCodePattern)
  expect(text).not.toMatch(annotationPattern)
}

async function completePrivacy(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('checkbox', { name: /accept the terms and conditions/i }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeVehicleSelection(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Select vehicle' }))
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeSaleAndBuyerIndividual(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Date of sale'), '14/06/2025')
  await user.type(screen.getByLabelText(/Sale price or market value/i), '5000')
  await user.click(screen.getByRole('radio', { name: 'Individual' }))
  await user.type(screen.getByLabelText(/Buyer's NSW Driver Licence number/i), 'DA19345')
  await user.type(screen.getByLabelText(/Buyer's family name/i), 'Ngo')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function completeSaleAndBuyerDealer(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Date of sale'), '14/06/2025')
  await user.type(screen.getByLabelText(/Sale price or market value/i), '5000')
  await user.click(screen.getByRole('radio', { name: 'Motor dealer' }))
  await user.type(screen.getByLabelText(/NSW Motor dealer licence number/i), '805401')
  await user.type(screen.getByLabelText(/Registered business name/i), 'CARS2GO')
  await user.click(screen.getByRole('button', { name: 'Continue' }))
}

async function getToReview(user: ReturnType<typeof userEvent.setup>, buyerType: 'individual' | 'dealer' = 'individual') {
  await completePrivacy(user)
  await completeVehicleSelection(user)
  if (buyerType === 'individual') await completeSaleAndBuyerIndividual(user)
  else await completeSaleAndBuyerDealer(user)
}

async function getToConfirmation(user: ReturnType<typeof userEvent.setup>) {
  await getToReview(user)
  await user.click(screen.getByRole('button', { name: 'Submit' }))
}

describe('NoticeOfDisposalSkeleton', () => {
  it('renders the canonical 4-step progress stepper with stable labels and excludes Confirmation', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    expectStepperLabels()
    expect(document.body).not.toHaveTextContent('Step 1 of 9')

    await user.click(screen.getByRole('button', { name: 'Continue' }))
    expectStepperLabels()
  })

  it('uses the TaPaaS privacy-and-terms template with Terms checkbox only', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)

    expect(screen.getByRole('heading', { name: 'Privacy Collection Notice' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Terms and Conditions' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Notifications' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /accept the terms and conditions/i })).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Continue' }))
    expect(screen.getByRole('link', { name: 'Accept the Terms and Conditions to continue' })).toHaveAttribute('href', '#terms-and-conditions')
  })

  it('shows eligible vehicle card and search field on Vehicle selection', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await completePrivacy(user)

    expect(screen.getByRole('heading', { name: 'Vehicle selection' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ADC74M' })).toBeInTheDocument()
    expect(screen.getByText(/SUBARU OUTBACK WAGON/)).toBeInTheDocument()
    expect(screen.getByText(/7 November 2025/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Select vehicle' })).toBeInTheDocument()
    expect(screen.getByLabelText(/Enter a NSW plate number/i)).toBeInTheDocument()
    expect(screen.getByText(/Do not include spaces or special characters/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Find vehicle' })).toBeInTheDocument()
  })

  it('validates vehicle selection before proceeding', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await completePrivacy(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Select a vehicle to continue' })).toHaveAttribute('href', '#vehicle-selection')
  })

  it('shows sale details with DD/MM/YYYY date guidance and sale price field', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await completePrivacy(user)
    await completeVehicleSelection(user)

    expect(screen.getByRole('heading', { name: 'Sale and buyer details' })).toBeInTheDocument()
    expect(screen.getByText(/format DD\/MM\/YYYY/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Date of sale')).toHaveAttribute('placeholder', 'DD/MM/YYYY')
    expect(screen.queryByLabelText('Day')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Month')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Year')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open calendar' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Open calendar' }))
    expect(screen.getByRole('dialog', { name: 'Calendar' })).toBeInTheDocument()
    expect(screen.getByText('Aug 2023')).toBeInTheDocument()
    expect(screen.getByLabelText(/Sale price or market value/i)).toBeInTheDocument()
    expect(screen.getByTestId('sale-price-prefix')).toHaveTextContent('$')
    expect(screen.getByTestId('sale-price-field')).toContainElement(screen.getByLabelText(/Sale price or market value/i))
    expect(screen.getByText(/at least \$1 and no more than \$2 million/i)).toBeInTheDocument()
  })

  it('shows buyer type branching with Individual and Motor dealer options', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await completePrivacy(user)
    await completeVehicleSelection(user)

    expect(screen.getByRole('radio', { name: 'Individual' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Motor dealer' })).toBeInTheDocument()
    expect(screen.getByText(/business, organisation or company/i)).toBeInTheDocument()
  })

  it('uses the source-style error summary and inline errors on sale and buyer details', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await completePrivacy(user)
    await completeVehicleSelection(user)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('link', { name: 'Enter the date of sale' })).toHaveAttribute('href', '#sale-date')
    expect(screen.getByRole('link', { name: 'Enter the sale price or market value' })).toHaveAttribute('href', '#sale-price')
    expect(screen.getByRole('link', { name: 'Select who you sold the vehicle to' })).toHaveAttribute('href', '#buyer-type')
    expect(screen.getByText('Enter the date of sale as DD/MM/YYYY.')).toBeInTheDocument()
    expectNoBoundaryViolations()
  })

  it('shows Individual buyer fields when Individual is selected', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await completePrivacy(user)
    await completeVehicleSelection(user)
    await user.click(screen.getByRole('radio', { name: 'Individual' }))

    expect(screen.getByLabelText('NSW Driver Licence guide')).toBeInTheDocument()
    expect(screen.getAllByText('Licence number').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Card number')).toBeInTheDocument()
    expect(screen.getByLabelText(/Buyer's NSW Driver Licence number/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Buyer does not have a NSW Driver Licence/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Buyer's family name/i)).toBeInTheDocument()
  })

  it('shows Motor dealer fields when Motor dealer is selected', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await completePrivacy(user)
    await completeVehicleSelection(user)
    await user.click(screen.getByRole('radio', { name: 'Motor dealer' }))

    expect(screen.getByLabelText(/NSW Motor dealer licence number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Registered business name/i)).toBeInTheDocument()
  })

  it('mirrors completed sections on Review with correct edit affordances and no fee section', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await getToReview(user)

    expect(screen.getByRole('heading', { name: 'Review' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Your details' })).toBeInTheDocument()
    expect(screen.getByText('Citizen')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Vehicle details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sale and buyer details' })).toBeInTheDocument()
    expect(screen.getByText('14/06/2025')).toBeInTheDocument()

    // Edit affordances: Vehicle + Sale (not Your details which is profile-owned)
    const editButtons = screen.getAllByRole('button', { name: /^Edit / })
    expect(editButtons).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Edit Vehicle details' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Sale and buyer details' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Edit Your details' })).not.toBeInTheDocument()

    // Privacy accordion
    expect(screen.getAllByText('Privacy').length).toBeGreaterThanOrEqual(1)

    // No fees/payment
    expect(screen.queryByText('Fees')).not.toBeInTheDocument()
    expect(screen.queryByText('Payment')).not.toBeInTheDocument()

    // No editable profile fields
    expect(screen.queryByRole('textbox', { name: /family name/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /full name/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: /date of birth/i })).not.toBeInTheDocument()
  })

  it('shows submitted confirmation with receipt, notify buyer, next steps and feedback', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    await getToConfirmation(user)

    expect(document.querySelector('[data-gelweb-component="progress-stepper"]')).toBeNull()
    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Notice of Disposal submitted' })).toBeInTheDocument()

    expect(screen.getByText(/successfully submitted a Notice of Disposal for ADC74M/i)).toBeInTheDocument()
    expect(screen.getByText(/A receipt has been emailed to/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Send to another email' })).toBeInTheDocument()
    expect(screen.getByText('I-037283638')).toBeInTheDocument()
    expect(screen.getByText('2 June 2026')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Keep a record' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Download receipt (PDF 5KB)' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Print receipt' })).toBeInTheDocument()
    expect(screen.getByText('Email receipt')).toBeInTheDocument()
    expect(screen.getByLabelText('Email receipt address')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
    expect(screen.getByText(/Notify the buyer/i)).toBeInTheDocument()
    expect(screen.getByText(/new vehicle owner/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Next steps' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Insurance' })).toBeInTheDocument()
    expect(screen.getByText(/You don't need to do anything/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'E-tag or toll pass' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tolls' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Personalised or special number plates' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'reserve and replace' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Help us improve' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Give feedback' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit another Notice of Disposal' })).toBeInTheDocument()
    expect(screen.getByText('How was your online experience today?')).toBeInTheDocument()

    // No approval claims
    expect(document.body.textContent).not.toMatch(/\bapproved\b/i)
  })

  it('does not render backend error code names, internal notes or customer-facing annotations', async () => {
    const user = userEvent.setup()
    render(<NoticeOfDisposalSkeleton />)
    expectNoBoundaryViolations()
    await completePrivacy(user)
    expectNoBoundaryViolations()
    await completeVehicleSelection(user)
    expectNoBoundaryViolations()
    await completeSaleAndBuyerIndividual(user)
    expectNoBoundaryViolations()
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expectNoBoundaryViolations()
  })
})
