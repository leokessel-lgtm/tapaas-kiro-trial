import styled, { css } from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { vars, mq } from '@snsw-gel/theming'

export const StyledButton = styled.button``

export const StyledPagination = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    .pagination__separator {
        display: inline-block;
        text-align: center;
        color: ${vars.colors.text.link};
        width: ${pxToRem(32)};
        margin: 0 ${pxToRem(3)};
        ${mq.min('tablet')} {
            width: ${pxToRem(40)};
            margin: 0 ${pxToRem(4)};
        }
    }
`

const StyledPaginationButtons = css`
    width: ${pxToRem(32)};
    height: ${pxToRem(32)};
    margin: 0 ${pxToRem(3)};

    ${mq.min('tablet')} {
        height: ${pxToRem(40)};
        width: ${pxToRem(40)};
        margin: 0 ${pxToRem(4)};
    }

    .button--link {
        width: ${pxToRem(32)};
        height: ${pxToRem(32)};

        svg {
            fill: currentColor;
        }

        ${mq.min('tablet')} {
            height: ${pxToRem(40)};
            width: ${pxToRem(40)};
        }

        &:hover,
        &:focus,
        &:active {
            background-color: ${vars.colors.background.default};
            color: ${vars.colors.interactive.secondary.text};

            svg {
                fill: currentColor;
            }
        }
    }
`

export const StyledPaginationPrev = styled.div`
    ${StyledPaginationButtons};
    button {
        text-align: right;
    }
`

export const StyledPaginationNext = styled.div`
    ${StyledPaginationButtons};
`

export const StyledPaginationNumber = styled(StyledButton)`
    display: flex;
    padding: unset;
    border-radius: 100px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: ${pxToRem(32)};
    width: ${pxToRem(32)};
    border: none;
    font-size: ${pxToRem(13)};
    margin: 0 ${pxToRem(3)};
    font-weight: ${vars.font.weight.bold};
    background: transparent;
    color: ${vars.colors.text.link};
    text-decoration: underline;

    &[aria-current='page'] {
        background-color: ${vars.colors.text.link};
        color: ${vars.colors.background.default};
        cursor: auto;
        text-decoration: none;
    }

    ${mq.min('tablet')} {
        height: ${pxToRem(40)};
        width: ${pxToRem(40)};
        margin: 0 ${pxToRem(4)};
        font-size: ${pxToRem(16)};
    }
    ${mq.highContrast()} {
        border-radius: 100px;
        border: ${props =>
            props.current
                ? `3px solid ${vars.colors.neutral.grey200};`
                : 'unset'};
    }
    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }
`
