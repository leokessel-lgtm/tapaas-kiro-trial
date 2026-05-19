import React, { Ref } from 'react'
import { forwarded } from '@snsw-gel/utils'
import { InPageAlert, InPageAlertProps } from '@snsw-gel/in-page-alert'

export interface ErrorSummaryProps
    extends Omit<
        InPageAlertProps,
        | 'variant'
        | 'title'
        | 'role'
        | 'tabIndex'
        | 'compact'
        | 'headingLevel'
        | 'children'
    > {
    id?: string
    errors: {
        id: string
        text: string
    }[]
    singularTitle?: string
    pluralTitle?: string
}

export const ErrorSummary = forwarded(
    (props: ErrorSummaryProps, ref: Ref<HTMLDivElement>) => {
        const {
            errors,
            id,
            singularTitle = 'Your form has an error',
            pluralTitle = 'Your form has errors',
            ...rest
        } = props

        const isMoreThanOne = errors.length > 1

        const list = errors.map(({ id, text }) => (
            <li key={id}>
                <a href={id.indexOf('#') === -1 ? `#${id}` : id}>
                    {text.replace(/\.$/, '')}
                </a>
                .
            </li>
        ))

        return (
            <>
                {errors.length > 0 && (
                    <InPageAlert
                        {...rest}
                        title={isMoreThanOne ? pluralTitle : singularTitle}
                        variant='error'
                        tabIndex={-1}
                        role='alert'
                        id={id}
                        ref={ref}
                        data-gel-analytics='error-summary'
                        data-gelweb-component='error-summary'
                    >
                        <p>
                            {isMoreThanOne ?
                                `Check the ${errors.length} errors:`
                            :   'Check the error:'}
                        </p>
                        {isMoreThanOne ?
                            <ol>{list}</ol>
                        :   <ul>{list}</ul>}
                    </InPageAlert>
                )}
            </>
        )
    },
)

// @ts-ignore
ErrorSummary.displayName = 'ErrorSummary'
