import styled from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'

import { IconUpload } from '@snsw-gel/icons'
import { clsFlags, vars } from '@snsw-gel/theming'

export const UploadIcon = styled(IconUpload)`
    width: ${vars.spacing.icons.lg};
    height: ${vars.spacing.icons.lg};
    fill: ${vars.colors.dropzone.icon};
    margin-top: ${vars.spacing.xs};
    margin-bottom: ${vars.spacing.md};
`

export const Fieldset = styled.fieldset`
    border: none;
    padding: 0;
`

export const Legend = styled.legend`
    font-weight: ${vars.font.weight.bold};
    font-size: ${pxToRem(28)};
    margin-bottom: ${vars.spacing.md};
`

export const DropZoneWrapper = styled.div`
    border-radius: 6px;

    padding: ${`${vars.spacing.md} ${vars.spacing.md} ${vars.spacing.lg} ${vars.spacing.md}`};
    border: 2px dashed ${vars.colors.border.default};

    min-height: 228px;
    position: relative;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    flex-flow: column;
    justify-content: center;

    &.drop-zone--dragged-over {
        border: 2px dashed ${vars.colors.interactive.secondary.hover};
    }

    &.${clsFlags.error} {
        border: 2px dashed ${vars.colors.border.error};
    }
`

export const DropZoneMask = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: center;
    background: ${vars.colors.background.subtle};
    height: 100%;
    width: 100%;
    font-size: ${pxToRem(36)};
    font-weight: ${vars.font.weight.bold};
    color: ${vars.colors.forms.helpText};
`

export const DropZoneText = styled.div`
    max-width: 368px;
    margin: 0 auto;

    p {
        color: ${vars.colors.text.subtle};
        margin-top: 0;
    }
`
