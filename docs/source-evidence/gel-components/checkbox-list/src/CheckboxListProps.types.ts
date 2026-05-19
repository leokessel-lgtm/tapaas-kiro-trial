import { FieldsetProps } from '@snsw-gel/fieldset'
import type { CheckboxProps } from '@snsw-gel/checkbox'
import { VoiceOverString } from '@snsw-gel/types'
import { FormEvent } from 'react'

export interface CheckboxListOption<Value extends string>
    extends Omit<
        CheckboxProps<Value>,
        'checked' | 'value' | 'defaultChecked' | 'onChange' | 'onBeforeChange'
    > {
    clarify?: VoiceOverString
    editor?: VoiceOverString
    // Removes optionality from the value prop
    value: Value
    label: VoiceOverString
}

export type CheckboxListValue<Values extends string> =
    | Values[]
    | { [k in Values]: boolean }
    | Set<Values>

export interface CheckboxListOptions<Values extends string>
    extends Iterable<CheckboxListOption<Values>> {}

export interface CheckboxListProps<Values extends string>
    extends FieldsetProps {
    options?: CheckboxListOptions<Values>

    name?: string

    /**
     * An array of the selected checkbox values
     * @default []
     * */
    value?: CheckboxListValue<Values>
    defaultValue?: CheckboxListValue<Values>

    onBeforeChange?: (event: FormEvent<any>) => any
    onChange?: (value: CheckboxListValue<Values>) => any
}
