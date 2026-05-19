import React from 'react'
import { DropZone } from '../src'
import { FileInput } from '@snsw-gel/react'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof DropZone> = {
    title: 'Components/Dropzone',
    component: DropZone,
    id: 'dropzone',
    args: {
        onDrop: e => {
            console.log(e.dataTransfer.files)
        },
    },
}

export default meta

export const Default = {
    args: {
        helpMessage: 'Text inside of the component',
        id: 'dropZone1',
    },
    name: 'Default',
}

export const ErrorMessage = {
    args: {
        helpMessage: 'Text inside of the component',
        id: 'dropZone3',
        onDrop: e => console.log(e),
        hasError: true,
    },
    name: 'Error Message',
}

export const HelpMessage = {
    args: {
        helpMessage: (
            <p>
                Drag and drop files into this box to upload them.
                <br />
                Formats accepted: PNG or JPG.
                <br />
                File size must not exceed 4 MB.
            </p>
        ),
        id: 'dropZone4',
        onDrop: e => console.log(e),
    },
    name: 'Help Message',
}

export const FileInputStory = {
    args: {
        helpMessage: 'Text inside of the component',
        id: 'dropZone2',
        onDrop: e => {
            console.log(e)
        },
        fileInput: (
            <FileInput
                id='ex-1'
                onChange={e => {
                    console.log('Select file: ', e.target.files)
                }}
                name='ex-1-file'
            />
        ),
    },
    name: 'File Input',
}

export const UploadIcon = {
    story: args => {
        const handleEvent = e => {
            console.log(e)
        }
        return <DropZone {...args} onDrop={handleEvent} />
    },
    name: 'Upload Icon',
    args: {
        helpMessage: 'Text inside of the component',
        id: 'dropZone4',
        showUploadIcon: true,
    },
}

export const Properties = {
    story: args => {
        const handleEvent = e => {
            console.log(e)
        }
        return <DropZone {...args} onDrop={handleEvent} />
    },
    name: 'Properties',
    argTypes: {
        onDrop: {
            control: {
                type: null,
            },
        },
        fileInput: {
            control: {
                type: null,
            },
        },
    },
    args: {
        helpMessage: 'Text inside of the component',
        id: 'dropZone2',
    },
}

export const VisualTestTextSpacing = {
    args: {
        helpMessage: 'Text inside of the component',
        id: 'a11y-text-spacing',
    },
    decorators: [textSpacingDecorator],
    parameters: {
        a11y: {
            covers: ['text-spacing'],
        },
        visual: {
            enabled: true,
        },
    },
}

export const VrtDropZone = {
    args: {
        helpMessage: 'Text inside of the component',
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}
        >
            <DropZone {...args} id='vrt-upload-icon' showUploadIcon />
            <DropZone
                {...args}
                id='vrt-error-file-input'
                hasError
                fileInput={<FileInput />}
            />
        </div>
    ),
}
