import { useRef, useState, useMemo } from 'react'

export interface StepError {
  id: string
  text: string
}

/**
 * Shared step-management hook for TaPaaS transaction skeletons.
 *
 * Handles: step state, attempted state, error computation, focus management
 * (heading on transition, role="status" on confirmation, error summary on
 * validation failure), exit modal state, and scroll-to-top on navigation.
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
  const [exitModalOpen, setExitModalOpen] = useState(false)
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const errors = useMemo(() => {
    if (!attempted) return []
    return getErrors(step)
  }, [attempted, step, getErrors])

  function stepToHeadingId(value: T) {
    return `${String(value).replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}-heading`
  }

  function focusHeading(targetStep: T) {
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      const heading = document.getElementById(stepToHeadingId(targetStep)) ||
        document.querySelector('[id$="-heading"]') as HTMLElement | null
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
    const previousStep = stepOrder[Math.max(i - 1, 0)]
    setStep(previousStep)
    focusHeading(previousStep)
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
    if (nextStep === confirmationStep) { focusConfirmation() } else { focusHeading(nextStep) }
  }

  function openExitModal() {
    setExitModalOpen(true)
  }

  function closeExitModal() {
    setExitModalOpen(false)
  }

  function reset() {
    setAttempted(false)
    setExitModalOpen(false)
    setStep(stepOrder[0])
  }

  return {
    step,
    setStep,
    attempted,
    setAttempted,
    errors,
    errorSummaryRef,
    exitModalOpen,
    openExitModal,
    closeExitModal,
    goBack,
    goNext,
    reset,
  }
}
