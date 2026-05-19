import { FocusEvent } from 'react'
import { PatternProps } from '@snsw-gel/pattern-utils'

export const manualAddressKeys = [
    'country',
    'streetAddress',
    'postcode',
    'suburb',
    'state',
] as const

export type ManualAddressValue = {
    country: string
    streetAddress: string
    postcode: string
    suburb: string
    state: string
}

export type DeprecatedManualAddressValue = {
    [key in keyof ManualAddressValue]?: {
        id: string
        value: string
        errorMessage: string
    }
}

export type ManualAddressPatternOptions = {
    state: {
        inputProps: {
            options: string[]
        }
        fieldProps: {}
    }
    postcode: {
        inputProps: {
            inputWidth: 'xs'
        }
    }
}

export interface ManualAddressProps
    extends PatternProps<ManualAddressValue, ManualAddressPatternOptions> {
    id?: string
    name?: string
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void
    value?: ManualAddressValue
    defaultValue?: ManualAddressValue
    statesOverride?: string[]
    onChange?: (
        value: ManualAddressValue,
        key: keyof ManualAddressValue,
    ) => void
}

export interface DeprecatedManualAddressProps {
    id: string
    value?: DeprecatedManualAddressValue
    onChange?: (value: DeprecatedManualAddressValue, key: string) => void
    onBlur?: (e: DeprecatedManualAddressValue, key: string) => void
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void
    statesOverride?: string[]
}

export function isDeprecatedManualAddressValue(
    value: DeprecatedManualAddressValue | ManualAddressValue,
): value is DeprecatedManualAddressValue {
    if (!value) {
        return false
    }

    if (typeof value !== 'object') {
        return false
    }

    for (const key of manualAddressKeys) {
        if (!(key in value) || typeof value[key] === 'object') {
            return true
        }
    }

    return false
}

export function isDeprecatedManualAddressProps(
    props: DeprecatedManualAddressProps | ManualAddressProps,
): props is DeprecatedManualAddressProps {
    if ('defaultValue' in props) {
        return false
    }
    if (!props.value) {
        return true
    }
    if (typeof props.value === 'object') {
        for (const key of manualAddressKeys) {
            if (!(key in props.value)) {
                return true
            }
        }
    }
    return isDeprecatedManualAddressValue(props.value)
}

function joinMap(arr: any[], joiner: (idx: number) => string) {
    let result = ''
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            if (result.length) {
                result += joiner(i - 1)
            }
            result += arr[i]
        }
    }
    return result
}
export function manualAddressToString(
    manualAddress: ManualAddressValue,
    opts?: { includeCountry?: boolean },
): string {
    const { includeCountry = true } = opts || {}

    return joinMap(
        [
            manualAddress.streetAddress,
            manualAddress.suburb,
            manualAddress.state,
            manualAddress.postcode,
            includeCountry && manualAddress.country,
        ],
        idx => {
            if (idx === 0) {
                return ', '
            }
            return ' '
        },
    )
}

export function convertDeprecatedPropsToNewProps(
    props: DeprecatedManualAddressProps | ManualAddressProps,
): ManualAddressProps {
    if (isDeprecatedManualAddressProps(props)) {
        const { value: propsValue, onChange, onBlur, ...rest } = props
        return {
            ...rest,
            onBlur(e) {
                onBlur?.(propsValue!, e.target.name)
            },
            onChange(value, key) {
                const deprecatedValue = {
                    ...propsValue,
                }

                for (const k of manualAddressKeys) {
                    if (deprecatedValue[k]?.value !== value[key]) {
                        deprecatedValue[k] = {
                            ...deprecatedValue[k],
                            value: value[k] as any,
                        } as any
                    }
                }

                onChange?.(deprecatedValue, key)
            },
            fieldConfig: {
                country: {
                    id: propsValue?.country?.id || '',
                    errorMessage: propsValue?.country?.errorMessage || '',
                    helpMessage: '',
                    hasError: !!propsValue?.country?.errorMessage,
                },
                streetAddress: {
                    id: propsValue?.streetAddress?.id || '',
                    errorMessage: propsValue?.streetAddress?.errorMessage || '',
                    helpMessage: '',
                    hasError: !!propsValue?.streetAddress?.errorMessage,
                },
                postcode: {
                    id: propsValue?.postcode?.id || '',
                    errorMessage: propsValue?.postcode?.errorMessage || '',
                    helpMessage: '',
                    hasError: !!propsValue?.postcode?.errorMessage,
                },
                suburb: {
                    id: propsValue?.suburb?.id || '',
                    errorMessage: propsValue?.suburb?.errorMessage || '',
                    helpMessage: '',
                    hasError: !!propsValue?.suburb?.errorMessage,
                },
                state: {
                    id: propsValue?.state?.id || '',
                    errorMessage: propsValue?.state?.errorMessage || '',
                    helpMessage: '',
                    hasError: !!propsValue?.state?.errorMessage,
                },
            },
            value: {
                country: propsValue?.country?.value || 'Australia',
                streetAddress: propsValue?.streetAddress?.value || '',
                postcode: propsValue?.postcode?.value || '',
                suburb: propsValue?.suburb?.value || '',
                state: propsValue?.state?.value || '',
            },
        }
    }

    return props
}
