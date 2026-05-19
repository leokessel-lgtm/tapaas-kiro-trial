import styled, { css } from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { Spinner } from './Spinner.styled'
import { vars } from '@snsw-gel/theming'

export const LoaderContainer = styled.div`
    text-align: center;
    position: relative;
    max-width: ${pxToRem(500)};
`

export const SpinnerImageContainer = styled.div`
    text-indent: 100%;
    overflow: hidden;
    width: 100%;
    height: ${pxToRem(70)};

    ${Spinner} {
        position: absolute;
        top: 0;
        transform: translateX(-50%);
        left: 50%;
        width: ${pxToRem(70)};
        height: ${pxToRem(70)};
    }
`

export const LoaderMessage = styled.p`
    margin: ${pxToRem(10)} 0 0;

    &.loader-message--full-page {
        font-size: ${vars.font.size.xxl};
        font-weight: ${vars.font.weight.bold};
    }
`
