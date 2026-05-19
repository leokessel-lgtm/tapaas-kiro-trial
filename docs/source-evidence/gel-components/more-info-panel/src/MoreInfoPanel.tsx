import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    ReactNode,
    Ref,
} from 'react'
import FocusLock from 'react-focus-lock'
import { SROnly } from '@snsw-gel/accessibility'
import { Heading } from '@snsw-gel/content'
import { Icon, uiIconClose } from '@snsw-gel/ui-icons'
import { forwarded, Portal, useId, useResizeObserver } from '@snsw-gel/utils'
import {
    StyledMoreInfoPanelHeader,
    StyledMoreInfoPanelBody,
    StyledMoreInfoPanelOverflow,
    StyledMoreInfoPanel,
    StyledMoreInfoPanelCloseButton,
    FullScreenOpac,
} from './MoreInfoPanel.styled'

export interface MoreInfoPanelProps {
    id?: string
    className?: string
    title: string
    children: ReactNode
    /** Accepts a function which is used to close the modal */
    onClose?: () => any
}

export const MoreInfoPanel = forwarded(
    (props: MoreInfoPanelProps, ref: Ref<HTMLDivElement>) => {
        const { id, className, title, children, onClose } = props

        const elemID = useId(id)
        const modalDesc = `${elemID}-desc`
        const modalStart = `${elemID}-start`
        const modalTitle = `${elemID}-title`

        const scrollDivRef = useRef<HTMLDivElement>(null)
        const titleRef = useRef<HTMLHeadingElement>(null)
        const closeRef = useRef<HTMLDivElement>(null)
        const modalRef = useRef<HTMLDivElement>(null)
        const fullscreenRef = useRef<HTMLDivElement>(null)
        const returnFocusRef = useRef<HTMLElement>(null)
        const isContentFocusable = useResizeObserver(scrollDivRef)

        useEffect(() => {
            const isFocusWithinModal =
                Boolean(document.activeElement) &&
                modalRef.current?.contains(document.activeElement)

            if (!isFocusWithinModal) {
                returnFocusRef.current = document.activeElement as HTMLElement
                titleRef.current?.focus()
            }

            return () => {
                returnFocusRef.current?.focus()
            }
        }, [])

        const escFunction = useCallback(
            (event: KeyboardEvent) => {
                if (event.keyCode === 27 && onClose) {
                    onClose()
                }
            },
            [onClose],
        )

        useEffect(() => {
            if (onClose) {
                document.addEventListener('keydown', escFunction)

                return () => {
                    document.removeEventListener('keydown', escFunction)
                }
            }
        }, [escFunction, onClose])

        return (
            <Portal id='more-info-panel-portal'>
                <FocusLock returnFocus>
                    <FullScreenOpac ref={fullscreenRef} onClick={onClose} />
                    <StyledMoreInfoPanel
                        className={className}
                        ref={modalRef}
                        id={elemID}
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby={`${modalStart} ${modalTitle}`}
                        {...(children && { 'aria-describedby': modalDesc })}
                    >
                        <StyledMoreInfoPanelOverflow
                            ref={scrollDivRef}
                            {...(isContentFocusable && {
                                'tabIndex': 0,
                                'role': 'region',
                                'aria-label': 'Scrollable content',
                            })}
                        >
                            <div
                                ref={ref}
                                data-testid='more-info-panel__content'
                            >
                                <StyledMoreInfoPanelHeader>
                                    <SROnly id={modalStart} tabIndex={-1}>
                                        Start of dialog
                                    </SROnly>
                                    <Heading
                                        className='more-info-panel__heading'
                                        ref={titleRef}
                                        id={modalTitle}
                                        tabIndex={-1}
                                        level={2}
                                        headingElement='h1'
                                    >
                                        {title}
                                    </Heading>
                                </StyledMoreInfoPanelHeader>
                                <StyledMoreInfoPanelBody id={modalDesc}>
                                    {children}
                                </StyledMoreInfoPanelBody>
                                <StyledMoreInfoPanelCloseButton
                                    onClick={onClose}
                                    ref={closeRef}
                                    type='button'
                                >
                                    <Icon icon={uiIconClose} />
                                    <SROnly>Close</SROnly>
                                </StyledMoreInfoPanelCloseButton>
                            </div>
                        </StyledMoreInfoPanelOverflow>
                    </StyledMoreInfoPanel>
                </FocusLock>
            </Portal>
        )
    },
)

// @ts-ignore
MoreInfoPanel.displayName = 'MoreInfoPanel'
