import * as React from 'react'
import { ShellPublic } from '../components/ShellPublic'
import { Error500 } from '../components/Error500'

export const PageError500 = () => {
  return (
    <ShellPublic>
      <Error500 />
    </ShellPublic>
  )
}
