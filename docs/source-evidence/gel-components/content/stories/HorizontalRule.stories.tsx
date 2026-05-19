import React from 'react'
import type { Meta } from '@storybook/react-vite'
import { HorizontalRule } from '../src'

const meta: Meta<typeof HorizontalRule> = {
    title: 'Components/Horizontal rule',
    component: HorizontalRule,
    id: 'horizontal-rule',
}

export default meta

export const HorizontalRuleStory = {
    name: 'Horizontal Rule',
}

export const Properties = args => <HorizontalRule {...args} />

Properties.args = {
    className: 'classname',
    marginTop: '4.5rem',
    marginBottom: '4.5rem',
}

export const VrtHorizontalRule = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => <HorizontalRule />,
}
