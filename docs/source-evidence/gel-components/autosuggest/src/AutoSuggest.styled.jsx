import styled from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { inputWidthVar } from '@snsw-gel/field'
import { vars } from '@snsw-gel/theming'

export const AutoSuggestContainer = styled.div`
    position: relative;

    max-width: ${inputWidthVar};

    .input[aria-expanded='true'] {
        border-radius: 6px 6px 0 0;
    }

    input[type='search']::-webkit-search-decoration,
    input[type='search']::-webkit-search-cancel-button,
    input[type='search']::-webkit-search-results-button,
    input[type='search']::-webkit-search-results-decoration {
        -webkit-appearance: none;
    }

    .popover {
        position: absolute;
        top: 100%;
        left: 0;
        width: ${inputWidthVar};
        z-index: 1;
        overflow: auto;
        max-height: ${pxToRem(358)};
        border-radius: 0 0 6px 6px;
        box-shadow: ${vars.shadow.autosuggest};
        border: ${vars.colors.autosuggest.border};
        border-top: none;
        background-color: ${vars.colors.background.level1};
    }
`
