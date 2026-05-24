import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { InPageAlert } from '../gel'

const meta = {
  component: InPageAlert,
  tags: ['ai-generated'],
} satisfies Meta<typeof InPageAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Information: Story = {
  args: {
    variant: 'info',
    title: 'Information message',
    children: <p>This preview message gives supporting transaction guidance.</p>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('note')).toHaveAttribute('data-gelweb-component', 'in-page-alert-info')
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Owner confirmation required',
    children: <p>Placeholder legal, privacy or policy content still needs review.</p>,
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Unable to continue',
    children: <p>Resolve the highlighted issue before continuing.</p>,
  },
}
