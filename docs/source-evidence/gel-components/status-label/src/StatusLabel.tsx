import React from 'react'
import {
    statusLabelClassNames,
    StyledStatusLabel,
    Variant,
} from './StatusLabel.styled'
import classNames from 'classnames'

export interface StatusLabelProps {
    text: string
    variant?: Variant
    className?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export function StatusLabel(props: StatusLabelProps) {
    const { text, variant = 'neutral', ...rest } = props

    return (
        <StyledStatusLabel
            {...rest}
            className={classNames(
                statusLabelClassNames[variant],
                rest.className,
            )}
            data-gelweb-component={`status-label-${variant}`}
        >
            {text}
        </StyledStatusLabel>
    )
}
