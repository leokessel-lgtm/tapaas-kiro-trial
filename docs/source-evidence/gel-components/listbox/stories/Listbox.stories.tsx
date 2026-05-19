import React from 'react'
import { useState } from 'react'
import { Listbox } from '../src'
import { Item, Group } from '@snsw-gel/react'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Listbox> = {
    id: 'Listbox',
    title: 'Components/Listbox',
    component: Listbox,
}

export default meta

export const Example = {
    render() {
        const [isOpen, setIsOpen] = useState(true)
        return (
            <Listbox
                aria-label='Example listbox'
                onSelectionChange={value => {
                    console.log(value)
                }}
                virtualFocus={false}
            >
                <Item value='nice'>Nice</Item>
                <Item value='cool'>Cool</Item>
                <Group title='Other'>
                    <Item
                        value='interesting'
                        onSelect={e => {
                            e.preventDefault()
                            alert('wow you clicked a custom action')
                        }}
                    >
                        Click me!
                    </Item>
                </Group>
            </Listbox>
        )
    },
}

export const VrtListbox = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <Listbox aria-label='Example listbox'>
            <Item value='nice'>Nice</Item>
            <Item value='cool'>Cool</Item>
            <Group title='Other'>
                <Item value='interesting'>Click me!</Item>
            </Group>
        </Listbox>
    ),
}
