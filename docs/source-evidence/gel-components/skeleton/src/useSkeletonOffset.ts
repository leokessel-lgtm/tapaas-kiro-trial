import { useEffect, useRef } from 'react'

type Write = () => void
type Read = () => Write | void

const nextRead: Array<Read> = []
let timeout: number | null = null

function read(fn: Read) {
    nextRead.push(fn)

    clearTimeout(timeout!)
    timeout = setTimeout(() => {
        timeout = null
        const reads = nextRead.splice(0)
        const writes = reads.map(read => read())
        writes.forEach(write => write && write())
    }, 100)

    return () => {
        const index = nextRead.indexOf(fn)
        if (index > -1) {
            nextRead.splice(index, 1)
        }
    }
}

function write(fn: Write) {
    return fn
}

export function useSkeletonOffset() {
    const ref = useRef<HTMLElement | undefined>(undefined)

    useEffect(() => {
        read(() => {
            const rect = ref.current?.getBoundingClientRect()

            if (!rect) {
                return
            }

            const left = rect.left
            const top = rect.top + window.scrollY

            return write(() => {
                ref.current?.style.setProperty('--skeleton-offset-x', `${left}`)
                ref.current?.style.setProperty('--skeleton-offset-y', `${top}`)

                ref.current?.classList.add('skeleton-ready')
            })
        })
    }, [])

    return ref
}
