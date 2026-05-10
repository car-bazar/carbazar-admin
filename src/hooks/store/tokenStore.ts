const ACCESS_TOKEN_KEY = 'access_token' as const

export const tokenStore = {
	getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
	setAccessToken: (t: string | null) => {
		if (!t) localStorage.removeItem(ACCESS_TOKEN_KEY)
		else localStorage.setItem(ACCESS_TOKEN_KEY, t)
	},
	isExpired: () => {
		const token = localStorage.getItem(ACCESS_TOKEN_KEY)
		if (!token) return true
		try {
			const payload = JSON.parse(atob(token.split('.')[1]))
			return payload.exp * 1000 < Date.now()
		} catch {
			return true
		}
	},
	clear: () => {
		localStorage.removeItem(ACCESS_TOKEN_KEY)
	},
}
