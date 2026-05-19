import styled, { css, keyframes } from 'styled-components'
import { vars } from '@snsw-gel/theming'

const inAndOut = keyframes`
    0% {
        opacity: 1;
    }
    33% {
        opacity: 0.7;
    }
    66% {
        opacity: 1;
    }
    100% {
        opacity: 0.6;
    }
`

const shimmer = keyframes`
    0% {
        transform: translate3d(-99%, 0px, 0px);
    }
    100% {
        transform: translate3d(140%, 0px, 0px);
    }
`

export const SkeletonAnimation = styled.div`
    position: relative;
    overflow: hidden;
    display: block;
    background: ${vars.colors.skeleton.background};
    opacity: 1;

    --skeleton-multiplier: 0.6;

    &.skeleton-ready {
        animation: ${inAndOut} 4s
            calc(
                (
                        var(--skeleton-offset-x, 1000) * 1ms +
                            var(--skeleton-offset-y, 1000) * 0.9ms
                    ) * var(--skeleton-multiplier)
            )
            ease-in-out infinite alternate both;

        div {
            pointer-events: none;

            position: absolute;
            top: 0;
            min-width: 600px;
            width: 100%;
            right: 0;
            bottom: 0;
            left: 0;
            opacity: 1;
            transform: translate3d(-99%, 0px, 0px);
            background: ${vars.colors.skeleton.gradient};
            background-repeat: no-repeat;
            animation: ${shimmer} calc(2s * var(--skeleton-multiplier))
                calc(
                    (
                            var(--skeleton-offset-x, 1000) * 1.2ms +
                                var(--skeleton-offset-y, 1000) * 0.9ms
                        ) * var(--skeleton-multiplier)
                )
                linear infinite both;
            content: '';
        }
    }
`

const StyledSkeletonContainer = styled.div``

export default StyledSkeletonContainer
