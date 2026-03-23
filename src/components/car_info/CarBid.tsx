import { rejectCarSchema } from '@/constants/formControl'
import { toast } from '@/hooks/use-toast'
import { ICarApprove, ICarInfo, useCars } from '@/hooks/useCar'
import UploadInput from '@/utils/UploadInput'
import ConfirmationDialog from '@/views/ConfirmationDialogs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'

type RejectCarSchemaType = z.infer<typeof rejectCarSchema>
const initialDefaultValues: RejectCarSchemaType = {
	message: '',
	files: [],
}

const CarBid = ({ car }: { car: ICarInfo }) => {
	const { approveCar } = useCars()
	const createForm = useForm<z.infer<typeof rejectCarSchema>>({
		resolver: zodResolver(rejectCarSchema),
		defaultValues: initialDefaultValues,
	})

	const { control } = createForm

	const handleApproveCar = async () => {
		const data: ICarApprove = {
			carId: car.id,
			isApproved: true,
		}
		await approveCar(data)
	}

	const handleRejectCar = async () => {
		const data: ICarApprove = {
			carId: car.id,
			isApproved: false,
		}
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='bg-foreground shadow-custom-xl rounded-lg text-background p-5 '>
				<div className='flex flex-col px-4'>
					<p className='lg:text-xl text-base font-semibold text-background'>
						Actions
					</p>
					<div className='mt-4 space-y-4'>
						<ConfirmationDialog
							title='Submit Approval'
							onConfirm={handleApproveCar}
							confirmLabel='Submit'
							cancelLabel='Cancel'
							trigger={
								<Button
									type='submit'
									variant={'outline'}
									size={'lg'}
									className={`border-tiffany bg-transparent text-background hover:bg-tiffany hover:border-tiffany hover:text-background xl:px-14 py-5 w-full`}
								>
									Approve Listing
								</Button>
							}
						/>
						<ConfirmationDialog
							title='Reject Listing'
							description={`Provide a reason and optionally attach supporting photos for the rejection of ${car.brand} ${car.model}`}
							onConfirm={async () => {}}
							confirmLabel='Submit'
							cancelLabel='Cancel'
							trigger={
								<Button
									type='submit'
									variant={'outline'}
									size={'lg'}
									className={`border-destructive bg-destructive/80 text-foreground hover:bg-destructive hover:border-destructive hover:text-foreground xl:px-14 py-5 w-full`}
								>
									Reject Listing
								</Button>
							}
						>
							<Form {...createForm}>
								<form
									autoComplete='on'
									onSubmit={createForm.handleSubmit(
										() => {},
										errors => {
											console.error('Form validation errors:', errors)
											toast({
												variant: 'destructive',
												title: 'Validation Error',
												description:
													'Please check the form for errors and try again.',
											})
										},
									)}
									className='flex flex-col space-y-6'
								>
									<FormField
										control={createForm.control}
										name={'message'}
										render={({ field }) => (
											<FormItem className='w-full'>
												<FormLabel className='font-semibold text-sm'>
													Rejection Reason
												</FormLabel>
												<FormControl>
													<TextareaAutosize
														{...field}
														minRows={4}
														maxRows={10}
														placeholder='Describe why this listing is being rejected. Be specific so the seller can understand what needs to be fixed…'
														className='w-full border border-tiffany bg-foreground rounded-lg pl-5 pr-14 py-3 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<UploadInput
										control={control}
										name='files'
										label='Supporting Photos'
										multiple
										required
									/>
								</form>
							</Form>
						</ConfirmationDialog>
					</div>
					<p className='lg:text-sm text-xs text-secondary-foreground mt-2 mb-1 text-center'>
						Approving will publish the listing to the marketplace.
					</p>
				</div>
			</div>
		</div>
	)
}

export default CarBid
