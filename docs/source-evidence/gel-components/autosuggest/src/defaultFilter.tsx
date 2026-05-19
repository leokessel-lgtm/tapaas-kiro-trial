import { useMemo } from 'react'
import { Option, getOptionValue } from '@snsw-gel/lists'

export function defaultFilter(options: Array<Option>, value: string) {
    const inputLower = value.toLowerCase()

    return options.filter(option => {
        let value = getOptionValue(option).toLowerCase()
        return value.includes(inputLower)
    })
}

export function useFilter(
    options: Array<Option>,
    value: string,
    filter: typeof defaultFilter = defaultFilter,
    shouldFilter: boolean = true,
) {
    return useMemo(
        () => (shouldFilter && value ? filter(options, value) : options),
        [options, value, shouldFilter],
    )
}
