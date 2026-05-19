import { Field } from '@snsw-gel/field'
import { Input } from '@snsw-gel/input'
import React from 'react'
import { ManualAddressProps, ManualAddressValue } from './manualAddressProps'
import { merge, joinDash } from '@snsw-gel/utils'
import { ReadonlyInput } from './ManualAddress.styled'
import { Select } from '@snsw-gel/select'

export const defaultFieldConfig = (opts: {
    id?: string
}): ManualAddressProps['fieldConfig'] => ({
    streetAddress: {
        label: 'Street address',
        isRequired: true,
        id: joinDash([opts.id, 'street-address']),
    },
    suburb: {
        label: 'Suburb',
        isRequired: true,
        id: joinDash([opts.id, 'suburb']),
    },
    state: {
        label: 'State',
        isRequired: true,
        id: joinDash([opts.id, 'state']),
    },
    postcode: {
        label: 'Postcode',
        isRequired: true,
        id: joinDash([opts.id, 'postcode']),
    },
    country: {
        label: 'Country',
        isRequired: true,
        id: joinDash([opts.id, 'country']),
    },
})

export function mergeFieldConfig(
    fieldConfig: ManualAddressProps['fieldConfig'],
    defaultFieldConfig?: ManualAddressProps['fieldConfig'],
): Required<Exclude<ManualAddressProps['fieldConfig'], undefined>> {
    return {
        country: merge(defaultFieldConfig?.country, fieldConfig?.country),
        streetAddress: merge(
            defaultFieldConfig?.streetAddress,
            fieldConfig?.streetAddress,
        ),
        postcode: merge(defaultFieldConfig?.postcode, fieldConfig?.postcode),
        suburb: merge(defaultFieldConfig?.suburb, fieldConfig?.suburb),
        state: merge(defaultFieldConfig?.state, fieldConfig?.state),
    }
}

const autoCompleteFields: {
    [key in keyof ManualAddressValue]?: string
} = {
    streetAddress: 'street-address',
    suburb: 'address-level2',
    state: 'address-level1',
    postcode: 'postal-code',
}

export function defaultFieldRenderer({
    name,
    fieldProps,
    inputProps,
}: Parameters<Exclude<ManualAddressProps['field'], undefined>>[0]) {
    if (name === 'country') {
        const { onChange, ...rest } = inputProps
        return (
            <Field {...fieldProps} label={fieldProps.label || ''}>
                <ReadonlyInput {...rest} readOnly />
            </Field>
        )
    }

    if (name === 'state') {
        const { options, ...rest } = inputProps
        return (
            <Field {...fieldProps} label={fieldProps.label || ''}>
                <Select
                    {...rest}
                    autoComplete={autoCompleteFields[name]}
                    onChange={e => inputProps.onChange(e.target.value)}
                    options={options.map(opt => {
                        if (typeof opt === 'string') {
                            return { value: opt, text: opt }
                        } else {
                            return opt
                        }
                    })}
                    inputWidth='sm'
                />
            </Field>
        )
    }

    return (
        <Field {...fieldProps} label={fieldProps.label || ''}>
            <Input
                {...inputProps}
                autoComplete={autoCompleteFields[name]}
                onChange={e => inputProps.onChange(e.target.value)}
            />
        </Field>
    )
}
