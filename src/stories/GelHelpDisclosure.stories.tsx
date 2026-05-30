import type { Meta, StoryObj } from '@storybook/react'
import {
  Heading,
  MoreInfoPanelStaticReference as GelMoreInfoPanelStaticReference,
} from '../gel'
import './storybook.css'

const meta: Meta = {
  title: 'GEL Reference/Help & Disclosure',
  parameters: {
    docs: {
      description: {
        component: 'Storybook reference only for a source-informed GEL help and disclosure preview. This is a simplified local reference surface, not real @snsw-gel/react adoption, not the real GEL MoreInfoPanel implementation, and not production, modal, portal, focus-management, keyboard, screen-reader, accessibility, WCAG, GEL or TaPaaS approval evidence.',
      },
    },
  },
}

export default meta
type Story = StoryObj

function ReferenceBoundaryNote() {
  return (
    <div className='storybook-note'>
      <strong>source-informed static local preview</strong>
      <p>This Storybook reference is for design and composition review only. It does not use the real @snsw-gel/react package and does not prove real GEL MoreInfoPanel behaviour, portal or backdrop behaviour, focus trapping, Escape handling, return focus, keyboard completeness, screen-reader completeness, accessibility compliance, WCAG compliance, production readiness or approval status.</p>
    </div>
  )
}

function MoreInfoPanelStaticReferenceExample() {
  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>MoreInfoPanel static reference</Heading>
      <p>Use this static reference to review short contextual help content placement only.</p>
      <GelMoreInfoPanelStaticReference
        triggerText='Why we ask for this information'
        title='Why we ask for this information'
      >
        <p>Some application questions need extra context so a customer can understand what information to provide. Keep help content short, specific and linked to the nearby task.</p>
      </GelMoreInfoPanelStaticReference>
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This preview intentionally does not implement modal-like behaviour. It does not include a portal, backdrop, focus lock, Escape close, return-focus handling, scroll lock, live-region behaviour or production interaction model.</p>
      </div>
    </div>
  )
}

export const MoreInfoPanelStaticReference: Story = {
  name: 'MoreInfoPanel static reference',
  render: () => <MoreInfoPanelStaticReferenceExample />,
}
