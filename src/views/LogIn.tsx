import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { loginFormSchema, renderInputSection } from '@/constants/formControl'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface LogInProps {
	children: React.ReactNode
	isAuthenticated: boolean
}

const LogIn: React.FC<LogInProps> = ({ children, isAuthenticated }) => {
	const { login } = useAuth()
	const { toast } = useToast()
	const [modalState, setModalState] = useState({
		logIn: !isAuthenticated,
	})

	const loginForm = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmitLogin(data: z.infer<typeof loginFormSchema>) {
		try {
			await login(data)
			setModalState({ ...modalState, logIn: false })
			toast({
				variant: 'success',
				title: 'Login Successful',
				description: 'Welcome back!',
			})
		} catch (error: any) {
			toast({
				variant: 'destructive',
				title: 'Login Failed',
				description:
					error.response?.data?.message ||
					'Invalid credentials. Please try again.',
			})
		}
	}

	return (
		<>
			<Dialog
				open={modalState.logIn}
				onOpenChange={isOpen => {
					if (!isOpen && !isAuthenticated) return
					setModalState({ ...modalState, logIn: isOpen })
					isOpen ? loginForm.reset() : null
				}}
			>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent
					className='bg-foreground shadow-custom-xl max-sm:w-full max-sm:h-full'
					onInteractOutside={e => {
						if (!isAuthenticated) e.preventDefault()
					}}
					onEscapeKeyDown={e => {
						if (!isAuthenticated) e.preventDefault()
					}}
				>
					<DialogHeader className='mb-1'>
						<DialogTitle>Log In</DialogTitle>
						<DialogDescription />
					</DialogHeader>
					<Form {...loginForm}>
						<form
							autoComplete='on'
							onSubmit={loginForm.handleSubmit(onSubmitLogin, errors => {
								console.error('Validation errors:', errors)
							})}
						>
							<div className='flex flex-col gap-3'>
								{renderInputSection([
									{
										control: loginForm.control,
										name: 'email',
										label: 'Email',
										type: 'email',
										required: true,
									},
									{
										control: loginForm.control,
										name: 'password',
										label: 'Password',
										required: true,
										type: 'password',
										autoComplete: 'new-password',
									},
								])}
								<Button
									type='submit'
									variant={'outline'}
									size={'lg'}
									className='mt-5 border-background bg-background text-foreground hover:bg-tiffany hover:border-tiffany hover:text-background px-16 h-[46px]'
								>
									Log In
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default LogIn
