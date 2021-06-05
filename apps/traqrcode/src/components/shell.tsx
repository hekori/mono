import * as React from 'react'
import { Footer } from './Footer'
import { Navigation } from './Navigation'
import { useScrollToTop } from '../hooks/scrollToTop'

type ShellProps = {
  children: any
}

export const Shell = ({ children }: ShellProps) => {
  useScrollToTop()

  return (
    <div className="relative overflow-hidden bg-document text-onDocument leading-relaxed tracking-wide flex flex-col">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
