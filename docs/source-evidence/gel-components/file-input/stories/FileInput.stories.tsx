import React from 'react'
import { FileInput } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof FileInput> = {
    title: 'Components/File input',
    component: FileInput,
    id: 'file-input',
}

export default meta

export const Default = () => {
    const onChangeFunction = e => {
        console.log('Select file: ', e.target.files)
    }
    return <FileInput id='ex-1' onChange={onChangeFunction} name='ex-1-file' />
}

export const SelectMultiple = () => {
    const onChangeFunction = e => {
        console.log('Select files: ', e.target.files)
    }
    return (
        <FileInput
            id='ex-2'
            onChange={onChangeFunction}
            name='ex-2-file'
            multiple
        />
    )
}

export const AcceptedFiles = () => {
    const onChangeFunction = e => {
        console.log('Select file: ', e.target.files)
    }
    return (
        <FileInput
            id='ex-3'
            onChange={onChangeFunction}
            name='ex-3-file'
            accept='image/png'
        />
    )
}

export const Capture = () => {
    const onChangeFunction = e => {
        console.log('Select file: ', e.target.files)
    }
    return (
        <FileInput
            id='ex-3'
            onChange={onChangeFunction}
            name='ex-3-file'
            capture='user'
        />
    )
}

export const Properties = args => <FileInput {...args} />

Properties.args = {
    id: 'example123',
    onChange: () => {},
    name: 'examplename',
    accept: 'image/png, image/jpeg',
}

export const VisualTestTextSpacing = () => {
    return <FileInput id='a11y-text-spacing' onChange={() => {}} />
}

VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
    visual: {
        enabled: true,
    },
}

export const VrtFileInput = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => <FileInput />,
}
