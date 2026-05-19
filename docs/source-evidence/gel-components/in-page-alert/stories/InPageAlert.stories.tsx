import React from 'react'
import { InPageAlert } from '../src'
import { TextLink, Heading } from '@snsw-gel/react'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

augmentStorybookTypes(InPageAlert)

const meta: Meta<typeof InPageAlert> = {
    title: 'Components/In-page alerts',
    component: InPageAlert,
    id: 'in-page-alerts',
}

export default meta

export const Info = args => (
    <InPageAlert variant='info' title='This is a directory listing'>
        <p>
            To speak with someone, call <a href='tel:137788'>13 77 88</a>.
        </p>
    </InPageAlert>
)
export const InfoCompact = args => (
    <InPageAlert variant='info' title='This is a directory listing.' compact>
        <p>
            To speak with someone, call <a href='tel:137788'>13 77 88</a>.
        </p>
    </InPageAlert>
)

export const Error = args => (
    <InPageAlert
        variant='error'
        title='The details you entered do not mach our records'
    >
        <p>Check your details and try again.</p>
    </InPageAlert>
)
export const ErrorCompact = args => (
    <InPageAlert
        variant='error'
        title='Your details do not match our records.'
        compact
    >
        <p>Check your details and try again.</p>
    </InPageAlert>
)

export const Success = args => (
    <InPageAlert variant='success' title='Account activated'>
        <p>Your Service NSW personal account is now active.</p>
    </InPageAlert>
)

export const SuccessCompact = args => (
    <InPageAlert variant='success' title='Thank you.' compact>
        <p>We will contact you within 5 business days.</p>
    </InPageAlert>
)

export const Warning = args => (
    <InPageAlert variant='warning' title='Rockdale Service Centre coming soon'>
        <p>
            Rockdale Agency will close on 9 March. It will reopen in April as
            Rockdale Service Centre. During the closure, visit Kogarah Service
            Centre.
        </p>
    </InPageAlert>
)

export const WarningCompact = args => (
    <InPageAlert variant='warning' title='Rockdale Centre.' compact>
        <p>Rockdale Agency will close on 9 March 2018 and re-open in April.</p>
    </InPageAlert>
)

export const AriaRoles = args => (
    <InPageAlert
        variant='warning'
        title='Rockdale Service Centre is coming soon'
        role='alert'
    >
        <p>
            Rockdale Agency will close on 9 March. It will reopen in April as
            Rockdale Service Centre. During the closure, visit Kogarah Service
            Centre.
        </p>
    </InPageAlert>
)

export const TitleOnly = args => (
    <InPageAlert variant='error' title='This is a directory listing' />
)

export const ChangingHeadingElement = args => (
    <InPageAlert
        variant='info'
        title='This is a directory listing'
        headingElement='h4'
    >
        <p>
            Use the information on this page to contact the government
            department or agency directly.
        </p>
    </InPageAlert>
)
export const ParagraphHeadingElement = args => (
    <InPageAlert
        variant='success'
        title='Thank you!'
        headingElement='p'
        compact
    >
        <p>We will contact you within 5 business days.</p>
    </InPageAlert>
)

export const CustomHtml = args => (
    <InPageAlert
        variant='success'
        title='You have successfully updated your notification preferences'
    >
        <p>You have opted out of receiving notifications for</p>
        <ul>
            <li>
                <TextLink target='_blank' href='#'>
                    Digital Vehicle Registration
                </TextLink>
            </li>
        </ul>
        <p>
            If you do not receive the confirmation email within a few minutes,
            please check your junk email folder.
        </p>
    </InPageAlert>
)

export const Properties = args => <InPageAlert {...args} />

Properties.args = {
    title: 'Title',
    children: 'Text.',
    variant: 'info',
}

Properties.argTypes = {
    variant: {
        name: 'variant',
        defaultValue: 'info',
        description: "`'error'` `'success'` `'warning'` `'info'`",
        table: {
            type: {
                summary: null,
            },
        },
        options: ['error', 'success', 'warning', 'info'],
        control: {
            type: 'select',
        },
    },
    role: {
        name: 'role',
        description: 'See more information in the ARIA Roles story.',
        control: {
            type: 'select',
        },
    },
    compact: {
        table: {
            defaultValue: { summary: 'false' },
        },
    },
    headingElement: {
        name: 'headingElement',
        description: '`In-page Alert` title heading level',
        options: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
        control: {
            type: 'select',
        },
        table: {
            defaultValue: { summary: `'h6'` },
        },
    },
    tabIndex: {
        table: {
            disable: true,
        },
    },
}

export const VisualTestTextSpacing = args => (
    <>
        <InPageAlert
            variant='info'
            title='This is a directory listing.'
            compact
        >
            <p>
                To speak with someone, call <a href='tel:137788'>13 77 88</a>.
            </p>
        </InPageAlert>
        <InPageAlert variant='info' title='This is a directory listing'>
            <Heading level={2}>This is a h2</Heading>
            <p>This is an example paragraph</p>
            <ul>
                <li>List item</li>
                <li>List item</li>
                <li>List item</li>
            </ul>
            <a href='#'>This is a link</a>
            <br />
            <TextLink target='_blank' href='#'>
                This is an external link
            </TextLink>
        </InPageAlert>
    </>
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

export const VrtInPageAlert = {
    args: {
        title: 'This is a directory listing',
        children: (
            <p>
                Use the information on this page to contact the government
                department or agency directly. To speak with someone, call{' '}
                <a href='tel:137788'>13 77 88</a>.
            </p>
        ),
    },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <>
            <InPageAlert {...args} variant='info' />
            <InPageAlert {...args} variant='error' />
            <InPageAlert {...args} variant='success' />
            <InPageAlert {...args} variant='warning' />
        </>
    ),
}

export const VrtInPageAlertCompact = {
    args: {
        compact: true,
        title: 'Thank you.',
        children: <p>We will contact you within 5 business days.</p>,
    },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <>
            <InPageAlert {...args} variant='info' />
            <InPageAlert {...args} variant='error' />
            <InPageAlert {...args} variant='success' />
            <InPageAlert {...args} variant='warning' />
        </>
    ),
}

export const VrtInPageAlertTitleOnly = {
    args: {
        title: 'This is a directory listing',
    },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <>
            <InPageAlert {...args} variant='info' />
            <InPageAlert {...args} variant='error' />
            <InPageAlert {...args} variant='success' />
            <InPageAlert {...args} variant='warning' />
        </>
    ),
}
