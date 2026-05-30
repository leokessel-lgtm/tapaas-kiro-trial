import type { Meta, StoryObj } from '@storybook/react'
import {
  Heading,
  Loader,
  Skeleton,
} from '../gel'
import './storybook.css'

const meta: Meta = {
  title: 'GEL Reference/Loading & Placeholders',
  parameters: {
    docs: {
      description: {
        component: 'Storybook reference only for Batch 3D GEL loading and placeholder patterns. These are source-informed static local previews, not production GEL exports, and not a loading, timing, live-region, focus-management, accessibility, WCAG, backend, data-loading, production, GEL or TaPaaS approval claim.',
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
      <p>This Storybook reference is for design and composition review only. It does not use the real @snsw-gel/react package and does not prove async loading behaviour, live-region behaviour, focus management, accessibility compliance, backend or data-loading behaviour, production readiness or approval status.</p>
    </div>
  )
}

function LoaderStaticReferenceExample() {
  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Loader static reference</Heading>
      <p>Use this static reference to review the placement and neutral copy for a loading indicator only.</p>
      <Loader content='Loading' />
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This preview does not include async state, timers, fetches, route transitions, suspense, live regions or focus management. It is not a live loading implementation or accessibility proof.</p>
      </div>
    </div>
  )
}

function SkeletonStaticReferenceExample() {
  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>Skeleton static reference</Heading>
      <p>Use this static reference to review placeholder rows and cards for a transaction-style content area only.</p>
      <Skeleton label='Transaction content placeholder' rows={4} cards={2} />
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This preview does not imply real data loading, timing, progressive disclosure, live regions, focus management, backend calls or content replacement behaviour.</p>
      </div>
    </div>
  )
}

export const LoaderStaticReference: Story = {
  name: 'Loader static reference',
  render: () => <LoaderStaticReferenceExample />,
}

export const SkeletonStaticReference: Story = {
  name: 'Skeleton static reference',
  render: () => <SkeletonStaticReferenceExample />,
}
