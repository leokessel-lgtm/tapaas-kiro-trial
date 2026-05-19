import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen } from '@storybook/test'
import {
    Button,
    Heading,
    useControllableValue,
    Icon,
    uiIconInfo,
} from '@snsw-gel/react'
import { useBoolean } from '@snsw-gel/utils'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import { MoreInfoPanel } from '../src'

const meta: Meta<typeof MoreInfoPanel> = {
    component: MoreInfoPanel,
    title: 'Components/More info panel',
    id: 'more-info-panel',
}

export default meta

export const Default = () => {
    const [showMoreInfo, openMoreInfo, closeMoreInfo] = useBoolean(false)

    return (
        <div>
            <>
                <Heading level={2}>Renewal details</Heading>
                <p>
                    To change the renewal term, match your CTP insurance with
                    your preferred term.
                </p>
                <Button
                    onClick={openMoreInfo}
                    variant='link'
                    iconEnd={<Icon icon={uiIconInfo} />}
                >
                    More info on changing renewal terms
                </Button>
            </>
            {showMoreInfo && (
                <MoreInfoPanel
                    title='How to change the renewal term'
                    onClose={closeMoreInfo}
                >
                    <>
                        <p>
                            If you <strong>have not purchased</strong> CTP
                            insurance, get a policy. Ensure the CTP insurance
                            date matches your preferred term.
                        </p>
                        <p>
                            If you <strong>have purchased</strong> CTP
                            insurance, cancel your policy. Get a new policy with
                            the preferred term.
                        </p>
                        <p>
                            <strong>6-month renewal cost is $378.00</strong>
                        </p>
                        <p style={{ margin: 0 }}>
                            To renew for 6 months, you need a 6-month CTP.
                        </p>
                        <p style={{ marginTop: 0 }}>
                            The price includes any fees and rebates.
                        </p>
                        <p>
                            <strong>3-month renewal cost is $208.00</strong>
                        </p>
                        <p style={{ margin: 0 }}>
                            To renew for 3 months, you need a 3-month CTP.
                        </p>
                        <p style={{ marginTop: 0 }}>
                            The price includes any fees and rebates.
                        </p>
                        <p>
                            Be aware that not all insurance companies offer
                            3-month CTP insurance. Check with your provider.
                        </p>
                    </>
                </MoreInfoPanel>
            )}
        </div>
    )
}

export const IconOnly = () => {
    const [showMoreInfo, openMoreInfo, closeMoreInfo] = useBoolean(false)

    return (
        <div>
            <Button onClick={openMoreInfo} variant='link'>
                <Icon
                    icon={uiIconInfo}
                    title='More info on changing renewal terms'
                />
            </Button>
            {showMoreInfo && (
                <MoreInfoPanel
                    title='How to change the renewal term'
                    onClose={closeMoreInfo}
                >
                    <>
                        <p>
                            If you <strong>have not purchased</strong> CTP
                            insurance, get a policy. Ensure the CTP insurance
                            date matches your preferred term.
                        </p>
                        <p>
                            If you <strong>have purchased</strong> CTP
                            insurance, cancel your policy. Get a new policy with
                            the preferred term.
                        </p>
                        <p>
                            <strong>6-month renewal cost is $378.00</strong>
                        </p>
                        <p style={{ margin: 0 }}>
                            To renew for 6 months, you need a 6-month CTP.
                        </p>
                        <p style={{ marginTop: 0 }}>
                            The price includes any fees and rebates.
                        </p>
                        <p>
                            <strong>3-month renewal cost is $208.00</strong>
                        </p>
                        <p style={{ margin: 0 }}>
                            To renew for 3 months, you need a 3-month CTP.
                        </p>
                        <p style={{ marginTop: 0 }}>
                            The price includes any fees and rebates.
                        </p>
                        <p>
                            Be aware that not all insurance companies offer
                            3-month CTP insurance. Check with your provider.
                        </p>
                    </>
                </MoreInfoPanel>
            )}
        </div>
    )
}

export const TextIcon = () => {
    const [showMoreInfo, openMoreInfo, closeMoreInfo] = useBoolean(false)

    return (
        <div>
            <Button
                onClick={openMoreInfo}
                variant='link'
                iconEnd={<Icon icon={uiIconInfo} />}
            >
                More info on changing renewal terms
            </Button>
            {showMoreInfo && (
                <MoreInfoPanel
                    title='How to change the renewal term'
                    onClose={closeMoreInfo}
                >
                    <>
                        <p>
                            If you <strong>have not purchased</strong> CTP
                            insurance, get a policy. Ensure the CTP insurance
                            date matches your preferred term.
                        </p>
                        <p>
                            If you <strong>have purchased</strong> CTP
                            insurance, cancel your policy. Get a new policy with
                            the preferred term.
                        </p>
                        <p>
                            <strong>6-month renewal cost is $378.00</strong>
                        </p>
                        <p style={{ margin: 0 }}>
                            To renew for 6 months, you need a 6-month CTP.
                        </p>
                        <p style={{ marginTop: 0 }}>
                            The price includes any fees and rebates.
                        </p>
                        <p>
                            <strong>3-month renewal cost is $208.00</strong>
                        </p>
                        <p style={{ margin: 0 }}>
                            To renew for 3 months, you need a 3-month CTP.
                        </p>
                        <p style={{ marginTop: 0 }}>
                            The price includes any fees and rebates.
                        </p>
                        <p>
                            Be aware that not all insurance companies offer
                            3-month CTP insurance. Check with your provider.
                        </p>
                    </>
                </MoreInfoPanel>
            )}
        </div>
    )
}

export const TextIconMobile = () => {
    const [showMoreInfo, openMoreInfo, closeMoreInfo] = useBoolean(false)

    return (
        <div>
            <Button
                onClick={openMoreInfo}
                variant='link'
                iconEnd={<Icon icon={uiIconInfo} />}
            >
                More info on changing renewal terms
            </Button>
            {showMoreInfo && (
                <MoreInfoPanel
                    title='How to change the renewal term'
                    onClose={closeMoreInfo}
                >
                    <>
                        <p>
                            If you <strong>have not purchased</strong> CTP
                            insurance, get a policy. Ensure the CTP insurance
                            date matches your preferred term.
                        </p>
                        <p>
                            If you <strong>have purchased</strong> CTP
                            insurance, cancel your policy. Get a new policy with
                            the preferred term.
                        </p>
                        <p>
                            <strong>6-month renewal cost is $378.00</strong>
                        </p>
                        <p style={{ margin: 0 }}>
                            To renew for 6 months, you need a 6-month CTP.
                        </p>
                        <p style={{ marginTop: 0 }}>
                            The price includes any fees and rebates.
                        </p>
                        <p>
                            <strong>3-month renewal cost is $208.00</strong>
                        </p>
                        <p style={{ margin: 0 }}>
                            To renew for 3 months, you need a 3-month CTP.
                        </p>
                        <p style={{ marginTop: 0 }}>
                            The price includes any fees and rebates.
                        </p>
                        <p>
                            Be aware that not all insurance companies offer
                            3-month CTP insurance. Check with your provider.
                        </p>
                    </>
                </MoreInfoPanel>
            )}
        </div>
    )
}

TextIconMobile.parameters = {
    viewport: { defaultViewport: 'mobile1' },
}

export const Properties = args => {
    const [showMoreInfo, openMoreInfo, closeMoreInfo] = useBoolean(false)

    return (
        <div>
            <Button
                onClick={openMoreInfo}
                variant='link'
                iconEnd={<Icon icon={uiIconInfo} />}
            >
                More info on [keyword or topic]
            </Button>
            {showMoreInfo && (
                <MoreInfoPanel {...args} onClose={closeMoreInfo}>
                    {args.children}
                </MoreInfoPanel>
            )}
        </div>
    )
}

Properties.args = {
    id: 'properties-more-info-panel',
    title: 'More info panel title',
    children: <p>More info panel content</p>,
}

Properties.argTypes = {
    children: { name: 'children', control: { disable: true } },
}

export const VisualTestTextSpacing = {
    render: () => (
        <MoreInfoPanel
            id='a11y-text-spacing'
            title='More info panel title'
            onClose={() => {}}
        >
            <p>More info panel content</p>
        </MoreInfoPanel>
    ),
    parameters: {
        a11y: {
            covers: ['text-spacing'],
        },
        visual: {
            enabled: true,
            pageRootElement: true,
        },
    },
    decorators: [textSpacingDecorator],
}

export const VrtMoreInfoPanel = {
    args: {
        id: 'vrt-more-info-panel',
        title: 'More info panel title',
        children: <p>More info panel content</p>,
    },
    parameters: {
        visual: {
            pageRootElement: true,
            enabled: true,
        },
    },
    render: args => (
        <MoreInfoPanel {...args} onClose={args.close}>
            {args.children}
        </MoreInfoPanel>
    ),
}

export const VrtMoreInfoPanelRegion: Story = {
    args: {
        id: 'vrt-more-info-panel-region',
    },
    parameters: {
        a11y: {
            covers: ['scrollable-region-focusable'],
        },
        visual: {
            pageRootElement: true,
            enabled: true,
        },
    },
    render: args => (
        <MoreInfoPanel
            {...args}
            title='More info panel title'
            onClose={args.close}
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur volutpat magna id neque rhoncus, nec sodales ante
                maximus. Mauris eu placerat ligula. Sed consectetur mauris vitae
                augue iaculis dignissim. Curabitur interdum diam vel dictum
                finibus. Morbi dapibus pulvinar nulla in gravida. Aliquam varius
                neque a est fermentum vestibulum sed vitae quam. Integer viverra
                pharetra justo, vitae commodo est eleifend vel. Nunc eget
                sodales ante. Pellentesque porttitor, enim sed pulvinar
                facilisis, ipsum ante viverra ipsum, ut iaculis purus elit sit
                amet est. Sed vitae urna lectus. Donec non orci molestie,
                imperdiet lacus id, auctor urna. Sed vitae sem ex. Duis ut
                elementum est. Praesent congue ornare velit a convallis. Nam
                hendrerit dictum libero in commodo. Vivamus faucibus, nisi
                interdum bibendum congue, lacus dui efficitur lorem, eu
                consectetur orci sem quis tortor. Quisque facilisis sodales
                viverra. Sed imperdiet enim velit, malesuada imperdiet est
                auctor id. Quisque semper elit in augue condimentum aliquam.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur non nisl id lorem volutpat euismod sit amet sed ex.
                Nullam ac tortor in ipsum bibendum ultrices id non mauris. Nulla
                egestas odio vitae ornare cursus. Maecenas ullamcorper libero
                non ligula dictum iaculis. Aliquam erat volutpat. Ut velit quam,
                luctus nec ipsum sed, bibendum tincidunt orci. Nam accumsan
                sagittis aliquam. Morbi venenatis est a magna porttitor, sed
                euismod augue ultricies. Donec ac tincidunt risus. Pellentesque
                luctus velit tellus, at lobortis orci pretium interdum.
                Suspendisse tristique consectetur quam vel faucibus. In congue
                iaculis massa, sit amet scelerisque neque laoreet eget. Sed
                dapibus id metus eu porttitor. Sed varius risus sed leo mollis
                facilisis. Pellentesque sit amet sollicitudin mauris. Proin leo
                lectus, tempus et lectus a, ultricies pretium nisi. Nunc varius
                et massa sed venenatis. Mauris blandit, tortor a imperdiet
                hendrerit, libero nunc ornare orci, in fermentum odio sapien nec
                odio. Vestibulum commodo, neque at iaculis faucibus, nisl metus
                interdum augue, et placerat eros arcu eget ligula. Morbi
                scelerisque scelerisque bibendum. Curabitur ut augue dui.
                Vestibulum dictum et ante id lobortis. Mauris congue est ut
                fringilla ornare. Fusce placerat risus tellus, non facilisis
                metus fringilla ullamcorper. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Curabitur dapibus ultricies tortor,
                eget porta ex sollicitudin nec. Nam feugiat volutpat rhoncus.
                Mauris sodales imperdiet arcu non vehicula. Morbi egestas,
                libero in tempus ullamcorper, enim justo ullamcorper lectus,
                hendrerit bibendum nunc nisi at augue. Praesent non euismod
                risus. Nullam faucibus fringilla elit, id semper purus ultricies
                elementum. Pellentesque a aliquet nisi. In et arcu in sem
                vulputate hendrerit nec a turpis. Sed ligula nibh, dignissim
                quis pretium ac, tempus vel massa.
            </p>
        </MoreInfoPanel>
    ),
    play: async ({ userEvent }) => {
        // https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas

        const dialog = screen.getByRole('dialog')

        await screen.findByRole('region')

        const scrollableContent = screen.getByRole('region', {
            name: 'Scrollable content',
        })
        const title = screen.getByRole('heading', { level: 1 })
        const closeButton = screen.queryByRole('button')

        await expect(dialog).toBeInTheDocument()

        await expect(scrollableContent).toBeInTheDocument()
        await expect(scrollableContent).toHaveAttribute(
            'aria-label',
            'Scrollable content',
        )

        // only when modal is open should the title have focus,
        // when tabbing backwards the title does not receive focus again
        await expect(title).toHaveFocus()

        // focuses on Close button
        await closeButton.focus()
        await expect(closeButton).toHaveFocus()

        // focuses on scrollable content region
        await scrollableContent.focus()
        await expect(scrollableContent).toHaveFocus()
    },
}
