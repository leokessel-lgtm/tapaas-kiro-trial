import React, { useState } from 'react'
import { Field, Button } from '@snsw-gel/react'
import { DatePicker } from '../src'
import type { Meta } from '@storybook/react-vite'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'

augmentStorybookTypes(DatePicker)

const meta: Meta<typeof DatePicker> = {
    component: DatePicker,
    title: 'Components/Dates/Calendar picker',
    parameters: {
        height: '435px',
    },
    id: 'calendar-picker',
}

export default meta

export const Default = args => {
    const [value, setValue] = useState('')
    const onChangeHandler = date => {
        console.log('onChangeHandler has been called', { date })

        setValue(date)
    }

    return (
        <div style={{ maxWidth: '416px' }}>
            <Field
                id='ex1'
                label="What's your preferred date?"
                helpMessage='Enter using the format DD/MM/YYYY.'
                errorMessage='Enter the date as DD/MM/YYYY.'
            >
                <DatePicker
                    inputValue={value}
                    onInputChange={value => onChangeHandler(value)}
                />
            </Field>
        </div>
    )
}

export const ErrorMessage = args => {
    const [value, setValue] = useState('')
    const onChangeHandler = date => {
        console.log('onChangeHandler has been called', { date })
        setValue(date)
    }
    return (
        <div style={{ maxWidth: '416px' }}>
            <Field
                id='ex2'
                label="What's your preferred date?"
                helpMessage='Enter using the format DD/MM/YYYY.'
                errorMessage='Enter the date as DD/MM/YYYY.'
                hasError
            >
                <DatePicker
                    inputValue={value}
                    onInputChange={value => onChangeHandler(value)}
                />
            </Field>
        </div>
    )
}

export const Disabled = args => (
    <div style={{ maxWidth: '416px' }}>
        <Field
            id='ex3'
            label="What's your preferred date?"
            helpMessage='Enter using the format DD/MM/YYYY.'
            errorMessage='Enter the date as DD/MM/YYYY.'
        >
            <DatePicker disabled />
        </Field>
    </div>
)

export const MinMax = args => {
    const [value, setValue] = useState('')
    const onChangeHandler = date => {
        console.log('onChangeHandler has been called', { date })
        setValue(date)
    }

    return (
        <div style={{ maxWidth: '416px' }}>
            <Field
                id='ex4'
                label="What's your preferred date?"
                helpMessage='Enter using the format DD/MM/YYYY.'
                errorMessage='Enter the date as DD/MM/YYYY.'
            >
                <DatePicker
                    inputValue={value}
                    onInputChange={value => onChangeHandler(value)}
                    min='2022-01-13'
                    max='2025-01-13'
                />
            </Field>
        </div>
    )
}

export const ControlledOnSelectionChange = args => {
    const [dateValue, setDateValue] = useState(new Date(2024, 3, 24))

    const onSelection = date => {
        console.log('onSelection has been called', date)
        setDateValue(date)
    }

    return (
        <div style={{ maxWidth: '416px' }}>
            <Field
                id='ex5'
                label="What's your preferred date?"
                helpMessage='Enter using the format DD/MM/YYYY.'
            >
                <DatePicker
                    selected={dateValue}
                    onSelectionChange={date => onSelection(date)}
                />
            </Field>
        </div>
    )
}

export const ControlledOnInputChange = args => {
    const [inputValue, setInputValue] = useState('')

    return (
        <div style={{ maxWidth: '416px' }}>
            <Field
                id='ex6'
                label="What's your preferred date?"
                helpMessage='Enter using the format DD/MM/YYYY.'
            >
                <DatePicker
                    inputValue={inputValue}
                    onInputChange={setInputValue}
                    onSelectionChange={date => {
                        if (date) {
                            console.log(date.toISOString())
                        }
                    }}
                />
            </Field>
        </div>
    )
}

export const Uncontrolled = args => {
    const onSubmit = event => {
        event.preventDefault()
        const form = document.getElementById('form')
        const formData = new FormData(form)
        console.log('Form Data:', Object.fromEntries(formData.entries()))
    }

    return (
        <form id='form' style={{ maxWidth: '416px' }} onSubmit={onSubmit}>
            <Field
                id='ex7'
                label="What's your preferred date?"
                helpMessage='Enter using the format DD/MM/YYYY.'
            >
                <DatePicker
                    // defaultSelected={new Date(2024, 11, 4)}
                    defaultInputValue='enter your date here'
                />
            </Field>
            <div style={{ marginTop: '20px' }}>
                <Button type='submit'>Submit</Button>
            </div>
        </form>
    )
}

export const Properties = args => {
    return (
        <div style={{ maxWidth: '416px' }}>
            <Field
                id='ex7'
                label="What's your preferred date?"
                helpMessage='Enter using the format DD/MM/YYYY.'
                errorMessage='Enter the date as DD/MM/YYYY.'
                hasError={args.hasError}
            >
                <DatePicker {...args} />
            </Field>
        </div>
    )
}

export const VisualTestTextSpacing = args => {
    const [value, setValue] = useState('08/08/2023')

    const onChangeHandler = value => {
        console.log('onChangeHandler has been called', value)
        setValue(value)
    }

    return (
        <div style={{ maxWidth: '416px' }}>
            <Field id='a11y-text-spacing' label="What's your preferred date?">
                <DatePicker
                    inputValue={value}
                    onInputChange={value => onChangeHandler(value)}
                    defaultOpen
                    trapFocus={false}
                />
            </Field>
        </div>
    )
}

VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
    visual: {
        pageRootElement: true,
        enabled: true,
    },
}

export const VrtDatePicker = {
    args: {
        fieldArgs: {
            label: "What's your preferred date?",
            helpMessage: 'Enter using the format DD/MM/YYYY.',
            errorMessage: 'Enter the date as DD/MM/YYYY.',
        },
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            <Field {...args.fieldArgs} id='vrt-default'>
                <DatePicker />
            </Field>
            <Field {...args.fieldArgs} id='vrt-error-initial-value' hasError>
                <DatePicker hasError defaultInputValue='23/12/21' />
            </Field>
            <Field {...args.fieldArgs} id='vrt-disabled'>
                <DatePicker disabled />
            </Field>
        </>
    ),
}

export const VrtDatePickerOpened = {
    args: {
        fieldArgs: {
            label: "What's your preferred date?",
            helpMessage: 'Enter using the format DD/MM/YYYY.',
            errorMessage: 'Enter the date as DD/MM/YYYY.',
        },
    },
    parameters: {
        visual: {
            pageRootElement: true,
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <>
            <Field {...args.fieldArgs} id='vrt-opened'>
                <DatePicker defaultOpen defaultInputValue='08/08/2023' />
            </Field>
        </>
    ),
}
