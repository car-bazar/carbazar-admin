import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DamageElementCar, ICarInfo } from '@/hooks/useCar'
import { Dot } from 'lucide-react'

interface CarDescriptionsProps {
	car: ICarInfo
	pdfs: string[] | undefined
}

const CarDescriptions = ({ car, pdfs }: CarDescriptionsProps) => {
	const tableElement = (data: [string, string][]) => (
		<>
			{data.map(([label, value], idx) => (
				<div key={idx}>
					<div className='flex flex-row lg:text-base text-sm gap-5 text-wrap'>
						<p className='font-medium text-secondary/80 w-1/2 text-sm'>
							{label}
						</p>
						<p className='font-medium text-secondary/80 w-1/2 tracking-wide capitalize text-sm'>
							{value}
						</p>
					</div>
					<div className='bg-ring/30 h-[1px] mt-0'></div>
				</div>
			))}
		</>
	)

	const tableFeatures = (label: string, data: string[]) => (
		<>
			<div className='flex flex-row lg:text-base text-sm gap-5 text-wrap'>
				<p className='font-semibold text-secondary w-1/2 text-sm'>{label}</p>
				{data.length > 0 ? (
					<div className='font-medium text-secondary/80 w-1/2 flex flex-col gap-1 text-sm'>
						{data.map((item, idx) => (
							<p key={idx} className='flex items-center gap-1'>
								<Dot />
								{item}
							</p>
						))}
					</div>
				) : (
					<p className='font-medium text-secondary/80 w-1/2 tracking-wide'>
						N/A
					</p>
				)}
			</div>
			<div className='bg-ring/30 h-[1px] mt-6'></div>
		</>
	)

	const tableDamages = (label: string, data: DamageElementCar[]) => (
		<>
			<div className='flex flex-row lg:text-base text-sm text-wrap'>
				{data.length > 0 && (
					<>
						<p className='font-semibold text-secondary w-1/2 text-sm'>
							{label} damage
						</p>
						<div className='font-medium text-secondary/80 w-1/2 flex flex-col gap-1 text-sm'>
							{data.map((item, idx) => (
								<p key={idx}>
									{idx + 1}. {item.name} : {item.type}
								</p>
							))}
						</div>
					</>
				)}
			</div>
			<div className='bg-ring/30 h-[1px] mt-6'></div>
		</>
	)

	return (
		<Tabs defaultValue='profile'>
			<TabsList className='md:grid max-md:flex max-md:flex-col md:grid-cols-3 md:h-10 lg:h-12 h-32 shadow-custom-xl'>
				<TabsTrigger
					value='profile'
					className='h-full lg:text-base text-sm max-md:w-full'
				>
					Profile
				</TabsTrigger>
				<TabsTrigger
					value='equipment'
					className='h-full lg:text-base text-sm max-md:w-full'
				>
					Equipment
				</TabsTrigger>
				<TabsTrigger
					value='condition'
					className='h-full lg:text-base text-sm max-md:w-full'
				>
					Condition
				</TabsTrigger>
			</TabsList>
			<TabsContent
				value='profile'
				className='bg-foreground rounded-lg shadow-custom-xl px-6 py-5'
			>
				<div className='flex flex-col text-background'>
					<h3 className='lg:text-xl text-base font-semibold'>Condition</h3>
					<div className='lg:px-4 pb-4 pt-4 gap-4 flex flex-col'>
						{tableElement([
							['Is drivable', car?.isDrivable ? 'Yes' : 'No'],
							['Prior accident damage', car?.possibleAccident ? 'Yes' : 'No'],
							[
								'Last maintenance',
								car?.lastMaintenanceDate && car?.lastMaintenanceMilleage
									? `${car.lastMaintenanceMilleage} KM - ${new Date(car.lastMaintenanceDate).toLocaleDateString()}`
									: 'N/A',
							],
							[
								'Technical inspection validity',
								car?.technicalCheckValidUntil
									? new Date(car.technicalCheckValidUntil).toLocaleDateString()
									: 'N/A',
							],
							[
								'Insurance validity',
								car?.InsuranceValidUntil
									? new Date(car.InsuranceValidUntil).toLocaleDateString()
									: 'N/A',
							],
						])}
					</div>
				</div>
				<div className='flex flex-col text-background pt-6'>
					<h3 className='lg:text-xl text-base font-semibold'>Specifications</h3>
					<div className='lg:px-4 pb-4 pt-4 gap-4 flex flex-col'>
						{/* <CarInfoAlert
												text={
													'Additional fees are charged when you pick up the vehicle more than 14 days after the PuA was sent to you.'
												}
											/> */}
						{tableElement([
							[
								'First registration',
								car?.firstRegistryDate
									? new Date(car.firstRegistryDate).toLocaleDateString()
									: 'N/A',
							],
							['Model year', car?.yearMade?.toString() || 'N/A'],
							[
								'Production Date',
								car?.productionDate
									? new Date(car.productionDate).toLocaleDateString()
									: 'N/A',
							],
							[
								'Mileage',
								car?.mileage ? `${car.mileage.toLocaleString()} KM` : 'N/A',
							],
							[
								'Fuel type',
								car?.engineType ? `${car.fuelType} / ${car.engineType}` : 'N/A',
							],
							['Transmission type', car?.transmission || 'N/A'],
							['CO2 emission standard', car?.emissionStandard || 'N/A'],
							['Power', car?.powerKW ? `${car.powerKW} hp` : 'N/A'],
							[
								'Engine capacity',
								car?.engineCapacity ? `${car.engineCapacity} cm³` : 'N/A',
							],
							['Body type', car?.bodyType || 'N/A'],
							['Doors', car?.doors?.toString() || 'N/A'],
							['Number of seats', car?.seats?.toString() || 'N/A'],
							['VIN', car?.vin || 'N/A'],
							['Paint', car?.color || 'N/A'],
							['Interior colour', car?.colorInterior || 'N/A'],
						])}
					</div>
				</div>
				<div className='flex flex-col text-background pt-6'>
					<h3 className='lg:text-xl text-base font-semibold'>Fiscal regime</h3>
					<div className='lg:px-4 pb-4 pt-4 gap-4 flex flex-col'>
						{tableElement([
							['VAT', car?.hasVAT ? 'VAT included' : 'VAT excluded'],
							[
								'Registry Region',
								car?.registryRegion ? car.registryRegion : 'N/A',
							],
							['City', car?.carLocation || 'N/A'],
						])}
					</div>
				</div>
			</TabsContent>
			<TabsContent
				value='equipment'
				className='bg-foreground rounded-lg shadow-custom-xl px-6 py-5'
			>
				<div className='flex flex-col text-background pb-4 pt-4 gap-6'>
					{car?.features &&
						Object.entries(car.features).map(([category, features]) => (
							<div key={category}>{tableFeatures(category, features)}</div>
						))}
				</div>
			</TabsContent>
			<TabsContent
				value='condition'
				className='bg-foreground rounded-lg shadow-custom-xl px-6 py-5'
			>
				<div className='flex flex-col text-background pb-4 pt-4 gap-6'>
					{pdfs && (
						<>
							<div className='flex flex-row lg:text-base text-sm text-wrap'>
								<p className='font-semibold text-secondary w-1/2 text-sm'>
									Documents
								</p>
								<div className='font-medium text-secondary/80 w-1/2 flex flex-col gap-1'>
									{pdfs.map((item, idx) => (
										<a
											key={idx}
											href={item}
											target='_blank'
											className='text-tiffany underline underline-offset-2 text-sm'
										>
											External Inspection Report ({idx + 1})
										</a>
									))}
								</div>
							</div>
							<div className='bg-ring/30 h-[1px] mt-0'></div>
						</>
					)}
					{car?.damages &&
						Object.entries(car.damages).map(([category, damages]) => (
							<div key={category}>{tableDamages(category, damages)}</div>
						))}

					{car?.damageComments && (
						<div className='flex flex-col lg:text-base text-sm gap-5 text-wrap'>
							<p className='font-semibold text-secondary text-sm'>Comments</p>
							<div className='font-medium text-secondary/80 flex flex-col gap-1 text-sm'>
								<p>{car.damageComments}</p>
							</div>
						</div>
					)}
				</div>
			</TabsContent>
		</Tabs>
	)
}

export default CarDescriptions
