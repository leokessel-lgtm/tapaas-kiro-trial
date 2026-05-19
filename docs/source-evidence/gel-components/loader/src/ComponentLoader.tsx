import React from 'react'
import { Dimmer } from './Dimmer'
import { Loader } from './Loader'
import { SROnly } from '@snsw-gel/accessibility'

export interface ComponentLoaderProps {
    className?: string
    active?: boolean
    label?: string
    fullPage?: boolean
}

export const ComponentLoader = ({
    className,
    active = true,
    label = 'Loading...',
    fullPage = false,
}: ComponentLoaderProps) => {
    return (
        <Dimmer className={className} active={active} fullPage={fullPage}>
            <SROnly role='status'>{label}</SROnly>
            <Loader content={label} fullPage={fullPage} />
        </Dimmer>
    )
}
