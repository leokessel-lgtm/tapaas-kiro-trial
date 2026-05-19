import React, {
    isValidElement,
    PropsWithChildren,
    ReactElement,
    Ref,
} from 'react'
import { forwarded, useId } from '@snsw-gel/utils'
import { IconNotificationError } from '@snsw-gel/icons'
import {
    FieldWrapper,
    FieldLabel,
    FieldHelp,
    FieldErrorWrapper,
} from './Field.styled'
import {
    ProvideFieldProps,
    FieldElementProps,
    useProvidedFieldProps,
    FieldContext,
} from './FieldProps'
import { clsFlags } from '@snsw-gel/theming'
import classNames from 'classnames'
import { combineAriaDescribedBy } from '@snsw-gel/accessibility'

export const FieldError = (
    props: PropsWithChildren<{ id?: string; className?: string }>,
) => {
    const { children, className, ...rest } = props
    const cls = classNames('field-error', className)
    return (
        <FieldErrorWrapper
            {...rest}
            data-gel-analytics='inline-error'
            className={cls}
        >
            <IconNotificationError />
            <span>{children}</span>
        </FieldErrorWrapper>
    )
}

/**
 * Field handles rendering label, help message, error message and children and provides accessibility props using the useLabelProps hook.
 */
function Field(props: FieldElementProps, ref: Ref<HTMLDivElement>) {
    const {
        children,
        className,
        margin,
        hasError,
        errorMessage,
        helpMessage,
        isOptional,
        isRequired,
        id,
        label,
        ['aria-describedby']: ariaDescribedBy,
        ...rest
    } = useProvidedFieldProps(props)
    const elemId = useId(id)
    const labelId = `${elemId}-label`
    const errorMessageId = `${elemId}-error`
    const helpMessageId = `${elemId}-helper`
    const showError = hasError && !!errorMessage
    const optional = isOptional && !isRequired
    const required = !isOptional && isRequired
    const showRequired =
        ((!optional || !required) && null) ||
        (required ? true : null) ||
        (optional ? false : null)
    const basePropsToProvide = {
        'label': label,
        'aria-describedby': combineAriaDescribedBy(
            ariaDescribedBy,
            hasError && errorMessage ? errorMessageId : undefined,
            helpMessage ? helpMessageId : undefined,
        ),
        'aria-required': showRequired,
        'aria-invalid': hasError ? 'true' : 'false',
    }

    const isControlElement = (type: any) =>
        (typeof type === 'string' &&
            ['input', 'select', 'textarea'].includes(type)) ||
        ['Input', 'Select', 'TextArea'].includes(type.displayName)

    // Recursively traverse children and apply props.
    // Only apply id to the first control (input/select/textarea).
    const transformChildren = (
        nodeChildren: React.ReactNode,
        state: { idAssigned: boolean },
    ): React.ReactNode => {
        return React.Children.map(nodeChildren, child => {
            if (!isValidElement(child)) {
                return child
            }

            const el = child as ReactElement<any>

            const mergedCommonProps = {
                ...el.props,
                ...basePropsToProvide,
                'aria-describedby': combineAriaDescribedBy(
                    basePropsToProvide['aria-describedby'],
                    el.props['aria-describedby'],
                ),
            }

            let nextChildren = el.props.children
            let applyId = false

            if (isControlElement(el.type)) {
                if (el.props.id === elemId) {
                    if (!state.idAssigned) state.idAssigned = true
                } else if (!state.idAssigned) {
                    if (el.props.id && el.props.id !== elemId) {
                        const controlName =
                            (el.type as any)?.displayName ?? el.type
                        console.warn(
                            `You provided a child (<${controlName} />) with an id that doesn't match the Field id. The Field component will overwrite your input id.`,
                        )
                    }
                    applyId = true
                    state.idAssigned = true
                }
            } else {
                if (nextChildren != null) {
                    nextChildren = transformChildren(nextChildren, state)
                }
            }

            const finalProps = {
                ...mergedCommonProps,
                ...(applyId ? { id: elemId } : {}),
                ...((el as any).ref ? { ref: (el as any).ref } : {}),
            }

            const newElement = React.createElement(
                el.type,
                finalProps,
                nextChildren,
            )

            return newElement
        })
    }

    const childNodes = transformChildren(children, { idAssigned: false })
    const cls = classNames('field-item', className, hasError && clsFlags.error)

    return (
        <ProvideFieldProps
            provideProps={{
                errorMessage,
                hasError,
                helpMessage,
                id: elemId,
                isOptional,
                isRequired,
                ...basePropsToProvide,
            }}
        >
            <FieldContext.Provider
                value={{
                    errorMessageId: errorMessageId,
                    helpMessageId: helpMessageId,
                    id: elemId,
                    labelId: labelId,
                }}
            >
                <FieldWrapper
                    className={cls}
                    $margin={margin}
                    ref={ref}
                    {...rest}
                    data-gelweb-component='field'
                >
                    <FieldLabel id={labelId} htmlFor={elemId}>
                        {optional ? `${label} (optional)` : label}
                    </FieldLabel>
                    {helpMessage && (
                        <FieldHelp id={helpMessageId}>{helpMessage}</FieldHelp>
                    )}
                    {childNodes}
                    {showError && (
                        <FieldError id={errorMessageId}>
                            {errorMessage}
                        </FieldError>
                    )}
                </FieldWrapper>
            </FieldContext.Provider>
        </ProvideFieldProps>
    )
}

Field.displayName = 'Field'

const _Field = forwarded(Field)
export { _Field as Field }
