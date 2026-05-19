import styled, { css } from 'styled-components'
import { vars, mq } from '@snsw-gel/theming'
import { Heading } from '@snsw-gel/content'
import { pxToRem } from '@snsw-gel/theming'
import { textLinkStyles } from '@snsw-gel/text-link'

const InPageAlertStyle = css`
    &.--compact {
        padding: ${vars.layouts.notification.compactPadding};
        border-left: ${vars.layouts.notification.compactBorderWidth};
    }

    &.--error {
        background-color: ${vars.colors.background.status.error};
        border-color: ${vars.colors.icon.error};
    }

    &.--success {
        background-color: ${vars.colors.background.status.success};
        border-color: ${vars.colors.icon.success};
    }

    &.--info {
        background-color: ${vars.colors.background.status.info};
        border-color: ${vars.colors.icon.info};
    }

    &.--warning {
        background-color: ${vars.colors.background.status.warning};
        border-color: ${vars.colors.icon.warning};
    }

    &.--callout {
        border-color: ${vars.colors.interactive.secondary.hover};
    }
`

export const StyledInPageAlert = styled.div`
    line-height: ${vars.font.lineHeight.body};
    border-left: ${vars.layouts.accentBorderWidth} solid transparent;
    padding: ${`${vars.spacing.sm} ${vars.spacing.md} ${vars.spacing.sm} ${vars.spacing.sm}`};
    margin: ${`${vars.spacing.sm} ${vars.spacing.none}`};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h1.heading-1,
    h2.heading-2,
    h3.heading-3,
    h4.heading-4,
    h5.heading-5,
    h6.heading-6 {
        font-size: ${vars.font.size.base};
        line-height: ${vars.font.lineHeight.body};
        font-weight: ${vars.font.weight.bold};
        margin: ${`${vars.spacing.none} ${vars.spacing.none} ${vars.spacing.xs}`};
        max-width: 100%;
    }

    li,
    ol,
    p,
    ul {
        margin: ${`${vars.spacing.none} ${vars.spacing.none} ${vars.spacing.xs}`};
        max-width: 100%;
    }

    li:last-child,
    ol:last-child,
    p:last-child,
    ul:last-child {
        margin-bottom: 0;
    }

    ${InPageAlertStyle};

    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }

    ${mq.highContrast()} {
        &:focus {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            outline-color: Highlight;
            background-color: Background;
            border-color: InactiveBorder;
            color: InfoText;
        }
    }

    ${mq.min('tablet')} {
        padding: ${`${vars.spacing.md} ${vars.spacing.md} ${vars.spacing.md} ${vars.spacing.sm}`};
        background-position: ${pxToRem(12)} ${vars.spacing.md};
    }

    ${mq.print()} {
        background: none !important;
        padding: ${`${vars.spacing.sm} ${vars.spacing.none} ${vars.spacing.sm} ${vars.spacing.sm}`};
    }
`

export const StyledInPageAlertWrapper = styled.div`
    display: flex;
    flex-flow: ${vars.layouts.notification.flexFlow};

    &.--compact {
        flex-flow: nowrap;
    }
`

export const StyledInPageAlertTitle = styled(Heading)`
    font-weight: ${vars.font.weight.bold};
    max-width: 100%;

    /* we need this to be more specific than heading styles */
    &&.heading-5 {
        font-size: ${vars.font.size.base};
        line-height: ${vars.font.lineHeight.body};
        margin: 0 0 ${vars.spacing.xs};

        &.title-only {
            margin-bottom: 0;
        }
    }
`

export const StyledInPageAlertIcon = styled.div`
    padding-right: ${vars.layouts.notification.iconPadding};

    svg {
        width: ${vars.spacing.md};
        height: ${vars.spacing.md};

        > g > :first-child,
        > g > g > :first-child {
            fill: transparent;
        }
    }

    &.icon--compact {
        height: ${vars.spacing.md};
        padding-right: ${vars.layouts.notification.compactPadding};
    }

    &.icon--error > svg {
        > g > :last-child {
            fill: ${vars.colors.icon.error};
        }
    }
    &.icon--info > svg {
        > g > :last-child {
            fill: ${vars.colors.icon.info};
        }
    }
    &.icon--warning > svg {
        > g > g > :last-child {
            fill: ${vars.colors.icon.warning};
        }
    }
    &.icon--success > svg {
        > g > :last-child {
            fill: ${vars.colors.icon.success};
        }
    }
`

export const StyledInPageAlertChildren = styled.div`
    margin-left: ${vars.layouts.notification.childMargin};

    a {
        ${textLinkStyles}
    }

    &:not(.--callout) {
        a {
            ${textLinkStyles}
            color: ${vars.colors.inPageAlert.link};

            &:hover {
                color: ${vars.colors.inPageAlert.linkHover};
            }
        }
    }

    &.--callout {
        margin: ${vars.spacing.none};
    }
`

export const StyledInPageAlertCompact = styled.div`
    * {
        display: inline;
        &:not(:first-child) {
            margin-left: 7px;
        }
    }
`
