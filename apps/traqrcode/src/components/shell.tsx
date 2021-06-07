import * as React from 'react'
import { Footer } from './Footer'
import { Navigation } from './Navigation'
import { useScrollToTop } from '../hooks/scrollToTop'
import { Helmet } from 'react-helmet'
type ShellProps = {
  children: any
}

export const Shell = ({ children }: ShellProps) => {
  useScrollToTop()

  return (
    <div className="relative overflow-hidden bg-document text-onDocument leading-relaxed tracking-wide flex flex-col">
      <Helmet>
        <title>TRAQRCODE</title>
        <meta name="description" content="Track QR code scans." />
      </Helmet>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
