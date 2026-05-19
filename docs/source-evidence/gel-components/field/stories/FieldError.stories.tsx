import { useEffect, useRef, useState } from 'react'
import { FieldError as InlineError } from '../src'
import { Button, ErrorSummary, Field, Input } from '@snsw-gel/react'

import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof InlineError> = {
    title: 'Components/In-line error',
    component: InlineError,
    id: 'inline-error',
}

export default meta

export const Default = () => (
    <InlineError>This is an inline error message.</InlineError>
)

export const EmptyState = {
    render: () => {
        const idPrefix = 'empty-state'
        const initialFormData = {
            name: '',
            bsb: '',
            number: '',
        }

        const [accountFormData, setAccountFormData] = useState(initialFormData)
        const [accountFormDataErrors, setAccountFormDataErrors] = useState({})
        const [errorsSummary, setErrorsSummary] = useState([])

        const errorSummaryRef = useRef(null)
        const handleInputChange = (name: string, event) => {
            setAccountFormData({
                ...accountFormData,
                [name]: event.target.value,
            })
        }
        const hasError = (name: string) => {
            return !!accountFormDataErrors[name]
        }
        const handleOnsubmit = (e?) => {
            e?.preventDefault()

            const accountFormDataErrorsTarget: { [key: string]: string } = {}

            if (!accountFormData.name || accountFormData.name === '') {
                accountFormDataErrorsTarget['name'] = 'Enter an account name.'
            } else if (!/^[A-Za-z0-9]{1,32}$/.test(accountFormData.name)) {
                accountFormDataErrorsTarget['name'] =
                    'Enter only letters or numbers.'
            }

            if (!accountFormData.bsb || accountFormData.bsb === '') {
                accountFormDataErrorsTarget['bsb'] = 'Enter a BSB number.'
            } else if (!/^[0-9]{6}$/.test(accountFormData.bsb)) {
                accountFormDataErrorsTarget['bsb'] = 'Enter 6 digits only.'
            }

            if (!accountFormData.number || accountFormData.number === '') {
                accountFormDataErrorsTarget['number'] =
                    'Enter an account number.'
            } else if (!/^[0-9]{5,9}$/.test(accountFormData.number)) {
                accountFormDataErrorsTarget['number'] =
                    'Enter 5 to 9 digits only.'
            }

            setAccountFormDataErrors(accountFormDataErrorsTarget)

            const fieldMap: { [key: string]: string } = {
                name: 'Account name',
                bsb: 'BSB',
                number: 'Account number',
            }
            setErrorsSummary(
                Object.keys(accountFormDataErrorsTarget).map(key => ({
                    id: `${idPrefix}-${key}`,
                    text: fieldMap[key],
                })),
            )
        }

        useEffect(() => {
            handleOnsubmit()
        }, [])

        return (
            <form onSubmit={handleOnsubmit}>
                <ErrorSummary errors={errorsSummary} ref={errorSummaryRef} />
                <Field
                    id={`${idPrefix}-name`}
                    label='Account name'
                    helpMessage='Enter a maximum of 32 characters with no symbols.'
                    errorMessage={accountFormDataErrors['name'] ?? ''}
                    required={true}
                    hasError={hasError('name')}
                >
                    <Input
                        onChange={e => handleInputChange('name', e)}
                        value={accountFormData.name || ''}
                    />
                </Field>
                <Field
                    id={`${idPrefix}-bsb`}
                    label='BSB'
                    helpMessage='Enter 6 digits with no spaces or symbols.'
                    errorMessage={accountFormDataErrors['bsb'] ?? ''}
                    required={true}
                    hasError={hasError('bsb')}
                >
                    <Input
                        onChange={e => handleInputChange('bsb', e)}
                        value={accountFormData.bsb || ''}
                    />
                </Field>
                <Field
                    id={`${idPrefix}-number`}
                    label='Account number'
                    helpMessage='Enter 5 to 9 digits with no spaces or symbols.'
                    errorMessage={accountFormDataErrors['number'] ?? ''}
                    required={true}
                    hasError={hasError('number')}
                >
                    <Input
                        onChange={e => handleInputChange('number', e)}
                        value={accountFormData.number || ''}
                    />
                </Field>
                <br />
                <Button type='submit'>Submit</Button>
            </form>
        )
    },
}

export const InvalidState = {
    render: () => {
        const idPrefix = 'invalid-state'
        const initialFormData = {
            name: 'amb3r 65',
            bsb: '56437282',
            number: '231',
        }

        const [accountFormData, setAccountFormData] = useState(initialFormData)
        const [accountFormDataErrors, setAccountFormDataErrors] = useState({})
        const [errorsSummary, setErrorsSummary] = useState([])

        const errorSummaryRef = useRef(null)
        const handleInputChange = (name: string, event) => {
            setAccountFormData({
                ...accountFormData,
                [name]: event.target.value,
            })
        }
        const hasError = (name: string) => {
            return !!accountFormDataErrors[name]
        }
        const handleOnsubmit = (e?) => {
            e?.preventDefault()

            const accountFormDataErrorsTarget: { [key: string]: string } = {}

            if (!accountFormData.name || accountFormData.name === '') {
                accountFormDataErrorsTarget['name'] = 'Enter an account name.'
            } else if (!/^[A-Za-z0-9]{1,32}$/.test(accountFormData.name)) {
                accountFormDataErrorsTarget['name'] =
                    'Enter only letters or numbers.'
            }

            if (!accountFormData.bsb || accountFormData.bsb === '') {
                accountFormDataErrorsTarget['bsb'] = 'Enter a BSB number.'
            } else if (!/^[0-9]{6}$/.test(accountFormData.bsb)) {
                accountFormDataErrorsTarget['bsb'] = 'Enter 6 digits only.'
            }

            if (!accountFormData.number || accountFormData.number === '') {
                accountFormDataErrorsTarget['number'] =
                    'Enter an account number.'
            } else if (!/^[0-9]{5,9}$/.test(accountFormData.number)) {
                accountFormDataErrorsTarget['number'] =
                    'Enter 5 to 9 digits only.'
            }

            setAccountFormDataErrors(accountFormDataErrorsTarget)

            const fieldMap: { [key: string]: string } = {
                name: 'Account name',
                bsb: 'BSB',
                number: 'Account number',
            }
            setErrorsSummary(
                Object.keys(accountFormDataErrorsTarget).map(key => ({
                    id: `${idPrefix}-${key}`,
                    text: fieldMap[key],
                })),
            )
        }

        useEffect(() => {
            handleOnsubmit()
        }, [])

        return (
            <form onSubmit={handleOnsubmit}>
                <ErrorSummary errors={errorsSummary} ref={errorSummaryRef} />
                <Field
                    id={`${idPrefix}-name`}
                    label='Account name'
                    helpMessage='Enter a maximum of 32 characters with no symbols.'
                    errorMessage={accountFormDataErrors['name'] ?? ''}
                    required={true}
                    hasError={hasError('name')}
                >
                    <Input
                        onChange={e => handleInputChange('name', e)}
                        value={accountFormData.name || ''}
                    />
                </Field>
                <Field
                    id={`${idPrefix}-bsb`}
                    label='BSB'
                    helpMessage='Enter 6 digits with no spaces or symbols.'
                    errorMessage={accountFormDataErrors['bsb'] ?? ''}
                    required={true}
                    hasError={hasError('bsb')}
                >
                    <Input
                        onChange={e => handleInputChange('bsb', e)}
                        value={accountFormData.bsb || ''}
                    />
                </Field>
                <Field
                    id={`${idPrefix}-number`}
                    label='Account number'
                    helpMessage='Enter 5 to 9 digits with no spaces or symbols.'
                    errorMessage={accountFormDataErrors['number'] ?? ''}
                    required={true}
                    hasError={hasError('number')}
                >
                    <Input
                        onChange={e => handleInputChange('number', e)}
                        value={accountFormData.number || ''}
                    />
                </Field>
                <br />
                <Button type='submit'>Submit</Button>
            </form>
        )
    },
}

export const Properties = args => <InlineError {...args} />

Properties.args = {
    children: 'Inline error message.',
}

export const VrtInlineError = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => <InlineError>This is an inline error message.</InlineError>,
}
