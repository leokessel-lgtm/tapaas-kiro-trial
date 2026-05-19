import { useState } from 'react'
import { Field } from '@snsw-gel/field'
import { Input } from '../src'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

augmentStorybookTypes(Input)

const meta: Meta<typeof Input> = {
    title: 'Components/Text input',
    component: Input,
    id: 'text-input',
}

export default meta

export const Default = args => (
    <Field
        id='ex1'
        label='Full name'
        helpMessage="If your name appears on more than 1 line, select 'Add another line'."
        errorMessage='Enter a full name without hyphens and apostrophes.'
    >
        <Input />
    </Field>
)

export const Disabled = args => (
    <Field
        id='ex2'
        label='Full name'
        helpMessage="If your name appears on more than 1 line, select 'Add another line'."
    >
        <Input disabled />
    </Field>
)

export const HasError = args => (
    <Field
        id='ex3'
        label='Full name'
        helpMessage="If your name appears on more than 1 line, select 'Add another line'."
        errorMessage='Enter a full name without hyphens and apostrophes.'
        hasError={true}
    >
        <Input />
    </Field>
)

export const PrefixSuffix = {
    parameters: {
        a11y: {
            enabled: false,
        },
        height: undefined,
    },
    render: args => (
        <>
            <Field
                id='ex4'
                label='Vehicle'
                helpMessage='Please provide vehicle value in dollar amount'
                errorMessage='Please provide a valid number value'
            >
                <Input prefix='$' suffix='.00' value='1234' />
            </Field>
            <Field
                id='ex6'
                label='Vehicle'
                helpMessage='Please provide vehicle value in dollar amount'
                errorMessage='Please provide a valid number value'
            >
                <Input disabled prefix='$' suffix='.00' value='1234' />
            </Field>
            <Field
                id='ex7'
                label='Vehicle'
                helpMessage='Please provide vehicle value in dollar amount'
                errorMessage='Please provide a valid number value'
                hasError={true}
            >
                <Input prefix='$' suffix='.00' value='ABCD' />
            </Field>
        </>
    ),
}

export const Controlled = {
    render: args => {
        const [inputValue, setInputState] = useState('Caryn Smith')
        const onChangeEvent = e => {
            setInputState(e.target.value)
            console.log(e.target.value)
        }
        return (
            <Field
                id='ex6'
                label='Full name'
                helpMessage="If your name appears on more than 1 line, select 'Add another line'."
                errorMessage='Enter a full name without hyphens and apostrophes.'
            >
                <Input onChange={onChangeEvent} value={inputValue} />
            </Field>
        )
    },
}
export const Uncontrolled = args => (
    <Field
        id='ex7'
        label='Full name'
        helpMessage="If your name appears on more than 1 line, select 'Add another line'."
        errorMessage='Enter a full name without hyphens and apostrophes.'
    >
        <Input
            onChange={e => {
                console.log(e.target.value)
            }}
            defaultValue='Caryn Smith'
        />
    </Field>
)

export const Properties = args => (
    <Field
        id='ex5'
        label='Field label'
        helpMessage='Field help text.'
        errorMessage='Field error message.'
        hasError={args.hasError}
    >
        <Input {...args} />
    </Field>
)

export const InputWidths = args => (
    <>
        <h1>Full width</h1>
        <Field label='Vehicle' id='test1'>
            <Input prefix='$' suffix='.00' value='1234' />
        </Field>
        <Field label='Vehicle' id='test2'>
            <Input prefix='$' value='1234' />
        </Field>
        <Field label='Vehicle' id='test3'>
            <Input suffix='.00' value='1234' />
        </Field>
        <Field id='ex1' label='Full name'>
            <Input value='1234' />
        </Field>

        <h1>Extra large</h1>
        <hr />

        <Field label='Vehicle' id='test1'>
            <Input prefix='$' suffix='.00' value='1234' inputWidth='xl' />
        </Field>
        <Field label='Vehicle' id='test2'>
            <Input prefix='$' value='1234' inputWidth='xl' />
        </Field>
        <Field label='Vehicle' id='test3'>
            <Input suffix='.00' value='1234' inputWidth='xl' />
        </Field>
        <Field label='Vehicle' id='test4'>
            <Input value='1234' inputWidth='xl' />
        </Field>

        <h1>Large</h1>
        <hr />

        <Field label='Vehicle' id='test1a'>
            <Input prefix='$' suffix='.00' value='1234' inputWidth='lg' />
        </Field>
        <Field label='Vehicle' id='test2a'>
            <Input prefix='$' value='1234' inputWidth='lg' />
        </Field>
        <Field label='Vehicle' id='test3a'>
            <Input suffix='.00' value='1234' inputWidth='lg' />
        </Field>
        <Field label='Vehicle' id='test4a'>
            <Input value='1234' inputWidth='lg' />
        </Field>

        <h1>Medium</h1>
        <hr />

        <Field label='Vehicle' id='test1b'>
            <Input prefix='$' suffix='.00' value='1234' inputWidth='md' />
        </Field>
        <Field label='Vehicle' id='test2b'>
            <Input prefix='$' value='1234' inputWidth='md' />
        </Field>
        <Field label='Vehicle' id='test3b'>
            <Input suffix='.00' value='1234' inputWidth='md' />
        </Field>
        <Field label='Vehicle' id='test4b'>
            <Input value='1234' inputWidth='md' />
        </Field>

        <h1>Small</h1>
        <hr />

        <Field label='Vehicle' id='test1c'>
            <Input prefix='$' suffix='.00' value='1234' inputWidth='sm' />
        </Field>
        <Field label='Vehicle' id='test2c'>
            <Input prefix='$' value='1234' inputWidth='sm' />
        </Field>
        <Field label='Vehicle' id='test3c'>
            <Input suffix='.00' value='1234' inputWidth='sm' />
        </Field>
        <Field label='Vehicle' id='test4c'>
            <Input value='1234' inputWidth='sm' />
        </Field>

        <h1>Extra small</h1>
        <hr />

        <Field label='Vehicle' id='test1d'>
            <Input prefix='$' suffix='.00' value='1234' inputWidth='xs' />
        </Field>
        <Field label='Vehicle' id='test2d'>
            <Input prefix='$' value='1234' inputWidth='xs' />
        </Field>
        <Field label='Vehicle' id='test3d'>
            <Input suffix='.00' value='1234' inputWidth='xs' />
        </Field>
        <Field label='Vehicle' id='test4d'>
            <Input value='1234' inputWidth='xs' />
        </Field>

        <h1>Extra Extra small</h1>
        <hr />
        <Field label='Vehicle' id='test1e'>
            <Input prefix='$' suffix='.00' value='1234' inputWidth='xxs' />
        </Field>
        <Field label='Vehicle' id='test2e'>
            <Input prefix='$' value='1234' inputWidth='xxs' />
        </Field>
        <Field label='Vehicle' id='test3e'>
            <Input suffix='.00' value='1234' inputWidth='xxs' />
        </Field>
        <Field label='Vehicle' id='test4e'>
            <Input value='1234' inputWidth='xxs' />
        </Field>
    </>
)

export const VisualTestTextSpacing = {
    render: args => (
        <>
            <Field id='a11y-text-spacing1' label='Vehicle'>
                <Input value='1234' />
            </Field>
            <Field id='a11y-text-spacing2' label='Vehicle'>
                <Input prefix='$' suffix='.00' value='1234' />
            </Field>
        </>
    ),
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

export const VrtInput = {
    args: {
        fieldArgs: {
            label: 'Full Name',
            helpMessage:
                "If your name appears on more than 1 line, select 'Add another line'.",
            errorMessage: 'Enter a full name without hyphens and apostrophes.',
        },
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            <Field id='vrt-default' {...args.fieldArgs}>
                <Input />
            </Field>
            <Field
                id='vrt-initial-value-optional'
                {...args.fieldArgs}
                isOptional
            >
                <Input defaultValue='Full Name' />
            </Field>
            <Field id='vrt-disabled' {...args.fieldArgs}>
                <Input disabled />
            </Field>
            <Field id='vrt-error' {...args.fieldArgs} hasError>
                <Input hasError />
            </Field>
        </>
    ),
}
export const VrtInputPrefixSuffix = {
    args: {
        fieldArgs: {
            label: 'Vehicle',
            helpMessage: 'Please provide vehicle value in dollar amount',
            errorMessage: 'Please provide a valid number value',
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
                <Input prefix='$' suffix='.00' value='1234' />
            </Field>
            <Field {...args.fieldArgs} id='vrt-disabled'>
                <Input disabled prefix='$' suffix='.00' value='1234' />
            </Field>
            <Field {...args.fieldArgs} id='vrt-error' hasError>
                <Input prefix='$' suffix='.00' value='ABCD' />
            </Field>
        </>
    ),
}

export const VrtInputWidths = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <>
            <h1>Full width</h1>
            <Field label='Vehicle' id='test1'>
                <Input prefix='$' suffix='.00' value='1234' />
            </Field>
            <Field label='Vehicle' id='test2'>
                <Input prefix='$' value='1234' />
            </Field>
            <Field label='Vehicle' id='test3'>
                <Input suffix='.00' value='1234' />
            </Field>
            <Field id='ex1' label='Full Name'>
                <Input value='1234' />
            </Field>

            <h1>Extra large</h1>
            <hr />

            <Field label='Vehicle' id='test1'>
                <Input prefix='$' suffix='.00' value='1234' inputWidth='xl' />
            </Field>
            <Field label='Vehicle' id='test2'>
                <Input prefix='$' value='1234' inputWidth='xl' />
            </Field>
            <Field label='Vehicle' id='test3'>
                <Input suffix='.00' value='1234' inputWidth='xl' />
            </Field>
            <Field label='Vehicle' id='test4'>
                <Input value='1234' inputWidth='xl' />
            </Field>

            <h1>Large</h1>
            <hr />

            <Field label='Vehicle' id='test1a'>
                <Input prefix='$' suffix='.00' value='1234' inputWidth='lg' />
            </Field>
            <Field label='Vehicle' id='test2a'>
                <Input prefix='$' value='1234' inputWidth='lg' />
            </Field>
            <Field label='Vehicle' id='test3a'>
                <Input suffix='.00' value='1234' inputWidth='lg' />
            </Field>
            <Field label='Vehicle' id='test4a'>
                <Input value='1234' inputWidth='lg' />
            </Field>

            <h1>Medium</h1>
            <hr />

            <Field label='Vehicle' id='test1b'>
                <Input prefix='$' suffix='.00' value='1234' inputWidth='md' />
            </Field>
            <Field label='Vehicle' id='test2b'>
                <Input prefix='$' value='1234' inputWidth='md' />
            </Field>
            <Field label='Vehicle' id='test3b'>
                <Input suffix='.00' value='1234' inputWidth='md' />
            </Field>
            <Field label='Vehicle' id='test4b'>
                <Input value='1234' inputWidth='md' />
            </Field>

            <h1>Small</h1>
            <hr />

            <Field label='Vehicle' id='test1c'>
                <Input prefix='$' suffix='.00' value='1234' inputWidth='sm' />
            </Field>
            <Field label='Vehicle' id='test2c'>
                <Input prefix='$' value='1234' inputWidth='sm' />
            </Field>
            <Field label='Vehicle' id='test3c'>
                <Input suffix='.00' value='1234' inputWidth='sm' />
            </Field>
            <Field label='Vehicle' id='test4c'>
                <Input value='1234' inputWidth='sm' />
            </Field>

            <h1>Extra small</h1>
            <hr />

            <Field label='Vehicle' id='test1d'>
                <Input prefix='$' suffix='.00' value='1234' inputWidth='xs' />
            </Field>
            <Field label='Vehicle' id='test2d'>
                <Input prefix='$' value='1234' inputWidth='xs' />
            </Field>
            <Field label='Vehicle' id='test3d'>
                <Input suffix='.00' value='1234' inputWidth='xs' />
            </Field>
            <Field label='Vehicle' id='test4d'>
                <Input value='1234' inputWidth='xs' />
            </Field>

            <h1>Extra Extra small</h1>
            <hr />
            <Field label='Vehicle' id='test1e'>
                <Input prefix='$' suffix='.00' value='1234' inputWidth='xxs' />
            </Field>
            <Field label='Vehicle' id='test2e'>
                <Input prefix='$' value='1234' inputWidth='xxs' />
            </Field>
            <Field label='Vehicle' id='test3e'>
                <Input suffix='.00' value='1234' inputWidth='xxs' />
            </Field>
            <Field label='Vehicle' id='test4e'>
                <Input value='1234' inputWidth='xxs' />
            </Field>
        </>
    ),
}
