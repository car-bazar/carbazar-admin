const ACCESS_TOKEN_KEY = 'access_token' as const

export const tokenStore = {
	getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
	setAccessToken: (t: string | null) => {
		if (!t) localStorage.removeItem(ACCESS_TOKEN_KEY)
		else localStorage.setItem(ACCESS_TOKEN_KEY, t)
	},

	clear: () => {
		localStorage.removeItem(ACCESS_TOKEN_KEY)
	},
}
