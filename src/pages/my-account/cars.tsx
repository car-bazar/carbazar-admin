import Card from '@/components/bid/card'
import { ICarInfo } from '@/hooks/useCar'

interface ICarsProps {
	cars: ICarInfo[]
}

const Cars: React.FC<ICarsProps> = ({ cars }) => {
	return (
		<div className='main-sizing min-h-[40vh]'>
			<div className='mt-10 flex flex-col max-md:items-center'>
				<h1 className='lg:text-4xl sm:text-2xl text-xl font-semibold xl:leading-[60px] sm:leading-[50px]'>
					Cars
				</h1>
			</div>
			<div className='mt-6 flex lg:flex-col md:flex-row flex-col lg:flex-nowrap flex-nowrap md:flex-wrap gap-y-6 md:justify-between gap-4'>
				{cars?.map(car => (
					<Card
						key={car.id}
						view='horizontal'
						car={car}
						// onRefresh={onRefresh}
					/>
				))}
			</div>
		</div>
	)
}

export default Cars
