import { useState } from 'react'
import { ServiceNSWChrome } from './layout-preview/ServiceNSWChrome'
import { TapaasTransactionSkeleton } from './TapaasTransactionSkeleton'
import { TrialPermitSkeleton } from './TrialPermitSkeleton'
import { CommunityEventPermitSkeleton } from './CommunityEventPermitSkeleton'
import { CommunityStallPermitSkeleton } from './CommunityStallPermitSkeleton'

type ActiveSkeleton = 'vehicle' | 'permit' | 'event' | 'stall'

const skeletonConfig: Record<ActiveSkeleton, { label: string; title: string; subtitle: string }> = {
  vehicle: {
    label: 'TaPaaS x Kiro trial',
    title: 'Repeatable transaction skeleton',
    subtitle: 'A non-production example for building simple Service NSW transaction flows from TaPaaS templates.',
  },
  permit: {
    label: 'TaPaaS x Kiro trial',
    title: 'Apply for a trial permit',
    subtitle: 'A non-production trial permit application skeleton using mock data only.',
  },
  event: {
    label: 'TaPaaS x Kiro trial',
    title: 'Community event permit',
    subtitle: 'A non-production 8-step transaction skeleton demonstrating longer application flows.',
  },
  stall: {
    label: 'TaPaaS x Kiro trial',
    title: 'Community stall permit',
    subtitle: 'A non-production 8-step repeatability test using the same patterns as the event permit.',
  },
}

export function App() {
  const [active, setActive] = useState<ActiveSkeleton>('event')
  const config = skeletonConfig[active]

  return (
    <ServiceNSWChrome
      serviceLabel={config.label}
      pageTitle={config.title}
      pageSubtitle={config.subtitle}
    >
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          type='button'
          onClick={() => setActive('vehicle')}
          aria-pressed={active === 'vehicle'}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: 'var(--gel-font-body)',
            border: '1px solid var(--gel-color-border-dark, #646974)',
            borderRadius: '4px',
            background: active === 'vehicle' ? 'var(--gel-color-primary)' : 'transparent',
            color: active === 'vehicle' ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
            cursor: 'pointer',
          }}
        >
          Vehicle skeleton
        </button>
        <button
          type='button'
          onClick={() => setActive('permit')}
          aria-pressed={active === 'permit'}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: 'var(--gel-font-body)',
            border: '1px solid var(--gel-color-border-dark, #646974)',
            borderRadius: '4px',
            background: active === 'permit' ? 'var(--gel-color-primary)' : 'transparent',
            color: active === 'permit' ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
            cursor: 'pointer',
          }}
        >
          Trial permit skeleton
        </button>
        <button
          type='button'
          onClick={() => setActive('event')}
          aria-pressed={active === 'event'}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: 'var(--gel-font-body)',
            border: '1px solid var(--gel-color-border-dark, #646974)',
            borderRadius: '4px',
            background: active === 'event' ? 'var(--gel-color-primary)' : 'transparent',
            color: active === 'event' ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
            cursor: 'pointer',
          }}
        >
          Community event permit
        </button>
        <button
          type='button'
          onClick={() => setActive('stall')}
          aria-pressed={active === 'stall'}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: 'var(--gel-font-body)',
            border: '1px solid var(--gel-color-border-dark, #646974)',
            borderRadius: '4px',
            background: active === 'stall' ? 'var(--gel-color-primary)' : 'transparent',
            color: active === 'stall' ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
            cursor: 'pointer',
          }}
        >
          Community stall permit
        </button>
      </div>
      {active === 'vehicle' && <TapaasTransactionSkeleton />}
      {active === 'permit' && <TrialPermitSkeleton />}
      {active === 'event' && <CommunityEventPermitSkeleton />}
      {active === 'stall' && <CommunityStallPermitSkeleton />}
    </ServiceNSWChrome>
  )
}
