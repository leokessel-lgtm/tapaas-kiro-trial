import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  BackendErrorExamplePage,
  DeclarationReview,
  InteractiveDetailsCard,
  LegalInfoAccordion,
  MpsApplicantDetailsFramePreview,
  MpsConfirmationFramePreview,
  MpsReviewFramePreview,
  NextStepsCardPreview,
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
    expect(screen.getByText(/indicates a required field/)).toBeInTheDocument()
    expect(screen.getByText(/Please ensure that the details listed below are correct/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit Application details' })).toBeInTheDocument()
    const declarationGroup = screen.getByRole('group', { name: 'Declaration' })
    expect(declarationGroup).toHaveAccessibleDescription(/indicates a required field/)
    const declarationCheckboxes = within(declarationGroup).getAllByRole('checkbox')
    expect(declarationCheckboxes).toHaveLength(2)
    declarationCheckboxes.forEach((checkbox) => expect(checkbox).toBeChecked())
    expect(within(declarationGroup).getByText(/Applicant Terms and Conditions/)).toBeInTheDocument()
    expect(within(declarationGroup).getByText(/Information Collection Notice/)).toBeInTheDocument()
    expect(within(declarationGroup).getAllByText('*')).toHaveLength(2)
    expect(within(declarationGroup).getByText(/Legal, privacy and policy wording is placeholder-only/)).toHaveClass('gel-sr-only')
    expect(screen.getByRole('button', { name: 'Submit mock application' })).toBeInTheDocument()
  })

  it('renders the MPS applicant details frame in search-address and manual-address variants', async () => {
    const user = userEvent.setup()
    const onManualAddress = vi.fn()
    const onAddressSearch = vi.fn()

    const { rerender } = render(
      <MpsApplicantDetailsFramePreview
        addressMode='search'
        value={{ firstName: 'Alex', lastName: 'Citizen', dateOfBirthDay: '01', dateOfBirthMonth: 'jan', dateOfBirthYear: '1980' }}
        onManualAddress={onManualAddress}
        onContinue={() => undefined}
        onBack={() => undefined}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Personal details' })).toBeInTheDocument()
    expect(screen.getByText(/indicates a required field/)).toBeInTheDocument()
    expect(screen.getByLabelText('First name *')).toHaveValue('Alex')
    expect(screen.getByLabelText('Last name *')).toHaveValue('Citizen')
    expect(screen.getByRole('group', { name: 'Date of birth *' })).toBeInTheDocument()
    expect(screen.getByLabelText('Residential address *')).toBeInTheDocument()
    expect(screen.getByText(/Start typing and select your address/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Enter address manually' }))
    expect(onManualAddress).toHaveBeenCalledTimes(1)

    rerender(
      <MpsApplicantDetailsFramePreview
        addressMode='manual'
        value={{
          firstName: 'Alex',
          lastName: 'Citizen',
          dateOfBirthDay: '01',
          dateOfBirthMonth: 'jan',
          dateOfBirthYear: '1980',
          streetNumber: '1',
          streetName: 'Mock',
          streetType: 'street',
          suburb: 'Sydney',
          state: 'NSW',
          postcode: '2000',
          email: 'alex@example.test',
          phone: '0212345678',
        }}
        onAddressSearch={onAddressSearch}
        onContinue={() => undefined}
        onBack={() => undefined}
      />,
    )

    const addressGroup = screen.getByRole('group', { name: 'Residential address' })
    expect(within(addressGroup).getByLabelText('Unit number')).toBeInTheDocument()
    expect(within(addressGroup).getByLabelText('Street number *')).toHaveValue('1')
    expect(within(addressGroup).getByLabelText('Street type *')).toHaveValue('street')
    expect(within(addressGroup).getByLabelText('State *')).toHaveValue('NSW')
    await user.click(within(addressGroup).getByRole('button', { name: 'Back to search' }))
    expect(onAddressSearch).toHaveBeenCalledTimes(1)
  })

  it('renders the MPS confirmation frame preview with next steps and feedback', async () => {
    const user = userEvent.setup()

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
    expect(screen.getByLabelText('How was the Mobility Parking Scheme permit?')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Yes' }))
    expect(screen.getByText('Mock feedback selected. Feedback capture is not implemented in this preview.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start again' })).toBeInTheDocument()
  })

  it('renders the Next steps card as ordered and unordered preview guidance', () => {
    const items = [
      { id: 'assessment', heading: 'Application assessment', body: 'Your mock application will be assessed within [confirmed timeframe].' },
      { id: 'updates', heading: 'Application updates', body: 'You will receive updates by [confirmed contact channel].' },
    ]

    const { rerender } = render(<NextStepsCardPreview items={items} />)

    const orderedCard = screen.getByRole('region', { name: 'Next steps' })
    expect(within(orderedCard).getByRole('list')).toBeInTheDocument()
    expect(within(orderedCard).getByRole('heading', { name: 'Application assessment' })).toBeInTheDocument()
    expect(within(orderedCard).getByText('Your mock application will be assessed within [confirmed timeframe].')).toBeInTheDocument()

    rerender(<NextStepsCardPreview heading='Other ways to keep going' showStepNumbers={false} showIcon={false} items={items} />)

    const unorderedCard = screen.getByRole('region', { name: 'Other ways to keep going' })
    expect(within(unorderedCard).getByRole('list')).toBeInTheDocument()
    expect(within(unorderedCard).getByRole('heading', { name: 'Application updates' })).toBeInTheDocument()
  })
})
