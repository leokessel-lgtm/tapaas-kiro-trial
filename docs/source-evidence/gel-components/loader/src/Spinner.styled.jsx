import React from 'react'
import styled from 'styled-components'
import { vars } from '@snsw-gel/theming'

const SpinnerComponent = props => {
    const { className, width = 14, height = 14, ...rest } = props

    return (
        <svg
            {...rest}
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='xMidYMid'
            className={className}
            viewBox='0 0 100 100'
            width={width}
            height={height}
            focusable='false'
            aria-hidden='true'
        >
            <path fill='none' d='M0 0h100v100H0z' />
            <g transform='translate(84 50)'>
                <circle r='8'>
                    <animate
                        attributeName='opacity'
                        from='1'
                        to='.5'
                        begin='0s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                    <animateTransform
                        attributeName='transform'
                        type='scale'
                        from='1.5'
                        to='1'
                        begin='0s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
            <g transform='rotate(45 -52.355 126.397)'>
                <circle r='8'>
                    <animate
                        attributeName='opacity'
                        from='1'
                        to='.5'
                        begin='0.12s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                    <animateTransform
                        attributeName='transform'
                        type='scale'
                        from='1.5'
                        to='1'
                        begin='0.12s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
            <g transform='rotate(90 -17 67)'>
                <circle r='8'>
                    <animate
                        attributeName='opacity'
                        from='1'
                        to='.5'
                        begin='0.25s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                    <animateTransform
                        attributeName='transform'
                        type='scale'
                        from='1.5'
                        to='1'
                        begin='0.25s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
            <g transform='rotate(135 -2.355 42.397)'>
                <circle r='8'>
                    <animate
                        attributeName='opacity'
                        from='1'
                        to='.5'
                        begin='0.37s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                    <animateTransform
                        attributeName='transform'
                        type='scale'
                        from='1.5'
                        to='1'
                        begin='0.37s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
            <g transform='rotate(180 8 25)'>
                <circle r='8'>
                    <animate
                        attributeName='opacity'
                        from='1'
                        to='.5'
                        begin='0.5s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                    <animateTransform
                        attributeName='transform'
                        type='scale'
                        from='1.5'
                        to='1'
                        begin='0.5s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
            <g transform='rotate(-135 18.355 7.603)'>
                <circle r='8'>
                    <animate
                        attributeName='opacity'
                        from='1'
                        to='.5'
                        begin='0.62s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                    <animateTransform
                        attributeName='transform'
                        type='scale'
                        from='1.5'
                        to='1'
                        begin='0.62s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
            <g transform='rotate(-90 33 -17)'>
                <circle r='8'>
                    <animate
                        attributeName='opacity'
                        from='1'
                        to='.5'
                        begin='0.75s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                    <animateTransform
                        attributeName='transform'
                        type='scale'
                        from='1.5'
                        to='1'
                        begin='0.75s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
            <g transform='rotate(-45 68.355 -76.397)'>
                <circle r='8'>
                    <animate
                        attributeName='opacity'
                        from='1'
                        to='.5'
                        begin='0.87s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                    <animateTransform
                        attributeName='transform'
                        type='scale'
                        from='1.5'
                        to='1'
                        begin='0.87s'
                        dur='1s'
                        repeatCount='indefinite'
                    />
                </circle>
            </g>
        </svg>
    )
}

// eslint-disable-next-line react/prop-types
export const Spinner = styled(SpinnerComponent)`
    circle {
        fill: ${vars.colors.neutral.grey200};
    }
`
