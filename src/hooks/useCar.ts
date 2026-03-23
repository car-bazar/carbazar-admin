import { carApi } from '@/api/api'
import { toast } from './use-toast'
import { useApiResource } from './useApiResource'

export interface DamageElementCar {
	name: string
	type: string
}

export interface ICarInfo {
	id: string
	brand: string
	model: string
	priceEUR: number
	isDrivable: boolean
	possibleAccident: boolean
	firstRegistryDate: string
	yearMade: number
	productionDate: string
	mileage: number
	powerKW: number
	doors: number
	seats: number
	vin: string
	features: Record<string, string[]>
	damages: Record<string, DamageElementCar[]>
	engineType: string
	transmission: string
	bodyType: string
	fuelType: string
	color: string
	colorInterior: string
	emissionStandard: string
	auctionType: string
	hasVAT: boolean
	technicalCheckValidUntil: string
	InsuranceValidUntil: string
	bidStartDate: string
	registryRegion: string
	lastMaintenanceMilleage: number
	lastMaintenanceDate: string
	carLocation: string
	engineCapacity: number
	damageComments: string
	images: string[]
	previewImage: string
}

export interface ICarApprove {
	carId: string
	isApproved: boolean
}

export function useCars() {
	const resource = useApiResource<ICarInfo[]>({
		key: '',
		fetcher: () => carApi.getCars().then(res => res.data),
	})

	const getCarDisplayName = (
		carData: Partial<ICarInfo> | undefined,
	): string => {
		if (!carData) return 'Car not found'
		const brandName = carData.brand || ''
		const modelName = carData.model || ''
		const engineCapacity = carData.engineCapacity || ''
		const engineType = carData.engineType || ''
		const fuelType = carData.fuelType ? `- ${carData.fuelType}` : ''
		const transmission = carData.transmission ? `- ${carData.transmission}` : ''
		const powerKW = carData.powerKW ? `- ${carData.powerKW} hp` : ''
		const mileage = carData.mileage ? `- ${carData.mileage} km` : ''

		return (
			`${brandName} ${modelName} ${engineCapacity} ${engineType} ${fuelType} ${transmission} ${powerKW} ${mileage}`
				.replace(/\s+/g, ' ')
				.trim() || 'Car not found'
		)
	}

	const approveCar = async (data: ICarApprove) => {
		try {
			const response = await carApi.approveCar(data)
			toast({
				title: 'Approval is send !',
				variant: 'success',
			})
			return response
		} catch (error) {
			const errorMessage =
				(error as any).response?.data?.message || 'Something went wrong'
			toast({
				variant: 'destructive',
				title: 'Failed to approve the car car',
				description: errorMessage,
			})
		}
	}

	return {
		...resource,
		cars: resource.data,
		approveCar,
		getCarDisplayName,
	}
}
