import React from 'react'
import { mt, mb, StyledHorizontalRule } from './HorizontalRule.styled'

export type HorizontalRuleProps = {
    className?: string
    marginTop?: string
    marginBottom?: string
}

export const HorizontalRule = (props: HorizontalRuleProps) => {
    const { className, marginTop, marginBottom, ...rest } = props

    return (
        <StyledHorizontalRule
            {...rest}
            className={className}
            style={{
                ...(marginTop ? mt.setStyle(marginTop) : {}),
                ...(marginBottom ? mb.setStyle(marginBottom) : {}),
            }}
            data-gelweb-component='horizontal-rule'
        />
    )
}

// @ts-ignore
HorizontalRule.displayName = 'HorizontalRule'
