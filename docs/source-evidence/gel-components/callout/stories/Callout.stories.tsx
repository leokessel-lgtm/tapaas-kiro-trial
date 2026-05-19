import React from 'react'
import { Callout } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Callout> = {
    title: 'Components/Callout',
    component: Callout,
    id: 'callout',
}

export default meta

export const Default = args => (
    <Callout title='Travelling within NSW'>
        <p>
            You no longer need to register to travel within NSW. However, some
            travel restrictions may apply.
        </p>
    </Callout>
)

export const ARIARoles = args => (
    <Callout title='Travelling within NSW' role='alert'>
        <p>
            You no longer need to register to travel within NSW. However, some
            travel restrictions may apply.
        </p>
    </Callout>
)

export const TitleOnly = args => (
    <Callout title='Digital Driver Licence is now legal to use across NSW' />
)

export const ChangingHeadingElement = args => (
    <Callout title='Travelling within NSW' headingElement='h4'>
        <p>
            You no longer need to register to travel within NSW. However, some
            travel restrictions may apply.
        </p>
    </Callout>
)

export const ParagraphHeadingElement = args => (
    <Callout title='Travelling within NSW' headingElement='p'>
        <p>
            You no longer need to register to travel within NSW. However, some
            travel restrictions may apply.
        </p>
    </Callout>
)

export const CustomHtml = args => (
    <Callout title='Names must match'>
        <p>
            If the names on your documents do not match because you got married,
            you can first{' '}
            <a href='#'>verify your Australian marriage certificate</a>.
        </p>
    </Callout>
)

export const Properties = args => (
    <Callout title='Title' {...args}>
        <p>Text.</p>
    </Callout>
)

Properties.argTypes = {
    headingElement: {
        name: 'headingElement',
        description: '`Callout` title heading level',
        options: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
        control: {
            type: 'select',
        },
        table: {
            defaultValue: { summary: `'h6'` },
        },
    },
}

export const VisualTestTextSpacing = args => (
    <Callout title='Travelling within NSW'>
        <p>
            You no longer need to register to travel within NSW. However, some
            travel restrictions may apply.
        </p>
    </Callout>
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

export const VrtCallout = {
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: () => (
        <>
            <Callout id='vrt-default' title='Travelling within NSW'>
                <p>
                    You no longer need to register to travel within NSW.
                    However, some travel restrictions may apply.{' '}
                    <a href='#'>More info</a>
                </p>
            </Callout>
            <Callout
                id='vrt-title-only'
                title='Digital Driver Licence is now legal to use across NSW'
            />
        </>
    ),
}
