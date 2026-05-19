import styled from 'styled-components'
import { SkeletonAnimation } from './SkeletonContainer.styled'

export const StyledSkeletonShape = styled(SkeletonAnimation)`
    width: 100%;

    &.skeleton-shape--circle {
        border-radius: 50%;
        clip-path: circle(50%);
    }
`
