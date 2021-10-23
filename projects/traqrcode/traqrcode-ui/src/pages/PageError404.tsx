import * as React from 'react'
import { Shell } from '../components/Shell'

export const PageError404 = () => {
  return (
    <Shell>
      <div className="w-full mx-auto min-h-screen-50 flex flex-1 flex-col items-center justify-center text-4xl text-white">
        404 Page not found
      </div>
    </Shell>
  )
}
