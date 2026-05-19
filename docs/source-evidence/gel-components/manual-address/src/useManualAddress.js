import { useMemo } from 'react'
import { getAustralianStates } from '@snsw-gel/utils'

export const useManualAddress = statesOverride => {
    const australianStates = useMemo(() => {
        var statesToMap =
            statesOverride && statesOverride.length > 0
                ? statesOverride
                : getAustralianStates()
        return statesToMap.map(australianState => ({
            text: australianState,
            value: australianState,
        }))
    }, [statesOverride])

    return {
        australianStates,
    }
}
