import { isLoggedIn } from '../utils'
import { useHistory } from 'react-router-dom'

export const useCheckLoggedIn = () => {
  const history = useHistory()
  if (!isLoggedIn()) history.push('/')
}
