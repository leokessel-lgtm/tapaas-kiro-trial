import { pxToRem, marginMixin } from '@snsw-gel/theming'
import styled, { css } from 'styled-components'
import { vars, clsFlags, createVar } from '@snsw-gel/theming'

export const errorStyles = css`
    border: ${vars.colors.forms.errorBorder};
    box-shadow: none;
`

export const inputWidthVar = createVar('inputWidth', '100%')

export const baseInputStyles = css`
    width: 100%;
    max-width: ${inputWidthVar};
    font-size: ${vars.font.size.base};
    color: ${vars.colors.text.default};
    background-color: ${vars.colors.background.default};
    border: ${vars.colors.forms.border};
    border-radius: ${vars.radius.large};
    padding: 0 ${pxToRem(13)};
    margin-top: ${pxToRem(4)};
    transition:
        border-color 0.25s ease,
        background-color 0.25s ease;
    cursor: text;
    appearance: none;
    height: ${pxToRem(48)};

    &::placeholder {
        /* Internet Explorer 10-11 */
        color: inherit;
        opacity: 0.54;
    }
    &.focus-visible,
    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }
    &:disabled {
        opacity: 1;
        background-color: ${vars.colors.background.surface.subtle};
        border-color: ${vars.colors.forms.disabled.border};
        color: ${vars.colors.text.subtle};
    }
    &::-ms-clear {
        display: none;
    }
    &:-moz-ui-invalid {
        box-shadow: none;
    }

    &.${clsFlags.error}, .${clsFlags.error} & {
        ${errorStyles}
    }
`

export const FieldErrorWrapper = styled.span`
    display: flex;
    align-items: flex-start;
    color: ${vars.colors.validation.text};
    background: ${vars.colors.validation.error};
    font-weight: ${vars.font.weight.accent};
    margin-top: ${vars.spacing.xs};
    padding: ${vars.layouts.validation.padding};

    > svg {
        > g > :last-child {
            fill: ${vars.colors.border.error};
        }
        > g > :first-child {
            fill: ${vars.colors.border.errorSubtle};
        }
        flex-shrink: 0;
        width: ${vars.layouts.icons.size};
        height: ${vars.layouts.icons.size};
        margin: ${vars.layouts.icons.margin};
    }
    > span {
        margin: ${vars.layouts.validation.margin};
    }
`

export const FieldLabel = styled.label`
    line-height: ${vars.font.lineHeight.body};
    font-weight: ${vars.font.weight.medium};
    display: block;
    color: ${vars.colors.text.default};
    margin-bottom: 0;
`

export const FieldHelp = styled.span`
    font-size: ${pxToRem(14)};
    line-height: ${vars.font.lineHeight.heading4};
    font-weight: ${vars.font.weight.normal};
    color: ${vars.colors.forms.helpText};
    margin: 0;
    display: block;
`

// Exact same as FieldHelp but used when describing multiple components
export const FieldGroupHelp = styled(FieldHelp)``

export const FieldWrapper = styled.div`
    ${marginMixin}
`
