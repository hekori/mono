import React from 'react'
import 'tailwindcss/tailwind.css'

export const ButtonPrimary: React.FC = ({ children }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </button>
  )
}
