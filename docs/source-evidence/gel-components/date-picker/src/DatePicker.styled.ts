import styled, { css } from 'styled-components'
import { pxToRem } from '@snsw-gel/theming'
import { mq, vars, clsFlags } from '@snsw-gel/theming'
import {
    Popover,
    popoverTransformEndVar,
    popoverTransformOriginVar,
    popoverTransformStartVar,
} from '@snsw-gel/popover'
import { inputWidthVar } from '@snsw-gel/field'

const daypickerStyles = css`
    .rdp-root {
        --rdp-accent-color: blue; /* The accent color used for selected days and UI elements. */
        --rdp-accent-background-color: #f0f0ff; /* The accent background color used for selected days and UI elements. */

        --rdp-day-height: 41px; /* The height of the day cells. */
        --rdp-day-width: 47px; /* The width of the day cells. */

        --rdp-day_button-border-radius: 100%; /* The border radius of the day cells. */
        --rdp-day_button-border: 2px solid transparent; /* The border of the day cells. */
        --rdp-day_button-height: ${pxToRem(
            39,
        )}; /* The height of the day cells. */
        --rdp-day_button-width: ${pxToRem(
            39,
        )}; /* The width of the day cells. */

        --rdp-selected-border: 2px solid var(--rdp-accent-color); /* The border of the selected days. */
        --rdp-disabled-opacity: 0.5; /* The opacity of the disabled days. */
        --rdp-outside-opacity: 0.75; /* The opacity of the days outside the current month. */
        --rdp-today-color: ${vars.colors.text.default};

        --rdp-dropdown-gap: 0.75rem; /* The gap between the dropdowns used in the month captions. */

        --rdp-months-gap: 2rem; /* The gap between the months in the multi-month view. */

        --rdp-nav_button-disabled-opacity: 0.5; /* The opacity of the disabled navigation buttons. */
        --rdp-nav_button-height: 2.25rem; /* The height of the navigation buttons. */
        --rdp-nav_button-width: 2.25rem; /* The width of the navigation buttons. */
        --rdp-nav-height: 2.75rem; /* The height of the navigation bar. */

        --rdp-range_middle-background-color: var(
            --rdp-accent-background-color
        ); /* The color of the background for days in the middle of a range. */
        --rdp-range_middle-color: inherit; /* The color of the range text. */

        --rdp-range_start-color: white; /* The color of the range text. */
        --rdp-range_start-background: linear-gradient(
            var(--rdp-gradient-direction),
            transparent 50%,
            var(--rdp-range_middle-background-color) 50%
        ); /* Used for the background of the start of the selected range. */
        --rdp-range_start-date-background-color: var(
            --rdp-accent-color
        ); /* The background color of the date when at the start of the selected range. */

        --rdp-range_end-background: linear-gradient(
            var(--rdp-gradient-direction),
            var(--rdp-range_middle-background-color) 50%,
            transparent 50%
        ); /* Used for the background of the end of the selected range. */
        --rdp-range_end-color: white; /* The color of the range text. */
        --rdp-range_end-date-background-color: var(
            --rdp-accent-color
        ); /* The background color of the date when at the end of the selected range. */

        --rdp-week_number-border-radius: 100%; /* The border radius of the week number. */
        --rdp-week_number-border: 2px solid transparent; /* The border of the week number. */

        --rdp-week_number-height: var(
            --rdp-day-height
        ); /* The height of the week number cells. */
        --rdp-week_number-opacity: 0.75; /* The opacity of the week number. */
        --rdp-week_number-width: var(
            --rdp-day-width
        ); /* The width of the week number cells. */
        --rdp-weeknumber-text-align: center; /* The text alignment of the weekday cells. */

        --rdp-weekday-opacity: 0.75; /* The opacity of the weekday. */
        --rdp-weekday-padding: 0 0 4px 0; /* The padding of the weekday. */
        --rdp-weekday-text-align: center; /* The text alignment of the weekday cells. */
        --rdp-weekday-text-transform: uppercase; /* The text transformation of the weekday cells. */

        --rdp-gradient-direction: 90deg;

        ${mq.min('tablet')} {
            --rdp-day-width: ${pxToRem(41)}; /* The width of the day cells. */
        }
    }

    .date-close {
        -webkit-appearance: none;
        align-items: center;
        appearance: none;
        background: ${vars.colors.calendar.default};
        border: 0;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        padding: 0;
        width: ${vars.spacing.lg};
        height: ${vars.spacing.lg};
        color: ${vars.colors.text.default};
        opacity: 0;

        &:hover {
            box-shadow: 0 0 0 2px var(--duet-color-primary);
            background-color: ${vars.colors.neutral.grey300};
        }

        svg {
            width: ${pxToRem(12)};
            height: ${pxToRem(12)};
        }

        &:focus {
            opacity: 1;
            outline: ${vars.focus.default} solid ${vars.colors.border.focus};
            outline-offset: ${vars.focus.default};
        }
    }

    .rdp-root[dir='rtl'] {
        --rdp-gradient-direction: -90deg;
    }

    .rdp-root[data-broadcast-calendar='true'] {
        --rdp-outside-opacity: unset;
    }

    /* Root of the component. */
    .rdp-root {
        position: relative; /* Required to position the navigation toolbar. */
        box-sizing: border-box;
    }

    .rdp-root * {
        box-sizing: border-box;
    }

    .rdp-day {
        width: var(--rdp-day-width);
        height: var(--rdp-day-height);
        text-align: center;
        border-spacing: 0;
        padding: 0;
    }

    .rdp-day_button {
        background: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        font: inherit;
        justify-content: center;
        align-items: center;
        display: flex;
        width: var(--rdp-day_button-width);
        height: var(--rdp-day_button-height);
        border: 2px solid transparent;
        border-radius: 100%;
        color: ${vars.colors.text.default};

        font-weight: ${vars.font.weight.medium};
        font-size: ${vars.font.size.xs};

        &:focus,
        &:active {
            box-shadow: none;
            outline: ${vars.focus.default} solid ${vars.colors.border.focus};
            outline-offset: ${vars.focus.default};

            ${mq.highContrast()} {
                -ms-high-contrast-adjust: none;
                forced-color-adjust: none;
                outline-color: Highlight;
                border-color: Highlight;
            }
        }
        &:hover {
            background: ${vars.colors.neutral.grey400};
            color: ${vars.colors.text.default};
        }

        ${mq.highContrast()} {
            border: none;
        }
    }

    .rdp-focused .rdp-day_button {
        background-color: ${vars.colors.neutral.grey400};
        box-shadow: ${vars.focus.default} solid ${vars.colors.border.focus};

        ${mq.highContrast()} {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            outline-color: Highlight;
            border-color: Highlight;
            background-color: unset;
        }
    }

    .rdp-day_button:disabled {
        cursor: revert;
    }

    .rdp-caption_label {
        z-index: 1;
        position: relative;
        display: inline-flex;
        align-items: center;
        border: 0;
        border-radius: ${vars.radius.large};
        white-space: nowrap;
        color: currentColor;
        font-family: inherit;
        font-size: ${vars.font.calendar.label};
        font-weight: ${vars.font.weight.bold};
        line-height: 1.4;
        padding: 0 0.5rem;
        gap: 0.25rem;

        ${mq.highContrast()} {
            svg {
                fill: currentColor;
            }
        }
    }

    .rdp-chevron-down {
        width: 1.5rem;
        height: 1.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .rdp-dropdown:focus-visible ~ .rdp-caption_label {
        outline: 5px auto Highlight;
        outline: 5px auto -webkit-focus-ring-color;
    }

    .rdp-button_next,
    .rdp-button_previous {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        padding: 0.25em;
        border-radius: 100%;
        background: ${vars.colors.calendar.default};
        margin-left: 8px;
        border: 2px solid transparent;
        color: ${vars.colors.text.default};

        &:hover {
            background-color: ${vars.colors.neutral.grey300};
        }
        &:focus {
            outline: ${vars.focus.default} solid ${vars.colors.border.focus};
            outline-offset: ${vars.focus.default};
        }
        svg {
            fill: currentColor;
        }

        ${mq.highContrast()} {
            border: none;
            svg {
                fill: currentColor;
            }
        }
    }

    .rdp-button_next:disabled,
    .rdp-button_previous:disabled {
        cursor: revert;

        opacity: var(--rdp-nav_button-disabled-opacity);
    }

    .rdp-chevron {
        display: inline-block;
        fill: var(--rdp-accent-color);
    }

    .rdp-root[dir='rtl'] .rdp-nav .rdp-chevron {
        transform: rotate(180deg);
    }

    .rdp-root[dir='rtl'] .rdp-nav .rdp-chevron {
        transform: rotate(180deg);
        transform-origin: 50%;
    }

    .rdp-dropdowns {
        position: relative;
        display: inline-flex;
        align-items: center;
        margin-top: 4px;
    }
    .rdp-dropdown {
        z-index: 2;

        /* Reset */
        opacity: 0;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-block-end: 0;
        inset-inline-start: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        cursor: inherit;
        border: none;
        line-height: inherit;
        font-size: 1rem;
    }

    .rdp-dropdown:focus-visible:not([disabled]) + .rdp-caption_label {
        box-shadow: none;
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
        border-radius: 0;

        ${mq.highContrast()} {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            outline-color: Highlight;
            color: white;
        }
    }

    .rdp-dropdown_root {
        position: relative;
        display: inline-flex;
        align-items: center;
    }

    .rdp-dropdown_root[data-disabled='true'] .rdp-chevron {
        opacity: var(--rdp-disabled-opacity);
    }

    .rdp-month_caption {
        display: flex;
        align-content: center;
        font-weight: bold;
        font-size: large;
        margin-bottom: 1rem;
        padding: 0;
    }

    .rdp-months {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: var(--rdp-months-gap);
        flex-direction: column;
    }

    .rdp-month_grid {
        border-collapse: collapse;
        width: 100%;
    }

    .rdp-nav {
        position: absolute;
        inset-block-start: 4px;
        inset-inline-end: 0;

        display: flex;
        align-items: center;
    }

    .rdp-weekday {
        padding: var(--rdp-weekday-padding);
        font-weight: 700;
        font-size: 0.875rem;
        text-align: var(--rdp-weekday-text-align);
        text-transform: var(--rdp-weekday-text-transform);
        line-height: 1.715;
    }

    .rdp-week_number {
        opacity: var(--rdp-week_number-opacity);
        font-weight: 400;
        font-size: small;
        height: var(--rdp-week_number-height);
        width: var(--rdp-week_number-width);
        border: var(--rdp-week_number-border);
        border-radius: var(--rdp-week_number-border-radius);
        text-align: var(--rdp-weeknumber-text-align);
    }

    /* DAY MODIFIERS */
    .rdp-today .rdp-day_button {
        font-weight: ${vars.font.weight.bold};
        border: 1px solid ${vars.colors.border.focus};
        background-color: ${vars.colors.neutral.grey400};
        box-shadow: ${vars.focus.default} solid ${vars.colors.border.focus};
        color: var(--rdp-today-color);
    }

    .rdp-today:not(.rdp-focused):not(.rdp-selected) .rdp-day_button {
        ${mq.highContrast()} {
            color: ${vars.colors.text.reversed};
        }
    }

    .rdp-selected .rdp-day_button {
        font-weight: ${vars.font.weight.bold};
        color: ${vars.colors.text.reversed};
        opacity: 1;
        background-color: ${vars.colors.text.link};

        ${mq.highContrast()} {
            -ms-high-contrast-adjust: none;
            forced-color-adjust: none;
            background-color: Highlight;
            border-color: Highlight;
            color: HighlightText;
        }
    }

    .rdp-outside {
        opacity: var(--rdp-outside-opacity);

        .rdp-day_button {
            font-weight: ${vars.font.weight.normal};
        }
    }

    .rdp-disabled {
        opacity: var(--rdp-disabled-opacity);
    }

    .rdp-hidden {
        visibility: hidden;
        color: var(--rdp-range_start-color);
    }

    .rdp-range_start {
        background: var(--rdp-range_start-background);
    }

    .rdp-range_start .rdp-day_button {
        background-color: var(--rdp-range_start-date-background-color);
        color: var(--rdp-range_start-color);
    }

    .rdp-range_middle {
        background-color: var(--rdp-range_middle-background-color);
    }

    .rdp-range_middle .rdp-day_button {
        border-color: transparent;
        border: unset;
        border-radius: unset;
        color: var(--rdp-range_middle-color);
    }

    .rdp-range_end {
        background: var(--rdp-range_end-background);
        color: var(--rdp-range_end-color);
    }

    .rdp-range_end .rdp-day_button {
        color: var(--rdp-range_start-color);
        background-color: var(--rdp-range_end-date-background-color);
    }

    .rdp-range_start.rdp-range_end {
        background: revert;
    }

    .rdp-focusable {
        cursor: pointer;
    }

    .date-picker__input {
        grid-area: input;
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-top: 0;

        &:focus {
            outline: 0;
        }
    }
`

export const DatePickerContainer = styled.div`
    position: relative;
    margin-top: ${pxToRem(4)};
    display: grid;
    max-width: max-content;
    grid-template-columns: minmax(auto, ${inputWidthVar}) auto;
    grid-template-areas: 'input button';
    ${daypickerStyles};

    &.field--full-width {
        width: 100%;
        max-width: 100%;
    }

    &:focus-within:not(:has(button:focus, .rdp-dropdown:focus)) {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        border-radius: ${vars.radius.large};
        outline-offset: ${vars.focus.default};

        ${mq.highContrast()} {
            outline-color: Highlight;
        }
    }

    &:focus-within {
        & .date-picker__input, .date-picker-button {
            ${mq.highContrast()} {
                border-color: Highlight;
            }
        }
    }
`

export const DatePickerPanel = styled(Popover)`
    position: absolute;
    top: 100%;
    margin-top: 8px;
    left: 0;
    z-index: 600;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    border: ${vars.colors.forms.border};
    border-radius: 8px;
    color: ${vars.colors.text.default};

    svg {
        fill: currentColor;
    }

    ${popoverTransformOriginVar.set('top right')};

    background: ${vars.colors.background.level1};

    .date-picker__panel-header {
        label {
            display: none;
        }

        .date-close {
            position: absolute;
            top: -8px;
            right: -8px;
        }
    }

    ${mq.max('lgMobile')} {
        position: fixed;
        bottom: 0;
        top: unset;
        min-width: 320px;
        max-height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        padding: 0 20px ${vars.spacing.md};
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;

        ${popoverTransformOriginVar.set('bottom center')};
        ${popoverTransformStartVar.set('scale(1) translate(0, 50%)')};
        ${popoverTransformEndVar.set('scale(1) translate(0, 0)')};

        .date-picker__panel-header {
            padding: ${vars.spacing.sm} 22px;
            margin: 0 -22px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: ${vars.spacing.md};
            border-bottom: 2px solid ${vars.colors.border.default};

            label {
                display: block;
                font-weight: ${vars.font.weight.bold};
            }

            .date-close {
                position: static;
                opacity: 1;
                top: 0;
                right: 0;
            }
        }
    }
`

export const DatePickerButton = styled.button`
    border: none;
    background: ${vars.colors.calendar.default};
    bottom: 0;
    border: ${vars.colors.forms.border};
    border-top-right-radius: ${vars.radius.large};
    border-bottom-right-radius: ${vars.radius.large};
    height: ${pxToRem(48)};
    width: ${pxToRem(48)};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    grid-area: button;

    svg {
        fill: ${vars.colors.text.link};
    }

    &:hover {
        cursor: pointer;
    }
    &:focus {
        outline: ${vars.focus.default} solid ${vars.colors.border.focus};
        outline-offset: ${vars.focus.default};
    }
    &:disabled {
        color: ${vars.colors.text.subtle};
        background-color: ${vars.colors.neutral.grey400};
        cursor: not-allowed;
        -webkit-transition: none;
        transition: none;

        svg {
            fill: ${vars.colors.neutral.grey300};
        }
    }
    &.is-hidden {
        display: none;
    }

    ${mq.highContrast()} {
        svg {
            fill: currentColor;
        }
    }

    &.${clsFlags.error} {
        border: ${vars.colors.forms.errorBorder};
        border-left: 0;
    }

    &.${clsFlags.disabled} {
        border-color: ${vars.colors.forms.disabled.border};
    }
`
