import React, {
    ChangeEvent,
    ComponentPropsWithoutRef,
    Fragment,
    Ref,
} from 'react'
import { inputWidthVar, useProvidedFieldProps } from '@snsw-gel/field'
import { clsFlags, vars } from '@snsw-gel/theming'
import {
    bindRefs,
    forwarded,
    useControllableValue,
    useId,
    useIgnoreScrollChange,
} from '@snsw-gel/utils'
import {
    StyledInput,
    PrefixStyled,
    PrefixWrapperStyled,
    AffixWrapperStyled,
    SuffixStyled,
    SuffixWrapperStyled,
} from './Input.styled'
import classNames from 'classnames'

// We don't want to combine these
interface NativeInputProps extends ComponentPropsWithoutRef<'input'> {}

export interface InputWidthProps {
    inputWidth?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface SelectedNativeProps
    extends Pick<
        NativeInputProps,
        | 'onBlur'
        | 'onFocus'
        | 'onInput'
        | 'onKeyDown'
        | 'onKeyUp'
        | 'onKeyPress'
        | 'onChange'
    > {}

export interface InputProps extends InputWidthProps, SelectedNativeProps {
    'defaultValue'?: string
    'value'?: string
    'hasError'?: boolean
    'prefix'?: string
    'suffix'?: string
    'ignoreScrollChanges'?: boolean
    'id'?: string
    'className'?: string
    'name'?: string
    'type'?: string
    'disabled'?: boolean
    'maxLength'?: number
    'role'?: NativeInputProps['role']
    'inputMode'?: NativeInputProps['inputMode']
    'autoCorrect'?: NativeInputProps['autoCorrect']
    'autoComplete'?: NativeInputProps['autoComplete']
    'autoFocus'?: NativeInputProps['autoFocus']
    'pattern'?: NativeInputProps['pattern']
    'placeholder'?: NativeInputProps['placeholder']
    'readOnly'?: NativeInputProps['readOnly']
    'required'?: NativeInputProps['required']
    'spellCheck'?: NativeInputProps['spellCheck']
    'tabIndex'?: NativeInputProps['tabIndex']
    'title'?: NativeInputProps['title']
    'aria-describedby'?: NativeInputProps['aria-describedby']
    'aria-labelledby'?: NativeInputProps['aria-labelledby']
    'aria-label'?: NativeInputProps['aria-label']
}

export const Input = forwarded(
    (props: InputProps, ref: Ref<HTMLInputElement>) => {
        const {
            type = 'text',
            name,
            inputWidth,
            prefix,
            suffix,
            className,

            // prevent field props from going to the input
            id: outerId,
            hasError = false,
            label,
            errorMessage,
            helpMessage,
            isOptional,
            isRequired,
            disabled,

            value: propsValue,
            onChange,
            defaultValue,

            // we need to exclude this here because it will override our inputs onChange handler
            ignoreScrollChanges = true,
            ...rest
        } = useProvidedFieldProps(props)

        const [value, setValue] = useControllableValue(
            propsValue,
            (value, event: ChangeEvent<HTMLInputElement>) => onChange?.(event),
            defaultValue,
            '',
        )
        const id = useId(outerId)

        const cls = classNames(
            className,
            'input',
            hasError && clsFlags.error,
            prefix && 'field--prefix',
            suffix && 'field--suffix',
        )

        const affixCls = classNames(
            hasError && clsFlags.error,
            disabled && clsFlags.disabled,
        )

        const Wrapper = prefix || suffix ? AffixWrapperStyled : Fragment

        const styles = {}
        if (inputWidth) {
            Object.assign(
                styles,
                inputWidthVar.setStyle(vars.layouts.inputWidths[inputWidth]),
            )
        }

        const elementRef = useIgnoreScrollChange(ignoreScrollChanges)

        const wrapperProps =
            Wrapper !== Fragment ?
                {
                    className: classNames('field--affix', {
                        'field--full-width': !inputWidth && (prefix || suffix),
                    }),
                    style: styles,
                }
            :   {}

        return (
            <Wrapper {...wrapperProps}>
                {prefix && (
                    <PrefixWrapperStyled aria-hidden='true'>
                        {/* @ts-ignore */}
                        <PrefixStyled className={affixCls}>
                            {prefix}
                        </PrefixStyled>
                    </PrefixWrapperStyled>
                )}
                <StyledInput
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValue?.(e.target.value, e)
                    }}
                    disabled={disabled}
                    ref={bindRefs(elementRef, ref)}
                    className={cls}
                    style={styles}
                    aria-invalid={hasError || undefined}
                    data-gel-analytics='input'
                    data-gelweb-component='input'
                    {...rest}
                />
                {suffix && (
                    <SuffixWrapperStyled aria-hidden='true'>
                        {/* @ts-ignore */}
                        <SuffixStyled className={affixCls}>
                            {suffix}
                        </SuffixStyled>
                    </SuffixWrapperStyled>
                )}
            </Wrapper>
        )
    },
)

// @ts-ignore
Input.displayName = 'Input'
