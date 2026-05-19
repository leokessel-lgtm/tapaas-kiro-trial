import React, { ChangeEvent, ComponentPropsWithoutRef, Ref } from 'react'
import { flags, SelectWrapper } from './Select.styled'
import { forwarded, useControllableValue, useId } from '@snsw-gel/utils'
import { clsFlags, vars } from '@snsw-gel/theming'
import classNames from 'classnames'
import { IconChevronDown } from '@snsw-gel/icons'
import { inputWidthVar, useProvidedFieldProps } from '@snsw-gel/field'
import { WithElementProps } from '@snsw-gel/types'
export interface SelectProps {
    id?: string
    value?: string
    defaultValue?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => any
    disabled?: boolean
    hasError?: boolean
    inputWidth?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    options: Array<{
        value: string
        text: string
    }>
    placeholder?: string
    className?: string
}

interface SelectElementProps
    extends WithElementProps<ComponentPropsWithoutRef<'select'>, SelectProps> {}

export const Select = forwarded(
    (props: SelectElementProps, ref: Ref<HTMLSelectElement>) => {
        const {
            name,
            inputWidth,
            placeholder = 'Select',
            options = [],
            value: propsValue,
            onChange,
            defaultValue,
            className,

            // prevent field props from going to the input
            hasError,
            label,
            errorMessage,
            helpMessage,
            isOptional,
            isRequired,
            disabled,
            id,

            ...rest
        } = useProvidedFieldProps(props)

        const [value, setValue] = useControllableValue(
            propsValue,
            (value, event: ChangeEvent<HTMLSelectElement>) => {
                onChange?.(event)
            },
            defaultValue,
            '',
        )

        const elemId = useId(id)

        const cls = classNames(
            className,
            hasError && clsFlags.error,
            !!value && flags.hasValue,
            disabled && clsFlags.disabled,
        )

        const styles = {}
        if (inputWidth) {
            Object.assign(
                styles,
                inputWidthVar.setStyle(vars.layouts.inputWidths[inputWidth]),
            )
        }

        return (
            <SelectWrapper className={cls} style={styles}>
                <select
                    id={elemId}
                    name={name}
                    value={value}
                    onChange={e => {
                        setValue?.(e.target.value, e)
                    }}
                    disabled={disabled}
                    ref={ref}
                    aria-invalid={hasError || undefined}
                    data-gel-analytics='select'
                    data-gelweb-component='select'
                    {...rest}
                >
                    {placeholder && <option value=''>{placeholder}</option>}
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
                <IconChevronDown />
            </SelectWrapper>
        )
    },
)

// @ts-ignore
Select.displayName = 'Select'
