import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Button } from '../gel'

const meta = {
  title: 'Development Evidence/Generated Checks/GEL Button',
  component: Button,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component: 'Generated development smoke coverage only. This is not designer review evidence, not acceptance-manifest-backed, and not production, source parity, GEL/TaPaaS approval or WCAG evidence. Use GEL Reference/Core Primitives for curated design review.',
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Submit' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Submit' })).toHaveTextContent('Submit')
  },
}

export const Secondary: Story = {
  args: { children: 'Back', variant: 'secondary' },
}

export const LinkAction: Story = {
  args: { children: 'Exit', variant: 'link' },
}

export const CssCheck: Story = {
  args: { children: 'Submit' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Submit' })
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(215, 21, 58)')
  },
}
