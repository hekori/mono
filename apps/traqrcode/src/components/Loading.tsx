import * as React from 'react'
import { Shell } from './shell'

export const Loading = () => {
  return (
    <Shell>
      <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8">
          <div className="spinner" />
        </div>
      </div>
    </Shell>
  )
}
