import styled, { css } from 'styled-components'
import { pxToRem, marginMixin } from '@snsw-gel/theming'
import { Fieldset } from '@snsw-gel/fieldset'
import { FieldLabel } from '@snsw-gel/field'
import { vars, mq, clsFlags } from '@snsw-gel/theming'

const RADIO_SIZE = 32

export const HiddenRadioCheckbox = css`
    position: absolute;
    opacity: 0;
    width: ${pxToRem(RADIO_SIZE)};
    height: ${pxToRem(RADIO_SIZE)};
    top: 0;
    left: 0;
    z-index: 1;
    cursor: pointer;
    padding: 0;
    margin: 0;
`

export const RadioItemEditorContainer = styled.div`
    margin-top: ${pxToRem(8)};
    margin-bottom: -${pxToRem(8)};
    margin-left: ${pxToRem(11)};
    border-left: ${pxToRem(8)} solid ${vars.colors.radio.editorBorder};
    padding: ${pxToRem(6)} ${vars.spacing.sm} ${pxToRem(6)} ${vars.spacing.sm};

    p {
        padding: 0;
        margin: 0;
    }
`

export const RadioItemClarifyContainer = styled.div`
    margin-left: ${pxToRem(48)};
    font-size: ${pxToRem(14)};
    color: ${vars.colors.forms.helpText};
`

export const Radio = styled.div`
    + .field-error {
        margin-top: ${vars.spacing.md};
    }
`

export const StyledRadioItem = styled.div`
    position: relative;
    margin-top: ${vars.spacing.sm};
`

export const CustomRadioCheckbox = css`
    position: relative;
    padding: ${pxToRem(4)} 0 ${pxToRem(4)} ${vars.spacing.xxl};
    margin: 0;

    &::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        border: ${vars.colors.forms.border};
        background-color: ${vars.colors.background.default};
        width: ${pxToRem(RADIO_SIZE)};
        height: ${pxToRem(RADIO_SIZE)};
        transition-property: background-color;
        transition-duration: ${vars.transitions.idle};
        transition-timing-function: ${vars.easings.natural};
    }

    &::after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        border: 2px solid transparent;
        background-color: ${vars.colors.forms.checked};
        width: ${pxToRem(RADIO_SIZE)};
        height: ${pxToRem(RADIO_SIZE)};
        opacity: 0;
        transform: scale(0.68);
        transition:
            opacity ${vars.transitions.hover},
            transform ${vars.transitions.active};
        transition-timing-function: ${vars.easings.natural};
    }
`

export const RadioLabel = styled(FieldLabel)`
    ${CustomRadioCheckbox}
    display: inline-block;

    &::before {
        border-radius: 1rem;
    }

    &::after {
        border-radius: calc(1rem + 3px);
    }

    ${mq.highContrast()} {
        &::after {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            background-color: InactiveBorder;
        }
        &::before {
            border: 2px solid InactiveBorder;
        }
    }

    &.${clsFlags.error}, .${clsFlags.error} & {
        &::before {
            border: ${vars.colors.forms.errorBorder};
            box-shadow: none;
        }
    }
`

export const RadioInput = styled.input`
    ${HiddenRadioCheckbox}

    &:checked + ${RadioLabel} {
        &::after {
            opacity: 1;
        }
    }

    &:focus ~ ${RadioLabel} {
        &::before {
            outline: ${vars.focus.radioOffset} solid transparent;
            outline-offset: ${vars.focus.radioOffset};
        }
    }

    &:hover ~ ${RadioLabel} {
        &::before {
            transition-duration: ${vars.transitions.hover};
            background: ${vars.colors.background.linkHover};
        }
    }

    &:active ~ ${RadioLabel} {
        &::before {
            transition-duration: ${vars.transitions.active};
        }
    }

    &:focus ~ ${RadioLabel} {
        &::before {
            box-shadow:
                0 0 0 ${vars.focus.radioOffset}
                    ${vars.colors.background.default},
                0 0 0 ${vars.focus.radio} ${vars.colors.border.focus};
        }
    }

    &:disabled + ${RadioLabel} {
        &::before {
            background-color: ${vars.colors.background.subtle};
            border-color: ${vars.colors.checkbox.disabled.border};
        }

        &::after {
            background-color: ${vars.colors.checkbox.disabled.border};
        }
    }

    ${mq.highContrast()} {
        &:focus ~ ${RadioLabel} {
            &::before {
                -ms-high-contrast-adjust: none;
                forced-color-adjust: none;
                outline-color: Highlight;
                background-color: Background;
                box-shadow: none;
            }
        }

        &:disabled + ${RadioLabel} {
            &::before {
                border-color: GrayText;
            }

            &::after {
                background-color: GrayText;
            }
        }
    }
`

export const RadioInlineStyles = css`
    ${Radio} {
        display: flex;
        padding-top: ${vars.spacing.sm};
    }

    ${StyledRadioItem} {
        margin-right: ${vars.spacing.sm};
        margin-bottom: 0;
        margin-top: 0;
    }

    .radio-item:first-of-type {
        margin-top: 0;
        margin-left: 0;
    }

    ${RadioItemEditorContainer} {
        margin-top: 0;
        margin-bottom: 0;
        padding: ${pxToRem(4)} ${vars.spacing.sm} 0 ${vars.spacing.sm};
    }

    ${mq.min('tablet')} {
        .fieldset__legend {
            margin: 0;
        }

        ${StyledRadioItem} {
            margin: 0 0 0 ${vars.spacing.md};
        }
    }
`

export const RadioGroupFieldset = styled(Fieldset)`
    &.radio-group__inline {
        ${RadioInlineStyles}
    }
    ${marginMixin}

    .fieldset__field-error {
        margin-top: ${pxToRem(24)};
    }

    &.radio-group__inline {
        .fieldset__field-error {
            margin-top: ${pxToRem(8)};

            ${mq.min('tablet')} {
                margin-top: ${pxToRem(24)};
            }
        }
    }
`

export default Radio
