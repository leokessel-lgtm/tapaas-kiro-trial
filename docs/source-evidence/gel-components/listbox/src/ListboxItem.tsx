import React, { FocusEvent, MouseEvent, ReactNode } from 'react'
import classNames from 'classnames'
import { StyledListBoxItem, StyledListBoxGroup } from './ListBox.styled'
import { useId } from '@snsw-gel/utils'
export interface ListboxItemProps {
    children: ReactNode
    length: number
    index: number
    value: string
    autoFocus?: boolean
    nativeList?: boolean
    selected?: boolean
    showFocus?: boolean
    virtualFocus?: boolean
    selectionMode: 'single' | 'multiple'
    focused?: string | null
    onClick?: (e: MouseEvent) => void
    onFocus?: (e: FocusEvent) => void
    className?: string
    onMouseMove?: (e: MouseEvent) => void
}

/**
 * Render list items to listbox
 */
export function ListboxItem(props: ListboxItemProps) {
    const {
        children,
        index,
        length,
        selectionMode,
        value,
        autoFocus,
        className,
        focused,
        nativeList,
        onClick,
        onFocus,
        selected,
        showFocus,
        virtualFocus,
        ...rest
    } = props
    const id = useId()
    const labelId = `${id}-label`

    const Element = props.nativeList ? 'li' : 'div'

    const additionalProps: any = rest

    if (!props.nativeList) {
        additionalProps['aria-posinset'] = props.index + 1
        additionalProps['aria-setsize'] = props.length
    }

    const isFocussed = props.focused === props.value

    return (
        <StyledListBoxItem
            as={Element}
            {...additionalProps}
            id={id}
            className={classNames('listbox-item', props.className)}
            autoFocus={props.autoFocus}
            aria-labelledby={labelId}
            aria-selected={props.selected || undefined}
            onMouseDown={(e: any) => {
                if (props.virtualFocus) {
                    e.preventDefault()
                }
            }}
            onClick={(e: any) => {
                e.preventDefault()
                props.onClick?.(e)
            }}
            tabIndex={
                !props.virtualFocus &&
                ((props.focused === null && props.index === 0) || isFocussed)
                    ? 0
                    : undefined
            }
            onFocus={e => {
                if (props.virtualFocus) {
                    e.preventDefault()
                } else {
                    props.onFocus?.(e)
                }
            }}
            role='option'
            data-value={props.value}
            data-selected={props.selected || undefined}
            data-focused={(isFocussed && props.showFocus) || undefined}
            data-show-focus={props.showFocus || undefined}
        >
            <span id={labelId}>{props.children}</span>
            {/* {props.selected && <IconNotificationSuccess aria-hidden />} */}
        </StyledListBoxItem>
    )
}
export function ListboxGroup(props: { children: ReactNode; title: string }) {
    const id = useId()
    const labelId = `${id}-label`

    return (
        <StyledListBoxGroup role='group' aria-labelledby={labelId}>
            <span id={labelId}>{props.title}</span>
            {props.children}
        </StyledListBoxGroup>
    )
}
