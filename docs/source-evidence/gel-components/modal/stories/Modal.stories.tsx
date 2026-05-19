import { Modal } from '../src'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, screen } from '@storybook/test'
import {
    Button,
    Icon,
    uiIconChevronLeft,
    uiIconRemoveCircle,
    useControllableValue,
} from '@snsw-gel/react'
import { textSpacingDecorator } from '@snsw-gel/storybook'

function ToggleVisible(props) {
    const [showModal, setState] = useControllableValue(
        props.visible,
        props.onVisibleChange,
        props.defaultVisible,
        false,
    )

    const open = () => setState(true)
    const close = () => setState(false)

    let children = null

    if (open) {
        if (typeof props.children === 'function') {
            children = props.children(close)
        } else {
            children = props.children
        }
    }

    return (
        <>
            <Button onClick={open}>Open modal</Button>
            {showModal && children}
        </>
    )
}

const withModalToggle = (Story, context) => {
    const { onClose, defaultVisible = false, ...restArgs } = context.args

    return (
        <ToggleVisible defaultVisible={defaultVisible}>
            {close => (
                <Story
                    {...context}
                    args={{
                        ...restArgs,
                        close,
                        onClose,
                    }}
                />
            )}
        </ToggleVisible>
    )
}

const meta: Meta<typeof Modal> = {
    component: Modal,
    title: 'Components/Modals',
    id: 'modals',
    render: props => <Modal {...props} />,
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = ({ close }) => (
    <Modal
        id='default-modal'
        title='Remove insurance?'
        description='Are you sure you want to remove the insurance details of ABC
Painting from Singing Kids?'
        buttons={[
            {
                children: 'Yes, remove',
                onClick: () => {
                    console.log('Primary button clicked')
                    close()
                },
            },
            {
                children: 'No, cancel',
                onClick: () => {
                    console.log('Secondary button clicked')
                    close()
                },
            },
        ]}
    >
        <p style={{ marginTop: '16px' }}>
            Singing Kids will be suspended until you add new insurance details.
        </p>
    </Modal>
)
Default.decorators = [withModalToggle]

export const NonDismissible: Story = {
    name: 'Non-dismissible',
    render({ close }) {
        return (
            <Modal
                id='nondismissible-modal'
                title='Are you sure you want to delete these bank details?'
                buttons={[
                    {
                        children: 'Yes, delete',
                        onClick: () => {
                            console.log('Primary button clicked')
                            close()
                        },
                    },
                    {
                        children: 'No, do not delete',
                        onClick: () => {
                            console.log('Secondary button clicked')
                            close()
                        },
                    },
                ]}
            >
                <p>
                    Account name:{' '}
                    <strong>All Day Plumbing & Maintenance</strong>
                </p>
                <p>
                    BSB: <strong>012-345</strong>
                </p>
                <p>
                    Account: <strong>1122 3344</strong>
                </p>
                <p style={{ marginTop: '16px' }}>
                    Deleting these bank details from your account will not
                    affect pending payments where these details have been used.
                    To find out where you have used them, check your
                    applications in 'My Services.'
                </p>
            </Modal>
        )
    },
}
NonDismissible.decorators = [withModalToggle]

export const MobileNonDismissible: Story = {
    name: 'mobile-mon-dismissible',
    render({ close }) {
        return (
            <Modal
                id='mobile-nondismissible-modal'
                title='Are you sure you want to delete these bank details?'
                buttons={[
                    {
                        children: 'Yes, delete',
                        onClick: () => {
                            console.log('Primary button clicked')
                            close()
                        },
                    },
                    {
                        children: 'No, do not delete',
                        onClick: () => {
                            console.log('Secondary button clicked')
                            close()
                        },
                    },
                ]}
            >
                <p>
                    Account name:{' '}
                    <strong>All Day Plumbing & Maintenance</strong>
                </p>
                <p>
                    BSB: <strong>012-345</strong>
                </p>
                <p>
                    Account: <strong>1122 3344</strong>
                </p>
                <p style={{ marginTop: '16px' }}>
                    Deleting these bank details from your account will not
                    affect pending payments where these details have been used.
                    To find out where you have used them, check your
                    applications in 'My Services.'
                </p>
            </Modal>
        )
    },
}
MobileNonDismissible.decorators = [withModalToggle]
MobileNonDismissible.parameters = {
    viewport: { defaultViewport: 'mobile1' },
}

export const Dismissible: Story = ({ close }) => (
    <Modal
        id='dismissible-modal'
        title='Licence removed'
        onClose={close}
        buttons={[
            {
                children: 'Back to licence',
                onClick: () => {
                    console.log('Primary button clicked')
                    close()
                },
            },
            {
                children: 'Close',
                onClick: () => {
                    console.log('Secondary button clicked')
                    close()
                },
            },
        ]}
    >
        <p>
            The Contractor Licence{' '}
            <strong>
                #339748C - All Day Plumbing & Maintenance Pty Limited
            </strong>
            {''} has been removed from <strong>ABC Construction PTY</strong>.
        </p>
    </Modal>
)
Dismissible.decorators = [withModalToggle]

export const MobileDismissible: Story = ({ close }) => (
    <Modal
        id='mobile-dismissible-modal'
        title='Licence removed'
        onClose={close}
        buttons={[
            {
                children: 'Back to licence',
                onClick: () => {
                    console.log('Primary button clicked')
                    close()
                },
            },
            {
                children: 'Close',
                onClick: () => {
                    console.log('Secondary button clicked')
                    close()
                },
            },
        ]}
    >
        <p>
            The Contractor Licence{' '}
            <strong>
                #339748C - All Day Plumbing & Maintenance Pty Limited
            </strong>
            {''} has been removed from <strong>ABC Construction PTY</strong>.
        </p>
    </Modal>
)
MobileDismissible.decorators = [withModalToggle]
MobileDismissible.parameters = {
    viewport: { defaultViewport: 'mobile1' },
}

export const CustomisingButtons: Story = ({ close }) => (
    <Modal
        id='customising-buttons-modal'
        title='Remove insurance?'
        onClose={close}
        description='Are you sure you want to remove the insurance details of ABC Painting from Singing Kids?'
        buttons={[
            {
                text: 'Yes, remove',
                onClick: () => {
                    close()
                },
                variant: 'secondary',
                iconEnd: <Icon icon={uiIconRemoveCircle} />,
                disabled: true,
            },
            {
                text: 'No, cancel',
                onClick: () => {
                    close()
                },
                variant: 'tertiary',
                iconStart: <Icon icon={uiIconChevronLeft} />,
            },
        ]}
    >
        <p style={{ marginTop: '16px' }}>
            Singing Kids will be suspended until you add new insurance details.
        </p>
    </Modal>
)
CustomisingButtons.decorators = [withModalToggle]

export const Children: Story = {
    name: 'Children Content',
    render({ close }) {
        return (
            <Modal
                id='children-modal'
                title='Pensioner Water Rebate'
                buttons={[
                    {
                        children: 'Close',
                        onClick: () => {
                            close()
                        },
                    },
                ]}
            >
                <h3>How to apply</h3>
                <p>You’ll need either:</p>
                <ul>
                    <li>
                        A Pensioner Concession Card from Centrelink or
                        Department of Veteran&apos;s Affairs (DVA)
                        <ul>
                            <li>a war widow</li>
                            <li>a war widower</li>
                            <li>an extreme disablement adjustment (EDA)</li>
                            <li>
                                a totally and temporarily incapacitated (TTI)
                            </li>
                        </ul>
                    </li>
                    <li>
                        A DVA Gold Card for:
                        <ul>
                            <li>a totally and permanent incapacitated (TPI)</li>
                        </ul>
                    </li>
                </ul>
                <p>
                    You also need to be the owner and occupier of one of the
                    following:
                </p>
                <ul>
                    <li>single dwelling</li>
                    <li>dual occupancy</li>
                    <li>strata or company title unit</li>
                    <li>unit in a retirement village with a life-term lease</li>
                </ul>
                <p>
                    If you own a property with someone who isn&apos;t a
                    pensioner, you may still be eligible for a rebate. It
                    depends on your relationship with them.
                </p>
                <p>Rebates are applied to each bill.</p>
                <h3>How to get your Pensioner Concession Card</h3>
                <p>
                    You do not need to do anything to get a PCC. If you get an
                    income support payment from us, such as a Service Pension,
                    Age Pension or Income Support Supplement, we will send you
                    one automatically.
                </p>
                <p>
                    If you lose your PCC, or don’t have one and think you
                    should, you can contact us.
                </p>
            </Modal>
        )
    },
}
Children.decorators = [withModalToggle]

export const Properties: Story = args => (
    <Modal
        {...args}
        id='properties-modal'
        onClose={args.close}
        buttons={[
            {
                children: 'Yes, remove',
                onClick: () => {
                    console.log('Primary button clicked')
                    args.close()
                },
            },
            {
                children: 'No, cancel',
                onClick: () => {
                    console.log('Secondary button clicked')
                    args.close()
                },
            },
        ]}
    />
)

Properties.args = {
    title: 'Modal title',
    description: 'Modal description',
}

Properties.argTypes = {
    buttons: {
        control: {
            type: null,
        },
    },
    children: {
        name: 'children',
        defaultValue: 'Children',
    },
}
Properties.decorators = [withModalToggle]

export const VisualTestTextSpacing: Story = ({ close }) => (
    <Modal
        id='a11y-text-spacing'
        title='Remove insurance?'
        description='Are you sure you want to remove the insurance details of ABC
Painting from Singing Kids?'
        onClose={() => {}}
        buttons={[
            {
                children: 'Back to licence',
                onClick: () => {},
            },
            {
                children: 'Close',
                onClick: () => {},
            },
        ]}
    >
        <p>
            The Contractor Licence{' '}
            <strong>
                #339748C - All Day Plumbing & Maintenance Pty Limited
            </strong>
            {''} has been removed from <strong>ABC Construction PTY</strong>.
        </p>
    </Modal>
)
VisualTestTextSpacing.decorators = [textSpacingDecorator]
VisualTestTextSpacing.parameters = {
    a11y: {
        covers: ['text-spacing'],
    },
    visual: {
        pageRootElement: true,
        enabled: true,
    },
}
VisualTestTextSpacing.args = {
    defaultVisible: false,
}

export const VrtModal = {
    args: {
        title: 'Remove insurance?',
        description:
            'Are you sure you want to remove the insurance details of ABC Painting from Singing Kids?',
        buttons: [
            {
                children: 'Yes, remove',
                onClick: () => {},
            },
            {
                children: 'No, cancel',
                onClick: () => {},
            },
        ],
        onClose: null,
    },
    parameters: {
        visual: {
            pageRootElement: true,
            enabled: true,
            tablet: true,
        },
    },
    render: args => <Modal {...args} id='vrt-default' />,
}

export const VrtModalDismissable = {
    args: {
        title: 'Remove insurance?',
        description:
            'Are you sure you want to remove the insurance details of ABC Painting from Singing Kids?',
        buttons: [
            {
                children: 'Yes, remove',
                onClick: () => {},
            },
            {
                children: 'No, cancel',
                onClick: () => {},
            },
        ],
        onClose: () => {},
    },
    parameters: {
        visual: {
            pageRootElement: true,
            enabled: true,
            tablet: true,
        },
    },
    render: args => <Modal {...args} id='vrt-dismissible' />,
}

export const VrtModalButtonProps = {
    args: {
        title: 'Remove insurance?',
        description:
            'Are you sure you want to remove the insurance details of ABC Painting from Singing Kids?',
        buttons: [
            {
                children: 'Yes, remove',
                onClick: () => {},
                variant: 'secondary',
                iconEnd: <Icon icon={uiIconRemoveCircle} />,
                disabled: true,
            },
            {
                children: 'No, cancel',
                onClick: () => {},
                variant: 'tertiary',
                iconStart: <Icon icon={uiIconChevronLeft} />,
            },
        ],
        onClose: null,
    },
    parameters: {
        visual: {
            pageRootElement: true,
            enabled: true,
            tablet: true,
        },
    },
    render: args => <Modal {...args} id='vrt-button-props' />,
}

export const VrtModalRegion = {
    args: {
        title: 'Remove insurance?',
        description:
            'Are you sure you want to remove the insurance details of ABC Painting from Singing Kids?',
        buttons: [
            {
                text: 'Accept',
                onClick: () => {},
            },
        ],
        onClose: () => {},
    },
    parameters: {
        a11y: {
            covers: ['scrollable-region-focusable'],
        },
        visual: {
            pageRootElement: true,
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <Modal {...args} id='vrt-region'>
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
                quis pretium ac, tempus vel massa. lectus, tempus et lectus a,
                ultricies pretium nisi. Nunc varius et massa sed venenatis.
                Mauris blandit, tortor a imperdiet hendrerit, libero nunc ornare
                orci, in fermentum odio sapien nec odio. Vestibulum commodo,
                neque at iaculis faucibus, nisl metus interdum augue, et
                placerat eros arcu eget ligula. Morbi scelerisque scelerisque
                bibendum. Curabitur ut augue dui. Vestibulum dictum et ante id
                lobortis. Mauris congue est ut fringilla ornare. Fusce placerat
                risus tellus, non facilisis metus fringilla ullamcorper. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                dapibus ultricies tortor, eget porta ex sollicitudin nec. Nam
                feugiat volutpat rhoncus. Mauris sodales imperdiet arcu non
                vehicula. Morbi egestas, libero in tempus ullamcorper, enim
                justo ullamcorper lectus, hendrerit bibendum nunc nisi at augue.
                Praesent non euismod risus. Nullam faucibus fringilla elit, id
                semper purus ultricies elementum. Pellentesque a aliquet nisi.
                In et arcu in sem vulputate hendrerit nec a turpis. Sed ligula
                nibh, dignissim quis pretium ac, tempus vel massa.
            </p>
        </Modal>
    ),
    play: async ({ userEvent }) => {
        // https://storybook.js.org/docs/writing-stories/play-function#working-with-the-canvas

        const dialog = screen.getByRole('dialog')

        await screen.findByRole('region')

        const scrollableContent = screen.getByRole('region', {
            name: 'Scrollable content',
        })
        const title = screen.getByRole('heading', { level: 1 })
        const primaryButton = screen.queryByRole('button', {
            name: 'Accept',
        })

        const closeButton = screen.queryByRole('button', {
            name: 'Close Modal',
        })

        await expect(dialog).toBeInTheDocument()

        await expect(scrollableContent).toBeInTheDocument()
        await expect(scrollableContent).toHaveAttribute(
            'aria-label',
            'Scrollable content',
        )

        // only when modal is open should the title have focus,
        // when tabbing backwards the title does not receive focus again
        await expect(title).toHaveFocus()

        // focuses on Primary button
        await primaryButton.focus()
        await expect(primaryButton).toHaveFocus()

        // focuses on Close button
        await closeButton.focus()
        await expect(closeButton).toHaveFocus()

        // focuses on scrollable content region
        await scrollableContent.focus()
        await expect(scrollableContent).toHaveFocus()
    },
}
