import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../gel'
import {
  EmailConfirmationModal,
  ExitModal,
} from '../tapaas-preview'
import './storybook.css'

const meta: Meta = {
  title: 'TaPaaS Components/Modals & Overlays',
  parameters: {
    docs: {
      description: {
        component: 'Manifest-backed modal and overlay preview stories. These are preview-only and do not claim accessibility approval, WCAG compliance, GEL approval, TaPaaS approval, production readiness, email delivery, persistence, routing, privacy approval, policy approval or legal approval.',
      },
    },
  },
}

export default meta
type Story = StoryObj

/**
 * Exit modal in isolation.
 *
 * Source evidence: TaPaaS Exit modal template `4677:1042`.
 * This is a preview pattern — not the full GEL modal with FocusLock/Portal.
 *
 * Test: open, Escape close, Tab trap, No/Yes actions, return focus.
 */
function ExitModalIsolatedExample() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='storybook-stack'>
      <div className='storybook-note'>
        <strong>Exit modal — isolated test</strong>
        <p>Click the button to open. Test keyboard: Escape closes, Tab stays trapped inside, focus returns to trigger on close.</p>
        <p>Source: TaPaaS Exit modal template <code>4677:1042</code>. Preview only — does not claim full GEL modal behaviour.</p>
      </div>
      <Button onClick={() => setIsOpen(true)}>Open exit modal</Button>
      <ExitModal
        isOpen={isOpen}
        onContinue={() => setIsOpen(false)}
        onExit={() => { setIsOpen(false); alert('Exit action fired — in a real skeleton this resets form state.') }}
        description='This preview does not save draft applications. If you exit, the mock form data will be cleared.'
      />
    </div>
  )
}

export const ExitModalIsolated: Story = {
  render: () => <ExitModalIsolatedExample />,
}

function EmailConfirmationModalExample({ mode, initiallyOpen = true }: { mode: 'desktop' | 'mobile'; initiallyOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initiallyOpen)
  const [lastAction, setLastAction] = useState('No action selected')
  const isMobile = mode === 'mobile'

  return (
    <div className='storybook-stack' style={isMobile ? { maxWidth: 390 } : undefined}>
      <div className='storybook-note'>
        <strong>{isMobile ? 'Email confirmation modal — mobile bottom modal' : 'Email confirmation modal — desktop centred modal'}</strong>
        <p>Source: TaPaaS Email confirmation modal <code>9290:50392</code>, component frame <code>9241:18447</code>. Preview callbacks only.</p>
        <p>The modal opens by default in this story so desktop/mobile source-parity review can inspect the actual dialog without an extra interaction.</p>
        {isMobile
          ? <p>Set the Storybook viewport below 640px to verify the bottom-modal treatment. The constrained container shows intended mobile review width but cannot force CSS media queries by itself.</p>
          : <p>Use a desktop-width Storybook viewport to verify centred modal placement and horizontal action order.</p>}
      </div>
      <Button onClick={() => setIsOpen(true)}>Open email confirmation modal</Button>
      <p aria-live='polite'>{lastAction}</p>
      <EmailConfirmationModal
        isOpen={isOpen}
        emailAddress='samplemail@email.com'
        onSend={() => { setIsOpen(false); setLastAction('Mock send selected') }}
        onEdit={() => { setIsOpen(false); setLastAction('Mock edit selected') }}
        onDismiss={() => { setIsOpen(false); setLastAction('Mock close selected') }}
      />
    </div>
  )
}

export const EmailConfirmationModalDesktop: Story = {
  render: () => <EmailConfirmationModalExample mode='desktop' />,
}

export const EmailConfirmationModalMobile: Story = {
  render: () => <EmailConfirmationModalExample mode='mobile' />,
}
