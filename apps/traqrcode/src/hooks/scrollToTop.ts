import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const useScrollToTop = () => {
  const history = useHistory()
  useEffect(() => {
    if (window.location.href.includes('#')) return
    window.scrollTo(0, 0)
  }, [history.location.pathname])
}
