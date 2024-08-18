import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  color?: 'default' | 'red' | 'blue' | 'black' // Add more colors as needed
  dark?: boolean
}

const Phone = ({ imgSrc, color = 'default', className, dark = false, ...props }: PhoneProps) => {
  // Determine the background color based on the color prop
  const colorClass = color === 'red' ? 'bg-red-500' :
                     color === 'blue' ? 'bg-blue-500' :
                     color === 'black' ? 'bg-gray-800' :
                     'bg-teal-700'; // Default color

  return (
    <div
      className={cn(
        'relative  pointer-events-none z-50 overflow-hidden',
        colorClass,
        className
      )}
      {...props}
    >
      <img
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        className='pointer-events-none z-50 select-none'
        alt='phone template'
      />

      <div className='absolute -z-10 inset-0'>
        <img
          className='object-cover min-w-full min-h-full'
          src={imgSrc}
          alt='phone image'
        />
      </div>
    </div>
  )
}

export default Phone
