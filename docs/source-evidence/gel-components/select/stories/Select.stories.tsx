import { useState } from 'react'
import { Field } from '@snsw-gel/field'
import { Select } from '../src'
import { getAustralianStates } from '@snsw-gel/utils'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

augmentStorybookTypes(Select)

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
    id: 'select',
}

export default meta

const options = [
    { value: 'option1', text: 'Option 1' },
    { value: 'option2', text: 'Option 2' },
    { value: 'option3', text: 'Option 3' },
]
const SelectOptions = [
    {
        value: 'option1',
        text: 'Active and Creative Kids voucher program',
    },
    {
        value: 'option2',
        text: 'Advice for Aboriginal businesses',
    },
    {
        value: 'option3',
        text: 'Applications, licences or permits',
    },
    {
        value: 'option4',
        text: 'Disaster and emergency assistance',
    },
    {
        value: 'option5',
        text: 'Independent business advice',
    },
    {
        value: 'option6',
        text: 'Support for my business',
    },
    {
        value: 'option7',
        text: 'Women in business',
    },
    {
        value: 'option8',
        text: 'Other (please provide details)',
    },
]

export const Default = () => (
    <Field
        id='ex1'
        label='Select your venue'
        helpMessage='All inner city venues are eligible for this grant.'
        errorMessage='Select a venue.'
    >
        <Select options={options} />
    </Field>
)

export const Disabled = () => (
    <Field
        id='ex2'
        label='Select your venue'
        helpMessage='All inner city venues are eligible for this grant.'
        errorMessage='Select a venue.'
    >
        <Select options={options} disabled value='option1' />
    </Field>
)

export const HasError = () => (
    <Field
        id='ex3'
        label='Select your venue'
        helpMessage='All inner city venues are eligible for this grant.'
        errorMessage='Select a venue.'
        hasError={true}
    >
        <Select options={options} />
    </Field>
)

export const AustralianStates = () => {
    const australianStates = getAustralianStates().map(value => ({
        text: value,
        value: value,
    }))
    const onChangeHandler = value => console.log(value)

    return (
        <Field
            id='ex5'
            label='Select your state'
            errorMessage='Select a state.'
        >
            <Select
                id='ex5'
                options={australianStates}
                onChange={onChangeHandler}
            />
        </Field>
    )
}

export const Placeholder = () => (
    <Field
        id='ex6'
        label='How can we help you?'
        errorMessage='Select a option.'
    >
        <Select options={SelectOptions} placeholder="I'm looking for..." />
    </Field>
)

export const Controlled = {
    render: args => {
        const [selectValue, setSelectState] = useState('option1')
        const onChangeEvent = e => {
            setSelectState(e.target.value)
            console.log(e.target.value)
        }
        return (
            <Field
                id='ex4'
                label='How can we help you?'
                errorMessage='Select a option.'
            >
                <Select
                    options={SelectOptions}
                    onChange={onChangeEvent}
                    value={selectValue}
                />
            </Field>
        )
    },
}

export const Uncontrolled = args => (
    <Field
        id='ex7'
        label='How can we help you?'
        errorMessage='Select a option.'
    >
        <Select
            options={SelectOptions}
            onChange={e => {
                console.log(e.target.value)
            }}
            defaultValue='option2'
        />
    </Field>
)

export const Properties = {
    render: args => (
        <Field
            id='ex7'
            label='Field label'
            helpMessage='Field help text.'
            errorMessage='Field error message.'
            hasError={args.hasError}
        >
            <Select {...args} />
        </Field>
    ),
    args: {
        options: options,
    },
    argTypes: {
        options: {
            name: 'options',
            description: '`array`',
        },
    },
}

export const VisualTestTextSpacing = () => (
    <>
        <Field id='a11y-text-spacing' label='How can we help you?'>
            <Select options={SelectOptions} />
        </Field>
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

export const VrtSelect = {
    args: {
        fieldArgs: {
            label: 'Select your venue',
            helpMessage: 'All inner city venues are eligible for this grant.',
            errorMessage: 'Select a venue.',
        },
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            {/* Default */}
            <Field {...args.fieldArgs} id='ex1'>
                <Select options={options} />
            </Field>
            {/* Disabled */}
            <Field {...args.fieldArgs} id='ex2'>
                <Select options={options} disabled />
            </Field>
            {/* Error message */}
            <Field {...args.fieldArgs} id='ex3' hasError={true}>
                <Select options={options} hasError={true} />
            </Field>
            {/* Initial value */}
            <Field {...args.fieldArgs} id='ex4'>
                <Select options={options} value='option1' />
            </Field>
        </>
    ),
}
