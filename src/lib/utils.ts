import { clsx, type ClassValue } from 'clsx'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatPrice = (value: number, withCurrency = true) =>
	new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 0,
		...(withCurrency && {
			style: 'currency',
			currency: 'USD',
		}),
	}).format(value)

export function useDebounce<T>(value: T, delay = 500): T {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => clearTimeout(timer)
	}, [value, delay])

	return debouncedValue
}
