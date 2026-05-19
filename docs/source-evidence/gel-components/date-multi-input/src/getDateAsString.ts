import { Dates } from '@snsw-gel/dates'

export function getDateAsString(date: Dates) {
    return [
        // @ts-ignore
        date.year,
        // @ts-ignore
        date.month,
        // @ts-ignore
        date.day,
    ]
        .filter(Boolean)
        .map(num => (Number(num) < 10 ? `0${num}` : num))
        .join('-')
}
