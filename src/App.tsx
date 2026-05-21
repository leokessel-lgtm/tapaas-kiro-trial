import { useState } from 'react'
import { ServiceNSWChrome } from './layout-preview/ServiceNSWChrome'
import { TapaasTransactionSkeleton } from './TapaasTransactionSkeleton'
import { TrialPermitSkeleton } from './TrialPermitSkeleton'
import { AccessibleMarketPermitSkeleton } from './AccessibleMarketPermitSkeleton'
import { CommunityVenueBookingSkeleton } from './CommunityVenueBookingSkeleton'
import { MobilityParkingPermitSkeleton } from './MobilityParkingPermitSkeleton'
import { ComplexTransactionStressTestSkeleton } from './ComplexTransactionStressTestSkeleton'

type ActiveSkeleton = 'vehicle' | 'permit' | 'market' | 'venue' | 'mps' | 'stress'

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
  market: {
    label: 'TaPaaS x Kiro trial',
    title: 'Accessible market permit',
    subtitle: 'A non-production 9-step skeleton with conditional questions and details card.',
  },
  venue: {
    label: 'TaPaaS x Kiro trial',
    title: 'Community venue booking',
    subtitle: 'A non-production 8-step skeleton with MoreInfoPanel, Accordion and conditional questions.',
  },
  mps: {
    label: 'TaPaaS x Kiro trial',
    title: 'Mobility parking permit',
    subtitle: 'A non-production 9-step complexity test inspired by MPS Figma evidence.',
  },
  stress: {
    label: 'TaPaaS x Kiro trial',
    title: 'Complex stress test',
    subtitle: 'Internal-only 7-step skeleton with modal, repeatable sections, edit links and conditional outcome.',
  },
}

export function App() {
  const [active, setActive] = useState<ActiveSkeleton>('permit')
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
          onClick={() => setActive('market')}
          aria-pressed={active === 'market'}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: 'var(--gel-font-body)',
            border: '1px solid var(--gel-color-border-dark, #646974)',
            borderRadius: '4px',
            background: active === 'market' ? 'var(--gel-color-primary)' : 'transparent',
            color: active === 'market' ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
            cursor: 'pointer',
          }}
        >
          Accessible market permit
        </button>
        <button
          type='button'
          onClick={() => setActive('venue')}
          aria-pressed={active === 'venue'}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: 'var(--gel-font-body)',
            border: '1px solid var(--gel-color-border-dark, #646974)',
            borderRadius: '4px',
            background: active === 'venue' ? 'var(--gel-color-primary)' : 'transparent',
            color: active === 'venue' ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
            cursor: 'pointer',
          }}
        >
          Community venue booking
        </button>
        <button
          type='button'
          onClick={() => setActive('mps')}
          aria-pressed={active === 'mps'}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: 'var(--gel-font-body)',
            border: '1px solid var(--gel-color-border-dark, #646974)',
            borderRadius: '4px',
            background: active === 'mps' ? 'var(--gel-color-primary)' : 'transparent',
            color: active === 'mps' ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
            cursor: 'pointer',
          }}
        >
          Mobility parking permit
        </button>
        <button
          type='button'
          onClick={() => setActive('stress')}
          aria-pressed={active === 'stress'}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontFamily: 'var(--gel-font-body)',
            border: '1px solid var(--gel-color-border-dark, #646974)',
            borderRadius: '4px',
            background: active === 'stress' ? 'var(--gel-color-primary)' : 'transparent',
            color: active === 'stress' ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
            cursor: 'pointer',
          }}
        >
          Complex stress test
        </button>
      </div>
      {active === 'vehicle' && <TapaasTransactionSkeleton />}
      {active === 'permit' && <TrialPermitSkeleton />}
      {active === 'market' && <AccessibleMarketPermitSkeleton />}
      {active === 'venue' && <CommunityVenueBookingSkeleton />}
      {active === 'mps' && <MobilityParkingPermitSkeleton />}
      {active === 'stress' && <ComplexTransactionStressTestSkeleton />}
    </ServiceNSWChrome>
  )
}
