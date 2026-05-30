import type { Meta, StoryObj } from '@storybook/react'
import {
  FileInput,
  FileUpload,
  Heading,
} from '../gel'
import './storybook.css'

const meta: Meta = {
  title: 'GEL Reference/Evidence & Upload',
  parameters: {
    docs: {
      description: {
        component: 'Storybook reference only for Batch 3C GEL evidence and upload patterns. These are source-informed static local previews, not production GEL exports, and not an upload, storage, scanning, validation, backend, accessibility, WCAG, legal, privacy, policy, production, GEL or TaPaaS approval claim.',
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
      <p>This Storybook reference is for design and composition review only. It does not use the real @snsw-gel/react package and does not prove upload security, privacy, validation, accessibility, backend integration, production readiness or approval status.</p>
    </div>
  )
}

function FileInputStaticReferenceExample() {
  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>File input static reference</Heading>
      <FileInput
        id='gel-ref-file-input'
        label='Supporting document'
        helpMessage='Use this static reference to review label, hint and action placement only.'
        buttonLabel='Choose file'
      />
      <div className='storybook-note'>
        <strong>Boundary</strong>
        <p>This preview does not open a file picker, read selected files, validate file type or size, upload, store, scan or persist files.</p>
      </div>
    </div>
  )
}

function FileUploadStaticReferenceExample() {
  return (
    <div className='storybook-stack'>
      <ReferenceBoundaryNote />
      <Heading level={2}>File upload static reference</Heading>
      <FileUpload
        id='gel-ref-file-upload'
        legend='Upload supporting evidence'
        helpMessage='Review the static instruction, grouping and action placement only.'
        instruction='This shell shows where upload guidance and a select-file action would appear in a transaction page.'
        actionLabel='Choose file'
      />
      <div className='storybook-note'>
        <strong>Deferred</strong>
        <p>DropZone and UploadedItem are intentionally not included in Batch 3C. This story does not include drag and drop, selected-file rows, remove actions, progress, backend calls or file validation.</p>
      </div>
    </div>
  )
}

export const FileInputStaticReference: Story = {
  name: 'File input static reference',
  render: () => <FileInputStaticReferenceExample />,
}

export const FileUploadStaticReference: Story = {
  name: 'File upload static reference',
  render: () => <FileUploadStaticReferenceExample />,
}
