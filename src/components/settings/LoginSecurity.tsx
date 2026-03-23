import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	renderInputSection,
	resetFormSchema,
	updateUserFormSchema,
} from '@/constants/formControl'
import { useToast } from '@/hooks/use-toast'
import { INewPasswordDto, IUpdateUser, useAuth } from '@/hooks/useAuth'
import SettingsDialogs from '@/views/SettingsDialogs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { PhoneInput } from '../ui/phone-input'

const Field = ({ label, value }: { label: string; value: string }) => (
	<div className='flex flex-col gap-2'>
		<h4 className='text-base font-semibold'>{label}</h4>
		<p className='border-l-2 border-ring/30 border-dashed pl-4 leading-relaxed'>
			{value}
		</p>
	</div>
)

const LoginSecurity = () => {
	const { user, updateProfile, updatePassword } = useAuth()
	const { toast } = useToast()

	const form = useForm<z.infer<typeof updateUserFormSchema>>({
		resolver: zodResolver(updateUserFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			phone: '',
		},
	})

	const resetForm = useForm<z.infer<typeof resetFormSchema>>({
		resolver: zodResolver(resetFormSchema),
		defaultValues: {
			oldPassword: '',
			password: '',
			confirmPassword: '',
		},
	})

	useEffect(() => {
		if (user) {
			form.reset({
				firstName: user.firstName,
				lastName: user.lastName,
				phone: user.phoneNumber,
			})
		}
	}, [user, form])

	const password = useWatch({ control: resetForm.control, name: 'password' })

	const validation = {
		minLength: password?.length >= 8,
		upperCase: /[A-Z]/.test(password || ''),
		lowerCase: /[a-z]/.test(password || ''),
		number: /\d/.test(password || ''),
		specialChar: /[-_!@#$%^&*(),.?":{}|<>]/.test(password || ''),
	}

	async function onSubmit(data: z.infer<typeof updateUserFormSchema>) {
		const dto: IUpdateUser = {
			firstName: data.firstName,
			lastName: data.lastName,
			phoneNumber: data.phone,
		}

		try {
			await updateProfile(dto)

			toast({
				title: 'Success',
				description: 'Profile updated successfully.',
				variant: 'success',
			})
		} catch (error: unknown) {
			toast({
				title: 'Error',
				description: 'Failed to update profile.',
				variant: 'destructive',
			})
		}
	}

	async function onSubmitPassword(data: z.infer<typeof resetFormSchema>) {
		if (user?.email) {
			const dto: INewPasswordDto = {
				email: user?.email ?? '',
				password: data.oldPassword,
				newPassword: data.confirmPassword,
			}

			try {
				await updatePassword(dto)
				toast({
					title: 'Success',
					description: 'Password changed successfully.',
					variant: 'success',
				})
			} catch (error) {
				toast({
					title: 'Error',
					description: `Failed to change password.`,
					variant: 'destructive',
				})
			}
		} else {
			toast({
				title: 'Error',
				description: `User email not found. Cannot change password.`,
				variant: 'destructive',
			})
		}
	}

	return (
		<div>
			<h3 className='lg:text-2xl text-base font-semibold relative'>
				Login & Security
				<span className='absolute -bottom-3 left-0 w-[10%] h-[3px] bg-tiffany'></span>
			</h3>
			<div className='flex md:flex-row flex-col md:gap-14 gap-5 mt-10'>
				<div className='flex flex-col gap-5'>
					<Field label='First name' value={user?.firstName ?? ''} />
					<Field label='Last name' value={user?.lastName ?? ''} />
				</div>
				<div className='flex flex-col gap-5'>
					<Field label='Email address' value={user?.email ?? ''} />
					<Field label='Mobile phone' value={user?.phoneNumber ?? ''} />
				</div>
			</div>
			<SettingsDialogs form={form}>
				<Form {...form}>
					<form
						autoComplete='on'
						onSubmit={form.handleSubmit(onSubmit, errors => {
							console.error('Validation errors:', errors)
						})}
					>
						<div className='flex flex-col gap-3'>
							{renderInputSection([
								{
									control: form.control,
									name: 'firstName',
									label: 'First name',
									required: true,
								},
								{
									control: form.control,
									name: 'lastName',
									label: 'Last name',
									required: true,
								},
							])}
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='font-semibold text-sm'>
											Phone number{' '}
											<span className='text-destructive text-base'>*</span>
										</FormLabel>
										<FormControl>
											<div className='w-full border border-tiffany bg-foreground rounded-lg md:text-base text-sm flex flex-row items-center'>
												<PhoneInput
													{...field}
													international
													defaultCountry='MD'
													placeholder='Phone number'
													className='w-full'
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type='submit'
								variant={'outline'}
								size={'lg'}
								className='mt-5 border-background bg-background text-foreground hover:bg-tiffany hover:border-tiffany hover:text-background px-16 h-[46px]'
							>
								Save
							</Button>
						</div>
					</form>
				</Form>
			</SettingsDialogs>
			<div className='flex flex-col mt-10'>
				<Field label='Password' value='********' />
				<div className=''>
					<SettingsDialogs form={resetForm}>
						<Form {...resetForm}>
							<form
								autoComplete='on'
								onSubmit={resetForm.handleSubmit(onSubmitPassword, errors => {
									console.error('Validation errors:', errors)
								})}
							>
								<div className='flex flex-col mt-4'>
									<h3 className='lg:text-xl md:text-lg text-base font-semibold text-muted-foreground'>
										1. Reset Password
									</h3>
									<div className='border-l-2 border-dashed pl-3 border-muted-foreground ml-1 py-4 gap-5 flex flex-col'>
										{renderInputSection([
											{
												control: resetForm.control,
												name: 'oldPassword',
												label: 'Old password',
												required: true,
												type: 'password',
											},
											{
												control: resetForm.control,
												name: 'password',
												label: 'New password',
												required: true,
												type: 'password',
												autoComplete: 'new-password',
											},
										])}
										<ul className='list-disc text-sm pl-10'>
											<li
												className={
													validation.minLength ? 'text-muted-foreground' : ''
												}
											>
												8 characters minimum
											</li>
											<li
												className={
													validation.upperCase ? 'text-muted-foreground' : ''
												}
											>
												One uppercase character
											</li>
											<li
												className={
													validation.lowerCase ? 'text-muted-foreground' : ''
												}
											>
												One lowercase character
											</li>
											<li
												className={
													validation.number ? 'text-muted-foreground' : ''
												}
											>
												One number
											</li>
											<li
												className={
													validation.specialChar ? 'text-muted-foreground' : ''
												}
											>
												One special character
											</li>
										</ul>
										{renderInputSection([
											{
												control: resetForm.control,
												name: 'confirmPassword',
												label: 'Confirm password',
												required: true,
												type: 'password',
												autoComplete: 'new-password',
											},
										])}
									</div>
									<Button
										type='submit'
										variant={'outline'}
										size={'lg'}
										className='shadow-custom-xl mt-5 border-background bg-background text-foreground hover:bg-tiffany hover:border-tiffany hover:text-background h-[46px] px-16'
									>
										Change my password
									</Button>
								</div>
							</form>
						</Form>
					</SettingsDialogs>
				</div>
			</div>
		</div>
	)
}

export default LoginSecurity
