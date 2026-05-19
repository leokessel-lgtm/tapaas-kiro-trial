import React, { ReactNode } from 'react'
import { StyledDiv } from './HeadingWithIcon.styled'
import { Heading, HeadingProps } from './Heading'

export interface HeadingWithIconProps {
    children: string
    className?: string
    level?: HeadingProps['level']
    icon: ReactNode
    type?: string
}

export const HeadingWithIcon = (props: HeadingWithIconProps) => {
    const { children, className, level = 1, icon } = props
    return (
        <StyledDiv>
            {icon}
            <Heading className={className} level={level}>
                {children}
            </Heading>
        </StyledDiv>
    )
}
