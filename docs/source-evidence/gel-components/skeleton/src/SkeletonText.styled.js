import styled from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { vars, mq } from '@snsw-gel/theming'
import { SkeletonAnimation } from './SkeletonContainer.styled'

export const SkeletonParagraph = styled(SkeletonAnimation)`
    height: ${vars.font.size.base};
    margin-bottom: ${pxToRem(8)};

    &:last-child {
        margin-bottom: 0;
    }

    &:last-child:not(:first-child) {
        max-width: ${props => props.widthLast && pxToRem(props.widthLast)};
    }
`

export const SkeletonParagraphContainer = styled.div`
    width: 100%;
    max-width: ${props => props.width && pxToRem(props.width)};
    margin-top: ${vars.spacing.sm};
    margin-bottom: ${vars.spacing.sm};

    ${mq.min('tablet')} {
        margin-top: ${vars.spacing.md};
        margin-bottom: ${vars.spacing.md};
    }

    ${props => props.noMargin && 'margin: 0 !important'};
`

export const StyledSkeletonText = styled(SkeletonAnimation)`
    width: 100%;
    max-width: ${props => props.width && pxToRem(props.width)};
    height: ${vars.font.size.base};
    margin-top: ${vars.spacing.sm};
    margin-bottom: ${vars.spacing.sm};

    ${mq.min('tablet')} {
        margin-top: ${vars.spacing.md};
        margin-bottom: ${vars.spacing.md};
    }

    ${props => props.noMargin && 'margin: 0 !important'};
`
