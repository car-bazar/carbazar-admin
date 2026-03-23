import { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface CarImagesGaleryProps {
	images: string[]
}

const CarImagesGalery = ({ images }: CarImagesGaleryProps) => {
	const [activeThumb, setActiveThumb] = useState<any>()
	return (
		<>
			<PhotoProvider>
				<Swiper
					loop={images.length > 1}
					spaceBetween={16}
					navigation={true}
					modules={[Navigation, Thumbs]}
					grabCursor={true}
					thumbs={{
						swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
					}}
					className='aspect-video mb-4 rounded-lg product-images-slider shadow-custom-xl'
				>
					{images.map((item, index) => (
						<SwiperSlide key={index}>
							<PhotoView src={item}>
								<img src={item} alt={`${index + 1}`} className='' />
							</PhotoView>
						</SwiperSlide>
					))}
				</Swiper>
			</PhotoProvider>

			{images.length > 1 && (
				<Swiper
					onSwiper={setActiveThumb}
					loop={false}
					spaceBetween={10}
					slidesPerView={Math.min(
						typeof window !== 'undefined' && window.innerWidth >= 1024
							? 6
							: typeof window !== 'undefined' && window.innerWidth >= 768
								? 4
								: 3,
						images.length,
					)}
					modules={[Thumbs]}
					watchSlidesProgress={true}
					className='product-images-slider-thumbs'
				>
					{images.map((item, index) => (
						<SwiperSlide
							key={index}
							className='cursor-pointer rounded-lg overflow-hidden shadow-lg'
						>
							<div className='w-full h-full transition'>
								<img
									src={item}
									alt={`Thumbnail ${index + 1}`}
									className='w-full h-full object-cover'
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	)
}

export default CarImagesGalery
