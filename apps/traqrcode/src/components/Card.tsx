import React from 'react'

export const Card: React.FC = ({ children }) => {
  return (
    <div className="bg-document2 text-onDocument2 shadow overflow-hidden sm:rounded-md">
      {children}
    </div>
  )
}
