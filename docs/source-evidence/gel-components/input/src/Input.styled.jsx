import { pxToRem } from '@snsw-gel/theming'
import styled, { css } from 'styled-components'
import { baseInputStyles, errorStyles, inputWidthVar } from '@snsw-gel/field'
import { mq, vars, clsFlags } from '@snsw-gel/theming'

export const affixStyles = css`
    &.field--prefix,
    &.field--suffix {
        position: relative;
        margin-bottom: 0;
        display: block;
        background-clip: padding-box;
    }
    &.field--prefix {
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    &.field--suffix {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`

export const StyledInput = styled.input`
    ${baseInputStyles}
    ${affixStyles}
    
    &.field--prefix,
    &.field--suffix {
        margin-top: 0;
    }
`

export const AffixWrapperStyled = styled.div`
    position: relative;
    display: grid;
    max-width: max-content;
    grid-template-columns: auto minmax(auto, ${inputWidthVar}) auto;
    grid-template-areas: 'prefix input suffix';

    &.field--affix {
        margin-top: 4px;
    }

    &.field--full-width {
        width: 100%;
        max-width: 100%;
    }

    &.field--affix > input:focus {
        outline: 0;
    }

    &.field--affix > input {
        grid-area: input;
    }

    &.field--affix:focus-within {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        border-radius: ${vars.radius.large};
        outline-offset: ${vars.focus.default};

        ${mq.highContrast()} {
            outline-color: Highlight;

            span {
                border-color: Highlight;
            }
        }
    }
`

export const PrefixWrapperStyled = styled.div`
    display: flex;
    height: ${pxToRem(48)};
    grid-area: prefix;
`

export const SuffixWrapperStyled = styled.div`
    display: flex;
    height: ${pxToRem(48)};
    grid-area: suffix;
`

export const AffixStyled = css`
    display: flex;
    align-items: center;
    margin-bottom: 0;
    font-size: ${vars.font.size.base};
    font-weight: ${vars.font.weight.medium};
    line-height: ${vars.font.lineHeight.body};
    color: ${vars.colors.text.default};
    background: ${vars.colors.forms.accent};
    text-align: center;
    white-space: nowrap;
    border: ${vars.colors.forms.border};

    &.${clsFlags.error} {
        ${errorStyles}
    }

    &.${clsFlags.disabled} {
        border-color: ${vars.colors.forms.disabled.border};

        ${mq.highContrast()} {
            color: GrayText;
            border-color: GrayText;
        }
    }
`

export const PrefixStyled = styled.span`
    ${AffixStyled}
    border-radius: ${vars.radius.large} 0px 0px ${vars.radius.large};
    border-right: none !important;
    padding: ${pxToRem(6)} ${pxToRem(12)} ${pxToRem(6)} ${pxToRem(10)};
`

export const SuffixStyled = styled.span`
    ${AffixStyled}
    border-radius: 0px ${vars.radius.large} ${vars.radius.large} 0px;
    border-left: none !important;
    padding: ${pxToRem(6)} ${pxToRem(10)} ${pxToRem(6)} ${pxToRem(12)};
`
