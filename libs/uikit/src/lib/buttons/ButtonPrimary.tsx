import React from 'react'
import 'tailwindcss/tailwind.css'

export const ButtonPrimary: React.FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className="inline-flex items-center cursor-pointer px-4 py-2 text-base font-medium rounded-md bg-button hover:bg-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-buttonHover"
    >
      {children}
    </button>
  )
}
