import React, { useState } from 'react'
import type { Meta } from '@storybook/react-vite'
import { ManualAddress } from '../src'

const meta: Meta<typeof ManualAddress> = {
    title: 'Patterns/Address/Manual address',
    component: ManualAddress,
    id: 'manual-address',
}

export default meta

export const Default = () => {
    // state
    const [value, setValue] = useState({
        streetAddress: '',
        suburb: '',
        state: '',
        postcode: '',
        country: 'Australia',
    })

    // handle change
    const handleOnChange = (address, key) => {
        console.log('onChange has been fired for key', key)
        console.log('onChange has been fired with value ', address)
        setValue(address)
    }

    return (
        <ManualAddress
            id='default-manual-address'
            value={value}
            onChange={handleOnChange}
        />
    )
}

export const Controlled = () => {
    const [value, setValue] = useState({
        streetAddress: '',
        suburb: '',
        state: '',
        postcode: '',
        country: 'Australia',
    })

    const handleOnChange = (address, key) => {
        console.log('onChange has been fired for key', key)
        console.log('onChange has been fired with value ', address)
        setValue(address)
    }

    return (
        <ManualAddress
            id='controlled-manual-address'
            value={value}
            onChange={handleOnChange}
        />
    )
}

export const Uncontrolled = () => {
    const handleOnChange = (address, key) => {
        console.log('onChange has been fired for key', key)
        console.log('onChange has been fired with value ', address)
    }

    return (
        <ManualAddress
            id='uncontrolled-manual-address'
            defaultValue={{
                streetAddress: '12b Kooyoo Street',
                suburb: 'Griffith',
                state: 'NSW',
                postcode: '2680',
                country: 'Australia',
            }}
            onChange={handleOnChange}
        />
    )
}

export const ErrorMessage = () => {
    // state
    const [value, setValue] = useState({
        streetAddress: '',
        suburb: '',
        state: '',
        postcode: '',
        country: 'Australia',
    })

    // handle change
    const handleOnChange = (address, key) => {
        console.log('onChange has been fired for key', key)
        console.log('onChange has been fired with value ', address)
        setValue(address)
    }

    return (
        <ManualAddress
            fieldConfig={{
                streetAddress: {
                    id: 'unique-id-streetAddress',
                    errorMessage: 'Enter a street address.',
                },
                suburb: {
                    id: 'unique-id-suburb',
                    errorMessage: 'Enter a suburb.',
                },
                state: {
                    id: 'unique-id-state',
                    errorMessage: 'Select a state.',
                },
                postcode: {
                    id: 'unique-id-postcode',
                    errorMessage: 'Enter a postcode.',
                },
                country: {
                    id: 'unique-id-country',
                },
            }}
            id='error-message-manual-address'
            value={value}
            onChange={handleOnChange}
        />
    )
}

export const FieldConfig = () => {
    // state
    const [value, setValue] = useState({
        streetAddress: '',
        suburb: '',
        state: '',
        postcode: '',
        country: 'Australia',
    })

    // handle change
    const handleOnChange = (address, key) => {
        console.log('onChange has been fired for key', key)
        console.log('onChange has been fired with value ', address)
        setValue(address)
    }

    return (
        <ManualAddress
            fieldConfig={{
                streetAddress: {
                    id: 'unique-id-streetAddress',
                    label: 'Street Address',
                    helpMessage: 'Enter your street address.',
                    errorMessage: 'Enter a street address.',
                    hasError: true
                },
                suburb: {
                    id: 'unique-id-suburb',
                    label: 'Suburb',
                    helpMessage: 'Enter your suburb.',
                    errorMessage: 'Enter a suburb.',
                },
                state: {
                    id: 'unique-id-state',
                    label: 'State',
                    helpMessage: 'Enter your state.',
                    hasError: true
                },
                postcode: {
                    id: 'unique-id-postcode',
                    label: 'Postcode',
                    helpMessage: 'Enter your postcode.',
                    hasError: false
                },
                country: {
                    id: 'unique-id-country',
                    label: 'Country',
                    helpMessage: 'Enter your country.',
                    hasError: false
                },
            }}
            id='error-message-manual-address'
            value={value}
            onChange={handleOnChange}
        />
    )
}

export const StatesOverride = () => {
    // state
    const [value, setValue] = useState({})

    // handle change
    const handleOnChange = (address, key) => {
        console.log('onChange has been fired with ', { key, address })
        setValue(address)
    }

    return (
        <ManualAddress
            id='states-override-manual-address'
            value={value}
            onChange={handleOnChange}
            statesOverride={['NSW', 'VIC']}
        />
    )
}

export const Properties = args => {
    // state
    const [value, setValue] = useState({
        country: 'Australia',
        streetAddress: '4799 Alexander Avenue',
        state: 'NSW',
        postcode: '2000',
        suburb: 'Sydney',
    })

    // handle change
    const handleOnChange = (address, key) => {
        console.log('onChange has been fired for key', key)
        console.log('onChange has been fired with value ', address)
        setValue(address)
    }

    return <ManualAddress {...args} value={value} onChange={handleOnChange} />
}

Properties.args = {
    id: 'ManualAddressDefault',
    statesOverride: [],
}

export const VrtManualAddress = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <ManualAddress id='vrt-default' />
            <ManualAddress
                id='vrt-error'
                value={{
                    streetAddress: '',
                    suburb: '',
                    state: '',
                    postcode: '',
                    country: 'Australia',
                }}
                fieldConfig={{
                    streetAddress: {
                        id: 'unique-id-streetAddress',
                        errorMessage: 'Enter a street address.',
                    },
                    suburb: {
                        id: 'unique-id-suburb',
                        errorMessage: 'Enter a suburb.',
                    },
                    state: {
                        id: 'unique-id-state',
                        errorMessage: 'Select a state.',
                    },
                    postcode: {
                        id: 'unique-id-postcode',
                        errorMessage: 'Enter a postcode.',
                    },
                    country: {
                        id: 'unique-id-country',
                    },
                }}
            />
        </div>
    ),
}
