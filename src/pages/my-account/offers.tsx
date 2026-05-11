import { IOfferInfo } from '@/hooks/useOffers'

interface IOffersProps {
	offers: IOfferInfo[]
}

const Offers: React.FC<IOffersProps> = ({ offers }) => {
	return (
		<div className='main-sizing min-h-[40vh]'>
			<div className='mt-10 flex flex-col max-md:items-center'>
				<h1 className='lg:text-4xl sm:text-2xl text-xl font-semibold xl:leading-[60px] sm:leading-[50px]'>
					Offers
				</h1>
			</div>
			<div className='mt-6 flex lg:flex-col md:flex-row flex-col lg:flex-nowrap flex-nowrap md:flex-wrap gap-y-6 md:justify-between gap-4'>
				{/* {cars?.map(car => (
					<Card
						key={car.id}
						view='horizontal'
						car={car}
						// onRefresh={onRefresh}
					/>
				))} */}
			</div>
		</div>
	)
}

export default Offers
