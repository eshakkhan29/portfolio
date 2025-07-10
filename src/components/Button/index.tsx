import { cn } from '@/utils/cn'
import React from 'react'
import Loader from '../Loader/Loader'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  icon?: React.ReactNode
  color?: 'primary' | 'green' | 'red' | 'blue' | 'yellow' | 'orange' | 'gray' | 'black'
  variant?: 'solid' | 'outline'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

const colorVariants = {
  primary: {
    solid: 'bg-[#9945A8] hover:bg-primary-600 active:bg-primary-700 text-white',
    outline: 'border border-[#9945A8] hover:bg-primary-100 active:bg-primary-300 text-[#9945A8]',
  },
  green: {
    solid: 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white',
    outline: 'border border-green-500 hover:bg-green-100 active:bg-green-300 text-green-500',
  },
  red: {
    solid: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white',
    outline: 'border border-red-500 hover:bg-red-100 active:bg-red-500 text-red-500',
  },
  blue: {
    solid: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white',
    outline: 'border border-blue-500 hover:bg-blue-100 active:bg-blue-300 text-blue-500',
  },
  yellow: {
    solid: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white',
    outline: 'border border-yellow-500 hover:bg-yellow-100 active:bg-yellow-300 text-yellow-500',
  },
  orange: {
    solid: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white',
    outline: 'border border-orange-500 hover:bg-orange-100 active:bg-orange-300 text-orange-500',
  },
  gray: {
    solid: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white',
    outline: 'border border-gray-500 hover:bg-gray-200 active:bg-gray-300 text-gray-500',
  },
  black: {
    solid: 'bg-black text-white',
    outline: 'border border-black text-black',
  },
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  onClick,
  icon,
  color = 'primary',
  variant = 'solid',
  loading,
  disabled,
  className,
  size = 'lg',
  style,
}) => {
  const sizeClasses = {
    sm: 'py-2',
    md: 'py-2.5',
    lg: 'py-3',
  }[size]

  const buttonClasses = cn(
    'px-4 rounded-lg font-semibold text-sm whitespace-nowrap duration-200 active:duration-0 ease-in-out dark:text-white dark:hover:bg-opacity-20',
    sizeClasses,
    className,
    icon && 'flex items-center justify-center gap-2',
    loading && 'relative !text-transparent pointer-events-none',
    colorVariants[color]?.[variant],
  )

  return (
    <button
      disabled={loading || disabled}
      className={buttonClasses}
      onClick={onClick}
      type={type}
      style={style}>
      {icon} {children}
      {loading && (
        <Loader
          classNames={`absolute top-1/2 start-1/2 -translate-y-1/2 -translate-x-1/2 ${
            variant === 'solid' ? 'text-white' : `text-${color}-500`
          }`}
          size={15}
          thickness={4}
        />
      )}
    </button>
  )
}

export default Button
