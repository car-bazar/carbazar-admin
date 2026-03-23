import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useRef, useState } from 'react'
import { Control, FieldArrayPath, Path } from 'react-hook-form'
import { FaFileAlt, FaFileExcel, FaFilePdf, FaFileWord } from 'react-icons/fa'
import { RiLoader3Line } from 'react-icons/ri'

const ACCEPTED_TYPES = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/webp',
	'image/svg+xml',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.ms-excel',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'text/plain',
	'text/csv',
]

const ACCEPT_ATTR = ACCEPTED_TYPES.join(',')

const isImage = (file: File) => file.type.startsWith('image/')

type FileKind = 'pdf' | 'word' | 'excel' | 'other'

const getFileKind = (file: File): FileKind => {
	if (file.type === 'application/pdf') return 'pdf'
	if (
		file.type === 'application/msword' ||
		file.type.includes('wordprocessingml')
	)
		return 'word'
	if (
		file.type === 'application/vnd.ms-excel' ||
		file.type.includes('spreadsheetml')
	)
		return 'excel'
	return 'other'
}

const kindStyles: Record<
	FileKind,
	{ bg: string; icon: JSX.Element; label: string }
> = {
	pdf: {
		bg: 'bg-red-500/15',
		icon: <FaFilePdf className='w-6 h-6 text-red-400' />,
		label: 'PDF',
	},
	word: {
		bg: 'bg-blue-500/15',
		icon: <FaFileWord className='w-6 h-6 text-blue-400' />,
		label: 'DOC',
	},
	excel: {
		bg: 'bg-green-500/15',
		icon: <FaFileExcel className='w-6 h-6 text-green-400' />,
		label: 'XLS',
	},
	other: {
		bg: 'bg-secondary/30',
		icon: <FaFileAlt className='w-6 h-6 text-secondary-foreground' />,
		label: 'FILE',
	},
}

const formatSize = (bytes: number) => {
	if (bytes < 1024) return `${bytes} B`
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const truncateName = (name: string, max = 22) =>
	name.length > max ? name.slice(0, max - 3) + '…' : name

interface FileCardProps {
	file: File
	index: number
	onRemove: (index: number) => void
}

const FileCard: React.FC<FileCardProps> = ({ file, index, onRemove }) => {
	const url = URL.createObjectURL(file)
	const kind = getFileKind(file)
	const { bg, icon, label } = kindStyles[kind]

	return (
		<div className='relative group flex flex-col rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-tiffany/40 transition-all duration-200 w-[120px] flex-shrink-0 shadow-custom-xl'>
			{/* Preview area */}
			<a
				href={url}
				target='_blank'
				rel='noreferrer'
				className='block w-full h-[80px] overflow-hidden'
				title={file.name}
			>
				{isImage(file) ? (
					<img
						src={url}
						alt={file.name}
						className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
					/>
				) : (
					<div
						className={cn(
							'w-full h-full flex flex-col items-center justify-center gap-1',
							bg,
						)}
					>
						{icon}
						<span className='text-[10px] font-bold tracking-widest text-secondary-foreground'>
							{label}
						</span>
					</div>
				)}
			</a>

			{/* File name + size */}
			<div className='px-2 py-1.5 flex flex-col gap-0.5'>
				<p className='text-[11px] font-medium text-foreground/80 leading-tight'>
					{truncateName(file.name)}
				</p>
				<p className='text-[10px] text-secondary-foreground'>
					{formatSize(file.size)}
				</p>
			</div>

			{/* Remove button */}
			<button
				type='button'
				onClick={() => onRemove(index)}
				className='absolute top-1.5 right-1.5 bg-background/80 hover:bg-destructive border border-white/10 hover:border-destructive rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all duration-150'
				title='Remove'
			>
				<X className='w-3 h-3 text-foreground' />
			</button>
		</div>
	)
}

// ─── Component ────────────────────────────────────────────────────────────────
interface UploadInputProps {
	control: Control<any>
	name: Path<any> | FieldArrayPath<any>
	label: string
	required?: boolean
	multiple?: boolean
	className?: string
	comment?: string
}

const UploadInput: React.FC<UploadInputProps> = ({
	control,
	name,
	label,
	required,
	multiple,
	className,
	comment,
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isDragging, setIsDragging] = useState(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const currentFiles: File[] = field.value ?? []

				const addFiles = async (incoming: File[]) => {
					const valid = incoming.filter(f => ACCEPTED_TYPES.includes(f.type))
					if (valid.length === 0) return
					setIsLoading(true)
					await new Promise(r => setTimeout(r, 600))
					field.onChange(multiple ? [...currentFiles, ...valid] : [valid[0]])
					setIsLoading(false)
					if (inputRef.current) inputRef.current.value = ''
				}

				const handleFileInputChange = (
					e: React.ChangeEvent<HTMLInputElement>,
				) => {
					if (!e.target.files || e.target.files.length === 0) return
					addFiles(Array.from(e.target.files))
				}

				const handleRemove = (index: number) => {
					const updated = [...currentFiles]
					updated.splice(index, 1)
					field.onChange(updated)
				}

				const handleDragOver = (e: React.DragEvent) => {
					e.preventDefault()
					setIsDragging(true)
				}

				const handleDrop = (e: React.DragEvent) => {
					e.preventDefault()
					setIsDragging(false)
					addFiles(Array.from(e.dataTransfer.files))
				}

				return (
					<FormItem className='flex flex-col w-full'>
						<FormLabel className='font-semibold text-sm'>
							{label}{' '}
							{required && (
								<span className='text-destructive text-base'>*</span>
							)}{' '}
							{comment && (
								<span className='text-secondary-foreground text-xs'>
									<br />({comment})
								</span>
							)}
						</FormLabel>

						<FormControl>
							<>
								<input
									type='file'
									accept={ACCEPT_ATTR}
									multiple={multiple}
									onChange={handleFileInputChange}
									className='hidden'
									ref={inputRef}
								/>

								{/* Drop zone */}
								<div
									onClick={() => inputRef.current?.click()}
									onDragOver={handleDragOver}
									onDragLeave={() => setIsDragging(false)}
									onDrop={handleDrop}
									className={cn(
										'transition-all duration-200 shadow-custom-xl p-6 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 min-h-[110px] cursor-pointer select-none',
										isDragging
											? 'border-tiffany bg-tiffany/5 scale-[1.01]'
											: 'border-secondary-foreground hover:border-tiffany hover:bg-tiffany/5',
										className,
									)}
								>
									<div
										className={cn(
											'w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200',
											isDragging
												? 'bg-tiffany/20'
												: 'bg-secondary/10 group-hover:bg-tiffany/10',
										)}
									>
										{isLoading ? (
											<RiLoader3Line className='animate-spin w-5 h-5 text-tiffany' />
										) : (
											<svg
												className={cn(
													'w-5 h-5 transition-colors duration-200',
													isDragging
														? 'text-tiffany'
														: 'text-secondary-foreground',
												)}
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
												/>
											</svg>
										)}
									</div>

									<div className='text-center'>
										<p
											className={cn(
												'text-sm font-semibold transition-colors duration-200',
												isDragging
													? 'text-tiffany'
													: 'text-secondary-foreground',
											)}
										>
											{isDragging ? 'Drop files here' : 'Click or drag & drop'}
										</p>
										<p className='text-xs text-secondary-foreground/60 mt-0.5'>
											Images, PDF, Word, Excel and more · Max 20MB
										</p>
									</div>
								</div>

								{/* Previews */}
								{currentFiles.length > 0 && (
									<div className='flex flex-row flex-wrap gap-2 pt-2'>
										{currentFiles.map((file, index) => (
											<FileCard
												key={`${file.name}-${index}`}
												file={file}
												index={index}
												onRemove={handleRemove}
											/>
										))}
									</div>
								)}
								{currentFiles.length > 0 &&
									(() => {
										const totalMB =
											currentFiles.reduce((acc, f) => acc + f.size, 0) /
											(1024 * 1024)
										const overLimit = totalMB > 20
										return (
											<p
												className={cn(
													'text-xs mt-1',
													overLimit
														? 'text-destructive'
														: 'text-secondary-foreground',
												)}
											>
												Total: {totalMB.toFixed(1)} MB / 20 MB
											</p>
										)
									})()}
							</>
						</FormControl>

						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}

export default UploadInput
