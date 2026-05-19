import React, { useState } from 'react'
import { CheckboxList, CheckboxListOptions } from '../src'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

augmentStorybookTypes(CheckboxList)

const meta: Meta<typeof CheckboxList> = {
    title: 'Components/Checkbox list',
    component: CheckboxList,
    id: 'checkbox-list',
}

export default meta

const optionsProperties: CheckboxListOptions<string> = [
    { label: 'Option 1', value: 'option1', clarify: '', editor: '' },
    { label: 'Option 2', value: 'option2', clarify: '', editor: '' },
    { label: 'Option 3', value: 'option3', clarify: '', editor: '' },
]

const options: CheckboxListOptions<string> = [
    {
        label: 'Fit-out changes and temporary physical changes',
        value: 'option1',
    },
    { label: 'Staff training and counselling', value: 'option2' },
    {
        label: 'Business advice and continuity planning',
        value: 'option3',
    },
    { label: 'Cleaning products and services', value: 'option4' },
]

export const Default = {
    render: args => {
        const [values, setValues] = useState(['option2'])

        return (
            <CheckboxList
                name='CheckboxList Name'
                legend='Vouchers and rebates'
                errorMessage='Select at least one option.'
                helpMessage='What will you spend the grant on? (Select all that apply)'
                options={options}
                value={values}
                onChange={setValues}
            />
        )
    },
    name: 'Default',
}

export const Disabled = {
    render: args => {
        const options: CheckboxListOptions<string> = [
            {
                label: 'Fit-out changes and temporary physical changes',
                value: 'option1',
                disabled: true,
            },
            {
                label: 'Staff training and counselling',
                value: 'option2',
                disabled: true,
            },
            {
                label: 'Business advice and continuity planning',
                value: 'option3',
            },
            { label: 'Cleaning products and services', value: 'option4' },
        ]

        return (
            <CheckboxList
                name='CheckboxList Name'
                legend='Vouchers and rebates'
                errorMessage='Select at least one option.'
                helpMessage='What will you spend the grant on? (Select all that apply)'
                options={options}
                defaultValue={['option2', 'option4']}
                onChange={values => console.log(values)}
            />
        )
    },
    name: 'Disabled',
}

export const ErrorMessage = {
    render: args => (
        <CheckboxList
            name='CheckboxList Name'
            legend='Vouchers and rebates'
            errorMessage='Select at least one option.'
            helpMessage='What will you spend the grant on? (Select all that apply)'
            hasError
            options={options}
            onChange={values => console.log(values)}
        />
    ),
    name: 'Error Message',
}

export const EditorText = {
    render: args => {
        const options: CheckboxListOptions<string> = [
            {
                label: 'Fit-out changes and temporary physical changes',
                value: 'option1',
                editor: 'Modifications made to a buildings interior.',
            },
            {
                label: 'Staff training and counselling',
                value: 'option2',
            },
            {
                label: 'Business advice and continuity planning',
                value: 'option3',
            },
            { label: 'Cleaning products and services', value: 'option4' },
        ]

        return (
            <CheckboxList
                id='fieldID4'
                name='editor'
                legend='Vouchers and rebates'
                errorMessage='Select at least one option.'
                helpMessage='What will you spend the grant on? (Select all that apply).'
                options={options}
                onChange={values => console.log(values)}
                defaultValue={['option1']}
            />
        )
    },
    name: 'Editor Text',
}

export const ClarifyingText = {
    render: args => {
        const options: CheckboxListOptions<string> = [
            {
                label: 'Fit-out changes and temporary physical changes',
                value: 'option1',
                clarify: 'Modifications made to a buildings interior.',
            },
            {
                label: 'Staff training and counselling',
                value: 'option2',
            },
            {
                label: 'Business advice and continuity planning',
                value: 'option3',
            },
            { label: 'Cleaning products and services', value: 'option4' },
        ]

        return (
            <CheckboxList
                name='CheckboxList Name'
                legend='CheckboxList Legend'
                errorMessage='Select at least one option.'
                helpMessage='What will you spend the grant on? (Select all that apply)'
                options={options}
                onChange={values => console.log(values)}
            />
        )
    },
    name: 'Clarifying Text',
}

export const ChangingMargin = {
    render: args => (
        <CheckboxList
            name='CheckboxList Name'
            legend='Vouchers and rebates'
            errorMessage='Select at least one option.'
            helpMessage='What will you spend the grant on? (Select all that apply)'
            margin={{ top: 'xxxl' }}
            options={options}
            onChange={values => console.log(values)}
        />
    ),
    name: 'Flexible Spacing',
}

export const Controlled = {
    render: args => {
        const [values, setValues] = useState(['option2'])
        const options: CheckboxListOptions<string> = [
            {
                label: 'Fit-out changes and temporary physical changes',
                value: 'option1',
            },
            { label: 'Staff training and counselling', value: 'option2' },
            {
                label: 'Business advice and continuity planning',
                value: 'option3',
            },
            { label: 'Cleaning products and services', value: 'option4' },
        ]

        return (
            <CheckboxList
                name='controlled'
                legend='Vouchers and rebates'
                errorMessage='Select at least one option.'
                helpMessage='What will you spend the grant on? (Select all that apply)'
                options={options}
                value={values}
                onChange={setValues}
            />
        )
    },
    name: 'Controlled',
}

export const Uncontrolled = {
    render: args => {
        const options: CheckboxListOptions<string> = [
            {
                label: 'Fit-out changes and temporary physical changes',
                value: 'option1',
            },
            { label: 'Staff training and counselling', value: 'option2' },
            {
                label: 'Business advice and continuity planning',
                value: 'option3',
            },
            { label: 'Cleaning products and services', value: 'option4' },
        ]

        return (
            <CheckboxList
                name='uncontrolled'
                legend='Vouchers and rebates'
                errorMessage='Select at least one option.'
                helpMessage='What will you spend the grant on? (Select all that apply)'
                options={options}
                onChange={value => {
                    console.log('Uncontrolled onChange', value)
                }}
                defaultValue={['option2', 'option3']}
            />
        )
    },
    name: 'Uncontrolled',
}

export const Properties = {
    args: {
        legend: 'CheckboxList Legend',
        helpMessage: 'CheckboxList help text.',
        errorMessage: 'CheckboxList error message.',
        options: optionsProperties,
    },
    argTypes: {
        options: {
            description:
                '`[{ value: any, label: node, clarify: string, editor: string }]` `array` structure of options to populate the checkboxes',
        },
        hasError: {
            control: 'boolean',
        },
    },
}

const textResizeOptions: CheckboxListOptions<string> = [
    {
        label: 'Fit-out changes and temporary physical changes',
        value: 'option1',
        clarify: 'Clarifying text goes here.',
    },
    { label: 'Staff training and counselling', value: 'option2' },
    {
        label: 'Business advice and continuity planning',
        value: 'option3',
        editor: 'Editor text goes here.',
    },
    { label: 'Cleaning products and services', value: 'option4' },
]

export const VisualTestTextSpacing = {
    render: args => (
        <CheckboxList
            name='CheckboxList Name'
            legend='Vouchers and rebates'
            options={textResizeOptions}
            onChange={values => console.log(values)}
            defaultValue={['option3']}
        />
    ),
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

export const VrtCheckboxList = {
    args: {
        legend: 'Vouchers and rebates',
        errorMessage: 'Select at least one option.',
        helpMessage:
            'What will you spend the grant on? (Select all that apply)',
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            <CheckboxList
                {...args}
                id='vrt-clarify-editor-disabled'
                defaultValue={['option2', 'option4']}
                options={[
                    {
                        label: 'Fit-out changes and temporary physical changes',
                        value: 'option1',
                        clarify: 'Clarifying text goes here.',
                    },
                    {
                        label: 'Staff training and counselling',
                        value: 'option2',
                        editor: 'Editor text goes here.',
                    },
                    {
                        label: 'Business advice and continuity planning',
                        value: 'option3',
                        disabled: true,
                    },
                    {
                        label: 'Cleaning products and services',
                        value: 'option4',
                        disabled: true,
                    },
                ]}
            />
            <CheckboxList
                {...args}
                id='vrt-error-margin'
                margin={{ top: 'xxxl' }}
                hasError
                options={options}
            />
        </>
    ),
}
