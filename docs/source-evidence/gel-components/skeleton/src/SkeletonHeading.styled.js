import styled from 'styled-components'
import { SkeletonAnimation } from './SkeletonContainer.styled'
import { mq, vars, createVar } from '@snsw-gel/theming'

export const headingWidthVar = createVar('heading-width')

export const StyledSkeletonHeading = styled(SkeletonAnimation)`
    width: 100%;
    max-width: ${headingWidthVar};

    &.heading__no-margin {
        margin: 0 !important;
    }

    &.heading-1 {
        height: calc(${vars.typeSize.xxl} * ${vars.font.lineHeight.heading1});
        margin-top: ${vars.layouts.heading1.top};
        margin-bottom: ${vars.layouts.heading1.bottom};
    }

    &.heading-2 {
        height: calc(${vars.typeSize.xl} * ${vars.font.lineHeight.heading2});
        margin-top: ${vars.spacing.lg};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.xxxl};
            margin-bottom: ${vars.spacing.md};
        }
    }

    &.heading-3 {
        height: calc(${vars.typeSize.lg} * ${vars.font.lineHeight.heading3});
        margin-top: ${vars.spacing.md};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.lg};
            margin-bottom: ${vars.spacing.md};
        }
    }

    &.heading-4 {
        height: calc(${vars.typeSize.md} * ${vars.font.lineHeight.heading4});
        margin-top: ${vars.spacing.sm};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.md};
            margin-bottom: ${vars.spacing.md};
        }
    }

    &.heading-5 {
        height: calc(${vars.typeSize.sm} * ${vars.font.lineHeight.heading5});
        margin-top: ${vars.spacing.sm};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.md};
            margin-bottom: ${vars.spacing.md};
        }
    }
`
