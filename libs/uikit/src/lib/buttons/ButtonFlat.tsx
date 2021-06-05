import React from 'react'
import 'tailwindcss/tailwind.css'
import { classNames } from '../ClassNames'

export const ButtonFlat: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      {...props}
      //focus:outline-none focus:ring-1 focus:ring-offset-1
      className={classNames(
        'cursor-pointer text-center px-8 py-4 text-base font-medium rounded-md text-onDocument bg-transparent hover:text-onDocumentHighlight focus:text-onDocument focus:outline-none',
        props.className
      )}
    >
      {children}
    </button>
  )
}
