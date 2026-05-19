import React, { Key, ReactElement, Ref, useEffect, useRef } from 'react'
import { Button } from '@snsw-gel/button'
import { useId, forwarded, useControllableValue } from '@snsw-gel/utils'
import { SROnly } from '@snsw-gel/accessibility'
import { StyledAccordion, StyledAccordionToggles } from './Accordion.styled'
import { AccordionItem, AccordionItemProps } from './AccordionItem'
import {
    getAccordionItemKey,
    optionalIterableToSet,
    useAccordionDefaultOpenItems,
    useAccordionItemChildKeys,
} from './hooks/useAccordionDefaultOpenItems'

interface AccordionExpandAllAction {
    type: 'expand-all'
}

interface AccordionCollapseAllAction {
    type: 'collapse-all'
}

interface AccordionToggleAction {
    type: 'toggle'
    key: Key
}

type AccordionActions =
    | AccordionExpandAllAction
    | AccordionCollapseAllAction
    | AccordionToggleAction

type AccordionState = Set<string>

const reducer = (
    state: AccordionState,
    keys: Key[],
    action: AccordionActions,
): Set<string> => {
    switch (action.type) {
        case 'expand-all':
            return new Set(keys.map(String))
        case 'collapse-all':
            return new Set()
        case 'toggle':
            const { key } = action
            const openItems = new Set(state)
            if (openItems.has(String(key))) {
                openItems.delete(String(key))
            } else {
                openItems.add(String(key))
            }
            return openItems
    }
}

const getAllOpenState = (state: AccordionState, keys: Key[]) => {
    const openCount = state.size

    if (openCount === keys.length) {
        return 'EXPANDED'
    } else if (openCount === 0) {
        return 'COLLAPSED'
    } else {
        return 'MIXED'
    }
}

export type AccordionItemChild = ReactElement<
    AccordionItemProps,
    typeof AccordionItem
>

export interface AccordionProps {
    /** Unique ID for the accordion container, this ID is also used as a prefix for the buttons and content */
    id: string
    /** Accepts the AccordionItem element */
    children: AccordionItemChild | Array<AccordionItemChild>

    /**
     * Provide an understandable accessible name for the "Open all" and "Close all" button, so that a screen reader user will know the purpose of the button. For example "Open all FAQs"
     * @default sections
     */
    name?: string
    className?: string

    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void

    /**
     * If neither `expanded` nor `defaultExpanded` are provided, the accordion will generate `defaultExpanded` from the `"expanded"` or `"defaultExpanded"` props on it's child AccordionItems
     * @default <computed from children>
     */
    defaultExpandedKeys?: Iterable<Key>
    expandedKeys?: Iterable<Key>
    onExpandedChange?: (openState: Set<Key>) => any
}

/**
 * @see Storybook https://kiama.testservicensw.net/storybook/?path=/docs/accordion--docs
 */
export const Accordion = forwarded(
    (props: AccordionProps, ref: Ref<HTMLDivElement>) => {
        const {
            id,
            children,
            className,
            name = 'sections',
            expandedKeys: _a,
            onExpandedChange: _b,
            defaultExpandedKeys: _c,
            ...rest
        } = props

        const nextFocusTarget = useRef<HTMLElement>(undefined)

        const availableKeys = useAccordionItemChildKeys(children)

        const defaultItems = useAccordionDefaultOpenItems(
            props.defaultExpandedKeys,
            children,
        )

        const [openItems, setOpen] = useControllableValue<Set<string>>(
            optionalIterableToSet<Key>(props.expandedKeys),
            props.onExpandedChange,
            defaultItems,
        )

        const dispatch = (action: AccordionActions) => {
            setOpen(reducer(openItems, availableKeys, action))
        }

        const itemsView = getAllOpenState(openItems, availableKeys)

        const showExpandCollapse = React.Children.count(children) >= 2

        const elemId = useId(id)

        useEffect(() => {
            if (nextFocusTarget.current) {
                nextFocusTarget.current.focus()
                nextFocusTarget.current = undefined
            }
        }, [itemsView])

        return (
            <StyledAccordion
                {...rest}
                id={elemId}
                className={className}
                ref={ref}
                data-gel-analytics='accordion-group'
                data-accordion-name={name}
                data-gelweb-component='accordion-group'
            >
                {Boolean(showExpandCollapse) && (
                    <StyledAccordionToggles>
                        <Button
                            data-accordion-action='open_all'
                            variant='link'
                            disabled={itemsView === 'EXPANDED'}
                            onClick={e => {
                                dispatch({ type: 'expand-all' })
                                nextFocusTarget.current = e.currentTarget
                                    .nextElementSibling as HTMLElement
                            }}
                            data-gel-analytics={undefined}
                        >
                            Open all <SROnly>{name}</SROnly>
                        </Button>
                        <Button
                            data-accordion-action='close_all'
                            variant='link'
                            disabled={itemsView === 'COLLAPSED'}
                            data-gel-analytics={undefined}
                            onClick={e => {
                                dispatch({ type: 'collapse-all' })
                                nextFocusTarget.current = e.currentTarget
                                    .previousElementSibling as HTMLElement
                            }}
                        >
                            Close all <SROnly>{name}</SROnly>
                        </Button>
                    </StyledAccordionToggles>
                )}
                {Boolean(children) &&
                    React.Children.map(children, (child, idx) => {
                        if (
                            React.isValidElement(child) &&
                            child.type === AccordionItem
                        ) {
                            return React.cloneElement(child, {
                                id:
                                    child.props.id ??
                                    `${elemId}-${child.key ?? idx}`,
                                key: getAccordionItemKey(child, idx),
                                expanded: openItems.has(
                                    getAccordionItemKey(child, idx),
                                ),
                                onExpandedChange: (value: any) => {
                                    child.props.onExpandedChange?.(value)
                                    dispatch({
                                        type: 'toggle',
                                        key: getAccordionItemKey(child, idx),
                                    })
                                },
                            })
                        } else {
                            return child
                        }
                    })}
            </StyledAccordion>
        )
    },
)

// @ts-ignore
Accordion.displayName = 'Accordion'
