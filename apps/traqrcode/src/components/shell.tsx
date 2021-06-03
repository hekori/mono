import { useLocation } from 'react-router-dom'
import * as React from 'react'
import { useEffect } from 'react'
import { Footer } from './Footer'
import { Navigation } from './Navigation'

type ShellProps = {
  children: any
}

export const Shell = ({ children }: ShellProps) => {
  const location = useLocation()
  useEffect(() => {
    if (window.location.href.includes('#')) return
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="relative overflow-hidden bg-document text-onDocument leading-relaxed tracking-wide flex flex-col">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
