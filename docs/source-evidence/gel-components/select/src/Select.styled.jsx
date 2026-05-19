import styled from 'styled-components'
import { baseInputStyles, inputWidthVar } from '@snsw-gel/field'
import { pxToRem } from '@snsw-gel/theming'
import { vars, clsFlags } from '@snsw-gel/theming'

export const flags = {
    hasValue: 'has-value',
    isSmall: 'is-small',
}

export const StyledSelect = styled.select``

export const SelectWrapper = styled.div`
    position: relative;
    max-width: ${inputWidthVar};
    color: ${vars.colors.text.default};
    margin-top: ${pxToRem(4)};

    select {
        ${baseInputStyles}
        width: 100%;
        max-width: 100%;
        color: inherit;
        margin-top: 0;
        cursor: pointer;
        padding-right: ${vars.spacing.xl};

        &:-moz-focusring {
            color: transparent;
            text-shadow: 0 0 0 ${vars.colors.text.default};
        }
        &::-ms-expand {
            display: none;
        }

        option:not(:checked) {
            color: ${vars.colors.text.default};
        }
    }

    & > select:has(option:not([value='']):checked) {
        color: ${vars.colors.text.default};
    }

    &.${flags.isSmall} {
        max-width: ${pxToRem(174)};
    }

    &.${flags.hasValue} select {
        color: ${vars.colors.text.default};
    }

    svg {
        fill: currentColor;
    }

    svg {
        position: absolute;
        top: 50%;
        right: ${vars.layouts.select.margin};
        pointer-events: none;
        transform: translateY(-50%);
        width: ${vars.layouts.select.size};
        height: ${vars.layouts.select.size};
    }

    &.${clsFlags.disabled} {
        svg {
            fill: ${vars.colors.neutral.grey300};
        }
    }
`
