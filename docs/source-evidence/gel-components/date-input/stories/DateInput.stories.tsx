import React, { useState } from 'react'
import { Field, Button } from '@snsw-gel/react'
import type { Meta } from '@storybook/react-vite'
import { DateInput } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'

const meta: Meta<typeof DateInput> = {
    title: 'Components/Dates/Date input',
    component: DateInput,
    id: 'date-input',
}

export default meta

export const Default = args => {
    const onChangeHandler = (event, date) => {
        console.log('onChange has been fired with ', { event, date })
    }

    return (
        <Field
            id='ex1'
            label='Date of birth'
            helpMessage='Enter using the format DD/MM/YYYY.'
        >
            <DateInput onChange={onChangeHandler} />
        </Field>
    )
}

export const TwoDigitYear = args => {
    const onChangeHandler = (event, date) => {
        console.log('onChange has been fired with ', { event, date })
    }
    return (
        <Field
            id='ex2'
            label='Expiry date'
            helpMessage='Enter using the format MM/YY.'
        >
            <DateInput
                onChange={onChangeHandler}
                dateFormat='MM/YY'
                defaultValue='07/20'
            />
        </Field>
    )
}

export const FourDigitYear = args => {
    const onChangeHandler = (event, date) => {
        console.log('onChange has been fired with ', { event, date })
    }
    return (
        <Field
            id='ex3'
            label='Expiry date'
            helpMessage='Enter using the format MM/YYYY.'
        >
            <DateInput
                onChange={onChangeHandler}
                dateFormat='MM/YYYY'
                defaultValue='07/2020'
            />
        </Field>
    )
}

export const Disabled = args => (
    <Field
        id='ex4'
        label='Date of birth'
        helpMessage='Enter using the format DD/MM/YYYY.'
    >
        <DateInput disabled />
    </Field>
)

export const HasError = args => {
    const onChangeHandler = (event, date) => {
        console.log('onChange has been fired with ', { event, date })
    }

    return (
        <Field
            id='ex5'
            label='Date of birth'
            helpMessage='Enter using the format DD/MM/YYYY.'
            errorMessage='Enter the date as DD/MM/YYYY.'
            hasError
        >
            <DateInput value='20/20/19' onChange={onChangeHandler} />
        </Field>
    )
}

export const Controlled = args => {
    const [value, setValue] = useState('23/12/2021')
    const onChangeHandler = (event, date) => {
        setValue(date.value)

        console.log('onChange has been fired with ', { event, date })
    }

    return (
        <Field
            id='ex6'
            label='Date of birth'
            helpMessage='Enter using the format DD/MM/YYYY.'
            errorMessage='Enter the date as DD/MM/YYYY.'
        >
            <DateInput value={value} onChange={onChangeHandler} />
        </Field>
    )
}

export const Uncontrolled = args => {
    const onChangeHandler = (event, date) => {
        console.log('onChange has been fired with ', { event, date })
    }

    return (
        <Field
            id='ex8'
            label='Date of birth'
            helpMessage='Enter using the format DD/MM/YYYY.'
        >
            <DateInput onChange={onChangeHandler} defaultValue='03/07/2020' />
        </Field>
    )
}

export const OnSubmitErrorHandling = args => {
    const [hasError, setError] = useState(true)
    const [dateValid, setDateValid] = useState(false)
    const [dateValue, setDateValue] = useState('23/12/21')
    const onChangeHandler = (event, date) => {
        setDateValue(date.value)
        setDateValid(date.isValid)
        console.log('onChange has been fired with ', { event, date })
    }

    const onSubmit = e => {
        e.preventDefault()
        if (dateValid) {
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Field
                id='ex6'
                label='Date of birth'
                helpMessage='Enter using the format DD/MM/YYYY.'
                errorMessage='Enter the date as DD/MM/YYYY.'
                hasError={hasError}
            >
                <DateInput value={dateValue} onChange={onChangeHandler} />
            </Field>
            <div style={{ marginTop: '20px' }}>
                <Button type='submit'>Submit</Button>
            </div>
        </form>
    )
}

export const Properties = args => {
    const [hasError, setError] = useState(false)
    const onChangeHandler = (event, date) => {
        if (date.value.length >= 10) {
            date.isValid ? setError(false) : setError(true)
        }
        console.log('onChange has been fired with ', { event, date })
    }
    return (
        <Field
            id='ex7'
            label='Label text'
            helpMessage={`Enter using the format ${args.dateFormat}`}
            errorMessage={`Enter the date as ${args.dateFormat}.`}
            hasError={hasError || args.hasError}
        >
            <DateInput onChange={onChangeHandler} {...args} />
        </Field>
    )
}

Properties.args = {
    dateFormat: 'DD/MM/YYYY',
}

export const VisualTestTextSpacing = args => {
    const onChangeHandler = (event, date) => {
        console.log('onChange has been fired with ', { event, date })
    }

    return (
        <Field id='a11y-text-spacing' label='Date of birth'>
            <DateInput value='20/20/19' onChange={onChangeHandler} />
        </Field>
    )
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

export const VrtDateInput = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <>
            <Field
                id='vrt-default'
                label='Date of birth'
                helpMessage='Enter using the format DD/MM/YYYY.'
            >
                <DateInput />
            </Field>
            <Field
                id='vrt-initial-value-error-mm-yyyy'
                label='Expiry date'
                errorMessage='Enter the date as MM/YYYY.'
                helpMessage='Enter using the format MM/YYYY.'
                hasError
            >
                <DateInput dateFormat='MM/YYYY' defaultValue='03/25' hasError />
            </Field>
            <Field
                id='vrt-disabled-mm-yy'
                label='Expiry date'
                helpMessage='Enter using the format MM/YY.'
            >
                <DateInput disabled dateFormat='MM/YY' />
            </Field>
        </>
    ),
}
