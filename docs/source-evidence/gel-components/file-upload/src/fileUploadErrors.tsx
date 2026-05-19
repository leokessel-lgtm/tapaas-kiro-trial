import { formatExtensionsString } from './FileUpload'

export const enum FileUploadErrorKeys {
    TOO_MANY_FILES = 'TOO_MANY_FILES',
    FILE_TOO_LARGE = 'FILE_TOO_LARGE',
    UNSUPPORTED_EXTENSION = 'UNSUPPORTED_EXTENSION',
    REQUEST_UNSUCCESSFUL = 'REQUEST_UNSUCCESSFUL',
    REQUEST_ERROR_RESPONSE = 'REQUEST_ERROR_RESPONSE',
}

export const FileUploadErrorMessages = {
    [FileUploadErrorKeys.TOO_MANY_FILES]: (opts: { maxFiles: number }) => {
        if (!opts.maxFiles) {
            throw new Error(
                'maxFiles is required when displaying TOO_MANY_FILES error message',
            )
        }
        return `The number of files selected exceeds ${opts.maxFiles}. Upload ${opts.maxFiles} files or less.`
    },
    [FileUploadErrorKeys.FILE_TOO_LARGE]: (opts: { maxMBSize: number }) => {
        if (!opts.maxMBSize) {
            throw new Error(
                'maxMBSize is required when displaying FILE_TOO_LARGE error message',
            )
        }
        return `File size has been exceeded. Upload a file size of ${opts.maxMBSize} MB or smaller.`
    },
    [FileUploadErrorKeys.UNSUPPORTED_EXTENSION]: (opts: {
        acceptedFormats: string
    }) => {
        if (!opts.acceptedFormats) {
            throw new Error(
                'acceptedFormats is required when displaying UNSUPPORTED_EXTENSION error message',
            )
        }

        const formatString = formatExtensionsString(opts.acceptedFormats)

        return `File format is not supported. Upload a ${formatString} to continue.`
    },
    [FileUploadErrorKeys.REQUEST_UNSUCCESSFUL]: () =>
        'Request is unsuccessful.',
    [FileUploadErrorKeys.REQUEST_ERROR_RESPONSE]: (opts: {
        requestError: string
    }) => {
        return `${opts.requestError}`
    },
} as const
