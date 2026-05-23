import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  BackendErrorExamplePage,
  DeclarationReview,
  InteractiveDetailsCard,
  LegalInfoAccordion,
  MpsConfirmationFramePreview,
  MpsReviewFramePreview,
  RadioButtonCards,
  TapaasSearchAction,
  backendErrorExamples,
} from './index'

describe('selected TaPaaS maturity components', () => {
  it('renders declaration review in card and accordion variants', async () => {
    const sections = [
      {
        title: 'Accepted declaration',
        statements: ['I declare the mock information is correct.', 'I understand this is not a real service.'],
      },
    ]

    const { rerender } = render(<DeclarationReview title='Declaration review' sections={sections} />)
    expect(screen.getByRole('heading', { name: 'Declaration review' })).toBeInTheDocument()
    expect(screen.getByText('I declare the mock information is correct.')).toBeInTheDocument()

    rerender(<DeclarationReview title='Declaration review' sections={sections} variant='accordion' />)
    const button = screen.getByRole('button', { name: 'Accepted declaration' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders legal info accordion sections using accordion buttons', async () => {
    const user = userEvent.setup()
    render(<LegalInfoAccordion />)

    expect(screen.getByRole('heading', { name: 'Privacy and notifications' })).toBeInTheDocument()
    const privacyButton = screen.getByRole('button', { name: 'Privacy Collection Notice' })
    expect(privacyButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(privacyButton)
    expect(privacyButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/responsible agency/i)).toBeInTheDocument()
  })

  it('renders interactive details actions as buttons', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()

    render(
      <InteractiveDetailsCard
        title='Mock permit holder'
        rows={[{ label: 'Name', value: 'Alex Citizen' }]}
        statusLabel='Mock active'
        actions={[{ label: 'Remove this holder', onAction, variant: 'secondary' }]}
      />,
    )

    const card = screen.getByRole('region', { name: 'Mock permit holder' })
    expect(within(card).getByText('Mock active')).toBeInTheDocument()
    await user.click(within(card).getByRole('button', { name: 'Remove this holder' }))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('preserves native radio behaviour in radio button cards', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { rerender } = render(
      <RadioButtonCards
        id='application-type'
        legend='What do you want to do?'
        value=''
        onChange={onChange}
        options={[
          { value: 'new', label: 'Apply for a new permit', description: 'Start a new mock application.' },
          { value: 'renew', label: 'Renew a permit', description: 'Use an existing permit.' },
        ]}
        hasError
        required
      />,
    )

    const group = screen.getByRole('group', { name: 'What do you want to do?' })
    expect(group).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Select an option to continue')).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: /Apply for a new permit/ }))
    expect(onChange).toHaveBeenCalledWith('new')

    rerender(
      <RadioButtonCards
        id='application-type'
        legend='What do you want to do?'
        value='new'
        onChange={onChange}
        options={[
          { value: 'new', label: 'Apply for a new permit', description: 'Start a new mock application.' },
          { value: 'renew', label: 'Renew a permit', description: 'Use an existing permit.' },
        ]}
      />,
    )

    expect(screen.getByRole('radio', { name: /Apply for a new permit/ })).toBeChecked()
    expect(screen.getByRole('radio', { name: /Renew a permit/ })).not.toBeChecked()
  })

  it('renders the search vehicle input as a static preview action', () => {
    render(<TapaasSearchAction />)

    expect(screen.getByLabelText('Enter a NSW plate number')).toHaveAttribute('type', 'text')
    expect(screen.getByText('Use placeholder content until service search rules are confirmed.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Find vehicle' })).toBeInTheDocument()
  })

  it('renders backend error examples as hard-stop alert pages', () => {
    render(<BackendErrorExamplePage example={backendErrorExamples.paymentError} onStartAgain={() => undefined} />)

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to submit permit request')
    expect(screen.getByText('Mock backend code:')).toBeInTheDocument()
    expect(screen.getByText('INVALID_PAYMENT_DETAILS')).toBeInTheDocument()
    expect(screen.getByText(/MPS-PAYMENT-MOCK/)).toBeInTheDocument()
  })

  it('renders the MPS review frame preview with frame order and edit labels', () => {
    const onEdit = vi.fn()
    const onSubmit = vi.fn()

    render(
      <MpsReviewFramePreview
        sections={[
          {
            id: 'application-details',
            title: 'Application details',
            rows: [{ label: 'Application type', value: 'Renewal' }],
          },
          {
            id: 'personal-details',
            title: 'Personal details',
            rows: [{ label: 'Full name', value: 'Alex Citizen' }],
          },
        ]}
        declarationStatements={['I declare this mock information is correct.']}
        onEdit={onEdit}
        onSubmit={onSubmit}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Review your application' })).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByText(/Please ensure that the details listed below are correct/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Application details' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Declaration' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit mock application' })).toBeInTheDocument()
  })

  it('renders the MPS confirmation frame preview with next steps and feedback', () => {
    render(
      <MpsConfirmationFramePreview
        referenceNumber='MPS-MOCK-000000'
        applicationDetails={[{ label: 'Applicant', value: 'Alex Citizen' }]}
        nextSteps={[
          { id: 'assessment', content: 'Your mock application will be assessed within [confirmed timeframe].' },
          { id: 'updates', content: 'You will receive updates by [confirmed contact channel].' },
        ]}
        relatedContent={<p>Related transaction content remains owner-confirmation required.</p>}
        onStartAgain={() => undefined}
      />,
    )

    expect(screen.getByRole('status', { name: 'Transaction completed' })).toHaveTextContent('Your application has been submitted')
    expect(screen.getByText('MPS-MOCK-000000')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What happens next?' })).toBeInTheDocument()
    expect(screen.getByLabelText('Was this page useful?')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start again' })).toBeInTheDocument()
  })
})
