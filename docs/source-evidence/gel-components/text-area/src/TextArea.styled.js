import styled from 'styled-components'
import { baseInputStyles } from '@snsw-gel/field'
import { pxToRem } from '@snsw-gel/theming'
import { vars } from '@snsw-gel/theming'

export const StyledTextArea = styled.textarea`
    ${baseInputStyles}
    padding-top: ${pxToRem(11)};
    padding-bottom: ${pxToRem(11)};
    line-height: ${vars.font.lineHeight.body};
    display: block;
    height: auto;
`
