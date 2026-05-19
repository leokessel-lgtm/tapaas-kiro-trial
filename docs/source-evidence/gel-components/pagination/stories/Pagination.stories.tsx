import React, { useState } from 'react'
import { Pagination } from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Pagination> = {
    title: 'Components/Pagination',
    component: Pagination,
    id: 'pagination',
}

export default meta

export const Default = () => {
    const [page, setPage] = useState(1)
    const changeHandler = (pageNo, indexes) => {
        setPage(pageNo)
        console.log(pageNo, indexes)
    }
    return (
        <Pagination
            totalItems={100}
            currentPage={page}
            onPageChange={(pageNo, indexes) => {
                changeHandler(pageNo, indexes)
            }}
        />
    )
}

export const CurrentPage = () => {
    const [page, setPage] = useState(5)
    const changeHandler = (pageNo, indexes) => {
        setPage(pageNo)
        console.log(pageNo, indexes)
    }
    return (
        <Pagination
            totalItems={100}
            currentPage={page}
            onPageChange={(pageNo, indexes) => {
                changeHandler(pageNo, indexes)
            }}
        />
    )
}

export const Properties = args => {
    const [page, setPage] = useState(1)
    const changeHandler = (pageNo, indexes) => {
        setPage(pageNo)
        console.log(pageNo, indexes)
    }
    return (
        <Pagination
            totalItems={100}
            {...args}
            currentPage={page}
            onPageChange={(pageNo, indexes) => {
                changeHandler(pageNo, indexes)
            }}
        />
    )
}

export const VisualTestTextSpacing = () => {
    return (
        <Pagination
            totalItems={1000}
            currentPage={100}
            onPageChange={() => {}}
        />
    )
}

VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
    visual: {
        enabled: true,
    },
}

export const VrtPagination = {
    args: {
        totalItems: 100,
    },
    parameters: {
        a11y: {
            enabled: false,
        },
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <Pagination {...args} currentPage={1} />
            <Pagination {...args} currentPage={3} />
            <Pagination {...args} currentPage={5} />
            <Pagination {...args} currentPage={8} />
            <Pagination {...args} currentPage={10} />
        </div>
    ),
}
