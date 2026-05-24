import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { NextStepsCardPreview } from './index'

const meta = {
  component: NextStepsCardPreview,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component: 'Development-only smoke stories. Use TaPaaS Preview/Composites / Next Steps Card for designer-facing Figma comparison.',
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
