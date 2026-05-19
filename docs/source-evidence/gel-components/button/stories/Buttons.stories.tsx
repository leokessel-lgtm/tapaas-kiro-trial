import React from 'react'
import { Button } from '../src'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {
    Icon,
    uiIconAdd,
    uiIconArrowLeft,
    uiIconArrowRight,
    uiIconEmailUnread,
    uiIconExternalLink,
} from '@snsw-gel/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    augmentStorybookTypes,
    textSpacingDecorator,
} from '@snsw-gel/storybook'

augmentStorybookTypes(Button)

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Components/Buttons',
    id: 'buttons',
    render: props => <Button {...props} />,
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Check registration'
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Buy a vehicle history report'
    },
}

export const Tertiary = {
    args: {
        variant: 'tertiary',
        children: 'Cancel'
    },
}

export const PrimaryWithRouter: Story = () => (
    <Router>
        <Button as={Link} href='/dashboard'>
            Check registration
        </Button>
        <Route
            path='/dashboard'
            component={() => <h2>You are in the Dashboard</h2>}
        />
    </Router>
)

export const LinkButton: Story = {
    args: {
        variant: 'link',
        children: 'Apply',
    },
}

export const IconStartButton: Story = {
    name: 'IconStart Button',
    render() {
        return (
            <>
                <Button iconStart={<Icon icon={uiIconEmailUnread} />}>Send email</Button>
                <br />
                <br />
                <Button iconStart={<Icon icon={uiIconEmailUnread} />} variant='secondary'>
                    Send email
                </Button>
                <br />
                <br />
                <Button variant='link' iconStart={<Icon icon={uiIconArrowLeft} />}>
                    Back
                </Button>
            </>
        )
    },
}

export const IconEndButton: Story = {
    name: 'IconEnd Button',
    render() {
        return (
            <>
                <Button iconEnd={<Icon icon={uiIconExternalLink} />}>Apply online</Button>
                <br />
                <br />
                <Button variant='link' iconEnd={<Icon icon={uiIconArrowRight} />}>Apply</Button>
            </>
        )

    }
}

export const Properties: Story = {
    args: {
        children: 'Button',
    },
    parameters: {
        controls: {
            expanded: true,
        },
    },
}

export const VisualTestTextSpacing: Story = {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    alignItems: 'flex-start',
                }}
            >
                <Button>Primary button</Button>
                <Button variant='secondary'>Secondary button</Button>
                <Button variant='tertiary'>Tertiary button</Button>
                <Button variant='destructive'>Destructive button</Button>
                <Button variant='link'>Link button</Button>
                <Button iconStart={<Icon icon={uiIconAdd} />}>Create new notification</Button>
                <Button iconStart={<Icon icon={uiIconEmailUnread} />} variant='secondary'>
                    Send
                </Button>
                <Button variant='link' iconStart={<Icon icon={uiIconArrowLeft} />}>
                    Back
                </Button>
            </div>
        )
    },
    parameters: {
        a11y: {
            covers: ['text-spacing'],
        },
        visual: {
            enabled: true,
        },
    },
    decorators: [textSpacingDecorator],
}

export const VrtButtons = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'flex-start',
            }}
        >
            <Button>Primary button</Button>
            <Button variant='secondary'>Secondary button</Button>
            <Button variant='tertiary'>Tertiary button</Button>
            <Button variant='destructive'>Destructive button</Button>
            <Button variant='link'>Link button</Button>
            <Button iconEnd={<Icon icon={uiIconArrowRight} />}>Button</Button>
            <Button iconStart={<Icon icon={uiIconEmailUnread} />} variant='secondary'>
                Send
            </Button>
            <Button variant='link' iconStart={<Icon icon={uiIconArrowLeft} />}>
                Back
            </Button>
        </div>
    ),
}
