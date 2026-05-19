import { pxToRem } from '@snsw-gel/theming'
import styled, { css } from 'styled-components'
import { vars, mq } from '@snsw-gel/theming'

const hover = childCss => {
    return css`
        @media (hover: hover) and (any-pointer: fine) {
            // prettier-ignore
            &:hover {
                ${childCss}
            }
        }
    `
}

export const genericButtonStyles = css`
    --anim-duration: ${vars.transitions.idle};
    --gap: ${vars.spacing.xs};

    font-family: ${vars.font.body};
    height: auto;
    width: 100%;
    padding: calc((48px - 4px - 1.5rem) / 2) ${vars.spacing.md};
    line-height: ${vars.font.lineHeight.body};
    font-size: 1rem;
    font-weight: ${vars.font.weight.medium};
    text-align: center;
    text-decoration: none;
    border-radius: ${vars.radius.regular};
    cursor: pointer;
    border: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    transition-property: border-color, background-color, color;

    transition-duration: var(--anim-duration);

    svg {
        fill: currentColor;
    }

    .iconFlex {
        display: flex;
    }

    .iconStart {
        margin-right: var(--gap);
        svg {
            fill: currentColor;
        }
    }

    .iconEnd {
        margin-left: var(--gap);
        svg {
            fill: currentColor;
        }
    }

    .iconExt {
        margin-left: ${pxToRem(4)};
    }

    &:hover {
        --anim-duration: ${vars.transitions.hover};
    }
    &:active {
        --anim-duration: ${vars.transitions.active};
    }

    &:focus,
    &:focus-within {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }

    &:disabled,
    &.button--disabled {
        cursor: not-allowed;
        -webkit-transition: none;
        transition: none;
    }
`

const StyledButton = styled.button`
    ${genericButtonStyles}

    svg {
        width: ${vars.icon.size};
        height: ${vars.icon.size};
    }

    ${mq.min('lgMobile')} {
        width: auto;
        min-width: ${pxToRem(200)};
    }

    &.button--primary {
        color: ${vars.colors.interactive.primary.text};
        background-color: ${vars.colors.interactive.primary.default};
        border: 2px solid ${vars.colors.interactive.primary.default};

        ${hover(css`
            background-color: ${vars.colors.interactive.primary.hover};
            border-color: transparent;
        `)}

        &:active:not(:disabled) {
            background-color: ${vars.colors.interactive.primary.active};
            border-color: transparent;
        }

        &:disabled,
        &.button--disabled {
            color: ${vars.colors.interactive.primary.disabledText};
            background-color: ${vars.colors.interactive.primary.disabled};
            border: 2px solid ${vars.colors.interactive.primary.disabled};
        }

        ${mq.print()} {
            border: 2px solid ${vars.colors.interactive.primary.default};
            background: ${vars.colors.text.default};
            color: ${vars.colors.background.default};
        }
    }

    &.button--secondary {
        color: ${vars.colors.interactive.secondary.text};
        background-color: ${vars.colors.interactive.secondary.default};
        border: 2px solid ${vars.colors.interactive.secondary.border};

        ${hover(css`
            color: ${vars.colors.interactive.secondary.hoverText};
            background-color: ${vars.colors.interactive.secondary.hover};
        `)}

        &:active {
            color: ${vars.colors.interactive.secondary.activeText};
            background-color: ${vars.colors.interactive.secondary.active};
        }

        &:disabled,
        &.button--disabled {
            color: ${vars.colors.interactive.secondary.disabledText};
            background-color: ${vars.colors.interactive.secondary.disabled};
            border: 2px solid
                ${vars.colors.interactive.secondary.disabledBorder};
        }

        ${mq.print()} {
            border: 2px solid ${vars.colors.interactive.secondary.border};
            background: ${vars.colors.white};
            color: ${vars.colors.interactive.secondary.border};
        }
    }

    &.button--tertiary {
        color: ${vars.colors.interactive.tertiary.text};
        background-color: transparent;
        border: 2px solid transparent;
        text-decoration: ${vars.colors.interactive.tertiary.underlines};

        ${hover(css`
            color: ${vars.colors.interactive.tertiary.hoverText};
            background-color: ${vars.colors.interactive.secondary.hover};
        `)}

        &:active {
            color: ${vars.colors.interactive.tertiary.activeText};
            background-color: ${vars.colors.interactive.secondary.active};
        }

        &:disabled,
        &.button--disabled {
            color: ${vars.colors.interactive.tertiary.disabledText};
            background: none;
        }

        ${mq.print()} {
            color: ${vars.colors.interactive.secondary.hover};
        }
    }

    &.button--destructive {
        color: ${vars.colors.interactive.destructive.text};
        background-color: ${vars.colors.interactive.destructive.default};
        border: 2px solid transparent;

        ${hover(css`
            background-color: ${vars.colors.interactive.destructive.hover};
        `)}

        &:active {
            background-color: ${vars.colors.interactive.destructive.default};
        }

        &:disabled,
        &.button--disabled {
            background: ${vars.colors.interactive.destructive.disabled};
            border: ${vars.colors.interactive.destructive.disabled};
        }

        ${mq.print()} {
            color: ${vars.colors.interactive.destructive.default};
        }
    }

    &.button--link {
        text-decoration: underline;
        padding: 0 2px;
        text-align: left;
        min-width: 0;
        background: none;
        color: ${vars.colors.text.link};
        border-radius: 0;
        width: auto;

        ${mq.min('lgMobile')} {
            width: auto;
            min-width: 0;
        }

        ${hover(css`
            color: ${vars.colors.interactive.link.hoverText};
            background-color: ${vars.colors.interactive.link.hover};
        `)}

        &:active {
            background-color: ${vars.colors.interactive.link.active};
        }

        &:disabled,
        &.button--disabled {
            color: ${vars.colors.interactive.secondary.disabledText};
            background: none;
            border: none;
        }
    }
`

export default StyledButton
