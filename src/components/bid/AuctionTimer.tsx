import { useCountdown } from '@/hooks/useCountdown'
import TimeBox from '@/utils/TimeBox'
import React from 'react'

export const AuctionTimer = React.memo(
	({ bidStartDate }: { bidStartDate: string }) => {
		const { days, hours, minutes, seconds, isExpired } = useCountdown(
			bidStartDate,
			1_000,
		)

		if (isExpired) {
			return (
				<div className={`flex flex-col gap-1 text-start order-2 w-full`}>
					<p className='font-semibold text-center text-xl text-destructive'>
						Bid Expired
					</p>
				</div>
			)
		}

		return (
			<>
				<TimeBox value={days} label='Days' />
				:
				<TimeBox value={hours} label='Hours' />
				:
				<TimeBox value={minutes} label='Minutes' />
				:
				<TimeBox value={seconds} label='Seconds' />
			</>
		)
	},
)
