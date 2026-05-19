import React from 'react'
import { Heading } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeader,
    TableCell,
} from '@snsw-gel/react'
import { Unstyled } from '@storybook/addon-docs/blocks'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Heading> = {
    title: 'Foundations/Typography/Headings',
    component: Heading,
    id: 'typography-headings',
}

export default meta

const HeadingTableData = [
    {
        name: 'Heading 1',
        headingLevel: 1,
        smallScreens: {
            fontSize: '1.75rem (28px)',
            lineHeight: '1.29 (36px)',
        },
        largeScreens: {
            fontSize: '3rem (48px)',
            lineHeight: '1.25 (60px)',
        },
    },
    {
        name: 'Heading 2',
        headingLevel: 2,
        smallScreens: {
            fontSize: '1.5rem (24px)',
            lineHeight: '1.25 (30px)',
        },
        largeScreens: {
            fontSize: '2rem (32px)',
            lineHeight: '1.25 (40px)',
        },
    },
    {
        name: 'Heading 3',
        headingLevel: 3,
        smallScreens: {
            fontSize: '1.25rem (20px)',
            lineHeight: '1.2 (24px)',
        },
        largeScreens: {
            fontSize: '1.5rem (24px)',
            lineHeight: '1.33 (32px)',
        },
    },
    {
        name: 'Heading 4',
        headingLevel: 4,
        smallScreens: {
            fontSize: '1rem (16px)',
            lineHeight: '1.5 (24px)',
        },
        largeScreens: {
            fontSize: '1.25rem (20px)',
            lineHeight: '1.4 (28px)',
        },
    },
    {
        name: 'Heading 5',
        headingLevel: 5,
        smallScreens: {
            fontSize: '0.875rem (14px)',
            lineHeight: '1.43 (20px)',
        },
        largeScreens: {
            fontSize: '1rem (16px)',
            lineHeight: '1.5 (24px)',
        },
    },
]

export const HeadingTable = () => {
    return (
        <Unstyled>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>{'Small screens < 768px'}</TableHeader>
                        <TableHeader>{'Large screens >= 768px'}</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {HeadingTableData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell><Heading level={row.headingLevel}>{row.name}</Heading></TableCell>
                            <TableCell>
                                font-size: {row.smallScreens.fontSize}<br />
                                line-height: {row.smallScreens.lineHeight}<br />
                            </TableCell>
                            <TableCell>
                                font-size: {row.largeScreens.fontSize}<br />
                                line-height: {row.largeScreens.lineHeight}<br />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Unstyled>
    )
}

export const Default = () => (
    <>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
    </>
)

export const ChangingHeadingLevel = () => (
    <Heading level={5} headingElement='h2'>HeadingElement 'h2' with Level 5 style</Heading>
)

export const Heading1 = args => <Heading level={1}>Heading 1</Heading>
Heading1.parameters = {
    e2e: {
        enabled: false,
    },
}

export const Properties = args => <Heading {...args}>Heading</Heading>

Properties.argTypes = {
    children: { name: 'children', defaultValue: 'Heading' },
}

export const VisualTestTextSpacing = args => (
    <>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
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

export const VrtHeadings = {
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: () => (
        <>
            <Heading level={1}>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
            <Heading level={3}>Heading 3</Heading>
            <Heading level={4}>Heading 4</Heading>
            <Heading level={5}>Heading 5</Heading>
        </>
    ),
}
