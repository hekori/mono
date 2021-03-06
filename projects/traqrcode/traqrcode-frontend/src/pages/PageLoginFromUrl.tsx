import * as React from 'react'
import { useLayoutEffect } from 'react'
import { ShellPublic } from '../components/ShellPublic'
import { Container } from '../components/Container'
import { environment } from '../environments/environment'
import { useHistory } from 'react-router-dom'
import { PDF_ROUTE } from '../routing/routingPaths'
import { CheckLoginRouteInfo } from '../routing/routingTypes'

interface PropsPageCheckLogin {
  routeInfo: CheckLoginRouteInfo
}

export const PageLoginFromUrl: React.FC<PropsPageCheckLogin> = ({
  routeInfo,
}) => {
  const history = useHistory()
  useLayoutEffect(() => {
    const runEffect = async () => {
      const key = environment.getAccessTokenLocalStorageKey()
      localStorage.setItem(key, routeInfo.accessToken)
      history.push(PDF_ROUTE)
    }

    void runEffect()
  }, [])

  return (
    <ShellPublic>
      <Container>Logging you in ..</Container>
    </ShellPublic>
  )
}
