import React from 'react'
import { Input, Field } from '@snsw-gel/react'
import type { Meta } from '@storybook/react-vite'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'

augmentStorybookTypes(Field)

const meta: Meta<typeof Field> = {
    title: 'Components/Field',
    component: Field,
    id: 'field',
    args: {
        label: 'Full name',
        helpMessage:
            "If your name appears on more than 1 line, select 'Add another line'.",
        id: 'ex-props',
        children: <Input onChange={value => console.log(value)} />,
    },
}

export default meta

export const Default = {
    args: {
        id: 'ex1',
    },
}

export const Required = {
    args: {
        isRequired: true,
        id: 'ex2',
    },
}

export const Optional = {
    args: {
        isOptional: true,
        id: 'ex3',
    },
}

export const WithHelperText = {
    args: {
        id: 'ex4',
    },
}

export const WithErrorText = {
    args: {
        errorMessage: 'Enter a full name without hyphens and apostrophes.',
        hasError: true,
        id: 'ex5',
    },
}

export const FlexibleSpacing = {
    args: {
        id: 'ex6',
        margin: { top: 'xxxl' },
    },
}

export const AdditionalAriaDescribedby = () => (
    <>
        <Field
            label='Password'
            errorMessage='Your passwords do not match.'
            hasError
            id='ex8'
        >
            <Input type='password' aria-describedby='password-restrictions' />
        </Field>
        <div id='password-restrictions'>
            <h4>Your password must have:</h4>
            <ul>
                <li>10 or more characters</li>
                <li>Upper, lowercase letters and numbers</li>
            </ul>
        </div>
    </>
)

AdditionalAriaDescribedby.parameters = {
    e2e: {
        enabled: false,
    },
}

export const Properties = {
    args: {
        id: 'ex-props',
        label: 'Field label',
        helpMessage: 'Field help text.',
        errorMessage: 'Field error message.',
        className: '',
    },
    argTypes: {
        'children': {
            control: {
                type: null,
            },
        },
        'aria-describedby': {
            description:
                'Adds an additional `aria-describedby` to the element. `string`',
        },
        'margin': {
            description:
                "`{ top?: number | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' }`",
            control: {
                type: null,
            },
        },
        'hasError': {
            description: '`any`',
            control: 'boolean',
        },
        'isRequired': {
            description:
                '⚠️ Deprecated. The `isRequired` prop is deprecated. Adds `aria-required: true` on form element. `any`',
        },
        'isOptional': {
            description: 'Adds `aria-required: false` on form element. `any`',
            control: 'boolean',
        },
    },
}

export const VisualTestTextSpacing = {
    args: {
        label: 'Label text',
        errorMessage: 'Please enter a value',
        helpMessage: 'Helper text',
        hasError: true,
        id: 'a11y-text-spacing',
    },
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

export const VrtField = {
    args: {
        label: 'Label text',
        helpMessage: 'Helper text.',
        errorMessage: 'Error message.',
        children: <Input />,
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            <Field {...args} id='vrt-optional' isOptional />
            <Field
                {...args}
                id='vrt-error-margin'
                hasError
                margin={{ top: 'xxxl' }}
            />
        </>
    ),
}
