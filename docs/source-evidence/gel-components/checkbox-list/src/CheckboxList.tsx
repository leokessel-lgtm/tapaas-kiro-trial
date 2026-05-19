import React, { Ref } from 'react'
import { forwarded, useControllableValue, useId } from '@snsw-gel/utils'
import classNames from 'classnames'
import { Checkbox, provideCheckboxSlots } from '@snsw-gel/checkbox'
import { Slots } from '@snsw-gel/slots'
import { CheckboxListProps } from './CheckboxListProps.types'
import { CheckboxListFieldset } from './CheckboxList.styled'
import {
    add,
    has,
    isValidOptions,
    isValidValue,
    remove,
} from './CheckboxListHelpers'
import { FieldHelp } from '@snsw-gel/field'

export const CheckboxList = forwarded(
    <Value extends string>(
        props: CheckboxListProps<Value>,
        ref: Ref<HTMLFieldSetElement>,
    ) => {
        const {
            id,
            name,
            legend,
            options,
            hasError,
            errorMessage,
            helpMessage,
            className,
            value: propsValue,
            onChange,
            defaultValue,
            onBeforeChange,
            ...rest
        } = props

        const elemId = useId(id)
        const cls = classNames(className, 'checkbox-list')

        const [selected, setSelected] = useControllableValue(
            propsValue,
            onChange,
            defaultValue,
            [],
        )

        if (!isValidValue(selected)) {
            throw new Error('You supplied an non array value to checkbox list')
        }

        if (!isValidOptions(options)) {
            // @ts-ignore
            const optionString = options?.toString?.() ?? typeof options
            throw new Error(
                `CheckboxList.props.options must be an array, you supplied ${optionString}`,
            )
        }

        const renderedOptions = []

        if (options) {
            let idx = 0
            for (const option of options) {
                const index = idx++

                const id = `${elemId}-${index}`

                const isChecked = has(selected, option.value)

                renderedOptions.push(
                    <Slots
                        key={`${id}-slot`}
                        slots={provideCheckboxSlots({
                            clarify:
                                option.clarify ?
                                    <FieldHelp>{option.clarify}</FieldHelp>
                                :   undefined,
                            editor:
                                option.editor && isChecked ?
                                    <p
                                        id={`${id}-editor`}
                                        className='checkbox-list__editor-text'
                                    >
                                        {option.editor}
                                    </p>
                                :   undefined,
                        })}
                    >
                        <Checkbox<Value>
                            {...option}
                            key={id}
                            id={id}
                            name={name}
                            value={option.value}
                            label={option.label}
                            checked={isChecked}
                            onChange={value => {
                                if (value) {
                                    setSelected(add(selected, value))
                                } else {
                                    setSelected(remove(selected, option.value))
                                }
                            }}
                            aria-invalid={false}
                            hasError={hasError}
                            onBeforeChange={onBeforeChange}
                            aria-expanded={
                                option.editor ? isChecked : undefined
                            }
                            aria-controls={
                                option.editor && isChecked ?
                                    `${id}-editor`
                                :   undefined
                            }
                        />
                    </Slots>,
                )
            }
        }

        return (
            <CheckboxListFieldset
                smallLegend
                {...rest}
                ref={ref}
                className={cls}
                legend={legend}
                helpMessage={helpMessage}
                errorMessage={errorMessage}
                hasError={hasError}
                data-gelweb-component='checkbox-list'
            >
                {renderedOptions}
            </CheckboxListFieldset>
        )
    },
)

// @ts-ignore
CheckboxList.displayName = 'CheckboxList'
