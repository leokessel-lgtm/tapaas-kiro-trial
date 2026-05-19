import styled from 'styled-components'
import { Input } from '@snsw-gel/input'
import { vars } from '@snsw-gel/theming'

export const StyledManualAddress = styled.div`
    width: 100%;
`

export const ReadonlyInput = styled(Input)`
    opacity: 1;
    background-color: ${vars.colors.background.subtle};
    color: ${vars.colors.text.subtle};
`
