import React, { useLayoutEffect, useRef, useState } from 'react'
import { CheckboxIndicatorWrapper, counterVar } from './Checkbox.styled'
import classNames from 'classnames'
import { strokeVar } from './Checkbox.styled'

function useChangeCounter(value: any, initial: number = 0) {
    const [state, set] = useState(value)
    const [changes, setChanges] = useState(initial)

    if (state !== value) {
        setChanges(i => i + 1)
        set(value)
    }

    return changes
}
export function CheckboxIndicator(props: { checked?: boolean }) {
    const { checked } = props
    const changes = useChangeCounter(checked, checked ? 1 : 0)
    const ref = useRef<SVGPathElement>(null)

    useLayoutEffect(() => {
        if (!ref.current?.getTotalLength) {
            return
        }
        ref.current!.style.setProperty(
            strokeVar.var,
            String(ref.current.getTotalLength()),
        )
    }, [])

    return (
        <CheckboxIndicatorWrapper className={classNames(checked && 'checked')}>
            <svg
                viewBox='0 0 22 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{
                    ...counterVar.setStyle(changes),
                }}
                aria-hidden='true'
                focusable='false'
            >
                <path
                    ref={ref}
                    d='M19.4523,1.92854L8.00119,15.5922L1.90686,9.80847'
                    stroke='currentColor'
                />
            </svg>
        </CheckboxIndicatorWrapper>
    )
}
