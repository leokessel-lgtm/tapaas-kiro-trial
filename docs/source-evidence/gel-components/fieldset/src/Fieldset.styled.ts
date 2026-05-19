import styled from 'styled-components'
import { marginMixin, pxToRem } from '@snsw-gel/theming'
import { vars } from '@snsw-gel/theming'

export const flags = {
    smallLegend: 'has-small-legend',
}

export const StyledFieldset = styled.fieldset`
    position: relative;
    border: 0;
    padding: 0;
    border-radius: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    ${marginMixin}
    &.${flags.smallLegend} {
        legend span:first-of-type {
            font-size: ${vars.font.size.base};
            font-weight: ${vars.font.weight.medium};
            line-height: ${vars.font.lineHeight.body};
        }
        label {
            font-weight: ${vars.font.weight.normal};
        }
    }
    > .field-item:first-of-type,
    .date-container {
        margin-top: ${pxToRem(8)};
    }
`

export const FieldsetLegend = styled.legend`
    padding: 0;
`

export const FieldsetLegendLabel = styled.span`
    margin: 0;
    font-size: ${vars.font.size.lg};
    font-weight: ${vars.font.weight.bold};
    line-height: ${vars.font.lineHeight.heading4};
    color: ${vars.colors.text.default};
`
