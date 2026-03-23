import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { IoSettingsSharp } from 'react-icons/io5'
import { MdArrowForwardIos } from 'react-icons/md'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'

const settingsLinks = [
	{ title: 'Login & security', to: '/my-account/settings/login_security' },
	{ title: 'Notification', to: '/my-account/settings/notification' },
	{ title: 'Company details', to: '/my-account/settings/company' },
	{ title: 'My profile', to: '/my-account/settings/profile' },
	{ title: 'Delivery addresses', to: '/my-account/settings/delivery' },
	{ title: 'Payment settings', to: '/my-account/settings/payment' },
	{ title: 'Language preferences', to: '/my-account/settings/language' },
]

const SettingsSheet: React.FC<{
	isSheet: boolean
	click?: React.MouseEventHandler
}> = ({ isSheet, click }) => {
	const location = useLocation()

	const defaultPath = settingsLinks[0].to
	if (location.pathname === '/my-account/settings') {
		return <Navigate to={defaultPath} replace />
	}

	return (
		<div
			className={`xl:w-[300px] lg:w-[230px] flex flex-col h-full ${isSheet ? '' : 'shadow-custom-xl mt-2 rounded-2xl p-5'}`}
		>
			<ul className='text-base font-semibold'>
				{settingsLinks.map(({ title, to }) => {
					const isActive = location.pathname.startsWith(to)

					return (
						<li
							key={to}
							className='border-b border-ring/30 py-4 last:border-b-0'
						>
							<NavLink
								onClick={click}
								to={to}
								className={`${isActive && 'flex flex-row justify-between items-center text-tiffany'}`}
							>
								{title}
								{isActive && <MdArrowForwardIos className='h-4 w-4' />}
							</NavLink>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

const Settings = () => {
	const [sheetOpen, setSheetOpen] = useState<boolean>(false)

	return (
		<div className='main-sizing'>
			<h1 className='mt-20 lg:text-5xl sm:text-3xl text-2xl font-semibold xl:leading-[60px] sm:leading-[50px] text-center'>
				My account settings
			</h1>
			<p className='text-secondary pt-4 text-center lg:text-base text-sm main-sizing'>
				Manage your account settings.
			</p>
			<div className='mt-10 flex lg:flex-row flex-col gap-5'>
				<div className='h-full max-lg:hidden'>
					<SettingsSheet isSheet={false} />
				</div>
				<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
					<SheetTrigger asChild className='lg:hidden'>
						<Button
							variant={'outline'}
							size={'lg'}
							className='border-tiffany bg-foreground text-background hover:bg-tiffany hover:border-tiffany hover:text-background md:h-10 h-9 md:px-12 px-10 relative'
						>
							Settings
							<IoSettingsSharp />
						</Button>
					</SheetTrigger>
					<SheetContent className='flex flex-col w-full'>
						<SheetHeader>
							<SheetTitle>Settings</SheetTitle>
							<SheetDescription />
						</SheetHeader>
						<div className='flex-1 overflow-y-auto pr-5 mt-2'>
							<SettingsSheet isSheet={true} click={() => setSheetOpen(false)} />
						</div>
					</SheetContent>
				</Sheet>
				<div className='w-full flex flex-col gap-2 shadow-custom-xl mt-2 rounded-2xl p-5'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Settings
