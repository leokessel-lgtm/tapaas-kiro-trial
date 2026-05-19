import React, { Key } from 'react'
import { Accordion, AccordionItem } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Accordion> = {
    title: 'Components/Accordion',
    component: Accordion,
    subcomponents: { AccordionItem },
    id: 'accordion',
}

export default meta

export const Default: StoryObj = {
    name: 'Default',
    args: {
        id: 'ex1',
        children: (
            <AccordionItem title='Who can use Business Connect?'>
                <p>
                    Anyone who owns or operates a small business or is planning
                    to start a new business in NSW can register for Business
                    Connect advisory sessions and attend events. You'll need to
                    have the right to live and work in Australia or be a
                    resident of NSW and/or have your business located in NSW.
                    Find out more about eligibility and how Service NSW Business
                    Connect works. You can access Business Connect online
                    resources at any time and no registration is required.
                </p>
            </AccordionItem>
        ),
    },
}
export const MultipleItems: StoryObj = {
    args: {
        id: 'ex2',
        name: 'FAQs',
        children: [
            <AccordionItem key='1' title='Who can use Business Connect?'>
                <p>
                    Anyone who owns or operates a small business or is planning
                    to start a new business in NSW can register for Business
                    Connect advisory sessions and attend events. You'll need to
                    have the right to live and work in Australia or be a
                    resident of NSW and/or have your business located in NSW.
                    Find out more about eligibility and how Service NSW Business
                    Connect works. You can access Business Connect online
                    resources at any time and no registration is required.
                </p>
            </AccordionItem>,
            <AccordionItem
                key='2'
                title='Will I ever need to pay for Business Connect?'
            >
                <p>
                    Service NSW is an award-winning NSW government initiative
                    delivering improved one-stop services for government
                    customers. Service NSW has been shaped by our customers -
                    who want easier and more online access to government
                    services and a single point of contact.
                </p>
            </AccordionItem>,
        ],
    },
}

export const ExpandByDefault: StoryObj = {
    args: {
        defaultExpandedKeys: ['accordion2'],
        children: [
            <AccordionItem
                id='accordion1'
                title='Who can use Business Connect?'
            >
                <p>
                    Anyone who owns or operates a small business or is planning
                    to start a new business in NSW can register for Business
                    Connect advisory sessions and attend events. You'll need to
                    have the right to live and work in Australia or be a
                    resident of NSW and/or have your business located in NSW.
                    Find out more about eligibility and how Service NSW Business
                    Connect works. You can access Business Connect online
                    resources at any time and no registration is required.
                </p>
            </AccordionItem>,
            <AccordionItem
                id='accordion2'
                title='Will I ever need to pay for Business Connect?'
            >
                <p>
                    Service NSW is an award-winning NSW government initiative
                    delivering improved one-stop services for government
                    customers. Service NSW has been shaped by our customers -
                    who want easier and more online access to government
                    services and a single point of contact.
                </p>
            </AccordionItem>,
        ],
    },
}

export const ControlledAccordion = (props: {}) => {
    const [expandedKeys, setExpandedKeys] = React.useState(
        new Set<Key>(['accordion1']),
    )

    return (
        <Accordion
            {...props}
            id='ex4'
            expandedKeys={[...expandedKeys]}
            onExpandedChange={expandedKeys => {
                console.log(expandedKeys)
                setExpandedKeys(expandedKeys)
            }}
        >
            <AccordionItem
                id='accordion0'
                title='Who can use Business Connect?'
            >
                <p>
                    Anyone who owns or operates a small business or is planning
                    to start a new business in NSW can register for Business
                    Connect advisory sessions and attend events. You'll need to
                    have the right to live and work in Australia or be a
                    resident of NSW and/or have your business located in NSW.
                    Find out more about eligibility and how Service NSW Business
                    Connect works. You can access Business Connect online
                    resources at any time and no registration is required.
                </p>
            </AccordionItem>
            <AccordionItem
                id='accordion1'
                title='Will I ever need to pay for Business Connect?'
            >
                <p>
                    Service NSW is an award-winning NSW government initiative
                    delivering improved one-stop services for government
                    customers. Service NSW has been shaped by our customers -
                    who want easier and more online access to government
                    services and a single point of contact.
                </p>
            </AccordionItem>
        </Accordion>
    )
}

export const ChangingHeadingElement: StoryObj = {
    name: 'Default',
    args: {
        id: 'ex5',
        children: (
            <AccordionItem
                headingElement='h4'
                title='Who can use Business Connect?'
            >
                <p>
                    Anyone who owns or operates a small business or is planning
                    to start a new business in NSW can register for Business
                    Connect advisory sessions and attend events. You'll need to
                    have the right to live and work in Australia or be a
                    resident of NSW and/or have your business located in NSW.
                    Find out more about eligibility and how Service NSW Business
                    Connect works. You can access Business Connect online
                    resources at any time and no registration is required.
                </p>
            </AccordionItem>
        ),
    },
}

export const Properties = args => (
    <Accordion id='ex6' {...args}>
        <AccordionItem title='Accordion item title'>
            <p>Accordion item text.</p>
        </AccordionItem>
    </Accordion>
)

export const VisualTestTextSpacing: StoryObj = {
    args: {
        id: 'a11y-text-resize',
        name: 'FAQs',
        defaultExpandedKeys: ['accordion2'],
        children: [
            <AccordionItem
                id='accordion1'
                title='Who can use Business Connect?'
            >
                <p>
                    Anyone who owns or operates a small business or is planning
                    to start a new business in NSW can register for Business
                    Connect advisory sessions and attend events. You’ll need to
                    have the right to live and work in Australia or be a
                    resident of NSW and/or have your business located in NSW.
                    Find out more about eligibility and how Service NSW Business
                    Connect works. You can access Business Connect online
                    resources at any time and no registration is required.{' '}
                </p>
            </AccordionItem>,
            <AccordionItem
                id='accordion2'
                title='Will I ever need to pay for Business Connect?'
            >
                <p>
                    Anyone who owns or operates a small business or is planning
                    to start a new business in NSW can register for Business
                    Connect advisory sessions and attend events. You'll need to
                    have the right to live and work in Australia or be a
                    resident of NSW and/or have your business located in NSW.
                    Find out more about eligibility and how Service NSW Business
                    Connect works. You can access Business Connect online
                    resources at any time and no registration is required.
                </p>
                <p>
                    Service NSW is an award-winning NSW government initiative
                    delivering improved one-stop services for government
                    customers. Service NSW has been shaped by our customers -
                    who want easier and more online access to government
                    services and a single point of contact.
                </p>
            </AccordionItem>,
        ],
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

export const VrtDisabledAction: StoryObj = {
    args: { id: 'vrt1' },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <Accordion {...args}>
            <AccordionItem
                key='accordion1'
                title='Who can use Business Connect?'
            >
                <p>Accordion Item 1</p>
            </AccordionItem>
            <AccordionItem
                key='accordion2'
                title='Will I ever need to pay for Business Connect?'
            >
                <p>Accordion Item 2</p>
            </AccordionItem>
        </Accordion>
    ),
}

export const VrtOpenedClosedItems: StoryObj = {
    args: {
        id: 'vrt2',
        defaultExpandedKeys: ['accordion2'],
    },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <Accordion {...args}>
            <AccordionItem
                key='accordion1'
                title='Who can use Business Connect?'
            >
                <p>Accordion Item 1</p>
            </AccordionItem>
            <AccordionItem
                key='accordion2'
                title='Will I ever need to pay for Business Connect?'
            >
                <p>
                    Service NSW is an award-winning NSW government initiative
                    delivering improved one-stop services for government
                    customers. Service NSW has been shaped by our customers -
                    who want easier and more online access to government
                    services and a single point of contact.
                </p>
            </AccordionItem>
        </Accordion>
    ),
}
