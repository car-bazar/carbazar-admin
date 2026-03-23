import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'
import { Control } from 'react-hook-form'
import { BiSolidHide, BiSolidShow } from 'react-icons/bi'
import { z } from 'zod'

export const loginFormSchema = z.object({
	email: z
		.string()
		.nonempty('Email address is required')
		.email('Invalid email format'),
	password: z.string().nonempty('Password is required'),
})

const fileSchema = z
	.instanceof(File)
	.refine(f => f.size <= 20 * 1024 * 1024, 'Max file size is 20MB')

export const rejectCarSchema = z.object({
	message: z.string().nonempty('Rejection Reason is required'),
	files: z
		.array(fileSchema)
		.min(1, 'At least one file / image is required')
		.refine(
			files => files.reduce((acc, f) => acc + f.size, 0) <= 20 * 1024 * 1024,
			'Total size of all files must not exceed 20MB',
		),
})

interface FormControlProps {
	control: Control<any>
	label: string
	name:
		| keyof z.infer<typeof loginFormSchema>
		| keyof z.infer<typeof rejectCarSchema>
	options?: {
		value: string
		children: React.ReactNode
		disabled?: boolean
	}[]
	placeholder?: string
	isDisabled?: boolean
	autoComplete?: string
	required?: boolean
	type?: string
	textIcon?: string
}

export const InputField: React.FC<FormControlProps> = ({
	control,
	name,
	label,
	placeholder,
	required,
	type,
	isDisabled,
	autoComplete,
	textIcon,
}) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<FormField
			control={control as any}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className='font-semibold text-sm'>
						{label}{' '}
						{required && <span className='text-destructive text-base'>*</span>}
					</FormLabel>
					<FormControl>
						<div className='relative'>
							<input
								className={
									'w-full border border-tiffany bg-foreground rounded-lg pl-5 pr-14 py-3 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
								}
								placeholder={placeholder}
								type={type === 'password' && showPassword ? 'text' : type}
								{...field}
								autoComplete={autoComplete}
								value={
									typeof field.value === 'boolean' ||
									typeof field.value === 'object'
										? ''
										: field.value
								}
								disabled={isDisabled}
							/>
							{textIcon && (
								<p className='absolute h-4 w-4 right-5 top-1/2 transform -translate-y-1/2 text-xs font-semibold'>
									{textIcon}
								</p>
							)}
							{type === 'password' && (
								<button
									type='button'
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'
									onClick={() => setShowPassword(prev => !prev)}
								>
									{showPassword ? (
										<BiSolidShow className='w-6 h-6 text-tiffany' />
									) : (
										<BiSolidHide className='w-6 h-6' />
									)}
								</button>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export const RadioOption: React.FC<FormControlProps> = ({
	options,
	control,
	name,
	label,
	required = false,
}) => (
	<FormField
		control={control as any}
		name={name}
		render={({ field }) => (
			<FormItem>
				<FormLabel className='font-semibold text-sm'>
					{label}{' '}
					{required && <span className='text-destructive text-base'>*</span>}
				</FormLabel>
				<FormControl>
					<RadioGroup
						onValueChange={field.onChange}
						defaultValue={
							typeof field.value === 'string' ? field.value : undefined
						}
						className='text-base flex flex-col gap-2 ml-2'
					>
						{options?.map(({ value, children, disabled }) => (
							<div key={value} className='flex items-start space-x-2'>
								<RadioGroupItem
									disabled={disabled}
									value={value}
									id={value}
									className='mt-1'
								/>
								<label htmlFor={value} className='cursor-pointer'>
									{children}
								</label>
							</div>
						))}
					</RadioGroup>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
)

export const SectionHeader = ({
	title,
	subtitle,
	className,
}: {
	title: string
	subtitle?: string
	className?: string
}) => (
	<div className={`flex flex-col ${className}`}>
		<h1
			className='lg:text-3xl text-xl font-semibold pb-2'
			dangerouslySetInnerHTML={{ __html: title }}
		/>
		{subtitle && (
			<p
				className='md:text-sm text-xs'
				dangerouslySetInnerHTML={{ __html: subtitle }}
			/>
		)}
	</div>
)

export const renderInputSection = (inputs: FormControlProps[]) => (
	<>
		{inputs.map(
			(
				{
					control,
					name,
					label,
					placeholder,
					required = false,
					type = 'text',
					isDisabled = false,
					autoComplete = 'on',
					textIcon = '',
				},
				idx,
			) => (
				<InputField
					control={control}
					name={name}
					key={idx}
					label={label}
					placeholder={placeholder}
					required={required}
					type={type}
					isDisabled={isDisabled}
					autoComplete={autoComplete}
					textIcon={textIcon}
				/>
			),
		)}
	</>
)
