import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
  AssessmentSummaryPanel,
  BusinessErrorPage,
  BackendErrorExamplePage,
  ConfirmationHeader,
  DeclarationReview,
  DetailsCard,
  EvidenceChecklistCard,
  InteractiveDetailsCard,
  LegalInfoAccordion,
  MpsApplicantDetailsFramePreview,
  MpsConfirmationFramePreview,
  MpsMedicalEvidenceStatusPreview,
  MpsReviewFramePreview,
  NextStepsCardPreview,
  PrivacyCardPreview,
  RadioButtonCards,
  ReviewInfoCard,
  SystemErrorPage,
  TapaasSearchAction,
  TransactionCtaGroup,
  TransactionSummaryCard,
  backendErrorExamples,
} from './index'

function duplicateIds(container: HTMLElement) {
  const ids = Array.from(container.querySelectorAll<HTMLElement>('[id]')).map((element) => element.id)
  return ids.filter((id, index) => ids.indexOf(id) !== index)
}

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

  it('renders declaration review paired variants without duplicate IDs', () => {
    const sections = [
      {
        title: 'Accepted declaration',
        statements: ['I declare the mock information is correct.'],
      },
    ]

    const { container } = render(
      <>
        <DeclarationReview title='Declaration review card' sections={sections} />
        <DeclarationReview title='Declaration review accordion' sections={sections} variant='accordion' />
      </>,
    )

    expect(screen.getByRole('heading', { name: 'Declaration review card' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Declaration review accordion' })).toBeInTheDocument()
    expect(duplicateIds(container)).toEqual([])
  })

  it('renders legal info accordion sections using accordion buttons', async () => {
    const user = userEvent.setup()
    render(<LegalInfoAccordion />)

    expect(screen.getByRole('heading', { name: 'Privacy' })).toBeInTheDocument()
    const privacyButton = screen.getByRole('button', { name: 'Privacy Collection Notice' })
    expect(privacyButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(privacyButton)
    expect(privacyButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Agency name/)).toBeInTheDocument()
  })

  it('keeps legal info accordion content as placeholder review text', async () => {
    const user = userEvent.setup()
    render(<LegalInfoAccordion />)

    const termsButton = screen.getByRole('button', { name: 'Terms and Conditions' })
    await user.click(termsButton)

    expect(termsButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Confirm the real wording with the service owner/)).toBeInTheDocument()
  })

  it('renders interactive details actions as buttons', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()

    render(
      <InteractiveDetailsCard
        title='Key information'
        rows={[{ label: 'Name', value: 'Alex Citizen' }]}
        statusLabel='Mock active'
        actions={[{ label: 'Remove this vehicle', onAction, variant: 'link' }]}
      />,
    )

    const card = screen.getByRole('region', { name: 'Key information' })
    expect(within(card).getByText('Mock active')).toBeInTheDocument()
    await user.click(within(card).getByRole('button', { name: 'Remove this vehicle' }))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('renders interactive details multiple preview actions without navigation', async () => {
    const user = userEvent.setup()
    const onReview = vi.fn()
    const onRemove = vi.fn()

    render(
      <InteractiveDetailsCard
        title='Key information'
        rows={[{ label: 'Name', value: 'Alex Citizen' }]}
        statusLabel='Mock active'
        actions={[
          { label: 'Review details', onAction: onReview, variant: 'secondary' },
          { label: 'Remove this vehicle', onAction: onRemove, variant: 'link' },
        ]}
      />,
    )

    const card = screen.getByRole('region', { name: 'Key information' })
    const actionGroup = within(card).getByLabelText('Key information actions')
    await user.click(within(actionGroup).getByRole('button', { name: 'Review details' }))
    await user.click(within(actionGroup).getByRole('button', { name: 'Remove this vehicle' }))

    expect(onReview).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('renders read-only details card with optional preview action', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()

    render(
      <DetailsCard
        title='Account context'
        description='Read-only preview content. No real account data is used.'
        statusLabel='Mock verified'
        rows={[
          { label: 'Name', value: 'Alex Citizen' },
          { label: 'Customer number', value: 'MOCK-0000' },
        ]}
        onAction={onAction}
        actionLabel='Review mock details'
      />,
    )

    const card = screen.getByRole('region', { name: 'Account context' })
    expect(within(card).getByText('Mock verified')).toBeInTheDocument()
    expect(within(card).getByText('MOCK-0000')).toBeInTheDocument()
    await user.click(within(card).getByRole('button', { name: 'Review mock details' }))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('renders confirmation header as a status surface', () => {
    render(<ConfirmationHeader title='Application submitted' transactionName='Mock transaction' />)

    const status = screen.getByRole('status', { name: 'Transaction completed' })
    expect(within(status).getByRole('heading', { name: 'Application submitted' })).toBeInTheDocument()
    expect(within(status).getByText('Mock transaction')).toBeInTheDocument()
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
    expect(screen.getByText('Please select an option.')).toBeInTheDocument()

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

  it('supports keyboard movement in radio button cards preview', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <RadioButtonCards
        id='application-type-keyboard'
        legend='What do you want to do?'
        value='renew'
        onChange={onChange}
        options={[
          { value: 'new', label: 'Apply for a new permit', description: 'Start a new mock application.' },
          { value: 'renew', label: 'Renew a permit', description: 'Use an existing permit.' },
          { value: 'replace', label: 'Replace a permit', description: 'Replace an existing permit.' },
        ]}
      />,
    )

    const renew = screen.getByRole('radio', { name: /Renew a permit/ })
    renew.focus()
    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenCalledWith('replace')

    await user.keyboard('{ArrowLeft}')
    expect(onChange).toHaveBeenCalledWith('new')

    await user.keyboard('{Home}')
    expect(onChange).toHaveBeenCalledWith('new')

    await user.keyboard('{End}')
    expect(onChange).toHaveBeenCalledWith('replace')
  })

  it('renders the search vehicle input as a static preview action', () => {
    render(<TapaasSearchAction />)

    expect(screen.getByLabelText('Enter a NSW plate number')).toHaveAttribute('type', 'text')
    expect(screen.getByText('For example ABC123. Do not include spaces or special characters.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Find vehicle' })).toBeInTheDocument()
  })

  it('renders privacy card sections with explicit acknowledgement state', () => {
    const { rerender } = render(<PrivacyCardPreview acknowledgementChecked />)

    expect(screen.getByRole('region', { name: 'Privacy information' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Privacy collection notice' })).toBeInTheDocument()
    expect(screen.getByText(/confirmed collection notice/)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'I have read and understood the privacy information.' })).toBeChecked()

    rerender(<PrivacyCardPreview acknowledgementChecked={false} hasError />)

    expect(screen.getByRole('checkbox', { name: 'I have read and understood the privacy information.' })).toHaveAccessibleDescription('Confirm that you have read the privacy information.')
    expect(screen.getByText('Confirm that you have read the privacy information.')).toBeInTheDocument()
  })

  it('renders review information rows with section-specific edit action', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()

    render(
      <ReviewInfoCard
        title='Licence details'
        sections={[
          {
            title: 'Applicant information',
            rows: [
              { label: 'Full name', value: 'Alex Citizen' },
              { label: 'Licence type', value: 'Individual licence' },
            ],
          },
        ]}
        onEdit={onEdit}
      />,
    )

    const card = screen.getByRole('region', { name: 'Licence details' })
    expect(within(card).getByRole('heading', { name: 'Applicant information' })).toBeInTheDocument()
    expect(within(card).getByText('Full name')).toBeInTheDocument()
    expect(within(card).getByText('Alex Citizen')).toBeInTheDocument()
    await user.click(within(card).getByRole('button', { name: 'Edit Licence details' }))
    expect(onEdit).toHaveBeenCalledTimes(1)
  })

  it('renders transaction summary card rows and extra receipt content', () => {
    render(
      <TransactionSummaryCard
        heading='Receipt details'
        items={[
          { label: 'Reference number', value: 'MOCK-123456', helpText: 'Mock reference only.' },
          { label: 'Application', value: 'Sample transaction' },
        ]}
      >
        <p>Final receipt details need owner confirmation.</p>
      </TransactionSummaryCard>,
    )

    const card = screen.getByRole('region', { name: 'Receipt details' })
    expect(within(card).getByText('Reference number')).toBeInTheDocument()
    expect(within(card).getByText('MOCK-123456')).toBeInTheDocument()
    expect(within(card).getByText('Mock reference only.')).toBeInTheDocument()
    expect(within(card).getByText('Final receipt details need owner confirmation.')).toBeInTheDocument()
  })

  it('renders evidence checklist statuses without upload controls', () => {
    render(
      <EvidenceChecklistCard
        title='Evidence checklist'
        items={[
          { id: 'identity', label: 'Proof of identity', status: 'provided', description: 'Static mock state only.' },
          { id: 'medical', label: 'Medical evidence', status: 'required', description: 'No file is uploaded in this preview.' },
          { id: 'concession', label: 'Concession evidence', status: 'not-required' },
          { id: 'review', label: 'Assessment review', status: 'needs-review' },
        ]}
      >
        <p>Static evidence summary only.</p>
      </EvidenceChecklistCard>,
    )

    const card = screen.getByRole('region', { name: 'Evidence checklist' })
    expect(within(card).getByText('Mock provided')).toBeInTheDocument()
    expect(within(card).getByText('Required')).toBeInTheDocument()
    expect(within(card).getByText('Not required')).toBeInTheDocument()
    expect(within(card).getByText('Needs review')).toBeInTheDocument()
    expect(within(card).getByText('Static evidence summary only.')).toBeInTheDocument()
    expect(within(card).queryByRole('button', { name: /upload/i })).not.toBeInTheDocument()
    expect(within(card).queryByLabelText(/upload/i)).not.toBeInTheDocument()
  })

  it('renders assessment summary rows as mock status display only', () => {
    render(
      <AssessmentSummaryPanel
        title='Mock assessment summary'
        items={[
          { label: 'Eligibility decision', value: 'Not assessed', tone: 'warning' },
          { label: 'Identity proofing', value: 'Mock acknowledged', tone: 'good' },
          { label: 'Concession validation', value: 'Not required', tone: 'neutral' },
          { label: 'Payment route', value: 'Not started', tone: 'error' },
        ]}
      >
        <p>No eligibility, concession or payment decision is made.</p>
      </AssessmentSummaryPanel>,
    )

    const panel = screen.getByRole('region', { name: 'Mock assessment summary' })
    expect(within(panel).getByText('Eligibility decision')).toBeInTheDocument()
    expect(within(panel).getByText('Not assessed')).toBeInTheDocument()
    expect(within(panel).getByText('Mock acknowledged')).toBeInTheDocument()
    expect(within(panel).getByText('No eligibility, concession or payment decision is made.')).toBeInTheDocument()
    expect(within(panel).queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders transaction action areas without routing behaviour', async () => {
    const user = userEvent.setup()
    const onContinue = vi.fn()
    const onBack = vi.fn()
    const onExit = vi.fn()

    render(
      <TransactionCtaGroup
        continueLabel='Start another application'
        exitLabel='Return to Service NSW'
        onContinue={onContinue}
        onBack={onBack}
        onExit={onExit}
      />,
    )

    const actionGroup = screen.getByRole('group', { name: 'Transaction actions' })
    expect(actionGroup).toHaveAttribute('data-tapaas-component', 'transaction-action-area')
    const buttons = within(actionGroup).getAllByRole('button').map((button) => button.textContent)
    expect(buttons).toEqual(['Back', 'Start another application', 'Return to Service NSW'])
    expect(within(actionGroup).getByRole('button', { name: 'Back' })).toHaveClass('gel-btn--secondary')
    expect(within(actionGroup).getByRole('button', { name: 'Back' })).not.toHaveClass('gel-btn--destructive')
    await user.click(within(actionGroup).getByRole('button', { name: 'Start another application' }))
    await user.click(within(actionGroup).getByRole('button', { name: 'Back' }))
    await user.click(within(actionGroup).getByRole('button', { name: 'Return to Service NSW' }))
    expect(onContinue).toHaveBeenCalledTimes(1)
    expect(onBack).toHaveBeenCalledTimes(1)
    expect(onExit).toHaveBeenCalledTimes(1)
  })

  it('renders backend error examples as hard-stop alert pages', () => {
    render(<BackendErrorExamplePage example={backendErrorExamples.paymentError} onStartAgain={() => undefined} />)

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to submit permit request')
    expect(screen.getByText('Mock backend code:')).toBeInTheDocument()
    expect(screen.getByText('INVALID_PAYMENT_DETAILS')).toBeInTheDocument()
    expect(screen.getByText(/MPS-PAYMENT-MOCK/)).toBeInTheDocument()
  })

  it('renders business error page as a mock-only hard-stop alert', async () => {
    const user = userEvent.setup()
    const onStartAgain = vi.fn()

    render(
      <BusinessErrorPage
        title='Unable to continue this mock application'
        message={<p>The selected mock outcome cannot progress automatically.</p>}
        guidance={<p>Real recovery wording needs source-confirmed business rules.</p>}
        reference='MPS-BUSINESS-MOCK'
        onStartAgain={onStartAgain}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to continue this mock application')
    expect(screen.getByText(/MPS-BUSINESS-MOCK/)).toBeInTheDocument()
    expect(screen.getByText(/source-confirmed business rules/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Start again' }))
    expect(onStartAgain).toHaveBeenCalledTimes(1)
  })

  it('renders system error page as a mock-only technical hard stop', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    const onStartAgain = vi.fn()
    const onLogout = vi.fn()

    render(
      <SystemErrorPage
        reference='SYS-MOCK-000'
        onRetry={onRetry}
        onStartAgain={onStartAgain}
        onLogout={onLogout}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Our system is temporarily unavailable')
    expect(screen.getByText(/does not connect to a real system/)).toBeInTheDocument()
    expect(screen.getByText(/Retry, start-over, logout and recovery behaviour need app and engineering evidence/)).toBeInTheDocument()

    const actions = screen.getByRole('group', { name: 'System error preview actions' })
    await user.click(within(actions).getByRole('button', { name: 'Try again' }))
    await user.click(within(actions).getByRole('button', { name: 'Start again' }))
    await user.click(within(actions).getByRole('button', { name: 'Log out' }))

    expect(onRetry).toHaveBeenCalledTimes(1)
    expect(onStartAgain).toHaveBeenCalledTimes(1)
    expect(onLogout).toHaveBeenCalledTimes(1)
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

  it('supports paired MPS applicant detail states without duplicate ids', () => {
    const { container } = render(
      <>
        <MpsApplicantDetailsFramePreview
          addressMode='search'
          idPrefix='applicant-search'
          value={{ firstName: 'Alex', lastName: 'Citizen' }}
          onManualAddress={() => undefined}
          onContinue={() => undefined}
          onBack={() => undefined}
        />
        <MpsApplicantDetailsFramePreview
          addressMode='manual'
          idPrefix='applicant-manual'
          value={{ firstName: 'Alex', lastName: 'Citizen' }}
          onAddressSearch={() => undefined}
          onContinue={() => undefined}
          onBack={() => undefined}
        />
      </>,
    )

    expect(duplicateIds(container)).toEqual([])
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

  it('renders the MPS medical evidence status preview in required and provided states without upload actions', () => {
    const { rerender } = render(<MpsMedicalEvidenceStatusPreview state='required' />)

    expect(screen.getByRole('heading', { name: 'Medical document' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Medical evidence status' })).toBeInTheDocument()
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.getByText(/Medical evidence is required in this preview/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /select file/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /remove file/i })).not.toBeInTheDocument()

    rerender(<MpsMedicalEvidenceStatusPreview state='provided' />)

    expect(screen.getByText('Mock provided')).toBeInTheDocument()
    expect(screen.getByText('medicalcertificate_april2020.png')).toBeInTheDocument()
    expect(screen.getByText(/No upload, remove-file, storage or validation behaviour is included/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /select file/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /remove file/i })).not.toBeInTheDocument()
  })

  it('renders the MPS medical report status preview in required and provided states without upload actions', () => {
    const { rerender } = render(<MpsMedicalEvidenceStatusPreview evidenceType='report' state='required' />)

    expect(screen.getByRole('heading', { name: 'Medical document' })).toBeInTheDocument()
    expect(screen.getByText('Medical report')).toBeInTheDocument()
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.getByText(/A medical report is required in this preview/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /select file/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /remove file/i })).not.toBeInTheDocument()

    rerender(<MpsMedicalEvidenceStatusPreview evidenceType='report' state='provided' />)

    expect(screen.getByText('Mock provided')).toBeInTheDocument()
    expect(screen.getByText('medicalreport_april2020.png')).toBeInTheDocument()
    expect(screen.getByLabelText('Static mock medical report file')).toBeInTheDocument()
    expect(screen.getByText(/No upload, remove-file, storage or validation behaviour is included/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /select file/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /remove file/i })).not.toBeInTheDocument()
  })

  it('supports paired MPS medical evidence states without duplicate ids', () => {
    const { container } = render(
      <>
        <MpsMedicalEvidenceStatusPreview state='required' idPrefix='medical-required' />
        <MpsMedicalEvidenceStatusPreview state='provided' idPrefix='medical-provided' />
        <MpsMedicalEvidenceStatusPreview evidenceType='report' state='required' idPrefix='medical-report-required' />
        <MpsMedicalEvidenceStatusPreview evidenceType='report' state='provided' idPrefix='medical-report-provided' />
      </>,
    )

    expect(duplicateIds(container)).toEqual([])
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
