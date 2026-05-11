import { useAuth } from '@/hooks/useAuth'

const Field = ({ label, value }: { label: string; value: string }) => (
	<div className='flex flex-col gap-2'>
		<h4 className='text-base font-semibold'>{label}</h4>
		<p className='border-l-2 border-ring/30 border-dashed pl-4 leading-relaxed'>
			{value}
		</p>
	</div>
)

const LoginSecurity = () => {
	const { user } = useAuth()

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
		</div>
	)
}

export default LoginSecurity
