import * as React from 'react'
import { Footer } from './Footer'
import { NavigationPublic } from './NavigationPublic'
import { useScrollToTop } from '../hooks/scrollToTop'
import { Helmet } from 'react-helmet'

type ShellProps = {
  children: any
  loading?: boolean
}

const LoadingContent: React.FC = () => {
  return (
    <div className="w-full mx-auto pt-6 pb-12 min-h-screen">
      <div className="container max-w-5xl mx-auto m-8">
        <div className="spinner" />
      </div>
    </div>
  )
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
