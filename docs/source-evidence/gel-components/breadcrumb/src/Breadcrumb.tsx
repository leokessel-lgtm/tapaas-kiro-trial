import React, { Ref } from 'react'
import { Link } from 'react-router-dom'
import {
    BreadcrumbContainer,
    BreadcrumbList,
    BreadcrumbListItem,
} from './Breadcrumb.styled'
import { IconChevronRight } from '@snsw-gel/icons'
import { forwarded } from '@snsw-gel/utils'

export interface BreadcrumbProps {
    className?: string
    linksList: {
        content: string
        path: string
    }[]
}

export interface BreadcrumbItemProps {
    content: string
    path: string
    key: number
}

export const Breadcrumb = forwarded(
    (props: BreadcrumbProps, ref?: Ref<HTMLDivElement>) => {
        const { className, linksList, ...rest } = props

        const breadcrumbListItems = linksList.map(
            ({ content, path }, index) => {
                const hideOnMobile =
                    index !== linksList.length - 1 &&
                    index !== linksList.length - 2

                return (
                    <BreadcrumbItem
                        {...(hideOnMobile && { className: 'hide-on-mobile' })}
                        content={content}
                        path={path}
                        key={index}
                    />
                )
            },
        )

        return (
            <BreadcrumbContainer
                ref={ref}
                className={className}
                aria-label='Breadcrumb'
                data-gelweb-component='breadcrumb'
                {...rest}
            >
                <BreadcrumbList>{breadcrumbListItems}</BreadcrumbList>
            </BreadcrumbContainer>
        )
    },
)

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
    const { content, path, ...rest } = props

    const isExternal =
        path.startsWith('http://') ||
        path.startsWith('https://') ||
        path.startsWith('//')

    return (
        <BreadcrumbListItem {...rest}>
            <IconChevronRight />
            {isExternal ?
                <a data-gel-analytics='breadcrumb' href={path}>
                    {content}
                </a>
            :   <Link data-gel-analytics='breadcrumb' to={path}>
                    {content}
                </Link>
            }
        </BreadcrumbListItem>
    )
}

// @ts-ignore
Breadcrumb.displayName = 'Breadcrumb'
