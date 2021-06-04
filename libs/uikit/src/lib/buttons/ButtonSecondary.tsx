import React from 'react'
import 'tailwindcss/tailwind.css'

export const ButtonSecondary: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className="inline-flex items-center cursor-pointer px-4 py-2 text-base font-medium rounded-md shadow-md bg-button2 text-onButton hover:bg-button2Hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-button2Hover"
    >
      {children}
    </button>
  )
}
