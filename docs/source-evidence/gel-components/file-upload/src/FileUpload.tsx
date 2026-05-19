import React, { useState, useEffect } from 'react'
import { DropZone } from '@snsw-gel/drop-zone'
import { FileInput } from '@snsw-gel/file-input'
import { UploadedItem } from '@snsw-gel/uploaded-item'
import { ComponentLoader } from '@snsw-gel/loader'
import { byteToMegabyte, useBoolean, detectDragDrop } from '@snsw-gel/utils'
import { SROnly } from '@snsw-gel/accessibility'
import { Fieldset } from '@snsw-gel/fieldset'
import { FileUploadWrapper, UploadedFilesWrapper } from './FileUpload.styled'
import {
    FileUploadErrorMessages,
    FileUploadErrorKeys,
} from './fileUploadErrors'

export interface FileUploadProps {
    id: string
    name: string
    initialFiles?: Array<{
        id: string
        name: string
        size: number
        type: string
    }>
    legendText?: string
    maxMBSize?: number
    maxFiles?: number
    endpoint?: string
    acceptedFormats?: string
    onUploaded?: (
        files: Array<{ id: string; name: string; size: number; type: string }>,
    ) => void
    onRemoved?: (
        files: Array<{ id: string; name: string; size: number; type: string }>,
    ) => void
    onInterceptError?: (
        errorKey: FileUploadErrorKeys,
        errorMessage: string,
    ) => void | string | false
    errorMessage?: string
    api?: {
        uploadFile: (file: File) => Promise<string>
        removeFile?: (fileId: string) => Promise<void>
    }
}

export const FileUpload = (props: FileUploadProps) => {
    const {
        id,
        name,
        initialFiles = [],
        legendText = 'Upload file',
        maxMBSize = 4,
        maxFiles = 1,
        acceptedFormats = '',
        endpoint = '',
        onUploaded,
        onRemoved,
        onInterceptError: onFormatError,
        errorMessage,
        api,
        ...rest
    } = props
    const [errorMsg, setErrorMsg] = useState<string | undefined>()
    const [hasError, showError, hideError] = useBoolean(false)
    const [loading, setLoading, removeLoading] = useBoolean(false)
    const [uploadedFiles, setUploadedFiles] = useState(initialFiles || [])
    const [dndEnabled, setDndEnabled] = useState(true)

    useEffect(() => {
        setDndEnabled(detectDragDrop())
    }, [])

    const setErrorMessageInternal = (
        errorKey: keyof typeof FileUploadErrorMessages,
        errorMessage?: string,
    ) => {
        let messageContents = FileUploadErrorMessages[errorKey]({
            maxMBSize,
            maxFiles,
            acceptedFormats,
            requestError: errorMessage || '',
        })

        if (onFormatError) {
            const result = onFormatError(errorKey, messageContents)
            if (result === false) {
                return
            }
            if (typeof result === 'string') {
                messageContents = result
            }
        }

        setErrorMsg(messageContents)
        showError()
    }

    useEffect(() => {
        if (errorMessage) {
            setErrorMsg(errorMessage)
            showError()
        } else {
            setErrorMsg('')
            hideError()
        }
    }, [errorMessage]) // eslint-disable-line`

    const hasMaxFiles = uploadedFiles.length === maxFiles

    const checkForErrors = async (error: any) => {
        if (error.response) {
            if (error.response.status < 200 || error.response.status > 299) {
                if (error.response.status === 403) {
                    const text = await error.response.text()

                    let json
                    try {
                        json = JSON.parse(text)
                    } catch (e) {
                        json = {
                            message: '',
                        }
                    }
                    error.response.data = json || text
                    setErrorMessageInternal(
                        FileUploadErrorKeys.REQUEST_ERROR_RESPONSE,
                        error.response.data.message,
                    )
                } else {
                    setErrorMessageInternal(
                        FileUploadErrorKeys.REQUEST_UNSUCCESSFUL,
                    )
                }
            }
        } else if (error.request) {
            setErrorMessageInternal(FileUploadErrorKeys.REQUEST_UNSUCCESSFUL)
        }
    }

    const uploadFile = async (file: File) => {
        setLoading()

        const content = new FormData()
        content.append('file', file)

        return await fetch(`${endpoint}/${file.name}`, {
            body: content,
            method: 'POST',
        })
            .then(async response => {
                if (response.status >= 200 && response.status < 300) {
                    // set the newly uploaded file so we can return it (as a promise)
                    const data = await response.json()
                    return {
                        id: data,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                    }
                } else {
                    throw {
                        response,
                    }
                }
            })
            .catch(error => {
                checkForErrors(error)
            })
            .finally(() => {
                removeLoading()
            })
    }

    const removeFile = async (fileId: string) => {
        setLoading()
        if (api) {
            if (!api.removeFile) {
                return
            }
            await api.removeFile(fileId)
            const newFiles = uploadedFiles.filter(file => file.id !== fileId)
            setUploadedFiles(newFiles)
            onRemoved && onRemoved(newFiles)
            removeLoading()
        } else {
            fetch(`${endpoint}/${fileId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        const newFiles = uploadedFiles.filter(
                            file => file.id !== fileId,
                        )
                        setUploadedFiles(newFiles)
                        onRemoved && onRemoved(newFiles)
                    } else {
                        throw {
                            response,
                        }
                    }
                })
                .catch(error => {
                    checkForErrors(error)
                })
                .finally(() => {
                    removeLoading()
                })
        }
    }

    const isFileSmallerThanMax = (file: File) =>
        Number(byteToMegabyte(file.size)) <= maxMBSize

    const hasValidExtension = (file: File) => {
        if (acceptedFormats) {
            const fname = file.name
            const extension = fname
                .slice(((fname.lastIndexOf('.') - 1) >>> 0) + 1)
                .toUpperCase()
            const acceptedFilesArray = acceptedFormats.toUpperCase().split(',')

            return acceptedFilesArray.includes(extension)
        }

        return true
    }

    const hasExceededMaxFiles = (files: File[]) =>
        files.length + uploadedFiles.length > maxFiles

    const checkFilesBeforeUpload = (file: File) => {
        const validSize = isFileSmallerThanMax(file)
        const validExtension = hasValidExtension(file)

        if (!validSize) {
            setErrorMessageInternal(FileUploadErrorKeys.FILE_TOO_LARGE)
            return false
        }

        if (!validExtension) {
            setErrorMessageInternal(FileUploadErrorKeys.UNSUPPORTED_EXTENSION)
            return false
        }

        return file
    }

    function renderFormatText(formats: string) {
        const formatString = formatExtensionsString(formats)
        return (
            <>
                Formats accepted: {formatString}.
                <br />
            </>
        )
    }

    const renderFilesizeText = (size: number) =>
        `File size must not exceed ${size} MB.`

    const handleFiles = async (files: File[]) => {
        hideError()

        if (!hasExceededMaxFiles(files)) {
            const newFiles = [...uploadedFiles]

            // loop files from the input (cannot use forEach, must loop without a callback)
            for (const file of Array.from(files)) {
                // validate the file
                const validatedFile = checkFilesBeforeUpload(file)
                if (validatedFile) {
                    // if valid, attempt to upload the file
                    // NB: we must await this promise before pushing to array, as we're in a for..of loop
                    if (api) {
                        setLoading()
                        const fileId = await api.uploadFile(validatedFile)
                        if (fileId) {
                            const newFile = {
                                id: fileId,
                                name: file.name,
                                size: file.size,
                                type: file.type,
                            }
                            newFile && newFiles.push(newFile)
                        }
                        removeLoading()
                    } else {
                        const newFile = await uploadFile(validatedFile)
                        // if uploaded, add to array
                        newFile && newFiles.push(newFile)
                    }
                }
            }

            // set the state with newly uploaded file(s)
            setUploadedFiles(newFiles)
            onUploaded && onUploaded(newFiles)
        } else {
            setErrorMessageInternal(FileUploadErrorKeys.TOO_MANY_FILES)
        }
    }

    const allowMultiple = maxFiles > 1
    const legendHelpText = (
        <>
            <SROnly>
                {acceptedFormats && renderFormatText(acceptedFormats)}
                {renderFilesizeText(maxMBSize)}
            </SROnly>
        </>
    )
    const helpMessageText = (
        <>
            <p>
                Drag and drop files into this box or use the button to select
                and upload your files.
                <br />
                {acceptedFormats && renderFormatText(acceptedFormats)}
                {renderFilesizeText(maxMBSize)}
            </p>
        </>
    )

    const fileInput = (
        <FileInput
            id={`${id}-fileinput`}
            onChange={e => {
                handleFiles(e.target.files ? Array.from(e.target.files) : [])
                e.currentTarget.value = ''
            }}
            name={name}
            multiple={allowMultiple}
            accept={acceptedFormats}
            label={allowMultiple ? 'Select files' : 'Select file'}
        />
    )

    const fileUploadContents =
        dndEnabled ?
            <DropZone
                showUploadIcon
                helpMessage={helpMessageText}
                id={`${id}-dropzone`}
                testId={`${id}-dropzone`}
                onDrop={e => {
                    handleFiles(Array.from(e.dataTransfer.files))
                }}
                hasError={hasError}
                fileInput={fileInput}
            />
        :   <>
                {helpMessageText}
                {fileInput}
            </>

    const listItems = uploadedFiles.map(({ id, name, size }) => (
        <UploadedItem
            key={id}
            id={id}
            name={name}
            size={size}
            onRemove={() => removeFile(id)}
        />
    ))

    return (
        <FileUploadWrapper {...rest} data-gelweb-pattern='file-upload'>
            <Fieldset
                hasError={hasError}
                legend={legendText}
                helpMessage={legendHelpText as unknown as string}
                errorMessage={errorMsg}
            >
                <ComponentLoader active={loading} label='Please wait...' />
                {hasMaxFiles ?
                    <p>To upload another file, remove a file from the list.</p>
                :   fileUploadContents}
            </Fieldset>
            {uploadedFiles && (
                <UploadedFilesWrapper>{listItems}</UploadedFilesWrapper>
            )}
        </FileUploadWrapper>
    )
}

export const formatExtensionsString = (extensionsString: string) => {
    const extensions = extensionsString
        .split(',')
        .map(extension => extension.trim().replace(/^\./, '').toUpperCase())
    if (extensions.length === 1) {
        return extensions[0]
    } else if (extensions.length === 2) {
        return extensions.join(' or ')
    } else {
        const lastExtension = extensions.pop()
        const formattedString = extensions.join(', ') + ', or ' + lastExtension
        return formattedString
    }
}
