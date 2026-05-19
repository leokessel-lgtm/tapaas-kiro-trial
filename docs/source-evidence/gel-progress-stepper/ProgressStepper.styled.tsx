import styled from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { mq, vars } from '@snsw-gel/theming'

export const ProgressStepperList = styled.ol`
    display: flex;
    flex-flow: row nowrap;
    padding-inline-start: 0;
    align-content: flex-start;
    margin-block-end: 0;
    margin-block-start: ${vars.spacing.sm};

    ${mq.min('tablet')} {
        margin-block-start: 0;
    }
`

export const ProgressStepperStep = styled.li`
    display: flex;
    flex-flow: column wrap;
    position: relative;
    width: auto;
    flex: 16%;
    text-align: center;
    padding-block: 0;
    padding-inline: 0;
    margin-block-end: 0;

    &:last-child {
        flex: 0;
    }

    ${mq.min('tablet')} {
        align-content: center;
        padding-block: 0;
        padding-inline: ${pxToRem(12)};
        align-items: center;

        &:last-child {
            flex: 16%;
        }
    }

    &:before {
        content: '';
        width: 100%;
        height: 3px;
        position: absolute;
        inset-inline-end: 0;
        top: ${pxToRem(14)};

        ${mq.min('tablet')} {
            inset-inline-end: -50%;
        }
    }

    &.progress-step--completed {
        font-weight: ${vars.font.weight};
        color: ${vars.colors.progressStep.text};

        svg {
            path {
                fill: ${vars.colors.background};
            }

            ${mq.highContrast()} {
                forced-color-adjust: none;
                background-color: Background;
                path {
                    fill: Highlight;
                }
            }
        }

        &:before {
            background-color: ${vars.colors.brand.dark};

            ${mq.highContrast()} {
                forced-color-adjust: none;
                background-color: Highlight;
            }
        }
        div {
            background-color: ${vars.colors.brand.dark};
            border: 2px solid ${vars.colors.brand.dark};

            ${mq.highContrast()} {
                forced-color-adjust: none;
                background-color: Background;
                border: 2px solid Highlight;
                color: Highlight;
            }
        }
    }

    &.progress-step--todo {
        font-weight: ${vars.font.weight.normal};
        color: ${vars.colors.forms.helpText};
        &:before {
            background-color: ${vars.colors.forms.disabled.border};

            ${mq.highContrast()} {
                forced-color-adjust: none;
                background-color: white;
            }
        }
        div {
            background-color: ${vars.colors.background};
        }
    }

    &.progress-step--current {
        background-color: transparent;
        font-weight: ${vars.font.weight.bold};
        color: ${vars.colors.progressStep.text};

        div {
            font-size: ${vars.font.progressStep.currentText};
            padding-block-start: ${pxToRem(3.5)};
            background: ${vars.colors.brand.dark};
            border: 2px solid ${vars.colors.brand.dark};
            color: ${vars.colors.text.reversed};

            ${mq.highContrast()} {
                forced-color-adjust: none;
                background: Background;
                border: 2px solid Highlight;
                color: Highlight;
            }
        }
        &:before {
            background-color: ${vars.colors.forms.disabled.border};

            ${mq.highContrast()} {
                forced-color-adjust: none;
                background-color: white;
            }
        }
    }

    &:last-child {
        &:before {
            display: none;
        }
    }
`

export const StepPosition = styled.div`
    font-size: ${vars.font.progressStep.text};
    border-radius: 50%;
    width: ${vars.spacing.lg};
    height: ${vars.spacing.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: ${pxToRem(3)};
    padding-inline: ${pxToRem(3)};
    text-align: center;
    background: ${vars.colors.background};
    border: 2px solid ${vars.colors.forms.disabled.border};
    color: ${vars.colors.text.subtle};
    position: relative;
    svg {
        background-color: ${vars.colors.brand.dark};
    }
    .progress-step--position {
        font-weight: ${vars.font.weight.accent};
    }
`

export const MobileStepLabel = styled.span`
    font-size: ${vars.font.size.base};
    font-weight: ${vars.font.weight.bold};
    color: ${vars.colors.progressStep.text};
    display: block;

    ${mq.min('tablet')} {
        display: none;
    }
`

export const StepLabel = styled.span`
    margin-block-start: ${vars.spacing.md};
    display: none;

    ${mq.min('tablet')} {
        display: inherit;
        font-size: ${vars.font.size.base};
    }
`
