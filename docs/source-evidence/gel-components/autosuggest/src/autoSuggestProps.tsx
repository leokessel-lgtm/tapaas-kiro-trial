import { InputWidthProps, InputProps } from '@snsw-gel/input'
import { OptionObject, Option } from '@snsw-gel/lists'
import { OverlayTriggerProps, PickerProps } from '@snsw-gel/utils'
import { ReactNode, useMemo, useRef, useState } from 'react'

type CustomSuggestion = {
    suggestion: string | React.ReactNode
    onClick?: () => any
}

export interface DeprecatedAutoSuggestProps<
    SuggestionType extends string | Record<PropertyKey, any> =
        | string
        | Record<PropertyKey, any>,
> extends InputWidthProps {
    /** Use if you have multiple AutoSuggest components on a single page. */
    'id'?: string
    /** A class name for the AutoSuggest wrapper. */
    'className'?: string
    /** Input name. */
    'name'?: string
    /** Initial input value, for pre-filling data. */
    'value'?: string
    /** Initial suggestion, for pre-filling data. */
    'suggestion'?: SuggestionType | null
    /** List of initial suggestions to be filtered by input value. */
    'suggestions': SuggestionType[]
    /** Append a custom suggestion to the suggestions */
    'appendedSuggestion'?: CustomSuggestion
    /** Input placeholder. */
    'placeholder'?: string
    /** Callback on selection of suggestion, returning the suggestion and input value. */
    'onSelect'?: (
        suggestion: SuggestionType | '',
        value: string,
        method: string,
    ) => any
    /** Callback on change of input, returning the suggestion and input value. */
    'onChange'?: (
        suggestion: SuggestionType | '',
        value: string,
        method: string,
    ) => any
    /** Callback on blur of input, returning the suggestion, input value and highlighted value. */
    'onBlur'?: (
        value?: string,
        highlightedValue?: string,
        suggestion?: SuggestionType | '',
    ) => any
    /** Optionally disable the input. */
    'disabled'?: boolean
    /** Set the minimum number of characters before the suggestions are displayed. */
    'minSearchChars'?: number
    /** Used to render complex suggestions. Exposes suggestion. Must return a string. */
    'renderCustomSuggestion'?: (
        suggestion: Exclude<SuggestionType, string>,
    ) => ReactNode
    /** Used to filter complex suggestions based on input value. Exposes input value and reason. Must return an array. */
    'filterCustomSuggestions'?: (
        inputValue: string,
        reason: string,
    ) => SuggestionType[]
    // eslint-disable-next-line max-len
    /** Used to set the input value when user highlights complex suggestion using keyboard. Exposes input value. Must return a string. */
    'getCustomSuggestion'?: (
        suggestion: Exclude<SuggestionType, string>,
    ) => string

    'aria-required'?: boolean
    'aria-describedby'?: string
    'hasError'?: boolean
}

export interface AutoSuggestProps
    extends InputWidthProps,
        Omit<
            InputProps,
            'onChange' | 'value' | 'defaultValue' | 'onChange' | 'onInput'
        >,
        OverlayTriggerProps {
    /** Use if you have multiple AutoSuggest components on a single page. */
    id?: string
    /** A class name for the AutoSuggest wrapper. */
    className?: string
    /** Input name. */
    name?: string

    /** Input placeholder. */
    placeholder?: string

    /** Initial input value */
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void

    selected?: string
    onSelectionChange?: (selection: string | null) => void
    defaultSelected?: string

    appendedOption?:
        | string
        | (Omit<OptionObject, 'value'> & {
              value?: OptionObject['value']
          })

    options?: Array<Option>
    defaultOptions?: Array<Option>

    defaultFilter?: (options: Array<Option>, value: string) => Array<Option>

    /** Set the minimum number of characters before the suggestions are displayed. */
    minSearchChars?: number

    /**
     * Set this to `false` to only allow the user to select values from the dropdown.
     * This makes the input more like a select than an input.
     * @default true */
    allowCustomValue?: boolean

    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void

    getInputValueFromSelected?: PickerProps<string>['getInputValueFromSelected']
    getSelectedFromInputValue?: PickerProps<string>['getSelectedFromInputValue']
}

function isDeprecatedAutoSuggestProps(
    props: any,
): props is DeprecatedAutoSuggestProps<any> {
    if (
        [
            'suggestions',
            'appendedSuggestion',
            'renderCustomSuggestion',
            'filterCustomSuggestions',
            'getCustomSuggestion',
        ].some(key => key in props)
    ) {
        return true
    }

    return false
}

export function useConvertedDeprecatedProps(
    props: DeprecatedAutoSuggestProps<any> | AutoSuggestProps,
): AutoSuggestProps & {
    ON_LEGACY_COMPAT_HIGHLIGHTED?: (value: string | null) => any
    ON_LEGACY_COMPAT_REASON?: (value: string) => void
} {
    if (isDeprecatedAutoSuggestProps(props)) {
        const {
            onChange,
            onBlur,
            value,
            getCustomSuggestion,
            filterCustomSuggestions,
            appendedSuggestion,
            renderCustomSuggestion,
            suggestions,
            onSelect,
            suggestion,
            ...rest
        } = props

        /** This is used when value is undefined */
        const [innerValue, setInnerValue] = useState(value || '')

        const highlightedRef = useRef<string | null>('')
        const reasonRef = useRef<string>('')

        const filteredSuggestions = useMemo(
            () =>
                filterCustomSuggestions ?
                    filterCustomSuggestions(
                        (value === undefined ? innerValue : value) || '',
                        reasonRef.current,
                    )
                :   suggestions,
            [suggestions, value, innerValue, filterCustomSuggestions],
        )

        const options = useMemo(() => {
            return filteredSuggestions.map(suggestion => {
                let result: Option

                if (typeof suggestion !== 'string') {
                    result = {
                        label:
                            renderCustomSuggestion ?
                                renderCustomSuggestion(suggestion)
                            :   suggestion.text,
                        value:
                            getCustomSuggestion ?
                                getCustomSuggestion(suggestion)
                            :   suggestion.value,
                    }
                } else {
                    result = suggestion
                }

                return result
            })
        }, [filteredSuggestions, renderCustomSuggestion, getCustomSuggestion])

        const propsToAdd: AutoSuggestProps = {}

        if (appendedSuggestion) {
            propsToAdd.appendedOption =
                typeof appendedSuggestion === 'string' ? appendedSuggestion : (
                    {
                        label: appendedSuggestion.suggestion,
                        onSelect: appendedSuggestion.onClick,
                    }
                )
        }

        let defaultSelected = undefined

        if (typeof suggestion === 'string') {
            defaultSelected = suggestion
        } else if (
            typeof suggestion === 'object' &&
            getCustomSuggestion &&
            suggestion !== null
        ) {
            defaultSelected = getCustomSuggestion(suggestion)
        }

        return {
            ...rest,
            ...propsToAdd,
            value,
            options,
            defaultSelected,
            ON_LEGACY_COMPAT_HIGHLIGHTED(value) {
                highlightedRef.current = value
            },
            ON_LEGACY_COMPAT_REASON(value) {
                reasonRef.current = value
            },
            onChange(value) {
                setInnerValue(value)
                onChange?.(value, value, reasonRef.current)
            },
            onSelectionChange(value) {
                setInnerValue(value || '')
                onChange?.(
                    filteredSuggestions.find(suggestion =>
                        typeof suggestion === 'string' ?
                            suggestion === value
                        :   getCustomSuggestion?.(suggestion) === value,
                    ) || '',
                    value || '',
                    reasonRef.current,
                )

                onSelect?.(
                    filteredSuggestions.find(suggestion =>
                        typeof suggestion === 'string' ?
                            suggestion === value
                        :   getCustomSuggestion?.(suggestion) === value,
                    ) || '',
                    value || '',
                    reasonRef.current,
                )
            },
            onBlur(e) {
                onBlur?.(
                    value || '',
                    highlightedRef.current || value || '',
                    filteredSuggestions.find(suggestion =>
                        typeof suggestion === 'string' ?
                            suggestion === highlightedRef.current
                        :   getCustomSuggestion?.(suggestion) ===
                            highlightedRef.current,
                    ) || '',
                )
            },
        }
    }

    return props
}
