import React, {
    Ref,
    RefAttributes,
    useContext,
    useMemo,
    useRef,
    useState,
    ReactElement,
} from 'react'
import {
    FieldContext,
    inputWidthVar,
    useProvidedFieldProps,
} from '@snsw-gel/field'
import { Input } from '@snsw-gel/input'
import {
    useId,
    useComboPickerState,
    forwarded,
    useControllableValue,
} from '@snsw-gel/utils'
import { Popover } from '@snsw-gel/popover'
import { Listbox } from '@snsw-gel/listbox'
import { AutoSuggestContainer } from './AutoSuggest.styled'
import {
    Item,
    getOptionLabel,
    getOptionProps,
    getOptionValue,
    getOptionOnSelect,
} from '@snsw-gel/lists'
import { vars } from '@snsw-gel/theming'
import classNames from 'classnames'
import {
    AutoSuggestProps,
    DeprecatedAutoSuggestProps,
    useConvertedDeprecatedProps,
} from './autoSuggestProps'
import { defaultFilter, useFilter } from './defaultFilter'

export function AutoSuggestComponent(
    props: AutoSuggestProps & RefAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>,
): ReactElement
export function AutoSuggestComponent<
    OptionType extends string | Record<PropertyKey, any> =
        | string
        | Record<PropertyKey, any>,
>(
    props: DeprecatedAutoSuggestProps<OptionType> &
        RefAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>,
): ReactElement

export function AutoSuggestComponent<
    OptionType extends Record<PropertyKey, any> | string =
        | string
        | Record<PropertyKey, any>,
>(
    props:
        | (DeprecatedAutoSuggestProps<OptionType> &
              RefAttributes<HTMLInputElement>)
        | (AutoSuggestProps & RefAttributes<HTMLInputElement>),
    ref: Ref<HTMLInputElement>,
): ReactElement {
    const {
        id,
        className,
        name,

        placeholder,
        disabled = false,
        inputWidth,
        minSearchChars = 0,
        hasError,
        errorMessage,
        helpMessage,
        label,
        isOptional,
        isRequired,

        // @ts-ignore
        style: externalStyles,

        options: propsOptions,
        defaultOptions: propsDefaultOptions,
        defaultFilter: propsDefaultFilter = defaultFilter,

        value: propsInputValue,
        defaultValue: propsDefaultInputValue,
        onChange: propsOnInputChange,

        selected,
        defaultSelected,
        onSelectionChange,

        defaultOpen,
        isOpen,
        onOpenChange,

        allowCustomValue = true,

        appendedOption,

        getInputValueFromSelected,
        getSelectedFromInputValue,

        ON_LEGACY_COMPAT_HIGHLIGHTED,
        ON_LEGACY_COMPAT_REASON,

        ...rest
    } = useProvidedFieldProps(useConvertedDeprecatedProps(props))

    const { labelId } = useContext(FieldContext) || {}

    const elId = useId(id)
    const listboxId = `${elId}-listbox`

    const [inputValue, setInputValue] = useControllableValue(
        propsInputValue,
        propsOnInputChange,
        propsDefaultInputValue,
        selected || '',
    )

    const listboxRef = useRef<HTMLDivElement>(null)

    const defaultFilterRef = useRef(propsDefaultFilter)

    const defaultOptionsRef = useRef(propsDefaultOptions || [])

    const filteredOptions = useFilter(
        propsOptions || defaultOptionsRef.current,
        inputValue,
        defaultFilterRef.current,
        !propsOptions,
    )

    const options = useMemo(() => {
        if (appendedOption) {
            return [...filteredOptions, appendedOption]
        }
        return filteredOptions
    }, [filteredOptions, appendedOption])

    const combobox = useComboPickerState({
        allowsCustomValue: allowCustomValue,

        inputValue: propsInputValue,
        defaultInputValue: propsDefaultInputValue,
        onInputChange: setInputValue,

        selected,
        defaultSelected,
        onSelected: value => onSelectionChange?.(value),

        defaultOpen,
        isOpen,
        onOpenChange,

        shouldCommitOnBlur: true,
        getSelectedFromInputValue:
            getSelectedFromInputValue ||
            (inputValue => {
                if (!options) {
                    return null
                }

                for (let option of options) {
                    let value = getOptionValue(option)
                    if (value === inputValue) {
                        return value
                    }
                }

                return null
            }),
        getInputValueFromSelected:
            getInputValueFromSelected ||
            (selected => {
                return selected
            }),

        allowsEmptyCollection: false,

        hasItems: options && options?.length > 0,

        menuTrigger: 'focus',
    })

    const [focussed, setFocussedValue] = useState<string | null>(null)

    const activeDescendantRef = useRef<string | null>(null)

    function setFocussed(value: string | null) {
        combobox.setFocusedSelection(value)
        setFocussedValue(value)
        ON_LEGACY_COMPAT_HIGHLIGHTED?.(value)
    }

    const isOverflown = ({
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight,
    }: {
        clientWidth: number
        clientHeight: number
        scrollWidth: number
        scrollHeight: number
    }) => {
        return scrollHeight > clientHeight || scrollWidth > clientWidth
    }

    function moveListboxScroll(val: string | null) {
        const listbox = listboxRef.current
        const focusedItem = listbox?.querySelector(`[data-value="${val}"]`)
        const overflown =
            listbox?.parentElement ? isOverflown(listbox.parentElement) : false
        if (focusedItem && overflown) {
            focusedItem.scrollIntoView({
                block: 'nearest',
            })
        }
    }

    let shouldOpen = combobox.isOpen

    if (
        minSearchChars &&
        combobox.inputValue?.trim?.().length < minSearchChars
    ) {
        shouldOpen = false
    }

    const styles = {}
    if (inputWidth) {
        Object.assign(
            styles,
            inputWidthVar.setStyle(vars.layouts.inputWidths[inputWidth]),
        )
    }

    return (
        <AutoSuggestContainer
            className={classNames(className)}
            style={styles}
            data-combobox-container
            data-gelweb-component='auto-suggest'
        >
            <Input
                {...rest}
                placeholder={placeholder}
                ref={ref}
                id={elId}
                autoComplete='off'
                spellCheck='false'
                autoCorrect='off'
                hasError={hasError}
                aria-autocomplete='list'
                aria-expanded={shouldOpen}
                aria-controls={shouldOpen ? listboxId : undefined}
                aria-activedescendant={activeDescendantRef.current || undefined}
                role='combobox'
                disabled={disabled}
                value={combobox.inputValue}
                name={name}
                onFocus={e => {
                    rest.onFocus?.(e)
                    if (!e.defaultPrevented) {
                        combobox.setFocusedInput(true)
                    }
                }}
                onBlur={e => {
                    if (!e.defaultPrevented) {
                        if (!combobox.isOpen) {
                            setFocussed(null)
                        }

                        combobox.setFocusedInput(false)
                    }

                    rest.onBlur?.(e)
                }}
                onChange={e => {
                    ON_LEGACY_COMPAT_REASON?.('type')
                    combobox.setInputValue(e.target.value)
                }}
                onKeyDown={e => {
                    if (e.nativeEvent.isComposing) {
                        return
                    }
                    switch (e.key) {
                        case 'Enter':
                        case 'Tab':
                            if (combobox.isOpen) {
                                // prevent form submission when enter pressed while combobox is open
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                }
                                combobox.close()
                            } else {
                                combobox.commit()
                            }
                            break
                        case 'ArrowLeft':
                        case 'ArrowRight':
                            setFocussed(null)
                            break
                        case 'ArrowDown': {
                            e.preventDefault()
                            if (!combobox.isOpen) {
                                combobox.open()
                            }
                            break
                        }
                        case 'ArrowUp': {
                            e.preventDefault()
                            if (!combobox.isOpen) {
                                setFocussed(
                                    getOptionValue(options[options.length - 1]),
                                )
                                combobox.open()
                            }
                            break
                        }
                        case 'Escape': {
                            setFocussed(null)
                        }
                    }
                }}
            />
            <Popover
                onOpenChange={isOpen => {
                    if (!isOpen) {
                        combobox.close()
                    } else {
                        combobox.open()
                    }
                }}
                trapFocus={false}
                isOpen={shouldOpen}
                closeOnEscape
            >
                <Listbox
                    ref={listboxRef}
                    id={listboxId}
                    aria-labelledby={labelId}
                    onFocused={val => {
                        combobox.setFocusedSelection(val)
                        activeDescendantRef.current =
                            (val &&
                                listboxRef.current?.querySelector(
                                    `[data-value="${val}"]`,
                                )?.id) ||
                            null
                        setFocussed(val)
                        moveListboxScroll(val)
                    }}
                    virtualFocus
                    focused={focussed}
                    selected={combobox.selectedValue}
                    onSelectionChange={value => {
                        ON_LEGACY_COMPAT_REASON?.('click')
                        setFocussed(null)
                        combobox.setSelectedValue(value)
                    }}
                >
                    {options?.map(option => {
                        const value = getOptionValue(option)
                        const label = getOptionLabel(option)

                        let propsToAdd = getOptionProps(option)

                        const onSelect = getOptionOnSelect(option)

                        return (
                            <Item
                                key={value}
                                value={value}
                                onSelect={e => {
                                    if (onSelect) {
                                        onSelect(e)
                                    }
                                    if (value === combobox.selectedValue) {
                                        combobox.close()
                                    }
                                }}
                                {...propsToAdd}
                            >
                                {label}
                            </Item>
                        )
                    })}
                </Listbox>
            </Popover>
            <input
                type='hidden'
                name={props.name + '-selected'}
                value={combobox.selectedValue || ''}
            />
        </AutoSuggestContainer>
    )
}

// @ts-ignore
AutoSuggestComponent.displayName = 'AutoSuggest'

// @ts-ignore Will be fixed when we deprecate the old props
export const AutoSuggest = forwarded(
    AutoSuggestComponent,
) as unknown as typeof AutoSuggestComponent
