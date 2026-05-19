import React from 'react'
import { Card, CardTitle } from '../src'
import {
    BrandIconCreativeKids,
    BrandIconSupportTechnical,
    TextLink,
    IconAdd,
    Button,
    Row,
    Col,
} from '@snsw-gel/react'
import { vars } from '@snsw-gel/theming'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {
    textSpacingDecorator,
    augmentStorybookTypes,
} from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

augmentStorybookTypes(CardTitle)

const placeholderImage =
    'data:image/png;base64,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'

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    subcomponents: { CardTitle },
    id: 'cards',
}

export default meta

export const StaticCardDefault = {
    render: () => (
        <div style={{ maxWidth: '370px' }}>
            <Card>
                <CardTitle level={4} icon={<BrandIconCreativeKids />}>
                    Creative Kids vouchers
                </CardTitle>
                <p>
                    Save on the cost of the kids&apos; creative activities by
                    applying for vouchers.
                </p>
                <Button style={{ width: '100%' }} variant='secondary'>
                    Add
                </Button>
            </Card>
        </div>
    ),
    name: 'Static card default',
}

export const StaticCardCustomStyling = {
    render: () => (
        <div style={{ maxWidth: '370px' }}>
            <Card>
                <div style={{ textAlign: 'center' }}>
                    <BrandIconSupportTechnical size='xxl' />
                    <CardTitle>Easy, multi-channel communication</CardTitle>
                    <p>
                        Streamline your campaigns by executing them through one
                        solution. Our channels include SMS, email, push
                        notifications and the MyServiceNSW Account inbox.
                    </p>
                </div>
            </Card>
        </div>
    ),
    name: 'Static card custom styling',
}

export const LinkCardDefault = {
    render: () => (
        <div style={{ maxWidth: '370px' }}>
            <Card isClickable>
                <CardTitle level={4} icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
        </div>
    ),
    name: 'Link card default',
}

export const LinkCardWithRoute = {
    render: () => (
        <div style={{ maxWidth: '370px' }}>
            <Router>
                <Card isClickable>
                    <CardTitle level={4} icon={<BrandIconCreativeKids />}>
                        <Link to='/linkcardroute'>Creative Kids vouchers</Link>
                    </CardTitle>
                    <p>
                        $100 voucher for children’s creative and cultural
                        activities.
                    </p>
                </Card>
                <Route
                    path='/linkcardroute'
                    component={() => <h2>Link card route</h2>}
                />
            </Router>
        </div>
    ),
    name: 'Link card with route',
}

export const LinkCardWithImage = {
    render: () => (
        <div style={{ maxWidth: '370px' }}>
            <Card isClickable imageSrc={placeholderImage}>
                <p
                    style={{
                        color: vars.colors.text.subtle,
                        marginTop: '0',
                        marginBottom: '8px',
                    }}
                >
                    COVID-19 services
                </p>
                <CardTitle level={4}>
                    <a href='#'>Test and isolate payment</a>
                </CardTitle>
                <p>
                    You may be eligible for the $320 payment if you need to
                    self-isolate while waiting for your COVID-19 test result and
                    you’re unable to work.
                </p>
            </Card>
        </div>
    ),
    name: 'Link card with image',
}

export const LinkCardWithCtaText = {
    render: () => (
        <div style={{ maxWidth: '370px' }}>
            <Card isClickable ctaText='Apply'>
                <CardTitle level={4} icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
        </div>
    ),
    name: 'Link card with CTA text',
}

export const LinkCardWithCtaIcon = {
    render: () => (
        <div style={{ maxWidth: '370px' }}>
            <Card isClickable ctaText='Add' ctaIcon={<IconAdd />}>
                <CardTitle level={4} icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
        </div>
    ),
    name: 'Link card with CTA icon',
}

export const CardTitleDefault = {
    render: () => (
        <Row>
            <Col span={4}>
                <CardTitle>Easy, multi-channel communication</CardTitle>
            </Col>
            <Col span={4}>
                <CardTitle level={4}>
                    Easy, multi-channel communication
                </CardTitle>
            </Col>
            <Col span={4}>
                <CardTitle level={5}>
                    Easy, multi-channel communication
                </CardTitle>
            </Col>
        </Row>
    ),
    name: 'CardTitle default',
}

export const CardTitleWithIcon = {
    render: () => (
        <Row>
            <Col span={4}>
                <CardTitle icon={<BrandIconSupportTechnical />}>
                    Easy, multi-channel communication
                </CardTitle>
            </Col>
            <Col span={4}>
                <CardTitle level={4} icon={<BrandIconSupportTechnical />}>
                    Easy, multi-channel communication
                </CardTitle>
            </Col>
            <Col span={4}>
                <CardTitle level={5} icon={<BrandIconSupportTechnical />}>
                    Easy, multi-channel communication
                </CardTitle>
            </Col>
        </Row>
    ),
    name: 'CardTitle with icon',
}

export const CardTitleChangingHeadingElement = {
    render: () => (
        <CardTitle headingElement='h5'>
            Easy, multi-channel communication
        </CardTitle>
    ),
    name: 'CardTitle changing heading element',
}

export const CardTitleChangingHeadingLevel = {
    render: () => (
        <CardTitle level={4}>Easy, multi-channel communication</CardTitle>
    ),
    name: 'CardTitle changing heading level',
}

export const Properties = args => (
    <Card {...args}>
        <CardTitle>Card title text</CardTitle>
    </Card>
)

export const VisualTestTextSpacing = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'flex-start',
            }}
        >
            <Card isClickable ctaText='Apply'>
                <CardTitle icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
            <Card isClickable ctaText='Apply'>
                <CardTitle level={4} icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
            <Card isClickable ctaText='Apply'>
                <CardTitle level={5} icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
            <Card isClickable ctaText='Apply'>
                <CardTitle>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
            <Card isClickable ctaText='Apply'>
                <CardTitle level={4}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
            <Card isClickable ctaText='Apply'>
                <CardTitle level={5}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
        </div>
    ),
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

export const VrtCardLink = {
    args: {
        isClickable: true,
    },
    parameters: {
        visual: {
            enabled: true,
        },
    },
    render: args => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'flex-start',
                maxWidth: '370px',
            }}
        >
            <Card {...args} id='vrt-link-h3'>
                <CardTitle icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
            <Card {...args} ctaText='Apply' id='vrt-link-h4-cta-text'>
                <CardTitle level={4} icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
            <Card
                {...args}
                ctaText='Add'
                ctaIcon={<IconAdd />}
                id='vrt-link-h5-cta-icon'
            >
                <CardTitle level={5} icon={<BrandIconCreativeKids />}>
                    <a href='#'>Creative Kids vouchers</a>
                </CardTitle>
                <p>
                    $100 voucher for children’s creative and cultural
                    activities.
                </p>
            </Card>
            <Card {...args} imageSrc={placeholderImage} id='vrt-link-img'>
                <p
                    style={{
                        color: vars.colors.text.subtle,
                        marginTop: '0',
                        marginBottom: '8px',
                    }}
                >
                    COVID-19 services
                </p>
                <CardTitle level={4}>
                    <a href='#'>Test and isolate payment</a>
                </CardTitle>
                <p>
                    You may be eligible for the $320 payment if you need to
                    self-isolate while waiting for your COVID-19 test result and
                    you’re unable to work.
                </p>
            </Card>
        </div>
    ),
}

export const VrtCardStatic = {
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
                maxWidth: '370px',
            }}
        >
            <Card id='vrt-static'>
                <CardTitle level={4} icon={<BrandIconCreativeKids />}>
                    Creative Kids vouchers
                </CardTitle>
                <p>
                    Save on the cost of the kids&apos; creative activities by
                    applying for vouchers.
                </p>
                <Button style={{ width: '100%' }} variant='secondary'>
                    Add
                </Button>
            </Card>
            <Card imageSrc={placeholderImage} id='vrt-static-img'>
                <CardTitle>Changes to transaction during COVID-19</CardTitle>
                <p>
                    Some of the{' '}
                    <TextLink href='#'>
                        ways to do business with government have changed.
                    </TextLink>
                </p>
                <p>
                    <TextLink href='#'>Driver testing</TextLink> in NSW has been
                    cancelled until further notice.
                </p>
            </Card>
        </div>
    ),
}
