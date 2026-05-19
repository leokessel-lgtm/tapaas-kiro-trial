import styled from 'styled-components'
import { createVar, vars } from '@snsw-gel/theming'

export const mt = createVar('margin-top', '3.5rem')
export const mb = createVar('margin-bottom', '3.5rem')

export const StyledHorizontalRule = styled.hr`
    display: block;
    margin-top: ${mt};
    margin-bottom: ${mb};
    margin-left: 0;
    margin-right: 0;
    height: 0;
    box-sizing: content-box;
    overflow: visible;
    background: none;
    border-top: 2px solid ${vars.colors.horizontalRule.default};
    border-bottom: none;
    border-left: none;
    border-right: none;
`
