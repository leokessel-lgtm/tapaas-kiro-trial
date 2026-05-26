import type { Meta, StoryObj } from '@storybook/react'
import {
  BusinessErrorPage,
  SystemErrorPage,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Components/Error Pages',
  parameters: {
    docs: {
      description: {
        component: 'Manifest-backed error page preview stories for business/recoverable errors and technical hard-stop/error-shell coverage. These are preview-only and do not claim production readiness, WCAG compliance, GEL approval, TaPaaS approval, legal approval, privacy approval or policy approval.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const BusinessErrorPagePattern: Story = {
  name: 'Business Error Page',
  parameters: {
    docs: {
      description: {
        story: 'Isolated review of the TaPaaS business error page pattern. This is a mock hard-stop page only and does not include real backend routing, retry, recovery or analytics behaviour.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Business error page</strong>
        <p>Preview-only hard-stop business outcome. Use source-confirmed rules before any real transaction use.</p>
        <ul>
          <li>Source context nodes: business error page <code>8931:31271</code>; backend examples <code>31:73426</code>.</li>
          <li>Implementation boundary node: existing <code>BusinessErrorPage</code> preview component.</li>
          <li>Unresolved: real business rules, recovery wording, backend routing, retry/start-again behaviour, analytics, storage and operational ownership.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <BusinessErrorPage
        title='Unable to continue this mock application'
        message={<p>The selected mock outcome cannot progress automatically.</p>}
        guidance={<p>Real recovery wording and support channels need source-confirmed business rules.</p>}
        reference='MPS-BUSINESS-MOCK'
        onStartAgain={() => undefined}
      />
    </div>
  ),
}

export const SystemErrorPagePattern: Story = {
  name: 'System Error Page',
  parameters: {
    docs: {
      description: {
        story: 'Isolated extraction of the system error page template from source node 17628:2069. This is a mock technical hard-stop surface only.',
      },
    },
  },
  render: () => (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>System error page</strong>
        <p>Preview-only technical hard-stop surface. Retry, start-over and logout actions are inert local callbacks.</p>
        <ul>
          <li>Source context node: Templates - TaPaaS Design Library System error page <code>17628:2069</code>.</li>
          <li>Implementation boundary node: new <code>SystemErrorPage</code> preview component.</li>
          <li>Unresolved: real error routing, retry behaviour, start-over routing, logout/session handling, operational ownership and assistive-technology behaviour.</li>
          <li>Not production-ready, WCAG-compliant, GEL-approved, TaPaaS-approved, legal-approved, privacy-approved or policy-approved.</li>
        </ul>
      </div>
      <SystemErrorPage
        reference='SYS-MOCK-000'
        onRetry={() => undefined}
        onStartAgain={() => undefined}
        onLogout={() => undefined}
      />
    </div>
  ),
}
