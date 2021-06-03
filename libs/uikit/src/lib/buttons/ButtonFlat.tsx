import React from 'react'
import 'tailwindcss/tailwind.css'

export const ButtonFlat: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      {...props}
      className="inline-flex items-center cursor-pointer px-4 py-2 text-base font-medium rounded-md text-onDocument bg-transparent hover:text-onDocument2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:text-onDocument"
    >
      {children}
    </button>
  )
}
