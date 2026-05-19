import styled from 'styled-components'
import { vars, pxToRem, mq } from '@snsw-gel/theming'

export const FullScreenOpac = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${vars.colors.background['scrim']};
    transition: opacity ${vars.transitions.idle} ${vars.easings.natural};

    &.out {
        opacity: 0;
    }
`

export const SlidingTransition = styled.div`
    position: fixed;
    top: 0;
    left: 30%;
    width: 70%;
    height: 100%;
    z-index: 2000;

    transition: transform ${vars.transitions.idle} ${vars.easings.natural};

    transform: translateX(0);

    &.out {
        transform: translateX(110%);
    }

    ${mq.min('desktop')} {
        left: 50%;
        width: 50%;
    }
`

export const StyledSlidingModal = styled.div`
    position: relative;
    min-height: 4rem;
    z-index: 2001;
    background-color: ${vars.colors.background.default};
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    height: 100%;
    justify-content: flex-start;
    overflow-y: auto;

    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: -6px;
    }

    ${mq.highContrast()} {
        border: solid ${vars.focus.default} transparent;
    }
`

export const StyledSlidingModalCloseButton = styled.button`
    position: absolute;
    top: ${pxToRem(8)};
    right: ${pxToRem(8)};
    width: ${pxToRem(48)};
    height: ${pxToRem(48)};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;

    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }

    svg {
        fill: ${vars.colors.text.default};
        width: ${vars.spacing.sm};
        height: ${vars.spacing.sm};
    }

    ${mq.highContrast()} {
        svg {
            fill: currentColor;
        }
    }
`

export const StyledSlidingModalHeader = styled.div`
    padding: ${pxToRem(20)} ${pxToRem(40)} ${pxToRem(20)} ${pxToRem(20)};
    border-bottom: solid 1px ${vars.colors.border.subtle};

    > h1 {
        &.sliding-modal__heading {
            margin-right: ${pxToRem(32)};
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    > p {
        margin: 0;
    }

    ${mq.min('lgMobile')} {
        padding: ${pxToRem(32)} ${pxToRem(32)} ${pxToRem(16)} ${pxToRem(32)};
    }
`

export const StyledSlidingModalBody = styled.div`
    padding: ${pxToRem(16)} ${pxToRem(20)};

    ${mq.min('lgMobile')} {
        padding: ${pxToRem(16)} ${pxToRem(32)};
    }
`

export const StyledSlidingModalIconButton = styled.button`
    cursor: pointer;
    position: relative;
    background: none;
    padding: 0;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: ${vars.colors.text.link};

    svg {
        margin: 0;
        width: ${pxToRem(20)} !important;
        height: ${pxToRem(20)} !important;
    }

    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }

    &:before {
        content: '';
        position: absolute;
        width: ${pxToRem(24)};
        height: ${pxToRem(24)};
    }

    &:hover {
        color: ${vars.colors.interactive.link.hoverText};
        background-color: ${vars.colors.interactive.link.hover};
    }
`
