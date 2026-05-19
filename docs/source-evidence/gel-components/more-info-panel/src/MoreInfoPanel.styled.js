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
`

export const StyledMoreInfoPanel = styled.div`
    position: fixed;
    top: 0;
    left: 30%;
    width: 70%;
    height: 100%;
    z-index: 2000;

    transition: transform ${vars.transitions.idle} ${vars.easings.natural};

    transform: translateX(0);

    ${mq.min('desktop')} {
        left: 50%;
        width: 50%;
    }
`

export const StyledMoreInfoPanelOverflow = styled.div`
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

export const StyledMoreInfoPanelCloseButton = styled.button`
    position: absolute;
    top: ${vars.spacing.xs};
    right: ${vars.spacing.xs};
    width: ${vars.spacing.xxl};
    height: ${vars.spacing.xxl};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    color: ${vars.colors.text.default};

    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }

    svg {
        fill: currentColor;
        width: ${vars.spacing.sm};
        height: ${vars.spacing.sm};
    }

    ${mq.min('lgMobile')} {
        right: ${vars.spacing.sm};
    }
`

export const StyledMoreInfoPanelHeader = styled.div`
    padding: ${vars.spacing.md} ${vars.spacing.xl} ${vars.spacing.sm} ${vars.spacing.md};
    border-bottom: solid 1px ${vars.colors.border.subtle};

    > h1 {
        &.more-info-panel__heading {
            margin-right: ${vars.spacing.lg};

            ${mq.min('lgMobile')} {
                margin-right: ${vars.spacing.xxl};
            }
            margin-top: 0;
            margin-bottom: 0;
        }
    }

    > p {
        margin: 0;
    }

    ${mq.min('lgMobile')} {
        padding: ${vars.spacing.lg} ${vars.spacing.lg} ${vars.spacing.sm} ${vars.spacing.lg};
    }
`

export const StyledMoreInfoPanelBody = styled.div`
    > :first-child {
        margin-top: 0;
    }

    padding: ${vars.spacing.sm} ${vars.spacing.md};

    ${mq.min('lgMobile')} {
        padding: ${vars.spacing.sm} ${vars.spacing.lg} ${vars.spacing.md} ${vars.spacing.lg};
    }
`
