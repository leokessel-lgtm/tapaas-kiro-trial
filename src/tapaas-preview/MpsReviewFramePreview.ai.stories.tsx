import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { MpsReviewFramePreview } from './index'

const meta = {
  title: 'Development Evidence/Generated Checks/MPS Review Frame Preview',
  component: MpsReviewFramePreview,
  tags: ['ai-generated'],
  parameters: {
    docs: {
      description: {
        component: 'Generated development smoke coverage only. This is not designer review evidence, not acceptance-manifest-backed, and not production, source parity, GEL/TaPaaS approval or WCAG evidence. Use Transaction Frames/MPS for curated source-structure review.',
      },
    },
  },
} satisfies Meta<typeof MpsReviewFramePreview>

export default meta
type Story = StoryObj<typeof meta>

const sections = [
  {
    id: 'application-details',
    title: 'Application details',
    rows: [
      { label: 'Application type', value: 'Renewal' },
      { label: 'Permit type', value: 'Individual permit' },
    ],
  },
  {
    id: 'personal-details',
    title: 'Personal details',
    rows: [
      { label: 'First name', value: 'Jane' },
      { label: 'Last name', value: 'Citizen' },
      { label: 'Email', value: 'jane@example.test' },
    ],
  },
]

export const FigmaFidelitySlice: Story = {
  name: 'Development Slice - use curated fidelity story',
  args: {
    sections,
    declarationStatements: ['Declaration wording remains placeholder-only.'],
    onEdit: () => undefined,
    onBack: () => undefined,
    onSubmit: () => undefined,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'Declaration' })).toHaveAccessibleDescription(/indicates a required field/)
  },
}

export const WithoutEditCallbacks: Story = {
  name: 'Without Edit Callbacks',
  args: {
    sections,
    declarationStatements: [],
    onBack: () => undefined,
    onSubmit: () => undefined,
  },
}
