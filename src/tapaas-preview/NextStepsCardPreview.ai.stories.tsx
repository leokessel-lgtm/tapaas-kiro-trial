import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { NextStepsCardPreview } from './index'

const meta = {
  title: 'Development Evidence/Generated Checks/Next Steps Card Preview',
  component: NextStepsCardPreview,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component: 'Generated development smoke coverage only. This is not designer review evidence, not acceptance-manifest-backed, and not production, source parity, GEL/TaPaaS approval or WCAG evidence. Use TaPaaS Components/Review & Confirmation for curated design review.',
      },
    },
  },
} satisfies Meta<typeof NextStepsCardPreview>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    id: 'assessment',
    heading: 'Application assessment',
    body: 'Your mock application will be assessed within [confirmed timeframe].',
  },
  {
    id: 'updates',
    heading: 'Application updates',
    body: 'You will receive updates by [confirmed contact channel].',
  },
]

export const OrderedSteps: Story = {
  args: { items },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('region', { name: 'Next steps' })).toHaveAttribute('data-tapaas-component', 'next-steps-card-preview')
  },
}

export const UnorderedGuidance: Story = {
  args: {
    heading: 'Other ways to keep going',
    items,
    showStepNumbers: false,
    showIcon: false,
  },
}

export const CompactHeadingLevel: Story = {
  args: {
    heading: 'What happens next?',
    items,
    headingLevel: 3,
  },
}
