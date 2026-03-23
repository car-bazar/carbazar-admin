type CacheEntry<T> = {
	payload: T
	expiresAt: number
}

const PREFIX = 'filters:'
const DEFAULT_TTL = 5 * 60 * 1000

export function saveToCache<T>(payload: T, ttl: number = DEFAULT_TTL): string {
	const stateId = crypto.randomUUID()
	const entry: CacheEntry<T> = {
		payload,
		expiresAt: Date.now() + ttl,
	}

	sessionStorage.setItem(PREFIX + stateId, JSON.stringify(entry))
	return stateId
}

export function loadFromCache<T>(stateId: string): T | null {
	const raw = sessionStorage.getItem(PREFIX + stateId)
	if (!raw) return null

	try {
		const entry: CacheEntry<T> = JSON.parse(raw)

		if (Date.now() > entry.expiresAt) {
			sessionStorage.removeItem(PREFIX + stateId)
			return null
		}

		return entry.payload
	} catch {
		sessionStorage.removeItem(PREFIX + stateId)
		return null
	}
}
