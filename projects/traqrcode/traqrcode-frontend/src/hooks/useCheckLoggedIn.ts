import { isLoggedIn } from '../utils/utilsUserLoggedIn'
import { useHistory } from 'react-router-dom'

export const useCheckLoggedIn = () => {
  const history = useHistory()
  if (!isLoggedIn()) history.push('/')
}
