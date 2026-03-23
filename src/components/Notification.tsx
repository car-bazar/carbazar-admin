import React from 'react'
import { BiSolidError, BiSolidInfoCircle } from 'react-icons/bi'
import { X } from "lucide-react"


type notificationType = 'simple' | 'alert' | 'error'

interface NotificationProps {
    title: string
    message: string
    type: notificationType
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const Notification: React.FC<NotificationProps> = ({
    title,
    message,
    type,
    onClick
}) => {
  let icon

  switch (type) {
    case 'simple':
      icon = <BiSolidInfoCircle size={30} className="text-secondary" />
      break
    case 'alert':
      icon = <BiSolidInfoCircle size={30} className="text-destructive-foreground rotate-180" />
      break;
    case 'error':
      icon = <BiSolidError size={30} className="text-destructive" />
      break
    default:
      icon = null
  }

  return (
    <>
      <div className="p-4 transition hover:bg-secondary-foreground/20" onClick={onClick}>
        <div className='w-full flex flex-row cursor-pointer gap-2 ' >
          <div className="">
            {icon}
          </div>
          <div className="flex flex-col">
            <h1 className='text-base font-semibold'>{title}</h1>
            <p className='text-sm'>{message}</p>
          </div>
          <div className="">
            <X className="h-5 w-5 transition text-secondary-foreground hover:text-destructive cursor-pointer " />
          </div>
        </div>
      </div>
      <div className="bg-ring grow h-[1px] mx-4"></div>
    </>
  )
}

export default Notification