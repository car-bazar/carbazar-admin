import AnimatedIcon from '@/components/AnimatedIcon'
import { useCars } from '@/hooks/useCar'
import Cars from './my-account/cars'
import Dashboard from './my-account/dashboard'

function Home() {
	const { cars, loading, error } = useCars()
	const totalPending = cars?.length

	if (loading) {
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
			<Dashboard totalPending={totalPending ?? 0} />
			<Cars cars={cars ?? []} />
			// TODO: add purchased cars pre end step
		</div>
	)
}

export default Home
