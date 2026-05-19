import React from 'react'
import {
    StyledSkeletonHeading,
    headingWidthVar,
} from './SkeletonHeading.styled'
import { useSkeletonOffset } from './useSkeletonOffset'
import classNames from 'classnames'
import { pxToRem } from '@snsw-gel/theming'

export interface SkeletonHeadingProps {
    className?: string
    level?: number
    width?: number
    /** Removes default margin values */
    noMargin?: boolean
}

export const SkeletonHeading = (props: SkeletonHeadingProps) => {
    const { level = 3, width, noMargin = false, className } = props

    const ref = useSkeletonOffset()

    const cls = classNames(
        'heading-' + level,
        noMargin && 'heading__no-margin',
        className,
    )

    return (
        <StyledSkeletonHeading
            // @ts-ignore
            ref={ref}
            data-testid='skeleton-heading'
            data-gelweb-component='skeleton-heading'
            // @ts-ignore
            className={cls}
            style={{
                ...(width && headingWidthVar.setStyle(pxToRem(width))),
            }}
        >
            <div />
        </StyledSkeletonHeading>
    )
}
