import React, { ReactNode, Ref, useRef, ComponentPropsWithoutRef } from 'react'
import { IconNewTab } from '@snsw-gel/icons'
import StyledButton from './Button.styled'
import { bindRefs, forwarded, useId } from '@snsw-gel/utils'
import { WithElementProps } from '@snsw-gel/types'
import classNames from 'classnames'

export type ButtonThemes =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive'
    | 'link'

export interface ButtonProps {
    children: ReactNode
    className?: string
    disabled?: boolean
    href?: string // HTML anchor link
    to?: string // React router link
    /**
     * @default primary
     */
    variant?: ButtonThemes
    /**
     * If the button type is not specified, it will default to 'button'.
     * This prevents accidental form submits from happening when any button in the form is clicked
     * @default button
     *  */
    type?: 'button' | 'submit' | 'reset'

    /**
     * The as prop is used to pass in the Link component from [react router](https://reactrouter.com/en/6.16.0/components/link).
     */
    as?: string | React.ComponentType<any>
    iconEnd?: ReactNode
    iconStart?: ReactNode

    /**
     *	When the button is clicked the `onClick` callback is called. Interesting
     */
    onClick?: ComponentPropsWithoutRef<'button'>['onClick']
    target?: '_blank' | (string & {})
}

export interface ButtonWithElementProps
    extends WithElementProps<ComponentPropsWithoutRef<'button'>, ButtonProps> {}

function getVariantClassName(variant: ButtonThemes) {
    switch (variant) {
        default:
            return `button--${variant}`
    }
}

export const Button = forwarded(
    (
        props: ButtonWithElementProps,
        ref?: Ref<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
        /* eslint-disable prefer-const */
        const {
            variant = 'primary',
            disabled = false,
            type = 'button',
            children,
            onClick,
            className,
            as: Component,
            id,
            iconStart: propsIconStart,
            iconEnd: propsIconEnd,
            target,
            ...rest
        } = props

        const cls = classNames(className, getVariantClassName(variant))

        const elemId = useId(id)

        let iconStart: ReactNode | undefined = propsIconStart
        let iconEnd: ReactNode | undefined = propsIconEnd

        const hideExternalIcon = iconStart || iconEnd
        /*
        If we have iconStart or iconEnd we don't want to show the external icon
        */
        let iconEndClassName = 'iconEnd'

        if (iconEnd === undefined) {
            if (
                target === '_blank' &&
                !hideExternalIcon &&
                typeof Component !== 'object'
            ) {
                iconEndClassName = 'iconExt'
                iconEnd = <IconNewTab title='Opens in a new tab' />
            }
        }

        const extraProps: any = {}

        if (typeof Component !== 'object' && props.href) {
            extraProps.href = props.href
            extraProps.as = !props.disabled ? 'a' : 'button'
            extraProps.type = null

            if (target === '_blank') {
                extraProps.target = '_blank'
                extraProps.rel = 'noopener noreferrer'
            }
        } else if (typeof Component === 'object' && (props.href || rest.to)) {
            extraProps.to = props.href || rest.to
            extraProps.as = props.as
            extraProps.type = null
        } else {
            extraProps.type = type
            extraProps.disabled = disabled
        }

        return (
            <StyledButton
                id={elemId}
                className={cls}
                onClick={onClick}
                ref={ref}
                as={Component}
                disabled={disabled}
                type={type}
                data-gel-analytics='button'
                data-variant={variant}
                target={target}
                data-gelweb-component={`button-${variant}`}
                {...extraProps}
                {...rest}
            >
                {iconStart && (
                    <span className='iconStart iconFlex'>{iconStart}</span>
                )}
                {children}
                {iconEnd && (
                    <span className={classNames('iconFlex', iconEndClassName)}>
                        {iconEnd}
                    </span>
                )}
            </StyledButton>
        )
    },
)

// @ts-ignore
Button.displayName = 'Button'
