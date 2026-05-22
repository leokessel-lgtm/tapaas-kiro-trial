import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Accordion, MoreInfoDisclosure, ProgressStepper } from './index'

describe('Accordion', () => {
  it('opens and closes individual items with aria-expanded and hidden panel state', async () => {
    const user = userEvent.setup()

    render(
      <Accordion
        id='test-accordion'
        items={[
          { id: 'first', title: 'First section', children: <p>First content</p> },
          { id: 'second', title: 'Second section', children: <p>Second content</p> },
        ]}
      />,
    )

    const firstButton = screen.getByRole('button', { name: 'First section' })
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('First content').closest('section')).toHaveAttribute('hidden')

    await user.click(firstButton)
    expect(firstButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('First content').closest('section')).not.toHaveAttribute('hidden')

    await user.click(firstButton)
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens all, closes all and moves focus to the opposite group control', async () => {
    const user = userEvent.setup()

    render(
      <Accordion
        id='test-accordion'
        name='guidance sections'
        items={[
          { id: 'first', title: 'First section', children: <p>First content</p> },
          { id: 'second', title: 'Second section', children: <p>Second content</p> },
        ]}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Open all guidance sections' }))

    await waitFor(() => expect(screen.getByRole('button', { name: 'Close all guidance sections' })).toHaveFocus())
    expect(screen.getByRole('button', { name: 'First section' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Second section' })).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'Close all guidance sections' }))

    await waitFor(() => expect(screen.getByRole('button', { name: 'Open all guidance sections' })).toHaveFocus())
    expect(screen.getByRole('button', { name: 'First section' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Second section' })).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('MoreInfoDisclosure', () => {
  it('expands and collapses contextual help content', async () => {
    const user = userEvent.setup()

    render(
      <MoreInfoDisclosure triggerText='Why is this needed?' title='Contextual help'>
        <p>Use this for non-critical supporting content only.</p>
      </MoreInfoDisclosure>,
    )

    const trigger = screen.getByRole('button', { name: 'Why is this needed?' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('region', { name: 'Contextual help' })).not.toBeInTheDocument()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('region', { name: 'Contextual help' })).toHaveTextContent('Use this for non-critical supporting content only.')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('region', { name: 'Contextual help' })).not.toBeInTheDocument()
  })
})

describe('ProgressStepper', () => {
  it('renders the mobile step label and accessible status text for each step', () => {
    render(
      <ProgressStepper
        stepsList={[
          { content: 'Privacy', status: 'completed' },
          { content: 'Details', status: 'current' },
          { content: 'Review', status: 'todo' },
        ]}
      />,
    )

    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument()
    expect(screen.getByText('Completed: Step 1')).toHaveClass('gel-sr-only')
    expect(screen.getByText('Current: Step 2')).toHaveClass('gel-sr-only')
    expect(screen.getByText('Step 3')).toHaveClass('gel-sr-only')
    expect(screen.getByText('Privacy')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
  })
})
