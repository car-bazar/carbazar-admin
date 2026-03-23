import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import React from 'react'
import { MdArrowForwardIos } from 'react-icons/md'

interface CollapsibleboxProps {
	trigger: React.ReactNode
	children: React.ReactNode
	containerProps?: React.HTMLAttributes<HTMLDivElement>
}

export const Collapsiblebox: React.FC<Partial<CollapsibleboxProps>> = ({
	trigger,
	children,
	containerProps,
}) => {
	const [open, setOpen] = React.useState(false)

	return (
		<Collapsible open={open} onOpenChange={setOpen} className={`w-full py-4 `}>
			<CollapsibleTrigger asChild>
				<div className='shadow-custom-xl bg-foreground flex rounded-2xl cursor-pointer justify-between items-center p-3'>
					{trigger}
					<MdArrowForwardIos
						className={`h-4 w-4 transition ${open ? 'rotate-90' : 'rotate-0'} `}
					/>
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent className='mt-5'>
				<div {...containerProps}>{children}</div>
			</CollapsibleContent>
		</Collapsible>
	)
}
