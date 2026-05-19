import React, { ReactElement, Ref, RefAttributes } from 'react'
import { StyledManualAddress } from './ManualAddress.styled'
import { forwarded, useControllableValue, joinDash } from '@snsw-gel/utils'

import {
    DeprecatedManualAddressProps,
    DeprecatedManualAddressValue,
    ManualAddressProps,
    ManualAddressValue,
    convertDeprecatedPropsToNewProps,
} from './manualAddressProps'
import {
    defaultFieldConfig,
    defaultFieldRenderer,
    mergeFieldConfig,
} from './manualAddressDefaultFieldConfig'
import { useManualAddress } from './useManualAddress'

function ManualAddressComponent<ValueType extends ManualAddressValue>(
    props: ManualAddressProps & RefAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>,
): ReactElement
function ManualAddressComponent<ValueType extends DeprecatedManualAddressValue>(
    props: DeprecatedManualAddressProps & RefAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>,
): ReactElement

function ManualAddressComponent<
    ValueType extends ManualAddressValue | DeprecatedManualAddressValue,
>(
    props: ValueType extends ManualAddressValue ?
        ManualAddressProps & RefAttributes<HTMLDivElement>
    :   DeprecatedManualAddressProps & RefAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>,
): ReactElement {
    const {
        id,
        value: propsValue,
        onChange,
        onBlur,
        onFocus,
        defaultValue,
        field,
        name: propsName,
        fieldConfig: propsFieldConfig,
        statesOverride,
    } = convertDeprecatedPropsToNewProps(props)

    const { australianStates } = useManualAddress(statesOverride)

    const fieldConfig = mergeFieldConfig(
        propsFieldConfig,
        defaultFieldConfig(props),
    )

    const [value, setValue] = useControllableValue(
        propsValue,
        onChange,
        defaultValue,
        {
            streetAddress: '',
            suburb: '',
            state: '',
            postcode: '',
            country: 'Australia',
        },
    )

    function renderField<Key extends keyof ManualAddressValue>(key: Key) {
        type FieldRenderProps<K extends keyof ManualAddressValue> = Parameters<
            Exclude<typeof field<K>, undefined>
        >[0]

        const fieldProps: FieldRenderProps<Key>['fieldProps'] = {
            id: fieldConfig[key].id || joinDash([id, key]),
            errorMessage: fieldConfig[key].errorMessage || '',
            helpMessage: fieldConfig[key].helpMessage || '',
            hasError:
                fieldConfig[key].hasError ||
                Boolean(fieldConfig[key].errorMessage) ||
                false,
            isOptional: fieldConfig[key].isOptional || false,
            isRequired: fieldConfig[key].isRequired || false,
            label: fieldConfig[key].label || '',
        }

        const inputProps = {
            'name': joinDash([propsName, key]) as any,
            'value': value[key] as any,
            'data-name': key,
            'onBlur': e => {
                onBlur?.(e as any)
            },
            'onFocus': e => {
                onFocus?.(e as any)
            },
            'onChange': (updatedValue: any) => {
                setValue(
                    {
                        ...value,
                        [key]: updatedValue,
                    },
                    key,
                )
            },
        } satisfies FieldRenderProps<Key>['inputProps']

        if (key === 'state') {
            ;(inputProps as FieldRenderProps<'state'>['inputProps']).options =
                australianStates
        }

        if (key === 'postcode') {
            ;(
                inputProps as FieldRenderProps<'postcode'>['inputProps']
            ).inputWidth = 'xs'
        }

        const renderProps = {
            name: key,
            fieldProps,
            inputProps,
        } as FieldRenderProps<Key>

        const userField =
            typeof field === 'function' ? field?.(renderProps) : undefined

        if (userField !== undefined) {
            return userField
        }

        return defaultFieldRenderer(renderProps)
    }

    return (
        <StyledManualAddress
            id={`${id}-australian-address`}
            ref={ref}
            data-gelweb-component='manual-address'
        >
            {renderField('streetAddress')}
            {renderField('suburb')}
            {renderField('state')}
            {renderField('postcode')}
            {renderField('country')}
        </StyledManualAddress>
    )
}

// @ts-ignore Will be fixed when we deprecate the old props
export const ManualAddress = forwarded(
    ManualAddressComponent,
) as unknown as typeof ManualAddressComponent

// @ts-ignore
ManualAddress.displayName = 'ManualAddress'
