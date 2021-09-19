import * as React from 'react'
import { Footer } from './Footer'
import { useScrollToTop } from '../hooks/scrollToTop'
import { Helmet } from 'react-helmet'
import { LoadingContent } from './LoadingContent'
import { NavigationLoggedIn } from './NavigationLoggedIn'

type ShellProps = {
  loading?: boolean
}

export const ShellLoggedIn: React.FC<ShellProps> = ({
  children,
  loading = false,
}) => {
  useScrollToTop()

  return (
    <div className="relative overflow-hidden bg-document text-onDocument leading-relaxed tracking-wide flex flex-col">
      <Helmet>
        <title>TRAQRCODE</title>
        <meta name="description" content="Track QR code scans." />
      </Helmet>
      <NavigationLoggedIn />
      {loading ? <LoadingContent /> : children}
      <Footer />
    </div>
  )
}
