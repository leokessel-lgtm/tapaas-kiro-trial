import React, { useState } from 'react'
import { RadioButtonList } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof RadioButtonList> = {
    title: 'Components/Radio button list',
    component: RadioButtonList,
    id: 'radio-button-list',
}

export default meta

export const Default = {
    render: args => {
        const defaultOptions = [
            { value: 'option1', label: 'Australian Passport' },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState(
            defaultOptions[0].value,
        )
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='frg01'
                name='Group 1'
                legend='Verify your second document'
                vertical={true}
                options={defaultOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
            />
        )
    },
    name: 'Default',
}

export const HelperMessage = {
    render: args => {
        const defaultOptions = [
            { value: 'option1', label: 'Australian Passport' },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState(
            defaultOptions[0].value,
        )
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='frg02'
                name='Group 2'
                legend='Verify your second document'
                vertical={true}
                options={defaultOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
            />
        )
    },
    name: 'Helper Message',
}

export const ErrorMessage = {
    render: args => {
        const defaultOptions = [
            { value: 'option1', label: 'Australian Passport' },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState()
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='frg03'
                name='Group 3'
                legend='Verify your second document'
                vertical={true}
                options={defaultOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
                errorMessage='Select an option.'
                hasError
            />
        )
    },
    name: 'Error Message',
}

export const EditorText = {
    render: args => {
        const editorOptions = [
            {
                value: 'option1',
                label: 'Australian Passport',
                editor: 'Editor text goes here.',
            },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState(
            editorOptions[0].value,
        )
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='frg04'
                name='Group 4'
                legend='Verify your second document'
                vertical={true}
                options={editorOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
            />
        )
    },
    name: 'Editor Text',
    parameters: {
        a11y: {
            config: {
                rules: [
                    {
                        id: 'aria-allowed-attr',
                        reviewOnFail: true,
                    },
                ],
            },
        },
    },
}

export const ClarifyingText = {
    render: args => {
        const clarifyOptions = [
            {
                value: 'option1',
                label: 'Australian Passport',
                clarify: 'Must be active.',
            },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState(
            clarifyOptions[1].value,
        )
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='clarifiying-text'
                name='clarifying Group'
                legend='Verify your second document'
                vertical={true}
                options={clarifyOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
            />
        )
    },
    name: 'Clarifying Text',
}

export const HorizontalOptions = {
    render: args => {
        const horizontalOptions = [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState(
            horizontalOptions[0].value,
        )
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='frg05'
                name='Group 5'
                legend='Are you aged 18 or over?'
                vertical={false}
                options={horizontalOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
            />
        )
    },
    name: 'Horizontal Options',
}

export const ChangingMargin = {
    render: args => {
        const defaultOptions = [
            { value: 'option1', label: 'Australian Passport' },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState(
            defaultOptions[0].value,
        )
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='frg06'
                name='Group 6'
                legend='Verify your second document'
                vertical={true}
                options={defaultOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
                margin={{ top: 'xxxl' }}
            />
        )
    },
    name: 'Flexible Spacing',
}

export const Disabled = {
    render: args => {
        const defaultOptions = [
            { value: 'option1', label: 'Australian Passport' },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState(
            defaultOptions[0].value,
        )
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='frg07'
                name='Group 7'
                legend='Verify your second document'
                vertical={true}
                disabled={true}
                options={defaultOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
            />
        )
    },
}

export const Controlled = {
    render: args => {
        const defaultOptions = [
            { value: 'option1', label: 'Australian Passport' },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]

        const [radioButtonValue, setRadioButtonState] = useState(
            defaultOptions[0].value,
        )
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }
        return (
            <RadioButtonList
                id='controlled'
                name='controlled group'
                legend='Verify your second document'
                vertical={true}
                options={defaultOptions}
                onChange={onChangeEvent}
                value={radioButtonValue}
                helpMessage="Select a second identity document you'd like to verify."
            />
        )
    },
    name: 'Controlled',
}

export const Uncontrolled = {
    render: args => {
        const defaultOptions = [
            { value: 'option1', label: 'Australian Passport' },
            { value: 'option2', label: 'ImmiCard' },
            { value: 'option3', label: 'Australian Citizenship Certificate' },
            { value: 'option4', label: 'Australian Travel Visa' },
        ]
        return (
            <RadioButtonList
                id='uncontrolled'
                name='uncontrolled group'
                legend='Verify your second document'
                vertical={true}
                options={defaultOptions}
                onChange={value => {
                    console.log('Uncontrolled onChange', value)
                }}
            />
        )
    },
    name: 'Uncontrolled',
}

export const Properties = {
    render: args => {
        const [radioButtonValue, setRadioButtonState] = useState(args.value)
        const onChangeEvent = v => {
            setRadioButtonState(v)
        }

        return (
            <RadioButtonList
                {...args}
                onChange={onChangeEvent}
                value={radioButtonValue}
            />
        )
    },
    name: 'Properties',
    args: {
        id: 'fieldID',
        name: 'Fieldset Name',
        legend: 'Fieldset Legend',
        errorMessage: 'Fieldset error message.',
        helpMessage: 'Fieldset help text.',
        vertical: true,
        hasError: false,
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    argTypes: {
        options: {
            name: 'options',
            description: '`array`',
            defaultValue: [
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
            ],
        },
        value: {
            name: 'value',
            type: 'string',
            defaultValue: 'option1',
        },
        onChange: {
            name: 'onChange',
            action: 'onChange has been triggered.',
        },
        margin: {
            control: {
                type: null,
            },
        },
    },
}

export const VisualTestTextSpacing = {
    render: args => {
        const defaultOptions = [
            { value: 'option1', label: 'Option 1' },
            {
                value: 'option2',
                label: 'Option 2',
                clarify: 'Clarifying text goes here.',
            },
            {
                value: 'option3',
                label: 'Option 3',
                editor: 'Editor text goes here.',
            },
            { value: 'option4', label: 'Option 4' },
        ]

        const horizontalOptions = [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
        ]

        return (
            <>
                <RadioButtonList
                    id='a11y-text-spacing-ex1'
                    legend='RadioButtonList Legend'
                    vertical={true}
                    options={defaultOptions}
                    onChange={() => {}}
                    value={defaultOptions[2].value}
                />
                <RadioButtonList
                    id='a11y-text-spacing-ex2'
                    legend='RadioButtonList Legend'
                    vertical={false}
                    options={horizontalOptions}
                    onChange={() => {}}
                    value={horizontalOptions[0].value}
                />
            </>
        )
    },
}

VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
        config: {
            rules: [
                {
                    id: 'aria-allowed-attr',
                    reviewOnFail: true,
                },
            ],
        },
    },
    visual: {
        enabled: true,
    },
}

export const VrtRadioButtonList = {
    args: {
        helpMessage: 'Help message.',
        legend: 'RadioButtonList Legend',
        vertical: true,
        errorMessage: 'Select an option.',
        options: [
            {
                value: 'option1',
                label: 'Option 1',
            },
            {
                value: 'option2',
                label: 'Option 2',
            },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <>
            <RadioButtonList {...args} />
            <RadioButtonList {...args} hasError />
        </>
    ),
}

export const VrtRadioButtonListOptions = {
    args: {
        helpMessage: 'Help message.',
        legend: 'RadioButtonList Legend',
        errorMessage: 'Select an option.',
        options: [
            {
                value: 'option1',
                label: 'Option 1',
                clarify: 'Clarifying text goes here.',
            },
            {
                value: 'option2',
                label: 'Option 2',
                editor: 'Editor text goes here.',
            },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    parameters: {
        a11y: {
            config: {
                rules: [
                    {
                        id: 'aria-allowed-attr',
                        reviewOnFail: true,
                    },
                ],
            },
        },
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <>
            <RadioButtonList {...args} vertical value='option2' />
            <RadioButtonList
                {...args}
                vertical
                value='option2'
                disabled={true}
            />
            <RadioButtonList
                {...args}
                margin={{ top: 'xxxl' }}
                options={[
                    {
                        label: 'Yes',
                        value: 'yes',
                    },
                    {
                        label: 'No',
                        value: 'no',
                    },
                ]}
            />
        </>
    ),
}
