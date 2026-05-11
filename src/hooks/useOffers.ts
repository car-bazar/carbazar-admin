import { carApi } from '@/api/api'
import { toast } from './use-toast'
import { useApiResource } from './useApiResource'
import { User } from './useAuth'

export interface IOfferInfo {
	id: string
	brand: string
	model: string
	priceEUR: number
	previewImage: string
	productionDate: string
	mileage: number
	fuelType: string
	transmission: string
	powerKW: number
	bidStartDate: string
	currentHighestBid: number
	auctionId: string
	auctionStatus: string
	auctionEndDate: string
	offerId: string
	offeredPrice: number
	offerStatus: string
	sellerAcceptedAt: string
	buyerAcceptedAt: string
	sellerDetails: User
	buyerDetails: User
}

export interface IOfferApprove {
	offerId: string
}

export function useOffers() {
	const resource = useApiResource<IOfferInfo[]>({
		key: '',
		fetcher: () => carApi.getOffers().then(res => res.data),
	})

	const approveOffer = async (data: IOfferApprove) => {
		try {
			const response = await carApi.approveOffer(data)
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
		offers: resource.data,
		approveOffer,
	}
}
