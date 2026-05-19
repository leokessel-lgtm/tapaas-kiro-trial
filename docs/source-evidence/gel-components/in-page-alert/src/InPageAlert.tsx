/* eslint-disable max-len */
import React, { Fragment, ReactNode, Ref } from 'react'
import {
    StyledInPageAlert,
    StyledInPageAlertChildren,
    StyledInPageAlertIcon,
    StyledInPageAlertTitle,
    StyledInPageAlertWrapper,
    StyledInPageAlertCompact,
} from './InPageAlert.styled'
import { HeadingProps } from '@snsw-gel/content'
import {
    IconNotificationSuccess,
    IconNotificationError,
    IconNotificationWarning,
    IconNotificationInfo,
} from '@snsw-gel/icons'
import { forwarded } from '@snsw-gel/utils'
import classNames from 'classnames'

const icons = {
    error: <IconNotificationError size='md' />,
    warning: <IconNotificationWarning size='md' />,
    success: <IconNotificationSuccess size='md' />,
    info: <IconNotificationInfo size='md' />,
    callout: null,
} as const

export interface InPageAlertProps {
    id?: string
    className?: string
    title: string
    variant: keyof typeof icons
    role?: 'alert' | 'status'
    children?: ReactNode
    headingElement?: Exclude<HeadingProps['headingElement'], 'h1'>
    compact?: boolean
    tabIndex?: number
}

const InPageAlertHeadingLevel = {
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
} as const

export const InPageAlert = forwarded(
    (props: InPageAlertProps, ref: Ref<HTMLDivElement>) => {
        const {
            variant,
            className,
            title,
            headingElement = 'h6',
            children,
            role,
            compact = false,
            ...rest
        } = props

        const displayIcon = icons[variant]

        let headingLevelToRender = headingElement

        if (!(headingLevelToRender in InPageAlertHeadingLevel)) {
            headingLevelToRender = InPageAlertHeadingLevel.h6
        }

        const TitleWrapper = displayIcon ? StyledInPageAlertWrapper : Fragment
        const titleWrapperProps =
            TitleWrapper !== Fragment ?
                { className: classNames({ '--compact': compact }) }
            :   {}

        return (
            <StyledInPageAlert
                className={classNames(className, `--${variant}`, {
                    '--compact': compact,
                })}
                role={role}
                ref={ref}
                {...rest}
                data-gelweb-component={`in-page-alert-${variant}`}
            >
                <TitleWrapper {...titleWrapperProps}>
                    {displayIcon && (
                        <StyledInPageAlertIcon
                            className={classNames(`icon--${variant}`, {
                                'icon--compact': compact || !children,
                            })}
                        >
                            {displayIcon}
                        </StyledInPageAlertIcon>
                    )}
                    {compact ?
                        <StyledInPageAlertCompact>
                            <StyledInPageAlertTitle
                                level={5}
                                headingElement={headingLevelToRender}
                            >
                                {title}
                            </StyledInPageAlertTitle>
                            {Boolean(compact && children) && (
                                <StyledInPageAlertChildren>
                                    {children}
                                </StyledInPageAlertChildren>
                            )}
                        </StyledInPageAlertCompact>
                    :   <StyledInPageAlertTitle
                            level={5}
                            className={classNames({ 'title-only': !children })}
                            headingElement={headingLevelToRender}
                        >
                            {title}
                        </StyledInPageAlertTitle>
                    }
                </TitleWrapper>
                {Boolean(!compact && children) && (
                    <StyledInPageAlertChildren
                        className={classNames(
                            variant === 'callout' && '--callout',
                        )}
                    >
                        {children}
                    </StyledInPageAlertChildren>
                )}
            </StyledInPageAlert>
        )
    },
)
