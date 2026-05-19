import React from 'react'
import {
    LoaderContainer,
    LoaderMessage,
    SpinnerImageContainer,
} from './Loader.styled'
import { Spinner } from './Spinner.styled'

export interface LoaderProps {
    content?: string
    fullPage?: boolean
}

export const Loader = ({
    content = 'Loading...',
    fullPage = false,
}: LoaderProps) => (
    <LoaderContainer aria-hidden={true}>
        <SpinnerImageContainer>
            <Spinner />
        </SpinnerImageContainer>
        <LoaderMessage className={fullPage ? 'loader-message--full-page' : ''}>
            {content}
            <br />
        </LoaderMessage>
    </LoaderContainer>
)
