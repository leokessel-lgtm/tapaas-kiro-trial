import React, { ReactNode } from 'react'
import {
    CardContainer,
    CardContent,
    CardImage,
    CardCta,
    CardCtaDefaultIcon,
    CLS_CARD__CONTENT,
    CLS_CARD_VARIANT_CLICKABLE,
    CLS_CARD,
    CLS_CARD_VARIANT_IMAGE,
    CLS_CARD_VARIANT_CTA_TEXT,
    CLS_CARD_VARIANT_CTA_ICON,
} from './Card.styled'
import classNames from 'classnames'

export interface CardProps {
    className?: string
    children: ReactNode
    imageSrc?: string
    isClickable?: boolean
    ctaIcon?: ReactNode
    ctaText?: string
}

export const Card = (props: CardProps) => {
    const { className, children, imageSrc, isClickable, ctaText, ctaIcon } =
        props
    return (
        <CardContainer
            className={classNames(
                className,
                CLS_CARD,
                !!isClickable && CLS_CARD_VARIANT_CLICKABLE,
                !!imageSrc && CLS_CARD_VARIANT_IMAGE,
                !!ctaText && CLS_CARD_VARIANT_CTA_TEXT,
                !!ctaIcon && CLS_CARD_VARIANT_CTA_ICON,
            )}
            data-testid='card-test-id'
            data-gel-analytics='card'
            data-gelweb-component='card'
        >
            {Boolean(imageSrc) && <CardImage src={imageSrc} alt='' />}
            <CardContent className={CLS_CARD__CONTENT}>
                <div>{children}</div>
                {isClickable && (
                    <CardCta>
                        {ctaText && <span>{ctaText}</span>}
                        {ctaIcon && ctaText ?
                            ctaIcon
                        :   <CardCtaDefaultIcon data-testid='card-test-arrow' />
                        }
                    </CardCta>
                )}
            </CardContent>
        </CardContainer>
    )
}
