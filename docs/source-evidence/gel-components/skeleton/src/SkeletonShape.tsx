import { vars } from '@snsw-gel/theming'
import { pxToRem } from '@snsw-gel/theming'
import classNames from 'classnames'
import React from 'react'
import { StyledSkeletonShape } from './SkeletonShape.styled'
import { useSkeletonOffset } from './useSkeletonOffset'

export interface SkeletonShapeProps {
    width?: number
    height?: number
    /** All available Brand and System Icon sizes. */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    /** Use circle to represent Icons or Avatars */
    circle?: boolean
}

export const SkeletonShape = (props: SkeletonShapeProps) => {
    const { width = 60, height = 60, size, circle = false } = props
    const ref = useSkeletonOffset()

    // eslint-disable-next-line no-nested-ternary
    const sizeToShow =
        size ?
            typeof size === 'number' ?
                pxToRem(size)
            :   vars.spacing.icons[size].toString()
        :   false

    return (
        <StyledSkeletonShape
            style={{
                maxWidth: sizeToShow || pxToRem(width),
                height: sizeToShow || pxToRem(height),
            }}
            // @ts-ignore
            ref={ref}
            data-testid='skeleton-shape'
            // @ts-ignore
            height={height}
            width={width}
            size={size}
            circle={circle}
            className={classNames(
                'skeleton-shape',
                `skeleton-shape--${props.circle ? 'circle' : 'rect'}`,
            )}
            data-gelweb-component='skeleton-shape'
        >
            <div />
        </StyledSkeletonShape>
    )
}
