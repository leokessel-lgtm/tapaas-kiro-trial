import React from 'react'
import { DateMultiInput } from '../src'
import { DateSpecificity } from '@snsw-gel/react'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

augmentStorybookTypes(DateMultiInput)

function log(...args) {
    console.log(...args)
}

const meta: Meta<typeof DateMultiInput> = {
    title: 'Components/Dates/Date multi input',
    component: DateMultiInput,
    id: 'date-multi-input',
    args: {
        onChange: log,
        label: 'Date of birth',
        errorMessage: 'Enter the same date as shown on your driver licence.',
    },
}

export default meta

export const Default = {
    args: {
        id: 'default',
        name: 'default',
    }
}

export const InitialValue = {
    args: {
        id: 'initial-value',
        name: 'initial-value',
        defaultValue: { year: 2020, month: 2, day: 29 },
    },
}

export const ControlledDateMultiInput = {
    render: args => {
        const [dateValue, setDateValue] = React.useState({
            year: 2024,
            month: 11,
            day: 4,
        })
        return (
            <DateMultiInput
                {...args}
                id='controlled'
                name='controlled'
                value={dateValue}
                onChange={change => {
                    console.log('onChange', change)
                    setDateValue(change)
                }}
                onInput={input => {
                    console.log('onInput', input)
                }}
            />
        )
    },
}
ControlledDateMultiInput.parameters = {
    e2e: {
        enabled: false,
    },
    docs: {
        source: {
            type: 'code',
        }
    },
}

export const UncontrolledDateMultiInput = {
    render: args => {
        return (
            <DateMultiInput
                {...args}
                id='uncontrolled'
                name='uncontrolled'
                defaultValue={{
                    day: 4,
                    month: 11,
                    year: 2024,
                }}
                onChange={change => {
                    console.log('onChange', change)
                }}
                onInput={input => {
                    console.log('onInput', input)
                }}
            />
        )
    },
}
UncontrolledDateMultiInput.parameters = {
    e2e: {
        enabled: false,
    },
    docs: {
        source: {
            type: 'code',
        }
    },
}

export const HelpMessage = {
    args: {
        id: 'help-message',
        name: 'help-message',
        helpMessage: 'This date must match that on your drivers licence.',
    },
}

export const SmallLegend = {
    args: {
        id: 'small-legend',
        name: 'small-legend',
        smallLegend: true,
    },
}

export const ErrorMessage = {
    args: {
        id: 'error-message',
        name: 'error-message',
        hasError: true,
    },
}

export const Disabled = {
    render: args => {
        return (
            <DateMultiInput
                {...args}
                id='disabled'
                name='disabled'
                disabled
            />
        )
    },
}

export const HideDay = {
    args: {
        id: 'hideDay',
        name: 'hideDay',
        defaultValue: { year: 2022, month: 10 },
        errorMessage: 'Date Error Message.',
        specificity: DateSpecificity.Month,
    },
}

export const Properties = {
    args: {
        id: 'properties',
        name: 'properties',
        helpMessage: 'This date must match that on your drivers licence.',
    },
    argTypes: {
        hasError: {
            control: 'boolean',
        },
    },
}

export const VisualTestTextSpacing = {
    render: args => {
        return (
            <>
                <DateMultiInput
                    {...args}
                    id='a11y-text-spacing-ex1'
                    defaultValue={{
                        day: 29,
                        month: 2,
                        year: 2020,
                    }}
                    onChange={() => {}}
                />
                <DateMultiInput
                    {...args}
                    id='a11y-text-spacing-ex2'
                    smallLegend
                    defaultValue={{
                        day: 29,
                        month: 2,
                        year: 2020,
                    }}
                    onChange={() => {}}
                />
            </>
        )
    },
}

VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
    visual: {
        enabled: true,
    },
}

export const VrtDateMultiInput = {
    args: {
        label: 'Date of Birth',
        helpMessage: 'This date must match that on your drivers licence.',
    },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <>
            <DateMultiInput {...args} id='vrt-default' />
            <DateMultiInput
                {...args}
                id='vrt-error-small-legend'
                hasError
                smallLegend
            />
            <DateMultiInput
                {...args}
                id='vrt-initial-value-specificity'
                defaultValue={{ year: 2022, month: 10 }}
                specificity={DateSpecificity.Month}
            />
        </>
    ),
}
