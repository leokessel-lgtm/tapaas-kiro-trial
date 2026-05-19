import React, {
    ReactNode,
    isValidElement,
    ReactElement,
    useRef,
    useState,
    useEffect,
} from 'react'
import { StyledTable, StyledTableHead } from './Table.styled'
import { StyledTableBody } from './Table.styled'
import { StyledTableCell } from './Table.styled'
import { StyledTableContainer } from './Table.styled'
import { StyledTableHeader } from './Table.styled'
import { StyledTableRow } from './Table.styled'
import { Heading } from '@snsw-gel/content'
import { useResizeObserver } from '@snsw-gel/utils'
import cls from 'classnames'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    className?: string
    /** Accepts the `TableHead`, `TableBody`, `TableRow`, `TableHeader`, `TableCell` elements */
    children: ReactNode
    striped?: boolean
}

export const Table = (props: TableProps) => {
    const { className, children, striped, ...rest } = props
    return (
        <StyledTable
            className={cls(className, striped && 'table--striped')}
            {...rest}
            data-gelweb-component='table'
        >
            {children}
        </StyledTable>
    )
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Accepts the `TableRow`, `TableCell` elements */
    children: ReactNode
}

export const TableBody = (props: TableBodyProps) => {
    const { children, ...rest } = props
    return <StyledTableBody {...rest}>{children}</StyledTableBody>
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    /** Accepts content */
    children: ReactNode
    /**
     * @default left
     */
    textAlign?: 'left' | 'center' | 'right'
}

export const TableCell = (props: TableCellProps) => {
    const { children, textAlign = 'left', ...rest } = props
    return (
        <StyledTableCell
            className={cls(
                'table-cell',
                textAlign && `table-cell--align-${textAlign}`,
            )}
            {...rest}
        >
            {children}
        </StyledTableCell>
    )
}

export interface TableContainerProps {
    className?: string
    id: string
    title: string
    description?: string
    /** Accepts the `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeader`, `TableCell` elements */
    children: ReactNode
}

export const TableContainer = (props: TableContainerProps) => {
    const { className, id, title, description, children } = props
    const scrollDivRef = useRef<HTMLDivElement>(null)
    const isContentFocusable = useResizeObserver(scrollDivRef, 'horizontal')

    const transformChildren = (nodeChildren: ReactNode): ReactNode => {
        return React.Children.map(nodeChildren, child => {
            if (!isValidElement(child)) {
                return child
            }

            const el = child as ReactElement<any>

            const mergedCommonProps = {
                ...el.props,
                'aria-labelledby': id,
            }
            const newElement = React.createElement(el.type, mergedCommonProps)

            return newElement
        })
    }

    const childNodes = transformChildren(children)

    return (
        <StyledTableContainer
            className={className}
            data-testid='table-container'
        >
            <Heading level={3} id={id}>
                {title}
            </Heading>
            {description && <p>{description}</p>}
            <div
                ref={scrollDivRef}
                {...(isContentFocusable && {
                    'role': 'region',
                    'aria-label': `Scrollable region for ${title} table`,
                    'tabIndex': 0,
                })}
            >
                {childNodes}
            </div>
        </StyledTableContainer>
    )
}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
    /** Accepts the `TableRow`, `TableHeader` elements */
    children: ReactNode
}
export const TableHead = (props: TableHeadProps) => {
    const { children, ...rest } = props
    return <StyledTableHead {...rest}>{children}</StyledTableHead>
}

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    /** Accepts content */
    children: ReactNode
    /**
     * @default left
     */
    textAlign?: 'left' | 'center' | 'right'
}

export const TableHeader = (props: TableHeaderProps) => {
    const { children, textAlign = 'left', ...rest } = props
    return (
        <StyledTableHeader
            className={cls(textAlign && `table-header--align-${textAlign}`)}
            {...rest}
        >
            {children}
        </StyledTableHeader>
    )
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    /** Accepts the `TableHeader`,`TableCell` elements */
    children: ReactNode
}
export const TableRow = (props: TableRowProps) => {
    const { children, ...rest } = props
    return <StyledTableRow {...rest}>{children}</StyledTableRow>
}
