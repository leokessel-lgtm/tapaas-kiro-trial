import React, { ComponentPropsWithoutRef, Ref, useRef } from 'react'
import { DateContainer, CellMonth } from './DateMultiInput.styled'
import { Fieldset, FieldsetProps } from '@snsw-gel/fieldset'
import {
    bindRefs,
    forwarded,
    useControllableValue,
    useId,
    useLazyRef,
    useUpdate,
    copyTo,
} from '@snsw-gel/utils'
import { Field, FieldLabelProps } from '@snsw-gel/field'
import { Select } from '@snsw-gel/select'
import { Input } from '@snsw-gel/input'
import {
    DateSpecificity,
    Day,
    isSpecificity,
    Months,
    createEmptyDate,
    DateTypes,
    matchesSpec,
} from '@snsw-gel/dates'
import { WithElementProps } from '@snsw-gel/types'
import { getDateAsString } from './getDateAsString'

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: '' + i,
    text: Months[i],
}))

export interface DateMultiInputProps<Specificity extends DateSpecificity>
    extends FieldLabelProps,
        Omit<FieldsetProps, 'legend'> {
    id?: string
    value?: DateTypes[Specificity] | null
    onChange?: (value: DateTypes[Specificity] | null) => any
    defaultValue?: DateTypes[Specificity] | null
    onInput?: (value: string) => any
    disabled?: boolean
    name?: string
    required?: boolean
    /**
     * Use the DateSpecificity enum from `@snsw-gel/dates` to specify the level of specificity
     * eg. `specificity={DateSpecificity.Month}` will show the month and year fields
     * @default DateSpecificity.Day
     */
    specificity?: Specificity
}

export interface DateMultiInputElementProps<
    Specificity extends DateSpecificity = DateSpecificity.Day,
> extends WithElementProps<
        ComponentPropsWithoutRef<'fieldset'>,
        DateMultiInputProps<Specificity>
    > {}

export const DateMultiInput = forwarded(
    <Specificity extends DateSpecificity = DateSpecificity.Day>(
        props: DateMultiInputElementProps<Specificity>,
        ref: Ref<HTMLFieldSetElement>,
    ) => {
        const {
            className,
            id: outerId,
            name,
            label,
            disabled = false,
            helpMessage,
            errorMessage,
            hasError = false,
            smallLegend,
            specificity = DateSpecificity.Day as Specificity,
            value: propsDate,
            onChange: onDateChange,
            defaultValue: defaultDate,
            onInput: onFieldInput,
            ...rest
        } = props

        const [date, setDate] = useControllableValue(
            propsDate,
            onDateChange,
            defaultDate,
            null,
        )

        const update = useUpdate()

        const temporaryValue = useLazyRef(() =>
            createEmptyDate(specificity, String),
        )

        const lastReceivedRef = useRef<typeof date>(null)

        if (lastReceivedRef.current !== date) {
            lastReceivedRef.current = date

            if (date) {
                // When we have a valid value we update the placeholder date
                for (const field in date) {
                    if (
                        Object.hasOwn(date, field) &&
                        Object.hasOwn(temporaryValue.current, field)
                    ) {
                        // @ts-ignore
                        temporaryValue.current[field] = String(date[field])
                    }
                }
            }
        }

        const id = useId(outerId)

        const idDay = `${id}-day`
        const idMonth = `${id}-month`
        const idYear = `${id}-year`

        const fieldsetRef = useRef<HTMLFieldSetElement>(null)

        const showDay = matchesSpec(specificity, DateSpecificity.Day)
        const showMonth = matchesSpec(specificity, DateSpecificity.Month)

        const onChangeField =
            (field: keyof Day) =>
            (
                next:
                    | string
                    | React.ChangeEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLSelectElement>,
            ) => {
                const nextDate = {
                    ...(date || temporaryValue.current),
                    [field]: next,
                }

                const everyFilled = isSpecificity(nextDate, specificity)

                copyTo(temporaryValue.current, nextDate, String)

                const filled = copyTo({}, nextDate, String) as any

                if (everyFilled) {
                    setDate(filled)
                } else {
                    setDate(null)
                    update()
                }

                onFieldInput?.(getDateAsString(temporaryValue.current as any))
            }

        function getFieldValue(key: keyof Day) {
            if (date) {
                if (typeof (date as any)[key] === 'number') {
                    return String((date as any)[key])
                } else {
                    return (date as any)[key] || ''
                }
            } else {
                if (typeof (temporaryValue.current as any)[key] === 'number') {
                    return String((temporaryValue.current as any)[key])
                } else {
                    return (temporaryValue.current as any)[key] || ''
                }
            }
        }

        return (
            <Fieldset
                {...rest}
                ref={bindRefs(ref, fieldsetRef)}
                legend={label}
                hasError={hasError}
                helpMessage={helpMessage}
                errorMessage={errorMessage}
                className={className}
                smallLegend={smallLegend}
                id={id}
                disabled={disabled}
                data-gelweb-component='date-multi-input'
            >
                <DateContainer className='date-container'>
                    {showDay && (
                        <Field label='Day' id={idDay}>
                            <Input
                                name={name ? `${name}-day` : ''}
                                value={getFieldValue('day')}
                                onChange={e =>
                                    onChangeField('day')(e.currentTarget.value)
                                }
                                type='text'
                                inputMode='numeric'
                                inputWidth='xxs'
                                pattern='[0-9]*'
                            />
                        </Field>
                    )}
                    {showMonth && (
                        <CellMonth label='Month' id={idMonth}>
                            <Select
                                name={name ? `${name}-month` : undefined}
                                options={monthOptions}
                                onChange={e =>
                                    onChangeField('month')(
                                        e.currentTarget.value,
                                    )
                                }
                                value={getFieldValue('month')}
                                inputWidth='md'
                            />
                        </CellMonth>
                    )}
                    <Field id={idYear} label='Year'>
                        <Input
                            name={name ? `${name}-year` : undefined}
                            onChange={e =>
                                onChangeField('year')(e.currentTarget.value)
                            }
                            type='text'
                            value={getFieldValue('year')}
                            inputMode='numeric'
                            inputWidth='xs'
                            pattern='[0-9]*'
                        />
                    </Field>
                    <input
                        type='hidden'
                        id={id + '-date'}
                        name={name}
                        readOnly
                        value={
                            isSpecificity(date, specificity) ?
                                getDateAsString(date)
                            :   ''
                        }
                    />
                </DateContainer>
            </Fieldset>
        )
    },
)

// @ts-ignore
DateMultiInput.displayName = 'DateMultiInput'
