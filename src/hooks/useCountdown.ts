import { useEffect, useState } from 'react'

interface Countdown {
	days: number
	hours: number
	minutes: number
	seconds: number
	isExpired: boolean
}

function getTimeLeft(targetDate: string): Countdown {
	const target = new Date(targetDate).getTime() + 14 * 60 * 60 * 1000 * 24
	const now = Date.now()

	const diff = target - now

	if (diff <= 0) {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			isExpired: true,
		}
	}

	const totalMinutes = Math.floor(diff / 1000 / 60)

	const days = Math.floor(totalMinutes / (60 * 24))
	const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
	const minutes = totalMinutes % 60
	const seconds = Math.floor((diff % 60000) / 1000)

	return {
		days,
		hours,
		minutes,
		seconds,
		isExpired: false,
	}
}

export function useCountdown(
	targetDate: string = '',
	intervalMs: number = 60_000,
) {
	const [timeLeft, setTimeLeft] = useState<Countdown>(() =>
		getTimeLeft(targetDate),
	)

	useEffect(() => {
		const update = () => setTimeLeft(getTimeLeft(targetDate))

		update()

		const interval = setInterval(update, intervalMs)

		return () => clearInterval(interval)
	}, [targetDate, intervalMs])

	return timeLeft
}
