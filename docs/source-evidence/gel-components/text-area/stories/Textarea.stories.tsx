import { useState } from 'react'
import { Textarea } from '../src'
import { Field } from '@snsw-gel/react'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Textarea> = {
    title: 'Components/Textarea',
    component: Textarea,
    id: 'textarea',
    args: {
        onChange: event => {
            console.log('onChange has been fired with ', {
                event,
            })
        },
        onBlur: event => {
            console.log('onBlur has been fired with ', {
                event,
            })
        },
    },
}

export default meta

export const Default = () => (
    <Field
        label='Provide details on what you will spend the grant on'
        helpMessage='Maximum 300 characters including spaces.'
        errorMessage='Enter only 300 characters, including spaces.'
        id='ex1'
    >
        <Textarea />
    </Field>
)

export const Large = () => (
    <Field
        label='Provide details on what you will spend the grant on'
        helpMessage='Maximum 300 characters including spaces.'
        errorMessage='Enter only 300 characters, including spaces.'
        id='ex2'
    >
        <Textarea rows='large' />
    </Field>
)

export const Disabled = () => (
    <Field
        label='Provide details on what you will spend the grant on'
        helpMessage='Maximum 300 characters including spaces.'
        errorMessage='Enter only 300 characters, including spaces.'
        id='ex3'
    >
        <Textarea disabled={true} />
    </Field>
)

export const HasError = () => (
    <Field
        label='Provide details on what you will spend the grant on'
        helpMessage='Maximum 300 characters including spaces.'
        errorMessage='Enter only 300 characters, including spaces.'
        id='ex4'
        hasError={true}
    >
        <Textarea />
    </Field>
)

export const Controlled = {
    render: args => {
        const [textareaValue, setTextareaState] = useState('')
        const onChangeEvent = e => {
            setTextareaState(e.target.value)
            console.log(e.target.value)
        }
        return (
            <Field
                id='ex6'
                label='Provide details on what you will spend the grant on'
                helpMessage='Maximum 300 characters including spaces.'
                errorMessage='Enter only 300 characters, including spaces.'
            >
                <Textarea onChange={onChangeEvent} value={textareaValue} />
            </Field>
        )
    },
}
export const Uncontrolled = () => (
    <Field
        label='Provide details on what you will spend the grant on'
        helpMessage='Maximum 300 characters including spaces.'
        errorMessage='Enter only 300 characters, including spaces.'
        id='ex7'
    >
        <Textarea
            onChange={e => {
                console.log(e.target.value)
            }}
            defaultValue=''
        />
    </Field>
)

export const Properties = args => (
    <Field
        label='Field label'
        helpMessage='Field help text.'
        errorMessage='Field error message.'
        id='ex5'
        hasError={args.hasError}
    >
        <Textarea {...args} />
    </Field>
)

export const VisualTestTextSpacing = () => (
    <Field
        label='Provide details on what you will spend the grant on'
        id='a11y-text-spacing'
    >
        <Textarea value='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
    </Field>
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

export const VrtTextArea = {
    args: {
        fieldArgs: {
            label: 'Provide details on what you will spend the grant on',
            helpMessage: 'Maximum 300 characters including spaces.',
            errorMessage: 'Enter only 300 characters, including spaces.',
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
                <Textarea />
            </Field>
            {/* Disabled */}
            <Field {...args.fieldArgs} id='ex3'>
                <Textarea disabled={true} />
            </Field>
            {/* Error message */}
            <Field {...args.fieldArgs} id='ex4' hasError={true}>
                <Textarea />
            </Field>
            {/* Large */}
            <Field {...args.fieldArgs} id='ex2'>
                <Textarea rows='large' />
            </Field>
        </>
    ),
}
