import * as React from 'react'
import { Footer } from './Footer'
import { NavigationPublic } from './NavigationPublic'
import { useScrollToTop } from '../hooks/scrollToTop'
import { Helmet } from 'react-helmet'
import { LoadingContent } from './LoadingContent'

type ShellProps = {
  children: any
  loading?: boolean
}

export const ShellPublic = ({ children, loading = false }: ShellProps) => {
  useScrollToTop()

  return (
    <div className="relative overflow-hidden bg-document text-onDocument leading-relaxed tracking-wide flex flex-col">
      <Helmet>
        <title>TRAQRCODE</title>
        <meta name="description" content="Track QR code scans." />
      </Helmet>
      <NavigationPublic />
      {loading ? <LoadingContent /> : children}
      <Footer />
    </div>
  )
}
