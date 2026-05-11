import { tokenStore } from '@/hooks/store/tokenStore'
import { ILoginDto } from '@/hooks/useAuth'
import { ICarApprove, ICarInfo } from '@/hooks/useCar'
import { IOfferApprove, IOfferInfo } from '@/hooks/useOffers'
import axios, {
	AxiosError,
	AxiosInstance,
	InternalAxiosRequestConfig,
} from 'axios'

const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL ?? '/api'}`,
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

const authHttp: AxiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL ?? '/api'}`,
	timeout: 10000,
})

authHttp.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = tokenStore.getAccessToken()
	if (token) {
		config.headers = config.headers ?? {}
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

let isRefreshing = false
let refreshPromise: Promise<string> | null = null
let queued: Array<{
	resolve: (token: string) => void
	reject: (err: unknown) => void
}> = []

function flushQueue(error: unknown, token: string | null) {
	queued.forEach(p => (token ? p.resolve(token) : p.reject(error)))
	queued = []
}

async function refreshAccessToken(): Promise<string> {
	const refreshToken = tokenStore.getAccessToken()
	if (!refreshToken) throw new Error('No refresh token available')
	const res = await authApi.refreshToken(refreshToken)
	const newAccessToken: string = res.data.accessToken
	const newRefreshToken: string | undefined = res.data.refreshToken

	tokenStore.setAccessToken(newAccessToken)
	if (newRefreshToken) tokenStore.setAccessToken(newRefreshToken)
	return newAccessToken
}

authHttp.interceptors.response.use(
	res => res,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean
		}
		const status = error.response?.status

		if (!originalRequest || status !== 401) {
			return Promise.reject(error)
		}

		if (originalRequest._retry) {
			tokenStore.clear()
			return Promise.reject(error)
		}
		originalRequest._retry = true

		if (!tokenStore.getAccessToken()) {
			tokenStore.clear()
			return Promise.reject(error)
		}

		if (isRefreshing) {
			return new Promise((resolve, reject) => {
				queued.push({
					resolve: (token: string) => {
						originalRequest.headers = originalRequest.headers ?? {}
						originalRequest.headers.Authorization = `Bearer ${token}`
						resolve(api(originalRequest))
					},
					reject,
				})
			})
		}

		isRefreshing = true
		refreshPromise = refreshPromise ?? refreshAccessToken()

		try {
			const newToken = await refreshPromise
			flushQueue(null, newToken)
			originalRequest.headers = originalRequest.headers ?? {}
			originalRequest.headers.Authorization = `Bearer ${newToken}`
			return api(originalRequest)
		} catch (refreshErr) {
			flushQueue(refreshErr, null)
			tokenStore.clear()
			return Promise.reject(refreshErr)
		} finally {
			isRefreshing = false
			refreshPromise = null
		}
	},
)

export const authApi = {
	login: (data: ILoginDto) => api.post('/auth/login', data),
	refreshToken: (token: string) =>
		authHttp.get('/auth/refresh-token', {
			headers: { Authorization: `Bearer ${token}` },
		}),
	logout: () => authHttp.get('/auth/logout'),
}

export const userApi = {
	getProfile: () => authHttp.get('/user'),
}

export const carApi = {
	getCars: () => authHttp.get<ICarInfo[]>(`/admin/cars-to-approve`),
	getOffers: () => authHttp.get<IOfferInfo[]>(`/admin/offers-to-approve`),
	approveCar: (data: ICarApprove) =>
		authHttp.post<string>(`/admin/approve-car`, data),
	approveOffer: (data: IOfferApprove) =>
		authHttp.post<string>(`/admin/approve-offer`, data),
}
