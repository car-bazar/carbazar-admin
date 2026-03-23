const TimeBox = ({ value, label }: { value: number; label: string }) => (
	<p className='relative'>
		{String(value).padStart(2, '0')}
		<span className='absolute left-1/2 -translate-x-1/2 -bottom-5 text-xs font-medium text-secondary-foreground'>
			{label}
		</span>
	</p>
)

export default TimeBox
