import { useEffect, useState } from 'react'

type CacheEntry<T> = {
	data: T
	timestamp: number
}

const CACHE = new Map<string, CacheEntry<any>>()
const TTL = 30_000

type UseApiResourceOptions<T> = {
	key: string
	fetcher: () => Promise<T>
	cache?: boolean // default true
}

export function useApiResource<T>({
	key,
	fetcher,
	cache = true,
}: UseApiResourceOptions<T>) {
	const [data, setData] = useState<T | null>(() => {
		if (!cache) return null
		const cached = CACHE.get(key)
		if (!cached) return null
		if (Date.now() - cached.timestamp > TTL) {
			CACHE.delete(key)
			return null
		}
		return cached.data
	})

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		let cancelled = false

		if (cache) {
			const cached = CACHE.get(key)
			if (cached && Date.now() - cached.timestamp <= TTL) {
				setData(cached.data)
				setLoading(false)
				setError(null)
				return
			}
		}

		setLoading(true)
		setError(null)

		fetcher()
			.then(result => {
				if (cancelled) return
				if (cache) {
					CACHE.set(key, { data: result, timestamp: Date.now() })
				}
				setData(result)
				setLoading(false)
			})
			.catch(err => {
				if (cancelled) return
				setError(err instanceof Error ? err : new Error('Unknown error'))
				setLoading(false)
			})

		return () => {
			cancelled = true
		}
	}, [key, cache])

	return { data, loading, error }
}
