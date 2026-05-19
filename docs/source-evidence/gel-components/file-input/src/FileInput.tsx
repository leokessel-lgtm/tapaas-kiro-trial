import React, { ChangeEvent } from 'react'
import { FileInputButton } from './FileInput.styled'
import { SROnly } from '@snsw-gel/accessibility'

export interface FileInputProps {
    id: string
    /**
     * Comma-separated list of one or more file types.
     *
     * Read more about [accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)
     */
    accept?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    multiple?: boolean
    className?: string
    label?: string
    name: string
    /** Select which camera to use for capture of image or video data
     *
     * Read more about [capture attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)
     *
     */
    capture?: 'user' | 'environment'
}

export const FileInput = (props: FileInputProps) => {
    const {
        id,
        accept = '',
        onChange,
        multiple = false,
        className,
        label = 'Select files',
        name,
        capture,
        ...rest
    } = props
    return (
        <FileInputButton
            htmlFor={id}
            className={className}
            data-gelweb-component='file-input'
        >
            <SROnly>
                <input
                    id={id}
                    type='file'
                    accept={accept}
                    onChange={onChange}
                    formEncType='multipart/form-data'
                    multiple={multiple}
                    name={name}
                    capture={capture}
                    {...rest}
                />
            </SROnly>
            {label}
        </FileInputButton>
    )
}
