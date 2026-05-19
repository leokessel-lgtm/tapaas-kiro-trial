import styled from 'styled-components'
import { IconArrowRight } from '@snsw-gel/icons'
import { HeadingStyle } from '@snsw-gel/content'
import { vars } from '@snsw-gel/theming'

export const CLS_CARD = 'card'
export const CLS_CARD_VARIANT_CLICKABLE = `${CLS_CARD}--clickable`
export const CLS_CARD_VARIANT_IMAGE = `${CLS_CARD}--image`
export const CLS_CARD_VARIANT_CTA_TEXT = `${CLS_CARD}--cta-text`
export const CLS_CARD_VARIANT_CTA_ICON = `${CLS_CARD}--cta-icon`
export const CLS_CARD__CONTENT = `${CLS_CARD}__content`

export const CLS_CARD__TITLE = 'card__title'
export const CLS_CARD__TITLE_LEVEL_3 = 'card__title--level-3'
export const CLS_CARD__TITLE_LEVEL_4 = 'card__title--level-4'
export const CLS_CARD__TITLE_LEVEL_5 = 'card__title--level-5'

export const CardContent = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    padding: ${vars.spacing.md};

    .${CLS_CARD_VARIANT_CLICKABLE} & {
        padding-bottom: ${vars.spacing.lg};
        border-top-right-radius: ${vars.layouts.accentBorderWidth};
        border-top-left-radius: ${vars.layouts.accentBorderWidth};
        border-top: ${vars.layouts.accentBorderWidth} solid
            ${vars.colors.interactive.secondary.hover};
    }

    .${CLS_CARD_VARIANT_IMAGE} & {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }
`

export const CardImage = styled.img`
    border-radius: ${vars.layouts.accentBorderWidth}
        ${vars.layouts.accentBorderWidth} 0 0;
    width: 100%;
    height: auto;
    display: block;
`

export const CardTitleContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-bottom: ${vars.spacing.xs};

    svg {
        width: ${vars.spacing.icons.xxl};
        height: ${vars.spacing.icons.xxl};
        flex-shrink: 0;
    }
    ${HeadingStyle} {
        margin: 0;
    }

    &.${CLS_CARD__TITLE_LEVEL_3} {
        svg {
            margin-bottom: ${vars.spacing.xs};
        }
    }

    &.${CLS_CARD__TITLE_LEVEL_4} {
        svg {
            width: ${vars.spacing.icons.xl};
            height: ${vars.spacing.icons.xl};
        }
    }

    &.${CLS_CARD__TITLE_LEVEL_5} {
        svg {
            width: ${vars.spacing.icons.lg};
            height: ${vars.spacing.icons.lg};
        }
        h5 {
            font-size: ${vars.font.size.base};
            line-height: ${vars.font.lineHeight.body};
        }
    }

    &.${CLS_CARD__TITLE_LEVEL_4}, &.${CLS_CARD__TITLE_LEVEL_5} {
        flex-flow: row nowrap;
        svg {
            margin-right: ${vars.spacing.sm};
        }
    }
`

export const CardCtaDefaultIcon = styled(IconArrowRight)`
    transition: 250ms;
    transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
`

export const CardContainer = styled.article`
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: ${vars.colors.background.level1};

    --card-hover-border-width: 0px;

    border-radius: ${vars.layouts.accentBorderWidth};

    z-index: 2;
    transition: box-shadow 0.25s cubic-bezier(0.17, 0.84, 0.44, 1);
    box-shadow: ${vars.shadow.default};

    &.${CLS_CARD_VARIANT_CLICKABLE} {
        ${CardTitleContainer} a {
            /* Override default link colour */
            color: ${vars.colors.text.default};
            text-decoration: none;

            /* 
            The hover indicator
            Kept as a separate element so it doesn't affect the layout of the card element
            */
            &:before {
                border-radius: inherit;
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1;
                border: solid 2px transparent;

                transition-property: border;
                transition-duration: ${vars.transitions.idle};
                transition-timing-function: ${vars.easings.natural};
            }

            &:focus {
                outline: none;
            }

            &,
            &:before,
            &:after {
                border-radius: ${vars.layouts.accentBorderWidth};
            }
        }
        &:hover,
        &:focus,
        &:focus-within {
            box-shadow: ${vars.shadow.hover};

            --card-hover-border-width: 2px;

            a:before {
                border: solid var(--card-hover-border-width)
                    ${vars.colors.interactive.secondary.hover};
                transition-duration: ${vars.transitions.hover};
            }
            ${CardTitleContainer} a {
                text-decoration: underline;
            }
            ${CardCtaDefaultIcon} {
                margin-left: ${vars.spacing.icons.sm};
            }
        }

        &:focus,
        &:focus-within {
            a {
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 1;
                    outline: solid ${vars.colors.border.focus}
                        ${vars.focus.default};
                    outline-offset: ${vars.focus.default};
                }
            }
        }

        &.${CLS_CARD_VARIANT_CTA_TEXT}, &.${CLS_CARD_VARIANT_CTA_ICON} {
            &:hover,
            &:focus,
            &:focus-within {
                ${CardCtaDefaultIcon} {
                    margin-left: 0;
                }
            }
        }
    }
`

export const CardCta = styled.div`
    color: ${vars.colors.text.link};
    display: flex;
    font-weight: ${vars.font.weight.medium};
    margin-top: auto;
    padding-top: ${vars.spacing.xs};
    align-items: center;

    span {
        margin-right: ${vars.spacing.xs};
        text-decoration: ${vars.textDecoration.autosuggest};

        .${CLS_CARD_VARIANT_CTA_ICON} & {
            order: 1;
            margin-left: ${vars.spacing.xs};
        }

        ${CardContainer}:hover &,
        ${CardContainer}:focus-within &,
        ${CardContainer}:focus & {
            text-decoration: underline;
        }
    }
    svg {
        fill: ${vars.colors.text.link};
        width: ${vars.spacing.icons.sm};
        height: ${vars.spacing.icons.sm};
        flex-shrink: 0;
    }
`
