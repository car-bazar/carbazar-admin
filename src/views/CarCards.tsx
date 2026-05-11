import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

interface ItemsContainerProps {
	currentPage?: number
	setCurrentPage?: React.Dispatch<React.SetStateAction<number>>
	useCarousel?: boolean
}

const ItemsContainer: React.FC<ItemsContainerProps> = ({
	// currentPage = 1,
	// setCurrentPage,
	useCarousel = false,
}) => {
	// const totalPages = cars.totalPages
	// const handlePageChange = (page: number) => {
	// 	setCurrentPage?.(page)
	// }

	return (
		<div className='mt-4'>
			<div className='flex flex-col gap-12'>
				{useCarousel ? (
					<Carousel opts={{ align: 'start' }} className='w-full'>
						<CarouselContent>
							{/* {cars.cars.slice(0, 10).map(item => (
								<CarouselItem key={item.id} className='basis-[min(350px,100%)]'>
									<div className='py-10'>
										<Card car={item}></Card>
									</div>
								</CarouselItem>
							))} */}
						</CarouselContent>
						<CarouselPrevious className='lg:-left-12 lg:top-1/2 lg:-translate-y-1/2 left-14 max-lg:-bottom-14' />
						<CarouselNext className='lg:-right-12 lg:top-1/2 lg:-translate-y-1/2 right-14 max-lg:-bottom-14' />
					</Carousel>
				) : (
					<>
						<div className='grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-3 w-full'>
							{/* {cars.cars.map(car => (
								<div key={car.id} className='p-1'>
									<Card car={car} />
								</div>
							))} */}
						</div>
						{/* {totalPages > 1 && (
							<PaginationBox
								totalPages={totalPages}
								currentPage={currentPage}
								handlePageChange={handlePageChange}
							/>
						)} */}
					</>
				)}
			</div>
		</div>
	)
}

export default ItemsContainer
