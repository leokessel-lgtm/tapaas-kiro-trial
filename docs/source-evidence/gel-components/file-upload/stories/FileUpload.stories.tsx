import React from 'react'
import { FileUpload } from '../src'
import { http, HttpResponse } from 'msw'
import { textSpacingDecorator } from '@snsw-gel/storybook'
import type { Meta } from '@storybook/react-vite'

const envEndpointUrl =
    import.meta.env.STORYBOOK_FILE_UPLOAD_API_URL + '/api/file/upload'

const meta: Meta<typeof FileUpload> = {
    title: 'Patterns/File upload',
    component: FileUpload,
    parameters: {
        msw: {
            handlers: [
                http.post(
                    `*/api/file/upload/:filename`,
                    async req => {
                        const { filename } = req.params
                        await new Promise(r => setTimeout(r, 2000))
                        return new HttpResponse(
                            JSON.stringify({ filename: `${filename}-1234` }),
                            {
                                status: 201,
                            },
                        )
                    },
                ),
                http.delete(
                    `*/api/file/upload/:id`,
                    async () => {
                        await new Promise(r => setTimeout(r, 2000))
                        return new HttpResponse('', {
                            status: 200,
                        })
                    },
                ),
            ],
        },
        docs: {
            source: {
                transform: code => {
                    return code
                        .replace(
                            /\b(endpoint)\s*[:=]\s*(['"])(.*?)\2/g,
                            'endpoint={endpointUrl}',
                        )
                },
            },
        }
    },
    id: 'fileupload',
}

export default meta

export const MetaComponentExample = (_args: any, context: any) => {
    const { config } = context.loaded

    return (
        <FileUpload
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            name='file-upload0'
            id='fileUploadEx0'
            onUploaded={value =>
                console.log('onUploaded has been fired with value', value)
            }
            onRemoved={value =>
                console.log('onRemoved has been fired with value', value)
            }
        />
    )
}

export const Default = (_args: any, context: any) => {
    const { config } = context.loaded

    return (
        <FileUpload
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            name='file-upload1'
            id='fileUploadEx1'
            onUploaded={value =>
                console.log('onUploaded has been fired with value', value)
            }
            onRemoved={value =>
                console.log('onRemoved has been fired with value', value)
            }
        />
    )
}

export const CustomLegend = (_args: any, context: any) => {
    const { config } = context.loaded

    return (
        <FileUpload
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            name='file-upload2'
            id='fileUploadEx2'
            legendText='Upload drivers licence'
            onUploaded={value =>
                console.log('onUploaded has been fired with value', value)
            }
            onRemoved={value =>
                console.log('onRemoved has been fired with value', value)
            }
        />
    )
}

export const MultipleFiles = (_args: any, context: any) => {
    const { config } = context.loaded

    return (
        <FileUpload
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            name='file-upload3'
            id='fileUploadEx3'
            maxFiles={2}
            onUploaded={value =>
                console.log('onUploaded has been fired with value', value)
            }
            onRemoved={value =>
                console.log('onRemoved has been fired with value', value)
            }
        />
    )
}

export const MaxFileSize = (_args: any, context: any) => {
    const { config } = context.loaded

    return (
        <FileUpload
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            name='file-upload4'
            id='fileUploadEx4'
            maxMBSize={4}
            onUploaded={value =>
                console.log('onUploaded has been fired with value', value)
            }
            onRemoved={value =>
                console.log('onRemoved has been fired with value', value)
            }
        />
    )
}

export const AcceptedFileTypes = (_args: any, context: any) => {
    const { config } = context.loaded

    return (
        <FileUpload
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            name='file-upload5'
            id='fileUploadEx5'
            acceptedFormats='.png,.jpg'
            onUploaded={value =>
                console.log('onUploaded has been fired with value', value)
            }
            onRemoved={value =>
                console.log('onRemoved has been fired with value', value)
            }
        />
    )
}

export const InitialFiles = (_args: any, context: any) => {
    const { config } = context.loaded
    const initialFiles = [
        {
            id: 'Licence.png-0d63af82-9697-4ad7-b9e2-80a6a5494ee3',
            name: 'Licence.png',
            size: 307538,
            type: 'image/png',
        },
        {
            id: 'Licence.png-0d63af82-9697-4ad7-b9e2-80a6a5494ee4',
            name: 'Licence.png',
            size: 307538,
            type: 'image/png',
        },
    ]
    return (
        <FileUpload
            initialFiles={initialFiles}
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            name='file-upload6'
            id='fileUploadEx6'
            acceptedFormats='.png,.jpg'
            maxFiles={3}
            onUploaded={value =>
                console.log('onUploaded has been fired with value', value)
            }
            onRemoved={value =>
                console.log('onRemoved has been fired with value', value)
            }
        />
    )
}

export const ErrorMessage = (_args: any, context: any) => {
    const { config } = context.loaded

    return (
        <FileUpload
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            name='file-upload10'
            id='fileUploadEx10'
            maxMBSize={4}
            maxFiles={2}
            errorMessage='Select a PNG or JPG file that does not exceed 4 MB.'
            acceptedFormats='.png,.jpg'
        />
    )
}

export const InterceptError = (_args: any, context: any) => {
    const { config } = context.loaded

    return (
        <FileUpload
            name='file-upload11'
            id='fileUploadEx11'
            maxMBSize={4}
            maxFiles={2}
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            onInterceptError={(errorKey, errorMessage) => {
                console.log('Intercepted error', errorKey, errorMessage)
                // return false to prevent the default error message
                // return nothing to use the default error message
                return 'Custom error message'
            }}
        />
    )
}

export const CustomApi = (_args: any, context: any) => {
    const { config } = context.loaded
    const api = {
        uploadFile: async file => {
            const content = new FormData()
            content.append('file', file)
            const options = { method: 'post', body: content }
            const response = await fetch(
                `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload/${file.name}`,
                options,
            )

            return response.text()
        },
        removeFile: async fileId => {
            const options = { method: 'delete' }
            const response = await fetch(
                `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload/${fileId}`,
                options,
            )

            return response.text()
        },
    }

    return (
        <FileUpload
            endpoint={config.STORYBOOK_FILE_UPLOAD_API_URL ? `${config.STORYBOOK_FILE_UPLOAD_API_URL}/api/file/upload` : envEndpointUrl}
            category='test'
            name='file-upload7'
            id='fileUploadEx7'
            api={api}
            maxFiles={2}
            onUploaded={value =>
                console.log('onUploaded has been fired with value', value)
            }
            onRemoved={value =>
                console.log('onRemoved has been fired with value', value)
            }
        />
    )
}

export const Properties = args => <FileUpload {...args} />

Properties.args = {
    id: 'test123',
    name: 'fileupload',
    endpoint: 'endpointUrl',
    maxFiles: 2,
    initialFiles: [
        {
            id: 'Licence Scan.png-0d63af82-9697-4ad7-b9e2-80a6a5494ee3',
            name: 'licence-scan-0d63af8296974ad7b9e280a6a5494ee3.png',
            size: 307538,
            type: 'image/png',
        },
    ],
}

Properties.argTypes = {
    endpoint: {
        control: { type: null },
    },
}

export const VisualTestTextSpacing = () => {
    const initialFiles = [
        {
            id: 'Licence.png-0d63af82-9697-4ad7-b9e2-80a6a5494ee3',
            name: 'Licence.png',
            size: 307538,
            type: 'image/png',
        },
        {
            id: 'Licence.png-0d63af82-9697-4ad7-b9e2-80a6a5494ee4',
            name: 'Licence.png',
            size: 307538,
            type: 'image/png',
        },
    ]
    return (
        <FileUpload
            initialFiles={initialFiles}
            endpoint='endpointUrl'
            name='file-upload6'
            id='a11y-text-spacing'
            acceptedFormats='.png,.jpg'
            maxFiles={3}
            onUploaded={() => {}}
            onRemoved={() => {}}
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

export const VrtFileUpload = {
    args: {
        name: 'vrt-file-upload',
    },
    parameters: {
        visual: {
            enabled: true,
            tablet: true,
        },
    },
    render: args => (
        <>
            <FileUpload
                {...args}
                id='vrt-accepted-formats-error'
                acceptedFormats='.png,.jpg'
                errorMessage='Select a PNG or JPG file that does not exceed 4 MB.'
            />
            <FileUpload
                {...args}
                id='vrt-default-initial-file'
                initialFiles={[
                    {
                        id: 'Licence.png-0d63af82-9697-4ad7-b9e2-80a6a5494ee3',
                        name: 'Licence.png',
                        size: 307538,
                        type: 'image/png',
                    },
                    {
                        id: 'Licence.png-0d63af82-9697-4ad7-b9e2-80a6a5494ee4',
                        name: 'Licence.png',
                        size: 307538,
                        type: 'image/png',
                    },
                ]}
            />
        </>
    ),
}
