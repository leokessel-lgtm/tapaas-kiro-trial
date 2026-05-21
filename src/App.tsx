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
    subtitle: 'A non-production 8-step skeleton with MoreInfoDisclosure, Accordion and conditional questions.',
  },
  mps: {
    label: 'TaPaaS x Kiro trial',
    title: 'Mobility parking permit',
    subtitle: 'A non-production 9-step complexity test inspired by MPS Figma evidence.',
  },
  stress: {
    label: 'TaPaaS x Kiro trial',
    title: 'Complex permit application',
    subtitle: 'A non-production 7-step skeleton with an exit modal, repeatable sections, edit links and a business-error outcome.',
  },
}

const switcherOptions: { id: ActiveSkeleton; label: string }[] = [
  { id: 'vehicle', label: 'Vehicle skeleton' },
  { id: 'permit', label: 'Trial permit skeleton' },
  { id: 'market', label: 'Accessible market permit' },
  { id: 'venue', label: 'Community venue booking' },
  { id: 'mps', label: 'Mobility parking permit' },
  { id: 'stress', label: 'Complex permit application' },
]

export function App() {
  const [active, setActive] = useState<ActiveSkeleton>('permit')
  const config = skeletonConfig[active]

  return (
    <ServiceNSWChrome
      serviceLabel={config.label}
      pageTitle={config.title}
      pageSubtitle={config.subtitle}
    >
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }} role='group' aria-label='Choose a trial transaction skeleton'>
        {switcherOptions.map((option) => (
          <button
            key={option.id}
            type='button'
            onClick={() => setActive(option.id)}
            aria-pressed={active === option.id}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontFamily: 'var(--gel-font-body)',
              border: '1px solid var(--gel-color-border-dark, #646974)',
              borderRadius: '4px',
              background: active === option.id ? 'var(--gel-color-primary)' : 'transparent',
              color: active === option.id ? 'var(--gel-color-white)' : 'var(--gel-color-text)',
              cursor: 'pointer',
            }}
          >
            {option.label}
          </button>
        ))}
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
