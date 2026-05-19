import styled from 'styled-components'
import { vars, mq } from '@snsw-gel/theming'
import { textLinkStyles } from '@snsw-gel/text-link'

export const BreadcrumbContainer = styled.nav`
    display: flex;
    align-items: baseline;
    a {
        font-size: ${vars.font.size.xs};
        display: inline-block;
        margin-left: ${vars.spacing.xs};
        margin-right: ${vars.spacing.xs};
        ${textLinkStyles}
        color: ${vars.colors.breadcrumb.link};
        font-weight: ${vars.font.weight.normal} !important;

        &:hover {
            color: ${vars.colors.breadcrumb.linkHover};
        }
    }

    svg {
        height: ${vars.spacing.xs};
        width: ${vars.spacing.xs};
        fill: ${vars.colors.breadcrumb.icon};
    }
`

export const BreadcrumbList = styled.ol`
    margin: 0;
    padding-left: 0;
    list-style: none;
    display: inline;
`

export const BreadcrumbListItem = styled.li`
    display: inline-block;
    align-items: center;
    padding-left: 0;
    margin: 0;

    &.hide-on-mobile {
        display: none;
    }

    svg {
        display: inline;
    }

    &:first-child,
    &:nth-last-child(2) {
        svg {
            display: none;
        }
        a {
            margin-left: 0;
        }
    }

    ${mq.min('tablet')} {
        &:first-child,
        &.hide-on-mobile {
            display: inline-flex;
            align-items: center;
        }

        &:not(:first-child):nth-last-child(2) {
            svg {
                display: inline;
            }
            a {
                margin-left: ${vars.spacing.xs};
            }
        }
    }
`
