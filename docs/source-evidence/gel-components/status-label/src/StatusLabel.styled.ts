import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { vars, mq } from '@snsw-gel/theming'

export type Variant = 'neutral' | 'error' | 'success' | 'warning' | 'info'

const styles: Record<Variant, FlattenSimpleInterpolation> = {
    neutral: css`
        background-color: ${vars.colors.background.status.neutral};
        color: ${vars.colors.text.default};
    `,
    error: css`
        background-color: ${vars.colors.background.status.errorReversed};
        color: ${vars.colors.text.reversed};
    `,
    success: css`
        background-color: ${vars.colors.background.status.successReversed};
        color: ${vars.colors.text.reversed};
    `,
    warning: css`
        background-color: ${vars.colors.background.status.warningReversed};
        color: ${vars.colors.text.reversed};
    `,
    info: css`
        background-color: ${vars.colors.background.status.infoReversed};
        color: ${vars.colors.text.reversed};
    `,
}

export const statusLabelClassNames: Record<Variant, string> = {
    neutral: 'StatusLabel--neutral',
    error: 'StatusLabel--error',
    success: 'StatusLabel--success',
    warning: 'StatusLabel--warning',
    info: 'StatusLabel--info',
}

const keys = Object.keys(statusLabelClassNames) as Variant[]

export const StyledStatusLabel = styled.span`
    border-radius: 16px;
    color: ${vars.colors.text.default};
    font-size: ${pxToRem(14)};
    font-weight: ${vars.font.weight.bold};
    text-align: center;
    padding: ${pxToRem(4)} ${pxToRem(16)};
    white-space: nowrap;

    ${keys.map(
        key =>
            css`
                &.${statusLabelClassNames[key]} {
                    ${styles[key]}
                }
            `,
    )}

    ${mq.highContrast()} {
        border: 1px solid ButtonBorder;
    }
`
