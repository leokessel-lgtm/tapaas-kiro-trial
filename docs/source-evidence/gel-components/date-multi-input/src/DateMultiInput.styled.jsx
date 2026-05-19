import styled from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { mq, vars } from '@snsw-gel/theming'
import { Field } from '@snsw-gel/field'

export const DateContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: ${pxToRem(8)};

    input[type='number'] {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }
    }

    > * {
        margin-top: ${pxToRem(0)};
    }

    > * + * {
        margin-left: ${pxToRem(12)};

        ${mq.min('tablet')} {
            margin-left: ${pxToRem(16)};
        }
    }
`

export const CellMonth = styled(Field)`
    ${mq.min('tablet')} {
        min-width: ${vars.layouts.inputWidths.md};
    }
`
