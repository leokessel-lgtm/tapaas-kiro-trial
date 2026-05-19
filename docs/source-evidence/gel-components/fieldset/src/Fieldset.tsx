import React, { ReactNode, Ref } from 'react'
import {
    FieldsetLegend,
    FieldsetLegendLabel,
    StyledFieldset,
    flags,
} from './Fieldset.styled'
import { SROnly } from '@snsw-gel/accessibility'
import {
    FieldError,
    FieldGroupHelp,
    ProvideFieldProps,
    FieldErrorMessageProps,
    FieldHelpMessageProps,
    MarginProps,
} from '@snsw-gel/field'
import classNames from 'classnames'
import { VoiceOverString } from '@snsw-gel/types'
import { useId, forwarded } from '@snsw-gel/utils'
import { FocusGroup, FocusGroupProps } from '@snsw-gel/focus-group'

export interface FieldsetProps
    extends FocusGroupProps,
        FieldErrorMessageProps,
        FieldHelpMessageProps,
        MarginProps {
    id?: string
    children?: ReactNode
    className?: string
    legend: VoiceOverString
    /** Optionally style the legend as a label. See 'Small Legend' section above.
     * @default false
     */
    smallLegend?: boolean
    disabled?: boolean
}

export const Fieldset = forwarded(
    (props: FieldsetProps, ref: Ref<HTMLFieldSetElement>) => {
        const {
            id: propsId,
            className,
            children,
            legend,
            hasError,
            helpMessage,
            errorMessage,
            smallLegend,
            margin,
            onBlur,
            onFocus,
            disabled,
            ...rest
        } = props

        const cls = classNames(
            className,
            !!smallLegend && flags.smallLegend,
            'fieldset',
        )
        const id = useId(propsId)

        return (
            <ProvideFieldProps
                provideProps={{
                    hasError,
                }}
            >
                <StyledFieldset
                    ref={ref}
                    className={cls}
                    aria-invalid={hasError}
                    $margin={margin}
                    id={id}
                    disabled={disabled}
                    data-gelweb-component='fieldset'
                    {...rest}
                >
                    {legend && (
                        <FieldsetLegend className='fieldset__legend'>
                            <FieldsetLegendLabel className='fieldset__legend-label'>
                                {legend}
                            </FieldsetLegendLabel>
                            {helpMessage && (
                                <FieldGroupHelp className='fieldset__help'>
                                    {helpMessage}
                                </FieldGroupHelp>
                            )}
                            {hasError && errorMessage && (
                                <SROnly>{errorMessage}</SROnly>
                            )}
                        </FieldsetLegend>
                    )}
                    <FocusGroup onBlur={onBlur} onFocus={onFocus}>
                        {children}
                    </FocusGroup>
                    {hasError && errorMessage && (
                        <FieldError
                            className='fieldset__field-error'
                            aria-hidden={true}
                            data-testid='error'
                        >
                            {errorMessage}
                        </FieldError>
                    )}
                </StyledFieldset>
            </ProvideFieldProps>
        )
    },
)

// @ts-ignore
Fieldset.displayName = 'Fieldset'
