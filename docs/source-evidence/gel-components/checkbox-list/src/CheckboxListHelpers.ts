import { CheckboxListProps, CheckboxListValue } from './CheckboxListProps.types'

/**
 * CheckboxList allows three different value types, a plain array, an object or a Set
 * These helper functions allow you to work with all three types in a consistent way
 */

export function isValidValue<Value extends string>(
    value: unknown,
): value is CheckboxListValue<Value> {
    return (
        Array.isArray(value) ||
        value instanceof Set ||
        (typeof value === 'object' && value !== null)
    )
}

export function isValidOptions<Value extends string>(
    options: unknown,
): options is Exclude<CheckboxListProps<Value>['options'], undefined> {
    return Array.isArray(options)
}

// Helper functions for managing the selected state
export function has<Values extends string>(
    list: CheckboxListValue<Values>,
    value: Values,
) {
    if (Array.isArray(list)) {
        return list.indexOf(value) !== -1
    } else if (list instanceof Set) {
        return list.has(value)
    } else {
        return list[value] === true
    }
}

export function add<Value extends string>(
    list: CheckboxListValue<Value>,
    value: Value,
) {
    if (!has(list, value)) {
        if (Array.isArray(list)) {
            return [...list].concat(value)
        } else if (list instanceof Set) {
            return new Set(list).add(value)
        } else {
            return { ...list, [value]: true }
        }
    }
    return list
}

export function remove<Value extends string>(
    list: CheckboxListValue<Value>,
    value: Value,
) {
    if (Array.isArray(list)) {
        const index = list.indexOf(value)

        if (index !== -1) {
            return list.filter((x, i) => i !== index)
        }
    } else if (list instanceof Set) {
        const result = new Set(list)
        result.delete(value)
        return result
    } else {
        const result = { ...list }
        result[value] = false
        return result
    }

    return list
}
