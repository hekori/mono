import React from 'react'
import { classNames } from '../ClassNames'
import { ButtonProps } from './types'

export const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button
      type={props.type ?? 'button'}
      {...props}
      className={classNames(
        'cursor-pointer text-center px-8 py-4 font-extrabold  rounded-md shadow-lg bg-button text-onButton hover:bg-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-buttonHover',
        props.className
      )}
    >
      {children}
    </button>
  )
}

export const ButtonPrimarySmall: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className={classNames(
        'cursor-pointer text-center px-4 py-2 font-extrabold  rounded-md shadow-lg bg-button text-onButton hover:bg-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-buttonHover',
        props.className
      )}
    >
      {children}
    </button>
  )
}
