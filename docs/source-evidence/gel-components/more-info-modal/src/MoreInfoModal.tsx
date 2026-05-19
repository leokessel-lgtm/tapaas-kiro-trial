import React, { useState, ReactNode, Ref } from 'react'
import { SROnly } from '@snsw-gel/accessibility'
import { Button } from '@snsw-gel/button'
import { StyledSlidingModalIconButton } from './SlidingModal.styled'
import { SlidingModal } from './SlidingModal'
import { Icon, uiIconHelp, uiIconInfo } from '@snsw-gel/ui-icons'

export interface MoreInfoModalProps {
    id?: string
    title: string
    subTitle?: string
    helpText?: ReactNode
    questionIconFlag?: boolean
    questionHyperLink?: boolean
    linkText?: string
    /**
     * hyperLinKText prop has been deprecated as it was exposed as a typo. Please use the "linkText" prop instead.
     * @deprecated
     * */
    hyperLinKText?: string
}

export const MoreInfoModal = (
    props: MoreInfoModalProps,
    ref: Ref<HTMLDivElement>,
) => {
    const {
        id,
        title,
        subTitle,
        helpText,
        questionIconFlag = false,
        questionHyperLink = false,
        hyperLinKText,
        linkText: propLinkText,
        ...rest
    } = props

    const [isOpen, setIsOpen] = useState(false)

    const linkText = propLinkText || hyperLinKText

    const toggleModal = () => setIsOpen(!isOpen)

    return (
        <>
            {!questionHyperLink && (
                <StyledSlidingModalIconButton
                    type='button'
                    onClick={toggleModal}
                >
                    {questionIconFlag && <Icon icon={uiIconInfo} />}
                    {!questionIconFlag && <Icon icon={uiIconHelp} />}
                    {linkText && <SROnly>{linkText}</SROnly>}
                </StyledSlidingModalIconButton>
            )}
            {questionHyperLink && !questionIconFlag && (
                <Button onClick={toggleModal} variant='link'>
                    {linkText}
                </Button>
            )}
            <SlidingModal
                {...rest}
                {...props}
                open={isOpen}
                onClose={toggleModal}
            />
        </>
    )
}
