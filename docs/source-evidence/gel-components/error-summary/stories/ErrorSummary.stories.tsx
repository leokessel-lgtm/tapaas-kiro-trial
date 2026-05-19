import { useState, useRef, useEffect } from 'react'
import { ErrorSummary } from '../src'
import { Button, Input, Field, RadioButtonList } from '@snsw-gel/react'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof ErrorSummary> = {
    title: 'Components/Error summary',
    component: ErrorSummary,
    id: 'error-summary',
}

export default meta

const errors = [
    { id: 'ex1', text: 'Enter an account name.' },
    { id: 'ex2', text: 'Enter a BSB.' },
    { id: 'ex3', text: 'Enter an account number.' },
]

export const Default = () => <ErrorSummary errors={errors} />

export const SingularTitle = () => {
    const errors = [
        { id: 'ex1', text: 'Add educational institution for Eleanor.' },
    ]
    return (
        <ErrorSummary
            errors={errors}
            singularTitle='Voucher Profile is not up to date'
        />
    )
}

export const PluralTitle = () => {
    const errors = [
        { id: 'ex1', text: 'Add educational institution for Chidi.' },
        {
            id: 'ex2',
            text: 'Update the Medicare card details for Chidi as they are not valid.',
        },
    ]
    return (
        <ErrorSummary
            errors={errors}
            pluralTitle='Voucher Profile is not up to date'
        />
    )
}

export const MoveFocus = () => {
    const [errorsSummary, setErrorsSummary] = useState([])
    const errorSummaryRef = useRef(null)

    useEffect(() => {
        if (errorsSummary.length) {
            errorSummaryRef.current.focus()
        }
    }, [errorsSummary])

    const showErrors = () => {
        setErrorsSummary(errors)
    }

    return (
        <>
            <ErrorSummary errors={errorsSummary} ref={errorSummaryRef} />
            <Button onClick={showErrors}>Show Error Summary</Button>
        </>
    )
}

export const ChangingHeadingElement = {
    render: args => <ErrorSummary errors={errors} headingElement='h2' />,
    parameters: {
        e2e: {
            enabled: false,
        },
    },
}

export const SingleInputField = () => {
    const [formData, setFormData] = useState({})
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)

    const handleInputChange = e => {
        setInputValue(e.target.value)
    }

    const handleOnMultiChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleErrorClick = () => {
        inputRef.current?.focus()
    }
    const RadioOptions = [
        { value: 'option1', label: 'Any day or time' },
        { value: 'option2', label: 'A specific day and time' },
    ]

    const errorsSummary = [
        { id: 'simpleInput', text: 'Enter a value.' },
        { id: 'time-0', text: 'Select a call time.' },
    ]

    return (
        <>
            <ErrorSummary
                errors={errorsSummary}
                onErrorClick={handleErrorClick}
            />
            <Field
                id='simpleInput'
                label='Enter a name'
                hasError={true}
                errorMessage='Enter a value.'
            >
                <Input
                    id='simpleInput'
                    value={inputValue}
                    onChange={handleInputChange}
                    ref={inputRef}
                />
            </Field>

            <RadioButtonList
                name='time'
                label='multi input'
                legend='When should we call you during the week?'
                vertical={true}
                options={RadioOptions}
                onChange={value => handleOnMultiChange('time', value)}
                value={''}
                id='time'
                hasError={true}
                errorMessage='Select a call time.'
            />
        </>
    )
}

export const Properties = args => <ErrorSummary {...args} />

Properties.args = {
    errors: [
        { id: 'ex1', text: 'Enter an account name.' },
        { id: 'ex2', text: 'Enter a BSB.' },
        { id: 'ex3', text: 'Enter an account number.' },
    ],
}

Properties.argTypes = {
    headingElement: {
        name: 'headingElement',
        description: '`ErrorSummary` title heading level',
        options: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
        control: {
            type: 'select',
        },
        table: {
            defaultValue: { summary: `'h6'` },
        },
    },
}

export const VrtErrorSummary = {
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: () => (
        <>
            <ErrorSummary
                id='vrt-single-error'
                errors={[{ id: 'ex1', text: 'enter an account name.' }]}
            />
            <ErrorSummary
                id='vrt-multi-errors'
                errors={[
                    { id: 'ex1', text: 'Enter an account name.' },
                    { id: 'ex2', text: 'Enter a BSB.' },
                ]}
            />
        </>
    ),
}
