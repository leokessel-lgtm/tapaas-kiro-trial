import styled from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
// @ts-ignore
import { vars, mq } from '@snsw-gel/theming'

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: ${vars.colors.background['scrim']};
    z-index: 2000;

    ${mq.min('lgMobile')} {
        align-items: center;
    }
`

export const BgClicker = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`

export const StyledModal = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    max-height: 100%;
    width: 100%;
    max-width: ${pxToRem(708)};
    z-index: 2;

    a {
        text-decoration: underline;
    }

    ${mq.min('lgMobile')} {
        position: relative;
        left: auto;
        right: auto;
        bottom: auto;
        min-width: ${pxToRem(400)};
        margin-left: ${vars.grid.padding};
        margin-right: ${vars.grid.padding};
    }
`

export const StyledModalContainer = styled.div`
    width: 100%;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${vars.colors.background.default};

    ${mq.highContrast()} {
        border: solid ${vars.focus.default} transparent;
    }

    ${mq.min('lgMobile')} {
        border-radius: ${vars.radius.regular};
    }

    ${mq.min('tablet')} {
        max-height: 90vh;
    }
`

export const StyledModalHeader = styled.div`
    align-items: flex-start;
    flex-shrink: 0;
    padding: ${`${vars.spacing.md} ${vars.spacing.md} ${vars.spacing.xs} ${vars.spacing.none}`};
    position: relative;
    order: -2;
    width: calc(100% - ${vars.spacing.xxl}); // minus size of close button (48px)

    h2 {
        margin: 0;
    }

    & ~ p {
        margin: 0;
    }

    ${mq.min('lgMobile')} {
        padding: ${`${vars.spacing.md} ${vars.spacing.md} ${vars.spacing.xs} ${vars.spacing.none}`};
    }
`

export const StyledModalBody = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

export const StyledModalOverflow = styled.div`
    position: relative;
    padding: 0 ${pxToRem(20)};
    overflow-y: auto;
    transition: border-color 0.5s ease;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    ${mq.min('lgMobile')} {
        padding: ${`${vars.spacing.none} ${vars.spacing.lg}`};
    }

    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: -6px;
    }
`

export const StyledModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 0;
    flex-shrink: 0;
    padding: ${`${vars.spacing.sm} ${vars.spacing.none} ${vars.spacing.xxl} ${vars.spacing.none}`};
    width: 100%;
    padding-bottom: calc(${vars.spacing.xxl} + env(safe-area-inset-bottom));

    ${mq.min('lgMobile')} {
        padding: ${`${vars.spacing.lg} ${vars.spacing.none} ${vars.spacing.xxl} ${vars.spacing.none}`};
    }

    ${mq.min('tablet')} {
        padding: ${`${vars.spacing.lg} ${vars.spacing.none}`};
    }

    &.overflow-padding {
        padding: ${`${vars.spacing.sm} ${vars.spacing.none} ${vars.spacing.xxl} ${vars.spacing.none}`};

        ${mq.min('lgMobile')} {
            padding: ${`${vars.spacing.sm} ${vars.spacing.none} ${vars.spacing.xxl} ${vars.spacing.none}`};
        }

        ${mq.min('tablet')} {
            padding: ${`${vars.spacing.sm} ${vars.spacing.none} ${vars.spacing.lg} ${vars.spacing.none}`};
        }
    }
`

export const StyledModalButtonGroup = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: column-reverse;
    justify-content: flex-end;
    z-index: 1;

    button {
        width: 100%;

        + button {
            margin-bottom: ${vars.spacing.sm};
        }
    }

    ${mq.min('tablet')} {
        flex-wrap: nowrap;
        flex-direction: row;

        button {
            width: auto;

            + button {
                margin-bottom: 0;
                margin-left: ${vars.spacing.sm};
            }
        }
    }
`

export const StyledModalCloseButton = styled.button`
    top: ${vars.spacing.xs};
    right: ${vars.spacing.xs};
    width: ${vars.spacing.xxl};
    height: ${vars.spacing.xxl};

    background: none;
    border: none;
    order: -1;
    margin: 0 0 auto auto;
    transform: translate(12px, ${vars.spacing.xs});

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

    ${mq.min('lgMobile')} {
        transform: translate(${vars.spacing.md}, ${vars.spacing.xs});
    }
`
