import styled from 'styled-components'
import { vars, mq } from '@snsw-gel/theming'

export const HeadingStyle = styled.h1`
    letter-spacing: 0;
    font-weight: ${vars.font.weight.bold};
    margin: 0;

    &.heading-1 {
        font-size: ${vars.typeSize.xxl};
        line-height: ${vars.font.lineHeight.heading1};
        margin-top: ${vars.layouts.heading1.top};
        margin-bottom: ${vars.layouts.heading1.bottom};
    }

    &.heading-2 {
        font-size: ${vars.typeSize.xl};
        line-height: ${vars.font.lineHeight.heading2};
        margin-top: ${vars.spacing.lg};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.xxxl};
            margin-bottom: ${vars.spacing.md};
        }
    }

    &.heading-3 {
        font-size: ${vars.typeSize.lg};
        line-height: ${vars.font.lineHeight.heading3};

        margin-top: ${vars.spacing.md};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.lg};
            margin-bottom: ${vars.spacing.md};
        }
    }

    &.heading-4 {
        font-size: ${vars.typeSize.md};
        line-height: ${vars.font.lineHeight.heading4};
        margin-top: ${vars.spacing.sm};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.md};
            margin-bottom: ${vars.spacing.md};
        }
    }

    &.heading-5 {
        font-size: ${vars.typeSize.sm};
        line-height: ${vars.font.lineHeight.heading5};
        margin-top: ${vars.spacing.sm};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.md};
            margin-bottom: ${vars.spacing.md};
        }
    }

    &.heading-6 {
        font-size: ${vars.typeSize.sm};
        line-height: ${vars.font.lineHeight.heading5};
        margin-top: ${vars.spacing.sm};
        margin-bottom: ${vars.spacing.sm};

        ${mq.min('tablet')} {
            margin-top: ${vars.spacing.md};
            margin-bottom: ${vars.spacing.md};
        }
    }
`
