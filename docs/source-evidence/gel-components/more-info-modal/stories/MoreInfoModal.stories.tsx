import React from 'react'
import type { Meta } from '@storybook/react-vite'
import { MoreInfoModal } from '../src/MoreInfoModal'
import { augmentStorybookTypes } from '@snsw-gel/storybook'

const ModalContentText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

augmentStorybookTypes(MoreInfoModal)

const meta: Meta<typeof MoreInfoModal> = {
    title: 'Components/Sliding tooltip',
    component: MoreInfoModal,
    id: 'sliding-tooltip',
}

export default meta

export const QuestionTooltip = {
    name: 'Question Tooltip',

    args: {
        title: 'Information',
        subTitle: 'What you need to know',
        helpText: ModalContentText,
        linkText: 'Click this',
    },
}

export const InfoTooltip = {
    name: 'Info Tooltip',

    args: {
        title: 'Information',
        subTitle: 'What you need to know',
        helpText: ModalContentText,
        linkText: 'Click this',
        questionIconFlag: true,
    },
}

export const HyperlinkTooltip = {
    name: 'Hyperlink Tooltip',

    args: {
        title: 'Information',
        subTitle: 'What you need to know',
        helpText: ModalContentText,
        linkText: 'Click this',
        questionHyperLink: true,
    },
}

export const TooltipProperties = {
    name: 'Tooltip Properties',

    args: {
        title: 'Information',
        subTitle: 'What you need to know',
        helpText: ModalContentText,
        linkText: 'Click this',
    },
}

export const VrtMoreInfoModal = {
    parameters: {
        a11y: {
            enabled: false,
        },
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <MoreInfoModal id='vrt-question' />
            <MoreInfoModal id='vrt-info' questionIconFlag />
            <MoreInfoModal
                id='vrt-link'
                linkText='Click this'
                questionHyperLink
            />
        </div>
    ),
}
