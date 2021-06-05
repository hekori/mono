import { useEffect } from 'react'

export const useScrollToAnchor = () => {
  useEffect(() => {
    const element = document.getElementById(
      window.location.hash.replace('#', '')
    )

    window.scrollTo({
      behavior: element ? 'smooth' : 'auto',
      top: element ? element.offsetTop : 0,
    })
  })
}
