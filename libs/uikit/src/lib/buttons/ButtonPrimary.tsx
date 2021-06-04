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
        'inline-flex font-extrabold items-center cursor-pointer px-4 py-2 text-base font-medium rounded-md shadow-lg bg-button text-onButton hover:bg-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-buttonHover',
        props.className
      )}
    >
      {children}
    </button>
  )
}
