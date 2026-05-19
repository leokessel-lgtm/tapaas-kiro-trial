import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeader,
} from '../src'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import { StatusLabel } from '@snsw-gel/react'
import type { Meta } from '@storybook/react-vite'
import { expect, screen } from '@storybook/test'

const meta: Meta<typeof Table> = {
    title: 'Components/Tables',
    component: TableContainer,
    subcomponents: {
        Table,
        TableHead,
        TableBody,
        TableRow,
        TableCell,
        TableHeader,
    },
    id: 'table',
}

export default meta

const headerData = [
    'Date',
    'Business Name',
    'Registration No.',
    'Status',
    'Type',
]
const bodyData = [
    {
        date: '28/01/2021',
        business_name: 'Business Name One',
        registration: '40-542-0925',
        status: <StatusLabel text='Completed' variant='success' />,
        type: 300,
    },
    {
        date: '12/04/2021',
        business_name: 'Business Name Two',
        registration: '66-980-2586',
        status: <StatusLabel text='Pending' />,
        type: 450,
    },
    {
        date: '08/06/2021',
        business_name: 'Business Name Three',
        registration: '00-021-4464',
        status: <StatusLabel text='Active' variant='info' />,
        type: 300,
    },
    {
        date: '23/02/2021',
        business_name: 'Business Name Four',
        registration: '79-420-2606',
        status: <StatusLabel text='Completed' variant='success' />,
        type: 150,
    },
    {
        date: '24/05/2021',
        business_name: 'Business Name Five',
        registration: '41-145-1671',
        status: <StatusLabel text='Pending' />,
        type: 150,
    },
    {
        date: '17/06/2021',
        business_name: 'Business Name Six',
        registration: '32-213-8909',
        status: <StatusLabel text='Active' variant='info' />,
        type: 450,
    },
]

export const Default = args => (
    <TableContainer title='Business Registration' id='default-table' {...args}>
        <Table>
            <TableHead>
                <TableRow>
                    {headerData.map((heading, index) => (
                        <TableHeader key={index}>{heading}</TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {bodyData.map((row, index) => {
                    const rowItem = Object.values(row)
                    return (
                        <TableRow key={index}>
                            {rowItem.map((item, index) => (
                                <TableCell key={index}>{item}</TableCell>
                            ))}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>
)

export const WithDescription = args => (
    <TableContainer
        title='Business Registration'
        description='Registration for a new company'
        id='description-table'
    >
        <Table>
            <TableHead>
                <TableRow>
                    {headerData.map((heading, index) => (
                        <TableHeader key={index}>{heading}</TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {bodyData.map((row, index) => {
                    const rowItem = Object.values(row)
                    return (
                        <TableRow key={index}>
                            {rowItem.map((item, index) => (
                                <TableCell key={index}>{item}</TableCell>
                            ))}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>
)

export const Striped = args => (
    <TableContainer
        title='Business Registration'
        description='Registration for a new company'
        id='striped-table-1'
    >
        <Table striped>
            <TableHead>
                <TableRow>
                    {headerData.map((heading, index) => (
                        <TableHeader key={index}>{heading}</TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {bodyData.map((row, index) => {
                    const rowItem = Object.values(row)
                    return (
                        <TableRow key={index}>
                            {rowItem.map((item, index) => (
                                <TableCell key={index}>{item}</TableCell>
                            ))}
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>
)

export const Mobile = {
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
    },

    render: args => {
        return (
            <TableContainer
                title='Business Registration'
                id='mobile-table'
                {...args}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            {headerData.map((heading, index) => (
                                <TableHeader key={index}>{heading}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bodyData.map((row, index) => {
                            const rowItem = Object.values(row)
                            return (
                                <TableRow key={index}>
                                    {rowItem.map((item, index) => (
                                        <TableCell key={index}>
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    },
}

export const Properties = {
    args: {
        title: 'Table title',
        description: 'Table description',
        id: 'table-id',
    },
    render: args => {
        return (
            <TableContainer
                {...args}
                title={args.title}
                description={args.description}
                id={args.id}
            >
                <Table striped={args.striped}>
                    <TableHead>
                        <TableRow>
                            <TableHeader>heading 1</TableHeader>
                            <TableHeader>heading 2</TableHeader>
                            <TableHeader>heading 3</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>row 1, col 1</TableCell>
                            <TableCell>row 1, col 2</TableCell>
                            <TableCell>row 1, col 3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>row 2, col 1</TableCell>
                            <TableCell>row 2, col 2</TableCell>
                            <TableCell>row 2, col 3</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    },
}

export const VisualTestTextSpacing = args => (
    <TableContainer
        title='Table title'
        description='Additional table description if needed'
        id='description-table'
    >
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>Header One</TableHeader>
                    <TableHeader>Header Two</TableHeader>
                    <TableHeader>Header Three</TableHeader>
                    <TableHeader>Header Four</TableHeader>
                    <TableHeader>Header Five</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Column One</TableCell>
                    <TableCell>Column Two</TableCell>
                    <TableCell>Column Three</TableCell>
                    <TableCell>Column Four</TableCell>
                    <TableCell>Column Five</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Column One</TableCell>
                    <TableCell>Column Two</TableCell>
                    <TableCell>Column Three</TableCell>
                    <TableCell>Column Four</TableCell>
                    <TableCell>Column Five</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
)

VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
    visual: {
        enabled: true,
    },
}

export const VrtTable = {
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: () => (
        <>
            {/* Regular */}
            <TableContainer
                title='VRT Regular'
                description='Registration for a new company'
                id='regular-table'
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            {headerData.map((heading, index) => (
                                <TableHeader key={index}>{heading}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bodyData.map((row, index) => {
                            const rowItem = Object.values(row)
                            return (
                                <TableRow key={index}>
                                    {rowItem.map((item, index) => (
                                        <TableCell key={index}>
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Striped */}
            <TableContainer
                title='VRT Striped'
                description='Registration for a new company'
                id='striped-table'
            >
                <Table striped>
                    <TableHead>
                        <TableRow>
                            {headerData.map((heading, index) => (
                                <TableHeader key={index}>{heading}</TableHeader>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bodyData.map((row, index) => {
                            const rowItem = Object.values(row)
                            return (
                                <TableRow key={index}>
                                    {rowItem.map((item, index) => (
                                        <TableCell key={index}>
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    ),
}

export const VrtTableRegion = {
    parameters: {
        a11y: {
            covers: ['scrollable-region-focusable'],
        },
        visual: {
            enabled: true,
            mobileOnly: true,
        },
    },
    globals: {
        viewport: { value: 'mobile1', isRotated: false },
    },
    render: args => (
        <TableContainer
            title='Business Registration'
            description='Registration for a new company'
            id='description-table'
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {headerData.map((heading, index) => (
                            <TableHeader key={index}>{heading}</TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bodyData.map((row, index) => {
                        const rowItem = Object.values(row)
                        return (
                            <TableRow key={index}>
                                {rowItem.map((item, index) => (
                                    <TableCell key={index}>{item}</TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    ),
    play: async ({ userEvent }) => {
        // https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas
        const heading = screen.getByRole('heading', {
            name: 'Business Registration',
        })
        const table = screen.getByRole('table', {
            name: 'Business Registration',
        })

        await expect(heading, { level: 3 }).toBeInTheDocument()
        await expect(table).toBeInTheDocument()

        await screen.findByRole('region')
        const scrollableContent = screen.getByRole('region')
        await expect(scrollableContent).toBeInTheDocument()
        await expect(scrollableContent).toHaveAttribute(
            'aria-label',
            'Scrollable region for Business Registration table',
        )
        await expect(scrollableContent).toHaveAttribute('tabindex', '0')

        // focuses on scrollable content region
        await scrollableContent.focus()
        await expect(scrollableContent).toHaveFocus()

        await expect(heading).toHaveAttribute('id', 'description-table')
        await expect(table).toHaveAttribute(
            'aria-labelledby',
            'description-table',
        )
    },
}
