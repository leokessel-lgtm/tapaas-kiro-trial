import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useTransactionStep } from './useTransactionStep'

const steps = ['privacy', 'details', 'confirmation'] as const

describe('useTransactionStep', () => {
  it('blocks progression, exposes errors and focuses the error summary when the current step is invalid', () => {
    vi.useFakeTimers()
    const getErrors = vi.fn((step: (typeof steps)[number]) => step === 'privacy' ? [{ id: 'privacy-confirmation', text: 'Confirm privacy' }] : [])

    const { result } = renderHook(() => useTransactionStep([...steps], 'confirmation', getErrors))
    const focus = vi.fn()
    const errorSummaryRef = result.current.errorSummaryRef as React.MutableRefObject<HTMLDivElement | null>
    errorSummaryRef.current = { focus } as unknown as HTMLDivElement

    act(() => result.current.goNext())
    act(() => vi.runAllTimers())

    expect(result.current.step).toBe('privacy')
    expect(result.current.errors).toEqual([{ id: 'privacy-confirmation', text: 'Confirm privacy' }])
    expect(focus).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('moves forward, moves back and resets step state', () => {
    vi.useFakeTimers()
    const getErrors = vi.fn(() => [])

    const { result } = renderHook(() => useTransactionStep([...steps], 'confirmation', getErrors))

    act(() => result.current.goNext())
    expect(result.current.step).toBe('details')

    act(() => result.current.goBack())
    expect(result.current.step).toBe('privacy')

    act(() => result.current.openExitModal())
    expect(result.current.exitModalOpen).toBe(true)

    act(() => result.current.reset())
    expect(result.current.step).toBe('privacy')
    expect(result.current.exitModalOpen).toBe(false)
    expect(result.current.errors).toEqual([])
    vi.useRealTimers()
  })
})
