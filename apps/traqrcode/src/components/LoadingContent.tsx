import * as React from 'react'

export const LoadingContent: React.FC = () => {
  return (
    <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
      <div className="container max-w-5xl mx-auto m-8">
        <div className="spinner" />
      </div>
    </div>
  )
}
