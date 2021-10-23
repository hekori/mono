import { isLoggedIn } from '../utils'
import { ShellLoggedIn } from './ShellLoggedIn'
import { ShellPublic } from './ShellPublic'

export const Shell: React.FC = (props) => {
  const loggedIn = isLoggedIn()
  if (loggedIn) {
    return <ShellLoggedIn {...props} />
  } else return <ShellPublic {...props} />
}
