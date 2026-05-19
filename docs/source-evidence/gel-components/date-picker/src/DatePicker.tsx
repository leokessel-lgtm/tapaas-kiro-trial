import React, { useRef, Ref } from 'react'
import {
    DatePickerContainer,
    DatePickerButton,
    DatePickerPanel,
} from './DatePicker.styled'
import { Input, InputWidthProps } from '@snsw-gel/input'
import { legacyValidators } from '@snsw-gel/dates'
import {
    Icon,
    uiIconCalendar,
    uiIconClose,
    uiIconChevronDown,
    uiIconChevronLeft,
    uiIconChevronRight,
} from '@snsw-gel/ui-icons'
import { SROnly } from '@snsw-gel/accessibility'
import { DayPicker, DayProps, WeekdayProps } from 'react-day-picker'
import { add, format, parse, setMonth, setDate } from 'date-fns'
import {
    OverlayTriggerProps,
    useComboPickerState,
    useMatchMedia,
    useId,
    forwarded,
    bindRefs,
} from '@snsw-gel/utils'
import {
    FieldLabel,
    inputWidthVar,
    useProvidedFieldProps,
} from '@snsw-gel/field'
import { clsFlags, vars } from '@snsw-gel/theming'
import { mq } from '@snsw-gel/theming'
import { PopoverProps } from '@snsw-gel/popover'
import classNames from 'classnames'

export const createSyntheticChangeEvent = <
    T extends HTMLElement & EventTarget,
    E extends Omit<Event, 'target' | 'currentTarget'> & {
        target: T
        currentTarget: T
    },
>(
    event: E,
): React.ChangeEvent<T> => {
    let isDefaultPrevented = false
    let isPropagationStopped = false
    const preventDefault = () => {
        isDefaultPrevented = true
        event.preventDefault()
    }
    const stopPropagation = () => {
        isPropagationStopped = true
        event.stopPropagation()
    }
    return {
        nativeEvent: event,
        currentTarget: event.currentTarget,
        target: event.target,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        defaultPrevented: event.defaultPrevented,
        eventPhase: event.eventPhase,
        isTrusted: event.isTrusted,
        preventDefault,
        isDefaultPrevented: () => isDefaultPrevented,
        stopPropagation,
        isPropagationStopped: () => isPropagationStopped,
        persist: () => {},
        timeStamp: event.timeStamp,
        type: event.type,
    }
}

interface ValidDateFormat {
    isValid: true
    value: string
    isoDate: string
    shortDate: string
    longDate: string
}

interface InvalidDateFormat {
    isValid: false
    value: string
}

type DateFormats = ValidDateFormat | InvalidDateFormat

interface DatePickerProps
    extends OverlayTriggerProps,
        InputWidthProps,
        Pick<PopoverProps, 'trapFocus'> {
    id?: string
    name?: string

    disabled?: boolean

    onBlur?: (e: React.FocusEvent<HTMLInputElement>, value: DateFormats) => void
    /** Must be in IS0-8601 format: YYYY-MM-DD */
    min?: string
    /** Must be in IS0-8601 format: YYYY-MM-DD */
    max?: string
    label?: string

    showCalendar?: boolean

    /**
     * @deprecated
     * @hidden
     */
    trapFocus?: boolean

    /**
     *
     */
    selected?: Date
    defaultSelected?: Date
    onSelectionChange?: (selected: Date | null) => void

    /**
     * Value is deprecated in favor of selected and inputValue
     * @deprecated
     * */
    value?: string
    /**
     * onChange is deprecated in favor of onSelected and onInputChange
     * @deprecated
     */
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        value: DateFormats,
    ) => void

    inputValue?: string
    onInputChange?: (value: string) => void
    defaultInputValue?: string
    hasError?: boolean
}

function getIsValidFormat(value: string) {
    return legacyValidators.validDateFormat(value, 'DD/MM/YYYY')
}

function getLegacyDateValue(dateString: string) {
    const isValid = getIsValidFormat(dateString)

    let eventValue: InvalidDateFormat | ValidDateFormat = {
        isValid: false,
        value: dateString,
    }

    if (isValid) {
        const eventDate = parse(dateString, 'dd/MM/yyyy', new Date())
        eventValue = {
            isoDate: format(eventDate, 'yyyy-MM-dd'),
            isValid: true,
            longDate: format(eventDate, 'dd MMM yyyy'),
            shortDate: dateString,
            value: dateString,
        }
    }
    return eventValue
}

export const DatePicker = forwarded(
    (props: DatePickerProps, ref: Ref<HTMLInputElement>) => {
        const {
            id,
            name,
            disabled,
            onBlur,
            label,
            min,
            max,
            showCalendar = true,

            defaultOpen,
            isOpen: propsIsOpen,
            onOpenChange,

            trapFocus = true,

            value: propsValue,
            onChange,
            inputValue: propsInputValue,
            onInputChange,
            defaultInputValue,
            selected: propsSelected,
            defaultSelected,
            onSelectionChange: onSelected,
            inputWidth,
            ...rest
        } = props

        const { hasError } = useProvidedFieldProps(props)

        const internalInputRef = useRef<HTMLInputElement>(null)

        function getInputValueFromSelected(date: Date) {
            return format(date, 'dd/MM/yyyy')
        }
        const getSelectedFromInputValue = (value: string) => {
            const result =
                legacyValidators.validDateFormat(value, 'DD/MM/YYYY') ?
                    parse(value, 'dd/MM/yyyy', new Date())
                :   null
            return result
        }

        const latestOnBlurRef = useRef(onBlur)
        latestOnBlurRef.current = onBlur

        const {
            isOpen,
            open,
            close,
            toggle,
            inputValue,
            selectedValue: selectedDate,
            setInputValue,
            setSelectedValue,
            setFocusedInput,
            setOpen,
        } = useComboPickerState<Date>({
            allowsCustomValue: true,
            shouldCommitOnBlur: true,
            defaultInputValue,

            isOpen: propsIsOpen,
            onOpenChange,
            defaultOpen,

            defaultSelected,
            selected: propsSelected,
            onSelected: selected => {
                if (selected) {
                    setCurrentMonth(selected)
                }
                onSelected?.(selected)

                if (onChange) {
                    onChange(
                        {
                            target: {
                                value:
                                    selected ?
                                        getInputValueFromSelected(selected)
                                    :   inputValue,
                                name,
                                id,
                            },
                            type: 'duetChange',
                            stopPropagation: () => {},
                            preventDefault: () => {},
                        } as any,
                        getLegacyDateValue(
                            selected ?
                                getInputValueFromSelected(selected)
                            :   inputValue,
                        ),
                    )
                }
            },

            getInputValueFromSelected,
            getSelectedFromInputValue,
            inputValue: propsInputValue ?? propsValue,
            menuTrigger: 'manual',
            onInputChange: inputValue => {
                if (onInputChange) {
                    onInputChange(inputValue)
                } else if (onChange) {
                    // emulate an event
                    const changeEvent = new Event('change', {
                        bubbles: false,
                        cancelable: false,
                        composed: false,
                    })

                    Object.defineProperties(changeEvent, {
                        target: {
                            get() {
                                return internalInputRef.current!
                            },
                        },
                        currentTarget: {
                            get() {
                                return internalInputRef.current!
                            },
                        },
                        srcElement: {
                            get() {
                                return internalInputRef.current!
                            },
                        },
                    })

                    onChange(
                        // @ts-ignore
                        createSyntheticChangeEvent(changeEvent),
                        getLegacyDateValue(inputValue),
                    )
                }
            },
        })

        const [currentMonth, setCurrentMonth] = React.useState(() =>
            selectedDate ? selectedDate : new Date(),
        )

        const buttonRef = useRef(null)
        const panelRef = useRef<HTMLDivElement>(null)

        const [isMobile] = useMatchMedia(mq.max('lgMobile'))

        const labeledById = useId()

        function onInputBlurHandler() {
            if (latestOnBlurRef.current) {
                latestOnBlurRef.current(
                    {
                        target: {
                            value: inputValue,
                            name,
                            id,
                        },
                        type: 'blur',
                        stopPropagation: () => {},
                        preventDefault: () => {},
                    } as any,
                    getLegacyDateValue(inputValue),
                )
            }
        }

        const fromDate =
            min ?
                parse(min, 'yyyy-MM-dd', new Date())
            :   new Date(currentMonth.getFullYear() - 10, 0, 1)

        const toDate =
            max ?
                parse(max, 'yyyy-MM-dd', new Date())
            :   setDate(setMonth(add(new Date(), { years: 10 }), 11), 31)

        const disabledDates = {
            before: fromDate,
            after: toDate,
        }

        const styles = {}
        if (inputWidth) {
            Object.assign(
                styles,
                inputWidthVar.setStyle(vars.layouts.inputWidths[inputWidth]),
            )
        }

        const wrapperProps = {
            className: classNames('field--affix', {
                'field--full-width': !inputWidth,
            }),
            style: styles,
        }

        const buttonCls = classNames(
            hasError && clsFlags.error,
            disabled && clsFlags.disabled,
        )

        return (
            <DatePickerContainer
                {...wrapperProps}
                data-gelweb-component='date-picker'
            >
                <input
                    name={(name ? name + '-' : '') + 'date'}
                    value={
                        selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''
                    }
                    type='hidden'
                />
                <Input
                    ref={bindRefs(internalInputRef, ref)}
                    value={inputValue}
                    onChange={e => setInputValue(e.currentTarget.value)}
                    onFocus={() => {
                        setFocusedInput(true)
                    }}
                    onBlur={() => {
                        setFocusedInput(false)
                        onInputBlurHandler()
                    }}
                    id={id}
                    name={name}
                    disabled={disabled}
                    className='date-picker__input'
                    {...rest}
                />
                {showCalendar && (
                    <DatePickerButton
                        ref={buttonRef}
                        onClick={() => toggle(null, 'manual')}
                        disabled={disabled}
                        type='button'
                        className={buttonCls + ' date-picker-button'}
                    >
                        <SROnly>
                            {selectedDate ?
                                `Change date, ${format(
                                    selectedDate,
                                    'do MMMM yyyy',
                                )}`
                            :   'Choose date'}
                        </SROnly>
                        <Icon color='secondaryBlue' icon={uiIconCalendar} />
                    </DatePickerButton>
                )}
                <DatePickerPanel
                    onOpenChange={state => {
                        if (!state) {
                            close()
                        } else {
                            open()
                        }
                    }}
                    isOpen={isOpen}
                    ref={panelRef}
                    shade={isMobile}
                    closeOnEscape
                    closeOnOutsideClick
                    aria-labelledby={labeledById}
                    trapFocus={trapFocus}
                    role='dialog'
                    focusOnEnter={container =>
                        container?.querySelector(
                            '.rdp-today button, .rdp-selected button',
                        )
                    }
                    focusOnExit={() => buttonRef.current}
                >
                    <div className='date-picker__panel-header'>
                        <SROnly
                            id={labeledById}
                            aria-live='polite'
                            aria-atomic='true'
                            as='h2'
                        >
                            {format(currentMonth, 'MMMM yyyy')}
                        </SROnly>
                        <FieldLabel>{label}</FieldLabel>
                        <button onClick={() => close()} className='date-close'>
                            <Icon icon={uiIconClose} />
                            <SROnly>Close window</SROnly>
                        </button>
                    </div>
                    <DayPicker
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        mode='single'
                        disabled={disabledDates}
                        showOutsideDays
                        selected={selectedDate ?? undefined}
                        captionLayout='dropdown'
                        weekStartsOn={1}
                        aria-labelledby={labeledById}
                        onSelect={date => {
                            setSelectedValue(date || null)
                        }}
                        components={{
                            Chevron: CustomChevron,
                            Weekday: CustomWeekday,
                            Day: CustomDay,
                            DayButton: CustomDayButton,
                        }}
                        formatters={{
                            formatMonthDropdown: date => {
                                return format(date, 'MMM')
                            },
                        }}
                    />
                </DatePickerPanel>
            </DatePickerContainer>
        )
    },
)

function CustomChevron(props: any) {
    if (props.orientation === 'left') {
        return <Icon icon={uiIconChevronLeft} />
    }
    if (props.orientation === 'right') {
        return <Icon icon={uiIconChevronRight} />
    }
    return <Icon icon={uiIconChevronDown} />
}

function CustomDayButton(props: any) {
    const { day, modifiers, ...buttonProps } = props
    const {
        'aria-label': ariaLabel,
        children,
        ...filteredButtonProps
    } = buttonProps
    const ariaSelected = modifiers?.selected ? 'true' : 'false'

    const ref = React.useRef<HTMLButtonElement>(null)
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus()
    }, [modifiers.focused])

    return (
        <button
            ref={ref}
            aria-pressed={ariaSelected}
            aria-current={modifiers.today ? 'date' : undefined}
            className={`${modifiers?.today ? 'is-today' : ''}`}
            {...filteredButtonProps}
        >
            <span aria-hidden='true'>{format(day.date, 'd')}</span>
            <SROnly>{format(day.date, 'MMMM d')}</SROnly>
        </button>
    )
}

function CustomDay(props: DayProps) {
    const { ...tdProps } = props

    return <td className={tdProps.className} children={tdProps.children} />
}

function CustomWeekday(props: WeekdayProps) {
    return (
        <>
            <th scope={props.scope} className={props.className}>
                <SROnly>{props['aria-label']}</SROnly>
                <span aria-hidden='true'>{props.children}</span>
            </th>
        </>
    )
}
