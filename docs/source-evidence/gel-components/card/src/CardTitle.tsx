import React from 'react'
import {
    CardTitleContainer,
    CLS_CARD__TITLE,
    CLS_CARD__TITLE_LEVEL_3,
    CLS_CARD__TITLE_LEVEL_4,
    CLS_CARD__TITLE_LEVEL_5,
} from './Card.styled'
import { Heading, HeadingProps } from '@snsw-gel/content'
import { deprecation } from '@snsw-gel/utils'
import classNames from 'classnames'

export interface CardTitleProps {
    level?: 3 | 4 | 5 | '3' | '4' | '5'
    headingElement?: Exclude<HeadingProps['headingElement'], 'h1'>
    /**
     * The 'text' prop is deprecated and will be removed in v4 of `@snsw-gel/react`.
     * For more information, see [CardTitle.text Deprecation](https://kiama.testservicensw.net/storybook/resources-releases-lifecycle-deprecations-26-04-23-cardtitle-text--docs).
     * @deprecated
     */
    text?: string
    children: React.ReactNode
    icon?: React.ReactNode
}

export const CardTitle = (props: CardTitleProps) => {
    const { level = 3, children, icon, text, headingElement = 'h3' } = props

    // @ts-ignore
    deprecation('text' in props, `CardTitle.text`)

    return (
        <CardTitleContainer
            className={classNames(
                CLS_CARD__TITLE,
                Number(level) === 3 && CLS_CARD__TITLE_LEVEL_3,
                Number(level) === 4 && CLS_CARD__TITLE_LEVEL_4,
                Number(level) === 5 && CLS_CARD__TITLE_LEVEL_5,
            )}
            data-gelweb-component='card-title'
        >
            {icon}
            <Heading level={level} headingElement={headingElement}>
                {text ? text : children}
            </Heading>
        </CardTitleContainer>
    )
}
