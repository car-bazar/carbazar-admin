import { IUpdateCar } from '@/hooks/useCar'
import { clsx, type ClassValue } from 'clsx'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatPrice = (value: number, withCurrency = true) =>
	new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 0,
		...(withCurrency && {
			style: 'currency',
			currency: 'USD',
		}),
	}).format(value)

export function useDebounce<T>(value: T, delay = 500): T {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => clearTimeout(timer)
	}, [value, delay])

	return debouncedValue
}

export function parseLocalStorageDataToCarResponseDto(
	localStorageData: any,
): Partial<IUpdateCar> {
	const carResponseDto: IUpdateCar = {
		isDrivable: localStorageData.isDrivable || false,
		possibleAccident: localStorageData.possibleAccident || false,
		firstRegistryDate:
			localStorageData.firstRegistryDate || new Date().toISOString(),
		yearMade: parseInt(localStorageData.yearMade) || 0,
		productionDate: localStorageData.productionDate || new Date().toISOString(),
		mileage: parseInt(localStorageData.mileage) || 0,
		powerKW: parseInt(localStorageData.powerKW) || 0,
		doors: parseInt(localStorageData.doors) || 0,
		seats: parseInt(localStorageData.seats) || 0,
		vin: localStorageData.vin || undefined,
		keyNumber: localStorageData.keyNumber || undefined,
		color: localStorageData.color || '',
		colorInterior: localStorageData.colorInterior || undefined,
		hasVAT: localStorageData.hasVAT || false,
		technicalCheckValidUntil:
			localStorageData.technicalCheckValidUntil || undefined,
		insuranceValidUntil: localStorageData.insuranceValidUntil || undefined,
		lastMaintenanceMilleage:
			parseInt(localStorageData.lastMaintenanceMilleage) || 0,
		lastMaintenanceDate: localStorageData.lastMaintenanceDate || undefined,
		priceEUR: parseFloat(localStorageData.priceEUR) || 0,
		carLocation: localStorageData.carLocation || '',
		engineTypeId: localStorageData.engineTypeId || undefined,
		engineCapacity: parseInt(localStorageData.engineCapacity) || 0,
		transmissionId: localStorageData.transmissionId || undefined,
		emissionStandardId: localStorageData.emissionStandardId || undefined,
		bodyTypeId: localStorageData.bodyTypeId || undefined,
		registryRegionId: localStorageData.registryRegionId || undefined,
		modelId: localStorageData.modelId || undefined,
		auctionTypeId: localStorageData.auctionTypeId || undefined,
		featureIds: Array.isArray(localStorageData.featureIds)
			? localStorageData.featureIds
			: [],
		damageIds: Array.isArray(localStorageData.damageIds)
			? localStorageData.damageIds.map((damage: any) => ({
					damageId: damage.damageId,
					damageTypeId: damage.damageTypeId,
				}))
			: [],
		damageComments: localStorageData.damageComments || '',
	}

	return carResponseDto
}
