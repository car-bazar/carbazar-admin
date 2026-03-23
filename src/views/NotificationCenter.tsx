import Notification from '@/components/Notification'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface NotificationCenterProps {
  children: React.ReactNode
  className?: string
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  children,
  className
}) => {
  return (
    <Popover>
        <PopoverTrigger className={className}>
          {children}
        </PopoverTrigger>
        <PopoverContent className='mt-3 lg:mr-5 md:ml-5 ml-[2.5vw] shadow-custom-xl w-full md:max-w-[450px] max-w-[95vw] p-0'>
          <Notification
            title={'Congrats, you won a vehicle!'}
            message={'You won the 2019 Ford F150 Raptor for $44,900. Please enter into your dashboard to see more details !'}
            type={'simple'}
            onClick={() => {}}
          />
          <Notification
            title={'Congrats, you won a vehicle!'}
            message={'You won the 2019 Ford F150 Raptor for $44,900. Please enter into your dashboard to see more details !'}
            type={'alert'}
            onClick={() => {}}
          />
          <Notification
            title={'Congrats, you won a vehicle!'}
            message={'You won the 2019 Ford F150 Raptor for $44,900. Please enter into your dashboard to see more details !'}
            type={'error'}
            onClick={() => {}}
          />
        </PopoverContent>
    </Popover>
  )
}

export default NotificationCenter