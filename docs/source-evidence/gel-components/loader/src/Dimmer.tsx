import React, { ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import { DimmerContainer } from './Dimmer.styled'

const defaultAnimDuration = 300

export interface DimmerProps {
    className?: string
    /*
     * @default false
     */
    active?: boolean
    /*
     * @default false
     */
    fullPage?: boolean
    /**
     * @default 300
     */
    animationDuration?: number
    children?: ReactNode
}

export const Dimmer = (props: DimmerProps) => {
    const {
        className,
        active = false,
        fullPage = false,
        children,
        animationDuration = defaultAnimDuration,
    } = props
    const [isActive, setIsActive] = useState(active)

    useEffect(() => {
        if (active) {
            setIsActive(true)
        } else {
            const tm = setTimeout(() => {
                setIsActive(false)
            }, defaultAnimDuration)
            return () => {
                clearTimeout(tm)
            }
        }
    }, [active])

    if (isActive || active) {
        return (
            <DimmerContainer
                className={classNames(
                    className,
                    'dimmer',
                    fullPage && 'dimmer--full-page',
                )}
                style={{
                    opacity: isActive && active ? 1 : 0,
                    transitionDuration: `${animationDuration}ms`,
                }}
            >
                {children}
            </DimmerContainer>
        )
    }

    return null
}
