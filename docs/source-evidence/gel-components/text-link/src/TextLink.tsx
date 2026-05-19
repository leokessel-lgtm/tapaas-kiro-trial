import React, { ComponentPropsWithoutRef, JSX, ReactNode, Ref } from 'react'
import { Icon, uiIconExternalLink } from '@snsw-gel/ui-icons'
import { useId, forwarded } from '@snsw-gel/utils'
import { InferRefElementType, InferredComponentType } from '@snsw-gel/types'
import { LinkContainer } from './TextLink.styled'

export interface TextLinkProps<
    Type extends React.ComponentType<any> | keyof JSX.IntrinsicElements = 'a',
> {
    id?: string
    to?: string | URL
    href?: string
    as?: Type
    children: ReactNode
    target?: '_blank' | (string & {})
}

export const TextLink = forwarded(function <
    ElementType extends InferredComponentType<any> = 'a',
>(
    props: TextLinkProps<ElementType> &
        Omit<
            ComponentPropsWithoutRef<ElementType>,
            keyof TextLinkProps<ElementType>
        >,
    ref: Ref<InferRefElementType<ElementType, HTMLAnchorElement>>,
) {
    const { id, children, href, target, ...rest } = props

    const propsToAdd: any = {
        ...rest,
    }

    const elemId = useId(id)

    if (!props.as) {
        propsToAdd.href = href
        propsToAdd.as = 'a'

        if (target === '_blank') {
            propsToAdd.rel = 'noopener noreferrer'
        }
    } else {
        /*
        TODO: Fix
        This isn't good, if we wanted to build this functionality in we should have a
        check here to make sure props.as is a component that accepts the 'to' prop
        Next's Link for example does not accept a 'to' prop so using
        <TextLink as={NextLink} href='/'>Home</TextLink> would not work

        To keep this functionality would then have to write a transform for every link library in existence.
        We should instead just not be doing anything magical here and trust the consumer of this
        component to pass in the correct props
        */
        if (href) {
            propsToAdd.to = href
        }
    }

    return (
        <LinkContainer
            data-gel-analytics='link'
            data-gelweb-component='text-link'
            id={elemId}
            ref={ref}
            target={target}
            {...propsToAdd}
        >
            {children}
            {target === '_blank' && (
                <>
                    <Icon
                        title='Opens in a new tab'
                        icon={uiIconExternalLink}
                        size={16}
                    />
                </>
            )}
        </LinkContainer>
    )
})

// @ts-ignore
TextLink.displayName = 'TextLink'
