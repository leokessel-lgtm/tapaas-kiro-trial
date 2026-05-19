import React, { useState } from 'react'
import {
    SkeletonContainer,
    SkeletonHeading,
    SkeletonText,
    SkeletonShape,
} from '../src'
import {
    Card,
    Heading,
    Button,
    Checkbox,
    BrandIconSupportTechnical,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableHeader,
    ContentContainer,
    Field,
    Input,
    Select,
    Row,
    Col,
} from '@snsw-gel/react'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof SkeletonContainer> = {
    title: 'Components/Skeleton loader',
    component: SkeletonContainer,
    subcomponents: {
        SkeletonHeading,
        SkeletonText,
        SkeletonShape
    },
    id: 'loader-skeleton',
}

export default meta

export const Example = () => {
    return (
        <SkeletonContainer>
            <SkeletonHeading width={210} />
            <SkeletonText rows={4} />
        </SkeletonContainer>
    )
}
Example.parameters = {
    e2e: {
        enabled: false,
    },
}

export const ParagraphExample = () => {
    const [isLoading, setIsLoading] = useState(true)

    const onClickEvent = () => {
        setIsLoading(v => !v)
    }

    return (
        <div style={{ maxWidth: '480px' }}>
            <Button onClick={onClickEvent} disabled={isLoading}>
                Simulate loading
            </Button>
            <Checkbox
                value={`${isLoading}`}
                name='loading'
                label='Loading'
                onChange={onClickEvent}
                checked={isLoading}
            />
            {isLoading ?
                <SkeletonContainer>
                    <SkeletonHeading width={210} />
                    <SkeletonText rows={4} />
                </SkeletonContainer>
            :   <>
                    <Heading level={3}>Dynamic Heading</Heading>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi aliquip.
                    </p>
                </>
            }
        </div>
    )
}

export const CardExample = () => {
    const [isLoading, setIsLoading] = useState(true)

    const onClickEvent = () => {
        setIsLoading(v => !v)
    }

    return (
        <>
            <Button onClick={onClickEvent} disabled={isLoading}>
                Simulate loading
            </Button>
            <Checkbox
                value={`${isLoading}`}
                name='loading'
                label='Loading'
                onChange={onClickEvent}
                checked={isLoading}
            />
            <br />
            <br />
            <div style={{ width: '273px' }}>
                <Card>
                    {isLoading ?
                        <SkeletonContainer>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <SkeletonShape circle size='lg' />
                                &nbsp;&nbsp;
                                <SkeletonHeading
                                    level={5}
                                    width={90}
                                    noMargin
                                />
                            </div>
                            <SkeletonText rows={2} />
                        </SkeletonContainer>
                    :   <>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <BrandIconSupportTechnical size='lg' />
                                &nbsp;&nbsp;
                                <span>
                                    <strong>Card Title</strong>
                                </span>
                            </div>
                            <p>Excepteur sint occaecat cupidatat culpa.</p>
                        </>
                    }
                </Card>
            </div>
        </>
    )
}

export const TableExample = () => {
    const [isLoading, setIsLoading] = useState(true)

    const onClickEvent = () => {
        setIsLoading(v => !v)
    }
    return (
        <>
            <Button onClick={onClickEvent} disabled={isLoading}>
                Simulate loading
            </Button>
            <Checkbox
                value={`${isLoading}`}
                name='loading'
                label='Loading'
                onChange={onClickEvent}
                checked={isLoading}
            />
            <br />
            <br />
            <>
                {isLoading ?
                    <TableContainer title='Table title' id='default-table'>
                        <SkeletonContainer>
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
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SkeletonHeading
                                                level={5}
                                                width={100}
                                                noMargin
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </SkeletonContainer>
                    </TableContainer>
                :   <TableContainer title='Table title' id='default-table'>
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
                }
            </>
        </>
    )
}

function TableWithSkeleton({ isLoading }) {
    return isLoading ?
            <SkeletonContainer>
                <TableContainer title='Table title' id='default-table'>
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
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </SkeletonContainer>
        :   <TableContainer title='Table title' id='default-table'>
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
}

export const Properties = {
    args: {
        title: 'Loading',
    },
    render: args => {
        return (
            <SkeletonContainer {...args}>
                <SkeletonHeading/>
                <SkeletonText/>
                <SkeletonShape/>
            </SkeletonContainer>
        )
    }
}

export const AllTogether = () => {
    const [loading, setLoading] = useState(true)

    const [showLoaded, setShowLoaded] = useState(5)

    const tilesToDisplay = loading ? 3 : showLoaded

    const data = [
        {
            title: 'Title 1',
            description: 'Description 1',
            profile: 'https://via.placeholder.com/150',
        },
        {
            title: 'Title 2',
            description: 'Description 2',
            profile: 'https://via.placeholder.com/150',
        },
        {
            title: 'Title 3',
            description: 'Description 3',
            profile: 'https://via.placeholder.com/150',
        },

        {
            title: 'Title 4',
            description: 'Description 4',
            profile: 'https://via.placeholder.com/150',
        },
        {
            title: 'Title 5',
            description: 'Description 5',
            profile: 'https://via.placeholder.com/150',
        },
    ]

    return (
        <>
            <Button
                variant='tertiary'
                type='button'
                onClick={() => setLoading(!loading)}
            >
                Set loading
            </Button>
            <ContentContainer>
                <form
                    onSubmit={e => {
                        console.log('onSubmit')
                        e.preventDefault()

                        const form = new FormData(e.currentTarget)

                        const searchDelay = form.get('searchDelay')

                        const randBetween = (min, max) => {
                            return Math.floor(
                                Math.random() * (max - min + 1) + min,
                            )
                        }
                        setShowLoaded(randBetween(data.length - 3, data.length))
                        setLoading(true)

                        const durations = {
                            Tiny: 500,
                            Small: 1000,
                            Medium: 2000,
                            Large: 3000,
                        }

                        setTimeout(() => {
                            setLoading(false)
                        }, Number(durations[searchDelay]))
                    }}
                >
                    <Row style={{ alignItems: 'flex-end' }}>
                        <Col span={3}>
                            <Field
                                label='First Name'
                                helpMessage='Find a user by first name'
                            >
                                <Input name='firstName' />
                            </Field>
                        </Col>
                        <Col span={3}>
                            <Field
                                label='Last Name'
                                helpMessage='Find a user by last name'
                            >
                                <Input name='lastName' />
                            </Field>
                        </Col>
                        <Col span={3}>
                            <Field
                                label='Search delay'
                                helpMessage='How long before loading state finishes'
                            >
                                <Select
                                    defaultValue='Medium'
                                    name='searchDelay'
                                    options={[
                                        'Tiny',
                                        'Small',
                                        'Medium',
                                        'Large',
                                    ].map(v => ({ text: v, value: v }))}
                                />
                            </Field>
                        </Col>
                        <Col span={3}>
                            <Button type='submit'>Submit</Button>
                        </Col>
                    </Row>
                </form>
                <Heading level={2}>Results</Heading>
                <Row>
                    <Col
                        span={4}
                        style={{
                            borderRight: '1px solid #ccc',
                        }}
                    >
                        {data.slice(0, tilesToDisplay).map((line, i) => {
                            return (
                                <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        padding: '20px 40px 20px 0px',
                                        borderBottom: '1px solid #ccc',
                                    }}
                                >
                                    <div
                                        style={{
                                            flex: '0 0 auto',
                                            minWidth: 48,
                                        }}
                                    >
                                        {loading ?
                                            <SkeletonShape size={48} circle />
                                        :   <img
                                                width={48}
                                                height={48}
                                                style={{
                                                    borderRadius: '9999px',
                                                    overflow: 'hidden',
                                                }}
                                                src={line.profile}
                                            />
                                        }
                                    </div>
                                    <div style={{ paddingLeft: 20, flex: 1 }}>
                                        {loading ?
                                            <SkeletonHeading
                                                width={140}
                                                noMargin
                                            />
                                        :   <Heading
                                                style={{
                                                    margin: 0,
                                                }}
                                                level={5}
                                            >
                                                {line.title}
                                            </Heading>
                                        }
                                        {loading ?
                                            <SkeletonText
                                                rows={3}
                                                widthLast={160}
                                            />
                                        :   <p
                                                style={{
                                                    margin: '10px 0 12px',
                                                }}
                                            >
                                                {line.description}
                                            </p>
                                        }

                                        {loading ? null : (
                                            <Button
                                                disabled={loading}
                                                type='submit'
                                                variant='arrow'
                                            >
                                                View
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </Col>
                    <Col span={8}>
                        <div
                            style={{ padding: '0px 20px', marginTop: '-2rem' }}
                        >
                            <TableWithSkeleton isLoading={loading} />
                        </div>
                    </Col>
                </Row>
            </ContentContainer>
        </>
    )
}

AllTogether.parameters = {
    e2e: {
        enabled: false,
    },
}

export const VrtSkeleton = {
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: () => (
        <>
            {/* Card */}
            <div style={{ width: '273px' }}>
                <Card>
                    <SkeletonContainer>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <SkeletonShape circle size='lg' />
                            &nbsp;&nbsp;
                            <SkeletonHeading level={5} width={90} noMargin />
                        </div>
                        <SkeletonText rows={2} />
                    </SkeletonContainer>
                </Card>
            </div>
            {/* Paragraph */}
            <div style={{ maxWidth: '480px' }}>
                <SkeletonContainer>
                    <SkeletonHeading width={210} />
                    <SkeletonText rows={4} />
                </SkeletonContainer>
            </div>
            {/* Table */}
            <TableContainer title='Table title' id='default-table'>
                <SkeletonContainer>
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
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                                <TableCell>
                                    <SkeletonHeading
                                        level={5}
                                        width={100}
                                        noMargin
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </SkeletonContainer>
            </TableContainer>
        </>
    ),
}
