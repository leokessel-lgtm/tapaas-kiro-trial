import styled from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { Fieldset } from '@snsw-gel/fieldset'

export const CheckboxListFieldset = styled(Fieldset)`
    .fieldset__field-error {
        margin-top: ${pxToRem(24)};
    }

    .checkbox-list__editor-text {
        margin: 0;
    }
`
