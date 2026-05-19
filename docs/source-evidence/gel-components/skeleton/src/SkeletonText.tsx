import React from 'react'
import {
    SkeletonParagraph as StyledSkeletonParagraph,
    SkeletonParagraphContainer,
    StyledSkeletonText,
} from './SkeletonText.styled'
import { useSkeletonOffset } from './useSkeletonOffset'

export interface SkeletonTextProps {
    rows?: number
    width?: number
    widthLast?: number
    noMargin?: boolean
}

const SkeletonParagraph = (props: any) => {
    const ref = useSkeletonOffset()
    return <StyledSkeletonParagraph ref={ref} {...props} />
}

export const SkeletonText = (props: SkeletonTextProps) => {
    const {
        rows = 1,
        width,
        widthLast = 414,
        noMargin = false,
        ...rest
    } = props

    const ref = useSkeletonOffset()

    const rowList = []

    for (let i = 0; i < rows; i++) {
        rowList.push(
            // @ts-ignore
            <SkeletonParagraph key={i} widthLast={widthLast}>
                <div />
            </SkeletonParagraph>,
        )
    }

    return rows === 1 ?
            <StyledSkeletonText
                {...rest}
                // @ts-ignore

                ref={ref}
                // @ts-ignore
                width={width}
                // @ts-ignore
                noMargin={noMargin}
                data-testid='skeleton-text'
                data-gelweb-component='skeleton-text'
            >
                <div />
            </StyledSkeletonText>
        :   <SkeletonParagraphContainer
                // @ts-ignore
                // @ts-ignore
                noMargin={noMargin}
                width={width}
                data-testid='skeleton-paragraph'
                data-gelweb-component='skeleton-paragraph'
            >
                {rowList}
            </SkeletonParagraphContainer>
}
