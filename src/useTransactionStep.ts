import { useRef, useState, useMemo, useCallback } from 'react'

export interface StepError {
  id: string
  text: string
}

/**
 * Shared step-management hook for TaPaaS transaction skeletons.
 *
 * Handles: step state, attempted state, error computation, focus management
 * (heading on transition, role="status" on confirmation, error summary on
 * validation failure), exit notice state, and scroll-to-top on navigation.
 *
 * Does not handle form state — each skeleton manages its own fields.
 */
export function useTransactionStep<T extends string>(
  stepOrder: T[],
  confirmationStep: T,
  getErrors: (step: T) => StepError[],
) {
  const [step, setStep] = useState<T>(stepOrder[0])
  const [attempted, setAttempted] = useState(false)
  const [exitNotice, setExitNotice] = useState(false)
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const exitRef = useRef<HTMLDivElement>(null)

  const errors = useMemo(() => {
    if (!attempted) return []
    return getErrors(step)
  }, [attempted, step, getErrors])

  function focusHeading() {
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      const heading = document.querySelector('[id$="-heading"]') as HTMLElement
      if (heading) { heading.tabIndex = -1; heading.focus() }
    }, 0)
  }

  function focusConfirmation() {
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      const status = document.querySelector('[role="status"]') as HTMLElement
      if (status) { status.tabIndex = -1; status.focus() }
    }, 0)
  }

  function goBack() {
    setAttempted(false)
    const i = stepOrder.indexOf(step)
    setStep(stepOrder[Math.max(i - 1, 0)])
    focusHeading()
  }

  function goNext() {
    setAttempted(true)
    const errs = getErrors(step)
    if (errs.length > 0) {
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0)
      return
    }
    setAttempted(false)
    const i = stepOrder.indexOf(step)
    const nextStep = stepOrder[Math.min(i + 1, stepOrder.length - 1)]
    setStep(nextStep)
    if (nextStep === confirmationStep) { focusConfirmation() } else { focusHeading() }
  }

  function handleExit() {
    setExitNotice(true)
    window.setTimeout(() => exitRef.current?.focus(), 0)
  }

  function reset() {
    setAttempted(false)
    setExitNotice(false)
    setStep(stepOrder[0])
  }

  return {
    step,
    setStep,
    attempted,
    setAttempted,
    errors,
    errorSummaryRef,
    exitRef,
    exitNotice,
    goBack,
    goNext,
    handleExit,
    reset,
  }
}
