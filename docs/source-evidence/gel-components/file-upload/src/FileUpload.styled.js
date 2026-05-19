import styled from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'

export const FileUploadWrapper = styled.div`
    .fieldset__legend {
        margin-bottom: 1rem;
    }
`

export const UploadedFilesWrapper = styled.div`
    margin-top: ${pxToRem(16)};

    > * + * {
        margin-top: ${pxToRem(4)};
    }
`
