import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { FaUser } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

interface AvatarProps {
	click: React.MouseEventHandler
	userName?: string
}

const Avatar: React.FC<AvatarProps> = ({ click, userName }) => {
	const { logout } = useAuth()
	const { toast } = useToast()

	const handleLogout = async () => {
		try {
			await logout()
			toast({
				variant: 'success',
				title: 'Logged Out',
				description: 'You have been successfully logged out.',
			})
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Logout Failed',
				description: 'An error occurred while trying to log out.',
			})
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='h-[45px] w-[45px] rounded-full bg-foreground'>
					<FaUser className='text-background h-full w-full pt-2 cursor-pointer' />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-[160px]'>
				<DropdownMenuLabel>Hi {userName || 'User'} !</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<NavLink to={'/my-account/settings'} onClick={click}>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</NavLink>
				<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Avatar
