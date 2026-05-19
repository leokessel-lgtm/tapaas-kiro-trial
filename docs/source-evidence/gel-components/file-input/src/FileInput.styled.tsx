import React, { ComponentPropsWithRef } from 'react'
import styled from 'styled-components'
import { Button, ButtonProps } from '@snsw-gel/button'
import { mq } from '@snsw-gel/theming'

const FileInputButtonLabel = (
    props: ButtonProps & ComponentPropsWithRef<'label'>,
) => {
    // @ts-ignore
    return <Button {...props} variant='secondary' as='label' />
}

export const FileInputButton = styled(FileInputButtonLabel)`
    max-width: 200px;

    ${mq.highContrast()} {
        &:focus-within {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            outline-color: Highlight;
            background-color: Background;
            border-color: InactiveBorder;
            color: InfoText;
            transition: none;
        }
    }
`
