import React from 'react'
import { TextLink } from '../src'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { StoryObj } from '@storybook/react-vite'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

augmentStorybookTypes(TextLink)

const meta: Meta<typeof TextLink> = {
    title: 'Components/Text link',
    component: TextLink,
    id: 'text-link',
}

export default meta

export const Default: StoryObj = args => (
    <TextLink href='./?path=/docs/text-link--docs'>Text Link</TextLink>
)

export const Internal = args => (
    <Router>
        <TextLink as={Link} href='/dashboard'>
            Internal React router link
        </TextLink>
        <Route
            path='/dashboard'
            component={() => <h2>You are in the Dashboard</h2>}
        />
    </Router>
)

export const External = args => (
    <p>
        For more details on link accessibility, go to{' '}
        <TextLink href='https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only'>
            Link purpose (Link only) (Level AAA) – WCAG
        </TextLink>
        .
    </p>
)

export const opensInNewTab = args => (
    <p>
        For account terms of use, go to{' '}
        <TextLink
            href='https://www.service.nsw.gov.au/terms-and-conditions'
            target='_blank'
        >
            Terms and Conditions
        </TextLink>
        .
    </p>
)

export const Properties = args => <TextLink {...args} />

Properties.args = {
    href: './?path=/docs/text-link--docs#link-properties',
    children: 'Link Text',
}

export const VisualTestTextSpacing = args => (
    <p>
        For account terms of use, go to{' '}
        <TextLink
            href='https://www.service.nsw.gov.au/terms-and-conditions'
            target='_blank'
        >
            Terms and Conditions
        </TextLink>
        .
    </p>
)

VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
    visual: {
        enabled: true,
    },
}

export const VrtTextLink = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <>
            {/* Default */}
            <TextLink href='./?path=/docs/text-link--docs'>Text Link</TextLink>
            {/* Opens in a new tab */}
            <p>
                For account terms of use, go to{' '}
                <TextLink
                    href='https://www.service.nsw.gov.au/terms-and-conditions'
                    target='_blank'
                >
                    Terms and Conditions
                </TextLink>
                .
            </p>
        </>
    ),
}
