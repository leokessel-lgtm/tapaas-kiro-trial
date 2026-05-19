import React from 'react'
import { Fieldset } from '../src'
import { Field, Select, Input } from '@snsw-gel/react'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const dayOptions = [
    { value: 1, text: '01' },
    { value: 2, text: '02' },
    { value: 3, text: '03' },
    { value: 4, text: '04' },
    { value: 5, text: '05' },
    { value: 6, text: '06' },
    { value: 7, text: '07' },
]

const monthOptions = [
    { value: 1, text: '01' },
    { value: 2, text: '02' },
    { value: 3, text: '03' },
    { value: 4, text: '04' },
    { value: 5, text: '05' },
    { value: 6, text: '06' },
    { value: 7, text: '07' },
    { value: 8, text: '08' },
    { value: 9, text: '09' },
    { value: 10, text: '10' },
    { value: 11, text: '11' },
    { value: 12, text: '12' },
]

const yearOptions = [
    { value: 1, text: '21' },
    { value: 2, text: '22' },
    { value: 3, text: '23' },
    { value: 4, text: '24' },
    { value: 5, text: '25' },
    { value: 6, text: '26' },
    { value: 7, text: '27' },
    { value: 8, text: '28' },
    { value: 9, text: '29' },
    { value: 10, text: '30' },
    { value: 11, text: '31' },
]

const meta: Meta<typeof Fieldset> = {
    title: 'Components/Fieldset',
    component: Fieldset,
    id: 'fieldset',
}

export default meta

const DateContent = args => (
    <div className='date-container' style={{ display: 'flex', gap: '16px' }}>
        <Field style={{ marginTop: '0' }} id='month-id' label='Month'>
            <Select placeholder='MM' options={monthOptions} inputWidth='xs' />
        </Field>
        <Field style={{ marginTop: '0' }} id='year-id' label='Year'>
            <Select placeholder='YY' options={yearOptions} inputWidth='xs' />
        </Field>
    </div>
)

const PersonalDetailsContent = args => (
    <>
        <Field
            id='given-name'
            label='Given name'
            errorMessage='Enter a given name.'
            {...args}
        >
            <Input defaultValue='' />
        </Field>
        <Field id='middle-name' label='Middle name' isOptional hasError={false}>
            <Input defaultValue='' />
        </Field>
        <Field
            id='family-name'
            label='Family name'
            errorMessage='Enter a family name.'
            {...args}
        >
            <Input defaultValue='' />
        </Field>
    </>
)

PersonalDetailsContent.displayName = 'PersonalDetailsContent'

export const Default = args => (
    <Fieldset
        legend='Expiry Date'
        helpMessage='Expiry Date appears at the bottom right of the card as “Valid Thru”.'
    >
        <DateContent />
    </Fieldset>
)

export const WithHelpMessage = {
    name: 'With help message',
    args: {
        legend: 'Expiry Date',
        helpMessage:
            'Expiry Date appears at the bottom right of the card as “Valid Thru”.',
        children: <DateContent />,
    },
}

export const FlexibleSpacing = args => (
    <Fieldset
        legend='Expiry Date'
        helpMessage='Expiry Date appears at the bottom right of the card as “Valid Thru”.'
        margin={{ top: 'xxxl' }}
    >
        <DateContent />
    </Fieldset>
)

export const SingleAnswerGroupError = args => (
    <Fieldset
        legend='Expiry Date'
        helpMessage='Expiry Date appears at the bottom right of the card as “Valid Thru”.'
        errorMessage='Enter a month and year.'
        hasError
    >
        <DateContent hasError />
    </Fieldset>
)

export const MultipleAnswerGroupError = args => (
    <Fieldset hasError legend='Personal Details'>
        <PersonalDetailsContent hasError />
    </Fieldset>
)

export const SmallLegend = args => (
    <Fieldset smallLegend legend='Personal Details'>
        <PersonalDetailsContent />
    </Fieldset>
)

export const Properties = args => (
    <Fieldset {...args}>
        <DateContent {...args.hasError} />
    </Fieldset>
)

Properties.args = {
    legend: 'Fieldset legend',
    helpMessage: 'Fieldset help text.',
    errorMessage: 'Fieldset error message.',
    className: '',
}

Properties.argTypes = {
    children: {
        control: {
            type: null,
        },
    },
    margin: {
        control: {
            type: null,
        },
    },
    hasError: {
        control: 'boolean',
    },
}

export const VisualTestTextSpacing = args => (
    <>
        <Fieldset
            legend='Expiry Date'
            helpMessage='Expiry Date appears at the bottom right of the card as “Valid Thru”.'
            errorMessage='Enter a month and year.'
            hasError
        >
            <DateContent hasError />
        </Fieldset>
        <Fieldset
            legend='Expiry Date'
            helpMessage='Expiry Date appears at the bottom right of the card as “Valid Thru”.'
            errorMessage='Enter a month and year.'
            hasError
            smallLegend
        >
            <DateContent hasError />
        </Fieldset>
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

export const VrtFieldset = {
    args: {
        legend: 'Expiry Date',
        helpMessage:
            'Expiry Date appears at the bottom right of the card as “Valid Thru”.',
        errorMessage: 'Enter a month and year.',
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            <Fieldset {...args} id='vrt-single-error' hasError>
                <DateContent />
            </Fieldset>
            <Fieldset {...args} id='vrt-small-legend' smallLegend>
                <DateContent />
            </Fieldset>
            <Fieldset
                id='vrt-multi-error-margin'
                hasError
                legend='Personal Details'
                margin={{ top: 'xxxl' }}
            >
                <PersonalDetailsContent hasError />
            </Fieldset>
        </>
    ),
}
