import { authApi, userApi } from '@/api/api'
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { tokenStore } from './store/tokenStore'

export interface ILoginDto {
	email: string
	password: string
}

export type User = {
	id: string
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	addressLine1: string | null
	addressLine2: string | null
	postalCode: string
	city: string
	country: string
	vatNumber: string | null
	companyName: string | null
	deliveryAddress1: string | null
	deliveryAddress2: string | null
	deliveryAddress3: string | null
	isVerified: boolean
	businessTypeName: string | null
}

type AuthContextType = {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean

	login: (credentials: ILoginDto) => Promise<User>
	logout: () => Promise<void>

	refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(() => {
		return !!tokenStore.getAccessToken()
	})

	const loadProfile = async () => {
		const res = await userApi.getProfile()
		setUser(res.data)
	}

	const tryBootstrapAuth = async () => {
		const accessToken = tokenStore.getAccessToken()
		if (!accessToken) {
			setUser(null)
			return
		}

		if (tokenStore.isExpired()) {
			try {
				const res = await authApi.refreshToken(accessToken)
				tokenStore.setAccessToken(res.data)
				await loadProfile()
			} catch {
				tokenStore.clear()
				setUser(null)
			}
			return
		}

		try {
			await loadProfile()
		} catch (err: any) {
			if (err?.response?.status === 401) {
				try {
					const refreshRes = await authApi.refreshToken(accessToken)
					tokenStore.setAccessToken(refreshRes.data)
					await loadProfile()
				} catch {
					tokenStore.clear()
					setUser(null)
				}
			} else {
				setUser(null)
			}
		}
	}

	useEffect(() => {
		;(async () => {
			try {
				setIsLoading(true)
				await tryBootstrapAuth()
			} finally {
				setIsLoading(false)
			}
		})()
	}, [])

	const login = async (credentials: ILoginDto) => {
		const response = await authApi.login(credentials)

		tokenStore.setAccessToken(response.data)
		await loadProfile()
		return user!
	}

	const logout = async () => {
		try {
			await authApi.logout()
		} finally {
			tokenStore.clear()
			setUser(null)
		}
	}

	const refetchUser = async () => {
		try {
			setIsLoading(true)
			await loadProfile()
		} catch (error) {
			setUser(null)
		} finally {
			setIsLoading(false)
		}
	}

	const value = useMemo<AuthContextType>(
		() => ({
			user,
			isAuthenticated: !!user,
			isLoading,
			login,
			logout,
			refetchUser,
		}),
		[user, isLoading, refetchUser],
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('useAuth must be used within an AuthProvider')
	return context
}
