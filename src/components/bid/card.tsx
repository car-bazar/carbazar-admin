import { ICarInfo, useCars } from '@/hooks/useCar'
import CarInfo from '@/pages/carInfo'
import { Collapsiblebox } from '@/utils/Collapsiblebox'
import type { MouseEventHandler } from 'react'
import { useEffect, useState } from 'react'

type view = 'vertical' | 'horizontal'

interface CardProps {
	car: ICarInfo
	canBid?: boolean
	view?: view
	isMyCar?: boolean
	deleteButtonClick?: MouseEventHandler<HTMLButtonElement>
}

const Card: React.FC<CardProps> = ({ car, view = 'vertical' }) => {
	const { getCarDisplayName } = useCars()

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
	}, [car?.images])

	const useIsHorizontal = (view: string) => {
		const getValue = () => view === 'horizontal' && window.innerWidth > 768

		const [isHorizontal, setIsHorizontal] = useState(getValue)

		useEffect(() => {
			const handleResize = () => setIsHorizontal(getValue())

			window.addEventListener('resize', handleResize)
			return () => window.removeEventListener('resize', handleResize)
		}, [view])

		return isHorizontal
	}

	const isHorizontal = useIsHorizontal(view)

	return (
		<Collapsiblebox
			containerProps={{
				className: 'p-5 shadow-custom-xl bg-foreground rounded-2xl',
			}}
			trigger={
				<div
					className={`flex ${isHorizontal ? 'flex-row xl:gap-10 gap-7 justify-start' : 'flex-col max-w-[350px] p-6 gap-2'}`}
				>
					{isHorizontal && (
						<div className={'shrink-0'}>
							<img
								src={car.previewImage}
								alt='lada'
								className={`rounded-lg object-left object-cover w-[120px] h-[80px] cursor-pointer`}
							/>
						</div>
					)}
					<div className={`flex flex-col gap-2 `}>
						<div
							className={`flex flex-row  ${isHorizontal ? 'xl:justify-start xl:gap-4 gap-0 justify-between' : 'justify-between'}`}
						>
							<h1 className='text-base font-semibold capitalize'>
								{getCarDisplayName(car)}
							</h1>
						</div>
						<div className={`${isHorizontal && 'hidden'}`}>
							<img
								src={car.previewImage}
								alt='lada'
								className={`rounded-lg object-left object-cover w-full`}
							/>
						</div>
						<div className={`order-1 flex flex-col gap-2`}>
							<div className='flex flex-col w-full'>
								<p className='text-base font-semibold text-background'>
									€ {car.priceEUR}
								</p>
							</div>
						</div>
					</div>
				</div>
			}
		>
			<CarInfo car={car} />
		</Collapsiblebox>
	)
}

export default Card
