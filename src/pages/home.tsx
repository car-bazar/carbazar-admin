import AnimatedIcon from '@/components/AnimatedIcon'
import { useCars } from '@/hooks/useCar'
import { useOffers } from '@/hooks/useOffers'
import Cars from './my-account/cars'
import Dashboard from './my-account/dashboard'

function Home() {
	const { cars, loading, error } = useCars()
	const { offers, loading: offersLoading } = useOffers()
	const totalPending = cars?.length
	const totalOffers = offers?.length

	if (loading || offersLoading) {
		return (
			<div className='absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-background'>
				<div className='h-24 w-24'>
					<AnimatedIcon />
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-[80vh]'>
			<Dashboard
				totalPending={totalPending ?? 0}
				totalOffers={totalOffers ?? 0}
			/>
			<Cars cars={cars ?? []} />
			{/* <Offers offers={offers ?? []} /> */}
		</div>
	)
}

export default Home
