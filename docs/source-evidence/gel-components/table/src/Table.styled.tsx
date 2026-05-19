import styled, { css } from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { vars } from '@snsw-gel/theming'

export const StyledTableContainer = styled.div`
    width: 100%;
    margin-bottom: ${vars.spacing.lg};

    h3 {
        margin: 0 0 ${vars.spacing.sm} 0 !important;
    }
    h3:has(+ p) {
        margin: 0 !important;
    }
    p {
        margin: 0 0 ${vars.spacing.sm} 0;
    }
    & > div:first-of-type {
        overflow-x: auto;
    }

    &:focus,
    :focus-within {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }
`

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    &.table--striped {
        tbody {
            tr {
                &:nth-of-type(odd) {
                    background-color: ${vars.colors.background.default};
                }
                &:nth-of-type(even) {
                    background-color: ${vars.colors.background.subtle};
                }
            }
        }
    }
`

export const StyledTableHead = styled.thead`
    background-color: ${vars.colors.background.median};
`

export const StyledTableBody = styled.tbody``

export const StyledTableRow = styled.tr`
    border-top: 1px solid ${vars.colors.background.subtle};
    border-bottom: 1px solid ${vars.colors.background.subtle};
`

const alignOptions = ['left', 'center', 'right']

export const StyledTableHeader = styled.th`
    padding: ${pxToRem(16)};

    ${alignOptions.map(align => {
        return css`
            &.table-header--align-${align} {
                text-align: ${align};
            }
        `
    })}
`

export const StyledTableCell = styled.td`
    padding: ${pxToRem(16)};

    ${alignOptions.map(align => {
        return css`
            &.table-cell--align-${align} {
                text-align: ${align};
            }
        `
    })}
`
