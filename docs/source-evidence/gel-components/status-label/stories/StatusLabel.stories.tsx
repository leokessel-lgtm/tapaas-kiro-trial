import React from 'react'
import { StatusLabel } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof StatusLabel> = {
    title: 'Components/Status label',
    component: StatusLabel,
    id: 'status-label',
}

export default meta

export const Default = () => <StatusLabel text='Neutral' />

export const Error = () => <StatusLabel text='Error' variant='error' />

export const Warning = () => <StatusLabel text='Warning' variant='warning' />

export const Success = () => <StatusLabel text='Success' variant='success' />

export const Info = () => <StatusLabel text='Info' variant='info' />

export const Properties = args => <StatusLabel {...args} />

Properties.args = {
    text: 'Status Label text',
}

export const VisualTestTextSpacing = () => {
    return (
        <>
            <StatusLabel text='Neutral' />
            <StatusLabel text='Error' variant='error' />
            <StatusLabel text='Warning' variant='warning' />
            <StatusLabel text='Success' variant='success' />
            <StatusLabel text='Info' variant='info' />
        </>
    )
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

export const VrtStatusLabel = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <>
            {/* Default */}
            <StatusLabel text='Neutral' />
            {/* Error */}
            <StatusLabel text='Error' variant='error' />
            {/* Info */}
            <StatusLabel text='Info' variant='info' />
            {/* Success */}
            <StatusLabel text='Success' variant='success' />
            {/* Warning */}
            <StatusLabel text='Warning' variant='warning' />
        </>
    ),
}
