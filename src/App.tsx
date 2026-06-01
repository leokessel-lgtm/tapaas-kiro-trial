import { useState } from 'react'
import { ServiceNSWChrome } from './layout-preview/ServiceNSWChrome'
import { TrialPermitSkeleton } from './TrialPermitSkeleton'
import { AccessibleMarketPermitSkeleton } from './AccessibleMarketPermitSkeleton'
import { CommunityVenueBookingSkeleton } from './CommunityVenueBookingSkeleton'
import { MobilityParkingPermitSkeleton } from './MobilityParkingPermitSkeleton'
import { BuskingPermitSkeleton } from './BuskingPermitSkeleton'

type ActiveSkeleton = 'permit' | 'market' | 'venue' | 'mps' | 'busking'

const skeletonConfig: Record<ActiveSkeleton, { label: string; title: string; subtitle: string }> = {
  permit: {
    label: 'TaPaaS x Kiro trial',
    title: 'Apply for a trial permit',
    subtitle: 'Apply for a short trial permit and receive an approved permit receipt.',
  },
  market: {
    label: 'TaPaaS x Kiro trial',
    title: 'Accessible market permit',
    subtitle: 'Apply for an accessible market permit and receive a submitted application receipt.',
  },
  venue: {
    label: 'Community venue booking',
    title: 'Community venue booking',
    subtitle: 'Request a community venue booking and receive a submitted booking receipt.',
  },
  mps: {
    label: 'Mobility Parking Scheme',
    title: 'Mobility Parking Scheme permit',
    subtitle: 'Apply for a Mobility Parking Scheme permit and receive a submitted application receipt.',
  },
  busking: {
    label: 'Busking permit prototype',
    title: 'Apply for a busking permit',
    subtitle: 'Apply for permission to perform busking in a public place and receive a submitted application receipt.',
  },
}

const switcherOptions: { id: ActiveSkeleton; label: string }[] = [
  { id: 'permit', label: 'Trial permit skeleton' },
  { id: 'market', label: 'Accessible market permit' },
  { id: 'venue', label: 'Community venue booking' },
  { id: 'mps', label: 'Mobility Parking Scheme' },
  { id: 'busking', label: 'Busking permit prototype' },
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
      {active === 'permit' && <TrialPermitSkeleton />}
      {active === 'market' && <AccessibleMarketPermitSkeleton />}
      {active === 'venue' && <CommunityVenueBookingSkeleton />}
      {active === 'mps' && <MobilityParkingPermitSkeleton />}
      {active === 'busking' && <BuskingPermitSkeleton />}
    </ServiceNSWChrome>
  )
}
