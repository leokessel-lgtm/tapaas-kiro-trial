import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Loader, Skeleton } from './index'

describe('GEL loading and placeholder static previews', () => {
  it('renders a static loader reference with loading copy and caveat', () => {
    const { container } = render(<Loader content='Loading' />)

    const loader = container.querySelector('[data-gelweb-component="loader"]')
    expect(loader).toBeInTheDocument()
    expect(loader).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(screen.getByText(/not a live loading implementation or accessibility proof/i)).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('renders static skeleton placeholder rows and cards with a caveat', () => {
    const { container } = render(
      <Skeleton label='Transaction content placeholder' rows={4} cards={2} />,
    )

    const skeleton = container.querySelector('[data-gelweb-component="skeleton"]')
    expect(skeleton).toBeInTheDocument()
    expect(screen.getByText('Transaction content placeholder')).toBeInTheDocument()
    expect(screen.getByText(/does not load data, time placeholder changes or reveal real content progressively/i)).toBeInTheDocument()
    expect(skeleton?.querySelectorAll('.gel-skeleton__row')).toHaveLength(4)
    expect(skeleton?.querySelectorAll('.gel-skeleton__card')).toHaveLength(2)
    expect(within(skeleton as HTMLElement).queryByRole('status')).not.toBeInTheDocument()
    expect(container.querySelector('[aria-live]')).not.toBeInTheDocument()
  })
})
