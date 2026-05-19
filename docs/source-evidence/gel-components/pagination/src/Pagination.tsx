import React from 'react'
import {
    StyledPagination,
    StyledPaginationNext,
    StyledPaginationNumber,
    StyledPaginationPrev,
} from './Pagination.styled'
import { Button } from '@snsw-gel/button'
import { IconChevronRight } from '@snsw-gel/icons'
import { SROnly } from '@snsw-gel/accessibility'

export interface PaginationProps {
    className?: string
    /**
     * @default 10
     */
    pageSize?: number
    /**
     * totalItems needs to be passed to generate the pagination accordingly
     * */
    totalItems: number
    /**
     * Callback function that recieves the page number and an indexes object including startIndex and endIndex
     *  */
    onPageChange?: (
        pageNo: number,
        indexes: { startIndex: number; endIndex: number },
    ) => void
    /**
     * Needs to be set to define the current page
     */
    currentPage: number
}

export const Pagination = (props: PaginationProps) => {
    const {
        className,
        pageSize = 10,
        totalItems,
        onPageChange,
        currentPage,
    } = props
    // add displayRange as a prop above if it needs to be exposed again
    const totalPages = Math.ceil(totalItems / pageSize)
    const pagesToDisplayCount = Math.min(7, totalPages)

    const changeHandler = (pageNo: number) => {
        const startIndex = (pageNo - 1) * pageSize
        const endIndex = startIndex + pageSize
        onPageChange && onPageChange(pageNo, { startIndex, endIndex })
    }

    const children = []

    const startPageIndex = Math.min(
        totalPages - pagesToDisplayCount,
        Math.max(0, currentPage - 1 - Math.floor(pagesToDisplayCount / 2)),
    )
    const lastPageIndex = startPageIndex + pagesToDisplayCount

    for (let index = 0; index < pagesToDisplayCount; index++) {
        if (index === 1 && startPageIndex !== 0) {
            children.push(
                <div
                    data-testid='page-number-first-separator'
                    key='first-separator'
                    className='pagination__separator'
                >
                    &hellip;
                </div>,
            )
            continue
        }

        if (index === pagesToDisplayCount - 2 && lastPageIndex !== totalPages) {
            children.push(
                <div
                    data-testid='page-number-last-separator'
                    key='last-separator'
                    className='pagination__separator'
                >
                    &hellip;
                </div>,
            )
            continue
        }

        let page = index + startPageIndex + 1
        let testId = `page-number-${page}`

        if (index === 0 && startPageIndex !== 0) {
            testId = 'page-number-first'
            page = 1
        }

        if (index === pagesToDisplayCount - 1 && lastPageIndex !== totalPages) {
            testId = 'page-number-last'
            page = totalPages
        }

        const isActive = currentPage === page

        children.push(
            <StyledPaginationNumber
                // keeps the button focussed
                key={page}
                aria-current={isActive ? 'page' : undefined}
                data-testid={testId}
                current={isActive}
                onClick={() => {
                    if (!isActive) {
                        changeHandler(page)
                    }
                }}
                type='button'
            >
                <div>
                    <SROnly>page </SROnly>
                    {page}
                    {page === 1 && <SROnly> (first page)</SROnly>}
                    {page === totalPages && <SROnly> (last page)</SROnly>}
                </div>
            </StyledPaginationNumber>,
        )
    }

    if (totalPages <= 1) {
        return null
    }

    return (
        <StyledPagination
            aria-label='pagination'
            className={className}
            data-gelweb-component='pagination'
        >
            <StyledPaginationPrev>
                {currentPage !== 1 && (
                    <Button
                        variant='link'
                        data-testid='page-number-prev'
                        onClick={() => changeHandler(currentPage - 1)}
                    >
                        {/* IconChevronLeft is left aligned while IconChevronRight is center aligned */}
                        <IconChevronRight
                            style={{ transform: 'rotate(180deg)' }}
                        />
                        <SROnly>Previous</SROnly>
                    </Button>
                )}
            </StyledPaginationPrev>
            {children}
            <StyledPaginationNext>
                {currentPage !== totalPages && (
                    <Button
                        variant='link'
                        data-testid='page-number-next'
                        onClick={() => changeHandler(currentPage + 1)}
                    >
                        <SROnly>Next</SROnly>
                        <IconChevronRight />
                    </Button>
                )}
            </StyledPaginationNext>
        </StyledPagination>
    )
}
