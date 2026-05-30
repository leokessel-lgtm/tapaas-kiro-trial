import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FileInput, FileUpload } from './index'

describe('GEL evidence and upload static previews', () => {
  it('renders a static file input reference with label, hint and caveat', () => {
    const { container } = render(
      <FileInput
        id='test-file-input'
        label='Supporting document'
        helpMessage='Review label and hint placement only.'
      />,
    )

    const group = screen.getByRole('group', { name: 'Supporting document' })
    expect(group).toHaveAttribute('data-gelweb-component', 'file-input')
    expect(group).toHaveAccessibleDescription(/Review label and hint placement only/)
    expect(within(group).getByRole('button', { name: 'Choose file' })).toBeDisabled()
    expect(within(group).getByText(/File selection is not enabled/)).toBeInTheDocument()
    expect(container.querySelector('input[type="file"]')).not.toBeInTheDocument()
  })

  it('renders a static file upload shell without upload controls or file processing', () => {
    const { container } = render(
      <FileUpload
        id='test-file-upload'
        legend='Upload supporting evidence'
        helpMessage='Review grouping only.'
      />,
    )

    const group = screen.getByRole('group', { name: 'Upload supporting evidence' })
    expect(group).toHaveAccessibleDescription('Review grouping only.')
    expect(screen.getByText(/Static reference only/)).toBeInTheDocument()
    expect(within(group).getByRole('button', { name: 'Choose file' })).toBeDisabled()
    expect(screen.queryByText(/Drop files here/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Remove file/i)).not.toBeInTheDocument()
    expect(container.querySelector('input[type="file"]')).not.toBeInTheDocument()
  })
})
