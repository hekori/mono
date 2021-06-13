import * as React from 'react'
import { ShellPublic } from './ShellPublic'

export const Loading = () => {
  return (
    <ShellPublic>
      <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
        <div className="container max-w-5xl mx-auto m-8">
          <div className="spinner" />
        </div>
      </div>
    </ShellPublic>
  )
}
