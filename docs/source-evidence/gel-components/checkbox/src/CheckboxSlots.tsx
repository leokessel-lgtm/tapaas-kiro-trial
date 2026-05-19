import { SlotsContextValue } from '@snsw-gel/slots'

export const clarifySlot = Symbol('clarify')
export const editorSlot = Symbol('editor')

export interface CheckboxSlots extends SlotsContextValue {
    [clarifySlot]?: React.ReactNode
    [editorSlot]?: React.ReactNode
}

export function provideCheckboxSlots(slots: {
    clarify?: React.ReactNode
    editor?: React.ReactNode
}) {
    const result: CheckboxSlots = {}

    if (slots.clarify) {
        result[clarifySlot] = slots.clarify
    }

    if (slots.editor) {
        result[editorSlot] = slots.editor
    }

    return result
}
