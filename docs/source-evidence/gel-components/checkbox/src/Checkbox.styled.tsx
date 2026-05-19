import styled, { css } from 'styled-components'
import { marginMixin, pxToRem } from '@snsw-gel/theming'
import { FieldErrorWrapper, FieldLabel } from '@snsw-gel/field'
import { clsFlags, vars, createVar, mq } from '@snsw-gel/theming'

export const CheckboxWrapper = styled.div`
    position: relative;
    ${marginMixin}

    + ${FieldErrorWrapper} {
        margin-top: ${vars.spacing.md};
    }
`

export const STROKE_LEN = '27'
export const strokeVar = createVar('stroke-len', '0')
export const counterVar = createVar('change-counter', '0')

// This is updated at runtime just in case
const DEFAULT_STROKE_LEN = 26.22953224182129

export const CheckboxIndicatorWrapper = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    border: ${vars.colors.forms.border};
    border-radius: ${vars.radius.checkbox};
    background-color: ${vars.colors.background.default};
    display: inline-flex;
    vertical-align: middle;
    margin-right: ${pxToRem(16)};
    width: ${pxToRem(32)};
    height: ${pxToRem(32)};

    justify-content: center;
    align-items: center;

    pointer-events: none;

    svg {
        position: absolute;
        color: ${vars.colors.checkbox.icon};
        width: ${vars.layouts.checkbox.width};
        height: ${vars.layouts.checkbox.height};
    }

    ${mq.highContrast()} {
        svg {
            color: currentColor;
        }
    }

    ${strokeVar.set(STROKE_LEN)}

    /* eslint-disable-next-line */
    path {
        ${strokeVar.set(DEFAULT_STROKE_LEN)}
        vector-effect: non-scaling-stroke;
        stroke-width: ${vars.layouts.checkbox.strokeWidth};
        stroke-dasharray: ${strokeVar};
        transition:
            stroke-dashoffset ${vars.transitions.hover},
            opacity ${vars.transitions.hover};
        opacity: 0;
        stroke-dashoffset: calc((${counterVar} + 1) * ${strokeVar});
        stroke-linecap: ${vars.layouts.checkbox.strokeLine};
        stroke-linejoin: ${vars.layouts.checkbox.strokeLine};
    }
`

export const ClarifyWrapper = styled.div`
    margin-left: 3rem;
`

export const EditorWrapper = styled.div`
    > span {
        font-size: ${vars.font.size.base};
        color: ${vars.colors.text.default};
    }
    margin-top: ${pxToRem(8)};
    margin-bottom: -${pxToRem(8)};
    margin-left: ${pxToRem(11)};
    border-left: 8px solid #d8d8d8;
    padding: ${pxToRem(6)} ${vars.spacing.sm} ${pxToRem(6)} ${vars.spacing.sm};
`

export const CheckboxLabel = styled(FieldLabel)`
    display: inline-block;
    font-weight: ${vars.font.weight.normal};
    line-height: ${vars.font.lineHeight};
    padding: ${pxToRem(4)} 0 ${pxToRem(4)} ${pxToRem(48)};

    &.${clsFlags.error} {
        ${CheckboxIndicatorWrapper} {
            border: ${vars.colors.forms.errorBorder};
            box-shadow: none;

            &.checked::before {
                top: 3px !important;
                left: 3px !important;
            }
        }
    }
`

export const HiddenRadioCheckbox = css`
    position: absolute;
    opacity: 0;
    width: ${pxToRem(32)};
    height: ${pxToRem(32)};
    top: 0;
    left: 0;
    padding: 0;
    margin: 0;
    &:not(:disabled) {
        cursor: pointer;
    }
`

export const CheckboxInput = styled.input`
    ${HiddenRadioCheckbox}

    & + ${CheckboxLabel} ${CheckboxIndicatorWrapper} {
        transition-property: background-color;
        transition-duration: ${vars.transitions.idle};
        transition-timing-function: ${vars.easings.natural};

        &::before {
            position: absolute;
            content: '';
            top: 4px;
            left: 4px;
            border-radius: ${pxToRem(1)};
            width: ${pxToRem(22)};
            height: ${pxToRem(22)};
            transform: scale(0.9);
            background-color: ${vars.colors.checkbox.default};
            opacity: 0;
            transition-property: opacity, transform;
            transition-duration: ${vars.transitions.hover};
            transition-delay: calc(
                (${vars.transitions.idle} - ${vars.transitions.hover}) / 1.5
            );
            transition-timing-function: ${vars.easings.natural};
        }
    }

    &:checked + ${CheckboxLabel} ${CheckboxIndicatorWrapper} {
        path {
            opacity: 1;
            clip-path: calc(${counterVar} * ${strokeVar});
        }

        &::before {
            transition-delay: 0s;
            opacity: 1;
            transform: scale(1);
        }
    }

    &:focus ~ ${CheckboxLabel} ${CheckboxIndicatorWrapper} {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }

    &:disabled + ${CheckboxLabel} {
        ${CheckboxIndicatorWrapper} {
            background-color: ${vars.colors.background.subtle};
            border-color: ${vars.colors.checkbox.disabled.border};
            cursor: none;

            &::before {
                background-color: ${vars.colors.forms.disabled.selected};
            }

            svg {
                color: ${vars.colors.checkbox.disabled.icon};
            }
        }
    }

    &:hover:not(:disabled) + ${CheckboxLabel} {
        ${CheckboxIndicatorWrapper} {
            transition-duration: ${vars.transitions.hover};
            background-color: ${vars.colors.background.linkHover};

            &::before {
                transition-duration: ${vars.transitions.hover};
            }
        }
    }

    ${mq.highContrast()} {
        &:focus ~ ${CheckboxLabel} ${CheckboxIndicatorWrapper} {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            outline-color: Highlight;
            background-color: Background;
            border-color: InactiveBorder;
            color: InfoText;
        }
    }
`
