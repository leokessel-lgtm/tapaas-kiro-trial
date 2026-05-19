import React, { ReactNode } from 'react'
import { SROnly } from '@snsw-gel/accessibility'
import StyledSkeletonContainer from './SkeletonContainer.styled'
import { useSkeletonOffset } from './useSkeletonOffset'

export interface SkeletonContainerProps {
    className?: string
    title?: string
    children: ReactNode
}

export const SkeletonContainer = (props: SkeletonContainerProps) => {
    const { className, title = 'loading', children } = props
    const ref = useSkeletonOffset()

    return (
        <StyledSkeletonContainer
            // @ts-ignore
            ref={ref}
            className={className}
            data-gelweb-component='skeleton-container'
        >
            <SROnly data-testid='sr-only-title'>{title}</SROnly>
            <div data-testid='hide-items' aria-hidden={true}>
                {children}
            </div>
        </StyledSkeletonContainer>
    )
}
