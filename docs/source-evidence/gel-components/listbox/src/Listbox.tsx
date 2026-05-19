import React, {
    FocusEvent,
    ReactNode,
    Ref,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'

import {
    Option,
    Options,
    find,
    getFirstOption,
    getOptionAtIndex,
    getOptionCount,
    getOptionLabel,
    getOptionProps,
    getOptionValue,
    hasOptionGroup,
    isOptionGroup,
    optionsFromChildren,
    walkOptions,
} from '@snsw-gel/lists'
import {
    bindRefs,
    forwarded,
    useControllableValue,
    useListener,
} from '@snsw-gel/utils'
import { StyledListboxContainer } from './ListBox.styled'
import { ListboxGroup, ListboxItem } from './ListboxItem'

const SHOULD_LOOP_OPTIONS_OUT_OF_BOUNDS = false
const SHOULD_LOSE_FOCUS_OUT_OF_BOUNDS = false
const SHOULD_REMOVE_SELECTION_ON_RESELECT = false

export interface ListboxPropsBase {
    'children': ReactNode
    'autoFocus'?: boolean
    'virtualFocus'?: boolean
    'id'?: string

    'focused'?: string | null
    'defaultFocused'?: string | null
    'onFocused'?: (value: string | null) => void

    'onFocus'?: (e: FocusEvent) => void
    'onBlur'?: (e: FocusEvent) => void

    'aria-labelledby'?: string
    'aria-label'?: string
    'aria-describedby'?: string

    'className'?: string
}

export interface ListboxPropsSingleSelection extends ListboxPropsBase {
    onSelectionChange?: (value: string | null) => void
    selected?: string | null
    defaultSelected?: string
    selectionMode?: 'single'
}

export interface ListboxPropsMultipleSelection extends ListboxPropsBase {
    onSelectionChange?: (value: string[] | null) => void
    selected?: string[] | null
    defaultSelected?: string[] | null
    selectionMode: 'multiple'
}

export const Listbox = forwarded(function Listbox(
    props: ListboxPropsSingleSelection | ListboxPropsMultipleSelection,
    ref: Ref<HTMLDivElement>,
) {
    const {
        onSelectionChange,
        selected: propsSelected,
        defaultSelected,
        children,
        autoFocus,
        virtualFocus,
        defaultFocused,
        focused,
        onBlur,
        onFocus,
        onFocused,
        selectionMode,
        ...rest
    } = props
    const options = optionsFromChildren(props.children)
    const hasGroup = hasOptionGroup(options)
    const length = getOptionCount(options)

    const [selected, setSelected] = useControllableValue<
        string | string[] | undefined | null
    >(
        props.selected as any,
        props.onSelectionChange as any,
        props.defaultSelected as any,
        props.selectionMode === 'multiple' ? [] : ('' as any),
    )
    const [showFocus, setShowFocus] = useState(
        props.virtualFocus ? true : false,
    )

    let initialFocus = null

    if (selected) {
        initialFocus = Array.isArray(selected) ? selected[0] : selected
    } else {
        initialFocus = getOptionValue(getFirstOption(options))
    }

    if (initialFocus === undefined) {
        initialFocus = null
    }

    const initialFocusRef = useRef(initialFocus)

    const [currentFocus, setCurrentFocus] = useControllableValue(
        props.focused,
        props.onFocused,
        props.defaultFocused,
        null,
    )
    const [prevFocus, setPrevFocus] = useState(initialFocus)
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (currentFocus !== prevFocus) {
            if (!props.virtualFocus) {
                if (currentFocus) {
                    containerRef.current
                        ?.querySelector<HTMLElement>(`[tabindex="0"]`)
                        ?.focus()
                } else {
                    containerRef.current
                        ?.querySelector<HTMLElement>('[tabindex="0"]')
                        ?.blur()
                }
            }

            if (currentFocus) {
                containerRef.current?.querySelector(
                    `[data-value="${currentFocus}"]`,
                )?.scrollTop
            }

            setPrevFocus(currentFocus)
        }
    })

    /**
     * We have to use a div for the list element if there are groups because the native ul
     * element doesn't allow anything other than li elements as children.
     */
    const ListElement = hasGroup ? 'div' : 'ul'

    function selectValue(value: string | null, opt?: Option) {
        if (opt && typeof opt !== 'string' && opt.onSelect) {
            let defaultprevented = false

            opt.onSelect({
                preventDefault() {
                    defaultprevented = true
                },
            })

            if (defaultprevented) {
                return
            }
        }

        if (typeof value === 'string') {
            if (props.selectionMode === 'multiple') {
                if (value) {
                    if (Array.isArray(selected)) {
                        const nextSelected =
                            selected.includes(value) ?
                                selected.filter(v => v !== value)
                            :   [...selected, value]
                        setSelected(nextSelected)
                    } else {
                        setSelected([value])
                    }
                } else {
                    setSelected([])
                }
            } else {
                if (value) {
                    setSelected(
                        (
                            selected === value &&
                                SHOULD_REMOVE_SELECTION_ON_RESELECT
                        ) ?
                            null
                        :   value,
                    )
                } else {
                    setSelected(null)
                }
            }
        }
    }

    let index = 0
    let currentActiveIndex: number | undefined = undefined
    function renderOptions(groupOptions: Options) {
        return groupOptions.map(option => {
            if (isOptionGroup(option)) {
                return (
                    <ListboxGroup key={option.title} title={option.title}>
                        {renderOptions(option.options)}
                    </ListboxGroup>
                )
            }

            const label = getOptionLabel(option)
            const value = getOptionValue(option)
            const additionalProps = getOptionProps(option)

            const idx = index++

            if (value === currentFocus) {
                currentActiveIndex = idx
            }

            return (
                <ListboxItem
                    {...additionalProps}
                    autoFocus={
                        props.autoFocus &&
                        !props.virtualFocus &&
                        initialFocusRef.current === value
                    }
                    index={idx}
                    length={length}
                    key={value || idx}
                    value={value}
                    selected={
                        value !== undefined &&
                        (Array.isArray(selected) ?
                            selected.includes(value)
                        :   selected === value)
                    }
                    selectionMode={props.selectionMode || 'single'}
                    focused={currentFocus}
                    showFocus={showFocus}
                    virtualFocus={props.virtualFocus}
                    nativeList={!hasGroup}
                    onFocus={e => {
                        if (props.virtualFocus) {
                            e.preventDefault()
                        }
                        setCurrentFocus(value)
                        setShowFocus(true)
                    }}
                    onMouseMove={e => {
                        setShowFocus(false)
                    }}
                    onClick={e => {
                        selectValue(value, option)
                    }}
                >
                    {label}
                </ListboxItem>
            )
        })
    }

    const onKeyDown = (e: KeyboardEvent) => {
        switch (true) {
            case e.key === 'ArrowDown':
            case e.key === 'ArrowUp':
                e.preventDefault()
                setShowFocus(true)

                let direction = e.key === 'ArrowDown' ? 1 : -1

                let nextIndex: number | null | undefined =
                    typeof currentActiveIndex === 'number' ? currentActiveIndex
                    :   null

                if (nextIndex === null) {
                    if (direction === 1) {
                        nextIndex = 0
                    } else if (direction === -1) {
                        nextIndex = length - 1
                    }
                } else {
                    nextIndex = nextIndex + direction
                }

                if (SHOULD_LOOP_OPTIONS_OUT_OF_BOUNDS) {
                    if (nextIndex! >= length) {
                        nextIndex = 0
                    }

                    if (nextIndex! < 0) {
                        nextIndex = length - 1
                    }
                }

                if (SHOULD_LOSE_FOCUS_OUT_OF_BOUNDS) {
                    if (nextIndex! < 0 || nextIndex! >= length) {
                        nextIndex = null
                    }
                }

                if (nextIndex !== null) {
                    nextIndex = Math.min(Math.max(nextIndex, 0), length - 1)
                }

                setCurrentFocus(
                    nextIndex !== null ?
                        getOptionValue(getOptionAtIndex(options, nextIndex))
                    :   null,
                )

                break
            case e.key === 'Enter' || (!props.virtualFocus && e.key === ' '):
                const opt = find(walkOptions(options), o => {
                    let value = getOptionValue(o)

                    return value !== undefined && value === currentFocus
                })

                selectValue(currentFocus, opt)
        }
    }

    useListener(
        typeof document !== 'undefined' && props.virtualFocus ? document : null,
        'keydown',
        (e: KeyboardEvent) => {
            onKeyDown(e)
        },
    )

    return (
        <StyledListboxContainer
            ref={bindRefs(containerRef, ref)}
            as={ListElement}
            onBlur={(e: any) => {
                props.onBlur?.(e)
                if (!e.defaultPrevented) {
                    setShowFocus(false)
                }
            }}
            onFocus={(e: any) => {
                props.onFocus?.(e)
            }}
            onKeyDown={
                !props.virtualFocus ?
                    (e: React.KeyboardEvent) => onKeyDown(e.nativeEvent)
                :   undefined
            }
            role='listbox'
            {...rest}
        >
            {renderOptions(options)}
        </StyledListboxContainer>
    )
})
