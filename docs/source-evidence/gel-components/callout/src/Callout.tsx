import React from 'react'
import { InPageAlert, InPageAlertProps } from '@snsw-gel/in-page-alert'

export interface CalloutProps extends Omit<InPageAlertProps, 'variant'> {}

export const Callout = (props: CalloutProps) => (
    <InPageAlert {...props} variant='callout' />
)

//@ts-ignore
Callout.displayName = 'Callout'
