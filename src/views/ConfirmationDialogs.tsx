import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import React, { useState } from 'react'

interface ConfirmationDialogProps {
	children?: React.ReactNode
	trigger: React.ReactNode
	title: string
	description?: string
	onConfirm: () => void
	onCancel?: () => void
	confirmLabel?: string
	cancelLabel?: string
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	children,
	title,
	description,
	onConfirm,
	onCancel,
	trigger,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
}) => {
	const [open, setOpen] = useState(false)

	const handleConfirm = () => {
		onConfirm()
		setOpen(false)
	}

	const handleCancel = () => {
		onCancel?.()
		setOpen(false)
	}

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent className='bg-foreground shadow-custom-xl max-w-2xl max-sm:w-full max-sm:h-full overflow-y-auto'>
					<DialogHeader className='mb-1'>
						<DialogTitle>{title}</DialogTitle>
						{description && (
							<DialogDescription>{description}</DialogDescription>
						)}
					</DialogHeader>
					{children && <div className='py-2'>{children}</div>}
					<div className='flex flex-row justify-between items-center gap-3 mt-4'>
						<Button
							onClick={handleCancel}
							type='submit'
							variant={'outline'}
							size={'lg'}
							className={`border-destructive bg-destructive/80 text-foreground hover:bg-destructive hover:border-destructive hover:text-foreground w-full`}
						>
							{cancelLabel}
						</Button>
						<Button
							onClick={handleConfirm}
							type='submit'
							variant={'outline'}
							size={'lg'}
							className='border-background bg-background text-foreground hover:bg-tiffany hover:border-tiffany hover:text-background w-full'
						>
							{confirmLabel}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default ConfirmationDialog
