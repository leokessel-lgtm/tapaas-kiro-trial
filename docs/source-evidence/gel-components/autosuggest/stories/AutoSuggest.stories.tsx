import React, { useState } from 'react'
import { AutoSuggest } from '../src'
import { Field, Button, getCountries } from '@snsw-gel/react'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof AutoSuggest> = {
    title: 'Components/Autosuggest',
    component: AutoSuggest,
    id: 'autosuggest',
    render: args => {
        return (
            <Field
                id='AutoSuggestEx1Wrapper'
                label='Label text'
                helpMessage='Helper text.'
                errorMessage='Select an option.'
            >
                <AutoSuggest name='autosuggest-ex1' {...args} />
            </Field>
        )
    },
}

export default meta

export const Default = {
    parameters: {
        height: '320px',
    },
    args: {
        defaultOptions: [
            'Company 1',
            'Company 2',
            'Suggestion 1',
            'Suggestion 2',
        ],
        onSelectionChange: value => {
            console.log('onSelect has been fired with:', {
                value,
            })
        },
        onChange: value => {
            console.log('onChange has been fired with:', {
                value,
            })
        },
        onBlur: e => {
            console.log('onBlur has been fired with:', {
                e,
            })
        },
        name: 'autosuggest-ex1',
    },
}

Default.parameters = {
    height: '320px',
}

export const InitialValue = {
    parameters: {
        height: '320px',
    },
    args: {
        defaultOptions: [
            'Company 1',
            'Company 2',
            'Suggestion 1',
            'Suggestion 2',
        ],
        defaultValue: 'Company 1',
        defaultSelected: 'Company 1',
        onSelectionChange: value => {
            console.log('onSelect has been fired with:', {
                value,
            })
        },
        onChange: value => {
            console.log('onChange has been fired with:', {
                value,
            })
        },
        onBlur: e => {
            console.log('onBlur has been fired with:', {
                e,
            })
        },
    },
}

InitialValue.parameters = {
    height: '320px',
}

export const ResetSelection = args => {
    const [value, setValue] = useState('Suggestion 1')
    const [suggestion, setSelection] = useState('Suggestion 1')
    const options = ['Company 1', 'Company 2', 'Suggestion 1', 'Suggestion 2']

    const onSelect = value => {
        console.log({ value })
        setValue(value || '')
        setSelection(value)
    }

    const onChange = value => {
        console.log('onChange has been fired with:', {
            value,
        })
        setValue(value)
    }

    const onBlur = e => {
        console.log('onBlur has been fired with:', {
            e,
        })
    }

    return (
        <>
            <Field
                id='AutoSuggestEx3Wrapper'
                label='Label text'
                helpMessage='Helper text.'
                errorMessage='Select an option.'
            >
                <AutoSuggest
                    {...args}
                    name='autosuggest-ex3'
                    value={value}
                    selected={suggestion}
                    defaultOptions={options}
                    onSelectionChange={onSelect}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </Field>
            <br />
            <Button
                onClick={() => {
                    onSelect(null)
                }}
            >
                Reset Selection
            </Button>
        </>
    )
}

ResetSelection.parameters = {
    height: '320px',
}

export const CustomSuggestions = {
    parameters: {
        height: '320px',
    },
    render: args => {
        // the following options and three functions are used when dealing with more complex suggestion shapes
        const [inputValue, setInputValue] = useState(
            args.value || args.defaultValue || '',
        )
        const options = [
            { company: 'Company 1', contact: 'Tessa Tester' },
            { company: 'Company 2', contact: 'Terry Tester' },
            { company: 'Suggestion 1', contact: 'John Doe' },
            { company: 'Suggestion 2', contact: 'John Doe' },
        ]

        const renderCustomSuggestion = suggestion =>
            `${suggestion.company} (${suggestion.contact})`

        const getCustomSuggestion = suggestion => suggestion.company

        const filterCustomSuggestions = (value, reason) => {
            return options.filter(suggestion =>
                getCustomSuggestion(suggestion)
                    .toLowerCase()
                    .trim()
                    .startsWith(value.trim().toLowerCase()),
            )
        }

        const filteredOptions = filterCustomSuggestions(inputValue, '').map(
            suggestion => ({
                value: getCustomSuggestion(suggestion),
                label: renderCustomSuggestion(suggestion),
            }),
        )

        const onSelect = value => {
            console.log('onSelect has been fired with:', {
                value,
            })
        }

        const onChange = value => {
            setInputValue(value)
            console.log('onChange has been fired with:', {
                value,
            })
        }

        const onBlur = e => {
            console.log('onBlur has been fired with:', {
                e,
            })
        }

        return (
            <Field
                id='AutoSuggestEx4Wrapper'
                label='Label text'
                helpMessage='Helper text.'
                errorMessage='Select an option.'
            >
                <AutoSuggest
                    name='autosuggest-ex4'
                    options={filteredOptions}
                    value={inputValue}
                    onSelectionChange={onSelect}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </Field>
        )
    },
}

export const AppendedSuggestion = args => {
    const options = ['Company 1', 'Company 2', 'Suggestion 1', 'Suggestion 2']

    const appendedOption = {
        label: "Can't find what you're looking for? Click here.",
        onSelect: () => alert('Do something special onClick()'),
    }

    const onSelect = value => {
        console.log('onSelect has been fired with:', {
            value,
        })
    }

    const onChange = value => {
        console.log('onChange has been fired with:', {
            value,
        })
    }

    const onBlur = e => {
        console.log('onBlur has been fired with:', {
            e,
        })
    }

    return (
        <Field
            id='AutoSuggestEx5Wrapper'
            label='Label text'
            helpMessage='Helper text.'
            errorMessage='Select an option.'
        >
            <AutoSuggest
                name='autosuggest-ex5'
                defaultOptions={options}
                onSelectionChange={onSelect}
                onChange={onChange}
                onBlur={onBlur}
                appendedOption={appendedOption}
            />
        </Field>
    )
}
AppendedSuggestion.parameters = {
    height: '370px',
}

export const Countries = {
    name: 'Utilities - Countries',

    parameters: {
        height: '480px',
    },
    render: args => {
        const options = getCountries()

        const onSelect = value => {
            console.log('onSelect has been fired with:', {
                value,
            })
        }

        const onChange = value => {
            console.log('onChange has been fired with:', {
                value,
            })
        }

        const onBlur = e => {
            console.log('onBlur has been fired with:', {
                e,
            })
        }

        return (
            <Field
                id='AutoSuggestEx6Wrapper'
                label='Label text'
                helpMessage='Helper text.'
                errorMessage='Select an option.'
            >
                <AutoSuggest
                    name='autosuggest-ex6'
                    defaultOptions={options}
                    onSelectionChange={onSelect}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </Field>
        )
    },
}

export const ErrorState = args => {
    const [suggestion, setSuggestion] = useState('')
    const options = ['Company 1', 'Company 2', 'Suggestion 1', 'Suggestion 2']

    const onSelect = value => {
        setSuggestion(value)
    }

    const onChange = value => {
        setSuggestion(value)
        console.log('onChange has been fired with:', {
            suggestion,
            value,
        })
    }

    const onBlur = e => {}

    return (
        <Field
            id='AutoSuggestEx7Wrapper'
            label='Label text'
            helpMessage='Helper text.'
            errorMessage='Select an option.'
            hasError={'' === suggestion}
        >
            <AutoSuggest
                name='autosuggest-ex7'
                defaultOptions={options}
                onSelectionChange={onSelect}
                onChange={onChange}
                onBlur={onBlur}
            />
        </Field>
    )
}

ErrorState.parameters = {
    height: '320px',
}

export const DisabledState = args => {
    const options = ['Company 1', 'Company 2', 'Suggestion 1', 'Suggestion 2']

    const onChange = value => {
        console.log('onChange has been fired with:', {
            value,
        })
    }

    const onBlur = e => {
        console.log('onBlur has been fired with:', {
            e,
        })
    }

    return (
        <Field
            id='AutoSuggestEx8Wrapper'
            label='Label text'
            helpMessage='Helper text.'
            errorMessage='Select an option.'
        >
            <AutoSuggest
                name='autosuggest-ex8'
                defaultOptions={options}
                onSelectionChange={value => {
                    console.log('onSelect has been fired with:', {
                        value,
                    })
                }}
                onChange={onChange}
                onBlur={onBlur}
                disabled
            />
        </Field>
    )
}

DisabledState.parameters = {
    height: '320px',
}

export const OptionalState = args => {
    const options = ['Company 1', 'Company 2', 'Suggestion 1', 'Suggestion 2']

    const onSelect = value => {
        console.log('onSelect has been fired with:', {
            value,
        })
    }

    const onChange = value => {
        console.log('onChange has been fired with:', {
            value,
        })
    }

    const onBlur = e => {
        console.log('onBlur has been fired with:', {
            e,
        })
    }

    return (
        <Field
            id='AutoSuggestEx9Wrapper'
            label='Label text'
            helpMessage='Helper text.'
            errorMessage='Select an option.'
            isOptional
        >
            <AutoSuggest
                name='autosuggest-ex9'
                defaultOptions={options}
                onSelectionChange={onSelect}
                onChange={onChange}
                onBlur={onBlur}
            />
        </Field>
    )
}

OptionalState.parameters = {
    height: '320px',
}

export const MinSearchChars = {
    name: 'Minimum Search Characters',
    parameters: {
        height: '320px',
    },
    render: args => {
        const options = getCountries()

        const onSelect = value => {
            console.log('onSelect has been fired with:', {
                value,
            })
        }

        const onChange = value => {
            console.log('onChange has been fired with:', {
                value,
            })
        }

        const onBlur = event => {
            console.log('onBlur has been fired with:', {
                event,
            })
        }

        return (
            <Field
                id='AutoSuggestEx10Wrapper'
                label='Label text'
                helpMessage='Helper text.'
                errorMessage='Select an option.'
            >
                <AutoSuggest
                    name='autosuggest-ex10'
                    defaultOptions={options}
                    onSelectionChange={onSelect}
                    onChange={onChange}
                    onBlur={onBlur}
                    minSearchChars={3}
                />
            </Field>
        )
    },
}

export const Properties = args => {
    const onSelect = (suggestion, value) => {
        console.log('onSelect has been fired with:', { suggestion, value })
    }

    return (
        <Field
            id='AutoSuggestDefaultWrapper'
            label='Label text'
            helpMessage='Helper text.'
            errorMessage='Select an option.'
        >
            <AutoSuggest {...args} onSelectionChange={onSelect} />
        </Field>
    )
}

Properties.args = {
    options: ['Company 1', 'Company 2', 'Suggestion 1', 'Suggestion 2'],
    onSelect: (suggestion, value) =>
        console.log(`suggestion/value: ${suggestion}/${value}`),
    defaultOpen: true,
}

Properties.parameters = {
    height: '320px',
}

export const VisualTestTextSpacing = args => {
    return (
        <Field id='a11y-text-spacing' label='Label text'>
            <AutoSuggest
                {...args}
                onSelectionChange={() => {}}
                defaultValue='Company 1'
            />
        </Field>
    )
}

VisualTestTextSpacing.args = {
    options: ['Company 1', 'Company 2', 'Suggestion 1', 'Suggestion 2'],
    defaultOpen: true,
}

VisualTestTextSpacing.parameters = {
    height: '320px',
    a11y: {
        covers: ['text-spacing'],
    },
    visual: {
        enabled: true,
    },
}

VisualTestTextSpacing.decorators = [textSpacingDecorator]

export const VrtAutosuggest = {
    args: {
        fieldArgs: {
            label: 'Label text',
            helpMessage: 'Helper text.',
        },
        defaultOptions: [
            'Company 1',
            'Company 2',
            'Suggestion 1',
            'Suggestion 2',
        ],
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            <Field id='vrt-default' {...args.fieldArgs}>
                <AutoSuggest {...args} />
            </Field>
            <Field
                id='vrt-initial-value-optional'
                {...args.fieldArgs}
                isOptional
            >
                <AutoSuggest {...args} defaultValue='Company 1' />
            </Field>
            <Field id='vrt-disabled' {...args.fieldArgs}>
                <AutoSuggest {...args} disabled />
            </Field>
            <Field
                id='vrt-error'
                {...args.fieldArgs}
                errorMessage='Select an option.'
                hasError
            >
                <AutoSuggest {...args} hasError />
            </Field>
        </>
    ),
}

export const VrtDefaultOpened = {
    args: {
        fieldArgs: {
            label: 'Label text',
            helpMessage: 'Helper text.',
        },
        defaultOpen: true,
        defaultOptions: [
            'Company 1',
            'Company 2',
            'Suggestion 1',
            'Suggestion 2',
        ],
    },
    parameters: {
        height: '320px',
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <>
            <Field id='vrt-default-opened' {...args.fieldArgs}>
                <AutoSuggest {...args} />
            </Field>
        </>
    ),
}
