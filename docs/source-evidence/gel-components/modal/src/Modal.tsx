import React, { useEffect, useRef, useCallback, ReactNode } from 'react'
import { Button, ButtonWithElementProps } from '@snsw-gel/button'
import { deprecation, Portal, useId, useResizeObserver } from '@snsw-gel/utils'
import FocusLock from 'react-focus-lock'
import {
    StyledModal,
    Overlay,
    BgClicker,
    StyledModalButtonGroup,
    StyledModalFooter,
    StyledModalOverflow,
    StyledModalContainer,
    StyledModalBody,
    StyledModalHeader,
    StyledModalCloseButton,
} from './Modal.styled'
import { SROnly } from '@snsw-gel/accessibility'
import { IconClose } from '@snsw-gel/icons'
import { Heading } from '@snsw-gel/content'

type ModalButtonProps = {
    /** @deprecated Please use "children" field instead, consult the documentation for more information: [Removal of modal button text prop](https://kiama.testservicensw.net/storybook/?path=/docs/resources-releases-lifecycle-engineer-migration-guides-removal-of-modal-button-text-prop--docs). */
    text?: string
    children?: ReactNode
} & Omit<ButtonWithElementProps, 'children'>

export interface ModalProps {
    title: string
    /** Accepts up to two items in `Array` each item is an object
     *
     * The following structure is an example of creating one button */
    buttons: ModalButtonProps[]
    children: ReactNode
    description?: string
    /** Accepts a function which is used to close the modal */
    onClose?: () => any
    id?: string
    className?: string
}

export function Modal(props: ModalProps) {
    deprecation('text' in props, `Modal.buttons.text`)
    const { title, buttons, children, description, onClose, id, className } =
        props

    const elemID = useId(id)
    const modalStart = `${elemID}-start`
    const modalTitle = `${elemID}-title`
    const modalDesc = `${elemID}-desc`
    const buttonGroup = buttons
        .slice(0, 2)
        .reverse()
        .map((modalButtonProps, buttonIndex) => {
            const { variant, text, ...rest } = modalButtonProps
            const hasMultipleButtons = buttons.length > 1
            const isSecondary = hasMultipleButtons ? buttonIndex === 0 : false
            const modalButtonVariant =
                variant ?? (isSecondary ? 'secondary' : 'primary')

            return (
                <ModalButtons
                    {...rest}
                    key={`${text}_modal`}
                    text={text}
                    variant={modalButtonVariant}
                />
            )
        })

    const scrollDivRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)
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
        <Portal id='modal-portal'>
            <FocusLock returnFocus>
                <Overlay>
                    {onClose && (
                        <BgClicker
                            data-testid='modal-dimmer'
                            onClick={onClose}
                        />
                    )}
                    <StyledModal
                        data-gel-analytics-section='modal'
                        ref={modalRef}
                        id={elemID}
                        className={className}
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby={`${modalStart} ${modalTitle}`}
                        {...(description && { 'aria-describedby': modalDesc })}
                        data-gelweb-component='modal'
                    >
                        <StyledModalContainer>
                            <StyledModalBody data-testid='modal-body'>
                                <StyledModalOverflow
                                    ref={scrollDivRef}
                                    {...(isContentFocusable && {
                                        'tabIndex': 0,
                                        'role': 'region',
                                        'aria-label': 'Scrollable content',
                                    })}
                                >
                                    <StyledModalHeader>
                                        <SROnly id={modalStart} tabIndex={-1}>
                                            Start of dialog
                                        </SROnly>
                                        <Heading
                                            ref={titleRef}
                                            id={modalTitle}
                                            tabIndex={-1}
                                            level={2}
                                            headingElement='h1'
                                            // @ts-ignore
                                            style={{
                                                margin: 0,
                                            }}
                                        >
                                            {title}
                                        </Heading>
                                    </StyledModalHeader>
                                    {description && (
                                        <p
                                            className='description1'
                                            id={modalDesc}
                                        >
                                            {description}
                                        </p>
                                    )}
                                    {children}
                                    <StyledModalFooter data-testid='modal-footer'>
                                        <StyledModalButtonGroup>
                                            {buttonGroup}
                                        </StyledModalButtonGroup>
                                    </StyledModalFooter>

                                    {onClose && (
                                        <StyledModalCloseButton
                                            type='button'
                                            onClick={onClose}
                                        >
                                            <IconClose />
                                            <SROnly>Close Modal</SROnly>
                                        </StyledModalCloseButton>
                                    )}
                                </StyledModalOverflow>
                            </StyledModalBody>
                        </StyledModalContainer>
                    </StyledModal>
                </Overlay>
            </FocusLock>
        </Portal>
    )
}

const ModalButtons = (props: ModalButtonProps) => {
    const { text, ...rest } = props

    if (props.children) {
        return <Button {...(rest as ButtonWithElementProps)} />
    }

    return <Button {...rest} children={text} />
}
