import React, { Ref } from 'react'
import { FieldsetProps } from '@snsw-gel/fieldset'
import {
    Radio,
    RadioItemEditorContainer,
    RadioGroupFieldset,
    RadioItemClarifyContainer,
    RadioInput,
    StyledRadioItem,
    RadioLabel,
} from './RadioButtonList.styled'
import { useId, forwarded } from '@snsw-gel/utils'
import { clsFlags } from '@snsw-gel/theming'
import classNames from 'classnames'

export interface RadioButtonListProps<T> extends Omit<
    FieldsetProps,
    'children' | 'smallLegend' | 'isRequired' | 'isOptional'
> {
    name?: string
    fieldType?: string
    options: Array<{
        value: T
        label: React.ReactNode
        clarify?: string
        editor?: React.ReactNode
    }>
    value?: T
    vertical?: boolean
    onChange?: (value: any) => void
}

function getDataProps<T>(props: RadioButtonListProps<T>) {
    const dataProps = {} as Record<string, any>
    const rest = {} as RadioButtonListProps<T>

    for (const key in props) {
        if (key.startsWith('data-')) {
            // @ts-ignore
            dataProps[key] = props[key]
        } else {
            // @ts-ignore
            rest[key] = props[key]
        }
    }

    return [rest, dataProps] as const
}

export const RadioButtonList = forwarded(function RadioButtonList<T>(
    props: RadioButtonListProps<T>,
    ref: Ref<HTMLFieldSetElement>,
) {
    const [
        {
            id,
            name,
            className,
            legend,
            helpMessage,
            fieldType,
            options,
            value,
            hasError,
            errorMessage,
            vertical,
            onChange,
            margin,
            disabled,
            ...rest
        },
        dataProps,
    ] = getDataProps(props)

    const { ['data-gel-analytics']: dataGelAnalytics, ...restDataProps } =
        dataProps

    const fieldClass = classNames(className, !vertical && 'radio-group__inline')

    const elemID = useId(id)

    return (
        <RadioGroupFieldset
            {...rest}
            id={`${elemID}`}
            ref={ref}
            // @ts-ignore
            aria-invalid={hasError}
            className={fieldClass}
            // @ts-ignore
            $margin={margin}
            legend={legend}
            helpMessage={helpMessage}
            hasError={hasError}
            errorMessage={errorMessage}
            smallLegend={true}
            disabled={disabled}
            data-gel-analytics={
                'data-gel-analytics' in dataProps ? dataGelAnalytics : (
                    'button_radio'
                )
            }
            data-gelweb-component='radio-button-list'
        >
            <Radio>
                {options.map((option, index) => (
                    <RadioItem
                        key={index}
                        id={`${elemID}-${index}`}
                        option={option}
                        value={value}
                        fieldType={fieldType}
                        onSelection={onChange}
                        hasError={hasError}
                        name={name}
                        vertical={vertical}
                        {...restDataProps}
                    />
                ))}
            </Radio>
        </RadioGroupFieldset>
    )
})

export interface RadioItemProps {
    id: string
    name?: string
    option: {
        value: any
        label: React.ReactNode
        clarify?: string
        editor?: React.ReactNode
    }
    value: any
    fieldType?: string
    onSelection?: (value: any) => void
    hasError?: boolean
    vertical?: boolean
}

export const RadioItem = (props: RadioItemProps) => {
    const {
        id,
        name,
        option,
        value,
        fieldType,
        onSelection,
        hasError,
        vertical,
        ...rest
    } = props
    const handleClick = (e: any) => {
        if (e.target.tagName === 'INPUT') {
            e.target.checked = true

            let selectedValue = e.target.value
            if (fieldType === 'boolean') {
                selectedValue = stringToBoolean(selectedValue)
            }
            onSelection?.(selectedValue)
        }
    }

    const stringToBoolean = (b: string) => b.toLowerCase() === 'true'

    const checked = value === undefined ? value : option.value === value
    const editor = checked && option.editor ? option.editor : undefined
    const hasEditor = !!option.editor
    const clarify = option.clarify && vertical ? option.clarify : undefined

    return (
        <>
            <StyledRadioItem className='radio-item' onClick={handleClick}>
                <RadioInput
                    {...rest}
                    className={hasError ? 'error' : ''}
                    name={name}
                    type='radio'
                    id={id}
                    value={option.value}
                    aria-describedby={clarify && `${id}-clarifyText`}
                    checked={checked}
                    onChange={() => {}}
                    aria-expanded={hasEditor ? !!checked : undefined}
                    aria-controls={editor ? `${id}-editor` : undefined}
                />
                <RadioLabel
                    htmlFor={id}
                    // @ts-ignore
                    className={hasError && clsFlags.error}
                >
                    {option.label}
                </RadioLabel>
            </StyledRadioItem>
            {editor && (
                <RadioItemEditorContainer id={`${id}-editor`}>
                    {typeof editor === 'string' ?
                        <p>{editor}</p>
                    :   editor}
                </RadioItemEditorContainer>
            )}
            {clarify && (
                <RadioItemClarifyContainer id={`${id}-clarifyText`}>
                    {clarify}
                </RadioItemClarifyContainer>
            )}
        </>
    )
}

// @ts-ignore
RadioButtonList.displayName = 'RadioButtonList'
