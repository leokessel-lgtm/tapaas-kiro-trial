import styled from 'styled-components'
import { vars } from '@snsw-gel/theming'

export const DimmerContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;

    &.dimmer--full-page {
        position: fixed;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${vars.colors.background.cover} !important;
    transition-property: opacity;
`
