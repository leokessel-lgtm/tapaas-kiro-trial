import styled, { css } from 'styled-components'
import { pxToRem, vars } from '@snsw-gel/theming'

export const textLinkStyles = css`
    text-decoration: underline;
    color: ${vars.colors.text.link};
    font-weight: ${vars.font.weight.accent};

    transition-duration: ${vars.transitions.idle};
    transition-property: color;
    transition-timing-function: ${vars.easings.natural};

    svg {
        fill: currentColor;
        width: ${pxToRem(12)};
        height: ${pxToRem(12)};
        margin-left: ${pxToRem(4)};
        vertical-align: text-bottom;
    }

    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }

    &:hover {
        color: ${vars.colors.text.linkHover};
        background-color: ${vars.colors.background.linkHover};
        transition-duration: ${vars.transitions.hover};
    }

    &:active {
        transition-duration: ${vars.transitions.active};
        background-color: ${vars.colors.background.linkActive};
    }

    &:visited {
        transition-duration: ${vars.transitions.active};
        color: ${vars.colors.text.linkVisited};
        svg {
            fill: ${vars.colors.text.linkVisited};
        }
    }
`

export const LinkContainer = styled.a`
    ${textLinkStyles}
`
