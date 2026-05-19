import React, { useState } from 'react'
import { Checkbox } from '../src'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

augmentStorybookTypes(Checkbox)

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox single',
    component: Checkbox,
    id: 'checkbox-single',
}

export default meta

const log =
    fn =>
    (...args) => {
        console.log(...args)
        return fn(...args)
    }

export const Default = args => {
    const [value, setValue] = useState<boolean>()
    return (
        <Checkbox
            {...args}
            id='checkbox-default'
            name='Checkbox name'
            label='I agree with the Service NSW T&Cs.'
            value='Checkbox value'
            errorMessage='Agree to the terms and conditions to continue.'
            data-testid='Some ID'
            onChange={log(setValue)}
            checked={value}
        />
    )
}

export const Optional = args => {
    const [value, setValue] = useState<boolean>()

    return (
        <Checkbox
            {...args}
            id='optional'
            name='Checkbox name'
            label='I agree with the Service NSW T&Cs'
            value='Checkbox value'
            errorMessage='Agree to the terms and conditions to continue.'
            data-testid='Some ID'
            onChange={log(setValue)}
            checked={value}
            isOptional
        />
    )
}

export const AdditionalAriaDescribedby = ({
    id = 'fieldID8',
    name = 'Checkbox name',
    label = 'I agree with the Service NSW T&Cs.',
    value = 'Checkbox value',
    errorMessage = 'Agree to the terms and conditions to continue.',
    'aria-describedby': ariaDescribedBy = 'checkboxHelpText',
    ...args
}) => (
    <>
        <Checkbox
            id={id}
            name={name}
            label={label}
            value={value}
            errorMessage={errorMessage}
            aria-describedby={ariaDescribedBy}
            {...args}
        />
        <p id={ariaDescribedBy}>
            By selecting to update, you agree to the{' '}
            <a href='.' style={{ textDecoration: 'underline' }}>
                Terms and Conditions
            </a>
            .
        </p>
        <a
            target='_blank'
            href='https://www.service.nsw.gov.au/how-fix-incorrect-details-your-myservicensw-account#how-to-remove-and-add-services'
            rel='noreferrer'
            style={{ textDecoration: 'underline' }}
        >
            Are these details not yours?
        </a>
    </>
)

export const WithDisabled = args => {
    const [value, setValue] = useState<boolean>(true)

    return (
        <Checkbox
            {...args}
            id='disabled'
            name='Checkbox name'
            label='I agree with the Service NSW T&Cs.'
            value='Checkbox value'
            errorMessage='Agree to the terms and conditions to continue.'
            onChange={log(setValue)}
            checked={value}
            disabled
        />
    )
}

export const WithErrorMessage = args => {
    const [value, setValue] = useState<boolean>(true)

    return (
        <Checkbox
            {...args}
            id='err'
            name='Checkbox name'
            label='I agree with the Service NSW T&Cs.'
            value='Checkbox value'
            errorMessage='Agree to the terms and conditions to continue.'
            hasError
            onChange={log(setValue)}
            checked={value}
        />
    )
}

export const WithChangingMargin = args => {
    const [value, setValue] = useState<boolean>(true)

    return (
        <Checkbox
            {...args}
            id='margin'
            name='Checkbox name'
            label='I agree with the Service NSW T&Cs.'
            value='Checkbox value'
            errorMessage='Agree to the terms and conditions to continue.'
            onChange={log(setValue)}
            checked={value}
            margin={{ top: 'xxxl' }}
        />
    )
}

export const Controlled = args => {
    const [value, setValue] = useState<boolean>()
    return (
        <Checkbox
            {...args}
            id='checkbox-default'
            name='Checkbox name'
            label='I agree with the Service NSW T&Cs.'
            value='Controlled checkbox value'
            errorMessage='Agree to the terms and conditions to continue.'
            data-testid='Some ID'
            onChange={log(setValue)}
            checked={value}
        />
    )
}

export const Uncontrolled = args => {
    return (
        <Checkbox
            {...args}
            id='checkbox-uncontrolled'
            name='Checkbox name'
            label='I agree with the Service NSW T&Cs.'
            value='Uncontrolled checkbox value'
            errorMessage='Agree to the terms and conditions to continue.'
            data-testid='Some ID'
            onChange={value => console.log(value)}
            defaultChecked={true}
        />
    )
}

export const Properties = {
    args: {
        value: 'Checkbox Value',
        label: 'I agree with the Service NSW T&Cs.',
        errorMessage: 'Agree to the terms and conditions to continue.',
    },
    argTypes: {
        'aria-describedby': {
            description:
                'Adds an additional `aria-describedby` to the element `string`',
        },
        'checked': {
            control: 'boolean',
        },
        'defaultChecked': {
            control: 'boolean',
        },
        'disabled': {
            control: 'boolean',
        },
        'hasError': {
            control: 'boolean',
        },
        'isOptional': {
            control: 'boolean',
        },
    },
}

export const VisualTestTextSpacing = args => {
    const [value, setValue] = useState<boolean>(true)

    return (
        <Checkbox
            {...args}
            id='a11y-text-spacing'
            name='Checkbox name'
            label='I agree with the Service NSW T&Cs.'
            value='Checkbox value'
            onChange={log(setValue)}
            checked={value}
        />
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

export const VrtCheckbox = {
    args: {
        label: 'I agree with the Service NSW T&Cs.',
        errorMessage: 'Agree to the terms and conditions to continue.',
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            <Checkbox {...args} id='vrt-default' />
            <Checkbox {...args} id='vrt-disabled' disabled />
            <Checkbox {...args} id='vrt-disabled-checked' disabled checked />
            <Checkbox
                {...args}
                id='vrt-optional-checked-margin'
                label='I agree with the Service NSW T&Cs'
                isOptional
                checked
                margin={{ top: 'xxxl' }}
            />
            <Checkbox {...args} id='vrt-error-checked' hasError checked />
        </>
    ),
}
