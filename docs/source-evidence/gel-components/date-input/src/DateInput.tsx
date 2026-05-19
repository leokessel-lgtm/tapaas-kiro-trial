import React, { Ref } from 'react'
import { getFormattedDate, forwarded } from '@snsw-gel/utils'
import { useProvidedFieldProps } from '@snsw-gel/field'
import { legacyValidators } from '@snsw-gel/dates'
import { Input } from '@snsw-gel/input'

const defaultDateFormat = 'DD/MM/YYYY'

interface DateInputProps {
    id?: string
    name?: string
    value?: string
    defaultValue?: string
    disabled?: boolean
    hasError?: boolean
    inputWidth?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    dateFormat?: 'DD/MM/YYYY' | 'MM/YY' | 'MM/YYYY'
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        dateFormats: {
            isValid: boolean
            value: string
            isoDate?: string
            shortDate?: string
            longDate?: string
        },
    ) => void
}

const sizes = new Map<string, DateInputProps['inputWidth']>([
    ['MM/YY', 'xs'],
    ['MM/YYYY', 'sm'],
    ['DD/MM/YYYY', 'md'],
])

export const DateInput = forwarded(
    (props: DateInputProps, ref: Ref<HTMLInputElement>) => {
        const {
            name,
            value,
            onChange,
            disabled = false,
            hasError = false,
            inputWidth,
            defaultValue,
            dateFormat = defaultDateFormat,

            id,

            ...rest
        } = useProvidedFieldProps(props)
        const internalWidth = sizes.get(dateFormat)!

        const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value
            const isValidFormat = legacyValidators.validDateFormat(
                value,
                dateFormat,
            )
            if (isValidFormat && dateFormat === 'DD/MM/YYYY') {
                const dateArray = value.split('/')
                const isoFormat = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
                const dateFormats = {
                    isValid: true,
                    value: value,
                    isoDate: isoFormat, // YYYY-MM-DD
                    shortDate: getFormattedDate(isoFormat, 'DD/MM/YYYY'),
                    longDate: getFormattedDate(isoFormat, 'DD MMM YYYY'),
                }
                return onChange?.(event, dateFormats)
            } else if (isValidFormat) {
                const dateFormats = {
                    isValid: true,
                    value: value,
                }
                return onChange?.(event, dateFormats)
            } else {
                return onChange?.(event, { isValid: false, value: value })
            }
        }

        return (
            <Input
                {...rest}
                id={id}
                name={name}
                type='text'
                value={value}
                defaultValue={defaultValue}
                onChange={handleOnChange}
                disabled={disabled}
                hasError={hasError}
                inputWidth={inputWidth || internalWidth}
                ref={ref}
                data-gelweb-component='date-input'
            />
        )
    },
)
