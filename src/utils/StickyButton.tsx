import { Button } from '@/components/ui/button'
import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'

interface StickyButtonProps {
	text: string
	onClick: () => void
}

const StickyButton: React.FC<StickyButtonProps> = ({ text, onClick }) => {
	return (
		<div className='sticky bottom-0 py-5'>
			<div className='flex md:justify-end justify-center main-sizing'>
				<Button
					variant={'outline'}
					size={'lg'}
					className='shadow-custom-xl border-background bg-background text-foreground hover:bg-tiffany hover:border-tiffany hover:text-background md:h-14 h-12 md:px-14 px-12 relative'
					onClick={onClick}
				>
					{text}
					<RiSearch2Line className='absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6' />
				</Button>
			</div>
		</div>
	)
}

export default StickyButton
