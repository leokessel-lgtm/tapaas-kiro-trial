import React, { ReactNode, Ref } from 'react'
import {
    StyledAccordionButton,
    StyledAccordionContent,
    StyledAccordionContentContainer,
    StyledAccordionHeader,
} from './Accordion.styled'
import { Icon, uiIconChevronDown, uiIconChevronUp } from '@snsw-gel/ui-icons'
import { Heading, HeadingProps } from '@snsw-gel/content'
import { VoiceOverString } from '@snsw-gel/types'
import { useId, useControllableValue, forwarded } from '@snsw-gel/utils'
import classNames from 'classnames'

type ValidAccordionItemHeadingLevels = Exclude<
    HeadingProps['headingElement'],
    'p'
>

export type AccordionItemProps = {
    key?: React.Key
    id?: string
    /** The content of the accordion.  */
    children: ReactNode
    /** The title of the accordion item. */
    title: VoiceOverString
    /**
     * Control the open state of the accordion item.
     */
    expanded?: boolean
    /**
     * @default h2
     */
    headingElement?: ValidAccordionItemHeadingLevels
    /**
     * The default open state of the accordion item.
     * @default false
     * */
    defaultExpanded?: boolean

    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void

    onExpandedChange?: (openState: boolean) => any
}

const validHeadingElements = new Set<AccordionItemProps['headingElement']>([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
])

export const AccordionItem = forwarded(
    (props: AccordionItemProps, ref: Ref<HTMLDivElement>) => {
        const {
            id: propsId,
            children,
            title,
            expanded: _,
            defaultExpanded: __,
            onExpandedChange: ___,
            headingElement = 'h2',
            ...rest
        } = props

        const [isOpen, setOpen] = useControllableValue(
            props.expanded,
            props.onExpandedChange,
            props.defaultExpanded,
            false,
        )

        const id = useId(propsId)
        const panelId = id + '-panel'
        const buttonId = id + '-button'

        if (!validHeadingElements.has(headingElement)) {
            throw new Error(
                `Invalid heading element "${headingElement}" passed to AccordionItem. Must be one of ${Array.from(
                    validHeadingElements,
                ).join(', ')}`,
            )
        }

        return (
            <>
                <StyledAccordionHeader
                    className='accordion-header'
                    {...rest}
                    id={id}
                    ref={ref}
                    data-gel-analytics='accordion'
                    data-gelweb-component='accordion-item'
                >
                    <Heading
                        level='2'
                        headingElement={headingElement}
                        // @ts-ignore
                        style={{ margin: 0 }}
                    >
                        <StyledAccordionButton
                            type='button'
                            id={buttonId}
                            onClick={() => {
                                setOpen(!isOpen)
                            }}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                        >
                            <span>{title}</span>

                            {!isOpen ?
                                <Icon icon={uiIconChevronDown} />
                            :   <Icon icon={uiIconChevronUp} />}
                        </StyledAccordionButton>
                    </Heading>
                </StyledAccordionHeader>
                <StyledAccordionContent
                    id={panelId}
                    className={classNames(
                        'accordion-content',
                        !isOpen && 'accordion-content--closed',
                    )}
                    aria-labelledby={buttonId}
                >
                    <StyledAccordionContentContainer>
                        <div className='accordion-content__padding'>
                            {children}
                        </div>
                    </StyledAccordionContentContainer>
                </StyledAccordionContent>
            </>
        )
    },
)

// @ts-ignore
AccordionItem.displayName = 'AccordionItem'
