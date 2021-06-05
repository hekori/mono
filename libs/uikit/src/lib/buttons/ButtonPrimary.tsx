import React from 'react'
import 'tailwindcss/tailwind.css'
import { classNames } from '../ClassNames'

export const ButtonPrimary: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      type="button"
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
