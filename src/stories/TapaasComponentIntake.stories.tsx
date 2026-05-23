import type { Meta, StoryObj } from '@storybook/react'
import { Heading, InPageAlert } from '../gel'
import './storybook.css'

type CandidateStatus = 'coded preview' | 'documented only' | 'design-only' | 'page guidance'

type ComponentCandidate = {
  name: string
  source: string
  classification: string
  maturity: string
  status: CandidateStatus
  templateUse: string
  whyItMatters: string
  nextAction: string
  risk?: string
}

type MaturityBacklogItem = {
  order: number
  candidate: string
  source: string
  startingStatus: string
  target: string
  whyNow: string
  gates: string
}

const candidates: ComponentCandidate[] = [
  {
    name: 'Confirmation page header',
    source: '9:10494',
    classification: 'GEL variant',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Confirmation step 5354:8224',
    whyItMatters: 'Sets the success state and transaction outcome tone.',
    nextAction: 'Compare heading semantics and icon treatment with TaPaaS design and GEL confirmation patterns.',
  },
  {
    name: 'Transaction summary card',
    source: '10:1861',
    classification: 'TaPaaS-specific composite',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Confirmation step 5354:8224',
    whyItMatters: 'Provides reference number, receipt and submission summary after completion.',
    nextAction: 'Deep-check row spacing, heading level and receipt/next-step content model.',
  },
  {
    name: 'Next steps card',
    source: '10:1862',
    classification: 'TaPaaS-specific composite',
    maturity: 'draft',
    status: 'documented only',
    templateUse: 'Confirmation step 5354:8224',
    whyItMatters: 'Common after-submit pattern for what happens next.',
    nextAction: 'Extract anatomy and states before deciding whether it should become a reusable composite.',
  },
  {
    name: 'Privacy card',
    source: '1:198',
    classification: 'TaPaaS-specific composite',
    maturity: 'draft',
    status: 'page guidance',
    templateUse: 'Privacy step 3395:41359',
    whyItMatters: 'Common entry pattern for privacy collection notice and acknowledgement.',
    nextAction: 'Keep page-guidance only until agency privacy wording and checkbox rules are owner-confirmed.',
    risk: 'Privacy and legal content cannot be inferred from Figma layout.',
  },
  {
    name: 'Conditional declaration',
    source: '27:56000',
    classification: 'GEL variant',
    maturity: 'draft',
    status: 'page guidance',
    templateUse: 'Declaration step 9894:3936',
    whyItMatters: 'Reusable declaration acknowledgement pattern.',
    nextAction: 'Use GEL checkbox/radio behaviour and keep legal wording placeholder until confirmed.',
    risk: 'Legal declaration text needs policy/legal confirmation.',
  },
  {
    name: 'Declaration review',
    source: '27:38386',
    classification: 'TaPaaS-specific composite',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Review step 8143:15161',
    whyItMatters: 'Shows declaration playback on review pages, with accordion and card variants in Figma.',
    nextAction: 'Review card vs accordion variant with designers and confirm whether legal content may be collapsed.',
    risk: 'Legal/privacy content inside accordions needs accessibility and content review.',
  },
  {
    name: 'Review info card',
    source: '18:4448',
    classification: 'TaPaaS-specific composite',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Review step 8143:15161',
    whyItMatters: 'Core data playback pattern before submission.',
    nextAction: 'Check edit-link labelling, spacing and section heading hierarchy against review template annotations.',
  },
  {
    name: 'Review fees card',
    source: '18:4449',
    classification: 'TaPaaS-specific composite',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Review step 8143:15161',
    whyItMatters: 'Reusable fee summary pattern, currently mock-only.',
    nextAction: 'Keep $0.00/mock values unless real fee schedule and payment pathway are confirmed.',
    risk: 'Fees, payment and receipts are out of scope for the trial prototype.',
  },
  {
    name: 'Legal info accordion',
    source: '22:35625',
    classification: 'TaPaaS composite using GEL accordion behaviour',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Review and declaration guidance',
    whyItMatters: 'Likely common pattern for legal, privacy or supporting information.',
    nextAction: 'Use GEL accordion source behaviour only for optional guidance. Confirm required legal/privacy visibility rules.',
    risk: 'Critical legal/privacy content must not be made optional without content and accessibility confirmation.',
  },
  {
    name: 'TaPaaS radio buttons',
    source: '31:63987',
    classification: 'GEL variant',
    maturity: 'draft',
    status: 'page guidance',
    templateUse: 'Form input 8410:37703 and declaration 9894:3936',
    whyItMatters: 'Common selection pattern across transaction pages.',
    nextAction: 'Use source-backed GEL RadioButtonList unless TaPaaS adds confirmed content or layout rules.',
  },
  {
    name: 'TaPaaS radio button cards',
    source: '31:63988',
    classification: 'TaPaaS-specific composite',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Selection/input pages',
    whyItMatters: 'Higher-complexity selection pattern likely useful for application type or product choice.',
    nextAction: 'Verify keyboard, focus, selected, error and responsive states before promotion beyond trial preview.',
    risk: 'Card-based radios can easily drift from native radio accessibility expectations.',
  },
  {
    name: 'Search vehicle input',
    source: '22:16683',
    classification: 'TaPaaS-specific composite',
    maturity: 'coded-preview',
    status: 'coded preview',
    templateUse: 'Search input page 16274:18397',
    whyItMatters: 'Search-first transaction entry pattern.',
    nextAction: 'Review the static preview against targeted Figma evidence before adding backend lookup, validation or result states.',
    risk: 'Backend lookup, vehicle ownership and search-result states are out of scope.',
  },
  {
    name: 'Email confirmation modal',
    source: '9290:50392',
    classification: 'TaPaaS-specific',
    maturity: 'coded-preview',
    status: 'coded preview',
    templateUse: 'Confirmation step',
    whyItMatters: 'Reusable confirmation-step pattern for verifying an entered email address before receipt or communication actions.',
    nextAction: 'Review desktop centred and mobile bottom-modal treatments in Storybook before using in transaction skeletons.',
    risk: 'No real email send, persistence, routing or critical-error handling is implemented.',
  },
  {
    name: 'Details card single',
    source: '2413:787',
    classification: 'TaPaaS-specific composite',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Context and later form pages',
    whyItMatters: 'Shows read-only contextual information to orient the user.',
    nextAction: 'Confirm spacing, status-label usage and whether actions are allowed in each context.',
  },
  {
    name: 'Details card single interactive',
    source: '2958:2499',
    classification: 'TaPaaS-specific composite',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Input/context pages',
    whyItMatters: 'Potential reusable context card with action behaviour.',
    nextAction: 'Confirm action semantics, keyboard behaviour and route/focus expectations before broader reuse.',
  },
  {
    name: 'Show more / less',
    source: '22:25082',
    classification: 'GEL variant',
    maturity: 'draft',
    status: 'documented only',
    templateUse: 'Optional content reveal',
    whyItMatters: 'Simple progressive disclosure pattern.',
    nextAction: 'Prefer existing GEL button/disclosure behaviour. Do not rebuild as a custom component unless source evidence requires it.',
  },
  {
    name: 'VEOS selection card',
    source: '31:63989',
    classification: 'TaPaaS-specific composite',
    maturity: 'design-only',
    status: 'design-only',
    templateUse: 'Vehicle-specific flows',
    whyItMatters: 'Candidate product-selection card pattern.',
    nextAction: 'Keep as design-only until a target transaction needs it and accessibility states are confirmed.',
  },
  {
    name: 'Backend error examples',
    source: '31:73426',
    classification: 'TaPaaS-specific pattern set',
    maturity: 'needs engineer review',
    status: 'coded preview',
    templateUse: 'Business/system error routes',
    whyItMatters: 'Useful for mapping recoverable and hard-stop transaction outcomes.',
    nextAction: 'Use mock variants only until business rules, error codes and recovery wording are source-confirmed.',
    risk: 'Do not invent business logic, policy decisions or backend behaviour.',
  },
]

const selectedMaturityBacklog: MaturityBacklogItem[] = [
  {
    order: 1,
    candidate: 'Declaration review',
    source: '27:38386',
    startingStatus: 'coded preview',
    target: 'designer and engineer review',
    whyNow: 'Review pages appear in every transaction skeleton, and declaration playback is a common TaPaaS-specific gap.',
    gates: 'Choose accordion or card variant per flow. Confirm legal-content treatment before code.',
  },
  {
    order: 2,
    candidate: 'Legal info accordion',
    source: '22:35625',
    startingStatus: 'coded preview',
    target: 'legal/content visibility decision',
    whyNow: 'Legal and privacy guidance appears across declaration and review contexts and needs stricter collapse/visibility rules.',
    gates: 'Use GEL accordion behaviour only for optional guidance. Do not hide required legal/privacy content without content and accessibility confirmation.',
  },
  {
    order: 3,
    candidate: 'Details card single interactive',
    source: '2958:2499',
    startingStatus: 'coded preview',
    target: 'interaction review',
    whyNow: 'The read-only DetailsCard is already coded; the interactive variant is the next controlled increase in complexity.',
    gates: 'Confirm action semantics, edit/remove labels, keyboard flow and focus return before implementation.',
  },
  {
    order: 4,
    candidate: 'TaPaaS radio button cards',
    source: '31:63988',
    startingStatus: 'coded preview',
    target: 'accessibility review before promotion',
    whyNow: 'Card-based choices are useful for product/application type selection, but they carry native-radio accessibility risk.',
    gates: 'Deep extract selected, unselected, focus, error, disabled and responsive states. Preserve native radio semantics.',
  },
  {
    order: 5,
    candidate: 'Backend error examples',
    source: '31:73426',
    startingStatus: 'coded preview',
    target: 'mock-only outcome review',
    whyNow: 'The MPS simulation already needs realistic hard-stop, retry and manual-review outcomes without real backend logic.',
    gates: 'Use only source-confirmed error types and recovery wording. Keep all rules mock-only unless service owners confirm them.',
  },
]

const templateMap = [
  { template: 'Privacy', source: '3395:41359', components: 'Privacy card, terms checkbox, error summary, CTA group' },
  { template: 'Search input', source: '16274:18397', components: 'Search vehicle input, GEL Field/Input/Button, result-selection states' },
  { template: 'Form input', source: '8410:37703', components: 'GEL fields, sections, repeatable group, conditional question panel' },
  { template: 'Declaration', source: '9894:3936', components: 'Conditional declaration, questionnaire/radio variant, CTA group' },
  { template: 'Review', source: '8143:15161', components: 'Review info card, review fees card, declaration review, legal accordion' },
  { template: 'Confirmation', source: '5354:8224', components: 'Confirmation header, transaction summary card, next steps card, backend messages' },
  { template: 'Exit modal', source: '4677:1042', components: 'ExitModal with authenticated and unauthenticated variants' },
  { template: 'Business error', source: '8931:31271', components: 'BusinessErrorPage, role alert content, recovery actions' },
  { template: 'System error', source: '17628:2069', components: 'System hard-stop page, retry/start-over/logout actions' },
]

function statusClass(status: CandidateStatus) {
  if (status === 'coded preview') return 'storybook-pill storybook-pill--coded'
  if (status === 'design-only') return 'storybook-pill storybook-pill--design'
  if (status === 'documented only') return 'storybook-pill storybook-pill--review'
  return 'storybook-pill'
}

function CandidateCard({ candidate }: { candidate: ComponentCandidate }) {
  return (
    <article className='storybook-evidence-card'>
      <h3>{candidate.name}</h3>
      <div className='storybook-pill-row'>
        <span className={statusClass(candidate.status)}>{candidate.status}</span>
        <span className='storybook-pill storybook-pill--review'>{candidate.maturity}</span>
        {candidate.risk && <span className='storybook-pill storybook-pill--risk'>risk boundary</span>}
      </div>
      <p>{candidate.whyItMatters}</p>
      <dl className='storybook-meta-list'>
        <div>
          <dt>Source</dt>
          <dd>{candidate.source}</dd>
        </div>
        <div>
          <dt>Classification</dt>
          <dd>{candidate.classification}</dd>
        </div>
        <div>
          <dt>Template use</dt>
          <dd>{candidate.templateUse}</dd>
        </div>
        <div>
          <dt>Next action</dt>
          <dd>{candidate.nextAction}</dd>
        </div>
        {candidate.risk && (
          <div>
            <dt>Risk</dt>
            <dd>{candidate.risk}</dd>
          </div>
        )}
      </dl>
    </article>
  )
}

function candidateCount(status: CandidateStatus) {
  return candidates.filter((candidate) => candidate.status === status).length
}

const meta: Meta = {
  title: 'TaPaaS Evidence/Component Intake Board',
  parameters: {
    docs: {
      description: {
        component:
          'Evidence-first catalogue of TaPaaS Figma component candidates. This is a triage board for designer, engineer and accessibility review, not a production component library.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const IntakeOverview: Story = {
  render: () => (
    <div className='storybook-board'>
      <Heading level={2}>TaPaaS component intake board</Heading>
      <InPageAlert variant='warning' title='Evidence boundary'>
        <p>
          This board brings more TaPaaS Figma components into Storybook as reviewable evidence. Components marked documented only,
          design-only or page guidance are not production components and should not be coded without deeper source, engineering and
          accessibility review.
        </p>
      </InPageAlert>
      <div className='storybook-grid'>
        <div className='storybook-evidence-card'>
          <h3>Coded preview</h3>
          <p>{candidateCount('coded preview')} candidates are already represented in the local preview layer.</p>
        </div>
        <div className='storybook-evidence-card'>
          <h3>Documented only</h3>
          <p>{candidateCount('documented only')} candidates have enough evidence to track, but not enough to code safely.</p>
        </div>
        <div className='storybook-evidence-card'>
          <h3>Page guidance</h3>
          <p>{candidateCount('page guidance')} candidates currently guide transaction pages through GEL components or templates.</p>
        </div>
        <div className='storybook-evidence-card'>
          <h3>Design-only</h3>
          <p>{candidateCount('design-only')} candidates stay out of code until behaviour, accessibility and ownership are clearer.</p>
        </div>
      </div>
      <div className='storybook-table-wrap'>
        <table className='storybook-table'>
          <thead>
            <tr>
              <th scope='col'>Candidate</th>
              <th scope='col'>Source</th>
              <th scope='col'>Classification</th>
              <th scope='col'>Status</th>
              <th scope='col'>Template relationship</th>
              <th scope='col'>Next action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.name}>
                <th scope='row'>{candidate.name}</th>
                <td>{candidate.source}</td>
                <td>{candidate.classification}</td>
                <td>
                  <span className={statusClass(candidate.status)}>{candidate.status}</span>
                </td>
                <td>{candidate.templateUse}</td>
                <td>{candidate.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
}

export const CandidateCards: Story = {
  render: () => (
    <div className='storybook-board'>
      <Heading level={2}>Candidate detail cards</Heading>
      <div className='storybook-grid'>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.name} candidate={candidate} />
        ))}
      </div>
    </div>
  ),
}

export const TemplateRelationships: Story = {
  render: () => (
    <div className='storybook-board'>
      <Heading level={2}>Template relationships</Heading>
      <p>
        Use page templates for flow structure, GEL components for base behaviour, and TaPaaS composites only where the pattern is
        documented and repeated.
      </p>
      <div className='storybook-table-wrap'>
        <table className='storybook-table'>
          <thead>
            <tr>
              <th scope='col'>Template</th>
              <th scope='col'>Source</th>
              <th scope='col'>Component relationships</th>
            </tr>
          </thead>
          <tbody>
            {templateMap.map((item) => (
              <tr key={item.template}>
                <th scope='row'>{item.template}</th>
                <td>{item.source}</td>
                <td>{item.components}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
}

export const SelectedMaturityBacklog: Story = {
  render: () => (
    <div className='storybook-board'>
      <Heading level={2}>Selected maturity backlog</Heading>
      <InPageAlert variant='info' title='Focused next set'>
        <p>
          These five TaPaaS candidates are selected for deeper maturity work. This is not a commitment to code all five immediately:
          each item must pass source, engineering and accessibility gates before it moves from evidence to preview implementation.
        </p>
      </InPageAlert>
      <div className='storybook-table-wrap'>
        <table className='storybook-table'>
          <thead>
            <tr>
              <th scope='col'>Order</th>
              <th scope='col'>Candidate</th>
              <th scope='col'>Source</th>
              <th scope='col'>Starting status</th>
              <th scope='col'>Target</th>
              <th scope='col'>Why now</th>
              <th scope='col'>Gate before coding</th>
            </tr>
          </thead>
          <tbody>
            {selectedMaturityBacklog.map((item) => (
              <tr key={item.candidate}>
                <th scope='row'>{item.order}</th>
                <td>{item.candidate}</td>
                <td>{item.source}</td>
                <td>{item.startingStatus}</td>
                <td>{item.target}</td>
                <td>{item.whyNow}</td>
                <td>{item.gates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
}

export const PromotionRules: Story = {
  render: () => (
    <div className='storybook-board'>
      <Heading level={2}>Promotion rules</Heading>
      <InPageAlert variant='info' title='How to move from Figma evidence to code'>
        <p>Promote one component at a time. A component should not move into the preview layer just because it exists in Figma.</p>
      </InPageAlert>
      <div className='storybook-grid'>
        <div className='storybook-evidence-card'>
          <h3>1. Confirm source evidence</h3>
          <p>Record node ID, status labels, anatomy, variants, developer notes and accessibility annotations.</p>
        </div>
        <div className='storybook-evidence-card'>
          <h3>2. Check GEL first</h3>
          <p>If the pattern is GEL-backed, use GEL source behaviour and document the TaPaaS usage difference.</p>
        </div>
        <div className='storybook-evidence-card'>
          <h3>3. Check template reuse</h3>
          <p>Prioritise components that appear across Privacy, Input, Declaration, Review, Confirmation or error templates.</p>
        </div>
        <div className='storybook-evidence-card'>
          <h3>4. Code the smallest preview</h3>
          <p>Build only the reusable behaviour needed for transaction skeletons. Keep policy, backend, payment and identity out.</p>
        </div>
        <div className='storybook-evidence-card'>
          <h3>5. Test accessibly</h3>
          <p>Check labels, focus order, keyboard behaviour, error handling and mobile layout. Do not claim WCAG compliance.</p>
        </div>
        <div className='storybook-evidence-card'>
          <h3>6. Log the decision</h3>
          <p>Update the registry, relationship map and evidence log with what worked, what failed and what remains unknown.</p>
        </div>
      </div>
    </div>
  ),
}
