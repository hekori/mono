import * as React from 'react'
import { useLayoutEffect } from 'react'
import { ShellPublic } from '../components/ShellPublic'
import { Container } from '../components/Container'
import { environment } from '../environments/environment'
import { useHistory } from 'react-router-dom'
import { PDF_ROUTE } from '../routing/routingPaths'
import { OidcLoginCallbackRouteInfo } from '../routing/routingTypes'

interface PropsPageOidcLoginCallback {
  routeInfo: OidcLoginCallbackRouteInfo
}

export const PageOidcLoginCallback: React.FC<PropsPageOidcLoginCallback> = ({
  routeInfo,
}) => {
  const history = useHistory()
  useLayoutEffect(() => {
    const runEffect = async () => {
      const idTokenKey = environment.getIdTokenLocalStorageKey()
      localStorage.setItem(idTokenKey, routeInfo.idToken)
      history.push(PDF_ROUTE)
    }

    void runEffect()
  }, [])

  return (
    <ShellPublic>
      <Container>Logging you in ...<br/><br/>

        {/*accessToken: {routeInfo.accessToken}*/}
        {/*<br/>*/}
        {/*refreshToken: {routeInfo.refreshToken}*/}
        {/*<br/>*/}
        {/*idToken: {routeInfo.idToken}*/}

      </Container>
    </ShellPublic>
  )
}
