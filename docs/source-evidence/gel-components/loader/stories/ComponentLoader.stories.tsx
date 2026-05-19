import React from 'react'
import styled from 'styled-components'
import { ComponentLoader } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const StoryContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
`
const StoryHeightDiv = styled.div`
    min-height: 300px;
`

const StoryContainer = ({ children }) => (
    <StoryHeightDiv>
        <StoryContainerDiv>{children}</StoryContainerDiv>
    </StoryHeightDiv>
)

const ParentContainer = ({ children }) => (
    <StoryContainer>
        <div>
            <h3>This is a static section.</h3>
        </div>
        <div>
            {children}
            <p>This is the section that loads data from the server.</p>
        </div>
        <div>
            <h4>This is a static section.</h4>
            <p>This is a static section.</p>
        </div>
    </StoryContainer>
)

const meta: Meta<typeof ComponentLoader> = {
    title: 'Components/Loader',
    component: ComponentLoader,
    parameters: {
        visual: {
            enabled: false,
        },
    },
    id: 'loader-spinner',
}

export default meta

export const Default = {
    render: args => (
        <ParentContainer>
            <ComponentLoader {...args} />
        </ParentContainer>
    ),
    height: '300px',
    name: 'Default',

    args: {
        label: undefined,
    },

    argTypes: {
        label: {
            name: 'label',

            table: {
                defaultValue: {
                    summary: 'Loading...',
                },
            },
        },
    },
}

export const FullPage = {
    render: args => (
        <ParentContainer>
            <ComponentLoader {...args} />
        </ParentContainer>
    ),
    height: '300px',
    name: 'Full Page',

    args: {
        label: undefined,
        fullPage: true,
    },

    argTypes: {
        label: {
            name: 'label',

            table: {
                defaultValue: {
                    summary: 'Loading...',
                },
            },
        },
    },
}

export const LoaderProperties = {
    render: args => (
        <ParentContainer>
            <ComponentLoader {...args} />
        </ParentContainer>
    ),
    height: '300px',
    name: 'Loader Properties',

    args: {
        label: 'One moment, please...',
    },

    argTypes: {
        label: {
            name: 'label',

            table: {
                defaultValue: {
                    summary: 'Loading...',
                },
            },
        },
    },
}

export const VisualTestTextSpacing = {
    render: args => (
        <ParentContainer>
            <ComponentLoader {...args} />
        </ParentContainer>
    ),
    height: '300px',
    name: 'Default',

    args: {
        label: undefined,
    },

    argTypes: {
        label: {
            name: 'label',

            table: {
                defaultValue: {
                    summary: 'Loading...',
                },
            },
        },
    },
}

VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
}

export const VisualTestTextSpacingFullPage = {
    render: args => (
        <ParentContainer>
            <ComponentLoader {...args} />
        </ParentContainer>
    ),
    height: '300px',
    name: 'Full Page',

    args: {
        label: undefined,
        fullPage: true,
    },

    argTypes: {
        label: {
            name: 'label',

            table: {
                defaultValue: {
                    summary: 'Loading...',
                },
            },
        },
    },
}

VisualTestTextSpacingFullPage.decorators = [textSpacingDecorator]
VisualTestTextSpacingFullPage.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
}
