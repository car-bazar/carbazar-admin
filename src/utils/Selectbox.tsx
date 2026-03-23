import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { createCarSchema } from '@/constants/formControl'
import { Control, FieldArrayPath, Path } from 'react-hook-form'
import { z } from 'zod'

interface SelectboxProps {
	children: React.ReactNode
	control: Control<any>
	name:
		| Path<z.infer<typeof createCarSchema>>
		| FieldArrayPath<z.infer<typeof createCarSchema>>
	label: string
	required?: boolean
	needTriggerWidth?: boolean
	triggerClass?: string
	isNumber?: boolean
}

const Selectbox: React.FC<SelectboxProps> = ({
	children,
	control,
	name,
	label,
	required = true,
	isNumber = false,
	needTriggerWidth = false,
	triggerClass = '',
}) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={`flex flex-col w-full ${triggerClass}`}>
					<FormLabel className='font-semibold text-sm'>
						{label}{' '}
						{required && <span className='text-destructive text-base'>*</span>}
					</FormLabel>
					<FormControl>
						<Select
							onValueChange={value => {
								field.onChange(isNumber ? Number(value) : value)
							}}
							value={field.value?.toString() ?? ''}
						>
							<SelectTrigger
								className={`${!needTriggerWidth && 'md:w-1/2 w-full'} h-[46px] justify-between text-left font-normal bg-white shadow-none hover:bg-white border border-tiffany px-3 py-5 hover:text-background outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary capitalize`}
							>
								<SelectValue placeholder='Select' />
							</SelectTrigger>
							<SelectContent className='md:max-h-96'>{children}</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default Selectbox
