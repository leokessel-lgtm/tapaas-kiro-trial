import React, { useState, useLayoutEffect, useEffect, useRef, Ref } from 'react'
import FocusLock from 'react-focus-lock'
import { Heading } from '@snsw-gel/content'
import { IconClose } from '@snsw-gel/icons'
import { SROnly } from '@snsw-gel/accessibility'
import { forwarded, Portal, useId, getFocusableElement, trapTabKey } from '@snsw-gel/utils'
import { MoreInfoModalProps } from './MoreInfoModal'
import {
    StyledSlidingModalHeader,
    StyledSlidingModalBody,
    StyledSlidingModal,
    StyledSlidingModalCloseButton,
    FullScreenOpac,
    SlidingTransition,
} from './SlidingModal.styled'

const ANIMATION_DURATION = 400

export interface SlidingModalProps {
    id?: MoreInfoModalProps['id']
    title: MoreInfoModalProps['title']
    subTitle?: MoreInfoModalProps['subTitle']
    helpText?: MoreInfoModalProps['helpText']
    open?: boolean
    onClose?: () => any
}

export const SlidingModalComponent = (
    props: SlidingModalProps,
    ref: Ref<HTMLDivElement>,
) => {
    const { id, title, subTitle, helpText, open, onClose } = props

    const elemID = useId(id)
    const modalDesc = `${elemID}-desc`
    const modalStart = `${elemID}-start`
    const modalTitle = `${elemID}-title`

    const titleRef = useRef<HTMLHeadingElement>(null)
    const closeRef = useRef<HTMLDivElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
    const fullscreenRef = useRef<HTMLDivElement>(null)

    const handleTabKey = (event: KeyboardEvent) => {
        const focusableElems = getFocusableElement(modalRef.current)
        trapTabKey(event, focusableElems)
    }

    const onEscClose = (event: KeyboardEvent) => {
        if (event.keyCode === 27 && onClose) {
            onClose()
        }
    }

    const keyListenersMap = new Map([
        [27, onEscClose],
        [9, handleTabKey],
    ])

    const [isAnimating, setAnimating] = useState(false)

    useLayoutEffect(() => {
        if (!modalRef.current || !fullscreenRef.current) {
            return
        }
        setAnimating(true)
        if (open) {
            modalRef.current?.classList?.add('out')
            fullscreenRef.current?.classList?.add('out')
            modalRef.current?.offsetLeft // force layout
            fullscreenRef.current?.offsetLeft // force layout
            modalRef.current?.classList?.remove('out')
            fullscreenRef.current?.classList?.remove('out')
        } else {
            fullscreenRef.current?.classList?.add('out')
            modalRef.current?.classList?.add('out')
            const timeout = setTimeout(() => {
                setAnimating(false)
            }, ANIMATION_DURATION)
            return () => clearTimeout(timeout)
        }
    }, [open])

    useEffect(() => {
        const keyListener = (event: KeyboardEvent) => {
            const listener = keyListenersMap.get(event.keyCode)
            return listener && listener(event)
        }

        if (open) {
            titleRef.current?.focus()
            document.addEventListener('keydown', keyListener)
        } else {
            document.removeEventListener('keydown', keyListener)
        }

        // check this is removed even without the return
        return () => {
            document.removeEventListener('keydown', keyListener)
        }
    }, [open]) // eslint-disable-line

    const show = open || isAnimating

    if (!show) {
        return null
    }

    return (
        <Portal id='sliding-modal-portal'>
            <FocusLock returnFocus>
                <FullScreenOpac ref={fullscreenRef} onClick={onClose} />
                <SlidingTransition
                    ref={modalRef}
                    id={elemID}
                    role='dialog'
                    aria-modal='true'
                    aria-labelledby={`${modalStart} ${modalTitle}`}
                    {...(helpText && { 'aria-describedby': modalDesc })}
                >
                    <StyledSlidingModal
                        data-testid='sliding-modal'
                        tabIndex={0}
                    >
                        <StyledSlidingModalHeader>
                            <SROnly id={modalStart} tabIndex={-1}>
                                Start of dialog
                            </SROnly>
                            <Heading
                                className='sliding-modal__heading'
                                ref={titleRef}
                                id={modalTitle}
                                tabIndex={-1}
                                level={2}
                                headingElement='h1'
                            >
                                {title}
                            </Heading>
                            {subTitle && <p>{subTitle}</p>}
                        </StyledSlidingModalHeader>
                        <StyledSlidingModalBody id={modalDesc}>
                            {helpText && helpText}
                        </StyledSlidingModalBody>
                        <StyledSlidingModalCloseButton
                            onClick={onClose}
                            data-testid='modal-close-button'
                            ref={closeRef}
                            type='button'
                        >
                            <IconClose />
                            <SROnly>Close</SROnly>
                        </StyledSlidingModalCloseButton>
                    </StyledSlidingModal>
                </SlidingTransition>
            </FocusLock>
        </Portal>
    )
}

export const SlidingModal = forwarded(SlidingModalComponent)
