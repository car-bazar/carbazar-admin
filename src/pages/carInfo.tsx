import CarBid from '@/components/car_info/CarBid'
import CarDescriptions from '@/components/car_info/CarDescriptions'
import CarImagesGalery from '@/components/car_info/CarImagesGalery'
import { ICarInfo } from '@/hooks/useCar'

import { useEffect, useState } from 'react'

const CarInfo = ({ car }: { car: ICarInfo }) => {
	const [images, setImages] = useState<string[]>([])
	const [pdfs, setPdfs] = useState<string[]>([])

	useEffect(() => {
		const allFiles: string[] = car?.images || []
		const imageFiles = allFiles.filter(url =>
			/\.(jpg|jpeg|png|gif|webp)$/i.test(url),
		)
		setImages(imageFiles)
		const pdfFiles = allFiles.filter(url => /\.pdf$/i.test(url))
		setPdfs(pdfFiles)

		console.log(images)
	}, [car?.images])

	return (
		<div className='bg-foreground text-background relative'>
			<div className='flex md:flex-row flex-col gap-8 relative z-10 justify-between'>
				<div className='md:w-1/2 w-full space-y-4'>
					<CarImagesGalery images={images} />
					<CarBid car={car} />
				</div>
				<div className='md:w-1/2 w-full'>
					<CarDescriptions car={car} pdfs={pdfs} />
				</div>
			</div>
		</div>
	)
}

export default CarInfo
