import React from 'react'
import { Breadcrumb } from '../src'
import { SectionHeader } from '../page/src/SectionHeader.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const breadcrumbLinks = [
    {
        content: 'Home page',
        path: '/home',
    },
    {
        content: 'Parent page',
        path: '/parent',
    },
]

const breadcrumbLinksTwo = [
    {
        content: 'Home page',
        path: '/home',
    },
    {
        content: 'Grandparent page',
        path: '/grandparent',
    },
    {
        content: 'Parent page',
        path: '/parent',
    },
]

const meta: Meta<typeof Breadcrumb> = {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    render: args => {
        return (
            <Router>
                <Breadcrumb {...args} />
            </Router>
        )
    },
    id: 'breadcrumbs',
}

export default meta

export const Default = {
    args: {
        linksList: breadcrumbLinksTwo,
    },

    name: 'Default',
}

export const BreadcrumbMobile = {
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
    },
    args: {
        linksList: breadcrumbLinksTwo,
    },
    name: 'Mobile',
}

export const SectionHeaderBreadcrumb = args => (
    <Router>
        <SectionHeader
            intro='Get a driver or rider licence in NSW, apply for learner and provisional licences, renew, upgrade or change licence and licence details.'
            title='NSW driver licence'
            breadcrumbList={[
                {
                    content: 'Home',
                    path: '/main',
                },
                {
                    content: 'Find services',
                    path: '/secondary',
                },
                {
                    content: 'Driving and transport',
                    path: '/tertiary',
                },
            ]}
        />
    </Router>
)

export const Properties = {
    name: 'Properties',
    render: args => (
        <Router>
            <Breadcrumb {...args} />
        </Router>
    ),

    args: {
        linksList: breadcrumbLinks,
    },

    argTypes: {
        linksList: {
            description: 'Do not include current page details in `linksList`',
            control: {
                type: 'object',
            },
        },
    },
}

export const VisualTestTextSpacing = {
    args: {
        linksList: breadcrumbLinksTwo,
    },
    parameters: {
        a11y: {
            covers: ['text-spacing'],
        },
        visual: {
            enabled: true,
        },
    },
    decorators: [textSpacingDecorator],
}

export const VrtBreadcrumbMinPages = {
    args: {
        linksList: breadcrumbLinksTwo,
    },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <Router>
            <Breadcrumb {...args} />
        </Router>
    ),
}
