import styled from 'styled-components'
import { mq, pxToRem, vars } from '@snsw-gel/theming'

export const StyledListboxContainer = styled.div`
    display: block;
    padding: 0;
    margin: 0;
`

export const StyledListBoxItem = styled.div`
    display: flex;
    justify-content: space-between;

    text-decoration: ${vars.textDecoration.autosuggest};

    align-items: center;
    min-height: ${pxToRem(24)};
    padding: ${pxToRem(13)} ${vars.spacing.sm} ${pxToRem(13)} ${vars.spacing.sm};
    margin: 0;
    cursor: pointer;
    position: relative;

    &:before {
        border-top: ${vars.colors.autosuggest.borderTop.default};
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        top: 0;
        left: 0;

        ${mq.highContrast()} {
            border-top: 1px solid ButtonBorder;
        }
    }

    &:first-child {
        &:before {
            content: none;
        }
    }

    // &[data-selected] {
    //     border-left: solid ${pxToRem(4)};
    // }

    &:not([data-show-focus]):hover,
    &[data-focused],
    &:focus {
        outline: none;
        background: ${vars.colors.interactive.secondary.hover};
        color: ${vars.colors.interactive.secondary.hoverText};

        ${mq.highContrast()} {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            background: Highlight;
            color: HighlightText;
        }

        // &[data-selected] {
        //     border-left: solid ${pxToRem(4)} ${vars.colors.brand.dark};
        // }
    }
`

export const StyledListBoxGroup = styled.div`
    > span {
        display: flex;
        border-top: ${vars.colors.autosuggest.borderTop.default};
        background: ${vars.colors.background.subtle};
        padding: ${pxToRem(8)} ${vars.spacing.sm};
        font-weight: ${vars.font.weight.bold};
    }
`
