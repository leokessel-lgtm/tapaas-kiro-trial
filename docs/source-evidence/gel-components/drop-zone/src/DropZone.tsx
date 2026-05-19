import React, { DragEvent, ReactNode, useRef } from 'react'
import {
    UploadIcon,
    DropZoneWrapper,
    DropZoneMask,
    DropZoneText,
} from './DropZone.styled'
import { useBoolean, useId } from '@snsw-gel/utils'
import { clsFlags } from '@snsw-gel/theming'
import classNames from 'classnames'

export interface DropZoneProps {
    className?: string
    id: string
    hasError?: boolean
    testId?: string
    fileInput: ReactNode
    helpMessage: ReactNode
    onDrop: (e: DragEvent<HTMLDivElement>) => void
    showUploadIcon?: boolean
}

export const DropZone = (props: DropZoneProps) => {
    const {
        className,
        id: elemId,
        hasError,
        testId,
        fileInput,
        helpMessage,
        onDrop,
        showUploadIcon = false,
    } = props

    const id = useId(elemId)

    const [isDraggedIn, setDrag, removeDrag] = useBoolean(false)
    const overlay = useRef(null)

    const renderHelpMessage =
        typeof helpMessage === 'object' ? helpMessage : <p>{helpMessage}</p>

    return (
        <DropZoneWrapper
            className={classNames(
                className,
                'drop-zone',
                hasError && clsFlags.error,
                isDraggedIn && 'drop-zone--dragged-over',
            )}
            onDrop={e => {
                e.preventDefault()
                removeDrag()
                onDrop(e)
            }}
            onDragOver={e => {
                e.preventDefault()
                e.stopPropagation()
            }}
            onDragEnter={e => {
                e.preventDefault()
                e.stopPropagation()
                if (e.target !== overlay.current) {
                    setDrag()
                }
            }}
            onDragLeave={e => {
                e.preventDefault()
                e.stopPropagation()
                if (e.target === overlay.current) {
                    removeDrag()
                }
            }}
            id={id}
            data-testid={testId}
            data-gelweb-component='drop-zone'
        >
            {isDraggedIn && (
                <DropZoneMask ref={overlay}>Drop files here</DropZoneMask>
            )}
            <DropZoneText className='drop-zone__text'>
                {showUploadIcon && <UploadIcon />}
                {renderHelpMessage}
            </DropZoneText>
            {fileInput}
        </DropZoneWrapper>
    )
}
