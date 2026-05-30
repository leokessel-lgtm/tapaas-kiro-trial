import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MoreInfoPanelStaticReference } from './index'

describe('GEL help and disclosure static preview', () => {
  it('renders a static MoreInfoPanel reference with title, content and caveat', () => {
    const { container } = render(
      <MoreInfoPanelStaticReference title='Why we ask' triggerText='More information'>
        <p>Short contextual help content.</p>
      </MoreInfoPanelStaticReference>,
    )

    const preview = container.querySelector('[data-gelweb-component="more-info-panel-static-reference"]')
    expect(preview).toBeInTheDocument()
    expect(screen.getByText('More information')).toBeInTheDocument()
    expect(screen.getByText('Why we ask')).toBeInTheDocument()
    expect(screen.getByText('Short contextual help content.')).toBeInTheDocument()
    expect(screen.getByText(/not the real GEL MoreInfoPanel implementation/i)).toBeInTheDocument()
  })

  it('does not render dialog or modal semantics', () => {
    const { container } = render(<MoreInfoPanelStaticReference />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(container.querySelector('[aria-modal]')).not.toBeInTheDocument()
    expect(container.querySelector('[aria-live]')).not.toBeInTheDocument()
  })
})
