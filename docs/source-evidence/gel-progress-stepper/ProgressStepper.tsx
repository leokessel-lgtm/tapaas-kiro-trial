import React from 'react'
import {
    ProgressStepperList,
    ProgressStepperStep,
    StepLabel,
    StepPosition,
    MobileStepLabel,
} from './ProgressStepper.styled'
import { SROnly } from '@snsw-gel/accessibility'

const CheckIcon = () => (
    <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path d='M13.1747595,1.86431481 C13.7385965,1.18603191 14.7455336,1.09325516 15.4238165,1.65709213 C16.0597067,2.1856893 16.1809919,3.10372993 15.7290813,3.77530806 L15.6310392,3.9061491 L7.12750132,14.1357093 C6.569542,14.8069215 5.58639242,14.899104 4.91570423,14.3731823 L4.7859513,14.259745 L0.483650334,10.0759692 C-0.148689647,9.46104977 -0.162811756,8.4499462 0.45210772,7.81760622 C1.02859473,7.22478749 1.95329041,7.17532431 2.58765756,7.67813514 L2.71047074,7.78606361 L5.77496754,10.7656248 L13.1747595,1.86431481 Z' />
    </svg>
)

export type ProgressStepperStatus = 'completed' | 'current' | 'todo'
export interface ProgressStepperItem {
    content: string
    status: ProgressStepperStatus
}

export interface ProgressStepperProps {
    stepsList: {
        content: string
        status: 'completed' | 'current' | 'todo'
    }[]
    className?: string
}

export const ProgressStepper = (props: ProgressStepperProps) => {
    const { stepsList, className } = props
    const numberOfSteps = stepsList.length

    const findStatus =
        (status: ProgressStepperStatus) => (element: ProgressStepperItem) =>
            element.status === status

    const getStepData = () => {
        const currentStepIndex = stepsList.findIndex(findStatus('current'))
        const isAllComplete = stepsList.every(findStatus('completed'))
        const isAllTodo = stepsList.every(findStatus('todo'))
        const hasCurrentStep = currentStepIndex !== -1
        const stepData = []

        if (hasCurrentStep) {
            stepData.push(
                currentStepIndex + 1,
                stepsList[currentStepIndex].content,
            )
        }
        if (isAllComplete) {
            stepData.push(numberOfSteps, stepsList[numberOfSteps - 1].content)
        }
        if (isAllTodo) {
            stepData.push(1, stepsList[0].content)
        }

        return stepData
    }

    const currentStepNumber = getStepData()[0]

    return (
        <div
            data-testid='progress-stepper'
            className={className}
            data-gelweb-component='progress-stepper'
        >
            <MobileStepLabel>{`Step ${currentStepNumber} of ${numberOfSteps}`}</MobileStepLabel>
            <ProgressStepperList>
                {stepsList.map((step, index) => (
                    <Step
                        key={index}
                        content={step.content}
                        status={step.status}
                        position={index + 1}
                    />
                ))}
            </ProgressStepperList>
        </div>
    )
}

const SRLabel = {
    completed: 'Completed',
    current: 'Current',
    todo: undefined,
} as const

interface ProgressStepProps {
    content: string
    status: ProgressStepperStatus
    position: number
}

export const Step = (props: ProgressStepProps) => {
    const { content, status, position } = props
    const displaySRLabel = SRLabel[status]

    return (
        <ProgressStepperStep
            className={`progress-step--${status}`}
            data-testid='progress-stepper-step'
        >
            <StepPosition aria-hidden='true'>
                {status === 'completed' ?
                    <CheckIcon />
                :   <span className='progress-step--position'>{position}</span>}
            </StepPosition>
            <StepLabel data-testid='progress-stepper-label'>
                {(status === 'completed' || status === 'current') && (
                    <SROnly>
                        {displaySRLabel}
                        {`: `}
                    </SROnly>
                )}
                <SROnly>Step {position + ' '}</SROnly>
                <span>{content}</span>
            </StepLabel>
        </ProgressStepperStep>
    )
}
