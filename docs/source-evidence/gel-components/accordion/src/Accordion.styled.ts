import styled from 'styled-components'
import { mq, pxToRem, vars } from '@snsw-gel/theming'

export const StyledAccordion = styled.div`
    width: 100%;
`

export const StyledAccordionHeader = styled.div`
    margin-top: 8px;
`

export const StyledAccordionButton = styled.button`
    background-color: ${vars.colors.background.subtle};
    color: ${vars.colors.text.default};
    margin: 0;
    display: flex;
    font-weight: bold;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    align-content: center;
    font-size: ${vars.font.size.base};
    line-height: ${vars.font.lineHeight.body};
    border: none;
    border-bottom: 1px solid ${vars.colors.interactive.secondary.hover};
    cursor: pointer;

    transition-property: background-color, color, border-color;
    transition-duration: ${vars.transitions.idle};
    transition-timing-function: ${vars.easings.natural};
    transition-delay: 0s;

    padding: ${pxToRem(16)};

    ${mq.min('tablet')} {
        padding: ${pxToRem(16)} ${pxToRem(16)} ${pxToRem(16)} ${pxToRem(24)};
    }

    &:hover {
        transition-delay: ${vars.transitions.delay};

        svg {
            transition-delay: ${vars.transitions.delay};
        }
    }

    &:hover,
    &[aria-expanded='true'] {
        transition-duration: ${vars.transitions.hover};
        background-color: ${vars.colors.interactive.secondary.hover};
        color: ${vars.colors.interactive.secondary.hoverText};

        svg {
            fill: currentColor;
        }
    }

    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }

    &:active {
        transition-duration: ${vars.transitions.active};
        transition-delay: 0s;
    }

    span {
        width: 100%;
        margin: 0 ${pxToRem(16)} 0 0;
        text-align: left;
    }

    svg {
        flex: 0 0 ${pxToRem(24)};
        align-self: center;
        fill: ${vars.colors.brand.dark};
        transition-property: fill;
        transition-duration: ${vars.transitions.idle};
        transition-timing-function: ${vars.easings.natural};
        transition-delay: 0s;
    }

    ${mq.highContrast()} {
        border: 1px solid ButtonBorder;

        svg {
            fill: currentColor;
        }

        &:hover {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            border: 1px solid Highlight;
            background-color: Highlight;
            color: HighlightText;
        }
    }
`

export const StyledAccordionContentContainer = styled.div`
    border-left: solid
        ${`${vars.layouts.accordion.contentBorderWidth} ${vars.colors.interactive.secondary.hover}`};
`

export const StyledAccordionContent = styled.section`
    height: auto;
    display: grid;

    transition-property: grid-template-rows;
    transition-duration: ${vars.transitions.hover};
    transition-timing-function: ${vars.easings.natural};
    grid-template-rows: 1fr;

    ${StyledAccordionContentContainer} {
        overflow: hidden;
    }
    .accordion-content__padding {
        margin: ${pxToRem(24)} 0;

        transition-property: opacity, transform, visibility;
        transition-duration: ${vars.transitions.idle};
        transition-timing-function: ${vars.easings.natural};
        opacity: 1;
        visibility: visible;
        transform: translateY(0px);

        padding: 0 ${pxToRem(16)} 0
            calc(${pxToRem(16)} - ${vars.layouts.accordion.contentBorderWidth});

        ${mq.min('tablet')} {
            padding: 0 ${pxToRem(24)} 0
                calc(
                    ${pxToRem(24)} -
                        ${vars.layouts.accordion.contentBorderWidth}
                );
        }
    }

    &.accordion-content--closed {
        grid-template-rows: 0fr;
        transition-duration: ${vars.transitions.idle};
        pointer-events: none;

        .accordion-content__padding {
            opacity: 0;
            transform: translateY(-8px);
            visibility: hidden;
        }
    }
`

export const StyledAccordionToggles = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    align-content: center;

    button:first-child {
        margin-right: ${pxToRem(16)};
    }
`
