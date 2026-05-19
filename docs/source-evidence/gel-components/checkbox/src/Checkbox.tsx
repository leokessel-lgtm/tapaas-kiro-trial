import React, { Ref } from 'react'
import {
    FieldError,
    FieldErrorMessageProps,
    FieldLabelProps,
    FieldProps,
    FieldRequiredProps,
    MarginProps,
} from '@snsw-gel/field'
import { forwarded, useControllableValue, useId } from '@snsw-gel/utils'
import {
    CheckboxInput,
    CheckboxWrapper,
    CheckboxLabel,
    ClarifyWrapper,
    EditorWrapper,
} from './Checkbox.styled'
import classNames from 'classnames'
import { clsFlags } from '@snsw-gel/theming'
import { combineAriaDescribedBy } from '@snsw-gel/accessibility'
import { CheckboxIndicator } from './CheckboxIndicator'
import {
    AriaDescribedBy,
    AriaInvalid,
    DataAttributeProps,
} from '@snsw-gel/types'
import { clarifySlot, editorSlot } from './CheckboxSlots'
import { Slot, useSlots } from '@snsw-gel/slots'

export interface CheckboxProps<ValueType extends string = 'on'>
    extends FieldLabelProps,
        FieldErrorMessageProps,
        MarginProps,
        DataAttributeProps,
        AriaDescribedBy,
        AriaInvalid,
        FieldRequiredProps,
        FieldProps {
    /**
     * The value that will be passed back when the checkbox is checked
     * @default on
     */
    value?: ValueType
    /**
     * Whether the input is in a checked state, the checked state will always be coerced to a Boolean internally so passing `''`, `0`, or `false` will result in an unchecked input
     */
    checked?: boolean | ValueType
    defaultChecked?: boolean | ValueType
    onBeforeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onChange?: (value: '' | ValueType) => any
    disabled?: boolean
    className?: string
    name?: string
}

export const Checkbox = forwarded(
    <ValueType extends string = 'on'>(
        props: CheckboxProps<ValueType>,
        ref?: Ref<HTMLInputElement>,
    ) => {
        const {
            className,
            id,
            name,
            label,
            checked: propsChecked,
            defaultChecked,
            value = 'on' as ValueType,
            onChange,
            hasError,
            errorMessage,
            disabled,
            margin,
            isRequired,
            isOptional,
            onBeforeChange,
            ['aria-describedby']: ariaDescribedBy,
            ['aria-invalid']: ariaInvalid,
            ...rest
        } = props

        const elemId = useId(id)
        const clarifyId = elemId + '-clarify'
        const editorId = elemId + '-editor'

        const slots = useSlots()

        /*
        Converts boolean "checked" to "checked ? value : ''"
        */
        function onChangeWrapper(checked: boolean) {
            if (onChange) {
                onChange(checked ? value : ('' as any))
            }
        }

        const [checked, setChecked] = useControllableValue<boolean>(
            propsChecked === undefined ? undefined : Boolean(propsChecked),
            onChangeWrapper,
            defaultChecked === undefined ? undefined : Boolean(defaultChecked),
            false,
        )

        const idError = `${elemId}-error`

        const showError = hasError && !!errorMessage
        const showAriaDescribedby = combineAriaDescribedBy(
            !!showError && idError,
            Boolean(slots[clarifySlot]) && clarifyId,
            Boolean(slots[editorSlot]) && editorId,
            ariaDescribedBy,
        )
        const showAriaInvalid = 'aria-invalid' in props ? ariaInvalid : hasError

        const optional = isOptional && !isRequired
        const required = !isOptional && isRequired

        const showRequired =
            ((!optional || !required) && null) ||
            (required ? true : null) ||
            (optional ? false : null)

        const labelClassNames = classNames(hasError && clsFlags.error)

        return (
            <CheckboxWrapper
                className={className}
                $margin={margin}
                data-gelweb-component='checkbox'
            >
                <CheckboxInput
                    {...rest}
                    ref={ref}
                    type='checkbox'
                    id={elemId}
                    name={name}
                    data-gel-analytics='input'
                    onChange={event => {
                        onBeforeChange?.(event)
                        if (event.defaultPrevented) {
                            return
                        }
                        setChecked(event.target?.checked)
                    }}
                    checked={checked}
                    disabled={disabled}
                    aria-invalid={!!showAriaInvalid}
                    aria-describedby={showAriaDescribedby!}
                    aria-required={showRequired!}
                    value={value}
                />
                <CheckboxLabel htmlFor={elemId} className={labelClassNames}>
                    <CheckboxIndicator checked={checked} />
                    {optional ? `${label} (optional).` : label}
                </CheckboxLabel>
                <Slot
                    name={clarifySlot}
                    props={{ id: clarifyId }}
                    wrap={ClarifyWrapper}
                />
                <Slot
                    name={editorSlot}
                    props={{ id: editorId }}
                    wrap={EditorWrapper}
                />
                {showError && (
                    <FieldError id={idError}>{errorMessage}</FieldError>
                )}
            </CheckboxWrapper>
        )
    },
)

// @ts-ignore
Checkbox.displayName = 'Checkbox'
