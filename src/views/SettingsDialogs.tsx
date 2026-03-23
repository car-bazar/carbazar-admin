import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'

interface SettingsDialogsProps {
	children: React.ReactNode
	form?: UseFormReturn<any>
	trigger?: React.ReactNode
}

const SettingsDialogs: React.FC<SettingsDialogsProps> = ({
	children,
	form,
	trigger,
}) => {
	return (
		<>
			<Dialog onOpenChange={isOpen => isOpen && form?.reset()}>
				<DialogTrigger asChild>
					{trigger ? (
						trigger
					) : (
						<Button
							variant={'outline'}
							size={'sm'}
							className='mt-5 shadow-custom-xl bg-foreground border-tiffany hover:bg-tiffany hover:text-background text-sm py-5 px-14'
						>
							Edit
						</Button>
					)}
				</DialogTrigger>
				<DialogContent className='bg-foreground shadow-custom-xl max-sm:w-full max-sm:h-full overflow-y-auto'>
					<DialogHeader className='mb-1'>
						<DialogTitle>Edit</DialogTitle>
						<DialogDescription />
					</DialogHeader>
					{children}
				</DialogContent>
			</Dialog>
		</>
	)
}

export default SettingsDialogs
