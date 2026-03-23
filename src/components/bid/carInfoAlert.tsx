import React from 'react'
import { BiSolidInfoCircle } from 'react-icons/bi'

interface CarInfoAlertProps {
  text: string
}

const carInfoAlert: React.FC<CarInfoAlertProps> = ({
  text
}) => {
  return (
    <div className='bg-tiffany/20 shadow-custom-xl border border-l-8 border-tiffany py-4 px-3 flex flex-row gap-4 mb-2'>
      <BiSolidInfoCircle className="text-tiffany rotate-180 w-8 h-8 shrink-0" />
      <p className='font-semibold lg:text-base text-sm'>{text}</p>
    </div>
  )
}

export default carInfoAlert