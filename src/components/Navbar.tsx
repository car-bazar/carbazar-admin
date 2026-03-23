import { useAuth } from '@/hooks/useAuth'
import Avatar from '@/views/Avatar'
import LogIn from '@/views/LogIn'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AnimatedIcon from './AnimatedIcon'
import { Button } from './ui/button'

const Navbar = () => {
	const [isPressed, setIsPressed] = useState(false)
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) {
		return (
			<div className='absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-background'>
				<div className='h-24 w-24'>
					<AnimatedIcon />
				</div>
			</div>
		)
	}

	return (
		<div className={`pb-10 w-full bg-background text-foreground`}>
			<nav className='main-sizing flex lg:flex-row md:flex-col flex-row items-center pt-8 lg:gap-10 gap-6 relative'>
				<NavLink
					to={'/'}
					className='flex flex-row items-center justify-center h-auto gap-4'
				>
					<img
						src='/logo.svg'
						alt='logo'
						className=' object-contain h-[38px]'
					/>
					<div className='flex flex-col'>
						<h1 className='text-[28px] font-semibold tracking-tight'>
							CarBazar
						</h1>
						<p className='text-xs tracking-normal relative bottom-2 left-0.5'>
							Drive Your Next Deal
						</p>
					</div>
				</NavLink>
				<div className='flex grow md:justify-center justify-end'>
					<div className='md:hidden flex'>
						<button
							className={`flex text-center items-center justify-center transition`}
							onClick={() => setIsPressed(!isPressed)}
						>
							<svg
								className='w-8 h-8 pointer-events-none fill-tiffany'
								viewBox='0 0 16 16'
								xmlns='http://www.w3.org/2000/svg'
							>
								<rect
									className={`origin-center -translate-y-[5px] transition-all duration-150 ease-[cubic-bezier(.5,.85,.25,1.1)] ${isPressed ? 'translate-x-[5px] rotate-[315deg]' : 'translate-x-[7px]'}`}
									y='7'
									width='9'
									height='2'
									rx='1'
								></rect>
								<rect
									className={`origin-center transition-all duration-150 ease-[cubic-bezier(.5,.85,.25,1.8)] ${isPressed ? 'rotate-45' : ''}`}
									y='7'
									width='16'
									height='2'
									rx='1'
								></rect>
								<rect
									className={`origin-center translate-y-[5px] transition-all duration-150 ease-[cubic-bezier(.5,.85,.25,1.1)] ${isPressed ? 'translate-y-0 rotate-[135deg] -translate-x-[5px]' : ''}`}
									y='7'
									width='9'
									height='2'
									rx='1'
								></rect>
							</svg>
						</button>
					</div>
					<div
						className={`flex lg:flex-row flex-col items-center justify-between lg:gap-0 gap-10 md:w-full w-[100vw] md:static absolute left-[50%] max-md:translate-x-[-50%] top-[100px] md:bg-transparent bg-background md:pt-0 pt-10 md:pb-0 pb-10 border-tiffany md:border-none border-b-[3px] transition-all duration-150 ${isPressed ? 'max-md:translate-y-0 max-md:z-50 max-md:opacity-100' : 'max-md:-translate-y-5 max-md:-z-10 max-md:opacity-0'}`}
					>
						<div className='main-sizing flex'></div>
						<div className='flex flex-row gap-7 items-center justify-end'>
							{isAuthenticated ? (
								<div className='flex flex-row gap-7 items-center '>
									<Avatar
										click={() => setIsPressed(false)}
										userName={'Ed John'}
									/>
								</div>
							) : (
								<div className='flex flex-row gap-5'>
									<LogIn isAuthenticated={isAuthenticated}>
										<Button
											className='border-tiffany hover:bg-tiffany hover:text-background'
											variant={'outline'}
											size={'lg'}
										>
											Log In
										</Button>
									</LogIn>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
