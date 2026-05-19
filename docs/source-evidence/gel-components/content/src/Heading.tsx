import React, { ReactNode, Ref } from 'react'
import { forwarded } from '@snsw-gel/utils'
import { HeadingStyle } from './Heading.styled'
import classNames from 'classnames'

export interface HeadingProps {
    /**
     * The visual heading level.
     * @default 1
     */
    level?: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'
    /**
     * Lets you control the semantic element without changing the visual appearance. Will by default use the level prop
     * @default `h${level}`
     */
    headingElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
    className?: string
    children: ReactNode
    id?: string
    tabIndex?: number
}

const validHeadingElements = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'])

export const Heading = forwarded(
    (props: HeadingProps, ref: Ref<HTMLHeadingElement>) => {
        const {
            level = 1,
            headingElement: asElement = `h${level}`,
            className,
            children,
            ...rest
        } = props

        const cls = classNames('heading', 'heading-' + level, className)

        if (
            // @ts-ignore
            process.env.NODE_ENV === 'development' &&
            !validHeadingElements.has(asElement)
        ) {
            throw new Error('Invalid heading element: ' + asElement)
        }

        return (
            <HeadingStyle
                ref={ref}
                className={cls}
                as={asElement}
                data-gelweb-component='heading'
                {...rest}
            >
                {children}
            </HeadingStyle>
        )
    },
)

// @ts-ignore
Heading.displayName = 'Heading'
