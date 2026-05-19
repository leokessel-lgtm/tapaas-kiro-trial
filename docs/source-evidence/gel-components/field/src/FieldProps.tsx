import React, {
    ComponentPropsWithoutRef,
    PropsWithChildren,
    createContext,
    useContext,
    useMemo,
} from 'react'
import {
    AriaDescribedBy,
    VoiceOverString,
    WithElementProps,
} from '@snsw-gel/types'
import { combineAriaDescribedBy } from '@snsw-gel/accessibility'

type Falsy = false | null | undefined
type CoercedToBoolean = any

export interface FieldHelpMessageProps {
    helpMessage?: VoiceOverString | Falsy
}

export interface FieldErrorMessageProps {
    errorMessage?: VoiceOverString | Falsy
    hasError?: CoercedToBoolean
}

export interface FieldLabelProps {
    label: VoiceOverString
}

export interface FieldRequiredProps {
    /**
     * The `isRequired` prop is deprecated.
     *
     * `aria-required: true` on form element
     * @deprecated
     */
    isRequired?: any
    /** `aria-required: false` on form element */
    isOptional?: any
}

export interface FieldProps {
    id?: string
    disabled?: boolean
}

export interface MarginProps {
    margin?: {
        top?:
            | number
            | 'none'
            | 'xs'
            | 'sm'
            | 'md'
            | 'lg'
            | 'xl'
            | 'xxl'
            | 'xxxl'
    }
}

export interface AllFieldProps
    extends FieldProps,
        FieldHelpMessageProps,
        FieldErrorMessageProps,
        FieldLabelProps,
        MarginProps,
        FieldRequiredProps,
        AriaDescribedBy {}

export interface FieldElementProps
    extends WithElementProps<ComponentPropsWithoutRef<'div'>, AllFieldProps> {}

export const FieldPropContext = React.createContext<Partial<
    Omit<AllFieldProps, 'margin'>
> | null>(null)

export function ProvideFieldProps(
    props: PropsWithChildren<{ provideProps: Partial<AllFieldProps> }>,
) {
    const { children, provideProps } = props

    const propsToProvide = useMemo(
        () => provideProps,
        [
            provideProps.id,
            provideProps.hasError,
            provideProps.errorMessage,
            provideProps.helpMessage,
            provideProps.isRequired,
            provideProps.isOptional,
            provideProps.label,
            provideProps.disabled,
        ],
    )

    return (
        <FieldPropContext.Provider value={propsToProvide}>
            {children}
        </FieldPropContext.Provider>
    )
}

export const FieldContext = createContext<{
    labelId: string
    helpMessageId: string
    errorMessageId: string
    id: string
} | null>(null)

export function useProvidedFieldProps<
    T extends { ['aria-describedby']?: string; hasError?: boolean },
>(props?: T) {
    const parentFieldProps = useContext(FieldPropContext) || {}

    const elementProps = {
        ...props,
    } as T & {
        id?: string
        hasError?: boolean
        errorMessage?: VoiceOverString
        helpMessage?: VoiceOverString
        /**
         * The `isRequired` prop is deprecated.
         * @deprecated
         */
        isRequired?: any
        isOptional?: any
        label?: VoiceOverString
        disabled?: boolean
        ['aria-describedby']?: string
    }

    for (let key of Object.keys(parentFieldProps) as Array<
        keyof typeof parentFieldProps
    >) {
        if (elementProps[key] === undefined) {
            elementProps[key] = parentFieldProps[key]
        }
    }

    if (props?.['aria-describedby'] || parentFieldProps?.['aria-describedby']) {
        elementProps['aria-describedby'] = combineAriaDescribedBy(
            parentFieldProps?.['aria-describedby'],
            props?.['aria-describedby'],
        )
    }

    if (props && 'id' in props && props.id === '' && parentFieldProps?.id) {
        elementProps.id = parentFieldProps.id
    }

    return elementProps
}
