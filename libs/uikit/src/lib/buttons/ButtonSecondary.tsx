import React from 'react'
import { classNames } from '../ClassNames'
import { ButtonProps } from './types'

export const ButtonSecondary: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      {...props}
      className={classNames(
        'text-center px-8 py-4 font-medium rounded-md shadow-md text-onButton focus:outline-none ', props.disabled ? 'cursor-not-allowed bg-button2Disabled' :'bg-button2 cursor-pointer hover:bg-button2Hover focus:ring-2 focus:ring-offset-2 focus:bg-button2Hover',
        props.className
      )}
    >
      {children}
    </button>
  )
}

export const ButtonSecondarySmall: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className={classNames(
        'cursor-pointer text-center px-4 py-2 font-medium rounded-md shadow-md bg-button2 text-onButton hover:bg-button2Hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-button2Hover',
        props.className
      )}
    >
      {children}
    </button>
  )
}
