import React, { Ref } from 'react'
import { StyledTextArea } from './TextArea.styled'
import { InputWidthProps } from '@snsw-gel/input'
import { inputWidthVar, useProvidedFieldProps } from '@snsw-gel/field'
import { vars, clsFlags } from '@snsw-gel/theming'
import { forwarded } from '@snsw-gel/utils'
import classNames from 'classnames'

export interface TextAreaProps
    extends InputWidthProps,
        Omit<React.HTMLProps<HTMLTextAreaElement>, 'rows'> {
    id?: string
    name?: string
    value?: string
    onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement>) => any
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => any
    disabled?: boolean
    hasError?: boolean
    rows?: 'small' | 'medium' | 'large'
    className?: string
}

export const TextArea = forwarded(
    (props: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
        const {
            name,
            value,
            onBlur,
            onChange,
            rows = 'small',
            inputWidth,
            // @ts-ignore
            styles: externalStyles,

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

        const sizeOptions = {
            small: 4,
            medium: 6,
            large: 8,
        }

        const rowSize = sizeOptions[rows]

        const styles = {
            ...externalStyles,
        }
        if (inputWidth) {
            Object.assign(
                styles,
                inputWidthVar.setStyle(vars.layouts.inputWidths[inputWidth]),
            )
        }

        return (
            <StyledTextArea
                id={id}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                disabled={disabled}
                hasError={hasError}
                rows={rowSize}
                inputWidth={inputWidth}
                className={classNames(
                    props.className,
                    hasError && clsFlags.error,
                )}
                ref={ref}
                style={styles}
                aria-invalid={hasError || undefined}
                {...rest}
                data-gelweb-component='text-area'
            />
        )
    },
)

//@ts-ignore
TextArea.displayName = 'TextArea'
