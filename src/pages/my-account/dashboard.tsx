import { DASHBOARD_TO_DO } from '@/constants'

const getFilteredDashboardItems = (
	data: {
		key: string
		label: string
		info: (count: number) => string
	}[],
	counts: Record<string, number>,
) => {
	return data
		.map(item => ({
			...item,
			info: item.info(counts[item.key]),
		}))
		.filter(item => counts[item.key] > 0)
}

interface IDashboardProps {
	totalPending: number
	totalOffers: number
}

const Dashboard: React.FC<IDashboardProps> = ({
	totalPending,
	totalOffers,
}) => {
	const filteredToDoItems = getFilteredDashboardItems(DASHBOARD_TO_DO, {
		pending_cars: totalPending,
		pending_offers: totalOffers,
	})

	const defaulBlock = () => (
		<div className='flex flex-col gap-1 p-4 border-2 border-dashed mt-4 border-secondary-foreground text-sm'>
			<p>There is nothing to do for the moment.</p>
		</div>
	)

	return (
		<div className='main-sizing'>
			<h1 className='mt-20 lg:text-5xl sm:text-3xl text-2xl font-semibold xl:leading-[60px] sm:leading-[50px]'>
				Dashboard
			</h1>
			<div className='mt-10 gap-5 flex md:flex-row flex-col'>
				<div className='shadow-custom-xl rounded-xl p-5 h-full w-full min-h-[180px]'>
					<h3 className='text-lg font-semibold relative'>
						TO DO
						<span className='absolute -bottom-3 left-0 w-[30%] h-[3px] bg-tiffany'></span>
					</h3>
					<div className='h-full mt-6'>
						{filteredToDoItems.length
							? filteredToDoItems.map((item, index) => (
									<div key={item.key}>
										<div
											className={`flex flex-row gap-2 justify-between items-center px-2 py-3 transition hover:shadow-md hover:rounded-lg`}
										>
											<div className='flex flex-col gap-1 text-sm'>
												<h3 className='text-base font-semibold'>
													{item.label}
												</h3>
												<p dangerouslySetInnerHTML={{ __html: item.info }} />
											</div>
										</div>
										{index < filteredToDoItems.length - 1 && (
											<div className='bg-tiffany h-[1px] w-full my-1'></div>
										)}
									</div>
								))
							: defaulBlock()}
					</div>
				</div>
				{/* <div className='shadow-custom-xl rounded-xl p-5 h-full md:w-1/2 w-full min-h-[180px]'>
					<h3 className='text-lg font-semibold relative'>
						PLATFORM STATUS
						<span className='absolute -bottom-3 left-0 w-[30%] h-[3px] bg-tiffany'></span>
					</h3>
					<div className='mt-6'>
						{filteredBidItems.length
							? filteredBidItems.map((item, index) => (
									<div key={item.key}>
										<div
											className={`flex flex-row gap-2 justify-between items-center px-2 py-3 transition hover:shadow-md hover:rounded-lg`}
										>
											<div className='flex flex-col gap-1 text-sm'>
												<h3 className='text-lg font-semibold'>{item.label}</h3>
												<p dangerouslySetInnerHTML={{ __html: item.info }} />
											</div>
										</div>
										{index < filteredBidItems.length - 1 && (
											<div className='bg-tiffany h-[1px] w-full my-1'></div>
										)}
									</div>
								))
							: defaulBlock()}
					</div>
				</div> */}
			</div>
		</div>
	)
}

export default Dashboard
